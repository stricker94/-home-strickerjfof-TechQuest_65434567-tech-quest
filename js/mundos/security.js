/**
 * Tech Quest — Mundo Ciberseguridad
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "security",
  name: "Ciberseguridad",
  icon: "🛡️",
  color: "#ff5566",
  description: "Phishing, contraseñas, MFA, malware y navegación segura.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "sec01", level: 1, type: "mc",
      q: "El phishing busca…",
      options: [
        "Engañarte para robar credenciales o datos",
        "Saturar un servidor con tráfico",
        "Explotar fallos de software sin parchear",
        "Adivinar contraseñas por fuerza bruta"
      ],
      answer: 0,
      explain: "Correos/SMS/webs falsas imitan marcas legítimas."
    },
    {
      id: "sec02", level: 1, type: "tf",
      q: "Una contraseña larga y única por sitio es mejor que reutilizar '123456'.",
      answer: true,
      explain: "Usa gestor de contraseñas + MFA."
    },
    {
      id: "sec03", level: 1, type: "mc",
      q: "MFA significa…",
      options: [
        "Autenticación multifactor",
        "Monitoreo de fallos de acceso",
        "Mapa de firewall automático",
        "Método de filtrado antispam"
      ],
      answer: 0,
      explain: "Algo que sabes + tienes / eres."
    },
    {
      id: "sec04", level: 1, type: "identify",
      q: "Señal típica de phishing por correo:",
      options: [
        "Urgencia + enlace sospechoso + remitente raro",
        "Remitente del dominio interno con firma DKIM válida",
        "Enlaces que apuntan al dominio oficial de la empresa",
        "Comunicado anunciado antes en la intranet"
      ],
      answer: 0,
      explain: "Verifica dominio, hover del link y canales oficiales."
    },
    {
      id: "sec05", level: 1, type: "fill",
      q: "Término corto en inglés (contracción de 'malicious software') para software malicioso:",
      answer: "malware",
      accept: ["malware", "Malware"],
      explain: "Malware incluye virus, troyanos, ransomware, spyware…"
    },
    {
      id: "sec06", level: 1, type: "mc",
      q: "Actualizar el sistema y apps ayuda a…",
      options: [
        "Cerrar vulnerabilidades conocidas",
        "Sustituir la necesidad de tener copias de seguridad",
        "Recuperar archivos cifrados por un ransomware",
        "Aumentar la memoria RAM disponible"
      ],
      answer: 0,
      explain: "Parches corrigen fallos explotables."
    },
    {
      id: "sec07", level: 1, type: "tf",
      q: "HTTPS garantiza que el sitio web es legítimo y seguro.",
      answer: false,
      explain: "Falso: HTTPS cifra el tráfico en tránsito, pero un sitio de phishing también puede tener un certificado válido. Revisa bien el dominio."
    },
    {
      id: "sec08", level: 1, type: "scenario",
      q: "Te llaman 'de TI' pidiendo tu contraseña. ¿Qué haces?",
      options: [
        "No la des; verifica por canal oficial",
        "Se la das solo si conoce tu nombre y tu puesto",
        "Se la dictas y la cambias en cuanto cuelgues",
        "Se la envías por el chat interno de la empresa"
      ],
      answer: 0,
      explain: "Soporte legítimo no pide tu password."
    },
    {
      id: "sec09", level: 1, type: "mc",
      q: "Un antivirus/EDR sirve para…",
      options: [
        "Detectar y bloquear amenazas en el endpoint",
        "Reemplazar las copias de seguridad",
        "Sustituir al firewall perimetral siempre",
        "Filtrar tráfico entre VLANs del switch"
      ],
      answer: 0,
      explain: "Defensa en profundidad: endpoint + red + identidad."
    },
    {
      id: "sec10", level: 1, type: "order",
      q: "Ordena reacción ante correo sospechoso:",
      items: [
        "Detectar señales (remitente, urgencia, enlace raro)",
        "No hacer clic ni abrir adjuntos",
        "Reportar a seguridad/TI",
        "Borrar o cuarentenar según política"
      ],
      answer: [0, 1, 2, 3],
      explain: "Detecta, no interactúes, reporta (antes de borrar, para que TI pueda analizarlo) y luego elimina. Si ya interactuaste, cambia tu password de inmediato."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "sec11", level: 2, type: "mc",
      q: "El ransomware típicamente…",
      options: [
        "Cifra archivos y pide rescate",
        "Muestra anuncios emergentes en el navegador",
        "Registra tus teclas y las envía al atacante",
        "Mina criptomonedas con tu CPU"
      ],
      answer: 0,
      explain: "Backups offline/inmutables son críticos."
    },
    {
      id: "sec12", level: 2, type: "scenario",
      q: "USB desconocido en el estacionamiento. Acción correcta:",
      options: [
        "No conectarlo; reportar",
        "Probarlo en el DC",
        "Abrirlo en finanzas",
        "Instalar drivers del USB"
      ],
      answer: 0,
      explain: "USB baiting es un vector real."
    },
    {
      id: "sec13", level: 2, type: "mc",
      q: "Principio de mínimo privilegio significa…",
      options: [
        "Dar solo los permisos necesarios para la tarea",
        "Dar permisos amplios y retirarlos si hay un incidente",
        "Registrar en logs solo los eventos de menor prioridad",
        "Heredar los permisos del jefe directo"
      ],
      answer: 0,
      explain: "Reduce el blast radius de una cuenta comprometida."
    },
    {
      id: "sec14", level: 2, type: "tf",
      q: "Una VPN corporativa cifra el tráfico hacia la red de la empresa.",
      answer: true,
      explain: "Útil en Wi‑Fi públicos; no sustituye buen juicio."
    },
    {
      id: "sec15", level: 2, type: "fill",
      q: "Ataque que satura un servicio para tumbarlo (sigla):",
      answer: "DDoS",
      accept: ["DDoS", "ddos", "DoS", "dos"],
      explain: "Denial of Service / Distributed DoS."
    },
    {
      id: "sec16", level: 2, type: "match",
      q: "Empareja amenaza:",
      pairs: [
        { left: "Phishing", right: "Engaño para robar datos" },
        { left: "Malware", right: "Software dañino" },
        { left: "Shoulder surfing", right: "Mirar tu pantalla/teclado" },
        { left: "Tailgating", right: "Entrar detrás de alguien sin badge" }
      ],
      explain: "Amenazas técnicas y físicas."
    },
    {
      id: "sec17", level: 2, type: "mc",
      q: "2FA por SMS es mejor que nada, pero más fuerte suele ser…",
      options: [
        "App TOTP / llave FIDO2",
        "La misma password en todos lados",
        "Preguntas 'nombre de tu perro' solo",
        "Desactivar MFA"
      ],
      answer: 0,
      explain: "SIM swap debilita SMS; preferir app o hardware key."
    },
    {
      id: "sec18", level: 2, type: "order",
      q: "Ordena endurecimiento básico de cuenta cloud (primero protege el acceso, luego limpia lo existente y al final monitorea):",
      items: [
        "Password única fuerte",
        "Activar MFA",
        "Cerrar sesiones/dispositivos desconocidos",
        "Activar alertas de login sospechoso"
      ],
      answer: [0, 1, 2, 3],
      explain: "Protege credenciales (password + MFA), cierra sesiones/dispositivos desconocidos y deja alertas para lo que venga. Identidad es el nuevo perímetro."
    },
    {
      id: "sec19", level: 2, type: "scenario",
      q: "Extensión del navegador pide leer todos los datos de todos los sitios. Riesgo:",
      options: [
        "Puede robar cookies/sesiones; desconfía",
        "Ninguno si viene de la tienda oficial",
        "Solo gasta más RAM, sin riesgo real",
        "Solo afecta a sitios HTTP, no a HTTPS"
      ],
      answer: 0,
      explain: "Revisa permisos y reputación."
    },
    {
      id: "sec20", level: 2, type: "tf",
      q: "Tener backups basta, aunque nunca se haya probado restaurarlos.",
      answer: false,
      explain: "Falso: un backup no probado puede fallar justo durante un ransomware. Prueba restauraciones y guarda copias offline o inmutables."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "sec21", level: 3, type: "mc",
      q: "Un attack surface amplio significa…",
      options: [
        "Más puntos por donde pueden atacarte",
        "Más FPS",
        "Mejor calidad de impresión",
        "Más VLANs automáticamente seguras"
      ],
      answer: 0,
      explain: "Reduce servicios expuestos y parchea."
    },
    {
      id: "sec22", level: 3, type: "scenario",
      q: "Sospechas de token OAuth robado. Acción típica:",
      options: [
        "Revocar sesiones/tokens, rotar secretos, revisar logs",
        "Cambiar solo la contraseña del usuario y seguir igual",
        "Esperar a que el token caduque solo y no hacer nada",
        "Reinstalar el navegador del usuario"
      ],
      answer: 0,
      explain: "Contención de identidad + forense ligero."
    },
    {
      id: "sec23", level: 3, type: "mc",
      q: "El principio Zero Trust asume…",
      options: [
        "No confiar solo por estar en la LAN; verificar siempre",
        "Que todo lo que está dentro de la red es de confianza",
        "Que basta con una VPN para confiar en cualquier equipo",
        "Que USB es seguro"
      ],
      answer: 0,
      explain: "Verifica identidad, dispositivo y contexto."
    },
    {
      id: "sec24", level: 3, type: "fill",
      q: "Sigla de lista de control de acceso (inglés):",
      answer: "ACL",
      accept: ["ACL", "acl"],
      explain: "ACLs en firewalls/filesystems limitan quién hace qué."
    },
    {
      id: "sec25", level: 3, type: "order",
      q: "Ordena respuesta a incidente (IR) simplificada:",
      items: ["Identificar/contener", "Erradicar", "Recuperar", "Lecciones aprendidas"],
      answer: [0, 1, 2, 3],
      explain: "NIST/SANS condensado para help desk."
    },
    {
      id: "sec26", level: 3, type: "match",
      q: "Empareja control:",
      pairs: [
        { left: "Cifrado en reposo", right: "BitLocker/disk encryption" },
        { left: "Cifrado en tránsito", right: "TLS/VPN" },
        { left: "Hardening", right: "Desactivar servicios innecesarios" },
        { left: "Patching", right: "Aplicar actualizaciones de seguridad" }
      ],
      explain: "Controles preventivos clave."
    },
    {
      id: "sec27", level: 3, type: "tf",
      q: "Exponer RDP (3389) directo a Internet es seguro si la contraseña es larga.",
      answer: false,
      explain: "Falso: un RDP expuesto recibe fuerza bruta y exploits constantes. Ponlo detrás de una VPN o gateway, con NLA y MFA, y bloquea los intentos repetidos."
    },
    {
      id: "sec28", level: 3, type: "scenario",
      q: "Empleado reenvió nómina a Gmail personal. Riesgo principal:",
      options: [
        "Fuga de datos / violación de política",
        "Que se borre el correo original del servidor",
        "Spam en el buzón del empleado",
        "Retrasos en el envío por el tamaño del adjunto"
      ],
      answer: 0,
      explain: "DLP y concienciación mitigan shadow IT."
    },
    {
      id: "sec29", level: 3, type: "mc",
      q: "Un hash de password se usa para…",
      options: [
        "Almacenar verificadores sin guardar la clave en claro",
        "Cifrar la contraseña para poder descifrarla al iniciar sesión",
        "Comprimir la contraseña para que ocupe menos en la base",
        "Generar contraseñas aleatorias"
      ],
      answer: 0,
      explain: "Con salt + algoritmo moderno (bcrypt/argon2)."
    },
    {
      id: "sec30", level: 3, type: "identify",
      q: "Framework común de gestión de riesgos/controles en empresas:",
      options: [
        "ISO 27001 / NIST CSF",
        "ISO 8601 / RFC 3339",
        "IEEE 802.3 / IEEE 802.11",
        "RFC 1918 / RFC 4193"
      ],
      answer: 0,
      explain: "Son ejemplos: ayudan a organizar controles y auditorías."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "secL4a", level: 4, type: "mc",
      q: "Un SOC típicamente…",
      options: [
        "Monitorea alertas de seguridad y coordina respuesta",
        "Gestiona las altas de usuarios y el inventario de equipos",
        "Desarrolla y despliega las aplicaciones internas",
        "Administra el cableado y los switches del edificio"
      ],
      answer: 0,
      explain: "Security Operations Center."
    },
    {
      id: "secL4b", level: 4, type: "tf",
      q: "El principle of least privilege aplica también a tokens OAuth y service accounts.",
      answer: true,
      explain: "Scopes mínimos y rotación."
    },
    {
      id: "secL4c", level: 4, type: "scenario",
      q: "Empleado reporta USB \"de RH\" en el baño. Acción:",
      options: [
        "No conectar; reportar a seguridad física/TI",
        "Abrirlo en tu equipo con el antivirus actualizado",
        "Conectarlo en un PC de RH, ya que parece suyo",
        "Formatearlo en tu PC y reutilizarlo"
      ],
      answer: 0,
      explain: "USB baiting."
    },
    {
      id: "secL4d", level: 4, type: "fill",
      q: "Sigla de gestión de identidad y acceso:",
      answer: "IAM",
      accept: ["IAM", "iam"],
      explain: "Identity and Access Management."
    },
    {
      id: "secL4e", level: 4, type: "mc",
      q: "SPF/DKIM/DMARC ayudan a…",
      options: [
        "Autenticar correo y reducir spoofing de dominio",
        "Cifrar el contenido del correo de extremo a extremo",
        "Filtrar adjuntos con malware antes de entregarlos",
        "Acelerar la entrega de correo"
      ],
      answer: 0,
      explain: "Endurece el email del dominio."
    },
    {
      id: "secL4f", level: 4, type: "match",
      q: "Empareja la herramienta de seguridad con su función:",
      pairs: [
        { left: "SIEM", right: "Correlación de logs/alertas" },
        { left: "EDR", right: "Detección en endpoints" },
        { left: "WAF", right: "Protección apps web" },
        { left: "VPN", right: "Túnel cifrado remoto" }
      ],
      explain: "Controles."
    },
    {
      id: "secL4g", level: 4, type: "order",
      q: "Ordena los pasos para endurecer una cuenta admin en la nube (empieza por la contraseña y deja el monitoreo al final):",
      items: [
        "Password manager + única",
        "MFA fuerte (FIDO2)",
        "PIM/JIT privilegios",
        "Alertas y revisión de logs"
      ],
      answer: [0, 1, 2, 3],
      explain: "Contraseña única en gestor → MFA resistente a phishing (FIDO2) → PIM/JIT, que exige ese MFA al elevar privilegios → alertas y revisión de logs. Una cuenta admin con privilegios siempre activos es un riesgo."
    },
    {
      id: "secL4h", level: 4, type: "tf",
      q: "Un CASB sirve para cifrar los discos de los portátiles.",
      answer: false,
      explain: "Falso: un CASB (Cloud Access Security Broker) da visibilidad y control sobre el uso de SaaS (shadow IT, DLP). El cifrado de discos es BitLocker o FileVault."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "secL5a", level: 5, type: "mc",
      q: "Un ataque a la cadena de suministro (supply-chain attack) compromete…",
      options: [
        "Dependencias/proveedores para llegar a ti",
        "Tu contraseña probando combinaciones por fuerza bruta",
        "Tu sesión interceptando el tráfico de un Wi‑Fi público",
        "Tu equipo mediante un USB abandonado"
      ],
      answer: 0,
      explain: "Verifica firmas y SBOMs."
    },
    {
      id: "secL5b", level: 5, type: "scenario",
      q: "Detectas Cobalt Strike beacon. Contención:",
      options: [
        "Aislar host, reset credenciales, cazar lateral movement",
        "Borrar el binario del beacon y dar el incidente por cerrado",
        "Reiniciar el host y seguir operando con normalidad",
        "Pasar un antivirus completo y esperar su resultado"
      ],
      answer: 0,
      explain: "Preserva la evidencia volátil (RAM, conexiones) si forense lo pide: reiniciar el host la destruye."
    },
    {
      id: "secL5c", level: 5, type: "fill",
      q: "Sigla de análisis de comportamiento de usuarios/entidades:",
      answer: "UEBA",
      accept: ["UEBA", "ueba"],
      explain: "User and Entity Behavior Analytics."
    },
    {
      id: "secL5d", level: 5, type: "mc",
      q: "Certificate pinning en apps móviles busca…",
      options: [
        "Mitigar MITM con CAs no esperadas",
        "Cifrar los datos guardados en el teléfono",
        "Renovar certificados sin publicar otra versión",
        "Acelerar DNS con resolución local"
      ],
      answer: 0,
      explain: "Tiene trade-offs de rotación."
    },
    {
      id: "secL5e", level: 5, type: "identify",
      q: "Estándar de cifrado de discos en Windows empresarial común:",
      options: ["BitLocker", "Notepad", "Paint", "Solitaire"],
      answer: 0,
      explain: "Con TPM + escrow de claves."
    },
    {
      id: "secL5f", level: 5, type: "order",
      q: "Ordena tabletop de ransomware:",
      items: [
        "Definir escenario",
        "Roles y comunicaciones",
        "Decidir aislamiento/restore",
        "Documentar gaps"
      ],
      answer: [0, 1, 2, 3],
      explain: "Ensayar antes del incidente real."
    },
    {
      id: "secL5g", level: 5, type: "tf",
      q: "Exponer Elasticsearch/Redis sin auth a Internet es una mala práctica grave.",
      answer: true,
      explain: "Muchas brechas empiezan así."
    },
    {
      id: "secL5h", level: 5, type: "scenario",
      q: "Phishing captura session cookie. Mitigación moderna:",
      options: [
        "Tokens de corta vida, binding, logout global, MFA step-up",
        "Alargar la vida de la cookie para evitar nuevos logins",
        "Mover el token de sesión de la cookie a localStorage",
        "Quitar HttpOnly para vigilar la cookie desde JavaScript"
      ],
      answer: 0,
      explain: "Session theft es real."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "secB1", level: 5, type: "scenario",
      q: "BOSS: Campaña de phishing masiva con dominio lookalike. ¿Primera contención?",
      options: [
        "Alertar usuarios, bloquear dominio/URL, resetear cuentas que interactuaron",
        "Pedir que reenvíen el correo a toda la empresa como advertencia",
        "Desactivar el antispam para ver todos los correos que llegan",
        "Esperar a que el proveedor de correo lo detecte, sin avisar a nadie"
      ],
      answer: 0,
      explain: "Comunicación + bloqueo + identidad."
    },
    {
      id: "secB2", level: 5, type: "mc",
      q: "BOSS: Ransomware en un file share. Prioridad:",
      options: [
        "Aislar hosts, preservar evidencias, restaurar desde backup limpio",
        "Pagar el rescate de inmediato para recuperar los archivos",
        "Restaurar el backup sobre los hosts infectados sin aislarlos",
        "Apagar los logs para que el atacante no detecte la respuesta"
      ],
      answer: 0,
      explain: "Contención y recuperación probada."
    },
    {
      id: "secB3", level: 5, type: "order",
      q: "BOSS: Cuenta admin comprometida:",
      items: [
        "Deshabilitar la cuenta y cerrar sus sesiones activas",
        "Revocar tokens y rotar secretos a los que tuvo acceso",
        "Auditar los cambios que hizo la cuenta",
        "Revertir cambios maliciosos y documentar"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero corta todo acceso (cuenta, sesiones, tokens y secretos); luego investiga qué cambió y al final remedia lo encontrado."
    },
    {
      id: "secB4", level: 5, type: "tf",
      q: "BOSS: El logging centralizado ayuda a detectar y investigar incidentes.",
      answer: true,
      explain: "SIEM/consultas correlacionan eventos."
    },
    {
      id: "secB5", level: 5, type: "fill",
      q: "BOSS: Factor 'algo que tienes' en MFA (ejemplo corto: app o …):",
      answer: "token",
      accept: [
        "token",
        "llave",
        "key",
        "app",
        "telefono",
        "teléfono",
        "telefono celular",
        "teléfono celular",
        "otp",
        "totp",
        "celular",
        "movil",
        "móvil",
        "smartphone",
        "sms",
        "yubikey",
        "fido",
        "fido2",
        "passkey",
        "llave fisica",
        "llave física",
        "llave usb",
        "llave de seguridad",
        "security key",
        "token fisico",
        "token físico",
        "hardware token",
        "token de hardware",
        "tarjeta inteligente",
        "smartcard",
        "smart card",
        "autenticador",
        "authenticator",
        "telefono movil",
        "teléfono móvil",
        "llave fido",
        "llave fido2",
        "llave de hardware",
        "token usb",
        "token bancario",
        "tarjeta",
        "tarjeta de coordenadas"
      ],
      explain: "Token/app/llave física complementan la password."
    }
  ]
});
