// ============================================================
//  EVENTOS - Maguiet Server List
//  Para añadir un evento: copia un bloque { ... } dentro de la
//  lista EVENTOS y cambia los datos. Fechas en formato AAAA-MM-DD.
//  Si la fecha de fin ya pasó, el evento pasa solo a "Concluidos".
// ============================================================

const EVENTOS = [
  // Por ahora no hay ninguno. Ejemplo (quita las // para usarlo):
  // {
  //   nombre: "Torneo de Extreme Demons",
  //   descripcion: "Quien pase más niveles gana un rol especial.",
  //   inicio: "2026-11-20",
  //   fin: "2026-11-30",
  //   enlace: "https://discord.gg/tu-invitacion" // opcional
  // },
];

function hoy() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function esActivo(ev) {
  const fin = new Date(ev.fin + "T23:59:59");
  return fin >= hoy();
}

function crearTarjeta(ev) {
  const div = document.createElement("div");
  div.className = "evento";

  const titulo = document.createElement("h3");
  titulo.textContent = ev.nombre;
  div.appendChild(titulo);

  const fechas = document.createElement("p");
  fechas.textContent = "Del " + ev.inicio + " al " + ev.fin;
  div.appendChild(fechas);

  if (ev.descripcion) {
    const desc = document.createElement("p");
    desc.textContent = ev.descripcion;
    div.appendChild(desc);
  }

  if (ev.enlace) {
    const a = document.createElement("a");
    a.href = ev.enlace;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Más información";
    div.appendChild(a);
  }
  return div;
}

function pintarEventos() {
  const activos = EVENTOS.filter(esActivo);
  const concluidos = EVENTOS.filter((e) => !esActivo(e));

  const contActivos = document.getElementById("eventos-activos");
  const contConcluidos = document.getElementById("eventos-concluidos");

  contActivos.innerHTML = "";
  contConcluidos.innerHTML = "";

  if (activos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay eventos activos por ahora.";
    contActivos.appendChild(p);
  } else {
    const t = document.createElement("h2");
    t.textContent = "Eventos activos:";
    contActivos.appendChild(t);
    activos.forEach((e) => contActivos.appendChild(crearTarjeta(e)));
  }

  if (concluidos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Todavía no hay eventos concluidos.";
    contConcluidos.appendChild(p);
  } else {
    const t = document.createElement("h2");
    t.textContent = "Eventos concluidos:";
    contConcluidos.appendChild(t);
    concluidos.forEach((e) => contConcluidos.appendChild(crearTarjeta(e)));
  }
}

// Subapartados (pestañas): Eventos Activos / Eventos Concluidos
function mostrarPestana(cual) {
  document.getElementById("eventos-activos").style.display =
    cual === "activos" ? "block" : "none";
  document.getElementById("eventos-concluidos").style.display =
    cual === "concluidos" ? "block" : "none";
  document.getElementById("tab-activos").classList.toggle("activa", cual === "activos");
  document.getElementById("tab-concluidos").classList.toggle("activa", cual === "concluidos");
}

document.addEventListener("DOMContentLoaded", () => {
  pintarEventos();
  mostrarPestana("activos");
  document.getElementById("tab-activos").addEventListener("click", () => mostrarPestana("activos"));
  document.getElementById("tab-concluidos").addEventListener("click", () => mostrarPestana("concluidos"));
});
