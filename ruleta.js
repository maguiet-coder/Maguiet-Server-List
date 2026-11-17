// Ruleta de niveles: el objetivo sube del 1% al 100% y cada paso trae un nivel al azar.
const DIFICULTADES = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
const SALTOS_MAX = 3;
const PAGINA = "https://maguiet-coder.github.io/Maguiet-Server-List/ruleta.html";
const CLAVE_MEJOR = "msl-ruleta-mejor", CLAVE_PARTIDA = "msl-ruleta-partida";

const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};
const mezclar = (a) => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const leerLS = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const guardarLS = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const borrarLS = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

const todos = NIVELES.map((nivel, i) => ({ nivel, puesto: i + 1 }));
const difs = [...new Set([...DIFICULTADES, ...todos.map((x) => x.nivel.dificultad)])];
const activas = new Set(difs.filter((d) => todos.some((x) => x.nivel.dificultad === d)));
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pool = () => todos.filter((x) => activas.has(x.nivel.dificultad));

let run = null, girando = false;

function vista(nombre) {
  ["inicio", "juego", "fin"].forEach((v) => { $("vista-" + v).hidden = v !== nombre; });
}

/* ---------- Inicio ---------- */

function pintarFiltros() {
  const cont = $("filtros");
  cont.replaceChildren();
  difs.forEach((d) => {
    const n = todos.filter((x) => x.nivel.dificultad === d).length;
    const b = el("button", "filtro");
    b.type = "button";
    b.disabled = n === 0;
    b.setAttribute("aria-pressed", String(activas.has(d)));
    b.append(d, el("small", "", String(n)));
    b.addEventListener("click", () => {
      if (activas.has(d)) activas.delete(d); else activas.add(d);
      pintarFiltros();
    });
    cont.appendChild(b);
  });
  const total = pool().length;
  $("pool-info").textContent = total === 0
    ? "Elige al menos una dificultad."
    : `${total} ${total === 1 ? "nivel" : "niveles"} en esta ruleta.` + (total === 1 ? " Con un solo nivel no se puede saltar." : "");
  $("empezar").disabled = total === 0;
}

function pintarInicio() {
  pintarFiltros();
  $("mejor").textContent = (Number(leerLS(CLAVE_MEJOR)) || 0) + "%";
  const guardada = cargarPartida();
  $("continuar").hidden = !guardada;
  if (guardada) $("continuar").textContent = `Continuar partida guardada (objetivo ${guardada.pct}%)`;
  vista("inicio");
}

/* ---------- Partida ---------- */

function siguiente() {
  if (!run.bolsa.length) {
    run.bolsa = mezclar(run.pool);
    // Evita que el nivel que acaba de salir se repita justo después
    if (run.pool.length > 1 && run.actual && run.bolsa[run.bolsa.length - 1].nivel === run.actual.nivel) run.bolsa.reverse();
  }
  return run.bolsa.pop();
}

function botones(bloqueado) {
  $("conseguido").disabled = bloqueado;
  $("saltar").disabled = bloqueado || run.saltos <= 0 || run.pool.length < 2;
  $("rendirse").disabled = bloqueado;
}

function pintarJuego() {
  $("objetivo").textContent = run.pct + "%";
  $("barra-relleno").style.width = (run.pct - 1) + "%";
  $("saltos-texto").textContent = `Saltos: ${run.saltos}/${SALTOS_MAX}`;
  const puntos = $("saltos");
  puntos.replaceChildren();
  for (let i = 0; i < SALTOS_MAX; i++) puntos.appendChild(el("span", "punto" + (i >= run.saltos ? " usado" : "")));
  $("conseguido").textContent = run.pct >= 100 ? "🏆 ¡100% conseguido!" : "✔ ¡Conseguido! (+1%)";
  $("saltar").textContent = run.saltos > 0 ? `Saltar nivel (quedan ${run.saltos})` : "Sin saltos";

  const h = $("historial");
  h.replaceChildren();
  if (!run.historial.length) h.appendChild(el("li", "", "Todavía ninguno. ¡Ve a por el 1%!"));
  run.historial.slice().reverse().forEach((x) => {
    const li = el("li");
    li.append(el("span", "", `${x.pct}% · #${x.item.puesto} ${x.item.nivel.nombre}`), el("span", "date", x.item.nivel.dificultad));
    h.appendChild(li);
  });
  botones(girando);
}

function pintarNivel(item, enGiro) {
  const n = item.nivel, vid = videoId(n.video);
  $("reel").classList.toggle("girando", !!enGiro);
  const img = $("r-img");
  img.hidden = !vid;
  if (vid) img.src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
  $("r-puesto").textContent = `#${item.puesto}`;
  $("r-nombre").textContent = n.nombre;
  const d = $("r-dif");
  d.textContent = n.dificultad;
  d.dataset.level = slug(n.dificultad);
  $("r-pts").textContent = `${n.puntos} pts`;
  $("r-id").textContent = `ID ${n.id}`;
  $("r-gd").href = `https://gdbrowser.com/${encodeURIComponent(String(n.id).trim())}`;
  $("r-yt").hidden = !vid;
  if (vid) $("r-yt").href = `https://www.youtube.com/watch?v=${vid}`;
  const copiarId = $("r-copiar");
  copiarId.textContent = "Copiar ID";
  copiarId.onclick = () => copiar(String(n.id), () => { copiarId.textContent = "ID copiado"; });
}

// La ruleta: varios niveles pasan rápido y cada vez más despacio hasta parar en el elegido
function girar(destino) {
  girando = true;
  botones(true);
  const pasos = sinMovimiento ? 1 : 14;
  let i = 0;
  const paso = () => {
    i++;
    const ultimo = i >= pasos;
    pintarNivel(ultimo ? destino : run.pool[Math.floor(Math.random() * run.pool.length)], !ultimo);
    if (ultimo) { girando = false; botones(false); return; }
    setTimeout(paso, 50 + i * i * 1.1);
  };
  paso();
}

function empezar() {
  const items = pool();
  if (!items.length) return;
  run = { pool: items, bolsa: [], pct: 1, saltos: SALTOS_MAX, historial: [], actual: null, dificultades: [...activas] };
  run.actual = siguiente();
  vista("juego");
  pintarJuego();
  girar(run.actual);
  guardarPartida();
}

$("empezar").addEventListener("click", empezar);

$("conseguido").addEventListener("click", () => {
  if (girando) return;
  run.historial.push({ item: run.actual, pct: run.pct });
  if (run.pct >= 100) { terminar(true); return; }
  run.pct++;
  run.actual = siguiente();
  pintarJuego();
  girar(run.actual);
  guardarPartida();
});

$("saltar").addEventListener("click", () => {
  if (girando || run.saltos <= 0 || run.pool.length < 2) return;
  run.saltos--;
  run.actual = siguiente();
  pintarJuego();
  girar(run.actual);
  guardarPartida();
});

$("rendirse").addEventListener("click", () => {
  if (!girando && confirm("¿Seguro que quieres rendirte?")) terminar(false);
});

/* ---------- Partida guardada ---------- */

function guardarPartida() {
  guardarLS(CLAVE_PARTIDA, JSON.stringify({
    d: run.dificultades, bolsa: run.bolsa.map((x) => x.nivel.nombre), pct: run.pct, saltos: run.saltos,
    h: run.historial.map((x) => ({ n: x.item.nivel.nombre, p: x.pct })), a: run.actual.nivel.nombre
  }));
}

function cargarPartida() {
  try {
    const s = JSON.parse(leerLS(CLAVE_PARTIDA));
    if (!s) return null;
    const por = (nombre) => todos.find((x) => x.nivel.nombre === nombre);
    const actual = por(s.a);
    const p = todos.filter((x) => s.d.includes(x.nivel.dificultad));
    if (!actual || !p.length) return null;
    return {
      pool: p, bolsa: s.bolsa.map(por).filter(Boolean), pct: s.pct, saltos: s.saltos, actual, dificultades: s.d,
      historial: s.h.map((x) => ({ item: por(x.n), pct: x.p })).filter((x) => x.item)
    };
  } catch (e) { return null; }
}

$("continuar").addEventListener("click", () => {
  const guardada = cargarPartida();
  if (!guardada) return;
  run = guardada;
  vista("juego");
  pintarJuego();
  pintarNivel(run.actual, false);
});

/* ---------- Final ---------- */

function terminar(victoria) {
  const logrado = run.historial.length ? run.historial[run.historial.length - 1].pct : 0;
  const mejor = Number(leerLS(CLAVE_MEJOR)) || 0;
  const record = logrado > mejor;
  if (record) guardarLS(CLAVE_MEJOR, String(logrado));
  borrarLS(CLAVE_PARTIDA);

  const usados = SALTOS_MAX - run.saltos;
  $("fin-titulo").textContent = victoria ? "¡Ruleta completada! 100%"
    : logrado > 0 ? `Has llegado al ${logrado}%` : "Te has rendido en el primer nivel";
  $("fin-resumen").textContent = `Dificultades: ${run.dificultades.join(", ")} · Saltos usados: ${usados}/${SALTOS_MAX}` +
    (record ? " · ¡Nueva mejor marca!" : "");

  const lista = $("fin-lista");
  lista.replaceChildren();
  run.historial.forEach((x) => {
    const li = el("li");
    li.append(el("span", "", `${x.pct}% · #${x.item.puesto} ${x.item.nivel.nombre}`), el("span", "date", x.item.nivel.dificultad));
    lista.appendChild(li);
  });
  if (!victoria) {
    const li = el("li");
    li.append(el("span", "", `${run.pct}% · #${run.actual.puesto} ${run.actual.nivel.nombre}`), el("span", "date", "no conseguido"));
    lista.appendChild(li);
  }

  const texto = victoria
    ? `🎡 Ruleta del Servidor: ¡he completado el 100%! (${run.dificultades.join(", ")}, ${usados} saltos) ${PAGINA}`
    : `🎡 Ruleta del Servidor: he llegado al ${logrado}% (${run.dificultades.join(", ")}, ${usados} saltos) ${PAGINA}`;
  const compartir = $("compartir");
  compartir.textContent = "Copiar resultado";
  compartir.onclick = () => copiar(texto, () => { compartir.textContent = "Resultado copiado"; });
  run = null;
  vista("fin");
}

$("otra").addEventListener("click", pintarInicio);

pintarInicio();
