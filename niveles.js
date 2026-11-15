// =====================================================================
//  NIVELES, LEADERBOARDS Y PACKS DE LA WEB
//  Este es el único archivo que tienes que editar para cambiar la lista.
//
//  ► El PUESTO lo decide el ORDEN: el primer nivel es el #1, el segundo el #2...
//  ► Entre un bloque { ... } y el siguiente va SIEMPRE una coma.
//  ► Los textos van entre comillas rectas "así". Los puntos, sin comillas.
//  ► Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon
//  ► Vídeo: vale cualquier enlace de YouTube.
//
//  PLANTILLA DE UN NIVEL (cópiala entera, pégala debajo del último y cambia los datos):
//
//  {
//    nombre: "Nombre del nivel",
//    video: "https://youtu.be/XXXXXXXXXXX",
//    id: "123456789",
//    creador: "Creador",
//    puntos: 100,
//    dificultad: "Hard Demon",
//    leaderboard: [
//      { jugador: "Nombre", fecha: "15/11/2026" },
//    ]
//  },
//
//  LEADERBOARD DE UN NIVEL: una línea por jugador dentro de "leaderboard".
//  El primero que se lo pasó va arriba. La fecha es opcional: { jugador: "Nombre" },
//  Escribe el nombre del jugador siempre igual en todos los niveles.
// =====================================================================

const NIVELES = [
  {
    nombre: "Ultimate MortalTerra",
    video: "https://youtu.be/wmLmklrnO8I",
    id: "140986997",
    creador: "Maguiet",
    puntos: 200,
    dificultad: "Hard Demon",
    leaderboard: [
      { jugador: "Maguiet" },
    ]
  },

  {
    nombre: "Bioluminescence",
    video: "https://youtu.be/eJvjpBpXw24?si=9V345hB54KLjSf2t",
    id: "152397804",
    creador: "Maguiet",
    puntos: 35,
    dificultad: "Easy Demon",
    leaderboard: [
      { jugador: "Maguiet" },
    ]
  },

  // Pega aquí los niveles nuevos (antes del corchete de cierre)

];

// =====================================================================
//  PACKS: si un jugador completa TODOS los niveles de un pack, gana los
//  puntos extra. Los nombres de "niveles" deben ser IGUALES a los de arriba.
//  (Este pack es un ejemplo: cámbialo o bórralo.)
// =====================================================================

const PACKS = [
  {
    nombre: "Pack Maguiet",
    puntos: 50,
    niveles: ["Ultimate MortalTerra", "Bioluminescence"]
  },

  // Pega aquí los packs nuevos
];
