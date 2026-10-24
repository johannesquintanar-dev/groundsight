/*
 * CATÁLOGO DE SERVICIOS — agregar, quitar o editar estudios aquí.
 * Cada categoría tiene foto, resumen y "para" (sectores típicos).
 * Cada estudio: sigla, nombre, qué es, profundidad típica, aplicaciones y entregable.
 */
window.CATEGORIAS = [
  { id: "geoelectricos", nombre: "Geoeléctricos", img: "assets/img/stock/geoelectricos.jpg",
    corto: "Resistividad del subsuelo",
    resumen: "Inyectan corriente eléctrica al terreno y miden cómo responde. La resistividad cambia con el agua, las arcillas, los rellenos, las cavidades y la roca, por lo que permite ver capas y anomalías a decenas de metros.",
    para: ["Pozos de agua", "Cimentaciones", "Cavidades", "Contaminación"] },
  { id: "sismicos", nombre: "Sísmicos", img: "assets/img/stock/masw.jpg",
    corto: "Rigidez y respuesta del terreno",
    resumen: "Registran ondas que viajan por el suelo, generadas con un marro, una fuente mecánica o el propio ruido ambiental. Su velocidad indica qué tan rígido es cada estrato y cómo responderá ante un sismo.",
    para: ["Clasificación sísmica", "Cimentaciones", "Profundidad de roca", "Presas"] },
  { id: "electromagneticos", nombre: "Electromagnéticos", img: "assets/img/stock/gpr.jpg",
    corto: "Detección somera y profunda",
    resumen: "Usan campos electromagnéticos para ver objetos y capas sin tocar el terreno: desde tuberías y varillas a centímetros de profundidad (georradar) hasta acuíferos a cientos de metros (TEM).",
    para: ["Ductos y servicios", "Concreto", "Acuíferos profundos", "Arqueología"] },
  { id: "magnetometria", nombre: "Magnetometría", img: "assets/img/stock/magnetometria.jpg",
    corto: "Anomalías magnéticas",
    resumen: "Mide variaciones diminutas del campo magnético terrestre provocadas por rocas con minerales magnéticos u objetos metálicos enterrados. Rápida de adquirir y muy útil para mapear grandes áreas.",
    para: ["Minería", "Fallas y diques", "Objetos metálicos"] },
  { id: "gravimetria", nombre: "Gravimetría", img: "assets/img/stock/gravimetria.jpg",
    corto: "Densidad y estructura regional",
    resumen: "Detecta cambios de densidad del subsuelo midiendo la gravedad con precisión de microgales. Permite modelar la forma de cuencas, la profundidad del basamento y grandes estructuras geológicas.",
    para: ["Cuencas", "Basamento", "Geotermia", "Minería"] }
];

window.SERVICIOS = [
  // Geoeléctricos
  { cat: "geoelectricos", sigla: "TRE", nombre: "Tomografía de Resistividad Eléctrica", prof: "5 – 150 m",
    desc: "Se clavan decenas de electrodos a lo largo de una línea y el equipo realiza cientos de mediciones automáticas. El resultado es una imagen 2D (o 3D) del subsuelo en colores según su resistividad.",
    usos: ["Cavidades y fracturas", "Nivel freático", "Espesor de rellenos", "Contacto suelo-roca"],
    entrega: "Sección 2D de resistividad interpretada" },
  { cat: "geoelectricos", sigla: "SEV", nombre: "Sondeo Eléctrico Vertical", prof: "10 – 300 m",
    desc: "Se abren progresivamente los electrodos desde un punto central para medir cada vez más profundo. Es el método clásico y económico para conocer las capas bajo un punto.",
    usos: ["Ubicación de pozos de agua", "Estratigrafía", "Sistemas de tierras"],
    entrega: "Modelo de capas 1D por punto" },
  { cat: "geoelectricos", sigla: "IP", nombre: "Polarización Inducida", prof: "10 – 200 m",
    desc: "Mide cuánto tarda el terreno en descargarse tras cortar la corriente (cargabilidad). Permite distinguir arcillas, sulfuros metálicos y zonas contaminadas que la resistividad sola confunde.",
    usos: ["Exploración minera", "Sitios contaminados", "Discriminar arcilla / agua"],
    entrega: "Secciones de resistividad y cargabilidad" },

  // Sísmicos
  { cat: "sismicos", sigla: "MASW", nombre: "Análisis Multicanal de Ondas Superficiales", prof: "0 – 30 m",
    desc: "Una línea de geófonos registra las ondas superficiales generadas con un marro. De su dispersión se obtiene el perfil de velocidad de onda de corte (Vs), indicador directo de la rigidez del suelo.",
    usos: ["Clasificación sísmica del sitio", "Rigidez y compacidad", "Diseño de cimentaciones"],
    entrega: "Perfil Vs 1D/2D y Vs30" },
  { cat: "sismicos", sigla: "TRS", nombre: "Tomografía de Refracción Sísmica", prof: "0 – 50 m",
    desc: "Mide el tiempo que tardan las ondas P en refractarse en capas más rígidas. Genera un modelo de velocidades que marca con claridad la profundidad y la calidad de la roca.",
    usos: ["Profundidad del basamento", "Excavabilidad / ripabilidad", "Espesor de suelos"],
    entrega: "Tomografía de velocidad Vp" },
  { cat: "sismicos", sigla: "HVSR", nombre: "Cociente Espectral H/V (Nakamura)", prof: "Sitio",
    desc: "Una sola estación registra el ruido ambiental durante 20 a 40 minutos. El cociente entre componentes horizontal y vertical revela el periodo fundamental de vibración del terreno.",
    usos: ["Periodo dominante del suelo", "Microzonificación", "Diseño estructural"],
    entrega: "Curva H/V y periodo del sitio" },
  { cat: "sismicos", sigla: "Vs30", nombre: "Velocidad de Onda de Corte a 30 m", prof: "0 – 30 m",
    desc: "Promedio de la velocidad de onda de corte en los primeros 30 metros. Es el parámetro que piden los reglamentos para clasificar el tipo de suelo en el diseño sísmico.",
    usos: ["Clasificación NEHRP / CFE", "Permisos de construcción", "Estudios de sitio"],
    entrega: "Valor Vs30 y tipo de suelo" },
  { cat: "sismicos", sigla: "SPAC", nombre: "Autocorrelación Espacial", prof: "30 – 300 m",
    desc: "Arreglo de sensores que registra ruido ambiental de forma pasiva, sin golpes ni explosivos. Ideal para obtener perfiles profundos de Vs en zonas urbanas.",
    usos: ["Perfiles Vs profundos", "Sitios urbanos", "Respuesta de sitio"],
    entrega: "Perfil Vs profundo" },
  { cat: "sismicos", sigla: "Down-Hole", nombre: "Ensayo Down-Hole", prof: "Según sondeo",
    desc: "Se golpea en superficie y un geófono dentro de una perforación registra las ondas a distintas profundidades. Da velocidades Vp y Vs capa por capa con gran precisión.",
    usos: ["Parámetros dinámicos", "Módulos elásticos", "Validar MASW"],
    entrega: "Perfil Vp/Vs y módulos dinámicos" },
  { cat: "sismicos", sigla: "Cross-Hole", nombre: "Ensayo Cross-Hole", prof: "Según sondeo",
    desc: "Fuente y receptores en perforaciones distintas, a la misma profundidad. Es el ensayo de mayor precisión para obtener velocidades en proyectos críticos.",
    usos: ["Cimentación de maquinaria", "Presas y obras críticas", "Módulos dinámicos"],
    entrega: "Perfil Vp/Vs de alta resolución" },
  { cat: "sismicos", sigla: "PS Logging", nombre: "Sonda Suspendida", prof: "Según sondeo",
    desc: "Una sonda con fuente y receptores desciende por la perforación registrando de forma continua. Permite perfiles de Vp y Vs a gran profundidad sin entubar.",
    usos: ["Perforaciones profundas", "Perfil detallado de Vs", "Infraestructura"],
    entrega: "Registro continuo Vp/Vs" },
  { cat: "sismicos", sigla: "Batimetría", nombre: "Batimetría", prof: "Cuerpos de agua",
    desc: "Levantamiento del relieve del fondo de presas, ríos y lagunas con ecosonda y posicionamiento GNSS desde una embarcación.",
    usos: ["Presas y bordos", "Volumen de azolve", "Ríos, lagos y canales"],
    entrega: "Plano batimétrico y volúmenes" },

  // Electromagnéticos
  { cat: "electromagneticos", sigla: "GPR", nombre: "Georradar", prof: "0 – 10 m",
    desc: "Una antena emite pulsos de radar y registra sus reflejos mientras se desplaza sobre el terreno. Da una imagen continua y en tiempo real del subsuelo somero.",
    usos: ["Ductos y tuberías", "Cavidades someras", "Arqueología"],
    entrega: "Radargramas y plano de anomalías" },
  { cat: "electromagneticos", sigla: "TEM", nombre: "Electromagnetismo Transitorio", prof: "20 – 500 m",
    desc: "Un lazo de cable induce corrientes en el subsuelo y se mide cómo decaen. Alcanza grandes profundidades sin clavar electrodos, incluso en terrenos secos.",
    usos: ["Acuíferos profundos", "Intrusión salina", "Geología regional"],
    entrega: "Modelo de resistividad profundo" },
  { cat: "electromagneticos", sigla: "GPR Concreto", nombre: "Georradar de Concreto", prof: "0 – 60 cm",
    desc: "Equipo portátil de alta frecuencia para escanear losas, muros y columnas. Ubica varillas, ductos y espesores antes de cortar o perforar.",
    usos: ["Antes de perforar", "Espesor de losas", "Ductos embebidos"],
    entrega: "Marcado en sitio e informe" },
  { cat: "electromagneticos", sigla: "Pachómetro", nombre: "Localizador de Barras de Refuerzo", prof: "0 – 20 cm",
    desc: "Detecta el acero de refuerzo dentro del concreto, mide su recubrimiento y estima el diámetro de las varillas.",
    usos: ["Revisión estructural", "Recubrimiento", "Peritajes"],
    entrega: "Plano de armado y recubrimientos" },

  // Magnetometría
  { cat: "magnetometria", sigla: "MAG", nombre: "Magnetometría Terrestre", prof: "0 – 500 m",
    desc: "Se recorre el terreno con un magnetómetro registrando el campo magnético punto a punto. Las anomalías revelan estructuras geológicas y objetos metálicos enterrados.",
    usos: ["Exploración minera", "Fallas y diques", "Tuberías y objetos metálicos"],
    entrega: "Mapa de anomalías magnéticas" },

  // Gravimetría
  { cat: "gravimetria", sigla: "GRAV", nombre: "Gravimetría Regional", prof: "100 m – km",
    desc: "Mediciones de gravedad de alta precisión en una malla de estaciones. Los cambios de densidad permiten modelar cuencas, fallas y la profundidad del basamento.",
    usos: ["Geometría de cuencas", "Exploración minera", "Geotermia y acuíferos"],
    entrega: "Mapa de anomalía de Bouguer y modelo" }
];

/*
 * FICHA TÉCNICA de cada estudio (se une a SERVICIOS por sigla). Alimenta las páginas por estudio,
 * el asistente "¿Qué estudio necesito?" y el comparador de profundidades.
 *   slug: dirección de su página (estudio-<slug>.html)
 *   pmin / pmax: alcance en metros para el comparador (valores típicos, no límites absolutos)
 *   dias: duración típica del trabajo de campo · espacio: lo que se necesita en el sitio
 *   limites: cuándo conviene otro método · nota: aclaración opcional del alcance
 * Valores orientativos: revisarlos con la especialista antes de cambiarlos.
 */
window.FICHAS = {
  "TRE": { slug: "tomografia-resistividad-electrica", pmin: 1, pmax: 150, dias: "1 a 3 días, según el número y largo de las líneas",
    espacio: "Una línea recta y despejada de unas 5 veces la profundidad buscada (para ~30 m, unos 150 m de tendido).",
    limites: ["La resolución disminuye con la profundidad: los objetos pequeños y profundos pueden no verse.", "Necesita buen contacto eléctrico; en pavimento, roca seca o grava se perfora o se humedece el punto de cada electrodo.", "Líneas eléctricas, tuberías metálicas y cercas cercanas generan ruido.", "Es un método indirecto: la interpretación mejora mucho si se calibra con un sondeo o un pozo."] },
  "SEV": { slug: "sondeo-electrico-vertical", pmin: 10, pmax: 300, dias: "2 a 5 sondeos por día",
    espacio: "Una abertura en línea de 3 a 6 veces la profundidad buscada (para 100 m, entre 300 y 600 m).",
    limites: ["Supone capas horizontales: con fallas, lentes o cambios laterales conviene la tomografía (TRE).", "Da información de un solo punto; para ver variaciones a lo largo del terreno se hacen varios sondeos o una TRE.", "Capas delgadas pueden quedar ocultas entre capas más gruesas (equivalencia)."] },
  "IP": { slug: "polarizacion-inducida", pmin: 10, pmax: 200, dias: "1 a 3 días, según el número de líneas",
    espacio: "La misma línea que una tomografía eléctrica: unas 5 veces la profundidad buscada.",
    limites: ["Es más sensible al ruido eléctrico que la resistividad sola.", "La adquisición toma más tiempo que una TRE convencional.", "La cargabilidad se interpreta junto con la geología: arcillas y minerales pueden dar respuestas parecidas."] },
  "MASW": { slug: "masw-ondas-superficiales", pmin: 1, pmax: 30, dias: "1 día para varias líneas",
    espacio: "Un tendido recto de 24 geófonos, de 24 a 70 m de largo.",
    limites: ["Con marro como fuente el alcance práctico es de unos 30 m; para más profundidad se combina con SPAC o HVSR.", "Capas blandas debajo de capas rígidas complican la inversión.", "El tráfico pesado o la maquinaria muy cercana pueden afectar el registro."] },
  "TRS": { slug: "refraccion-sismica", pmin: 1, pmax: 50, dias: "1 a 2 días",
    espacio: "Un tendido recto de 3 a 5 veces la profundidad buscada.",
    limites: ["No detecta una capa más blanda que esté debajo de una más rígida (inversión de velocidades).", "Capas muy delgadas pueden no aparecer en el modelo.", "Para más profundidad se necesita una fuente de energía mayor que el marro."] },
  "HVSR": { slug: "hvsr-nakamura-periodo-del-sitio", pmin: 10, pmax: 500, nota: "Alcance estimado: el método da el periodo del sitio y la profundidad se infiere con datos de Vs.",
    dias: "Varios puntos por día (cada registro dura de 20 a 40 minutos)",
    espacio: "Un punto de aproximadamente 1 m² sobre suelo natural, lejos de vibraciones directas.",
    limites: ["Da el periodo dominante, no un perfil de capas; la profundidad se estima con datos de Vs (MASW o SPAC).", "Viento, lluvia y maquinaria cercana alteran el registro.", "Si el terreno no tiene un contraste fuerte entre suelo y roca, la curva no muestra un pico claro."] },
  "Vs30": { slug: "vs30-clasificacion-sismica-del-sitio", pmin: 1, pmax: 30, dias: "1 día (se obtiene con MASW)",
    espacio: "El mismo tendido que un MASW: de 24 a 70 m en línea recta.",
    limites: ["Es un solo valor promedio: no sustituye un perfil completo de velocidades.", "Cada reglamento define sus propias clases de sitio; el informe indica cuál se aplicó."] },
  "SPAC": { slug: "spac-autocorrelacion-espacial", pmin: 5, pmax: 300, dias: "1 a 2 días",
    espacio: "Un arreglo de sensores (circular, en L o en cruz) con apertura comparable a la profundidad buscada.",
    limites: ["Necesita ruido ambiental suficiente y registros largos.", "Pierde detalle en los primeros metros; se combina con MASW para la parte somera."] },
  "Down-Hole": { slug: "ensayo-down-hole", pmin: 1, pmax: 100, nota: "El alcance depende de la profundidad de la perforación.", dias: "1 día por perforación",
    espacio: "Una perforación ademada con PVC y cementada al terreno.",
    limites: ["Requiere una perforación previa, ademada y cementada.", "Si el ademe no queda bien adherido al suelo, los datos pierden calidad."] },
  "Cross-Hole": { slug: "ensayo-cross-hole", pmin: 1, pmax: 60, nota: "El alcance depende de la profundidad de las perforaciones.", dias: "1 a 2 días",
    espacio: "Dos o tres perforaciones ademadas, separadas de 3 a 6 m, con medición de su verticalidad.",
    limites: ["Es el ensayo más costoso porque necesita dos o tres perforaciones.", "Hay que medir la desviación de cada pozo para calcular bien las distancias."] },
  "PS Logging": { slug: "sonda-suspendida-ps-logging", pmin: 1, pmax: 300, nota: "El alcance depende de la profundidad de la perforación.", dias: "1 día por perforación",
    espacio: "Una perforación llena de agua o lodo.",
    limites: ["El pozo debe estar lleno de fluido: no mide por encima del nivel del agua o lodo.", "Requiere una perforación existente o programada."] },
  "Batimetría": { slug: "batimetria-presas-y-cuerpos-de-agua", nota: "Mide el fondo de cuerpos de agua; no se compara con los métodos que miden dentro del subsuelo.",
    dias: "1 a 3 días, según la superficie del cuerpo de agua",
    espacio: "Acceso para la embarcación y un punto para bajarla al agua.",
    limites: ["La ecosonda mide el fondo, no los sedimentos que hay debajo.", "La vegetación acuática densa y las zonas muy someras limitan la navegación."] },
  "GPR": { slug: "georradar-gpr", pmin: 0.1, pmax: 10, dias: "1 día para cientos de metros lineales",
    espacio: "Una superficie transitable para desplazar la antena.",
    limites: ["En arcillas y suelos salinos la penetración baja a menos de 1 o 2 m.", "A mayor profundidad, menor resolución (se usan antenas de menor frecuencia).", "Funciona mejor sobre superficies relativamente planas."] },
  "TEM": { slug: "electromagnetismo-transitorio-tem", pmin: 20, pmax: 500, dias: "1 a 3 días, según el número de sondeos",
    espacio: "Un lazo de cable cuadrado de 50 a 200 m por lado en cada punto.",
    limites: ["Poca resolución en los primeros metros; se combina con SEV o TRE para la parte somera.", "Estructuras metálicas y líneas eléctricas cercanas interfieren.", "La resistividad sola no distingue siempre entre agua salobre y arcilla: se interpreta con la geología."] },
  "GPR Concreto": { slug: "georradar-de-concreto", pmin: 0.02, pmax: 0.6, dias: "Horas: las marcas se hacen directo en sitio",
    espacio: "Acceso a la cara del elemento (losa, muro o columna).",
    limites: ["Mallas de acero muy cerradas impiden ver lo que hay detrás.", "El concreto húmedo o recién colado reduce la penetración."] },
  "Pachómetro": { slug: "pachometro-localizador-de-varillas", pmin: 0.01, pmax: 0.2, dias: "Horas, según el número de elementos",
    espacio: "Acceso a la cara del elemento de concreto.",
    limites: ["Alcanza unos 10 a 20 cm de recubrimiento.", "Varillas muy juntas se leen como una sola; el diámetro es una estimación."] },
  "MAG": { slug: "magnetometria-terrestre", pmin: 1, pmax: 500, dias: "1 a varios días, según el área",
    espacio: "Recorridos a pie en una malla de líneas, lejos de cercas, vehículos y estructuras metálicas.",
    limites: ["Solo detecta materiales con propiedades magnéticas.", "Cercas, autos y líneas eléctricas generan ruido.", "La profundidad de la fuente se estima: el modelo no es único."] },
  "GRAV": { slug: "gravimetria", pmin: 100, pmax: 3000, dias: "Varios días, según la malla de estaciones",
    espacio: "Estaciones distribuidas en el área, con nivelación GNSS de precisión en cada una.",
    limites: ["Poca resolución para objetos pequeños o someros.", "Requiere correcciones de terreno y alturas muy precisas.", "Los modelos no son únicos: se combinan con geología y otros métodos."] }
};
window.SERVICIOS.forEach((s) => Object.assign(s, window.FICHAS[s.sigla] || {}));

/*
 * ASISTENTE "¿Qué estudio necesito?": cada objetivo propone estudios en orden de preferencia.
 * El asistente filtra por la profundidad elegida y sugiere complementos.
 */
window.OBJETIVOS = [
  { id: "agua", nombre: "Ubicar un pozo de agua", metodos: ["SEV", "TRE", "TEM"], nota: "Lo usual es combinar sondeos (SEV o TEM) con al menos una tomografía para ver la continuidad lateral del acuífero." },
  { id: "cimentacion", nombre: "Diseñar una cimentación", metodos: ["MASW", "TRE", "TRS"], nota: "La geofísica complementa al estudio de mecánica de suelos: ayuda a decidir dónde y a qué profundidad perforar." },
  { id: "sismico", nombre: "Clasificación sísmica del sitio", metodos: ["Vs30", "MASW", "HVSR", "SPAC"], nota: "Vs30 y el periodo del sitio (HVSR) son los datos que suelen pedir los reglamentos de diseño sísmico." },
  { id: "cavidades", nombre: "Detectar cavidades, grietas o rellenos", metodos: ["TRE", "GPR", "TRS"], nota: "El georradar resuelve lo somero con gran detalle; la tomografía eléctrica llega más profundo." },
  { id: "roca", nombre: "Profundidad de roca o excavabilidad", metodos: ["TRS", "MASW", "TRE"], nota: "La velocidad de onda P indica qué tan difícil será excavar o ripear." },
  { id: "ductos", nombre: "Ubicar ductos o servicios enterrados", metodos: ["GPR", "MAG"], nota: "El georradar ubica tuberías de cualquier material; la magnetometría solo las metálicas." },
  { id: "concreto", nombre: "Revisar concreto antes de perforar", metodos: ["GPR Concreto", "Pachómetro"], nota: "Se marca en sitio dónde están las varillas y ductos para cortar o perforar sin dañarlos." },
  { id: "mineria", nombre: "Exploración minera", metodos: ["IP", "MAG", "GRAV", "TEM"], nota: "La magnetometría y la gravimetría cubren grandes áreas; la polarización inducida define los blancos." },
  { id: "presas", nombre: "Presas, bordos y azolve", metodos: ["Batimetría", "TRE", "TRS"], nota: "La batimetría da el volumen de azolve; la tomografía revisa filtraciones y zonas débiles en cortinas y bordos." },
  { id: "contaminacion", nombre: "Contaminación o lixiviados", metodos: ["TRE", "IP", "TEM"], nota: "Las plumas de contaminación suelen ser más conductoras que el terreno que las rodea." },
  { id: "dinamicos", nombre: "Parámetros dinámicos para obras críticas", metodos: ["Down-Hole", "Cross-Hole", "PS Logging", "MASW"], nota: "Los ensayos en perforación dan las velocidades más precisas para cimentaciones de maquinaria, presas y puentes." }
];
window.PROFUNDIDADES = [
  { id: "cm", nombre: "Menos de 1 m", min: 0.01, max: 1 },
  { id: "10", nombre: "1 a 10 m", min: 1, max: 10 },
  { id: "30", nombre: "10 a 30 m", min: 10, max: 30 },
  { id: "100", nombre: "30 a 100 m", min: 30, max: 100 },
  { id: "300", nombre: "100 a 300 m", min: 100, max: 300 },
  { id: "mas", nombre: "Más de 300 m", min: 300, max: 3000 },
  { id: "nose", nombre: "No lo sé" }
];

window.SECTORES = [
  { img: "assets/img/stock/ov/obra.jpg", obj: "cimentacion", nombre: "Construcción y cimentaciones", desc: "Estratigrafía, rigidez del suelo y profundidad de roca para diseñar cimentaciones seguras y sin sobrecostos.", tags: ["TRE", "MASW", "TRS", "Vs30"] },
  { img: "assets/img/stock/ov/agua.jpg", obj: "agua", nombre: "Agua subterránea", desc: "Dónde perforar, a qué profundidad está el acuífero y qué calidad de agua esperar antes de invertir en un pozo.", tags: ["SEV", "TRE", "TEM"] },
  { img: "assets/img/stock/ov/sismica.jpg", obj: "sismico", nombre: "Diseño sísmico", desc: "Vs30, periodo del sitio y clasificación del suelo para cumplir reglamentos y normas de diseño sísmico.", tags: ["Vs30", "HVSR", "MASW", "SPAC"] },
  { img: "assets/img/stock/ov/mineria.jpg", obj: "mineria", nombre: "Minería y exploración", desc: "Cuerpos minerales, fallas y estructuras a escala de prospecto o regional.", tags: ["IP", "MAG", "GRAV"] },
  { img: "assets/img/stock/infraestructura.jpg", obj: "presas", nombre: "Infraestructura y obra civil", desc: "Carreteras, presas, bordos y túneles: cavidades, rellenos, zonas débiles y azolve.", tags: ["TRE", "TRS", "Batimetría"] },
  { img: "assets/img/stock/gpr-concreto.jpg", obj: "concreto", nombre: "Estructuras de concreto", desc: "Varillas, recubrimientos, ductos embebidos y espesores antes de perforar, cortar o reforzar.", tags: ["GPR Concreto", "Pachómetro"] }
];
