// Clasificación general. Al pulsar un jugador se despliegan sus completions, packs y logros.
if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES)) {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los niveles. Revisa que niveles.js esté bien escrito (comas, comillas y llaves).";
  throw new Error("NIVELES no está definido");
}
if (typeof Jug === "undefined") {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "Faltan archivos nuevos (jugadores.js y logros-datos.js). Copia todos los archivos de la web.";
  throw new Error("Falta jugadores.js");
}

const pts = Jug.pts;
const MAX_VISIBLES = 3; // logros que se ven junto al nombre; el resto va en "+X"
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};

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

  // Logros conseguidos
  const s4 = el("section", "logros-panel");
  const logros = Jug.porImportancia(j);
  s4.appendChild(el("h3", "panel-title", `Logros (${logros.length})`));
  if (!logros.length) {
    s4.appendChild(el("p", "hint", "Todavía no tiene logros."));
  } else {
    const fila = el("div", "chips-logros");
    logros.forEach((l) => {
      const chip = el("span", "logro-chip");
      chip.title = l.desc;
      chip.append(Jug.insignia(l), l.nombre);
      fila.appendChild(chip);
    });
    s4.appendChild(fila);
  }

  panel.append(s1, s3, s2, s4);
  return panel;
}

const jugadores = Jug.calcular();
const lista = document.getElementById("player-list");
const vacio = document.getElementById("list-empty");
vacio.hidden = jugadores.length > 0;
const filas = [];

let puesto = 1;
jugadores.forEach((j, i) => {
  if (i > 0 && j.puntos < jugadores[i - 1].puntos) puesto = i + 1; // empates comparten puesto

  const li = el("li");
  const fila = el("button", "level-card player-card");
  fila.type = "button";
  fila.setAttribute("aria-expanded", "false");
  fila.setAttribute("aria-controls", `jugador-${i}`);

  // Nombre con su mejor insignia de cada categoría (solo en esta leaderboard)
  const info = el("div", "card-info");
  const linea = el("div", "nombre-linea");
  linea.appendChild(el("span", "level-name", conCorona(j.nombre)));
  const ganados = Jug.porImportancia(j);
  if (ganados.length) {
    const caja = el("span", "insignias");
    let todos = false;
    const pintarInsignias = () => {
      caja.replaceChildren();
      (todos ? ganados : ganados.slice(0, MAX_VISIBLES)).forEach((l) => caja.appendChild(Jug.insignia(l)));
      if (ganados.length > MAX_VISIBLES) {
        const mas = el("span", "insignias-mas", todos ? "−" : "+" + (ganados.length - MAX_VISIBLES));
        mas.title = todos ? "Ver menos" : "Ver todos los logros";
        mas.addEventListener("click", (e) => { e.stopPropagation(); todos = !todos; pintarInsignias(); });
        caja.appendChild(mas);
      }
    };
    pintarInsignias();
    linea.appendChild(caja);
  }
  info.appendChild(linea);
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
