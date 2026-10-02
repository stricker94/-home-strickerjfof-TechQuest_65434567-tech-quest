# Tech Quest

Juego educativo interactivo de IT/tecnología en **español (México)**, creado para **Josué**.

Abre `index.html` en un navegador moderno. **No requiere** npm, build ni CDN. También se puede publicar en GitHub Pages e instalar como app que funciona sin internet.

Guía paso a paso (fusionar cambios, jugar, publicar en una dirección web, respaldo, añadir preguntas o tickets, pruebas): [INSTRUCCIONES.md](INSTRUCCIONES.md).

## Niveles (5 por mundo)

Cada mundo tiene **5 niveles** con desbloqueo en cascada:

1. **Básico**
2. **Intermedio**
3. **Avanzado**
4. **Experto**
5. **Maestro**

Completar el **nivel 5** de un mundo desbloquea el **siguiente mundo**. Cada nivel ganado en Aventura da ★, ★★ (85 % o más) o ★★★ (sin fallos).

La selección de mundo muestra las estrellas ganadas (★ n/15) y el **% de progreso**; las tarjetas bloqueadas dicen qué las abre. Tras elegir mundo, eliges el nivel.

## Mundos (11)

| # | Mundo | Temas |
|---|--------|--------|
| 1 | Linux básico | comandos, permisos, procesos, systemd, tar, find, usuarios, cron, scripts |
| 2 | Windows intermedio | servicios, PowerShell, GPO, seguridad, robocopy, net use, scripts |
| 3 | Impresoras | Spooler, print server, IPP/9100, VLAN+colas, QoS |
| 4 | Redes e infraestructura | TCP/IP, VLAN, OSPF/BGP, QoS, troubleshooting |
| 5 | Programación básica | variables, git, APIs, calidad de código |
| 6 | Soporte IT | tickets, SLA/OLA, major incident, métricas |
| 7 | Ciberseguridad | phishing, MFA, SOC, Zero Trust |
| 8 | Hardware / ensamblado | CPU, RAM, UEFI, PSU, RAID, out-of-band |
| 9 | Cloud / servicios | SaaS/IaaS/PaaS, storage, backups, VPC |
| 10 | Base de datos básica | tablas, SQL CRUD, índices, backups, HA |
| 11 | **Identidad y Microsoft 365** | cuentas de AD, contraseñas, MFA, Outlook, Teams, OneDrive, Entra ID |

Cada mundo incluye un **Boss** (incidente cronometrado). Además hay **12 tickets** de soporte que se resuelven paso a paso.

## Modos

- **Continuar aventura** — abre el primer nivel que te falta; **Reanudar partida** sigue una partida interrumpida por una recarga
- **Aventura** — 3 vidas + 5 niveles con desbloqueo y estrellas
- **Reto del día** — 10 preguntas sin vidas, las mismas todo el día (de tus niveles abiertos y hasta 3 de tus errores); racha de días 🔥
- **Práctica** — sin vidas ni pistas; cualquier mundo y nivel
- **Maratón** — 20 preguntas mezcladas (sin las de Boss), de **Mi nivel** o de **Todo**; 3 vidas
- **Cronómetro** — hasta 12 preguntas del nivel elegido, 25 s por pregunta; 3 vidas
- **Boss** — desafío difícil por mundo, 20 s por pregunta y 3 vidas (requiere el mundo desbloqueado en Aventura)
- **Tickets** — un caso de soporte en 5 pasos encadenados (qué preguntas, qué revisas, causa, arreglo, cierre); lo descubierto en cada paso se anota
- **Repasar errores** — hasta 20 de tus preguntas falladas, primero las que tocan hoy; una pregunta sale de la lista al acertarla en dos días distintos
- **Modo de prueba** — `index.html?pregunta=lx01` (o `?preguntas=lx01,lxB*`) muestra esas preguntas sin guardar nada, para revisarlas

Tras cada respuesta se ve **tu respuesta** junto a la correcta (✔/✘ por pareja o paso en emparejar y ordenar), la explicación y, en preguntas de comandos, un **Pruébalo tú** inofensivo. Al terminar, la lista de fallos trae tu respuesta, la correcta y la explicación. En **Stats** puedes descargar y cargar un **respaldo** del progreso, o reiniciarlo (conserva la preferencia de sonido).

## Controles

| Acción | Cómo |
|--------|------|
| Opción | Clic / `1`–`4` |
| V/F | `V` / `F` |
| Enviar | **Comprobar** o `Enter` |
| Pista | Botón o `H` (no dentro del campo de «completar») |
| Silencio | Botón o `M` (no dentro del campo de «completar») |
| Salir | **Salir**, `Esc` o Atrás (piden confirmar) |

## Estructura

```
tech-quest/
├── index.html               # Pantallas y orden de carga de los archivos
├── manifest.webmanifest     # Datos para instalarlo como app
├── sw.js                    # Service worker: guarda los archivos para jugar sin internet
├── icons/                   # Íconos de la app
├── README.md
├── INSTRUCCIONES.md         # Guía paso a paso
├── herramientas/
│   └── validar-preguntas.js # node herramientas/validar-preguntas.js
├── pruebas/
│   ├── validador.js         # node pruebas/validador.js (pruebas del validador)
│   ├── *.spec.js            # Pruebas en el navegador (Playwright): npm test
│   ├── ayudantes.js         # Funciones comunes de esas pruebas
│   └── servidor.js          # Servidor local que usan las pruebas
├── package.json             # Solo para las pruebas (npm install); el juego no lo necesita
├── playwright.config.js
├── .github/workflows/pruebas.yml  # GitHub corre las pruebas en cada cambio
├── css/style.css
└── js/
    ├── data.js              # Configuración, niveles, logros, addWorld() y addTicket()
    ├── mundos/              # Un archivo por mundo: preguntas por nivel + Boss
    │   ├── linux.js
    │   ├── windows.js
    │   └── …                # printers, networks, programming, support, security, hardware, cloud, database, identity
    ├── tickets.js           # Casos del Simulador de tickets
    ├── audio.js
    ├── progress.js
    ├── ui.js
    └── game.js
```

## localStorage

| Clave | Uso |
|-------|-----|
| `techQuestHighScore` | Récord |
| `techQuestMuted` | Silencio |
| `techQuestUnlocks` | Mundos desbloqueados |
| `techQuestAchievements` | Logros |
| `techQuestStats` | Estadísticas |
| `techQuestBossWins` | Bosses derrotados |
| `techQuestCompletedWorlds` | Mundos completados (nivel 5) |
| `techQuestLevelClears` | Niveles 1–5 completados por mundo |
| `techQuestLevelStars` | Mejores estrellas (1–3) por mundo y nivel |
| `techQuestMistakes` | Preguntas falladas pendientes de repaso, con aciertos y el día en que vuelven a tocar |
| `techQuestDaily` | Reto del día de hoy (sus preguntas y si ya se completó) |
| `techQuestDayStreak` | Racha de días con el reto completado (actual y mejor) |
| `techQuestTickets` | Mejor resultado (pasos bien) de cada ticket |
| `techQuestSaveId` | Cambia al reiniciar el progreso o cargar un respaldo; una partida empezada antes (en otra pestaña) ya no guarda |

`techQuestLevelClears` guarda los niveles `"1"` a `"5"` de cada mundo. El respaldo (`Stats → Descargar respaldo`) es un `.json` con todas estas claves salvo `techQuestMuted` y `techQuestSaveId`.

En `sessionStorage` (solo esa pestaña), `techQuestRun` guarda la partida en curso para **Reanudar partida**.

## Config

`GAME_CONFIG.levelsPerWorld = 5`

## Requisitos

Chrome o Edge 80+, Firefox 74+ o Safari 13.1+ (iPhone/iPad: iOS/iPadOS 13.4+), porque `js/game.js` usa encadenamiento opcional (`?.`, ES2020). Además `localStorage` y Web Audio API (sin sonido el juego funciona igual). El audio se activa con la primera interacción. Instalar como app y jugar sin internet requiere abrirlo desde una dirección web (http/https), no con doble clic.
