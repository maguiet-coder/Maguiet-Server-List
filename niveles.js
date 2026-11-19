// Datos de la web. Se editan desde editar.html (solo con acceso al proyecto) o a mano.
// El PUESTO lo decide el ORDEN de la lista. Entre bloques va siempre una coma.
// Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon.
// Cada jugador de "leaderboard" es { "jugador": "Nombre", "fecha": "opcional" }.

const NIVELES = [
  {
    "nombre": "Ultimate MortalTerra",
    "video": "https://youtu.be/wmLmklrnO8I",
    "id": "140986997",
    "creador": "Maguiet",
    "puntos": 200,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "B",
    "video": "https://youtu.be/ohKPqGxotao?si=576g5WnJ3NzL4S6q",
    "id": "34085027",
    "creador": "Motleyorc",
    "puntos": 145,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Electrodynamix v2",
    "video": "https://youtu.be/LO6_3xeI-BA?si=IbKX_WU3KRiYcDFZ",
    "id": "839175",
    "creador": "iiiNePtunEiii",
    "puntos": 140,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Bioluminescence",
    "video": "https://youtu.be/eJvjpBpXw24?si=9V345hB54KLjSf2t",
    "id": "152397804",
    "creador": "Maguiet",
    "puntos": 75,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Shiver",
    "video": "https://youtu.be/TRcvzgpTMO8?si=cjeIVIpm3SEUruJx",
    "id": "56210242",
    "creador": "SpKale",
    "puntos": 70,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "iSpyWithMyLittleEye",
    "video": "https://youtu.be/Ow7nDnZTbDw?si=sZwpqKisu6eFdejC",
    "id": "89886591",
    "creador": "Voxicat",
    "puntos": 0,
    "dificultad": "Hard Demon",
    "leaderboard": []
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
