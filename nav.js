// Código común a todas las páginas: menú lateral y utilidades.
const SECCIONES = [["Inicio","index.html"],["Lista","lista.html"],["Leaderboard","leaderboard.html"],["Packs","packs.html"],["Cambios","cambios.html"],["Ruleta","ruleta.html"],["Normas","normas.html"],["Editar","editar.html"]];

function videoId(v) {
  const t = String(v || "").trim();
  if (/^[\w-]{11}$/.test(t)) return t;
  const m = t.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : "";
}
const slug = (t) => String(t).toLowerCase().trim().replace(/\s+/g, "-");
const conCorona = (n) => (n.trim().toLowerCase() === "maguiet" ? n + " 👑🐸" : n);

// Búsqueda con puesto: "3", "#3" o un rango "1-10". Si no es un número, busca en los textos.
// "textos" son los campos de texto normales; "extra" (opcional) solo cuenta si no se busca un puesto corto.
function coincide(q, puesto, textos, extra) {
  const incluye = (arr) => arr.join(" ").toLowerCase().includes(q);
  const rango = q.match(/^#?(\d{1,4})\s*[-–]\s*#?(\d{1,4})$/);
  if (rango) {
    const a = +rango[1], b = +rango[2];
    return puesto >= Math.min(a, b) && puesto <= Math.max(a, b);
  }
  const uno = q.match(/^#?(\d{1,4})$/);
  if (uno) {
    if (puesto === +uno[1]) return true;
    return q.startsWith("#") ? false : incluye(textos);
  }
  return incluye(textos.concat(extra || []));
}

const irAlFinal = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

(function botonSubir() {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "subir";
  b.setAttribute("aria-label", "Volver arriba");
  b.textContent = "↑";
  b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const mostrar = () => b.classList.toggle("visible", window.scrollY > 500);
  window.addEventListener("scroll", mostrar, { passive: true });
  document.body.appendChild(b);
  mostrar();
})();

function crearBadge(d) {
  const b = document.createElement("span");
  b.className = "badge";
  b.textContent = d;
  b.dataset.level = slug(d);
  return b;
}

function copiar(texto, hecho) {
  const respaldo = () => {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); hecho(); } catch (e) {}
    t.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(hecho, respaldo);
  else respaldo();
}

(function menu() {
  const actual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "nav-btn";
  btn.setAttribute("aria-label", "Abrir menú");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";

  const panel = document.createElement("nav");
  panel.className = "nav-panel";
  panel.setAttribute("aria-label", "Secciones de la web");
  const titulo = document.createElement("p");
  titulo.className = "nav-title";
  titulo.textContent = "Maguiet Server List";
  panel.appendChild(titulo);
  SECCIONES.forEach(([nombre, href]) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = nombre;
    if (href === actual) a.setAttribute("aria-current", "page");
    panel.appendChild(a);
  });

  const ancho = () => window.matchMedia("(min-width: 900px)").matches;
  const abrir = (o) => {
    panel.classList.toggle("open", o);
    document.body.classList.toggle("nav-open", o);
    btn.setAttribute("aria-expanded", String(o));
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); abrir(!panel.classList.contains("open")); });
  // En pantallas anchas el menú se queda abierto mientras navegas; en móvil se cierra al tocar fuera
  document.addEventListener("click", (e) => { if (!ancho() && !panel.contains(e.target)) abrir(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") abrir(false); });
  document.body.append(btn, panel);
})();

(function pie() {
  const f = document.createElement("footer");
  f.className = "pie";
  f.textContent = "Maguiet Server List · La Lista Oficial del Servidor";
  document.body.appendChild(f);
})();
