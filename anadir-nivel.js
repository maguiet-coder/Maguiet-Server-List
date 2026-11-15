function copiarTexto(texto, boton, etiquetaOk, etiquetaNormal) {
  const ok = () => { boton.textContent = etiquetaOk; };
  const respaldo = () => {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); ok(); } catch (e) {}
    t.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(ok, respaldo);
  } else {
    respaldo();
  }
  boton.dataset.normal = etiquetaNormal;
}

/* ---------- Formulario 1: añadir un nivel ---------- */

const campos = {
  nombre: document.getElementById("f-nombre"),
  video: document.getElementById("f-video"),
  id: document.getElementById("f-id"),
  creador: document.getElementById("f-creador"),
  puntos: document.getElementById("f-puntos"),
  dificultad: document.getElementById("f-dificultad"),
  jugadores: document.getElementById("f-jugadores")
};
const salida = document.getElementById("salida");
const boton = document.getElementById("copiar");

function lineaJugador(jugador, fecha) {
  const partes = [`jugador: ${JSON.stringify(jugador)}`];
  if (fecha) partes.push(`fecha: ${JSON.stringify(fecha)}`);
  return `{ ${partes.join(", ")} },`;
}

function generarNivel() {
  const lineas = campos.jugadores.value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(",");
      const jugador = (i === -1 ? l : l.slice(0, i)).trim();
      const fecha = i === -1 ? "" : l.slice(i + 1).trim();
      return "      " + lineaJugador(jugador, fecha);
    });

  const puntos = Number(campos.puntos.value) || 0;
  const cuerpoLb = lineas.length ? "\n" + lineas.join("\n") + "\n    " : "\n    ";

  return [
    "  {",
    `    nombre: ${JSON.stringify(campos.nombre.value.trim())},`,
    `    video: ${JSON.stringify(campos.video.value.trim())},`,
    `    id: ${JSON.stringify(campos.id.value.trim())},`,
    `    creador: ${JSON.stringify(campos.creador.value.trim())},`,
    `    puntos: ${puntos},`,
    `    dificultad: ${JSON.stringify(campos.dificultad.value)},`,
    `    leaderboard: [${cuerpoLb}]`,
    "  },"
  ].join("\n");
}

function actualizarNivel() {
  salida.textContent = generarNivel();
  boton.textContent = "Copiar código";
}

Object.values(campos).forEach((c) => c.addEventListener("input", actualizarNivel));
boton.addEventListener("click", () =>
  copiarTexto(salida.textContent, boton, "Código copiado", "Copiar código"));
actualizarNivel();

/* ---------- Formulario 2: añadir un récord ---------- */

const rNivel = document.getElementById("r-nivel");
const rJugador = document.getElementById("r-jugador");
const rFecha = document.getElementById("r-fecha");
const rSalida = document.getElementById("r-salida");
const rBoton = document.getElementById("r-copiar");

NIVELES.forEach((n, i) => {
  const op = document.createElement("option");
  op.value = String(i);
  op.textContent = `#${i + 1} ${n.nombre}`;
  rNivel.appendChild(op);
});

function actualizarRecord() {
  const jugador = rJugador.value.trim() || "Nombre del jugador";
  rSalida.textContent = lineaJugador(jugador, rFecha.value.trim());
  rBoton.textContent = "Copiar línea";
}

[rNivel, rJugador, rFecha].forEach((c) => c.addEventListener("input", actualizarRecord));
rBoton.addEventListener("click", () =>
  copiarTexto(rSalida.textContent, rBoton, "Línea copiada", "Copiar línea"));
actualizarRecord();
