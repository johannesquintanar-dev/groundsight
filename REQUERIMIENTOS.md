# Requerimientos del sitio web — NUSCAA-Geoservicios (Brenda Pamela)

> Contexto: empresa de estudios geofísicos que **está iniciando**. Sin oficinas físicas ni
> colaboradores fijos; la propia geofísica atiende, cotiza y ejecuta. Volumen bajo de
> cotizaciones. El sitio debe verse profesional y confiable, pero ser **barato de mantener**
> (idealmente gratis) y fácil de actualizar sin programador.

---

## 1. Objetivos del sitio

| # | Objetivo | Cómo se mide |
|---|----------|--------------|
| O1 | Recibir solicitudes de cotización por correo (Gmail) y WhatsApp | Nº de solicitudes al mes |
| O2 | Explicar con claridad qué estudios se ofrecen y para qué sirve cada uno | Tiempo en la sección Servicios |
| O3 | Generar confianza aunque la empresa sea nueva | Solicitudes que llegan con datos completos |
| O4 | Aparecer en Google cuando busquen "estudio geofísico + ciudad/estado" | Posición en Google Search Console |

## 2. Información que Brenda debe entregar (pendiente)

- [x] **Nombre comercial:** NUSCAA-Geoservicios (empresa ya existente). Lema: "Porque cada proyecto es una nueva tierra".
- [ ] **Logotipo** (si no hay, se usa logotipo tipográfico).
- [ ] **Correo de contacto** (Gmail) donde llegarán las cotizaciones.
- [ ] **Número de WhatsApp** (con lada, formato 52XXXXXXXXXX).
- [ ] **Zona de cobertura** (estados / regiones donde trabaja).
- [ ] Breve **semblanza profesional**: formación, cédula profesional, años de experiencia, equipos que maneja.
- [ ] Equipos propios o en renta (marca/modelo) — da mucha credibilidad.
- [ ] **Foto profesional de Brenda** para "Sobre nosotros" (la actual es una imagen ilustrativa generada con IA, no es ella).
- [ ] **Fotos reales** de campo (aunque sean de proyectos anteriores como empleada, sin datos de clientes).
- [ ] Ejemplos de resultados (perfiles de TRE, curvas de MASW, etc.) **anonimizados** para el portafolio.
- [ ] Redes sociales (LinkedIn, Facebook, Instagram) si existen.
- [ ] Dominio deseado (ej. `bpgeofisica.com.mx`).

## 3. Requerimientos funcionales

### RF-01 Inicio (hero)
- Título claro: qué hace y dónde ("Estudios geofísicos para ingeniería, geotecnia y agua subterránea").
- Dos botones: **Solicitar cotización** y **WhatsApp**.
- Imagen de fondo de trabajo de campo.

### RF-02 Catálogo de servicios (18 estudios en 5 categorías)
| Categoría | Estudios |
|-----------|----------|
| Geoeléctricos | TRE (Tomografía de Resistividad Eléctrica), SEV (Sondeo Eléctrico Vertical), IP (Polarización Inducida) |
| Sísmicos | MASW, TRS (Tomografía de Refracción Sísmica), HVSR / Nakamura, Vs30, SPAC, Down-Hole, Cross-Hole, Sonda suspendida, Batimetría |
| Electromagnéticos | GPR (Georradar), TEM (Electromagnetismo Transitorio), Georradar de concreto / GPR portátil, Pachómetro (localizador de varillas) |
| Magnetometría | Magnetometría terrestre |
| Gravimetría | Gravimetría regional |

- Cada estudio muestra: **qué es**, **para qué sirve** (aplicaciones) y botón "Cotizar este estudio" que preselecciona el servicio en el formulario.
- Filtro por categoría (pestañas).

### RF-03 Aplicaciones / sectores
Construcción y cimentaciones, agua subterránea (pozos), minería, obra civil e infraestructura,
estudios de sitio sísmico (Vs30 / NTC), arqueología y detección de servicios enterrados, estructuras de concreto.

### RF-04 Proceso de trabajo
Pasos: 1) Solicitud → 2) Propuesta técnica y económica → 3) Trabajo de campo → 4) Procesamiento e interpretación → 5) Entrega de informe.
Sirve para que el cliente entienda tiempos y qué recibe.

### RF-05 Sobre mí / la empresa
- Enfoque honesto de empresa nueva: **atención directa con la especialista**, sin intermediarios.
- Formación, experiencia y valores (rigor técnico, entrega puntual, informes claros).

### RF-06 Formulario de cotización (prioridad alta)
Campos:
- Nombre*, Empresa, Correo*, Teléfono/WhatsApp*
- Estudio(s) de interés* (selección múltiple)
- Ubicación del proyecto* (municipio, estado)
- Superficie o longitud aproximada / número de puntos
- Fecha estimada / urgencia
- Descripción del proyecto*
- Aviso de privacidad (casilla obligatoria)

Comportamiento:
- Envío **directo al Gmail** de Brenda sin servidor propio (servicio FormSubmit — gratuito).
- Protección anti-spam (campo trampa *honeypot* + captcha del servicio).
- Mensaje de confirmación y respuesta automática al cliente.
- Alternativa: botón **"Enviar por WhatsApp"** que arma el mensaje con los datos del formulario.

### RF-07 Botón flotante de WhatsApp
Visible en todas las pantallas, con mensaje predefinido.

### RF-08 Preguntas frecuentes
¿Cuánto cuesta? ¿Cuánto tarda? ¿Qué estudio necesito? ¿Trabajan fuera de mi estado? ¿Qué incluye el informe?

### RF-09 Portafolio (fase 2)
Galería de proyectos realizados con ubicación genérica, estudio aplicado y resultado. Se activa cuando haya 3+ proyectos.

### RF-10 Aviso de privacidad
Obligatorio en México (LFPDPPP) al recabar datos personales en el formulario.

## 4. Requerimientos no funcionales

| ID | Requerimiento |
|----|---------------|
| RNF-01 | **Costo cero de hosting**: sitio estático en GitHub Pages (o Netlify). Solo se paga el dominio (~$300–500 MXN/año). |
| RNF-02 | **Responsive**: se ve bien en celular (la mayoría de clientes llegará por WhatsApp/celular). |
| RNF-03 | Carga rápida (< 3 s en 4G); imágenes optimizadas. |
| RNF-04 | SEO básico: título, descripción, Open Graph para que el enlace se vea bien en WhatsApp, datos estructurados `LocalBusiness`. |
| RNF-05 | Fácil de editar: contacto y textos centralizados; sin base de datos. |
| RNF-06 | HTTPS (GitHub Pages lo da gratis). |
| RNF-07 | Accesibilidad: contraste suficiente, textos alternativos en imágenes, navegación por teclado. |
| RNF-08 | Idioma: español (México). |

## 5. Identidad visual
- Colores: azul petróleo profundo (confianza/técnica) + naranja terracota (tierra/campo) + neutros arena.
- Tipografía: *Sora* (títulos) e *Inter* (texto).
- Imágenes: fotografías reales de trabajo geofísico tomadas de bancos con licencia libre
  (Wikimedia Commons y Flickr vía Openverse), con créditos en `creditos.html`.
  Reemplazar gradualmente por fotos propias de proyectos.
- Animaciones: aparición al hacer scroll, contadores, cinta de servicios, parallax del hero,
  onda sísmica dibujada, hover en tarjetas. Se desactivan si el usuario tiene
  "reducir movimiento" activado.

## 5b. Estructura del sitio (multipágina)
| Página | Para qué sirve al cliente |
|--------|---------------------------|
| Inicio | Entender en 10 segundos qué hace la empresa y a dónde ir |
| Servicios | Comparar los 18 estudios: qué es, profundidad, aplicaciones, entregable |
| Nosotros | Saber quién hará el trabajo y cómo trabaja |
| Preguntas | Resolver dudas de costo, tiempo e informe antes de escribir |
| Cotizar | Enviar la solicitud por correo o WhatsApp |

## 6. Siguientes pasos (fase 2)
1. Registrar dominio `.com.mx` y conectarlo a GitHub Pages.
2. Dar de alta **Google Business Profile** (aunque no tenga oficina, puede ser "negocio de área de servicio").
3. Conectar Google Search Console y Google Analytics.
4. Crear perfil de LinkedIn de la empresa.
5. Agregar portafolio y testimonios conforme lleguen proyectos.
6. Plantilla de cotización en PDF para responder rápido.
