/*
 * CATÁLOGO DE SERVICIOS — agregar, quitar o editar estudios aquí.
 * Se usa para las tarjetas de la sección "Servicios" y para las casillas del formulario.
 */
window.CATEGORIAS = [
  { id: "geoelectricos",     nombre: "Geoeléctricos",     img: "assets/img/geoelectricos.jpg",
    resumen: "Miden cómo conduce la electricidad el subsuelo para identificar agua, arcillas, rellenos, cavidades y roca." },
  { id: "sismicos",          nombre: "Sísmicos",          img: "assets/img/sismicos.jpg",
    resumen: "Analizan la propagación de ondas para conocer la rigidez del terreno y su respuesta ante sismos." },
  { id: "electromagneticos", nombre: "Electromagnéticos", img: "assets/img/electromagneticos.jpg",
    resumen: "Detectan objetos y capas mediante campos electromagnéticos: desde ductos someros hasta acuíferos profundos." },
  { id: "magnetometria",     nombre: "Magnetometría",     img: "assets/img/magnetometria.jpg",
    resumen: "Registran anomalías del campo magnético terrestre causadas por estructuras geológicas u objetos metálicos." },
  { id: "gravimetria",       nombre: "Gravimetría",       img: "assets/img/gravimetria.jpg",
    resumen: "Miden pequeñas variaciones de la gravedad para modelar cuencas, fallas y el basamento a escala regional." }
];

window.SERVICIOS = [
  // Geoeléctricos
  { cat: "geoelectricos", sigla: "TRE", nombre: "Tomografía de Resistividad Eléctrica",
    desc: "Imagen 2D/3D de la resistividad del subsuelo a partir de cientos de mediciones con electrodos.",
    usos: ["Cavidades y fracturas", "Nivel freático", "Espesor de rellenos", "Contacto suelo-roca"] },
  { cat: "geoelectricos", sigla: "SEV", nombre: "Sondeo Eléctrico Vertical",
    desc: "Determina las capas del subsuelo y su profundidad en un punto, abriendo progresivamente los electrodos.",
    usos: ["Ubicación de pozos de agua", "Estratigrafía", "Sistemas de tierras"] },
  { cat: "geoelectricos", sigla: "IP", nombre: "Polarización Inducida",
    desc: "Mide la cargabilidad del terreno; complementa la resistividad para distinguir arcillas, sulfuros y contaminantes.",
    usos: ["Exploración minera", "Sitios contaminados", "Discriminar arcilla / agua"] },

  // Sísmicos
  { cat: "sismicos", sigla: "MASW", nombre: "Análisis Multicanal de Ondas Superficiales",
    desc: "Obtiene el perfil de velocidad de onda de corte (Vs) a partir de ondas Rayleigh registradas con geófonos.",
    usos: ["Clasificación sísmica del sitio", "Rigidez y compacidad", "Diseño de cimentaciones"] },
  { cat: "sismicos", sigla: "TRS", nombre: "Tomografía de Refracción Sísmica",
    desc: "Modelo de velocidades de onda P para definir la profundidad de la roca y la calidad del macizo.",
    usos: ["Profundidad del basamento", "Excavabilidad / ripabilidad", "Espesor de suelos"] },
  { cat: "sismicos", sigla: "HVSR", nombre: "Cociente Espectral H/V (Método de Nakamura)",
    desc: "Con una sola estación de ruido ambiental estima el periodo fundamental de vibración del sitio.",
    usos: ["Periodo dominante del suelo", "Microzonificación", "Diseño estructural"] },
  { cat: "sismicos", sigla: "Vs30", nombre: "Velocidad de Onda de Corte Promedio a 30 m",
    desc: "Parámetro estándar para clasificar el sitio según reglamentos y normas de diseño sísmico.",
    usos: ["Clasificación NEHRP / CFE", "Permisos de construcción", "Estudios de sitio"] },
  { cat: "sismicos", sigla: "SPAC", nombre: "Autocorrelación Espacial",
    desc: "Arreglos pasivos de sensores con ruido ambiental para perfiles de Vs profundos, ideal en zonas urbanas.",
    usos: ["Perfiles Vs > 30 m", "Sitios urbanos sin fuente activa", "Respuesta de sitio"] },
  { cat: "sismicos", sigla: "Down-Hole", nombre: "Ensayo Down-Hole",
    desc: "Fuente en superficie y receptor dentro de un sondeo: velocidades Vp y Vs capa por capa.",
    usos: ["Parámetros dinámicos", "Módulos elásticos", "Validar MASW"] },
  { cat: "sismicos", sigla: "Cross-Hole", nombre: "Ensayo Cross-Hole",
    desc: "Medición de ondas entre dos o más perforaciones para obtener Vp y Vs con alta precisión en profundidad.",
    usos: ["Cimentación de maquinaria", "Presas y obras críticas", "Módulos dinámicos"] },
  { cat: "sismicos", sigla: "PS Logging", nombre: "Sonda Suspendida",
    desc: "Registro continuo de Vp y Vs en una sola perforación, con alta resolución a gran profundidad.",
    usos: ["Perforaciones profundas", "Perfil detallado de Vs", "Proyectos de infraestructura"] },
  { cat: "sismicos", sigla: "Batimetría", nombre: "Batimetría",
    desc: "Levantamiento del relieve del fondo de cuerpos de agua con ecosonda y posicionamiento GNSS.",
    usos: ["Presas y bordos", "Volumen de azolve", "Ríos, lagos y canales"] },

  // Electromagnéticos
  { cat: "electromagneticos", sigla: "GPR", nombre: "Georradar (Ground Penetrating Radar)",
    desc: "Pulsos electromagnéticos de alta frecuencia que generan imágenes del subsuelo somero en tiempo real.",
    usos: ["Ductos y tuberías", "Cavidades someras", "Arqueología"] },
  { cat: "electromagneticos", sigla: "TEM", nombre: "Electromagnetismo Transitorio",
    desc: "Sondeos de resistividad a cientos de metros de profundidad sin necesidad de clavar electrodos.",
    usos: ["Acuíferos profundos", "Intrusión salina", "Geología regional"] },
  { cat: "electromagneticos", sigla: "GPR Concreto", nombre: "Georradar de Concreto / GPR Portátil",
    desc: "Escaneo de losas, muros y columnas para ubicar varillas, ductos y espesores antes de cortar o perforar.",
    usos: ["Antes de perforar", "Espesor de losas", "Ductos embebidos"] },
  { cat: "electromagneticos", sigla: "Pachómetro", nombre: "Localizador de Barras de Refuerzo",
    desc: "Ubica varillas, mide recubrimiento y estima diámetros en elementos de concreto armado.",
    usos: ["Revisión estructural", "Recubrimiento", "Peritajes"] },

  // Magnetometría
  { cat: "magnetometria", sigla: "MAG", nombre: "Magnetometría Terrestre",
    desc: "Mapeo de anomalías del campo magnético para localizar estructuras geológicas y objetos metálicos enterrados.",
    usos: ["Exploración minera", "Fallas y diques", "Tuberías y objetos metálicos"] },

  // Gravimetría
  { cat: "gravimetria", sigla: "GRAV", nombre: "Gravimetría Regional",
    desc: "Variaciones de la gravedad que revelan cambios de densidad: cuencas, fallas y profundidad del basamento.",
    usos: ["Geometría de cuencas", "Exploración minera", "Geotermia y acuíferos"] }
];
