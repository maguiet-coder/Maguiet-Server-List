// Editor privado. Solo funciona con un token de GitHub que tenga permiso de
// escritura sobre el proyecto: sin él no se carga ni se puede cambiar nada.
const REPO = "maguiet-coder/Maguiet-Server-List";
const RUTA = "niveles.js", RUTA_CAMBIOS = "cambios-datos.js";
const API = "https://api.github.com/repos/" + REPO;
const DIFICULTADES = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
const $ = (id) => document.getElementById(id);

let token = "", shaNiveles = "", shaCambios = "";
let niveles = [], packs = [], cambios = [], sucioCambios = false;
let baseN = new Map(), ordenN = [], baseP = new Map();
const abiertos = new Set();

const aviso = (t) => { $("estado").textContent = t; };
const copia = (o) => JSON.parse(JSON.stringify(o));
const fechaHoy = () => {
  const d = new Date(), p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const fechaBonita = (f) => String(f).split("-").reverse().join("/");

function h(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
}
function campo(titulo, valor, alCambiar, tipo) {
  const l = h("label", "", titulo);
  const i = h("input");
  i.type = tipo || "text";
  i.value = valor == null ? "" : valor;
  i.addEventListener("input", () => alCambiar(i.value));
  l.appendChild(i);
  return l;
}
function boton(texto, fn) {
  const b = h("button", "copy", texto);
  b.type = "button";
  b.addEventListener("click", fn);
  return b;
}

/* ---------- Acceso y archivos de GitHub ---------- */

async function api(ruta, init) {
  const r = await fetch(API + ruta, Object.assign({}, init, {
    headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }
  }));
  if (!r.ok) { const e = new Error("error " + r.status); e.status = r.status; throw e; }
  return r.json();
}

function decodificar(b64) {
  const bin = atob(b64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

async function leer(ruta) {
  try {
    const f = await api("/contents/" + ruta);
    return { sha: f.sha, texto: decodificar(f.content) };
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

async function escribir(ruta, texto, sha, mensaje) {
  let bin = "";
  new TextEncoder().encode(texto).forEach((b) => { bin += String.fromCharCode(b); });
  const cuerpo = { message: mensaje, content: btoa(bin) };
  if (sha) cuerpo.sha = sha;
  const r = await api("/contents/" + ruta, { method: "PUT", body: JSON.stringify(cuerpo) });
  return r.content.sha;
}

async function entrar(t, silencioso) {
  token = t;
  aviso("Comprobando acceso...");
  try {
    const repo = await api("");
    if (repo.permissions && repo.permissions.push === false) { const e = new Error("sin permiso"); e.status = 403; throw e; }
    const fN = await leer(RUTA);
    if (!fN) throw new Error("no se encuentra " + RUTA);
    shaNiveles = fN.sha;
    const d = new Function(fN.texto + ";return {NIVELES: NIVELES, PACKS: typeof PACKS === 'undefined' ? [] : PACKS};")();
    niveles = d.NIVELES;
    packs = d.PACKS;
    const fC = await leer(RUTA_CAMBIOS);
    shaCambios = fC ? fC.sha : "";
    cambios = fC ? new Function(fC.texto + ";return typeof CAMBIOS === 'undefined' ? [] : CAMBIOS;")() : [];
    sucioCambios = false;
    fijarBase();
    try { localStorage.setItem("msl-token", t); } catch (e) {}
    $("acceso").hidden = true;
    $("panel").hidden = false;
    aviso("");
    pintar();
  } catch (e) {
    token = "";
    try { localStorage.removeItem("msl-token"); } catch (x) {}
    if (silencioso) aviso("");
    else aviso(e.status === 401 ? "El token no es válido." : e.status === 403 || e.status === 404
      ? "Este token no tiene acceso al proyecto." : "No se ha podido entrar (" + e.message + ").");
  }
}

$("entrar").addEventListener("click", () => {
  const t = $("token").value.trim();
  if (t) entrar(t, false); else aviso("Pega primero tu token de GitHub.");
});

$("salir").addEventListener("click", () => {
  token = "";
  try { localStorage.removeItem("msl-token"); } catch (e) {}
  $("token").value = "";
  $("panel").hidden = true;
  $("acceso").hidden = false;
  aviso("Sesión cerrada.");
});

/* ---------- Detección de cambios ---------- */

function fijarBase() {
  baseN = new Map(niveles.map((n) => [n, copia(n)]));
  ordenN = niveles.slice();
  baseP = new Map(packs.map((p) => [p, copia(p)]));
}

function detectar() {
  const out = [];
  const add = (tipo, texto) => out.push({ tipo, texto });
  const comunes = niveles.filter((n) => baseN.has(n));
  const antes = ordenN.filter((n) => comunes.includes(n));
  const renombres = new Map();

  niveles.forEach((n, i) => {
    const b = baseN.get(n);
    if (!b) { add("nivel", `Nuevo nivel: ${n.nombre} (#${i + 1}, ${n.puntos} pts, ${n.dificultad}).`); return; }
    if (b.nombre !== n.nombre) { renombres.set(b.nombre, n.nombre); add("renombrado", `Nivel renombrado: ${b.nombre} → ${n.nombre}.`); }
    if (b.puntos !== n.puntos) add("puntos", `${n.nombre}: ${b.puntos} → ${n.puntos} pts.`);
    if (b.dificultad !== n.dificultad) add("dificultad", `${n.nombre}: dificultad ${b.dificultad} → ${n.dificultad}.`);
    const previos = (b.leaderboard || []).map((r) => r.jugador.trim().toLowerCase());
    (n.leaderboard || []).forEach((r) => {
      if (!previos.includes(r.jugador.trim().toLowerCase())) add("record", `${r.jugador} se ha pasado ${n.nombre}.`);
    });
    if (comunes.indexOf(n) !== antes.indexOf(n)) {
      const viejo = ordenN.indexOf(n) + 1, nuevo = i + 1;
      add("puesto", `${n.nombre}: ${nuevo < viejo ? "sube" : "baja"} del puesto #${viejo} al #${nuevo}.`);
    }
  });
  ordenN.filter((n) => !niveles.includes(n)).forEach((n) => add("eliminado", `Nivel eliminado: ${baseN.get(n).nombre}.`));

  packs.forEach((p) => {
    const b = baseP.get(p);
    if (!b) { add("pack", `Nuevo pack: ${p.nombre} (+${p.puntos} pts por completar ${p.niveles.join(", ") || "sus niveles"}).`); return; }
    if (b.nombre !== p.nombre) add("pack", `Pack renombrado: ${b.nombre} → ${p.nombre}.`);
    if (b.puntos !== p.puntos) add("pack", `${p.nombre}: bonus ${b.puntos} → ${p.puntos} pts.`);
    const viejos = b.niveles.map((x) => renombres.get(x) || x).sort().join("|");
    if (viejos !== p.niveles.slice().sort().join("|")) add("pack", `${p.nombre}: niveles del pack → ${p.niveles.join(", ") || "ninguno"}.`);
  });
  baseP.forEach((b, p) => { if (!packs.includes(p)) add("pack", `Pack eliminado: ${b.nombre}.`); });
  return out;
}

/* ---------- Edición ---------- */

// Tarjeta plegable: cabecera con título y botones, cuerpo oculto hasta desplegar
function acordeon(obj, titulo, acciones) {
  const caja = h("div", "tool acord");
  const top = h("div", "ed-top");
  const cab = h("button", "acord-titulo");
  cab.type = "button";
  const nombre = h("span", "", titulo);
  cab.append(h("span", "acord-flecha"), nombre);
  const acc = h("div", "ed-acc");
  acciones.forEach((a) => acc.appendChild(boton(a[0], a[1])));
  top.append(cab, acc);
  const cuerpo = h("div", "acord-cuerpo");
  const abrir = (o) => {
    cuerpo.hidden = !o;
    cab.setAttribute("aria-expanded", String(o));
    if (o) abiertos.add(obj); else abiertos.delete(obj);
  };
  cab.addEventListener("click", () => abrir(cuerpo.hidden));
  abrir(abiertos.has(obj));
  caja.append(top, cuerpo);
  return { caja, cuerpo, poner: (t) => { nombre.textContent = t; } };
}

function mover(i, d) {
  const j = i + d;
  if (j < 0 || j >= niveles.length) return;
  [niveles[i], niveles[j]] = [niveles[j], niveles[i]];
  pintar();
}
function quitarNivel(i) {
  if (!confirm(`¿Eliminar "${niveles[i].nombre || "este nivel"}"?`)) return;
  const nombre = niveles[i].nombre;
  niveles.splice(i, 1);
  packs.forEach((p) => { p.niveles = p.niveles.filter((x) => x !== nombre); });
  pintar();
}

function pintarNiveles() {
  const c = $("ed-niveles");
  c.replaceChildren();
  niveles.forEach((n, i) => {
    const titulo = (nom) => `#${i + 1} ${nom || "Nivel nuevo"}`;
    const a = acordeon(n, titulo(n.nombre), [["↑", () => mover(i, -1)], ["↓", () => mover(i, 1)], ["Eliminar", () => quitarNivel(i)]]);
    a.cuerpo.appendChild(campo("Nombre del nivel", n.nombre, (v) => {
      packs.forEach((p) => { p.niveles = p.niveles.map((x) => (x === n.nombre ? v : x)); });
      n.nombre = v;
      a.poner(titulo(v));
    }));
    a.cuerpo.appendChild(campo("Enlace del vídeo (YouTube)", n.video, (v) => { n.video = v; }));
    const f1 = h("div", "row");
    f1.append(campo("ID del nivel", n.id, (v) => { n.id = v; }), campo("Creador", n.creador, (v) => { n.creador = v; }));
    const f2 = h("div", "row");
    const ld = h("label", "", "Dificultad");
    const sel = h("select");
    DIFICULTADES.forEach((d) => sel.appendChild(h("option", "", d)));
    sel.value = n.dificultad;
    sel.addEventListener("change", () => { n.dificultad = sel.value; });
    ld.appendChild(sel);
    f2.append(campo("Puntos", n.puntos, (v) => { n.puntos = Number(v) || 0; }, "number"), ld);
    const lj = h("label", "", "Quién se lo ha pasado");
    const ta = h("textarea");
    ta.rows = 3;
    ta.placeholder = "Un jugador por línea. Fecha opcional tras una coma:\nMaguiet, 15/11/2026";
    ta.value = (n.leaderboard || []).map((r) => r.jugador + (r.fecha ? ", " + r.fecha : "")).join("\n");
    ta.addEventListener("input", () => {
      n.leaderboard = ta.value.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
        const k = l.indexOf(",");
        const jugador = (k < 0 ? l : l.slice(0, k)).trim();
        const fecha = k < 0 ? "" : l.slice(k + 1).trim();
        return fecha ? { jugador, fecha } : { jugador };
      });
    });
    lj.append(ta, h("span", "hint", "El primero de la lista es el primero que se lo pasó."));
    a.cuerpo.append(f1, f2, lj);
    c.appendChild(a.caja);
  });
}

function pintarPacks() {
  const c = $("ed-packs");
  c.replaceChildren();
  packs.forEach((p, i) => {
    const a = acordeon(p, p.nombre || "Pack nuevo", [["Eliminar", () => {
      if (confirm(`¿Eliminar el pack "${p.nombre}"?`)) { packs.splice(i, 1); pintarPacks(); }
    }]]);
    const fila = h("div", "row");
    fila.append(campo("Nombre del pack", p.nombre, (v) => { p.nombre = v; a.poner(v || "Pack nuevo"); }),
      campo("Puntos extra", p.puntos, (v) => { p.puntos = Number(v) || 0; }, "number"));
    a.cuerpo.append(fila, h("p", "hint", "Niveles del pack (hay que pasárselos todos para ganar el bonus):"));
    niveles.forEach((n) => {
      const l = h("label", "chk");
      const cb = h("input");
      cb.type = "checkbox";
      cb.checked = p.niveles.includes(n.nombre);
      cb.addEventListener("change", () => {
        p.niveles = cb.checked ? [...p.niveles, n.nombre] : p.niveles.filter((x) => x !== n.nombre);
      });
      l.append(cb, document.createTextNode(" " + (n.nombre || "(sin nombre)")));
      a.cuerpo.appendChild(l);
    });
    c.appendChild(a.caja);
  });
}

function pintarCambios() {
  const ul = $("ed-historial");
  ul.replaceChildren();
  if (!cambios.length) { ul.appendChild(h("li", "", "Todavía no hay cambios anotados.")); return; }
  cambios.forEach((c, i) => {
    const li = h("li");
    li.append(h("span", "", `${fechaBonita(c.fecha)} · ${c.texto}`),
      boton("✕", () => { cambios.splice(i, 1); sucioCambios = true; pintarCambios(); }));
    ul.appendChild(li);
  });
}

function pintar() { pintarNiveles(); pintarPacks(); pintarCambios(); }

$("add-nivel").addEventListener("click", () => {
  const nuevo = { nombre: "", video: "", id: "", creador: "", puntos: 0, dificultad: "Hard Demon", leaderboard: [] };
  niveles.push(nuevo);
  abiertos.add(nuevo);
  pintar();
  $("ed-niveles").lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
});
$("add-pack").addEventListener("click", () => {
  const nuevo = { nombre: "", puntos: 0, niveles: [] };
  packs.push(nuevo);
  abiertos.add(nuevo);
  pintarPacks();
  $("ed-packs").lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
});
$("anuncio-add").addEventListener("click", () => {
  const texto = $("anuncio-texto").value.trim();
  if (!texto) return;
  cambios.unshift({ fecha: fechaHoy(), tipo: "anuncio", texto });
  sucioCambios = true;
  $("anuncio-texto").value = "";
  pintarCambios();
  aviso("Anuncio añadido. Pulsa «Publicar en la web» para guardarlo.");
});

/* ---------- Publicar ---------- */

const textoNiveles = () =>
  "// Datos de la web. Se editan desde editar.html (solo con acceso al proyecto) o a mano.\n" +
  "// El PUESTO lo decide el ORDEN de la lista. Entre bloques va siempre una coma.\n" +
  "// Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon.\n" +
  "// Cada jugador de \"leaderboard\" es { \"jugador\": \"Nombre\", \"fecha\": \"opcional\" }.\n\n" +
  "const NIVELES = " + JSON.stringify(niveles, null, 2) + ";\n\n" +
  "// PACKS: quien completa TODOS los niveles de un pack gana sus puntos extra.\n" +
  "const PACKS = " + JSON.stringify(packs, null, 2) + ";\n";

const textoCambios = () =>
  "// Historial de cambios de la web (apartado \"Cambios\"). Lo más nuevo va arriba.\n" +
  "// Se rellena solo al publicar desde Editar, pero también puedes añadir entradas a mano:\n" +
  "//   { fecha: \"2026-11-16\", tipo: \"anuncio\", texto: \"Lo que quieras anunciar\" },\n" +
  "// Tipos: nivel, eliminado, renombrado, puntos, dificultad, puesto, record, pack, anuncio.\n\n" +
  "const CAMBIOS = " + JSON.stringify(cambios, null, 1) + ";\n";

$("publicar").addEventListener("click", async () => {
  if (niveles.some((n) => !n.nombre.trim())) { aviso("Todos los niveles necesitan nombre."); return; }
  aviso("Publicando...");
  const nuevas = $("anotar").checked ? detectar().map((e) => ({ fecha: fechaHoy(), tipo: e.tipo, texto: e.texto })) : [];
  try {
    shaNiveles = await escribir(RUTA, textoNiveles(), shaNiveles, "Actualizar niveles desde el editor");
  } catch (e) {
    aviso(e.status === 409 || e.status === 422
      ? "El archivo ha cambiado desde que lo abriste. Recarga esta página y vuelve a intentarlo."
      : "No se ha podido publicar (" + e.message + ").");
    return;
  }
  if (nuevas.length || sucioCambios) {
    try {
      cambios = nuevas.concat(cambios);
      shaCambios = await escribir(RUTA_CAMBIOS, textoCambios(), shaCambios, "Actualizar cambios desde el editor");
      sucioCambios = false;
      pintarCambios();
    } catch (e) {
      aviso("Los niveles se han publicado, pero no el historial de cambios (" + e.message + "). Vuelve a pulsar Publicar para reintentarlo.");
      return;
    }
  }
  fijarBase();
  aviso("¡Publicado! En 1 o 2 minutos se verá en la web." + (nuevas.length ? ` Se han anotado ${nuevas.length} cambios.` : ""));
});

// Botones de cada apartado para saltar a otro punto de la página
document.querySelectorAll("[data-bajar]").forEach((b) => {
  b.addEventListener("click", () => {
    const destino = $(b.dataset.bajar);
    if (!destino) return;
    destino.scrollIntoView({ behavior: "smooth", block: destino.tagName === "BUTTON" ? "center" : "start" });
    destino.focus({ preventScroll: true });
  });
});

try { const guardado = localStorage.getItem("msl-token"); if (guardado) entrar(guardado, true); } catch (e) {}
