// Página Logros: guía de hitos por temática. Al pulsar uno se ve su explicación y quién lo tiene.
if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES) || typeof Jug === "undefined" ||
    typeof LOGROS === "undefined" || typeof CATEGORIAS === "undefined") {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los datos. Revisa que niveles.js, logros-datos.js y jugadores.js estén subidos y bien escritos.";
  throw new Error("Faltan datos para los logros");
}

const $ = (id) => document.getElementById(id);
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};

const lista = Jug.calcular();
const dialog = $("logro-dialog");

function abrir(logro, cat, total, quienes) {
  $("lg-emoji").replaceChildren(Jug.insignia(logro, false));
  $("lg-tema").textContent = `${cat.nombre} · escalón ${logro.nivel} de ${total}`;
  $("lg-nombre").textContent = logro.nombre;
  $("lg-larga").textContent = Jug.explicacion(logro);
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

CATEGORIAS.forEach((cat) => {
  const logros = LOGROS.filter((l) => l.categoria === cat.id).sort((a, b) => a.nivel - b.nivel);
  if (!logros.length) return;
  const sec = el("section", "logros-cat");
  sec.appendChild(el("h2", "tema-titulo", cat.nombre));
  sec.appendChild(el("p", "hint tema-desc", cat.desc));
  const grid = el("div", "logros-grid");
  logros.forEach((logro) => {
    const quienes = Jug.quienTiene(logro, lista);
    const tarjeta = el("button", "logro-card" + (quienes.length ? "" : " sin-nadie"));
    tarjeta.type = "button";
    const texto = el("span", "logro-texto");
    texto.append(
      el("strong", "", logro.nombre),
      el("span", "", logro.desc),
      el("small", "hint", `👥 ${quienes.length} ${quienes.length === 1 ? "jugador" : "jugadores"}`)
    );
    tarjeta.append(Jug.insignia(logro, false), texto);
    tarjeta.addEventListener("click", () => abrir(logro, cat, logros.length, quienes));
    grid.appendChild(tarjeta);
  });
  sec.appendChild(grid);
  $("logros-lista").appendChild(sec);
});

$("lg-cerrar").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
