// Página "Editar": lee niveles.js directamente desde GitHub, te deja modificar
// las leaderboards con botones y guarda el archivo de vuelta en el repositorio.
// La web se actualiza sola uno o dos minutos después de guardar.

const POR_DEFECTO = { owner: "maguiet-coder", repo: "Maguiet-Server-List", archivo: "niveles.js" };
const CLAVE_TOKEN = "msl_github_token";

const HEADER = [
  "// =====================================================================",
  "//  LISTA DE NIVELES",
  "//  La página \"Editar\" (leaderboards) y \"anadir-nivel.html\" (niveles nuevos)",
  "//  trabajan sobre este archivo.",
  "//",
  "//  Si lo editas a mano:",
  "//   - El orden de los niveles es el puesto: el primero es el #1.",
  "//   - El orden de \"leaderboard\" es el de llegada: el primero en pasárselo va arriba.",
  "//   - Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon",
  "//   - La leaderboard general se calcula sola con los niveles que ha pasado cada jugador.",
  "// =====================================================================",
  "",
  ""
].join("\n");

const $ = (id) => document.getElementById(id);
const el = {
  tokenBox: $("token-box"), tokenInput: $("token-input"), tokenOk: $("token-ok"), tokenEstado: $("token-estado"),
  editor: $("editor"), conexion: $("conexion"), desconectar: $("desconectar"),
  nivel: $("nivel-sel"), lista: $("lista-jugadores"), vacio: $("lb-vacio"),
  nuevoJugador: $("nuevo-jugador"), nuevaFecha: $("nueva-fecha"), anadir: $("anadir"),
  guardar: $("guardar"), copiarArchivo: $("copiar-archivo"), estado: $("estado")
};

let destino = calcularDestino();
let token = leerToken();
let datos = [];
let sha = "";

/* ---------- Utilidades ---------- */

function calcularDestino() {
  const host = location.hostname;
  if (host.endsWith(".github.io")) {
    const repo = location.pathname.split("/")[1];
    if (repo && !repo.includes(".")) {
      return { owner: host.split(".")[0], repo, archivo: POR_DEFECTO.archivo };
    }
  }
  return POR_DEFECTO;
}

function leerToken() {
  try { return localStorage.getItem(CLAVE_TOKEN) || ""; } catch (e) { return ""; }
}
function guardarToken(valor) {
  try { localStorage.setItem(CLAVE_TOKEN, valor); } catch (e) {}
}
function borrarToken() {
  try { localStorage.removeItem(CLAVE_TOKEN); } catch (e) {}
}

function aBase64(texto) {
  const bytes = new TextEncoder().encode(texto);
  let bin = "";
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
function deBase64(b64) {
  const bin = atob(b64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

// Convierte los datos en el texto del archivo niveles.js
function serializar(v, n = 0) {
  const pad = "  ".repeat(n + 1), fin = "  ".repeat(n);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    return "[\n" + v.map((x) => pad + serializar(x, n + 1) + ",").join("\n") + "\n" + fin + "]";
  }
  if (v && typeof v === "object") {
    const k = Object.keys(v);
    if (!k.length) return "{}";
    if (n >= 2 && k.every((x) => typeof v[x] !== "object")) {
      return "{ " + k.map((x) => JSON.stringify(x) + ": " + JSON.stringify(v[x])).join(", ") + " }";
    }
    return "{\n" + k.map((x) => pad + JSON.stringify(x) + ": " + serializar(v[x], n + 1) + ",").join("\n") + "\n" + fin + "}";
  }
  return JSON.stringify(v);
}

function construirArchivo(niveles) {
  return HEADER + "const NIVELES = " + serializar(niveles) + ";\n";
}

function leerNiveles(texto) {
  const m = texto.match(/const\s+NIVELES\s*=\s*([\s\S]*?);?\s*$/);
  if (!m) throw new Error("No encuentro la lista de niveles en niveles.js");
  const lista = new Function("return (" + m[1] + "\n);")();
  if (!Array.isArray(lista)) throw new Error("niveles.js no tiene el formato esperado");
  return lista;
}

function mostrarEstado(texto, tipo) {
  el.estado.textContent = texto;
  el.estado.className = "status" + (tipo ? " " + tipo : "");
}

/* ---------- Conexión con GitHub ---------- */

async function api(metodo, cuerpo) {
  const url = `https://api.github.com/repos/${destino.owner}/${destino.repo}/contents/${destino.archivo}`;
  const cabeceras = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (cuerpo) cabeceras["Content-Type"] = "application/json";
  const r = await fetch(url, {
    method: metodo,
    headers: cabeceras,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    cache: "no-store"
  });
  if (!r.ok) {
    const e = new Error("Error " + r.status);
    e.status = r.status;
    throw e;
  }
  return r.json();
}

function explicarError(e) {
  if (e.status === 401) return "GitHub no acepta ese token. Comprueba que lo has copiado entero.";
  if (e.status === 403) return "El token no tiene permiso para guardar. Revisa que Contents esté en «Read and write».";
  if (e.status === 404) return "No encuentro el repositorio. Comprueba que el token tiene acceso a Maguiet-Server-List.";
  if (e.status === 409 || e.status === 422) return "El archivo ha cambiado mientras editabas. Recarga la página y vuelve a probar.";
  if (e instanceof TypeError) return "No hay conexión con GitHub. Comprueba tu internet.";
  return e.message || "Ha ocurrido un error inesperado.";
}

async function cargar() {
  el.tokenBox.hidden = true;
  el.editor.hidden = false;
  el.conexion.textContent = `Conectado a ${destino.owner}/${destino.repo}`;
  mostrarEstado("Cargando niveles…");
  el.guardar.disabled = true;
  try {
    const archivo = await api("GET");
    sha = archivo.sha;
    datos = leerNiveles(deBase64(archivo.content));
    prepararSelector();
    mostrarEstado("");
  } catch (e) {
    if (e.status === 401 || e.status === 403 || e.status === 404) {
      el.editor.hidden = true;
      el.tokenBox.hidden = false;
      el.tokenEstado.textContent = explicarError(e);
      el.tokenEstado.className = "status error";
    } else {
      mostrarEstado(explicarError(e), "error");
    }
  }
}

/* ---------- Edición ---------- */

function prepararSelector() {
  const anterior = el.nivel.value;
  el.nivel.replaceChildren();
  datos.forEach((n, i) => {
    const op = document.createElement("option");
    op.value = String(i);
    op.textContent = `#${i + 1} ${n.nombre}`;
    el.nivel.appendChild(op);
  });
  if (anterior && Number(anterior) < datos.length) el.nivel.value = anterior;
  dibujar();
}

function nivelActual() {
  const n = datos[Number(el.nivel.value) || 0];
  if (n && !Array.isArray(n.leaderboard)) n.leaderboard = [];
  return n;
}

function hayCambios() {
  el.guardar.disabled = false;
  mostrarEstado("Cambios sin guardar.");
}

function boton(texto, etiqueta, clase, onClick, desactivado) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "icon-btn" + (clase ? " " + clase : "");
  b.textContent = texto;
  b.setAttribute("aria-label", etiqueta);
  b.disabled = !!desactivado;
  b.addEventListener("click", onClick);
  return b;
}

function dibujar() {
  const nivel = nivelActual();
  el.lista.replaceChildren();
  if (!nivel) { el.vacio.hidden = false; return; }
  const lb = nivel.leaderboard;
  el.vacio.hidden = lb.length > 0;

  lb.forEach((entrada, i) => {
    const li = document.createElement("li");
    li.className = "edit-row";

    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = `${i + 1}.`;

    const nombre = document.createElement("input");
    nombre.type = "text";
    nombre.value = entrada.jugador || "";
    nombre.setAttribute("aria-label", `Jugador ${i + 1}`);
    nombre.addEventListener("input", () => { entrada.jugador = nombre.value; hayCambios(); });

    const fecha = document.createElement("input");
    fecha.type = "text";
    fecha.className = "fecha";
    fecha.value = entrada.fecha || "";
    fecha.placeholder = "Fecha";
    fecha.setAttribute("aria-label", `Fecha del jugador ${i + 1}`);
    fecha.addEventListener("input", () => {
      if (fecha.value.trim()) entrada.fecha = fecha.value; else delete entrada.fecha;
      hayCambios();
    });

    const acciones = document.createElement("div");
    acciones.className = "acciones";
    acciones.append(
      boton("↑", "Subir", "", () => mover(i, -1), i === 0),
      boton("↓", "Bajar", "", () => mover(i, 1), i === lb.length - 1),
      boton("✕", "Quitar", "danger", () => quitar(i))
    );

    li.append(pos, nombre, fecha, acciones);
    el.lista.appendChild(li);
  });
}

function mover(i, delta) {
  const lb = nivelActual().leaderboard;
  const j = i + delta;
  if (j < 0 || j >= lb.length) return;
  [lb[i], lb[j]] = [lb[j], lb[i]];
  dibujar();
  hayCambios();
}

function quitar(i) {
  nivelActual().leaderboard.splice(i, 1);
  dibujar();
  hayCambios();
}

function anadirJugador() {
  const nivel = nivelActual();
  const nombre = el.nuevoJugador.value.trim();
  const fecha = el.nuevaFecha.value.trim();
  if (!nivel) return;
  if (!nombre) { mostrarEstado("Escribe el nombre del jugador.", "error"); el.nuevoJugador.focus(); return; }
  if (nivel.leaderboard.some((e) => String(e.jugador).trim().toLowerCase() === nombre.toLowerCase())) {
    mostrarEstado("Ese jugador ya está en la leaderboard de este nivel.", "error");
    return;
  }
  const entrada = { jugador: nombre };
  if (fecha) entrada.fecha = fecha;
  nivel.leaderboard.push(entrada);
  el.nuevoJugador.value = "";
  el.nuevaFecha.value = "";
  dibujar();
  hayCambios();
  el.nuevoJugador.focus();
}

function datosLimpios() {
  return datos.map((n) => {
    const lb = (n.leaderboard || [])
      .map((e) => {
        const limpio = { jugador: String(e.jugador || "").trim() };
        const f = String(e.fecha || "").trim();
        if (f) limpio.fecha = f;
        return limpio;
      })
      .filter((e) => e.jugador);
    return { ...n, leaderboard: lb };
  });
}

async function guardar() {
  const limpio = datosLimpios();
  el.guardar.disabled = true;
  mostrarEstado("Guardando…");
  try {
    const r = await api("PUT", {
      message: "Actualizar leaderboard desde la página Editar",
      content: aBase64(construirArchivo(limpio)),
      sha
    });
    sha = r.content.sha;
    datos = limpio;
    prepararSelector();
    mostrarEstado("Guardado. La web se actualizará en uno o dos minutos.", "ok");
  } catch (e) {
    el.guardar.disabled = false;
    mostrarEstado(explicarError(e), "error");
  }
}

function copiarArchivo() {
  const texto = construirArchivo(datosLimpios());
  const ok = () => mostrarEstado("Archivo copiado. Pégalo en niveles.js y sube los cambios con GitHub Desktop.", "ok");
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
}

/* ---------- Eventos ---------- */

el.tokenOk.addEventListener("click", () => {
  const valor = el.tokenInput.value.trim();
  if (!valor) {
    el.tokenEstado.textContent = "Pega primero el token.";
    el.tokenEstado.className = "status error";
    return;
  }
  token = valor;
  guardarToken(valor);
  el.tokenInput.value = "";
  cargar();
});

el.tokenInput.addEventListener("keydown", (e) => { if (e.key === "Enter") el.tokenOk.click(); });

el.desconectar.addEventListener("click", () => {
  borrarToken();
  token = "";
  el.editor.hidden = true;
  el.tokenBox.hidden = false;
  el.tokenEstado.textContent = "Desconectado. El token se ha borrado de este navegador.";
  el.tokenEstado.className = "status";
});

el.nivel.addEventListener("change", dibujar);
el.anadir.addEventListener("click", anadirJugador);
[el.nuevoJugador, el.nuevaFecha].forEach((c) =>
  c.addEventListener("keydown", (e) => { if (e.key === "Enter") anadirJugador(); }));
el.guardar.addEventListener("click", guardar);
el.copiarArchivo.addEventListener("click", copiarArchivo);

window.addEventListener("beforeunload", (e) => {
  if (!el.guardar.disabled) { e.preventDefault(); e.returnValue = ""; }
});

if (token) { cargar(); } else { el.tokenBox.hidden = false; }
