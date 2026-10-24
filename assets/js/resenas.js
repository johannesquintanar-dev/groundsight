/*
 * RESEÑAS DE CLIENTES
 * Las reseñas llegan al correo desde el formulario de resenas.html. Solo se publican las que el
 * cliente autorizó: copia sus datos aquí abajo, tal como los escribió (sin editar el sentido).
 * Ejemplo de una entrada:
 *   { nombre: "Ing. Laura Méndez", empresa: "Constructora del Valle", ciudad: "Toluca, Edo. Méx.",
 *     estudio: "MASW", calificacion: 5, fecha: "2026-11", texto: "Entregaron a tiempo y ..." }
 */
window.RESENAS = [];

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const SITE = window.SITE;
  const star = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>`;
  const stars = (n) => `<span class="stars" aria-label="${n} de 5 estrellas">${[1, 2, 3, 4, 5].map((i) => `<span class="${i <= n ? "on" : ""}">${star}</span>`).join("")}</span>`;
  const esc = (t) => String(t || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mes = (f) => { if (!f) return ""; const [y, m] = f.split("-"); return new Date(y, (m || 1) - 1).toLocaleDateString("es-MX", { month: "long", year: "numeric" }); };

  /* ---------- Lista de reseñas publicadas ---------- */
  const lista = $("#resenas-lista");
  if (lista) {
    const R = window.RESENAS;
    if (!R.length) {
      lista.innerHTML = `<p class="resenas__vacio">Todavía no publicamos reseñas: somos una empresa nueva y queremos que cada opinión sea real. Si ya trabajamos juntos, la tuya puede ser la primera.</p>`;
    } else {
      const prom = R.reduce((a, r) => a + r.calificacion, 0) / R.length;
      lista.innerHTML = `
        <p class="resenas__prom"><b>${prom.toFixed(1)}</b>${stars(Math.round(prom))}<span>${R.length} ${R.length === 1 ? "reseña" : "reseñas"} de clientes</span></p>
        <ul class="resenas__grid">${R.map((r) => {
          const s = (window.SERVICIOS || []).find((x) => x.sigla === r.estudio);
          return `
          <li class="resena">
            ${stars(r.calificacion)}
            <blockquote>${esc(r.texto)}</blockquote>
            <p class="resena__autor"><b>${esc(r.nombre)}</b>${r.empresa ? `, ${esc(r.empresa)}` : ""}<span>${[s ? s.nombre : r.estudio, r.ciudad, mes(r.fecha)].filter(Boolean).map(esc).join(" · ")}</span></p>
          </li>`;
        }).join("")}</ul>`;
    }
  }

  /* ---------- Botón de Google (solo si ya existe el perfil) ---------- */
  const g = $("#resenas-google");
  if (g && SITE.resenasGoogle) {
    g.hidden = false;
    $("a", g).href = SITE.resenasGoogle;
  }

  /* ---------- Formulario ---------- */
  const form = $("#form-resena");
  if (!form) return;
  const sel = form.elements.Estudio;
  sel.innerHTML = `<option value="">Elige el estudio</option>` + (window.CATEGORIAS || []).map((c) => `
    <optgroup label="${c.nombre}">${window.SERVICIOS.filter((s) => s.cat === c.id).map((s) => `<option value="${s.sigla}">${s.sigla} · ${s.nombre}</option>`).join("")}</optgroup>`).join("") + `<option value="Otro">Otro / varios estudios</option>`;
  const pre = new URLSearchParams(location.search).get("estudio");
  if (pre) sel.value = pre;

  // Estrellas: el texto de ayuda dice qué significa cada calificación
  const rate = $(".rate", form), rateTxt = $(".rate__txt", form);
  const TXT = ["", "Malo", "Regular", "Bueno", "Muy bueno", "Excelente"];
  rate.addEventListener("change", () => { rateTxt.textContent = TXT[form.elements.Calificacion.value] || ""; });

  const msg = $("#resenaMsg");
  const setMsg = (t, k) => { msg.textContent = t; msg.className = `form__msg ${k || ""}`; };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get("_honey")) return;
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    const faltan = ["Nombre", "Estudio", "Resena"].filter((n) => !String(fd.get(n) || "").trim());
    faltan.forEach((n) => form.elements[n].classList.add("is-invalid"));
    if (!fd.get("Calificacion")) { rate.classList.add("is-invalid"); faltan.push("Calificacion"); }
    if (faltan.length) { setMsg("Completa los campos marcados y elige una calificación.", "err"); return; }
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    setMsg("Enviando…");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva reseña (${fd.get("Calificacion")}★) — ${fd.get("Nombre")}`,
          _template: "table",
          Nombre: fd.get("Nombre"),
          Empresa: fd.get("Empresa") || "—",
          Ciudad: fd.get("Ciudad") || "—",
          Estudio: fd.get("Estudio"),
          Calificacion: `${fd.get("Calificacion")} de 5`,
          Resena: fd.get("Resena"),
          Publicar: fd.get("Publicar") ? "Sí, autoriza publicar su nombre y empresa" : "No: usar solo de forma interna",
          Correo: fd.get("email") || "—"
        })
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || String(out.success) !== "true") throw new Error(out.message || res.status);
      form.reset();
      rateTxt.textContent = "";
      setMsg("¡Gracias por tu reseña! La revisamos y, si autorizaste publicarla, aparecerá aquí en unos días.", "ok");
    } catch (err) {
      setMsg("No se pudo enviar en este momento. Si prefieres, mándanos tu reseña por WhatsApp.", "err");
    } finally {
      btn.disabled = false;
    }
  });
})();
