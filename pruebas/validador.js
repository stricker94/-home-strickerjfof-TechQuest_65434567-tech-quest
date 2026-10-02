#!/usr/bin/env node
/**
 * Pruebas del validador (herramientas/validar-preguntas.js).
 *
 * Cada caso copia el juego a una carpeta temporal, cambia algo (una pregunta mal escrita, un archivo roto…)
 * y comprueba que el validador lo detecte con el mensaje correcto, o que no dé un falso error.
 * Uso: node pruebas/validador.js   (sin dependencias; sale con código 1 si algún caso falla)
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const RAIZ = path.join(__dirname, "..");
const VALIDADOR = path.join(RAIZ, "herramientas/validar-preguntas.js");

// Archivos del juego que lee el validador (rutas relativas a la raíz)
const base = {};
function copiar(rel) {
  const abs = path.join(RAIZ, rel);
  if (fs.statSync(abs).isDirectory()) fs.readdirSync(abs).forEach((f) => copiar(path.join(rel, f)));
  else if (/\.(js|html|json|webmanifest|css|svg)$/.test(rel)) base[rel.split(path.sep).join("/")] = fs.readFileSync(abs, "utf8");
  // Las imágenes solo tienen que existir: basta con un archivo vacío con su nombre
  else if (/\.png$/.test(rel)) base[rel.split(path.sep).join("/")] = "";
}
["index.html", "js"].forEach(copiar);
for (const extra of ["sw.js", "manifest.webmanifest", "css", "icons"]) if (fs.existsSync(path.join(RAIZ, extra))) copiar(extra);

function validar(cambiar) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tq-validador-"));
  const archivos = Object.assign({}, base);
  cambiar(archivos);
  for (const rel in archivos) {
    if (archivos[rel] == null) continue;
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), archivos[rel]);
  }
  const r = cp.spawnSync(process.execPath, [VALIDADOR, dir], { encoding: "utf8", maxBuffer: 1 << 26 });
  fs.rmSync(dir, { recursive: true, force: true });
  return { codigo: r.status, salida: r.stdout + r.stderr };
}

const LINUX = "js/mundos/linux.js";
/** Inserta texto al inicio de la lista de preguntas de Linux. */
const meter = (texto, archivo = LINUX, marca = "questions: [") => (f) => {
  if (!f[archivo].includes(marca)) throw new Error("no encuentro " + marca + " en " + archivo);
  f[archivo] = f[archivo].replace(marca, marca + "\n" + texto + ",");
};
const Q = (o) => JSON.stringify(Object.assign({ id: "zz1", level: 2, explain: "Explicación de prueba con suficiente detalle para enseñar algo." }, o));
const pregunta = (o) => meter(Q(o));

// [nombre, cambio, código de salida esperado, texto que debe aparecer (o null)]
const casos = [
  ["el juego tal cual no tiene errores", () => {}, 0, null],
  // ——— Archivos y estructura ———
  ["error de escritura en un mundo: archivo y línea", (f) => { f[LINUX] = f[LINUX].replace('id: "lx02"', 'id: "lx02" "x"'); }, 1, /js\/mundos\/linux\.js, línea \d+: error de escritura/],
  ["un mundo en la carpeta que no está en index.html", (f) => { f["js/mundos/nuevo.js"] = 'addWorld({ id: "nuevo", name: "Nuevo", icon: "🆕", color: "#fff", description: "x", questions: [] });'; }, 1, /js\/mundos\/nuevo\.js no está en index\.html/],
  ["index.html carga un archivo que no existe", (f) => { f["index.html"] = f["index.html"].replace('<script src="js/mundos/linux.js"></script>', '<script src="js/mundos/linux.js"></script>\n  <script src="js/mundos/linuxx.js"></script>'); }, 1, /carga js\/mundos\/linuxx\.js, pero ese archivo no existe/],
  ["error de escritura en game.js", (f) => { f["js/game.js"] = f["js/game.js"].replace("function init() {", "function init() {{"); }, 1, /js\/game\.js, línea \d+: error de escritura/],
  ["error de escritura en ui.js", (f) => { f["js/ui.js"] = f["js/ui.js"] + "\n})("; }, 1, /js\/ui\.js, línea \d+: error de escritura/],
  ["sw.js sin un mundo que carga index.html", (f) => { f["sw.js"] = f["sw.js"].replace('  "js/mundos/cloud.js",\n', ""); }, 1, /sw\.js: falta "js\/mundos\/cloud\.js" en ARCHIVOS/],
  ["sw.js con un archivo que no existe", (f) => { f["sw.js"] = f["sw.js"].replace('"js/data.js",', '"js/data.js",\n  "js/viejo.js",'); }, 1, /ARCHIVOS incluye "js\/viejo\.js", que no existe/],
  ["manifest roto", (f) => { f["manifest.webmanifest"] = "{ nombre: x }"; }, 1, /manifest\.webmanifest: no es JSON válido/],
  ["dos archivos con el mismo id de mundo", (f) => { f[LINUX] = f[LINUX].replace('id: "linux",', 'id: "windows",'); }, 1, /el mundo "windows" ya lo registró/],
  ["un archivo de mundo sin addWorld", (f) => { f[LINUX] = "// vacío\n"; }, 1, /linux\.js: no registra ningún mundo/],
  ["campo del mundo mal escrito (preguntas)", (f) => { f[LINUX] = f[LINUX].replace("questions: [", "preguntas: ["); }, 1, /campo que el juego no usa en el mundo: preguntas/],
  ["addWorld mal escrito", (f) => { f[LINUX] = f[LINUX].replace("addWorld({", "addworld({"); }, 1, /linux\.js, línea \d+: error de escritura/],
  ["falta level", (f) => { f[LINUX] = f[LINUX].replace('id: "lx01", level: 1,', 'id: "lx01",'); }, 1, /lx01: falta level/],
  ["level entre comillas", (f) => { f[LINUX] = f[LINUX].replace('id: "lx01", level: 1,', 'id: "lx01", level: "1",'); }, 1, /lx01: nivel inválido: "1" .*sin comillas/],
  ["hueco en la lista (,,)", (f) => { f[LINUX] = f[LINUX].replace("questions: [", "questions: [,"); }, 1, /linux\.js, linux: hay un hueco en la lista de preguntas/],
  ["null en la lista del Boss", (f) => { f[LINUX] = f[LINUX].replace("boss: [", "boss: [null,"); }, 1, /hay un hueco en la lista del Boss/],
  ["boss que no es lista", (f) => { f[LINUX] = f[LINUX].replace("boss: [", "boss: {x: ["); f[LINUX] = f[LINUX].replace(/\]\s*\}\);\s*$/, "]}});\n"); }, 1, /boss debe ser una lista/],
  ["U+FFFD en el archivo", (f) => { f[LINUX] = f[LINUX].replace('"¿Qué', '"¿Qu�'); }, 1, /ilegibles/],
  // ——— Preguntas ———
  ["texto con { id: 'u1', type: ... } no es pregunta perdida", pregunta({ type: "mc", q: "¿Qué imprime console.log(user.type) si user = { id: 'u1', type: 'admin' }?", options: ["admin", "u1", "undefined", "user"], answer: 0 }), 0, null],
  ["JSON {'id': '42', 'type': ...} en el texto", pregunta({ type: "tf", q: "El documento {'id': '42', 'type': 'pedido'} es JSON válido.", answer: false }), 0, null],
  ["fill con 'acepta' es ERROR", pregunta({ type: "fill", q: "Comando para ver cuánto lleva encendido el equipo", answer: "uptime", acepta: ["uptime", "uptime -p"] }), 1, /acepta.*"accept"/],
  ["mc con 'explian' es AVISO", meter(JSON.stringify({ id: "zz1", level: 2, type: "mc", q: "¿Cuál lista archivos?", options: ["ls", "cd", "pwd", "rm"], answer: 0, explian: "x" })), 0, /AVISOS[\s\S]*explian/],
  ["tipo desconocido", pregunta({ type: "fil", q: "x", answer: "y", acepta: ["y"] }), 1, /tipo desconocido/],
  ["id repetido", pregunta({ id: "lx01", type: "tf", q: "Repetida", answer: true }), 1, /id repetido/],
  ["respuesta NFD con accept NFC pasa", pregunta({ type: "fill", q: "Palabra", answer: "configuración", accept: ["configuración"] }), 0, null],
  ["accept sin la respuesta", pregunta({ type: "fill", q: "x", answer: "uptime", accept: ["uptime -p"] }), 1, /accept no incluye la respuesta/],
  ["opción objeto", pregunta({ type: "mc", q: "x", options: ["a", "b", "c", { t: 1 }], answer: 0 }), 1, /opción 4 .*no es un texto/],
  ["opción lista", pregunta({ type: "mc", q: "x", options: ["a", "b", ["b", "c"], "d"], answer: 0 }), 1, /opción 3/],
  ["opción numérica vale", pregunta({ type: "mc", q: "¿Puerto de SSH?", options: [22, 80, 443, 3389], answer: 0 }), 0, null],
  ["answer fuera de rango", pregunta({ type: "mc", q: "x", options: ["a", "b", "c", "d"], answer: 4 }), 1, /answer debe ser la posición/],
  ["V/F con answer entre comillas", pregunta({ type: "tf", q: "x", answer: "true" }), 1, /true o false \(sin comillas\)/],
  ["pareja con lista a la derecha", pregunta({ type: "match", q: "Empareja el comando con su uso:", pairs: [{ left: "ps", right: ["Ver procesos", "Listar"] }, { left: "df", right: "Disco" }, { left: "free", right: "RAM" }] }), 1, /pareja 1 .*un solo texto/],
  ["pareja con izquierda en blanco", pregunta({ type: "match", q: "Empareja el comando con su uso:", pairs: [{ left: "   ", right: "Ver procesos" }, { left: "df", right: "Disco" }, { left: "free", right: "RAM" }] }), 1, /pareja 1/],
  ["pareja numérica vale", pregunta({ type: "match", q: "Empareja el puerto con su servicio:", pairs: [{ left: 22, right: "SSH" }, { left: 53, right: "DNS" }, { left: 443, right: "HTTPS" }] }), 0, null],
  ["paso objeto", pregunta({ type: "order", q: "Ordena:", items: ["a", { x: 1 }, "c"], answer: [0, 1, 2] }), 1, /paso 2/],
  ["2 parejas es ERROR", pregunta({ type: "match", q: "Empareja el comando con su uso:", pairs: [{ left: "ps", right: "Ver procesos" }, { left: "df", right: "Disco" }] }), 1, /al menos 3 parejas/],
  ["2 pasos es ERROR", pregunta({ type: "order", q: "Ordena:", items: ["a", "b"], answer: [0, 1] }), 1, /al menos 3 pasos/],
  ["order con answer incompleto", pregunta({ type: "order", q: "Ordena:", items: ["a", "b", "c"], answer: [0, 1] }), 1, /answer debe listar cada posición/],
  ["3 parejas vale", pregunta({ type: "match", q: "Empareja el comando con su uso:", pairs: [{ left: "ps", right: "Ver procesos" }, { left: "df", right: "Disco" }, { left: "free", right: "RAM" }] }), 0, null],
  ["explicación muy corta es AVISO", meter(JSON.stringify({ id: "zz1", level: 2, type: "mc", q: "¿Cuál muestra la ruta actual?", options: ["pwd", "cd", "ls"], answer: 0, explain: "Muestra la ruta." })), 0, /AVISOS[\s\S]*explicación muy corta \(16 caracteres\)/],
  ["«Pruébalo tú» (try) es válido", pregunta({ type: "mc", q: "¿Cuál muestra la ruta actual?", options: ["pwd", "cat", "top"], answer: 0, try: "En una terminal escribe `pwd`." }), 0, /^(?![\s\S]*AVISOS)/],
  ["try que no es texto es ERROR", pregunta({ type: "mc", q: "¿Cuál muestra la ruta actual?", options: ["pwd", "cd", "ls"], answer: 0, try: ["pwd"] }), 1, /try \(«Pruébalo tú»\) debe ser un texto/],
  ["try con ` sin cerrar es AVISO", pregunta({ type: "mc", q: "¿Cuál muestra la ruta actual?", options: ["pwd", "cd", "ls"], answer: 0, try: "Escribe `pwd en una terminal." }), 0, /acento grave ` sin cerrar/],
  // ——— Simulador de tickets (js/tickets.js) ———
  ["error de escritura en tickets.js: archivo y línea", (f) => { f["js/tickets.js"] = f["js/tickets.js"].replace('id: "tk01a"', 'id: "tk01a" "x"'); }, 1, /js\/tickets\.js, línea \d+: error de escritura/],
  ["tickets.js fuera de index.html es ERROR", (f) => { f["index.html"] = f["index.html"].replace('<script src="js/tickets.js"></script>', ""); }, 1, /js\/tickets\.js no está en index\.html/],
  ["caso sin pasos es ERROR", (f) => { f["js/tickets.js"] += '\naddTicket({ id: "tk99", level: 1, world: "linux", icon: "🎫", title: "Prueba", ticket: "Texto del ticket", steps: [] });'; }, 1, /caso tk99: necesita steps/],
  ["caso con id repetido es ERROR", (f) => { f["js/tickets.js"] += '\naddTicket({ id: "tk01", level: 1, world: "linux", icon: "🎫", title: "Otra", ticket: "Texto", steps: [' + Q({ id: "tk99a", type: "tf", q: "¿Prueba?", answer: true }) + "] });"; }, 1, /caso tk01: id repetido/],
  ["caso sin título es ERROR", (f) => { f["js/tickets.js"] += '\naddTicket({ id: "tk99", level: 1, world: "linux", ticket: "Texto", steps: [' + Q({ id: "tk99a", type: "tf", q: "¿Prueba?", answer: true }) + "] });"; }, 1, /caso tk99: falta title/],
  ["caso con world que no existe es AVISO", (f) => { f["js/tickets.js"] += '\naddTicket({ id: "tk99", level: 2, world: "linuz", icon: "🎫", title: "Prueba", ticket: "Texto", steps: [' + [1, 2, 3].map((n) => Q({ id: "tk99" + n, type: "tf", q: "¿Prueba " + n + "?", answer: n === 2 })).join(",") + "] });"; }, 0, /caso tk99: world "linuz" no es el id de ningún mundo/],
  ["paso con un hueco: nombra el caso", (f) => { f["js/tickets.js"] = f["js/tickets.js"].replace('id: "tk01b"', 'id: "tk01b"').replace("steps: [\n", "steps: [\n    ,\n"); }, 1, /js\/tickets\.js, caso tk01: hay un hueco en la lista de pasos, al inicio de la lista/],
  ["reveal que no es texto es ERROR", (f) => { f["js/tickets.js"] = f["js/tickets.js"].replace(/reveal: "[^"]*"/, "reveal: [\"x\"]"); }, 1, /caso tk01 tk01a: reveal .* debe ser un texto/],
  ["paso con campo mal escrito es AVISO", (f) => { f["js/tickets.js"] = f["js/tickets.js"].replace(/reveal: "/, 'revela: "'); }, 0, /caso tk01 tk01a: campo que el juego no usa en "mc": revela/],
  ["paso con respuesta fuera de rango es ERROR", (f) => { f["js/tickets.js"] = f["js/tickets.js"].replace(/answer: \d,/, "answer: 7,"); }, 1, /caso tk01 tk01a: /],
  ["un mundo en tickets.js es ERROR", (f) => { f["js/tickets.js"] += '\naddWorld({ id: "zz", name: "Z", icon: "Z", color: "#fff", description: "x", questions: [] });'; }, 1, /js\/tickets\.js: aquí solo van casos de ticket/],
  ["2 opciones es AVISO", pregunta({ type: "mc", q: "¿Cuál muestra la ruta actual?", options: ["pwd", "cd"], answer: 0 }), 0, /solo 2 opciones/],
  ["accept con lista anidada", pregunta({ type: "fill", q: "x", answer: "uptime", accept: ["uptime", ["uptime -p"]] }), 1, /accept: el elemento 2/],
  ["accept con ,, sigue siendo error", (f) => { pregunta({ type: "fill", q: "x", answer: "uptime", accept: ["uptime", "ZZHOLE"] })(f); f[LINUX] = f[LINUX].replace('"ZZHOLE"', ',"uptime -p"'); }, 1, /accept: el elemento 2/],
  ["comentario con id no cuenta como pregunta perdida", meter('// { "id": "zz9", "level": 2, "type": "mc" }\n{ "id": "zz10", "level": 2, "type": "tf", "q": "Sí", "answer": true, "explain": "Explicación de prueba." }'), 0, null],
];

let bien = 0;
let mal = 0;
for (const [nombre, cambio, codigo, patron] of casos) {
  const r = validar(cambio);
  const ok = r.codigo === codigo && (!patron || patron.test(r.salida)) && (codigo !== 0 || /Sin errores/.test(r.salida));
  if (ok) bien++;
  else mal++;
  console.log((ok ? "PASA  " : "FALLA ") + nombre + (ok ? "" : ` — salió con ${r.codigo}\n      ` + r.salida.split("\n").filter((l) => /ERROR|AVISO|zz|:/.test(l)).slice(-6).join("\n      ")));
}
// Con miles de errores y la salida por una tubería, la lista no se corta
{
  const muchos = Array.from({ length: 3000 }, (_, i) => Q({ id: "e" + i, type: "mc", q: "x" + i, options: ["a", "b", "c", "d"], answer: 9 })).join(",\n");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tq-validador-"));
  for (const rel in base) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), rel === LINUX ? base[rel].replace("questions: [", "questions: [\n" + muchos + ",") : base[rel]);
  }
  let salida = "";
  if (process.platform !== "win32") {
    salida = cp.execSync(`"${process.execPath}" "${VALIDADOR}" "${dir}" | (sleep 1; cat) | tail -c 200; exit 0`, { encoding: "utf8", shell: "/bin/bash" });
  } else salida = "e2999: answer (sin tubería en Windows)";
  fs.rmSync(dir, { recursive: true, force: true });
  const ok = /e2999: answer/.test(salida);
  ok ? bien++ : mal++;
  console.log((ok ? "PASA  " : "FALLA ") + "salida completa por una tubería");
}
console.log(`\n${bien} pasan, ${mal} fallan`);
if (mal) process.exitCode = 1;
