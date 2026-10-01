/**
 * Tech Quest — Niveles 1–3 base + mundos (L4–L5 y mundos extra en levels5-expand.js)
 * Se aplica después de data.js y content-expand.js
 */
(function levelsExpand() {
  const LEVEL_LABELS = {
    1: { name: "Básico", icon: "1️⃣" },
    2: { name: "Intermedio", icon: "2️⃣" },
    3: { name: "Avanzado", icon: "3️⃣" },
    4: { name: "Experto", icon: "4️⃣" },
    5: { name: "Maestro", icon: "5️⃣" }
  };

  function ensureLevels(questions) {
    const n = questions.length;
    questions.forEach((q, i) => {
      if (q.level == null) {
        if (i < Math.ceil(n / 3)) q.level = 1;
        else if (i < Math.ceil((2 * n) / 3)) q.level = 2;
        else q.level = 3;
      }
    });
  }

  function add(worldId, questions) {
    const w = getWorldById(worldId);
    if (!w) return;
    w.questions = w.questions.concat(questions);
  }

  function pushWorld(world) {
    if (getWorldById(world.id)) return;
    WORLDS.push(world);
  }

  function questionsForLevel(world, level) {
    return (world.questions || []).filter((q) => q.level === level);
  }

  // Assign levels to existing content first
  WORLDS.forEach((w) => {
    ensureLevels(w.questions);
    if (w.boss) w.boss.forEach((q) => { if (q.level == null) q.level = 3; });
  });

  // ——— Pad existing worlds to ≥10 per level (focus printers/networks) ———
  add("linux", [
    { id: "lxL1a", level: 1, type: "mc", q: "¿Qué comando muestra la ruta del directorio actual?", options: ["pwd", "ls", "cd", "whoami"], answer: 0, explain: "pwd = print working directory." },
    { id: "lxL1b", level: 1, type: "tf", q: "El comando 'man ls' muestra la ayuda del comando ls.", answer: true, explain: "man abre el manual. También: ls --help." },
    { id: "lxL1c", level: 1, type: "fill", q: "Comando para copiar archivo.txt a /tmp:", answer: "cp archivo.txt /tmp", accept: ["cp archivo.txt /tmp", "cp archivo.txt /tmp/", "cp archivo.txt /tmp/archivo.txt", "cp ./archivo.txt /tmp", "cp ./archivo.txt /tmp/", "cp ./archivo.txt /tmp/archivo.txt"], explain: "cp origen destino. Usa -r para copiar directorios." },
    { id: "lxL1d", level: 1, type: "mc", q: "¿Qué hace 'cd ..'?", options: ["Sube un nivel en el árbol de directorios", "Vuelve al directorio personal del usuario (home)", "Va directamente a la raíz del sistema de archivos", "Lista el contenido del directorio padre"], answer: 0, explain: ".. es el directorio padre." },
    { id: "lxL2a", level: 2, type: "mc", q: "¿Qué hace 'grep -i error log.txt'?", options: ["Busca 'error' sin distinguir mayúsculas en log.txt", "Busca 'error' distinguiendo mayúsculas en log.txt", "Muestra las líneas de log.txt que no contienen 'error'", "Cuenta cuántas líneas de log.txt contienen 'error'"], answer: 0, explain: "grep filtra líneas. -i ignora mayúsculas." },
    { id: "lxL2b", level: 2, type: "scenario", q: "Necesitas ver quién está conectado al servidor. ¿Comando típico?", options: ["who / w", "mkdir", "apt update", "chmod 777"], answer: 0, explain: "who y w muestran sesiones activas." },
    { id: "lxL2c", level: 2, type: "fill", q: "Comando para cambiar dueño de file.txt a usuario ana:", answer: "chown ana file.txt", accept: ["chown ana file.txt", "chown ana:ana file.txt", "chown ana: file.txt", "sudo chown ana file.txt", "sudo chown ana:ana file.txt", "sudo chown ana: file.txt"], explain: "chown usuario archivo. A menudo requiere sudo." },
    { id: "lxL2d", level: 2, type: "order", q: "Ordena crear y entrar a ~/labs/demo:", items: ["cd ~", "mkdir -p labs/demo", "cd labs/demo", "pwd"], answer: [0, 1, 2, 3], explain: "mkdir -p crea la ruta; luego entras y verificas." },
    { id: "lxL3a", level: 3, type: "mc", q: "Un proceso en estado Z (zombie) indica…", options: ["Proceso terminado cuyo padre aún no hizo wait", "Proceso detenido con SIGSTOP a la espera de SIGCONT", "Proceso bloqueado en E/S no interrumpible", "Proceso huérfano que fue adoptado por init (PID 1)"], answer: 0, explain: "Los zombies ocupan una entrada en la tabla de procesos hasta que el padre recolecta el estado." },
    { id: "lxL3b", level: 3, type: "scenario", q: "Servicio no inicia: 'Address already in use'. ¿Primera idea?", options: ["Ver qué proceso usa el puerto (ss/netstat/lsof) y liberarlo", "Subir el límite de descriptores (ulimit -n) y reintentar", "Revisar /etc/hosts y reiniciar la resolución DNS local", "Dar permiso de ejecución al binario (chmod +x)"], answer: 0, explain: "Conflicto de puerto: identifica PID y decide reinicio o cambio de puerto." },
    { id: "lxL3c", level: 3, type: "fill", q: "Comando para ver sockets en escucha (ss forma corta común):", answer: "ss -tulpn", accept: ["ss -tulpn", "ss -tulnp", "ss -tunlp", "ss -tunpl", "ss -ntulp", "ss -plunt", "ss -lntup", "ss -lntpu", "ss -ltnup", "ss -nltup", "ss -tuln", "ss -tunl", "ss -lntu", "ss -ltnu", "ss -tlnp", "ss -tlpn", "ss -ltnp", "ss -lntp", "ss -ntlp", "ss -nltp", "ss -plnt", "ss -tln", "ss -ltn", "ss -lnt", "ss -ntl", "ss -tl", "ss -lt", "ss -l", "sudo ss -tulpn", "sudo ss -tulnp", "sudo ss -tunlp", "sudo ss -lntp", "sudo ss -tlnp", "sudo ss -ntlp", "netstat -tulpn", "netstat -tulnp", "netstat -tunlp", "netstat -plunt", "netstat -tuln", "netstat -tlnp", "netstat -lntp", "netstat -ltnp", "netstat -ntlp", "sudo netstat -tulpn", "sudo netstat -tulnp", "sudo netstat -tunlp", "ss -ltunp", "ss -lnptu", "ss -ltun", "ss -lnut", "ss -tnl", "ss -nlt", "ss -lnpt", "ss -ltpn", "ss -lptn", "ss -lnp", "ss -nlp", "ss -ln", "ss -nl", "ss -tlp", "ss -ltp", "ss -tulp", "ss -lp", "sudo ss -ltunp", "sudo ss -tuln", "sudo ss -ltnp", "sudo ss -nltp", "sudo ss -lnp", "sudo ss -tulp", "netstat -plnt", "netstat -ltunp", "netstat -lntup", "sudo netstat -tlnp", "sudo netstat -lntp", "sudo netstat -plunt", "sudo netstat -tuln", "ss -tnlp", "ss -tnpl", "ss -tpln", "ss -tpnl", "ss -lpnt", "ss -ntpl", "ss -nlpt", "ss -nptl", "ss -nplt", "ss -ptln", "ss -ptnl", "ss -pltn", "ss -pntl", "ss -pnlt", "ss -tlun", "ss -tlnu", "ss -tnul", "ss -tnlu", "ss -utln", "ss -utnl", "ss -ultn", "ss -ulnt", "ss -untl", "ss -unlt", "ss -lutn", "ss -lunt", "ss -ntul", "ss -ntlu", "ss -nutl", "ss -nult", "ss -nltu", "ss -nlut", "ss -lpn", "ss -npl", "ss -pln", "ss -pnl", "ss -tpl", "ss -lpt", "ss -ptl", "ss -plt", "ss -pl", "sudo ss -tnlp", "netstat -tnlp", "sudo netstat -tnlp", "netstat -tlpn", "netstat -lnpt"], explain: "ss es el moderno; -tulpn muestra TCP/UDP listening con procesos." },
    { id: "lxL3d", level: 3, type: "tf", q: "systemctl restart nginx reinicia el servicio nginx en sistemas con systemd.", answer: true, explain: "systemctl controla unidades: start/stop/restart/status/enable." }
  ]);

  add("windows", [
    { id: "wnL1a", level: 1, type: "mc", q: "¿Qué atajo abre el Administrador de tareas?", options: ["Ctrl+Shift+Esc", "Ctrl+Shift+Supr", "Win+Shift+S", "Ctrl+Alt+Tab"], answer: 0, explain: "Ctrl+Shift+Esc abre Task Manager directamente." },
    { id: "wnL1b", level: 1, type: "tf", q: "Win+L abre Configuración de Windows.", answer: false, explain: "Falso: Win+L bloquea la sesión. Configuración se abre con Win+I." },
    { id: "wnL1c", level: 1, type: "fill", q: "Comando para listar archivos en cmd:", answer: "dir", accept: ["dir", "dir /w", "dir /b", "dir /a", "dir /p", "dir .", "dir /s", "dir /a-d"], explain: "dir es el equivalente aproximado a ls." },
    { id: "wnL1d", level: 1, type: "identify", q: "¿Qué comando muestra la versión y compilación (build) de Windows en una ventana?", options: ["winver", "mspaint", "notepad", "calc"], answer: 0, explain: "winver abre 'Acerca de Windows' con versión y build. Para más detalle: systeminfo." },
    { id: "wnL2a", level: 2, type: "mc", q: "¿Qué hace sfc /scannow?", options: ["Verifica e intenta reparar archivos de sistema", "Analiza el disco en busca de sectores dañados", "Busca e instala actualizaciones pendientes", "Escanea el equipo en busca de malware"], answer: 0, explain: "System File Checker. Útil tras corrupción de componentes." },
    { id: "wnL2b", level: 2, type: "scenario", q: "Un servicio crítico está detenido. Herramienta GUI clásica:", options: ["services.msc", "devmgmt.msc", "diskmgmt.msc", "lusrmgr.msc"], answer: 0, explain: "También: Get-Service / Restart-Service en PowerShell." },
    { id: "wnL2c", level: 2, type: "order", q: "Ordena liberar y renovar DHCP:", items: ["Abrir una consola (como admin si hace falta)", "Soltar la concesión DHCP actual", "Pedir una nueva concesión al servidor DHCP", "Comprobar la IP y la puerta de enlace obtenidas"], answer: [0, 1, 2, 3], explain: "Primero sueltas la concesión actual y luego pides una nueva al servidor DHCP; al final compruebas la IP y la puerta de enlace que recibiste." },
    { id: "wnL2d", level: 2, type: "fill", q: "Cmdlet de PowerShell para leer el contenido de un archivo de texto:", answer: "Get-Content", accept: ["Get-Content", "gc", "cat", "type"], explain: "Get-Content lee archivos (alias gc, cat, type). Con -Tail 20 -Wait sigue un log en vivo." },
    { id: "wnL3a", level: 3, type: "mc", q: "El inicio de sesión en el dominio falla tras adelantar mucho la hora del equipo. Relacionado con…", options: ["Kerberos sensible al skew de tiempo", "Caché DNS que caduca al cambiar la hora", "Firma SMB que se desactiva por la hora", "Cola del Spooler bloqueada por la hora"], answer: 0, explain: "Sincroniza hora (NTP) antes de reintentar join/login de dominio." },
    { id: "wnL3b", level: 3, type: "scenario", q: "GPO no aplica. ¿Chequeo útil?", options: ["gpresult / gpupdate y Event Viewer", "sfc /scannow y DISM /RestoreHealth", "msconfig y el Programador de tareas", "chkdsk /f y desfragmentar la unidad"], answer: 0, explain: "gpupdate /force y gpresult /h report.html ayudan a diagnosticar." },
    { id: "wnL3c", level: 3, type: "tf", q: "BitLocker cifra el tráfico de red entre el equipo y el servidor.", answer: false, explain: "Falso: BitLocker cifra volúmenes (datos en reposo), no el tráfico de red; para eso están TLS, IPsec o una VPN. Guarda la clave de recuperación de forma segura." },
    {
      id: "wnL3d",
      level: 3,
      type: "match",
      q: "Empareja herramienta y uso:",
      pairs: [
        { left: "diskmgmt.msc", right: "Administrar discos/particiones" },
        { left: "devmgmt.msc", right: "Administrador de dispositivos" },
        { left: "eventvwr.msc", right: "Visor de eventos" },
        { left: "lusrmgr.msc", right: "Usuarios y grupos locales" }
      ],
      explain: "Las consolas .msc aceleran la administración."
    }
  ]);

  add("printers", [
    { id: "prL1a", level: 1, type: "mc", q: "Si la impresora no enciende, lo primero es revisar…", options: ["Alimentación y cable de corriente", "El driver y la cola del Spooler en el PC", "La dirección IP y la máscara de subred", "El nivel de tóner y el contador de páginas"], answer: 0, explain: "Siempre empieza por lo físico: corriente, cable, interruptor." },
    { id: "prL1b", level: 1, type: "tf", q: "Si la página de prueba de la impresora sale bien, el problema está seguro en el hardware de la impresora.", answer: false, explain: "Falso: si la página de prueba sale bien, la impresora funciona; el fallo suele estar en el documento, la aplicación o el driver." },
    { id: "prL1c", level: 1, type: "identify", q: "Indicador típico de papel atascado:", options: ["Mensaje/LED de jam o paper jam", "Mensaje/LED de 'toner low'", "Aviso 'Replace drum' en el panel", "LED de Wi‑Fi parpadeando en azul"], answer: 0, explain: "'Jam' o 'paper jam' indica papel atascado; 'toner low' y 'Replace drum' son avisos de consumibles." },
    { id: "prL1d", level: 1, type: "mc", q: "USB vs red para una sola persona en casa: suele ser más simple…", options: ["USB directo al PC", "Un print server Windows dedicado", "Cola LPR en un servidor Linux", "Impresión SMB vía otro PC del dominio"], answer: 0, explain: "USB es plug-and-play. Red brilla cuando hay varios usuarios." },
    { id: "prL1e", level: 1, type: "fill", q: "Desde Win+R, para abrir Dispositivos e impresoras escribe: control ______", answer: "printers", accept: ["printers", "control printers"], explain: "control printers abre Dispositivos e impresoras (en versiones recientes puede llevar a Configuración → Impresoras y escáneres)." },
    { id: "prL2a", level: 2, type: "mc", q: "WSD en impresión Windows significa a grandes rasgos…", options: ["Web Services for Devices (descubrimiento)", "Windows Shared Driver (paquete de drivers)", "Wireless Secure Direct (conexión Wi‑Fi Direct)", "Web Spool Directory (carpeta de spool)"], answer: 0, explain: "WSD ayuda a descubrir dispositivos; a veces se prefiere puerto TCP/IP estándar por estabilidad." },
    { id: "prL2b", level: 2, type: "scenario", q: "Cola en 'Error - imprimiendo' eternamente. Paso frecuente:", options: ["Reiniciar Spooler y limpiar trabajos atascados", "Reemplazar el cartucho de tóner y la unidad de tambor", "Renovar la IP del PC con ipconfig /renew", "Reiniciar el servicio DHCP del servidor"], answer: 0, explain: "Spooler + carpeta de spool + driver correcto resuelven muchos atascos lógicos." },
    { id: "prL2c", level: 2, type: "order", q: "Ordena cómo compartir una impresora desde un print server Windows:", items: ["Instalar la impresora y su driver en el servidor", "Compartirla con un nombre y ajustar sus permisos", "Conectar desde el cliente a \\\\servidor\\impresora", "Imprimir una página de prueba desde el cliente"], answer: [0, 1, 2, 3], explain: "Primero la impresora debe funcionar en el servidor; luego se comparte con sus permisos, el cliente se conecta a la cola compartida (y descarga el driver) y al final se valida con una página de prueba." },
    { id: "prL2d", level: 2, type: "mc", q: "SNMP en impresoras de red sirve para…", options: ["Monitorear estado (tóner, bandejas, errores)", "Asignar la IP de la impresora en lugar de DHCP", "Cifrar los trabajos entre el PC y la impresora", "Autenticar a los usuarios antes de liberar sus trabajos"], answer: 0, explain: "Muchas consolas de flota leen OID SNMP del dispositivo." },
    { id: "prL2e", level: 2, type: "tf", q: "Un print server puede desplegar drivers a clientes vía point-and-print (con políticas adecuadas).", answer: true, explain: "En dominio facilita estandarizar modelos; revisa restricciones de seguridad modernas." },
    { id: "prL3a", level: 3, type: "mc", q: "AirPrint típicamente se apoya en…", options: ["mDNS/Bonjour + IPP", "WS-Discovery + SMB", "NetBIOS + LPR/LPD", "SNMP + raw 9100"], answer: 0, explain: "Dispositivos Apple descubren la impresora y hablan IPP." },
    { id: "prL3b", level: 3, type: "scenario", q: "El print server print01 imprime bien por 9100, pero al conectarse a sus colas los clientes ven 'No se encuentra la ruta de acceso de la red'. Enfoque:", options: ["DNS del servidor y SMB (445/tcp) desde el cliente", "Abrir el puerto 9100 en el firewall del print server", "Cambiar el driver PCL del cliente por PostScript", "Reservar otra IP para la impresora en DHCP"], answer: 0, explain: "El tramo server → impresora (9100) funciona; falla cliente → server. Comprueba que print01 resuelve por DNS y que el firewall permite SMB (445/tcp) hacia el print server." },
    { id: "prL3c", level: 3, type: "match", q: "Empareja PDL/idea:", pairs: [
      { left: "PCL", right: "Lenguaje típico HP / amplio en oficina" },
      { left: "PostScript", right: "Lenguaje Adobe; artes gráficas" },
      { left: "PDF direct", right: "Algunas MFP imprimen PDF nativo" },
      { left: "Raw 9100", right: "Bytes al puerto sin cola compleja" }
    ], explain: "Mismatch de PDL = basura en página." },
    { id: "prL3d", level: 3, type: "fill", q: "Puerto LPR/LPD clásico (número):", answer: "515", accept: ["515"], explain: "LPR/LPD (Line Printer Daemon) usa el puerto 515/tcp." },
    { id: "prL3e", level: 3, type: "order", q: "Incidente: flota offline tras cambio de VLAN. Ordena:", items: ["Confirmar gateway/máscara nueva en impresoras", "Probar ping y puertos de impresión desde el print server", "Actualizar puertos TCP/IP o DNS con las IP ya verificadas", "Página de prueba y comunicar a usuarios"], answer: [0, 1, 2, 3], explain: "Cambio de L3 rompe puertos antiguos: valida conectividad en la nueva red, luego actualiza puertos/DNS e inventario, y confirma con página de prueba." }
  ]);

  add("networks", [
    { id: "netL1a", level: 1, type: "mc", q: "¿Qué dispositivo suele conectar PCs en la misma LAN a nivel de tramas?", options: ["Switch", "Monitor", "Impresora solo USB", "Teclado"], answer: 0, explain: "El switch reenvía frames en la LAN (capa 2)." },
    { id: "netL1b", level: 1, type: "tf", q: "8.8.8.0/24 es un rango de direcciones privadas (RFC 1918).", answer: false, explain: "Falso: 8.8.8.0/24 es público (DNS de Google). Los rangos privados RFC 1918 son 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16." },
    { id: "netL1c", level: 1, type: "fill", q: "Comando Windows para probar eco ICMP a 1.1.1.1:", answer: "ping 1.1.1.1", accept: ["ping 1.1.1.1", "ping.exe 1.1.1.1", "ping -4 1.1.1.1", "ping -n 4 1.1.1.1", "ping /n 4 1.1.1.1", "ping 1.1.1.1 -n 4", "ping -t 1.1.1.1", "ping /t 1.1.1.1", "ping 1.1.1.1 -t", "ping 1.1.1.1 /t", "Test-Connection 1.1.1.1", "Test-Connection -ComputerName 1.1.1.1", "Test-Connection -TargetName 1.1.1.1", "Test-NetConnection 1.1.1.1"], explain: "ping verifica conectividad básica (si ICMP no está filtrado)." },
    { id: "netL1d", level: 1, type: "mc", q: "¿Qué puerto TCP usa SSH por defecto?", options: ["22", "23", "80", "3389"], answer: 0, explain: "SSH usa 22/tcp. El 23 es Telnet (sin cifrar), el 80 HTTP y el 3389 RDP." },
    { id: "netL1e", level: 1, type: "identify", q: "¿Qué identifica a la tarjeta de red dentro de la LAN (capa 2)?", options: ["Dirección MAC", "Dirección IP", "Máscara de subred", "Puerto TCP"], answer: 0, explain: "La MAC (48 bits, p. ej. 00:1A:2B:…) identifica la interfaz en la LAN; la IP es lógica (capa 3) y puede cambiar." },
    { id: "netL2a", level: 2, type: "mc", q: "¿Cuántos hosts útiles aprox. en /26?", options: ["62", "254", "6", "1022"], answer: 0, explain: "2^(32-26)-2 = 62." },
    { id: "netL2b", level: 2, type: "scenario", q: "Dos PCs con IP 192.168.1.10/24 y 192.168.2.10/24 no se hacen ping. ¿Causa típica?", options: ["Están en subredes distintas sin router entre ellas", "Les falta un servidor DNS configurado en el adaptador", "El switch no reenvía tráfico ICMP entre sus puertos", "Ambas terminan en .10 y eso genera un conflicto de IP"], answer: 0, explain: "Con /24, 192.168.1.0/24 y 192.168.2.0/24 son redes distintas: cada PC ve a la otra fuera de su red y necesita un router (gateway) para alcanzarla, aunque compartan switch. Que ambas terminen en .10 no es conflicto de IP: un conflicto exige la misma dirección completa." },
    { id: "netL2c", level: 2, type: "order", q: "Ordena las primeras 4 capas del modelo OSI (de abajo hacia arriba):", items: ["Física", "Enlace de datos", "Red", "Transporte"], answer: [0, 1, 2, 3], explain: "1 Física (cable/señal), 2 Enlace de datos (MAC, switch), 3 Red (IP, router), 4 Transporte (TCP/UDP, puertos)." },
    { id: "netL2d", level: 2, type: "fill", q: "Máscara decimal de /24:", answer: "255.255.255.0", accept: ["255.255.255.0"], explain: "/24 = 24 bits de red." },
    { id: "netL2e", level: 2, type: "tf", q: "Con PAT (NAT overload), el router distingue las conexiones de cada host interno por el puerto de origen.", answer: true, explain: "Verdadero: PAT reescribe IP y puerto de origen y guarda la asociación en su tabla NAT para devolver cada respuesta al host correcto." },
    { id: "netL3a", level: 3, type: "mc", q: "Una ACL de firewall que deniega 3389/tcp entrante desde Internet reduce exposición a…", options: ["RDP no autorizado", "SSH hacia servidores Linux", "Tráfico web HTTPS entrante", "Consultas DNS recursivas"], answer: 0, explain: "Exponer RDP a Internet es alto riesgo sin VPN/hardening." },
    { id: "netL3b", level: 3, type: "scenario", q: "Usuarios de VLAN invitados no deben ver servidores de finanzas. Solución típica:", options: ["Segmentación VLAN + ACL/firewall inter-VLAN", "Una VLAN plana /8 con contraseñas fuertes", "Ocultar el SSID de invitados y subir la potencia", "Dar a invitados IPs fijas en la subred de finanzas"], answer: 0, explain: "Seguridad por segmentación y mínimo privilegio de red." },
    {
      id: "netL3c",
      level: 3,
      type: "match",
      q: "Empareja concepto avanzado:",
      pairs: [
        { left: "DMZ", right: "Zona aislada para servidores públicos" },
        { left: "Port forwarding", right: "Publica un puerto interno hacia Internet" },
        { left: "MTU", right: "Tamaño máximo de paquete del enlace" },
        { left: "QoS", right: "Prioriza tráfico sensible como la voz" }
      ],
      explain: "La DMZ aísla lo que se expone; el port forwarding publica un servicio concreto; un MTU mal ajustado fragmenta o rompe túneles; QoS prioriza voz/video frente a best-effort."
    },
    { id: "netL3d", level: 3, type: "fill", q: "Puerto SSH por defecto:", answer: "22", accept: ["22", "22/tcp", "tcp/22", "tcp 22"], explain: "22/tcp SSH. Cambia el puerto solo como capa extra, no como única defensa." },
    { id: "netL3e", level: 3, type: "order", q: "Ordena diagnóstico WAN caída (LAN OK):", items: ["Verificar enlace físico ONT/módem", "Revisar IP WAN/PPP en router", "Probar ping a DNS público desde router", "Abrir ticket ISP con evidencias"], answer: [0, 1, 2, 3], explain: "Separa CPE vs proveedor con datos." }
  ]);

  add("programming", [
    { id: "pgL1a", level: 1, type: "mc", q: "¿Qué es un string?", options: ["Una secuencia de caracteres/texto", "Un número entero sin decimales", "Un valor true o false", "Una lista ordenada de valores"], answer: 0, explain: "En JS: 'hola' o \"hola\"." },
    { id: "pgL1b", level: 1, type: "tf", q: "JavaScript y Java son el mismo lenguaje con distinto nombre.", answer: false, explain: "Falso: son lenguajes distintos; el parecido del nombre fue una decisión de marketing de 1995. JavaScript corre en navegadores y Node.js; Java, en la JVM." },
    { id: "pgL1c", level: 1, type: "fill", q: "Etiqueta HTML de enlace (apertura):", answer: "<a>", accept: ["<a>", "<a></a>", "a", "<a href>", "<a href=\"\">", "<a href=''>", "<a href=\"#\">", "<a href='#'>", "<a href=\"...\">", "<a href='...'>", "a href"], explain: "<a href='...'>texto</a>." },
    { id: "pgL1d", level: 1, type: "mc", q: "Un bucle while se repite…", options: ["Mientras la condición sea verdadera", "Hasta que la condición sea verdadera", "Un número fijo de veces", "Solo una vez, al cargar el programa"], answer: 0, explain: "Evita condiciones que nunca se vuelven false." },
    { id: "pgL2a", level: 2, type: "mc", q: "¿Qué hace return en una función?", options: ["Devuelve un valor y sale de la función", "Imprime un valor en la consola", "Repite la función desde el principio", "Declara el tipo de dato que acepta la función"], answer: 0, explain: "Sin return, muchas funciones devuelven undefined (JS)." },
    { id: "pgL2b", level: 2, type: "scenario", q: "Tu código falla solo a veces. Buena práctica:", options: ["Reproducir, aislar, escribir prueba, luego fix", "Envolver todo en try/catch vacío para ocultar el error", "Desactivar las pruebas que fallan de forma intermitente", "Subir un cambio al azar y ver si deja de fallar"], answer: 0, explain: "Los bugs intermitentes necesitan evidencia y tests." },
    { id: "pgL2c", level: 2, type: "fill", q: "En JS, igualdad estricta:", answer: "===", accept: ["==="], explain: "=== compara valor y tipo." },
    { id: "pgL2d", level: 2, type: "order", q: "Ordena los pasos para escribir una función y comprobarla:", items: ["Definir qué recibe y qué devuelve", "Escribir el cuerpo de la función", "Llamarla con datos de prueba", "Comparar el resultado con lo esperado"], answer: [0, 1, 2, 3], explain: "Primero el contrato (entradas y salida), luego la implementación, y al final se prueba con datos conocidos, comparando con el resultado esperado." },
    { id: "pgL3a", level: 3, type: "mc", q: "Una race condition ocurre cuando…", options: ["El resultado depende del orden/tiempo de ejecución concurrente", "Dos funciones se llaman entre sí de forma recursiva sin fin", "El programa reserva memoria que nunca libera con el tiempo", "Un bucle nunca cumple su condición de salida"], answer: 0, explain: "Locks, colas y diseño cuidadoso mitigan carreras." },
    { id: "pgL3b", level: 3, type: "tf", q: "Las pruebas automatizadas reducen regresiones al cambiar código.", answer: true, explain: "CI ejecuta tests en cada cambio." },
    { id: "pgL3c", level: 3, type: "scenario", q: "API devuelve 500 intermitente. ¿Dónde mirar primero?", options: ["Logs del servidor, métricas y trazas de la request", "La caché del navegador y las cookies del cliente", "Los estilos CSS de la página que hace la llamada", "La configuración DNS del equipo del desarrollador"], answer: 0, explain: "Correlaciona request-id entre gateway y app." },
    {
      id: "pgL3d",
      level: 3,
      type: "match",
      q: "Empareja el concepto de programación con su definición:",
      pairs: [
        { left: "try/catch", right: "Manejo de excepciones" },
        { left: "JSON", right: "Formato de datos muy usado en APIs" },
        { left: "REST", right: "Estilo de API sobre HTTP" },
        { left: "SQL injection", right: "Ataque por entradas no sanitizadas" }
      ],
      explain: "Fundamentos de backend y seguridad de apps."
    }
  ]);

  add("support", [
    { id: "suL1a", level: 1, type: "mc", q: "Al atender un ticket, lo primero suele ser…", options: ["Saludar, identificarte y confirmar el problema", "Reiniciar el equipo del usuario en remoto sin preguntar", "Escalar a N2 antes de conocer el problema", "Pedirle su contraseña para entrar a su sesión"], answer: 0, explain: "Rapport + clarificación ahorran tiempo." },
    { id: "suL1b", level: 1, type: "tf", q: "Anotar la hora del error ayuda a buscar en logs.", answer: true, explain: "Correlación temporal es clave." },
    { id: "suL1c", level: 1, type: "mc", q: "P1 suele significar…", options: ["Impacto crítico / urgencia alta", "Impacto bajo / sin urgencia", "Primer nivel de soporte (N1)", "Problema con causa raíz conocida"], answer: 0, explain: "P1 es la prioridad más alta: una falla en un servicio crítico que afecta a muchos usuarios y no admite espera." },
    { id: "suL1d", level: 1, type: "fill", q: "Sigla del acuerdo de nivel de servicio:", answer: "SLA", accept: ["SLA", "sla", "ANS"], explain: "Service Level Agreement (en español también ANS: acuerdo de nivel de servicio)." },
    { id: "suL2a", level: 2, type: "scenario", q: "Usuario dice 'nada funciona'. Mejor pregunta:", options: ["¿Desde cuándo? ¿Qué app/URL? ¿Solo tu PC u otros?", "¿Me das tu contraseña y el código MFA para entrar?", "¿Reinstalamos Windows ya o restauramos la imagen?", "¿Formateamos el disco y empezamos desde cero?"], answer: 0, explain: "Acota alcance antes de actuar." },
    { id: "suL2b", level: 2, type: "order", q: "Ordena el flujo de un escalamiento útil a N2:", items: ["Confirmar el síntoma y medir el impacto", "Aplicar los pasos N1 del runbook/KB", "Confirmar que excede N1 (alcance, permisos o SLA)", "Escalar a N2 con resumen, pasos, logs y contacto"], answer: [0, 1, 2, 3], explain: "Primero acota el problema y agota lo que N1 puede resolver; si excede tu alcance o el SLA, escala con un handoff completo (síntoma, pasos probados, evidencia, contacto) para no duplicar trabajo." },
    { id: "suL2c", level: 2, type: "mc", q: "Un workaround es…", options: ["Solución temporal mientras llega el fix definitivo", "Corrección permanente que elimina la causa raíz del problema", "Cambio de emergencia aprobado por el CAB fuera de ventana", "Escalado funcional del ticket a un equipo especialista"], answer: 0, explain: "Documenta el workaround en el ticket/KB." },
    { id: "suL2d", level: 2, type: "tf", q: "Prometer un ETA optimista, aunque sea imposible, mejora la confianza del usuario.", answer: false, explain: "Falso: un ETA incumplido daña la confianza. Mejor rangos honestos y actualizaciones periódicas." },
    { id: "suL2e", level: 2, type: "mc", q: "Una KB (knowledge base) bien escrita sirve para…", options: ["Resolver casos repetidos más rápido y con consistencia", "Registrar el inventario de hardware y licencias de la empresa", "Medir la satisfacción del usuario tras cada ticket", "Sustituir los tickets para no tener que registrar incidentes"], answer: 0, explain: "Documenta pasos verificados y causas conocidas." },
    { id: "suL3a", level: 3, type: "mc", q: "En un major incident, N1 prioriza…", options: ["Comunicación, bridge y runbook / escalación", "Probar fixes por su cuenta antes de avisar a nadie", "Cerrar los tickets duplicados como spam sin responder", "Atender tickets por orden de llegada"], answer: 0, explain: "Restaurar servicio + comunicar status." },
    { id: "suL3b", level: 3, type: "scenario", q: "Change falló en prod. Siguiente paso típico:", options: ["Ejecutar rollback según plan y avisar", "Aplicar más cambios en caliente hasta que funcione", "Cerrar el change como exitoso y revisarlo el lunes", "Esperar a que los usuarios reporten y luego decidir"], answer: 0, explain: "Todo change serio trae rollback." },
    {
      id: "suL3c",
      level: 3,
      type: "match",
      q: "Empareja el término de ITIL con su significado:",
      pairs: [
        { left: "Incidente", right: "Interrupción no planificada del servicio" },
        { left: "Problema", right: "Causa raíz / investigación más profunda" },
        { left: "Request", right: "Petición de servicio estándar" },
        { left: "CAB", right: "Comité de cambios / aprobaciones" }
      ],
      explain: "Vocabulario ITIL básico en help desk."
    },
    { id: "suL3d", level: 3, type: "fill", q: "Sigla de autenticación multifactor (inglés):", answer: "MFA", accept: ["MFA", "mfa"], explain: "MFA (Multi-Factor Authentication) exige dos o más factores; 2FA es el caso particular de exactamente dos." },
    { id: "suL3e", level: 3, type: "tf", q: "Un post-mortem debe centrarse en encontrar al culpable del incidente.", answer: false, explain: "Falso: el post-mortem es sin culpas (blameless): busca causas y mejoras del sistema y del proceso para que no se repita." }
  ]);

  // ——— Nuevo mundo: Ciberseguridad ———
  pushWorld({
    id: "security",
    name: "Ciberseguridad",
    icon: "🛡️",
    color: "#ff5566",
    description: "Phishing, contraseñas, MFA, malware y navegación segura.",
    questions: [
      // L1
      { id: "sec01", level: 1, type: "mc", q: "El phishing busca…", options: ["Engañarte para robar credenciales o datos", "Saturar un servidor con tráfico", "Explotar fallos de software sin parchear", "Adivinar contraseñas por fuerza bruta"], answer: 0, explain: "Correos/SMS/webs falsas imitan marcas legítimas." },
      { id: "sec02", level: 1, type: "tf", q: "Una contraseña larga y única por sitio es mejor que reutilizar '123456'.", answer: true, explain: "Usa gestor de contraseñas + MFA." },
      { id: "sec03", level: 1, type: "mc", q: "MFA significa…", options: ["Autenticación multifactor", "Monitoreo de fallos de acceso", "Mapa de firewall automático", "Método de filtrado antispam"], answer: 0, explain: "Algo que sabes + tienes / eres." },
      { id: "sec04", level: 1, type: "identify", q: "Señal típica de phishing por correo:", options: ["Urgencia + enlace sospechoso + remitente raro", "Remitente del dominio interno con firma DKIM válida", "Enlaces que apuntan al dominio oficial de la empresa", "Comunicado anunciado antes en la intranet"], answer: 0, explain: "Verifica dominio, hover del link y canales oficiales." },
      { id: "sec05", level: 1, type: "fill", q: "Término corto en inglés (contracción de 'malicious software') para software malicioso:", answer: "malware", accept: ["malware", "Malware"], explain: "Malware incluye virus, troyanos, ransomware, spyware…" },
      { id: "sec06", level: 1, type: "mc", q: "Actualizar el sistema y apps ayuda a…", options: ["Cerrar vulnerabilidades conocidas", "Sustituir la necesidad de tener copias de seguridad", "Recuperar archivos cifrados por un ransomware", "Aumentar la memoria RAM disponible"], answer: 0, explain: "Parches corrigen fallos explotables." },
      { id: "sec07", level: 1, type: "tf", q: "HTTPS garantiza que el sitio web es legítimo y seguro.", answer: false, explain: "Falso: HTTPS cifra el tráfico en tránsito, pero un sitio de phishing también puede tener un certificado válido. Revisa bien el dominio." },
      { id: "sec08", level: 1, type: "scenario", q: "Te llaman 'de TI' pidiendo tu contraseña. ¿Qué haces?", options: ["No la des; verifica por canal oficial", "Se la das solo si conoce tu nombre y tu puesto", "Se la dictas y la cambias en cuanto cuelgues", "Se la envías por el chat interno de la empresa"], answer: 0, explain: "Soporte legítimo no pide tu password." },
      { id: "sec09", level: 1, type: "mc", q: "Un antivirus/EDR sirve para…", options: ["Detectar y bloquear amenazas en el endpoint", "Reemplazar las copias de seguridad", "Sustituir al firewall perimetral siempre", "Filtrar tráfico entre VLANs del switch"], answer: 0, explain: "Defensa en profundidad: endpoint + red + identidad." },
      { id: "sec10", level: 1, type: "order", q: "Ordena reacción ante correo sospechoso:", items: ["Detectar señales (remitente, urgencia, enlace raro)", "No hacer clic ni abrir adjuntos", "Reportar a seguridad/TI", "Borrar o cuarentenar según política"], answer: [0, 1, 2, 3], explain: "Detecta, no interactúes, reporta (antes de borrar, para que TI pueda analizarlo) y luego elimina. Si ya interactuaste, cambia tu password de inmediato." },
      // L2
      { id: "sec11", level: 2, type: "mc", q: "El ransomware típicamente…", options: ["Cifra archivos y pide rescate", "Muestra anuncios emergentes en el navegador", "Registra tus teclas y las envía al atacante", "Mina criptomonedas con tu CPU"], answer: 0, explain: "Backups offline/inmutables son críticos." },
      { id: "sec12", level: 2, type: "scenario", q: "USB desconocido en el estacionamiento. Acción correcta:", options: ["No conectarlo; reportar", "Probarlo en el DC", "Abrirlo en finanzas", "Instalar drivers del USB"], answer: 0, explain: "USB baiting es un vector real." },
      { id: "sec13", level: 2, type: "mc", q: "Principio de mínimo privilegio significa…", options: ["Dar solo los permisos necesarios para la tarea", "Dar permisos amplios y retirarlos si hay un incidente", "Registrar en logs solo los eventos de menor prioridad", "Heredar los permisos del jefe directo"], answer: 0, explain: "Reduce el blast radius de una cuenta comprometida." },
      { id: "sec14", level: 2, type: "tf", q: "Una VPN corporativa cifra el tráfico hacia la red de la empresa.", answer: true, explain: "Útil en Wi‑Fi públicos; no sustituye buen juicio." },
      { id: "sec15", level: 2, type: "fill", q: "Ataque que satura un servicio para tumbarlo (sigla):", answer: "DDoS", accept: ["DDoS", "ddos", "DoS", "dos"], explain: "Denial of Service / Distributed DoS." },
      { id: "sec16", level: 2, type: "match", q: "Empareja amenaza:", pairs: [
        { left: "Phishing", right: "Engaño para robar datos" },
        { left: "Malware", right: "Software dañino" },
        { left: "Shoulder surfing", right: "Mirar tu pantalla/teclado" },
        { left: "Tailgating", right: "Entrar detrás de alguien sin badge" }
      ], explain: "Amenazas técnicas y físicas." },
      { id: "sec17", level: 2, type: "mc", q: "2FA por SMS es mejor que nada, pero más fuerte suele ser…", options: ["App TOTP / llave FIDO2", "La misma password en todos lados", "Preguntas 'nombre de tu perro' solo", "Desactivar MFA"], answer: 0, explain: "SIM swap debilita SMS; preferir app o hardware key." },
      { id: "sec18", level: 2, type: "order", q: "Ordena endurecimiento básico de cuenta cloud (primero protege el acceso, luego limpia lo existente y al final monitorea):", items: ["Password única fuerte", "Activar MFA", "Cerrar sesiones/dispositivos desconocidos", "Activar alertas de login sospechoso"], answer: [0, 1, 2, 3], explain: "Protege credenciales (password + MFA), cierra sesiones/dispositivos desconocidos y deja alertas para lo que venga. Identidad es el nuevo perímetro." },
      { id: "sec19", level: 2, type: "scenario", q: "Extensión del navegador pide leer todos los datos de todos los sitios. Riesgo:", options: ["Puede robar cookies/sesiones; desconfía", "Ninguno si viene de la tienda oficial", "Solo gasta más RAM, sin riesgo real", "Solo afecta a sitios HTTP, no a HTTPS"], answer: 0, explain: "Revisa permisos y reputación." },
      { id: "sec20", level: 2, type: "tf", q: "Tener backups basta, aunque nunca se haya probado restaurarlos.", answer: false, explain: "Falso: un backup no probado puede fallar justo durante un ransomware. Prueba restauraciones y guarda copias offline o inmutables." },
      // L3
      { id: "sec21", level: 3, type: "mc", q: "Un attack surface amplio significa…", options: ["Más puntos por donde pueden atacarte", "Más FPS", "Mejor calidad de impresión", "Más VLANs automáticamente seguras"], answer: 0, explain: "Reduce servicios expuestos y parchea." },
      { id: "sec22", level: 3, type: "scenario", q: "Sospechas de token OAuth robado. Acción típica:", options: ["Revocar sesiones/tokens, rotar secretos, revisar logs", "Cambiar solo la contraseña del usuario y seguir igual", "Esperar a que el token caduque solo y no hacer nada", "Reinstalar el navegador del usuario"], answer: 0, explain: "Contención de identidad + forense ligero." },
      { id: "sec23", level: 3, type: "mc", q: "El principio Zero Trust asume…", options: ["No confiar solo por estar en la LAN; verificar siempre", "Que todo lo que está dentro de la red es de confianza", "Que basta con una VPN para confiar en cualquier equipo", "Que USB es seguro"], answer: 0, explain: "Verifica identidad, dispositivo y contexto." },
      { id: "sec24", level: 3, type: "fill", q: "Sigla de lista de control de acceso (inglés):", answer: "ACL", accept: ["ACL", "acl"], explain: "ACLs en firewalls/filesystems limitan quién hace qué." },
      { id: "sec25", level: 3, type: "order", q: "Ordena respuesta a incidente (IR) simplificada:", items: ["Identificar/contener", "Erradicar", "Recuperar", "Lecciones aprendidas"], answer: [0, 1, 2, 3], explain: "NIST/SANS condensado para help desk." },
      { id: "sec26", level: 3, type: "match", q: "Empareja control:", pairs: [
        { left: "Cifrado en reposo", right: "BitLocker/disk encryption" },
        { left: "Cifrado en tránsito", right: "TLS/VPN" },
        { left: "Hardening", right: "Desactivar servicios innecesarios" },
        { left: "Patching", right: "Aplicar actualizaciones de seguridad" }
      ], explain: "Controles preventivos clave." },
      { id: "sec27", level: 3, type: "tf", q: "Exponer RDP (3389) directo a Internet es seguro si la contraseña es larga.", answer: false, explain: "Falso: un RDP expuesto recibe fuerza bruta y exploits constantes. Ponlo detrás de una VPN o gateway, con NLA y MFA, y bloquea los intentos repetidos." },
      { id: "sec28", level: 3, type: "scenario", q: "Empleado reenvió nómina a Gmail personal. Riesgo principal:", options: ["Fuga de datos / violación de política", "Que se borre el correo original del servidor", "Spam en el buzón del empleado", "Retrasos en el envío por el tamaño del adjunto"], answer: 0, explain: "DLP y concienciación mitigan shadow IT." },
      { id: "sec29", level: 3, type: "mc", q: "Un hash de password se usa para…", options: ["Almacenar verificadores sin guardar la clave en claro", "Cifrar la contraseña para poder descifrarla al iniciar sesión", "Comprimir la contraseña para que ocupe menos en la base", "Generar contraseñas aleatorias"], answer: 0, explain: "Con salt + algoritmo moderno (bcrypt/argon2)." },
      { id: "sec30", level: 3, type: "identify", q: "Framework común de gestión de riesgos/controles en empresas:", options: ["ISO 27001 / NIST CSF", "ISO 8601 / RFC 3339", "IEEE 802.3 / IEEE 802.11", "RFC 1918 / RFC 4193"], answer: 0, explain: "Son ejemplos: ayudan a organizar controles y auditorías." }
    ],
    boss: [
      { id: "secB1", level: 3, type: "scenario", q: "BOSS: Campaña de phishing masiva con dominio lookalike. ¿Primera contención?", options: ["Alertar usuarios, bloquear dominio/URL, resetear cuentas que interactuaron", "Pedir que reenvíen el correo a toda la empresa como advertencia", "Desactivar el antispam para ver todos los correos que llegan", "Esperar a que el proveedor de correo lo detecte, sin avisar a nadie"], answer: 0, explain: "Comunicación + bloqueo + identidad." },
      { id: "secB2", level: 3, type: "mc", q: "BOSS: Ransomware en un file share. Prioridad:", options: ["Aislar hosts, preservar evidencias, restaurar desde backup limpio", "Pagar el rescate de inmediato para recuperar los archivos", "Restaurar el backup sobre los hosts infectados sin aislarlos", "Apagar los logs para que el atacante no detecte la respuesta"], answer: 0, explain: "Contención y recuperación probada." },
      { id: "secB3", level: 3, type: "order", q: "BOSS: Cuenta admin comprometida:", items: ["Deshabilitar la cuenta y cerrar sus sesiones activas", "Revocar tokens y rotar secretos a los que tuvo acceso", "Auditar los cambios que hizo la cuenta", "Revertir cambios maliciosos y documentar"], answer: [0, 1, 2, 3], explain: "Primero corta todo acceso (cuenta, sesiones, tokens y secretos); luego investiga qué cambió y al final remedia lo encontrado." },
      { id: "secB4", level: 3, type: "tf", q: "BOSS: El logging centralizado ayuda a detectar y investigar incidentes.", answer: true, explain: "SIEM/consultas correlacionan eventos." },
      { id: "secB5", level: 3, type: "fill", q: "BOSS: Factor 'algo que tienes' en MFA (ejemplo corto: app o …):", answer: "token", accept: ["token", "llave", "key", "app", "telefono", "teléfono", "telefono celular", "teléfono celular", "otp", "totp", "celular", "movil", "móvil", "smartphone", "sms", "yubikey", "fido", "fido2", "passkey", "llave fisica", "llave física", "llave usb", "llave de seguridad", "security key", "token fisico", "token físico", "hardware token", "token de hardware", "tarjeta inteligente", "smartcard", "smart card", "autenticador", "authenticator", "telefono movil", "teléfono móvil", "llave fido", "llave fido2", "llave de hardware", "token usb", "token bancario", "tarjeta", "tarjeta de coordenadas"], explain: "Token/app/llave física complementan la password." }
    ]
  });

  // ——— Nuevo mundo: Hardware ———
  pushWorld({
    id: "hardware",
    name: "Hardware / ensamblado",
    icon: "🔧",
    color: "#ffa64d",
    description: "CPU, RAM, discos, BIOS/UEFI, fuentes, puertos y fallos.",
    questions: [
      { id: "hw01", level: 1, type: "mc", q: "La CPU es…", options: ["El procesador principal del sistema", "La memoria principal donde se cargan los programas", "El chip que genera la imagen para el monitor", "La placa donde se conectan todos los componentes"], answer: 0, explain: "Central Processing Unit: ejecuta instrucciones." },
      { id: "hw02", level: 1, type: "tf", q: "La RAM conserva los datos aunque apagues el equipo.", answer: false, explain: "Falso: la RAM es volátil y se borra al apagar. Lo permanente va en el disco o SSD." },
      { id: "hw03", level: 1, type: "mc", q: "SSD frente a HDD típico:", options: ["SSD más rápido y sin platos mecánicos", "HDD más rápido porque sus platos giran a 7200 rpm", "SSD más lento, pero con platos más resistentes", "Ambos iguales; solo cambia la capacidad máxima"], answer: 0, explain: "SSD usa memoria flash; HDD platos magnéticos." },
      { id: "hw04", level: 1, type: "identify", q: "Conector de video digital común en monitores modernos:", options: ["HDMI / DisplayPort", "VGA / D-Sub 15", "Componente YPbPr / RCA", "S-Video (mini-DIN)"], answer: 0, explain: "HDMI y DP dominan; VGA es analógico legacy." },
      { id: "hw05", level: 1, type: "fill", q: "Sigla de la memoria de acceso aleatorio:", answer: "RAM", accept: ["RAM", "ram"], explain: "Random Access Memory." },
      { id: "hw06", level: 1, type: "mc", q: "La PSU (fuente) proporciona…", options: ["Energía eléctrica convertida a las tensiones del PC", "Energía de respaldo con batería durante los cortes", "La señal de reloj que usan la CPU y la memoria RAM", "Refrigeración directa al procesador con su ventilador"], answer: 0, explain: "Elige wattage y certificaciones adecuadas." },
      { id: "hw07", level: 1, type: "tf", q: "Antes de tocar componentes, conviene descargar electricidad estática (ESD).", answer: true, explain: "Pulsera/antistática y tocar chasis metálico ayudan." },
      { id: "hw08", level: 1, type: "scenario", q: "PC no da imagen pero ventiladores giran. Chequeo básico:", options: ["Probar otro cable/monitor, RAM reseateada, GPU", "Reinstalar Windows desde un USB de instalación", "Actualizar el driver de video desde Windows", "Desfragmentar el disco y liberar espacio"], answer: 0, explain: "Descarta display y memoria/GPU primero." },
      { id: "hw09", level: 1, type: "mc", q: "USB-C puede transportar…", options: ["Datos y, según el dispositivo, también video y energía", "Solo datos a USB 2.0; nunca video ni carga de energía", "Solo carga de energía; los datos van por otro cable", "Solo video DisplayPort; requiere adaptador para datos"], answer: 0, explain: "No todos los USB-C son iguales (Alt Mode/PD)." },
      { id: "hw10", level: 1, type: "order", q: "Ordena ensamblado básico seguro:", items: ["Preparar mesa antiestática / desconectar corriente", "Instalar CPU en el socket (sin forzar pines)", "Instalar RAM/M.2 y luego pasta térmica + cooler", "Conectar cables PSU y probar POST"], answer: [0, 1, 2, 3], explain: "Sigue el manual del board; no fuerces pines. Pon RAM/M.2 antes del cooler si este tapa los slots." },
      { id: "hw11", level: 2, type: "mc", q: "UEFI es…", options: ["Firmware moderno que inicializa el hardware y arranca el SO", "Esquema de particiones que sustituye a MBR en discos grandes", "Sistema de archivos moderno que reemplaza a FAT32 en discos", "Chip de seguridad que guarda las claves de cifrado (TPM)"], answer: 0, explain: "Ofrece GUI, Secure Boot, GPT, etc." },
      { id: "hw12", level: 2, type: "scenario", q: "PC pita en POST y no arranca. Los beeps suelen indicar…", options: ["Error de hardware según código del fabricante (a menudo RAM/GPU)", "Virus en el sector de arranque que bloquea el acceso al disco", "Sistema operativo dañado que requiere reinstalación completa", "Falta de conexión a Internet para validar la licencia"], answer: 0, explain: "Consulta la tabla de beep codes de la motherboard." },
      { id: "hw13", level: 2, type: "mc", q: "NVMe se conecta típicamente por…", options: ["Slot M.2 PCIe", "Puerto SATA III", "Conector IDE/PATA", "eSATA externo"], answer: 0, explain: "NVMe es mucho más rápido que SATA SSD en muchos casos." },
      { id: "hw14", level: 2, type: "tf", q: "Al mezclar módulos de RAM de distinta velocidad, todos funcionan a la velocidad del más rápido.", answer: false, explain: "Falso: normalmente todos bajan a la velocidad del más lento. Lo ideal es un kit de módulos iguales." },
      { id: "hw15", level: 2, type: "fill", q: "Sigla del firmware de arranque clásico anterior a UEFI:", answer: "BIOS", accept: ["BIOS", "bios"], explain: "Basic Input/Output System." },
      {
        id: "hw16",
        level: 2,
        type: "match",
        q: "Empareja puerto:",
        pairs: [
          { left: "RJ-45", right: "Red Ethernet" },
          { left: "SATA", right: "Discos HDD/SSD y unidades ópticas" },
          { left: "PCIe", right: "Slots de expansión (GPU, etc.)" },
          { left: "Socket CPU", right: "Encaje del procesador" }
        ],
        explain: "Identificar conectores evita daños."
      },
      { id: "hw17", level: 2, type: "scenario", q: "Fuente con olor a quemado y PC muerto. Acción:", options: ["No encender; reemplazar PSU y revisar daños", "Seguir encendiéndolo hasta que arranque de nuevo", "Actualizar la BIOS para que reconozca la fuente", "Rociar la fuente con aire comprimido y reintentar"], answer: 0, explain: "Una PSU fallida puede dañar otros componentes." },
      { id: "hw18", level: 2, type: "mc", q: "Thermal paste se usa entre…", options: ["CPU (IHS) y el disipador", "Disipador y su ventilador", "Módulo RAM y su ranura DIMM", "Fuente (PSU) y el chasis"], answer: 0, explain: "Mejora transferencia térmica; cantidad correcta importa." },
      { id: "hw19", level: 2, type: "order", q: "Ordena upgrade de RAM en laptop (genérico):", items: ["Apagar y retirar batería si es posible", "Abrir tapa de servicio", "Insertar SODIMM en ángulo/presión según diseño", "Encender y verificar en el SO"], answer: [0, 1, 2, 3], explain: "Consulta el manual: algunas RAM van soldadas." },
      { id: "hw20", level: 2, type: "tf", q: "Secure Boot ayuda a impedir bootloaders no firmados.", answer: true, explain: "Parte de la cadena de confianza UEFI." },
      { id: "hw21", level: 3, type: "mc", q: "Una PSU 80 Plus Bronze/Gold indica…", options: ["Eficiencia energética certificada bajo cargas dadas", "Potencia máxima en vatios que entrega la fuente", "Nivel de ruido del ventilador de la fuente en dB", "Años de garantía que ofrece el fabricante de la PSU"], answer: 0, explain: "Más eficiencia = menos calor/consumo, no siempre más 'potencia pico mágica'." },
      { id: "hw22", level: 3, type: "scenario", q: "Servidor con ECC RAM reporta corrected errors crecientes. Implica:", options: ["Posible módulo/DIMM degradándose; planear reemplazo", "Funcionamiento normal; ECC los corrige y no hace falta nada", "Fallo del disco duro; hay que reconstruir el RAID", "Virus en memoria; reinstalar el sistema operativo"], answer: 0, explain: "ECC corrige esos errores, pero si van en aumento, el DIMM probablemente se está degradando y conviene planear su reemplazo." },
      { id: "hw23", level: 3, type: "mc", q: "El chipset/VRM sobrecalentado puede causar…", options: ["Inestabilidad, throttling o apagados", "Más rendimiento por mayor frecuencia de la CPU", "Pérdida de la configuración IP de la red", "Borrado de la clave de licencia de Windows"], answer: 0, explain: "Buena refrigeración y pasta/pads importan en boards exigentes." },
      { id: "hw24", level: 3, type: "fill", q: "Protocolo diseñado para SSD flash que corre sobre PCIe en slots M.2 (sigla de 4 letras):", answer: "NVMe", accept: ["NVMe", "nvme", "NVM Express"], explain: "NVM Express: protocolo para flash sobre el bus PCIe (un slot M.2 también puede ser SATA)." },
      {
        id: "hw25",
        level: 3,
        type: "match",
        q: "Empareja síntoma-causa frecuente:",
        pairs: [
          { left: "No POST / beeps", right: "RAM/CPU/GPU mal asentados" },
          { left: "Se apaga bajo carga", right: "PSU insuficiente/falla" },
          { left: "BSOD memoria", right: "RAM defectuosa/XMP inestable" },
          { left: "No detecta el SSD nuevo", right: "Modo M.2/BIOS o slot deshabilitado" }
        ],
        explain: "Divide por etapa: POST vs OS vs carga."
      },
      { id: "hw26", level: 3, type: "order", q: "Ordena diagnóstico 'no enciende' (0 LEDs):", items: ["Verificar cable/corriente/switch PSU", "Probar contacto y cable conocidos buenos", "Puenteo de power switch / PSU tester", "Probar con PSU conocida buena o configuración mínima (CPU/RAM)"], answer: [0, 1, 2, 3], explain: "Descarta alimentación antes de condenar el board." },
      { id: "hw27", level: 3, type: "tf", q: "Si se va la luz durante una actualización de BIOS/UEFI, no pasa nada: se reanuda sola.", answer: false, explain: "Falso: interrumpir el flasheo puede dejar la placa inservible (brick). Hazlo con energía estable (UPS) y el archivo correcto para tu modelo; algunas placas tienen BIOS dual o recuperación." },
      { id: "hw28", level: 3, type: "scenario", q: "Tras agregar GPU potente, el PC reinicia al jugar. Causa probable:", options: ["PSU al límite / cables PCIe de potencia insuficientes", "Monitor con frecuencia de refresco incompatible", "Driver de audio HDMI desactualizado en Windows", "Poca memoria de vídeo para la resolución elegida"], answer: 0, explain: "Revisa wattage, rieles y conectores nativos (evitar daisy-chain dudoso)." },
      { id: "hw29", level: 3, type: "mc", q: "AHCI vs RAID en SATA (idea):", options: ["AHCI para discos individuales típicos; RAID según arreglo", "AHCI sirve solo para HDD y RAID solo para unidades SSD", "RAID es siempre más rápido; AHCI está obsoleto", "AHCI une varios discos en uno; RAID es para un solo disco"], answer: 0, explain: "Cambiar modo tras instalar el SO puede impedir el boot." },
      { id: "hw30", level: 3, type: "identify", q: "Herramienta para probar memoria RAM en Windows (incluida):", options: ["Diagnóstico de memoria de Windows / mdsched", "Monitor de recursos de Windows / resmon", "Comprobación de errores de disco / chkdsk", "Monitor de rendimiento / perfmon"], answer: 0, explain: "También MemTest86 en entornos más exhaustivos." }
    ],
    boss: [
      { id: "hwB1", level: 3, type: "scenario", q: "BOSS: Flota de laptops con hinchazón de batería. Acción correcta:", options: ["Retirar de servicio, no cargar, reemplazo seguro según política", "Seguir usándolas conectadas al cargador hasta que fallen", "Perforar la batería para liberar el gas acumulado en su interior", "Enfriarlas en el congelador y volver a cargarlas"], answer: 0, explain: "Riesgo de incendio: protocolo de baterías dañadas." },
      { id: "hwB2", level: 3, type: "mc", q: "BOSS: Servidor no arranca tras corte; PSU clickea. Siguiente:", options: ["Probar PSU conocida buena / rails; revisar shorts", "Reinstalar el sistema operativo desde la ISO", "Actualizar la BIOS por red antes de probar nada", "Cambiar la VLAN del puerto de gestión del servidor"], answer: 0, explain: "Click = protección PSU o cortocircuito." },
      { id: "hwB3", level: 3, type: "order", q: "BOSS: Upgrade de almacenamiento con clonación:", items: ["Imagen/clon del disco viejo al nuevo", "Verificar boot en firmware (orden NVMe/SATA)", "Tras arrancar desde el disco nuevo, confirmar datos y SMART", "Ya validado, retirar o reutilizar (borrar) el disco viejo"], answer: [0, 1, 2, 3], explain: "El orden de arranque en el firmware suele ser el paso que falta." },
      { id: "hwB4", level: 3, type: "tf", q: "BOSS: Mezclar conectores PCIe de potencia de baja calidad puede dañar la GPU.", answer: true, explain: "Usa cables del fabricante de la PSU / especificación adecuada." },
      { id: "hwB5", level: 3, type: "fill", q: "BOSS: Firmware de placa base moderno (sigla de 4 letras):", answer: "UEFI", accept: ["UEFI", "uefi"], explain: "Unified Extensible Firmware Interface." }
    ]
  });

  // Re-ensure levels after pads
  WORLDS.forEach((w) => ensureLevels(w.questions));

  // Helpers globales
  window.LEVEL_LABELS = LEVEL_LABELS;
  window.LEVELS_PER_WORLD = (typeof GAME_CONFIG !== "undefined" && GAME_CONFIG.levelsPerWorld) || 5;
  window.getQuestionsForLevel = function (worldId, level) {
    const w = getWorldById(worldId);
    if (!w) return [];
    return w.questions.filter((q) => (q.level || 1) === level);
  };
  window.countLevelsForWorld = function (worldId) {
    const w = getWorldById(worldId);
    const maxL = window.LEVELS_PER_WORLD || 5;
    const c = {};
    for (let i = 1; i <= maxL; i++) c[i] = 0;
    if (!w) return c;
    w.questions.forEach((q) => { const L = q.level || 1; c[L] = (c[L] || 0) + 1; });
    return c;
  };
})();
