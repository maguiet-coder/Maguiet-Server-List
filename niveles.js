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
      },
      {
        "jugador": "YtNeux"
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
      },
      {
        "jugador": "YtNeux"
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
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "iSpyWithMyLittleEye",
    "video": "https://youtu.be/Ow7nDnZTbDw?si=sZwpqKisu6eFdejC",
    "id": "89886591",
    "creador": "Voxicat",
    "puntos": 67,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Blue Hell",
    "video": "https://youtu.be/UX-PzYOaNjc?si=39HQ3JlXRHlm2nzb",
    "id": "11317271",
    "creador": "LaZye",
    "puntos": 65,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Platinum Adventure",
    "video": "https://youtu.be/DWGGjNnU5CA?si=hM0CAOyWZdleN9ew",
    "id": "5904109",
    "creador": "Jerry4",
    "puntos": 62,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Retro Circles",
    "video": "https://youtu.be/yVxKTQPzyus?si=2oU6gtG1Gr-jVpvqhttps://youtu.be/yVxKTQPzyus?si=2oU6gtG1Gr-jVpvq",
    "id": "14000484",
    "creador": "Nacho21",
    "puntos": 60,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "The Lightning Road",
    "video": "https://youtu.be/smwunc7UiHk?si=fNBK7wVMjimQ7RV8",
    "id": "55520",
    "creador": "Timeless Real",
    "puntos": 58,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "The Nightmare",
    "video": "https://youtu.be/i0dlZgqA8ds?si=zPd3FERdKPVGcLMO",
    "id": "13519",
    "creador": "Jax",
    "puntos": 57,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Deadlocked",
    "video": "https://youtu.be/DXB4WXd8i-0?si=2GhOIyZcT9YFbfY8",
    "id": "None",
    "creador": "RobTop",
    "puntos": 56,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Astral [GD]"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Theory of everything 2",
    "video": "https://youtu.be/1YI4oUUiV80?si=8xRYvK-7Bszzogsv",
    "id": "None",
    "creador": "RobTop",
    "puntos": 55,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Clubstep",
    "video": "https://youtu.be/VInQkeec188?si=LHSS5O8zU0z81KHY",
    "id": "None",
    "creador": "RobTop",
    "puntos": 54,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
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
  },
  {
    "nombre": "RobTop Demons",
    "puntos": 125,
    "niveles": [
      "Clubstep",
      "Theory of everything 2",
      "Deadlocked"
    ]
  }
];
