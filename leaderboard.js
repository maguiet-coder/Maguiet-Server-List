// Clasificación general. Al pulsar un jugador se despliegan sus completions y sus packs.
if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES)) {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los niveles. Revisa que niveles.js esté bien escrito (comas, comillas y llaves).";
  throw new Error("NIVELES no está definido");
}
const packsLista = typeof PACKS === "undefined" ? [] : PACKS;
const pts = (n) => Number(n) || 0;
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};

function calcular() {
  const mapa = new Map();

  NIVELES.forEach((nivel, i) => (nivel.leaderboard || []).forEach((r) => {
    const nombre = String(r.jugador || "").trim();
    if (!nombre) return;
    const clave = nombre.toLowerCase();
    if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, completions: [], packs: [] });
    const j = mapa.get(clave);
    if (j.completions.some((c) => c.nivel === nivel)) return;
    j.completions.push({ nivel, puesto: i + 1, fecha: r.fecha || "" });
    j.puntos += pts(nivel.puntos);
  }));

  mapa.forEach((j) => {
    // Primero las completions que más puntos dan; la primera es la Hardest Completion
    j.completions.sort((a, b) => pts(b.nivel.puntos) - pts(a.nivel.puntos) || a.puesto - b.puesto);
    j.hardest = j.completions[0];
    const hechos = j.completions.map((c) => c.nivel.nombre);
    packsLista.forEach((p) => {
      if (p.niveles.length && p.niveles.every((n) => hechos.includes(n))) {
        j.packs.push(p);
        j.puntos += pts(p.puntos);
      }
    });
  });

  return [...mapa.values()].sort((a, b) =>
    b.puntos - a.puntos || b.completions.length - a.completions.length || a.nombre.localeCompare(b.nombre));
}

function panelDe(j, id) {
  const panel = el("div", "player-panel");
  panel.id = id;
  panel.hidden = true;

  // Hardest Completion
  const s1 = el("section");
  s1.appendChild(el("h3", "panel-title", "Hardest Completion"));
  const caja = el("div", "hardest");
  const h = j.hardest;
  const meta = el("span", "meta");
  if (h.nivel.dificultad) meta.appendChild(crearBadge(h.nivel.dificultad));
  meta.appendChild(el("span", "points", `${pts(h.nivel.puntos)} pts`));
  caja.append(el("strong", "", `#${h.puesto} ${h.nivel.nombre}`), meta);
  s1.appendChild(caja);

  // Completions
  const s2 = el("section", "completions");
  s2.appendChild(el("h3", "panel-title", `Completions (${j.completions.length})`));
  const ul = el("ul", "row-list");
  j.completions.forEach((c) => {
    const li = el("li");
    const m = el("span", "meta");
    if (c.nivel.dificultad) m.appendChild(crearBadge(c.nivel.dificultad));
    m.appendChild(el("span", "points", `${pts(c.nivel.puntos)} pts`));
    if (c.fecha) m.appendChild(el("span", "date", c.fecha));
    li.append(el("span", "", `#${c.puesto} ${c.nivel.nombre}`), m);
    ul.appendChild(li);
  });
  s2.appendChild(ul);

  // Packs
  const s3 = el("section");
  s3.appendChild(el("h3", "panel-title", `Packs (${j.packs.length})`));
  if (j.packs.length === 0) {
    s3.appendChild(el("p", "hint", "Todavía no ha completado ningún pack."));
  } else {
    const lp = el("ul", "row-list");
    j.packs.forEach((p) => {
      const li = el("li");
      const izq = el("span", "", p.nombre);
      izq.appendChild(el("span", "date", `  ${p.niveles.join(", ")}`));
      li.append(izq, el("span", "points", `+${pts(p.puntos)} pts`));
      lp.appendChild(li);
    });
    s3.appendChild(lp);
  }

  panel.append(s1, s3, s2);
  return panel;
}

const jugadores = calcular();
const lista = document.getElementById("player-list");
const vacio = document.getElementById("list-empty");
vacio.hidden = jugadores.length > 0;
const filas = [];

let puesto = 1;
jugadores.forEach((j, i) => {
  if (i > 0 && j.puntos < jugadores[i - 1].puntos) puesto = i + 1; // empates comparten puesto

  const li = el("li");
  const fila = el("button", "level-card player-card" + (puesto === 1 ? " top1" : ""));
  fila.type = "button";
  fila.setAttribute("aria-expanded", "false");
  fila.setAttribute("aria-controls", `jugador-${i}`);

  const info = el("div", "card-info");
  info.appendChild(el("span", "level-name", conCorona(j.nombre)));
  const n = j.completions.length, m = j.packs.length;
  info.appendChild(el("span", "player-detail",
    `${n} ${n === 1 ? "nivel" : "niveles"} · ${m} ${m === 1 ? "pack" : "packs"} · Hardest: ${j.hardest.nivel.nombre}`));

  fila.append(el("span", "rank player-rank", `#${puesto}`), info, el("span", "points", `${j.puntos} pts`));

  const panel = panelDe(j, `jugador-${i}`);
  fila.addEventListener("click", () => {
    const abierto = fila.getAttribute("aria-expanded") === "true";
    fila.setAttribute("aria-expanded", String(!abierto));
    panel.hidden = abierto;
  });

  li.append(fila, panel);
  lista.appendChild(li);
  filas.push({ li, puesto, nombre: j.nombre });
});

// Búsqueda por nombre o por puesto ("3", "#3", "1-10")
function filtrar() {
  const q = document.getElementById("buscar").value.trim().toLowerCase();
  let visibles = 0;
  filas.forEach((f) => {
    const ok = !q || coincide(q, f.puesto, [f.nombre]);
    f.li.hidden = !ok;
    if (ok) visibles++;
  });
  vacio.textContent = jugadores.length ? "Ningún jugador coincide con la búsqueda." : "Todavía no hay jugadores en la clasificación.";
  vacio.hidden = visibles > 0;
}
const cajaBuscar = document.getElementById("buscar");
if (cajaBuscar) cajaBuscar.addEventListener("input", filtrar);
const botonFinal = document.getElementById("ir-final");
if (botonFinal && typeof irAlFinal === "function") botonFinal.addEventListener("click", irAlFinal);
