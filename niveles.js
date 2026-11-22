// Datos de la web. Se editan desde editar.html (solo con acceso al proyecto) o a mano.
// El PUESTO lo decide el ORDEN de la lista. Entre bloques va siempre una coma.
// Dificultades: Easy Demon, Medium Demon, Hard Demon, Insane Demon, Extreme Demon.
// Cada jugador de "leaderboard" es { "jugador": "Nombre", "fecha": "opcional" }.

const NIVELES = [
  {
    "nombre": "Auditory Breaker",
    "video": "https://www.youtube.com/watch?v=McaXulAUAek",
    "id": "51791710",
    "creador": "LazerBlitz",
    "puntos": 4084,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "WcropoliX",
    "video": "https://www.youtube.com/watch?v=kEUbS6X3BQI",
    "id": "22183448",
    "creador": "BlassCFB",
    "puntos": 3740,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Sakupen Hell",
    "video": "https://youtu.be/8kNzhz97mdA",
    "id": "23262780",
    "creador": "Trusta",
    "puntos": 3532,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "zZenyth"
      }
    ]
  },
  {
    "nombre": "Infinite Inversion",
    "video": "https://www.youtube.com/watch?v=6gvP5zfElrs",
    "id": "102807047",
    "creador": "fil",
    "puntos": 3528,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Tenth Circle",
    "video": "https://www.youtube.com/watch?v=sH78nDOyYyE",
    "id": "62592746",
    "creador": "DeniPol",
    "puntos": 3448,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Astrophobia",
    "video": "https://www.youtube.com/watch?v=Fe7mlL-F8Oo",
    "id": "94772024",
    "creador": "Jakalope",
    "puntos": 3348,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Azurite (royen)",
    "video": "https://www.youtube.com/watch?v=bN6HLttkcXc",
    "id": "59533451",
    "creador": "royen",
    "puntos": 3264,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Bloodbath",
    "video": "https://youtu.be/5UUFOB2CZfc",
    "id": "10565740",
    "creador": "Riot",
    "puntos": 3240,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "zZenyth"
      },
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Down Bass",
    "video": "https://www.youtube.com/watch?v=SSH1AIEs66A",
    "id": "8147005",
    "creador": "Exterys Valyrie",
    "puntos": 3152,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "aftermath",
    "video": "https://www.youtube.com/watch?v=4uhghY1yg-g",
    "id": "25610878",
    "creador": "Exenity",
    "puntos": 2600,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Cat Planet",
    "video": "https://www.youtube.com/watch?v=9UiQlAFdfVU",
    "id": "84766628",
    "creador": "icedcave",
    "puntos": 2548,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "sunburn",
    "video": "https://www.youtube.com/watch?v=TU3Clawj02s",
    "id": "73005068",
    "creador": "pocke",
    "puntos": 1988,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Convulsing Light",
    "video": "https://www.youtube.com/watch?v=LhvLMmFB16I",
    "id": "132904827",
    "creador": "Yerylik",
    "puntos": 1924,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "cerebral hemorrhage",
    "video": "https://www.youtube.com/watch?v=y2Z1m808O2Q",
    "id": "88853479",
    "creador": "NateFH",
    "puntos": 1848,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "In Circles",
    "video": "https://www.youtube.com/watch?v=os8v7iqaoXQ",
    "id": "119133802",
    "creador": "SomieStuff",
    "puntos": 1716,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Broken Signal",
    "video": "https://www.youtube.com/watch?v=ON1oDz0wTfc",
    "id": "69108628",
    "creador": "Grax",
    "puntos": 1588,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "conastinopla"
      },
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Our Fountain",
    "video": "https://www.youtube.com/watch?v=V9DPv9VlY_0",
    "id": "58023558",
    "creador": "LP44",
    "puntos": 1516,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Project alter",
    "video": "https://www.youtube.com/watch?v=U9nKJulKcmc",
    "id": "107641215",
    "creador": "soumpeixe",
    "puntos": 1324,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Crowd Control",
    "video": "https://www.youtube.com/watch?v=RhGxX3jGQDI",
    "id": "69491632",
    "creador": "Deadlox",
    "puntos": 1300,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "TROLLMACHINE",
    "video": "https://www.youtube.com/watch?v=mU6nDt7juac",
    "id": "84325817",
    "creador": "TROLLM4CHINE",
    "puntos": 1228,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "HyperSonic",
    "video": "https://www.youtube.com/watch?v=jp5gMCxP3HM",
    "id": "30219145",
    "creador": "ViPriN",
    "puntos": 1076,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Redemption",
    "video": "https://www.youtube.com/watch?v=Ka3a3dxSmlk",
    "id": "66851981",
    "creador": "Zest",
    "puntos": 952,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Tung Tung Sahurcles",
    "video": "https://www.youtube.com/watch?v=tSKiPAQKa7M",
    "id": "146066774",
    "creador": "Arraegen",
    "puntos": 816,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Bangarang",
    "video": "https://www.youtube.com/watch?v=v6V3QShwAQk",
    "id": "112515547",
    "creador": "LP44",
    "puntos": 776,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "8o X",
    "video": "https://www.youtube.com/watch?v=mNXs3qxoSCM",
    "id": "39641092",
    "creador": "f3lixsram",
    "puntos": 736,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Nove Cerchi",
    "video": "https://www.youtube.com/watch?v=MeYapNh-K_k",
    "id": "96002712",
    "creador": "LudiumGD",
    "puntos": 680,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Cataclysm",
    "video": "https://www.youtube.com/watch?v=yyfmevpOpkQ",
    "id": "3979721",
    "creador": "GgB0y",
    "puntos": 608,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Azurite (Sillow)",
    "video": "https://www.youtube.com/watch?v=zO7DhN8sp2g",
    "id": "62214792",
    "creador": "Sillow",
    "puntos": 468,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "No Survivors",
    "video": "https://www.youtube.com/watch?v=bYlPLRCpCmE",
    "id": "132458573",
    "creador": "Fawxu",
    "puntos": 424,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "niwa",
    "video": "https://www.youtube.com/watch?v=8XuF9rjJ0Z8",
    "id": "87425029",
    "creador": "Teno",
    "puntos": 372,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Sweater Weather",
    "video": "https://www.youtube.com/watch?v=C2p8gdP3yus",
    "id": "81148582",
    "creador": "VelYT",
    "puntos": 240,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Acu",
    "video": "https://youtu.be/cb0pGNFLa-g",
    "id": "61079355",
    "creador": "neigefeu",
    "puntos": 232,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "zZenyth"
      }
    ]
  },
  {
    "nombre": "Through The Decay",
    "video": "https://www.youtube.com/watch?v=vH1sx4XLnHI",
    "id": "114933189",
    "creador": "spark",
    "puntos": 224,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Precipitance",
    "video": "https://www.youtube.com/watch?v=MWUHH_j280Y",
    "id": "60197839",
    "creador": "Extravagon",
    "puntos": 220,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "rauchkammer",
    "video": "https://www.youtube.com/watch?v=Yls2tPTswsU",
    "id": "146399247",
    "creador": "Devilmine",
    "puntos": 212,
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
    "puntos": 110,
    "dificultad": "Hard Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Sakupen Egg",
    "video": "https://youtu.be/Htie8z4XLR4",
    "id": "58002670",
    "creador": "Sivlol",
    "puntos": 60,
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
    "nombre": "B",
    "video": "https://youtu.be/ohKPqGxotao?si=576g5WnJ3NzL4S6q",
    "id": "34085027",
    "creador": "Motleyorc",
    "puntos": 55,
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
    "puntos": 50,
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
    "nombre": "Bioluminescence",
    "video": "https://youtu.be/eJvjpBpXw24?si=9V345hB54KLjSf2t",
    "id": "152397804",
    "creador": "Maguiet",
    "puntos": 49,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      },
      {
        "jugador": "zZenyth"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Rip_IanOficial"
      }
    ]
  },
  {
    "nombre": "Impulse",
    "video": "https://www.youtube.com/watch?v=hMzQIllaUjI",
    "id": "393159",
    "creador": "MrCheeseTigrr",
    "puntos": 47,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Shiver",
    "video": "https://youtu.be/TRcvzgpTMO8?si=cjeIVIpm3SEUruJx",
    "id": "56210242",
    "creador": "SpKale",
    "puntos": 45,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Rip_IanOficial"
      }
    ]
  },
  {
    "nombre": "iS",
    "video": "https://www.youtube.com/watch?v=PF1n77uwi7g",
    "id": "65765662",
    "creador": "Grenate",
    "puntos": 43,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "Maguiet"
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
    "puntos": 40,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Blue Hell",
    "video": "https://youtu.be/UX-PzYOaNjc?si=39HQ3JlXRHlm2nzb",
    "id": "11317271",
    "creador": "LaZye",
    "puntos": 37,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Xstep v2",
    "video": "https://www.youtube.com/watch?v=j9Q0pTULhF8",
    "id": "341613",
    "creador": "IIINePtunEIII",
    "puntos": 35,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "Maguiet"
      },
      {
        "jugador": "YtNeux"
      }
    ]
  },
  {
    "nombre": "Demon Mixed",
    "video": "https://www.youtube.com/watch?v=DnuDa_tktnY",
    "id": "566659",
    "creador": "RealOggY",
    "puntos": 33,
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
    "nombre": "Platinum Adventure",
    "video": "https://youtu.be/DWGGjNnU5CA?si=hM0CAOyWZdleN9ew",
    "id": "5904109",
    "creador": "Jerry4",
    "puntos": 30,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Retro Circles",
    "video": "https://youtu.be/yVxKTQPzyus?si=2oU6gtG1Gr-jVpvqhttps://youtu.be/yVxKTQPzyus?si=2oU6gtG1Gr-jVpvq",
    "id": "14000484",
    "creador": "Nacho21",
    "puntos": 27,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Speed of Light",
    "video": "https://www.youtube.com/watch?v=bQPG5-aCVw0",
    "id": "5098465",
    "creador": "TheRealSalad",
    "puntos": 25,
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
    "nombre": "The Lightning Road",
    "video": "https://youtu.be/smwunc7UiHk?si=fNBK7wVMjimQ7RV8",
    "id": "55520",
    "creador": "Timeless Real",
    "puntos": 23,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "The Nightmare",
    "video": "https://youtu.be/i0dlZgqA8ds?si=zPd3FERdKPVGcLMO",
    "id": "13519",
    "creador": "Jax",
    "puntos": 20,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Deadlocked",
    "video": "https://youtu.be/DXB4WXd8i-0?si=2GhOIyZcT9YFbfY8",
    "id": "None",
    "creador": "RobTop",
    "puntos": 17,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Astral [GD]"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Theory of everything 2",
    "video": "https://youtu.be/1YI4oUUiV80?si=8xRYvK-7Bszzogsv",
    "id": "None",
    "creador": "RobTop",
    "puntos": 15,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  },
  {
    "nombre": "Clubstep",
    "video": "https://youtu.be/VInQkeec188?si=LHSS5O8zU0z81KHY",
    "id": "None",
    "creador": "RobTop",
    "puntos": 10,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      },
      {
        "jugador": "YtNeux"
      },
      {
        "jugador": "Maguiet"
      }
    ]
  }
];

// PACKS: quien completa TODOS los niveles de un pack gana sus puntos extra.
const PACKS = [
  {
    "nombre": "Maguiet Pack",
    "puntos": 100,
    "niveles": [
      "Ultimate MortalTerra",
      "Bioluminescence"
    ]
  },
  {
    "nombre": "RobTop Pack",
    "puntos": 75,
    "niveles": [
      "Clubstep",
      "Theory of everything 2",
      "Deadlocked"
    ]
  },
  {
    "nombre": "Beginner Pack",
    "puntos": 125,
    "niveles": [
      "The Nightmare",
      "The Lightning Road",
      "Platinum Adventure",
      "iSpyWithMyLittleEye",
      "iS"
    ]
  }
];
