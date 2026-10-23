/*
 * Encabezado, pie de página y botón de WhatsApp compartidos por todas las páginas.
 * El menú se arma desde la lista PAGES; la página actual se marca con data-page en <body>.
 */
(function () {
  const SITE = window.SITE;
  const PAGES = [
    { href: "index.html", label: "Inicio", id: "inicio" },
    { href: "servicios.html", label: "Servicios", id: "servicios" },
    { href: "nosotros.html", label: "Nosotros", id: "nosotros" },
    { href: "preguntas.html", label: "Preguntas", id: "preguntas" }
  ];
  // srcset responsivo: devuelve los atributos para una foto según los anchos WebP disponibles
  // (manifiesto en imagenes.js). El JPG original queda como respaldo en src.
  window.pic = (src, sizes = "100vw") => {
    const ws = (window.IMG || {})[src];
    if (!ws) return `src="${src}"`;
    const set = ws.map((w) => `${src.replace(/\.jpg$/, "")}-${w}.webp ${w}w`).join(", ");
    return `src="${src}" srcset="${set}" sizes="${sizes}"`;
  };
  // Fotos escritas a mano en el HTML: <img src="x.jpg" data-sizes="50vw">
  document.querySelectorAll("img[data-sizes]").forEach((img) => {
    const ws = (window.IMG || {})[img.getAttribute("src")];
    if (!ws) return;
    const base = img.getAttribute("src").replace(/\.jpg$/, "");
    img.sizes = img.dataset.sizes;
    img.srcset = ws.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  });

  const current = document.body.dataset.page || "";
  const light = document.body.dataset.nav === "light";
  const waMsg = "Hola, me interesa cotizar un estudio geofísico.";
  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="currentColor" opacity=".12"/><path d="M6 26c4-6 7-6 10-2s6 4 9-1 6-6 9-2" fill="none" stroke="#e4692e" stroke-width="3" stroke-linecap="round"/><path d="M6 18c4-5 7-5 10-2s6 3 9-1 6-5 9-1" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></svg>`;
  const WA = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>`;

  const header = document.createElement("header");
  header.className = "nav" + (light ? " nav--light" : "");
  header.id = "nav";
  header.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="logo" aria-label="${SITE.nombre}, inicio">${LOGO}<span><b>NUSCAA</b>-Geoservicios<small>Estudios del subsuelo</small></span></a>
      <button class="nav__toggle" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><span></span><span></span><span></span></button>
      <nav id="menu" class="nav__menu">
        ${PAGES.map((p) => `<a href="${p.href}"${p.id === current ? ' class="is-active" aria-current="page"' : ""}>${p.label}</a>`).join("")}
        <a href="cotizar.html" class="btn btn--sm btn--accent">Cotizar</a>
      </nav>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <a href="index.html" class="logo">${LOGO}<span><b>NUSCAA</b>-Geoservicios</span></a>
          <p class="footer__motto">“${SITE.lema}”</p>
          <p>Exploración geofísica para geotecnia, agua subterránea, minería e infraestructura. Atención directa con la especialista.</p>
        </div>
        <div>
          <h4>Sitio</h4>
          <ul>${PAGES.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join("")}<li><a href="cotizar.html">Cotizar</a></li></ul>
        </div>
        <div>
          <h4>Servicios</h4>
          <ul>${window.CATEGORIAS.map((c) => `<li><a href="servicios.html#${c.id}">${c.nombre}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="${waHref}" target="_blank" rel="noopener">${SITE.telefonoVisible}</a></li>
            <li>${SITE.cobertura}</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${SITE.nombre}. Todos los derechos reservados.</span>
        <span><a href="aviso-privacidad.html">Aviso de privacidad</a> · <a href="creditos.html">Créditos de fotografías</a></span>
      </div>
    </div>`;
  document.body.appendChild(footer);

  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = waHref;
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Escríbenos por WhatsApp");
  wa.innerHTML = WA;
  document.body.appendChild(wa);

  // Enlaces de contacto repartidos por las páginas
  document.querySelectorAll("[data-site]").forEach((el) => { el.textContent = SITE[el.dataset.site] || el.textContent; });
  document.querySelectorAll("[data-site-mail]").forEach((el) => { el.href = `mailto:${SITE.email}`; });
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(el.dataset.wa || waMsg)}`;
    el.target = "_blank";
    el.rel = "noopener";
  });
})();
