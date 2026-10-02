/**
 * Tech Quest — Mundo Hardware / ensamblado
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "hardware",
  name: "Hardware / ensamblado",
  icon: "🔧",
  color: "#ffa64d",
  description: "CPU, RAM, discos, BIOS/UEFI, fuentes, puertos y fallos.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "hw01", level: 1, type: "mc",
      q: "La CPU es…",
      options: [
        "El procesador principal del sistema",
        "La memoria principal donde se cargan los programas",
        "El chip que genera la imagen para el monitor",
        "La placa donde se conectan todos los componentes"
      ],
      answer: 0,
      explain: "La CPU (Central Processing Unit) es el procesador: ejecuta las instrucciones de los programas. No es la RAM, que guarda datos temporalmente, ni la tarjeta de video ni la placa base."
    },
    {
      id: "hw02", level: 1, type: "tf",
      q: "La RAM conserva los datos aunque apagues el equipo.",
      answer: false,
      explain: "Falso: la RAM es volátil y se borra al apagar. Lo permanente va en el disco o SSD."
    },
    {
      id: "hw03", level: 1, type: "mc",
      q: "SSD frente a HDD típico:",
      options: [
        "SSD más rápido y sin platos mecánicos",
        "HDD más rápido porque sus platos giran a 7200 rpm",
        "SSD más lento, pero con platos más resistentes",
        "Ambos iguales; solo cambia la capacidad máxima"
      ],
      answer: 0,
      explain: "El SSD guarda datos en memoria flash, sin piezas móviles, por eso accede mucho más rápido. El HDD usa platos magnéticos que giran (por ejemplo a 7200 rpm) y un cabezal que se mueve.",
      try: "En PowerShell escribe `Get-PhysicalDisk` y revisa la columna MediaType: dice si cada disco es SSD o HDD (si sale Unspecified, Windows no pudo identificarlo)."
    },
    {
      id: "hw04", level: 1, type: "identify",
      q: "Conector de video digital común en monitores modernos:",
      options: [
        "HDMI / DisplayPort",
        "VGA / D-Sub 15",
        "Componente YPbPr / RCA",
        "S-Video (mini-DIN)"
      ],
      answer: 0,
      explain: "HDMI y DisplayPort transmiten video digital (y también audio) y son el estándar en monitores actuales. VGA, componente y S-Video son conexiones analógicas antiguas."
    },
    {
      id: "hw05", level: 1, type: "fill",
      q: "Sigla de la memoria de acceso aleatorio:",
      answer: "RAM",
      accept: ["RAM", "ram"],
      explain: "RAM significa Random Access Memory: la memoria de trabajo donde se cargan los programas abiertos. Es muy rápida pero volátil, se borra al apagar el equipo."
    },
    {
      id: "hw06", level: 1, type: "mc",
      q: "La PSU (fuente) proporciona…",
      options: [
        "Energía eléctrica convertida a las tensiones del PC",
        "Energía de respaldo con batería durante los cortes",
        "La señal de reloj que usan la CPU y la memoria RAM",
        "Refrigeración directa al procesador con su ventilador"
      ],
      answer: 0,
      explain: "La PSU convierte la corriente alterna del contacto en corriente directa de 12 V, 5 V y 3.3 V para los componentes. Dar energía de respaldo con batería en un corte es trabajo de un UPS."
    },
    {
      id: "hw07", level: 1, type: "tf",
      q: "Antes de tocar componentes, conviene descargar electricidad estática (ESD).",
      answer: true,
      explain: "Verdadero: una descarga electrostática que ni sientes puede dañar chips. Usa pulsera antiestática o toca una parte metálica sin pintar del chasis antes de manipular componentes."
    },
    {
      id: "hw08", level: 1, type: "scenario",
      q: "PC no da imagen pero ventiladores giran. Chequeo básico:",
      options: [
        "Probar otro cable/monitor, RAM reseateada, GPU",
        "Reinstalar Windows desde un USB de instalación",
        "Actualizar el driver de video desde Windows",
        "Desfragmentar el disco y liberar espacio"
      ],
      answer: 0,
      explain: "Si hay energía pero no imagen, revisa lo simple primero: cable y entrada del monitor, luego reasienta la RAM y la tarjeta de video. Reinstalar Windows no sirve: el fallo ocurre antes de cargarlo."
    },
    {
      id: "hw09", level: 1, type: "mc",
      q: "USB-C puede transportar…",
      options: [
        "Datos y, según el dispositivo, también video y energía",
        "Solo datos a USB 2.0; nunca video ni carga de energía",
        "Solo carga de energía; los datos van por otro cable",
        "Solo video DisplayPort; requiere adaptador para datos"
      ],
      answer: 0,
      explain: "USB-C es la forma del conector: según el dispositivo y el cable puede llevar datos, video (DisplayPort Alt Mode) y carga (USB Power Delivery). No todos los puertos USB-C soportan todo."
    },
    {
      id: "hw10", level: 1, type: "order",
      q: "Ordena ensamblado básico seguro:",
      items: [
        "Preparar mesa antiestática / desconectar corriente",
        "Instalar CPU en el socket (sin forzar pines)",
        "Instalar RAM/M.2 y luego pasta térmica + cooler",
        "Conectar cables PSU y probar POST"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sigue el manual del board; no fuerces pines. Pon RAM/M.2 antes del cooler si este tapa los slots."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "hw11", level: 2, type: "mc",
      q: "UEFI es…",
      options: [
        "Firmware moderno que inicializa el hardware y arranca el SO",
        "Esquema de particiones que sustituye a MBR en discos grandes",
        "Sistema de archivos moderno que reemplaza a FAT32 en discos",
        "Chip de seguridad que guarda las claves de cifrado (TPM)"
      ],
      answer: 0,
      explain: "UEFI es el firmware que reemplazó al BIOS: inicializa el hardware y arranca el sistema. No es un esquema de particiones (ese es GPT, que UEFI usa) ni un sistema de archivos; ofrece Secure Boot.",
      try: "En cmd escribe `msinfo32` y en Resumen del sistema busca la línea Modo de BIOS: dirá UEFI o Heredado (legacy)."
    },
    {
      id: "hw12", level: 2, type: "scenario",
      q: "PC pita en POST y no arranca. Los beeps suelen indicar…",
      options: [
        "Error de hardware según código del fabricante (a menudo RAM/GPU)",
        "Virus en el sector de arranque que bloquea el acceso al disco",
        "Sistema operativo dañado que requiere reinstalación completa",
        "Falta de conexión a Internet para validar la licencia"
      ],
      answer: 0,
      explain: "Los pitidos del POST son códigos de error de hardware que cambian según el fabricante del firmware; con frecuencia apuntan a RAM o video. Suenan antes de cargar el sistema, así que no es Windows."
    },
    {
      id: "hw13", level: 2, type: "mc",
      q: "NVMe se conecta típicamente por…",
      options: ["Slot M.2 PCIe", "Puerto SATA III", "Conector IDE/PATA", "eSATA externo"],
      answer: 0,
      explain: "NVMe es un protocolo que usa el bus PCIe, por eso estos SSD suelen ir en un slot M.2 con PCIe y son mucho más rápidos que los SSD SATA, limitados a unos 600 MB/s."
    },
    {
      id: "hw14", level: 2, type: "tf",
      q: "Al mezclar módulos de RAM de distinta velocidad, todos funcionan a la velocidad del más rápido.",
      answer: false,
      explain: "Falso: normalmente todos bajan a la velocidad del más lento. Lo ideal es un kit de módulos iguales."
    },
    {
      id: "hw15", level: 2, type: "fill",
      q: "Sigla del firmware de arranque clásico anterior a UEFI:",
      answer: "BIOS",
      accept: ["BIOS", "bios"],
      explain: "BIOS (Basic Input/Output System) es el firmware clásico que revisa el hardware con el POST y arranca el sistema. UEFI lo reemplazó, aunque mucha gente sigue llamando BIOS al menú de configuración."
    },
    {
      id: "hw16", level: 2, type: "match",
      q: "Empareja puerto:",
      pairs: [
        { left: "RJ-45", right: "Red Ethernet" },
        { left: "SATA", right: "Discos HDD/SSD y unidades ópticas" },
        { left: "PCIe", right: "Slots de expansión (GPU, etc.)" },
        { left: "Socket CPU", right: "Encaje del procesador" }
      ],
      explain: "RJ-45 es el conector del cable de red, SATA conecta discos y unidades ópticas, PCIe es la ranura para tarjetas como la de video y el socket es donde se asienta el procesador."
    },
    {
      id: "hw17", level: 2, type: "scenario",
      q: "Fuente con olor a quemado y PC muerto. Acción:",
      options: [
        "No encender; reemplazar PSU y revisar daños",
        "Seguir encendiéndolo hasta que arranque de nuevo",
        "Actualizar la BIOS para que reconozca la fuente",
        "Rociar la fuente con aire comprimido y reintentar"
      ],
      answer: 0,
      explain: "El olor a quemado indica una falla eléctrica: no lo vuelvas a encender, porque una fuente dañada puede arruinar otras piezas. Cambia la PSU y revisa la placa y los cables por daños."
    },
    {
      id: "hw18", level: 2, type: "mc",
      q: "Thermal paste se usa entre…",
      options: [
        "CPU (IHS) y el disipador",
        "Disipador y su ventilador",
        "Módulo RAM y su ranura DIMM",
        "Fuente (PSU) y el chasis"
      ],
      answer: 0,
      explain: "La pasta térmica rellena las microimperfecciones entre la tapa del CPU (IHS) y la base del disipador para que el calor pase mejor. Basta una cantidad pequeña; poner de más no mejora nada."
    },
    {
      id: "hw19", level: 2, type: "order",
      q: "Ordena upgrade de RAM en laptop (genérico):",
      items: [
        "Apagar y retirar batería si es posible",
        "Abrir tapa de servicio",
        "Insertar SODIMM en ángulo/presión según diseño",
        "Encender y verificar en el SO"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero quitas toda energía para no dañar nada, luego abres la tapa, insertas el SODIMM según el diseño del slot y al final verificas que el sistema reconozca la RAM. En algunas laptops va soldada."
    },
    {
      id: "hw20", level: 2, type: "tf",
      q: "Secure Boot ayuda a impedir bootloaders no firmados.",
      answer: true,
      explain: "Verdadero: con Secure Boot, el firmware UEFI solo carga bootloaders firmados con claves de confianza, lo que ayuda a bloquear bootkits que intentan arrancar antes que el sistema operativo.",
      try: "En cmd escribe `msinfo32` y en Resumen del sistema busca Estado de arranque seguro: verás si Secure Boot está activado en tu equipo."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "hw21", level: 3, type: "mc",
      q: "Una PSU 80 Plus Bronze/Gold indica…",
      options: [
        "Eficiencia energética certificada bajo cargas dadas",
        "Potencia máxima en vatios que entrega la fuente",
        "Nivel de ruido del ventilador de la fuente en dB",
        "Años de garantía que ofrece el fabricante de la PSU"
      ],
      answer: 0,
      explain: "Más eficiencia = menos calor/consumo, no siempre más 'potencia pico mágica'."
    },
    {
      id: "hw22", level: 3, type: "scenario",
      q: "Servidor con ECC RAM reporta corrected errors crecientes. Implica:",
      options: [
        "Posible módulo/DIMM degradándose; planear reemplazo",
        "Funcionamiento normal; ECC los corrige y no hace falta nada",
        "Fallo del disco duro; hay que reconstruir el RAID",
        "Virus en memoria; reinstalar el sistema operativo"
      ],
      answer: 0,
      explain: "ECC corrige esos errores, pero si van en aumento, el DIMM probablemente se está degradando y conviene planear su reemplazo."
    },
    {
      id: "hw23", level: 3, type: "mc",
      q: "El chipset/VRM sobrecalentado puede causar…",
      options: [
        "Inestabilidad, throttling o apagados",
        "Más rendimiento por mayor frecuencia de la CPU",
        "Pérdida de la configuración IP de la red",
        "Borrado de la clave de licencia de Windows"
      ],
      answer: 0,
      explain: "Buena refrigeración y pasta/pads importan en boards exigentes."
    },
    {
      id: "hw24", level: 3, type: "fill",
      q: "Protocolo diseñado para SSD flash que corre sobre PCIe en slots M.2 (sigla de 4 letras):",
      answer: "NVMe",
      accept: ["NVMe", "nvme", "NVM Express"],
      explain: "NVM Express: protocolo para flash sobre el bus PCIe (un slot M.2 también puede ser SATA)."
    },
    {
      id: "hw25", level: 3, type: "match",
      q: "Empareja síntoma-causa frecuente:",
      pairs: [
        { left: "No POST / beeps", right: "RAM/CPU/GPU mal asentados" },
        { left: "Se apaga bajo carga", right: "PSU insuficiente/falla" },
        { left: "BSOD memoria", right: "RAM defectuosa/XMP inestable" },
        { left: "No detecta el SSD nuevo", right: "Modo M.2/BIOS o slot deshabilitado" }
      ],
      explain: "Piensa por etapa: sin POST, sospecha de piezas mal asentadas; si se apaga bajo carga, de la fuente; si hay pantallazos azules de memoria, de RAM defectuosa o XMP inestable; y si no ve el SSD, del modo M.2 en BIOS."
    },
    {
      id: "hw26", level: 3, type: "order",
      q: "Ordena diagnóstico 'no enciende' (0 LEDs):",
      items: [
        "Verificar cable/corriente/switch PSU",
        "Probar contacto y cable conocidos buenos",
        "Puenteo de power switch / PSU tester",
        "Probar con PSU conocida buena o configuración mínima (CPU/RAM)"
      ],
      answer: [0, 1, 2, 3],
      explain: "Va de lo simple a lo complejo: cable, contacto y switch de la PSU; luego un contacto y cable que sepas que sirven; después puentear el botón o usar un probador de PSU; y al final, PSU buena o solo CPU y RAM."
    },
    {
      id: "hw27", level: 3, type: "tf",
      q: "Si se va la luz durante una actualización de BIOS/UEFI, no pasa nada: se reanuda sola.",
      answer: false,
      explain: "Falso: interrumpir el flasheo puede dejar la placa inservible (brick). Hazlo con energía estable (UPS) y el archivo correcto para tu modelo; algunas placas tienen BIOS dual o recuperación."
    },
    {
      id: "hw28", level: 3, type: "scenario",
      q: "Tras agregar GPU potente, el PC reinicia al jugar. Causa probable:",
      options: [
        "PSU al límite / cables PCIe de potencia insuficientes",
        "Monitor con frecuencia de refresco incompatible",
        "Driver de audio HDMI desactualizado en Windows",
        "Poca memoria de vídeo para la resolución elegida"
      ],
      answer: 0,
      explain: "Revisa wattage, rieles y conectores nativos (evitar daisy-chain dudoso)."
    },
    {
      id: "hw29", level: 3, type: "mc",
      q: "AHCI vs RAID en SATA (idea):",
      options: [
        "AHCI para discos individuales típicos; RAID según arreglo",
        "AHCI sirve solo para HDD y RAID solo para unidades SSD",
        "RAID es siempre más rápido; AHCI está obsoleto",
        "AHCI une varios discos en uno; RAID es para un solo disco"
      ],
      answer: 0,
      explain: "AHCI es el modo normal para discos SATA individuales, sean HDD o SSD; RAID se usa al combinar varios discos en un arreglo. Cambiar el modo después de instalar Windows puede impedir que arranque."
    },
    {
      id: "hw30", level: 3, type: "identify",
      q: "Herramienta para probar memoria RAM en Windows (incluida):",
      options: [
        "Diagnóstico de memoria de Windows / mdsched",
        "Monitor de recursos de Windows / resmon",
        "Comprobación de errores de disco / chkdsk",
        "Monitor de rendimiento / perfmon"
      ],
      answer: 0,
      explain: "El Diagnóstico de memoria de Windows (mdsched.exe) reinicia el equipo y prueba la RAM antes de cargar el sistema. resmon y perfmon miden uso y chkdsk revisa discos. MemTest86 es más exhaustivo."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "hwL4a", level: 4, type: "mc",
      q: "IPMI/iLO/iDRAC permiten…",
      options: [
        "Gestionar servidor out-of-band (consola remota, sensores)",
        "Balancear carga entre los servidores web del clúster",
        "Virtualizar el servidor en varias máquinas invitadas",
        "Cifrar los discos del servidor con claves del TPM"
      ],
      answer: 0,
      explain: "IPMI, iLO (HPE) e iDRAC (Dell) dan gestión out-of-band: aun con el sistema caído puedes ver la consola, revisar sensores y encender el servidor. Suelen ir en una red de administración separada."
    },
    {
      id: "hwL4b", level: 4, type: "tf",
      q: "RAID 5 tolera la falla de dos discos a la vez.",
      answer: false,
      explain: "Falso: RAID 5 tolera un disco y RAID 6 tolera dos. Si falla un segundo disco durante el rebuild de un RAID 5, se pierde el arreglo."
    },
    {
      id: "hwL4c", level: 4, type: "scenario",
      q: "Servidor reporta PSU redundancy lost. Acción:",
      options: [
        "Reemplazar PSU fallida; verificar cableado y carga",
        "Ignorarlo: con una sola PSU funciona sin riesgo",
        "Apagar el servidor y reinstalar el sistema operativo",
        "Retirar discos para bajar el consumo de energía"
      ],
      answer: 0,
      explain: "Sin redundancia, el servidor sigue con una sola fuente y ya no tolera otra falla. Revisa si falló la PSU, su cable o su circuito, reemplázala pronto y confirma que la carga no exceda una sola fuente."
    },
    {
      id: "hwL4d", level: 4, type: "fill",
      q: "Bus de expansión dominante para GPUs (sigla):",
      answer: "PCIe",
      accept: ["PCIe", "PCI-E", "pci-e", "PCI Express", "PCI-Express"],
      explain: "PCIe (PCI Express) es el bus de expansión en serie donde van tarjetas de video, de red y SSD NVMe. Usa carriles (x1, x4, x16) y las GPU suelen ir en el slot x16."
    },
    {
      id: "hwL4e", level: 4, type: "mc",
      q: "ECC RAM detecta/corrige…",
      options: [
        "Errores de memoria de bits",
        "Sectores defectuosos del disco duro",
        "Errores de transmisión en la red Ethernet",
        "Fallos de temperatura del procesador"
      ],
      answer: 0,
      explain: "ECC agrega bits de verificación para detectar y corregir errores de memoria, normalmente corrige los de un bit y detecta los de dos. Por eso es estándar en servidores; no tiene que ver con discos ni red."
    },
    {
      id: "hwL4f", level: 4, type: "match",
      q: "Empareja el término de almacenamiento o memoria con su descripción:",
      pairs: [
        { left: "SAS", right: "Disco enterprise dual-port típico" },
        { left: "SATA", right: "Interfaz disco común consumer/server" },
        { left: "M.2", right: "Factor de forma (NVMe/SATA)" },
        { left: "RDIMM", right: "DIMM registrado para servers" }
      ],
      explain: "SAS es la interfaz enterprise con doble puerto para redundancia, SATA la común en PCs y servidores básicos, M.2 un factor de forma que puede ser NVMe o SATA, y RDIMM memoria registrada para servidores."
    },
    {
      id: "hwL4g", level: 4, type: "order",
      q: "Ordena RMA de disco en RAID:",
      items: [
        "Identificar disco fallido (beacon)",
        "Con el disco ya localizado, confirmar backup y estado del array antes de extraerlo",
        "Sustituir el disco fallido por uno compatible",
        "Monitorear rebuild"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero ubicas el disco fallido con su LED (beacon), confirmas backup y estado del arreglo para no sacar uno sano, cambias el disco por uno compatible y vigilas el rebuild hasta que termine."
    },
    {
      id: "hwL4h", level: 4, type: "tf",
      q: "Undervolting cuidadoso puede bajar temperatura; overclock inestable causa crashes.",
      answer: true,
      explain: "Verdadero: bajar el voltaje con cuidado reduce calor y consumo, y un overclock inestable provoca cuelgues y pantallazos. En servidores se prefieren valores de fábrica y buena refrigeración."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "hwL5a", level: 5, type: "mc",
      q: "Un U.2/U.3 NVMe en server se usa para…",
      options: [
        "Almacenamiento rápido hot-swap en bahías",
        "Conectar tarjetas de red de 100 GbE al servidor",
        "Refrigerar la CPU con un circuito líquido cerrado",
        "Gestionar el servidor por consola remota fuera de banda"
      ],
      answer: 0,
      explain: "U.2 y U.3 son conectores para SSD NVMe de 2.5 pulgadas que van en las bahías frontales del servidor y, si la plataforma lo soporta, se cambian en caliente (hot-swap) sin abrir el equipo."
    },
    {
      id: "hwL5b", level: 5, type: "scenario",
      q: "POST pasa pero no hay video en iGPU tras meter GPU. Chequeos:",
      options: [
        "Cable al GPU correcto, PSU PCIe, monitor input, reseat",
        "Reinstalar Windows antes de revisar cualquier cable",
        "Borrar la caché DNS y renovar la IP del equipo",
        "Cambiar la pasta térmica de la CPU y su disipador"
      ],
      answer: 0,
      explain: "Con una GPU dedicada, muchas placas desactivan el video integrado, así que conecta el monitor a la tarjeta. Revisa también los cables de energía PCIe, la entrada del monitor y que la tarjeta esté bien asentada."
    },
    {
      id: "hwL5c", level: 5, type: "fill",
      q: "Interfaz de gestión remota de los servidores Dell (sigla de 5 letras):",
      answer: "iDRAC",
      accept: ["iDRAC", "idrac"],
      explain: "iDRAC (Integrated Dell Remote Access Controller) es la gestión out-of-band de los servidores Dell: consola remota, sensores y encendido aunque el sistema no arranque. En HPE el equivalente es iLO."
    },
    {
      id: "hwL5d", level: 5, type: "mc",
      q: "CXL (idea emergente) busca…",
      options: [
        "Mejorar coherencia/expansión de memoria entre dispositivos",
        "Sustituir a Ethernet como red entre los centros de datos",
        "Reemplazar SATA como interfaz de discos mecánicos",
        "Estandarizar conectores de alimentación de las GPU"
      ],
      answer: 0,
      explain: "CXL (Compute Express Link) funciona sobre la capa física de PCIe y permite expandir y compartir memoria con coherencia entre CPU, aceleradores y módulos de memoria. Se usa sobre todo en data centers."
    },
    {
      id: "hwL5e", level: 5, type: "identify",
      q: "Conector de alimentación CPU común de 8 pines:",
      options: [
        "EPS 8-pin (ATX12V)",
        "PCIe 8-pin (6+2)",
        "ATX 24-pin principal",
        "SATA de 15 pines"
      ],
      answer: 0,
      explain: "El EPS de 8 pines (ATX12V) alimenta al CPU y va cerca del socket. El PCIe de 8 pines (6+2) es para la GPU y tiene otra distribución: forzarlo en el lugar equivocado puede dañar el equipo."
    },
    {
      id: "hwL5f", level: 5, type: "order",
      q: "Ordena diagnóstico memoria ECC con correctables altos:",
      items: [
        "Revisar logs BMC/OS",
        "Reseat/limpiar slots",
        "Probar módulo en otro slot",
        "Reemplazar DIMM"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero confirmas en los logs del BMC o del sistema qué DIMM falla, luego reasientas y limpias el slot, después mueves el módulo para ver si el error lo sigue a él o se queda en el slot, y al final lo reemplazas."
    },
    {
      id: "hwL5g", level: 5, type: "tf",
      q: "Mezclar firmware de backplane incorrecto puede hacer desaparecer discos.",
      answer: true,
      explain: "Verdadero: si el firmware del backplane o de la controladora no es el que pide el fabricante, los discos pueden no detectarse o desconectarse. Sigue la matriz de compatibilidad del vendor."
    },
    {
      id: "hwL5h", level: 5, type: "scenario",
      q: "El clúster pierde el quórum al caer un solo nodo. Un diseño adecuado incluye…",
      options: [
        "Quórum/witness y fencing correctos",
        "Un número par de nodos sin testigo",
        "Desactivar el heartbeat entre nodos",
        "Un solo switch sin redundancia"
      ],
      answer: 0,
      explain: "Un testigo (witness) desempata el quórum y el fencing aísla al nodo que falla para evitar el split-brain. Con dos nodos sin testigo, la caída de uno deja al otro sin mayoría y el clúster se detiene."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "hwB1", level: 5, type: "scenario",
      q: "BOSS: Flota de laptops con hinchazón de batería. Acción correcta:",
      options: [
        "Retirar de servicio, no cargar, reemplazo seguro según política",
        "Seguir usándolas conectadas al cargador hasta que fallen",
        "Perforar la batería para liberar el gas acumulado en su interior",
        "Enfriarlas en el congelador y volver a cargarlas"
      ],
      answer: 0,
      explain: "Una batería hinchada puede incendiarse: deja de cargarla y usarla, retírala del servicio y entrégala para reemplazo y desecho según el protocolo de baterías dañadas. Nunca la perfores ni la congeles."
    },
    {
      id: "hwB2", level: 5, type: "mc",
      q: "BOSS: Servidor no arranca tras corte; PSU clickea. Siguiente:",
      options: [
        "Probar PSU conocida buena / rails; revisar shorts",
        "Reinstalar el sistema operativo desde la ISO",
        "Actualizar la BIOS por red antes de probar nada",
        "Cambiar la VLAN del puerto de gestión del servidor"
      ],
      answer: 0,
      explain: "Un clic repetitivo suele ser la protección de la PSU cortando por un corto o una falla. Prueba con una fuente que sepas que funciona y busca cortos; reinstalar o actualizar no sirve sin energía estable."
    },
    {
      id: "hwB3", level: 5, type: "order",
      q: "BOSS: Upgrade de almacenamiento con clonación:",
      items: [
        "Imagen/clon del disco viejo al nuevo",
        "Verificar boot en firmware (orden NVMe/SATA)",
        "Tras arrancar desde el disco nuevo, confirmar datos y SMART",
        "Ya validado, retirar o reutilizar (borrar) el disco viejo"
      ],
      answer: [0, 1, 2, 3],
      explain: "El orden de arranque en el firmware suele ser el paso que falta."
    },
    {
      id: "hwB4", level: 5, type: "tf",
      q: "BOSS: Mezclar conectores PCIe de potencia de baja calidad puede dañar la GPU.",
      answer: true,
      explain: "Usa cables del fabricante de la PSU / especificación adecuada."
    },
    {
      id: "hwB5", level: 5, type: "fill",
      q: "BOSS: Firmware de placa base moderno (sigla de 4 letras):",
      answer: "UEFI",
      accept: ["UEFI", "uefi"],
      explain: "UEFI (Unified Extensible Firmware Interface) es el firmware moderno que reemplazó al BIOS: arranca desde discos GPT, ofrece Secure Boot y suele tener una interfaz gráfica con mouse."
    }
  ]
});
