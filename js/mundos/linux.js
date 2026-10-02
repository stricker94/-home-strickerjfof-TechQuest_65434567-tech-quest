/**
 * Tech Quest — Mundo Linux básico
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "linux",
  name: "Linux básico",
  icon: "🐧",
  color: "#00ff88",
  description: "Comandos, permisos, procesos y el sistema de archivos.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "lx01", level: 1, type: "mc",
      q: "¿Qué comando lista el contenido de un directorio?",
      options: ["ls", "cd", "pwd", "cat"],
      answer: 0,
      explain: "ls (list) muestra archivos y carpetas. Usa -l para formato largo y -a para incluir ocultos."
    },
    {
      id: "lx02", level: 1, type: "mc",
      q: "¿Qué comando cambia el directorio de trabajo actual?",
      options: ["mv", "cd", "cp", "rm"],
      answer: 1,
      explain: "cd (change directory) te mueve entre carpetas, con ruta absoluta (cd /etc) o relativa (cd Documentos)."
    },
    {
      id: "lx03", level: 1, type: "fill",
      q: "Escribe el comando para crear un directorio llamado 'proyectos':",
      answer: "mkdir proyectos",
      accept: [
        "mkdir proyectos",
        "mkdir ./proyectos",
        "mkdir proyectos/",
        "mkdir -p proyectos",
        "mkdir -p ./proyectos",
        "mkdir -p proyectos/",
        "mkdir 'proyectos'",
        "mkdir \"proyectos\""
      ],
      explain: "mkdir crea directorios. mkdir -p crea rutas anidadas si no existen."
    },
    {
      id: "lx04", level: 1, type: "mc",
      q: "En permisos Unix, ¿qué significa el bit de lectura (r)?",
      options: [
        "Ejecutar el archivo / entrar en el directorio",
        "Ver el contenido / listar el directorio",
        "Modificar el contenido / crear y borrar entradas",
        "Cambiar el propietario y el grupo del archivo"
      ],
      answer: 1,
      explain: "r = read. En archivos permite leer; en directorios, listar entradas."
    },
    {
      id: "lx05", level: 1, type: "order",
      q: "Ordena los pasos para instalar un paquete con apt (de primero a último):",
      items: [
        "sudo apt update",
        "sudo apt install nombre-paquete",
        "Confirmar con Y si se pide",
        "Verificar con apt list --installed | grep nombre"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero actualizas índices (update), luego instalas, confirmas y opcionalmente verificas."
    },
    {
      id: "lx06", level: 1, type: "mc",
      q: "¿Qué hace chmod 755 archivo.sh?",
      options: [
        "Dueño: rw-; grupo y otros: r--",
        "Dueño: rwx; grupo y otros: r-x",
        "Dueño: rwx; grupo y otros: rw-",
        "Dueño: rwx; grupo: r-x; otros: ---"
      ],
      answer: 1,
      explain: "7=rwx, 5=r-x. El dueño puede todo; grupo/otros leen y ejecutan. Típico en scripts."
    },
    {
      id: "lxL1a", level: 1, type: "mc",
      q: "¿Qué comando muestra la ruta del directorio actual?",
      options: ["pwd", "ls", "cd", "whoami"],
      answer: 0,
      explain: "pwd = print working directory."
    },
    {
      id: "lxL1b", level: 1, type: "tf",
      q: "El comando 'man ls' muestra la ayuda del comando ls.",
      answer: true,
      explain: "man abre el manual. También: ls --help."
    },
    {
      id: "lxL1c", level: 1, type: "fill",
      q: "Comando para copiar archivo.txt a /tmp:",
      answer: "cp archivo.txt /tmp",
      accept: [
        "cp archivo.txt /tmp",
        "cp archivo.txt /tmp/",
        "cp archivo.txt /tmp/archivo.txt",
        "cp ./archivo.txt /tmp",
        "cp ./archivo.txt /tmp/",
        "cp ./archivo.txt /tmp/archivo.txt"
      ],
      explain: "cp origen destino. Usa -r para copiar directorios."
    },
    {
      id: "lxL1d", level: 1, type: "mc",
      q: "¿Qué hace 'cd ..'?",
      options: [
        "Sube un nivel en el árbol de directorios",
        "Vuelve al directorio personal del usuario (home)",
        "Va directamente a la raíz del sistema de archivos",
        "Lista el contenido del directorio padre"
      ],
      answer: 0,
      explain: ".. es el directorio padre."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "lx07", level: 2, type: "identify",
      q: "¿Qué herramienta o comando usas para ver procesos en ejecución?",
      options: ["ps / top / htop", "df / du / lsblk", "ip / ss / ping", "chmod / chown / umask"],
      answer: 0,
      explain: "ps lista procesos; top/htop muestran uso en tiempo real. kill termina un proceso por PID."
    },
    {
      id: "lx08", level: 2, type: "mc",
      q: "¿Dónde suelen estar los archivos de configuración del sistema en Linux?",
      options: ["/home", "/etc", "/tmp", "/dev"],
      answer: 1,
      explain: "/etc contiene configs del sistema (red, servicios, usuarios, etc.)."
    },
    {
      id: "lx09", level: 2, type: "match",
      q: "Relaciona comando con su función:",
      pairs: [
        { left: "pwd", right: "Muestra la ruta actual" },
        { left: "cat", right: "Muestra contenido de un archivo" },
        { left: "rm", right: "Elimina archivos" },
        { left: "whoami", right: "Muestra el usuario actual" }
      ],
      explain: "pwd = print working directory; cat concatena/muestra; rm remueve; whoami indica tu usuario."
    },
    {
      id: "lx10", level: 2, type: "fill",
      q: "Comando para cambiar permisos a 644 en config.txt:",
      answer: "chmod 644 config.txt",
      accept: [
        "chmod 644 config.txt",
        "chmod 0644 config.txt",
        "sudo chmod 644 config.txt",
        "sudo chmod 0644 config.txt",
        "chmod 644 ./config.txt",
        "chmod 0644 ./config.txt",
        "sudo chmod 644 ./config.txt",
        "sudo chmod 0644 ./config.txt"
      ],
      explain: "644 = dueño rw, grupo/otros solo lectura. Común en archivos de configuración."
    },
    {
      id: "lx11", level: 2, type: "mc",
      q: "¿Qué comando muestra información de un usuario y sus grupos?",
      options: ["id", "ls", "df", "ping"],
      answer: 0,
      explain: "id muestra UID, GID y grupos. También: groups, getent passwd."
    },
    {
      id: "lx12", level: 2, type: "mc",
      q: "¿Qué representa / en el sistema de archivos Linux?",
      options: [
        "El directorio personal del usuario root (/root)",
        "La raíz (root) del árbol de directorios",
        "El punto de montaje de las unidades extraíbles",
        "El área de intercambio (swap) del sistema"
      ],
      answer: 1,
      explain: "Todo cuelga de /. No hay letras de unidad como en Windows; /home, /var, /usr están bajo /."
    },
    {
      id: "lxL2a", level: 2, type: "mc",
      q: "¿Qué hace 'grep -i error log.txt'?",
      options: [
        "Busca 'error' sin distinguir mayúsculas en log.txt",
        "Busca 'error' distinguiendo mayúsculas en log.txt",
        "Muestra las líneas de log.txt que no contienen 'error'",
        "Cuenta cuántas líneas de log.txt contienen 'error'"
      ],
      answer: 0,
      explain: "grep filtra líneas. -i ignora mayúsculas."
    },
    {
      id: "lxL2b", level: 2, type: "scenario",
      q: "Necesitas ver quién está conectado al servidor. ¿Comando típico?",
      options: ["who / w", "mkdir", "apt update", "chmod 777"],
      answer: 0,
      explain: "who y w muestran sesiones activas."
    },
    {
      id: "lxL2c", level: 2, type: "fill",
      q: "Comando para cambiar dueño de file.txt a usuario ana:",
      answer: "chown ana file.txt",
      accept: [
        "chown ana file.txt",
        "chown ana:ana file.txt",
        "chown ana: file.txt",
        "sudo chown ana file.txt",
        "sudo chown ana:ana file.txt",
        "sudo chown ana: file.txt"
      ],
      explain: "chown usuario archivo. A menudo requiere sudo."
    },
    {
      id: "lxL2d", level: 2, type: "order",
      q: "Ordena crear y entrar a ~/labs/demo:",
      items: ["cd ~", "mkdir -p labs/demo", "cd labs/demo", "pwd"],
      answer: [0, 1, 2, 3],
      explain: "mkdir -p crea la ruta; luego entras y verificas."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "lx13", level: 3, type: "tf",
      q: "En Linux, el usuario root tiene UID 1000.",
      answer: false,
      explain: "Falso: root siempre tiene UID 0. Los UID desde 1000 (en la mayoría de distros) son usuarios normales."
    },
    {
      id: "lx14", level: 3, type: "mc",
      q: "¿Qué hace el comando df -h?",
      options: [
        "Muestra espacio en discos montados de forma legible",
        "Muestra el tamaño de cada carpeta de forma legible",
        "Muestra la RAM y la swap libres de forma legible",
        "Revisa y repara el sistema de archivos del disco"
      ],
      answer: 0,
      explain: "df = disk free. -h muestra tamaños en K/M/G."
    },
    {
      id: "lx15", level: 3, type: "fill",
      q: "Comando para ver las últimas líneas de /var/log/syslog (forma corta con tail):",
      answer: "tail /var/log/syslog",
      accept: [
        "tail /var/log/syslog",
        "tail -n 10 /var/log/syslog",
        "tail -n10 /var/log/syslog",
        "tail -10 /var/log/syslog",
        "tail -f /var/log/syslog",
        "sudo tail /var/log/syslog",
        "sudo tail -n 10 /var/log/syslog",
        "sudo tail -f /var/log/syslog",
        "sudo tail -n10 /var/log/syslog",
        "sudo tail -10 /var/log/syslog"
      ],
      explain: "tail muestra el final del archivo. -f sigue el log en vivo."
    },
    {
      id: "lx16", level: 3, type: "scenario",
      q: "Escenario: necesitas matar el proceso con PID 4421. ¿Qué comando usas?",
      options: ["kill 4421", "rm 4421", "chmod 4421", "apt remove 4421"],
      answer: 0,
      explain: "kill envía una señal (por defecto TERM). kill -9 fuerza SIGKILL si no responde."
    },
    {
      id: "lx17", level: 3, type: "mc",
      q: "¿Qué archivo contiene la lista de cuentas de usuario locales del sistema?",
      options: ["/etc/passwd", "/etc/hosts", "/etc/fstab", "/etc/hostname"],
      answer: 0,
      explain: "/etc/passwd describe cuentas; las contraseñas hasheadas van en /etc/shadow."
    },
    {
      id: "lx18", level: 3, type: "identify",
      q: "¿Qué comando muestra el uso de memoria RAM y swap?",
      options: ["free", "mkdir", "ping", "lpstat"],
      answer: 0,
      explain: "free -h resume memoria. También puedes verlo en top/htop."
    },
    {
      id: "lxL3a", level: 3, type: "mc",
      q: "Un proceso en estado Z (zombie) indica…",
      options: [
        "Proceso terminado cuyo padre aún no hizo wait",
        "Proceso detenido con SIGSTOP a la espera de SIGCONT",
        "Proceso bloqueado en E/S no interrumpible",
        "Proceso huérfano que fue adoptado por init (PID 1)"
      ],
      answer: 0,
      explain: "Los zombies ocupan una entrada en la tabla de procesos hasta que el padre recolecta el estado."
    },
    {
      id: "lxL3b", level: 3, type: "scenario",
      q: "Servicio no inicia: 'Address already in use'. ¿Primera idea?",
      options: [
        "Ver qué proceso usa el puerto (ss/netstat/lsof) y liberarlo",
        "Subir el límite de descriptores (ulimit -n) y reintentar",
        "Revisar /etc/hosts y reiniciar la resolución DNS local",
        "Dar permiso de ejecución al binario (chmod +x)"
      ],
      answer: 0,
      explain: "Conflicto de puerto: identifica PID y decide reinicio o cambio de puerto."
    },
    {
      id: "lxL3c", level: 3, type: "fill",
      q: "Comando para ver sockets en escucha (ss forma corta común):",
      answer: "ss -tulpn",
      accept: [
        "ss -tulpn",
        "ss -tulnp",
        "ss -tunlp",
        "ss -tunpl",
        "ss -ntulp",
        "ss -plunt",
        "ss -lntup",
        "ss -lntpu",
        "ss -ltnup",
        "ss -nltup",
        "ss -tuln",
        "ss -tunl",
        "ss -lntu",
        "ss -ltnu",
        "ss -tlnp",
        "ss -tlpn",
        "ss -ltnp",
        "ss -lntp",
        "ss -ntlp",
        "ss -nltp",
        "ss -plnt",
        "ss -tln",
        "ss -ltn",
        "ss -lnt",
        "ss -ntl",
        "ss -tl",
        "ss -lt",
        "ss -l",
        "sudo ss -tulpn",
        "sudo ss -tulnp",
        "sudo ss -tunlp",
        "sudo ss -lntp",
        "sudo ss -tlnp",
        "sudo ss -ntlp",
        "netstat -tulpn",
        "netstat -tulnp",
        "netstat -tunlp",
        "netstat -plunt",
        "netstat -tuln",
        "netstat -tlnp",
        "netstat -lntp",
        "netstat -ltnp",
        "netstat -ntlp",
        "sudo netstat -tulpn",
        "sudo netstat -tulnp",
        "sudo netstat -tunlp",
        "ss -ltunp",
        "ss -lnptu",
        "ss -ltun",
        "ss -lnut",
        "ss -tnl",
        "ss -nlt",
        "ss -lnpt",
        "ss -ltpn",
        "ss -lptn",
        "ss -lnp",
        "ss -nlp",
        "ss -ln",
        "ss -nl",
        "ss -tlp",
        "ss -ltp",
        "ss -tulp",
        "ss -lp",
        "sudo ss -ltunp",
        "sudo ss -tuln",
        "sudo ss -ltnp",
        "sudo ss -nltp",
        "sudo ss -lnp",
        "sudo ss -tulp",
        "netstat -plnt",
        "netstat -ltunp",
        "netstat -lntup",
        "sudo netstat -tlnp",
        "sudo netstat -lntp",
        "sudo netstat -plunt",
        "sudo netstat -tuln",
        "ss -tnlp",
        "ss -tnpl",
        "ss -tpln",
        "ss -tpnl",
        "ss -lpnt",
        "ss -ntpl",
        "ss -nlpt",
        "ss -nptl",
        "ss -nplt",
        "ss -ptln",
        "ss -ptnl",
        "ss -pltn",
        "ss -pntl",
        "ss -pnlt",
        "ss -tlun",
        "ss -tlnu",
        "ss -tnul",
        "ss -tnlu",
        "ss -utln",
        "ss -utnl",
        "ss -ultn",
        "ss -ulnt",
        "ss -untl",
        "ss -unlt",
        "ss -lutn",
        "ss -lunt",
        "ss -ntul",
        "ss -ntlu",
        "ss -nutl",
        "ss -nult",
        "ss -nltu",
        "ss -nlut",
        "ss -lpn",
        "ss -npl",
        "ss -pln",
        "ss -pnl",
        "ss -tpl",
        "ss -lpt",
        "ss -ptl",
        "ss -plt",
        "ss -pl",
        "sudo ss -tnlp",
        "netstat -tnlp",
        "sudo netstat -tnlp",
        "netstat -tlpn",
        "netstat -lnpt"
      ],
      explain: "ss es el moderno; -tulpn muestra TCP/UDP listening con procesos."
    },
    {
      id: "lxL3d", level: 3, type: "tf",
      q: "systemctl restart nginx reinicia el servicio nginx en sistemas con systemd.",
      answer: true,
      explain: "systemctl controla unidades: start/stop/restart/status/enable."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "lxL4a", level: 4, type: "mc",
      q: "¿Qué hace 'nice -n 10 comando'?",
      options: [
        "Ejecuta el comando con menor prioridad de CPU",
        "Ejecuta el comando con mayor prioridad de CPU",
        "Limita el comando a usar como máximo el 10% de CPU",
        "Ejecuta el comando en segundo plano tras 10 segundos"
      ],
      answer: 0,
      explain: "nice ajusta la prioridad; valores altos = menos prioridad."
    },
    {
      id: "lxL4b", level: 4, type: "tf",
      q: "En Debian/Ubuntu, 'journalctl -u ssh' muestra los registros del servicio SSH.",
      answer: true,
      explain: "journalctl consulta el journal; -u filtra por unidad (sin sufijo asume .service). Ojo: el nombre de la unidad varía entre distros: ssh.service en Debian/Ubuntu y sshd.service en RHEL/Fedora/Arch."
    },
    {
      id: "lxL4c", level: 4, type: "fill",
      q: "Comando para ver uso de disco por directorio (humano):",
      answer: "du -h",
      accept: [
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
      explain: "du resume uso de disco; -h legible, -s resumen."
    },
    {
      id: "lxL4d", level: 4, type: "scenario",
      q: "Disco al 100% en /. Mejor primer paso:",
      options: [
        "Ver qué ocupa espacio y limpiar logs/tmp con cuidado",
        "Reiniciar el servidor para que se vacíe el disco solo",
        "Ejecutar fsck sobre / montado para recuperar bloques",
        "Borrar todo /var/lib para ganar espacio de inmediato"
      ],
      answer: 0,
      explain: "Mide antes de borrar; prioriza logs rotados y caches."
    },
    {
      id: "lxL4e", level: 4, type: "mc",
      q: "'setfacl' se usa para…",
      options: [
        "Listas de control de acceso extendidas (ACL)",
        "Atributos inmutables de archivos (como chattr +i)",
        "Contextos de seguridad SELinux de los archivos",
        "Capacidades POSIX de binarios (como setcap)"
      ],
      answer: 0,
      explain: "Las ACL permiten permisos más granulares que ugo clásico."
    },
    {
      id: "lxL4f", level: 4, type: "order",
      q: "Ordena endurecer SSH básico:",
      items: [
        "Generar un par de claves (ssh-keygen)",
        "Copiar la clave pública (ssh-copy-id) y probar login",
        "Desactivar password y root login; limitar AllowUsers",
        "Reiniciar sshd y probar en otra sesión"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero asegura y prueba el acceso por clave; solo entonces desactiva contraseñas/root en sshd_config. Nunca cortes tu única sesión sin probar en paralelo."
    },
    {
      id: "lxL4g", level: 4, type: "match",
      q: "Empareja el comando de Linux con su uso:",
      pairs: [
        { left: "crontab -e", right: "Editar cron del usuario" },
        { left: "systemctl enable", right: "Arrancar servicio al boot" },
        { left: "ulimit -n", right: "Límite de file descriptors" },
        { left: "strace", right: "Rastrear syscalls de un proceso" }
      ],
      explain: "Herramientas de ops Linux."
    },
    {
      id: "lxL4h", level: 4, type: "tf",
      q: "Un bind mount copia el contenido de un directorio a otra ruta.",
      answer: false,
      explain: "Falso: un bind mount no copia nada; muestra el mismo directorio en otra ruta, así que un cambio se ve en ambas. Útil en contenedores."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "lxL5a", level: 5, type: "mc",
      q: "En cgroups v2, ¿qué controlas típicamente?",
      options: [
        "Límites de CPU/memoria/IO por grupo de procesos",
        "Espacios de nombres de red y PID aislados por proceso",
        "Reglas de firewall de paquetes por grupo de usuarios",
        "Permisos de archivos para los grupos de /etc/group"
      ],
      answer: 0,
      explain: "cgroups aíslan recursos; base de contenedores."
    },
    {
      id: "lxL5b", level: 5, type: "scenario",
      q: "Kernel panic recurrente tras update. Acción seria:",
      options: [
        "Boot a kernel anterior, revisar logs, revertir módulo/driver",
        "Poner kernel.panic=0 en sysctl para ignorar el panic",
        "Reinstalar GRUB en el disco y arrancar el mismo kernel",
        "Ampliar la swap y /boot para que el kernel no falle"
      ],
      answer: 0,
      explain: "Conserva kernels previos en GRUB."
    },
    {
      id: "lxL5c", level: 5, type: "fill",
      q: "Herramienta para inspeccionar tráfico en interfaz (clásica):",
      answer: "tcpdump",
      accept: ["tcpdump", "wireshark", "tshark", "sudo tcpdump"],
      explain: "tcpdump captura paquetes; requiere privilegios."
    },
    {
      id: "lxL5d", level: 5, type: "mc",
      q: "'chroot' sirve para…",
      options: [
        "Cambiar la raíz aparente del proceso (jaula ligera)",
        "Ejecutar un comando con privilegios de root temporalmente",
        "Cambiar el propietario de archivos al usuario root",
        "Aislar por completo el proceso con namespaces y cgroups"
      ],
      answer: 0,
      explain: "Útil en recovery; no es sandbox completo como namespaces."
    },
    {
      id: "lxL5e", level: 5, type: "identify",
      q: "Archivo típico de configuración de red en Ubuntu moderno (Netplan):",
      options: ["/etc/netplan/*.yaml", "/etc/printcap solo", "C:\\Windows", "hosts.deny únicamente"],
      answer: 0,
      explain: "Netplan genera config para systemd-networkd o NetworkManager."
    },
    {
      id: "lxL5f", level: 5, type: "order",
      q: "Ordena investigación de alto load average:",
      items: [
        "uptime / top / htop (load y %wa)",
        "Identificar si es CPU o I/O wait",
        "Profundizar: iostat/iotop (I/O) o pidstat/perf (CPU)",
        "Aplicar fix (kill, tune, hardware)"
      ],
      answer: [0, 1, 2, 3],
      explain: "Load alto no siempre es CPU: mira %wa y procesos en estado D; según el caso, profundiza con la herramienta adecuada antes de actuar."
    },
    {
      id: "lxL5g", level: 5, type: "tf",
      q: "Si los permisos Unix (rwx) son correctos, AppArmor/SELinux nunca pueden denegar el acceso.",
      answer: false,
      explain: "Falso: SELinux/AppArmor (MAC) se evalúan además de los permisos Unix y pueden denegar aunque rwx lo permita. Revisa los logs AVC/denied."
    },
    {
      id: "lxL5h", level: 5, type: "scenario",
      q: "NFS mounts cuelgan el shell al listar. Sospecha:",
      options: [
        "Servidor NFS/red caída y opciones hard sin timeout adecuado",
        "Mapeo de UID/GID incorrecto entre cliente y servidor",
        "Montaje con la opción ro (solo lectura) en fstab",
        "Falta de inodos libres en el sistema de archivos local"
      ],
      answer: 0,
      explain: "Con montajes hard, si el servidor NFS o la red caen, los procesos quedan en estado D reintentando sin fin. Revisa servidor, red y export. soft (con timeo/retrans) devuelve error en vez de colgar, pero puede corromper datos: úsalo solo para datos no críticos. intr se ignora desde el kernel 2.6.25; solo SIGKILL interrumpe."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "lxB1", level: 5, type: "scenario",
      q: "BOSS: Servidor web caído. df -h muestra / al 100%. ¿Acción inmediata más sensata?",
      options: [
        "Liberar espacio (logs/tmp) y revisar qué llena el disco",
        "Reiniciar el servidor web en bucle hasta que responda",
        "Aplicar chmod -R 777 / por si es un tema de permisos",
        "Crear un archivo swap en / para darle más memoria"
      ],
      answer: 0,
      explain: "Disco lleno rompe servicios. Identifica con du; rota logs; evita borrados ciegos en /."
    },
    {
      id: "lxB2", level: 5, type: "order",
      q: "BOSS: Tras liberar disco, ordena validación:",
      items: [
        "Comprobar df -h",
        "Revisar el estado del servicio web",
        "Probar endpoint/curl local",
        "Monitorear logs por recidiva"
      ],
      answer: [0, 1, 2, 3],
      explain: "Confirma espacio, servicio y funcionalidad antes de cerrar el incidente."
    },
    {
      id: "lxB3", level: 5, type: "mc",
      q: "BOSS: Proceso en estado D y load alto por I/O. Herramienta útil:",
      options: [
        "iotop / iostat / dmesg",
        "mspaint",
        "solo colorls",
        "Event Viewer de Windows en el Linux"
      ],
      answer: 0,
      explain: "Investigar I/O wait y errores de disco/SAN antes de matar procesos a ciegas."
    },
    {
      id: "lxB4", level: 5, type: "tf",
      q: "BOSS: Trabajar siempre como root interactivo es más seguro que usar sudo con auditoría.",
      answer: false,
      explain: "Falso: sudo con permisos mínimos y registro reduce errores y deja trazabilidad; una sesión root permanente amplifica cualquier error."
    },
    {
      id: "lxB5", level: 5, type: "fill",
      q: "BOSS: Comando para ver estado de un servicio systemd llamado nginx:",
      answer: "systemctl status nginx",
      accept: [
        "systemctl status nginx",
        "systemctl status nginx.service",
        "sudo systemctl status nginx",
        "sudo systemctl status nginx.service",
        "service nginx status",
        "sudo service nginx status"
      ],
      explain: "systemctl status|restart|stop|start son el estándar en distros modernas."
    }
  ]
});
