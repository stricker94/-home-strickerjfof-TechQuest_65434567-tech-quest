/**
 * Tech Quest — Simulador de tickets
 *
 * Cada caso es un ticket como los que llegan a una mesa de ayuda. Se resuelve en pasos encadenados: qué
 * preguntas primero, qué revisas, cuál es la causa, cómo lo arreglas y qué haces al cerrar. Tras cada paso,
 * «reveal» cuenta lo que descubriste (sirve para razonar el siguiente).
 * Formato y cómo añadir un caso: sección 7 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */

// ——— 🖨️ No puede imprimir desde ayer ———
addTicket({
  id: "tk01", level: 1, world: "printers", icon: "🖨️",
  title: "No puede imprimir desde ayer",
  ticket: "Ana Ruiz (Contabilidad), prioridad media: «Desde ayer no puedo imprimir; le doy Imprimir y no sale nada. La impresora está prendida y no marca ningún error.»",
  steps: [
    {
      id: "tk01a", level: 1, type: "mc",
      q: "Antes de tocar nada, ¿qué le preguntas primero a Ana?",
      options: [
        "¿Me comparte su contraseña para revisar su sesión desde aquí?",
        "¿Le parece si reinstalo la impresora y el controlador de una vez?",
        "¿A sus compañeros que usan esa impresora les pasa lo mismo?",
        "¿Desde cuándo tiene asignada esa computadora en su área?"
      ],
      answer: 2,
      explain: "Saber si le pasa a una persona o a varias separa un problema de su PC de uno de la impresora o la red. Pedir la contraseña del usuario nunca es válido.",
      reveal: "A sus compañeros del piso tampoco les imprime desde ayer. En la PC de Ana, los trabajos de la cola aparecen con estado «Error»."
    },
    {
      id: "tk01b", level: 1, type: "scenario",
      q: "Escenario: varias personas no pueden imprimir y los trabajos se quedan en «Error» en la cola. ¿Qué revisas primero?",
      options: [
        "Hacer ping a la IP configurada en el puerto de la impresora",
        "Reinstalar el controlador de la impresora en la PC de Ana",
        "Reiniciar el servicio Cola de impresión solo en la PC de Ana",
        "Cambiar el tóner aunque la impresora no muestre ningún aviso"
      ],
      answer: 0,
      explain: "Si falla en varias PC, lo común es la impresora o su conexión, así que primero se prueba si responde en la IP configurada. Reiniciar la cola de una sola PC no explica lo de los demás.",
      reveal: "El ping a 192.168.1.50 (la IP del puerto) no responde. En el panel de la impresora aparece la IP 192.168.1.73."
    },
    {
      id: "tk01c", level: 1, type: "mc",
      q: "Con lo que encontraste, ¿cuál es la causa más probable?",
      options: [
        "El controlador de la impresora se dañó en todas las PC al mismo tiempo",
        "El servicio Cola de impresión está detenido en la computadora de Ana",
        "Windows bloqueó la impresora después de una actualización de seguridad",
        "La impresora tomó otra IP por DHCP y el puerto apunta a la anterior"
      ],
      answer: 3,
      explain: "La impresora tiene una IP distinta a la del puerto, algo típico cuando recibe IP por DHCP sin reserva. Un servicio detenido en una sola PC no afectaría a todo el piso.",
      reveal: "Redes confirma que la impresora no tenía IP fija ni reserva DHCP; ayer, después de un corte de luz, recibió otra dirección."
    },
    {
      id: "tk01d", level: 1, type: "mc",
      q: "¿Qué solución evita que esto vuelva a pasar?",
      options: [
        "Cambiar el puerto solo en la PC de Ana a la IP nueva y cerrar el caso",
        "Reservarle una IP en DHCP y que los puertos de las PC usen esa IP",
        "Reiniciar la impresora cada mañana para que conserve la misma IP",
        "Reinstalar la impresora en todas las PC del piso con la IP de hoy"
      ],
      answer: 1,
      explain: "Una reserva DHCP (o una IP fija) hace que la impresora conserve siempre la misma dirección. Cambiar solo la PC de Ana deja al resto sin imprimir y se repetiría.",
      reveal: "Redes reserva 192.168.1.50 para la impresora; al reiniciarla vuelve a esa IP y el ping ya responde."
    },
    {
      id: "tk01e", level: 1, type: "scenario",
      q: "Escenario: la impresora ya responde, pero en la cola de Ana siguen los trabajos viejos en «Error». ¿Qué haces antes de cerrar?",
      options: [
        "Cerrar el ticket de inmediato, porque la impresora ya contesta el ping",
        "Reiniciar la PC de Ana varias veces hasta que los trabajos salgan solos",
        "Cancelar esos trabajos, pedirle una prueba y documentar el ticket",
        "Quitar la impresora de todas las PC para que no quede ningún trabajo"
      ],
      answer: 2,
      explain: "Los trabajos atascados se cancelan para liberar la cola, se confirma con una impresión real y se documenta la causa. Que responda el ping no prueba que Ana ya imprima."
    }
  ]
});

// ——— 🔒 Su cuenta se bloquea cada mañana ———
addTicket({
  id: "tk02", level: 2, world: "identity", icon: "🔒",
  title: "Su cuenta se bloquea cada mañana",
  ticket: "Luis Ortega (Ventas), prioridad alta: «Todas las mañanas mi cuenta amanece bloqueada. Me la desbloquean y al rato se vuelve a bloquear. Cambié mi contraseña la semana pasada.»",
  steps: [
    {
      id: "tk02a", level: 2, type: "mc",
      q: "Además de desbloquear la cuenta, ¿qué dato le pides primero a Luis?",
      options: [
        "Su contraseña actual, para probar yo si de verdad funciona",
        "En qué otros equipos o apps usa su cuenta además de su PC",
        "Si prefiere que le desactivemos el bloqueo de cuenta",
        "Cuántas veces al día se equivoca al escribir su contraseña"
      ],
      answer: 1,
      explain: "Tras un cambio de contraseña, los bloqueos repetidos suelen venir de otro dispositivo que sigue usando la contraseña vieja. Nunca se pide la contraseña al usuario.",
      reveal: "Luis tiene el correo en su celular y a veces usa una laptop vieja del área que se queda encendida en su escritorio."
    },
    {
      id: "tk02b", level: 2, type: "scenario",
      q: "Escenario: necesitas saber desde qué equipo salen los intentos fallidos que bloquean la cuenta. ¿Qué revisas?",
      options: [
        "El historial del navegador de Luis por si entró a sitios peligrosos",
        "El Visor de eventos de la PC de Luis, en el registro de Aplicación",
        "La lista de programas instalados en la PC de Luis desde la semana pasada",
        "El evento 4740 en el registro de Seguridad del controlador de dominio"
      ],
      answer: 3,
      explain: "El evento 4740 (cuenta bloqueada) se registra en los controladores de dominio, sobre todo en el emulador de PDC, e indica el equipo de origen (Caller Computer Name). No se busca en la PC del usuario.",
      reveal: "El evento 4740 indica como equipo de origen LAP-VENTAS07, la laptop vieja que Luis deja encendida en su escritorio."
    },
    {
      id: "tk02c", level: 2, type: "mc",
      q: "Con esa evidencia, ¿cuál es la causa más probable de los bloqueos?",
      options: [
        "La laptop sigue intentando autenticarse con la contraseña anterior",
        "El celular tiene guardada la contraseña anterior en la app de correo",
        "Alguien en Internet está intentando adivinar la contraseña de Luis",
        "La política de bloqueo del dominio tiene un umbral demasiado bajo"
      ],
      answer: 0,
      explain: "El 4740 señala a la laptop como origen, así que ahí está la contraseña vieja. El celular es la sospecha más común, pero esta vez la evidencia apunta a otro equipo.",
      reveal: "En la laptop hay una unidad mapeada con el usuario de Luis; en el Administrador de credenciales, esa credencial es de antes de su cambio de contraseña."
    },
    {
      id: "tk02d", level: 2, type: "mc",
      q: "¿Cómo lo resuelves de raíz?",
      options: [
        "Excluir la cuenta de Luis de la política de bloqueo del dominio",
        "Crearle a Luis una cuenta nueva y deshabilitar la que usa ahora mismo",
        "Borrar la credencial vieja, mapear de nuevo la unidad y desbloquear",
        "Programar una tarea que desbloquee su cuenta todas las mañanas"
      ],
      answer: 2,
      explain: "Al quitar la credencial vieja, la laptop deja de generar intentos fallidos y el desbloqueo ya no es temporal. Saltarse el bloqueo solo esconde el problema y debilita la seguridad.",
      reveal: "Con la credencial actualizada y la unidad mapeada de nuevo, la cuenta queda desbloqueada y en la tarde no aparecen nuevos eventos 4740."
    },
    {
      id: "tk02e", level: 2, type: "mc",
      q: "¿Qué haces para cerrar bien el ticket?",
      options: [
        "Cerrarlo hoy mismo sin esperar a ver si mañana se vuelve a bloquear",
        "Pedirle a Luis que no vuelva a cambiar su contraseña para evitarlo",
        "Apagar y guardar la laptop sin avisarle a Luis ni a su jefe directo",
        "Confirmar con Luis al día siguiente y anotar el equipo y la causa"
      ],
      answer: 3,
      explain: "Como el bloqueo pasaba cada mañana, se confirma al otro día que ya no ocurrió y se documentan el equipo de origen y la causa. Pedirle que no cambie su contraseña no resuelve nada."
    }
  ]
});

// ——— 📶 No tiene internet en su PC ———
addTicket({
  id: "tk03", level: 1, world: "networks", icon: "📶",
  title: "No tiene internet en su PC",
  ticket: "Carlos Méndez (Almacén), prioridad alta: «Me cambiaron de escritorio y desde entonces mi computadora no tiene internet. Las de mis compañeros sí funcionan.»",
  steps: [
    {
      id: "tk03a", level: 1, type: "mc",
      q: "¿Qué dato reúnes primero en la PC de Carlos?",
      options: [
        "La versión de su navegador y sus extensiones",
        "La lista de programas que arrancan con Windows",
        "El espacio libre que queda en su disco duro C:",
        "Su configuración IP, con el comando ipconfig"
      ],
      answer: 3,
      explain: "ipconfig muestra si la PC tiene IP válida, máscara, puerta de enlace y DNS; es el primer dato en cualquier falla de red. El navegador no explica que no haya conexión.",
      try: "En una terminal de Windows escribe `ipconfig` y busca tu dirección IPv4, la máscara de subred y la puerta de enlace predeterminada.",
      reveal: "ipconfig muestra la IPv4 169.254.37.12, máscara 255.255.0.0 y sin puerta de enlace. El adaptador Ethernet aparece conectado."
    },
    {
      id: "tk03b", level: 1, type: "mc",
      q: "¿Qué significa que la PC tenga una IP 169.254.x.x?",
      options: [
        "Que el servidor DNS no puede resolver nombres de dominio",
        "Que no recibió respuesta de ningún servidor DHCP (APIPA)",
        "Que alguien le puso una IP fija equivocada a la tarjeta",
        "Que el firewall de Windows está bloqueando la navegación"
      ],
      answer: 1,
      explain: "Windows se asigna una dirección 169.254.x.x (APIPA) cuando pide IP por DHCP y nadie le responde. Con esa IP no tiene puerta de enlace y no sale a internet.",
      reveal: "Al ejecutar ipconfig /renew, Windows indica que no puede contactar con el servidor DHCP."
    },
    {
      id: "tk03c", level: 1, type: "scenario",
      q: "Escenario: a los compañeros de Carlos el DHCP sí les funciona. ¿Cómo averiguas si la falla es de su PC o del nodo de su nuevo escritorio?",
      options: [
        "Reinstalar el controlador de la tarjeta de red y reiniciar la computadora",
        "Ponerle a mano la misma IP que tiene la PC del compañero de al lado",
        "Conectar su PC, con el mismo cable, al nodo de un compañero que funciona",
        "Desactivar el firewall de Windows y volver a pedir la IP por DHCP"
      ],
      answer: 2,
      explain: "Probar el mismo equipo y cable en un nodo que sí funciona aísla la falla: si ahí recibe IP, el problema está en el nodo o el puerto. Copiar la IP de otro causa un conflicto.",
      reveal: "En el nodo de su compañero, la PC recibe 10.10.20.45 al instante. De vuelta en su nodo, otra vez toma una IP 169.254.x.x."
    },
    {
      id: "tk03d", level: 1, type: "scenario",
      q: "Escenario: la PC y el cable funcionan en otro nodo, pero en el de su escritorio no recibe IP. ¿Qué haces ahora?",
      options: [
        "Escalar a redes con el número de nodo y las pruebas que hiciste",
        "Dejarle a Carlos una IP fija copiada de otra PC para que navegue",
        "Cambiar la tarjeta de red de la PC por una nueva sin más pruebas",
        "Reiniciar el servidor DHCP de la empresa en pleno horario laboral"
      ],
      answer: 0,
      explain: "El puerto del switch lo administra redes, así que se escala con evidencia: nodo, IP APIPA y la prueba en otro nodo. Una IP fija copiada provocaría un conflicto de direcciones.",
      reveal: "Redes encuentra que el puerto del switch de ese nodo estaba en una VLAN sin DHCP y lo cambia a la VLAN de usuarios."
    },
    {
      id: "tk03e", level: 1, type: "mc",
      q: "Redes ya corrigió el puerto. ¿Qué haces antes de cerrar el ticket?",
      options: [
        "Cerrarlo de inmediato, porque redes ya dijo que quedó corregido",
        "Renovar la IP, comprobar que navegue y anotar el nodo y la causa",
        "Ponerle una IP fija por si vuelve a fallar el puerto del switch",
        "Pedirle a Carlos que reinicie su PC y avise si mañana sigue igual"
      ],
      answer: 1,
      explain: "Se verifica con el usuario que la PC ya recibe IP por DHCP y navega, y se documentan el nodo y la causa para casos futuros. Cerrar sin probar puede dejar el problema vivo."
    }
  ]
});

// ——— 🌐 Un sitio interno no abre ———
addTicket({
  id: "tk04", level: 2, world: "networks", icon: "🌐",
  title: "Un sitio interno no abre",
  ticket: "Marta Gil (Recursos Humanos), prioridad media: «Desde hoy no me abre la intranet de nómina (nomina.empresa.mx), pero Google, el correo y todo lo demás sí funcionan.»",
  steps: [
    {
      id: "tk04a", level: 2, type: "mc",
      q: "¿Qué le preguntas primero a Marta para acotar la falla?",
      options: [
        "¿A sus compañeros sí les abre ese mismo sitio de nómina?",
        "¿Qué versión de Windows tiene instalada en su computadora?",
        "¿Ya intentó reinstalar el navegador y borrar sus extensiones?",
        "¿Cuándo fue la última vez que cambió su contraseña de red?"
      ],
      answer: 0,
      explain: "Si el sitio abre para otros, el servidor está bien y el problema está en la PC de Marta o en cómo resuelve el nombre. Reinstalar el navegador sin diagnosticar es perder tiempo.",
      reveal: "A sus compañeros sí les abre. A Marta el navegador se queda cargando y al final dice que no se puede acceder al sitio."
    },
    {
      id: "tk04b", level: 2, type: "scenario",
      q: "Escenario: sospechas de la resolución de nombres en la PC de Marta. ¿Qué haces primero?",
      options: [
        "Cambiar el DNS de su tarjeta de red a 8.8.8.8 y volver a intentar",
        "Reinstalar el navegador y borrar todas las extensiones instaladas",
        "Comparar la IP que da nslookup con la IP a la que va ping por nombre",
        "Desactivar el antivirus y el firewall para ver si con eso abre el sitio"
      ],
      answer: 2,
      explain: "nslookup pregunta directo al servidor DNS, mientras que ping usa la caché local y el archivo hosts; si dan IP distintas, el problema está en la PC. Un DNS público no conoce nombres internos.",
      try: "En una terminal de Windows escribe `nslookup google.com` y observa qué servidor DNS te respondió y qué direcciones IP entregó.",
      reveal: "nslookup da 10.20.0.45, pero ping a nomina.empresa.mx va a 10.20.0.12 y el archivo hosts no tiene entradas. Infraestructura cambió hoy en la mañana la IP del servidor."
    },
    {
      id: "tk04c", level: 2, type: "mc",
      q: "¿Cuál es la causa más probable de que solo Marta no pueda entrar?",
      options: [
        "El servidor DNS de la empresa tiene el registro equivocado",
        "Su PC tiene guardada en caché la IP anterior del sitio",
        "El servidor de nómina está caído y no responde a nadie",
        "El navegador de Marta tiene mal configurado el proxy"
      ],
      answer: 1,
      explain: "El DNS ya da la IP nueva y el archivo hosts está limpio, así que la PC de Marta sigue usando una respuesta vieja de su caché DNS. Si el registro estuviera mal, fallaría para todos.",
      reveal: "ipconfig /displaydns muestra que la caché DNS de la PC de Marta todavía tiene nomina.empresa.mx con la IP anterior, 10.20.0.12."
    },
    {
      id: "tk04d", level: 2, type: "mc",
      q: "¿Cómo lo corriges en la PC de Marta?",
      options: [
        "Pedir a infraestructura que regrese el servidor a su IP anterior",
        "Reiniciar el servidor DNS de la empresa para que olvide el registro",
        "Reinstalar la tarjeta de red de Marta desde el Administrador de dispositivos",
        "Vaciar la caché DNS con ipconfig /flushdns y volver a abrir el sitio"
      ],
      answer: 3,
      explain: "ipconfig /flushdns borra las respuestas guardadas y la PC vuelve a preguntar al DNS, que ya da la IP nueva. Reiniciar el servidor DNS no limpia la caché de la PC de Marta.",
      reveal: "Tras vaciar la caché, el ping ya va a 10.20.0.45 y la intranet de nómina abre normal en el navegador de Marta."
    },
    {
      id: "tk04e", level: 2, type: "mc",
      q: "La intranet ya abre. ¿Qué haces antes de cerrar el ticket?",
      options: [
        "Cerrarlo sin avisarle, porque el ping ya responde a la IP correcta",
        "Dejarle un script que borre la caché DNS cada hora de forma automática",
        "Confirmar con Marta que ya entra y anotar la causa y el comando usado",
        "Cambiarle el DNS a uno público para que no le vuelva a pasar mañana"
      ],
      answer: 2,
      explain: "Se confirma con la usuaria que el sitio funciona y se documentan causa y solución, útiles si otras PC fallan por el mismo cambio de IP. Un DNS público no resuelve nombres internos."
    }
  ]
});

// ——— 🐢 Su PC está lentísima ———
addTicket({
  id: "tk05", level: 1, world: "windows", icon: "🐢",
  title: "Su PC está lentísima",
  ticket: "Jorge Salas (Compras), prioridad media: «Mi computadora está lentísima desde hace días. Tarda muchísimo en arrancar y Excel se congela cuando abro mis archivos.»",
  steps: [
    {
      id: "tk05a", level: 1, type: "mc",
      q: "¿Qué le preguntas primero a Jorge?",
      options: [
        "¿Quiere que le instale un programa que acelera la computadora?",
        "¿Desde cuándo pasa y si cambió algo en ese tiempo en su PC?",
        "¿Le parece si formateamos su PC para dejarla como nueva hoy?",
        "¿Ya le pidió a su jefe que le compren una computadora nueva?"
      ],
      answer: 1,
      explain: "Saber desde cuándo ocurre y qué cambió (programas, archivos, avisos) orienta el diagnóstico. Formatear o instalar programas sin diagnosticar es excesivo y puede empeorarlo.",
      reveal: "Empezó hace una semana, cuando Jorge comenzó a descargar a su PC los videos de capacitación. Le sale un aviso de poco espacio en disco."
    },
    {
      id: "tk05b", level: 1, type: "mc",
      q: "¿Qué herramienta abres primero para ver qué está consumiendo los recursos de la PC?",
      options: [
        "El Editor del Registro, para borrar claves viejas",
        "La herramienta Desfragmentar y optimizar unidades",
        "El Administrador de dispositivos (devmgmt.msc)",
        "El Administrador de tareas (Ctrl+Shift+Esc)"
      ],
      answer: 3,
      explain: "El Administrador de tareas muestra en vivo el uso de CPU, memoria y disco, y qué apps inician con Windows. Desfragmentar o tocar el Registro a ciegas no diagnostica nada.",
      reveal: "En el Administrador de tareas el disco está al 100% y hay 14 apps de inicio habilitadas. En el Explorador, C: tiene solo 1.2 GB libres de 237 GB."
    },
    {
      id: "tk05c", level: 1, type: "mc",
      q: "Con esos datos, ¿cuál es la causa más probable de la lentitud?",
      options: [
        "La memoria RAM está dañada y hay que cambiar los dos módulos",
        "El procesador ya es muy viejo para la versión de Windows",
        "El disco C: está casi lleno y hay demasiadas apps de inicio",
        "Excel está dañado y hay que reinstalar Office completo"
      ],
      answer: 2,
      explain: "Con C: casi sin espacio, Windows no tiene margen para archivos temporales ni memoria virtual, y muchas apps de inicio alargan el arranque. Nada indica una falla de RAM.",
      reveal: "En el Explorador ves que Descargas ocupa 80 GB, casi todo en videos de capacitación que también están en la carpeta compartida del área."
    },
    {
      id: "tk05d", level: 1, type: "mc",
      q: "¿Qué haces para resolver la lentitud?",
      options: [
        "Con su visto bueno, borrar esos videos y quitar apps de inicio de más",
        "Borrar toda la carpeta Descargas sin preguntarle nada a Jorge",
        "Formatear la PC y reinstalar Windows con todos sus programas",
        "Instalar un optimizador gratuito de Internet para que limpie todo solo"
      ],
      answer: 0,
      explain: "Liberar espacio en C: y deshabilitar apps de inicio que no usa ataca justo la causa. Se hace con permiso del usuario; borrar sin avisar puede eliminar archivos que necesita.",
      reveal: "Tras vaciar la Papelera, C: queda con más de 80 GB libres; al reiniciar, el disco ya no se queda al 100% y Windows arranca mucho más rápido."
    },
    {
      id: "tk05e", level: 1, type: "mc",
      q: "¿Qué haces antes de cerrar el ticket?",
      options: [
        "Cerrarlo en cuanto termina de reiniciar, sin hablar con Jorge",
        "Desactivar Windows Update para que ya no vuelva a ocupar espacio",
        "Programar un formateo de su PC cada seis meses por prevención",
        "Confirmar con Jorge que ya va bien y documentar lo que hiciste"
      ],
      answer: 3,
      explain: "Se cierra cuando el usuario confirma que mejoró, documentando la causa y lo que se hizo. Desactivar Windows Update deja la PC sin parches de seguridad."
    }
  ]
});

// ——— 📧 Outlook no recibe correos nuevos ———
addTicket({
  id: "tk06", level: 2, world: "support", icon: "📧",
  title: "Outlook no recibe correos nuevos",
  ticket: "Patricia León (Dirección), prioridad alta: «Desde la mañana no me llegan correos a Outlook. Me dicen que ya me enviaron varios mensajes y no los veo.»",
  steps: [
    {
      id: "tk06a", level: 2, type: "mc",
      q: "¿Qué revisas primero para saber si el problema es del buzón o de Outlook en su PC?",
      options: [
        "Si su contraseña ya tiene más de 90 días sin cambiarse",
        "Si su PC tiene instaladas todas las actualizaciones",
        "Si los correos nuevos sí aparecen en Outlook en la web",
        "Si su antivirus tiene los correos en cuarentena"
      ],
      answer: 2,
      explain: "Outlook en la web lee el buzón directo del servidor: si ahí están los correos, el buzón funciona y la falla está en Outlook de escritorio o en su perfil.",
      reveal: "En Outlook en la web sí están los correos de hoy. En su Outlook clásico de escritorio, el último que aparece es de ayer a las 6 p. m."
    },
    {
      id: "tk06b", level: 2, type: "scenario",
      q: "Escenario: el buzón recibe bien, pero Outlook de escritorio no muestra nada nuevo desde ayer. ¿Qué revisas primero ahí?",
      options: [
        "La barra de estado, por si dice «Trabajando sin conexión»",
        "La firma y el formato predeterminado de los mensajes",
        "Las reglas de reenvío que tiene creadas en el servidor",
        "La lista de remitentes bloqueados de su correo no deseado"
      ],
      answer: 0,
      explain: "Si Outlook quedó en «Trabajar sin conexión», deja de sincronizar y no muestra correos nuevos aunque el buzón los reciba. Es lo más rápido de descartar.",
      reveal: "La barra de estado indica que está conectado a Microsoft Exchange. Aun así, al presionar Enviar y recibir, la Bandeja de entrada no se actualiza."
    },
    {
      id: "tk06c", level: 2, type: "mc",
      q: "Con todo lo que sabes, ¿cuál es la causa más probable?",
      options: [
        "Su buzón está lleno y el servidor ya rechaza todos los correos nuevos",
        "Outlook quedó en modo sin conexión desde ayer en la tarde",
        "Los remitentes están escribiendo mal la dirección de Patricia",
        "El archivo de datos .ost de su perfil está dañado y no sincroniza"
      ],
      answer: 3,
      explain: "Con el buzón lleno, los correos tampoco estarían en Outlook en la web, y la barra de estado descarta el modo sin conexión. Queda la copia local (.ost) que no sincroniza.",
      reveal: "La carpeta Problemas de sincronización muestra errores desde ayer a las 6 p. m. Patricia no usa archivos .pst: todo su correo está en el buzón del servidor."
    },
    {
      id: "tk06d", level: 2, type: "mc",
      q: "¿Cuál es la solución adecuada?",
      options: [
        "Borrar correos del buzón hasta liberar la mitad de su espacio",
        "Crear un perfil nuevo de Outlook para que descargue un .ost nuevo",
        "Reinstalar Windows completo para que Outlook vuelva a quedar como nuevo",
        "Desactivar el modo de intercambio en caché en todas las PC"
      ],
      answer: 1,
      explain: "El .ost es solo una copia local del buzón: con un perfil nuevo, Outlook vuelve a descargar todo desde el servidor. Borrar correos no sirve porque el buzón no estaba lleno.",
      reveal: "Con el perfil nuevo, Outlook empieza a descargar el buzón y los correos de hoy aparecen en la Bandeja de entrada."
    },
    {
      id: "tk06e", level: 2, type: "mc",
      q: "¿Qué haces antes de cerrar el ticket?",
      options: [
        "Cerrarlo en cuanto se crea el perfil, sin esperar la sincronización",
        "Borrar el perfil anterior y su .ost sin avisarle antes a Patricia",
        "Esperar a que sincronice, confirmar con Patricia y anotar la causa",
        "Pedirle su contraseña para dejarla anotada en el ticket por si acaso"
      ],
      answer: 2,
      explain: "Se espera a que termine de sincronizar, se confirma con la usuaria que ya ve sus correos y se documenta la causa. Una contraseña nunca se pide ni se anota en un ticket."
    }
  ]
});

// ——— 🎧 No lo escuchan en Teams ———
addTicket({
  id: "tk07", level: 1, world: "support", icon: "🎧",
  title: "No lo escuchan en Teams",
  ticket: "Luis Méndez (Ventas), prioridad media: «En las reuniones de Teams yo escucho a todos, pero nadie me escucha a mí. Ayer funcionaba bien.»",
  steps: [
    {
      id: "tk07a", level: 1, type: "mc",
      q: "Antes de tocar nada, ¿qué le preguntas primero a Luis?",
      options: [
        "Qué diadema usa, si cambió algo desde ayer y si le pasa en todas las reuniones",
        "Su contraseña de Microsoft 365 para entrar a su Teams y revisar la configuración",
        "Nada; le pides que reinstale Teams de inmediato porque así se arregla casi siempre",
        "Nada; lo escalas a redes, porque si no se oye su voz es un problema de internet"
      ],
      answer: 0,
      explain: "Primero se reúnen datos: qué equipo usa, qué cambió y si el problema es general. Pedir la contraseña nunca es válido y reinstalar sin diagnosticar es actuar a ciegas.",
      reveal: "Luis conectó hoy una diadema USB nueva, le pasa en todas las reuniones y el botón de silencio del cable de la diadema no está activado."
    },
    {
      id: "tk07b", level: 1, type: "scenario",
      q: "Escenario: quieres saber si Windows recibe la voz de la diadema nueva. ¿Qué revisas primero?",
      options: [
        "En el Administrador de dispositivos, desinstalar todos los controladores de audio de la laptop",
        "En la página del fabricante, actualizar el BIOS de la laptop por si no reconoce dispositivos USB",
        "En el almacén, pedir otra diadema igual y cambiarla sin hacer más pruebas con la que ya tiene",
        "En la configuración de sonido, la entrada: que la diadema aparezca y su barra se mueva al hablar"
      ],
      answer: 3,
      explain: "La entrada de sonido de Windows muestra si el micrófono existe y capta la voz, lo que separa una falla física de una de configuración. Desinstalar controladores o tocar el BIOS es cambiar cosas sin diagnóstico.",
      reveal: "En Windows la diadema aparece y su barra se mueve al hablar, y en Privacidad y seguridad Teams tiene permiso para usar el micrófono."
    },
    {
      id: "tk07c", level: 1, type: "mc",
      q: "Con lo que viste en Windows, ¿cuál es la causa más probable?",
      options: [
        "La diadema está dañada y su micrófono ya no capta la voz",
        "La privacidad de Windows le impide a Teams usar el micrófono",
        "Teams tiene seleccionado un micrófono distinto de la diadema",
        "Su conexión a internet es demasiado lenta para enviar audio"
      ],
      answer: 2,
      explain: "Si Windows capta la voz y Teams tiene permiso, el problema está dentro de Teams, que puede seguir usando otro micrófono. Con internet lento, Luis tampoco escucharía bien a los demás.",
      reveal: "En Teams, Configuración > Dispositivos, el micrófono elegido es el integrado de la laptop, que está cerrada en su base."
    },
    {
      id: "tk07d", level: 1, type: "mc",
      q: "¿Cómo lo arreglas?",
      options: [
        "Reinstalar Teams por completo para que detecte la diadema nueva desde cero",
        "En Dispositivos de Teams elegir la diadema y hacer una llamada de prueba",
        "Desactivar el micrófono integrado de la laptop desde el BIOS del equipo",
        "Pedirle que abra la laptop y hable cerca de ella durante las reuniones"
      ],
      answer: 1,
      explain: "Elegir el micrófono correcto en Teams corrige la causa, y la llamada de prueba lo comprueba con su propia voz. Reinstalar es más lento y no garantiza que elija la diadema.",
      reveal: "En la llamada de prueba de Teams, Luis escucha su grabación con claridad."
    },
    {
      id: "tk07e", level: 1, type: "mc",
      q: "Antes de cerrar el ticket, ¿qué haces?",
      options: [
        "Confirmar con Luis en una reunión real y anotar causa y solución",
        "Cerrarlo de inmediato sin avisarle, porque la llamada de prueba salió bien",
        "Dejarlo abierto una semana completa por si el problema vuelve a aparecer",
        "Escalarlo a nivel 2 para que ellos revisen la diadema y cierren el ticket"
      ],
      answer: 0,
      explain: "Se cierra cuando el usuario confirma que funciona en su uso real, y anotar causa y solución ayuda en el siguiente caso igual. Cerrar sin avisar o escalar algo ya resuelto son malas prácticas."
    }
  ]
});

// ——— ☁️ OneDrive dejó de sincronizar ———
addTicket({
  id: "tk08", level: 2, world: "cloud", icon: "☁️",
  title: "OneDrive dejó de sincronizar",
  ticket: "Paola Ríos (Recursos Humanos), prioridad media: «Desde el lunes, lo que guardo en mi carpeta de OneDrive no aparece en mi otra computadora ni en la web.»",
  steps: [
    {
      id: "tk08a", level: 2, type: "mc",
      q: "¿Qué datos reúnes primero?",
      options: [
        "Su contraseña de Microsoft 365 para entrar a su OneDrive desde tu computadora",
        "Qué muestra el ícono de OneDrive y si fallan todos los archivos o algunos",
        "Ninguno; desvincular su cuenta de OneDrive y vincularla de nuevo de inmediato",
        "El número de serie y la fecha de compra de su computadora para la garantía"
      ],
      answer: 1,
      explain: "El ícono de OneDrive resume su estado (pausa, errores, espacio) y saber si fallan todos o algunos archivos separa un problema general de uno de nombres. Desvincular sin diagnóstico no aclara nada.",
      reveal: "El ícono de OneDrive muestra un aviso y no sube ningún archivo desde el lunes, día en que Paola copió ahí una carpeta con videos de capacitación."
    },
    {
      id: "tk08b", level: 2, type: "scenario",
      q: "Escenario: abres el panel de OneDrive desde la barra de tareas de Paola. ¿Qué revisas ahí primero?",
      options: [
        "Si la sincronización está en pausa y qué avisos o errores muestra",
        "La lista de programas instalados, para quitar los que Paola ya no use",
        "La versión de Windows, para actualizarla antes de revisar cualquier cosa",
        "El historial del navegador, para saber qué sitios abrió Paola el lunes"
      ],
      answer: 0,
      explain: "El panel de OneDrive dice si está en pausa y muestra los avisos de espacio, de nombres no válidos o de conflictos. Actualizar Windows o quitar programas es cambiar cosas sin saber la causa.",
      reveal: "OneDrive no está en pausa. El panel avisa que su OneDrive está lleno: Paola ya usa los 100 GB que la empresa asigna a cada persona."
    },
    {
      id: "tk08c", level: 2, type: "mc",
      q: "Paola pregunta por qué tampoco suben sus archivos pequeños de Excel. ¿Qué le explicas?",
      options: [
        "OneDrive se pausa solo cuando detecta archivos muy grandes, como esos videos",
        "Los nombres de archivo con acentos no son válidos en OneDrive y se bloquean",
        "Los archivos de Excel que están abiertos quedan en conflicto y nunca suben",
        "Sin espacio libre, OneDrive no puede subir archivos nuevos ni sus cambios"
      ],
      answer: 3,
      explain: "Con la cuota llena, OneDrive deja de subir cambios sin importar su tamaño. Los acentos sí se permiten en los nombres, y la pausa automática no depende del tamaño de los archivos.",
      reveal: "Los videos ocupan casi todo su espacio. Su jefa confirma que deben estar en el sitio de SharePoint de Recursos Humanos."
    },
    {
      id: "tk08d", level: 2, type: "mc",
      q: "¿Cómo lo resuelves?",
      options: [
        "Restablecer OneDrive para que vuelva a revisar y subir todos sus archivos",
        "Desvincular OneDrive y que guarde todo en una carpeta local por un tiempo",
        "Mover los videos al sitio de SharePoint del área para liberar su espacio",
        "Borrar los videos de su OneDrive para liberar el espacio de inmediato"
      ],
      answer: 2,
      explain: "Mover los videos a SharePoint libera su cuota y los deja donde el área los comparte. Restablecer OneDrive no crea espacio, y borrarlos pierde material que el área necesita.",
      reveal: "OneDrive vuelve a sincronizar, pero junto a «Nómina.xlsx» aparece una copia con el nombre de su computadora agregado."
    },
    {
      id: "tk08e", level: 2, type: "scenario",
      q: "Escenario: Paola editó «Nómina.xlsx» en sus dos computadoras mientras no sincronizaba. Antes de cerrar, ¿qué haces?",
      options: [
        "Borrar la copia con el nombre de la computadora, porque es un archivo temporal",
        "Revisar con ella ambas versiones, quedarse con la correcta y documentar",
        "Cerrar el ticket ya; OneDrive combina por sí solo los cambios de ambas versiones",
        "Desactivar la sincronización en su segunda computadora para que no se repita"
      ],
      answer: 1,
      explain: "Es un conflicto de versiones: OneDrive conserva las dos copias y no decide cuál vale. Hay que compararlas con la usuaria antes de borrar algo; borrar la copia a ciegas puede perder su trabajo."
    }
  ]
});

// ——— 📁 Desapareció su unidad Z: ———
addTicket({
  id: "tk09", level: 2, world: "windows", icon: "📁",
  title: "Desapareció su unidad Z:",
  ticket: "Jorge Salinas (Finanzas), prioridad alta: «Hoy trabajo desde casa y no me aparece la unidad Z: con los reportes. Ayer en la oficina sí estaba.»",
  steps: [
    {
      id: "tk09a", level: 2, type: "mc",
      q: "¿Qué le preguntas primero a Jorge?",
      options: [
        "Su contraseña de red para mapearle tú la unidad Z: desde tu equipo",
        "Nada; pides que vuelvan a crear la carpeta compartida en el servidor",
        "Si ya conectó la VPN y cómo se ve la unidad Z: en Este equipo",
        "Nada; le pides que reinicie el módem de su casa varias veces seguidas"
      ],
      answer: 2,
      explain: "Desde casa, el servidor de archivos solo se alcanza por la VPN, así que es lo primero que se confirma junto con el estado de la unidad. Pedir su contraseña nunca es una opción.",
      reveal: "Jorge no había conectado la VPN; ya la conectó. En Este equipo, Z: sí está, pero con una X roja."
    },
    {
      id: "tk09b", level: 2, type: "scenario",
      q: "Escenario: con la VPN activa, Z: sigue con la X roja. ¿Qué comando ejecutas en la sesión de Jorge para ver sus unidades de red y su estado?",
      options: ["net view", "net use", "net user", "net share"],
      answer: 1,
      explain: "net use lista las unidades mapeadas de la sesión con su ruta y su estado. net view muestra equipos de la red o los recursos que comparte uno, y net user administra cuentas de usuario.",
      try: "En una terminal de Windows (cmd o PowerShell) escribe `net use` para ver tus unidades de red mapeadas, su ruta y su estado.",
      reveal: "net use lista Z: hacia \\\\srv-archivos\\reportes, pero sin conectar. Esa ruta sí abre en el Explorador con la VPN activa."
    },
    {
      id: "tk09c", level: 2, type: "mc",
      q: "¿Qué explica mejor lo que pasó con la unidad Z:?",
      options: [
        "Windows intentó reconectarla al iniciar sesión, cuando aún no había VPN",
        "Su cuenta perdió los permisos sobre la carpeta de reportes del servidor",
        "El servidor eliminó el recurso compartido de reportes durante la noche",
        "La VPN de la empresa bloquea cualquier unidad mapeada por seguridad"
      ],
      answer: 0,
      explain: "La unidad quedó guardada, pero al iniciar sesión el servidor no estaba al alcance y Windows no pudo reconectarla. Si la ruta abre con la VPN, no faltan permisos ni se borró el recurso.",
      reveal: "Desde casa, Jorge inicia sesión en Windows y luego conecta la VPN. Z: está guardada para reconectarse en cada inicio de sesión."
    },
    {
      id: "tk09d", level: 2, type: "mc",
      q: "¿Cómo dejas funcionando la unidad Z: hoy?",
      options: [
        "Reinstalar el cliente VPN para que la unidad Z: se reconecte sola en cada conexión",
        "Copiar todos los reportes a su escritorio para que trabaje sin la unidad Z:",
        "Borrar su perfil de usuario de Windows para que Z: se mapee desde cero",
        "Con la VPN activa, reconectar Z:; si pide credenciales, que Jorge las escriba"
      ],
      answer: 3,
      explain: "Con el servidor al alcance, Z: se reconecta sin rehacer nada y, si pide credenciales, las escribe el usuario. Reinstalar la VPN no ayuda porque ya funciona, y copiar reportes crea versiones sueltas.",
      reveal: "Z: se reconecta al abrirla y Jorge ya ve sus reportes."
    },
    {
      id: "tk09e", level: 2, type: "mc",
      q: "Antes de cerrar el ticket, ¿qué haces?",
      options: [
        "Cerrar el ticket sin avisarle, porque la unidad ya no tiene la X roja",
        "Pedir que quiten la unidad Z: a todo Finanzas para evitar más reportes",
        "Explicarle que conecte la VPN antes de abrir Z:, confirmar y documentar",
        "Escalar el caso a infraestructura para que revisen el servidor de archivos"
      ],
      answer: 2,
      explain: "Enseñarle el orden correcto evita que el ticket se repita, y confirmar y documentar cierra bien el caso. Escalar no aplica: el servidor funcionaba y la falla estaba en la reconexión."
    }
  ]
});

// ——— 🎣 Cayó en un correo de phishing ———
addTicket({
  id: "tk10", level: 3, world: "security", icon: "🎣",
  title: "Cayó en un correo de phishing",
  ticket: "Diana Ortega (Compras), prioridad alta: «Me llegó un correo de Microsoft que decía que mi buzón estaba lleno. Di clic, puse mi contraseña y la página se quedó en blanco.»",
  steps: [
    {
      id: "tk10a", level: 3, type: "mc",
      q: "¿Qué haces primero con este reporte?",
      options: [
        "Pedirle la contraseña que escribió para comprobar si era la verdadera",
        "Decirle que borre el correo y que no pasa nada si su cuenta sigue abriendo",
        "Pedirle que reinstale Outlook para eliminar lo que haya dejado el correo",
        "Avisar a seguridad y reunir hora, enlace y si aprobó algún aviso de MFA"
      ],
      answer: 3,
      explain: "Una posible cuenta comprometida se reporta de inmediato y se reúnen los datos clave, sobre todo si aprobó un MFA. Borrar el correo sin más pierde evidencia y deja la cuenta expuesta.",
      reveal: "Fue hace 20 minutos. Justo después le llegó un aviso de MFA al celular y lo aprobó. Los registros de Entra ID muestran un inicio de sesión exitoso desde otro país."
    },
    {
      id: "tk10b", level: 3, type: "scenario",
      q: "Escenario: el atacante tiene su contraseña y una sesión aprobada con MFA. ¿Qué contención haces primero?",
      options: [
        "Solo cambiar su contraseña, porque eso cierra al instante toda sesión",
        "Desactivar el MFA de Diana para que el atacante ya no reciba avisos",
        "Restablecer su contraseña y revocar todas sus sesiones activas",
        "Esperar a ver si hay más actividad rara antes de tocar su cuenta"
      ],
      answer: 2,
      explain: "La contraseña nueva frena accesos nuevos, pero los tokens ya emitidos pueden seguir sirviendo un tiempo; por eso se revocan las sesiones. Quitar el MFA debilita la cuenta en el peor momento.",
      reveal: "Listo. Al revisar sus métodos de autenticación aparece una app autenticadora registrada hoy que Diana no reconoce."
    },
    {
      id: "tk10c", level: 3, type: "mc",
      q: "¿Qué haces con ese método de autenticación que Diana no reconoce?",
      options: [
        "Dejarlo; con la contraseña nueva ese método ya no le sirve al atacante",
        "Quitarlo y confirmar con ella que sus propios métodos siguen correctos",
        "Dejarlo hasta que seguridad termine de revisar todos sus inicios de sesión",
        "Agregarle un segundo método igual para que ella también pueda usarlo"
      ],
      answer: 1,
      explain: "Un método MFA del atacante le daría el segundo factor si vuelve a conseguir la contraseña, así que se elimina ya. Esperar a que termine la revisión le deja esa puerta abierta.",
      reveal: "Además, en su buzón hay una regla creada hoy que reenvía a una cuenta de Gmail los correos que dicen «factura»."
    },
    {
      id: "tk10d", level: 3, type: "scenario",
      q: "Escenario: encontraste esa regla de reenvío en el buzón de Diana. ¿Qué haces?",
      options: [
        "Documentarla, eliminarla y avisar a seguridad para revisar qué se reenvió",
        "Dejarla activa, porque Diana pudo crearla y no acordarse de haberlo hecho",
        "Borrar todo el contenido del buzón de Diana para eliminar cualquier rastro",
        "Bloquear esa cuenta de Gmail solo en el Outlook de la laptop de Diana"
      ],
      answer: 0,
      explain: "Las reglas de reenvío ocultas son típicas de cuentas comprometidas para seguir robando información. Se documentan como evidencia y se quitan; borrar el buzón destruye esa evidencia.",
      reveal: "Seguridad revisa los correos reenviados y bloquea el dominio del phishing para toda la empresa."
    },
    {
      id: "tk10e", level: 3, type: "mc",
      q: "¿Qué haces antes de cerrar el ticket?",
      options: [
        "Cerrarlo sin contarle nada a Diana para no preocuparla con más detalles",
        "Pedirle que abra otra vez el enlace del correo para comprobar que ya no funciona",
        "Pedirle que reenvíe el correo de phishing a su equipo como advertencia",
        "Confirmar que Diana entra bien, explicarle cómo detectar phishing y documentar"
      ],
      answer: 3,
      explain: "Se confirma que la usuaria recupera su acceso, se le enseña a detectar y reportar el engaño sin culparla y todo queda documentado. Reenviar el correo o abrir de nuevo el enlace repite el riesgo."
    }
  ]
});

// ——— 🆕 Alta de empleado para el lunes ———
addTicket({
  id: "tk11", level: 2, world: "identity", icon: "🆕",
  title: "Alta de empleado para el lunes",
  ticket: "Marta Gil (Recursos Humanos), prioridad media: «El lunes entra Raúl Peña como vendedor. Necesita correo, acceso a la carpeta de Ventas y al CRM, y su laptop lista ese día.»",
  steps: [
    {
      id: "tk11a", level: 2, type: "mc",
      q: "¿Qué necesitas antes de crear cualquier cosa?",
      options: [
        "La solicitud aprobada por su jefe con puesto, fecha de ingreso y accesos",
        "La contraseña que Raúl quiere usar, para dejarla configurada desde hoy",
        "Nada; creas la cuenta hoy y el lunes Raúl te dice qué accesos va a necesitar",
        "Solo su nombre completo; los accesos los defines tú el mismo lunes"
      ],
      answer: 0,
      explain: "Los accesos se dan según lo que aprueba por escrito el jefe, no lo que pida el usuario ni lo que decida soporte. La contraseña definitiva solo debe conocerla el usuario.",
      reveal: "Su jefe, Iván Soto, aprobó por escrito: correo, carpeta de Ventas y CRM. Las cuentas se crean en Entra ID y la carpeta de Ventas está en SharePoint."
    },
    {
      id: "tk11b", level: 2, type: "scenario",
      q: "Escenario: ya creaste la cuenta de Raúl. ¿Cómo le das acceso a la carpeta de Ventas y al CRM?",
      options: [
        "Darle permisos directos a su usuario en la carpeta de Ventas y en el CRM",
        "Copiarle todos los grupos del vendedor con más antigüedad del área",
        "Hacerlo administrador local de su laptop para que él se configure",
        "Agregarlo a los grupos que ya dan acceso a esa carpeta y al CRM"
      ],
      answer: 3,
      explain: "Dar accesos por grupos ordena las altas y bajas y entrega solo lo aprobado. Los permisos directos por usuario se vuelven inmanejables y copiar grupos de otro suele dar de más.",
      reveal: "Cuenta y grupos listos. Al buscar a Raúl en el centro de administración de Exchange, todavía no tiene buzón de correo."
    },
    {
      id: "tk11c", level: 2, type: "mc",
      q: "¿Por qué Raúl todavía no tiene buzón de correo?",
      options: [
        "El buzón se crea solo hasta que Raúl inicie sesión por primera vez el lunes",
        "Hay que esperar 72 horas a que Microsoft 365 termine de activar la cuenta",
        "Falta asignarle una licencia de Microsoft 365 que incluya Exchange Online",
        "El grupo de Ventas ya llegó a su máximo de miembros y bloquea el correo"
      ],
      answer: 2,
      explain: "En Microsoft 365, el buzón de un usuario se crea al asignarle una licencia que incluya Exchange Online. No depende de su primer inicio de sesión ni de esperar días.",
      reveal: "Con la licencia asignada, el buzón aparece en minutos. La laptop ya tiene la imagen de la empresa y está a nombre de Raúl en el inventario."
    },
    {
      id: "tk11d", level: 2, type: "order",
      q: "El lunes, Raúl recibe su laptop y una contraseña temporal que debe cambiar al entrar. Ordena lo que hacen juntos.",
      items: [
        "Iniciar sesión en la laptop con su usuario y la contraseña temporal",
        "Cambiar la contraseña temporal por una que solo él conozca",
        "Registrar su MFA con Microsoft Authenticator en su celular",
        "Probar con él el correo, la carpeta de Ventas y el CRM"
      ],
      answer: [0, 1, 2, 3],
      explain: "La contraseña temporal solo sirve para entrar y de inmediato se cambia; luego, al abrir Microsoft 365, se registra el MFA. Las pruebas van al final, con todo ya configurado.",
      reveal: "Raúl ya entra a todo y su MFA quedó registrado en su celular."
    },
    {
      id: "tk11e", level: 2, type: "mc",
      q: "¿Qué haces para cerrar el alta?",
      options: [
        "Confirmar con Raúl y Marta que todo funciona y documentar lo entregado",
        "Anotar su contraseña nueva en el ticket por si la olvida más adelante",
        "Cerrar el ticket desde el viernes, aunque nadie haya probado los accesos",
        "Dejar el ticket abierto todo el mes por si después pide más permisos"
      ],
      answer: 0,
      explain: "El alta se cierra cuando el usuario y quien la pidió confirman que todo funciona, con registro de accesos y equipo entregados. Una contraseña jamás se escribe en un ticket."
    }
  ]
});

// ——— 🔐 La VPN no conecta desde casa ———
addTicket({
  id: "tk12", level: 3, world: "networks", icon: "🔐",
  title: "La VPN no conecta desde casa",
  ticket: "Sergio Lara (Jurídico), prioridad alta: «Desde el lunes la VPN no conecta en mi casa. El internet sí funciona: en mi celular veo videos y mi correo. Hoy tengo que entregar un contrato.»",
  steps: [
    {
      id: "tk12a", level: 3, type: "mc",
      q: "¿Qué información reúnes primero para acotar la falla?",
      options: [
        "Su contraseña de red para probar tú la VPN con su cuenta desde la oficina",
        "El mensaje de error exacto y si falla antes o después del aviso de MFA",
        "Ninguna; le mandas el instalador del cliente VPN para que lo reinstale ya",
        "El nombre de su proveedor de internet para levantarle un reporte de falla"
      ],
      answer: 1,
      explain: "El mensaje exacto y el momento en que falla dicen en qué fase está el problema. Pedir la contraseña o reinstalar a ciegas son errores típicos de quien no diagnostica.",
      reveal: "Falla al instante, antes de pedir usuario o MFA: «El certificado del servidor no es válido». A otros sí les conecta, y en su laptop varias páginas web marcan error de certificado."
    },
    {
      id: "tk12b", level: 3, type: "scenario",
      q: "Escenario: la VPN funciona para los demás y el error es de certificado. ¿Qué revisas primero en la laptop de Sergio?",
      options: [
        "La fecha, la hora y la zona horaria que tiene configuradas Windows",
        "La velocidad de su internet con una prueba en un sitio de medición",
        "Que reinicie el módem de su casa y vuelva a probar en diez minutos",
        "Que cambie su contraseña de red desde el portal de autoservicio"
      ],
      answer: 0,
      explain: "Validar un certificado depende del reloj del equipo: con una fecha muy desfasada, uno bueno parece vencido o aún no vigente, en la VPN y en la web. Su internet y su contraseña no son el problema.",
      reveal: "El reloj de la laptop marca una fecha de hace dos años. Sergio cuenta que el fin de semana se le descargó la batería por completo."
    },
    {
      id: "tk12c", level: 3, type: "mc",
      q: "¿Cómo se relaciona esa fecha con el error de la VPN?",
      options: [
        "Con esa fecha, el MFA rechaza su usuario y contraseña por estar caducados",
        "Windows bloquea la VPN cuando su fecha no coincide con la fecha del módem",
        "La licencia del cliente VPN venció según esa fecha y el cliente dejó de funcionar",
        "Para esa fecha, el certificado del servidor aún no es vigente y se rechaza"
      ],
      answer: 3,
      explain: "Cada certificado tiene fechas de inicio y fin de vigencia que se comparan con el reloj local; hace dos años, el del servidor aún no se emitía. El MFA ni siquiera llegó a pedirse.",
      reveal: "La laptop está unida al dominio y sincroniza su hora con los controladores de dominio, a los que desde casa solo llega por la VPN."
    },
    {
      id: "tk12d", level: 3, type: "scenario",
      q: "Escenario: sin VPN, la laptop no puede corregir su hora sola. ¿Cómo lo resuelves hoy?",
      options: [
        "Reinstalar el cliente VPN para que descargue un certificado nuevo del servidor",
        "Pedirle que confíe en el certificado aunque marque error y que siga adelante",
        "Con permisos de administrador, poner a mano la fecha y hora y reconectar",
        "Pedirle que traiga la laptop a la oficina mañana para revisarla en persona"
      ],
      answer: 2,
      explain: "Cambiar la hora del sistema pide permisos de administrador; con la hora correcta el certificado se valida y, ya en la VPN, el equipo sincroniza con el dominio. Aceptar un certificado con error expone a un intermediario.",
      reveal: "Con la hora corregida, el cliente pide el MFA, Sergio lo aprueba y la VPN conecta. La hora ya se sincroniza con el dominio."
    },
    {
      id: "tk12e", level: 3, type: "mc",
      q: "Antes de cerrar el ticket, ¿qué haces?",
      options: [
        "Cerrarlo sin más: la VPN ya conecta y la hora se sincroniza con el dominio",
        "Confirmar con Sergio, documentar y pedir revisión de la pila del reloj",
        "Desactivar la revisión de certificados en el cliente VPN de toda la empresa",
        "Pedirle que nunca apague la laptop para que no vuelva a perder la fecha"
      ],
      answer: 1,
      explain: "Si la fecha se pierde al agotarse la batería, la pila del reloj (CMOS o RTC) probablemente falló y volverá a pasar. Desactivar la validación de certificados deja expuestos a todos."
    }
  ]
});
