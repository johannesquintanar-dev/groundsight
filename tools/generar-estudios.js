// Genera las páginas estáticas de cada estudio (estudio-<slug>.html), las tarjetas de
// servicios.html, sitemap.xml y robots.txt a partir de assets/js/servicios.js.
// Uso: node tools/generar-estudios.js   (volver a correr cada vez que cambie servicios.js)
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..");
const BASE = "https://groundsight.pages.dev";

// Carga los mismos datos que usa el navegador
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["config.js", "servicios.js", "imagenes.js"]) vm.runInContext(fs.readFileSync(path.join(root, "assets/js", f), "utf8"), ctx);
const { SITE, CATEGORIAS, SERVICIOS, OBJETIVOS, IMG } = ctx.window;

// Versión de caché de CSS/JS: se toma de index.html para que todas las páginas coincidan
const VER = (fs.readFileSync(path.join(root, "index.html"), "utf8").match(/styles\.css\?v=(\d+)/) || [])[1] || "1";

const pic = (src, sizes) => {
  const ws = IMG[src];
  if (!ws) return `src="${src}"`;
  return `src="${src}" srcset="${ws.map((w) => `${src.replace(/\.jpg$/, "")}-${w}.webp ${w}w`).join(", ")}" sizes="${sizes}"`;
};
const fmt = (m) => m < 1 ? `${Math.round(m * 100)} cm` : m >= 1000 ? `${+(m / 1000).toFixed(1)} km` : `${+m.toFixed(m < 10 ? 1 : 0)} m`;
const alcance = (s) => s.pmin == null ? s.prof : `${fmt(s.pmin)} – ${fmt(s.pmax)}`;
const ficha = (s) => `estudio-${s.slug}.html`;
const lower = (t) => t.charAt(0).toLowerCase() + t.slice(1);
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const attr = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const head = ({ title, desc, canonical, ld }) => `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <link rel="canonical" href="${canonical}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${attr(desc)}">
  <meta name="theme-color" content="#071a21">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(desc)}">
  <link rel="icon" href="assets/img/favicon.svg?v=202610231419" type="image/svg+xml">
  <link rel="icon" href="assets/img/favicon-32.png?v=202610231419" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css?v=${VER}">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;

const scripts = `  <script src="assets/js/config.js?v=${VER}"></script>
  <script src="assets/js/servicios.js?v=${VER}"></script>
  <script src="assets/js/imagenes.js?v=${VER}"></script>
  <script src="assets/js/logo.js?v=${VER}"></script>
  <script src="assets/js/layout.js?v=${VER}"></script>
  <script src="assets/js/herramientas.js?v=${VER}"></script>
  <script src="assets/js/rockie.js?v=${VER}"></script>
  <script src="assets/js/main.js?v=${VER}"></script>`;

/* ---------- Página de cada estudio ---------- */
function paginaEstudio(s) {
  const cat = CATEGORIAS.find((c) => c.id === s.cat);
  const hermanos = SERVICIOS.filter((x) => x.cat === s.cat && x !== s);
  const objetivos = OBJETIVOS.filter((o) => o.metodos.includes(s.sigla));
  const nombreCompleto = s.nombre.includes(s.sigla) ? s.nombre : `${s.nombre} (${s.sigla})`;
  const desc = `${s.desc} Alcance típico: ${alcance(s)}. Te entregamos: ${lower(s.entrega)}. Cotiza en toda la República con ${SITE.nombre}.`;
  const url = `${BASE}/estudio-${s.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: nombreCompleto, serviceType: s.nombre, description: s.desc, areaServed: "MX", url,
      provider: { "@type": "ProfessionalService", name: SITE.nombre, url: `${BASE}/` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${BASE}/servicios` },
      { "@type": "ListItem", position: 3, name: s.sigla, item: url }] }
  ];
  const wa = `Hola, quiero cotizar un estudio de ${s.nombre} (${s.sigla}).`;
  const chart = s.pmin == null ? "" : `
    <section class="section">
      <div class="wrap">
        <div class="section__head" data-reveal>
          <h2>¿Hasta dónde llega frente a los demás métodos?</h2>
          <p class="lead">${s.sigla} está marcado en naranja. Mueve la profundidad para ver qué otros estudios llegan a ella; toca cualquier barra para abrir su ficha.</p>
        </div>
        <figure class="depth" id="comparador" data-depth-chart data-highlight="${attr(s.sigla)}" data-depth="${+Math.sqrt(s.pmin * s.pmax).toPrecision(1)}" data-reveal>
          <p>Alcance típico de ${s.sigla}: ${alcance(s)}.</p>
        </figure>
        <p class="depth__foot">Alcances típicos en condiciones normales; el alcance real depende del terreno, del espacio disponible y del equipo. Escala logarítmica.</p>
      </div>
    </section>`;

  return `${head({ title: `${nombreCompleto} · Estudio geofísico · ${SITE.nombre}`, desc: desc.length > 300 ? desc.slice(0, 297) + "…" : desc, canonical: url, ld })}
<body data-page="servicios">
  <a class="skip" href="#contenido">Saltar al contenido</a>

  <main id="contenido">
    <section class="page-hero">
      <div class="page-hero__media"><img ${pic(cat.img, "100vw")} alt=""></div>
      <div class="wrap">
        <nav class="crumbs" aria-label="Ruta"><a href="index.html">Inicio</a><span>/</span><a href="servicios.html#${cat.id}">Servicios</a><span>/</span><span>${s.sigla}</span></nav>
        <h1 data-hero style="--d:120ms">${nombreCompleto}</h1>
        <p class="lead" data-hero style="--d:220ms">${s.desc}</p>
        <div class="hero__cta" data-hero style="--d:320ms">
          <a href="cotizar.html?estudio=${encodeURIComponent(s.sigla)}" class="btn btn--accent">Cotizar este estudio ${arrow}</a>
          <a href="#" class="btn btn--ghost" data-wa="${attr(wa)}">Preguntar por WhatsApp</a>
        </div>
      </div>
    </section>

    <section class="facts-band">
      <div class="wrap">
        <dl class="facts">
          <div><dt>Alcance típico</dt><dd>${alcance(s)}</dd></div>
          <div><dt>Trabajo de campo</dt><dd>${s.dias}</dd></div>
          <div><dt>Recibes</dt><dd>${s.entrega}</dd></div>
          <div><dt>Espacio necesario</dt><dd>${s.espacio}</dd></div>
        </dl>
        ${s.nota ? `<p class="facts__note">${s.nota}</p>` : ""}
      </div>
    </section>

    <section class="section">
      <div class="wrap uses">
        <div data-reveal="left">
          <h2>Para qué sirve</h2>
          <ul class="checks">${s.usos.map((u) => `<li>${u}</li>`).join("")}</ul>
          ${objetivos.length ? `<p class="uses__obj">Se recomienda para: ${objetivos.map((o) => `<a href="index.html?objetivo=${o.id}#asistente">${lower(o.nombre)}</a>`).join(", ")}.</p>` : ""}
        </div>
        <div data-reveal="right">
          <h2>Cuándo conviene otro método</h2>
          <ul class="limits">${s.limites.map((l) => `<li>${l}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
${chart}
    <section class="section section--alt">
      <div class="wrap">
        <div class="section__head" data-reveal>
          <h2>Otros estudios ${lower(cat.nombre)}</h2>
          <p class="lead">${cat.resumen}</p>
        </div>
        <ul class="related stagger">${hermanos.length ? hermanos.map((x) => `
          <li><a href="${ficha(x)}"><b>${x.sigla}</b><span>${x.nombre}</span><em>${alcance(x)}</em></a></li>`).join("") : `
          <li><a href="servicios.html"><b>18</b><span>Ver todos los estudios</span><em>5 métodos</em></a></li>`}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="cta" data-reveal="scale">
          <div>
            <h2>¿Este es el estudio que buscas?</h2>
            <p>Cuéntanos la ubicación, el objetivo y la profundidad que te interesa. Te confirmamos si ${s.sigla} es la mejor opción y te enviamos la cotización.</p>
          </div>
          <div class="cta__actions">
            <a href="cotizar.html?estudio=${encodeURIComponent(s.sigla)}" class="btn btn--accent">Cotizar ${s.sigla}</a>
            <a href="#" class="btn btn--ghost" data-wa="${attr(wa)}">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  </main>

${scripts}
</body>
</html>
`;
}

/* ---------- Tarjetas estáticas de servicios.html (visibles para buscadores) ---------- */
function catblocks() {
  const card = (s) => `
            <article class="svc">
              <div class="svc__top">
                <span class="svc__tag">${s.sigla}</span>
                <span class="svc__depth"><b>${alcance(s)}</b>alcance típico</span>
              </div>
              <h3><a href="${ficha(s)}">${s.nombre}</a></h3>
              <p>${s.desc}</p>
              <div class="svc__label">Aplicaciones</div>
              <ul>${s.usos.map((u) => `<li>${u}</li>`).join("")}</ul>
              <div class="svc__label">Entregable</div>
              <p class="svc__deliver">${s.entrega}</p>
              <div class="svc__links">
                <a class="link" href="${ficha(s)}">Ver ficha completa ${arrow}</a>
                <a class="link link--muted" href="cotizar.html?estudio=${encodeURIComponent(s.sigla)}">Cotizar</a>
              </div>
            </article>`;
  return CATEGORIAS.map((c) => `
      <section class="catblock" id="${c.id}">
        <div class="wrap">
          <div class="catblock__head">
            <div data-reveal="left">
              <h2>${c.nombre}</h2>
              <p class="lead">${c.resumen}</p>
              <div class="catblock__for">${c.para.map((p) => `<span>${p}</span>`).join("")}</div>
            </div>
            <figure data-reveal="right"><img ${pic(c.img, "(max-width: 860px) 80vw, 50vw")} alt="${c.nombre}: trabajo de campo" loading="lazy" decoding="async"></figure>
          </div>
          <div class="grid services stagger">${SERVICIOS.filter((s) => s.cat === c.id).map(card).join("")}
          </div>
        </div>
      </section>`).join("");
}

// Escribe las páginas de estudio y borra las de estudios que ya no existan
const nuevas = new Set(SERVICIOS.map((s) => `${ficha(s)}`));
fs.readdirSync(root).filter((f) => /^estudio-.*\.html$/.test(f) && !nuevas.has(f)).forEach((f) => fs.unlinkSync(path.join(root, f)));
SERVICIOS.forEach((s) => fs.writeFileSync(path.join(root, ficha(s)), paginaEstudio(s)));

// Inserta las tarjetas entre los marcadores de servicios.html
const svcPath = path.join(root, "servicios.html");
let svc = fs.readFileSync(svcPath, "utf8");
const A = "<!-- catblocks:inicio (generado por tools/generar-estudios.js) -->", B = "<!-- catblocks:fin -->";
const subnav = CATEGORIAS.map((c) => `<a href="#${c.id}">${c.nombre}</a>`).join("");
svc = svc.replace(/<div class="wrap subnav__inner" id="subnav">[\s\S]*?<\/div>/, `<div class="wrap subnav__inner" id="subnav">${subnav}</div>`);
if (svc.includes(A)) svc = svc.replace(new RegExp(`${A}[\\s\\S]*?${B}`), `${A}${catblocks()}\n    ${B}`);
else svc = svc.replace(`<div id="catblocks"></div>`, `<div id="catblocks">\n    ${A}${catblocks()}\n    ${B}\n    </div>`);
fs.writeFileSync(svcPath, svc);

// Mapa del sitio para buscadores
const paginas = ["", "servicios", "nosotros", "preguntas", "cotizar", "resenas", ...SERVICIOS.map((s) => `estudio-${s.slug}`)];
const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((p) => `  <url><loc>${BASE}/${p}</loc><lastmod>${hoy}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /branding/\n\nSitemap: ${BASE}/sitemap.xml\n`);

console.log(`${SERVICIOS.length} páginas de estudio, servicios.html y sitemap.xml generados (v=${VER}).`);
