(function () {
  const SITE = window.SITE;
  const CATS = window.CATEGORIAS;
  const SERV = window.SERVICIOS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

  // Datos de contacto desde config.js
  $$("[data-site]").forEach((el) => { el.textContent = SITE[el.dataset.site] || el.textContent; });
  $$("[data-site-mail]").forEach((el) => { el.href = `mailto:${SITE.email}`; el.textContent = SITE.email; });
  $$("[data-wa]").forEach((el) => {
    el.href = waLink(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener";
  });
  $("#year").textContent = new Date().getFullYear();

  // Navegación
  const nav = $("#nav");
  const toggle = $(".nav__toggle");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
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

  // Servicios: pestañas por categoría
  const tabs = $("#tabs");
  const cards = $("#cards");
  CATS.forEach((c, i) => {
    const n = SERV.filter((s) => s.cat === c.id).length;
    const b = document.createElement("button");
    b.className = "tab";
    b.role = "tab";
    b.dataset.cat = c.id;
    b.innerHTML = `${c.nombre}<small>${n}</small>`;
    b.setAttribute("aria-selected", i === 0);
    b.addEventListener("click", () => showCat(c.id));
    tabs.appendChild(b);
  });

  function showCat(id) {
    const c = CATS.find((x) => x.id === id);
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.cat === id));
    $("#catImg").src = c.img;
    $("#catImg").alt = `Estudio ${c.nombre.toLowerCase()} en campo`;
    $("#catTitle").textContent = c.nombre;
    $("#catDesc").textContent = c.resumen;
    cards.innerHTML = "";
    SERV.filter((s) => s.cat === id).forEach((s, i) => {
      const art = document.createElement("article");
      art.className = "card";
      art.style.animationDelay = `${i * 40}ms`;
      art.innerHTML = `
        <span class="card__tag">${s.sigla}</span>
        <h3>${s.nombre}</h3>
        <p>${s.desc}</p>
        <ul>${s.usos.map((u) => `<li>${u}</li>`).join("")}</ul>
        <button class="card__cta" type="button">Cotizar este estudio →</button>`;
      $(".card__cta", art).addEventListener("click", () => pickService(s));
      cards.appendChild(art);
    });
  }
  showCat(CATS[0].id);

  // Formulario: casillas de estudios
  const chips = $("#chips");
  SERV.forEach((s) => {
    const label = document.createElement("label");
    label.className = "chip";
    label.title = s.nombre;
    label.innerHTML = `<input type="checkbox" name="Estudios" value="${s.sigla} — ${s.nombre}"><span>${s.sigla}</span>`;
    chips.appendChild(label);
  });

  function pickService(s) {
    const box = $$('input[name="Estudios"]', chips).find((i) => i.value.startsWith(s.sigla + " "));
    if (box) box.checked = true;
    $("#cotizar").scrollIntoView({ behavior: "smooth" });
  }

  // Envío del formulario
  const form = $("#form");
  const msg = $("#formMsg");

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

  function setMsg(text, kind) {
    msg.textContent = text;
    msg.className = `form__msg ${kind || ""}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = collect();
    if (d.honey) return;
    const bad = validate(d);
    if (bad.length) {
      setMsg(bad.includes("Privacidad") && bad.length === 1
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

  // Alternativa: enviar los mismos datos por WhatsApp
  $("#sendWa").addEventListener("click", () => {
    const d = collect();
    const lines = [
      `Hola, quiero cotizar un estudio geofísico.`,
      d.nombre && `*Nombre:* ${d.nombre}`,
      d.empresa && `*Empresa:* ${d.empresa}`,
      d.estudios.length && `*Estudios:* ${d.estudios.join(", ")}`,
      d.ubicacion && `*Ubicación:* ${d.ubicacion}`,
      `*Fecha:* ${d.urgencia}`,
      d.extension && `*Extensión:* ${d.extension}`,
      d.descripcion && `*Proyecto:* ${d.descripcion}`
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });
})();
