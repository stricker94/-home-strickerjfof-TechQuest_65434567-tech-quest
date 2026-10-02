/**
 * Tech Quest — Mundo Programación básica
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "programming",
  name: "Programación básica",
  icon: "💻",
  color: "#bb88ff",
  description: "Variables, control de flujo, web básica, depuración y git.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "pg01", level: 1, type: "mc",
      q: "Una variable es…",
      options: [
        "Un nombre que guarda un valor en memoria",
        "Un bloque de código reutilizable que recibe parámetros",
        "Una instrucción que repite código varias veces",
        "Un mensaje que el programa muestra en consola"
      ],
      answer: 0,
      explain: "Ej.: edad = 20 guarda el valor 20 con el nombre edad; puedes leerlo y, si no es una constante, reasignarlo."
    },
    {
      id: "pg02", level: 1, type: "mc",
      q: "¿Qué estructura ejecuta código solo si una condición es verdadera?",
      options: ["if / else", "try / catch", "for / of", "import / export"],
      answer: 0,
      explain: "if (condición) { … } else { … }. También switch y operadores ternarios."
    },
    {
      id: "pg03", level: 1, type: "mc",
      q: "Un bucle for sirve para…",
      options: [
        "Repetir un bloque un número controlado de veces",
        "Declarar una variable que no se puede reasignar",
        "Capturar errores sin que el programa se detenga",
        "Elegir entre dos caminos según una condición"
      ],
      answer: 0,
      explain: "El for reúne inicio (i = 0), condición (i < n) y paso (i++): así el bloque se ejecuta n veces, con i de 0 a n-1."
    },
    {
      id: "pg04", level: 1, type: "fill",
      q: "En JavaScript, palabra clave moderna para declarar variable de bloque reasignable:",
      answer: "let",
      accept: ["let"],
      explain: "let y const tienen alcance de bloque. Evita var en código nuevo."
    },
    {
      id: "pg05", level: 1, type: "match",
      q: "Relaciona tecnología web con rol:",
      pairs: [
        { left: "HTML", right: "Estructura del contenido" },
        { left: "CSS", right: "Estilo y diseño" },
        { left: "JavaScript", right: "Comportamiento interactivo" },
        { left: "Git", right: "Control de versiones" }
      ],
      explain: "HTML+CSS+JS forman el front-end clásico; Git guarda historial del código."
    },
    {
      id: "pg06", level: 1, type: "mc",
      q: "Una función es…",
      options: [
        "Un bloque reutilizable con nombre que puede recibir parámetros",
        "Una variable que guarda una lista ordenada de valores",
        "Un valor fijo que no puede cambiar durante la ejecución",
        "Una estructura que repite código mientras se cumpla una condición"
      ],
      answer: 0,
      explain: "function saludar(nombre) { return 'Hola ' + nombre; } — DRY: Don't Repeat Yourself."
    },
    {
      id: "pgL1a", level: 1, type: "mc",
      q: "¿Qué es un string?",
      options: [
        "Una secuencia de caracteres/texto",
        "Un número entero sin decimales",
        "Un valor true o false",
        "Una lista ordenada de valores"
      ],
      answer: 0,
      explain: "En JS: 'hola' o \"hola\"."
    },
    {
      id: "pgL1b", level: 1, type: "tf",
      q: "JavaScript y Java son el mismo lenguaje con distinto nombre.",
      answer: false,
      explain: "Falso: son lenguajes distintos; el parecido del nombre fue una decisión de marketing de 1995. JavaScript corre en navegadores y Node.js; Java, en la JVM."
    },
    {
      id: "pgL1c", level: 1, type: "fill",
      q: "Etiqueta HTML de enlace (apertura):",
      answer: "<a>",
      accept: [
        "<a>",
        "<a></a>",
        "a",
        "<a href>",
        "<a href=\"\">",
        "<a href=''>",
        "<a href=\"#\">",
        "<a href='#'>",
        "<a href=\"...\">",
        "<a href='...'>",
        "a href"
      ],
      explain: "<a href='...'>texto</a>."
    },
    {
      id: "pgL1d", level: 1, type: "mc",
      q: "Un bucle while se repite…",
      options: [
        "Mientras la condición sea verdadera",
        "Hasta que la condición sea verdadera",
        "Un número fijo de veces",
        "Solo una vez, al cargar el programa"
      ],
      answer: 0,
      explain: "Evita condiciones que nunca se vuelven false."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "pg07", level: 2, type: "order",
      q: "Ordena un flujo básico de git para guardar cambios:",
      items: [
        "git status (revisar)",
        "git add archivo",
        "git commit -m \"mensaje\"",
        "git push (si hay remoto)"
      ],
      answer: [0, 1, 2, 3],
      explain: "add prepara el stage; commit guarda snapshot local; push envía al remoto."
    },
    {
      id: "pg08", level: 2, type: "identify",
      q: "¿Qué herramienta del navegador ayuda a depurar JS?",
      options: [
        "DevTools / consola",
        "Marcadores / historial",
        "Modo incógnito",
        "Gestor de descargas"
      ],
      answer: 0,
      explain: "F12 → Console, Sources, Network. console.log y breakpoints son tus amigos."
    },
    {
      id: "pg09", level: 2, type: "mc",
      q: "¿Qué hace git branch?",
      options: [
        "Lista o crea ramas de desarrollo",
        "Descarga los cambios del remoto",
        "Guarda el stage en el historial",
        "Muestra el historial de commits"
      ],
      answer: 0,
      explain: "Las ramas aíslan features. git checkout / git switch cambia de rama."
    },
    {
      id: "pg10", level: 2, type: "fill",
      q: "Etiqueta HTML básica para un párrafo:",
      answer: "<p>",
      accept: ["<p>", "<p></p>", "p"],
      explain: "Los párrafos van en <p>…</p>. Encabezados: <h1>…<h6>."
    },
    {
      id: "pg11", level: 2, type: "mc",
      q: "Un error 'undefined is not a function' suele indicar…",
      options: [
        "Llamaste algo que no es una función (variable undefined/mal nombre)",
        "Que la función recibió menos argumentos de los que declara",
        "Que el archivo JS tiene un error de sintaxis y no se pudo parsear",
        "Que una promesa fue rechazada y nadie capturó el error con catch"
      ],
      answer: 0,
      explain: "Revisa nombres, imports y si el valor existe antes de invocarlo."
    },
    {
      id: "pg12", level: 2, type: "mc",
      q: "CSS: ¿qué propiedad cambia el color del texto?",
      options: ["color", "margin", "display", "flex-direction"],
      answer: 0,
      explain: "color afecta el texto; background-color el fondo. Usa contraste alto para accesibilidad."
    },
    {
      id: "pgL2a", level: 2, type: "mc",
      q: "¿Qué hace return en una función?",
      options: [
        "Devuelve un valor y sale de la función",
        "Imprime un valor en la consola",
        "Repite la función desde el principio",
        "Declara el tipo de dato que acepta la función"
      ],
      answer: 0,
      explain: "Sin return, muchas funciones devuelven undefined (JS)."
    },
    {
      id: "pgL2b", level: 2, type: "scenario",
      q: "Tu código falla solo a veces. Buena práctica:",
      options: [
        "Reproducir, aislar, escribir prueba, luego fix",
        "Envolver todo en try/catch vacío para ocultar el error",
        "Desactivar las pruebas que fallan de forma intermitente",
        "Subir un cambio al azar y ver si deja de fallar"
      ],
      answer: 0,
      explain: "Los bugs intermitentes necesitan evidencia y tests."
    },
    {
      id: "pgL2c", level: 2, type: "fill",
      q: "En JS, igualdad estricta:",
      answer: "===",
      accept: ["==="],
      explain: "=== compara valor y tipo."
    },
    {
      id: "pgL2d", level: 2, type: "order",
      q: "Ordena los pasos para escribir una función y comprobarla:",
      items: [
        "Definir qué recibe y qué devuelve",
        "Escribir el cuerpo de la función",
        "Llamarla con datos de prueba",
        "Comparar el resultado con lo esperado"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero el contrato (entradas y salida), luego la implementación, y al final se prueba con datos conocidos, comparando con el resultado esperado."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "pg13", level: 3, type: "order",
      q: "Ordena la depuración mínima de un bug:",
      items: [
        "Reproducir el error de forma consistente",
        "Leer el stack trace/logs de esa reproducción",
        "Aislar la causa (hipótesis)",
        "Corregir y verificar"
      ],
      answer: [0, 1, 2, 3],
      explain: "Reproducirlo de forma consistente te da logs/stack trace fiables y una forma de comprobar el arreglo; luego aislas la causa, corriges y verificas con la misma reproducción."
    },
    {
      id: "pg14", level: 3, type: "tf",
      q: "const en JavaScript hace que un objeto sea completamente inmutable.",
      answer: false,
      explain: "Falso: const solo impide reasignar la variable; las propiedades del objeto se pueden cambiar. Object.freeze lo congela (y solo de forma superficial)."
    },
    {
      id: "pg15", level: 3, type: "scenario",
      q: "Escenario: quieres guardar cambios locales con mensaje. Flujo git mínimo:",
      options: [
        "git add → git commit -m \"mensaje\"",
        "git commit -m \"mensaje\" → git add",
        "git fetch → git merge origin/main",
        "git checkout -b cambios → git push"
      ],
      answer: 0,
      explain: "add al stage, commit al historial local. push es opcional hacia remoto."
    },
    {
      id: "pg16", level: 3, type: "mc",
      q: "¿Qué hace un bucle while?",
      options: [
        "Repite mientras la condición sea verdadera",
        "Ejecuta el bloque una sola vez si la condición es cierta",
        "Ejecuta el bloque en paralelo en varios hilos",
        "Declara una variable local dentro del bloque"
      ],
      answer: 0,
      explain: "Cuidado con bucles infinitos: la condición debe poder volverse falsa."
    },
    {
      id: "pg17", level: 3, type: "fill",
      q: "En JS, operador de igualdad estricta (valor y tipo):",
      answer: "===",
      accept: ["==="],
      explain: "=== no hace coerción. == puede convertir tipos y dar sorpresas."
    },
    {
      id: "pg18", level: 3, type: "mc",
      q: "CSS: display: flex sirve para…",
      options: [
        "Crear layouts flexibles en una dimensión",
        "Ocultar el elemento sin quitarle su espacio",
        "Crear rejillas de filas y columnas a la vez",
        "Animar la transición entre dos estilos"
      ],
      answer: 0,
      explain: "Flexbox alinea y distribuye espacio entre ítems de un contenedor."
    },
    {
      id: "pgL3a", level: 3, type: "mc",
      q: "Una race condition ocurre cuando…",
      options: [
        "El resultado depende del orden/tiempo de ejecución concurrente",
        "Dos funciones se llaman entre sí de forma recursiva sin fin",
        "El programa reserva memoria que nunca libera con el tiempo",
        "Un bucle nunca cumple su condición de salida"
      ],
      answer: 0,
      explain: "Locks, colas y diseño cuidadoso mitigan carreras."
    },
    {
      id: "pgL3b", level: 3, type: "tf",
      q: "Las pruebas automatizadas reducen regresiones al cambiar código.",
      answer: true,
      explain: "CI ejecuta tests en cada cambio."
    },
    {
      id: "pgL3c", level: 3, type: "scenario",
      q: "API devuelve 500 intermitente. ¿Dónde mirar primero?",
      options: [
        "Logs del servidor, métricas y trazas de la request",
        "La caché del navegador y las cookies del cliente",
        "Los estilos CSS de la página que hace la llamada",
        "La configuración DNS del equipo del desarrollador"
      ],
      answer: 0,
      explain: "Correlaciona request-id entre gateway y app."
    },
    {
      id: "pgL3d", level: 3, type: "match",
      q: "Empareja el concepto de programación con su definición:",
      pairs: [
        { left: "try/catch", right: "Manejo de excepciones" },
        { left: "JSON", right: "Formato de datos muy usado en APIs" },
        { left: "REST", right: "Estilo de API sobre HTTP" },
        { left: "SQL injection", right: "Ataque por entradas no sanitizadas" }
      ],
      explain: "Fundamentos de backend y seguridad de apps."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "pgL4a", level: 4, type: "mc",
      q: "Big-O de buscar en hash map promedio:",
      options: ["O(1) en promedio", "O(n!)", "O(n³) siempre", "O(log log log) fijo"],
      answer: 0,
      explain: "Búsqueda en hash map: O(1) en promedio; con muchas colisiones el peor caso degrada a O(n). 'Amortizado' se usa para la inserción (por el redimensionamiento ocasional)."
    },
    {
      id: "pgL4b", level: 4, type: "tf",
      q: "Una race condition ocurre cuando el resultado depende del orden de hilos impredecible.",
      answer: true,
      explain: "Usa locks/atómicos/colas."
    },
    {
      id: "pgL4c", level: 4, type: "scenario",
      q: "API devuelve 500 intermitente. Primeros pasos:",
      options: [
        "Logs, idempotencia, reintentos con backoff, métricas",
        "Devolver siempre 200 aunque falle, para ocultar el error",
        "Programar un reinicio del servidor cada hora y no investigar",
        "Borrar la caché del navegador de los usuarios"
      ],
      answer: 0,
      explain: "Observabilidad antes de adivinar."
    },
    {
      id: "pgL4d", level: 4, type: "fill",
      q: "Sistema de control de versiones más usado (nombre):",
      answer: "git",
      accept: ["git", "Git"],
      explain: "git init / clone / commit / push."
    },
    {
      id: "pgL4e", level: 4, type: "mc",
      q: "CI/CD significa…",
      options: [
        "Integración y entrega/despliegue continuos",
        "Código Integrado y Compilación Distribuida",
        "Control de Incidencias y Cambios Documentados",
        "Compilación Incremental y Depuración Continua"
      ],
      answer: 0,
      explain: "Automatiza test y deploy."
    },
    {
      id: "pgL4f", level: 4, type: "match",
      q: "Empareja el tipo de prueba o herramienta con su propósito:",
      pairs: [
        { left: "Unit test", right: "Prueba de una función aislada" },
        { left: "Integration", right: "Varios componentes juntos" },
        { left: "Mock", right: "Doble de prueba" },
        { left: "Lint", right: "Análisis estático de estilo/bugs" }
      ],
      explain: "Calidad de código."
    },
    {
      id: "pgL4g", level: 4, type: "order",
      q: "Ordena el flujo de una feature en equipo:",
      items: ["branch", "commits", "pull request/review", "merge a main"],
      answer: [0, 1, 2, 3],
      explain: "Evita commits directo a main en equipo."
    },
    {
      id: "pgL4h", level: 4, type: "tf",
      q: "Escapar comillas a mano basta para evitar SQL injection; no hacen falta consultas parametrizadas.",
      answer: false,
      explain: "Falso: el escape manual falla con codificaciones y casos borde. La defensa correcta son las consultas parametrizadas (o un ORM usado con cuidado)."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "pgL5a", level: 5, type: "mc",
      q: "Un memory leak en un servicio largo causa…",
      options: [
        "Uso de RAM creciente hasta OOM/lentitud",
        "Fuga de datos personales a servidores externos",
        "Picos de CPU al arrancar que luego se estabilizan",
        "Disco lleno por logs que nunca se rotan"
      ],
      answer: 0,
      explain: "Profiling y liberar recursos."
    },
    {
      id: "pgL5b", level: 5, type: "scenario",
      q: "Debes versionar una API pública. Mejor práctica:",
      options: [
        "Versionado (/v1) y compatibilidad hacia atrás",
        "Romper la API sin aviso y documentarlo después",
        "Usar la misma URL y cambiar el formato sin versión",
        "Reusar códigos de error con otro significado"
      ],
      answer: 0,
      explain: "Deprecation policy clara."
    },
    {
      id: "pgL5c", level: 5, type: "fill",
      q: "Formato de texto con pares clave-valor entre llaves { }, el más usado hoy en APIs REST (sigla):",
      answer: "JSON",
      accept: ["JSON", "json"],
      explain: "JSON = JavaScript Object Notation. XML también se usa (p. ej., SOAP), pero en APIs REST domina JSON."
    },
    {
      id: "pgL5d", level: 5, type: "mc",
      q: "Idempotencia en PUT/DELETE ayuda a…",
      options: [
        "Reintentar sin duplicar efectos indeseados",
        "Cifrar la petición en tránsito",
        "Comprimir la respuesta para ahorrar ancho de banda",
        "Autenticar al cliente sin enviar credenciales"
      ],
      answer: 0,
      explain: "Clave en redes no confiables."
    },
    {
      id: "pgL5e", level: 5, type: "identify",
      q: "Patrón para desacoplar productores/consumidores:",
      options: [
        "Cola de mensajes / broker (RabbitMQ, Kafka)",
        "Llamadas HTTP síncronas directas entre servicios",
        "Herencia de una clase base común a ambos",
        "Espera activa (busy-wait) sobre un flag"
      ],
      answer: 0,
      explain: "Mejora resiliencia."
    },
    {
      id: "pgL5f", level: 5, type: "order",
      q: "Ordena el flujo de un code review útil:",
      items: [
        "Autor abre PR con un diff pequeño y claro",
        "Esperar a que el CI esté en verde",
        "Revisor comenta diseño/riesgos (no solo estilo)",
        "Aprobar o pedir cambios"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero un PR pequeño y claro; el CI en verde filtra fallos automáticos antes de gastar tiempo humano; la revisión se centra en diseño/riesgos, no solo estilo, y termina en aprobar o pedir cambios."
    },
    {
      id: "pgL5g", level: 5, type: "tf",
      q: "En semantic versioning, un cambio incompatible (breaking change) se indica subiendo PATCH.",
      answer: false,
      explain: "Falso: en MAJOR.MINOR.PATCH un breaking change sube MAJOR (2.0.0); funciones compatibles suben MINOR y correcciones suben PATCH."
    },
    {
      id: "pgL5h", level: 5, type: "scenario",
      q: "Feature flag apagada en prod pero el bug sigue. Sospecha:",
      options: [
        "Caché CDN/config no refrescada o flag mal cableada",
        "Que git blame atribuyó mal el autor del commit",
        "Que los tests unitarios no se ejecutaron en CI",
        "Que el certificado TLS del sitio caducó"
      ],
      answer: 0,
      explain: "Verifica evaluación real de la flag."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "pgB1", level: 5, type: "scenario",
      q: "BOSS: Prod roto tras deploy. ¿Primera acción sensata?",
      options: [
        "Rollback al release anterior y luego investigar",
        "Seguir pusheando fixes a ciegas sin métricas",
        "Borrar el repo",
        "Apagar DNS global"
      ],
      answer: 0,
      explain: "Mitiga impacto primero; post‑mortem después."
    },
    {
      id: "pgB2", level: 5, type: "mc",
      q: "BOSS: TypeError en consola solo en un navegador viejo. Enfoque:",
      options: [
        "Reproducir, ver API faltante, transpilar/polyfill o subir requisito",
        "Reinstalar Node en el servidor y volver a desplegar el mismo build",
        "Envolver todo en try/catch vacío para que la consola no muestre nada",
        "Purgar la caché del CDN y asumir que el error desaparecerá solo"
      ],
      answer: 0,
      explain: "Compatibilidad = entorno. No asumas que tu Chrome local = todos los usuarios."
    },
    {
      id: "pgB3", level: 5, type: "order",
      q: "BOSS: Hotfix con git:",
      items: [
        "Crear rama desde main estable",
        "Aplicar fix mínimo + pruebas",
        "Code review / CI",
        "Merge y tag de release"
      ],
      answer: [0, 1, 2, 3],
      explain: "Cambios mínimos reducen riesgo en incidentes."
    },
    {
      id: "pgB4", level: 5, type: "tf",
      q: "BOSS: console.log en prod puede filtrar datos sensibles si no se controla.",
      answer: true,
      explain: "Evita loguear secretos; usa niveles y redacción."
    },
    {
      id: "pgB5", level: 5, type: "identify",
      q: "BOSS: ¿Qué sistema guarda historial de cambios del código?",
      options: ["Git (VCS)", "npm (paquetes)", "Jest (tests)", "Vim (editor)"],
      answer: 0,
      explain: "Git permite blame, revert y branches de emergencia."
    }
  ]
});
