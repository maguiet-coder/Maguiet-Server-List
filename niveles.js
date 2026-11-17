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
    "puntos": 9710,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "WcropoliX",
    "video": "https://youtu.be/kEUbS6X3BQI?si=J6ZvmcfofsfAg0eL",
    "id": "22183448",
    "creador": "BlassCFB",
    "puntos": 8850,
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
    "puntos": 8330,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "iPol"
      }
    ]
  },
  {
    "nombre": "Tenth Circle",
    "video": "https://youtu.be/sH78nDOyYyE?si=hIeVMuxaRA4Ec4E4",
    "id": "62592746",
    "creador": "DeniPol",
    "puntos": 8120,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Astrophobia",
    "video": "https://youtu.be/Fe7mlL-F8Oo?si=8IjaNFCyxS5zTKka",
    "id": "94772024",
    "creador": "Jakalope",
    "puntos": 7870,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Azurite (royen)",
    "video": "https://youtu.be/bN6HLttkcXc?si=dkQEolETl7JMJXhn",
    "id": "59533451",
    "creador": "royen",
    "puntos": 7660,
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
    "puntos": 7600,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "iPol"
      },
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Down Bass",
    "video": "https://youtu.be/SSH1AIEs66A?si=vSahoBy_WEnsi38t",
    "id": "8147005",
    "creador": "Spectruh",
    "puntos": 7380,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "aftermath",
    "video": "https://youtu.be/4uhghY1yg-g?si=knEbUTRpt8Z3SYyB",
    "id": "25610878",
    "creador": "IIExenityII",
    "puntos": 6000,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Cat Planet",
    "video": "https://youtu.be/9UiQlAFdfVU?si=tOu6re9txUtqiQoy",
    "id": "84766628",
    "creador": "IcEDCave",
    "puntos": 5870,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "sunburn",
    "video": "https://youtu.be/TU3Clawj02s?si=HN_eEixe5RL7TT_w",
    "id": "73005068",
    "creador": "pocke",
    "puntos": 4470,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Convulsing Light",
    "video": "https://youtu.be/LhvLMmFB16I?si=PTpOK15qOIFfAtmx",
    "id": "132904827",
    "creador": "Yerylik",
    "puntos": 4310,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "cerebral hemorrhage",
    "video": "https://youtu.be/y2Z1m808O2Q?si=sCPzUze1i0dKh6OI",
    "id": "88853479",
    "creador": "NateFH",
    "puntos": 4120,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "In Circles",
    "video": "https://youtu.be/os8v7iqaoXQ?si=fXBlcQPray6BAhQy",
    "id": "119133802",
    "creador": "Somie",
    "puntos": 3790,
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
    "puntos": 3470,
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
    "video": "https://youtu.be/V9DPv9VlY_0?si=IR6bXGVkSfUNocLC",
    "id": "58023558",
    "creador": "LP44",
    "puntos": 3290,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Project alter",
    "video": "https://youtu.be/U9nKJulKcmc?si=GiPteukCi6yx8-Ih",
    "id": "107641215",
    "creador": "soumpeixe",
    "puntos": 2810,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Crowd Control",
    "video": "https://youtu.be/RhGxX3jGQDI?si=Po_8ggpPE6ndjG5Y",
    "id": "69491632",
    "creador": "zDeadlox",
    "puntos": 2750,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "TROLLMACHINE",
    "video": "https://youtu.be/mU6nDt7juac?si=5m1dm4plhgs1cPiE",
    "id": "84325817",
    "creador": "TROLLM4CHINE",
    "puntos": 2570,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "HyperSonic",
    "video": "https://youtu.be/jp5gMCxP3HM?si=p9N94kUYD4Aux9cL",
    "id": "30219145",
    "creador": "ViPriN",
    "puntos": 2190,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Redemption",
    "video": "https://youtu.be/Ka3a3dxSmlk?si=6TBnKvQcjsKz7RUQ",
    "id": "66851981",
    "creador": "ZestWagon",
    "puntos": 1880,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Tung Tung Sahurcles",
    "video": "https://youtu.be/tSKiPAQKa7M?si=xlSJVehbx-stTV65",
    "id": "146066774",
    "creador": "ArraegenGD",
    "puntos": 1540,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Bangarang",
    "video": "https://youtu.be/v6V3QShwAQk?si=j-lld6lLIDvu9EOU",
    "id": "112515547",
    "creador": "LP44",
    "puntos": 1440,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "8o X",
    "video": "https://youtu.be/mNXs3qxoSCM?si=2zWp9wqwV9vOgqwN",
    "id": "39641092",
    "creador": "f3lixsram",
    "puntos": 1340,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Nove Cerchi",
    "video": "https://youtu.be/MeYapNh-K_k?si=9QVBvJeEEF1zcb5x",
    "id": "96002712",
    "creador": "LudiumGD",
    "puntos": 1200,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Cataclysm",
    "video": "https://youtu.be/yyfmevpOpkQ?si=9LPz6IvUMivCES_o",
    "id": "3979721",
    "creador": "Ggb0y",
    "puntos": 1020,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Azurite (Sillow)",
    "video": "https://youtu.be/7Cnu1ZEmqLg?si=sFvx5vAtRSyKx_SN",
    "id": "62214792",
    "creador": "Sillow",
    "puntos": 1670,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "No Survivors",
    "video": "https://youtu.be/bYlPLRCpCmE?si=yZH20sY_B8COvEa_",
    "id": "132458573",
    "creador": "Fawxu",
    "puntos": 1560,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "niwa",
    "video": "https://youtu.be/8XuF9rjJ0Z8?si=MItR8qwobc4j-a66",
    "id": "87425029",
    "creador": "Teno",
    "puntos": 1430,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Sweater Weather",
    "video": "https://youtu.be/C2p8gdP3yus?si=OAdP4plpEIia4Agt",
    "id": "81148582",
    "creador": "VelYT",
    "puntos": 1100,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Acu",
    "video": "https://youtu.be/m4mAJjgrx1g?si=75WAQfgU6-PV9ym9",
    "id": "61079355",
    "creador": "neigefeu",
    "puntos": 1080,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      },
      {
        "jugador": "iPol"
      }
    ]
  },
  {
    "nombre": "Through The Decay",
    "video": "https://youtu.be/vH1sx4XLnHI",
    "id": "114933189",
    "creador": "sparktwo",
    "puntos": 60,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "Precipitance",
    "video": "https://youtu.be/MWUHH_j280Y?si=6MTrpSTES835pPlK",
    "id": "60197839",
    "creador": "Extravagon",
    "puntos": 1050,
    "dificultad": "Extreme Demon",
    "leaderboard": [
      {
        "jugador": "LeXa [GD]"
      }
    ]
  },
  {
    "nombre": "rauchkammer",
    "video": "https://youtu.be/Yls2tPTswsU?si=KoSLslCEBEEbIQmV",
    "id": "146399247",
    "creador": "Devilmine",
    "puntos": 1030,
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
    "nombre": "Skeletal Shenanigans ",
    "video": "https://youtu.be/mgzTHUKATqo",
    "id": "118509879",
    "creador": "YoReid",
    "puntos": 380,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "B",
    "video": "https://youtu.be/ohKPqGxotao",
    "id": "34085027",
    "creador": "Motleyorc",
    "puntos": 360,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
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
      },
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Electrodinamix v2",
    "video": "https://youtu.be/PE6DD-98BKA",
    "id": "839175",
    "creador": "IIInePtuneIII",
    "puntos": 300,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Aiman89"
      }
    ]
  },
  {
    "nombre": "Take my hand",
    "video": "https://youtu.be/7uDySSZxxIk?si=YibkU2Ly8aEhwCOV",
    "id": "146273838",
    "creador": "LewinGD",
    "puntos": 100,
    "dificultad": "Medium Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Bioluminescence",
    "video": "https://youtu.be/eJvjpBpXw24?si=9V345hB54KLjSf2t",
    "id": "152397804",
    "creador": "Maguiet",
    "puntos": 78,
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
  },
  {
    "nombre": "Weird",
    "video": "https://youtu.be/AJwI0ngeSto?si=roIVocLqKpcOGE-x",
    "id": "76564776",
    "creador": "TheL2rty",
    "puntos": 73,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Shiver",
    "video": "https://youtu.be/TRcvzgpTMO8?si=sDryeU-ykpjQwohD",
    "id": "56210242",
    "creador": "SpKale",
    "puntos": 70,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Ispywithmylittleeye",
    "video": "https://youtu.be/Ow7nDnZTbDw?si=NuUXXL6DaQvhea2w",
    "id": "89886591",
    "creador": "Voxicat",
    "puntos": 65,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Speed Racer",
    "video": "https://youtu.be/R8RsJVKKd8w?si=wvyuLqyqJPDt37le",
    "id": "3543219",
    "creador": "ZentycAlpha",
    "puntos": 64,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Platinum Adventure",
    "video": "https://youtu.be/DWGGjNnU5CA?si=ncamFXkGxn6c5hbQ",
    "id": "5904109",
    "creador": "Jerry Bronce V",
    "puntos": 63,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "The Lightning Road",
    "video": "https://youtu.be/f3JAFKnY9Tw?si=bMQTAAlljkNxYZIu",
    "id": "55520",
    "creador": "Timeless Real",
    "puntos": 62,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "The Nightmare",
    "video": "https://youtu.be/i0dlZgqA8ds?si=tzgMOEmghs0Es4oF",
    "id": "13519",
    "creador": "Jax",
    "puntos": 60,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "Teory of everything 2",
    "video": "https://www.youtube.com/watch?v=medoq_Znhaw&pp=ygUFdG9lIDI%3D",
    "id": "Robtop level",
    "creador": "Robtop",
    "puntos": 54,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Maguiet"
      },
      {
        "jugador": "Rrodbarrio"
      }
    ]
  },
  {
    "nombre": "clubstep",
    "video": "https://www.youtube.com/watch?v=VInQkeec188&pp=ygUIY2x1YnN0ZXA%3D",
    "id": "Robtop level",
    "creador": "Robtop",
    "puntos": 50,
    "dificultad": "Easy Demon",
    "leaderboard": [
      {
        "jugador": "Rrodbarrio"
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
    "nombre": "MAGUIET Pack",
    "puntos": 50,
    "niveles": [
      "Ultimate MortalTerra",
      "Bioluminescence"
    ]
  },
  {
    "nombre": "AFTERCATABATH Pack",
    "puntos": 500,
    "niveles": [
      "Cataclysm",
      "aftermath",
      "Bloodbath"
    ]
  }
];
