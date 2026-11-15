// Calcula la clasificación general a partir de las leaderboards de cada nivel
// en niveles.js. No hace falta tocar este archivo.

const lista = document.getElementById("player-list");
const vacio = document.getElementById("list-empty");

function calcularJugadores() {
  const mapa = new Map();

  NIVELES.forEach((nivel) => {
    (nivel.leaderboard || []).forEach((registro) => {
      const nombre = String(registro.jugador || "").trim();
      if (!nombre) return;
      const clave = nombre.toLowerCase();
      if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, niveles: [] });
      const jugador = mapa.get(clave);
      if (!jugador.niveles.includes(nivel.nombre)) {
        jugador.niveles.push(nivel.nombre);
        jugador.puntos += Number(nivel.puntos) || 0;
      }
    });
  });

  return [...mapa.values()].sort((a, b) =>
    b.puntos - a.puntos ||
    b.niveles.length - a.niveles.length ||
    a.nombre.localeCompare(b.nombre)
  );
}

function dibujar() {
  const jugadores = calcularJugadores();
  if (jugadores.length === 0) {
    vacio.hidden = false;
    return;
  }

  let puesto = 1;
  jugadores.forEach((j, i) => {
    // Empatados en puntos comparten puesto
    if (i > 0 && j.puntos < jugadores[i - 1].puntos) puesto = i + 1;

    const li = document.createElement("li");
    const fila = document.createElement("div");
    fila.className = "level-card player-card";

    const rank = document.createElement("span");
    rank.className = "rank player-rank";
    rank.textContent = `#${puesto}`;

    const info = document.createElement("div");
    info.className = "card-info";
    const nombre = document.createElement("span");
    nombre.className = "level-name";
    nombre.textContent = j.nombre;
    const detalle = document.createElement("span");
    detalle.className = "player-detail";
    const cuantos = j.niveles.length === 1 ? "1 nivel" : `${j.niveles.length} niveles`;
    detalle.textContent = `${cuantos}: ${j.niveles.join(", ")}`;
    info.append(nombre, detalle);

    const pts = document.createElement("span");
    pts.className = "points";
    pts.textContent = `${j.puntos} pts`;

    fila.append(rank, info, pts);
    li.appendChild(fila);
    lista.appendChild(li);
  });
}

dibujar();
