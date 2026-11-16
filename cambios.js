// Dibuja el historial de cambios agrupado por día. No hace falta tocarlo.
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

const cont = document.getElementById("cambios-list");
document.getElementById("list-empty").hidden = CAMBIOS.length > 0;

const porFecha = new Map();
CAMBIOS.forEach((c) => {
  if (!porFecha.has(c.fecha)) porFecha.set(c.fecha, []);
  porFecha.get(c.fecha).push(c);
});

[...porFecha.keys()].sort().reverse().forEach((fecha) => {
  const dia = el("section", "cambios-dia");
  dia.appendChild(el("h2", "fecha-titulo", fecha.split("-").reverse().join("/")));
  const ul = el("ul", "row-list cambios-list");
  porFecha.get(fecha).forEach((c) => {
    const li = el("li");
    const chip = el("span", "chip", ETIQUETAS[c.tipo] || "Cambio");
    chip.dataset.tipo = c.tipo;
    li.append(chip, el("span", "", c.texto));
    ul.appendChild(li);
  });
  dia.appendChild(ul);
  cont.appendChild(dia);
});
