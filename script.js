// Este archivo dibuja la lista a partir de niveles.js. No hace falta tocarlo.

const list = document.getElementById("level-list");
const emptyMsg = document.getElementById("list-empty");
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

// Acepta un enlace de YouTube en cualquier formato, o el código suelto
function videoId(valor) {
  const texto = String(valor || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(texto)) return texto;
  const m = texto.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

function slugify(texto) {
  return String(texto).toLowerCase().trim().replace(/\s+/g, "-");
}

function crearBadge(dificultad) {
  const b = document.createElement("span");
  b.className = "badge";
  b.textContent = dificultad;
  b.dataset.level = slugify(dificultad);
  return b;
}

function renderList() {
  if (!Array.isArray(NIVELES) || NIVELES.length === 0) {
    emptyMsg.hidden = false;
    return;
  }

  NIVELES.forEach((nivel, i) => {
    const puesto = i + 1; // el puesto lo decide el orden en niveles.js
    const vid = videoId(nivel.video);

    const li = document.createElement("li");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "level-card";
    card.setAttribute("aria-label", `Abrir el nivel ${nivel.nombre}, puesto ${puesto}`);

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    if (vid) {
      const img = document.createElement("img");
      img.src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
      img.alt = "";
      img.loading = "lazy";
      thumb.appendChild(img);
    }
    const play = document.createElement("span");
    play.className = "play";
    thumb.appendChild(play);

    const info = document.createElement("div");
    info.className = "card-info";
    const rank = document.createElement("span");
    rank.className = "rank";
    rank.textContent = `#${puesto}`;
    const name = document.createElement("span");
    name.className = "level-name";
    name.textContent = nivel.nombre;
    info.append(rank, name);
    if (nivel.dificultad) info.appendChild(crearBadge(nivel.dificultad));

    const pts = document.createElement("span");
    pts.className = "points";
    pts.textContent = `${nivel.puntos} pts`;

    card.append(thumb, info, pts);
    card.addEventListener("click", () => abrirNivel(nivel, puesto));
    li.appendChild(card);
    list.appendChild(li);
  });
}

function abrirNivel(nivel, puesto) {
  // El vídeo se carga solo al abrir el menú
  els.video.replaceChildren();
  const vid = videoId(nivel.video);
  els.video.hidden = !vid;
  if (vid) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${vid}`;
    iframe.title = `Vídeo de ${nivel.nombre}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    els.video.appendChild(iframe);
  }

  els.rank.textContent = `#${puesto}`;
  els.name.textContent = nivel.nombre;
  els.points.textContent = `${nivel.puntos} pts`;
  els.difficulty.textContent = nivel.dificultad;
  els.difficulty.dataset.level = slugify(nivel.dificultad);
  els.creator.textContent = nivel.creador;
  els.id.textContent = nivel.id;
  els.copy.textContent = "Copiar ID";
  els.copy.onclick = () => copiar(String(nivel.id), () => { els.copy.textContent = "ID copiado"; });

  const jugadores = nivel.leaderboard || [];
  els.board.replaceChildren();
  jugadores.forEach((j, i) => {
    const li = document.createElement("li");
    const izquierda = document.createElement("span");
    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = `${i + 1}.`;
    izquierda.append(pos, document.createTextNode(j.jugador));
    const fecha = document.createElement("span");
    fecha.className = "date";
    fecha.textContent = j.fecha || "";
    li.append(izquierda, fecha);
    els.board.appendChild(li);
  });
  els.empty.hidden = jugadores.length > 0;

  dialog.showModal();
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
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(hecho, respaldo);
  } else {
    respaldo();
  }
}

// Al cerrar el menú se quita el vídeo para que deje de sonar
dialog.addEventListener("close", () => els.video.replaceChildren());
els.close.addEventListener("click", () => dialog.close());

// Click fuera del recuadro cierra el menú
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  const fuera = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  if (fuera) dialog.close();
});

renderList();
