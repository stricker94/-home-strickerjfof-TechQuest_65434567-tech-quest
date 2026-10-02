# Tech Quest — Instrucciones paso a paso

Guía para poner en marcha el juego con todas las correcciones, jugarlo y mantener sus preguntas.
No necesitas instalar nada para jugar: basta un navegador actualizado (Chrome o Edge 80+, Firefox 74+, Safari 13.1+; en iPhone/iPad, iOS 13.4+).

---

## 1. Fusionar los cambios en GitHub

Las correcciones llegan a la rama `main` por medio de Pull Requests (PR). Mientras haya un PR abierto sin fusionar, `main` no tiene esas correcciones.

1. Abre la lista de PR del repositorio: <https://github.com/stricker94/-home-strickerjfof-TechQuest_65434567-tech-quest/pulls>
2. Si no hay ningún PR abierto, ya está todo fusionado: pasa al paso 2.
3. Entra al PR abierto. Si quieres, revisa la pestaña **Files changed** para ver qué cambió.
4. Pulsa el botón verde **Merge pull request** y luego **Confirm merge**. Repite con cualquier otro PR abierto.
5. (Opcional) Pulsa **Delete branch** solo en un PR que acabas de fusionar y solo si no queda otro PR abierto con esa misma rama. Si borras la rama de un PR abierto, GitHub lo cierra; si pasa, pulsa **Restore branch** en ese PR y vuelve a abrirlo con **Reopen pull request**.

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

**C. Sin git:** en la página del repositorio pulsa **Code → Download ZIP** y descomprime el archivo. La carpeta sale con un nombre largo que empieza con guion (`-home-strickerjfof-TechQuest_65434567-tech-quest-main`): **renómbrala a `tech-quest`**, porque con un guion al inicio el comando `cd` falla («invalid option»).

## 3. Abrir el juego

**Forma rápida:** haz doble clic en `index.html` (o arrástralo a una ventana del navegador). Funciona sin internet.

**Con un servidor local** (útil si el navegador bloquea archivos locales; requiere [Python 3](https://www.python.org/downloads/) instalado):

1. Abre una terminal **en la carpeta del juego** (la que contiene `index.html`). Si hiciste el paso 2 en esta misma terminal, ya estás ahí. Si no, usa `cd` con la ruta de tu carpeta, por ejemplo `cd ~/TechQuest_65434567/tech-quest`. En Windows también puedes hacer clic derecho en la carpeta → **Abrir en Terminal**.
2. Ejecuta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

En Windows, si responde «Python was not found», usa `py -m http.server 8000 --bind 127.0.0.1` (o `python` en lugar de `py`), o instala Python. Si la terminal mostró «No such file or directory» o «No se encuentra la ruta», el `cd` falló y el servidor muestra otra carpeta: detenlo con `Ctrl+C` y vuelve al punto 1. (`--bind 127.0.0.1` evita que otras computadoras de tu red vean la carpeta.)

Luego abre <http://localhost:8000> en el navegador y detén el servidor con `Ctrl+C` al terminar.

> El progreso se guarda por separado según cómo abras el juego: con doble clic y con `localhost` son dos partidas guardadas distintas. Usa siempre la misma forma.

## 4. Jugar

1. En el menú elige un modo:
   - **Aventura:** 3 vidas; completa cada nivel para abrir el siguiente. El nivel 5 de un mundo desbloquea el siguiente mundo.
   - **Práctica:** sin vidas ni pistas; cualquier mundo y nivel.
   - **Maratón:** 20 preguntas mezcladas de todos los mundos (sin las de Boss); 3 vidas.
   - **Cronómetro:** hasta 12 preguntas del nivel elegido, 25 s por pregunta; 3 vidas (si se acaba el tiempo cuenta como fallo); lo que sobra da puntos extra.
   - **Boss:** incidente difícil con 20 s por pregunta y 3 vidas; requiere haber desbloqueado ese mundo en Aventura.
   - **Repasar errores:** practica sin vidas hasta 20 de las preguntas que fallaste (al azar); al acertarlas salen de la lista y la siguiente ronda (o **Reintentar**) sigue con las demás.
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
| Salir de la partida | **Salir**, `Esc` o el botón Atrás del navegador o del móvil (todos piden confirmar; recargar o cerrar la pestaña también avisa) |

**Puntos y pistas**

- Respuesta correcta: 100 pts, +25 por cada acierto seguido en racha, ×1.5 en Boss; además, en Cronómetro y Boss, +2 pts por cada segundo que sobra (máximo +50 en Cronómetro y +40 en Boss; este bono no se multiplica).
- Vidas: 3 por partida en Aventura, Maratón, Cronómetro y Boss; cada fallo (o tiempo agotado) quita una y al llegar a 0 la partida termina. Práctica y Repasar errores no tienen vidas.
- Pistas: 2 por partida (1 en Boss, ninguna en Práctica ni Repaso), una por pregunta, y no hay en Verdadero/Falso. La pista aparece justo encima de los botones; en emparejar y ordenar revela la primera pareja o el primer paso que aún no tienes bien.
- Cada pista cuesta 30 pts, que se descuentan al resolver la pregunta y se muestran en el resultado, por ejemplo `+120 pts (pista −30)`.

## 5. Tu progreso

- Récord, niveles, mundos, logros, estadísticas y errores pendientes se guardan **en este navegador** (localStorage). No se comparten entre navegadores ni computadoras.
- **Reiniciar todo:** menú → **Stats** → **🗑️ Reiniciar progreso**. Conserva solo la preferencia de sonido.
- Con el almacenamiento del sitio bloqueado, el juego funciona, pero el progreso solo dura mientras la página siga abierta: se pierde al recargarla (`F5`) o al cerrarla.
- En modo incógnito o privado, el progreso se borra al terminar la sesión privada (según el navegador, al cerrar la pestaña o al cerrar todas las ventanas privadas).
- Si reinicias el progreso mientras el juego está abierto en otra pestaña con una partida empezada, el resultado de esa partida ya no se guarda (lo avisa la pantalla final).

## 6. Añadir o corregir preguntas

Las preguntas están en la carpeta `js/mundos/`, **un archivo por mundo**, todos con el mismo formato:

| Archivo | Mundo |
|---|---|
| `linux.js` | Linux básico |
| `windows.js` | Windows intermedio |
| `printers.js` | Impresoras |
| `networks.js` | Redes e infraestructura |
| `programming.js` | Programación básica |
| `support.js` | Soporte IT |
| `security.js` | Ciberseguridad |
| `hardware.js` | Hardware / ensamblado |
| `cloud.js` | Cloud / servicios |
| `database.js` | Base de datos básica |

Dentro de cada archivo, primero van las preguntas de los niveles (dentro de `questions: [`, separadas por comentarios como `// ——— Nivel 3: Avanzado ———`) y al final las del Boss (dentro de `boss: [`).

1. **Para corregir una pregunta**, abre el archivo de su mundo y busca su `id` (por ejemplo `lx13`) con `Ctrl+F`.
2. **Para añadir una pregunta**, pégala en el archivo de su mundo, dentro de `questions: [`, debajo del comentario de su nivel. El nivel lo decide el campo `level` de la pregunta; el comentario solo sirve para encontrarla.
   - Preguntas de **Boss**: dentro de `boss: [`, al final del archivo, con `level: 5`. No salen en Práctica, Aventura, Cronómetro ni Maratón: solo en el modo **Boss** de ese mundo (en el orden de la lista) y en **Repasar errores** si las fallas.
3. Sigue estas reglas en cada pregunta:
   - `id` **único** en todo el juego (por ejemplo `lxL5z`).
   - `level` **siempre**, un número de 1 a 5 (sin comillas). Sin él la pregunta no sale en ningún nivel, y el validador lo marca como ERROR.
   - `explain`: una o dos frases que expliquen la respuesta.
   - Escribe los nombres de los campos tal cual (`accept`, no `acepta`): un campo mal escrito el juego lo ignora, y el validador lo señala.
   - Guarda los archivos de `js/` con codificación **UTF-8** (en el Bloc de notas: **Guardar como → Codificación: UTF-8**). Con otra codificación los acentos salen como «�».
   - Los textos van entre comillas rectas `"..."`. Si el texto lleva comillas dobles, escríbelas como `\"` o usa comillas simples dentro: `"Escribe 'hola'"`.
4. Usa el formato del tipo de pregunta (es el mismo de los archivos). Cada pregunta va entre llaves `{ ... }` y **se separa de la siguiente con una coma**; por eso los ejemplos terminan en `},`. Pega la pregunta justo después de la `},` de otra pregunta (o del `[` que abre la lista) y la coma ya queda en su sitio. Copia solo el ejemplo que necesites; las líneas que empiezan con `//` son comentarios.

```js
// Opción múltiple (también "identify" y "scenario"): de 2 a 4 opciones; mejor 4 (con 2 no hay pista y es un 50/50).
// answer = posición de la correcta contando desde 0. En pantalla se barajan solas.
{
  id: "lxL5z", level: 5, type: "mc",
  q: "¿Qué comando muestra el uso de disco por carpeta?",
  options: ["du -sh *", "df -h", "free -h", "lsblk"],
  answer: 0,
  explain: "du mide lo que ocupa cada carpeta; df muestra el espacio libre de cada disco."
},

// Verdadero / Falso: answer es true o false, sin comillas.
{
  id: "lxL5y", level: 3, type: "tf",
  q: "chmod 644 archivo da permiso de ejecución al dueño.",
  answer: false,
  explain: "Falso: 644 es rw-r--r--, nadie puede ejecutarlo; para eso se usa chmod u+x o 755."
},

// Completar: se acepta cualquier texto de accept (no importan mayúsculas ni espacios de más,
// pero SÍ los acentos: añade la variante con y sin acento).
{
  id: "lxL5x", level: 2, type: "fill",
  q: "Comando para ver cuánto tiempo lleva encendido el equipo:",
  answer: "uptime",
  accept: ["uptime", "uptime -p"],
  explain: "uptime muestra el tiempo encendido, los usuarios conectados y la carga promedio."
},

// Emparejar: al menos 3 parejas (lo habitual son 4); di qué se empareja, no solo "Empareja:".
// Con solo 2, el juego siempre las mostraría cruzadas y se adivinarían.
{
  id: "lxL5w", level: 4, type: "match",
  q: "Empareja el comando con su uso:",
  pairs: [
    { left: "ps", right: "Ver procesos" },
    { left: "df", right: "Espacio en disco" },
    { left: "free", right: "Memoria libre" },
    { left: "uptime", right: "Tiempo encendido" }
  ],
  explain: "ps lista los procesos; df, el espacio de cada disco; free, la memoria libre; uptime, cuánto lleva encendido."
},

// Ordenar: al menos 3 pasos (lo habitual son 4); escríbelos ya en orden correcto y usa answer [0, 1, 2, ...]; el juego los baraja.
{
  id: "lxL5v", level: 3, type: "order",
  q: "Ordena la instalación con apt:",
  items: ["sudo apt update", "apt search paquete", "sudo apt install paquete", "Verificar la instalación"],
  answer: [0, 1, 2, 3],
  explain: "Primero se actualiza la lista de paquetes, se busca el nombre exacto, se instala y al final se comprueba que funcione."
},
```

5. Para que las preguntas no se adivinen sin saber:
   - Que la opción correcta **no sea siempre la más larga**; las incorrectas deben ser creíbles y de largo parecido.
   - En Verdadero/Falso, alterna afirmaciones verdaderas y falsas (hoy la mitad son falsas).
   - Evita que otra pregunta del mismo nivel dé la respuesta.
6. Valida los datos desde una terminal abierta en la carpeta del juego (como en el paso 3; requiere [Node.js](https://nodejs.org), cualquier versión reciente):

```bash
node herramientas/validar-preguntas.js
```

   - **ERRORES** son preguntas que el juego no puede calificar: corrígelos antes de publicar.
   - **AVISOS** son detalles de calidad (por ejemplo, la correcta mucho más larga que las demás).
   - Si dice **error de escritura** con un archivo y una línea (por ejemplo `js/mundos/linux.js, línea 44`), revisa esa línea y el final de la anterior: casi siempre falta la coma entre dos preguntas (`},`), sobra una coma, o hay una comilla o un corchete sin cerrar. Mientras exista, el navegador ignora todo ese archivo: ese mundo no sale en el juego y el menú avisa «No se pudo cargar js/mundos/linux.js».
   - El validador también revisa que los demás archivos de `js/` estén bien escritos y que `index.html` cargue todos los mundos de `js/mundos/`.
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

**Cada vez que publiques**, abre la terminal en la carpeta del juego (como en el paso 3) y:

1. Crea una rama con un nombre **nuevo**. git no deja repetir el nombre de una rama: usa uno distinto en cada publicación, por ejemplo `preguntas-linux-5` y la siguiente vez `preguntas-redes-3`.

```bash
git checkout -b preguntas-linux-5
```

   Debe responder `Switched to a new branch 'preguntas-linux-5'`. Si dice que la rama ya existe (`already exists`), **no sigas**: repite esa línea con otro nombre. Si siguieras, tus cambios quedarían en otra rama y no se publicarían.

2. Guarda y sube tus cambios con el **mismo** nombre de rama:

```bash
git add js/ INSTRUCCIONES.md
git commit -m "Añade preguntas de Linux nivel 5"
git push -u origin preguntas-linux-5
```

Luego abre un Pull Request en GitHub desde esa rama (al terminar, `git push` muestra el enlace) y fusiónalo como en el paso 1. Después, para dejar la carpeta lista para la próxima vez, vuelve a `main` y actualízala como en el paso 2A (`git checkout main` y `git pull`).

## 8. Si algo falla

| Síntoma | Qué hacer |
|---|---|
| El menú dice «No se pudo cargar js/…» o «El juego no pudo arrancar», «Desafíos: 100+» o faltan mundos, un nivel dice «0 desafíos» / «Este nivel aún no tiene desafíos», o los botones no responden | Suele ser una coma, comilla o llave de más o de menos en el archivo que nombra el aviso. En una **terminal** (no en el navegador), dentro de la carpeta del juego, ejecuta `node herramientas/validar-preguntas.js`: te dice el archivo y la línea. Si el validador no marca errores, abre la consola del navegador (`F12` → **Console**) y lee el error en rojo: también indica el archivo y la línea. Si no editaste nada en `js/`, o la consola marca «Unexpected token '.'» en `js/game.js` (o no tienes consola, como en un iPad), el navegador es demasiado viejo para el juego (necesita Chrome/Edge 80+, Firefox 74+, Safari 13.1+ / iOS 13.4+): actualízalo o prueba con otro. |
| No se guarda el progreso | Sal del modo incógnito y permite el almacenamiento del sitio en el navegador. |
| No hay sonido | Haz clic o pulsa una tecla en la página (el navegador exige una interacción) y revisa que no esté en silencio (`M`). |
| Un nivel o mundo aparece bloqueado | En Aventura se abren en orden; usa Práctica o Cronómetro para jugar cualquiera. |
