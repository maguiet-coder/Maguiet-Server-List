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
    "puntos": 10835,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Broken Signal",
    "video": "https://youtu.be/-vTOc7mUeGA?si=t67c0VrEzwfdlZgg",
    "id": "69198628",
    "creador": "Grax",
    "puntos": 4595,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "conastinopla"
      }
    ]
  },
  {
    "nombre": "Ultimate MortalTerra",
    "video": "https://youtu.be/wmLmklrnO8I",
    "id": "140986997",
    "creador": "Maguiet",
    "puntos": 550,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Nine Circles",
    "video": "https://youtu.be/yrL1Zpo2Qso?si=CgeJy-PnmTIfyt8B",
    "id": "4284013",
    "creador": "Zobros",
    "puntos": 530,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "AXEL708"
      },
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Triad",
    "video": "https://youtu.be/CvzHeB2O0JA?si=e_eo-g2ywh-ozpZX",
    "id": "142024627",
    "creador": "Koishite",
    "puntos": 500,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Akineract",
    "video": "https://youtu.be/PYm7xbnQCvw?si=gGRAUhL_kY2fUUnI",
    "id": "135005345",
    "creador": "Inedite",
    "puntos": 350,
    "dificultad": "Medium Demon",
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
    "puntos": 80,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      },
      {
        "jugador": "LeXa [GD]"
      },
      {
        "jugador": "iPol"
      },
      {
        "jugador": "Quarius"
      },
      {
        "jugador": "NeuxGMD"
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
