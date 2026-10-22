# BP Geofísica — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias) para la empresa de estudios geofísicos de
Brenda Pamela. Se publica gratis con GitHub Pages.

Ver **[REQUERIMIENTOS.md](REQUERIMIENTOS.md)** para el alcance, la información pendiente y la fase 2.

## Estructura

```
index.html               Página principal (una sola página con secciones)
aviso-privacidad.html    Aviso de privacidad (texto modelo)
assets/css/styles.css    Estilos
assets/js/config.js      ← Correo, WhatsApp, nombre y cobertura (editar aquí)
assets/js/servicios.js   ← Catálogo de estudios y categorías (editar aquí)
assets/js/main.js        Lógica: pestañas, formulario, WhatsApp
assets/img/              Imágenes (generadas con IA, provisionales)
```

## Cómo poner los datos reales

1. Abre `assets/js/config.js` y cambia `email`, `whatsapp` y `telefonoVisible`.
2. Sube el cambio. La primera vez que alguien envíe el formulario, **FormSubmit** mandará un
   correo de activación a ese Gmail: hay que abrirlo y pulsar *Activate* (una sola vez).

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve .
```

## Imágenes

Las fotos son ilustrativas, generadas con IA (Pollinations). Conviene reemplazarlas por fotos
reales de campo en cuanto existan, conservando los mismos nombres de archivo.
