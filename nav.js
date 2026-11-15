// Menú desplegable de la web.
// Para añadir una sección nueva en el futuro, añade una línea a esta lista
// y crea la página correspondiente (el menú se actualiza solo en todas).
const SECCIONES = [
  { nombre: "Lista", href: "index.html" },
  { nombre: "Leaderboard", href: "leaderboard.html" }
];

(function () {
  const cont = document.getElementById("site-nav");
  if (!cont) return;

  const actual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const seccionActual = SECCIONES.find((s) => s.href === actual) || SECCIONES[0];

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "nav-btn";
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute("aria-controls", "nav-menu");
  const etiqueta = document.createElement("span");
  etiqueta.textContent = seccionActual.nombre;
  const flecha = document.createElement("span");
  flecha.className = "nav-caret";
  flecha.setAttribute("aria-hidden", "true");
  boton.append(etiqueta, flecha);

  const menu = document.createElement("ul");
  menu.className = "nav-menu";
  menu.id = "nav-menu";
  menu.hidden = true;

  SECCIONES.forEach((s) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.href;
    a.textContent = s.nombre;
    if (s === seccionActual) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    menu.appendChild(li);
  });

  function abrir(abierto) {
    menu.hidden = !abierto;
    boton.setAttribute("aria-expanded", String(abierto));
  }

  boton.addEventListener("click", () => abrir(menu.hidden));
  document.addEventListener("click", (e) => { if (!cont.contains(e.target)) abrir(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { abrir(false); boton.focus(); }
  });

  cont.append(boton, menu);
})();
