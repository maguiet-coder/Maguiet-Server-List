// Dibuja la lista a partir de niveles.js. No hace falta tocarlo.
if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES)) {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los niveles. Revisa que niveles.js esté bien escrito (comas, comillas y llaves).";
  throw new Error("NIVELES no está definido");
}
const $ = (id) => document.getElementById(id);
const lista = $("level-list"), vacio = $("list-empty"), dialog = $("level-dialog"), buscar = $("buscar");
const els = {
  video: $("dlg-video"), yt: $("dlg-yt"), rank: $("dlg-rank"), name: $("dlg-name"), points: $("dlg-points"),
  difficulty: $("dlg-difficulty"), creator: $("dlg-creator"), id: $("dlg-id"), copy: $("dlg-copy"), gd: $("dlg-gd"),
  board: $("dlg-leaderboard"), empty: $("dlg-empty"), close: $("dlg-close")
};

function dibujar(filtro) {
  lista.replaceChildren();
  const q = (filtro || "").trim().toLowerCase();
  let mostrados = 0;

  NIVELES.forEach((nivel, i) => {
    const puesto = i + 1; // el puesto lo decide el orden de la lista
    if (q && !(typeof coincide === "function" ? coincide(q, puesto, [nivel.nombre, nivel.creador], [nivel.id]) : [nivel.nombre, nivel.creador, nivel.id].join(" ").toLowerCase().includes(q))) return;
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
    if (puesto === 1) {
      const corona = document.createElement("span");
      corona.className = "crown";
      corona.textContent = "👑";
      corona.setAttribute("aria-hidden", "true");
      rank.prepend(corona);
    }
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
    if (location.protocol === "file:") {
      // Abierta como archivo del ordenador, YouTube bloquea el reproductor (error 153): se ofrece el enlace
      const local = document.createElement("a");
      local.className = "video-local";
      local.href = els.yt.href;
      local.target = "_blank";
      local.rel = "noopener";
      local.style.backgroundImage = `url(https://img.youtube.com/vi/${vid}/hqdefault.jpg)`;
      const boton = document.createElement("span");
      boton.textContent = "▶ Ver el vídeo en YouTube";
      const nota = document.createElement("small");
      nota.textContent = "En la web publicada se reproduce aquí mismo.";
      local.append(boton, nota);
      els.video.appendChild(local);
    } else {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${vid}?rel=0`;
    iframe.title = `Vídeo de ${nivel.nombre}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    els.video.appendChild(iframe);
    }
  }

  els.rank.textContent = `#${puesto}`;
  els.name.textContent = nivel.nombre;
  els.points.textContent = `${nivel.puntos} pts`;
  els.difficulty.textContent = nivel.dificultad;
  els.difficulty.dataset.level = slug(nivel.dificultad);
  els.creator.textContent = nivel.creador; // como creador no lleva corona
  els.id.textContent = nivel.id;
  if (els.gd) {
    els.gd.hidden = !nivel.id;
    els.gd.href = `https://gdbrowser.com/${encodeURIComponent(String(nivel.id).trim())}`;
  }
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
dibujar("");
buscar.addEventListener("input", () => dibujar(buscar.value));
const botonFinal = $("ir-final");
if (botonFinal && typeof irAlFinal === "function") botonFinal.addEventListener("click", irAlFinal);
