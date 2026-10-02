# Tech Quest

Juego educativo interactivo de IT/tecnología en **español (México)**, creado para **Josué**.

Abre `index.html` en un navegador moderno. **No requiere** npm, build ni CDN.

Guía paso a paso (fusionar cambios, jugar, añadir o corregir preguntas): [INSTRUCCIONES.md](INSTRUCCIONES.md).

## Niveles (5 por mundo)

Cada mundo tiene **5 niveles** con desbloqueo en cascada:

1. **Básico**
2. **Intermedio**
3. **Avanzado**
4. **Experto**
5. **Maestro**

Completar el **nivel 5** de un mundo desbloquea el **siguiente mundo**.

La selección de mundo muestra estrellas (⭐/☆) y **% de progreso**. Tras elegir mundo, eliges el nivel.

## Mundos (10)

| # | Mundo | Temas |
|---|--------|--------|
| 1 | Linux básico | comandos, permisos, procesos, systemd |
| 2 | Windows intermedio | servicios, PowerShell, GPO, seguridad |
| 3 | Impresoras | Spooler, print server, IPP/9100, VLAN+colas, QoS |
| 4 | Redes e infraestructura | TCP/IP, VLAN, OSPF/BGP, QoS, troubleshooting |
| 5 | Programación básica | variables, git, APIs, calidad de código |
| 6 | Soporte IT | tickets, SLA/OLA, major incident, métricas |
| 7 | Ciberseguridad | phishing, MFA, SOC, Zero Trust |
| 8 | Hardware / ensamblado | CPU, RAM, UEFI, PSU, RAID, out-of-band |
| 9 | **Cloud / servicios** | SaaS/IaaS/PaaS, storage, backups, VPC |
| 10 | **Base de datos básica** | tablas, SQL CRUD, índices, backups, HA |

Cada mundo incluye un **Boss** (incidente cronometrado).

## Modos

- **Aventura** — 3 vidas + 5 niveles con desbloqueo
- **Práctica** — sin vidas ni pistas; cualquier mundo y nivel
- **Maratón** — 20 preguntas mezcladas de todos los mundos (sin las de Boss); 3 vidas
- **Cronómetro** — hasta 12 preguntas del nivel elegido, 25 s por pregunta; 3 vidas
- **Boss** — desafío difícil por mundo, 20 s por pregunta y 3 vidas (requiere el mundo desbloqueado en Aventura)
- **Repasar errores** — practica sin vidas hasta 20 de las preguntas que has fallado (al azar); al acertarlas salen de la lista y la siguiente ronda sigue con las demás

Al terminar una partida puedes desplegar la lista de preguntas falladas con su respuesta correcta. En **Stats** hay un botón para reiniciar todo el progreso (conserva la preferencia de sonido).

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
├── README.md
├── INSTRUCCIONES.md         # Guía paso a paso
├── herramientas/
│   └── validar-preguntas.js # node herramientas/validar-preguntas.js
├── pruebas/
│   └── validador.js         # node pruebas/validador.js (pruebas del validador)
├── css/style.css
└── js/
    ├── data.js              # Configuración, niveles, logros y addWorld()
    ├── mundos/              # Un archivo por mundo: preguntas por nivel + Boss
    │   ├── linux.js
    │   ├── windows.js
    │   └── …                # printers, networks, programming, support, security, hardware, cloud, database
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
| `techQuestMistakes` | Preguntas falladas pendientes de repaso |
| `techQuestSaveId` | Cambia al reiniciar el progreso; una partida empezada antes (en otra pestaña) ya no guarda |

`techQuestLevelClears` guarda los niveles `"1"` a `"5"` de cada mundo.

## Config

`GAME_CONFIG.levelsPerWorld = 5`

## Requisitos

Chrome o Edge 80+, Firefox 74+ o Safari 13.1+ (iPhone/iPad: iOS/iPadOS 13.4+), porque `js/game.js` usa encadenamiento opcional (`?.`, ES2020). Además `localStorage` y Web Audio API (sin sonido el juego funciona igual). El audio se activa con la primera interacción.
