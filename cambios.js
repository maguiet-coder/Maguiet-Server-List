// Dibuja el historial de cambios: los de hoy en "Cambios recientes" y el resto en "Cambios antiguos".
const ETIQUETAS = {
  nivel: "Nuevo nivel", eliminado: "Eliminado", renombrado: "Nombre", puntos: "Puntos",
  dificultad: "Dificultad", puesto: "Puesto", record: "Récord", pack: "Pack", anuncio: "Anuncio"
};
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
};
const fechaHoy = () => {
  const d = new Date(), p = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const bonita = (f) => String(f).split("-").reverse().join("/");

// El nombre del nivel nuevo se resalta dentro del mensaje
function textoDe(c) {
  const t = el("span", "cambio-texto");
  const m = c.tipo === "nivel" && String(c.texto).match(/^Nuevo nivel: (.+?) (\(.*\)\.?)$/);
  if (m) t.append("Nuevo nivel: ", el("strong", "", m[1]), " " + m[2]);
  else t.textContent = c.texto;
  return t;
}

function listaDe(entradas) {
  const ul = el("ul", "row-list cambios-list");
  entradas.forEach((c) => {
    const li = el("li", c.tipo === "nivel" ? "cambio-nuevo" : "");
    const chip = el("span", "chip", c.tipo === "nivel" ? "✨ Nuevo nivel" : (ETIQUETAS[c.tipo] || "Cambio"));
    chip.dataset.tipo = c.tipo;
    li.append(chip, textoDe(c));
    ul.appendChild(li);
  });
  return ul;
}

const cont = document.getElementById("cambios-list");
// Los avisos de "X se ha pasado (nivel)" ya no se muestran, ni los antiguos
const visibles = CAMBIOS.filter((c) => c.tipo !== "record");
document.getElementById("list-empty").hidden = visibles.length > 0;

if (visibles.length) {
  const hoy = fechaHoy();
  const recientes = visibles.filter((c) => c.fecha >= hoy);
  const antiguos = visibles.filter((c) => c.fecha < hoy);

  const rec = el("section", "cambios-bloque");
  rec.append(el("h2", "bloque-titulo", "Cambios recientes"), el("p", "hint bloque-sub", `Los de hoy, ${bonita(hoy)}.`));
  rec.appendChild(recientes.length ? listaDe(recientes) : el("p", "empty", "Hoy no hay cambios. Los anteriores están en Cambios antiguos."));
  cont.appendChild(rec);

  if (antiguos.length) {
    const det = el("details", "antiguos");
    det.appendChild(el("summary", "", `Cambios antiguos (${antiguos.length})`));
    const cuerpo = el("div", "antiguos-cuerpo");
    const porFecha = new Map();
    antiguos.forEach((c) => {
      if (!porFecha.has(c.fecha)) porFecha.set(c.fecha, []);
      porFecha.get(c.fecha).push(c);
    });
    [...porFecha.keys()].sort().reverse().forEach((fecha) => {
      const dia = el("section", "cambios-dia");
      dia.append(el("h3", "fecha-titulo", bonita(fecha)), listaDe(porFecha.get(fecha)));
      cuerpo.appendChild(dia);
    });
    det.appendChild(cuerpo);
    cont.appendChild(det);
  }
}
