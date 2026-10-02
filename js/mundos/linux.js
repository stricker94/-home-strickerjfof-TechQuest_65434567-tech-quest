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
      explain: "ls (list) muestra archivos y carpetas. Usa -l para formato largo y -a para incluir ocultos.",
      try: "En una terminal de Linux o WSL escribe `ls -la` en tu home y fíjate en los archivos que empiezan con punto: son los ocultos que -a muestra."
    },
    {
      id: "lx02", level: 1, type: "mc",
      q: "¿Qué comando cambia el directorio de trabajo actual?",
      options: ["mv", "cd", "cp", "rm"],
      answer: 1,
      explain: "cd (change directory) te mueve entre carpetas, con ruta absoluta (cd /etc) o relativa (cd Documentos).",
      try: "En una terminal de Linux o WSL escribe `cd /etc`, luego `pwd` para confirmar dónde estás y regresa a tu home con `cd ~`."
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
      explain: "mkdir crea directorios. mkdir -p crea rutas anidadas si no existen.",
      try: "En una terminal de Linux o WSL escribe `mkdir -p /tmp/prueba/a/b` y luego `ls -R /tmp/prueba` para ver las carpetas anidadas que creó -p."
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
      explain: "r = read. En archivos permite leer; en directorios, listar entradas.",
      try: "En una terminal de Linux o WSL escribe `ls -l /etc/passwd` y mira la primera columna: cada r indica permiso de lectura para dueño, grupo y otros."
    },
    {
      id: "lx05", level: 1, type: "order",
      q: "Ordena los pasos para instalar un paquete con apt (de primero a último):",
      items: [
        "sudo apt update",
        "sudo apt install nombre-paquete",
        "Confirmar si lo pide (Y, o S si apt está en español)",
        "Verificar con apt list --installed | grep nombre"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero actualizas índices (update), luego instalas, confirmas y opcionalmente verificas.",
      try: "En Ubuntu o WSL con Ubuntu escribe `apt list --installed | grep bash` y verás el paquete instalado con su versión (ignora el aviso WARNING de apt)."
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
      explain: "7=rwx, 5=r-x. El dueño puede todo; grupo/otros leen y ejecutan. Típico en scripts.",
      try: "En Linux o WSL ejecuta `touch /tmp/demo.sh`, luego `chmod 755 /tmp/demo.sh` y revisa con `ls -l /tmp/demo.sh` que diga rwxr-xr-x."
    },
    {
      id: "lxL1a", level: 1, type: "mc",
      q: "¿Qué comando muestra la ruta del directorio actual?",
      options: ["pwd", "ls", "cd", "whoami"],
      answer: 0,
      explain: "pwd (print working directory) imprime la ruta absoluta de la carpeta donde estás. whoami no muestra rutas: solo dice con qué usuario estás trabajando.",
      try: "En una terminal de Linux o WSL escribe `pwd`, luego `cd /tmp` y `pwd` otra vez para ver cómo cambia la ruta."
    },
    {
      id: "lxL1b", level: 1, type: "tf",
      q: "El comando 'man ls' muestra la ayuda del comando ls.",
      answer: true,
      explain: "Verdadero: man ls abre la página del manual de ls con todas sus opciones; avanzas con las flechas y sales con q. Para un resumen rápido también sirve ls --help.",
      try: "En una terminal de Linux o WSL escribe `man ls`, avanza con las flechas y sal con q; compara con `ls --help`, que imprime un resumen."
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
      explain: "cp copia con el formato cp origen destino; si el destino es una carpeta como /tmp, el archivo conserva su nombre. Para copiar carpetas completas agrega -r.",
      try: "En Linux o WSL ejecuta `echo hola > /tmp/nota.txt`, `mkdir -p /tmp/copias` y `cp /tmp/nota.txt /tmp/copias`; con `ls /tmp/copias` verás la copia."
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
      explain: ".. representa el directorio padre, así que cd .. te sube un nivel. Para ir a tu home se usa cd o cd ~, y para ir a la raíz, cd /.",
      try: "En una terminal de Linux o WSL escribe `cd /usr/share`, luego `cd ..` y `pwd`: verás que subiste a /usr."
    },

    // ——— Nivel 2: Intermedio (13 preguntas) ———
    {
      id: "lx07", level: 2, type: "identify",
      q: "¿Qué herramienta o comando usas para ver procesos en ejecución?",
      options: ["ps / top / htop", "df / du / lsblk", "ip / ss / ping", "chmod / chown / umask"],
      answer: 0,
      explain: "ps lista procesos; top/htop muestran uso en tiempo real. kill termina un proceso por PID.",
      try: "En una terminal de Linux o WSL escribe `ps aux | head` para ver procesos y luego `top` para verlos en vivo; sal de top con la tecla q."
    },
    {
      id: "lx08", level: 2, type: "mc",
      q: "¿Dónde suelen estar los archivos de configuración del sistema en Linux?",
      options: ["/home", "/etc", "/tmp", "/dev"],
      answer: 1,
      explain: "/etc contiene configs del sistema (red, servicios, usuarios, etc.).",
      try: "En una terminal de Linux o WSL escribe `ls /etc` y busca archivos conocidos como hosts, hostname o passwd."
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
      explain: "pwd = print working directory; cat concatena/muestra; rm remueve; whoami indica tu usuario.",
      try: "En una terminal de Linux o WSL escribe `whoami`, `pwd` y `cat /etc/hostname` y compara lo que devuelve cada uno."
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
      explain: "644 = dueño rw, grupo/otros solo lectura. Común en archivos de configuración.",
      try: "En Linux o WSL ejecuta `touch /tmp/config.txt`, luego `chmod 644 /tmp/config.txt` y revisa con `ls -l /tmp/config.txt` que diga rw-r--r--."
    },
    {
      id: "lx11", level: 2, type: "mc",
      q: "¿Qué comando muestra información de un usuario y sus grupos?",
      options: ["id", "ls", "df", "ping"],
      answer: 0,
      explain: "id muestra UID, GID y grupos. También: groups, getent passwd.",
      try: "En una terminal de Linux o WSL escribe `id` y fíjate en tu uid, tu gid y la lista de grupos a los que perteneces."
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
      explain: "Todo cuelga de /. No hay letras de unidad como en Windows; /home, /var, /usr están bajo /.",
      try: "En una terminal de Linux o WSL escribe `ls /` y verás que home, etc, usr y var cuelgan todos de la raíz."
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
      explain: "grep muestra las líneas que coinciden con un patrón y -i ignora mayúsculas, así que encuentra error, Error y ERROR. Para invertir la búsqueda se usa -v y para contar líneas, -c.",
      try: "En una terminal de Linux o WSL escribe `grep -i ROOT /etc/passwd` y compara con `grep ROOT /etc/passwd`, que no encuentra nada por las mayúsculas."
    },
    {
      id: "lxL2b", level: 2, type: "scenario",
      q: "Necesitas ver quién está conectado al servidor. ¿Comando típico?",
      options: ["who / w", "mkdir", "apt update", "chmod 777"],
      answer: 0,
      explain: "who lista los usuarios con sesión abierta, su terminal y la hora de entrada; w muestra lo mismo más lo que ejecuta cada uno y la carga del sistema.",
      try: "En una terminal de Linux escribe `w` y revisa las columnas USER y WHAT; arriba verás el uptime y la carga (en WSL la lista puede salir vacía)."
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
      explain: "chown cambia el dueño con el formato chown usuario archivo (o usuario:grupo para cambiar también el grupo). Normalmente requiere sudo, porque solo root puede cambiar el dueño de un archivo.",
      try: "En una terminal de Linux o WSL escribe `ls -l /etc/hostname` y fíjate en la tercera y cuarta columna: dueño y grupo, lo que chown cambia."
    },
    {
      id: "lxL2d", level: 2, type: "order",
      q: "Ordena crear y entrar a ~/labs/demo:",
      items: ["cd ~", "mkdir -p labs/demo", "cd labs/demo", "pwd"],
      answer: [0, 1, 2, 3],
      explain: "Partes de tu home con cd ~ para que la ruta relativa funcione; mkdir -p crea labs y demo de una sola vez, luego entras con cd labs/demo y pwd confirma la ruta final.",
      try: "En una terminal de Linux o WSL ejecuta `cd ~`, `mkdir -p labs/demo`, `cd labs/demo` y `pwd` para ver la ruta completa."
    },
    {
      id: "lxN01", level: 2, type: "mc",
      q: "¿Qué comando extrae el contenido de respaldo.tar.gz en la carpeta actual?",
      options: [
        "tar -xzf respaldo.tar.gz",
        "tar -czf respaldo.tar.gz",
        "tar -tzf respaldo.tar.gz",
        "tar -rzf respaldo.tar.gz"
      ],
      answer: 0,
      explain: "-x extrae, -z descomprime con gzip y -f indica el archivo. Con -c crearías un archivo nuevo y con -t solo verías la lista de su contenido.",
      try: "En Linux o WSL escribe `tar -czf ~/prueba.tar.gz -C ~ .bashrc` y luego `tar -tzf ~/prueba.tar.gz` para ver qué guardó."
    },
    {
      id: "lxN02", level: 2, type: "order",
      q: "Ordena los pasos para crear y probar el script hola.sh (de primero a último):",
      items: [
        "Crear hola.sh con #!/bin/bash en la primera línea",
        "Darle permiso de ejecución con chmod +x hola.sh",
        "Ejecutarlo con ./hola.sh mundo",
        "Ver su código de salida con echo $?"
      ],
      answer: [0, 1, 2, 3],
      explain: "chmod necesita que el archivo exista, ./hola.sh necesita el permiso x y $? guarda el código de salida del último comando, por eso va justo después."
    },
    {
      id: "lxN03", level: 2, type: "fill",
      q: "Escribe el comando que muestra las tareas de cron de tu usuario, sin abrir el editor:",
      answer: "crontab -l",
      accept: ["crontab -l"],
      explain: "crontab -l lista tu tabla de cron y crontab -e la abre para editarla. Ojo: sudo crontab -l mostraría la de root, no la tuya.",
      try: "En Linux o WSL escribe `crontab -l` para ver tus tareas programadas; si aún no tienes, dirá algo como 'no crontab for'."
    },

    // ——— Nivel 3: Avanzado (13 preguntas) ———
    {
      id: "lx13", level: 3, type: "tf",
      q: "En Linux, el usuario root tiene UID 1000.",
      answer: false,
      explain: "Falso: root siempre tiene UID 0. Los UID desde 1000 (en la mayoría de distros) son usuarios normales.",
      try: "En una terminal de Linux o WSL escribe `id -u root` (devuelve 0) y luego `id -u` para ver tu propio UID."
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
      explain: "df (disk free) muestra el espacio usado y libre de cada sistema de archivos montado; -h lo expresa en K, M y G. Para el tamaño de carpetas se usa du y para la RAM, free.",
      try: "En una terminal de Linux o WSL escribe `df -h` y fíjate en la columna Use% (o Uso%) de la línea montada en /."
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
      explain: "tail muestra por defecto las últimas 10 líneas de un archivo; con -n eliges cuántas y con -f sigues el log en vivo (sales con Ctrl+C). Leer syslog puede requerir sudo.",
      try: "En una terminal de Linux o WSL escribe `tail -n 5 /etc/passwd` y compara con `cat /etc/passwd`: tail solo muestra el final."
    },
    {
      id: "lx16", level: 3, type: "scenario",
      q: "Escenario: necesitas matar el proceso con PID 4421. ¿Qué comando usas?",
      options: ["kill 4421", "rm 4421", "chmod 4421", "apt remove 4421"],
      answer: 0,
      explain: "kill envía una señal (por defecto TERM). kill -9 fuerza SIGKILL si no responde.",
      try: "En Linux o WSL ejecuta `sleep 300 &` para crear un proceso de prueba, mira su PID con `echo $!` y termínalo con `kill $!`."
    },
    {
      id: "lx17", level: 3, type: "mc",
      q: "¿Qué archivo contiene la lista de cuentas de usuario locales del sistema?",
      options: ["/etc/passwd", "/etc/hosts", "/etc/fstab", "/etc/hostname"],
      answer: 0,
      explain: "/etc/passwd describe cuentas; las contraseñas hasheadas van en /etc/shadow.",
      try: "En una terminal de Linux o WSL escribe `getent passwd $USER` y ubica en la línea tu UID, tu carpeta home y tu shell, separados por dos puntos."
    },
    {
      id: "lx18", level: 3, type: "identify",
      q: "¿Qué comando muestra el uso de memoria RAM y swap?",
      options: ["free", "mkdir", "ping", "lpstat"],
      answer: 0,
      explain: "free muestra la RAM y la swap totales, usadas y libres; con free -h se lee en M y G. La columna available (disponible) estima cuánta memoria pueden usar nuevos programas.",
      try: "En una terminal de Linux o WSL escribe `free -h` y compara la fila de memoria con la de swap; fíjate en la columna available (o disponible)."
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
      explain: "Los zombies ocupan una entrada en la tabla de procesos hasta que el padre recolecta el estado.",
      try: "En una terminal de Linux o WSL escribe `ps -eo pid,stat,cmd` y revisa STAT: S es dormido, R en ejecución y Z sería un zombie."
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
      explain: "ss es el moderno; -tulpn muestra TCP/UDP listening con procesos.",
      try: "En una terminal de Linux o WSL escribe `ss -tuln` y fíjate en la columna Local Address:Port: son los puertos en escucha de tu equipo."
    },
    {
      id: "lxL3d", level: 3, type: "tf",
      q: "systemctl restart nginx reinicia el servicio nginx en sistemas con systemd.",
      answer: true,
      explain: "systemctl controla unidades: start/stop/restart/status/enable.",
      try: "En Linux o WSL con systemd escribe `systemctl list-units --type=service --state=running` para ver qué servicios están corriendo."
    },
    {
      id: "lxN04", level: 3, type: "fill",
      q: "Escribe el comando find que busca, desde tu carpeta personal (~), los archivos cuyo nombre termina en .log:",
      answer: "find ~ -name \"*.log\"",
      accept: [
        "find ~ -name \"*.log\"",
        "find ~ -type f -name \"*.log\"",
        "find ~ -name \"*.log\" -type f",
        "find ~ -name '*.log'",
        "find ~ -type f -name '*.log'",
        "find ~ -name '*.log' -type f",
        "find ~ -name \\*.log",
        "find ~ -type f -name \\*.log",
        "find ~ -name \\*.log -type f",
        "find ~/ -name \"*.log\"",
        "find ~/ -type f -name \"*.log\"",
        "find ~/ -name \"*.log\" -type f",
        "find ~/ -name '*.log'",
        "find ~/ -type f -name '*.log'",
        "find ~/ -name '*.log' -type f",
        "find ~/ -name \\*.log",
        "find ~/ -type f -name \\*.log",
        "find ~/ -name \\*.log -type f",
        "find $HOME -name \"*.log\"",
        "find $HOME -type f -name \"*.log\"",
        "find $HOME -name \"*.log\" -type f",
        "find $HOME -name '*.log'",
        "find $HOME -type f -name '*.log'",
        "find $HOME -name '*.log' -type f",
        "find $HOME -name \\*.log",
        "find $HOME -type f -name \\*.log",
        "find $HOME -name \\*.log -type f",
        "find \"$HOME\" -name \"*.log\"",
        "find \"$HOME\" -type f -name \"*.log\"",
        "find \"$HOME\" -name \"*.log\" -type f",
        "find \"$HOME\" -name '*.log'",
        "find \"$HOME\" -type f -name '*.log'",
        "find \"$HOME\" -name '*.log' -type f",
        "find \"$HOME\" -name \\*.log",
        "find \"$HOME\" -type f -name \\*.log",
        "find \"$HOME\" -name \\*.log -type f",
        "sudo find ~ -name \"*.log\"",
        "sudo find ~ -type f -name \"*.log\"",
        "sudo find ~ -name \"*.log\" -type f",
        "sudo find ~ -name '*.log'",
        "sudo find ~ -type f -name '*.log'",
        "sudo find ~ -name '*.log' -type f",
        "sudo find ~ -name \\*.log",
        "sudo find ~ -type f -name \\*.log",
        "sudo find ~ -name \\*.log -type f",
        "sudo find ~/ -name \"*.log\"",
        "sudo find ~/ -type f -name \"*.log\"",
        "sudo find ~/ -name \"*.log\" -type f",
        "sudo find ~/ -name '*.log'",
        "sudo find ~/ -type f -name '*.log'",
        "sudo find ~/ -name '*.log' -type f",
        "sudo find ~/ -name \\*.log",
        "sudo find ~/ -type f -name \\*.log",
        "sudo find ~/ -name \\*.log -type f",
        "sudo find $HOME -name \"*.log\"",
        "sudo find $HOME -type f -name \"*.log\"",
        "sudo find $HOME -name \"*.log\" -type f",
        "sudo find $HOME -name '*.log'",
        "sudo find $HOME -type f -name '*.log'",
        "sudo find $HOME -name '*.log' -type f",
        "sudo find $HOME -name \\*.log",
        "sudo find $HOME -type f -name \\*.log",
        "sudo find $HOME -name \\*.log -type f",
        "sudo find \"$HOME\" -name \"*.log\"",
        "sudo find \"$HOME\" -type f -name \"*.log\"",
        "sudo find \"$HOME\" -name \"*.log\" -type f",
        "sudo find \"$HOME\" -name '*.log'",
        "sudo find \"$HOME\" -type f -name '*.log'",
        "sudo find \"$HOME\" -name '*.log' -type f",
        "sudo find \"$HOME\" -name \\*.log",
        "sudo find \"$HOME\" -type f -name \\*.log",
        "sudo find \"$HOME\" -name \\*.log -type f"
      ],
      explain: "-name filtra por nombre y las comillas evitan que la shell expanda *.log antes de que find lo reciba. Sin comillas puede fallar si hay .log en la carpeta actual.",
      try: "En Linux o WSL escribe `find ~ -maxdepth 2 -name \"*.txt\"` para listar los .txt de tu carpeta personal (hasta 2 niveles)."
    },
    {
      id: "lxN05", level: 3, type: "scenario",
      q: "Escenario: necesitas que /home/ana/respaldo.sh se ejecute todos los días a las 2:30 a. m. ¿Qué línea agregas con crontab -e?",
      options: [
        "30 2 * * * /home/ana/respaldo.sh",
        "2 30 * * * /home/ana/respaldo.sh",
        "30 2 * * 1 /home/ana/respaldo.sh",
        "* 2 30 * * /home/ana/respaldo.sh"
      ],
      answer: 0,
      explain: "Los campos son minuto, hora, día del mes, mes y día de la semana: 30 2 * * * es a las 2:30 diario. Con 2 30 inviertes minuto y hora, y 30 no es una hora válida."
    },
    {
      id: "lxN06", level: 3, type: "match",
      q: "Empareja cada comando de cuentas de usuario (se ejecutan con sudo) con lo que hace:",
      pairs: [
        { left: "useradd -m -s /bin/bash luis", right: "Crea la cuenta con carpeta personal y bash" },
        { left: "passwd luis", right: "Asigna o cambia la contraseña de luis" },
        { left: "usermod -L luis", right: "Bloquea la contraseña de luis" },
        { left: "userdel -r luis", right: "Borra la cuenta y su carpeta personal" }
      ],
      explain: "useradd -m crea /home/luis y -s fija la shell; passwd pone la contraseña; usermod -L la bloquea y userdel -r borra la cuenta junto con su carpeta."
    },

    // ——— Nivel 4: Experto (11 preguntas) ———
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
      explain: "nice arranca un comando con otra prioridad: el valor va de -20 (más prioridad) a 19 (menos), así que -n 10 cede CPU a los demás procesos. No fija un porcentaje máximo de CPU.",
      try: "En Linux o WSL ejecuta `nice -n 10 sleep 60 &` y luego `ps -o pid,ni,cmd` para ver el valor 10 en la columna NI."
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
      explain: "du (disk usage) calcula cuánto ocupan archivos y carpetas; -h usa K, M y G y -s da un solo total por argumento, por eso du -sh * resume cada elemento. df, en cambio, mide sistemas de archivos completos.",
      try: "En una terminal de Linux o WSL escribe `du -sh /usr/*` y compara qué carpeta ocupa más espacio."
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
      explain: "Primero mide con df -h y du qué llena el disco y luego libera con cuidado logs rotados, cachés y temporales. Reiniciar no ataca la causa y borrar /var/lib destruye datos de paquetes y servicios."
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
      explain: "setfacl agrega ACL: permisos para usuarios o grupos específicos además del esquema clásico dueño/grupo/otros, por ejemplo setfacl -m u:ana:r archivo. Se consultan con getfacl."
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
      explain: "crontab -e edita las tareas programadas de tu usuario; systemctl enable deja un servicio listo para arrancar al iniciar; ulimit -n muestra o ajusta el máximo de archivos abiertos; strace rastrea syscalls.",
      try: "En una terminal de Linux o WSL escribe `crontab -l` para ver tus tareas programadas (si no tienes, lo dirá) y `ulimit -n` para ver tu límite."
    },
    {
      id: "lxL4h", level: 4, type: "tf",
      q: "Un bind mount copia el contenido de un directorio a otra ruta.",
      answer: false,
      explain: "Falso: un bind mount no copia nada; muestra el mismo directorio en otra ruta, así que un cambio se ve en ambas. Útil en contenedores."
    },
    {
      id: "lxN07", level: 4, type: "scenario",
      q: "Escenario: ejecutaste sudo usermod -G sudo ana para darle permisos de administrador y ahora Ana ya no está en sus grupos docker y dev. ¿Qué faltó?",
      options: [
        "La opción -a, para añadir sin quitar los demás grupos",
        "Ejecutar sudo passwd ana para que se reactiven sus grupos",
        "Que Ana cierre sesión para que recupere sus grupos",
        "Agregar -m para que conserve los grupos que ya tenía"
      ],
      answer: 0,
      explain: "usermod -G reemplaza toda la lista de grupos secundarios; usermod -aG añade sin quitar. Cerrar sesión solo aplica los cambios, no recupera docker y dev."
    },
    {
      id: "lxN08", level: 4, type: "match",
      q: "Empareja cada opción de find con lo que filtra:",
      pairs: [
        { left: "-iname \"*.pdf\"", right: "Nombre .pdf sin distinguir mayúsculas" },
        { left: "-type d", right: "Solo directorios" },
        { left: "-mtime -7", right: "Modificados en los últimos 7 días" },
        { left: "-size +100M", right: "Archivos de más de 100 MiB" }
      ],
      explain: "-iname ignora mayúsculas, -type d limita a directorios, -mtime -7 es menos de 7 días desde la última modificación y -size +100M es más de 100 MiB.",
      try: "En Linux o WSL escribe `find ~ -maxdepth 1 -type d` para ver solo las carpetas de primer nivel de tu carpeta personal."
    },
    {
      id: "lxN09", level: 4, type: "tf",
      q: "Un usuario sin sudo puede cambiar su propia contraseña con passwd, porque ese programa tiene el bit setuid de root.",
      answer: true,
      explain: "passwd es setuid root, así que puede escribir en /etc/shadow, pero pide tu contraseña actual y solo cambia la tuya. Para otra cuenta necesitas sudo passwd usuario.",
      try: "En Linux o WSL escribe `ls -l /usr/bin/passwd` y fíjate en la s de los permisos del dueño (rws): es el bit setuid."
    },

    // ——— Nivel 5: Maestro (11 preguntas) ———
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
      explain: "Los cgroups agrupan procesos y les ponen límites de CPU, memoria e I/O; v2 usa una sola jerarquía unificada. El aislamiento de red y PID lo dan los namespaces; juntos son la base de los contenedores.",
      try: "En una terminal de Linux o WSL escribe `stat -fc %T /sys/fs/cgroup`; si responde cgroup2fs, tu sistema usa cgroups v2."
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
      explain: "Arranca desde GRUB con el kernel anterior (por eso conviene conservarlos), revisa logs y revierte el módulo o driver culpable. kernel.panic=0 no evita el panic: solo hace que el equipo no se reinicie.",
      try: "En una terminal de Linux o WSL escribe `uname -r` para ver qué versión de kernel está corriendo, el dato que comparas al volver a uno anterior."
    },
    {
      id: "lxL5c", level: 5, type: "fill",
      q: "Herramienta para inspeccionar tráfico en interfaz (clásica):",
      answer: "tcpdump",
      accept: ["tcpdump", "wireshark", "tshark", "sudo tcpdump"],
      explain: "tcpdump captura y muestra paquetes de una interfaz desde la terminal, por ejemplo sudo tcpdump -i eth0 port 53; necesita privilegios para capturar. Wireshark es su equivalente gráfico."
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
      explain: "chroot cambia el directorio raíz que ve un proceso; se usa mucho en recuperación para entrar a un sistema montado desde un live USB. No es un sandbox completo: eso lo dan namespaces y cgroups."
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
      explain: "Load alto no siempre es CPU: mira %wa y procesos en estado D; según el caso, profundiza con la herramienta adecuada antes de actuar.",
      try: "En una terminal de Linux o WSL escribe `uptime` y fíjate en los tres números de load average: promedios de 1, 5 y 15 minutos."
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
    },
    {
      id: "lxN10", level: 5, type: "tf",
      q: "En crontab, la línea * */5 * * * /home/ana/check.sh ejecuta el script una vez cada 5 horas.",
      answer: false,
      explain: "Falso: el primer * es cada minuto, así que corre 60 veces en cada una de las horas 0, 5, 10, 15 y 20. Para una sola ejecución en cada una de esas horas usa 0 */5 * * *."
    },
    {
      id: "lxN11", level: 5, type: "scenario",
      q: "Escenario: en crontab tienes 0 3 * * * /home/ana/respaldo.sh > /home/ana/respaldo.log y, cuando el script falla, el log no muestra ningún error. ¿Por qué?",
      options: [
        "Solo rediriges stdout; falta 2>&1 para guardar stderr",
        "Usas > en vez de >>, y cada ejecución borra los errores",
        "Cron no permite redirigir la salida desde la misma línea",
        "El log debe estar en /var/log para que cron escriba"
      ],
      answer: 0,
      explain: "> solo captura la salida estándar; los errores van por stderr y sin 2>&1 cron los manda por correo o se pierden. Cambiar a >> solo acumula, no captura errores."
    },
    {
      id: "lxN12", level: 5, type: "mc",
      q: "El script revisa.sh contiene: if [ -f \"$1\" ]; then echo existe; else echo no existe; fi. ¿Qué imprime ./revisa.sh /etc?",
      options: [
        "no existe",
        "existe",
        "Un error, porque /etc es un directorio",
        "Nada, porque $1 llega vacío al script"
      ],
      answer: 0,
      explain: "-f solo es verdadero si la ruta es un archivo regular; /etc es un directorio, así que entra al else. Para cualquier tipo usarías -e y para carpetas -d."
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
      explain: "systemctl status|restart|stop|start son el estándar en distros modernas.",
      try: "En Linux o WSL con systemd escribe `systemctl status systemd-journald` y revisa la línea Active: debe decir active (running)."
    }
  ]
});
