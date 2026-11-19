// =====================================================================
//  LOGROS
//  Aquí puedes cambiar nombres, iconos y números, o añadir los tuyos.
//  En la Leaderboard, junto al nombre, salen los 3 logros más importantes de cada jugador
//  y un "+X" con el resto. Al pulsar el "+X" se ven todos.
//
//  CATEGORIAS: id, nombre, desc y peso (lo importante que es la categoría; sirve para elegir los 3 que se muestran).
//  LOGROS:     categoria, nivel (1, 2, 3... es el escalón dentro de su categoría; define el color del aro),
//              icono, nombre, desc (corta), tipo y valor. "detalle" es opcional: una explicación más larga.
//
//  tipo:  puntos        -> puntos totales >= valor
//         completions   -> niveles completados >= valor
//         hardest       -> dificultad de su Hardest Completion >= valor ("Hard Demon"...)
//         packs         -> packs completados >= valor
//         todosPacks    -> ha completado todos los packs de la web
//         puesto        -> se ha pasado un nivel del puesto <= valor de la lista (Top 10, Top 3, #1)
//         ranking       -> su puesto en la leaderboard general es <= valor
//         primeros      -> es el primero en pasarse >= valor niveles
//         creados       -> es el creador de >= valor niveles de la lista
//         variedad      -> ha completado niveles de >= valor dificultades distintas
//         cuantos       -> ha completado >= cantidad niveles de dificultad valor o superior
//         todosNiveles  -> ha completado todos los niveles de la lista
//         todo          -> todos los niveles y todos los packs
// =====================================================================

const CATEGORIAS = [
  { id: "puntos", nombre: "Puntos", desc: "Por los puntos totales que has sumado, con los bonus de packs incluidos.", peso: 6 },
  { id: "hardest", nombre: "Hardest Completion", desc: "Según la dificultad del nivel que más puntos te da.", peso: 6 },
  { id: "ranking", nombre: "Clasificación", desc: "Por el puesto que ocupas en la leaderboard general.", peso: 5 },
  { id: "elite", nombre: "Élite", desc: "Por pasarte niveles de lo más alto de la lista.", peso: 5 },
  { id: "completista", nombre: "Completista", desc: "Por pasártelo todo.", peso: 5 },
  { id: "completions", nombre: "Completions", desc: "Por la cantidad de niveles de la lista que te has pasado.", peso: 4 },
  { id: "pioneros", nombre: "Pioneros", desc: "Por ser el primero en pasarte un nivel.", peso: 4 },
  { id: "especialistas", nombre: "Especialistas", desc: "Por acumular niveles difíciles.", peso: 4 },
  { id: "packs", nombre: "Packs", desc: "Por los packs de niveles que has completado enteros.", peso: 3 },
  { id: "creadores", nombre: "Creadores", desc: "Por tener niveles propios en la lista.", peso: 3 },
  { id: "variedad", nombre: "Variedad", desc: "Por haber probado dificultades distintas.", peso: 2 }
];

const LOGROS = [
  { id: "puntos-50", categoria: "puntos", nivel: 1, icono: "🌱", nombre: "Calentando", desc: "Suma 50 puntos.", tipo: "puntos", valor: 50 },
  { id: "puntos-250", categoria: "puntos", nivel: 2, icono: "🔥", nombre: "Cogiendo ritmo", desc: "Suma 250 puntos.", tipo: "puntos", valor: 250 },
  { id: "puntos-500", categoria: "puntos", nivel: 3, icono: "⚡", nombre: "Sin frenos", desc: "Suma 500 puntos.", tipo: "puntos", valor: 500 },
  { id: "puntos-1000", categoria: "puntos", nivel: 4, icono: "💎", nombre: "Bolsillos llenos", desc: "Suma 1000 puntos.", tipo: "puntos", valor: 1000 },
  { id: "puntos-2500", categoria: "puntos", nivel: 5, icono: "🏆", nombre: "Pa' la vitrina", desc: "Suma 2500 puntos.", tipo: "puntos", valor: 2500 },
  { id: "puntos-5000", categoria: "puntos", nivel: 6, icono: "🌠", nombre: "Fuera de órbita", desc: "Suma 5000 puntos.", tipo: "puntos", valor: 5000 },

  { id: "hard-easy", categoria: "hardest", nivel: 1, icono: "🐣", nombre: "Novato en demons", desc: "Tu Hardest Completion es un Easy Demon o superior.", tipo: "hardest", valor: "Easy Demon" },
  { id: "hard-medium", categoria: "hardest", nivel: 2, icono: "🦊", nombre: "Ya muerde", desc: "Tu Hardest Completion es un Medium Demon o superior.", tipo: "hardest", valor: "Medium Demon" },
  { id: "hard-hard", categoria: "hardest", nivel: 3, icono: "🐺", nombre: "Mano firme", desc: "Tu Hardest Completion es un Hard Demon o superior.", tipo: "hardest", valor: "Hard Demon" },
  { id: "hard-insane", categoria: "hardest", nivel: 4, icono: "💀", nombre: "Sin miedo", desc: "Tu Hardest Completion es un Insane Demon o superior.", tipo: "hardest", valor: "Insane Demon" },
  { id: "hard-extreme", categoria: "hardest", nivel: 5, icono: "☠️", nombre: "Locura total", desc: "Tu Hardest Completion es un Extreme Demon.", tipo: "hardest", valor: "Extreme Demon" },

  { id: "rank-10", categoria: "ranking", nivel: 1, icono: "📈", nombre: "En el top 10", desc: "Entra entre los 10 primeros de la leaderboard.", tipo: "ranking", valor: 10 },
  { id: "rank-3", categoria: "ranking", nivel: 2, icono: "🎖️", nombre: "En el podio", desc: "Entra entre los 3 primeros de la leaderboard.", tipo: "ranking", valor: 3 },
  { id: "rank-1", categoria: "ranking", nivel: 3, icono: "🐐", nombre: "El GOAT", desc: "Ocupa el primer puesto de la leaderboard.", tipo: "ranking", valor: 1 },

  { id: "top-10", categoria: "elite", nivel: 1, icono: "🥉", nombre: "Entre los 10 duros", desc: "Pásate un nivel del Top 10.", tipo: "puesto", valor: 10 },
  { id: "top-3", categoria: "elite", nivel: 2, icono: "🥈", nombre: "Con los grandes", desc: "Pásate un nivel del Top 3.", tipo: "puesto", valor: 3 },
  { id: "top-1", categoria: "elite", nivel: 3, icono: "🥇", nombre: "Jefe final", desc: "Pásate el nivel #1 de la lista.", tipo: "puesto", valor: 1 },

  { id: "todo-niveles", categoria: "completista", nivel: 1, icono: "🧩", nombre: "Lista completa", desc: "Pásate todos los niveles de la lista.", tipo: "todosNiveles", valor: 1 },
  { id: "todo-todo", categoria: "completista", nivel: 2, icono: "🗿", nombre: "Todo hecho", desc: "Todos los niveles y todos los packs.", tipo: "todo", valor: 1 },

  { id: "comp-1", categoria: "completions", nivel: 1, icono: "🎯", nombre: "Estreno", desc: "Pásate tu primer nivel de la lista.", tipo: "completions", valor: 1 },
  { id: "comp-5", categoria: "completions", nivel: 2, icono: "🏹", nombre: "Pillando el truco", desc: "Pásate 5 niveles.", tipo: "completions", valor: 5 },
  { id: "comp-10", categoria: "completions", nivel: 3, icono: "🛡️", nombre: "Ya es de la casa", desc: "Pásate 10 niveles.", tipo: "completions", valor: 10 },
  { id: "comp-25", categoria: "completions", nivel: 4, icono: "⚔️", nombre: "Mil intentos", desc: "Pásate 25 niveles.", tipo: "completions", valor: 25 },
  { id: "comp-50", categoria: "completions", nivel: 5, icono: "🏰", nombre: "Casi vive aquí", desc: "Pásate 50 niveles.", tipo: "completions", valor: 50 },
  { id: "comp-100", categoria: "completions", nivel: 6, icono: "🧱", nombre: "Inquilino fijo", desc: "Pásate 100 niveles.", tipo: "completions", valor: 100 },

  { id: "primero-1", categoria: "pioneros", nivel: 1, icono: "⭐", nombre: "Primer victor", desc: "Sé la primera persona en pasarte un nivel.", tipo: "primeros", valor: 1 },
  { id: "primero-3", categoria: "pioneros", nivel: 2, icono: "🚀", nombre: "Abriendo camino", desc: "Sé el primero en pasarte 3 niveles.", tipo: "primeros", valor: 3 },
  { id: "primero-5", categoria: "pioneros", nivel: 3, icono: "🧭", nombre: "Siempre el primero", desc: "Sé el primero en pasarte 5 niveles.", tipo: "primeros", valor: 5 },
  { id: "primero-10", categoria: "pioneros", nivel: 4, icono: "🏁", nombre: "Madrugador", desc: "Sé el primero en pasarte 10 niveles.", tipo: "primeros", valor: 10 },

  { id: "esp-hard3", categoria: "especialistas", nivel: 1, icono: "🔨", nombre: "Rompe-hards", desc: "Pásate 3 niveles Hard Demon o más difíciles.", tipo: "cuantos", valor: "Hard Demon", cantidad: 3 },
  { id: "esp-hard8", categoria: "especialistas", nivel: 2, icono: "🪓", nombre: "Hard de rutina", desc: "Pásate 8 niveles Hard Demon o más difíciles.", tipo: "cuantos", valor: "Hard Demon", cantidad: 8 },
  { id: "esp-insane3", categoria: "especialistas", nivel: 3, icono: "🌪️", nombre: "Insane de lunes", desc: "Pásate 3 niveles Insane Demon o más difíciles.", tipo: "cuantos", valor: "Insane Demon", cantidad: 3 },
  { id: "esp-extreme3", categoria: "especialistas", nivel: 4, icono: "🌋", nombre: "Extreme en serie", desc: "Pásate 3 niveles Extreme Demon.", tipo: "cuantos", valor: "Extreme Demon", cantidad: 3 },

  { id: "pack-1", categoria: "packs", nivel: 1, icono: "📦", nombre: "Primer pack", desc: "Completa tu primer pack.", tipo: "packs", valor: 1 },
  { id: "pack-3", categoria: "packs", nivel: 2, icono: "🎁", nombre: "Va por el tercero", desc: "Completa 3 packs.", tipo: "packs", valor: 3 },
  { id: "pack-5", categoria: "packs", nivel: 3, icono: "🗝️", nombre: "Pack tras pack", desc: "Completa 5 packs.", tipo: "packs", valor: 5 },
  { id: "pack-todos", categoria: "packs", nivel: 4, icono: "🗃️", nombre: "Se los sabe todos", desc: "Completa todos los packs.", tipo: "todosPacks", valor: 1 },

  { id: "crea-1", categoria: "creadores", nivel: 1, icono: "🎨", nombre: "Nivel propio", desc: "Ten un nivel tuyo en la lista.", tipo: "creados", valor: 1 },
  { id: "crea-3", categoria: "creadores", nivel: 2, icono: "🛠️", nombre: "Manitas", desc: "Ten 3 niveles tuyos en la lista.", tipo: "creados", valor: 3 },
  { id: "crea-5", categoria: "creadores", nivel: 3, icono: "🏗️", nombre: "Fábrica de niveles", desc: "Ten 5 niveles tuyos en la lista.", tipo: "creados", valor: 5 },

  { id: "var-3", categoria: "variedad", nivel: 1, icono: "🎲", nombre: "De todo un poco", desc: "Pásate niveles de 3 dificultades distintas.", tipo: "variedad", valor: 3 },
  { id: "var-4", categoria: "variedad", nivel: 2, icono: "🌈", nombre: "Para todos los gustos", desc: "Pásate niveles de 4 dificultades distintas.", tipo: "variedad", valor: 4 },
  { id: "var-5", categoria: "variedad", nivel: 3, icono: "🧪", nombre: "Lo ha probado todo", desc: "Pásate niveles de las 5 dificultades.", tipo: "variedad", valor: 5 }
];
