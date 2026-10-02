/**
 * Tech Quest — Mundo Cloud / servicios
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "cloud",
  name: "Cloud / servicios",
  icon: "☁️",
  color: "#7ec8ff",
  description: "Nube, SaaS/IaaS/PaaS, almacenamiento, backups y sync.",

  questions: [
    // ——— Nivel 1: Básico (8 preguntas) ———
    {
      id: "cl01", level: 1, type: "mc",
      q: "La \"nube\" en IT suele significar…",
      options: [
        "Servicios bajo demanda por Internet (cómputo/almacenamiento/apps)",
        "Servidores propios en tu oficina, mantenidos por tu equipo",
        "Una red local (LAN) para compartir archivos en la oficina",
        "Discos externos USB que se sincronizan entre equipos"
      ],
      answer: 0,
      explain: "La nube son servicios de cómputo, almacenamiento o apps que rentas por Internet bajo demanda y pagas por uso. Tener servidores propios en tu oficina es on-premise, no nube."
    },
    {
      id: "cl02", level: 1, type: "tf",
      q: "SaaS es software que usas vía web sin instalar el servidor tú mismo.",
      answer: true,
      explain: "Verdadero: en SaaS el proveedor opera la app y sus servidores, y tú solo la usas desde el navegador o una app, como Gmail, Microsoft 365 o un CRM web."
    },
    {
      id: "cl03", level: 1, type: "mc",
      q: "IaaS te ofrece principalmente…",
      options: [
        "Infraestructura virtual (VMs, redes, discos)",
        "Una app terminada que solo usas desde el navegador",
        "Un runtime gestionado donde solo subes tu código",
        "Funciones que corren por evento sin gestionar servidores"
      ],
      answer: 0,
      explain: "Con IaaS rentas la infraestructura base (cómputo, red y almacenamiento) y sobre ella armas tu propio entorno."
    },
    {
      id: "cl04", level: 1, type: "fill",
      q: "Completa: nube ______ (combina nube pública con tu propia infraestructura on-premise).",
      answer: "híbrida",
      accept: ["híbrida", "hibrida", "nube híbrida", "nube hibrida", "hybrid", "hybrid cloud"],
      explain: "Nube híbrida: combina nube pública con tu nube privada u on-premise, conectadas entre sí."
    },
    {
      id: "cl05", level: 1, type: "identify",
      q: "Ejemplo típico de PaaS:",
      options: [
        "Plataforma para desplegar apps sin gestionar todo el OS",
        "VMs donde tú instalas, parchas y administras el sistema operativo",
        "Un correo web listo para usar, sin desplegar código propio",
        "Servidores físicos dedicados que rentas por mes"
      ],
      answer: 0,
      explain: "PaaS te da una plataforma donde subes tu código y el proveedor gestiona servidores, SO, parches y runtime. Las VMs donde tú administras el sistema operativo son IaaS, no PaaS."
    },
    {
      id: "cl06", level: 1, type: "scenario",
      q: "Necesitas editar docs con el equipo en tiempo real. Suele ser:",
      options: [
        "SaaS de documentos / colaboración",
        "Un servidor FTP compartido en la oficina",
        "Correo con adjuntos que se reenvían",
        "Una carpeta de red mapeada (SMB)"
      ],
      answer: 0,
      explain: "Herramientas SaaS como Google Docs o Microsoft 365 permiten que varias personas editen el mismo archivo a la vez. Con correo, FTP o una carpeta SMB terminas con copias sueltas o archivos bloqueados."
    },
    {
      id: "cl07", level: 1, type: "mc",
      q: "Un beneficio común de la nube es…",
      options: [
        "Escalar recursos según demanda",
        "Que funciona sin conexión a Internet",
        "Que la seguridad es solo del proveedor",
        "Que ya no hacen falta backups"
      ],
      answer: 0,
      explain: "Elasticidad: escalas según la demanda. Aún pagas, aseguras tus datos y haces backups."
    },
    {
      id: "cl08", level: 1, type: "tf",
      q: "En la nube el proveedor se encarga de todo, así que ya no necesitas contraseñas fuertes ni MFA.",
      answer: false,
      explain: "Falso: con la responsabilidad compartida, las identidades y los accesos siguen siendo tuyos. Usa contraseñas fuertes y MFA."
    },

    // ——— Nivel 2: Intermedio (8 preguntas) ———
    {
      id: "cl09", level: 2, type: "mc",
      q: "El modelo de responsabilidad compartida indica…",
      options: [
        "El proveedor asegura la nube; tú, lo que pones en ella",
        "El proveedor responde por todo, incluidos tus datos y cuentas",
        "Tú aseguras todo, incluido el hardware físico del datacenter",
        "Cada cliente audita físicamente el datacenter del proveedor"
      ],
      answer: 0,
      explain: "El reparto cambia según el modelo de servicio: mientras más gestionado, más cubre el proveedor."
    },
    {
      id: "cl10", level: 2, type: "tf",
      q: "Object storage (p.ej. S3-like) guarda objetos/archivos accesibles por API.",
      answer: true,
      explain: "Verdadero: el object storage guarda archivos como objetos con metadatos dentro de buckets y se accede por API HTTP. No es un disco de bloque que montas en una VM con su sistema de archivos."
    },
    {
      id: "cl11", level: 2, type: "scenario",
      q: "Laptop robada con sync de OneDrive/Drive. Riesgo mitigable con:",
      options: [
        "MFA, borrado remoto, cifrado de disco, revisión de sesiones",
        "Desinstalar OneDrive del resto de laptops de la empresa",
        "Cambiar solo la contraseña del Wi‑Fi de la oficina",
        "Confiar en la contraseña de Windows para proteger el disco"
      ],
      answer: 0,
      explain: "El riesgo es la sesión sincronizada en la laptop: MFA, revisar y cerrar sesiones, borrado remoto y cifrado de disco (BitLocker) protegen los datos. La contraseña de Windows sola no cifra el disco."
    },
    {
      id: "cl12", level: 2, type: "fill",
      q: "Sigla de infraestructura como servicio:",
      answer: "IaaS",
      accept: ["IaaS", "iaas"],
      explain: "IaaS es Infrastructure as a Service: rentas VMs, redes y discos, y tú administras el sistema operativo y lo que corre encima, como en AWS EC2 o Azure VMs."
    },
    {
      id: "cl13", level: 2, type: "mc",
      q: "Un snapshot/AMI típicamente sirve para…",
      options: [
        "Capturar estado de disco/VM para backup o clon",
        "Balancear tráfico entre varias VMs de la misma zona",
        "Medir en tiempo real el uso de CPU de la instancia",
        "Cifrar el tráfico entre la VM y el usuario"
      ],
      answer: 0,
      explain: "Un snapshot o AMI captura el estado del disco o de la VM en un momento, para restaurarlo o clonar servidores. Ayuda, pero no sustituye una estrategia de backup 3-2-1 con copia fuera del sitio."
    },
    {
      id: "cl14", level: 2, type: "match",
      q: "Empareja el modelo de servicio cloud con lo que ofrece:",
      pairs: [
        { left: "SaaS", right: "App completa gestionada" },
        { left: "PaaS", right: "Plataforma para tu código" },
        { left: "DBaaS", right: "Base de datos gestionada" },
        { left: "FaaS/serverless", right: "Ejecutar funciones a demanda" }
      ],
      explain: "SaaS te da la app lista, PaaS la plataforma donde despliegas tu código, DBaaS una base de datos que opera el proveedor y FaaS ejecuta funciones solo cuando ocurre un evento, sin gestionar servidores."
    },
    {
      id: "cl15", level: 2, type: "order",
      q: "Ordena subir un archivo a object storage (idea):",
      items: [
        "Autenticarte",
        "Crear/usar bucket",
        "Subir objeto con permisos mínimos",
        "Verificar acceso y cifrado"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero te autenticas, luego eliges o creas el bucket, subes el objeto con permisos mínimos y al final verificas que no sea público y esté cifrado. Los buckets públicos por error son un incidente clásico."
    },
    {
      id: "cl16", level: 2, type: "tf",
      q: "Regiones y zonas de disponibilidad mejoran resiliencia geográfica.",
      answer: true,
      explain: "Verdadero: las zonas de disponibilidad son datacenters separados dentro de una región, y cada región está en una ubicación geográfica distinta. Diseñar multi-AZ o multi-región evita depender de un solo sitio."
    },

    // ——— Nivel 3: Avanzado (8 preguntas) ———
    {
      id: "cl17", level: 3, type: "mc",
      q: "RPO se refiere a…",
      options: [
        "Cuántos datos puedes permitirte perder (punto de recuperación)",
        "Cuánto tiempo puede tardar el servicio en volver a estar operativo",
        "Porcentaje de disponibilidad comprometido en el SLA",
        "Frecuencia con que se prueban los planes de recuperación"
      ],
      answer: 0,
      explain: "RPO (Recovery Point Objective) es cuántos datos puedes perder, medido en tiempo desde el último respaldo. El tiempo que tarda el servicio en volver a operar es el RTO."
    },
    {
      id: "cl18", level: 3, type: "scenario",
      q: "Backup solo en la misma región que prod. Riesgo:",
      options: [
        "Desastre regional te deja sin copia",
        "Mayor costo por transferir datos entre regiones",
        "Restauraciones lentas por la latencia entre regiones",
        "Que los backups no se puedan cifrar en esa región"
      ],
      answer: 0,
      explain: "Si el backup vive en la misma región que producción, un desastre o caída regional se lleva ambos y te quedas sin copia. Por eso se replica a otra región o a un sitio externo."
    },
    {
      id: "cl19", level: 3, type: "fill",
      q: "Sigla del objetivo de tiempo de recuperación:",
      answer: "RTO",
      accept: ["RTO", "rto"],
      explain: "RTO (Recovery Time Objective) es el tiempo máximo aceptable para que el servicio vuelva a operar tras una falla. No lo confundas con el RPO, que mide cuántos datos puedes perder."
    },
    {
      id: "cl20", level: 3, type: "mc",
      q: "CDN sirve para…",
      options: [
        "Acercar contenido estático a usuarios (caché perimetral)",
        "Reemplazar la base de datos transaccional (OLTP)",
        "Asignar IPs privadas RFC1918 a las VMs de la VPC",
        "Resolver nombres de dominio internos de la empresa"
      ],
      answer: 0,
      explain: "Una CDN guarda copias del contenido estático en servidores perimetrales cerca de los usuarios: baja la latencia y le quita carga al servidor de origen. No reemplaza la base de datos ni asigna IPs."
    },
    {
      id: "cl21", level: 3, type: "match",
      q: "Empareja la estrategia de DR:",
      pairs: [
        { left: "Warm standby", right: "Copia completa pero reducida, siempre activa" },
        { left: "Pilot light", right: "Core/datos replicados encendidos; app apagada" },
        { left: "Multi-site active", right: "Activo en varios sitios" },
        { left: "Backup restore", right: "Recuperar desde respaldos" }
      ],
      explain: "DR de menor a mayor costo (y menor tiempo de recuperación): backup & restore < pilot light < warm standby < multi-site activo."
    },
    {
      id: "cl22", level: 3, type: "order",
      q: "Ordena prueba de restore:",
      items: [
        "Elegir backup",
        "Restaurar a entorno aislado",
        "Validar integridad/app",
        "Documentar cuánto tardó la restauración"
      ],
      answer: [0, 1, 2, 3],
      explain: "Eliges el backup, lo restauras en un entorno aislado para no tocar producción, validas que datos y app funcionen y documentas cuánto tardó para compararlo con tu RTO. Backup no probado no es backup."
    },
    {
      id: "cl23", level: 3, type: "tf",
      q: "Guardar access keys de larga vida en una VM es preferible a usar roles IAM.",
      answer: false,
      explain: "Falso: las keys de larga vida se filtran y no rotan solas. Usa roles de instancia o workload identity con privilegios mínimos."
    },
    {
      id: "cl24", level: 3, type: "scenario",
      q: "Factura cloud explota por VMs olvidadas. Control:",
      options: [
        "Tags, budgets/alerts, apagado automático, inventory",
        "Desactivar el export de costos para ahorrar almacenamiento",
        "Escalar las VMs olvidadas a un tamaño mayor",
        "Aumentar la cuota de vCPU de la suscripción"
      ],
      answer: 0,
      explain: "Las tags dicen de quién es cada recurso, los budgets y alertas avisan cuando el gasto se dispara, el apagado automático frena VMs ociosas y el inventario encuentra las olvidadas. Es FinOps básico."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "cl25", level: 4, type: "mc",
      q: "Un VPC/VNet es…",
      options: [
        "Red virtual aislada en la nube",
        "Un balanceador de carga administrado",
        "Un bucket de almacenamiento de objetos",
        "Un túnel cifrado para usuarios remotos"
      ],
      answer: 0,
      explain: "Una VPC (AWS) o VNet (Azure) es tu red privada aislada en la nube: ahí defines subredes, tablas de ruteo y reglas como los security groups. No es un balanceador ni una VPN."
    },
    {
      id: "cl26", level: 4, type: "tf",
      q: "Los Security Groups son stateless: debes permitir por separado el tráfico de respuesta.",
      answer: false,
      explain: "Falso: los Security Groups son stateful (la respuesta a un tráfico permitido vuelve sola). Las NACL de AWS sí son stateless."
    },
    {
      id: "cl27", level: 4, type: "scenario",
      q: "Base de datos expuesta 0.0.0.0/0 en SG. Acción:",
      options: [
        "Restringir a app subnets/bastion; rotar credenciales",
        "Cambiar el puerto por defecto de la BD y dejar la regla",
        "Mover la BD a una subred pública con IP elástica",
        "Abrir también el puerto 22 para administrarla más fácil"
      ],
      answer: 0,
      explain: "Hay bots que escanean todo Internet buscando puertos de BD abiertos. Limita el acceso a las subredes de la app o a un bastion y rota credenciales por si ya entraron; cambiar el puerto no protege nada."
    },
    {
      id: "cl28", level: 4, type: "fill",
      q: "Sigla de red privada virtual (túnel):",
      answer: "VPN",
      accept: ["VPN", "vpn"],
      explain: "VPN (Virtual Private Network) crea un túnel cifrado sobre Internet. En cloud se usa site-to-site para unir la oficina con la VPC, o client VPN para usuarios remotos."
    },
    {
      id: "cl29", level: 4, type: "mc",
      q: "Object lock / WORM en backups ayuda contra…",
      options: [
        "Ransomware que intenta borrar/cifrar backups",
        "Latencia alta al leer backups remotos",
        "Costos por guardar versiones antiguas",
        "Cortes de red al subir backups grandes"
      ],
      answer: 0,
      explain: "Object lock o WORM (write once, read many) vuelve inmutables los backups: durante la retención no se pueden borrar ni sobrescribir, así que un ransomware no puede destruir esas copias."
    },
    {
      id: "cl30", level: 4, type: "match",
      q: "Empareja el término de red cloud con su significado:",
      pairs: [
        { left: "Egress", right: "Tráfico saliente" },
        { left: "Ingress", right: "Tráfico entrante" },
        { left: "Peering", right: "Conectar redes virtuales" },
        { left: "Private endpoint", right: "Acceso privado a PaaS" }
      ],
      explain: "Egress es lo que sale de la red cloud (y suele cobrarse), ingress lo que entra, peering une dos redes virtuales y un private endpoint te deja usar un servicio PaaS por IP privada sin salir a Internet."
    },
    {
      id: "cl31", level: 4, type: "order",
      q: "Ordena el montaje de una landing zone básica:",
      items: [
        "Crear la organización/tenant (cuenta de gestión)",
        "Crear cuentas separadas (prod, dev, seguridad)",
        "Aplicar guardrails (policies) a esas cuentas",
        "Desplegar workloads en las cuentas hijas"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero la estructura (org → cuentas aisladas), luego las reglas (guardrails) y al final los workloads, que caen en cuentas ya gobernadas."
    },
    {
      id: "cl32", level: 4, type: "tf",
      q: "Cross-region replication puede mejorar DR de object storage.",
      answer: true,
      explain: "Verdadero: copiar objetos automáticamente a un bucket en otra región deja tus datos disponibles si la región principal cae. Ojo con el costo de transferencia y con dónde puedes guardar datos por ley."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "cl33", level: 5, type: "mc",
      q: "Chaos engineering busca…",
      options: [
        "Probar resiliencia inyectando fallos de forma controlada",
        "Generar carga máxima para medir rendimiento",
        "Aplicar cambios en producción sin pasar por revisión",
        "Buscar vulnerabilidades con ataques simulados"
      ],
      answer: 0,
      explain: "Chaos engineering apaga instancias o mete latencia a propósito, de forma controlada, para comprobar que el sistema aguanta. No es una prueba de carga ni un pentest, que buscan rendimiento o vulnerabilidades."
    },
    {
      id: "cl34", level: 5, type: "scenario",
      q: "Key leaked en GitHub público. Respuesta:",
      options: [
        "Rotar/revocar de inmediato, scrub history, auditar uso",
        "Hacer privado el repositorio y seguir usando la misma key",
        "Borrar el commit con la key y mantenerla activa",
        "Esperar a que el proveedor detecte abuso y avise"
      ],
      answer: 0,
      explain: "Asume que la key ya está comprometida: hay bots que escanean GitHub en minutos. Revócala y rota, límpiala del historial y revisa su uso. Hacer privado el repo o borrar el commit no la invalida.",
      try: "En una terminal, dentro de un repo git tuyo, escribe `git log -p -S \"password\"`: verás los commits que añadieron o quitaron esa palabra, aunque ya no esté en el código."
    },
    {
      id: "cl35", level: 5, type: "fill",
      q: "Sigla de plataforma como servicio:",
      answer: "PaaS",
      accept: ["PaaS", "paas"],
      explain: "PaaS es Platform as a Service: tú subes el código y el proveedor gestiona servidores, SO y runtime, como en Azure App Service, Heroku o Google App Engine."
    },
    {
      id: "cl36", level: 5, type: "mc",
      q: "Un service mesh (idea) aporta…",
      options: [
        "mTLS, retries, observabilidad entre microservicios",
        "Orquestar y programar contenedores en los nodos del cluster",
        "Almacenar y versionar imágenes de contenedor en un registry",
        "Compilar y empaquetar microservicios en el pipeline de CI"
      ],
      answer: 0,
      explain: "Un service mesh como Istio o Linkerd usa proxies junto a cada microservicio para dar mTLS, reintentos y métricas entre ellos. Orquestar contenedores es tarea de Kubernetes, no del mesh."
    },
    {
      id: "cl37", level: 5, type: "identify",
      q: "Patrón para secretos en cloud:",
      options: [
        "Secrets Manager / Vault + rotación",
        "ENV en el Dockerfile de la imagen",
        "Archivo .env commiteado en el repo",
        "Texto plano en un bucket compartido"
      ],
      answer: 0,
      explain: "Los secretos van en un gestor como AWS Secrets Manager, Azure Key Vault o HashiCorp Vault, con acceso por permisos y rotación. Un .env en el repo o un ENV en el Dockerfile quedan expuestos."
    },
    {
      id: "cl38", level: 5, type: "order",
      q: "Ordena incident billing anomaly:",
      items: [
        "Alert de presupuesto",
        "Identificar recurso culpable",
        "Contener (apagar/restringir)",
        "Postmortem FinOps"
      ],
      answer: [0, 1, 2, 3],
      explain: "La alerta de presupuesto te avisa; luego ubicas el recurso que gasta, lo contienes apagándolo o restringiéndolo y al final haces el postmortem. Con un minero de cripto cada minuto cuesta dinero."
    },
    {
      id: "cl39", level: 5, type: "tf",
      q: "Datos personales pueden tener restricciones de residencia (qué región usar).",
      answer: true,
      explain: "Verdadero: leyes como el GDPR europeo o normas locales pueden limitar a qué países se transfieren los datos personales, así que elegir la región cloud es parte del cumplimiento."
    },
    {
      id: "cl40", level: 5, type: "scenario",
      q: "Lift-and-shift de app monolítica a una sola VM enorme. Riesgo:",
      options: [
        "Poco aprovechamiento cloud-native; SPOF y costo",
        "Autoescalado horizontal garantizado sin cambiar la app",
        "Cero operación: el proveedor parcha tu app y tu SO",
        "Backups innecesarios por usar discos administrados"
      ],
      answer: 0,
      explain: "Meter el monolito en una sola VM enorme no aprovecha autoescalado ni servicios gestionados, crea un punto único de falla y sale caro. Puede servir como paso intermedio si planeas modernizar después."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "clB1", level: 5, type: "scenario",
      q: "BOSS: Bucket público con PII. Contención:",
      options: [
        "Bloquear acceso público, rotar credenciales, forense de accesos",
        "Borrar el bucket de inmediato, sin conservar logs ni copias legales",
        "Renombrar el bucket para ocultarlo, manteniendo el acceso público",
        "Esperar a confirmar abuso real antes de tocar permisos"
      ],
      answer: 0,
      explain: "Exposición de datos personales: cierra el acceso ya, rota credenciales expuestas, preserva logs para el forense y evalúa la notificación legal."
    },
    {
      id: "clB2", level: 5, type: "mc",
      q: "BOSS: Región cae. Tu app multi-AZ en UNA región…",
      options: [
        "Sigue caída regional; necesitas estrategia multi-region/DR",
        "Sobrevive, porque multi-AZ replica automáticamente a otra región",
        "Hace failover al CDN, que sirve la app completa desde el edge",
        "El proveedor la migra sola a otra región según el SLA"
      ],
      answer: 0,
      explain: "Multi-AZ te protege si falla un datacenter, pero todas las zonas están en la misma región: si cae la región, cae tu app. Para eso necesitas réplicas o un plan de DR en otra región."
    },
    {
      id: "clB3", level: 5, type: "order",
      q: "BOSS: Se filtraron los secrets de tu pipeline CI/CD. Ordena la respuesta:",
      items: [
        "Revocar/rotar YA los secrets expuestos (contener)",
        "Auditar deploys recientes (medir alcance)",
        "Reconstruir y redeployar desde fuentes firmadas",
        "Postmortem: migrar a OIDC y roles mínimos"
      ],
      answer: [0, 1, 2, 3],
      explain: "Contener → medir alcance → recuperar desde fuentes confiables → lecciones aprendidas (supply chain)."
    },
    {
      id: "clB4", level: 5, type: "tf",
      q: "BOSS: En IaaS el proveedor parchea por ti el sistema operativo de tus VMs.",
      answer: false,
      explain: "Falso: en IaaS el proveedor cubre hardware, red e hipervisor; el SO invitado, sus parches y el cifrado de tus datos son responsabilidad tuya."
    },
    {
      id: "clB5", level: 5, type: "fill",
      q: "BOSS: Objetivo de pérdida de datos tolerable (sigla):",
      answer: "RPO",
      accept: ["RPO", "rpo"],
      explain: "RPO (Recovery Point Objective) es la pérdida de datos tolerable, medida en tiempo: si respaldas cada hora, podrías perder hasta una hora de datos. El tiempo para volver a operar es el RTO."
    }
  ]
});
