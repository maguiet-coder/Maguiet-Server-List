// Cálculo común de jugadores y logros. Lo usan la Leaderboard y la página Logros.
// Necesita niveles.js y logros-datos.js cargados antes.
const Jug = (function () {
  const ORDEN_DIF = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
  const pts = (n) => Number(n) || 0;
  const logros = () => (typeof LOGROS === "undefined" ? [] : LOGROS);
  const categorias = () => (typeof CATEGORIAS === "undefined" ? [] : CATEGORIAS);
  const totalNiveles = () => (typeof NIVELES === "undefined" ? 0 : NIVELES.length);
  const totalPacks = () => (typeof PACKS === "undefined" ? 0 : PACKS.length);

  // Jugadores ordenados por puntos, con todo lo necesario para calcular sus logros
  function calcular() {
    const niveles = typeof NIVELES === "undefined" ? [] : NIVELES;
    const packs = typeof PACKS === "undefined" ? [] : PACKS;
    const mapa = new Map();

    niveles.forEach((nivel, i) => (nivel.leaderboard || []).forEach((r, k) => {
      const nombre = String(r.jugador || "").trim();
      if (!nombre) return;
      const clave = nombre.toLowerCase();
      if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, completions: [], packs: [], primeros: 0, creados: 0, difs: new Set() });
      const j = mapa.get(clave);
      if (j.completions.some((c) => c.nivel === nivel)) return;
      j.completions.push({ nivel, puesto: i + 1, fecha: r.fecha || "" });
      j.puntos += pts(nivel.puntos);
      if (k === 0) j.primeros++; // el primero de la leaderboard de un nivel es su first victor
      j.difs.add(nivel.dificultad);
    }));

    mapa.forEach((j) => {
      // Primero las completions que más puntos dan; la primera es la Hardest Completion
      j.completions.sort((a, b) => pts(b.nivel.puntos) - pts(a.nivel.puntos) || a.puesto - b.puesto);
      j.hardest = j.completions[0];
      j.creados = niveles.filter((n) => String(n.creador || "").trim().toLowerCase() === j.nombre.toLowerCase()).length;
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
      case "ranking": return j.puesto <= l.valor;
      case "creados": return j.creados >= l.valor;
      case "variedad": return j.difs.size >= l.valor;
      case "cuantos": return j.completions.filter((c) => ORDEN_DIF.indexOf(c.nivel.dificultad) >= ORDEN_DIF.indexOf(l.valor)).length >= l.cantidad;
      case "todosNiveles": return totalNiveles() >= 3 && j.completions.length === totalNiveles();
      case "todosPacks": return totalPacks() >= 1 && j.packs.length === totalPacks();
      case "todo": return totalNiveles() >= 3 && j.completions.length === totalNiveles() && totalPacks() >= 1 && j.packs.length === totalPacks();
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

  // Lo importante que es un logro: el peso de su categoría según lo alto que sea su escalón
  function importancia(l) {
    const cat = categorias().find((c) => c.id === l.categoria) || {};
    const maxNivel = Math.max(...logros().filter((x) => x.categoria === l.categoria).map((x) => x.nivel));
    return (cat.peso || 3) * (l.nivel / maxNivel);
  }

  // Todos los logros que tiene un jugador, del más importante al menos
  function porImportancia(j) {
    return logrosDe(j)
      .map((l, i) => ({ l, i, v: importancia(l) }))
      .sort((a, b) => b.v - a.v || b.l.nivel - a.l.nivel || a.i - b.i)
      .map((x) => x.l);
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
      case "ranking": return `Estar entre los ${v === 1 ? "primeros puestos (el 1º)" : v + " primeros puestos"} de la leaderboard general${v === 1 ? ", aunque sea empatado" : ""}. Cambia según evolucione la clasificación: se tiene mientras sigas ahí.`;
      case "creados": return `Que ${v === 1 ? "al menos un nivel" : v + " niveles"} de la lista figuren con tu nombre como creador. Los niveles propios también cuentan como niveles completados si te los has pasado.`;
      case "variedad": return `Pásate al menos un nivel de ${v} dificultades distintas, de Easy Demon a Extreme Demon. Una dificultad cuenta en cuanto te has pasado un nivel de ella.`;
      case "cuantos": return `Pásate ${l.cantidad} niveles distintos de dificultad ${v}${v === "Extreme Demon" ? "" : " o más difícil"}. Cuentan todos los que hayas completado de esa dificultad hacia arriba.`;
      case "todosNiveles": return "Pásate absolutamente todos los niveles de la lista (hace falta que haya al menos 3). Si se añade un nivel nuevo, tendrás que pasártelo también para conservarlo.";
      case "todosPacks": return "Completa todos los packs que haya en la web, con todos los niveles de cada uno. Si se añade un pack nuevo, tendrás que completarlo también para conservar el logro.";
      case "todo": return "Pásate todos los niveles de la lista y completa todos los packs. Es el logro más difícil de conservar: cualquier nivel o pack nuevo te obliga a ponerte al día.";
      default: return l.desc;
    }
  }

  return { pts, calcular, cumple, logrosDe, mejores, porImportancia, importancia, quienTiene, insignia, explicacion };
})();
