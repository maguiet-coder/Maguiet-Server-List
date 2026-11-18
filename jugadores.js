// Cálculo común de jugadores y logros. Lo usan la Leaderboard y la página Logros.
// Necesita niveles.js y logros-datos.js cargados antes.
const Jug = (function () {
  const ORDEN_DIF = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
  const pts = (n) => Number(n) || 0;
  const logros = () => (typeof LOGROS === "undefined" ? [] : LOGROS);
  const categorias = () => (typeof CATEGORIAS === "undefined" ? [] : CATEGORIAS);

  // Jugadores ordenados por puntos, con todo lo necesario para calcular sus logros
  function calcular() {
    const niveles = typeof NIVELES === "undefined" ? [] : NIVELES;
    const packs = typeof PACKS === "undefined" ? [] : PACKS;
    const mapa = new Map();

    niveles.forEach((nivel, i) => (nivel.leaderboard || []).forEach((r, k) => {
      const nombre = String(r.jugador || "").trim();
      if (!nombre) return;
      const clave = nombre.toLowerCase();
      if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, completions: [], packs: [], primeros: 0 });
      const j = mapa.get(clave);
      if (j.completions.some((c) => c.nivel === nivel)) return;
      j.completions.push({ nivel, puesto: i + 1, fecha: r.fecha || "" });
      j.puntos += pts(nivel.puntos);
      if (k === 0) j.primeros++; // el primero de la leaderboard de un nivel es su first victor
    }));

    mapa.forEach((j) => {
      // Primero las completions que más puntos dan; la primera es la Hardest Completion
      j.completions.sort((a, b) => pts(b.nivel.puntos) - pts(a.nivel.puntos) || a.puesto - b.puesto);
      j.hardest = j.completions[0];
      const hechos = j.completions.map((c) => c.nivel.nombre);
      packs.forEach((p) => {
        if (p.niveles.length && p.niveles.every((n) => hechos.includes(n))) {
          j.packs.push(p);
          j.puntos += pts(p.puntos);
        }
      });
    });

    const lista = [...mapa.values()].sort((a, b) =>
      b.puntos - a.puntos || b.completions.length - a.completions.length || a.nombre.localeCompare(b.nombre));
    let puesto = 1;
    lista.forEach((j, i) => {
      if (i > 0 && j.puntos < lista[i - 1].puntos) puesto = i + 1; // empates comparten puesto
      j.puesto = puesto;
    });
    return lista;
  }

  // ¿Cumple el jugador este logro?
  function cumple(l, j) {
    switch (l.tipo) {
      case "puntos": return j.puntos >= l.valor;
      case "completions": return j.completions.length >= l.valor;
      case "hardest": return ORDEN_DIF.indexOf(j.hardest.nivel.dificultad) >= ORDEN_DIF.indexOf(l.valor);
      case "packs": return j.packs.length >= l.valor;
      case "puesto": return j.completions.some((c) => c.puesto <= l.valor);
      case "primeros": return j.primeros >= l.valor;
      default: return false;
    }
  }

  const logrosDe = (j) => logros().filter((l) => cumple(l, j));

  // La mejor insignia (el escalón más alto) de cada categoría
  function mejores(j) {
    const ganados = logrosDe(j);
    return categorias()
      .map((c) => ganados.filter((l) => l.categoria === c.id).sort((a, b) => a.nivel - b.nivel).pop())
      .filter(Boolean);
  }

  const quienTiene = (l, lista) => lista.filter((j) => cumple(l, j));

  // Círculo con el emoji del logro; el color del aro depende del escalón
  function insignia(l, conTitulo) {
    const s = document.createElement("span");
    s.className = "logro";
    s.dataset.tier = l.nivel;
    s.textContent = l.icono;
    if (conTitulo !== false) s.title = `${l.nombre}: ${l.desc}`;
    return s;
  }

  // Explicación más detallada, generada a partir del tipo de logro (se puede sustituir con "detalle" en logros-datos.js)
  function explicacion(l) {
    if (l.detalle) return l.detalle;
    const v = l.valor;
    switch (l.tipo) {
      case "puntos": return `Alcanza ${v} puntos totales en la leaderboard. Cuentan los puntos de cada nivel que te has pasado y los bonus de los packs que hayas completado enteros.`;
      case "completions": return `Completa ${v === 1 ? "al menos un nivel" : v + " niveles distintos"} de la lista. Cada nivel cuenta una sola vez, sin importar su dificultad ni su puesto.`;
      case "hardest": return `Tu Hardest Completion, que es el nivel que más puntos te da de todos los que te has pasado, tiene que ser de dificultad ${v}${v === "Extreme Demon" ? "" : " o superior"}. Cuanto más difícil sea el nivel, más alto llegas.`;
      case "packs": return `Completa ${v === 1 ? "un pack entero" : v + " packs enteros"}: hay que pasarse todos los niveles de cada pack. Además de este logro, cada pack completado te da su bonus de puntos.`;
      case "puesto": return `Pásate al menos un nivel que esté en el puesto ${v} de la lista o por encima${v === 1 ? " (el #1, el más difícil)" : ""}. Si los niveles cambian de puesto, el logro se recalcula.`;
      case "primeros": return `Sé el primero de la leaderboard en ${v === 1 ? "un nivel" : v + " niveles"}. El primer victor de un nivel es quien aparece arriba del todo en su leaderboard.`;
      default: return l.desc;
    }
  }

  return { pts, calcular, cumple, logrosDe, mejores, quienTiene, insignia, explicacion };
})();
