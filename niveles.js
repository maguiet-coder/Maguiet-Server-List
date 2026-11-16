// Datos de la web. Se editan desde editar.html (solo con acceso al proyecto) o a mano.
// El PUESTO lo decide el ORDEN de la lista. Entre bloques va siempre una coma.
// Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon.
// Cada jugador de "leaderboard" es { "jugador": "Nombre", "fecha": "opcional" }.

const NIVELES = [
  {
    "nombre": "Auditory Breaker",
    "video": "https://youtu.be/McaXulAUAek?si=rBhEjyAtMtKw2ZDu",
    "id": "51791710",
    "creador": "LazerBlitz",
    "puntos": 1200,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Ultimate MortalTerra",
    "video": "https://youtu.be/wmLmklrnO8I",
    "id": "140986997",
    "creador": "Maguiet",
    "puntos": 190,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Bioluminescence",
    "video": "https://youtu.be/eJvjpBpXw24?si=9V345hB54KLjSf2t",
    "id": "152397804",
    "creador": "Maguiet",
    "puntos": 45,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  }
];

// PACKS: quien completa TODOS los niveles de un pack gana sus puntos extra.
const PACKS = [
  {
    "nombre": "Pack Maguiet",
    "puntos": 50,
    "niveles": [
      "Ultimate MortalTerra",
      "Bioluminescence"
    ]
  }
];
