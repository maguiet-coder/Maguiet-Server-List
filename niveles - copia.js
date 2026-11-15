// =====================================================================
//  LISTA DE NIVELES  (este es el único archivo que tienes que tocar)
//
//  CÓMO AÑADIR UN NIVEL
//  1. Abre "anadir-nivel.html" en tu navegador, rellena los datos y pulsa
//     "Copiar código".
//  2. Pega ese código aquí abajo, dentro de la lista, antes del "];" final.
//  3. Guarda el archivo y sube los cambios con GitHub Desktop.
//
//  EL PUESTO LO DECIDE EL ORDEN
//  El primer nivel de la lista es el #1, el segundo el #2, y así sucesivamente.
//  Para cambiar un nivel de puesto, mueve su bloque { ... } hacia arriba o abajo.
//
//  DIFICULTADES: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon
//  VÍDEO: pega el enlace de YouTube tal cual, sirve cualquier formato.
//
//  AÑADIR A ALGUIEN A LA LEADERBOARD DE UN NIVEL
//  En "anadir-nivel.html" hay un segundo formulario (Añadir récord) que te da la línea
//  ya hecha. Pégala dentro de "leaderboard" de ese nivel. Formato:
//      { jugador: "Nombre", fecha: "15/11/2026" },
//  La fecha es opcional. El orden es el de llegada: el primero en pasárselo va arriba.
//
//  LA LEADERBOARD GENERAL (página "Leaderboard") se calcula sola: suma los puntos de
//  todos los niveles que ha completado cada jugador. Escribe el nombre siempre igual.
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

  // Pega aquí los niveles nuevos (antes del corchete de cierre)

];
