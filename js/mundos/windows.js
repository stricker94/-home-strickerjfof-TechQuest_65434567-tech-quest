/**
 * Tech Quest — Mundo Windows intermedio
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "windows",
  name: "Windows intermedio",
  icon: "🪟",
  color: "#00aaff",
  description: "Servicios, Event Viewer, PowerShell y administración.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "wn01", level: 1, type: "mc",
      q: "¿Dónde revisas errores y avisos del sistema en Windows?",
      options: [
        "Editor del Registro (regedit)",
        "Visor de eventos (Event Viewer)",
        "Programador de tareas (Task Scheduler)",
        "Monitor de recursos (Resource Monitor)"
      ],
      answer: 1,
      explain: "Event Viewer (eventvwr.msc) registra Application, Security y System. Útil para diagnosticar fallos."
    },
    {
      id: "wn02", level: 1, type: "mc",
      q: "¿Qué utilidad muestra CPU, memoria y procesos en tiempo real?",
      options: [
        "Configuración del sistema",
        "Administrador de tareas",
        "Editor del Registro",
        "Monitor de confiabilidad"
      ],
      answer: 1,
      explain: "El Administrador de tareas (taskmgr) muestra procesos, rendimiento, inicio y usuarios."
    },
    {
      id: "wn03", level: 1, type: "fill",
      q: "Comando en cmd/PowerShell para ver la IP local (forma corta):",
      answer: "ipconfig",
      accept: ["ipconfig", "ipconfig /all"],
      explain: "ipconfig muestra adaptadores e IPs. /all añade DNS, MAC y DHCP."
    },
    {
      id: "wn04", level: 1, type: "mc",
      q: "En PowerShell, ¿qué cmdlet lista servicios?",
      options: ["Get-Service", "Get-Process", "Get-Content", "Set-Location"],
      answer: 0,
      explain: "Get-Service lista servicios. Start-Service / Stop-Service / Restart-Service los controlan."
    },
    {
      id: "wn05", level: 1, type: "order",
      q: "Ordena pasos para reiniciar un servicio con services.msc:",
      items: [
        "Abrir services.msc",
        "Localizar el servicio",
        "Clic derecho → Reiniciar",
        "Verificar que el estado sea En ejecución"
      ],
      answer: [0, 1, 2, 3],
      explain: "También puedes usar Restart-Service <Nombre> en PowerShell (por ejemplo, Restart-Service Spooler)."
    },
    {
      id: "wn06", level: 1, type: "identify",
      q: "¿Qué comando prueba conectividad ICMP a un host?",
      options: ["ping", "dir", "cls", "copy"],
      answer: 0,
      explain: "ping envía ecos ICMP. Si falla, revisa red, firewall o DNS."
    },
    {
      id: "wnL1a", level: 1, type: "mc",
      q: "¿Qué atajo abre el Administrador de tareas?",
      options: ["Ctrl+Shift+Esc", "Ctrl+Shift+Supr", "Win+Shift+S", "Ctrl+Alt+Tab"],
      answer: 0,
      explain: "Ctrl+Shift+Esc abre Task Manager directamente."
    },
    {
      id: "wnL1b", level: 1, type: "tf",
      q: "Win+L abre Configuración de Windows.",
      answer: false,
      explain: "Falso: Win+L bloquea la sesión. Configuración se abre con Win+I."
    },
    {
      id: "wnL1c", level: 1, type: "fill",
      q: "Comando para listar archivos en cmd:",
      answer: "dir",
      accept: ["dir", "dir /w", "dir /b", "dir /a", "dir /p", "dir .", "dir /s", "dir /a-d"],
      explain: "dir es el equivalente aproximado a ls."
    },
    {
      id: "wnL1d", level: 1, type: "identify",
      q: "¿Qué comando muestra la versión y compilación (build) de Windows en una ventana?",
      options: ["winver", "mspaint", "notepad", "calc"],
      answer: 0,
      explain: "winver abre 'Acerca de Windows' con versión y build. Para más detalle: systeminfo."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "wn07", level: 2, type: "mc",
      q: "¿Qué tipo de cuenta de Windows puede instalar software para todos los usuarios y cambiar la configuración del sistema?",
      options: ["Usuario estándar", "Administrador", "Invitado", "Cuenta local sin contraseña"],
      answer: 1,
      explain: "Las cuentas Administrador pueden instalar software y cambiar el sistema. Con UAC trabajan con permisos estándar hasta que apruebas la elevación."
    },
    {
      id: "wn08", level: 2, type: "match",
      q: "Relaciona herramienta con uso:",
      pairs: [
        { left: "services.msc", right: "Administrar servicios" },
        { left: "eventvwr.msc", right: "Ver registros de eventos" },
        { left: "taskmgr", right: "Administrador de tareas" },
        { left: "compmgmt.msc", right: "Administración de equipos" }
      ],
      explain: "Muchas consolas MMC (.msc) se abren con Win+R y el nombre del snap-in."
    },
    {
      id: "wn09", level: 2, type: "mc",
      q: "¿Qué hace Get-Process en PowerShell?",
      options: [
        "Lista procesos en ejecución",
        "Lista los servicios y su estado",
        "Detiene un proceso por su nombre o PID",
        "Muestra el contenido de un archivo"
      ],
      answer: 0,
      explain: "Get-Process es el equivalente moderno a tasklist. Stop-Process termina un proceso."
    },
    {
      id: "wn10", level: 2, type: "fill",
      q: "Comando para liberar la concesión (lease) DHCP del adaptador:",
      answer: "ipconfig /release",
      accept: ["ipconfig /release", "ipconfig /release *", "ipconfig -release"],
      explain: "Después suele usarse ipconfig /renew para pedir una nueva concesión. /flushdns limpia la caché DNS y route print muestra las rutas."
    },
    {
      id: "wn11", level: 2, type: "mc",
      q: "Un servicio en estado 'Detenido' que debería estar activo…",
      options: [
        "No afecta a nada mientras el equipo siga encendido",
        "Puede impedir funciones (impresión, red, actualizaciones)",
        "Solo afecta la apariencia del escritorio",
        "Indica que el servicio fue desinstalado del sistema"
      ],
      answer: 1,
      explain: "Servicios críticos (Spooler, DHCP Client, Windows Update) deben estar en ejecución según necesidad."
    },
    {
      id: "wn12", level: 2, type: "mc",
      q: "¿Dónde gestionas cuentas locales de usuario en Windows Pro?",
      options: [
        "lusrmgr.msc / Configuración → Cuentas",
        "devmgmt.msc / Configuración → Dispositivos",
        "services.msc / Configuración → Aplicaciones",
        "En el Visor de eventos únicamente"
      ],
      answer: 0,
      explain: "Usuarios y grupos locales (lusrmgr.msc) o Configuración. En dominio se usan AD/GP."
    },
    {
      id: "wnL2a", level: 2, type: "mc",
      q: "¿Qué hace sfc /scannow?",
      options: [
        "Verifica e intenta reparar archivos de sistema",
        "Analiza el disco en busca de sectores dañados",
        "Busca e instala actualizaciones pendientes",
        "Escanea el equipo en busca de malware"
      ],
      answer: 0,
      explain: "System File Checker. Útil tras corrupción de componentes."
    },
    {
      id: "wnL2b", level: 2, type: "scenario",
      q: "Un servicio crítico está detenido. Herramienta GUI clásica:",
      options: ["services.msc", "devmgmt.msc", "diskmgmt.msc", "lusrmgr.msc"],
      answer: 0,
      explain: "También: Get-Service / Restart-Service en PowerShell."
    },
    {
      id: "wnL2c", level: 2, type: "order",
      q: "Ordena liberar y renovar DHCP:",
      items: [
        "Abrir una consola (como admin si hace falta)",
        "Soltar la concesión DHCP actual",
        "Pedir una nueva concesión al servidor DHCP",
        "Comprobar la IP y la puerta de enlace obtenidas"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero sueltas la concesión actual y luego pides una nueva al servidor DHCP; al final compruebas la IP y la puerta de enlace que recibiste."
    },
    {
      id: "wnL2d", level: 2, type: "fill",
      q: "Cmdlet de PowerShell para leer el contenido de un archivo de texto:",
      answer: "Get-Content",
      accept: ["Get-Content", "gc", "cat", "type"],
      explain: "Get-Content lee archivos (alias gc, cat, type). Con -Tail 20 -Wait sigue un log en vivo."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "wn13", level: 3, type: "tf",
      q: "Win+R → services.msc abre la consola de servicios.",
      answer: true,
      explain: "services.msc es el snap-in clásico para iniciar/detener/reiniciar servicios."
    },
    {
      id: "wn14", level: 3, type: "scenario",
      q: "Escenario: la caché DNS está corrupta. ¿Qué comando la limpia?",
      options: [
        "ipconfig /flushdns",
        "ipconfig /displaydns",
        "netsh winsock reset",
        "ipconfig /release"
      ],
      answer: 0,
      explain: "ipconfig /flushdns vacía el resolver cache de Windows."
    },
    {
      id: "wn15", level: 3, type: "mc",
      q: "RDP (Escritorio remoto) usa por defecto el puerto TCP…",
      options: ["3389", "22", "445", "9100"],
      answer: 0,
      explain: "3389 es el puerto clásico de Remote Desktop. Debe estar permitido en el firewall."
    },
    {
      id: "wn16", level: 3, type: "fill",
      q: "Comando de PowerShell (cmdlet y nombre del servicio) para reiniciar el servicio Spooler:",
      answer: "Restart-Service Spooler",
      accept: [
        "Restart-Service Spooler",
        "Restart-Service -Name Spooler",
        "Restart-Service Spooler -Force",
        "Restart-Service -Force Spooler",
        "Restart-Service -Name Spooler -Force",
        "Restart-Service -Force -Name Spooler",
        "Restart-Service 'Spooler'",
        "Restart-Service \"Spooler\"",
        "Restart-Service -Name 'Spooler'",
        "Restart-Service -Name \"Spooler\"",
        "Restart-Service 'Spooler' -Force",
        "Get-Service Spooler | Restart-Service",
        "Get-Service Spooler | Restart-Service -Force",
        "Get-Service -Name Spooler | Restart-Service",
        "Restart-Service \"Spooler\" -Force",
        "Restart-Service -Name 'Spooler' -Force",
        "Restart-Service -Name \"Spooler\" -Force",
        "Get-Service -Name Spooler | Restart-Service -Force",
        "Restart-Service -Force 'Spooler'",
        "Restart-Service -Force \"Spooler\"",
        "Restart-Service -Force -Name 'Spooler'",
        "Restart-Service -Force -Name \"Spooler\""
      ],
      explain: "Restart-Service detiene e inicia el servicio (suele requerir consola elevada). Si el servicio tiene dependientes (p. ej., Fax), añade -Force."
    },
    {
      id: "wn17", level: 3, type: "order",
      q: "Ordena un diagnóstico cuando un PC no llega a Internet pero sí hace ping a 8.8.8.8:",
      items: [
        "Verificar DNS (ipconfig /all)",
        "Probar resolución nslookup sitio.com",
        "Si nslookup falla, cambiar a otro DNS (1.1.1.1 / 8.8.8.8)",
        "Tras cambiar el DNS, vaciar la caché de resolución y volver a probar"
      ],
      answer: [0, 1, 2, 3],
      explain: "Si hay IP pero no nombres, el problema suele ser DNS: revisa qué DNS usa el equipo, prueba la resolución con nslookup, cambia a un DNS alternativo si falla y limpia la caché para descartar respuestas viejas."
    },
    {
      id: "wn18", level: 3, type: "mc",
      q: "¿Qué herramienta abre el Editor del Registro?",
      options: ["regedit", "mspaint", "calc", "notepad únicamente"],
      answer: 0,
      explain: "regedit edita el registro. Cámbialo solo con respaldo y conocimiento: errores pueden romper el sistema."
    },
    {
      id: "wnL3a", level: 3, type: "mc",
      q: "El inicio de sesión en el dominio falla tras adelantar mucho la hora del equipo. Relacionado con…",
      options: [
        "Kerberos sensible al skew de tiempo",
        "Caché DNS que caduca al cambiar la hora",
        "Firma SMB que se desactiva por la hora",
        "Cola del Spooler bloqueada por la hora"
      ],
      answer: 0,
      explain: "Sincroniza hora (NTP) antes de reintentar join/login de dominio."
    },
    {
      id: "wnL3b", level: 3, type: "scenario",
      q: "GPO no aplica. ¿Chequeo útil?",
      options: [
        "gpresult / gpupdate y Event Viewer",
        "sfc /scannow y DISM /RestoreHealth",
        "msconfig y el Programador de tareas",
        "chkdsk /f y desfragmentar la unidad"
      ],
      answer: 0,
      explain: "gpupdate /force y gpresult /h report.html ayudan a diagnosticar."
    },
    {
      id: "wnL3c", level: 3, type: "tf",
      q: "BitLocker cifra el tráfico de red entre el equipo y el servidor.",
      answer: false,
      explain: "Falso: BitLocker cifra volúmenes (datos en reposo), no el tráfico de red; para eso están TLS, IPsec o una VPN. Guarda la clave de recuperación de forma segura."
    },
    {
      id: "wnL3d", level: 3, type: "match",
      q: "Empareja herramienta y uso:",
      pairs: [
        { left: "diskmgmt.msc", right: "Administrar discos/particiones" },
        { left: "devmgmt.msc", right: "Administrador de dispositivos" },
        { left: "eventvwr.msc", right: "Visor de eventos" },
        { left: "lusrmgr.msc", right: "Usuarios y grupos locales" }
      ],
      explain: "Las consolas .msc aceleran la administración."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "wnL4a", level: 4, type: "mc",
      q: "¿Qué es WinRM?",
      options: [
        "Administración remota de Windows (WS-Management, transporte de PowerShell Remoting)",
        "Replicación de archivos entre controladores de dominio (DFS-R, sucesor de FRS)",
        "Escritorio remoto gráfico de Windows (sesiones RDP sobre el puerto TCP 3389)",
        "Gestión de derechos (Rights Management, cifrado de documentos con AD RMS)"
      ],
      answer: 0,
      explain: "WinRM (Windows Remote Management) implementa WS-Management y es la base de PowerShell Remoting (Enter-PSSession/Invoke-Command). Endurécelo: HTTPS 5986, firewall y cuentas limitadas."
    },
    {
      id: "wnL4b", level: 4, type: "tf",
      q: "'Get-WinEvent' consulta el Visor de eventos desde PowerShell.",
      answer: true,
      explain: "Más potente que Get-EventLog legacy."
    },
    {
      id: "wnL4c", level: 4, type: "scenario",
      q: "Perfil de usuario se corrompe (login con perfil temporal). Acción típica:",
      options: [
        "Renombrar/backup del perfil viejo y recrear según procedimiento",
        "Borrar la base SAM para que el perfil se regenere solo",
        "Restablecer la pila TCP/IP con netsh int ip reset",
        "Quitar al usuario del grupo Administradores y reiniciar"
      ],
      answer: 0,
      explain: "Documenta SID y carpetas antes de tocar."
    },
    {
      id: "wnL4d", level: 4, type: "fill",
      q: "Comando para exportar a HTML el conjunto de directivas resultante (RSoP) al archivo report.html:",
      answer: "gpresult /h report.html",
      accept: [
        "gpresult /h report.html",
        "gpresult /h report.html /f",
        "gpresult /f /h report.html",
        "gpresult.exe /h report.html",
        "gpresult /h .\\report.html",
        "gpresult /h \"report.html\"",
        "Get-GPResultantSetOfPolicy -ReportType Html -Path report.html",
        "Get-GPResultantSetOfPolicy -Path report.html -ReportType Html",
        "Get-GPResultantSetOfPolicy -ReportType Html -Path .\\report.html",
        "Get-GPResultantSetOfPolicy -Path .\\report.html -ReportType Html"
      ],
      explain: "gpresult /h <archivo>.html genera el informe RSoP en HTML (la opción /h exige nombre de archivo; /f sobrescribe si ya existe). gpresult /r da un resumen en consola; rsop.msc es la consola gráfica legacy. En PowerShell (módulo GroupPolicy/RSAT) el equivalente es Get-GPResultantSetOfPolicy -ReportType Html -Path report.html."
    },
    {
      id: "wnL4e", level: 4, type: "mc",
      q: "AppLocker / WDAC sirven para…",
      options: [
        "Controlar qué ejecutables/scripts pueden correr",
        "Cifrar el disco completo con clave en el TPM",
        "Bloquear puertos de red entrantes por aplicación",
        "Bloquear la sesión del equipo tras un tiempo inactivo"
      ],
      answer: 0,
      explain: "Reduce malware y software no autorizado."
    },
    {
      id: "wnL4f", level: 4, type: "match",
      q: "Empareja la consola de Windows (.msc) con su función:",
      pairs: [
        { left: "wf.msc", right: "Firewall con seguridad avanzada" },
        { left: "certmgr.msc", right: "Certificados de usuario" },
        { left: "gpedit.msc", right: "Editor de directivas local" },
        { left: "compmgmt.msc", right: "Administración de equipos" }
      ],
      explain: "MMC habituales."
    },
    {
      id: "wnL4g", level: 4, type: "order",
      q: "Ordena troubleshooting de trust de dominio:",
      items: [
        "Verificar DNS hacia el DC (el equipo localiza el DC del dominio)",
        "Con el DC localizado, comparar la hora (w32tm; Kerberos tolera ~5 min)",
        "Probar el canal seguro (nltest /sc_verify:<dominio> o Test-ComputerSecureChannel)",
        "Reparar/resetear la cuenta de máquina si el canal falla"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero localiza el DC (DNS) y valida la hora contra él; después prueba el canal seguro y, si falla, repáralo (Test-ComputerSecureChannel -Repair o netdom resetpwd)."
    },
    {
      id: "wnL4h", level: 4, type: "tf",
      q: "Hyper-V viene incluido en Windows 10/11 Home.",
      answer: false,
      explain: "Falso: Hyper-V requiere Windows Pro, Enterprise o Education y la virtualización habilitada en el firmware. Home no lo incluye."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "wnL5a", level: 5, type: "mc",
      q: "Un Blue Screen con DRIVER_IRQL suele apuntar a…",
      options: [
        "Driver en modo kernel fallando",
        "Aplicación de usuario sin responder",
        "Perfil de usuario dañado",
        "Certificado TLS caducado"
      ],
      answer: 0,
      explain: "Actualiza/rollback drivers; Memory Diagnostic también."
    },
    {
      id: "wnL5b", level: 5, type: "scenario",
      q: "Autenticación NTLM lateral se abusa en la red. Mitigación:",
      options: [
        "Restringir NTLM, privilegiar Kerberos, LAPS, segmentar admin",
        "Usar la misma clave de admin local en todos los equipos",
        "Forzar NTLMv1 en todo el dominio y desactivar Kerberos",
        "Desactivar la auditoría de inicios de sesión"
      ],
      answer: 0,
      explain: "Tiering de administración reduce movimiento lateral."
    },
    {
      id: "wnL5c", level: 5, type: "fill",
      q: "Cmdlet para reiniciar un equipo remoto (uno común):",
      answer: "Restart-Computer",
      accept: ["Restart-Computer", "restart-computer"],
      explain: "Restart-Computer -ComputerName host"
    },
    {
      id: "wnL5d", level: 5, type: "mc",
      q: "Credential Guard protege…",
      options: [
        "Secretos de autenticación aislándolos con VBS",
        "El arranque verificando la firma del bootloader",
        "Los datos del disco cifrándolos con el TPM",
        "La cola de impresión frente a drivers de terceros"
      ],
      answer: 0,
      explain: "Parte del stack de seguridad basado en virtualización."
    },
    {
      id: "wnL5e", level: 5, type: "identify",
      q: "Herramienta para capturar tráfico en Windows (Microsoft):",
      options: [
        "netsh trace / Message Analyzer legacy / pktmon",
        "tracert / pathping / Test-NetConnection",
        "wevtutil / Get-WinEvent / Visor de eventos",
        "Monitor de rendimiento / Monitor de recursos / typeperf"
      ],
      answer: 0,
      explain: "pktmon es moderno en Windows 10+."
    },
    {
      id: "wnL5f", level: 5, type: "order",
      q: "Ordena respuesta a ransomware en endpoint Windows:",
      items: [
        "Aislar de la red",
        "Identificar alcance y muestras",
        "Restaurar desde backup limpio",
        "Lecciones + hardening"
      ],
      answer: [0, 1, 2, 3],
      explain: "No pagues como primera opción automática."
    },
    {
      id: "wnL5g", level: 5, type: "tf",
      q: "Un GPO con WMI filter puede aplicar solo a ciertos OS/hardware.",
      answer: true,
      explain: "Útil para targeting fino."
    },
    {
      id: "wnL5h", level: 5, type: "scenario",
      q: "La impresión vía servidor falla solo en una OU. Sospecha:",
      options: [
        "GPO de impresoras o permisos de cola en esa OU",
        "Tóner agotado en la impresora compartida",
        "Puerto 9100 bloqueado en el firewall de la impresora",
        "Spooler detenido en el servidor de impresión central"
      ],
      answer: 0,
      explain: "Revisa Point and Print / Deployed Printers."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "wnB1", level: 5, type: "scenario",
      q: "BOSS: Nadie imprime; el print server muestra Spooler detenido. ¿Qué haces?",
      options: [
        "Reiniciar Print Spooler, revisar eventos y colas",
        "Reinstalar los drivers de impresora en cada cliente",
        "Reiniciar los switches y renovar DHCP en los PCs",
        "Degradar el nivel funcional de AD y reiniciar los DC"
      ],
      answer: 0,
      explain: "Spooler caído = síntoma clásico. Revisa dependencias y fallos recurrentes en Event Viewer."
    },
    {
      id: "wnB2", level: 5, type: "mc",
      q: "BOSS: Tras reinicio, Event ID de servicio apunta a driver de impresora. Siguiente paso:",
      options: [
        "Actualizar/quitar driver problemático; aislar cola",
        "Ignorar el evento: es informativo y se resuelve solo",
        "Reinstalar Windows en el servidor de impresión",
        "Desactivar el archivo de paginación y reiniciar"
      ],
      answer: 0,
      explain: "Drivers corruptos tumbaron Spooler históricamente. Aísla el driver culpable."
    },
    {
      id: "wnB3", level: 5, type: "order",
      q: "BOSS: El PC no se une al dominio tras cambiar credenciales locales. Ordena el diagnóstico:",
      items: [
        "Verificar red y que el DNS del equipo apunte al DNS del dominio",
        "Con el DC localizado, comprobar que la hora coincida (Kerberos)",
        "Reintentar el join (o reparar el secure channel)",
        "Si falla, revisar Event Viewer y NetSetup.log"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin el DNS del dominio no se localiza el DC; con el DC localizado, una hora desfasada más de ~5 min rompe Kerberos. Luego reintenta y, si falla, revisa los registros (Event Viewer y %windir%\\debug\\NetSetup.log)."
    },
    {
      id: "wnB4", level: 5, type: "tf",
      q: "BOSS: ipconfig /renew obtiene una IP nueva aunque el adaptador tenga IP estática.",
      answer: false,
      explain: "Falso: /renew solo pide una concesión a DHCP; con IP estática no cambia la configuración manual."
    },
    {
      id: "wnB5", level: 5, type: "identify",
      q: "BOSS: ¿Dónde miras un BSOD recurrente con detalle?",
      options: [
        "Visor de eventos + volcados (dump)",
        "Administrador de tareas + Monitor de recursos",
        "Programador de tareas + historial de tareas",
        "Administración de discos + Desfragmentador"
      ],
      answer: 0,
      explain: "Minidumps y Reliability Monitor ayudan a correlacionar drivers."
    }
  ]
});
