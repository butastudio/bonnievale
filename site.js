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
    grid.innerHTML = (S.videos || []).filter(v => v.id !== "hero" && v.grid !== false).map(v => `<figure class="vcard frame"><div class="clip" data-v="${esc(v.id)}"></div><figcaption>${esc(v.title)}</figcaption></figure>`).join("");
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
    hv.hidden = false; hv.src = hero.src; if (hero.poster) hv.poster = hero.poster;
    if (!still) hv.play().catch(() => {});
    if (io) io.observe(hv);
  }

  // Fireflies, leaves and snow: NV3's sprites (assets/art/x1), drawn at 2x or 3x, never when motion is reduced
  const rnd = (a, b) => (a + Math.random() * (b - a)).toFixed(1);
  function sprinkle(box, n, kind) {
    let h = "";
    for (let i = 0; i < n; i++) {
      const k = kind === "mix" ? (i < n - 5 ? "fly" : "leaf") : kind;
      const img = k === "fly" ? "fx_firefly_" + (i % 3) : k === "leaf" ? "fx_leaf_" + (i % 4) : (i % 3 ? "fx_snow_s" : "fx_snow_l");
      const top = k === "fly" ? rnd(15, 90) + "%" : "-6%";
      const d = k === "fly" ? rnd(7, 13) : k === "leaf" ? rnd(10, 18) : rnd(8, 16);
      h += `<span class="mote ${k}" style="left:${rnd(0, 100)}%;top:${top};--d:${d}s;--b:${rnd(2, 5)}s;animation-delay:-${rnd(0, 12)}s;background-image:url(assets/art/x1/${img}.png)"></span>`;
    }
    box.innerHTML = h;
  }
  if (!still) {
    $$("[data-motes]").forEach(box => sprinkle(box, (+box.dataset.motes || 10) + (box.closest(".hero") ? 5 : 0), box.closest(".hero") ? "mix" : "fly"));
    $$("[data-snow]").forEach(box => sprinkle(box, +box.dataset.snow || 20, "snow"));
  }

  // Realm tabs
  const tabs = $$(".realm-tab");
  tabs.forEach(t => t.addEventListener("click", () => {
    const snow = $("[data-snow]"); if (snow) snow.hidden = t.id !== "tab-dog";
    tabs.forEach(o => { const on = o === t; o.setAttribute("aria-selected", String(on)); $("#" + o.getAttribute("aria-controls")).hidden = !on; });
    const v = $("#" + t.getAttribute("aria-controls") + " video"); if (v && !still) v.play().catch(() => {});
  }));

  // Contact on the privacy page
  $$("[data-contact]").forEach(el => {
    el.innerHTML = S.contactEmail ? `email <b class="mail">${esc(S.contactEmail)}</b>` : (S.discordUrl ? `<a href="${esc(S.discordUrl)}" rel="noopener">Discord của Bonnievale</a>` : "kênh liên hệ ghi trên trang chủ");
  });
})();
