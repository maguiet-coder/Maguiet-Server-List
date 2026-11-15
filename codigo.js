// Generador de código: crea el texto para pegar en niveles.js.
const $ = (id) => document.getElementById(id);
const txt = (v) => JSON.stringify(String(v).trim());

// Conecta unos campos con un recuadro de código y su botón de copiar
function vincular(entradas, generar, salida, boton, normal, ok) {
  const actualizar = () => { salida.textContent = generar(); boton.textContent = normal; };
  entradas.forEach((e) => { e.addEventListener("input", actualizar); e.addEventListener("change", actualizar); });
  boton.addEventListener("click", () => copiar(salida.textContent, () => { boton.textContent = ok; }));
  actualizar();
}

function lineaJugador(jugador, fecha) {
  return `{ jugador: ${txt(jugador)}${fecha ? `, fecha: ${txt(fecha)}` : ""} },`;
}

/* ---------- Nivel ---------- */
const f = ["nombre", "video", "id", "creador", "puntos", "dificultad", "jugadores"].reduce((o, k) => { o[k] = $("f-" + k); return o; }, {});

function generarNivel() {
  const lineas = f.jugadores.value.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const i = l.indexOf(",");
    return "      " + lineaJugador(i < 0 ? l : l.slice(0, i), i < 0 ? "" : l.slice(i + 1).trim());
  });
  return [
    "  {",
    `    nombre: ${txt(f.nombre.value)},`,
    `    video: ${txt(f.video.value)},`,
    `    id: ${txt(f.id.value)},`,
    `    creador: ${txt(f.creador.value)},`,
    `    puntos: ${Number(f.puntos.value) || 0},`,
    `    dificultad: ${txt(f.dificultad.value)},`,
    "    leaderboard: [" + (lineas.length ? "\n" + lineas.join("\n") + "\n    " : "\n    ") + "]",
    "  },"
  ].join("\n");
}
vincular(Object.values(f), generarNivel, $("f-salida"), $("f-copiar"), "Copiar código", "Código copiado");

/* ---------- Récord ---------- */
const rNivel = $("r-nivel"), rJugador = $("r-jugador"), rFecha = $("r-fecha");
NIVELES.forEach((n, i) => {
  const op = document.createElement("option");
  op.value = String(i);
  op.textContent = `#${i + 1} ${n.nombre}`;
  rNivel.appendChild(op);
});
vincular([rNivel, rJugador, rFecha],
  () => lineaJugador(rJugador.value.trim() || "Nombre del jugador", rFecha.value.trim()),
  $("r-salida"), $("r-copiar"), "Copiar línea", "Línea copiada");

/* ---------- Pack ---------- */
const checks = [];
NIVELES.forEach((n) => {
  const l = document.createElement("label");
  l.className = "chk";
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.value = n.nombre;
  checks.push(cb);
  l.append(cb, document.createTextNode(" " + n.nombre));
  $("p-niveles").appendChild(l);
});
vincular([$("p-nombre"), $("p-puntos"), ...checks],
  () => [
    "  {",
    `    nombre: ${txt($("p-nombre").value)},`,
    `    puntos: ${Number($("p-puntos").value) || 0},`,
    `    niveles: [${checks.filter((c) => c.checked).map((c) => txt(c.value)).join(", ")}]`,
    "  },"
  ].join("\n"),
  $("p-salida"), $("p-copiar"), "Copiar código", "Código copiado");
