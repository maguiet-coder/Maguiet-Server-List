// Historial de cambios de la web (apartado "Cambios"). Lo más nuevo va arriba.
// Se rellena solo al publicar desde Editar, pero también puedes añadir entradas a mano:
//   { fecha: "2026-11-16", tipo: "anuncio", texto: "Lo que quieras anunciar" },
// Tipos: nivel, eliminado, renombrado, puntos, dificultad, puesto, pack, anuncio.

const CAMBIOS = [
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Auditory Breaker (#1, 4084 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Astrophobia (#3, 3348 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Cat Planet (#5, 2548 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Azurite (Sillow) (#6, 468 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Ultimate MortalTerra: 210 → 110 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Sakupen Egg: 160 → 60 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "B: 145 → 55 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Electrodynamix v2: 140 → 50 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Bioluminescence: 75 → 49 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Impulse: 73 → 47 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Shiver: 70 → 45 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "iS: 69 → 43 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "iSpyWithMyLittleEye: 67 → 40 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Blue Hell: 65 → 37 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Xstep v2: 61 → 35 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Demon Mixed: 64 → 33 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Platinum Adventure: 62 → 30 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Retro Circles: 60 → 27 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Speed of Light: 59 → 25 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "The Lightning Road: 58 → 23 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "The Nightmare: 57 → 20 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Deadlocked: 56 → 17 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Theory of everything 2: 55 → 15 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Clubstep: 54 → 10 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puntos",
  "texto": "Sakupen Hell: 8580 → 3532 pts."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Bloodbath (#2, 3240 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Acu (#3, 232 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-21",
  "tipo": "puesto",
  "texto": "Xstep v2: baja del puesto #14 al #14."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "puesto",
  "texto": "Sakupen Egg: sube del puesto #21 al #3."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Sakupen Egg (#21, 160 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "puntos",
  "texto": "Ultimate MortalTerra: 200 → 210 pts."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Maguiet Pack: bonus 60 → 100 pts."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "RobTop Pack: bonus 125 → 75 pts."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Beginner Pack: bonus 75 → 125 pts."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Pack renombrado: Pack Maguiet → Maguiet Pack."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Maguiet Pack: bonus 50 → 60 pts."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Pack renombrado: RobTop Demons → RobTop Pack."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "pack",
  "texto": "Nuevo pack: Beginner Pack (+75 pts por completar The Nightmare, The Lightning Road, Platinum Adventure, iSpyWithMyLittleEye, iS)."
 },
 {
  "fecha": "2026-11-20",
  "tipo": "puntos",
  "texto": "Sakupen Hell: 9030 → 8580 pts."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Sakupen Hell (#1, 9030 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Impulse (#5, 73 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: iS (#7, 69 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Demon Mixed (#10, 64 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Xstep v2 (#12, 61 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Speed of Light (#14, 59 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "eliminado",
  "texto": "Nivel eliminado: Aerial Gleam."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "eliminado",
  "texto": "Nivel eliminado: Cobwebs ."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "renombrado",
  "texto": "Nivel renombrado: Areal Gleam → Aerial Gleam."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "renombrado",
  "texto": "Nivel renombrado: Cobwebs → Areal Gleam."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "renombrado",
  "texto": "Nivel renombrado: Areal Gleam → Cobwebs ."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "pack",
  "texto": "Nuevo pack: RobTop Demons (+125 pts por completar Clubstep, Theory of everything 2, Deadlocked)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Deadlocked (#14, 56 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Areal Gleam (#1, 2100 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Cobwebs (#2, 1500 pts, Extreme Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "puntos",
  "texto": "iSpyWithMyLittleEye: 0 → 67 pts."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "dificultad",
  "texto": "iSpyWithMyLittleEye: dificultad Hard Demon → Easy Demon."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Blue Hell (#7, 65 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Platinum Adventure (#8, 62 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Retro Circles (#9, 60 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: The Lightning Road (#10, 58 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: The Nightmare (#11, 57 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Theory of everything 2 (#12, 55 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Clubstep (#13, 54 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: B (#2, 145 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Electrodynamix v2 (#3, 140 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "puntos",
  "texto": "Bioluminescence: 35 → 75 pts."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Shiver (#5, 70 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-19",
  "tipo": "nivel",
  "texto": "Nuevo nivel: iSpyWithMyLittleEye (#6, 0 pts, Hard Demon)."
 },
 {
  "fecha": "2026-11-16",
  "tipo": "anuncio",
  "texto": "Estrenamos el apartado Cambios: aquí verás cada nivel nuevo, cambio de puntos o de puesto y cada pack nuevo."
 }
];
