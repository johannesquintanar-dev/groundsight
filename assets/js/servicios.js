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

window.SECTORES = [
  { img: "assets/img/stock/ov/obra.jpg", nombre: "Construcción y cimentaciones", desc: "Estratigrafía, rigidez del suelo y profundidad de roca para diseñar cimentaciones seguras y sin sobrecostos.", tags: ["TRE", "MASW", "TRS", "Vs30"] },
  { img: "assets/img/stock/ov/agua.jpg", nombre: "Agua subterránea", desc: "Dónde perforar, a qué profundidad está el acuífero y qué calidad de agua esperar antes de invertir en un pozo.", tags: ["SEV", "TRE", "TEM"] },
  { img: "assets/img/stock/ov/sismica.jpg", nombre: "Diseño sísmico", desc: "Vs30, periodo del sitio y clasificación del suelo para cumplir reglamentos y normas de diseño sísmico.", tags: ["Vs30", "HVSR", "MASW", "SPAC"] },
  { img: "assets/img/stock/ov/mineria.jpg", nombre: "Minería y exploración", desc: "Cuerpos minerales, fallas y estructuras a escala de prospecto o regional.", tags: ["IP", "MAG", "GRAV"] },
  { img: "assets/img/stock/infraestructura.jpg", nombre: "Infraestructura y obra civil", desc: "Carreteras, presas, bordos y túneles: cavidades, rellenos, zonas débiles y azolve.", tags: ["TRE", "TRS", "Batimetría"] },
  { img: "assets/img/stock/gpr-concreto.jpg", nombre: "Estructuras de concreto", desc: "Varillas, recubrimientos, ductos embebidos y espesores antes de perforar, cortar o reforzar.", tags: ["GPR Concreto", "Pachómetro"] }
];
