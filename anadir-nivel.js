// Editor de la web: modifica los datos y los publica en GitHub.
const REPO = "maguiet-coder/Maguiet-Server-List", RUTA = "niveles.js";
const DIFICULTADES = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
const $ = (id) => document.getElementById(id);
let niveles = JSON.parse(JSON.stringify(NIVELES));
let packs = JSON.parse(JSON.stringify(PACKS));

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
function boton(texto, fn, cls) {
  const b = h("button", cls || "copy", texto);
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
    const lp = campo("Puntos", n.puntos, (v) => { n.puntos = Number(v) || 0; }, "number");
    const ld = h("label", "", "Dificultad");
    const sel = h("select");
    DIFICULTADES.forEach((d) => sel.appendChild(h("option", "", d)));
    sel.value = n.dificultad;
    sel.addEventListener("change", () => { n.dificultad = sel.value; });
    ld.appendChild(sel);
    f2.append(lp, ld);
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
    lj.appendChild(ta);
    lj.appendChild(h("span", "hint", "El primero de la lista es el primero que se lo pasó."));
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
    caja.appendChild(fila);
    caja.appendChild(h("p", "hint", "Niveles del pack (hay que pasárselos todos para ganar el bonus):"));
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

const estado = (t) => { $("estado").textContent = t; };
const texto = () => "// Datos de la web. Se editan desde la página \"Editar\" (menú lateral).\nconst NIVELES = " +
  JSON.stringify(niveles, null, 1) + ";\n\nconst PACKS = " + JSON.stringify(packs, null, 1) + ";\n";

function validar() {
  if (niveles.some((n) => !n.nombre.trim())) { estado("Todos los niveles necesitan nombre."); return false; }
  return true;
}

$("descargar").addEventListener("click", () => {
  if (!validar()) return;
  const a = h("a");
  a.href = URL.createObjectURL(new Blob([texto()], { type: "text/javascript" }));
  a.download = RUTA;
  a.click();
  estado("Descargado. Cópialo a la carpeta del proyecto, sustituyendo el niveles.js anterior.");
});

$("publicar").addEventListener("click", async () => {
  if (!validar()) return;
  const token = $("token").value.trim();
  if (!token) { estado("Pega primero tu token de GitHub (abajo tienes cómo conseguirlo)."); return; }
  try { localStorage.setItem("msl-token", token); } catch (e) {}
  estado("Publicando...");
  const url = `https://api.github.com/repos/${REPO}/contents/${RUTA}`;
  const cab = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };
  try {
    const actual = await fetch(url, { headers: cab });
    if (!actual.ok) throw new Error(actual.status === 401 || actual.status === 403 || actual.status === 404
      ? "el token no es válido o no tiene permiso sobre el repositorio" : "error " + actual.status);
    const { sha } = await actual.json();
    let bin = "";
    new TextEncoder().encode(texto()).forEach((b) => { bin += String.fromCharCode(b); });
    const r = await fetch(url, {
      method: "PUT",
      headers: { ...cab, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Actualizar niveles desde la web", content: btoa(bin), sha })
    });
    if (!r.ok) throw new Error("error " + r.status);
    estado("¡Publicado! En 1 o 2 minutos se verá en la web.");
  } catch (e) {
    estado("No se ha podido publicar: " + e.message + ".");
  }
});

try { $("token").value = localStorage.getItem("msl-token") || ""; } catch (e) {}
pintar();
