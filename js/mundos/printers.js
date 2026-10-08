/**
 * Tech Quest — Mundo Impresoras
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "printers",
  name: "Impresoras",
  icon: "🖨️",
  color: "#ff66aa",
  description: "Drivers, spooler, colas, red e IPP — nivel intermedio–avanzado.",

  questions: [
    // ——— Nivel 1: Básico (15 preguntas) ———
    {
      id: "pr01", level: 1, type: "mc",
      q: "¿Qué servicio de Windows gestiona la cola de impresión?",
      options: [
        "Spooler (Print Spooler)",
        "BITS (Background Intelligent Transfer)",
        "Windows Search (WSearch)",
        "Task Scheduler (Schedule)"
      ],
      answer: 0,
      explain: "Print Spooler (spoolsv.exe) encola trabajos. Si falla, reinícialo en services.msc.",
      try: "En PowerShell escribe `Get-Service Spooler` y fíjate si Status dice Running: ese es el servicio que maneja la cola de impresión."
    },
    {
      id: "pr02", level: 1, type: "mc",
      q: "Un driver de impresora incorrecto suele causar…",
      options: [
        "Que la impresora pierda la IP asignada por DHCP",
        "Errores, caracteres basura o que no imprima",
        "Desgaste prematuro del tambor fotosensible",
        "Que el firewall bloquee el puerto 9100"
      ],
      answer: 1,
      explain: "Instala el driver del fabricante o el genérico correcto (PCL/PS/IPP) según el modelo."
    },
    {
      id: "pr03", level: 1, type: "order",
      q: "Ordena el diagnóstico básico cuando no imprime:",
      items: [
        "Verificar alimentación y conexión (USB/red)",
        "Comprobar que es la impresora predeterminada",
        "Revisar cola / reiniciar Spooler",
        "Probar página de prueba / reinstalar driver"
      ],
      answer: [0, 1, 2, 3],
      explain: "De lo físico a lo lógico: alimentación y conexión (USB/red) → impresora predeterminada → cola/Spooler → página de prueba/driver."
    },
    {
      id: "pr04", level: 1, type: "mc",
      q: "IPP en impresión en red significa…",
      options: [
        "Internet Printing Protocol",
        "Internal Paper Protocol",
        "Intranet Printer Provisioning",
        "Integrated Print Processor"
      ],
      answer: 0,
      explain: "IPP (suele usar el puerto 631) permite imprimir por IP/hostname. AirPrint y muchas MFP lo usan."
    },
    {
      id: "pr05", level: 1, type: "identify",
      q: "¿Qué indica un LED o mensaje de 'Tóner bajo'?",
      options: [
        "El cartucho de tóner está casi agotado",
        "La bandeja de papel principal está vacía",
        "El depósito de tóner residual está lleno",
        "El Spooler del PC está detenido"
      ],
      answer: 0,
      explain: "Sustituye o agita el cartucho según el modelo. No confundir con 'Atasco de papel'."
    },
    {
      id: "pr06", level: 1, type: "match",
      q: "Relaciona tipo de conexión con característica:",
      pairs: [
        { left: "USB", right: "Conexión directa al PC" },
        { left: "Ethernet", right: "IP fija o DHCP en LAN" },
        { left: "Wi-Fi", right: "Misma red inalámbrica" },
        { left: "Cola compartida", right: "PC servidor comparte la impresora" }
      ],
      explain: "En oficinas suele preferirse red (Ethernet/Wi-Fi) para varios usuarios."
    },
    {
      id: "pr07", level: 1, type: "fill",
      q: "Tipo de impresora que usa cartuchos de tinta líquida en lugar de tóner:",
      answer: "inyección de tinta",
      accept: [
        "inyección de tinta",
        "inyeccion de tinta",
        "de inyección de tinta",
        "de inyeccion de tinta",
        "impresora de inyección de tinta",
        "impresora de inyeccion de tinta",
        "inyección",
        "inyeccion",
        "chorro de tinta",
        "de chorro de tinta",
        "impresora de chorro de tinta",
        "inkjet",
        "ink jet",
        "ink-jet",
        "impresora inkjet",
        "de inyección",
        "de inyeccion",
        "impresora de inyección",
        "impresora de inyeccion"
      ],
      explain: "Las de inyección (o chorro) de tinta, inkjet, usan tinta líquida; las láser usan tóner en polvo y un tambor."
    },
    {
      id: "pr08", level: 1, type: "mc",
      q: "Trabajos atascados en la cola. Acción frecuente:",
      options: [
        "Detener Spooler, vaciar System32\\spool\\PRINTERS e iniciarlo de nuevo",
        "Ejecutar chkdsk /f en C: y desfragmentar la carpeta System32",
        "Renovar la IP con ipconfig /renew y vaciar la caché DNS del PC",
        "Reiniciar Windows Update y vaciar C:\\Windows\\SoftwareDistribution"
      ],
      answer: 0,
      explain: "Detén Spooler, vacía la carpeta de spool, inicia Spooler de nuevo. Con cuidado y permisos admin."
    },
    {
      id: "pr09", level: 1, type: "mc",
      q: "Para agregar impresora por IP en Windows suele usarse:",
      options: [
        "Puerto TCP/IP estándar (o IPP) con la IP del dispositivo",
        "Un puerto COM virtual configurado con la MAC de la impresora",
        "Una entrada en el archivo hosts con la IP del dispositivo",
        "Emparejamiento Bluetooth usando la MAC del dispositivo"
      ],
      answer: 0,
      explain: "Configuración → Impresoras → Agregar → TCP/IP o hostname. Verifica ping a la IP primero."
    },
    {
      id: "pr10", level: 1, type: "mc",
      q: "Atasco de papel: primer paso seguro:",
      options: [
        "Abrir tapas, retirar papel en la dirección del paso (sin forzar)",
        "Tirar del papel en sentido contrario al paso para sacarlo más rápido",
        "Reiniciar el Spooler en el PC y reenviar el trabajo a la cola",
        "Reinstalar el driver para que se recalibre el sensor de papel"
      ],
      answer: 0,
      explain: "Sigue las guías del fabricante. Revisa rodillos y sensores después del atasco."
    },
    {
      id: "prL1a", level: 1, type: "mc",
      q: "Si la impresora no enciende, lo primero es revisar…",
      options: [
        "Alimentación y cable de corriente",
        "El driver y la cola del Spooler en el PC",
        "La dirección IP y la máscara de subred",
        "El nivel de tóner y el contador de páginas"
      ],
      answer: 0,
      explain: "Siempre empieza por lo físico: corriente, cable, interruptor."
    },
    {
      id: "prL1b", level: 1, type: "tf",
      q: "Si la página de prueba de la impresora sale bien, el problema está seguro en el hardware de la impresora.",
      answer: false,
      explain: "Falso: si la página de prueba sale bien, la impresora funciona; el fallo suele estar en el documento, la aplicación o el driver."
    },
    {
      id: "prL1c", level: 1, type: "identify",
      q: "Indicador típico de papel atascado:",
      options: [
        "Mensaje/LED de jam o paper jam",
        "Mensaje/LED de 'toner low'",
        "Aviso 'Replace drum' en el panel",
        "LED de Wi‑Fi parpadeando en azul"
      ],
      answer: 0,
      explain: "'Jam' o 'paper jam' indica papel atascado; 'toner low' y 'Replace drum' son avisos de consumibles."
    },
    {
      id: "prL1d", level: 1, type: "mc",
      q: "USB vs red para una sola persona en casa: suele ser más simple…",
      options: [
        "USB directo al PC",
        "Un print server Windows dedicado",
        "Cola LPR en un servidor Linux",
        "Impresión SMB vía otro PC del dominio"
      ],
      answer: 0,
      explain: "USB es plug-and-play. Red brilla cuando hay varios usuarios."
    },
    {
      id: "prL1e", level: 1, type: "fill",
      q: "Desde Win+R, para abrir Dispositivos e impresoras escribe: control ______",
      answer: "printers",
      accept: ["printers", "control printers"],
      explain: "control printers abre Dispositivos e impresoras (en versiones recientes puede llevar a Configuración → Impresoras y escáneres).",
      try: "En Windows presiona Win+R, escribe `control printers` y Enter: se abre Dispositivos e impresoras o Impresoras y escáneres, según tu versión."
    },

    // ——— Nivel 2: Intermedio (14 preguntas) ———
    {
      id: "pr11", level: 2, type: "mc",
      q: "Una impresora de red no aparece. ¿Qué revisar primero a nivel red?",
      options: [
        "Misma VLAN/subred, IP, ping y firewall",
        "El nivel de tóner y el contador de páginas",
        "La resolución DPI y el perfil de color del driver",
        "La versión de BIOS y los drivers de chipset del PC"
      ],
      answer: 0,
      explain: "Sin conectividad IP no habrá descubrimiento ni puerto 9100/IPP. Revisa también discovery (mDNS/WS-Discovery)."
    },
    {
      id: "pr12", level: 2, type: "order",
      q: "Ordena pasos para instalar impresora de red por IP:",
      items: [
        "Obtener IP de la impresora (panel o DHCP)",
        "Hacer ping a la IP desde el PC",
        "Agregar impresora TCP/IP o IPP",
        "Instalar/seleccionar driver y página de prueba"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero necesitas la IP y confirmar con ping que el PC la alcanza: sin red, ningún puerto ni driver va a funcionar. Luego creas el puerto TCP/IP o IPP, eliges el driver y validas con una página de prueba."
    },
    {
      id: "pr13", level: 2, type: "mc",
      q: "El puerto TCP 9100 suele asociarse a…",
      options: [
        "Impresión raw / JetDirect",
        "Impresión cifrada IPPS (TLS)",
        "Descubrimiento mDNS / Bonjour",
        "Servidor web embebido (EWS)"
      ],
      answer: 0,
      explain: "Muchas impresoras de red aceptan trabajos en 9100 (AppSocket/JetDirect). IPP e IPPS suelen usar 631, mDNS 5353/UDP y el portal web 80/443."
    },
    {
      id: "pr14", level: 2, type: "mc",
      q: "Diferencia introductoria PCL vs PostScript:",
      options: [
        "PCL (HP) y PS (Adobe) son lenguajes de descripción de página; el driver debe coincidir",
        "PCL solo funciona en Mac y PostScript solo en impresoras de inyección de tinta",
        "Son protocolos de red: PCL usa el puerto 9100 y PostScript el puerto 631",
        "Son formatos de cartucho: PCL para tóner negro y PostScript para color"
      ],
      answer: 0,
      explain: "Si eliges el lenguaje incorrecto verás caracteres basura o trabajos fallidos. Algunas MFP soportan ambos."
    },
    {
      id: "pr15", level: 2, type: "tf",
      q: "LPR/LPD usa normalmente el puerto 9100.",
      answer: false,
      explain: "Falso: LPR/LPD usa el puerto 515, no el 9100. Hoy IPP (631) es la opción más moderna."
    },
    {
      id: "pr16", level: 2, type: "scenario",
      q: "Escenario: varios usuarios imprimen vía un servidor Windows. ¿Concepto clave?",
      options: [
        "Print server / cola compartida en el servidor",
        "Cada uno debe usar solo USB al mismo tiempo",
        "Desactivar el Spooler del servidor siempre",
        "Mapear una unidad de red con la IP de la impresora"
      ],
      answer: 0,
      explain: "El print server centraliza drivers y colas; los clientes apuntan al recurso compartido \\\\servidor\\impresora."
    },
    {
      id: "pr17", level: 2, type: "mc",
      q: "Impresión por SMB significa típicamente…",
      options: [
        "Compartir la impresora como recurso de red Windows (\\\\host\\share)",
        "Enviar el documento por correo SMTP a la dirección de la impresora",
        "Conectar la impresora por Wi‑Fi Direct sin pasar por el router",
        "Descubrir la impresora vía mDNS/Bonjour e imprimir por IPP"
      ],
      answer: 0,
      explain: "SMB/CIFS expone la cola como \\\\servidor\\impresora. Útil en dominios; requiere permisos correctos en la pestaña Seguridad de la impresora compartida."
    },
    {
      id: "pr18", level: 2, type: "order",
      q: "Ordena el flujo para limpiar una cola atascada (Windows):",
      items: [
        "Detener el servicio Print Spooler",
        "Vaciar archivos en spool\\PRINTERS (con cuidado)",
        "Iniciar de nuevo Print Spooler",
        "Reenviar una página de prueba"
      ],
      answer: [0, 1, 2, 3],
      explain: "Nunca borres el spool con el servicio en ejecución: puede corromper estados."
    },
    {
      id: "pr19", level: 2, type: "mc",
      q: "¿Qué es el tambor (drum) en una láser?",
      options: [
        "Pieza fotosensible que transfiere tóner al papel; a veces se desgasta aparte del cartucho",
        "Rodillo térmico (fusor) que funde el tóner sobre el papel con calor y presión",
        "Depósito que recoge el tóner sobrante; en algunos modelos va aparte del cartucho",
        "Rodillo de goma que toma las hojas de la bandeja y las arrastra al interior"
      ],
      answer: 0,
      explain: "En kits separados, tóner bajo ≠ drum agotado. Rayas o manchas pueden indicar drum sucio/agotado."
    },
    {
      id: "prL2a", level: 2, type: "mc",
      q: "WSD en impresión Windows significa a grandes rasgos…",
      options: [
        "Web Services for Devices (descubrimiento)",
        "Windows Shared Driver (paquete de drivers)",
        "Wireless Secure Direct (conexión Wi‑Fi Direct)",
        "Web Spool Directory (carpeta de spool)"
      ],
      answer: 0,
      explain: "WSD ayuda a descubrir dispositivos; a veces se prefiere puerto TCP/IP estándar por estabilidad."
    },
    {
      id: "prL2b", level: 2, type: "scenario",
      q: "Cola en 'Error - imprimiendo' eternamente. Paso frecuente:",
      options: [
        "Reiniciar Spooler y limpiar trabajos atascados",
        "Reemplazar el cartucho de tóner y la unidad de tambor",
        "Renovar la IP del PC con ipconfig /renew",
        "Reiniciar el servicio DHCP del servidor"
      ],
      answer: 0,
      explain: "Spooler + carpeta de spool + driver correcto resuelven muchos atascos lógicos."
    },
    {
      id: "prL2c", level: 2, type: "order",
      q: "Ordena cómo compartir una impresora desde un print server Windows:",
      items: [
        "Instalar la impresora y su driver en el servidor",
        "Compartirla con un nombre y ajustar sus permisos",
        "Conectar desde el cliente a \\\\servidor\\impresora",
        "Imprimir una página de prueba desde el cliente"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero la impresora debe funcionar en el servidor; luego se comparte con sus permisos, el cliente se conecta a la cola compartida (y descarga el driver) y al final se valida con una página de prueba."
    },
    {
      id: "prL2d", level: 2, type: "mc",
      q: "SNMP en impresoras de red sirve para…",
      options: [
        "Monitorear estado (tóner, bandejas, errores)",
        "Asignar la IP de la impresora en lugar de DHCP",
        "Cifrar los trabajos entre el PC y la impresora",
        "Autenticar a los usuarios antes de liberar sus trabajos"
      ],
      answer: 0,
      explain: "SNMP consulta el estado del equipo (tóner, bandejas, errores, contadores) leyendo sus OID; así trabajan las consolas de gestión de flota. No asigna la IP (eso es DHCP o IP fija) ni cifra los trabajos."
    },
    {
      id: "prL2e", level: 2, type: "tf",
      q: "Un print server puede desplegar drivers a clientes vía point-and-print (con políticas adecuadas).",
      answer: true,
      explain: "En dominio facilita estandarizar modelos; revisa restricciones de seguridad modernas."
    },

    // ——— Nivel 3: Avanzado (14 preguntas) ———
    {
      id: "pr20", level: 3, type: "identify",
      q: "¿Qué comando de Windows lista las impresoras instaladas?",
      options: [
        "PowerShell Get-Printer (antes wmic printer)",
        "PowerShell Get-Process (antes tasklist)",
        "PowerShell Get-Disk (antes wmic diskdrive)",
        "PowerShell Get-NetTCPConnection (antes netstat)"
      ],
      answer: 0,
      explain: "Get-Printer lista cada impresora con su puerto y su driver. wmic printer hacía lo mismo, pero wmic está obsoleto y en Windows 11 24H2 viene desactivado. En Linux con CUPS se usa lpstat -p.",
      try: "En PowerShell escribe `Get-Printer | Format-Table Name,PortName,DriverName` y mira qué puerto y qué driver usa cada impresora instalada."
    },
    {
      id: "pr21", level: 3, type: "fill",
      q: "Puerto típico de IPP (número):",
      answer: "631",
      accept: ["631"],
      explain: "IPP (Internet Printing Protocol) usa 631/tcp de forma habitual.",
      try: "En una terminal de Linux o WSL escribe `grep -w 631 /etc/services` y verás que ese puerto está registrado como ipp."
    },
    {
      id: "pr22", level: 3, type: "mc",
      q: "Descubrimiento de impresoras en LAN moderna a menudo usa…",
      options: [
        "mDNS / WS-Discovery / SNMP según fabricante",
        "FTP anónimo / TFTP / Telnet según fabricante",
        "NTP / Syslog / RADIUS según fabricante",
        "RDP / VNC / SSH según fabricante"
      ],
      answer: 0,
      explain: "Bonjour/mDNS, WSD y portales web del dispositivo ayudan a 'ver' la impresora. Firewalls pueden ocultarla."
    },
    {
      id: "pr23", level: 3, type: "scenario",
      q: "Escenario: la impresora Wi‑Fi está en otra VLAN/SSID de invitados. Los PCs corporativos no la ven. Causa más probable:",
      options: [
        "Aislamiento de red / sin routing entre VLANs",
        "Driver PCL incompatible en los PCs corporativos",
        "Cola del Spooler pausada en los PCs corporativos",
        "Firmware de la impresora pendiente de actualizar"
      ],
      answer: 0,
      explain: "Impresoras en guest Wi‑Fi suelen estar aisladas. Ponla en la LAN de trabajo o enruta/firewall con reglas."
    },
    {
      id: "pr24", level: 3, type: "mc",
      q: "Prioridad de trabajos en cola sirve para…",
      options: [
        "Definir qué trabajos se procesan antes (urgente vs normal)",
        "Limitar cuántas páginas puede imprimir cada usuario al mes",
        "Elegir qué bandeja de papel usa cada trabajo (A4 vs carta)",
        "Repartir los trabajos entre varias impresoras iguales (pooling)"
      ],
      answer: 0,
      explain: "En print servers puedes asignar prioridad a usuarios/colas para tickets críticos."
    },
    {
      id: "pr25", level: 3, type: "match",
      q: "Relaciona síntoma con causa frecuente:",
      pairs: [
        { left: "Página en blanco", right: "Tóner vacío o sello protector" },
        { left: "Atasco repetido", right: "Rodillos / papel húmedo / ruta" },
        { left: "Caracteres basura", right: "Driver/lenguaje incorrecto" },
        { left: "Offline en red", right: "IP/puerto/firewall/Spooler" }
      ],
      explain: "Página en blanco y atascos son fallas físicas: tóner vacío o sello sin quitar, rodillos gastados o papel húmedo. Basura y offline son lógicas: driver o lenguaje equivocado, o falla de IP, puerto, firewall o Spooler."
    },
    {
      id: "pr26", level: 3, type: "tf",
      q: "En una impresora compartida conviene dejar la IP por DHCP dinámico, sin reserva.",
      answer: false,
      explain: "Falso: si la IP cambia, los puertos TCP/IP de los clientes se rompen. Usa una reserva DHCP o una IP estática."
    },
    {
      id: "pr27", level: 3, type: "mc",
      q: "Error de 'acceso denegado' al imprimir en cola compartida suele indicar…",
      options: [
        "Permisos de la impresora compartida (pestaña Seguridad), grupos o GPO",
        "Puerto TCP 9100 bloqueado por firewall entre print server e impresora",
        "Driver PCL incorrecto instalado en el equipo del cliente",
        "Certificado HTTPS caducado en el portal web de la impresora"
      ],
      answer: 0,
      explain: "Revisa grupo Usuarios de dominio, permisos de la impresora compartida y GPO."
    },
    {
      id: "pr28", level: 3, type: "order",
      q: "Ticket: no imprime por red. Ordena el diagnóstico técnico:",
      items: [
        "Ping a la IP de la impresora",
        "Probar el puerto de impresión o la página web embebida",
        "Verificar cola/Spooler en el PC o print server",
        "Reinstalar/actualizar driver correcto"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin capa 3 no hay cola útil. Luego servicio local, luego driver."
    },
    {
      id: "prL3a", level: 3, type: "mc",
      q: "AirPrint típicamente se apoya en…",
      options: ["mDNS/Bonjour + IPP", "WS-Discovery + SMB", "NetBIOS + LPR/LPD", "SNMP + raw 9100"],
      answer: 0,
      explain: "AirPrint usa mDNS/Bonjour para que iPhone y Mac descubran la impresora sin instalar driver, e IPP (puerto 631) para enviar el trabajo. WS-Discovery y SMB son del mundo Windows."
    },
    {
      id: "prL3b", level: 3, type: "scenario",
      q: "El print server print01 imprime bien por 9100, pero al conectarse a sus colas los clientes ven 'No se encuentra la ruta de acceso de la red'. Enfoque:",
      options: [
        "DNS del servidor y SMB (445/tcp) desde el cliente",
        "Abrir el puerto 9100 en el firewall del print server",
        "Cambiar el driver PCL del cliente por PostScript",
        "Reservar otra IP para la impresora en DHCP"
      ],
      answer: 0,
      explain: "El tramo server → impresora (9100) funciona; falla cliente → server. Comprueba que print01 resuelve por DNS y que el firewall permite SMB (445/tcp) hacia el print server."
    },
    {
      id: "prL3c", level: 3, type: "match",
      q: "Empareja PDL/idea:",
      pairs: [
        { left: "PCL", right: "Lenguaje típico HP / amplio en oficina" },
        { left: "PostScript", right: "Lenguaje Adobe; artes gráficas" },
        { left: "PDF direct", right: "Algunas MFP imprimen PDF nativo" },
        { left: "Raw 9100", right: "Bytes al puerto sin cola compleja" }
      ],
      explain: "PCL (HP) domina en oficina, PostScript (Adobe) en artes gráficas y algunas MFP leen PDF directo. Raw 9100 no es un lenguaje: solo manda los bytes al puerto. Si el lenguaje no coincide, sale basura."
    },
    {
      id: "prL3d", level: 3, type: "fill",
      q: "Puerto LPR/LPD clásico (número):",
      answer: "515",
      accept: ["515"],
      explain: "LPR/LPD (Line Printer Daemon) es el protocolo clásico de impresión de Unix y escucha en 515/tcp. No lo confundas con 9100 (raw/JetDirect) ni con 631 (IPP).",
      try: "En una terminal de Linux o WSL escribe `grep -w 515 /etc/services` y verás que ese puerto está registrado como printer (el spooler LPD)."
    },
    {
      id: "prL3e", level: 3, type: "order",
      q: "Incidente: flota offline tras cambio de VLAN. Ordena:",
      items: [
        "Confirmar gateway/máscara nueva en impresoras",
        "Probar ping y puertos de impresión desde el print server",
        "Actualizar puertos TCP/IP o DNS con las IP ya verificadas",
        "Página de prueba y comunicar a usuarios"
      ],
      answer: [0, 1, 2, 3],
      explain: "Cambio de L3 rompe puertos antiguos: valida conectividad en la nueva red, luego actualiza puertos/DNS e inventario, y confirma con página de prueba."
    },

    // ——— Nivel 4: Experto (10 preguntas) ———
    {
      id: "prL4a", level: 4, type: "mc",
      q: "Un print server centralizado típicamente…",
      options: [
        "Hospeda colas compartidas y drivers para muchos clientes",
        "Solo imprime PDFs locales, sin compartir por la red",
        "Asigna las IPs de las impresoras en lugar del servidor DHCP",
        "Sustituye el firmware de cada impresora de la red"
      ],
      answer: 0,
      explain: "El print server concentra las colas compartidas y los drivers: los clientes se conectan a la cola y descargan el driver de ahí, en vez de instalarlo a mano en cada PC. No asigna IPs; eso es trabajo de DHCP."
    },
    {
      id: "prL4b", level: 4, type: "tf",
      q: "El puerto TCP 9100 (Raw/JetDirect) envía el trabajo casi directo al dispositivo.",
      answer: true,
      explain: "Simple y rápido; menos control que IPP en algunos escenarios."
    },
    {
      id: "prL4c", level: 4, type: "scenario",
      q: "Usuarios de VLAN de invitados no deben alcanzar impresoras corporativas. Control:",
      options: [
        "ACL/firewall entre VLANs + no publicar colas allí",
        "Mover las impresoras a la VLAN de invitados con IP fija",
        "Abrir el puerto 445 entre VLANs para todos",
        "Ocultar el SSID de la red de invitados"
      ],
      answer: 0,
      explain: "Con ACL o firewall entre la VLAN de invitados y la de impresoras, y sin publicar colas en la red de invitados, aplicas segmentación y mínimo privilegio. Ocultar el SSID no detiene a nadie."
    },
    {
      id: "prL4d", level: 4, type: "fill",
      q: "Protocolo moderno preferido de impresión en IP (sigla):",
      answer: "IPP",
      accept: ["IPP", "ipp", "IPPS", "IPP/IPPS", "IPP Everywhere", "Internet Printing Protocol"],
      explain: "Internet Printing Protocol (a menudo 631); IPPS es IPP sobre TLS."
    },
    {
      id: "prL4e", level: 4, type: "mc",
      q: "Branch Office Direct Printing (idea)…",
      options: [
        "Evita que el trabajo dé la vuelta al data center; imprime más cerca",
        "Centraliza todos los trabajos en el data center para auditarlos",
        "Exige un print server físico dedicado en cada sucursal",
        "Elimina la necesidad de drivers en los clientes de la sucursal"
      ],
      answer: 0,
      explain: "Con Branch Office Direct Printing (Windows Server 2012 y posteriores), el cliente de la sucursal manda el trabajo directo a la impresora local en vez de cruzar la WAN hasta el print server central."
    },
    {
      id: "prL4f", level: 4, type: "match",
      q: "Empareja el término de impresión con su descripción:",
      pairs: [
        { left: "PCL", right: "Lenguaje de control de impresora creado por HP" },
        { left: "PostScript", right: "Lenguaje de descripción de página Adobe" },
        { left: "Driver Type 4", right: "Modelo de controlador moderno de Windows (desde Windows 8)" },
        { left: "Spooler", right: "Servicio que gestiona la cola" }
      ],
      explain: "Son piezas de la pila de impresión: PCL (HP) y PostScript (Adobe) describen la página, el driver Type 4 es el modelo de controlador de Windows 8 en adelante y el Spooler encola y entrega los trabajos."
    },
    {
      id: "prL4g", level: 4, type: "order",
      q: "Ordena desplegar cola en print server:",
      items: [
        "Instalar driver firmado adecuado",
        "Crear impresora/cola y puerto",
        "Compartir y permisos",
        "Probar desde cliente y documentar"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin driver no puedes crear la cola, y la cola con su puerto debe existir antes de compartirla y darle permisos. Al final prueba desde un cliente con una cuenta sin privilegios de admin y documenta."
    },
    {
      id: "prL4h", level: 4, type: "tf",
      q: "Una impresora que aparece 'offline' en el cliente siempre está apagada.",
      answer: false,
      explain: "Falso: 'offline' en el cliente puede deberse al estado SNMP, a un puerto TCP/IP incorrecto, a fallos de red o a 'Usar impresora sin conexión' activado. Revisa eso antes de ir al equipo."
    },
    {
      id: "prL4i", level: 4, type: "mc",
      q: "¿Qué es un \"universal driver\" de impresora?",
      options: [
        "Driver que cubre muchas series reduciendo paquetes",
        "Firmware único que se instala en impresoras de cualquier marca",
        "Driver genérico de Windows que solo imprime texto plano",
        "Protocolo que traduce PCL a PostScript en la red"
      ],
      answer: 0,
      explain: "Un driver universal (por ejemplo, el HP Universal Print Driver) cubre muchas series con un solo paquete y simplifica el print server. Se instala en el PC, no es firmware; aun así valida los modelos críticos."
    },
    {
      id: "prL4j", level: 4, type: "scenario",
      q: "Trabajos se quedan en \"Imprimiendo\" en el server pero la impresora no recibe. Chequeos:",
      options: [
        "IP/puerto, red, cola pausada, driver caído, firewall 9100/IPP",
        "Nivel de tóner, contador del tambor y papel en la bandeja",
        "Licencias de Office, versión de Excel y fuentes instaladas",
        "Resolución DPI, perfil de color y orientación del papel"
      ],
      answer: 0,
      explain: "Si el trabajo sale del cliente pero no llega a la impresora, falla el tramo server a dispositivo: revisa IP y puerto de la cola, red, cola pausada, driver y firewall en 9100 o IPP. Tóner y papel no lo explican."
    },

    // ——— Nivel 5: Maestro (10 preguntas) ———
    {
      id: "prL5a", level: 5, type: "mc",
      q: "PrintNightmare (idea general) explotaba…",
      options: [
        "Fallos en el Spooler / Point and Print para ejecución remota",
        "Fallos en SMBv1 (EternalBlue) para propagarse como gusano",
        "Un desbordamiento en el firmware de la impresora vía puerto 9100",
        "Contraseñas por defecto del panel web de las impresoras"
      ],
      answer: 0,
      explain: "PrintNightmare (2021) abusaba del Print Spooler y de Point and Print para ejecutar código como SYSTEM, incluso en remoto. Se mitiga con parches y limitando Point and Print; EternalBlue fue otro fallo, de SMBv1."
    },
    {
      id: "prL5b", level: 5, type: "scenario",
      q: "Empresa quiere pull-print / follow-me printing. Beneficio:",
      options: [
        "Se libera en la impresora tras autenticarse; menos hojas olvidadas",
        "Imprime de inmediato en la impresora más cercana, sin autenticar",
        "Elimina la necesidad de drivers y de print server en la empresa",
        "Permite imprimir sin red usando USB en cada puesto"
      ],
      answer: 0,
      explain: "Con pull printing el trabajo queda retenido y solo sale cuando el usuario se autentica en la impresora (tarjeta o PIN), así nadie ve ni se lleva hojas olvidadas en la bandeja. Mejora la confidencialidad."
    },
    {
      id: "prL5c", level: 5, type: "fill",
      q: "Puerto típico IPP/IPPS (número):",
      answer: "631",
      accept: ["631"],
      explain: "IPP usa el puerto 631/tcp, e IPPS (IPP sobre TLS) normalmente también usa el 631. No lo confundas con 9100 (raw/JetDirect) ni con 515 (LPR/LPD)."
    },
    {
      id: "prL5d", level: 5, type: "mc",
      q: "En un entorno con print server + clientes Windows, \"Package Point and Print\" ayuda a…",
      options: [
        "Distribuir drivers empaquetados de forma más controlada",
        "Asignar automáticamente la IP de cada impresora del dominio",
        "Empaquetar trabajos de impresión para enviarlos comprimidos",
        "Desactivar el Spooler en clientes que no imprimen"
      ],
      answer: 0,
      explain: "Package Point and Print instala en el cliente el paquete de driver completo y firmado desde el print server, no archivos sueltos. Con la GPO de servidores aprobados controlas de dónde se aceptan drivers."
    },
    {
      id: "prL5e", level: 5, type: "identify",
      q: "Log útil en Windows cuando la cola falla:",
      options: [
        "Event Viewer → Microsoft-Windows-PrintService",
        "Performance Monitor → % de tiempo de procesador",
        "Resource Monitor → pestaña Disco",
        "Disk Cleanup → Archivos temporales"
      ],
      answer: 0,
      explain: "En el Visor de eventos, Registros de aplicaciones y servicios > Microsoft > Windows > PrintService guarda errores de cola y driver. El log Operational viene deshabilitado: actívalo para registrar cada trabajo.",
      try: "En PowerShell escribe `Get-WinEvent -ListLog *PrintService* | Format-Table LogName,IsEnabled` y mira si el log Operational está activado."
    },
    {
      id: "prL5f", level: 5, type: "order",
      q: "Ordena migrar print server viejo a nuevo:",
      items: [
        "Inventariar colas/puertos/drivers/permisos",
        "Montar drivers firmados en destino",
        "Importar/recrear colas en el destino",
        "Cortar DNS/alias y validar clientes"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin inventario no sabes qué migrar; los drivers deben estar en el destino antes de recrear las colas, y el corte de DNS o alias va al final. Baja antes el TTL del alias para poder hacer rollback rápido."
    },
    {
      id: "prL5g", level: 5, type: "tf",
      q: "Una ACL en el switch que bloquee la impresión directa (RAW 9100, LPR 515, IPP 631, WSD) desde la VLAN de usuarios hacia las impresoras, y solo la permita desde el print server, puede forzar el uso del print server.",
      answer: true,
      explain: "Los clientes que imprimen directo usan RAW 9100, LPR 515, IPP 631 o WSD, no SMB (SMB es cliente → print server). Si solo el print server alcanza esos puertos, todo trabajo pasa por sus colas."
    },
    {
      id: "prL5h", level: 5, type: "scenario",
      q: "Impresora multifunción escanea a \\\\servidor\\share y falla tras endurecer SMB. Causa probable:",
      options: [
        "SMBv1 deshabilitado / firma SMB / credenciales del dispositivo",
        "Puerto 9100 cerrado / tóner bajo / driver PCL del servidor",
        "Cola del Spooler pausada / driver PostScript en el server",
        "Tambor agotado / bandeja vacía / contador de páginas lleno"
      ],
      answer: 0,
      explain: "Al endurecer SMB fallan las multifuncionales que solo hablan SMBv1, no soportan firma SMB o usan credenciales que ya no se aceptan. Actualiza su firmware para usar SMBv2 o superior y una cuenta de servicio con mínimo privilegio."
    },
    {
      id: "prL5i", level: 5, type: "mc",
      q: "QoS para impresión en WAN saturada…",
      options: [
        "Puede priorizar o limitar tráfico de colas críticas",
        "Comprime los trabajos para que ocupen menos ancho de banda",
        "Cifra los trabajos de impresión que cruzan la WAN",
        "Aumenta el ancho de banda contratado del enlace WAN"
      ],
      answer: 0,
      explain: "QoS clasifica y marca el tráfico para priorizar o limitar ciertos flujos cuando el enlace se satura. No comprime, no cifra ni aumenta el ancho de banda; solo reparte mejor el que ya tienes."
    },
    {
      id: "prL5j", level: 5, type: "match",
      q: "Empareja cada falla con su causa probable:",
      pairs: [
        { left: "Páginas con caracteres basura", right: "Driver/lenguaje incorrecto (PCL vs PS)" },
        { left: "Atasco frecuente", right: "Papel húmedo/rodillos" },
        { left: "Color corrido", right: "Calibración/belt/drum" },
        { left: "No imprime desde una app", right: "Formato de spool / aislamiento de driver" }
      ],
      explain: "Basura en la hoja apunta al driver o lenguaje (PCL vs PS); atascos, a papel húmedo o rodillos; color corrido, a calibración, banda o tambor; y si falla solo una app, prueba otro formato de spool o aislar el driver."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (6 preguntas) ———
  boss: [
    {
      id: "prB1", level: 5, type: "scenario",
      q: "BOSS TICKET: 40 usuarios; cola \\\\print01\\finanzas Offline. Ping a 10.20.5.50 OK. Puerto 9100 filtrado desde el server. Causa raíz más probable:",
      options: [
        "Firewall/ACL bloquea 9100 entre print server e impresora",
        "Spooler detenido en los PCs de los 40 usuarios",
        "Falta el registro DNS inverso (PTR) de 10.20.5.50",
        "Unidad de tambor agotada en la impresora de finanzas"
      ],
      answer: 0,
      explain: "ICMP no implica que el servicio de impresión esté permitido. Abre 9100/631 según diseño."
    },
    {
      id: "prB2", level: 5, type: "order",
      q: "BOSS: Restablecer impresión SMB en planta:",
      items: [
        "Validar IP y puertos desde print server",
        "Detener Spooler en print01",
        "Limpiar trabajos atascados en spool\\PRINTERS",
        "Iniciar Spooler, página de prueba y avisar usuarios"
      ],
      answer: [0, 1, 2, 3],
      explain: "Red → detener servicio → vaciar cola → iniciar y verificar. Nunca vacíes el spool con el Spooler en ejecución."
    },
    {
      id: "prB3", level: 5, type: "mc",
      q: "BOSS: Trabajos PCL a impresora solo PS generan:",
      options: [
        "Basura/errores de lenguaje; alinear driver (PCL/PS/universal)",
        "Conversión automática a PostScript en la impresora, sin errores",
        "Un atasco de papel físico por formato de página erróneo",
        "Impresión correcta, pero solo en escala de grises"
      ],
      answer: 0,
      explain: "Una impresora solo PostScript no entiende PCL: imprime el código como texto basura o descarta el trabajo. No lo convierte sola; usa el driver PS del modelo o un driver universal en modo PostScript."
    },
    {
      id: "prB4", level: 5, type: "match",
      q: "BOSS: Empareja protocolo/puerto:",
      pairs: [
        { left: "IPP", right: "631/tcp" },
        { left: "LPR", right: "515/tcp" },
        { left: "JetDirect raw", right: "9100/tcp" },
        { left: "SMB share", right: "445/tcp (y relacionados)" }
      ],
      explain: "IPP usa 631/tcp, LPR 515/tcp y raw/JetDirect 9100/tcp, mientras que los recursos compartidos por SMB usan 445/tcp. Saberlos te dice qué abrir en el firewall y qué puerto probar.",
      try: "En una terminal de Linux o WSL escribe `grep -wE '515|631|445' /etc/services` y fíjate en el nombre de servicio de cada puerto."
    },
    {
      id: "prB5", level: 5, type: "tf",
      q: "BOSS: Una reserva DHCP para la MAC de la impresora evita que cambie de IP y rompa puertos TCP/IP de clientes.",
      answer: true,
      explain: "Verdadero: la reserva DHCP hace que el servidor siempre entregue la misma IP a la MAC de la impresora, así los puertos TCP/IP de los clientes no se rompen y evitas tickets de impresora sin conexión."
    },
    {
      id: "prB6", level: 5, type: "scenario",
      q: "BOSS: Drum life exceeded + rayas negras. Acción correcta:",
      options: [
        "Reemplazar unidad de tambor / kit mantenimiento según modelo",
        "Reinstalar el driver y restablecer el contador de páginas",
        "Actualizar el firmware de la tarjeta de red de la impresora",
        "Cambiar el tipo de papel en el driver y usar otra bandeja"
      ],
      answer: 0,
      explain: "Síntomas de drum no se arreglan con red. Sigue el contador del fabricante."
    }
  ]
});
