// =====================================================================
//  LOGROS DE LA LEADERBOARD
//  Cada jugador gana insignias según sus puntos, sus completions, la dificultad
//  de su Hardest Completion, sus packs y los niveles del Top que se ha pasado.
//  En la Leaderboard solo se muestra, junto al nombre, la MEJOR insignia de cada
//  categoría. Aquí puedes cambiar nombres, iconos y números, o añadir más.
//
//  tipo:  puntos       -> puntos totales >= valor
//         completions  -> niveles completados >= valor
//         hardest      -> dificultad de su Hardest Completion >= valor ("Hard Demon"...)
//         packs        -> packs completados >= valor
//         puesto       -> se ha pasado un nivel del puesto <= valor (Top 10, Top 3, #1)
//         primeros     -> es el primero en pasarse >= valor niveles
//  nivel: 1, 2, 3... es el escalón dentro de su categoría (define el color del aro)
// =====================================================================

const CATEGORIAS = [
  { id: "puntos", nombre: "Puntos", desc: "Por los puntos totales que has sumado, con los bonus de packs incluidos." },
  { id: "completions", nombre: "Completions", desc: "Por la cantidad de niveles de la lista que te has pasado." },
  { id: "hardest", nombre: "Hardest Completion", desc: "Según la dificultad del nivel que más puntos te da." },
  { id: "packs", nombre: "Packs", desc: "Por los packs de niveles que has completado enteros." },
  { id: "elite", nombre: "Élite", desc: "Por pasarte niveles de lo más alto de la lista." },
  { id: "pioneros", nombre: "Pioneros", desc: "Por ser el primero en pasarte un nivel." }
];

const LOGROS = [
  { id: "puntos-50", categoria: "puntos", nivel: 1, icono: "🌱", nombre: "Primeros pasos", desc: "Suma 50 puntos.", tipo: "puntos", valor: 50 },
  { id: "puntos-250", categoria: "puntos", nivel: 2, icono: "🔥", nombre: "En racha", desc: "Suma 250 puntos.", tipo: "puntos", valor: 250 },
  { id: "puntos-500", categoria: "puntos", nivel: 3, icono: "⚡", nombre: "Imparable", desc: "Suma 500 puntos.", tipo: "puntos", valor: 500 },
  { id: "puntos-1000", categoria: "puntos", nivel: 4, icono: "💎", nombre: "Diamante", desc: "Suma 1000 puntos.", tipo: "puntos", valor: 1000 },
  { id: "puntos-2500", categoria: "puntos", nivel: 5, icono: "🏆", nombre: "Leyenda", desc: "Suma 2500 puntos.", tipo: "puntos", valor: 2500 },
  { id: "puntos-5000", categoria: "puntos", nivel: 6, icono: "🌠", nombre: "Inmortal", desc: "Suma 5000 puntos.", tipo: "puntos", valor: 5000 },

  { id: "comp-1", categoria: "completions", nivel: 1, icono: "🎯", nombre: "Debut", desc: "Pásate tu primer nivel de la lista.", tipo: "completions", valor: 1 },
  { id: "comp-5", categoria: "completions", nivel: 2, icono: "🏹", nombre: "Cazador", desc: "Pásate 5 niveles.", tipo: "completions", valor: 5 },
  { id: "comp-10", categoria: "completions", nivel: 3, icono: "🛡️", nombre: "Veterano", desc: "Pásate 10 niveles.", tipo: "completions", valor: 10 },
  { id: "comp-25", categoria: "completions", nivel: 4, icono: "⚔️", nombre: "Maestro", desc: "Pásate 25 niveles.", tipo: "completions", valor: 25 },
  { id: "comp-50", categoria: "completions", nivel: 5, icono: "🏰", nombre: "Gran maestro", desc: "Pásate 50 niveles.", tipo: "completions", valor: 50 },

  { id: "hard-easy", categoria: "hardest", nivel: 1, icono: "🐣", nombre: "Aprendiz", desc: "Tu Hardest Completion es un Easy Demon o superior.", tipo: "hardest", valor: "Easy Demon" },
  { id: "hard-medium", categoria: "hardest", nivel: 2, icono: "🦊", nombre: "Cazademonios", desc: "Tu Hardest Completion es un Medium Demon o superior.", tipo: "hardest", valor: "Medium Demon" },
  { id: "hard-hard", categoria: "hardest", nivel: 3, icono: "🐺", nombre: "Domador", desc: "Tu Hardest Completion es un Hard Demon o superior.", tipo: "hardest", valor: "Hard Demon" },
  { id: "hard-insane", categoria: "hardest", nivel: 4, icono: "💀", nombre: "Insano", desc: "Tu Hardest Completion es un Insane Demon o superior.", tipo: "hardest", valor: "Insane Demon" },
  { id: "hard-extreme", categoria: "hardest", nivel: 5, icono: "☠️", nombre: "Extremo", desc: "Tu Hardest Completion es un Extreme Demon.", tipo: "hardest", valor: "Extreme Demon" },

  { id: "pack-1", categoria: "packs", nivel: 1, icono: "📦", nombre: "Primer pack", desc: "Completa tu primer pack.", tipo: "packs", valor: 1 },
  { id: "pack-3", categoria: "packs", nivel: 2, icono: "🎁", nombre: "Maestro de packs", desc: "Completa 3 packs.", tipo: "packs", valor: 3 },
  { id: "pack-5", categoria: "packs", nivel: 3, icono: "🗝️", nombre: "Rey de los packs", desc: "Completa 5 packs.", tipo: "packs", valor: 5 },

  { id: "top-10", categoria: "elite", nivel: 1, icono: "🥉", nombre: "Élite", desc: "Pásate un nivel del Top 10.", tipo: "puesto", valor: 10 },
  { id: "top-3", categoria: "elite", nivel: 2, icono: "🥈", nombre: "Podio", desc: "Pásate un nivel del Top 3.", tipo: "puesto", valor: 3 },
  { id: "top-1", categoria: "elite", nivel: 3, icono: "🥇", nombre: "Cima", desc: "Pásate el nivel #1 de la lista.", tipo: "puesto", valor: 1 },

  { id: "primero-1", categoria: "pioneros", nivel: 1, icono: "⭐", nombre: "Primer victor", desc: "Sé la primera persona en pasarte un nivel.", tipo: "primeros", valor: 1 },
  { id: "primero-5", categoria: "pioneros", nivel: 2, icono: "🚀", nombre: "Pionero", desc: "Sé el primero en pasarte 5 niveles.", tipo: "primeros", valor: 5 }
];
