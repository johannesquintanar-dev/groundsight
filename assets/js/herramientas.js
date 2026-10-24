/*
 * Herramientas interactivas: asistente "¿Qué estudio necesito?", comparador de profundidades
 * y selector de aplicaciones. Leen los datos de servicios.js (SERVICIOS, FICHAS, OBJETIVOS).
 * Cada una se monta solo si su contenedor existe en la página.
 */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const SVC = window.SERVICIOS;
  const bySigla = (s) => SVC.find((x) => x.sigla === s);
  const ficha = (s) => `estudio-${s.slug}.html`;
  const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  // Profundidades legibles: 0.2 → "20 cm", 1500 → "1.5 km"
  const fmt = (m) => m < 1 ? `${Math.round(m * 100)} cm` : m >= 1000 ? `${+(m / 1000).toFixed(1)} km` : `${+m.toFixed(m < 10 ? 1 : 0)} m`;
  const alcance = (s) => s.pmin == null ? s.prof : `${fmt(s.pmin)} – ${fmt(s.pmax)}`;
  // Versión compacta para el comparador: "1–150 m", "2–60 cm", "100 m–3 km"
  const corto = (s) => {
    const a = fmt(s.pmin).split(" "), b = fmt(s.pmax).split(" ");
    return a[1] === b[1] ? `${a[0]}–${b[0]} ${b[1]}` : `${a.join(" ")}–${b.join(" ")}`;
  };

  /* ---------- Comparador de profundidades ---------- */
  // Escala logarítmica de 1 cm a 3 km: cubre desde el recubrimiento de una losa hasta una cuenca.
  const DMIN = 0.01, DMAX = 3000;
  const L0 = Math.log10(DMIN), LSPAN = Math.log10(DMAX) - L0;
  const pos = (d) => ((Math.log10(d) - L0) / LSPAN) * 100;
  const TICKS = [0.01, 0.1, 1, 10, 100, 1000];

  function depthChart(root) {
    const highlight = root.dataset.highlight || "";
    const list = SVC.filter((s) => s.pmin != null);
    const cats = window.CATEGORIAS.map((c) => ({ ...c, items: list.filter((s) => s.cat === c.id) })).filter((c) => c.items.length);
    const start = Number(root.dataset.depth || 30);
    root.innerHTML = `
      <div class="depth__ctrl">
        <label for="${root.id}-r">Profundidad que te interesa: <output id="${root.id}-o">${fmt(start)}</output></label>
        <input type="range" id="${root.id}-r" min="0" max="1000" step="1" value="${Math.round(pos(start) * 10)}">
        <p class="depth__count" aria-live="polite"></p>
      </div>
      <div class="depth__plot">
        <div class="depth__axis" aria-hidden="true">${TICKS.map((t) => `<span style="--p:${pos(t)}%"><i>${fmt(t)}</i></span>`).join("")}<div class="depth__marker"><b></b></div></div>
        <div class="depth__groups">
          ${cats.map((c) => `
            <div class="depth__group" style="--n:${c.items.length}">
              <span class="depth__cat">${c.nombre}</span>
              <div class="depth__cols">
                ${c.items.map((s, i) => `
                  <a class="depth__col${s.sigla === highlight ? " is-current" : ""}" href="${ficha(s)}" data-s="${s.sigla}" style="--a:${pos(s.pmin)}%;--b:${pos(s.pmax)}%;--i:${SVC.indexOf(s)}"
                     aria-label="${s.nombre}: alcance típico de ${alcance(s)}">
                    <span class="depth__label">${s.sigla.replace("Pachómetro", "Pachó­metro")}</span>
                    <span class="depth__track"><span class="depth__bar"></span></span>
                    <span class="depth__range">${corto(s)}</span>
                  </a>`).join("")}
              </div>
            </div>`).join("")}
        </div>
        <div class="depth__tip" role="tooltip" hidden></div>
      </div>`;

    const range = $("input", root), out = $("output", root), count = $(".depth__count", root);
    const marker = $(".depth__marker", root), tip = $(".depth__tip", root);
    const set = (d) => {
      const p = pos(d);
      root.style.setProperty("--m", `${p}%`);
      out.textContent = fmt(d);
      $("b", marker).textContent = fmt(d);
      let n = 0;
      $$(".depth__col", root).forEach((a) => {
        const s = bySigla(a.dataset.s), on = d >= s.pmin && d <= s.pmax;
        a.classList.toggle("is-off", !on);
        n += on;
      });
      count.textContent = `${n} ${n === 1 ? "método llega" : "métodos llegan"} a ${fmt(d)}.`;
      range.setAttribute("aria-valuetext", fmt(d));
    };
    const fromRange = () => {
      // Redondeo a valores "humanos" para que la etiqueta no muestre 37.4 m
      const raw = Math.pow(10, L0 + (range.value / 1000) * LSPAN);
      const mag = Math.pow(10, Math.floor(Math.log10(raw)));
      return Math.min(DMAX, Math.max(DMIN, Math.round(raw / mag * 2) / 2 * mag));
    };
    range.addEventListener("input", () => set(fromRange()));
    set(start);

    // El asistente puede mover el marcador a la profundidad que eligió la persona
    document.addEventListener("gs:depth", (e) => {
      range.value = Math.round(pos(e.detail) * 10);
      set(e.detail);
    });

    // Tooltip por barra (solo con mouse; en táctil el toque abre la ficha)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const plot = $(".depth__plot", root);
      $$(".depth__col", root).forEach((a) => {
        const show = () => {
          const s = bySigla(a.dataset.s);
          tip.innerHTML = `<b>${s.nombre}</b><span>Alcance típico: ${alcance(s)}</span><span>Campo: ${s.dias}</span>${s.nota ? `<em>${s.nota}</em>` : ""}`;
          tip.hidden = false;
          const pr = plot.getBoundingClientRect(), r = $(".depth__bar", a).getBoundingClientRect();
          const x = Math.min(Math.max(r.left + r.width / 2 - pr.left, 120), pr.width - 120);
          tip.style.left = `${x}px`;
          tip.style.top = `${r.top - pr.top}px`;
        };
        a.addEventListener("mouseenter", show);
        a.addEventListener("focus", show);
        a.addEventListener("mouseleave", () => { tip.hidden = true; });
        a.addEventListener("blur", () => { tip.hidden = true; });
      });
    }
  }

  /* ---------- Asistente "¿Qué estudio necesito?" ---------- */
  // Métodos que funcionan con poco espacio (sin tendidos largos): se priorizan en zona urbana.
  const COMPACTOS = ["HVSR", "SPAC", "GPR", "GPR Concreto", "Pachómetro", "Down-Hole", "Cross-Hole", "PS Logging", "MAG", "MASW", "Vs30"];

  function asistente(root) {
    const objs = window.OBJETIVOS, profs = window.PROFUNDIDADES;
    const params = new URLSearchParams(location.search);
    root.innerHTML = `
      <form class="asis__q" onsubmit="return false">
        <fieldset>
          <legend>¿Qué necesitas resolver?</legend>
          <div class="asis__opts">${objs.map((o) => `<label class="chip"><input type="radio" name="obj" value="${o.id}"><span>${o.nombre}</span></label>`).join("")}</div>
        </fieldset>
        <fieldset>
          <legend>¿A qué profundidad?</legend>
          <div class="asis__opts">${profs.map((p) => `<label class="chip"><input type="radio" name="prof" value="${p.id}"${p.id === "nose" ? " checked" : ""}><span>${p.nombre}</span></label>`).join("")}</div>
        </fieldset>
        <label class="asis__check"><input type="checkbox" name="urbano"><span>El sitio está en zona urbana o tiene poco espacio libre</span></label>
      </form>
      <div class="asis__out" aria-live="polite"></div>`;

    const form = $("form", root), out = $(".asis__out", root);
    const render = () => {
      const fd = new FormData(form);
      const obj = objs.find((o) => o.id === fd.get("obj"));
      const prof = profs.find((p) => p.id === fd.get("prof"));
      const urbano = fd.get("urbano") === "on";
      if (!obj) {
        out.innerHTML = `
          <p class="asis__empty-t">Elige qué necesitas resolver</p>
          <p class="asis__empty">Te mostramos el estudio que normalmente se usa, hasta dónde llega, cuánto tarda en campo y qué recibes. Después puedes pedir la cotización con un clic.</p>`;
        out.classList.add("is-empty");
        return;
      }
      out.classList.remove("is-empty");
      const hasDepth = prof && prof.min != null;
      const reaches = (s) => s.pmin == null || !hasDepth || (s.pmin <= prof.max && s.pmax >= prof.min);
      let cand = obj.metodos.map(bySigla).filter(Boolean);
      let fuera = false;
      let ok = cand.filter(reaches);
      if (!ok.length) {
        // Ningún método habitual del objetivo llega a esa profundidad: se proponen los que sí llegan
        fuera = true;
        ok = SVC.filter((s) => s.pmin != null && reaches(s) && s.cat !== "magnetometria").slice(0, 3);
      }
      if (urbano) ok = [...ok].sort((a, b) => COMPACTOS.includes(b.sigla) - COMPACTOS.includes(a.sigla));
      const [main, ...rest] = ok;
      const extra = rest.slice(0, 2);
      const elegidos = [main, ...extra].map((s) => s.sigla);
      const necesitaLinea = ["TRE", "SEV", "IP", "TRS", "TEM"].includes(main.sigla);
      const q = new URLSearchParams({ estudio: elegidos.join(","), objetivo: obj.id, prof: prof ? prof.id : "nose" });
      const waText = `Hola, quiero cotizar un estudio geofísico.\n*Objetivo:* ${obj.nombre}\n*Profundidad:* ${prof ? prof.nombre : "No lo sé"}\n*Estudio sugerido:* ${elegidos.join(", ")}${urbano ? "\n*Sitio:* zona urbana / poco espacio" : ""}`;

      out.innerHTML = `
        <div class="asis__main">
          <span class="asis__sigla" aria-hidden="true">${main.sigla}</span>
          <h3>Te recomendamos: ${main.nombre}</h3>
          <p>${main.desc}</p>
          <dl class="asis__facts">
            <div><dt>Alcance típico</dt><dd>${alcance(main)}</dd></div>
            <div><dt>Trabajo de campo</dt><dd>${main.dias}</dd></div>
            <div><dt>Recibes</dt><dd>${main.entrega}</dd></div>
          </dl>
          <a class="link" href="${ficha(main)}">Ver ficha del estudio ${arrow}</a>
        </div>
        ${extra.length ? `<p class="asis__sub">Se complementa con</p><ul class="asis__extra">${extra.map((s) => `<li><a href="${ficha(s)}"><b>${s.sigla}</b><span>${s.nombre} · ${alcance(s)}</span></a></li>`).join("")}</ul>` : ""}
        <p class="asis__note">${fuera ? "Los métodos habituales para este objetivo no llegan a esa profundidad; estos sí. Te confirmamos la mejor opción al revisar tu proyecto. " : ""}${obj.nota}${urbano && necesitaLinea ? ` Ojo: ${main.sigla} necesita ${main.espacio.charAt(0).toLowerCase() + main.espacio.slice(1)}` : ""}</p>
        <div class="asis__actions">
          <a class="btn btn--accent" href="cotizar.html?${q}">Cotizar con esta recomendación ${arrow}</a>
          <a class="btn btn--wa" href="https://wa.me/${window.SITE.whatsapp}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener">Enviar por WhatsApp</a>
        </div>`;
      if (hasDepth) document.dispatchEvent(new CustomEvent("gs:depth", { detail: Math.sqrt(prof.min * prof.max) }));
    };
    form.addEventListener("change", (e) => {
      render();
      // En celular el resultado queda debajo de las opciones: se acerca a la vista al elegir objetivo
      if (e.target.name === "obj" && window.matchMedia("(max-width: 860px)").matches) out.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    // Preselección desde la URL (?objetivo=agua) o desde las aplicaciones del inicio
    const pre = params.get("objetivo");
    if (pre) { const r = $(`input[name="obj"][value="${pre}"]`, form); if (r) r.checked = true; }
    document.addEventListener("gs:objetivo", (e) => {
      const r = $(`input[name="obj"][value="${e.detail}"]`, form);
      if (r) { r.checked = true; render(); }
    });
    render();
  }

  /* ---------- Aplicaciones: una lista que cambia una sola foto grande ---------- */
  function aplicaciones(root) {
    const items = window.SECTORES;
    root.innerHTML = `
      <div class="apps__media">${items.map((s, i) => `<img ${window.pic(s.img, "(max-width: 860px) 80vw, 50vw")} alt="" loading="lazy" decoding="async" data-i="${i}"${i ? "" : ' class="is-on"'}>`).join("")}</div>
      <ul class="apps__list">${items.map((s, i) => `
        <li class="apps__item${i ? "" : " is-on"}" data-i="${i}">
          <button type="button" aria-expanded="${i ? "false" : "true"}">${s.nombre}</button>
          <div class="apps__body"><div>
            <p>${s.desc}</p>
            <p class="apps__tags">${s.tags.map((t) => { const x = bySigla(t); return x ? `<a href="${ficha(x)}">${t}</a>` : t; }).join("")}</p>
            <a class="link" href="#asistente" data-obj="${s.obj}">Ver qué estudio conviene ${arrow}</a>
          </div></div>
        </li>`).join("")}
      </ul>`;
    const activate = (i) => {
      $$(".apps__item", root).forEach((li) => {
        const on = li.dataset.i === String(i);
        li.classList.toggle("is-on", on);
        $("button", li).setAttribute("aria-expanded", on);
      });
      $$(".apps__media img", root).forEach((img) => img.classList.toggle("is-on", img.dataset.i === String(i)));
    };
    $$(".apps__item button", root).forEach((b) => b.addEventListener("click", () => activate(b.parentElement.dataset.i)));
    $$("[data-obj]", root).forEach((a) => a.addEventListener("click", () => document.dispatchEvent(new CustomEvent("gs:objetivo", { detail: a.dataset.obj }))));
  }

  $$("[data-depth-chart]").forEach(depthChart);
  $$("[data-asistente]").forEach(asistente);
  $$("[data-aplicaciones]").forEach(aplicaciones);
})();
