// Página Logros: guía de hitos y quién los ha conseguido. No hace falta tocarlo.
if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES) || typeof calcularJugadores !== "function") {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los datos. Revisa que niveles.js y jugadores.js estén subidos y bien escritos.";
  throw new Error("Faltan datos para los logros");
}

const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};

const { lista, ctx } = calcularJugadores();
const dialog = $("logro-dialog");

function abrir(logro, tema, quienes) {
  $("lg-emoji").textContent = logro.emoji;
  $("lg-tema").textContent = tema.titulo;
  $("lg-nombre").textContent = logro.nombre;
  $("lg-larga").textContent = logro.larga;
  $("lg-titulo-quien").textContent = `Lo tienen (${quienes.length})`;
  const ul = $("lg-quien");
  ul.replaceChildren();
  quienes.forEach((j) => {
    const li = el("li");
    li.append(el("span", "", `#${j.puesto} ${conCorona(j.nombre)}`), el("span", "points", `${j.puntos} pts`));
    ul.appendChild(li);
  });
  $("lg-vacio").hidden = quienes.length > 0;
  dialog.showModal();
}

TEMAS_LOGROS.forEach((tema) => {
  const sec = el("section", "tema");
  sec.appendChild(el("h2", "tema-titulo", tema.titulo));
  if (tema.descripcion) sec.appendChild(el("p", "hint tema-desc", tema.descripcion));
  const grid = el("div", "logros-grid");
  tema.logros.forEach((logro) => {
    const quienes = lista.filter((j) => logro.cumple(j, ctx));
    const b = el("button", "logro" + (quienes.length ? "" : " sin-nadie"));
    b.type = "button";
    b.append(
      el("span", "logro-emoji", logro.emoji),
      el("span", "logro-nombre", logro.nombre),
      el("span", "logro-corta", logro.corta),
      el("span", "logro-num", `👥 ${quienes.length}`)
    );
    b.addEventListener("click", () => abrir(logro, tema, quienes));
    grid.appendChild(b);
  });
  sec.appendChild(grid);
  $("logros-lista").appendChild(sec);
});

$("lg-cerrar").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
