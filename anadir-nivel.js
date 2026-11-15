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

function generar() {
  const lineas = campos.jugadores.value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(",");
      const jugador = (i === -1 ? l : l.slice(0, i)).trim();
      const fecha = i === -1 ? "" : l.slice(i + 1).trim();
      const partes = [`jugador: ${JSON.stringify(jugador)}`];
      if (fecha) partes.push(`fecha: ${JSON.stringify(fecha)}`);
      return `      { ${partes.join(", ")} },`;
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

function actualizar() {
  salida.textContent = generar();
  boton.textContent = "Copiar código";
}

function copiar(texto) {
  const respaldo = () => {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); boton.textContent = "Código copiado"; } catch (e) {}
    t.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(() => { boton.textContent = "Código copiado"; }, respaldo);
  } else {
    respaldo();
  }
}

Object.values(campos).forEach((c) => c.addEventListener("input", actualizar));
boton.addEventListener("click", () => copiar(salida.textContent));
actualizar();
