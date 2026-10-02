/**
 * Tech Quest — Mundo Identidad y Microsoft 365
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "identity",
  name: "Identidad y Microsoft 365",
  icon: "🔑",
  color: "#33d1c6",
  description: "Cuentas de AD, contraseñas, MFA, Outlook, Teams, OneDrive y Entra ID.",

  questions: [
    // ——— Nivel 1: Básico (10 preguntas) ———
    {
      id: "msL1a", level: 1, type: "mc",
      q: "En un dominio de Active Directory, ¿qué suele pasar si un usuario escribe mal su contraseña más veces de las que permite la directiva?",
      options: [
        "La cuenta se bloquea según la directiva de bloqueo",
        "La cuenta se deshabilita y hay que crear otra nueva",
        "La contraseña caduca y el sistema pide una distinta",
        "El equipo sale del dominio y hay que volver a unirlo"
      ],
      answer: 0,
      explain: "La directiva de bloqueo de cuentas la bloquea al llegar al umbral de intentos; se libera al cumplirse la duración configurada o cuando soporte la desbloquea. No la deshabilita."
    },
    {
      id: "msL1b", level: 1, type: "tf",
      q: "Una cuenta deshabilitada en Active Directory vuelve a quedar activa sola después de unos minutos, sin que nadie la toque.",
      answer: false,
      explain: "Falso: una cuenta deshabilitada sigue así hasta que un administrador la vuelve a habilitar en AD; el paso del tiempo no la reactiva."
    },
    {
      id: "msL1c", level: 1, type: "fill",
      q: "Combinación de teclas que, con la sesión de Windows iniciada, abre la pantalla de seguridad con la opción 'Cambiar una contraseña':",
      answer: "Ctrl+Alt+Supr",
      accept: [
        "Ctrl+Alt+Supr",
        "Ctrl + Alt + Supr",
        "Ctrl+Alt+Suprimir",
        "Ctrl + Alt + Suprimir",
        "Ctrl+Alt+Del",
        "Ctrl + Alt + Del",
        "Ctrl+Alt+Delete",
        "Ctrl + Alt + Delete",
        "Control+Alt+Supr",
        "Control + Alt + Supr",
        "Control+Alt+Suprimir",
        "Control + Alt + Suprimir",
        "Control+Alt+Del",
        "Control + Alt + Del",
        "Control+Alt+Delete",
        "Control + Alt + Delete",
        "Ctrl-Alt-Supr",
        "Ctrl-Alt-Suprimir",
        "Ctrl-Alt-Del",
        "Ctrl-Alt-Delete",
        "Ctrl Alt Supr",
        "Ctrl Alt Suprimir",
        "Ctrl Alt Del",
        "Ctrl Alt Delete",
        "Ctrl+Alt+Sup",
        "Ctrl + Alt + Sup",
        "Alt+Ctrl+Supr",
        "Alt + Ctrl + Supr",
        "Alt+Ctrl+Del",
        "Alt + Ctrl + Del"
      ],
      explain: "Ctrl+Alt+Supr abre la pantalla de seguridad: bloquear, cambiar de usuario, cerrar sesión o cambiar una contraseña. Dentro de Escritorio remoto se usa Ctrl+Alt+Fin."
    },
    {
      id: "msL1d", level: 1, type: "mc",
      q: "¿Qué es Active Directory Domain Services (AD DS) en una empresa?",
      options: [
        "Directorio que guarda las cuentas y valida los inicios de sesión",
        "Servicio que asigna direcciones IP a los equipos de la red local",
        "Servicio que respalda en la nube los archivos de cada usuario",
        "Programa que cifra los discos de los equipos de la empresa"
      ],
      answer: 0,
      explain: "AD DS guarda usuarios, equipos y grupos del dominio, y sus controladores de dominio validan los inicios de sesión. Asignar direcciones IP es trabajo de DHCP, no de AD."
    },
    {
      id: "msL1e", level: 1, type: "identify",
      q: "¿Qué consola usa la mesa de ayuda para desbloquear una cuenta o restablecer la contraseña de un usuario del dominio?",
      options: [
        "dsa.msc (Usuarios y equipos de AD)",
        "lusrmgr.msc (Usuarios y grupos locales)",
        "gpmc.msc (Administración de directivas de grupo)",
        "compmgmt.msc (Administración de equipos)"
      ],
      answer: 0,
      explain: "dsa.msc abre Usuarios y equipos de Active Directory (ADUC), donde se desbloquean y restablecen cuentas del dominio. lusrmgr.msc solo administra las cuentas locales del equipo."
    },
    {
      id: "msL1f", level: 1, type: "tf",
      q: "Si agregan a un usuario a un grupo de seguridad de AD, normalmente debe cerrar sesión y volver a entrar para que su nuevo permiso a una carpeta compartida funcione.",
      answer: true,
      explain: "Los grupos del usuario se cargan en su token de acceso al iniciar sesión. Hasta que cierra sesión y vuelve a entrar, Windows sigue usando la lista de grupos anterior."
    },
    {
      id: "msL1g", level: 1, type: "match",
      q: "Empareja cada icono de OneDrive en el Explorador de archivos con su significado:",
      pairs: [
        { left: "Nube azul", right: "Solo en línea; no ocupa espacio en el equipo" },
        { left: "Palomita verde en círculo blanco", right: "Disponible localmente porque ya se abrió" },
        { left: "Círculo verde sólido con palomita blanca", right: "Siempre disponible en este dispositivo" },
        { left: "Dos flechas en círculo", right: "Sincronización en curso" }
      ],
      explain: "Con Archivos a petición, lo que está solo en línea se descarga al abrirlo. La opción 'Mantener siempre en este dispositivo' lo marca con el círculo verde sólido."
    },
    {
      id: "msL1h", level: 1, type: "order",
      q: "Ordena los pasos para conectar una unidad de red desde el Explorador de archivos:",
      items: [
        "Abrir el Explorador de archivos en 'Este equipo'",
        "Elegir la opción 'Conectar a unidad de red'",
        "Escoger la letra y escribir \\\\servidor\\recurso",
        "Pulsar Finalizar y ver la nueva unidad en 'Este equipo'"
      ],
      answer: [0, 1, 2, 3],
      explain: "Antes de Finalizar revisa que esté marcada 'Conectar de nuevo al iniciar sesión'; si no, la unidad ya no aparece la próxima vez que el usuario inicie sesión."
    },
    {
      id: "msL1i", level: 1, type: "scenario",
      q: "Escenario: estás en tu casa viendo una película y tu celular muestra una solicitud de Microsoft Authenticator para aprobar un inicio de sesión que tú no hiciste. ¿Qué haces?",
      options: [
        "Rechazarla, avisar a soporte y cambiar tu contraseña",
        "Aprobarla para que ya no lleguen más notificaciones",
        "Aprobarla solo si el número coincide con la pantalla",
        "Ignorarla, porque sin tu aprobación nadie puede entrar"
      ],
      answer: 0,
      explain: "Una solicitud que no pediste suele indicar que alguien ya tiene tu contraseña. Rechazarla frena ese intento, pero hay que avisar y cambiarla; ignorarla deja tu cuenta expuesta."
    },
    {
      id: "msL1j", level: 1, type: "mc",
      q: "En Microsoft Teams, ¿cuál es la diferencia principal entre un chat y un canal?",
      options: [
        "El chat es con quien eliges; el canal vive dentro de un equipo",
        "El chat solo permite dos personas; el canal admite a todo un grupo",
        "El chat es solo para texto; en el canal también se hacen llamadas",
        "El chat se borra a los 30 días; el canal guarda todo el historial"
      ],
      answer: 0,
      explain: "Un chat (1:1 o de grupo) es con las personas que agregas; un canal pertenece a un equipo y lo ven sus miembros. En ambos se comparten archivos y se hacen reuniones."
    },

    // ——— Nivel 2: Intermedio (10 preguntas) ———
    {
      id: "msL2a", level: 2, type: "mc",
      q: "¿Qué describe mejor a Microsoft Entra ID (antes Azure AD)?",
      options: [
        "Servicio de identidad en la nube para Microsoft 365 y otras apps",
        "Versión nueva de AD DS que se instala en los controladores de dominio",
        "Consola para crear y vincular GPO a las OU del dominio local",
        "Servicio que sincroniza los archivos del usuario con la nube"
      ],
      answer: 0,
      explain: "Entra ID autentica en la nube (Microsoft 365, apps SaaS, MFA, Conditional Access). No reemplaza a AD DS local: muchas empresas sincronizan ambos con Entra Connect."
    },
    {
      id: "msL2b", level: 2, type: "fill",
      q: "Comando de CMD que vuelve a aplicar todas las directivas de grupo del equipo y del usuario, incluso las que no cambiaron:",
      answer: "gpupdate /force",
      accept: [
        "gpupdate /force",
        "gpupdate.exe /force",
        "gpupdate /force /wait:0",
        "gpupdate /wait:0 /force"
      ],
      explain: "gpupdate solo aplica lo que cambió; con /force reaplica todas las directivas. Algunas, como instalar software o redirigir carpetas, piden cerrar sesión o reiniciar.",
      try: "En CMD de una PC con Windows Pro o del trabajo escribe `gpupdate /?` para ver sus opciones; solo muestra la ayuda y no aplica nada."
    },
    {
      id: "msL2c", level: 2, type: "identify",
      q: "¿Qué comando muestra en la consola qué GPO se aplicaron y a qué grupos de seguridad pertenece el usuario?",
      options: ["gpresult /r", "whoami /groups", "net accounts", "systeminfo"],
      answer: 0,
      explain: "gpresult /r resume el conjunto resultante de directivas (RSoP): GPO aplicadas o filtradas y grupos del usuario. whoami /groups muestra los grupos, pero no las GPO.",
      try: "En CMD de una PC con Windows Pro o del trabajo escribe `gpresult /r`; solo consulta datos y, sin ser administrador, muestra la parte del usuario."
    },
    {
      id: "msL2d", level: 2, type: "tf",
      q: "Si pausas la sincronización de OneDrive, los cambios que hagas en tus archivos mientras está en pausa se pierden.",
      answer: false,
      explain: "Falso: los cambios quedan guardados en el equipo y se suben al reanudar. La pausa solo detiene la sincronización por 2, 8 o 24 horas, o hasta que la reanudes."
    },
    {
      id: "msL2e", level: 2, type: "order",
      q: "Ordena cómo la mesa de ayuda restablece la contraseña de un usuario en Usuarios y equipos de Active Directory:",
      items: [
        "Buscar la cuenta del usuario en la consola",
        "Clic derecho en la cuenta → Restablecer contraseña",
        "Escribir una temporal y marcar que la cambie al iniciar sesión",
        "El usuario entra con la temporal y define una nueva"
      ],
      answer: [0, 1, 2, 3],
      explain: "Con la casilla 'El usuario debe cambiar la contraseña en el siguiente inicio de sesión', solo el usuario conoce su contraseña final y soporte no la guarda."
    },
    {
      id: "msL2f", level: 2, type: "scenario",
      q: "Escenario: Outlook avisa que el buzón superó su cuota. El usuario borró 2 GB de correos viejos, pero el aviso sigue igual. ¿Qué es lo más probable?",
      options: [
        "Los correos siguen en Elementos eliminados y cuentan",
        "La cuota del buzón solo se recalcula una vez al mes",
        "El archivo .ost local llegó a su tamaño máximo",
        "Hay que reiniciar el equipo para que libere el espacio"
      ],
      answer: 0,
      explain: "Borrar sin Shift solo mueve los correos a Elementos eliminados, que también cuenta para la cuota. Hay que vaciar esa carpeta para liberar espacio en el buzón."
    },
    {
      id: "msL2g", level: 2, type: "match",
      q: "Empareja cada concepto de Outlook clásico para Windows con lo que es:",
      pairs: [
        { left: "Archivo .ost", right: "Copia local en caché de un buzón de Exchange o M365" },
        { left: "Archivo .pst", right: "Archivo de datos personal para archivar o exportar" },
        { left: "Modo de intercambio en caché", right: "Outlook trabaja con la copia local y sincroniza" },
        { left: "Perfil de Outlook", right: "Conjunto de cuentas y configuración que abre Outlook" }
      ],
      explain: "Un .ost dañado se regenera desde el servidor; un .pst puede ser la única copia de esos correos, así que se respalda antes de borrarlo o moverlo."
    },
    {
      id: "msL2h", level: 2, type: "fill",
      q: "Comando de CMD que, escrito sin más parámetros, lista las unidades de red conectadas con su letra, su ruta y su estado:",
      answer: "net use",
      accept: ["net use", "net.exe use"],
      explain: "net use sin parámetros muestra cada conexión con su estado, letra y ruta \\\\servidor\\recurso. Con net use Z: \\\\servidor\\recurso se conecta una unidad.",
      try: "En CMD de Windows escribe `net use` para ver tus unidades de red; solo las lista y no cambia nada."
    },
    {
      id: "msL2i", level: 2, type: "order",
      q: "Ordena cómo un usuario restablece su propia contraseña con el autoservicio (SSPR) de Microsoft Entra:",
      items: [
        "Registrar antes sus métodos de verificación",
        "Abrir el enlace de contraseña olvidada al iniciar sesión",
        "Comprobar su identidad con esos métodos",
        "Escribir y confirmar la contraseña nueva"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin métodos registrados (Authenticator, teléfono, correo alterno) SSPR no puede verificar al usuario. Con escritura diferida (writeback), la contraseña nueva también llega al AD local."
    },
    {
      id: "msL2j", level: 2, type: "scenario",
      q: "Escenario: Teams de escritorio muestra fotos de perfil viejas y algunos chats no cargan, pero en Teams web todo se ve bien con la misma cuenta. ¿Qué paso es razonable?",
      options: [
        "Cerrar Teams por completo y borrar su caché local",
        "Restablecer la contraseña del usuario en el dominio",
        "Quitar la licencia de Teams y volver a asignarla",
        "Pedirle que cambie su estado a Disponible y espere"
      ],
      answer: 0,
      explain: "Si la web funciona, la cuenta y la licencia están bien y el problema es local. Borrar la caché (en el nuevo Teams, Restablecer la app) obliga a descargar todo de nuevo."
    },

    // ——— Nivel 3: Avanzado (10 preguntas) ———
    {
      id: "msL3a", level: 3, type: "scenario",
      q: "Escenario: la cuenta de dominio de un usuario se bloquea varias veces al día desde que cambió su contraseña, aunque él escribe bien la nueva. ¿Cuál es la causa más probable?",
      options: [
        "Un celular o equipo sigue usando la contraseña anterior",
        "La contraseña nueva no cumple la directiva de complejidad",
        "Su equipo perdió la relación de confianza con el dominio",
        "Su cuenta se deshabilitó por tener la contraseña caducada"
      ],
      answer: 0,
      explain: "El correo del celular, una unidad mapeada o el Administrador de credenciales con la clave vieja reintentan solos y bloquean la cuenta. El evento 4740 del DC indica el origen."
    },
    {
      id: "msL3b", level: 3, type: "tf",
      q: "Con Known Folder Move de OneDrive activo, borrar un archivo del Escritorio en una PC también lo borra en OneDrive y en las otras PC sincronizadas.",
      answer: true,
      explain: "Known Folder Move convierte el Escritorio en una carpeta de OneDrive, así que el borrado se sincroniza. El archivo se puede recuperar desde la Papelera de reciclaje de OneDrive."
    },
    {
      id: "msL3c", level: 3, type: "tf",
      q: "En Usuarios y equipos de AD, restablecer la contraseña de una cuenta bloqueada la desbloquea automáticamente, sin marcar nada más.",
      answer: false,
      explain: "Falso: el cuadro Restablecer contraseña tiene una casilla aparte para desbloquear la cuenta. Si no se marca, el usuario tiene contraseña nueva pero sigue bloqueado."
    },
    {
      id: "msL3d", level: 3, type: "fill",
      q: "Nombre del cmdlet de PowerShell (módulo ActiveDirectory) que desbloquea una cuenta de usuario del dominio:",
      answer: "Unlock-ADAccount",
      accept: ["Unlock-ADAccount"],
      explain: "Unlock-ADAccount -Identity usuario quita el bloqueo. Para encontrar cuentas bloqueadas se usa Search-ADAccount -LockedOut; ambos requieren RSAT o un DC."
    },
    {
      id: "msL3e", level: 3, type: "match",
      q: "Empareja cada estado de una cuenta de AD con lo que significa:",
      pairs: [
        { left: "Bloqueada", right: "Superó los intentos fallidos permitidos" },
        { left: "Deshabilitada", right: "Un administrador la desactivó a propósito" },
        { left: "Contraseña caducada", right: "Superó la antigüedad máxima de la contraseña" },
        { left: "Cuenta expirada", right: "Pasó la fecha de vencimiento de la cuenta" }
      ],
      explain: "Cada estado se resuelve distinto: desbloquear, habilitar, cambiar la contraseña o ampliar la fecha en la pestaña Cuenta. Confundirlos alarga el ticket."
    },
    {
      id: "msL3f", level: 3, type: "order",
      q: "Ordena cómo se procesan las directivas de grupo en un equipo del dominio, de la primera a la última aplicada:",
      items: [
        "Directiva local del equipo",
        "GPO vinculadas al sitio de AD",
        "GPO vinculadas al dominio",
        "GPO vinculadas a las OU, de la superior a la del objeto"
      ],
      answer: [0, 1, 2, 3],
      explain: "Es el orden LSDOU: local, sitio, dominio y OU. Ante un conflicto gana la última aplicada (la OU más cercana), salvo que una GPO de nivel superior esté marcada como Enforced (exigida)."
    },
    {
      id: "msL3g", level: 3, type: "scenario",
      q: "Escenario: un usuario no ve la unidad S: que sí ven sus compañeros. Las unidades se asignan por GPO a los miembros de un grupo, y él dice que lo agregaron ayer. ¿Qué revisas primero?",
      options: [
        "Con gpresult /r, si su sesión tiene el grupo y la GPO",
        "Darle Control total en NTFS para que la unidad aparezca",
        "Reiniciar el servidor de archivos para refrescar grupos",
        "Pedir que lo saquen del grupo y lo vuelvan a agregar"
      ],
      answer: 0,
      explain: "gpresult /r muestra los grupos de la sesión y las GPO aplicadas o filtradas. Si falta el grupo, debe cerrar sesión; si aparece, revisa el filtrado de la GPO o la preferencia de unidad."
    },
    {
      id: "msL3h", level: 3, type: "mc",
      q: "Una laptop está unida solo a Microsoft Entra ID (no a AD local) y se administra con Intune. Una configuración nueva aún no le llega. ¿Qué acelera que la reciba?",
      options: [
        "Sincronizar el equipo con Intune desde Configuración",
        "Ejecutar gpupdate /force en una consola de administrador",
        "Reiniciar el servicio de Windows Update en la laptop",
        "Cerrar sesión en Teams y Outlook y volver a iniciarla"
      ],
      answer: 0,
      explain: "Intune entrega la configuración por MDM, no por GPO; gpupdate solo procesa directivas de grupo. Se sincroniza desde la cuenta de trabajo en Configuración > Cuentas o en Portal de empresa."
    },
    {
      id: "msL3i", level: 3, type: "scenario",
      q: "Escenario: Outlook clásico de escritorio no muestra correos nuevos desde ayer y no dice 'Trabajando sin conexión', pero en Outlook en la Web sí aparecen en la Bandeja de entrada. ¿Qué paso tiene más sentido?",
      options: [
        "Crear un perfil nuevo para regenerar el archivo .ost",
        "Pedir al administrador de Exchange que amplíe la cuota",
        "Revisar si una regla está moviendo los correos de carpeta",
        "Restablecer la contraseña del usuario en Microsoft Entra"
      ],
      answer: 0,
      explain: "Si en la web llegan a la Bandeja de entrada, el buzón, la cuota, la cuenta y las reglas están bien: falla la copia local. Un perfil nuevo descarga un .ost limpio desde el servidor."
    },
    {
      id: "msL3j", level: 3, type: "scenario",
      q: "Escenario: un usuario entra sin problema a Microsoft 365 desde su laptop de la empresa, pero desde su PC personal le aparece que su dispositivo no cumple los requisitos de acceso. ¿Qué es lo más probable?",
      options: [
        "Conditional Access exige un dispositivo administrado",
        "Su cuenta de AD local está bloqueada solo en ese equipo",
        "Su perfil de Windows en la PC personal está dañado",
        "Su licencia de Microsoft 365 no admite equipos personales"
      ],
      answer: 0,
      explain: "Conditional Access puede exigir un equipo que cumpla las directivas de Intune o unido a Entra híbrido. La laptop de la empresa lo cumple; la PC personal, sin administrar, no."
    },

    // ——— Nivel 4: Experto (10 preguntas) ———
    {
      id: "msL4a", level: 4, type: "mc",
      q: "Necesitas saber desde qué equipo se bloqueó la cuenta de un usuario. ¿Qué evento buscas en el registro de Seguridad del controlador de dominio, de preferencia en el emulador PDC?",
      options: ["4740", "4625", "4771", "4767"],
      answer: 0,
      explain: "El 4740 registra el bloqueo e incluye Caller Computer Name, el equipo de origen; el 4625 y el 4771 solo anotan intentos fallidos, y el 4767 es el desbloqueo."
    },
    {
      id: "msL4b", level: 4, type: "fill",
      q: "Ya corregiste la causa de un bloqueo masivo. Completa la línea de PowerShell que desbloquea de un jalón todas las cuentas bloqueadas: Search-ADAccount -LockedOut | ______",
      answer: "Unlock-ADAccount",
      accept: [
        "Unlock-ADAccount",
        "| Unlock-ADAccount",
        "Unlock-ADAccount -Confirm:$false",
        "Unlock-ADAccount -PassThru",
        "Unlock-ADAccount -Verbose",
        "Search-ADAccount -LockedOut | Unlock-ADAccount",
        "ForEach-Object { Unlock-ADAccount $_ }",
        "ForEach-Object {Unlock-ADAccount $_}",
        "ForEach-Object { Unlock-ADAccount -Identity $_ }",
        "ForEach-Object {Unlock-ADAccount -Identity $_}",
        "% { Unlock-ADAccount $_ }",
        "%{Unlock-ADAccount $_}"
      ],
      explain: "Search-ADAccount -LockedOut devuelve las cuentas bloqueadas y la canalización se las pasa a Unlock-ADAccount; con -WhatIf ves antes qué desbloquearía."
    },
    {
      id: "msL4c", level: 4, type: "tf",
      q: "Si el reloj de una PC del dominio va 10 minutos adelantado respecto al controlador de dominio, la autenticación Kerberos puede fallar con la configuración predeterminada.",
      answer: true,
      explain: "Kerberos tolera por defecto un desfase de reloj de 5 minutos; con más diferencia el DC rechaza la solicitud (KRB_AP_ERR_SKEW) y el usuario no puede autenticarse."
    },
    {
      id: "msL4d", level: 4, type: "tf",
      q: "Con la sincronización de hash de contraseñas (Password Hash Sync) de Entra Connect, la contraseña de cada usuario se envía a Microsoft Entra ID en texto claro.",
      answer: false,
      explain: "Falso: Entra Connect nunca envía la contraseña; manda un hash derivado del hash NT, con salt y 1000 iteraciones de HMAC-SHA256, y Entra ID valida contra ese valor."
    },
    {
      id: "msL4e", level: 4, type: "fill",
      q: "Comando de Windows que muestra los tickets de Kerberos guardados en caché para tu sesión actual:",
      answer: "klist",
      accept: ["klist", "klist.exe", "klist tickets", "klist.exe tickets"],
      explain: "klist lista los tickets de Kerberos (el TGT y los de servicio) con su vigencia; klist purge los borra para forzar que se pidan de nuevo.",
      try: "En una terminal de Windows escribe `klist` para ver tus tickets de Kerberos; en una PC que no está en un dominio la lista suele salir vacía."
    },
    {
      id: "msL4f", level: 4, type: "scenario",
      q: "Escenario: eliminas en Microsoft 365 la cuenta de un empleado que ya se fue; en Entra ID su campo Manager apunta a su jefa. Con la configuración predeterminada, ¿qué pasa con su OneDrive?",
      options: [
        "Se conserva 30 días y su jefa recibe acceso para rescatar archivos",
        "Se borra en ese momento junto con la cuenta y ya no se puede recuperar",
        "Sus archivos se mueven solos al OneDrive de su jefa y se combinan",
        "Queda en solo lectura para todo su departamento hasta que TI lo borre"
      ],
      answer: 0,
      explain: "OneDrive conserva 30 días (ajustable) los archivos de un usuario eliminado y da acceso a su Manager; nada se mueve solo, así que hay que copiar lo que se quiera conservar."
    },
    {
      id: "msL4g", level: 4, type: "match",
      q: "Empareja cada tipo de destinatario de Exchange Online con el uso que mejor le queda:",
      pairs: [
        { left: "Buzón compartido", right: "Bandeja común como soporte@ que varios abren con permisos" },
        { left: "Lista de distribución", right: "Solo reparte cada correo a todos sus miembros" },
        { left: "Grupo de Microsoft 365", right: "Correo, calendario, archivos y Planner para un equipo" },
        { left: "Grupo de seguridad habilitado para correo", right: "Da permisos sobre recursos y además recibe correo" }
      ],
      explain: "La lista de distribución solo reparte correo; el grupo de Microsoft 365 suma calendario, archivos y Planner; el de seguridad además da permisos, y el buzón compartido se abre con Full Access."
    },
    {
      id: "msL4h", level: 4, type: "order",
      q: "Ordena el flujo de Windows Autopilot para una laptop nueva que se envía de la fábrica directo al usuario:",
      items: [
        "Registrar el hash de hardware del equipo en Autopilot",
        "El equipo registrado queda con un perfil de Autopilot asignado",
        "El usuario se conecta a internet e inicia sesión con su cuenta de trabajo",
        "El equipo se une a Entra ID, se inscribe en Intune y recibe sus apps"
      ],
      answer: [0, 1, 2, 3],
      explain: "Sin el hash registrado el equipo no puede tener perfil, y lo descarga al conectarse en la configuración inicial; con el inicio de sesión se une a Entra ID, se inscribe en Intune y llegan las apps."
    },
    {
      id: "msL4i", level: 4, type: "scenario",
      q: "Escenario: un empleado recibe una laptop corporativa que TI aún no inscribe en ninguna herramienta de gestión. Al abrir Outlook, Conditional Access lo bloquea porque exige 'dispositivo marcado como compatible'. ¿Qué lo resuelve sin debilitar la seguridad?",
      options: [
        "Inscribir la laptop en Intune para que se evalúe su cumplimiento",
        "Restablecer su contraseña y pedirle que registre MFA de nuevo",
        "Unir la laptop a Entra ID, pero sin inscribirla en Intune",
        "Excluirlo de la política para que trabaje sin ninguna restricción"
      ],
      answer: 0,
      explain: "El estado 'compatible' lo reporta Intune cuando un equipo inscrito cumple las directivas de cumplimiento; unirlo a Entra ID sin inscribirlo no basta, y excluir al usuario abre un hueco."
    },
    {
      id: "msL4j", level: 4, type: "identify",
      q: "Una usuaria dice que nunca le llegó la factura de un proveedor. ¿Qué herramienta te dice si ese correo se entregó, se fue a cuarentena o lo rechazaron?",
      options: [
        "Rastreo de mensajes (message trace)",
        "Búsqueda de contenido de eDiscovery",
        "Registro de auditoría del buzón",
        "Registros de inicio de sesión de Entra"
      ],
      answer: 0,
      explain: "El rastreo de mensajes muestra el recorrido del correo (entregado, en cuarentena, filtrado o fallido); eDiscovery busca contenido en buzones, no el estado de entrega."
    },

    // ——— Nivel 5: Maestro (10 preguntas) ———
    {
      id: "msL5a", level: 5, type: "scenario",
      q: "Escenario: desde que cambió su contraseña, la cuenta de AD de Carlos se bloquea cada mañana. El bloqueo registrado en el emulador PDC señala como equipo de origen al servidor de Exchange local, no a su laptop. ¿Causa más probable?",
      options: [
        "Su celular sigue sincronizando el correo con la contraseña vieja",
        "Una tarea programada de su laptop se ejecuta con la contraseña vieja",
        "Su laptop tiene la hora desfasada más de 5 minutos respecto al DC",
        "Una unidad mapeada en su laptop guarda credenciales anteriores"
      ],
      answer: 0,
      explain: "Si el origen es el servidor de Exchange, alguien se autentica a través de él, típicamente ActiveSync del celular con la clave vieja; una tarea o unidad mapeada de la laptop señalaría a la laptop."
    },
    {
      id: "msL5b", level: 5, type: "tf",
      q: "Con Pass-through Authentication, las contraseñas incorrectas escritas al iniciar sesión en Microsoft 365 pueden bloquear la cuenta en el Active Directory local.",
      answer: true,
      explain: "El agente de PTA valida contra un DC local, así que esos fallos suman al contador de AD; por eso el umbral de Smart Lockout de Entra debe ser menor que el de la directiva de AD."
    },
    {
      id: "msL5c", level: 5, type: "mc",
      q: "Para hallar cuentas inactivas usas Get-ADUser -Filter * -Properties LockedOut,LastLogonDate. ¿Qué debes tener en cuenta sobre LastLogonDate?",
      options: [
        "Se replica entre DC, pero puede ir atrasado hasta unos 14 días",
        "Solo refleja los inicios hechos en el DC al que te conectaste",
        "Se actualiza al instante en todos los DC en cada inicio de sesión",
        "Se reinicia a vacío cada vez que el usuario cambia su contraseña"
      ],
      answer: 0,
      explain: "LastLogonDate sale de lastLogonTimestamp, que se replica pero por defecto solo se actualiza si el valor ya tiene entre 9 y 14 días; lastLogon es exacto, pero cada DC guarda el suyo."
    },
    {
      id: "msL5d", level: 5, type: "fill",
      q: "En el servidor de Entra Connect, completa el comando que fuerza ya una sincronización solo de los cambios: Start-ADSyncSyncCycle -PolicyType ______",
      answer: "Delta",
      accept: [
        "Delta",
        "'Delta'",
        "\"Delta\"",
        "-PolicyType Delta",
        "Start-ADSyncSyncCycle -PolicyType Delta"
      ],
      explain: "Delta sincroniza solo lo que cambió desde el último ciclo (el automático corre cada 30 minutos); Initial hace una sincronización completa y tarda mucho más."
    },
    {
      id: "msL5e", level: 5, type: "match",
      q: "Empareja el permiso o ajuste de buzón de Exchange Online con su efecto:",
      pairs: [
        { left: "Full Access", right: "Abrir el buzón y leer o gestionar su contenido" },
        { left: "Send As", right: "Enviar correos que salen como del propio buzón" },
        { left: "Send on Behalf", right: "Enviar con la leyenda 'en nombre de' en el remitente" },
        { left: "AutoMapping", right: "Agrega el buzón automáticamente al Outlook del delegado" }
      ],
      explain: "Full Access deja abrir y gestionar el buzón, pero no enviar como él; Send As envía como el buzón, Send on Behalf muestra 'en nombre de' y AutoMapping lo agrega a Outlook."
    },
    {
      id: "msL5f", level: 5, type: "order",
      q: "Ordena cómo encontrar y eliminar el origen de un bloqueo de cuenta que se repite:",
      items: [
        "Filtrar el evento 4740 de esa cuenta en el emulador PDC",
        "Leer en el evento el equipo de origen (Caller Computer Name)",
        "En ese equipo, hallar la credencial o el proceso con la clave vieja",
        "Corregir esa credencial y después desbloquear la cuenta"
      ],
      answer: [0, 1, 2, 3],
      explain: "Cada paso necesita el anterior: el 4740 da el equipo de origen, ahí se halla la credencial vieja, y desbloquear antes de corregirla solo hace que la cuenta se vuelva a bloquear."
    },
    {
      id: "msL5g", level: 5, type: "scenario",
      q: "Escenario: la directiva de bloqueo tiene umbral de 5 intentos, duración de 30 minutos y restablece el contador después de 15 minutos. Ana falla 4 veces, espera 20 minutos y vuelve a fallar 2 veces. ¿Qué pasa?",
      options: [
        "No se bloquea: el contador volvió a 0 y solo lleva 2 fallos",
        "Se bloquea al primer fallo nuevo porque ya suma 5 intentos",
        "Se bloquea hasta que un administrador la desbloquee a mano",
        "Se bloquea 15 minutos, lo que marca el restablecimiento del contador"
      ],
      answer: 0,
      explain: "Tras 15 minutos sin fallos el contador vuelve a 0, así que los 2 fallos nuevos no llegan al umbral de 5; sin ese restablecimiento, el quinto fallo la habría bloqueado 30 minutos."
    },
    {
      id: "msL5h", level: 5, type: "scenario",
      q: "Escenario: Ana renuncia hoy. Su jefe debe seguir viendo y recibiendo su correo (buzón de 8 GB) y la empresa ya no quiere pagar su licencia. ¿Qué haces con el buzón?",
      options: [
        "Convertirlo en compartido, dar Full Access al jefe y quitar la licencia",
        "Quitar la licencia de inmediato y dar Full Access al jefe sobre el buzón",
        "Dejar la cuenta activa con licencia y pasarle la contraseña al jefe",
        "Borrar la cuenta y agregar su dirección como alias del buzón del jefe"
      ],
      answer: 0,
      explain: "Un buzón compartido de hasta 50 GB no necesita licencia, pero hay que convertirlo antes de quitarla: sin licencia, el buzón se borra al terminar el periodo de gracia de 30 días."
    },
    {
      id: "msL5i", level: 5, type: "fill",
      q: "Completa para restablecer la contraseña de jperez sin conocer la actual: Set-ADAccountPassword jperez ______ -NewPassword (Read-Host -AsSecureString)",
      answer: "-Reset",
      accept: ["-Reset", "-Reset:$true"],
      explain: "-Reset fija una contraseña nueva sin pedir la actual (requiere permiso para restablecer); sin él, el cmdlet hace un cambio normal y pide la contraseña anterior con -OldPassword."
    },
    {
      id: "msL5j", level: 5, type: "scenario",
      q: "Escenario: Intune marca la laptop de Pedro como compatible, pero Conditional Access lo sigue bloqueando al abrir Teams. ¿Dónde confirmas qué política lo bloqueó y por qué condición?",
      options: [
        "En su inicio de sesión de Entra ID, pestaña Conditional Access",
        "En el informe de cumplimiento del dispositivo dentro de Intune",
        "En el Visor de eventos de la laptop, registro de Seguridad",
        "En el centro de administración de Teams, sección Dispositivos"
      ],
      answer: 0,
      explain: "Cada inicio de sesión en Entra muestra, en su pestaña Conditional Access, qué políticas se aplicaron y cuál falló; Intune ya dice compatible, así que ahí no verás la causa."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "msB1", level: 5, type: "scenario",
      q: "BOSS: Lunes 9:00. Tres clientes avisan que Laura, de Cuentas por Pagar, les pidió por correo cambiar la cuenta bancaria para sus pagos. Los correos están en sus Elementos enviados, pero ella jura que no los mandó. ¿Cuál es tu primera acción?",
      options: [
        "Restablecer su contraseña y revocar todas sus sesiones activas",
        "Borrar de Elementos enviados los correos falsos para frenar el daño",
        "Pedirle que cambie su contraseña cuando termine sus pendientes",
        "Pasar un antivirus completo a su laptop antes de tocar la cuenta"
      ],
      answer: 0,
      explain: "Primero se corta el acceso del atacante: contraseña nueva y sesiones revocadas para que sus tokens ya no se renueven. Borrar los enviados destruye evidencia y no lo saca de la cuenta."
    },
    {
      id: "msB2", level: 5, type: "tf",
      q: "BOSS: Ya restableciste la contraseña de Laura. Las reglas de bandeja de entrada que creó el atacante para reenviar y esconder correos dejan de funcionar con ese cambio.",
      answer: false,
      explain: "Falso: las reglas viven en el buzón y se siguen ejecutando en el servidor sin importar la contraseña; hay que revisarlas y borrarlas, junto con cualquier reenvío configurado en el buzón."
    },
    {
      id: "msB3", level: 5, type: "match",
      q: "BOSS: Empareja cada pregunta de la investigación del caso de Laura con la herramienta que la responde:",
      pairs: [
        { left: "¿Desde dónde y cuándo entró el atacante?", right: "Registros de inicio de sesión de Entra ID" },
        { left: "¿A quién se enviaron los correos falsos?", right: "Rastreo de mensajes (message trace)" },
        { left: "¿Qué reglas dejó en su buzón?", right: "Get-InboxRule en Exchange Online" },
        { left: "¿Registró un método MFA propio?", right: "Métodos de autenticación del usuario" }
      ],
      explain: "Los inicios de sesión dan IP, país y app; el rastreo de mensajes, los destinatarios; Get-InboxRule lista las reglas del buzón, y los métodos de autenticación muestran un MFA ajeno."
    },
    {
      id: "msB4", level: 5, type: "scenario",
      q: "BOSS: Con las prisas, alguien activó una política de Conditional Access mal configurada que deja fuera a todo el personal, incluidos los administradores globales. ¿Qué te deja entrar a corregirla en minutos?",
      options: [
        "Una cuenta break-glass solo en la nube, excluida de las políticas",
        "Una cuenta de admin sincronizada desde el AD local de la empresa",
        "Restablecer la contraseña de un admin global con autoservicio (SSPR)",
        "Esperar 24 horas a que la política se desactive de forma automática"
      ],
      answer: 0,
      explain: "La cuenta de emergencia (break-glass) existe justo para esto: no depende del AD local y ninguna política de Conditional Access la alcanza. Cambiar la contraseña no evita el bloqueo."
    },
    {
      id: "msB5", level: 5, type: "order",
      q: "BOSS: Lección aprendida. Ordena cómo publicar de forma segura la nueva política de Conditional Access:",
      items: [
        "Definir los usuarios, apps y condiciones a los que aplica",
        "Guardarla en modo Solo informe (Report-only)",
        "Revisar su impacto: a quién habría bloqueado y por qué",
        "Cambiarla a Activada y vigilar los primeros inicios de sesión"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero el alcance, siempre excluyendo las cuentas break-glass; Solo informe evalúa la política sin bloquear a nadie, y con el impacto revisado en los inicios de sesión ya se puede activar."
    }
  ]
});
