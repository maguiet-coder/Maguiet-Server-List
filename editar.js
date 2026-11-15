// Editor privado. Solo funciona con un token de GitHub que tenga permiso de
// escritura sobre el proyecto: sin él no se carga ni se puede cambiar nada.
const REPO = "maguiet-coder/Maguiet-Server-List", RUTA = "niveles.js";
const API = "https://api.github.com/repos/" + REPO;
const DIFICULTADES = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
const $ = (id) => document.getElementById(id);
let token = "", sha = "", niveles = [], packs = [];

const aviso = (t) => { $("estado").textContent = t; };

function h(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
}
function campo(titulo, valor, alCambiar, tipo) {
  const l = h("label", "", titulo);
  const i = h("input");
  i.type = tipo || "text";
  i.value = valor == null ? "" : valor;
  i.addEventListener("input", () => alCambiar(i.value));
  l.appendChild(i);
  return l;
}
function boton(texto, fn) {
  const b = h("button", "copy", texto);
  b.type = "button";
  b.addEventListener("click", fn);
  return b;
}
function cabecera(titulo, acciones) {
  const top = h("div", "ed-top");
  const acc = h("div", "ed-acc");
  acciones.forEach((a) => acc.appendChild(boton(a[0], a[1])));
  top.append(h("strong", "", titulo), acc);
  return top;
}

/* ---------- Acceso ---------- */

async function api(ruta, init) {
  const r = await fetch(API + ruta, Object.assign({}, init, {
    headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }
  }));
  if (!r.ok) { const e = new Error("error " + r.status); e.status = r.status; throw e; }
  return r.json();
}

function decodificar(b64) {
  const bin = atob(b64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

async function entrar(t, silencioso) {
  token = t;
  aviso("Comprobando acceso...");
  try {
    const repo = await api("");
    if (repo.permissions && repo.permissions.push === false) { const e = new Error("sin permiso"); e.status = 403; throw e; }
    const f = await api("/contents/" + RUTA);
    sha = f.sha;
    const d = new Function(decodificar(f.content) + ";return {NIVELES: NIVELES, PACKS: PACKS};")();
    niveles = d.NIVELES;
    packs = d.PACKS;
    try { localStorage.setItem("msl-token", t); } catch (e) {}
    $("acceso").hidden = true;
    $("panel").hidden = false;
    aviso("");
    pintar();
  } catch (e) {
    token = "";
    try { localStorage.removeItem("msl-token"); } catch (x) {}
    if (silencioso) aviso("");
    else aviso(e.status === 401 ? "El token no es válido." : e.status === 403 || e.status === 404
      ? "Este token no tiene acceso al proyecto." : "No se ha podido entrar (" + e.message + ").");
  }
}

$("entrar").addEventListener("click", () => {
  const t = $("token").value.trim();
  if (t) entrar(t, false); else aviso("Pega primero tu token de GitHub.");
});

$("salir").addEventListener("click", () => {
  token = "";
  try { localStorage.removeItem("msl-token"); } catch (e) {}
  $("token").value = "";
  $("panel").hidden = true;
  $("acceso").hidden = false;
  aviso("Sesión cerrada.");
});

/* ---------- Edición ---------- */

function mover(i, d) {
  const j = i + d;
  if (j < 0 || j >= niveles.length) return;
  [niveles[i], niveles[j]] = [niveles[j], niveles[i]];
  pintar();
}
function quitarNivel(i) {
  if (!confirm(`¿Eliminar "${niveles[i].nombre || "este nivel"}"?`)) return;
  const nombre = niveles[i].nombre;
  niveles.splice(i, 1);
  packs.forEach((p) => { p.niveles = p.niveles.filter((x) => x !== nombre); });
  pintar();
}

function pintarNiveles() {
  const c = $("ed-niveles");
  c.replaceChildren();
  niveles.forEach((n, i) => {
    const caja = h("div", "tool");
    caja.appendChild(cabecera(`#${i + 1} ${n.nombre || "Nivel nuevo"}`, [["↑", () => mover(i, -1)], ["↓", () => mover(i, 1)], ["Eliminar", () => quitarNivel(i)]]));
    caja.appendChild(campo("Nombre del nivel", n.nombre, (v) => {
      packs.forEach((p) => { p.niveles = p.niveles.map((x) => (x === n.nombre ? v : x)); });
      n.nombre = v;
    }));
    caja.appendChild(campo("Enlace del vídeo (YouTube)", n.video, (v) => { n.video = v; }));
    const f1 = h("div", "row");
    f1.append(campo("ID del nivel", n.id, (v) => { n.id = v; }), campo("Creador", n.creador, (v) => { n.creador = v; }));
    const f2 = h("div", "row");
    const ld = h("label", "", "Dificultad");
    const sel = h("select");
    DIFICULTADES.forEach((d) => sel.appendChild(h("option", "", d)));
    sel.value = n.dificultad;
    sel.addEventListener("change", () => { n.dificultad = sel.value; });
    ld.appendChild(sel);
    f2.append(campo("Puntos", n.puntos, (v) => { n.puntos = Number(v) || 0; }, "number"), ld);
    const lj = h("label", "", "Quién se lo ha pasado");
    const ta = h("textarea");
    ta.rows = 3;
    ta.placeholder = "Un jugador por línea. Fecha opcional tras una coma:\nMaguiet, 15/11/2026";
    ta.value = (n.leaderboard || []).map((r) => r.jugador + (r.fecha ? ", " + r.fecha : "")).join("\n");
    ta.addEventListener("input", () => {
      n.leaderboard = ta.value.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
        const k = l.indexOf(",");
        const jugador = (k < 0 ? l : l.slice(0, k)).trim();
        const fecha = k < 0 ? "" : l.slice(k + 1).trim();
        return fecha ? { jugador, fecha } : { jugador };
      });
    });
    lj.append(ta, h("span", "hint", "El primero de la lista es el primero que se lo pasó."));
    caja.append(f1, f2, lj);
    c.appendChild(caja);
  });
}

function pintarPacks() {
  const c = $("ed-packs");
  c.replaceChildren();
  packs.forEach((p, i) => {
    const caja = h("div", "tool");
    caja.appendChild(cabecera(p.nombre || "Pack nuevo", [["Eliminar", () => {
      if (confirm(`¿Eliminar el pack "${p.nombre}"?`)) { packs.splice(i, 1); pintarPacks(); }
    }]]));
    const fila = h("div", "row");
    fila.append(campo("Nombre del pack", p.nombre, (v) => { p.nombre = v; }), campo("Puntos extra", p.puntos, (v) => { p.puntos = Number(v) || 0; }, "number"));
    caja.append(fila, h("p", "hint", "Niveles del pack (hay que pasárselos todos para ganar el bonus):"));
    niveles.forEach((n) => {
      const l = h("label", "chk");
      const cb = h("input");
      cb.type = "checkbox";
      cb.checked = p.niveles.includes(n.nombre);
      cb.addEventListener("change", () => {
        p.niveles = cb.checked ? [...p.niveles, n.nombre] : p.niveles.filter((x) => x !== n.nombre);
      });
      l.append(cb, document.createTextNode(" " + (n.nombre || "(sin nombre)")));
      caja.appendChild(l);
    });
    c.appendChild(caja);
  });
}

function pintar() { pintarNiveles(); pintarPacks(); }

$("add-nivel").addEventListener("click", () => {
  niveles.push({ nombre: "", video: "", id: "", creador: "", puntos: 0, dificultad: "Hard Demon", leaderboard: [] });
  pintar();
  $("ed-niveles").lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
});
$("add-pack").addEventListener("click", () => {
  packs.push({ nombre: "", puntos: 0, niveles: [] });
  pintarPacks();
});

/* ---------- Publicar ---------- */

const texto = () =>
  "// Datos de la web. Se editan desde editar.html (solo con acceso al proyecto) o a mano.\n" +
  "// El PUESTO lo decide el ORDEN de la lista. Entre bloques va siempre una coma.\n" +
  "// Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon.\n" +
  "// Cada jugador de \"leaderboard\" es { \"jugador\": \"Nombre\", \"fecha\": \"opcional\" }.\n\n" +
  "const NIVELES = " + JSON.stringify(niveles, null, 2) + ";\n\n" +
  "// PACKS: quien completa TODOS los niveles de un pack gana sus puntos extra.\n" +
  "const PACKS = " + JSON.stringify(packs, null, 2) + ";\n";

$("publicar").addEventListener("click", async () => {
  if (niveles.some((n) => !n.nombre.trim())) { aviso("Todos los niveles necesitan nombre."); return; }
  aviso("Publicando...");
  try {
    let bin = "";
    new TextEncoder().encode(texto()).forEach((b) => { bin += String.fromCharCode(b); });
    const r = await api("/contents/" + RUTA, {
      method: "PUT",
      body: JSON.stringify({ message: "Actualizar niveles desde el editor", content: btoa(bin), sha })
    });
    sha = r.content.sha;
    aviso("¡Publicado! En 1 o 2 minutos se verá en la web.");
  } catch (e) {
    aviso(e.status === 409 || e.status === 422
      ? "El archivo ha cambiado desde que lo abriste. Recarga esta página y vuelve a intentarlo."
      : "No se ha podido publicar (" + e.message + ").");
  }
});

try { const guardado = localStorage.getItem("msl-token"); if (guardado) entrar(guardado, true); } catch (e) {}
