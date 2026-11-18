// Historial de cambios de la web (apartado "Cambios"). Lo más nuevo va arriba.
// Se rellena solo al publicar desde Editar, pero también puedes añadir entradas a mano:
//   { fecha: "2026-11-16", tipo: "anuncio", texto: "Lo que quieras anunciar" },
// Tipos: nivel, eliminado, renombrado, puntos, dificultad, puesto, pack, anuncio.

const CAMBIOS = [
 {
  "fecha": "2026-11-18",
  "tipo": "puntos",
  "texto": "Through The Decay: 60 → 1060 pts."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "puntos",
  "texto": "Retro Circles : 70 → 75 pts."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "puesto",
  "texto": "Retro Circles : sube del puesto #55 al #44."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Retro Circles  (#55, 70 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "nivel",
  "texto": "Nuevo nivel: PHJORK (#47, 65 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "puesto",
  "texto": "Blue Hell: sube del puesto #53 al #51."
 },
 {
  "fecha": "2026-11-18",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Blue Hell (#53, 60 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Weird."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Speed Racer."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado The Lightning Road."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Bioluminescence."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Skeletal Shenanigans ."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado B."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Weird."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Shiver."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Ispywithmylittleeye."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Ispywithmylittleeye."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Speed Racer."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Platinum Adventure."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Platinum Adventure."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado The Lightning Road."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado The Nightmare."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado The Nightmare."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Teory of everything 2."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado Teory of everything 2."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado clubstep."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "YtNeux se ha pasado clubstep."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Skeletal Shenanigans ."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado B."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Electrodinamix v2."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Weird."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Shiver."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Ispywithmylittleeye."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Speed Racer."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Platinum Adventure."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado The Lightning Road."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado The Nightmare."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado Teory of everything 2."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "LeXa [GD] se ha pasado clubstep."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "pack",
  "texto": "Pack renombrado: AFTERCATABATH Pack → Apocaliptic Trilogy Pack."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Take my hand (#42, 100 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Weird (#44, 73 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Shiver (#45, 70 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Ispywithmylittleeye (#46, 65 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Speed Racer (#47, 64 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Platinum Adventure (#48, 63 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: The Lightning Road (#49, 62 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: The Nightmare (#50, 60 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Maguiet se ha pasado clubstep."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Teory of everything 2 (#43, 54 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: clubstep (#44, 50 pts, Easy Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Skeletal Shenanigans : sube del puesto #42 al #38."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "B: baja del puesto #38 al #39."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Akineract: baja del puesto #39 al #40."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Electrodinamix v2: baja del puesto #40 al #41."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Bioluminescence: baja del puesto #41 al #42."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Akineract."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Skeletal Shenanigans  (#42, 380 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado B."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puntos",
  "texto": "Electrodinamix v2: 250 → 300 pts."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Electrodinamix v2: sube del puesto #41 al #40."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Bioluminescence: baja del puesto #40 al #41."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "record",
  "texto": "Aiman89 se ha pasado Electrodinamix v2."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: Electrodinamix v2 (#41, 250 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puntos",
  "texto": "B: 200 → 360 pts."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "B: sube del puesto #40 al #38."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Akineract: baja del puesto #38 al #39."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puesto",
  "texto": "Bioluminescence: baja del puesto #39 al #40."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "nivel",
  "texto": "Nuevo nivel: B (#40, 200 pts, Medium Demon)."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "pack",
  "texto": "Pack renombrado: Pack Maguiet → MAGUIET Pack."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "pack",
  "texto": "Pack renombrado: AFTERCATABATH → AFTERCATABATH Pack."
 },
 {
  "fecha": "2026-11-17",
  "tipo": "puntos",
  "texto": "Bioluminescence: 80 → 78 pts."
 },
 {
  "fecha": "2026-11-16",
  "tipo": "anuncio",
  "texto": "Estrenamos el apartado Cambios: aquí verás cada nivel nuevo, cambio de puntos o de puesto y cada pack nuevo."
 }
];
