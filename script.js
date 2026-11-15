// ============================================================
//  NIVELES: para añadir uno nuevo, copia un bloque { ... } y cambia los datos.
//  El orden del array es el orden de la lista; "rank" es el puesto que se muestra.
//  "video" es el código del vídeo de YouTube (lo que va después de youtu.be/ y antes de "?").
//  "leaderboard" es una lista de { player: "Nombre", date: "2026-11-15" } (vacía por ahora).
// ============================================================
const LEVELS = [
  {
    rank: 1,
    name: "Ultimate MortalTerra",
    id: "140986997",
    creator: "Maguiet",
    points: 200,
    difficulty: "Hard Demon",
    video: "wmLmklrnO8I",
    leaderboard: []
  }
];

// ------------------------------------------------------------

const list = document.getElementById("level-list");
const dialog = document.getElementById("level-dialog");
const els = {
  video: document.getElementById("dlg-video"),
  rank: document.getElementById("dlg-rank"),
  name: document.getElementById("dlg-name"),
  points: document.getElementById("dlg-points"),
  difficulty: document.getElementById("dlg-difficulty"),
  creator: document.getElementById("dlg-creator"),
  id: document.getElementById("dlg-id"),
  copy: document.getElementById("dlg-copy"),
  board: document.getElementById("dlg-leaderboard"),
  empty: document.getElementById("dlg-empty"),
  close: document.getElementById("dlg-close")
};

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function renderList() {
  LEVELS.forEach((level) => {
    const li = document.createElement("li");

    const card = document.createElement("button");
    card.type = "button";
    card.className = "level-card";
    card.setAttribute("aria-label", `Abrir el nivel ${level.name}, puesto ${level.rank}`);

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${level.video}/hqdefault.jpg`;
    img.alt = "";
    img.loading = "lazy";
    thumb.appendChild(img);

    const info = document.createElement("div");
    info.className = "card-info";
    const rank = document.createElement("span");
    rank.className = "rank";
    rank.textContent = `#${level.rank}`;
    const name = document.createElement("span");
    name.className = "level-name";
    name.textContent = level.name;
    info.append(rank, name);

    card.append(thumb, info);
    card.addEventListener("click", () => openLevel(level));
    li.appendChild(card);
    list.appendChild(li);
  });
}

function openLevel(level) {
  // El vídeo se carga solo al abrir el menú (así la lista va rápida)
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${level.video}`;
  iframe.title = `Vídeo de ${level.name}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  els.video.replaceChildren(iframe);

  els.rank.textContent = `#${level.rank}`;
  els.name.textContent = level.name;
  els.points.textContent = `${level.points} puntos`;
  els.difficulty.textContent = level.difficulty;
  els.difficulty.dataset.level = slugify(level.difficulty);
  els.creator.textContent = level.creator;
  els.id.textContent = level.id;
  els.copy.textContent = "Copiar ID";
  els.copy.onclick = () => copyId(level.id);

  els.board.replaceChildren();
  level.leaderboard.forEach((entry, i) => {
    const li = document.createElement("li");
    const player = document.createElement("span");
    player.textContent = `${i + 1}. ${entry.player}`;
    const date = document.createElement("span");
    date.textContent = entry.date || "";
    li.append(player, date);
    els.board.appendChild(li);
  });
  els.empty.hidden = level.leaderboard.length > 0;

  dialog.showModal();
}

function copyId(id) {
  const done = () => { els.copy.textContent = "ID copiado"; };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(id).then(done, () => {});
  }
}

function closeLevel() {
  dialog.close();
}

// Al cerrar, se quita el iframe para que el vídeo deje de sonar
dialog.addEventListener("close", () => els.video.replaceChildren());
els.close.addEventListener("click", closeLevel);

// Click fuera del recuadro cierra el menú
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  if (outside) closeLevel();
});

renderList();
