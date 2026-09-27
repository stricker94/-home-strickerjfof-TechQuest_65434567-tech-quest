# Tech Quest — Instrucciones paso a paso

Guía para poner en marcha el juego con todas las correcciones, jugarlo y mantener sus preguntas.
No necesitas instalar nada para jugar: basta un navegador moderno (Chrome, Edge, Firefox o Safari).

---

## 1. Fusionar los cambios en GitHub

Las correcciones y mejoras están en el Pull Request #1. Mientras no lo fusiones, la rama `main` sigue con la versión anterior.

1. Abre el PR: <https://github.com/stricker94/-home-strickerjfof-TechQuest_65434567-tech-quest/pull/1>
2. (Opcional) Revisa la pestaña **Files changed** para ver qué cambió.
3. Pulsa el botón verde **Merge pull request** y luego **Confirm merge**.
4. (Opcional) Pulsa **Delete branch** para borrar la rama `claude/review-bugs-improvements-3ib8y3`, que ya no hará falta.

## 2. Traer la versión nueva a tu computadora

Elige **una** de estas opciones.

**A. Ya tienes la carpeta del juego clonada con git** (por ejemplo `~/TechQuest_65434567/tech-quest`):

```bash
cd ~/TechQuest_65434567/tech-quest
git checkout main
git pull
```

**B. No la tienes clonada:**

```bash
git clone https://github.com/stricker94/-home-strickerjfof-TechQuest_65434567-tech-quest.git tech-quest
cd tech-quest
```

**C. Sin git:** en la página del repositorio pulsa **Code → Download ZIP** y descomprime el archivo.

## 3. Abrir el juego

**Forma rápida:** haz doble clic en `index.html` (o arrástralo a una ventana del navegador). Funciona sin internet.

**Con un servidor local** (útil si el navegador bloquea archivos locales):

```bash
cd tech-quest
python3 -m http.server 8000
```

Luego abre <http://localhost:8000> en el navegador y detén el servidor con `Ctrl+C` al terminar.

> El progreso se guarda por separado según cómo abras el juego: con doble clic y con `localhost` son dos partidas guardadas distintas. Usa siempre la misma forma.

## 4. Jugar

1. En el menú elige un modo:
   - **Aventura:** 3 vidas; completa cada nivel para abrir el siguiente. El nivel 5 de un mundo desbloquea el siguiente mundo.
   - **Práctica:** sin vidas ni pistas; cualquier mundo y nivel.
   - **Maratón:** 20 preguntas mezcladas de todos los mundos.
   - **Cronómetro:** 25 s por pregunta; lo que sobra da puntos extra.
   - **Boss:** incidente difícil con 20 s por pregunta; requiere haber desbloqueado ese mundo en Aventura.
   - **Repasar errores:** practica sin vidas las preguntas que fallaste; al acertarlas salen de la lista.
2. Elige mundo y nivel, y responde.
3. Tras cada respuesta verás si acertaste, la respuesta correcta y una explicación. Pulsa **Continuar** o `Enter`.
4. Al final verás tu puntuación, los logros nuevos y, si fallaste algo, la lista desplegable con las respuestas correctas.

**Controles**

| Acción | Cómo |
|---|---|
| Elegir opción | Clic o toque, o teclas `1`–`4` |
| Verdadero / Falso | `V` / `F` |
| Comprobar (completar, emparejar, ordenar) | Botón **Comprobar** o `Enter` |
| Emparejar | Toca un concepto y luego su pareja (o al revés) |
| Ordenar | Botones ▲ ▼ (arriba = primero) |
| Pista | Botón **Pista** o `H` |
| Silenciar | Botón de sonido o `M` |
| Salir de la partida | **Salir** o `Esc` |

**Puntos y pistas**

- Respuesta correcta: 100 pts, +25 por cada acierto seguido en racha; ×1.5 en Boss; hasta +50 por tiempo sobrante en Cronómetro y Boss.
- Pistas: 2 por partida (1 en Boss, ninguna en Práctica ni Repaso), una por pregunta, y no hay en Verdadero/Falso.
- Cada pista cuesta 30 pts, que se descuentan al resolver la pregunta y se muestran en el resultado, por ejemplo `+120 pts (pista −30)`.

## 5. Tu progreso

- Récord, niveles, mundos, logros, estadísticas y errores pendientes se guardan **en este navegador** (localStorage). No se comparten entre navegadores ni computadoras.
- **Reiniciar todo:** menú → **Stats** → **🗑️ Reiniciar progreso**. Conserva solo la preferencia de sonido.
- En modo incógnito o con el almacenamiento bloqueado, el juego funciona pero el progreso se pierde al cerrar la pestaña.

## 6. Añadir o corregir preguntas

Las preguntas están en cuatro archivos de `js/` que el navegador carga en este orden: `data.js`, `content-expand.js`, `levels-expand.js` y `levels5-expand.js`.

1. **Para corregir una pregunta**, busca su `id` (por ejemplo `lx13`) en la carpeta `js/` y edítala donde esté.
2. **Para añadir una pregunta**, ponla en `js/levels5-expand.js`:
   - Mundos `linux`, `windows`, `printers`, `networks`, `programming`, `support`, `security` y `hardware`: dentro del bloque `add("<mundo>", [ ... ])`.
   - Mundos `cloud` y `database`: dentro de la lista `"questions": [ ... ]` de su `pushWorld({ ... })`.
   - Preguntas de **Boss**: en la lista del Boss de ese mundo (busca `setBoss("<mundo>"` en `js/content-expand.js`, o `boss:` / `"boss":` para Ciberseguridad, Hardware, Cloud y Base de datos). Siempre cuentan como nivel 5.
3. Sigue estas reglas en cada pregunta:
   - `id` **único** en todo el juego (por ejemplo `lxL5z`).
   - `level` **siempre** de 1 a 5. Si falta, el juego le asigna un nivel según su posición y puede mover otras preguntas de nivel.
   - `explain`: una o dos frases que expliquen la respuesta.
4. Usa el formato del tipo de pregunta:

```js
// Opción múltiple (también "identify" y "scenario"): máximo 4 opciones.
// answer = posición de la correcta contando desde 0. En pantalla se barajan solas.
{ "id": "lxL5z", "level": 5, "type": "mc", "q": "¿Qué comando muestra el uso de disco por carpeta?",
  "options": ["du -sh *", "df -h", "free -h", "lsblk"], "answer": 0,
  "explain": "du mide lo que ocupa cada carpeta; df muestra el espacio libre por disco." }

// Verdadero / Falso: answer es true o false, sin comillas.
{ "id": "lxL5y", "level": 3, "type": "tf", "q": "En Linux, root tiene UID 0.", "answer": true,
  "explain": "UID 0 es root." }

// Completar: se acepta cualquier texto de "accept" (no importan mayúsculas ni espacios de más,
// pero SÍ los acentos: añade la variante con y sin acento).
{ "id": "lxL5x", "level": 2, "type": "fill", "q": "Comando para ver la ruta actual:", "answer": "pwd",
  "accept": ["pwd"], "explain": "pwd = print working directory." }

// Emparejar: al menos 2 parejas (lo habitual son 4); di qué se empareja, no solo "Empareja:".
{ "id": "lxL5w", "level": 4, "type": "match", "q": "Empareja el comando con su uso:",
  "pairs": [ { "left": "ps", "right": "Ver procesos" }, { "left": "df", "right": "Espacio en disco" } ],
  "explain": "..." }

// Ordenar: escribe los pasos ya en orden correcto y usa answer [0, 1, 2, ...]; el juego los baraja.
{ "id": "lxL5v", "level": 3, "type": "order", "q": "Ordena la instalación con apt:",
  "items": ["sudo apt update", "sudo apt install paquete", "Verificar la instalación"], "answer": [0, 1, 2],
  "explain": "..." }
```

5. Para que las preguntas no se adivinen sin saber:
   - Que la opción correcta **no sea siempre la más larga**; las incorrectas deben ser creíbles y de largo parecido.
   - En Verdadero/Falso, alterna afirmaciones verdaderas y falsas (hoy la mitad son falsas).
   - Evita que otra pregunta del mismo nivel dé la respuesta.
6. Valida los datos (requiere [Node.js](https://nodejs.org), cualquier versión reciente):

```bash
node herramientas/validar-preguntas.js
```

   - **ERRORES** son preguntas que el juego no puede calificar: corrígelos antes de publicar.
   - **AVISOS** son detalles de calidad (por ejemplo, la correcta mucho más larga que las demás).
7. Abre el juego en **Práctica**, elige el mundo y nivel de la pregunta y compruébala contestándola bien y mal.

## 7. Publicar tus cambios (opcional)

```bash
git checkout -b mis-preguntas
git add js/ INSTRUCCIONES.md
git commit -m "Añade preguntas de Linux nivel 5"
git push -u origin mis-preguntas
```

Luego abre un Pull Request en GitHub desde la rama `mis-preguntas` y fusiónalo como en el paso 1.

## 8. Si algo falla

| Síntoma | Qué hacer |
|---|---|
| Pantalla del menú vacía o botones que no responden | Abre la consola del navegador (`F12` → **Console**) y ejecuta `node herramientas/validar-preguntas.js`; suele ser una coma o comilla de más en `js/`. |
| No se guarda el progreso | Sal del modo incógnito y permite el almacenamiento del sitio en el navegador. |
| No hay sonido | Haz clic o pulsa una tecla en la página (el navegador exige una interacción) y revisa que no esté en silencio (`M`). |
| Un nivel o mundo aparece bloqueado | En Aventura se abren en orden; usa Práctica o Cronómetro para jugar cualquiera. |
