/**
 * Tech Quest — Niveles 4–5 (Experto/Maestro) + mundos Cloud y Base de datos
 * Cargar después de levels-expand.js
 */
(function levels5Expand() {
  const maxL = (typeof GAME_CONFIG !== "undefined" && GAME_CONFIG.levelsPerWorld) || 5;

  function add(worldId, questions) {
    const w = getWorldById(worldId);
    if (!w) return;
    w.questions = w.questions.concat(questions);
  }

  function pushWorld(world) {
    if (getWorldById(world.id)) return;
    WORLDS.push(world);
  }

  // Actualizar etiquetas a 5 niveles
  window.LEVEL_LABELS = {
    1: { name: "Básico", icon: "1️⃣" },
    2: { name: "Intermedio", icon: "2️⃣" },
    3: { name: "Avanzado", icon: "3️⃣" },
    4: { name: "Experto", icon: "4️⃣" },
    5: { name: "Maestro", icon: "5️⃣" }
  };
  window.LEVELS_PER_WORLD = maxL;

  add("linux", [
  {
    "id": "lxL4a",
    "level": 4,
    "type": "mc",
    "q": "¿Qué hace 'nice -n 10 comando'?",
    "options": [
      "Ejecuta el comando con menor prioridad de CPU",
      "Ejecuta el comando con mayor prioridad de CPU",
      "Limita el comando a usar como máximo el 10% de CPU",
      "Ejecuta el comando en segundo plano tras 10 segundos"
    ],
    "answer": 0,
    "explain": "nice ajusta la prioridad; valores altos = menos prioridad."
  },
  {
    "id": "lxL4b",
    "level": 4,
    "type": "tf",
    "q": "En Debian/Ubuntu, 'journalctl -u ssh' muestra los registros del servicio SSH.",
    "answer": true,
    "explain": "journalctl consulta el journal; -u filtra por unidad (sin sufijo asume .service). Ojo: el nombre de la unidad varía entre distros: ssh.service en Debian/Ubuntu y sshd.service en RHEL/Fedora/Arch."
  },
  {
    "id": "lxL4c",
    "level": 4,
    "type": "fill",
    "q": "Comando para ver uso de disco por directorio (humano):",
    "answer": "du -h",
    "accept": [
      "du -h",
      "du -h .",
      "du -sh",
      "du -hs",
      "du -s -h",
      "du -h -s",
      "du -sh .",
      "du -sh *",
      "du -hs *",
      "du -sh ./*",
      "du -sh */",
      "du -h --max-depth=1",
      "du -h --max-depth 1",
      "du -h --max-depth=1 .",
      "du -h -d 1",
      "du -h -d1",
      "du -hd1",
      "du -hd 1",
      "du -h -d 1 ."
    ],
    "explain": "du resume uso de disco; -h legible, -s resumen."
  },
  {
    "id": "lxL4d",
    "level": 4,
    "type": "scenario",
    "q": "Disco al 100% en /. Mejor primer paso:",
    "options": [
      "Ver qué ocupa espacio y limpiar logs/tmp con cuidado",
      "Reiniciar el servidor para que se vacíe el disco solo",
      "Ejecutar fsck sobre / montado para recuperar bloques",
      "Borrar todo /var/lib para ganar espacio de inmediato"
    ],
    "answer": 0,
    "explain": "Mide antes de borrar; prioriza logs rotados y caches."
  },
  {
    "id": "lxL4e",
    "level": 4,
    "type": "mc",
    "q": "'setfacl' se usa para…",
    "options": [
      "Listas de control de acceso extendidas (ACL)",
      "Atributos inmutables de archivos (como chattr +i)",
      "Contextos de seguridad SELinux de los archivos",
      "Capacidades POSIX de binarios (como setcap)"
    ],
    "answer": 0,
    "explain": "Las ACL permiten permisos más granulares que ugo clásico."
  },
  {
    "id": "lxL4f",
    "level": 4,
    "type": "order",
    "q": "Ordena endurecer SSH básico:",
    "items": [
      "Generar un par de claves (ssh-keygen)",
      "Copiar la clave pública (ssh-copy-id) y probar login",
      "Desactivar password y root login; limitar AllowUsers",
      "Reiniciar sshd y probar en otra sesión"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Primero asegura y prueba el acceso por clave; solo entonces desactiva contraseñas/root en sshd_config. Nunca cortes tu única sesión sin probar en paralelo."
  },
  {
    "id": "lxL4g",
    "level": 4,
    "type": "match",
    "q": "Empareja el comando de Linux con su uso:",
    "pairs": [
      {
        "left": "crontab -e",
        "right": "Editar cron del usuario"
      },
      {
        "left": "systemctl enable",
        "right": "Arrancar servicio al boot"
      },
      {
        "left": "ulimit -n",
        "right": "Límite de file descriptors"
      },
      {
        "left": "strace",
        "right": "Rastrear syscalls de un proceso"
      }
    ],
    "explain": "Herramientas de ops Linux."
  },
  {
    "id": "lxL4h",
    "level": 4,
    "type": "tf",
    "q": "Un bind mount copia el contenido de un directorio a otra ruta.",
    "answer": false,
    "explain": "Falso: un bind mount no copia nada; muestra el mismo directorio en otra ruta, así que un cambio se ve en ambas. Útil en contenedores."
  },
  {
    "id": "lxL5a",
    "level": 5,
    "type": "mc",
    "q": "En cgroups v2, ¿qué controlas típicamente?",
    "options": [
      "Límites de CPU/memoria/IO por grupo de procesos",
      "Espacios de nombres de red y PID aislados por proceso",
      "Reglas de firewall de paquetes por grupo de usuarios",
      "Permisos de archivos para los grupos de /etc/group"
    ],
    "answer": 0,
    "explain": "cgroups aíslan recursos; base de contenedores."
  },
  {
    "id": "lxL5b",
    "level": 5,
    "type": "scenario",
    "q": "Kernel panic recurrente tras update. Acción seria:",
    "options": [
      "Boot a kernel anterior, revisar logs, revertir módulo/driver",
      "Poner kernel.panic=0 en sysctl para ignorar el panic",
      "Reinstalar GRUB en el disco y arrancar el mismo kernel",
      "Ampliar la swap y /boot para que el kernel no falle"
    ],
    "answer": 0,
    "explain": "Conserva kernels previos en GRUB."
  },
  {
    "id": "lxL5c",
    "level": 5,
    "type": "fill",
    "q": "Herramienta para inspeccionar tráfico en interfaz (clásica):",
    "answer": "tcpdump",
    "accept": [
      "tcpdump",
      "wireshark",
      "tshark",
      "sudo tcpdump"
    ],
    "explain": "tcpdump captura paquetes; requiere privilegios."
  },
  {
    "id": "lxL5d",
    "level": 5,
    "type": "mc",
    "q": "'chroot' sirve para…",
    "options": [
      "Cambiar la raíz aparente del proceso (jaula ligera)",
      "Ejecutar un comando con privilegios de root temporalmente",
      "Cambiar el propietario de archivos al usuario root",
      "Aislar por completo el proceso con namespaces y cgroups"
    ],
    "answer": 0,
    "explain": "Útil en recovery; no es sandbox completo como namespaces."
  },
  {
    "id": "lxL5e",
    "level": 5,
    "type": "identify",
    "q": "Archivo típico de configuración de red en Ubuntu moderno (Netplan):",
    "options": [
      "/etc/netplan/*.yaml",
      "/etc/printcap solo",
      "C:\\Windows",
      "hosts.deny únicamente"
    ],
    "answer": 0,
    "explain": "Netplan genera config para systemd-networkd o NetworkManager."
  },
  {
    "id": "lxL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena investigación de alto load average:",
    "items": [
      "uptime / top / htop (load y %wa)",
      "Identificar si es CPU o I/O wait",
      "Profundizar: iostat/iotop (I/O) o pidstat/perf (CPU)",
      "Aplicar fix (kill, tune, hardware)"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Load alto no siempre es CPU: mira %wa y procesos en estado D; según el caso, profundiza con la herramienta adecuada antes de actuar."
  },
  {
    "id": "lxL5g",
    "level": 5,
    "type": "tf",
    "q": "Si los permisos Unix (rwx) son correctos, AppArmor/SELinux nunca pueden denegar el acceso.",
    "answer": false,
    "explain": "Falso: SELinux/AppArmor (MAC) se evalúan además de los permisos Unix y pueden denegar aunque rwx lo permita. Revisa los logs AVC/denied."
  },
  {
    "id": "lxL5h",
    "level": 5,
    "type": "scenario",
    "q": "NFS mounts cuelgan el shell al listar. Sospecha:",
    "options": [
      "Servidor NFS/red caída y opciones hard sin timeout adecuado",
      "Mapeo de UID/GID incorrecto entre cliente y servidor",
      "Montaje con la opción ro (solo lectura) en fstab",
      "Falta de inodos libres en el sistema de archivos local"
    ],
    "answer": 0,
    "explain": "Con montajes hard, si el servidor NFS o la red caen, los procesos quedan en estado D reintentando sin fin. Revisa servidor, red y export. soft (con timeo/retrans) devuelve error en vez de colgar, pero puede corromper datos: úsalo solo para datos no críticos. intr se ignora desde el kernel 2.6.25; solo SIGKILL interrumpe."
  }
]);

  add("windows", [
  {
    "id": "wnL4a",
    "level": 4,
    "type": "mc",
    "q": "¿Qué es WinRM?",
    "options": [
      "Administración remota de Windows (WS-Management, transporte de PowerShell Remoting)",
      "Replicación de archivos entre controladores de dominio (DFS-R, sucesor de FRS)",
      "Escritorio remoto gráfico de Windows (sesiones RDP sobre el puerto TCP 3389)",
      "Gestión de derechos (Rights Management, cifrado de documentos con AD RMS)"
    ],
    "answer": 0,
    "explain": "WinRM (Windows Remote Management) implementa WS-Management y es la base de PowerShell Remoting (Enter-PSSession/Invoke-Command). Endurécelo: HTTPS 5986, firewall y cuentas limitadas."
  },
  {
    "id": "wnL4b",
    "level": 4,
    "type": "tf",
    "q": "'Get-WinEvent' consulta el Visor de eventos desde PowerShell.",
    "answer": true,
    "explain": "Más potente que Get-EventLog legacy."
  },
  {
    "id": "wnL4c",
    "level": 4,
    "type": "scenario",
    "q": "Perfil de usuario se corrompe (login con perfil temporal). Acción típica:",
    "options": [
      "Renombrar/backup del perfil viejo y recrear según procedimiento",
      "Borrar la base SAM para que el perfil se regenere solo",
      "Restablecer la pila TCP/IP con netsh int ip reset",
      "Quitar al usuario del grupo Administradores y reiniciar"
    ],
    "answer": 0,
    "explain": "Documenta SID y carpetas antes de tocar."
  },
  {
    "id": "wnL4d",
    "level": 4,
    "type": "fill",
    "q": "Comando para exportar a HTML el conjunto de directivas resultante (RSoP) al archivo report.html:",
    "answer": "gpresult /h report.html",
    "accept": [
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
    "explain": "gpresult /h <archivo>.html genera el informe RSoP en HTML (la opción /h exige nombre de archivo; /f sobrescribe si ya existe). gpresult /r da un resumen en consola; rsop.msc es la consola gráfica legacy. En PowerShell (módulo GroupPolicy/RSAT) el equivalente es Get-GPResultantSetOfPolicy -ReportType Html -Path report.html."
  },
  {
    "id": "wnL4e",
    "level": 4,
    "type": "mc",
    "q": "AppLocker / WDAC sirven para…",
    "options": [
      "Controlar qué ejecutables/scripts pueden correr",
      "Cifrar el disco completo con clave en el TPM",
      "Bloquear puertos de red entrantes por aplicación",
      "Bloquear la sesión del equipo tras un tiempo inactivo"
    ],
    "answer": 0,
    "explain": "Reduce malware y software no autorizado."
  },
  {
    "id": "wnL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja la consola de Windows (.msc) con su función:",
    "pairs": [
      {
        "left": "wf.msc",
        "right": "Firewall con seguridad avanzada"
      },
      {
        "left": "certmgr.msc",
        "right": "Certificados de usuario"
      },
      {
        "left": "gpedit.msc",
        "right": "Editor de directivas local"
      },
      {
        "left": "compmgmt.msc",
        "right": "Administración de equipos"
      }
    ],
    "explain": "MMC habituales."
  },
  {
    "id": "wnL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena troubleshooting de trust de dominio:",
    "items": [
      "Verificar DNS hacia el DC (el equipo localiza el DC del dominio)",
      "Con el DC localizado, comparar la hora (w32tm; Kerberos tolera ~5 min)",
      "Probar el canal seguro (nltest /sc_verify:<dominio> o Test-ComputerSecureChannel)",
      "Reparar/resetear la cuenta de máquina si el canal falla"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Primero localiza el DC (DNS) y valida la hora contra él; después prueba el canal seguro y, si falla, repáralo (Test-ComputerSecureChannel -Repair o netdom resetpwd)."
  },
  {
    "id": "wnL4h",
    "level": 4,
    "type": "tf",
    "q": "Hyper-V viene incluido en Windows 10/11 Home.",
    "answer": false,
    "explain": "Falso: Hyper-V requiere Windows Pro, Enterprise o Education y la virtualización habilitada en el firmware. Home no lo incluye."
  },
  {
    "id": "wnL5a",
    "level": 5,
    "type": "mc",
    "q": "Un Blue Screen con DRIVER_IRQL suele apuntar a…",
    "options": [
      "Driver en modo kernel fallando",
      "Aplicación de usuario sin responder",
      "Perfil de usuario dañado",
      "Certificado TLS caducado"
    ],
    "answer": 0,
    "explain": "Actualiza/rollback drivers; Memory Diagnostic también."
  },
  {
    "id": "wnL5b",
    "level": 5,
    "type": "scenario",
    "q": "Autenticación NTLM lateral se abusa en la red. Mitigación:",
    "options": [
      "Restringir NTLM, privilegiar Kerberos, LAPS, segmentar admin",
      "Usar la misma clave de admin local en todos los equipos",
      "Forzar NTLMv1 en todo el dominio y desactivar Kerberos",
      "Desactivar la auditoría de inicios de sesión"
    ],
    "answer": 0,
    "explain": "Tiering de administración reduce movimiento lateral."
  },
  {
    "id": "wnL5c",
    "level": 5,
    "type": "fill",
    "q": "Cmdlet para reiniciar un equipo remoto (uno común):",
    "answer": "Restart-Computer",
    "accept": ["Restart-Computer","restart-computer"],
    "explain": "Restart-Computer -ComputerName host"
  },
  {
    "id": "wnL5d",
    "level": 5,
    "type": "mc",
    "q": "Credential Guard protege…",
    "options": [
      "Secretos de autenticación aislándolos con VBS",
      "El arranque verificando la firma del bootloader",
      "Los datos del disco cifrándolos con el TPM",
      "La cola de impresión frente a drivers de terceros"
    ],
    "answer": 0,
    "explain": "Parte del stack de seguridad basado en virtualización."
  },
  {
    "id": "wnL5e",
    "level": 5,
    "type": "identify",
    "q": "Herramienta para capturar tráfico en Windows (Microsoft):",
    "options": [
      "netsh trace / Message Analyzer legacy / pktmon",
      "tracert / pathping / Test-NetConnection",
      "wevtutil / Get-WinEvent / Visor de eventos",
      "Monitor de rendimiento / Monitor de recursos / typeperf"
    ],
    "answer": 0,
    "explain": "pktmon es moderno en Windows 10+."
  },
  {
    "id": "wnL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena respuesta a ransomware en endpoint Windows:",
    "items": [
      "Aislar de la red",
      "Identificar alcance y muestras",
      "Restaurar desde backup limpio",
      "Lecciones + hardening"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "No pagues como primera opción automática."
  },
  {
    "id": "wnL5g",
    "level": 5,
    "type": "tf",
    "q": "Un GPO con WMI filter puede aplicar solo a ciertos OS/hardware.",
    "answer": true,
    "explain": "Útil para targeting fino."
  },
  {
    "id": "wnL5h",
    "level": 5,
    "type": "scenario",
    "q": "La impresión vía servidor falla solo en una OU. Sospecha:",
    "options": [
      "GPO de impresoras o permisos de cola en esa OU",
      "Tóner agotado en la impresora compartida",
      "Puerto 9100 bloqueado en el firewall de la impresora",
      "Spooler detenido en el servidor de impresión central"
    ],
    "answer": 0,
    "explain": "Revisa Point and Print / Deployed Printers."
  }
]);

  add("printers", [
  {
    "id": "prL4a",
    "level": 4,
    "type": "mc",
    "q": "Un print server centralizado típicamente…",
    "options": [
      "Hospeda colas compartidas y drivers para muchos clientes",
      "Solo imprime PDFs locales, sin compartir por la red",
      "Asigna las IPs de las impresoras en lugar del servidor DHCP",
      "Sustituye el firmware de cada impresora de la red"
    ],
    "answer": 0,
    "explain": "Reduce caos de drivers en cada PC."
  },
  {
    "id": "prL4b",
    "level": 4,
    "type": "tf",
    "q": "El puerto TCP 9100 (Raw/JetDirect) envía el trabajo casi directo al dispositivo.",
    "answer": true,
    "explain": "Simple y rápido; menos control que IPP en algunos escenarios."
  },
  {
    "id": "prL4c",
    "level": 4,
    "type": "scenario",
    "q": "Usuarios de VLAN de invitados no deben alcanzar impresoras corporativas. Control:",
    "options": [
      "ACL/firewall entre VLANs + no publicar colas allí",
      "Mover las impresoras a la VLAN de invitados con IP fija",
      "Abrir el puerto 445 entre VLANs para todos",
      "Ocultar el SSID de la red de invitados"
    ],
    "answer": 0,
    "explain": "Segmentación + least privilege."
  },
  {
    "id": "prL4d",
    "level": 4,
    "type": "fill",
    "q": "Protocolo moderno preferido de impresión en IP (sigla):",
    "answer": "IPP",
    "accept": [
      "IPP",
      "ipp",
      "IPPS",
      "IPP/IPPS",
      "IPP Everywhere",
      "Internet Printing Protocol"
    ],
    "explain": "Internet Printing Protocol (a menudo 631); IPPS es IPP sobre TLS."
  },
  {
    "id": "prL4e",
    "level": 4,
    "type": "mc",
    "q": "Branch Office Direct Printing (idea)…",
    "options": [
      "Evita que el trabajo dé la vuelta al data center; imprime más cerca",
      "Centraliza todos los trabajos en el data center para auditarlos",
      "Exige un print server físico dedicado en cada sucursal",
      "Elimina la necesidad de drivers en los clientes de la sucursal"
    ],
    "answer": 0,
    "explain": "Útil en WAN lentas con Windows print features."
  },
  {
    "id": "prL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja el término de impresión con su descripción:",
    "pairs": [
      {
        "left": "PCL",
        "right": "Lenguaje de control de impresora creado por HP"
      },
      {
        "left": "PostScript",
        "right": "Lenguaje de descripción de página Adobe"
      },
      {
        "left": "Driver Type 4",
        "right": "Modelo de controlador moderno de Windows (desde Windows 8)"
      },
      {
        "left": "Spooler",
        "right": "Servicio que gestiona la cola"
      }
    ],
    "explain": "Stack de impresión."
  },
  {
    "id": "prL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena desplegar cola en print server:",
    "items": [
      "Instalar driver firmado adecuado",
      "Crear impresora/cola y puerto",
      "Compartir y permisos",
      "Probar desde cliente y documentar"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Prueba con cuenta no-admin."
  },
  {
    "id": "prL4h",
    "level": 4,
    "type": "tf",
    "q": "Una impresora que aparece 'offline' en el cliente siempre está apagada.",
    "answer": false,
    "explain": "Falso: 'offline' en el cliente puede deberse al estado SNMP, a un puerto TCP/IP incorrecto, a fallos de red o a 'Usar impresora sin conexión' activado. Revisa eso antes de ir al equipo."
  },
  {
    "id": "prL4i",
    "level": 4,
    "type": "mc",
    "q": "¿Qué es un \"universal driver\" de impresora?",
    "options": [
      "Driver que cubre muchas series reduciendo paquetes",
      "Firmware único que se instala en impresoras de cualquier marca",
      "Driver genérico de Windows que solo imprime texto plano",
      "Protocolo que traduce PCL a PostScript en la red"
    ],
    "answer": 0,
    "explain": "Aún así valida modelos críticos."
  },
  {
    "id": "prL4j",
    "level": 4,
    "type": "scenario",
    "q": "Trabajos se quedan en \"Imprimiendo\" en el server pero la impresora no recibe. Chequeos:",
    "options": [
      "IP/puerto, red, cola pausada, driver caído, firewall 9100/IPP",
      "Nivel de tóner, contador del tambor y papel en la bandeja",
      "Licencias de Office, versión de Excel y fuentes instaladas",
      "Resolución DPI, perfil de color y orientación del papel"
    ],
    "answer": 0,
    "explain": "Divide cliente vs server vs dispositivo."
  },
  {
    "id": "prL5a",
    "level": 5,
    "type": "mc",
    "q": "PrintNightmare (idea general) explotaba…",
    "options": [
      "Fallos en el Spooler / Point and Print para ejecución remota",
      "Fallos en SMBv1 (EternalBlue) para propagarse como gusano",
      "Un desbordamiento en el firmware de la impresora vía puerto 9100",
      "Contraseñas por defecto del panel web de las impresoras"
    ],
    "answer": 0,
    "explain": "Parchea, restringe Point and Print, least privilege."
  },
  {
    "id": "prL5b",
    "level": 5,
    "type": "scenario",
    "q": "Empresa quiere pull-print / follow-me printing. Beneficio:",
    "options": [
      "Se libera en la impresora tras autenticarse; menos hojas olvidadas",
      "Imprime de inmediato en la impresora más cercana, sin autenticar",
      "Elimina la necesidad de drivers y de print server en la empresa",
      "Permite imprimir sin red usando USB en cada puesto"
    ],
    "answer": 0,
    "explain": "Mejora confidencialidad física."
  },
  {
    "id": "prL5c",
    "level": 5,
    "type": "fill",
    "q": "Puerto típico IPP/IPPS (número):",
    "answer": "631",
    "accept": ["631"],
    "explain": "IPP clásico usa 631; IPPS va sobre TLS."
  },
  {
    "id": "prL5d",
    "level": 5,
    "type": "mc",
    "q": "En un entorno con print server + clientes Windows, \"Package Point and Print\" ayuda a…",
    "options": [
      "Distribuir drivers empaquetados de forma más controlada",
      "Asignar automáticamente la IP de cada impresora del dominio",
      "Empaquetar trabajos de impresión para enviarlos comprimidos",
      "Desactivar el Spooler en clientes que no imprimen"
    ],
    "answer": 0,
    "explain": "Combínalo con políticas de seguridad actualizadas."
  },
  {
    "id": "prL5e",
    "level": 5,
    "type": "identify",
    "q": "Log útil en Windows cuando la cola falla:",
    "options": [
      "Event Viewer → Microsoft-Windows-PrintService",
      "Performance Monitor → % de tiempo de procesador",
      "Resource Monitor → pestaña Disco",
      "Disk Cleanup → Archivos temporales"
    ],
    "answer": 0,
    "explain": "Habilita log operacional de PrintService."
  },
  {
    "id": "prL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena migrar print server viejo a nuevo:",
    "items": [
      "Inventariar colas/puertos/drivers/permisos",
      "Montar drivers firmados en destino",
      "Recrear/exportar colas",
      "Cortar DNS/alias y validar clientes"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Mantén rollback (alias TTL bajo)."
  },
  {
    "id": "prL5g",
    "level": 5,
    "type": "tf",
    "q": "Una ACL en el switch que bloquee la impresión directa (RAW 9100, LPR 515, IPP 631, WSD) desde la VLAN de usuarios hacia las impresoras, y solo la permita desde el print server, puede forzar el uso del print server.",
    "answer": true,
    "explain": "Los clientes que imprimen directo usan RAW 9100, LPR 515, IPP 631 o WSD, no SMB (SMB es cliente → print server). Si solo el print server alcanza esos puertos, todo trabajo pasa por sus colas."
  },
  {
    "id": "prL5h",
    "level": 5,
    "type": "scenario",
    "q": "Impresora multifunción escanea a \\\\servidor\\share y falla tras endurecer SMB. Causa probable:",
    "options": [
      "SMBv1 deshabilitado / firma SMB / credenciales del dispositivo",
      "Puerto 9100 cerrado / tóner bajo / driver PCL del servidor",
      "Cola del Spooler pausada / driver PostScript en el server",
      "Tambor agotado / bandeja vacía / contador de páginas lleno"
    ],
    "answer": 0,
    "explain": "Usa SMBv2+ y cuenta de servicio con mínimo privilegio."
  },
  {
    "id": "prL5i",
    "level": 5,
    "type": "mc",
    "q": "QoS para impresión en WAN saturada…",
    "options": [
      "Puede priorizar o limitar tráfico de colas críticas",
      "Comprime los trabajos para que ocupen menos ancho de banda",
      "Cifra los trabajos de impresión que cruzan la WAN",
      "Aumenta el ancho de banda contratado del enlace WAN"
    ],
    "answer": 0,
    "explain": "No sustituye buen diseño de Branch printing."
  },
  {
    "id": "prL5j",
    "level": 5,
    "type": "match",
    "q": "Empareja fallo:",
    "pairs": [
      {
        "left": "Páginas en símbolo de basura",
        "right": "Driver/lenguaje incorrecto (PCL vs PS)"
      },
      {
        "left": "Atasco frecuente",
        "right": "Papel húmedo/rodillos"
      },
      {
        "left": "Color corrido",
        "right": "Calibración/belt/drum"
      },
      {
        "left": "No imprime de un app",
        "right": "Spool formato / aislamiento de driver"
      }
    ],
    "explain": "Diagnóstico por síntoma."
  }
]);

  add("networks", [
  {
    "id": "netL4a",
    "level": 4,
    "type": "mc",
    "q": "Una ACL extended en router típicamente filtra por…",
    "options": [
      "IPs, puertos y protocolo",
      "Solo la IP de origen",
      "Solo la MAC de origen",
      "Nombre NetBIOS del host"
    ],
    "answer": 0,
    "explain": "Controla tráfico L3/L4."
  },
  {
    "id": "netL4b",
    "level": 4,
    "type": "tf",
    "q": "QinQ (802.1ad) encapsula VLAN dentro de VLAN para proveedores.",
    "answer": true,
    "explain": "Útil en redes de carrier/metro."
  },
  {
    "id": "netL4c",
    "level": 4,
    "type": "scenario",
    "q": "Impresoras en VLAN 40; PCs en VLAN 20. ¿Qué permite imprimir?",
    "options": [
      "Enrutamiento inter-VLAN + ACL que permita puertos de impresión",
      "Desactivar Spanning Tree para que las tramas crucen VLANs",
      "Un servidor DHCP común que dé IPs a las dos VLANs a la vez",
      "Dar a las impresoras una IP de la VLAN 20 sin cambiar su VLAN"
    ],
    "answer": 0,
    "explain": "L3 + políticas."
  },
  {
    "id": "netL4d",
    "level": 4,
    "type": "fill",
    "q": "Protocolo para evitar bucles en switches L2 (sigla):",
    "answer": "STP",
    "accept": [
      "STP",
      "RSTP",
      "MSTP",
      "PVST",
      "PVST+",
      "RPVST",
      "RPVST+",
      "Rapid PVST",
      "Rapid PVST+",
      "Rapid-PVST",
      "Rapid-PVST+",
      "Spanning Tree",
      "Spanning Tree Protocol",
      "802.1D",
      "802.1w",
      "802.1s"
    ],
    "explain": "Spanning Tree Protocol (y variantes)."
  },
  {
    "id": "netL4e",
    "level": 4,
    "type": "mc",
    "q": "ECMP sirve para…",
    "options": [
      "Balancear rutas de igual costo",
      "Etiquetar tramas con el ID de VLAN",
      "Priorizar tráfico de voz",
      "Evitar bucles bloqueando puertos"
    ],
    "answer": 0,
    "explain": "Equal-Cost Multi-Path."
  },
  {
    "id": "netL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja el protocolo de red con su función:",
    "pairs": [
      {
        "left": "OSPF",
        "right": "IGP de estado de enlace"
      },
      {
        "left": "BGP",
        "right": "Enrutamiento entre AS"
      },
      {
        "left": "HSRP/VRRP",
        "right": "Gateway redundante"
      },
      {
        "left": "NAT",
        "right": "Traducción de direcciones"
      }
    ],
    "explain": "Routing core."
  },
  {
    "id": "netL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena diseñar Wi‑Fi empresarial básico:",
    "items": [
      "Site survey: cobertura y plan de canales",
      "Instalar APs donde indicó el survey (PoE + trunk de VLANs)",
      "Configurar y difundir el SSID WPA2/3-Enterprise (802.1X con RADIUS) en su VLAN",
      "Validar cobertura/roaming y monitorear RF; ajustar potencia/canales"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Planear → desplegar → configurar → operar. El survey evita canales solapados; 802.1X/RADIUS evita una PSK única compartida por todos."
  },
  {
    "id": "netL4h",
    "level": 4,
    "type": "tf",
    "q": "Un puerto SPAN/mirror bloquea el tráfico sospechoso como un IPS en línea.",
    "answer": false,
    "explain": "Falso: SPAN solo copia tráfico hacia un IDS o analizador; no está en línea y no bloquea nada. Cuida la sobresuscripción del puerto destino."
  },
  {
    "id": "netL4i",
    "level": 4,
    "type": "mc",
    "q": "DSCP/CoS se relacionan con…",
    "options": [
      "Marcado para QoS",
      "Asignación de IPs por DHCP",
      "Cifrado de tramas en Wi‑Fi",
      "Autenticación de puertos 802.1X"
    ],
    "answer": 0,
    "explain": "Prioriza voz/video vs best-effort."
  },
  {
    "id": "netL4j",
    "level": 4,
    "type": "scenario",
    "q": "Usuarios se quejan de lentitud solo a un print server remoto. Herramientas:",
    "options": [
      "iperf/mtr/latency, QoS, ver si el path WAN satura",
      "Desfragmentar los discos de los PCs de los usuarios",
      "Ampliar la RAM de los PCs cliente de la oficina",
      "Borrar la caché del navegador en cada equipo"
    ],
    "answer": 0,
    "explain": "Mide RTT/pérdida antes de culpar la app."
  },
  {
    "id": "netL5a",
    "level": 5,
    "type": "mc",
    "q": "Un ataque de VLAN hopping (idea) intenta…",
    "options": [
      "Alcanzar otra VLAN abusando trunking/doble tagging",
      "Desbordar la tabla CAM del switch con MACs falsas",
      "Suplantar la MAC del gateway con ARP falsos",
      "Agotar el pool DHCP con solicitudes masivas"
    ],
    "answer": 0,
    "explain": "Desactiva DTP innecesario; native VLAN careful."
  },
  {
    "id": "netL5b",
    "level": 5,
    "type": "scenario",
    "q": "BGP neighbor down intermitente. Chequeos:",
    "options": [
      "Logs, timers, MTU/MSS, filtros de prefijos, IPsec si aplica",
      "Reiniciar los PCs de los usuarios y vaciar su caché DNS",
      "Desactivar STP en todo el core a ciegas y esperar",
      "Renovar los leases DHCP de toda la red de usuarios"
    ],
    "answer": 0,
    "explain": "MTU mismatch es clásico con tunnels."
  },
  {
    "id": "netL5c",
    "level": 5,
    "type": "fill",
    "q": "Puerto TCP que usa BGP para establecer sesiones entre routers (número):",
    "answer": "179",
    "accept": [
      "179",
      "tcp 179",
      "tcp/179",
      "179/tcp"
    ],
    "explain": "BGP usa TCP 179. Si un firewall lo bloquea, la sesión con el vecino nunca pasa a Established."
  },
  {
    "id": "netL5d",
    "level": 5,
    "type": "mc",
    "q": "Anycast DNS significa…",
    "options": [
      "Misma IP anunciada desde múltiples sitios; ruteo lleva al más cercano",
      "Un paquete se envía a todos los hosts de la subred a la vez",
      "Un paquete se entrega a todos los miembros suscritos a un grupo",
      "Varios nombres de dominio apuntan a la IP de un solo servidor"
    ],
    "answer": 0,
    "explain": "Mejora resiliencia y latencia."
  },
  {
    "id": "netL5e",
    "level": 5,
    "type": "identify",
    "q": "Técnica para segmentar microservicios en DC (moderno):",
    "options": [
      "Microsegmentación / Zero Trust network policies",
      "Hubs 10BASE-T en cascada entre racks",
      "Una única VLAN plana compartida por todo el DC",
      "Token Ring con una MAU central por rack"
    ],
    "answer": 0,
    "explain": "Policies por identidad/workload."
  },
  {
    "id": "netL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena troubleshooting \"no ruta a impresora VLAN\":",
    "items": [
      "Verificar IP/máscara/gateway del cliente",
      "Ping al gateway del cliente",
      "Traceroute a la impresora para ver en qué salto se corta",
      "Donde se corta: revisar ACL/firewall inter-VLAN y ARP/MAC de la impresora"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Del cliente hacia afuera: configuración local → primer salto (gateway) → ruta completa → política (ACL) y L2 (ARP/MAC) en el punto donde se corta."
  },
  {
    "id": "netL5g",
    "level": 5,
    "type": "tf",
    "q": "BFD reemplaza al protocolo de enrutamiento y anuncia las rutas.",
    "answer": false,
    "explain": "Falso: BFD no anuncia rutas; solo detecta rápido los fallos de forwarding y avisa a OSPF/BGP para que reconverjan antes que con sus hellos."
  },
  {
    "id": "netL5h",
    "level": 5,
    "type": "scenario",
    "q": "Captura muestra TCP retransmissions altos al print server. Implica:",
    "options": [
      "Congestión/pérdida en el path; revisar WAN/QoS/buffers",
      "Que el driver PCL del cliente está mal instalado",
      "Que el servidor DNS tarda en responder a las consultas",
      "Que el certificado TLS del print server caducó"
    ],
    "answer": 0,
    "explain": "Retransmissions = red o endpoint saturado."
  },
  {
    "id": "netL5i",
    "level": 5,
    "type": "mc",
    "q": "VXLAN se usa para…",
    "options": [
      "Overlay L2 sobre L3 en data centers",
      "Cifrar enlaces WAN entre sucursales",
      "Agregar varios puertos en un enlace lógico",
      "Evitar bucles L2 bloqueando puertos"
    ],
    "answer": 0,
    "explain": "Extiende segmentos sobre underlay IP."
  },
  {
    "id": "netL5j",
    "level": 5,
    "type": "match",
    "q": "Empareja herramienta:",
    "pairs": [
      {
        "left": "Wireshark",
        "right": "Análisis de paquetes"
      },
      {
        "left": "Nmap",
        "right": "Escaneo de puertos/hosts"
      },
      {
        "left": "mtr",
        "right": "Ruta + pérdida continua"
      },
      {
        "left": "iperf3",
        "right": "Medir throughput"
      }
    ],
    "explain": "Toolkit de red."
  }
]);

  add("programming", [
  {
    "id": "pgL4a",
    "level": 4,
    "type": "mc",
    "q": "Big-O de buscar en hash map promedio:",
    "options": [
      "O(1) en promedio",
      "O(n!)",
      "O(n³) siempre",
      "O(log log log) fijo"
    ],
    "answer": 0,
    "explain": "Búsqueda en hash map: O(1) en promedio; con muchas colisiones el peor caso degrada a O(n). 'Amortizado' se usa para la inserción (por el redimensionamiento ocasional)."
  },
  {
    "id": "pgL4b",
    "level": 4,
    "type": "tf",
    "q": "Una race condition ocurre cuando el resultado depende del orden de hilos impredecible.",
    "answer": true,
    "explain": "Usa locks/atómicos/colas."
  },
  {
    "id": "pgL4c",
    "level": 4,
    "type": "scenario",
    "q": "API devuelve 500 intermitente. Primeros pasos:",
    "options": [
      "Logs, idempotencia, reintentos con backoff, métricas",
      "Devolver siempre 200 aunque falle, para ocultar el error",
      "Programar un reinicio del servidor cada hora y no investigar",
      "Borrar la caché del navegador de los usuarios"
    ],
    "answer": 0,
    "explain": "Observabilidad antes de adivinar."
  },
  {
    "id": "pgL4d",
    "level": 4,
    "type": "fill",
    "q": "Sistema de control de versiones más usado (nombre):",
    "answer": "git",
    "accept": ["git","Git"],
    "explain": "git init / clone / commit / push."
  },
  {
    "id": "pgL4e",
    "level": 4,
    "type": "mc",
    "q": "CI/CD significa…",
    "options": [
      "Integración y entrega/despliegue continuos",
      "Código Integrado y Compilación Distribuida",
      "Control de Incidencias y Cambios Documentados",
      "Compilación Incremental y Depuración Continua"
    ],
    "answer": 0,
    "explain": "Automatiza test y deploy."
  },
  {
    "id": "pgL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja el tipo de prueba o herramienta con su propósito:",
    "pairs": [
      {
        "left": "Unit test",
        "right": "Prueba de una función aislada"
      },
      {
        "left": "Integration",
        "right": "Varios componentes juntos"
      },
      {
        "left": "Mock",
        "right": "Doble de prueba"
      },
      {
        "left": "Lint",
        "right": "Análisis estático de estilo/bugs"
      }
    ],
    "explain": "Calidad de código."
  },
  {
    "id": "pgL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena el flujo de una feature en equipo:",
    "items": [
      "branch",
      "commits",
      "pull request/review",
      "merge a main"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Evita commits directo a main en equipo."
  },
  {
    "id": "pgL4h",
    "level": 4,
    "type": "tf",
    "q": "Escapar comillas a mano basta para evitar SQL injection; no hacen falta consultas parametrizadas.",
    "answer": false,
    "explain": "Falso: el escape manual falla con codificaciones y casos borde. La defensa correcta son las consultas parametrizadas (o un ORM usado con cuidado)."
  },
  {
    "id": "pgL5a",
    "level": 5,
    "type": "mc",
    "q": "Un memory leak en un servicio largo causa…",
    "options": [
      "Uso de RAM creciente hasta OOM/lentitud",
      "Fuga de datos personales a servidores externos",
      "Picos de CPU al arrancar que luego se estabilizan",
      "Disco lleno por logs que nunca se rotan"
    ],
    "answer": 0,
    "explain": "Profiling y liberar recursos."
  },
  {
    "id": "pgL5b",
    "level": 5,
    "type": "scenario",
    "q": "Debes versionar una API pública. Mejor práctica:",
    "options": [
      "Versionado (/v1) y compatibilidad hacia atrás",
      "Romper la API sin aviso y documentarlo después",
      "Usar la misma URL y cambiar el formato sin versión",
      "Reusar códigos de error con otro significado"
    ],
    "answer": 0,
    "explain": "Deprecation policy clara."
  },
  {
    "id": "pgL5c",
    "level": 5,
    "type": "fill",
    "q": "Formato de texto con pares clave-valor entre llaves { }, el más usado hoy en APIs REST (sigla):",
    "answer": "JSON",
    "accept": [
      "JSON",
      "json"
    ],
    "explain": "JSON = JavaScript Object Notation. XML también se usa (p. ej., SOAP), pero en APIs REST domina JSON."
  },
  {
    "id": "pgL5d",
    "level": 5,
    "type": "mc",
    "q": "Idempotencia en PUT/DELETE ayuda a…",
    "options": [
      "Reintentar sin duplicar efectos indeseados",
      "Cifrar la petición en tránsito",
      "Comprimir la respuesta para ahorrar ancho de banda",
      "Autenticar al cliente sin enviar credenciales"
    ],
    "answer": 0,
    "explain": "Clave en redes no confiables."
  },
  {
    "id": "pgL5e",
    "level": 5,
    "type": "identify",
    "q": "Patrón para desacoplar productores/consumidores:",
    "options": [
      "Cola de mensajes / broker (RabbitMQ, Kafka)",
      "Llamadas HTTP síncronas directas entre servicios",
      "Herencia de una clase base común a ambos",
      "Espera activa (busy-wait) sobre un flag"
    ],
    "answer": 0,
    "explain": "Mejora resiliencia."
  },
  {
    "id": "pgL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena el flujo de un code review útil:",
    "items": [
      "Autor abre PR con un diff pequeño y claro",
      "Esperar a que el CI esté en verde",
      "Revisor comenta diseño/riesgos (no solo estilo)",
      "Aprobar o pedir cambios"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Primero un PR pequeño y claro; el CI en verde filtra fallos automáticos antes de gastar tiempo humano; la revisión se centra en diseño/riesgos, no solo estilo, y termina en aprobar o pedir cambios."
  },
  {
    "id": "pgL5g",
    "level": 5,
    "type": "tf",
    "q": "En semantic versioning, un cambio incompatible (breaking change) se indica subiendo PATCH.",
    "answer": false,
    "explain": "Falso: en MAJOR.MINOR.PATCH un breaking change sube MAJOR (2.0.0); funciones compatibles suben MINOR y correcciones suben PATCH."
  },
  {
    "id": "pgL5h",
    "level": 5,
    "type": "scenario",
    "q": "Feature flag apagada en prod pero el bug sigue. Sospecha:",
    "options": [
      "Caché CDN/config no refrescada o flag mal cableada",
      "Que git blame atribuyó mal el autor del commit",
      "Que los tests unitarios no se ejecutaron en CI",
      "Que el certificado TLS del sitio caducó"
    ],
    "answer": 0,
    "explain": "Verifica evaluación real de la flag."
  }
]);

  add("support", [
  {
    "id": "suL4a",
    "level": 4,
    "type": "mc",
    "q": "Un runbook es…",
    "options": [
      "Procedimiento paso a paso para un incidente/cambio conocido",
      "Registro cronológico de todas las acciones durante un incidente",
      "Informe final que analiza la causa raíz tras un incidente",
      "Calendario de guardias del equipo de soporte"
    ],
    "answer": 0,
    "explain": "Reduce improvisación bajo presión."
  },
  {
    "id": "suL4b",
    "level": 4,
    "type": "tf",
    "q": "La matriz de escalamiento define cuándo y a quién subir un ticket.",
    "answer": true,
    "explain": "Incluye severidades y contactos."
  },
  {
    "id": "suL4c",
    "level": 4,
    "type": "scenario",
    "q": "VIP insiste en saltarse el proceso de change. Tú…",
    "options": [
      "Explicas riesgo, ofreces camino rápido formal, documentas",
      "Haces el cambio sin registro para no retrasar al VIP",
      "Le das permisos de admin para que lo haga él mismo",
      "Rechazas el cambio sin explicación y cierras el ticket"
    ],
    "answer": 0,
    "explain": "Protege al negocio y a ti."
  },
  {
    "id": "suL4d",
    "level": 4,
    "type": "fill",
    "q": "Sigla del acuerdo de nivel operacional entre equipos internos:",
    "answer": "OLA",
    "accept": ["OLA","ola"],
    "explain": "Operational Level Agreement."
  },
  {
    "id": "suL4e",
    "level": 4,
    "type": "mc",
    "q": "CSAT mide…",
    "options": [
      "Satisfacción del cliente post-atención",
      "Tiempo medio de resolución (MTTR)",
      "Porcentaje de tickets resueltos al primer contacto",
      "Cumplimiento de los SLA pactados por servicio"
    ],
    "answer": 0,
    "explain": "Encuestas cortas tras resolver."
  },
  {
    "id": "suL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja el término de soporte con su significado:",
    "pairs": [
      {
        "left": "P1",
        "right": "Crítico / negocio parado"
      },
      {
        "left": "P3",
        "right": "Impacto medio/bajo típico"
      },
      {
        "left": "RCA",
        "right": "Análisis de causa raíz"
      },
      {
        "left": "CAB",
        "right": "Comité de cambios"
      }
    ],
    "explain": "Vocabulario de servicio."
  },
  {
    "id": "suL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena tomar un ticket nuevo:",
    "items": [
      "Clasificar impacto/urgencia",
      "Diagnosticar con preguntas",
      "Aplicar fix/workaround",
      "Documentar y cerrar con confirmación"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Cierre prematuro genera reopens."
  },
  {
    "id": "suL4h",
    "level": 4,
    "type": "tf",
    "q": "En un major incident conviene que cada equipo coordine en su propio chat, sin un facilitador.",
    "answer": false,
    "explain": "Falso: un bridge de major incident necesita un facilitador (incident commander) y un canal único de verdad; diez chats en paralelo generan ruido y contradicciones."
  },
  {
    "id": "suL5a",
    "level": 5,
    "type": "mc",
    "q": "Shift-left en soporte significa…",
    "options": [
      "Empoderar N1/self-service/KB para resolver antes",
      "Escalar todos los tickets a N3 para resolverlos antes",
      "Pasar la carga de N1 a proveedores externos (outsourcing)",
      "Recortar el horario del service desk"
    ],
    "answer": 0,
    "explain": "Mejor experiencia y menor costo."
  },
  {
    "id": "suL5b",
    "level": 5,
    "type": "scenario",
    "q": "Métricas muestran MTTR alto y FCR bajo. Interpreta:",
    "options": [
      "Se reabre mucho / poca resolución real en primer contacto",
      "Casi todo se resuelve en la primera llamada, sin escalar",
      "Los SLA se cumplen holgadamente en todos los niveles",
      "Hay muchos tickets nuevos, pero se cierran enseguida"
    ],
    "answer": 0,
    "explain": "FCR (first contact resolution) bajo = muchos tickets requieren escalar o recontactar/reabrir, lo que alarga el MTTR."
  },
  {
    "id": "suL5c",
    "level": 5,
    "type": "fill",
    "q": "Sigla de tiempo medio de reparación/resolución:",
    "answer": "MTTR",
    "accept": ["MTTR","mttr"],
    "explain": "Mean Time To Repair/Restore/Resolve según contexto."
  },
  {
    "id": "suL5d",
    "level": 5,
    "type": "mc",
    "q": "Un post-mortem blameless busca…",
    "options": [
      "Aprender de fallas sin castigar personas",
      "Identificar al responsable para aplicar una sanción",
      "Cerrar el incidente rápido sin analizar la causa",
      "Ocultar el incidente a la dirección"
    ],
    "answer": 0,
    "explain": "Mejora sistemas y procesos."
  },
  {
    "id": "suL5e",
    "level": 5,
    "type": "identify",
    "q": "Canal preferido para anunciar outage masivo a usuarios:",
    "options": [
      "Status page / correo oficial / banner acordado",
      "Mensajes privados a cada usuario que abra ticket",
      "Publicación en redes sociales personales del técnico",
      "Respuestas individuales en cada ticket duplicado"
    ],
    "answer": 0,
    "explain": "Un mensaje consistente."
  },
  {
    "id": "suL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena mejora continua del service desk:",
    "items": [
      "Medir (CSAT/MTTR/FCR)",
      "Identificar cuellos",
      "Actualizar KB/automatizar",
      "Reentrenar y repetir"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Sin datos, solo opiniones."
  },
  {
    "id": "suL5g",
    "level": 5,
    "type": "tf",
    "q": "Cerrar un ticket sin confirmar con el usuario que quedó resuelto es buena práctica para cumplir el SLA.",
    "answer": false,
    "explain": "Falso: cerrar sin confirmar genera reaperturas y mala experiencia. Confirma la solución (o aplica la política de cierre automático tras avisar) y documenta."
  },
  {
    "id": "suL5h",
    "level": 5,
    "type": "scenario",
    "q": "Proveedor SaaS caído; usuarios culpan a TI interna. Comunicación:",
    "options": [
      "Status claro, ETA si hay, workarounds, updates periódicos",
      "No comunicar nada hasta que el proveedor lo resuelva",
      "Culpar públicamente al proveedor y cerrar los tickets",
      "Prometer una ETA fija aunque el proveedor no la dé"
    ],
    "answer": 0,
    "explain": "Transparencia reduce tickets duplicados."
  }
]);

  add("security", [
  {
    "id": "secL4a",
    "level": 4,
    "type": "mc",
    "q": "Un SOC típicamente…",
    "options": [
      "Monitorea alertas de seguridad y coordina respuesta",
      "Gestiona las altas de usuarios y el inventario de equipos",
      "Desarrolla y despliega las aplicaciones internas",
      "Administra el cableado y los switches del edificio"
    ],
    "answer": 0,
    "explain": "Security Operations Center."
  },
  {
    "id": "secL4b",
    "level": 4,
    "type": "tf",
    "q": "El principle of least privilege aplica también a tokens OAuth y service accounts.",
    "answer": true,
    "explain": "Scopes mínimos y rotación."
  },
  {
    "id": "secL4c",
    "level": 4,
    "type": "scenario",
    "q": "Empleado reporta USB \"de RH\" en el baño. Acción:",
    "options": [
      "No conectar; reportar a seguridad física/TI",
      "Abrirlo en tu equipo con el antivirus actualizado",
      "Conectarlo en un PC de RH, ya que parece suyo",
      "Formatearlo en tu PC y reutilizarlo"
    ],
    "answer": 0,
    "explain": "USB baiting."
  },
  {
    "id": "secL4d",
    "level": 4,
    "type": "fill",
    "q": "Sigla de gestión de identidad y acceso:",
    "answer": "IAM",
    "accept": ["IAM","iam"],
    "explain": "Identity and Access Management."
  },
  {
    "id": "secL4e",
    "level": 4,
    "type": "mc",
    "q": "SPF/DKIM/DMARC ayudan a…",
    "options": [
      "Autenticar correo y reducir spoofing de dominio",
      "Cifrar el contenido del correo de extremo a extremo",
      "Filtrar adjuntos con malware antes de entregarlos",
      "Acelerar la entrega de correo"
    ],
    "answer": 0,
    "explain": "Endurece el email del dominio."
  },
  {
    "id": "secL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja la herramienta de seguridad con su función:",
    "pairs": [
      {
        "left": "SIEM",
        "right": "Correlación de logs/alertas"
      },
      {
        "left": "EDR",
        "right": "Detección en endpoints"
      },
      {
        "left": "WAF",
        "right": "Protección apps web"
      },
      {
        "left": "VPN",
        "right": "Túnel cifrado remoto"
      }
    ],
    "explain": "Controles."
  },
  {
    "id": "secL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena endurecer cuenta cloud admin:",
    "items": [
      "Password manager + única",
      "MFA fuerte (FIDO2)",
      "PIM/JIT privilegios",
      "Alertas y revisión de logs"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Admin always-on es riesgo."
  },
  {
    "id": "secL4h",
    "level": 4,
    "type": "tf",
    "q": "Un CASB sirve para cifrar los discos de los portátiles.",
    "answer": false,
    "explain": "Falso: un CASB (Cloud Access Security Broker) da visibilidad y control sobre el uso de SaaS (shadow IT, DLP). El cifrado de discos es BitLocker o FileVault."
  },
  {
    "id": "secL5a",
    "level": 5,
    "type": "mc",
    "q": "Un ataque a la cadena de suministro (supply-chain attack) compromete…",
    "options": [
      "Dependencias/proveedores para llegar a ti",
      "Tu contraseña probando combinaciones por fuerza bruta",
      "Tu sesión interceptando el tráfico de un Wi‑Fi público",
      "Tu equipo mediante un USB abandonado"
    ],
    "answer": 0,
    "explain": "Verifica firmas y SBOMs."
  },
  {
    "id": "secL5b",
    "level": 5,
    "type": "scenario",
    "q": "Detectas Cobalt Strike beacon. Contención:",
    "options": [
      "Aislar host, reset credenciales, cazar lateral movement",
      "Borrar el binario del beacon y dar el incidente por cerrado",
      "Reiniciar el host y seguir operando con normalidad",
      "Pasar un antivirus completo y esperar su resultado"
    ],
    "answer": 0,
    "explain": "Preserva la evidencia volátil (RAM, conexiones) si forense lo pide: reiniciar el host la destruye."
  },
  {
    "id": "secL5c",
    "level": 5,
    "type": "fill",
    "q": "Sigla de análisis de comportamiento de usuarios/entidades:",
    "answer": "UEBA",
    "accept": ["UEBA","ueba"],
    "explain": "User and Entity Behavior Analytics."
  },
  {
    "id": "secL5d",
    "level": 5,
    "type": "mc",
    "q": "Certificate pinning en apps móviles busca…",
    "options": [
      "Mitigar MITM con CAs no esperadas",
      "Cifrar los datos guardados en el teléfono",
      "Renovar certificados sin publicar otra versión",
      "Acelerar DNS con resolución local"
    ],
    "answer": 0,
    "explain": "Tiene trade-offs de rotación."
  },
  {
    "id": "secL5e",
    "level": 5,
    "type": "identify",
    "q": "Estándar de cifrado de discos en Windows empresarial común:",
    "options": [
      "BitLocker",
      "Notepad",
      "Paint",
      "Solitaire"
    ],
    "answer": 0,
    "explain": "Con TPM + escrow de claves."
  },
  {
    "id": "secL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena tabletop de ransomware:",
    "items": [
      "Definir escenario",
      "Roles y comunicaciones",
      "Decidir aislamiento/restore",
      "Documentar gaps"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Ensayar antes del incidente real."
  },
  {
    "id": "secL5g",
    "level": 5,
    "type": "tf",
    "q": "Exponer Elasticsearch/Redis sin auth a Internet es una mala práctica grave.",
    "answer": true,
    "explain": "Muchas brechas empiezan así."
  },
  {
    "id": "secL5h",
    "level": 5,
    "type": "scenario",
    "q": "Phishing captura session cookie. Mitigación moderna:",
    "options": [
      "Tokens de corta vida, binding, logout global, MFA step-up",
      "Alargar la vida de la cookie para evitar nuevos logins",
      "Mover el token de sesión de la cookie a localStorage",
      "Quitar HttpOnly para vigilar la cookie desde JavaScript"
    ],
    "answer": 0,
    "explain": "Session theft es real."
  }
]);

  add("hardware", [
  {
    "id": "hwL4a",
    "level": 4,
    "type": "mc",
    "q": "IPMI/iLO/iDRAC permiten…",
    "options": [
      "Gestionar servidor out-of-band (consola remota, sensores)",
      "Balancear carga entre los servidores web del clúster",
      "Virtualizar el servidor en varias máquinas invitadas",
      "Cifrar los discos del servidor con claves del TPM"
    ],
    "answer": 0,
    "explain": "Red de management separada."
  },
  {
    "id": "hwL4b",
    "level": 4,
    "type": "tf",
    "q": "RAID 5 tolera la falla de dos discos a la vez.",
    "answer": false,
    "explain": "Falso: RAID 5 tolera un disco y RAID 6 tolera dos. Si falla un segundo disco durante el rebuild de un RAID 5, se pierde el arreglo."
  },
  {
    "id": "hwL4c",
    "level": 4,
    "type": "scenario",
    "q": "Servidor reporta PSU redundancy lost. Acción:",
    "options": [
      "Reemplazar PSU fallida; verificar cableado y carga",
      "Ignorarlo: con una sola PSU funciona sin riesgo",
      "Apagar el servidor y reinstalar el sistema operativo",
      "Retirar discos para bajar el consumo de energía"
    ],
    "answer": 0,
    "explain": "Redundancia N+1 existe para usarse."
  },
  {
    "id": "hwL4d",
    "level": 4,
    "type": "fill",
    "q": "Bus de expansión dominante para GPUs (sigla):",
    "answer": "PCIe",
    "accept": ["PCIe","PCI-E","pci-e"],
    "explain": "Peripheral Component Interconnect Express."
  },
  {
    "id": "hwL4e",
    "level": 4,
    "type": "mc",
    "q": "ECC RAM detecta/corrige…",
    "options": [
      "Errores de memoria de bits",
      "Sectores defectuosos del disco duro",
      "Errores de transmisión en la red Ethernet",
      "Fallos de temperatura del procesador"
    ],
    "answer": 0,
    "explain": "Estándar en servers."
  },
  {
    "id": "hwL4f",
    "level": 4,
    "type": "match",
    "q": "Empareja el término de almacenamiento o memoria con su descripción:",
    "pairs": [
      {
        "left": "SAS",
        "right": "Disco enterprise dual-port típico"
      },
      {
        "left": "SATA",
        "right": "Interfaz disco común consumer/server"
      },
      {
        "left": "M.2",
        "right": "Factor de forma (NVMe/SATA)"
      },
      {
        "left": "RDIMM",
        "right": "DIMM registrado para servers"
      }
    ],
    "explain": "Almacenamiento/memoria."
  },
  {
    "id": "hwL4g",
    "level": 4,
    "type": "order",
    "q": "Ordena RMA de disco en RAID:",
    "items": [
      "Identificar disco fallido (beacon)",
      "Con el disco ya localizado, confirmar backup y estado del array antes de extraerlo",
      "Sustituir el disco fallido por uno compatible",
      "Monitorear rebuild"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "No saques el disco equivocado."
  },
  {
    "id": "hwL4h",
    "level": 4,
    "type": "tf",
    "q": "Undervolting cuidadoso puede bajar temperatura; overclock inestable causa crashes.",
    "answer": true,
    "explain": "En enterprise suele preferirse stock + buen cooling."
  },
  {
    "id": "hwL5a",
    "level": 5,
    "type": "mc",
    "q": "Un U.2/U.3 NVMe en server se usa para…",
    "options": [
      "Almacenamiento rápido hot-swap en bahías",
      "Conectar tarjetas de red de 100 GbE al servidor",
      "Refrigerar la CPU con un circuito líquido cerrado",
      "Gestionar el servidor por consola remota fuera de banda"
    ],
    "answer": 0,
    "explain": "Alternativa a muchos M.2 internos."
  },
  {
    "id": "hwL5b",
    "level": 5,
    "type": "scenario",
    "q": "POST pasa pero no hay video en iGPU tras meter GPU. Chequeos:",
    "options": [
      "Cable al GPU correcto, PSU PCIe, monitor input, reseat",
      "Reinstalar Windows antes de revisar cualquier cable",
      "Borrar la caché DNS y renovar la IP del equipo",
      "Cambiar la pasta térmica de la CPU y su disipador"
    ],
    "answer": 0,
    "explain": "Muchas boards desactivan salida onboard."
  },
  {
    "id": "hwL5c",
    "level": 5,
    "type": "fill",
    "q": "Interfaz de gestión remota Dell common (sigla 5 letras):",
    "answer": "iDRAC",
    "accept": ["iDRAC","idrac"],
    "explain": "Integrated Dell Remote Access Controller."
  },
  {
    "id": "hwL5d",
    "level": 5,
    "type": "mc",
    "q": "CXL (idea emergente) busca…",
    "options": [
      "Mejorar coherencia/expansión de memoria entre dispositivos",
      "Sustituir a Ethernet como red entre los centros de datos",
      "Reemplazar SATA como interfaz de discos mecánicos",
      "Estandarizar conectores de alimentación de las GPU"
    ],
    "answer": 0,
    "explain": "Tendencia en data centers modernos."
  },
  {
    "id": "hwL5e",
    "level": 5,
    "type": "identify",
    "q": "Conector de alimentación CPU común de 8 pines:",
    "options": [
      "EPS 8-pin (ATX12V)",
      "PCIe 8-pin (6+2)",
      "ATX 24-pin principal",
      "SATA de 15 pines"
    ],
    "answer": 0,
    "explain": "No confundir con PCIe 8-pin de GPU."
  },
  {
    "id": "hwL5f",
    "level": 5,
    "type": "order",
    "q": "Ordena diagnóstico memoria ECC con correctables altos:",
    "items": [
      "Revisar logs BMC/OS",
      "Reseat/limpiar slots",
      "Probar módulo en otro slot",
      "Reemplazar DIMM"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "explain": "Aísla slot vs módulo."
  },
  {
    "id": "hwL5g",
    "level": 5,
    "type": "tf",
    "q": "Mezclar firmware de backplane incorrecto puede hacer desaparecer discos.",
    "answer": true,
    "explain": "Sigue matriz de compatibilidad del vendor."
  },
  {
    "id": "hwL5h",
    "level": 5,
    "type": "scenario",
    "q": "Cluster pierde quorum tras un nodo. Diseño adecuado incluye…",
    "options": [
      "Quorum/witness y fencing correctos",
      "Un número par de nodos sin testigo",
      "Desactivar el heartbeat entre nodos",
      "Un solo switch sin redundancia"
    ],
    "answer": 0,
    "explain": "Evita split-brain."
  }
]);

  pushWorld({
  "id": "cloud",
  "name": "Cloud / servicios",
  "icon": "☁️",
  "color": "#7ec8ff",
  "description": "Nube, SaaS/IaaS/PaaS, almacenamiento, backups y sync.",
  "questions": [
    {
      "id": "cl01",
      "level": 1,
      "type": "mc",
      "q": "La \"nube\" en IT suele significar…",
      "options": [
        "Servicios bajo demanda por Internet (cómputo/almacenamiento/apps)",
        "Servidores propios en tu oficina, mantenidos por tu equipo",
        "Una red local (LAN) para compartir archivos en la oficina",
        "Discos externos USB que se sincronizan entre equipos"
      ],
      "answer": 0,
      "explain": "Pay-as-you-go y elasticidad."
    },
    {
      "id": "cl02",
      "level": 1,
      "type": "tf",
      "q": "SaaS es software que usas vía web sin instalar el servidor tú mismo.",
      "answer": true,
      "explain": "Ej: correo, CRM, oficina online."
    },
    {
      "id": "cl03",
      "level": 1,
      "type": "mc",
      "q": "IaaS te ofrece principalmente…",
      "options": [
        "Infraestructura virtual (VMs, redes, discos)",
        "Una app terminada que solo usas desde el navegador",
        "Un runtime gestionado donde solo subes tu código",
        "Funciones que corren por evento sin gestionar servidores"
      ],
      "answer": 0,
      "explain": "Tú administras más la stack."
    },
    {
      "id": "cl04",
      "level": 1,
      "type": "fill",
      "q": "Sigla de software como servicio:",
      "answer": "SaaS",
      "accept": ["SaaS","saas"],
      "explain": "Software as a Service."
    },
    {
      "id": "cl05",
      "level": 1,
      "type": "identify",
      "q": "Ejemplo típico de PaaS:",
      "options": [
        "Plataforma para desplegar apps sin gestionar todo el OS",
        "VMs donde tú instalas, parchas y administras el sistema operativo",
        "Un correo web listo para usar, sin desplegar código propio",
        "Servidores físicos dedicados que rentas por mes"
      ],
      "answer": 0,
      "explain": "Platform as a Service."
    },
    {
      "id": "cl06",
      "level": 1,
      "type": "scenario",
      "q": "Necesitas editar docs con el equipo en tiempo real. Suele ser:",
      "options": [
        "SaaS de documentos / colaboración",
        "Un servidor FTP compartido en la oficina",
        "Correo con adjuntos que se reenvían",
        "Una carpeta de red mapeada (SMB)"
      ],
      "answer": 0,
      "explain": "Colaboración cloud."
    },
    {
      "id": "cl07",
      "level": 1,
      "type": "mc",
      "q": "Un beneficio común de la nube es…",
      "options": [
        "Escalar recursos según demanda",
        "Que funciona sin conexión a Internet",
        "Que la seguridad es solo del proveedor",
        "Que ya no hacen falta backups"
      ],
      "answer": 0,
      "explain": "Elasticidad: escalas según la demanda. Aún pagas, aseguras tus datos y haces backups."
    },
    {
      "id": "cl08",
      "level": 1,
      "type": "tf",
      "q": "En la nube el proveedor se encarga de todo, así que ya no necesitas contraseñas fuertes ni MFA.",
      "answer": false,
      "explain": "Falso: con la responsabilidad compartida, las identidades y los accesos siguen siendo tuyos. Usa contraseñas fuertes y MFA."
    },
    {
      "id": "cl09",
      "level": 2,
      "type": "mc",
      "q": "El modelo de responsabilidad compartida indica…",
      "options": [
        "El proveedor asegura la nube; tú, lo que pones en ella",
        "El proveedor responde por todo, incluidos tus datos y cuentas",
        "Tú aseguras todo, incluido el hardware físico del datacenter",
        "Cada cliente audita físicamente el datacenter del proveedor"
      ],
      "answer": 0,
      "explain": "Varía entre IaaS/PaaS/SaaS."
    },
    {
      "id": "cl10",
      "level": 2,
      "type": "tf",
      "q": "Object storage (p.ej. S3-like) guarda objetos/archivos accesibles por API.",
      "answer": true,
      "explain": "Distinto de un disco de bloque de una VM."
    },
    {
      "id": "cl11",
      "level": 2,
      "type": "scenario",
      "q": "Laptop robada con sync de OneDrive/Drive. Riesgo mitigable con:",
      "options": [
        "MFA, borrado remoto, cifrado de disco, revisión de sesiones",
        "Desinstalar OneDrive del resto de laptops de la empresa",
        "Cambiar solo la contraseña del Wi‑Fi de la oficina",
        "Confiar en la contraseña de Windows para proteger el disco"
      ],
      "answer": 0,
      "explain": "Identidad + device control."
    },
    {
      "id": "cl12",
      "level": 2,
      "type": "fill",
      "q": "Sigla de infraestructura como servicio:",
      "answer": "IaaS",
      "accept": ["IaaS","iaas"],
      "explain": "Infrastructure as a Service."
    },
    {
      "id": "cl13",
      "level": 2,
      "type": "mc",
      "q": "Un snapshot/AMI típicamente sirve para…",
      "options": [
        "Capturar estado de disco/VM para backup o clon",
        "Balancear tráfico entre varias VMs de la misma zona",
        "Medir en tiempo real el uso de CPU de la instancia",
        "Cifrar el tráfico entre la VM y el usuario"
      ],
      "answer": 0,
      "explain": "No reemplaza estrategia de backup 3-2-1."
    },
    {
      "id": "cl14",
      "level": 2,
      "type": "match",
      "q": "Empareja el modelo de servicio cloud con lo que ofrece:",
      "pairs": [
        {
          "left": "SaaS",
          "right": "App completa gestionada"
        },
        {
          "left": "PaaS",
          "right": "Plataforma para tu código"
        },
        {
          "left": "IaaS",
          "right": "VMs/red/discos"
        },
        {
          "left": "FaaS/serverless",
          "right": "Ejecutar funciones a demanda"
        }
      ],
      "explain": "Modelos cloud."
    },
    {
      "id": "cl15",
      "level": 2,
      "type": "order",
      "q": "Ordena subir un archivo a object storage (idea):",
      "items": [
        "Autenticarte",
        "Crear/usar bucket",
        "Subir objeto con permisos mínimos",
        "Verificar acceso y cifrado"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Buckets públicos son un clásico incidente."
    },
    {
      "id": "cl16",
      "level": 2,
      "type": "tf",
      "q": "Regiones y zonas de disponibilidad mejoran resiliencia geográfica.",
      "answer": true,
      "explain": "Diseña multi-AZ para alta disponibilidad."
    },
    {
      "id": "cl17",
      "level": 3,
      "type": "mc",
      "q": "RPO se refiere a…",
      "options": [
        "Cuántos datos puedes permitirte perder (punto de recuperación)",
        "Cuánto tiempo puede tardar el servicio en volver a estar operativo",
        "Porcentaje de disponibilidad comprometido en el SLA",
        "Frecuencia con que se prueban los planes de recuperación"
      ],
      "answer": 0,
      "explain": "Recovery Point Objective."
    },
    {
      "id": "cl18",
      "level": 3,
      "type": "scenario",
      "q": "Backup solo en la misma región que prod. Riesgo:",
      "options": [
        "Desastre regional te deja sin copia",
        "Mayor costo por transferir datos entre regiones",
        "Restauraciones lentas por la latencia entre regiones",
        "Que los backups no se puedan cifrar en esa región"
      ],
      "answer": 0,
      "explain": "Copia offsite/otra región."
    },
    {
      "id": "cl19",
      "level": 3,
      "type": "fill",
      "q": "Sigla del objetivo de tiempo de recuperación:",
      "answer": "RTO",
      "accept": ["RTO","rto"],
      "explain": "Recovery Time Objective."
    },
    {
      "id": "cl20",
      "level": 3,
      "type": "mc",
      "q": "CDN sirve para…",
      "options": [
        "Acercar contenido estático a usuarios (caché perimetral)",
        "Reemplazar la base de datos transaccional (OLTP)",
        "Asignar IPs privadas RFC1918 a las VMs de la VPC",
        "Resolver nombres de dominio internos de la empresa"
      ],
      "answer": 0,
      "explain": "Mejora latencia y offload de origen."
    },
    {
      "id": "cl21",
      "level": 3,
      "type": "match",
      "q": "Empareja la estrategia de DR:",
      "pairs": [
        {
          "left": "Warm standby",
          "right": "Copia completa pero reducida, siempre activa"
        },
        {
          "left": "Pilot light",
          "right": "Core/datos replicados encendidos; app apagada"
        },
        {
          "left": "Multi-site active",
          "right": "Activo en varios sitios"
        },
        {
          "left": "Backup restore",
          "right": "Recuperar desde respaldos"
        }
      ],
      "explain": "DR de menor a mayor costo (y menor RTO): backup & restore < pilot light < warm standby < multi-site activo."
    },
    {
      "id": "cl22",
      "level": 3,
      "type": "order",
      "q": "Ordena prueba de restore:",
      "items": [
        "Elegir backup",
        "Restaurar a entorno aislado",
        "Validar integridad/app",
        "Documentar tiempo real (RTO)"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Backup no probado = esperanza."
    },
    {
      "id": "cl23",
      "level": 3,
      "type": "tf",
      "q": "Guardar access keys de larga vida en una VM es preferible a usar roles IAM.",
      "answer": false,
      "explain": "Falso: las keys de larga vida se filtran y no rotan solas. Usa roles de instancia o workload identity con privilegios mínimos."
    },
    {
      "id": "cl24",
      "level": 3,
      "type": "scenario",
      "q": "Factura cloud explota por VMs olvidadas. Control:",
      "options": [
        "Tags, budgets/alerts, apagado automático, inventory",
        "Desactivar el export de costos para ahorrar almacenamiento",
        "Escalar las VMs olvidadas a un tamaño mayor",
        "Aumentar la cuota de vCPU de la suscripción"
      ],
      "answer": 0,
      "explain": "FinOps básico."
    },
    {
      "id": "cl25",
      "level": 4,
      "type": "mc",
      "q": "Un VPC/VNet es…",
      "options": [
        "Red virtual aislada en la nube",
        "Un balanceador de carga administrado",
        "Un bucket de almacenamiento de objetos",
        "Una VPN de acceso remoto para usuarios"
      ],
      "answer": 0,
      "explain": "Subnets, route tables, security groups."
    },
    {
      "id": "cl26",
      "level": 4,
      "type": "tf",
      "q": "Los Security Groups son stateless: debes permitir por separado el tráfico de respuesta.",
      "answer": false,
      "explain": "Falso: los Security Groups son stateful (la respuesta a un tráfico permitido vuelve sola). Las NACL de AWS sí son stateless."
    },
    {
      "id": "cl27",
      "level": 4,
      "type": "scenario",
      "q": "Base de datos expuesta 0.0.0.0/0 en SG. Acción:",
      "options": [
        "Restringir a app subnets/bastion; rotar credenciales",
        "Cambiar el puerto por defecto de la BD y dejar la regla",
        "Mover la BD a una subred pública con IP elástica",
        "Abrir también el puerto 22 para administrarla más fácil"
      ],
      "answer": 0,
      "explain": "Ataques automatizados escanean todo."
    },
    {
      "id": "cl28",
      "level": 4,
      "type": "fill",
      "q": "Sigla de red privada virtual (túnel):",
      "answer": "VPN",
      "accept": ["VPN","vpn"],
      "explain": "Site-to-site o client VPN hacia cloud."
    },
    {
      "id": "cl29",
      "level": 4,
      "type": "mc",
      "q": "Object lock / WORM en backups ayuda contra…",
      "options": [
        "Ransomware que intenta borrar/cifrar backups",
        "Latencia alta al leer backups remotos",
        "Costos por guardar versiones antiguas",
        "Cortes de red al subir backups grandes"
      ],
      "answer": 0,
      "explain": "Inmutabilidad."
    },
    {
      "id": "cl30",
      "level": 4,
      "type": "match",
      "q": "Empareja el término de red cloud con su significado:",
      "pairs": [
        {
          "left": "Egress",
          "right": "Tráfico saliente"
        },
        {
          "left": "Ingress",
          "right": "Tráfico entrante"
        },
        {
          "left": "Peering",
          "right": "Conectar redes virtuales"
        },
        {
          "left": "Private endpoint",
          "right": "Acceso privado a PaaS"
        }
      ],
      "explain": "Red cloud."
    },
    {
      "id": "cl31",
      "level": 4,
      "type": "order",
      "q": "Ordena el montaje de una landing zone básica:",
      "items": [
        "Crear la organización/tenant (cuenta de gestión)",
        "Crear cuentas separadas (prod, dev, seguridad)",
        "Aplicar guardrails (policies) a esas cuentas",
        "Desplegar workloads en las cuentas hijas"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Primero la estructura (org → cuentas aisladas), luego las reglas (guardrails) y al final los workloads, que caen en cuentas ya gobernadas."
    },
    {
      "id": "cl32",
      "level": 4,
      "type": "tf",
      "q": "Cross-region replication puede mejorar DR de object storage.",
      "answer": true,
      "explain": "Ojo con costos y cumplimiento de datos."
    },
    {
      "id": "cl33",
      "level": 5,
      "type": "mc",
      "q": "Chaos engineering busca…",
      "options": [
        "Probar resiliencia inyectando fallos de forma controlada",
        "Generar carga máxima para medir rendimiento",
        "Aplicar cambios en producción sin pasar por revisión",
        "Buscar vulnerabilidades con ataques simulados"
      ],
      "answer": 0,
      "explain": "Mejora confianza en el diseño."
    },
    {
      "id": "cl34",
      "level": 5,
      "type": "scenario",
      "q": "Key leaked en GitHub público. Respuesta:",
      "options": [
        "Rotar/revocar de inmediato, scrub history, auditar uso",
        "Hacer privado el repositorio y seguir usando la misma key",
        "Borrar el commit con la key y mantenerla activa",
        "Esperar a que el proveedor detecte abuso y avise"
      ],
      "answer": 0,
      "explain": "Assume compromise."
    },
    {
      "id": "cl35",
      "level": 5,
      "type": "fill",
      "q": "Sigla de plataforma como servicio:",
      "answer": "PaaS",
      "accept": ["PaaS","paas"],
      "explain": "Platform as a Service."
    },
    {
      "id": "cl36",
      "level": 5,
      "type": "mc",
      "q": "Un service mesh (idea) aporta…",
      "options": [
        "mTLS, retries, observabilidad entre microservicios",
        "Orquestar y programar contenedores en los nodos del cluster",
        "Almacenar y versionar imágenes de contenedor en un registry",
        "Compilar y empaquetar microservicios en el pipeline de CI"
      ],
      "answer": 0,
      "explain": "Sidecars/proxies."
    },
    {
      "id": "cl37",
      "level": 5,
      "type": "identify",
      "q": "Patrón para secretos en cloud:",
      "options": [
        "Secrets Manager / Vault + rotación",
        "ENV en el Dockerfile de la imagen",
        "Archivo .env commiteado en el repo",
        "Texto plano en un bucket compartido"
      ],
      "answer": 0,
      "explain": "Nunca hardcodees."
    },
    {
      "id": "cl38",
      "level": 5,
      "type": "order",
      "q": "Ordena incident billing anomaly:",
      "items": [
        "Alert de presupuesto",
        "Identificar recurso culpable",
        "Contener (apagar/restringir)",
        "Postmortem FinOps"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Minutos importan en crypto miners."
    },
    {
      "id": "cl39",
      "level": 5,
      "type": "tf",
      "q": "Datos personales pueden tener restricciones de residencia (qué región usar).",
      "answer": true,
      "explain": "Compliance GDPR y locales."
    },
    {
      "id": "cl40",
      "level": 5,
      "type": "scenario",
      "q": "Lift-and-shift de app monolítica a una sola VM enorme. Riesgo:",
      "options": [
        "Poco aprovechamiento cloud-native; SPOF y costo",
        "Autoescalado horizontal garantizado sin cambiar la app",
        "Cero operación: el proveedor parcha tu app y tu SO",
        "Backups innecesarios por usar discos administrados"
      ],
      "answer": 0,
      "explain": "A veces es paso intermedio válido si se planifica."
    }
  ],
  "boss": [
    {
      "id": "clB1",
      "level": 5,
      "type": "scenario",
      "q": "BOSS: Bucket público con PII. Contención:",
      "options": [
        "Bloquear acceso público, rotar datos/credenciales, forense de accesos",
        "Borrar el bucket de inmediato, sin conservar logs ni copias legales",
        "Renombrar el bucket para ocultarlo, manteniendo el acceso público",
        "Esperar a confirmar abuso real antes de tocar permisos"
      ],
      "answer": 0,
      "explain": "Data exposure class-1."
    },
    {
      "id": "clB2",
      "level": 5,
      "type": "mc",
      "q": "BOSS: Región cae. Tu app multi-AZ en UNA región…",
      "options": [
        "Sigue caída regional; necesitas estrategia multi-region/DR",
        "Sobrevive, porque multi-AZ replica automáticamente a otra región",
        "Hace failover al CDN, que sirve la app completa desde el edge",
        "El proveedor la migra sola a otra región según el SLA"
      ],
      "answer": 0,
      "explain": "AZ ≠ región."
    },
    {
      "id": "clB3",
      "level": 5,
      "type": "order",
      "q": "BOSS: Se filtraron los secrets de tu pipeline CI/CD. Ordena la respuesta:",
      "items": [
        "Revocar/rotar YA los secrets expuestos (contener)",
        "Auditar deploys recientes (medir alcance)",
        "Reconstruir y redeployar desde fuentes firmadas",
        "Postmortem: migrar a OIDC y roles mínimos"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Contener → medir alcance → recuperar desde fuentes confiables → lecciones aprendidas (supply chain)."
    },
    {
      "id": "clB4",
      "level": 5,
      "type": "tf",
      "q": "BOSS: En IaaS el proveedor parchea por ti el sistema operativo de tus VMs.",
      "answer": false,
      "explain": "Falso: en IaaS el proveedor cubre hardware, red e hipervisor; el SO invitado, sus parches y el cifrado de tus datos son responsabilidad tuya."
    },
    {
      "id": "clB5",
      "level": 5,
      "type": "fill",
      "q": "BOSS: Objetivo de pérdida de datos tolerable (sigla):",
      "answer": "RPO",
      "accept": ["RPO","rpo"],
      "explain": "Recovery Point Objective."
    }
  ]
});

  pushWorld({
  "id": "database",
  "name": "Base de datos básica",
  "icon": "🗄️",
  "color": "#c9a0ff",
  "description": "Tablas, SQL CRUD, claves, índices y backups.",
  "questions": [
    {
      "id": "db01",
      "level": 1,
      "type": "mc",
      "q": "Una tabla en una BD relacional es…",
      "options": [
        "Conjunto de filas (registros) y columnas (campos)",
        "Log donde el motor anota cada transacción",
        "Consulta guardada que se ejecuta al leerla",
        "Estructura que acelera búsquedas en una columna"
      ],
      "answer": 0,
      "explain": "Estructura tabular."
    },
    {
      "id": "db02",
      "level": 1,
      "type": "tf",
      "q": "SQL se usa para consultar y modificar datos en muchas BD relacionales.",
      "answer": true,
      "explain": "Structured Query Language."
    },
    {
      "id": "db03",
      "level": 1,
      "type": "mc",
      "q": "¿Qué hace SELECT nombre FROM empleados?",
      "options": [
        "Devuelve la columna nombre de la tabla empleados",
        "Crea la columna nombre en la tabla empleados",
        "Devuelve solo la primera fila de la tabla empleados",
        "Ordena la tabla empleados por la columna nombre"
      ],
      "answer": 0,
      "explain": "SELECT lee datos."
    },
    {
      "id": "db04",
      "level": 1,
      "type": "fill",
      "q": "Palabra SQL para insertar filas:",
      "answer": "INSERT",
      "accept": [
        "INSERT",
        "insert",
        "INSERT INTO",
        "insert into"
      ],
      "explain": "INSERT INTO ... VALUES ..."
    },
    {
      "id": "db05",
      "level": 1,
      "type": "identify",
      "q": "Clave primaria sirve para…",
      "options": [
        "Identificar de forma única cada fila",
        "Limitar quién puede leer cada fila",
        "Cifrar los datos sensibles de la fila",
        "Permitir valores repetidos en la columna"
      ],
      "answer": 0,
      "explain": "PRIMARY KEY."
    },
    {
      "id": "db06",
      "level": 1,
      "type": "scenario",
      "q": "Quieres ver todos los productos. Consulta base:",
      "options": [
        "SELECT * FROM productos;",
        "DELETE FROM productos;",
        "DROP DATABASE;",
        "SHUTDOWN;"
      ],
      "answer": 0,
      "explain": "* trae todas las columnas; sé explícito en prod."
    },
    {
      "id": "db07",
      "level": 1,
      "type": "mc",
      "q": "NULL significa…",
      "options": [
        "Valor desconocido/ausente",
        "El número cero en columnas numéricas",
        "Un espacio en blanco en columnas de texto",
        "El valor FALSE en columnas booleanas"
      ],
      "answer": 0,
      "explain": "NULL no es 0, FALSE ni un espacio: es ausencia de valor."
    },
    {
      "id": "db08",
      "level": 1,
      "type": "tf",
      "q": "UPDATE agrega filas nuevas a una tabla e INSERT modifica las existentes.",
      "answer": false,
      "explain": "Falso: es al revés. INSERT agrega filas nuevas; UPDATE ... SET ... WHERE modifica las existentes."
    },
    {
      "id": "db09",
      "level": 2,
      "type": "mc",
      "q": "¿Para qué es el WHERE?",
      "options": [
        "Filtrar filas según condición",
        "Ordenar los resultados por una columna",
        "Agrupar filas para funciones de agregación",
        "Elegir qué columnas devuelve la consulta"
      ],
      "answer": 0,
      "explain": "Sin WHERE, UPDATE/DELETE afectan todo."
    },
    {
      "id": "db10",
      "level": 2,
      "type": "tf",
      "q": "Una foreign key relaciona filas entre tablas.",
      "answer": true,
      "explain": "Integridad referencial."
    },
    {
      "id": "db11",
      "level": 2,
      "type": "scenario",
      "q": "DELETE FROM pedidos; sin WHERE en prod. Resultado probable:",
      "options": [
        "Borras todos los pedidos",
        "Nada",
        "Solo una fila random",
        "Crea backup automático garantizado"
      ],
      "answer": 0,
      "explain": "Usa transacciones y WHERE cuidadoso."
    },
    {
      "id": "db12",
      "level": 2,
      "type": "fill",
      "q": "Palabra SQL para borrar filas:",
      "answer": "DELETE",
      "accept": [
        "DELETE",
        "delete",
        "DELETE FROM",
        "delete from"
      ],
      "explain": "DELETE FROM t WHERE ..."
    },
    {
      "id": "db13",
      "level": 2,
      "type": "mc",
      "q": "JOIN se usa para…",
      "options": [
        "Combinar filas de tablas relacionadas",
        "Apilar resultados de dos consultas",
        "Agrupar filas con el mismo valor",
        "Crear una tabla a partir de otra"
      ],
      "answer": 0,
      "explain": "INNER/LEFT/RIGHT etc."
    },
    {
      "id": "db14",
      "level": 2,
      "type": "match",
      "q": "Empareja la sentencia SQL con su acción:",
      "pairs": [
        {
          "left": "SELECT",
          "right": "Leer"
        },
        {
          "left": "INSERT",
          "right": "Crear filas"
        },
        {
          "left": "UPDATE",
          "right": "Modificar"
        },
        {
          "left": "DELETE",
          "right": "Borrar filas"
        }
      ],
      "explain": "CRUD SQL."
    },
    {
      "id": "db15",
      "level": 2,
      "type": "order",
      "q": "Ordena consulta segura de actualización:",
      "items": [
        "BEGIN (abrir transacción)",
        "UPDATE con WHERE",
        "SELECT para revisar las filas modificadas",
        "COMMIT si es correcto o ROLLBACK si no"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Dentro de la transacción ejecutas el UPDATE, revisas con SELECT (y el conteo de filas afectadas) que el cambio sea el esperado y solo entonces confirmas (COMMIT) o deshaces (ROLLBACK). Tip: antes del BEGIN puedes correr un SELECT con el mismo WHERE para previsualizar."
    },
    {
      "id": "db16",
      "level": 2,
      "type": "tf",
      "q": "DROP TABLE define la estructura de una tabla nueva.",
      "answer": false,
      "explain": "Falso: DROP TABLE elimina una tabla. La estructura de una tabla nueva se define con CREATE TABLE (DDL)."
    },
    {
      "id": "db17",
      "level": 3,
      "type": "mc",
      "q": "Un índice acelera…",
      "options": [
        "Búsquedas/filtros a costa de espacio y writes",
        "Inserciones masivas, sin costo extra de espacio",
        "Backups completos, al comprimir los datos de la tabla",
        "La replicación, al enviar menos datos a las réplicas"
      ],
      "answer": 0,
      "explain": "Indexa columnas de filtros frecuentes."
    },
    {
      "id": "db18",
      "level": 3,
      "type": "scenario",
      "q": "Reporte lento en tabla de millones. Primera idea:",
      "options": [
        "EXPLAIN/analizar query + índices adecuados",
        "Duplicar la RAM del servidor antes de medir nada",
        "Quitar la clave primaria para acelerar las lecturas",
        "Reiniciar el servicio de la BD cada vez que corra"
      ],
      "answer": 0,
      "explain": "Mide el plan de ejecución."
    },
    {
      "id": "db19",
      "level": 3,
      "type": "fill",
      "q": "Sigla de lenguaje de consulta estructurado:",
      "answer": "SQL",
      "accept": ["SQL","sql"],
      "explain": "Structured Query Language."
    },
    {
      "id": "db20",
      "level": 3,
      "type": "mc",
      "q": "Normalización busca…",
      "options": [
        "Reducir redundancia y anomalías de datos",
        "Duplicar datos para evitar JOINs",
        "Poner índices en todas las columnas",
        "Particionar tablas por rango de fechas"
      ],
      "answer": 0,
      "explain": "1NF/2NF/3NF como guía."
    },
    {
      "id": "db21",
      "level": 3,
      "type": "match",
      "q": "Empareja el concepto de bases de datos con su definición:",
      "pairs": [
        {
          "left": "OLTP",
          "right": "Transacciones operativas"
        },
        {
          "left": "OLAP",
          "right": "Analítica/agregaciones"
        },
        {
          "left": "ACID",
          "right": "Propiedades de transacciones"
        },
        {
          "left": "ORM",
          "right": "Mapeo objeto-relacional"
        }
      ],
      "explain": "Conceptos."
    },
    {
      "id": "db22",
      "level": 3,
      "type": "order",
      "q": "Ordena backup lógico básico:",
      "items": [
        "Ejecutar pg_dump/mysqldump o equivalente",
        "Copiar el archivo a almacenamiento offsite",
        "Restaurar desde la copia offsite en un lab",
        "Documentar resultado y tiempo de restore"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Backup ≠ archivo copiado sin prueba: restaura desde la copia offsite (la que usarías en un desastre) y documenta el resultado y el tiempo real (tu RTO). El RPO se define antes, porque determina cada cuánto respaldar."
    },
    {
      "id": "db23",
      "level": 3,
      "type": "tf",
      "q": "Si el servidor se cae en plena transacción ACID (sin COMMIT), al reiniciar se conservan los pasos que ya se habían ejecutado.",
      "answer": false,
      "explain": "Falso: por la atomicidad (la A de ACID), una transacción sin COMMIT se revierte completa al recuperar el motor: o se confirma todo o no se confirma nada."
    },
    {
      "id": "db24",
      "level": 3,
      "type": "scenario",
      "q": "App muestra datos viejos tras UPDATE. Sospecha:",
      "options": [
        "Caché de app/CDN o isolation/replica lag",
        "Falta de índice en la columna actualizada",
        "La clave primaria de la tabla está duplicada",
        "Fragmentación del disco del servidor"
      ],
      "answer": 0,
      "explain": "Revisa caché y réplicas de lectura."
    },
    {
      "id": "db25",
      "level": 4,
      "type": "mc",
      "q": "EXPLAIN (o similar) muestra…",
      "options": [
        "Cómo el motor planea ejecutar la consulta",
        "El resultado de la consulta con sus filas",
        "Los permisos del usuario sobre cada tabla",
        "El historial de consultas lentas del servidor"
      ],
      "answer": 0,
      "explain": "Herramienta #1 de performance."
    },
    {
      "id": "db26",
      "level": 4,
      "type": "tf",
      "q": "Una réplica de lectura acepta escrituras y las copia al primario.",
      "answer": false,
      "explain": "Falso: la réplica de lectura solo sirve consultas (SELECT); las escrituras van al primario. Ojo con el lag de replicación."
    },
    {
      "id": "db27",
      "level": 4,
      "type": "scenario",
      "q": "Migración con downtime mínimo. Técnica común:",
      "options": [
        "Expand/contract, dual-write o logical replication según motor",
        "Hacer dump completo y restore durante horario pico",
        "Apagar la app y migrar todo en una sola ventana larga",
        "Copiar los data files con la BD encendida y escribiendo"
      ],
      "answer": 0,
      "explain": "Planifica rollback."
    },
    {
      "id": "db28",
      "level": 4,
      "type": "fill",
      "q": "Comando SQL para quitar una tabla entera (peligroso):",
      "answer": "DROP TABLE",
      "accept": ["DROP TABLE","drop table"],
      "explain": "DDL destructivo; no es DELETE."
    },
    {
      "id": "db29",
      "level": 4,
      "type": "mc",
      "q": "Isolation level más estricto típico…",
      "options": [
        "Serializable (idea) vs read committed más común",
        "Read uncommitted, que evita lecturas sucias",
        "Read committed, el más estricto por defecto",
        "Repeatable read, que está por encima de serializable"
      ],
      "answer": 0,
      "explain": "Trade-off consistencia vs concurrencia."
    },
    {
      "id": "db30",
      "level": 4,
      "type": "match",
      "q": "Empareja el concepto de operación de BD con su propósito:",
      "pairs": [
        {
          "left": "VACUUM (PG idea)",
          "right": "Mantenimiento/limpieza"
        },
        {
          "left": "ANALYZE",
          "right": "Actualizar estadísticas"
        },
        {
          "left": "CHECKPOINT",
          "right": "Flush a disco durable"
        },
        {
          "left": "Connection pool",
          "right": "Reutilizar conexiones"
        }
      ],
      "explain": "Ops DB."
    },
    {
      "id": "db31",
      "level": 4,
      "type": "order",
      "q": "Ordena incident \"DB CPU 100%\":",
      "items": [
        "Identificar queries top",
        "Matar/limitar monstruo si seguro",
        "Añadir índice/fix query",
        "Postmortem y límites"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "No reinicies a ciegas primero."
    },
    {
      "id": "db32",
      "level": 4,
      "type": "tf",
      "q": "Prepared statements ayudan contra SQL injection y pueden reutilizar planes.",
      "answer": true,
      "explain": "Parametriza siempre."
    },
    {
      "id": "db33",
      "level": 5,
      "type": "mc",
      "q": "Point-in-time recovery (PITR) permite…",
      "options": [
        "Restaurar a un instante usando base + WAL/binlog",
        "Restaurar solo el último backup completo, sin logs",
        "Recuperar datos sin haber hecho ningún backup base",
        "Replicar en vivo a otra región con cero pérdida"
      ],
      "answer": 0,
      "explain": "Requiere archiving de logs."
    },
    {
      "id": "db34",
      "level": 5,
      "type": "scenario",
      "q": "Split-brain en cluster activo-activo mal configurado. Riesgo:",
      "options": [
        "Datos divergentes / corrupción lógica",
        "Solo más latencia, sin afectar los datos",
        "Bloqueo total de escrituras garantizado",
        "Failover automático más rápido y seguro"
      ],
      "answer": 0,
      "explain": "Quorum y fencing."
    },
    {
      "id": "db35",
      "level": 5,
      "type": "fill",
      "q": "Sigla de las propiedades clásicas de transacciones:",
      "answer": "ACID",
      "accept": ["ACID","acid"],
      "explain": "Atomicity Consistency Isolation Durability."
    },
    {
      "id": "db36",
      "level": 5,
      "type": "mc",
      "q": "Un covering index es…",
      "options": [
        "Índice que puede satisfacer la query sin tocar la tabla heap",
        "Índice que cubre todas las tablas de la base de datos",
        "Índice creado automáticamente sobre cada clave foránea",
        "Índice parcial que solo incluye filas con cierto WHERE"
      ],
      "answer": 0,
      "explain": "Incluye todas las columnas necesarias."
    },
    {
      "id": "db37",
      "level": 5,
      "type": "identify",
      "q": "Amenaza si concatenas input en SQL:",
      "options": [
        "SQL injection",
        "XSS reflejado",
        "CSRF",
        "Fuerza bruta"
      ],
      "answer": 0,
      "explain": "Usa parámetros."
    },
    {
      "id": "db38",
      "level": 5,
      "type": "order",
      "q": "Ordena promote de réplica tras falla primaria:",
      "items": [
        "Confirmar primaria caída",
        "Promote réplica",
        "Reapuntar apps/DNS",
        "Reconstruir nueva réplica"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Evita dos primarias."
    },
    {
      "id": "db39",
      "level": 5,
      "type": "tf",
      "q": "Autovacuum mal tunado en PostgreSQL puede dejar bloat y performance pobre.",
      "answer": true,
      "explain": "Monitorea dead tuples y edad de XID."
    },
    {
      "id": "db40",
      "level": 5,
      "type": "scenario",
      "q": "Compliance pide cifrado de datos sensibles. Controles:",
      "options": [
        "TDE/cifrado en reposo + TLS en tránsito + masking",
        "Ocultar la columna sensible solo en la interfaz web",
        "Guardar los datos en Base64 para que no sean legibles",
        "Hashear con MD5 los datos que luego hay que leer"
      ],
      "answer": 0,
      "explain": "Defensa en profundidad."
    }
  ],
  "boss": [
    {
      "id": "dbB1",
      "level": 5,
      "type": "scenario",
      "q": "BOSS: DROP TABLE en prod por script. Contención:",
      "options": [
        "Stop writes, evaluar PITR/backup, comunicar, postmortem",
        "Recrear la tabla vacía y dejar que la app siga escribiendo",
        "Restaurar el backup de anoche encima de todo, sin revisar",
        "Borrar los logs del script para evitar confusiones"
      ],
      "answer": 0,
      "explain": "PITR salva carreras."
    },
    {
      "id": "dbB2",
      "level": 5,
      "type": "mc",
      "q": "BOSS: Replication lag de horas. Efecto:",
      "options": [
        "Lecturas stale; riesgo si failover precipitado",
        "Ninguno mientras el primario siga respondiendo",
        "Pérdida inmediata de datos en el primario",
        "Las réplicas pasan a aceptar escrituras propias"
      ],
      "answer": 0,
      "explain": "Monitorea lag SLIs."
    },
    {
      "id": "dbB3",
      "level": 5,
      "type": "order",
      "q": "BOSS: Sospecha de inyección SQL activa:",
      "items": [
        "Contener: WAF/bloquear endpoint y preservar logs",
        "Parchear el código con consultas parametrizadas",
        "Reprobar el payload de los logs: debe fallar",
        "Cierre: rotar secretos, auditar datos, postmortem"
      ],
      "answer": [
        0,
        1,
        2,
        3
      ],
      "explain": "Primero contienes y preservas evidencia; luego corriges la causa con consultas parametrizadas y confirmas con el payload real que ya no funciona; al cerrar rotas credenciales, evalúas qué datos se tocaron (posible notificación) y documentas. Si hay indicios de credenciales robadas, rótalas ya durante la contención."
    },
    {
      "id": "dbB4",
      "level": 5,
      "type": "tf",
      "q": "BOSS: Un full backup sin probar restore no garantiza recuperación.",
      "answer": true,
      "explain": "Ensayos periódicos."
    },
    {
      "id": "dbB5",
      "level": 5,
      "type": "fill",
      "q": "BOSS: Cláusula SQL para filtrar filas (palabra):",
      "answer": "WHERE",
      "accept": ["WHERE","where"],
      "explain": "UPDATE/DELETE peligrosos sin WHERE."
    }
  ]
});

  // Bosses de mundos existentes: marcar nivel maestro
  WORLDS.forEach((w) => {
    if (w.boss) w.boss.forEach((q) => { if (q.level == null || q.level < 4) q.level = 5; });
  });

  // Helpers (sobrescribe con soporte 1..maxL)
  window.getQuestionsForLevel = function (worldId, level) {
    const w = getWorldById(worldId);
    if (!w) return [];
    return w.questions.filter((q) => (q.level || 1) === level);
  };
  window.countLevelsForWorld = function (worldId) {
    const w = getWorldById(worldId);
    const c = {};
    for (let i = 1; i <= maxL; i++) c[i] = 0;
    if (!w) return c;
    w.questions.forEach((q) => { const L = q.level || 1; c[L] = (c[L] || 0) + 1; });
    return c;
  };
})();
