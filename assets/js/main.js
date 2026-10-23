/*
 * Comportamiento común: navegación, animaciones al hacer scroll, contadores,
 * render de servicios/sectores y formulario de cotización.
 */
(function () {
  const SITE = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Navegación ---------- */
  const nav = $("#nav");
  const toggle = $(".nav__toggle", nav);
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#menu a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  }));

  /* ---------- Aparición al hacer scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-inview");
      if (e.target.hasAttribute("data-count")) runCounter(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
  const observeAll = () => {
    // Los hijos de .stagger se observan uno por uno (en móvil el contenedor puede ser más alto que la pantalla)
    $$(".stagger").forEach((g) => $$(":scope > *", g).forEach((child, i) => { child.style.setProperty("--d", `${(i % 6) * 90}ms`); }));
    $$("[data-reveal], .stagger > *, [data-count], .wave-wrap").forEach((el) => {
      if (reduce) { el.classList.add("is-inview"); if (el.hasAttribute("data-count")) el.textContent = el.dataset.count; }
      else io.observe(el);
    });
  };

  function runCounter(el) {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.innerHTML = v + (suffix ? `<small>${suffix}</small>` : "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Parallax suave del hero ---------- */
  const heroImg = $(".hero__media img");
  if (heroImg && !reduce) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroImg.style.translate = `0 ${y * 0.18}px`;
    }, { passive: true });
  }

  /* ---------- Render: sectores ---------- */
  const sectors = $("#sectores-grid");
  if (sectors) {
    sectors.innerHTML = window.SECTORES.map((s) => `
      <article class="sector">
        <img class="sector__img" ${pic(s.img, "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw")} alt="" loading="lazy">
        <h3>${s.nombre}</h3>
        <p>${s.desc}</p>
        <div class="sector__tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </article>`).join("");
  }

  /* ---------- Render: página de servicios ---------- */
  const catsRoot = $("#catblocks");
  if (catsRoot) {
    const svcCard = (s) => `
      <article class="svc">
        <div class="svc__top">
          <span class="svc__tag">${s.sigla}</span>
          <span class="svc__depth"><b>${s.prof}</b>profundidad típica</span>
        </div>
        <h3>${s.nombre}</h3>
        <p>${s.desc}</p>
        <div class="svc__label">Aplicaciones</div>
        <ul>${s.usos.map((u) => `<li>${u}</li>`).join("")}</ul>
        <div class="svc__label">Entregable</div>
        <p style="margin-bottom:18px">${s.entrega}</p>
        <a class="link svc__cta" href="cotizar.html?estudio=${encodeURIComponent(s.sigla)}">Cotizar este estudio <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </article>`;
    catsRoot.innerHTML = window.CATEGORIAS.map((c, i) => {
      const list = window.SERVICIOS.filter((s) => s.cat === c.id);
      return `
      <section class="catblock" id="${c.id}">
        <div class="wrap">
          <div class="catblock__head">
            <div data-reveal="left">
              <span class="catblock__num">0${i + 1}</span>
              <h2>${c.nombre}</h2>
              <p class="lead">${c.resumen}</p>
              <div class="catblock__for">${c.para.map((p) => `<span>${p}</span>`).join("")}</div>
            </div>
            <figure data-reveal="right"><img ${pic(c.img, "(max-width: 860px) 100vw, 50vw")} alt="${c.nombre}: trabajo de campo" loading="lazy"></figure>
          </div>
          <div class="grid services stagger">${list.map(svcCard).join("")}</div>
        </div>
      </section>`;
    }).join("");

    // Subnavegación pegajosa que resalta la categoría visible
    const links = $$(".subnav a");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".catblock").forEach((b) => spy.observe(b));
  }

  observeAll();
  // Red de seguridad: si por cualquier motivo el observador no dispara (pestaña en segundo
  // plano, navegador antiguo), nada queda invisible después de unos segundos.
  setTimeout(() => $$("[data-reveal], .stagger > *, [data-count], .wave-wrap").forEach((el) => {
    if (el.classList.contains("is-inview")) return;
    el.classList.add("is-inview");
    if (el.hasAttribute("data-count")) runCounter(el);
    io.unobserve(el);
  }), 4000);

  /* ---------- Formulario de cotización ---------- */
  const form = $("#form");
  if (!form) return;
  const msg = $("#formMsg");
  const chips = $("#chips");

  // Casillas agrupadas por categoría
  chips.innerHTML = window.CATEGORIAS.map((c) => `
    <div>
      <span class="chips__cat">${c.nombre}</span>
      ${window.SERVICIOS.filter((s) => s.cat === c.id).map((s) => `
        <label class="chip" title="${s.nombre}"><input type="checkbox" name="Estudios" value="${s.sigla} — ${s.nombre}"><span>${s.sigla}</span></label>`).join("")}
    </div>`).join("") + `
    <div><label class="chip"><input type="checkbox" name="Estudios" value="No sé, necesito asesoría"><span>No sé, necesito asesoría</span></label></div>`;

  // Preselección desde ?estudio=SIGLA
  const pre = new URLSearchParams(location.search).get("estudio");
  if (pre) {
    const box = $$('input[name="Estudios"]', chips).find((i) => i.value.startsWith(pre + " "));
    if (box) { box.checked = true; setTimeout(() => form.scrollIntoView({ behavior: "smooth", block: "start" }), 300); }
  }

  function collect() {
    const fd = new FormData(form);
    return {
      nombre: fd.get("Nombre").trim(),
      empresa: fd.get("Empresa").trim(),
      email: fd.get("email").trim(),
      tel: fd.get("Telefono").trim(),
      estudios: fd.getAll("Estudios"),
      ubicacion: fd.get("Ubicacion").trim(),
      urgencia: fd.get("Urgencia"),
      extension: fd.get("Extension").trim(),
      descripcion: fd.get("Descripcion").trim(),
      privacidad: fd.get("Privacidad") === "Aceptado",
      honey: fd.get("_honey")
    };
  }

  function validate(d) {
    $$(".is-invalid", form).forEach((el) => el.classList.remove("is-invalid"));
    const bad = [];
    const mark = (name) => { const el = form.elements[name]; if (el) el.classList.add("is-invalid"); bad.push(name); };
    if (!d.nombre) mark("Nombre");
    if (!/^\S+@\S+\.\S+$/.test(d.email)) mark("email");
    if (d.tel.replace(/\D/g, "").length < 10) mark("Telefono");
    if (!d.ubicacion) mark("Ubicacion");
    if (!d.descripcion) mark("Descripcion");
    if (!d.estudios.length) { $("fieldset", form).classList.add("is-invalid"); bad.push("Estudios"); }
    if (!d.privacidad) bad.push("Privacidad");
    return bad;
  }

  const setMsg = (text, kind) => { msg.textContent = text; msg.className = `form__msg ${kind || ""}`; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = collect();
    if (d.honey) return;
    const bad = validate(d);
    if (bad.length) {
      setMsg(bad.length === 1 && bad[0] === "Privacidad"
        ? "Acepta el aviso de privacidad para continuar."
        : "Revisa los campos marcados y elige al menos un estudio.", "err");
      return;
    }
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    setMsg("Enviando…");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva solicitud de cotización — ${d.nombre}`,
          _template: "table",
          _replyto: d.email,
          _autoresponse: `Gracias por contactar a ${SITE.nombre}. Recibimos tu solicitud y te responderemos a la brevedad.`,
          Nombre: d.nombre,
          Empresa: d.empresa || "—",
          email: d.email,
          Telefono: d.tel,
          Estudios: d.estudios.join(", "),
          Ubicacion: d.ubicacion,
          Urgencia: d.urgencia,
          Extension: d.extension || "—",
          Descripcion: d.descripcion
        })
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || String(out.success) !== "true") throw new Error(out.message || res.status);
      form.reset();
      setMsg("¡Gracias! Recibimos tu solicitud y te contactaremos pronto.", "ok");
    } catch (err) {
      setMsg("No se pudo enviar en este momento. Intenta con el botón de WhatsApp o escríbenos por correo.", "err");
    } finally {
      btn.disabled = false;
    }
  });

  $("#sendWa").addEventListener("click", () => {
    const d = collect();
    const lines = [
      "Hola, quiero cotizar un estudio geofísico.",
      d.nombre && `*Nombre:* ${d.nombre}`,
      d.empresa && `*Empresa:* ${d.empresa}`,
      d.estudios.length && `*Estudios:* ${d.estudios.join(", ")}`,
      d.ubicacion && `*Ubicación:* ${d.ubicacion}`,
      `*Fecha:* ${d.urgencia}`,
      d.extension && `*Extensión:* ${d.extension}`,
      d.descripcion && `*Proyecto:* ${d.descripcion}`
    ].filter(Boolean);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
})();
