/*
 * ROCKIE — asistente guiado del sitio (sin IA). Conversa con botones y entiende palabras clave;
 * recomienda estudios con la misma lógica del asistente (window.GS de herramientas.js) y
 * responde con las preguntas frecuentes de Brenda. Nunca inventa datos: lo que no sabe lo
 * pasa a WhatsApp con el mensaje del cliente ya escrito.
 * Para cambiar respuestas, edita FAQ abajo; los estudios salen de servicios.js.
 */
(function () {
  const SITE = window.SITE, GS = window.GS;
  if (!SITE || !GS) return;
  const $ = (s, el = document) => el.querySelector(s);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
                  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } } };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const wa = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

  // Respuestas de la especialista (las mismas de preguntas.html)
  const FAQ = [
    { id: "costo", q: "¿Cuánto cuesta un estudio?", keys: ["cuesta", "precio", "costo", "cobran", "presupuesto", "tarifa"],
      a: "Siempre depende del objetivo geológico al que se quiere llegar, del área de estudio y su ubicación, del acceso al sitio, del espacio disponible para medir, de las condiciones del sitio y del presupuesto del cliente. Mándanos los datos de tu proyecto y te preparamos la cotización." },
    { id: "tiempo", q: "¿Cuánto tarda?", keys: ["tarda", "tiempo", "cuantos dias", "rapido", "demora", "duracion"],
      a: "El trabajo de campo de un estudio común toma por lo general de **1 a 3 días**, aunque depende del área de estudio." },
    { id: "fuera", q: "¿Trabajan fuera de mi ciudad?", keys: ["ciudad", "estado", "viaj", "fuera", "republica", "viatico", "foraneo", "cobertura"],
      a: "Sí, nos trasladamos a donde esté tu proyecto, en toda la República. Los viáticos se incluyen de forma transparente en la cotización." },
    { id: "sondeos", q: "¿La geofísica reemplaza a los sondeos?", keys: ["sondeo", "barren", "reemplaz", "sustitu", "perforacion directa", "spt"],
      a: "No. La geofísica es un método indirecto: da una vista general de las posibles condiciones del subsuelo. Los sondeos o barrenaciones son pruebas directas. Lo ideal es combinarlos: la geofísica ayuda a decidir dónde perforar." },
    { id: "info", q: "¿Qué necesitan para cotizar?", keys: ["que necesitan", "informacion", "que datos", "requisitos", "para cotizar"],
      a: "La ubicación del sitio (municipio y, si se puede, coordenadas o croquis), qué se va a construir o decidir, la profundidad que te interesa y las dimensiones aproximadas del terreno." },
    { id: "informe", q: "¿Qué incluye el informe?", keys: ["informe", "reporte", "incluye", "entregable", "entregan"],
      a: "Objetivo, metodología, georreferenciación de los puntos de medición, modelos geofísicos, posible caracterización geológica, conclusiones, recomendaciones y evidencia fotográfica. También entregamos los datos crudos y procesados." }
  ];
  const OBJ_KEYS = {
    agua: ["pozo", "agua", "acuifer", "noria"],
    cimentacion: ["cimenta", "construir", "construccion", "edifici", "casa", "nave", "bodega", "zapata", "pilote"],
    sismico: ["sism", "vs30", "periodo", "reglamento", "nehrp", "ntc", "tipo de suelo", "clasificacion"],
    cavidades: ["cavidad", "grieta", "hueco", "socav", "hundim", "relleno", "karst"],
    roca: ["roca", "excava", "ripa", "basamento", "tepetate"],
    ductos: ["ducto", "tuber", "cable", "servicios enterrados", "drenaje"],
    concreto: ["concreto", "losa", "varilla", "muro", "columna", "acero de refuerzo", "armado"],
    mineria: ["miner", "mina", "mineral", "yacimiento", "oro", "plata", "cobre"],
    presas: ["presa", "bordo", "azolve", "batimet", "laguna", "canal", "lago"],
    contaminacion: ["contamin", "lixiviad", "pluma", "basurero", "relleno sanitario", "hidrocarburo"],
    dinamicos: ["dinamic", "maquinaria", "cross", "down-hole", "downhole", "ps logging", "modulo"]
  };

  /* ---------- El personaje ---------- */
  // Una roca con los estratos del logotipo, casco de seguridad y ojos que parpadean.
  const FACE = `<svg class="rk-face" viewBox="0 0 64 64" aria-hidden="true">
    <defs><clipPath id="rkRock"><path d="M7 41 L10 28 L19 20 L34 17 L48 20 L57 30 L57 43 L50 53 L33 57 L17 54 Z"/></clipPath></defs>
    <path d="M7 41 L10 28 L19 20 L34 17 L48 20 L57 30 L57 43 L50 53 L33 57 L17 54 Z" fill="#d8c7a6"/>
    <g clip-path="url(#rkRock)">
      <path d="M10 28 L19 20 L34 17 L30 25 L18 30Z" fill="#e6d9be"/>
      <path d="M48 20 L57 30 L57 43 L52 34Z" fill="#c9b591"/>
      <path d="M0 45Q32 39 64 45V50Q32 44 0 50Z" fill="#e4692e"/>
      <path d="M0 51Q32 46 64 51V64H0Z" fill="#14404d"/>
    </g>
    <path d="M7 41 L10 28 L19 20 L34 17 L48 20 L57 30 L57 43 L50 53 L33 57 L17 54 Z" fill="none" stroke="#b39e78" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M18 22C18 11 46 11 46 22Z" fill="#e4692e"/>
    <path d="M32 15.5V21" stroke="#c2531d" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="13" y="20.5" width="38" height="4.2" rx="2.1" fill="#c2531d"/>
    <g class="rk-eyes">
      <ellipse cx="25.5" cy="33" rx="3" ry="3.8" fill="#0f1f25"/><ellipse cx="38.5" cy="33" rx="3" ry="3.8" fill="#0f1f25"/>
      <circle cx="26.6" cy="31.6" r="1" fill="#fff"/><circle cx="39.6" cy="31.6" r="1" fill="#fff"/>
    </g>
    <circle cx="20" cy="39" r="2.6" fill="#f4a981" opacity=".8"/><circle cx="44" cy="39" r="2.6" fill="#f4a981" opacity=".8"/>
    <path d="M27.5 39.5Q32 43.5 36.5 39.5" stroke="#0f1f25" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;

  const root = document.createElement("div");
  root.className = "rk-root";
  root.innerHTML = `
    <div class="rk-hello" hidden>
      <button type="button" class="rk-hello__x" aria-label="Cerrar saludo">×</button>
      <p><b>¡Hola! Soy Rockie.</b> ¿Te ayudo a elegir tu estudio?</p>
    </div>
    <button type="button" class="rk-launch" aria-expanded="false" aria-controls="rk-panel" aria-label="Abrir chat con Rockie">${FACE}</button>
    <section class="rk" id="rk-panel" role="dialog" aria-label="Chat con Rockie" hidden>
      <header class="rk__head">
        <span class="rk__avatar">${FACE}</span>
        <div><b>Rockie</b><span>Asistente de ${SITE.nombre}</span></div>
        <button type="button" class="rk__close" aria-label="Cerrar chat">×</button>
      </header>
      <div class="rk__log" aria-live="polite"></div>
      <form class="rk__input">
        <input type="text" name="m" placeholder="Escribe tu pregunta…" autocomplete="off" aria-label="Escribe tu pregunta">
        <button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </form>
    </section>`;
  document.body.appendChild(root);

  const launch = $(".rk-launch", root), panel = $(".rk", root), log = $(".rk__log", root);
  const hello = $(".rk-hello", root), input = $(".rk__input input", root);
  let history = store.get("rk-log") || [];
  let started = history.length > 0;
  let busy = Promise.resolve();

  /* ---------- Mensajes ---------- */
  const scroll = () => { log.scrollTop = log.scrollHeight; };
  const addBubble = (who, html, save = true) => {
    const p = document.createElement("div");
    p.className = `rk-msg rk-msg--${who}`;
    p.innerHTML = html;
    log.appendChild(p);
    scroll();
    if (save) { history.push({ who, html }); history = history.slice(-40); store.set("rk-log", history); }
  };
  const clearOpts = () => log.querySelectorAll(".rk-opts").forEach((o) => o.remove());
  const showOpts = (opts) => {
    if (!opts || !opts.length) return;
    const box = document.createElement("div");
    box.className = "rk-opts";
    opts.forEach((o) => {
      const el = document.createElement(o.href ? "a" : "button");
      el.className = "rk-opt" + (o.primary ? " rk-opt--primary" : "") + (o.wa ? " rk-opt--wa" : "");
      el.textContent = o.label;
      if (o.href) {
        el.href = o.href;
        if (o.wa || /^https?:/.test(o.href)) { el.target = "_blank"; el.rel = "noopener"; }
      } else {
        el.type = "button";
        el.addEventListener("click", () => { clearOpts(); you(o.label); o.go(); });
      }
      box.appendChild(el);
    });
    log.appendChild(box);
    scroll();
  };
  // Rockie "escribe" un momento antes de cada mensaje; los mensajes se encadenan en orden.
  const say = (texts, opts) => {
    busy = busy.then(async () => {
      for (const t of [].concat(texts)) {
        const dots = document.createElement("div");
        dots.className = "rk-msg rk-msg--bot rk-typing";
        dots.innerHTML = "<span></span><span></span><span></span>";
        log.appendChild(dots);
        scroll();
        await new Promise((r) => setTimeout(r, reduce ? 150 : Math.min(350 + t.length * 6, 1100)));
        dots.remove();
        addBubble("bot", fmt(t));
      }
      showOpts(opts);
    });
  };
  const you = (t) => addBubble("you", esc(t));

  /* ---------- Conversación ---------- */
  const menuOpts = () => [
    { label: "¿Qué estudio necesito?", go: elegir, primary: true },
    { label: "¿Cuánto cuesta?", go: () => faq("costo") },
    { label: "Preguntas frecuentes", go: faqs },
    { label: "Hablar con la especialista", go: contacto }
  ];
  const actual = (document.querySelector("[data-highlight]") || {}).dataset;
  const estudioActual = actual && GS.bySigla(actual.highlight);

  function inicio() {
    const saludo = "¡Hola! Soy **Rockie**, una roca con muchos estratos de experiencia. Llevo millones de años bajo tierra, así que algo sé del subsuelo.";
    if (estudioActual) {
      say([saludo, `Veo que estás revisando **${estudioActual.nombre}**. ¿En qué te ayudo?`], [
        { label: `Cotizar ${estudioActual.sigla}`, href: `cotizar.html?estudio=${encodeURIComponent(estudioActual.sigla)}`, primary: true },
        { label: "¿Es el estudio correcto para mí?", go: elegir },
        { label: "Preguntas frecuentes", go: faqs },
        { label: "Hablar con la especialista", go: contacto }
      ]);
    } else {
      say([saludo, "Te ayudo a elegir el estudio para tu proyecto, te resuelvo dudas o te paso directo con la especialista. ¿Qué necesitas?"], menuOpts());
    }
  }
  function menu() { say("¿En qué más te ayudo?", menuOpts()); }

  function elegir() {
    say("Va. ¿Qué necesitas resolver en tu terreno?", window.OBJETIVOS.map((o) => ({ label: o.nombre, go: () => profundidad(o) }))
      .concat([{ label: "Otra cosa", go: otro }]));
  }
  function profundidad(obj) {
    say("¿A qué profundidad te interesa conocer el subsuelo?", window.PROFUNDIDADES.map((p) => ({ label: p.nombre, go: () => espacio(obj, p) })));
  }
  function espacio(obj, prof) {
    say("Última pregunta: ¿el sitio está en zona urbana o tiene poco espacio libre?", [
      { label: "Sí, hay poco espacio", go: () => resultado(obj, prof, true) },
      { label: "No, hay terreno abierto", go: () => resultado(obj, prof, false) },
      { label: "No lo sé", go: () => resultado(obj, prof, false) }
    ]);
  }
  function resultado(obj, prof, urbano) {
    const r = GS.recomendar(obj, prof, urbano);
    const m = r.main;
    const lineas = [
      `Para **${obj.nombre.toLowerCase()}** te recomiendo **${m.nombre} (${m.sigla})**.`,
      `Llega típicamente a **${GS.alcance(m)}**. Trabajo de campo: ${m.dias.charAt(0).toLowerCase() + m.dias.slice(1)}. Recibes: ${m.entrega.charAt(0).toLowerCase() + m.entrega.slice(1)}.`
    ];
    if (r.extra.length) lineas.push(`Se complementa con ${r.extra.map((s) => `**${s.sigla}**`).join(" y ")}. ${r.nota}`);
    else lineas.push(r.nota);
    lineas.push("La especialista te confirma la mejor opción al revisar tu proyecto.");
    say(lineas, [
      { label: "Cotizar con esta recomendación", href: r.cotizar, primary: true },
      { label: "Enviar por WhatsApp", href: wa(r.waText), wa: true },
      { label: `Ver ficha de ${m.sigla}`, href: GS.ficha(m) },
      { label: "Empezar de nuevo", go: elegir }
    ]);
  }
  function otro() {
    say("Cuéntaselo directo a la especialista: escribe tu caso abajo o mándale un WhatsApp y te orienta sin compromiso.", [
      { label: "Escribir por WhatsApp", href: wa("Hola, tengo un proyecto y no sé qué estudio necesito."), wa: true, primary: true },
      { label: "Volver al inicio", go: menu }
    ]);
  }
  function faqs() {
    say("Estas son las preguntas que más nos hacen:", FAQ.map((f) => ({ label: f.q, go: () => faq(f.id) }))
      .concat([{ label: "Ver todas en la página", href: "preguntas.html" }]));
  }
  function faq(id) {
    const f = FAQ.find((x) => x.id === id);
    const opts = id === "costo" || id === "info"
      ? [{ label: "Solicitar cotización", href: "cotizar.html", primary: true }, { label: "¿Qué estudio necesito?", go: elegir }, { label: "Otra pregunta", go: faqs }]
      : [{ label: "Otra pregunta", go: faqs }, { label: "¿Qué estudio necesito?", go: elegir }, { label: "Hablar con la especialista", go: contacto }];
    say(f.a, opts);
  }
  function contacto() {
    say([`Con gusto. Te atiende directamente ${SITE.responsable}, la especialista que cotiza, mide e interpreta tu proyecto.`,
         `WhatsApp: **${SITE.telefonoVisible}** · Correo: **${SITE.email}**. Normalmente respondemos en menos de 24 horas hábiles.`], [
      { label: "Abrir WhatsApp", href: wa("Hola, me interesa cotizar un estudio geofísico."), wa: true, primary: true },
      { label: "Llenar el formulario", href: "cotizar.html" },
      { label: "Volver al inicio", go: menu }
    ]);
  }

  // Texto libre: palabras clave → la ruta más cercana; si no entiende, lo pasa a WhatsApp.
  function entender(texto) {
    const t = norm(texto);
    const tiene = (keys) => keys.some((k) => t.includes(norm(k)));
    if (/^(hola|buen[oa]s|que tal|hey)\b/.test(t) && t.length < 25) return menu();
    if (tiene(["gracias", "muy amable", "excelente"])) return say("¡De nada! Aquí sigo, bien firme, por si necesitas algo más.", menuOpts());
    const sig = window.SERVICIOS.find((s) => t.includes(norm(s.sigla)) && s.sigla.length > 2 || t.includes(norm(s.nombre)));
    if (sig) {
      return say(`**${sig.nombre} (${sig.sigla})**: ${sig.desc} Alcance típico: ${GS.alcance(sig)}.`, [
        { label: `Ver ficha de ${sig.sigla}`, href: GS.ficha(sig), primary: true },
        { label: `Cotizar ${sig.sigla}`, href: `cotizar.html?estudio=${encodeURIComponent(sig.sigla)}` },
        { label: "¿Qué estudio necesito?", go: elegir }
      ]);
    }
    const f = FAQ.find((x) => tiene(x.keys));
    const objId = Object.keys(OBJ_KEYS).find((k) => tiene(OBJ_KEYS[k]));
    if (objId && !(f && f.id === "costo")) {
      const obj = window.OBJETIVOS.find((o) => o.id === objId);
      say(`Entendido: **${obj.nombre.toLowerCase()}**.`);
      return profundidad(obj);
    }
    if (f) return faq(f.id);
    if (tiene(["whatsapp", "telefono", "llamar", "correo", "contacto", "hablar", "humano", "persona", "especialista", "brenda"])) return contacto();
    say(["Todavía soy una roca joven y no entendí del todo tu pregunta.", "Puedo mandarle tu mensaje tal cual a la especialista por WhatsApp, o puedes elegir una opción:"], [
      { label: "Enviar mi pregunta por WhatsApp", href: wa(`Hola, tengo una pregunta: ${texto}`), wa: true, primary: true }
    ].concat(menuOpts().slice(0, 3)));
  }

  /* ---------- Abrir y cerrar ---------- */
  function abrir() {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add("is-open"));
    launch.setAttribute("aria-expanded", "true");
    root.classList.add("is-chat");
    hello.hidden = true;
    store.set("rk-hello", 1);
    if (!started) { started = true; inicio(); }
    // Conversación de otra página de esta visita: se muestra tal cual y se ofrecen las opciones
    else if (!log.children.length) { history.forEach((m) => addBubble(m.who, m.html, false)); showOpts(menuOpts()); }
    setTimeout(() => input.focus({ preventScroll: true }), reduce ? 0 : 200);
  }
  function cerrar() {
    panel.classList.remove("is-open");
    launch.setAttribute("aria-expanded", "false");
    root.classList.remove("is-chat");
    setTimeout(() => { panel.hidden = true; }, reduce ? 0 : 180);
    launch.focus({ preventScroll: true });
  }
  launch.addEventListener("click", () => (panel.hidden ? abrir() : cerrar()));
  $(".rk__close", root).addEventListener("click", cerrar);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) cerrar(); });
  $(".rk__input", root).addEventListener("submit", (e) => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t) return;
    input.value = "";
    clearOpts();
    you(t);
    entender(t);
  });
  hello.addEventListener("click", (e) => {
    if (e.target.closest(".rk-hello__x")) { hello.hidden = true; store.set("rk-hello", 1); return; }
    abrir();
  });

  // Saludo flotante una sola vez por visita, a los pocos segundos; se oculta solo.
  if (!store.get("rk-hello") && !/cotizar|resenas/.test(location.pathname)) {
    setTimeout(() => {
      if (!panel.hidden) return;
      hello.hidden = false;
      setTimeout(() => { hello.hidden = true; }, 12000);
    }, 7000);
  }
})();
