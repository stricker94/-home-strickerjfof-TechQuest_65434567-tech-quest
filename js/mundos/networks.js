/**
 * Tech Quest — Mundo Redes e infraestructura
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "networks",
  name: "Redes e infraestructura",
  icon: "🌐",
  color: "#ffaa00",
  description: "TCP/IP, DNS, DHCP, subredes, firewall, Wi-Fi y VPN.",

  questions: [
    // ——— Nivel 1: Básico (17 preguntas) ———
    {
      id: "net01", level: 1, type: "mc",
      q: "¿Qué protocolo resuelve nombres de dominio a direcciones IP?",
      options: ["DNS", "FTP", "SMTP", "ARP"],
      answer: 0,
      explain: "DNS traduce ejemplo.com → IP. Sin DNS navegas solo por IP numérica.",
      try: "En cmd escribe `nslookup google.com` y fíjate qué servidor DNS te respondió y qué direcciones IP te devolvió."
    },
    {
      id: "net02", level: 1, type: "mc",
      q: "DHCP principalmente…",
      options: [
        "Asigna IP, máscara, gateway y DNS automáticamente",
        "Traduce nombres de dominio a IP para los clientes de la red",
        "Obtiene la MAC de un host a partir de su dirección IP",
        "Traduce IPs privadas a la IP pública"
      ],
      answer: 0,
      explain: "DHCP entrega configuración IP por lease. El servidor evita conflictos de IP.",
      try: "En cmd escribe `ipconfig /all` y busca en tu adaptador Servidor DHCP y Concesión obtenida: ahí ves quién te dio la IP y cuándo."
    },
    {
      id: "net03", level: 1, type: "mc",
      q: "Diferencia clave: switch vs router",
      options: [
        "Switch: capa 2 LAN; Router: enruta entre redes (capa 3)",
        "Switch: repite bits a todos los puertos (capa 1); Router: capa 2",
        "Switch: almacena archivos compartidos de la red; Router: solo extiende la señal Wi‑Fi",
        "Switch: cachea páginas web; Router: solo conecta equipos dentro de la misma LAN"
      ],
      answer: 0,
      explain: "El switch conecta hosts en la misma red; el router conecta redes distintas y suele hacer NAT."
    },
    {
      id: "net04", level: 1, type: "fill",
      q: "Puerto TCP por defecto de HTTPS:",
      answer: "443",
      accept: ["443", "443/tcp", "tcp/443", "tcp 443"],
      explain: "HTTP usa 80; HTTPS (TLS) usa 443. El candado indica cifrado, no necesariamente sitio 'seguro' al 100%."
    },
    {
      id: "net05", level: 1, type: "mc",
      q: "En IPv4, ¿cuántos bits tiene una dirección?",
      options: ["32", "64", "128", "8"],
      answer: 0,
      explain: "IPv4 usa 32 bits, escritos como 4 octetos de 8 bits (ej. 192.168.1.10), lo que da unos 4,300 millones de direcciones. IPv6 usa 128 bits; 64 es solo el tamaño típico de su parte de host."
    },
    {
      id: "net06", level: 1, type: "match",
      q: "Relaciona concepto con definición:",
      pairs: [
        { left: "Gateway", right: "Salida hacia otras redes" },
        { left: "Máscara", right: "Define red vs host" },
        { left: "Firewall", right: "Filtra tráfico según reglas" },
        { left: "VPN", right: "Túnel cifrado hacia otra red" }
      ],
      explain: "El gateway es la puerta para salir a otras redes y la máscara dice qué parte de la IP es red y cuál es host. El firewall decide qué tráfico pasa según reglas y la VPN crea un túnel cifrado hacia otra red."
    },
    {
      id: "net07", level: 1, type: "mc",
      q: "¿Qué cable de red UTP es común en Gigabit Ethernet?",
      options: ["Cat5e / Cat6", "HDMI", "VGA", "USB-A a Lightning"],
      answer: 0,
      explain: "Cat5e soporta 1 Gbps; Cat6/Cat6a mejores márgenes. RJ-45 es el conector."
    },
    {
      id: "net08", level: 1, type: "order",
      q: "Ordena el flujo típico al abrir https://sitio.com:",
      items: [
        "Resolver el nombre sitio.com a su IP",
        "Abrir la conexión con el servidor",
        "TLS handshake (certificado)",
        "HTTP GET cifrado y respuesta"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero se obtiene la IP del nombre, luego se abre la conexión, después se negocia TLS y al final viaja la petición HTTP. Si falla cualquier paso, la página no carga."
    },
    {
      id: "net09", level: 1, type: "mc",
      q: "Una máscara /24 equivale a…",
      options: ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.255"],
      answer: 0,
      explain: "/24 = 24 bits de red → ~254 hosts útiles. Muy usada en LAN domésticas/oficina.",
      try: "En cmd escribe `ipconfig` y fíjate en la Máscara de subred de tu adaptador; si dice 255.255.255.0, tu red es /24."
    },
    {
      id: "net10", level: 1, type: "identify",
      q: "¿Qué dispositivo suele hacer NAT hacia Internet en casa?",
      options: [
        "Router / gateway doméstico",
        "Switch no administrado de 8 puertos",
        "Punto de acceso en modo puente",
        "Tarjeta de red del PC"
      ],
      answer: 0,
      explain: "El router casero traduce IPs privadas a la IP pública del ISP (NAT/PAT).",
      try: "En cmd escribe `ipconfig` y luego `curl -4 ifconfig.me`: la primera muestra tu IP privada y la segunda la IP pública con la que sales gracias al NAT."
    },
    {
      id: "net11", level: 1, type: "mc",
      q: "Wi-Fi 2.4 GHz vs 5 GHz (idea general):",
      options: [
        "2.4: más alcance, más interferencia; 5: más velocidad, menos alcance",
        "2.4: más velocidad, menos alcance; 5: más alcance, más interferencia",
        "Igual alcance y velocidad; solo cambia el nombre del SSID de la red",
        "5: atraviesa mejor paredes; 2.4: casi sin interferencias en la ciudad"
      ],
      answer: 0,
      explain: "Elige banda según distancia e interferencias. 6 GHz (Wi-Fi 6E) añade otra opción."
    },
    {
      id: "net12", level: 1, type: "fill",
      q: "Protocolo de la capa de transporte orientado a conexión (sigla):",
      answer: "TCP",
      accept: ["TCP", "tcp", "Transmission Control Protocol"],
      explain: "TCP garantiza orden y retransmisión. UDP es más ligero, sin conexión.",
      try: "En cmd escribe `netstat -an` y mira la columna Estado: las líneas TCP muestran el estado de cada conexión y las UDP no tienen, porque UDP no abre conexión."
    },
    {
      id: "netL1a", level: 1, type: "mc",
      q: "¿Qué dispositivo suele conectar PCs en la misma LAN a nivel de tramas?",
      options: ["Switch", "Monitor", "Impresora solo USB", "Teclado"],
      answer: 0,
      explain: "El switch trabaja en capa 2: aprende qué MAC está en cada puerto y reenvía las tramas solo al puerto donde está el destino dentro de la LAN. Monitor, teclado o impresora USB no conectan PCs entre sí."
    },
    {
      id: "netL1b", level: 1, type: "tf",
      q: "8.8.8.0/24 es un rango de direcciones privadas (RFC 1918).",
      answer: false,
      explain: "Falso: 8.8.8.0/24 es público (DNS de Google). Los rangos privados RFC 1918 son 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16."
    },
    {
      id: "netL1c", level: 1, type: "fill",
      q: "Comando Windows para probar eco ICMP a 1.1.1.1:",
      answer: "ping 1.1.1.1",
      accept: [
        "ping 1.1.1.1",
        "ping.exe 1.1.1.1",
        "ping -4 1.1.1.1",
        "ping -n 4 1.1.1.1",
        "ping /n 4 1.1.1.1",
        "ping 1.1.1.1 -n 4",
        "ping -t 1.1.1.1",
        "ping /t 1.1.1.1",
        "ping 1.1.1.1 -t",
        "ping 1.1.1.1 /t",
        "Test-Connection 1.1.1.1",
        "Test-Connection -ComputerName 1.1.1.1",
        "Test-Connection -TargetName 1.1.1.1",
        "Test-NetConnection 1.1.1.1"
      ],
      explain: "ping verifica conectividad básica (si ICMP no está filtrado).",
      try: "En cmd escribe `ping -n 4 1.1.1.1` y fíjate en el tiempo de cada respuesta y en el porcentaje de paquetes perdidos."
    },
    {
      id: "netL1d", level: 1, type: "mc",
      q: "¿Qué puerto TCP usa SSH por defecto?",
      options: ["22", "23", "80", "3389"],
      answer: 0,
      explain: "SSH usa 22/tcp. El 23 es Telnet (sin cifrar), el 80 HTTP y el 3389 RDP.",
      try: "En una terminal de Linux o WSL escribe `grep -w ssh /etc/services` y verás que SSH está registrado en el puerto 22/tcp."
    },
    {
      id: "netL1e", level: 1, type: "identify",
      q: "¿Qué identifica a la tarjeta de red dentro de la LAN (capa 2)?",
      options: ["Dirección MAC", "Dirección IP", "Máscara de subred", "Puerto TCP"],
      answer: 0,
      explain: "La MAC (48 bits, p. ej. 00:1A:2B:…) identifica la interfaz en la LAN; la IP es lógica (capa 3) y puede cambiar.",
      try: "En cmd escribe `getmac /v` y fíjate en la Dirección física de cada adaptador: esa es su MAC."
    },

    // ——— Nivel 2: Intermedio (16 preguntas) ———
    {
      id: "net13", level: 2, type: "mc",
      q: "Un firewall que bloquea el puerto 22…",
      options: [
        "Puede impedir SSH entrante",
        "Borra todos los archivos",
        "Acelera el Wi-Fi automáticamente",
        "Instala antivirus"
      ],
      answer: 0,
      explain: "Puerto 22 = SSH. Reglas de firewall controlan qué servicios son alcanzables."
    },
    {
      id: "net14", level: 2, type: "mc",
      q: "¿Cuántos hosts útiles aprox. en una red /24 (sin contar red y broadcast)?",
      options: ["254", "24", "512", "2"],
      answer: 0,
      explain: "Un /24 deja 8 bits para hosts: 2^8 = 256 direcciones, menos la de red y la de broadcast, quedan 254. Ejemplo: en 192.168.1.0/24 los hosts van de .1 a .254."
    },
    {
      id: "net15", level: 2, type: "mc",
      q: "Una máscara /16 equivale a…",
      options: ["255.255.0.0", "255.255.255.0", "255.255.255.252", "255.0.0.0"],
      answer: 0,
      explain: "/16 son 16 bits de red en 1: los dos primeros octetos en 255 y el resto en 0, o sea 255.255.0.0. Era la máscara por defecto de la antigua clase B; 255.255.255.0 sería /24."
    },
    {
      id: "net16", level: 2, type: "order",
      q: "Ordena el proceso DHCP DORA:",
      items: ["Discover", "Offer", "Request", "Acknowledge (ACK)"],
      answer: [0, 1, 2, 3],
      explain: "Cliente descubre → servidor ofrece → cliente pide → servidor confirma el lease."
    },
    {
      id: "net17", level: 2, type: "order",
      q: "Ordena la resolución DNS típica en el cliente:",
      items: [
        "Consultar caché local",
        "Preguntar al resolver (DNS configurado)",
        "Recibir registro A/AAAA (IP)",
        "Conectar por TCP/UDP al destino"
      ],
      answer: [0, 1, 2, 3],
      explain: "Si la caché tiene la respuesta, no sale a la red. Luego el resolver puede iterar/recursar.",
      try: "En cmd escribe `ipconfig /displaydns` y verás los nombres que tu PC ya resolvió y guarda en su caché DNS local."
    },
    {
      id: "net18", level: 2, type: "mc",
      q: "NAT (Network Address Translation) principalmente…",
      options: [
        "Traduce IPs privadas a una IP pública (u otras redes)",
        "Asigna IPs privadas a los equipos de la LAN de forma dinámica",
        "Resuelve nombres de dominio a las IPs públicas de los servidores",
        "Cifra el tráfico entre la red privada y la pública con un túnel"
      ],
      answer: 0,
      explain: "PAT/NAT overload permite muchos hosts internos con pocas IPs públicas. Complica servicios entrantes sin port-forward."
    },
    {
      id: "net19", level: 2, type: "match",
      q: "Relaciona puerto con servicio:",
      pairs: [
        { left: "80", right: "HTTP" },
        { left: "443", right: "HTTPS" },
        { left: "53", right: "DNS" },
        { left: "3389", right: "RDP" }
      ],
      explain: "Los clásicos: 80 HTTP, 443 HTTPS (TLS), 53 DNS y 3389 RDP. Otros útiles: 67/68 DHCP y 21 FTP."
    },
    {
      id: "net20", level: 2, type: "mc",
      q: "El puerto 9100 en un escaneo a una IP de oficina suele indicar…",
      options: [
        "Servicio de impresión de red (JetDirect/raw)",
        "Servidor de correo SMTP aceptando envíos",
        "Servicio de hora de red (NTP) del dominio",
        "Base de datos MySQL escuchando consultas"
      ],
      answer: 0,
      explain: "Útil al validar que la impresora escucha. Bloqueado por firewall = no imprime aunque haga ping."
    },
    {
      id: "net21", level: 2, type: "scenario",
      q: "Escenario: ping OK a 8.8.8.8 pero nslookup google.com falla. ¿Qué mirar primero?",
      options: [
        "Configuración DNS del cliente/servidor",
        "Puerta de enlace predeterminada del equipo",
        "Cable de red y luces del puerto del switch",
        "Máscara de subred del adaptador"
      ],
      answer: 0,
      explain: "Hay ruta IP pero no resolución de nombres. Prueba DNS alternos y /flushdns.",
      try: "En cmd escribe `nslookup google.com 1.1.1.1` para preguntarle a otro DNS; si así resuelve y con el tuyo no, el problema está en tu DNS configurado."
    },
    {
      id: "net22", level: 2, type: "mc",
      q: "Una VLAN sirve para…",
      options: [
        "Segmentar lógicamente la LAN en dominios de broadcast separados",
        "Cifrar el tráfico entre sedes a través de Internet mediante túneles",
        "Sumar el ancho de banda de varios enlaces físicos en uno lógico",
        "Evitar bucles de capa 2 bloqueando puertos redundantes del switch"
      ],
      answer: 0,
      explain: "VLANs separan tráfico (ej. usuarios vs impresoras vs invitados) sobre el mismo switch físico."
    },
    {
      id: "net23", level: 2, type: "tf",
      q: "WEP es más seguro que WPA3 para Wi‑Fi.",
      answer: false,
      explain: "Falso: WEP está obsoleto y se rompe en minutos. Usa WPA3 o, si no hay, WPA2-AES."
    },
    {
      id: "netL2a", level: 2, type: "mc",
      q: "¿Cuántos hosts útiles aprox. en /26?",
      options: ["62", "254", "6", "1022"],
      answer: 0,
      explain: "Un /26 deja 6 bits para hosts: 2^6 = 64 direcciones, menos red y broadcast, quedan 62. Su máscara es 255.255.255.192 y divide un /24 en cuatro subredes."
    },
    {
      id: "netL2b", level: 2, type: "scenario",
      q: "Dos PCs con IP 192.168.1.10/24 y 192.168.2.10/24 no se hacen ping. ¿Causa típica?",
      options: [
        "Están en subredes distintas sin router entre ellas",
        "Les falta un servidor DNS configurado en el adaptador",
        "El switch no reenvía tráfico ICMP entre sus puertos",
        "Ambas terminan en .10 y eso genera un conflicto de IP"
      ],
      answer: 0,
      explain: "Con /24, 192.168.1.0/24 y 192.168.2.0/24 son redes distintas: cada PC ve a la otra fuera de su red y necesita un router (gateway) para alcanzarla, aunque compartan switch. Que ambas terminen en .10 no es conflicto de IP: un conflicto exige la misma dirección completa."
    },
    {
      id: "netL2c", level: 2, type: "order",
      q: "Ordena las primeras 4 capas del modelo OSI (de abajo hacia arriba):",
      items: ["Física", "Enlace de datos", "Red", "Transporte"],
      answer: [0, 1, 2, 3],
      explain: "1 Física (cable/señal), 2 Enlace de datos (MAC, switch), 3 Red (IP, router), 4 Transporte (TCP/UDP, puertos)."
    },
    {
      id: "netL2d", level: 2, type: "fill",
      q: "Máscara decimal de /24:",
      answer: "255.255.255.0",
      accept: ["255.255.255.0"],
      explain: "/24 son 24 bits de red en 1, es decir, tres octetos completos en 255 y el último en 0: 255.255.255.0. Es la máscara típica de las redes de casa y de oficina."
    },
    {
      id: "netL2e", level: 2, type: "tf",
      q: "Con PAT (NAT overload), el router distingue las conexiones de cada host interno por el puerto de origen.",
      answer: true,
      explain: "Verdadero: PAT reescribe IP y puerto de origen y guarda la asociación en su tabla NAT para devolver cada respuesta al host correcto."
    },

    // ——— Nivel 3: Avanzado (16 preguntas) ———
    {
      id: "net24", level: 3, type: "mc",
      q: "En 2.4 GHz, canales 1, 6 y 11 se recomiendan porque…",
      options: [
        "No se solapan entre sí en esa banda",
        "Son los únicos canales que permite la norma",
        "Transmiten con más potencia que el resto",
        "Son los canales de 40 MHz de esa banda"
      ],
      answer: 0,
      explain: "En 2.4 GHz los canales están separados 5 MHz pero cada uno ocupa ~20-22 MHz; 1, 6 y 11 (25 MHz de separación) no se solapan. Usar canales intermedios causa interferencia de canal adyacente, peor que compartir canal (co-canal)."
    },
    {
      id: "net25", level: 3, type: "fill",
      q: "Comando clásico para ver la ruta que siguen los paquetes (Windows):",
      answer: "tracert",
      accept: ["tracert", "tracert.exe", "pathping", "pathping.exe"],
      explain: "tracert (Windows) / traceroute (Linux). Muestra saltos; timeouts no siempre = caída total.",
      try: "En cmd escribe `tracert -d 8.8.8.8` y cuenta los saltos; un asterisco solo significa que ese router no contestó a tiempo."
    },
    {
      id: "net26", level: 3, type: "mc",
      q: "Un proxy HTTP intermedio típicamente…",
      options: [
        "Reenvía peticiones web de clientes; puede cachear o filtrar",
        "Asigna direcciones IP a los clientes y renueva sus leases",
        "Conmuta tramas entre puertos usando la tabla de MACs",
        "Suministra energía PoE a teléfonos y cámaras IP de la red"
      ],
      answer: 0,
      explain: "Empresas usan proxy para control/URL filtering. El cliente debe apuntar al proxy o usar WPAD.",
      try: "En cmd escribe `netsh winhttp show proxy` y mira si WinHTTP, el proxy de los servicios de Windows, usa un servidor o acceso directo; el del navegador puede ser distinto."
    },
    {
      id: "net27", level: 3, type: "mc",
      q: "Una CDN (Content Delivery Network)…",
      options: [
        "Acerca contenido a usuarios vía nodos geográficos (caché en edge)",
        "Centraliza todo el contenido en un único servidor de origen grande",
        "Registra nombres de dominio para los sitios web publicados en Internet",
        "Cifra el tráfico entre sucursales con túneles IPsec permanentes"
      ],
      answer: 0,
      explain: "Reduce latencia y carga del origen. DNS/anycast dirige al PoP cercano."
    },
    {
      id: "net28", level: 3, type: "scenario",
      q: "Escenario: PCs hacen ping entre sí en 192.168.10.0/24 pero no salen a Internet. Gateway 192.168.10.1 no responde. Causa probable:",
      options: [
        "Router/firewall de borde caído o mala gateway",
        "Servidor DNS de los PCs caído o mal configurado",
        "Tarjetas de red sin driver instalado",
        "Conflicto de IP duplicada entre dos de los PCs"
      ],
      answer: 0,
      explain: "LAN OK, WAN/gateway mal. Verifica cable WAN, NAT, ISP y dirección de puerta de enlace.",
      try: "En cmd escribe `ipconfig`, anota la Puerta de enlace predeterminada y hazle `ping` a esa IP para comprobar que tu router responde."
    },
    {
      id: "net29", level: 3, type: "mc",
      q: "ISP vs LAN:",
      options: [
        "ISP provee acceso a Internet; LAN es tu red local",
        "ISP es tu red local; LAN da acceso a Internet",
        "ISP es un cable de fibra; LAN es un protocolo web",
        "ISP asigna dominios; LAN es la Internet pública"
      ],
      answer: 0,
      explain: "El CPE/router marca el límite: LAN privada detrás, WAN hacia el ISP."
    },
    {
      id: "net30", level: 3, type: "mc",
      q: "Cat6 frente a Cat5e (idea práctica):",
      options: [
        "Cat6 da más margen en Gigabit y admite 10G en tramos cortos",
        "Cat5e admite 10G a 100 m; Cat6 se limita a 100 Mbps",
        "Cat6 usa conector RJ-11 y no es compatible con Gigabit",
        "Cat6 es fibra multimodo; Cat5e es coaxial de cobre"
      ],
      answer: 0,
      explain: "Ambos hacen 1 Gbps en distancias típicas; Cat6 tiene especificación más estricta."
    },
    {
      id: "net31", level: 3, type: "tf",
      q: "Un firewall puede permitir 443/tcp saliente y bloquear 3389/tcp entrante.",
      answer: true,
      explain: "Las reglas se definen por dirección, puerto, protocolo e interfaz. Principio de mínimo privilegio."
    },
    {
      id: "net32", level: 3, type: "mc",
      q: "VPN con split tunnel significa…",
      options: [
        "Solo parte del tráfico va por la VPN; el resto sale por Internet local",
        "Todo el tráfico, incluida la navegación web, pasa siempre por la VPN",
        "El túnel se divide en dos conexiones cifradas con claves distintas",
        "La VPN se reparte entre dos concentradores para balancear la carga"
      ],
      answer: 0,
      explain: "Full tunnel manda todo por VPN. Split mejora velocidad a Internet pero exige buen diseño de seguridad."
    },
    {
      id: "net33", level: 3, type: "identify",
      q: "¿Qué herramienta interpreta saltos hasta un destino y latencias por hop?",
      options: ["mtr / pathping", "ipconfig / ifconfig", "nslookup / dig", "arp -a / ip neigh"],
      answer: 0,
      explain: "mtr (Linux) y pathping (Windows) muestran cada salto con su latencia y pérdida. Si el último hop falla pero el servicio web responde, puede ser ICMP filtrado — no asumas caída.",
      try: "En cmd escribe `pathping -n 8.8.8.8` y espera unos minutos: al final verás la latencia y el porcentaje de pérdida de cada salto."
    },
    {
      id: "net34", level: 3, type: "scenario",
      q: "Escenario: switch vs router. Necesitas conectar 20 PCs en la misma IP subnet sin salir a otra red. ¿Qué basta?",
      options: [
        "Un switch (capa 2) en la misma VLAN/red",
        "Un router con una subred distinta por cada PC",
        "Un proxy HTTP que reenvíe el tráfico entre ellos",
        "Un módem ONT del proveedor de Internet"
      ],
      answer: 0,
      explain: "Misma subred = switching. El router hace falta para salir a otras redes/Internet."
    },
    {
      id: "netL3a", level: 3, type: "mc",
      q: "Una ACL de firewall que deniega 3389/tcp entrante desde Internet reduce exposición a…",
      options: [
        "RDP no autorizado",
        "SSH hacia servidores Linux",
        "Tráfico web HTTPS entrante",
        "Consultas DNS recursivas"
      ],
      answer: 0,
      explain: "El 3389/tcp es el puerto de RDP (Escritorio remoto). Exponerlo a Internet atrae fuerza bruta y exploits; mejor accede solo por VPN o un RD Gateway. SSH usa el 22 y HTTPS el 443."
    },
    {
      id: "netL3b", level: 3, type: "scenario",
      q: "Usuarios de VLAN invitados no deben ver servidores de finanzas. Solución típica:",
      options: [
        "Segmentación VLAN + ACL/firewall inter-VLAN",
        "Una VLAN plana /8 con contraseñas fuertes",
        "Ocultar el SSID de invitados y subir la potencia",
        "Dar a invitados IPs fijas en la subred de finanzas"
      ],
      answer: 0,
      explain: "Pon a los invitados en su propia VLAN y filtra con ACL o firewall entre VLANs para que no lleguen a finanzas: segmentación y mínimo privilegio. Una red plana o un SSID oculto no separan nada."
    },
    {
      id: "netL3c", level: 3, type: "match",
      q: "Empareja concepto avanzado:",
      pairs: [
        { left: "DMZ", right: "Zona aislada para servidores públicos" },
        { left: "Port forwarding", right: "Publica un puerto interno hacia Internet" },
        { left: "MTU", right: "Tamaño máximo de paquete del enlace" },
        { left: "QoS", right: "Prioriza tráfico sensible como la voz" }
      ],
      explain: "La DMZ aísla lo que se expone; el port forwarding publica un servicio concreto; un MTU mal ajustado fragmenta o rompe túneles; QoS prioriza voz/video frente a best-effort.",
      try: "En una terminal de Linux o WSL escribe `ip link` y fíjate en el valor mtu de cada interfaz (en Ethernet casi siempre es 1500)."
    },
    {
      id: "netL3d", level: 3, type: "fill",
      q: "Puerto SSH por defecto:",
      answer: "22",
      accept: ["22", "22/tcp", "tcp/22", "tcp 22"],
      explain: "22/tcp SSH. Cambia el puerto solo como capa extra, no como única defensa."
    },
    {
      id: "netL3e", level: 3, type: "order",
      q: "Ordena diagnóstico WAN caída (LAN OK):",
      items: [
        "Verificar enlace físico ONT/módem",
        "Revisar IP WAN/PPP en router",
        "Probar ping a DNS público desde router",
        "Abrir ticket ISP con evidencias"
      ],
      answer: [0, 1, 2, 3],
      explain: "Vas de lo físico a lo lógico: luces y enlace del ONT, luego si el router obtuvo IP WAN o sesión PPPoE, y un ping desde el router a un DNS público. Con esa evidencia abres el ticket al ISP."
    },

    // ——— Nivel 4: Experto (10 preguntas) ———
    {
      id: "netL4a", level: 4, type: "mc",
      q: "Una ACL extended en router típicamente filtra por…",
      options: [
        "IPs, puertos y protocolo",
        "Solo la IP de origen",
        "Solo la MAC de origen",
        "Nombre NetBIOS del host"
      ],
      answer: 0,
      explain: "Una ACL extendida filtra por IP de origen y destino, protocolo y puertos (capas 3 y 4). La estándar solo mira la IP de origen, y ninguna de las dos filtra por nombre NetBIOS."
    },
    {
      id: "netL4b", level: 4, type: "tf",
      q: "QinQ (802.1ad) encapsula VLAN dentro de VLAN para proveedores.",
      answer: true,
      explain: "Verdadero: QinQ (802.1ad) agrega una segunda etiqueta VLAN del proveedor encima de la del cliente, así un carrier transporta las VLAN de muchos clientes sin que choquen sus IDs."
    },
    {
      id: "netL4c", level: 4, type: "scenario",
      q: "Impresoras en VLAN 40; PCs en VLAN 20. ¿Qué permite imprimir?",
      options: [
        "Enrutamiento inter-VLAN + ACL que permita puertos de impresión",
        "Configurar como trunk los puertos de acceso de los PCs",
        "Un servidor DHCP común que dé IPs a las dos VLANs a la vez",
        "Dar a las impresoras una IP de la VLAN 20 sin cambiar su VLAN"
      ],
      answer: 0,
      explain: "Cada VLAN es una red distinta, así que hace falta enrutamiento inter-VLAN (router o switch L3) y una ACL que permita los puertos de impresión (9100, 631, 515). Poner trunk en los PCs no enruta."
    },
    {
      id: "netL4d", level: 4, type: "fill",
      q: "Protocolo para evitar bucles en switches L2 (sigla):",
      answer: "STP",
      accept: [
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
      explain: "STP (Spanning Tree Protocol, 802.1D) bloquea puertos redundantes para evitar bucles de capa 2 y tormentas de broadcast. RSTP (802.1w) converge más rápido y MSTP (802.1s) agrupa VLANs."
    },
    {
      id: "netL4e", level: 4, type: "mc",
      q: "ECMP sirve para…",
      options: [
        "Balancear rutas de igual costo",
        "Etiquetar tramas con el ID de VLAN",
        "Priorizar tráfico de voz",
        "Evitar bucles bloqueando puertos"
      ],
      answer: 0,
      explain: "ECMP (Equal-Cost Multi-Path) usa a la vez varias rutas con el mismo costo hacia un destino y reparte el tráfico entre ellas, normalmente por flujo. No etiqueta VLANs ni evita bucles."
    },
    {
      id: "netL4f", level: 4, type: "match",
      q: "Empareja el protocolo de red con su función:",
      pairs: [
        { left: "OSPF", right: "IGP de estado de enlace" },
        { left: "BGP", right: "Enrutamiento entre AS" },
        { left: "HSRP/VRRP", right: "Gateway redundante" },
        { left: "NAT", right: "Traducción de direcciones" }
      ],
      explain: "OSPF enruta dentro de una organización (IGP de estado de enlace) y BGP entre sistemas autónomos, como entre ISPs. HSRP/VRRP comparten una IP de gateway virtual entre routers y NAT traduce direcciones."
    },
    {
      id: "netL4g", level: 4, type: "order",
      q: "Ordena diseñar Wi‑Fi empresarial básico:",
      items: [
        "Site survey: cobertura y plan de canales",
        "Instalar APs donde indicó el survey (PoE + trunk de VLANs)",
        "Configurar y difundir el SSID WPA2/3-Enterprise (802.1X con RADIUS) en su VLAN",
        "Validar cobertura/roaming y monitorear RF; ajustar potencia/canales"
      ],
      answer: [0, 1, 2, 3],
      explain: "Planear → desplegar → configurar → operar. El survey evita canales solapados; 802.1X/RADIUS evita una PSK única compartida por todos."
    },
    {
      id: "netL4h", level: 4, type: "tf",
      q: "Un puerto SPAN/mirror bloquea el tráfico sospechoso como un IPS en línea.",
      answer: false,
      explain: "Falso: SPAN solo copia tráfico hacia un IDS o analizador; no está en línea y no bloquea nada. Cuida la sobresuscripción del puerto destino."
    },
    {
      id: "netL4i", level: 4, type: "mc",
      q: "DSCP/CoS se relacionan con…",
      options: [
        "Marcado para QoS",
        "Asignación de IPs por DHCP",
        "Cifrado de tramas en Wi‑Fi",
        "Autenticación de puertos 802.1X"
      ],
      answer: 0,
      explain: "DSCP (en el encabezado IP, capa 3) y CoS (en la etiqueta 802.1Q, capa 2) marcan los paquetes para que QoS priorice voz y video sobre el tráfico best-effort. No cifran ni autentican."
    },
    {
      id: "netL4j", level: 4, type: "scenario",
      q: "Usuarios se quejan de lentitud solo a un print server remoto. Herramientas:",
      options: [
        "iperf/mtr/latency, QoS, ver si el path WAN satura",
        "Desfragmentar los discos de los PCs de los usuarios",
        "Ampliar la RAM de los PCs cliente de la oficina",
        "Borrar la caché del navegador en cada equipo"
      ],
      answer: 0,
      explain: "Si solo es lento hacia un sitio remoto, mide la red: mtr para latencia y pérdida, iperf para throughput, y revisa QoS y saturación de la WAN. RAM, discos o caché del navegador no explican eso."
    },

    // ——— Nivel 5: Maestro (10 preguntas) ———
    {
      id: "netL5a", level: 5, type: "mc",
      q: "Un ataque de VLAN hopping (idea) intenta…",
      options: [
        "Alcanzar otra VLAN abusando trunking/doble tagging",
        "Desbordar la tabla CAM del switch con MACs falsas",
        "Suplantar la MAC del gateway con ARP falsos",
        "Agotar el pool DHCP con solicitudes masivas"
      ],
      answer: 0,
      explain: "Desactiva DTP donde no haga falta y no uses como native VLAN una VLAN con usuarios: el doble tagging abusa de ella."
    },
    {
      id: "netL5b", level: 5, type: "scenario",
      q: "BGP neighbor down intermitente. Chequeos:",
      options: [
        "Logs, timers, MTU/MSS, filtros de prefijos, IPsec si aplica",
        "Reiniciar los PCs de los usuarios y vaciar su caché DNS",
        "Desactivar STP en todo el core a ciegas y esperar",
        "Renovar los leases DHCP de toda la red de usuarios"
      ],
      answer: 0,
      explain: "Revisa logs, timers (hold time), filtros de prefijos y MTU/MSS: con túneles como IPsec, un MTU mal ajustado hace que se pierdan los UPDATE grandes y la sesión cae por hold time. Nada de eso está en los PCs."
    },
    {
      id: "netL5c", level: 5, type: "fill",
      q: "Puerto TCP que usa BGP para establecer sesiones entre routers (número):",
      answer: "179",
      accept: ["179", "tcp 179", "tcp/179", "179/tcp"],
      explain: "BGP usa TCP 179. Si un firewall lo bloquea, la sesión con el vecino nunca pasa a Established."
    },
    {
      id: "netL5d", level: 5, type: "mc",
      q: "Anycast DNS significa…",
      options: [
        "Misma IP anunciada desde múltiples sitios; ruteo lleva al más cercano",
        "Un paquete se envía a todos los hosts de la subred a la vez",
        "Un paquete se entrega a todos los miembros suscritos a un grupo",
        "Varios nombres de dominio apuntan a la IP de un solo servidor"
      ],
      answer: 0,
      explain: "Con anycast, servidores en distintos sitios anuncian la misma IP y el ruteo lleva cada consulta al más cercano; si uno cae, el tráfico va a otro. No es broadcast ni multicast: responde un solo servidor."
    },
    {
      id: "netL5e", level: 5, type: "identify",
      q: "Técnica para segmentar microservicios en DC (moderno):",
      options: [
        "Microsegmentación / Zero Trust network policies",
        "Hubs 10BASE-T en cascada entre racks",
        "Una única VLAN plana compartida por todo el DC",
        "Token Ring con una MAU central por rack"
      ],
      answer: 0,
      explain: "La microsegmentación aplica reglas por carga de trabajo o identidad, no por VLAN, así cada microservicio solo habla con lo que necesita (Zero Trust). Una VLAN plana deja que todo hable con todo."
    },
    {
      id: "netL5f", level: 5, type: "order",
      q: "Ordena troubleshooting \"no ruta a impresora VLAN\":",
      items: [
        "Verificar IP/máscara/gateway del cliente",
        "Ping al gateway del cliente",
        "Traceroute a la impresora para ver en qué salto se corta",
        "Donde se corta: revisar ACL/firewall inter-VLAN y ARP/MAC de la impresora"
      ],
      answer: [0, 1, 2, 3],
      explain: "Del cliente hacia afuera: configuración local → primer salto (gateway) → ruta completa → política (ACL) y L2 (ARP/MAC) en el punto donde se corta."
    },
    {
      id: "netL5g", level: 5, type: "tf",
      q: "BFD reemplaza al protocolo de enrutamiento y anuncia las rutas.",
      answer: false,
      explain: "Falso: BFD no anuncia rutas; solo detecta rápido los fallos de forwarding y avisa a OSPF/BGP para que reconverjan antes que con sus hellos."
    },
    {
      id: "netL5h", level: 5, type: "scenario",
      q: "Captura muestra TCP retransmissions altos al print server. Implica:",
      options: [
        "Congestión/pérdida en el path; revisar WAN/QoS/buffers",
        "Que el driver PCL del cliente está mal instalado",
        "Que el servidor DNS tarda en responder a las consultas",
        "Que el certificado TLS del print server caducó"
      ],
      answer: 0,
      explain: "Muchas retransmisiones TCP indican segmentos perdidos o que llegan tarde: congestión en la WAN, buffers llenos, QoS mal puesta o un extremo saturado. Un driver o el DNS no explican eso."
    },
    {
      id: "netL5i", level: 5, type: "mc",
      q: "VXLAN se usa para…",
      options: [
        "Overlay L2 sobre L3 en data centers",
        "Cifrar enlaces WAN entre sucursales",
        "Agregar varios puertos en un enlace lógico",
        "Evitar bucles L2 bloqueando puertos"
      ],
      answer: 0,
      explain: "VXLAN encapsula tramas de capa 2 en UDP (puerto 4789) para extender segmentos L2 sobre una red IP (underlay) en data centers, con unos 16 millones de IDs (VNI) en vez de 4094 VLANs."
    },
    {
      id: "netL5j", level: 5, type: "match",
      q: "Empareja herramienta:",
      pairs: [
        { left: "Wireshark", right: "Análisis de paquetes" },
        { left: "Nmap", right: "Escaneo de puertos/hosts" },
        { left: "mtr", right: "Ruta + pérdida continua" },
        { left: "iperf3", right: "Medir throughput" }
      ],
      explain: "Cada una responde algo distinto: Wireshark qué paquetes pasan, Nmap qué hosts y puertos responden, mtr por dónde va la ruta y en qué salto se pierde, e iperf3 cuánto ancho de banda real hay."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (6 preguntas) ———
  boss: [
    {
      id: "netB1", level: 5, type: "scenario",
      q: "BOSS: Sucursal sin Internet. LAN interna OK (ping gateway). WAN IP del router 0.0.0.0. ¿Qué revisar?",
      options: [
        "Enlace ISP/DHCP WAN/PPPoE/credenciales y cable ONT",
        "El servidor DHCP de la LAN y los leases de los PCs",
        "Las VLAN de acceso y el cableado de los switches internos",
        "La caché DNS de cada PC y el archivo hosts local"
      ],
      answer: 0,
      explain: "Gateway LAN responde pero no hay WAN: problema de borde/ISP."
    },
    {
      id: "netB2", level: 5, type: "mc",
      q: "BOSS: Tras VPN, el usuario llega a servidores pero navega lento. Split tunnel desactivado. Explicación:",
      options: [
        "Full tunnel manda también Internet por el datacenter",
        "El cifrado VPN reduce a la mitad la velocidad del Wi‑Fi",
        "Sin split tunnel el tráfico se cifra dos veces",
        "El cable de red local no soporta tráfico cifrado por VPN"
      ],
      answer: 0,
      explain: "En full tunnel (split desactivado) la navegación a Internet también viaja por la VPN y sale por el datacenter, así que su enlace y su firewall limitan la velocidad. No hay doble cifrado."
    },
    {
      id: "netB3", level: 5, type: "order",
      q: "BOSS: DNS interno no resuelve app.corp. Ordena:",
      items: [
        "Reproducir: nslookup app.corp contra el DNS corporativo",
        "Acotar: ¿falla también desde otro cliente/segmento?",
        "Si falla para todos: revisar zona/registro en el DNS server",
        "Si el nombre no está en una zona local (híbrido): revisar forwarders"
      ],
      answer: [0, 1, 2, 3],
      explain: "Reproduce el fallo, acota el alcance (un cliente vs. todos), revisa la zona/registro en el servidor y, si el nombre se resuelve fuera (híbrido), los forwarders. Así separas fallo de cliente vs zona vs forwarder."
    },
    {
      id: "netB4", level: 5, type: "mc",
      q: "BOSS: Un cliente de la VLAN 20 no puede imprimir en la impresora de la VLAN 30. Solo hay un switch L2. ¿Qué falta?",
      options: [
        "Enrutamiento entre VLANs (L3) + ACLs que lo permitan",
        "Un servidor DHCP compartido para las dos VLANs",
        "Activar PoE en el puerto de la impresora de la VLAN 30",
        "Desactivar STP en el switch para que las VLAN se vean"
      ],
      answer: 0,
      explain: "VLANs distintas necesitan router/SVI y reglas. Un L2 puro no enruta."
    },
    {
      id: "netB5", level: 5, type: "fill",
      q: "BOSS: Puerto UDP estándar (IANA) de VXLAN (número):",
      answer: "4789",
      accept: ["4789", "udp 4789", "udp/4789", "4789/udp"],
      explain: "VXLAN encapsula tramas L2 en UDP 4789 (IANA). Ojo: Linux usa 8472 por defecto si no indicas dstport; si el puerto no coincide en ambos extremos, el overlay no levanta."
    },
    {
      id: "netB6", level: 5, type: "tf",
      q: "BOSS: Un ping fallido no siempre significa que el host esté apagado (ICMP puede estar filtrado).",
      answer: true,
      explain: "Complementa con prueba de puerto de aplicación (443, 22, 9100…).",
      try: "En PowerShell escribe `Test-NetConnection google.com` y luego `Test-NetConnection google.com -Port 443`; compara PingSucceeded con TcpTestSucceeded."
    }
  ]
});
