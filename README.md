# Tech Quest

Juego educativo interactivo de IT/tecnología en **español (México)**, creado para **Josué**.

Abre `index.html` en un navegador moderno. **No requiere** npm, build ni CDN.

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

- **Aventura** — vidas + 5 niveles con desbloqueo
- **Práctica** — sin vidas; elige nivel
- **Maratón** — 20 preguntas mezcladas
- **Cronómetro** — tiempo por pregunta (elige nivel)
- **Boss** — desafío difícil por mundo (requiere el mundo desbloqueado en Aventura)
- **Repasar errores** — practica sin vidas las preguntas que has fallado; al acertarlas salen de la lista

Al terminar una partida puedes desplegar la lista de preguntas falladas con su respuesta correcta. En **Stats** hay un botón para reiniciar todo el progreso (conserva la preferencia de sonido).

## Controles

| Acción | Cómo |
|--------|------|
| Opción | Clic / `1`–`4` |
| V/F | `V` / `F` |
| Enviar | **Comprobar** o `Enter` |
| Pista | Botón o `H` |
| Silencio | Botón o `M` |
| Salir | **Salir** o `Esc` |

## Estructura

```
tech-quest/
├── index.html
├── README.md
├── css/style.css
└── js/
    ├── data.js              # Mundos base + logros + config
    ├── content-expand.js    # Expansión impresoras/redes/bosses
    ├── levels-expand.js     # Niveles 1–3 + ciberseguridad + hardware
    ├── levels5-expand.js    # Niveles 4–5 + Cloud + Base de datos
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

`techQuestLevelClears` guarda los niveles `"1"` a `"5"` de cada mundo.

## Config

`GAME_CONFIG.levelsPerWorld = 5`

## Requisitos

ES6, `localStorage`, Web Audio API. El audio se activa con la primera interacción.
