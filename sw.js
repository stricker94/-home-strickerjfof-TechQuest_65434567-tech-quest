/**
 * Tech Quest — service worker
 *
 * Permite instalar el juego como app y jugar sin conexión cuando se abre desde una dirección web
 * (por ejemplo GitHub Pages). Con doble clic en index.html (file://) no se usa.
 * Primero intenta la red, así con conexión siempre se ve la última versión; sin conexión usa la copia guardada.
 *
 * Si añades un archivo que el juego carga (por ejemplo un mundo nuevo en js/mundos/), añádelo también a ARCHIVOS:
 * el validador (node herramientas/validar-preguntas.js) avisa si falta alguno.
 */
const CACHE = "tech-quest";
const ARCHIVOS = [
  "./",
  "index.html",
  "css/style.css",
  "js/data.js",
  "js/mundos/linux.js",
  "js/mundos/windows.js",
  "js/mundos/printers.js",
  "js/mundos/networks.js",
  "js/mundos/programming.js",
  "js/mundos/support.js",
  "js/mundos/security.js",
  "js/mundos/hardware.js",
  "js/mundos/cloud.js",
  "js/mundos/database.js",
  "js/mundos/identity.js",
  "js/tickets.js",
  "js/audio.js",
  "js/progress.js",
  "js/ui.js",
  "js/game.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  // cache: "reload" evita guardar una copia vieja que el navegador tuviera en su caché HTTP
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ARCHIVOS.map((a) => new Request(a, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        // Cada archivo que llega bien de la red renueva su copia para jugar sin conexión
        if (res.ok && res.type === "basic") {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === "navigate" ? caches.match("index.html") : Response.error()))
      )
  );
});
