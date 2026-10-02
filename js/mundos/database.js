/**
 * Tech Quest — Mundo Base de datos básica
 *
 * Preguntas ordenadas por nivel (1 Básico … 5 Maestro); al final, las del Boss.
 * Cómo añadir o corregir una pregunta: sección 6 de INSTRUCCIONES.md.
 * Después, revisa con: node herramientas/validar-preguntas.js
 */
addWorld({
  id: "database",
  name: "Base de datos básica",
  icon: "🗄️",
  color: "#c9a0ff",
  description: "Tablas, SQL CRUD, claves, índices y backups.",

  questions: [
    // ——— Nivel 1: Básico (8 preguntas) ———
    {
      id: "db01", level: 1, type: "mc",
      q: "Una tabla en una BD relacional es…",
      options: [
        "Conjunto de filas (registros) y columnas (campos)",
        "Log donde el motor anota cada transacción",
        "Consulta guardada que se ejecuta al leerla",
        "Estructura que acelera búsquedas en una columna"
      ],
      answer: 0,
      explain: "Una tabla organiza datos en filas, cada una un registro, y columnas, cada una un campo con su tipo. La consulta guardada es una vista y la estructura que acelera búsquedas es un índice."
    },
    {
      id: "db02", level: 1, type: "tf",
      q: "SQL se usa para consultar y modificar datos en muchas BD relacionales.",
      answer: true,
      explain: "Verdadero: SQL (Structured Query Language) es el lenguaje estándar para consultar y modificar datos en motores como MySQL, PostgreSQL, SQL Server u Oracle."
    },
    {
      id: "db03", level: 1, type: "mc",
      q: "¿Qué hace SELECT nombre FROM empleados?",
      options: [
        "Devuelve la columna nombre de la tabla empleados",
        "Crea la columna nombre en la tabla empleados",
        "Devuelve solo la primera fila de la tabla empleados",
        "Ordena la tabla empleados por la columna nombre"
      ],
      answer: 0,
      explain: "SELECT lee datos sin cambiarlos: aquí devuelve la columna nombre de todas las filas de empleados. Para ordenar haría falta ORDER BY, y para filtrar filas, WHERE."
    },
    {
      id: "db04", level: 1, type: "fill",
      q: "Palabra SQL para insertar filas:",
      answer: "INSERT",
      accept: ["INSERT", "insert", "INSERT INTO", "insert into"],
      explain: "INSERT agrega filas nuevas, con la forma INSERT INTO tabla (columnas) VALUES (valores). No lo confundas con UPDATE, que modifica filas que ya existen."
    },
    {
      id: "db05", level: 1, type: "identify",
      q: "Clave primaria sirve para…",
      options: [
        "Identificar de forma única cada fila",
        "Limitar quién puede leer cada fila",
        "Cifrar los datos sensibles de la fila",
        "Permitir valores repetidos en la columna"
      ],
      answer: 0,
      explain: "La PRIMARY KEY identifica de forma única cada fila: no admite valores repetidos ni NULL. Controlar quién lee los datos se hace con permisos, no con la clave primaria."
    },
    {
      id: "db06", level: 1, type: "scenario",
      q: "Quieres ver todos los productos. Consulta base:",
      options: ["SELECT * FROM productos;", "DELETE FROM productos;", "DROP DATABASE;", "SHUTDOWN;"],
      answer: 0,
      explain: "SELECT * FROM productos; lee todas las filas y columnas sin cambiar nada. DELETE y DROP borran datos; en producción mejor nombra solo las columnas que necesitas."
    },
    {
      id: "db07", level: 1, type: "mc",
      q: "NULL significa…",
      options: [
        "Valor desconocido/ausente",
        "El número cero en columnas numéricas",
        "Un espacio en blanco en columnas de texto",
        "El valor FALSE en columnas booleanas"
      ],
      answer: 0,
      explain: "NULL es ausencia de valor o valor desconocido: no es 0, FALSE ni un espacio. Por eso se busca con IS NULL; comparar con = NULL no devuelve filas."
    },
    {
      id: "db08", level: 1, type: "tf",
      q: "UPDATE agrega filas nuevas a una tabla e INSERT modifica las existentes.",
      answer: false,
      explain: "Falso: es al revés. INSERT agrega filas nuevas; UPDATE ... SET ... WHERE modifica las existentes."
    },

    // ——— Nivel 2: Intermedio (8 preguntas) ———
    {
      id: "db09", level: 2, type: "mc",
      q: "¿Para qué es el WHERE?",
      options: [
        "Filtrar filas según condición",
        "Ordenar los resultados por una columna",
        "Agrupar filas para funciones de agregación",
        "Elegir qué columnas devuelve la consulta"
      ],
      answer: 0,
      explain: "WHERE filtra las filas que cumplen una condición, como WHERE ciudad = 'CDMX'. Ojo: un UPDATE o DELETE sin WHERE afecta todas las filas de la tabla."
    },
    {
      id: "db10", level: 2, type: "tf",
      q: "Una foreign key relaciona filas entre tablas.",
      answer: true,
      explain: "Verdadero: una FOREIGN KEY suele apuntar a la clave primaria de otra tabla y asegura integridad referencial, por ejemplo que no exista un pedido de un cliente inexistente."
    },
    {
      id: "db11", level: 2, type: "scenario",
      q: "DELETE FROM pedidos; sin WHERE en prod. Resultado probable:",
      options: [
        "Borras todos los pedidos",
        "Nada",
        "Solo una fila random",
        "Crea backup automático garantizado"
      ],
      answer: 0,
      explain: "Sin WHERE, DELETE borra todas las filas de pedidos y no hay backup automático garantizado. Trabaja dentro de una transacción y revisa antes con un SELECT usando el mismo WHERE."
    },
    {
      id: "db12", level: 2, type: "fill",
      q: "Cláusula SQL para ordenar los resultados (dos palabras):",
      answer: "ORDER BY",
      accept: ["ORDER BY", "order by"],
      explain: "SELECT ... ORDER BY columna ASC|DESC. Sin ORDER BY, el orden de las filas no está garantizado."
    },
    {
      id: "db13", level: 2, type: "mc",
      q: "JOIN se usa para…",
      options: [
        "Combinar filas de tablas relacionadas",
        "Apilar resultados de dos consultas",
        "Agrupar filas con el mismo valor",
        "Crear una tabla a partir de otra"
      ],
      answer: 0,
      explain: "JOIN combina filas de dos tablas usando una columna relacionada, como clientes.id = pedidos.cliente_id. Apilar resultados de dos consultas es UNION y agrupar es GROUP BY."
    },
    {
      id: "db14", level: 2, type: "match",
      q: "Empareja la sentencia SQL con su acción:",
      pairs: [
        { left: "SELECT", right: "Leer" },
        { left: "INSERT", right: "Crear filas" },
        { left: "UPDATE", right: "Modificar" },
        { left: "DELETE", right: "Borrar filas" }
      ],
      explain: "Son las operaciones CRUD: SELECT lee datos, INSERT crea filas nuevas, UPDATE modifica filas existentes y DELETE borra filas. Usa WHERE con UPDATE y DELETE para no afectar toda la tabla."
    },
    {
      id: "db15", level: 2, type: "order",
      q: "Ordena consulta segura de actualización:",
      items: [
        "BEGIN (abrir transacción)",
        "UPDATE con WHERE",
        "SELECT para revisar las filas modificadas",
        "COMMIT si es correcto o ROLLBACK si no"
      ],
      answer: [0, 1, 2, 3],
      explain: "Dentro de la transacción ejecutas el UPDATE, revisas con SELECT (y el conteo de filas afectadas) que el cambio sea el esperado y solo entonces confirmas (COMMIT) o deshaces (ROLLBACK). Tip: antes del BEGIN puedes correr un SELECT con el mismo WHERE para previsualizar."
    },
    {
      id: "db16", level: 2, type: "tf",
      q: "DROP TABLE define la estructura de una tabla nueva.",
      answer: false,
      explain: "Falso: DROP TABLE elimina una tabla. La estructura de una tabla nueva se define con CREATE TABLE (DDL)."
    },

    // ——— Nivel 3: Avanzado (8 preguntas) ———
    {
      id: "db17", level: 3, type: "mc",
      q: "Un índice acelera…",
      options: [
        "Búsquedas/filtros a costa de espacio y writes",
        "Inserciones masivas, sin costo extra de espacio",
        "Backups completos, al comprimir los datos de la tabla",
        "La replicación, al enviar menos datos a las réplicas"
      ],
      answer: 0,
      explain: "Un índice es como el índice de un libro: acelera búsquedas y filtros, pero ocupa espacio y hace más lentos los INSERT y UPDATE, porque también hay que actualizarlo. Indexa columnas que filtras seguido."
    },
    {
      id: "db18", level: 3, type: "scenario",
      q: "Reporte lento en tabla de millones. Primera idea:",
      options: [
        "EXPLAIN/analizar query + índices adecuados",
        "Duplicar la RAM del servidor antes de medir nada",
        "Quitar la clave primaria para acelerar las lecturas",
        "Reiniciar el servicio de la BD cada vez que corra"
      ],
      answer: 0,
      explain: "Antes de comprar hardware, mide: EXPLAIN muestra el plan de ejecución y revela, por ejemplo, un escaneo completo de la tabla que un índice adecuado puede evitar. Más RAM a ciegas no ataca la causa."
    },
    {
      id: "db19", level: 3, type: "fill",
      q: "Sigla de lenguaje de consulta estructurado:",
      answer: "SQL",
      accept: ["SQL", "sql"],
      explain: "SQL viene de Structured Query Language, el lenguaje estándar para consultar y administrar bases de datos relacionales como MySQL, PostgreSQL o SQL Server."
    },
    {
      id: "db20", level: 3, type: "mc",
      q: "Normalización busca…",
      options: [
        "Reducir redundancia y anomalías de datos",
        "Duplicar datos para evitar JOINs",
        "Poner índices en todas las columnas",
        "Particionar tablas por rango de fechas"
      ],
      answer: 0,
      explain: "Normalizar es separar los datos en tablas relacionadas para que cada dato viva en un solo lugar, evitando redundancia y anomalías al insertar, actualizar o borrar. Las formas 1NF, 2NF y 3NF guían el proceso."
    },
    {
      id: "db21", level: 3, type: "match",
      q: "Empareja el concepto de bases de datos con su definición:",
      pairs: [
        { left: "OLTP", right: "Transacciones operativas" },
        { left: "OLAP", right: "Analítica/agregaciones" },
        { left: "ACID", right: "Propiedades de transacciones" },
        { left: "ORM", right: "Mapeo objeto-relacional" }
      ],
      explain: "OLTP maneja muchas transacciones cortas del día a día, OLAP hace análisis y agregaciones sobre grandes volúmenes, ACID son las garantías de una transacción y un ORM mapea objetos de código a tablas."
    },
    {
      id: "db22", level: 3, type: "order",
      q: "Ordena backup lógico básico:",
      items: [
        "Ejecutar pg_dump/mysqldump o equivalente",
        "Copiar el archivo a almacenamiento offsite",
        "Restaurar desde la copia offsite en un lab",
        "Documentar resultado y tiempo de restore"
      ],
      answer: [0, 1, 2, 3],
      explain: "Backup ≠ archivo copiado sin prueba: restaura desde la copia offsite (la que usarías en un desastre) y documenta el resultado y el tiempo real de restauración, para compararlo con tu RTO. El RPO se define antes, porque determina cada cuánto respaldar."
    },
    {
      id: "db23", level: 3, type: "tf",
      q: "Si el servidor se cae en plena transacción ACID (sin COMMIT), al reiniciar se conservan los pasos que ya se habían ejecutado.",
      answer: false,
      explain: "Falso: por la atomicidad (la A de ACID), una transacción sin COMMIT se revierte completa al recuperar el motor: o se confirma todo o no se confirma nada."
    },
    {
      id: "db24", level: 3, type: "scenario",
      q: "App muestra datos viejos tras UPDATE. Sospecha:",
      options: [
        "Caché de app/CDN o isolation/replica lag",
        "Falta de índice en la columna actualizada",
        "La clave primaria de la tabla está duplicada",
        "Fragmentación del disco del servidor"
      ],
      answer: 0,
      explain: "Si el UPDATE corrió pero la app muestra datos viejos, sospecha de una caché (app o CDN), una réplica con retraso o una transacción sin COMMIT. Un índice faltante haría lenta la consulta, no mostraría datos viejos."
    },

    // ——— Nivel 4: Experto (8 preguntas) ———
    {
      id: "db25", level: 4, type: "mc",
      q: "EXPLAIN (o similar) muestra…",
      options: [
        "Cómo el motor planea ejecutar la consulta",
        "El resultado de la consulta con sus filas",
        "Los permisos del usuario sobre cada tabla",
        "El historial de consultas lentas del servidor"
      ],
      answer: 0,
      explain: "EXPLAIN muestra el plan de ejecución: si usará índices o un escaneo completo, el orden de los JOIN y el costo estimado, sin devolver las filas. Es la primera herramienta para una consulta lenta."
    },
    {
      id: "db26", level: 4, type: "tf",
      q: "Una réplica de lectura acepta escrituras y las copia al primario.",
      answer: false,
      explain: "Falso: la réplica de lectura solo sirve consultas (SELECT); las escrituras van al primario. Ojo con el lag de replicación."
    },
    {
      id: "db27", level: 4, type: "scenario",
      q: "Migración con downtime mínimo. Técnica común:",
      options: [
        "Expand/contract, dual-write o logical replication según motor",
        "Hacer dump completo y restore durante horario pico",
        "Apagar la app y migrar todo en una sola ventana larga",
        "Copiar los data files con la BD encendida y escribiendo"
      ],
      answer: 0,
      explain: "Técnicas como expand/contract (cambios de esquema compatibles en pasos), dual-write o replicación lógica permiten migrar con la app en línea. Siempre ten un plan de rollback."
    },
    {
      id: "db28", level: 4, type: "fill",
      q: "Comando SQL para quitar una tabla entera (peligroso):",
      answer: "DROP TABLE",
      accept: ["DROP TABLE", "drop table"],
      explain: "DROP TABLE elimina la tabla completa, con su estructura y datos; es DDL y no se filtra con WHERE. DELETE, en cambio, borra filas y deja la tabla."
    },
    {
      id: "db29", level: 4, type: "mc",
      q: "¿Cuál es el nivel de aislamiento (isolation level) más estricto?",
      options: [
        "Serializable",
        "Read uncommitted, que evita lecturas sucias",
        "Read committed, el más estricto por defecto",
        "Repeatable read, que está por encima de serializable"
      ],
      answer: 0,
      explain: "Serializable es el nivel más estricto: las transacciones se comportan como si corrieran una tras otra. Read committed es el default en PostgreSQL y SQL Server; más aislamiento, menos concurrencia."
    },
    {
      id: "db30", level: 4, type: "match",
      q: "Empareja el concepto de operación de BD con su propósito:",
      pairs: [
        { left: "VACUUM (PG idea)", right: "Mantenimiento/limpieza" },
        { left: "ANALYZE", right: "Actualizar estadísticas" },
        { left: "CHECKPOINT", right: "Flush a disco durable" },
        { left: "Connection pool", right: "Reutilizar conexiones" }
      ],
      explain: "VACUUM limpia filas muertas en PostgreSQL, ANALYZE actualiza las estadísticas del planificador, CHECKPOINT escribe a disco las páginas modificadas en memoria y un connection pool reutiliza conexiones."
    },
    {
      id: "db31", level: 4, type: "order",
      q: "Ordena incident \"DB CPU 100%\":",
      items: [
        "Identificar queries top",
        "Matar/limitar monstruo si seguro",
        "Añadir índice/fix query",
        "Postmortem y límites"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero ubicas las consultas que más CPU consumen, luego cancelas o limitas la peor si es seguro, corriges la causa con un índice o ajustando la query y cierras con postmortem. Reiniciar a ciegas borra evidencia."
    },
    {
      id: "db32", level: 4, type: "tf",
      q: "Prepared statements ayudan contra SQL injection y pueden reutilizar planes.",
      answer: true,
      explain: "Verdadero: con prepared statements el input viaja como parámetro y nunca se interpreta como código SQL, y el motor puede reutilizar el plan. Parametriza siempre en lugar de concatenar."
    },

    // ——— Nivel 5: Maestro (8 preguntas) ———
    {
      id: "db33", level: 5, type: "mc",
      q: "Point-in-time recovery (PITR) permite…",
      options: [
        "Restaurar a un instante usando base + WAL/binlog",
        "Restaurar solo el último backup completo, sin logs",
        "Recuperar datos sin haber hecho ningún backup base",
        "Replicar en vivo a otra región con cero pérdida"
      ],
      answer: 0,
      explain: "PITR restaura un backup base y reaplica los logs de transacciones (WAL en PostgreSQL, binlog en MySQL) hasta el instante que elijas, por ejemplo justo antes de un DROP. Requiere archivar esos logs."
    },
    {
      id: "db34", level: 5, type: "scenario",
      q: "Split-brain en cluster activo-activo mal configurado. Riesgo:",
      options: [
        "Datos divergentes / corrupción lógica",
        "Solo más latencia, sin afectar los datos",
        "Bloqueo total de escrituras garantizado",
        "Failover automático más rápido y seguro"
      ],
      answer: 0,
      explain: "En split-brain los nodos pierden contacto entre sí y cada lado sigue aceptando escrituras por su cuenta, así los datos divergen. Se previene con quorum, que decide qué lado sigue, y fencing, que aísla al otro."
    },
    {
      id: "db35", level: 5, type: "fill",
      q: "Sigla de las propiedades clásicas de transacciones:",
      answer: "ACID",
      accept: ["ACID", "acid"],
      explain: "ACID: Atomicity (todo o nada), Consistency (solo estados válidos), Isolation (las transacciones no se interfieren) y Durability (lo confirmado sobrevive a una caída)."
    },
    {
      id: "db36", level: 5, type: "mc",
      q: "Un covering index es…",
      options: [
        "Índice que puede satisfacer la query sin tocar la tabla heap",
        "Índice que cubre todas las tablas de la base de datos",
        "Índice creado automáticamente sobre cada clave foránea",
        "Índice parcial que solo incluye filas con cierto WHERE"
      ],
      answer: 0,
      explain: "Un covering index incluye todas las columnas que pide la consulta, así el motor responde leyendo solo el índice sin ir a la tabla. El que filtra filas con un WHERE es un índice parcial."
    },
    {
      id: "db37", level: 5, type: "identify",
      q: "Amenaza si concatenas input en SQL:",
      options: ["SQL injection", "XSS reflejado", "CSRF", "Fuerza bruta"],
      answer: 0,
      explain: "Si concatenas el input del usuario en la consulta, un texto como ' OR 1=1 -- cambia la lógica del SQL: eso es SQL injection. Se evita con consultas parametrizadas. XSS ataca al navegador, no a la BD."
    },
    {
      id: "db38", level: 5, type: "order",
      q: "Ordena promote de réplica tras falla primaria:",
      items: [
        "Confirmar primaria caída",
        "Promote réplica",
        "Reapuntar apps/DNS",
        "Reconstruir nueva réplica"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero confirmas que el primario de verdad cayó, para no tener dos primarios; luego promueves la réplica, reapuntas apps o DNS al nuevo primario y reconstruyes una réplica para recuperar redundancia."
    },
    {
      id: "db39", level: 5, type: "tf",
      q: "Autovacuum mal tunado en PostgreSQL puede dejar bloat y performance pobre.",
      answer: true,
      explain: "Verdadero: si autovacuum no alcanza, se acumulan dead tuples (bloat) que inflan tablas e índices, y la edad de XID crece con riesgo de wraparound. Monitorea ambos y ajusta sus parámetros."
    },
    {
      id: "db40", level: 5, type: "scenario",
      q: "Compliance pide cifrado de datos sensibles. Controles:",
      options: [
        "TDE/cifrado en reposo + TLS en tránsito + masking",
        "Ocultar la columna sensible solo en la interfaz web",
        "Guardar los datos en Base64 para que no sean legibles",
        "Hashear con MD5 los datos que luego hay que leer"
      ],
      answer: 0,
      explain: "TDE o cifrado en reposo, TLS en tránsito y masking para quien no necesita ver el dato completo cubren capas distintas. Base64 se decodifica fácil y MD5 es un hash: no puedes volver a leer el dato."
    }
  ],

  // ——— Boss: se juegan en este orden, con reloj (5 preguntas) ———
  boss: [
    {
      id: "dbB1", level: 5, type: "scenario",
      q: "BOSS: DROP TABLE en prod por script. Contención:",
      options: [
        "Stop writes, evaluar PITR/backup, comunicar, postmortem",
        "Recrear la tabla vacía y dejar que la app siga escribiendo",
        "Restaurar el backup de anoche encima de todo, sin revisar",
        "Borrar los logs del script para evitar confusiones"
      ],
      answer: 0,
      explain: "Detén las escrituras para no empeorar el daño, evalúa PITR o backup para recuperar hasta justo antes del DROP, comunica y haz postmortem. Restaurar encima de todo sin revisar puede borrar datos buenos."
    },
    {
      id: "dbB2", level: 5, type: "mc",
      q: "BOSS: Replication lag de horas. Efecto:",
      options: [
        "Lecturas stale; riesgo si failover precipitado",
        "Ninguno mientras el primario siga respondiendo",
        "Pérdida inmediata de datos en el primario",
        "Las réplicas pasan a aceptar escrituras propias"
      ],
      answer: 0,
      explain: "Con horas de lag, las réplicas sirven datos viejos, y si haces failover a una de ellas sin revisar puedes perder todo lo que aún no se había replicado. Monitorea el lag como indicador clave."
    },
    {
      id: "dbB3", level: 5, type: "order",
      q: "BOSS: Sospecha de inyección SQL activa:",
      items: [
        "Contener: WAF/bloquear endpoint y preservar logs",
        "Parchear el código con consultas parametrizadas",
        "Probar de nuevo el payload de los logs: debe fallar",
        "Cierre: rotar secretos, auditar datos, postmortem"
      ],
      answer: [0, 1, 2, 3],
      explain: "Primero contienes y preservas evidencia; luego corriges la causa con consultas parametrizadas y confirmas con el payload real que ya no funciona; al cerrar rotas credenciales, evalúas qué datos se tocaron (posible notificación) y documentas. Si hay indicios de credenciales robadas, rótalas ya durante la contención."
    },
    {
      id: "dbB4", level: 5, type: "tf",
      q: "BOSS: Un full backup sin probar restore no garantiza recuperación.",
      answer: true,
      explain: "Verdadero: un backup puede estar corrupto, incompleto o tardar demasiado en restaurar, y solo lo sabes al probarlo. Haz pruebas de restore periódicas y mide el tiempo contra tu RTO."
    },
    {
      id: "dbB5", level: 5, type: "fill",
      q: "BOSS: Cláusula SQL para filtrar filas (palabra):",
      answer: "WHERE",
      accept: ["WHERE", "where"],
      explain: "WHERE filtra las filas que cumplen una condición en SELECT, UPDATE y DELETE. Sin él, un UPDATE o DELETE afecta toda la tabla; revisa el WHERE antes de ejecutar."
    }
  ]
});
