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
   - **Maratón:** 20 preguntas mezcladas de todos los mundos (sin las de Boss); 3 vidas.
   - **Cronómetro:** hasta 12 preguntas del nivel elegido, 25 s por pregunta; 3 vidas (si se acaba el tiempo cuenta como fallo); lo que sobra da puntos extra.
   - **Boss:** incidente difícil con 20 s por pregunta y 3 vidas; requiere haber desbloqueado ese mundo en Aventura.
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
| Emparejar | Toca un concepto y luego su pareja (o al revés). Para cambiar una pareja, empareja cualquiera de sus dos ítems con otro: las parejas anteriores de ambos se deshacen y tendrás que volver a emparejar lo que quede suelto. Tocar otra vez un ítem seleccionado que aún no está emparejado lo suelta. |
| Ordenar | Botones ▲ ▼ (arriba = primero) |
| Pista | Botón **Pista** o `H` (mientras escribes en «completar», `H` es una letra: usa el botón) |
| Silenciar | Botón **Sonido** o `M` (no mientras escribes en «completar») |
| Salir de la partida | **Salir** o `Esc` |

**Puntos y pistas**

- Respuesta correcta: 100 pts, +25 por cada acierto seguido en racha, ×1.5 en Boss; además, en Cronómetro y Boss, +2 pts por cada segundo que sobra (máximo +50 en Cronómetro y +40 en Boss; este bono no se multiplica).
- Vidas: 3 por partida en Aventura, Maratón, Cronómetro y Boss; cada fallo (o tiempo agotado) quita una y al llegar a 0 la partida termina. Práctica y Repasar errores no tienen vidas.
- Pistas: 2 por partida (1 en Boss, ninguna en Práctica ni Repaso), una por pregunta, y no hay en Verdadero/Falso.
- Cada pista cuesta 30 pts, que se descuentan al resolver la pregunta y se muestran en el resultado, por ejemplo `+120 pts (pista −30)`.

## 5. Tu progreso

- Récord, niveles, mundos, logros, estadísticas y errores pendientes se guardan **en este navegador** (localStorage). No se comparten entre navegadores ni computadoras.
- **Reiniciar todo:** menú → **Stats** → **🗑️ Reiniciar progreso**. Conserva solo la preferencia de sonido.
- Con el almacenamiento del sitio bloqueado, el juego funciona, pero el progreso solo dura mientras la página siga abierta: se pierde al recargarla (`F5`) o al cerrarla.
- En modo incógnito o privado, el progreso se borra al terminar la sesión privada (según el navegador, al cerrar la pestaña o al cerrar todas las ventanas privadas).

## 6. Añadir o corregir preguntas

Las preguntas están en cuatro archivos de `js/` que el navegador carga en este orden: `data.js`, `content-expand.js`, `levels-expand.js` y `levels5-expand.js`.

1. **Para corregir una pregunta**, busca su `id` (por ejemplo `lx13`) en la carpeta `js/` y edítala donde esté.
2. **Para añadir una pregunta**, ponla en `js/levels5-expand.js`:
   - Mundos `linux`, `windows`, `printers`, `networks`, `programming`, `support`, `security` y `hardware`: dentro del bloque `add("<mundo>", [ ... ])`.
   - Mundos `cloud` y `database`: dentro de la lista `"questions": [ ... ]` de su `pushWorld({ ... })`.
   - Preguntas de **Boss** (excepción: no todas van en `levels5-expand.js`): añádelas a la lista del Boss de ese mundo.
     - Linux, Windows, Impresoras, Redes, Programación y Soporte: `setBoss("<mundo>", [` en `js/content-expand.js`.
     - Ciberseguridad y Hardware: la lista `boss: [` dentro de `pushWorld({ id: "security" ... })` o `pushWorld({ id: "hardware" ... })` en `js/levels-expand.js`.
     - Cloud y Base de datos: la lista `"boss": [` de su `pushWorld({ ... })` en `js/levels5-expand.js`.

     Ponles `"level": 5`. No salen en Práctica, Aventura, Cronómetro ni Maratón: solo en el modo **Boss** de ese mundo (en el orden de la lista) y en **Repasar errores** si las fallas.
3. Sigue estas reglas en cada pregunta:
   - `id` **único** en todo el juego (por ejemplo `lxL5z`).
   - `level` **siempre** de 1 a 5. Si lo omites en una pregunta de `js/levels5-expand.js`, el juego la pone en el nivel 1 y el validador la marca como ERROR.
   - `explain`: una o dos frases que expliquen la respuesta.
4. Usa el formato del tipo de pregunta. Cada pregunta va entre llaves `{ ... }` y **se separa de la siguiente con una coma**; por eso los ejemplos terminan en `},`. Pega la pregunta justo después del `[` que abre la lista (o justo después de la `},` de otra pregunta) y la coma ya queda en su sitio. Copia solo el ejemplo que necesites; las líneas que empiezan con `//` son comentarios.

```js
// Opción múltiple (también "identify" y "scenario"): máximo 4 opciones.
// answer = posición de la correcta contando desde 0. En pantalla se barajan solas.
{ "id": "lxL5z", "level": 5, "type": "mc", "q": "¿Qué comando muestra el uso de disco por carpeta?",
  "options": ["du -sh *", "df -h", "free -h", "lsblk"], "answer": 0,
  "explain": "du mide lo que ocupa cada carpeta; df muestra el espacio libre por disco." },

// Verdadero / Falso: answer es true o false, sin comillas.
{ "id": "lxL5y", "level": 3, "type": "tf", "q": "chmod 644 archivo da permiso de ejecución al dueño.", "answer": false,
  "explain": "Falso: 644 es rw-r--r--, nadie puede ejecutarlo; para eso se usa chmod u+x o 755." },

// Completar: se acepta cualquier texto de "accept" (no importan mayúsculas ni espacios de más,
// pero SÍ los acentos: añade la variante con y sin acento).
{ "id": "lxL5x", "level": 2, "type": "fill", "q": "Comando para ver cuánto tiempo lleva encendido el equipo:", "answer": "uptime",
  "accept": ["uptime", "uptime -p"], "explain": "uptime muestra el tiempo encendido, los usuarios conectados y la carga promedio." },

// Emparejar: al menos 2 parejas (lo habitual son 4); di qué se empareja, no solo "Empareja:".
{ "id": "lxL5w", "level": 4, "type": "match", "q": "Empareja el comando con su uso:",
  "pairs": [ { "left": "ps", "right": "Ver procesos" }, { "left": "df", "right": "Espacio en disco" } ],
  "explain": "ps lista los procesos en ejecución; df muestra el espacio usado y libre de cada disco." },

// Ordenar: escribe los pasos ya en orden correcto y usa answer [0, 1, 2, ...]; el juego los baraja.
{ "id": "lxL5v", "level": 3, "type": "order", "q": "Ordena la instalación con apt:",
  "items": ["sudo apt update", "sudo apt install paquete", "Verificar la instalación"], "answer": [0, 1, 2],
  "explain": "Primero se actualiza la lista de paquetes, luego se instala y al final se comprueba que funcione." },
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
   - Si dice **error de escritura** con un archivo y una línea (por ejemplo `js/levels5-expand.js, línea 44`), revisa esa línea y el final de la anterior: casi siempre falta la coma entre dos preguntas (`},`), sobra una coma, o hay una comilla o un corchete sin cerrar. Mientras exista, el navegador ignora todo ese archivo y faltan mundos o niveles en el juego.
7. Compruébala contestándola bien y mal:
   - **Pregunta de nivel:** **Práctica** → su mundo y nivel. Las preguntas salen al azar: juega hasta que aparezca y usa **Reintentar** para la segunda prueba.
   - **Pregunta de Boss:** modo **Boss** → su mundo, y usa **Reintentar** para la segunda prueba. Sale en el orden de la lista, con 20 s por pregunta y 3 vidas: si la pusiste al final, no pierdas las vidas antes de llegar a ella. Linux está abierto desde el principio. Para otro mundo aún bloqueado, abre el juego en una ventana de **incógnito**, pulsa `F12` → **Console**, escribe `localStorage.setItem('techQuestUnlocks', '{"cloud":true}')` (cambia `cloud` por el id del mundo: `windows`, `printers`, `networks`, `programming`, `support`, `security`, `hardware`, `cloud` o `database`) y recarga la página. No lo hagas en una ventana normal: sustituye los mundos que ya tenías desbloqueados. Al cerrar la ventana de incógnito no queda nada guardado.

## 7. Publicar tus cambios (opcional)

Necesitas la carpeta clonada con git (opción A o B del paso 2). Si usaste la ZIP (opción C), no tiene git: clona el repositorio con la opción B y copia ahí los archivos de `js/` que cambiaste.

**Solo la primera vez en esta computadora:**

1. Dile a git quién eres (si no, `git commit` falla con "Author identity unknown"):

```bash
git config --global user.name "Tu nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

2. Inicia sesión en GitHub. `git push` ya no acepta la contraseña de tu cuenta; elige una forma:
   - Instala GitHub CLI (<https://cli.github.com>) y ejecuta `gh auth login`: elige **GitHub.com** y **HTTPS**, y responde **Yes** cuando pregunte si quieres autenticar git.
   - O crea un token en GitHub → tu foto → **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**, marca el permiso **repo** y pega el token cuando git pida la contraseña.
   - En Windows, Git suele abrir el navegador para iniciar sesión; si lo hace, no necesitas nada más.

**Cada vez que publiques**, desde la carpeta del juego:

```bash
cd tech-quest   # o ~/TechQuest_65434567/tech-quest si usaste la opción A
git checkout -b mis-preguntas
git add js/ INSTRUCCIONES.md
git commit -m "Añade preguntas de Linux nivel 5"
git push -u origin mis-preguntas
```

Luego abre un Pull Request en GitHub desde la rama `mis-preguntas` y fusiónalo como en el paso 1.

## 8. Si algo falla

| Síntoma | Qué hacer |
|---|---|
| El menú dice «Desafíos: 100+» o menos de 10 mundos, un nivel dice «0 desafíos» / «Este nivel aún no tiene desafíos», o los botones no responden | Suele ser una coma, comilla o llave de más o de menos en `js/`. En una **terminal** (no en el navegador), dentro de la carpeta del juego, ejecuta `node herramientas/validar-preguntas.js`: te dice el archivo y la línea. Si el validador no marca errores (solo revisa los archivos de preguntas), abre la consola del navegador (`F12` → **Console**) y lee el error en rojo: también indica el archivo y la línea. |
| No se guarda el progreso | Sal del modo incógnito y permite el almacenamiento del sitio en el navegador. |
| No hay sonido | Haz clic o pulsa una tecla en la página (el navegador exige una interacción) y revisa que no esté en silencio (`M`). |
| Un nivel o mundo aparece bloqueado | En Aventura se abren en orden; usa Práctica o Cronómetro para jugar cualquiera. |
