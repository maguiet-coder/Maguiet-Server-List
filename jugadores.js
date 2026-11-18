// Cálculo común de jugadores, puntos, packs y logros. Lo usan la Leaderboard y la página Logros.
(function () {
  const ORDEN_DIF = ["Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"];
  const num = (n) => Number(n) || 0;
  const norm = (s) => String(s || "").trim().toLowerCase();

  function calcularJugadores() {
    const niveles = typeof NIVELES === "undefined" ? [] : NIVELES;
    const packs = typeof PACKS === "undefined" ? [] : PACKS;
    const mapa = new Map();

    niveles.forEach((nivel, i) => (nivel.leaderboard || []).forEach((r, k) => {
      const nombre = String(r.jugador || "").trim();
      if (!nombre) return;
      const clave = nombre.toLowerCase();
      if (!mapa.has(clave)) mapa.set(clave, { nombre, puntos: 0, completions: [], packs: [], primeros: 0, creados: 0, difs: new Set(), difMax: -1 });
      const j = mapa.get(clave);
      if (j.completions.some((c) => c.nivel === nivel)) return;
      j.completions.push({ nivel, puesto: i + 1, fecha: r.fecha || "" });
      j.puntos += num(nivel.puntos);
      if (k === 0) j.primeros++; // el primero de la leaderboard del nivel es su first victor
      j.difs.add(nivel.dificultad);
      j.difMax = Math.max(j.difMax, ORDEN_DIF.indexOf(nivel.dificultad));
    }));

    mapa.forEach((j) => {
      // Primero las completions que más puntos dan; la primera es la Hardest Completion
      j.completions.sort((a, b) => num(b.nivel.puntos) - num(a.nivel.puntos) || a.puesto - b.puesto);
      j.hardest = j.completions[0];
      j.creados = niveles.filter((n) => norm(n.creador) === norm(j.nombre)).length;
      const hechos = j.completions.map((c) => c.nivel.nombre);
      packs.forEach((p) => {
        if (p.niveles.length && p.niveles.every((n) => hechos.includes(n))) {
          j.packs.push(p);
          j.puntos += num(p.puntos);
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

    const ctx = {
      totalNiveles: niveles.length,
      totalPacks: packs.length,
      difsPresentes: new Set(niveles.map((n) => n.dificultad))
    };
    return { lista, ctx };
  }

  /* ---------- Definición de logros ---------- */

  const L = (id, emoji, nombre, corta, larga, cumple) => ({ id, emoji, nombre, corta, larga, cumple });

  const porPuntos = [
    [50, "🌱", "Primeros puntos", "Todo empieza con los primeros puntos."],
    [150, "⭐", "Promesa", "Ya empiezas a sonar en la lista."],
    [300, "🌟", "Veterano", "Un jugador que se hace notar."],
    [600, "💫", "Élite", "Ya juegas en la liga de los mejores."],
    [1000, "💎", "Leyenda", "Mil puntos no los tiene cualquiera."],
    [2000, "🏆", "Inmortal", "Casi nadie llega hasta aquí."]
  ].map(([n, e, nombre, frase]) => L("puntos" + n, e, nombre, `Suma ${n} puntos.`,
    `Alcanza ${n} puntos totales en la leaderboard. Cuentan los puntos de cada nivel que te has pasado y los bonus de los packs completos. ${frase}`,
    (j) => j.puntos >= n));

  const porDificultad = [
    ["Easy Demon", "🟡", "Primer demon", "la puerta de entrada al mundo de los demons"],
    ["Medium Demon", "🟠", "Demon medio", "un paso serio por encima de los Easy"],
    ["Hard Demon", "🔥", "Demon duro", "aquí empieza lo difícil de verdad"],
    ["Insane Demon", "💀", "Insane", "solo para jugadores muy constantes"],
    ["Extreme Demon", "☠️", "Extreme", "lo más alto de la lista"]
  ].map(([dif, e, nombre, frase], idx) => L("dif" + idx, e, nombre, `Completa un ${dif}.`,
    `Completa al menos un nivel de dificultad ${dif} o superior de la lista. Cuenta el nivel más difícil que te hayas pasado: ${frase}.`,
    (j) => j.difMax >= idx));

  const porNiveles = [
    [1, "🎯", "Primer nivel", "Completa tu primer nivel de la lista."],
    [5, "🎮", "Jugador habitual", "Completa 5 niveles."],
    [10, "🕹️", "Constante", "Completa 10 niveles."],
    [25, "🏅", "Coleccionista", "Completa 25 niveles."],
    [50, "🏰", "Rey de la lista", "Completa 50 niveles."]
  ].map(([n, e, nombre, corta]) => L("niveles" + n, e, nombre, corta,
    `Completa ${n === 1 ? "al menos un nivel" : n + " niveles distintos"} de la lista. Cada nivel cuenta una sola vez, sin importar su dificultad.`,
    (j) => j.completions.length >= n));

  const TEMAS = [
    { id: "puntos", titulo: "Hitos de puntos", escalonado: true, descripcion: "Puntos totales de la leaderboard.", logros: porPuntos },
    { id: "dificultad", titulo: "Dificultad del Hardest", escalonado: true, descripcion: "El nivel más difícil que te hayas pasado.", logros: porDificultad },
    { id: "niveles", titulo: "Niveles completados", escalonado: true, descripcion: "Cuántos niveles distintos te has pasado.", logros: porNiveles },
    { id: "packs", titulo: "Packs", escalonado: true, descripcion: "Completar todos los niveles de un pack.", logros: [
      L("pack1", "📦", "Primer pack", "Completa un pack entero.", "Pásate todos los niveles de un pack para ganar su bonus de puntos. Es el primer pack de tu colección.", (j) => j.packs.length >= 1),
      L("pack3", "🎁", "Maestro de packs", "Completa 3 packs.", "Completa tres packs distintos, con todos los niveles de cada uno. Los bonus de puntos se suman a tu total.", (j) => j.packs.length >= 3),
      L("packTodos", "🗃️", "Todos los packs", "Completa todos los packs.", "Completa absolutamente todos los packs que haya en la web. Si se añade un pack nuevo, tendrás que completarlo también para conservarlo.", (j, c) => c.totalPacks >= 1 && j.packs.length === c.totalPacks)
    ] },
    { id: "posicion", titulo: "Posición en la leaderboard", escalonado: true, descripcion: "Tu puesto actual en la clasificación general.", logros: [
      L("top10", "🥉", "Top 10", "Entra entre los 10 primeros.", "Estar entre los 10 primeros puestos de la leaderboard general. Cambia según evolucione la clasificación: se tiene mientras estés ahí.", (j) => j.puesto <= 10),
      L("top3", "🥈", "Top 3", "Entra en el podio.", "Estar entre los 3 primeros puestos de la leaderboard general. Cambia según evolucione la clasificación: se tiene mientras estés ahí.", (j) => j.puesto <= 3),
      L("top1", "🥇", "Top 1", "Ocupa el primer puesto.", "Ser el número 1 de la leaderboard general. Si hay empate a puntos en cabeza, comparten el puesto. Se tiene mientras estés ahí.", (j) => j.puesto === 1)
    ] },
    { id: "especiales", titulo: "Especiales", escalonado: false, descripcion: "Hitos distintos que se ganan de formas muy diferentes.", logros: [
      L("victor1", "🚩", "Primer victor", "Sé el primero en pasarte un nivel.", "Ser el primer jugador de la leaderboard de un nivel, es decir, el primero en completarlo.", (j) => j.primeros >= 1),
      L("victor3", "🏁", "Pionero", "Primer victor de 3 niveles.", "Ser el primero en completar tres niveles distintos de la lista. Hay que ser rápido.", (j) => j.primeros >= 3),
      L("creador1", "🎨", "Creador", "Ten un nivel tuyo en la lista.", "Que al menos uno de los niveles de la lista figure con tu nombre como creador.", (j) => j.creados >= 1),
      L("creador3", "🏗️", "Arquitecto", "Ten 3 niveles tuyos en la lista.", "Ser el creador de tres niveles de la lista. Un verdadero constructor.", (j) => j.creados >= 3),
      L("todoterreno", "🌈", "Todoterreno", "Completa todas las dificultades.", "Completa al menos un nivel de cada una de las dificultades que haya en la lista, desde la más fácil hasta la más difícil.", (j, c) => c.difsPresentes.size >= 2 && [...c.difsPresentes].every((d) => j.difs.has(d))),
      L("completista", "🧩", "Completista", "Pásate todos los niveles de la lista.", "Completa todos y cada uno de los niveles de la lista. Si se añade un nivel nuevo, tendrás que pasártelo también para conservarlo.", (j, c) => c.totalNiveles >= 3 && j.completions.length === c.totalNiveles)
    ] }
  ];

  // Qué símbolos se muestran junto al nombre: en los temas escalonados solo el más alto; en los demás, todos
  function simbolosDe(j, ctx) {
    const out = [];
    TEMAS.forEach((t) => {
      const ganados = t.logros.filter((l) => l.cumple(j, ctx));
      if (t.escalonado) { if (ganados.length) out.push(ganados[ganados.length - 1]); }
      else out.push(...ganados);
    });
    return out;
  }

  window.calcularJugadores = calcularJugadores;
  window.TEMAS_LOGROS = TEMAS;
  window.simbolosDe = simbolosDe;
})();
