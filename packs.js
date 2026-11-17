if (typeof NIVELES === "undefined" || !Array.isArray(NIVELES)) {
  const aviso = document.getElementById("list-empty");
  aviso.hidden = false;
  aviso.textContent = "No se han podido cargar los niveles. Revisa que niveles.js esté bien escrito (comas, comillas y llaves).";
  throw new Error("NIVELES no está definido");
}
const packsLista = typeof PACKS === "undefined" ? [] : PACKS;
const cont = document.getElementById("pack-list");
document.getElementById("list-empty").hidden = packsLista.length > 0;

packsLista.forEach((pack) => {
  const li = document.createElement("li");
  const caja = document.createElement("article");
  caja.className = "pack";

  const cab = document.createElement("div");
  cab.className = "pack-head";
  const titulo = document.createElement("h2");
  titulo.textContent = pack.nombre;
  const bonus = document.createElement("span");
  bonus.className = "points";
  bonus.textContent = `+${pack.puntos} pts extra`;
  cab.append(titulo, bonus);

  const ul = document.createElement("ul");
  ul.className = "pack-levels";
  let suma = 0;
  pack.niveles.forEach((nombre) => {
    const i = NIVELES.findIndex((n) => n.nombre === nombre);
    const item = document.createElement("li");
    if (i < 0) { item.textContent = `${nombre} (este nivel ya no está en la lista)`; }
    else {
      suma += Number(NIVELES[i].puntos) || 0;
      item.append(`#${i + 1} ${nombre} `);
      const pts = document.createElement("span");
      pts.className = "date";
      pts.textContent = `${NIVELES[i].puntos} pts`;
      item.appendChild(pts);
    }
    ul.appendChild(item);
  });

  const total = document.createElement("p");
  total.className = "hint";
  total.textContent = `Pasándote todos: ${suma} pts de los niveles + ${pack.puntos} del pack = ${suma + (Number(pack.puntos) || 0)} pts.`;
  caja.append(cab, ul, total);
  li.appendChild(caja);
  cont.appendChild(li);
});
