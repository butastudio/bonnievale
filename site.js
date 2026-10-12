(() => {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Phone menu
  const burger = $("#burger"), menu = $("#menu");
  if (burger) {
    burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); };
    menu.addEventListener("click", e => { if (e.target.closest("a")) { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  }

  // Join Discord: shown only when config has a link
  $$("[data-discord]").forEach(a => { if (S.discordUrl) { a.href = S.discordUrl; a.target = "_blank"; a.hidden = false; } });

  // Download button: the zip when there is one, otherwise "coming soon"
  const ready = !!S.downloadUrl;
  $$("[data-download]").forEach(a => {
    if (ready) { a.href = S.downloadUrl; a.removeAttribute("aria-disabled"); }
    else { a.textContent = "Bản tester sắp mở"; a.setAttribute("aria-disabled", "true"); a.href = "#tai"; }
  });
  $$("[data-download-note]").forEach(p => {
    p.textContent = ready
      ? ["Phiên bản " + S.version, S.released, "Windows 10/11 64-bit", S.downloadSize].filter(Boolean).join(" · ")
      : "Link tải sẽ có ở đây khi máy chủ mở cho tester." + (S.discordUrl ? " Vào Discord để nhận tin sớm nhất." : "");
  });

  // Release notes
  const news = $("#news");
  if (news) {
    const list = S.news || [];
    const block = (h, items) => items && items.length ? `<h4>${h}</h4><ul>${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
    news.innerHTML = list.length ? list.map(n => `<article class="news frame"><div class="when">${esc(n.date)} · Bản ${esc(n.version)}</div>
        ${n.intro ? `<p>${esc(n.intro)}</p>` : ""}${block("Đã sửa", n.fixed)}${block("Đã đổi", n.changed)}${block("Vẫn đang sửa", n.todo)}</article>`).join("")
      : `<p class="empty">Ghi chú của bản tester đầu tiên sẽ có ở đây khi bản mở.</p>`;
  }

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vids = {}; (S.videos || []).forEach(v => vids[v.id] = v);

  // A clip: the video when it exists (muted, looping, plays while on screen), otherwise its poster + "Đang quay"
  function clip(el, v) {
    if (!v) return;
    if (v.src) {
      el.innerHTML = `<video muted loop playsinline preload="none" poster="${esc(v.poster)}" aria-label="${esc(v.title)}"><source src="${esc(v.src)}" type="video/mp4"></video>`;
    } else {
      el.innerHTML = `<img src="${esc(v.poster)}" alt="${esc(v.title)}" loading="lazy"><span class="soon">Đang quay</span>`;
    }
  }
  $$("[data-video]").forEach(el => clip(el, vids[el.dataset.video]));
  const grid = $("#videos");
  if (grid) {
    grid.innerHTML = (S.videos || []).filter(v => v.id !== "hero").map(v => `<figure class="vcard frame"><div class="clip" data-v="${esc(v.id)}"></div><figcaption>${esc(v.title)}</figcaption></figure>`).join("");
    $$("[data-v]", grid).forEach(el => clip(el, vids[el.dataset.v]));
  }
  // Play only what is on screen (saves phones), never when motion is reduced
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
    const v = e.target; if (still) return;
    if (e.isIntersecting) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  }), { threshold: 0.25 }) : null;
  $$("video").forEach(v => { if (v.id !== "hero-video" && io) io.observe(v); });

  // Hero background clip
  const hv = $("#hero-video"), hero = vids.hero;
  if (hv && hero && hero.src) {
    hv.src = hero.src; if (hero.poster) hv.poster = hero.poster;
    if (!still) hv.play().catch(() => {});
    if (io) io.observe(hv);
  }

  // Fireflies (and a few leaves in the hero)
  if (!still) $$("[data-motes]").forEach(box => {
    const n = +box.dataset.motes || 10, leaves = box.closest(".hero") ? 5 : 0;
    let h = "";
    for (let i = 0; i < n + leaves; i++) {
      const leaf = i >= n;
      h += `<span class="mote${leaf ? " leaf" : ""}" style="left:${(Math.random() * 100).toFixed(1)}%;top:${leaf ? -5 : (20 + Math.random() * 75).toFixed(1)}%;--d:${(leaf ? 10 + Math.random() * 8 : 7 + Math.random() * 6).toFixed(1)}s;--b:${(2 + Math.random() * 3).toFixed(1)}s;animation-delay:-${(Math.random() * 10).toFixed(1)}s"></span>`;
    }
    box.innerHTML = h;
  });

  // Realm tabs
  const tabs = $$(".realm-tab");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(o => { const on = o === t; o.setAttribute("aria-selected", String(on)); $("#" + o.getAttribute("aria-controls")).hidden = !on; });
    const v = $("#" + t.getAttribute("aria-controls") + " video"); if (v && !still) v.play().catch(() => {});
  }));

  // Contact on the privacy page
  $$("[data-contact]").forEach(el => {
    el.innerHTML = S.contactEmail ? `email <b class="mail">${esc(S.contactEmail)}</b>` : (S.discordUrl ? `<a href="${esc(S.discordUrl)}" rel="noopener">Discord của Bonnievale</a>` : "kênh liên hệ ghi trên trang chủ");
  });
})();
