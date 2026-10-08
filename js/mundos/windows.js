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
      explain: "Event Viewer (eventvwr.msc) registra Application, Security y System. Útil para diagnosticar fallos.",
      try: "Presiona Win+R, escribe `eventvwr.msc` y abre Registros de Windows > Sistema para ver los errores y advertencias recientes."
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
      explain: "El Administrador de tareas (taskmgr) muestra procesos, rendimiento, inicio y usuarios.",
      try: "Presiona Win+R, escribe `taskmgr` y abre la pestaña Rendimiento para ver el uso de CPU y memoria en tiempo real."
    },
    {
      id: "wn03", level: 1, type: "fill",
      q: "Comando en cmd/PowerShell para ver la IP local (forma corta):",
      answer: "ipconfig",
      accept: ["ipconfig", "ipconfig /all"],
      explain: "ipconfig muestra adaptadores e IPs. /all añade DNS, MAC y DHCP.",
      try: "En cmd escribe `ipconfig /all` y busca tu dirección IPv4, la puerta de enlace y los servidores DNS del adaptador activo."
    },
    {
      id: "wn04", level: 1, type: "mc",
      q: "En PowerShell, ¿qué cmdlet lista servicios?",
      options: ["Get-Service", "Get-Process", "Get-Content", "Set-Location"],
      answer: 0,
      explain: "Get-Service lista servicios. Start-Service / Stop-Service / Restart-Service los controlan.",
      try: "En PowerShell escribe `Get-Service | Where-Object Status -eq Running` para ver solo los servicios en ejecución."
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
      explain: "ping envía paquetes ICMP Echo Request y mide si llegan respuestas y en cuánto tiempo. Si falla, revisa red, firewall (muchos bloquean ICMP) o DNS si usaste un nombre.",
      try: "En cmd escribe `ping -n 4 8.8.8.8` y fíjate en el tiempo de respuesta en ms y en el porcentaje de paquetes perdidos."
    },
    {
      id: "wnL1a", level: 1, type: "mc",
      q: "¿Qué atajo abre el Administrador de tareas?",
      options: ["Ctrl+Shift+Esc", "Ctrl+Shift+Supr", "Win+Shift+S", "Ctrl+Alt+Tab"],
      answer: 0,
      explain: "Ctrl+Shift+Esc abre el Administrador de tareas directo, sin pasar por la pantalla de seguridad que muestra Ctrl+Alt+Supr. Win+Shift+S, en cambio, abre la herramienta de recortes."
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
      explain: "dir lista archivos y carpetas del directorio actual en cmd, como ls en Linux. Con /a incluye ocultos y de sistema, /b muestra solo nombres y /s recorre subcarpetas.",
      try: "En cmd escribe `dir` en tu carpeta de usuario y luego `dir /a`: aparecerán archivos ocultos como NTUSER.DAT."
    },
    {
      id: "wnL1d", level: 1, type: "identify",
      q: "¿Qué comando muestra la versión y compilación (build) de Windows en una ventana?",
      options: ["winver", "mspaint", "notepad", "calc"],
      answer: 0,
      explain: "winver abre 'Acerca de Windows' con versión y build. Para más detalle: systeminfo.",
      try: "Presiona Win+R y escribe `winver` para ver tu versión de Windows y el número de compilación (build)."
    },

    // ——— Nivel 2: Intermedio (13 preguntas) ———
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
      explain: "Get-Process es el equivalente moderno a tasklist. Stop-Process termina un proceso.",
      try: "En PowerShell escribe `Get-Process | Sort-Object CPU -Descending | Select-Object -First 5` para ver los 5 procesos que más CPU han usado."
    },
    {
      id: "wn10", level: 2, type: "fill",
      q: "Comando para liberar la concesión (lease) DHCP del adaptador:",
      answer: "ipconfig /release",
      accept: ["ipconfig /release", "ipconfig /release *", "ipconfig -release"],
      explain: "Después suele usarse ipconfig /renew para pedir una nueva concesión. /flushdns limpia la caché DNS y route print muestra las rutas.",
      try: "En cmd escribe `ipconfig /all` y busca DHCP habilitado y las líneas de la concesión: ahí ves cuándo la obtuviste y cuándo vence."
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
      explain: "Usuarios y grupos locales (lusrmgr.msc) o Configuración. En dominio se usan AD/GP.",
      try: "En cmd escribe `net user` para listar las cuentas locales del equipo y `net user %USERNAME%` para ver los detalles de la tuya si es una cuenta local. En una PC del trabajo unida a un dominio, tu cuenta es del dominio: usa `net user %USERNAME% /domain`."
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
      explain: "sfc (System File Checker) revisa los archivos protegidos de Windows y reemplaza los dañados; se ejecuta como administrador. Para sectores dañados del disco se usa chkdsk, no sfc."
    },
    {
      id: "wnL2b", level: 2, type: "scenario",
      q: "Un servicio crítico está detenido. Herramienta GUI clásica:",
      options: ["services.msc", "devmgmt.msc", "diskmgmt.msc", "lusrmgr.msc"],
      answer: 0,
      explain: "services.msc abre la consola de Servicios, donde ves estado y tipo de inicio y puedes iniciar o reiniciar uno. En PowerShell: Get-Service y Restart-Service. devmgmt.msc es para dispositivos.",
      try: "En PowerShell escribe `Get-Service Spooler` y fíjate en la columna Status: Running significa que la cola de impresión está activa."
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
      explain: "Get-Content lee archivos (alias gc, cat, type). Con -Tail 20 -Wait sigue un log en vivo.",
      try: "En PowerShell escribe `Get-Content C:\\Windows\\System32\\drivers\\etc\\hosts -Tail 5` para leer las últimas 5 líneas del archivo hosts."
    },
    {
      id: "wnN01", level: 2, type: "fill",
      q: "Escribe el comando de cmd que lista las unidades de red mapeadas en tu sesión:",
      answer: "net use",
      accept: ["net use", "net.exe use"],
      explain: "net use sin parámetros muestra las conexiones de red de tu sesión con su estado, su letra de unidad (si tiene) y su ruta \\\\servidor\\recurso.",
      try: "En cmd o PowerShell escribe `net use` para ver tus unidades de red mapeadas; si no tienes ninguna, dirá que no hay entradas en la lista."
    },
    {
      id: "wnN02", level: 2, type: "mc",
      q: "En PowerShell, ¿qué hace este código? foreach ($pc in $equipos) { Test-Connection $pc -Count 1 }",
      options: [
        "Hace un ping a cada equipo guardado en $equipos",
        "Hace un ping solo al primer equipo de $equipos",
        "Hace ping a $equipos hasta que un equipo responda",
        "Guarda en $pc el resultado del ping de cada uno"
      ],
      answer: 0,
      explain: "foreach recorre la colección y en cada vuelta guarda un elemento en $pc; Test-Connection -Count 1 envía un solo ping a ese equipo."
    },
    {
      id: "wnN03", level: 2, type: "tf",
      q: "De forma predeterminada en Windows, hacer doble clic en un archivo .ps1 lo ejecuta en PowerShell.",
      answer: false,
      explain: "Falso: por seguridad, el doble clic abre el .ps1 en el Bloc de notas. Para ejecutarlo usas .\\script.ps1 dentro de PowerShell o la opción Ejecutar con PowerShell."
    },

    // ——— Nivel 3: Avanzado (13 preguntas) ———
    {
      id: "wn13", level: 3, type: "tf",
      q: "Win+R → services.msc abre la consola de servicios.",
      answer: true,
      explain: "services.msc es el snap-in clásico para iniciar/detener/reiniciar servicios.",
      try: "Presiona Win+R, escribe `services.msc` y busca Cola de impresión para ver su estado y tipo de inicio, sin cambiar nada."
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
      explain: "ipconfig /flushdns vacía la caché de resolución DNS de Windows y obliga a consultar de nuevo. /displaydns solo la muestra y netsh winsock reset restablece el catálogo de Winsock, no el DNS.",
      try: "En cmd escribe `ipconfig /displaydns | more` para ver los nombres que Windows tiene en caché: esa es la lista que /flushdns vacía."
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
      explain: "Si hay IP pero no nombres, el problema suele ser DNS: revisa qué DNS usa el equipo, prueba la resolución con nslookup, cambia a un DNS alternativo si falla y limpia la caché para descartar respuestas viejas.",
      try: "En cmd escribe `nslookup google.com` y fíjate en qué servidor DNS respondió y qué direcciones IP devolvió."
    },
    {
      id: "wn18", level: 3, type: "mc",
      q: "¿Qué herramienta abre el Editor del Registro?",
      options: ["regedit", "mspaint", "calc", "notepad únicamente"],
      answer: 0,
      explain: "regedit edita el registro. Cámbialo solo con respaldo y conocimiento: errores pueden romper el sistema.",
      try: "En cmd escribe `reg query \"HKCU\\Control Panel\\Desktop\" /v Wallpaper` para leer un valor del registro sin modificar nada."
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
      explain: "Cada .msc abre una consola MMC: diskmgmt para discos y particiones, devmgmt para dispositivos y drivers, eventvwr para registros de eventos y lusrmgr para usuarios y grupos locales.",
      try: "Presiona Win+R, escribe `devmgmt.msc` y revisa si algún dispositivo tiene un triángulo amarillo, señal de un problema con su driver."
    },
    {
      id: "wnN04", level: 3, type: "scenario",
      q: "Escenario: un técnico ejecutó robocopy C:\\Datos E:\\Respaldo /MIR y desaparecieron de E:\\Respaldo archivos viejos que ya no estaban en C:\\Datos. ¿Qué pasó?",
      options: [
        "/MIR deja el destino igual al origen y borra lo que sobra",
        "/MIR mueve los archivos y después los borra del origen",
        "/MIR comprime en un .zip los archivos viejos del destino",
        "/MIR solo copia archivos nuevos y oculta los ya existentes"
      ],
      answer: 0,
      explain: "/MIR equivale a /E más /PURGE: copia el árbol y elimina del destino lo que ya no existe en el origen. Antes de usarlo conviene probar con /L, que solo lista."
    },
    {
      id: "wnN05", level: 3, type: "scenario",
      q: "Escenario: al correr .\\inventario.ps1 aparece que la ejecución de scripts está deshabilitada. No eres administrador. ¿Qué comando lo permite solo para tu usuario?",
      options: [
        "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser",
        "Set-ExecutionPolicy RemoteSigned -Scope LocalMachine",
        "Set-ExecutionPolicy AllSigned -Scope CurrentUser",
        "Set-ExecutionPolicy Restricted -Scope CurrentUser"
      ],
      answer: 0,
      explain: "RemoteSigned en CurrentUser deja correr tus scripts locales sin firma y no pide administrador; LocalMachine sí lo pide y AllSigned exigiría que el script esté firmado.",
      try: "En PowerShell escribe `Get-ExecutionPolicy -List` para ver la directiva de cada ámbito, como CurrentUser y LocalMachine."
    },
    {
      id: "wnN06", level: 3, type: "order",
      q: "Ordena las líneas de respaldo.bat para que no muestre los comandos, copie la carpeta que recibe como primer argumento y espere una tecla al final:",
      items: ["@echo off", "set origen=%1", "robocopy %origen% D:\\Respaldo /E", "pause"],
      answer: [0, 1, 2, 3],
      explain: "@echo off va primero para ocultar todos los comandos, la variable se define antes de usarla en robocopy y pause va al final para leer el resultado antes de que se cierre la ventana."
    },

    // ——— Nivel 4: Experto (11 preguntas) ———
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
      explain: "Verdadero: Get-WinEvent lee los registros del Visor de eventos, incluidos los de aplicaciones y servicios. Es más potente que Get-EventLog, que solo ve los registros clásicos y no existe en PowerShell 7.",
      try: "En PowerShell escribe `Get-WinEvent -LogName System -MaxEvents 5` para ver los 5 eventos más recientes del registro Sistema."
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
      explain: "Respalda o renombra la carpeta del perfil dañado, anota su SID y quita su entrada en ProfileList (con respaldo) para que Windows cree uno nuevo; luego copia los datos. La SAM guarda cuentas, no perfiles."
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
      explain: "AppLocker y WDAC (hoy App Control for Business) definen qué ejecutables, scripts e instaladores pueden correr, por editor, ruta o hash. Así frenan malware y software no autorizado."
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
      explain: "Consolas MMC de uso diario: wf.msc gestiona reglas del firewall, certmgr.msc los certificados del usuario actual, gpedit.msc las directivas del equipo local (no existe en Home) y compmgmt.msc agrupa varias herramientas.",
      try: "Presiona Win+R, escribe `certmgr.msc` y abre Entidades de certificación raíz de confianza para ver en qué CA confía tu usuario."
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
    {
      id: "wnN07", level: 4, type: "fill",
      q: "Completa la opción que guarda la salida en C:\\Logs\\copia.txt, reemplazando el registro anterior: robocopy C:\\Datos E:\\Respaldo /E ___",
      answer: "/LOG:C:\\Logs\\copia.txt",
      accept: [
        "/LOG:C:\\Logs\\copia.txt",
        "/LOG:\"C:\\Logs\\copia.txt\"",
        "/TEE /LOG:C:\\Logs\\copia.txt",
        "/LOG:C:\\Logs\\copia.txt /TEE",
        "/TEE /LOG:\"C:\\Logs\\copia.txt\"",
        "/LOG:\"C:\\Logs\\copia.txt\" /TEE",
        "/UNILOG:C:\\Logs\\copia.txt",
        "/UNILOG:\"C:\\Logs\\copia.txt\"",
        "/TEE /UNILOG:C:\\Logs\\copia.txt",
        "/UNILOG:C:\\Logs\\copia.txt /TEE",
        "/TEE /UNILOG:\"C:\\Logs\\copia.txt\"",
        "/UNILOG:\"C:\\Logs\\copia.txt\" /TEE"
      ],
      explain: "/LOG: escribe el registro en ese archivo y lo sobrescribe en cada ejecución; /LOG+: lo agregaría al final. Con /TEE además se ve en la consola y /UNILOG: es igual pero en Unicode."
    },
    {
      id: "wnN08", level: 4, type: "match",
      q: "Empareja cada opción de robocopy con lo que hace:",
      pairs: [
        { left: "/E", right: "Copia subcarpetas, incluidas las vacías" },
        { left: "/Z", right: "Modo reiniciable: retoma un archivo cortado" },
        { left: "/XO", right: "No copia si el destino tiene una versión más nueva" },
        { left: "/MOV", right: "Borra los archivos del origen tras copiarlos" }
      ],
      explain: "/E incluye carpetas vacías (/S no), /Z permite continuar copias interrumpidas, /XO no pisa una copia más nueva del destino y /MOV copia y luego borra del origen."
    },
    {
      id: "wnN09", level: 4, type: "tf",
      q: "Si robocopy termina con código de salida 1, la copia fue exitosa y se copiaron archivos.",
      answer: true,
      explain: "En robocopy, de 0 a 7 es éxito (0 = nada que copiar, 1 = archivos copiados) y 8 o más indica fallas, así que un script no debe tratar todo lo distinto de 0 como error."
    },

    // ——— Nivel 5: Maestro (11 preguntas) ———
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
      explain: "DRIVER_IRQL_NOT_LESS_OR_EQUAL indica que un driver en modo kernel accedió a memoria paginable con un IRQL demasiado alto. Actualiza o revierte el driver que señala el dump y descarta la RAM con Diagnóstico de memoria."
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
      explain: "Restringir NTLM y usar Kerberos dificulta el pass-the-hash; LAPS da una clave de admin local única a cada equipo y separar cuentas admin por niveles frena el movimiento lateral. Una clave compartida lo facilita."
    },
    {
      id: "wnL5c", level: 5, type: "fill",
      q: "Cmdlet para reiniciar un equipo remoto (uno común):",
      answer: "Restart-Computer",
      accept: ["Restart-Computer", "restart-computer"],
      explain: "Restart-Computer reinicia el equipo local o uno remoto con -ComputerName, por ejemplo Restart-Computer -ComputerName PC01 -Force; necesitas permisos de administrador en el equipo destino.",
      try: "En PowerShell escribe `Get-Command Restart-Computer -Syntax` para ver sus parámetros, como -ComputerName y -Force, sin reiniciar nada."
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
      explain: "Credential Guard usa VBS para guardar hashes NTLM y tickets Kerberos en un proceso aislado (LSAIso), fuera del alcance de quien lee la memoria de LSASS. Verificar el bootloader es tarea de Secure Boot."
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
      explain: "pktmon (integrado en Windows 10 y 11) y netsh trace capturan paquetes con herramientas de Microsoft; Message Analyzer ya fue retirado. tracert o Test-NetConnection solo prueban conectividad."
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
      explain: "Primero aíslas el equipo para que el cifrado no se propague; luego defines alcance y guardas muestras; restauras desde un backup limpio verificado y cierras con lecciones y hardening. Pagar no garantiza nada."
    },
    {
      id: "wnL5g", level: 5, type: "tf",
      q: "Un GPO con WMI filter puede aplicar solo a ciertos OS/hardware.",
      answer: true,
      explain: "Verdadero: un filtro WMI evalúa una consulta WQL en cada equipo (por ejemplo, versión del sistema operativo o modelo) y la GPO solo se aplica donde el resultado es verdadero."
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
      explain: "Si solo falla una OU, sospecha de algo asignado a esa OU: la GPO que despliega impresoras o restringe Point and Print, o permisos de la cola. Tóner agotado o Spooler caído afectarían a todos."
    },
    {
      id: "wnN10", level: 5, type: "scenario",
      q: "Escenario: una tarea de robocopy lleva horas detenida en un archivo que otro programa tiene abierto. No usaste /R ni /W. ¿Qué explica y corrige el problema?",
      options: [
        "Reintenta un millón de veces cada 30 s; usa /R:2 /W:5",
        "Faltó /Z; con /Z robocopy se salta los archivos en uso",
        "Faltó /XO; con /XO ignora los archivos que están abiertos",
        "Faltó /MIR; con /MIR omite los archivos bloqueados"
      ],
      answer: 0,
      explain: "Sin /R ni /W, robocopy reintenta un millón de veces y espera 30 s entre intentos. /R:2 /W:5 lo limita a 2 reintentos de 5 s; /Z solo permite retomar copias interrumpidas."
    },
    {
      id: "wnN11", level: 5, type: "scenario",
      q: "Escenario: net use muestra E: conectada a \\\\srv01\\publico con tu cuenta y, al ejecutar net use F: \\\\srv01\\finanzas /user:CONTOSO\\admin1 /persistent:yes, sale el error 1219. ¿Qué lo resuelve?",
      options: [
        "Desconectar E: con net use E: /delete y volver a mapear",
        "Usar otra letra de unidad libre en lugar de F: al mapear",
        "Cambiar /persistent:yes por /persistent:no en el comando",
        "Agregar /savecred para que guarde la nueva credencial"
      ],
      answer: 0,
      explain: "El error 1219 indica que ya tienes una conexión a srv01 con otra cuenta, y Windows no permite usar dos cuentas con el mismo servidor. Borrar esa conexión lo resuelve; cambiar de letra no."
    },
    {
      id: "wnN12", level: 5, type: "order",
      q: "Ordena las partes del pipeline de PowerShell que exporta el nombre y el tamaño de los .log con más de 30 días:",
      items: [
        "Get-ChildItem C:\\Logs -Filter *.log",
        "Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) }",
        "Select-Object Name, Length",
        "Export-Csv viejos.csv -NoTypeInformation"
      ],
      answer: [0, 1, 2, 3],
      explain: "Get-ChildItem produce los archivos y Where-Object filtra por fecha antes de Select-Object, que descarta LastWriteTime; Export-Csv va al final porque escribe el CSV.",
      try: "En PowerShell escribe `Get-ChildItem $env:TEMP | Where-Object Length -gt 1MB` para ver los archivos de más de 1 MB en tu carpeta temporal."
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
      explain: "Minidumps y Reliability Monitor ayudan a correlacionar drivers.",
      try: "Presiona Win+R y escribe `perfmon /rel` para abrir el Monitor de confiabilidad y ver los errores críticos de cada día."
    }
  ]
});
