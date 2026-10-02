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
      explain: "El phishing es ingeniería social: correos, SMS o sitios falsos que imitan a marcas legítimas para que entregues contraseñas o datos. Saturar un servidor con tráfico sería un ataque DoS."
    },
    {
      id: "sec02", level: 1, type: "tf",
      q: "Una contraseña larga y única por sitio es mejor que reutilizar '123456'.",
      answer: true,
      explain: "Verdadero: una contraseña larga y distinta en cada sitio resiste la fuerza bruta y evita que una filtración abra tus otras cuentas. Usa un gestor de contraseñas y activa MFA."
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
      explain: "MFA es autenticación multifactor: combina al menos dos tipos de factor, como algo que sabes (contraseña), algo que tienes (teléfono o llave) o algo que eres (huella)."
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
      explain: "Urgencia, un enlace que no lleva al dominio oficial y un remitente raro son señales clásicas. Pasa el cursor sobre el enlace sin hacer clic y confirma por un canal oficial."
    },
    {
      id: "sec05", level: 1, type: "fill",
      q: "Término corto en inglés (contracción de 'malicious software') para software malicioso:",
      answer: "malware",
      accept: ["malware", "Malware"],
      explain: "Malware viene de malicious software y abarca cualquier programa dañino: virus, gusanos, troyanos, ransomware, spyware y más."
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
      explain: "Los parches corrigen vulnerabilidades conocidas que un atacante podría explotar. Pero no sustituyen los backups ni recuperan archivos que un ransomware ya cifró."
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
      explain: "Soporte legítimo nunca necesita tu contraseña. Cuelga y confirma con la mesa de ayuda por su número oficial; que sepa tu nombre y puesto no prueba nada, es un truco común de ingeniería social."
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
      explain: "Un antivirus o EDR vigila el endpoint (la computadora) para detectar y bloquear malware y comportamientos sospechosos. Es una capa más: no reemplaza los backups ni el firewall."
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
      explain: "El ransomware cifra tus archivos y exige un pago por la clave para descifrarlos. Para recuperarte sin pagar necesitas backups offline o inmutables; registrar teclas es lo que hace un keylogger."
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
      explain: "Dejar memorias USB tiradas para que alguien las conecte (USB baiting) es un vector real de malware. No la conectes en ningún equipo, menos en un servidor como el DC; repórtala a TI."
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
      explain: "Mínimo privilegio es dar a cada cuenta solo los permisos que necesita para su tarea. Si la comprometen, el daño queda limitado; dar de más y quitar después de un incidente llega tarde."
    },
    {
      id: "sec14", level: 2, type: "tf",
      q: "Una VPN corporativa cifra el tráfico hacia la red de la empresa.",
      answer: true,
      explain: "Verdadero: la VPN crea un túnel cifrado entre tu equipo y la red de la empresa, muy útil en Wi-Fi públicas. Aun así, no te protege si caes en un phishing."
    },
    {
      id: "sec15", level: 2, type: "fill",
      q: "Ataque que satura un servicio para tumbarlo (sigla):",
      answer: "DDoS",
      accept: ["DDoS", "ddos", "DoS", "dos"],
      explain: "Un DoS (Denial of Service) satura un servicio con peticiones hasta dejarlo inaccesible; si el tráfico viene de muchos equipos a la vez, como una botnet, es un DDoS (Distributed DoS)."
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
      explain: "Phishing es engaño para robar datos y malware es software dañino; shoulder surfing (mirar tu pantalla) y tailgating (colarse detrás de alguien) son ataques físicos de ingeniería social."
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
      explain: "Los códigos por SMS se pueden robar con SIM swapping. Una app TOTP, que genera los códigos en tu teléfono, o una llave FIDO2 son más fuertes; la llave además resiste el phishing."
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
      explain: "Con permiso para leer y cambiar datos en todos los sitios, la extensión puede ver lo que escribes y robar sesiones, incluso en HTTPS. Estar en la tienda oficial no garantiza que sea segura."
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
      explain: "La superficie de ataque es el conjunto de puntos por donde pueden atacarte: puertos, servicios, apps y cuentas. Mientras más amplia, más riesgo; redúcela apagando lo innecesario y parchando."
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
      explain: "Hay que contener la identidad: revocar tokens y sesiones, rotar secretos y revisar logs. Cambiar solo la contraseña no basta, porque un token ya emitido puede seguir siendo válido."
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
      explain: "Zero Trust significa no confiar en nada solo por estar dentro de la red: cada acceso se verifica con identidad, estado del dispositivo y contexto. Ni la LAN ni la VPN dan confianza por sí solas."
    },
    {
      id: "sec24", level: 3, type: "fill",
      q: "Sigla de lista de control de acceso (inglés):",
      answer: "ACL",
      accept: ["ACL", "acl"],
      explain: "ACL (Access Control List) es una lista de reglas que define quién puede acceder a un recurso y con qué permisos. Se usa en firewalls, routers y sistemas de archivos.",
      try: "En cmd escribe `icacls \"%USERPROFILE%\"` y mira qué usuarios y grupos tienen permisos sobre tu carpeta personal: F es control total, M modificar y RX leer y ejecutar."
    },
    {
      id: "sec25", level: 3, type: "order",
      q: "Ordena respuesta a incidente (IR) simplificada:",
      items: ["Identificar/contener", "Erradicar", "Recuperar", "Lecciones aprendidas"],
      answer: [0, 1, 2, 3],
      explain: "Primero identificas y contienes para frenar el daño, luego erradicas la causa, después recuperas los sistemas y al final documentas lecciones aprendidas. Es el ciclo de NIST/SANS resumido."
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
      explain: "En reposo protege datos guardados (BitLocker cifra el disco) y en tránsito los que viajan (TLS, VPN). Hardening reduce lo expuesto apagando servicios y patching corrige fallos con actualizaciones."
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
      explain: "Sacar datos sensibles como la nómina a una cuenta personal es una fuga de datos y viola la política, aunque no haya mala intención. Controles DLP y capacitación ayudan a evitarlo."
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
      explain: "Un hash es de una sola vía: se guarda el hash y al iniciar sesión se compara con el hash de lo que escribes, sin descifrar nada. Debe llevar salt y un algoritmo lento como bcrypt o Argon2."
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
      explain: "ISO 27001 y NIST CSF son marcos para gestionar riesgos y organizar controles de seguridad, y sirven de base para auditorías. ISO 8601 es formato de fechas e IEEE 802.3 es Ethernet."
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
      explain: "Un SOC (Security Operations Center) es el equipo que vigila alertas de seguridad, a menudo 24/7 con un SIEM, y coordina la respuesta a incidentes. Altas de usuarios e inventario son tareas de TI."
    },
    {
      id: "secL4b", level: 4, type: "tf",
      q: "El principle of least privilege aplica también a tokens OAuth y service accounts.",
      answer: true,
      explain: "Verdadero: un token o una cuenta de servicio también puede ser robado, así que debe tener solo los scopes y permisos mínimos y sus secretos deben rotarse con regularidad."
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
      explain: "Es USB baiting: una memoria con etiqueta atractiva para que alguien la conecte. No la conectes en ningún equipo, ni con antivirus ni en RH; entrégala a seguridad o TI para que la analicen."
    },
    {
      id: "secL4d", level: 4, type: "fill",
      q: "Sigla de gestión de identidad y acceso:",
      answer: "IAM",
      accept: ["IAM", "iam"],
      explain: "IAM (Identity and Access Management) agrupa los procesos y herramientas que gestionan identidades y permisos: altas, bajas, MFA, roles y quién puede acceder a qué."
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
      explain: "SPF dice qué servidores pueden enviar correo de tu dominio, DKIM firma los mensajes y DMARC indica qué hacer si fallan. Juntos reducen el spoofing, pero no cifran el contenido.",
      try: "En cmd escribe `nslookup -type=txt google.com` y busca el registro que empieza con v=spf1: es el SPF que dice qué servidores pueden enviar correo de ese dominio."
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
      explain: "El SIEM centraliza y correlaciona logs para generar alertas, el EDR detecta y responde en cada equipo, el WAF filtra ataques a apps web y la VPN crea un túnel cifrado para el acceso remoto."
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
      explain: "En un ataque a la cadena de suministro comprometen a un proveedor, una librería o una actualización en la que confías para llegar a ti. Verificar firmas y tener un SBOM ayudan a reducir el riesgo."
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
      explain: "UEBA (User and Entity Behavior Analytics) aprende el comportamiento normal de usuarios y equipos y alerta ante anomalías, como un login de madrugada desde otro país o descargas masivas."
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
      explain: "Con pinning, la app solo acepta el certificado o la clave pública que espera, así que un MITM con certificado de otra CA falla. La contra: complica la rotación de certificados."
    },
    {
      id: "secL5e", level: 5, type: "identify",
      q: "Estándar de cifrado de discos en Windows empresarial común:",
      options: ["BitLocker", "Notepad", "Paint", "Solitaire"],
      answer: 0,
      explain: "BitLocker es el cifrado de disco incluido en Windows Pro y Enterprise. Suele usar el TPM para proteger la clave y guardar la clave de recuperación en AD o Entra ID por si hay que desbloquear."
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
      explain: "Un tabletop es un simulacro de mesa: defines el escenario, asignas roles y canales de comunicación, el equipo decide si aislar o restaurar y al final documentas los huecos encontrados para corregirlos."
    },
    {
      id: "secL5g", level: 5, type: "tf",
      q: "Exponer Elasticsearch/Redis sin auth a Internet es una mala práctica grave.",
      answer: true,
      explain: "Verdadero: hay bots que escanean Internet buscando Elasticsearch o Redis abiertos para robar, borrar o secuestrar los datos. Ponlos en red privada, con autenticación y firewall."
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
      explain: "Una cookie robada permite entrar sin contraseña ni MFA. Tokens de corta vida ligados al dispositivo, logout global y MFA extra en acciones sensibles limitan el daño; quitar HttpOnly lo empeora."
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
      explain: "Primero contén: avisa a los usuarios, bloquea el dominio y las URLs en correo, proxy y DNS, y resetea credenciales y sesiones de quien interactuó. Reenviar el correo a todos solo lo propaga."
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
      explain: "Aísla primero los equipos afectados para frenar el cifrado, preserva evidencias y restaura desde un backup limpio y probado. Restaurar sin aislar deja que el ransomware vuelva a cifrar."
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
      explain: "Verdadero: juntar en un SIEM los logs de servidores, equipos y nube permite correlacionar eventos, detectar patrones y reconstruir la línea de tiempo de un incidente."
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
      explain: "Algo que tienes es un objeto en tu poder: un token, tu teléfono con app autenticadora o una llave FIDO2. Se combina con algo que sabes (contraseña) o algo que eres (huella)."
    }
  ]
});
