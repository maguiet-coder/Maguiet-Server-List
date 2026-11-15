// Clasificación general: suma de niveles completados + bonus de packs completos.
function calcular() {
  const mapa = new Map();
  NIVELES.forEach((nivel) => (nivel.leaderboard || []).forEach((r) => {
    const nombre = String(r.jugador || "").trim();
    if (!nombre) return;
    const clave = nombre.toLowerCase();
    if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, niveles: [], packs: [] });
    const j = mapa.get(clave);
    if (!j.niveles.includes(nivel.nombre)) { j.niveles.push(nivel.nombre); j.puntos += Number(nivel.puntos) || 0; }
  }));
  mapa.forEach((j) => PACKS.forEach((p) => {
    if (p.niveles.length && p.niveles.every((n) => j.niveles.includes(n))) {
      j.packs.push(`${p.nombre} (+${p.puntos})`);
      j.puntos += Number(p.puntos) || 0;
    }
  }));
  return [...mapa.values()].sort((a, b) => b.puntos - a.puntos || b.niveles.length - a.niveles.length || a.nombre.localeCompare(b.nombre));
}

const jugadores = calcular();
const lista = document.getElementById("player-list");
document.getElementById("list-empty").hidden = jugadores.length > 0;
let puesto = 1;
jugadores.forEach((j, i) => {
  if (i > 0 && j.puntos < jugadores[i - 1].puntos) puesto = i + 1; // empates comparten puesto
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
  nombre.textContent = conCorona(j.nombre);
  const detalle = document.createElement("span");
  detalle.className = "player-detail";
  detalle.textContent = `${j.niveles.length === 1 ? "1 nivel" : j.niveles.length + " niveles"}: ${j.niveles.join(", ")}` +
    (j.packs.length ? ` · Packs: ${j.packs.join(", ")}` : "");
  info.append(nombre, detalle);
  const pts = document.createElement("span");
  pts.className = "points";
  pts.textContent = `${j.puntos} pts`;
  fila.append(rank, info, pts);
  li.appendChild(fila);
  lista.appendChild(li);
});
