// Dibuja la lista a partir de niveles.js. No hace falta tocarlo.
const $ = (id) => document.getElementById(id);
const lista = $("level-list"), vacio = $("list-empty"), dialog = $("level-dialog"), buscar = $("buscar");
const els = {
  video: $("dlg-video"), yt: $("dlg-yt"), rank: $("dlg-rank"), name: $("dlg-name"), points: $("dlg-points"),
  difficulty: $("dlg-difficulty"), creator: $("dlg-creator"), id: $("dlg-id"), copy: $("dlg-copy"),
  board: $("dlg-leaderboard"), empty: $("dlg-empty"), close: $("dlg-close")
};

function dibujar(filtro) {
  lista.replaceChildren();
  const q = (filtro || "").trim().toLowerCase();
  let mostrados = 0;

  NIVELES.forEach((nivel, i) => {
    const puesto = i + 1; // el puesto lo decide el orden de la lista
    if (q && ![nivel.nombre, nivel.creador, nivel.id].join(" ").toLowerCase().includes(q)) return;
    mostrados++;
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
    card.addEventListener("click", () => abrir(nivel, puesto));
    li.appendChild(card);
    lista.appendChild(li);
  });

  vacio.hidden = mostrados > 0;
  vacio.textContent = NIVELES.length ? "Ningún nivel coincide con la búsqueda." : "Aún no hay niveles en la lista.";
}

function abrir(nivel, puesto) {
  els.video.replaceChildren();
  const vid = videoId(nivel.video);
  els.video.hidden = els.yt.hidden = !vid;
  if (vid) {
    els.yt.href = `https://www.youtube.com/watch?v=${vid}`;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${vid}?rel=0`;
    iframe.title = `Vídeo de ${nivel.nombre}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    els.video.appendChild(iframe);
  }

  els.rank.textContent = `#${puesto}`;
  els.name.textContent = nivel.nombre;
  els.points.textContent = `${nivel.puntos} pts`;
  els.difficulty.textContent = nivel.dificultad;
  els.difficulty.dataset.level = slug(nivel.dificultad);
  els.creator.textContent = nivel.creador; // como creador no lleva corona
  els.id.textContent = nivel.id;
  els.copy.textContent = "Copiar ID";
  els.copy.onclick = () => copiar(String(nivel.id), () => { els.copy.textContent = "ID copiado"; });

  const jugadores = nivel.leaderboard || [];
  els.board.replaceChildren();
  jugadores.forEach((j, i) => {
    const li = document.createElement("li");
    const izq = document.createElement("span");
    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = `${i + 1}.`;
    izq.append(pos, document.createTextNode(conCorona(j.jugador)));
    const fecha = document.createElement("span");
    fecha.className = "date";
    fecha.textContent = j.fecha || "";
    li.append(izq, fecha);
    els.board.appendChild(li);
  });
  els.empty.hidden = jugadores.length > 0;
  dialog.showModal();
}

dialog.addEventListener("close", () => els.video.replaceChildren()); // el vídeo deja de sonar
els.close.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
buscar.addEventListener("input", () => dibujar(buscar.value));
dibujar("");
