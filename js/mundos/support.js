/**
 * Tech Quest — Mundo Soporte IT
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "support",
  name: "Soporte IT",
  icon: "🎫",
  color: "#ff7755",
  description: "Tickets, prioridades, soft skills y diagnóstico como en un help desk real.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "su01", level: 1, type: "mc",
      q: "En ITIL/help desk, un incidente es…",
      options: [
        "Interrupción no planificada o degradación de un servicio",
        "Causa raíz desconocida de uno o más incidentes recurrentes",
        "Petición estándar de alta o acceso de un usuario",
        "Modificación planificada y aprobada de un servicio en producción"
      ],
      answer: 0,
      explain: "El objetivo es restaurar el servicio lo antes posible. Un problema es la causa raíz subyacente."
    },
    {
      id: "su02", level: 1, type: "mc",
      q: "Prioridad de ticket suele combinar…",
      options: [
        "Impacto × urgencia",
        "Solo el color del logo",
        "La hora del almuerzo",
        "El volumen del teclado"
      ],
      answer: 0,
      explain: "La matriz impacto × urgencia fija la prioridad del ticket y, con ella, los SLA que aplican."
    },
    {
      id: "su03", level: 1, type: "order",
      q: "Ordena una atención telefónica profesional:",
      items: [
        "Saludar e identificarte",
        "Escuchar y confirmar el problema",
        "Diagnosticar / escalar si hace falta",
        "Cerrar con resumen y next steps"
      ],
      answer: [0, 1, 2, 3],
      explain: "La empatía y la confirmación evitan malentendidos y rework."
    },
    {
      id: "su04", level: 1, type: "scenario",
      q: "Usuario enfadado: '¡Nada funciona!'. Mejor primera respuesta:",
      options: [
        "Empatizar, pedir detalles concretos y reproducir",
        "Escalar a N3 de inmediato sin más preguntas",
        "Reiniciar su equipo en remoto antes de hacer preguntas",
        "Pedirle que abra un ticket nuevo por cada cosa que falla"
      ],
      answer: 0,
      explain: "Baja la tensión, acota el alcance (¿solo Wi‑Fi? ¿una app?) y recoge evidencia."
    },
    {
      id: "su05", level: 1, type: "tf",
      q: "Antes de cambiar algo en producción, conviene tener rollback o respaldo cuando sea posible.",
      answer: true,
      explain: "Cambios sin plan de vuelta atrás alargan las crisis."
    },
    {
      id: "su06", level: 1, type: "mc",
      q: "¿Cuándo escalar a N2/N3?",
      options: [
        "Si excede tu alcance o el SLA, o requiere privilegios/especialistas",
        "Solo cuando el usuario lo pide o se queja con tu supervisor",
        "En cuanto entra el ticket, sin intentar ningún diagnóstico en N1",
        "Nunca: N1 debe cerrar todo él mismo aunque se incumpla el SLA"
      ],
      answer: 0,
      explain: "Escala con contexto: qué se probó, logs, impacto, ventana de cambio."
    },
    {
      id: "suL1a", level: 1, type: "mc",
      q: "Al atender un ticket, lo primero suele ser…",
      options: [
        "Saludar, identificarte y confirmar el problema",
        "Reiniciar el equipo del usuario en remoto sin preguntar",
        "Escalar a N2 antes de conocer el problema",
        "Pedirle su contraseña para entrar a su sesión"
      ],
      answer: 0,
      explain: "Rapport + clarificación ahorran tiempo."
    },
    {
      id: "suL1b", level: 1, type: "tf",
      q: "Anotar la hora del error ayuda a buscar en logs.",
      answer: true,
      explain: "Correlación temporal es clave."
    },
    {
      id: "suL1c", level: 1, type: "mc",
      q: "P1 suele significar…",
      options: [
        "Impacto crítico / urgencia alta",
        "Impacto bajo / sin urgencia",
        "Primer nivel de soporte (N1)",
        "Problema con causa raíz conocida"
      ],
      answer: 0,
      explain: "P1 es la prioridad más alta: una falla en un servicio crítico que afecta a muchos usuarios y no admite espera."
    },
    {
      id: "suL1d", level: 1, type: "fill",
      q: "Sigla del acuerdo de nivel de servicio:",
      answer: "SLA",
      accept: ["SLA", "sla", "ANS"],
      explain: "Service Level Agreement (en español también ANS: acuerdo de nivel de servicio)."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "su07", level: 2, type: "match",
      q: "Relaciona severidad típica:",
      pairs: [
        { left: "P1", right: "Servicio crítico caído para muchos" },
        { left: "P3", right: "Impacto menor / workaround existe" },
        { left: "Request", right: "Petición de servicio (no incidente)" },
        { left: "Known error", right: "Causa conocida con workaround" }
      ],
      explain: "Clasificar bien acelera la cola correcta."
    },
    {
      id: "su08", level: 2, type: "identify",
      q: "Documento breve de lo que hiciste en un ticket se llama…",
      options: [
        "Notas / resolución en el ticket (KB si aplica)",
        "Matriz de escalamiento (N2/N3) asociada al ticket",
        "Solicitud de cambio (RFC) ante el CAB",
        "Encuesta de satisfacción (CSAT) del usuario"
      ],
      answer: 0,
      explain: "Buenas notas = menos reincidencia y mejores artículos de conocimiento."
    },
    {
      id: "su09", level: 2, type: "fill",
      q: "Sigla común del acuerdo de nivel de servicio (inglés):",
      answer: "SLA",
      accept: ["SLA", "sla"],
      explain: "Service Level Agreement: tiempos de respuesta/resolución acordados."
    },
    {
      id: "su10", level: 2, type: "mc",
      q: "Primera pregunta útil en 'no tengo Internet':",
      options: [
        "¿Es solo tu PC o más equipos? ¿Wi‑Fi o cable? ¿Hay IP?",
        "¿Qué versión de Office tienes? ¿Está activada la licencia?",
        "¿Me dices tu contraseña de red para probar desde aquí?",
        "¿Reinstalamos Windows ya? ¿Tienes copia de tus archivos?"
      ],
      answer: 0,
      explain: "Aísla: local vs red vs ISP. Luego capa por capa."
    },
    {
      id: "su11", level: 2, type: "scenario",
      q: "Ticket: impresora de piso no imprime; urgencia media. Ya hay ping OK. Siguiente paso razonable:",
      options: [
        "Revisar cola/Spooler/driver y página de prueba",
        "Escalar a redes para revisar el switch y la VLAN del piso",
        "Reemplazar la impresora por una nueva de inmediato",
        "Reinstalar Windows en el PC del usuario que reportó"
      ],
      answer: 0,
      explain: "Red OK → capa de impresión. No amplíes el cambio innecesariamente."
    },
    {
      id: "suL2a", level: 2, type: "scenario",
      q: "Usuario dice 'nada funciona'. Mejor pregunta:",
      options: [
        "¿Desde cuándo? ¿Qué app/URL? ¿Solo tu PC u otros?",
        "¿Me das tu contraseña y el código MFA para entrar?",
        "¿Reinstalamos Windows ya o restauramos la imagen?",
        "¿Formateamos el disco y empezamos desde cero?"
      ],
      answer: 0,
      explain: "Acota alcance antes de actuar."
    },
    {
      id: "suL2b", level: 2, type: "order",
      q: "Ordena el flujo de un escalamiento útil a N2:",
      items: [
        "Confirmar el síntoma y medir el impacto",
        "Aplicar los pasos N1 del runbook/KB",
        "Confirmar que excede N1 (alcance, permisos o SLA)",
        "Escalar a N2 con resumen, pasos, logs y contacto"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero acota el problema y agota lo que N1 puede resolver; si excede tu alcance o el SLA, escala con un handoff completo (síntoma, pasos probados, evidencia, contacto) para no duplicar trabajo."
    },
    {
      id: "suL2c", level: 2, type: "mc",
      q: "Un workaround es…",
      options: [
        "Solución temporal mientras llega el fix definitivo",
        "Corrección permanente que elimina la causa raíz del problema",
        "Cambio de emergencia aprobado por el CAB fuera de ventana",
        "Escalado funcional del ticket a un equipo especialista"
      ],
      answer: 0,
      explain: "Documenta el workaround en el ticket/KB."
    },
    {
      id: "suL2d", level: 2, type: "tf",
      q: "Prometer un ETA optimista, aunque sea imposible, mejora la confianza del usuario.",
      answer: false,
      explain: "Falso: un ETA incumplido daña la confianza. Mejor rangos honestos y actualizaciones periódicas."
    },
    {
      id: "suL2e", level: 2, type: "mc",
      q: "Una KB (knowledge base) bien escrita sirve para…",
      options: [
        "Resolver casos repetidos más rápido y con consistencia",
        "Registrar el inventario de hardware y licencias de la empresa",
        "Medir la satisfacción del usuario tras cada ticket",
        "Sustituir los tickets para no tener que registrar incidentes"
      ],
      answer: 0,
      explain: "Documenta pasos verificados y causas conocidas."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "su12", level: 3, type: "tf",
      q: "Pedir captura del error y la hora exacta solo retrasa el ticket; basta con que el usuario diga 'no funciona'.",
      answer: false,
      explain: "Falso: la captura y la hora exacta permiten correlacionar con los logs del servidor y de eventos, y ahorran idas y vueltas."
    },
    {
      id: "su13", level: 3, type: "mc",
      q: "Soft skill clave en soporte:",
      options: [
        "Comunicación clara y paciencia",
        "Gritar más fuerte",
        "Ocultar el estado del ticket",
        "Prometer milagros sin ETA"
      ],
      answer: 0,
      explain: "Expectativas honestas + actualizaciones = confianza del usuario."
    },
    {
      id: "su14", level: 3, type: "order",
      q: "Ordena el cierre de un incidente bien gestionado:",
      items: [
        "Confirmar con el usuario que el servicio volvió",
        "Documentar causa y solución en el ticket",
        "Crear KB / registrar problema si es recurrente",
        "Cerrar formalmente el ticket"
      ],
      answer: [0, 1, 2, 3],
      explain: "ITIL: confirma con el usuario, documenta, revisa si es recurrente (KB/problema) y al final haz el cierre formal. Cerrar sin confirmar genera reopens y mala CSAT."
    },
    {
      id: "su15", level: 3, type: "mc",
      q: "Un change (cambio) controlado implica…",
      options: [
        "Ventana, riesgo, aprobación y plan de rollback cuando aplique",
        "Aplicar el cambio directo en producción y documentarlo solo si falla",
        "Que el mismo técnico lo apruebe y ejecute, sin revisión ni registro",
        "Cambiar todo a las 3 a.m. sin aviso ni registro en el ticket"
      ],
      answer: 0,
      explain: "CAB/aprobaciones según criticidad. Emergencias tienen proceso aparte."
    },
    {
      id: "su16", level: 3, type: "scenario",
      q: "Usuario pide la contraseña del admin 'solo un minuto'. Respuesta correcta:",
      options: [
        "No compartir credenciales admin; usar vías seguras (LAPS/PAM/elevación)",
        "Dársela por teléfono y cambiarla cuando el usuario haya terminado",
        "Añadir al usuario al grupo Domain Admins de forma permanente",
        "Iniciar sesión tú como admin y dejarle la sesión abierta"
      ],
      answer: 0,
      explain: "Nunca compartas root/admin. Ofrece alternativas auditables."
    },
    {
      id: "suL3a", level: 3, type: "mc",
      q: "En un major incident, N1 prioriza…",
      options: [
        "Comunicación, bridge y runbook / escalación",
        "Probar fixes por su cuenta antes de avisar a nadie",
        "Cerrar los tickets duplicados como spam sin responder",
        "Atender tickets por orden de llegada"
      ],
      answer: 0,
      explain: "Restaurar servicio + comunicar status."
    },
    {
      id: "suL3b", level: 3, type: "scenario",
      q: "Change falló en prod. Siguiente paso típico:",
      options: [
        "Ejecutar rollback según plan y avisar",
        "Aplicar más cambios en caliente hasta que funcione",
        "Cerrar el change como exitoso y revisarlo el lunes",
        "Esperar a que los usuarios reporten y luego decidir"
      ],
      answer: 0,
      explain: "Todo change serio trae rollback."
    },
    {
      id: "suL3c", level: 3, type: "match",
      q: "Empareja el término de ITIL con su significado:",
      pairs: [
        { left: "Incidente", right: "Interrupción no planificada del servicio" },
        { left: "Problema", right: "Causa raíz / investigación más profunda" },
        { left: "Request", right: "Petición de servicio estándar" },
        { left: "CAB", right: "Comité de cambios / aprobaciones" }
      ],
      explain: "Vocabulario ITIL básico en help desk."
    },
    {
      id: "suL3d", level: 3, type: "fill",
      q: "Sigla de autenticación multifactor (inglés):",
      answer: "MFA",
      accept: ["MFA", "mfa"],
      explain: "MFA (Multi-Factor Authentication) exige dos o más factores; 2FA es el caso particular de exactamente dos."
    },
    {
      id: "suL3e", level: 3, type: "tf",
      q: "Un post-mortem debe centrarse en encontrar al culpable del incidente.",
      answer: false,
      explain: "Falso: el post-mortem es sin culpas (blameless): busca causas y mejoras del sistema y del proceso para que no se repita."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "suL4a", level: 4, type: "mc",
      q: "Un runbook es…",
      options: [
        "Procedimiento paso a paso para un incidente/cambio conocido",
        "Registro cronológico de todas las acciones durante un incidente",
        "Informe final que analiza la causa raíz tras un incidente",
        "Calendario de guardias del equipo de soporte"
      ],
      answer: 0,
      explain: "Reduce improvisación bajo presión."
    },
    {
      id: "suL4b", level: 4, type: "tf",
      q: "La matriz de escalamiento define cuándo y a quién subir un ticket.",
      answer: true,
      explain: "Incluye severidades y contactos."
    },
    {
      id: "suL4c", level: 4, type: "scenario",
      q: "VIP insiste en saltarse el proceso de change. Tú…",
      options: [
        "Explicas riesgo, ofreces camino rápido formal, documentas",
        "Haces el cambio sin registro para no retrasar al VIP",
        "Le das permisos de admin para que lo haga él mismo",
        "Rechazas el cambio sin explicación y cierras el ticket"
      ],
      answer: 0,
      explain: "Protege al negocio y a ti."
    },
    {
      id: "suL4d", level: 4, type: "fill",
      q: "Sigla del acuerdo de nivel operacional entre equipos internos:",
      answer: "OLA",
      accept: ["OLA", "ola"],
      explain: "Operational Level Agreement."
    },
    {
      id: "suL4e", level: 4, type: "mc",
      q: "CSAT mide…",
      options: [
        "Satisfacción del cliente post-atención",
        "Tiempo medio de resolución (MTTR)",
        "Porcentaje de tickets resueltos al primer contacto",
        "Cumplimiento de los SLA pactados por servicio"
      ],
      answer: 0,
      explain: "Encuestas cortas tras resolver."
    },
    {
      id: "suL4f", level: 4, type: "match",
      q: "Empareja el término de soporte con su significado:",
      pairs: [
        { left: "P1", right: "Crítico / negocio parado" },
        { left: "P3", right: "Impacto medio/bajo típico" },
        { left: "RCA", right: "Análisis de causa raíz" },
        { left: "CAB", right: "Comité de cambios" }
      ],
      explain: "Vocabulario de servicio."
    },
    {
      id: "suL4g", level: 4, type: "order",
      q: "Ordena tomar un ticket nuevo:",
      items: [
        "Clasificar impacto/urgencia",
        "Diagnosticar con preguntas",
        "Aplicar fix/workaround",
        "Documentar y cerrar con confirmación"
      ],
      answer: [0, 1, 2, 3],
      explain: "Cierre prematuro genera reopens."
    },
    {
      id: "suL4h", level: 4, type: "tf",
      q: "En un major incident conviene que cada equipo coordine en su propio chat, sin un facilitador.",
      answer: false,
      explain: "Falso: un bridge de major incident necesita un facilitador (incident commander) y un canal único de verdad; diez chats en paralelo generan ruido y contradicciones."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "suL5a", level: 5, type: "mc",
      q: "Shift-left en soporte significa…",
      options: [
        "Empoderar N1/self-service/KB para resolver antes",
        "Escalar todos los tickets a N3 para resolverlos antes",
        "Pasar la carga de N1 a proveedores externos (outsourcing)",
        "Recortar el horario del service desk"
      ],
      answer: 0,
      explain: "Mejor experiencia y menor costo."
    },
    {
      id: "suL5b", level: 5, type: "scenario",
      q: "Las métricas muestran un tiempo medio de resolución alto y un FCR bajo. Interpreta:",
      options: [
        "Se reabre mucho / poca resolución real en primer contacto",
        "Casi todo se resuelve en la primera llamada, sin escalar",
        "Los SLA se cumplen holgadamente en todos los niveles",
        "Hay muchos tickets nuevos, pero se cierran enseguida"
      ],
      answer: 0,
      explain: "FCR (first contact resolution) bajo = muchos tickets requieren escalar o recontactar/reabrir, lo que alarga el tiempo medio de resolución."
    },
    {
      id: "suL5c", level: 5, type: "fill",
      q: "Sigla de tiempo medio de reparación/resolución:",
      answer: "MTTR",
      accept: ["MTTR", "mttr"],
      explain: "Mean Time To Repair/Restore/Resolve según contexto."
    },
    {
      id: "suL5d", level: 5, type: "mc",
      q: "Un post-mortem blameless busca…",
      options: [
        "Aprender de fallas sin castigar personas",
        "Identificar al responsable para aplicar una sanción",
        "Cerrar el incidente rápido sin analizar la causa",
        "Ocultar el incidente a la dirección"
      ],
      answer: 0,
      explain: "Mejora sistemas y procesos."
    },
    {
      id: "suL5e", level: 5, type: "identify",
      q: "Canal preferido para anunciar outage masivo a usuarios:",
      options: [
        "Status page / correo oficial / banner acordado",
        "Mensajes privados a cada usuario que abra ticket",
        "Publicación en redes sociales personales del técnico",
        "Respuestas individuales en cada ticket duplicado"
      ],
      answer: 0,
      explain: "Un mensaje consistente."
    },
    {
      id: "suL5f", level: 5, type: "order",
      q: "Ordena mejora continua del service desk:",
      items: [
        "Medir (CSAT, tiempos de resolución, FCR)",
        "Identificar cuellos",
        "Actualizar KB/automatizar",
        "Reentrenar y repetir"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin datos, solo opiniones."
    },
    {
      id: "suL5g", level: 5, type: "tf",
      q: "Cerrar un ticket sin confirmar con el usuario que quedó resuelto es buena práctica para cumplir el SLA.",
      answer: false,
      explain: "Falso: cerrar sin confirmar genera reaperturas y mala experiencia. Confirma la solución (o aplica la política de cierre automático tras avisar) y documenta."
    },
    {
      id: "suL5h", level: 5, type: "scenario",
      q: "Proveedor SaaS caído; usuarios culpan a TI interna. Comunicación:",
      options: [
        "Status claro, ETA si hay, workarounds, updates periódicos",
        "No comunicar nada hasta que el proveedor lo resuelva",
        "Culpar públicamente al proveedor y cerrar los tickets",
        "Prometer una ETA fija aunque el proveedor no la dé"
      ],
      answer: 0,
      explain: "Transparencia reduce tickets duplicados."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "suB1", level: 5, type: "scenario",
      q: "BOSS: P1 — correo caído para toda la empresa. Tú eres N1. ¿Qué haces primero?",
      options: [
        "Declarar incidente mayor, comunicar, escalar N2/messaging y seguir runbook",
        "Pedir a cada usuario que reinicie su PC y reabra Outlook",
        "Reiniciar tú mismo el servidor de correo sin avisar ni registrar nada",
        "Atender los tickets uno a uno según orden de llegada"
      ],
      answer: 0,
      explain: "P1 = comunicación + bridge + escalamiento. No inventes fixes masivos sin runbook."
    },
    {
      id: "suB2", level: 5, type: "order",
      q: "BOSS: Gestión de crisis N1:",
      items: [
        "Confirmar síntomas y alcance (usuarios/servicios)",
        "Declarar P1: abrir bridge y avisar stakeholders",
        "Ejecutar pasos N1 del runbook / escalar",
        "Actualizar status cada X minutos hasta resolver"
      ],
      answer: [0, 1, 2, 3],
      explain: "Confirma el alcance para clasificar, declara y comunica de inmediato, actúa con el runbook y no dejes de actualizar: silencio en un P1 destruye confianza."
    },
    {
      id: "suB3", level: 5, type: "mc",
      q: "BOSS: Usuario VIP exige salto de cola para un wallpaper. ¿Respuesta?",
      options: [
        "Explicar prioridad con respeto; no romper P1 reales; ofrecer request normal",
        "Pausar los P1 abiertos y atender primero al VIP por su cargo",
        "Darle permisos de administrador para que cambie el wallpaper él mismo",
        "Aceptar y prometerle un ETA que no podrás cumplir"
      ],
      answer: 0,
      explain: "Prioridad objetiva > ego. Escala políticas a tu lead si hay presión."
    },
    {
      id: "suB4", level: 5, type: "tf",
      q: "BOSS: Documentar workarounds en KB reduce tickets repetidos.",
      answer: true,
      explain: "Deflecta carga N1 y estandariza respuestas."
    },
    {
      id: "suB5", level: 5, type: "match",
      q: "BOSS: Empareja acción con principio:",
      pairs: [
        { left: "No compartir admin", right: "Seguridad / mínimo privilegio" },
        { left: "Confirmar cierre", right: "Calidad de servicio" },
        { left: "Escalar con logs", right: "Handoff efectivo" },
        { left: "SLA", right: "Tiempos acordados" }
      ],
      explain: "Soporte excelente = técnica + proceso + ética."
    }
  ]
});
