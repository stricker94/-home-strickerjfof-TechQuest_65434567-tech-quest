#!/usr/bin/env node
/**
 * Servidor web mínimo para las pruebas (sirve la carpeta del juego en http://127.0.0.1:8765).
 * Por http funcionan también el modo instalable y sin conexión (sw.js), como en GitHub Pages.
 * Uso: node pruebas/servidor.js [puerto]
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const PUERTO = Number(process.argv[2] || process.env.PUERTO || 8765);
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".md": "text/markdown; charset=utf-8",
};

http
  .createServer((req, res) => {
    let ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (ruta.endsWith("/")) ruta += "index.html";
    const archivo = path.normalize(path.join(RAIZ, ruta));
    if (!archivo.startsWith(RAIZ) || archivo.includes(`${path.sep}node_modules${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(archivo, (err, datos) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No existe: " + ruta);
        return;
      }
      res.writeHead(200, { "Content-Type": TIPOS[path.extname(archivo)] || "application/octet-stream", "Cache-Control": "no-cache" });
      res.end(datos);
    });
  })
  .listen(PUERTO, "127.0.0.1", () => console.log(`Tech Quest en http://127.0.0.1:${PUERTO}/`));
