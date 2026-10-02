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
      explain: "Central Processing Unit: ejecuta instrucciones."
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
      explain: "SSD usa memoria flash; HDD platos magnéticos."
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
      explain: "HDMI y DP dominan; VGA es analógico legacy."
    },
    {
      id: "hw05", level: 1, type: "fill",
      q: "Sigla de la memoria de acceso aleatorio:",
      answer: "RAM",
      accept: ["RAM", "ram"],
      explain: "Random Access Memory."
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
      explain: "Elige wattage y certificaciones adecuadas."
    },
    {
      id: "hw07", level: 1, type: "tf",
      q: "Antes de tocar componentes, conviene descargar electricidad estática (ESD).",
      answer: true,
      explain: "Pulsera/antistática y tocar chasis metálico ayudan."
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
      explain: "Descarta display y memoria/GPU primero."
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
      explain: "No todos los USB-C son iguales (Alt Mode/PD)."
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
      explain: "Ofrece GUI, Secure Boot, GPT, etc."
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
      explain: "Consulta la tabla de beep codes de la motherboard."
    },
    {
      id: "hw13", level: 2, type: "mc",
      q: "NVMe se conecta típicamente por…",
      options: ["Slot M.2 PCIe", "Puerto SATA III", "Conector IDE/PATA", "eSATA externo"],
      answer: 0,
      explain: "NVMe es mucho más rápido que SATA SSD en muchos casos."
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
      explain: "Basic Input/Output System."
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
      explain: "Identificar conectores evita daños."
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
      explain: "Una PSU fallida puede dañar otros componentes."
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
      explain: "Mejora transferencia térmica; cantidad correcta importa."
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
      explain: "Consulta el manual: algunas RAM van soldadas."
    },
    {
      id: "hw20", level: 2, type: "tf",
      q: "Secure Boot ayuda a impedir bootloaders no firmados.",
      answer: true,
      explain: "Parte de la cadena de confianza UEFI."
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
      explain: "Divide por etapa: POST vs OS vs carga."
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
      explain: "Descarta alimentación antes de condenar el board."
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
      explain: "Cambiar modo tras instalar el SO puede impedir el boot."
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
      explain: "También MemTest86 en entornos más exhaustivos."
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
      explain: "Red de management separada."
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
      explain: "Redundancia N+1 existe para usarse."
    },
    {
      id: "hwL4d", level: 4, type: "fill",
      q: "Bus de expansión dominante para GPUs (sigla):",
      answer: "PCIe",
      accept: ["PCIe", "PCI-E", "pci-e", "PCI Express", "PCI-Express"],
      explain: "Peripheral Component Interconnect Express."
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
      explain: "Estándar en servers."
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
      explain: "Almacenamiento/memoria."
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
      explain: "No saques el disco equivocado."
    },
    {
      id: "hwL4h", level: 4, type: "tf",
      q: "Undervolting cuidadoso puede bajar temperatura; overclock inestable causa crashes.",
      answer: true,
      explain: "En enterprise suele preferirse stock + buen cooling."
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
      explain: "Alternativa a muchos M.2 internos."
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
      explain: "Muchas boards desactivan salida onboard."
    },
    {
      id: "hwL5c", level: 5, type: "fill",
      q: "Interfaz de gestión remota de los servidores Dell (sigla de 5 letras):",
      answer: "iDRAC",
      accept: ["iDRAC", "idrac"],
      explain: "Integrated Dell Remote Access Controller."
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
      explain: "Tendencia en data centers modernos."
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
      explain: "No confundir con PCIe 8-pin de GPU."
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
      explain: "Aísla slot vs módulo."
    },
    {
      id: "hwL5g", level: 5, type: "tf",
      q: "Mezclar firmware de backplane incorrecto puede hacer desaparecer discos.",
      answer: true,
      explain: "Sigue matriz de compatibilidad del vendor."
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
      explain: "Evita split-brain."
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
      explain: "Riesgo de incendio: protocolo de baterías dañadas."
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
      explain: "Click = protección PSU o cortocircuito."
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
      explain: "Unified Extensible Firmware Interface."
    }
  ]
});
