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
    const rich = n => `<article class="news news-rich frame"><div class="when">${esc(n.date)} · Bản ${esc(n.version)}</div>
        ${n.intro ? `<p class="news-intro">${esc(n.intro)}</p>` : ""}
        ${n.highlights && n.highlights.length ? `<div class="news-hl"><h4><img src="img/icons/party.png" alt="" width="32" height="32">Nổi bật</h4><ul>${n.highlights.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>` : ""}
        <div class="news-grid">${n.sections.map(c => `<section class="news-sec"><h4><img src="${esc(c.icon)}" alt="" width="32" height="32">${esc(c.title)}</h4><ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></section>`).join("")}</div></article>`;
    news.innerHTML = list.length ? list.map(n => n.sections ? rich(n) : `<article class="news frame"><div class="when">${esc(n.date)} · Bản ${esc(n.version)}</div>
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
    grid.innerHTML = (S.videos || []).filter(v => v.id !== "hero" && v.grid !== false).map(v => `<figure class="vcard frame"><div class="clip" data-v="${esc(v.id)}"></div><figcaption>${esc(v.title)}${v.tag ? ` <span class="tag-soon">${esc(v.tag)}</span>` : ""}</figcaption></figure>`).join("");
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
  // Khung xem lớn: bấm ảnh, video hay thẻ tính năng để phóng to; ◀ ▶, phím mũi tên, vuốt để chuyển
  const lb = $("#lb");
  if (lb && lb.showModal) {
    const stage = $("#lb-stage"), strip = $("#lb-strip");
    let list = [], at = 0, opener = null;
    const vItem = id => { const v = vids[id]; return v && v.src ? { video: v.src, poster: v.poster, title: v.title } : v ? { img: v.poster, title: v.title } : null; };
    const itemOf = el => {
      if (el.classList.contains("clip")) { const id = el.dataset.video || el.dataset.v; return vItem(id); }
      const img = el.querySelector("img") || el;
      const cap = el.closest("figure") && el.closest("figure").querySelector("figcaption");
      return { img: img.getAttribute("src"), title: img.alt || (cap ? cap.textContent : "") };
    };
    function open(items, i, from) {
      list = items.filter(Boolean); if (!list.length) return;
      opener = from; at = i;
      strip.innerHTML = list.length > 1 ? list.map((it, k) => `<button type="button" class="${it.video ? "is-video" : ""}" style="background-image:url(${esc(it.poster || it.img)})" aria-label="${esc(it.title)}" data-k="${k}"></button>`).join("") : "";
      $("#lb-prev").hidden = $("#lb-next").hidden = list.length < 2;
      document.documentElement.classList.add("lb-open");
      $$("video").forEach(v => { if (!lb.contains(v)) v.pause(); });
      lb.showModal(); show();
    }
    function fit(img) {
      const w = img.naturalWidth, h = img.naturalHeight, cs = getComputedStyle(stage);
      const bw = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const bh = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const r = Math.min(bw / w, bh / h), k = r >= 1 ? Math.floor(r) : r; // cả số lần khi phóng to, để điểm ảnh vuông đều
      img.dataset.k = k; img.style.width = Math.round(w * k) + "px"; img.style.height = Math.round(h * k) + "px";
    }
    function show() {
      const it = list[at]; stage.classList.remove("zoomed");
      stage.innerHTML = it.video
        ? `<video controls autoplay loop playsinline poster="${esc(it.poster)}" aria-label="${esc(it.title)}"><source src="${esc(it.video)}" type="video/mp4"></video>`
        : `<img src="${esc(it.img)}" alt="${esc(it.title)}">`;
      const img = $("img", stage);
      if (img) {
        const go = () => fit(img); img.complete ? go() : img.addEventListener("load", go);
        img.addEventListener("click", e => {
          e.stopPropagation();
          if (stage.classList.toggle("zoomed")) {
            const k = +img.dataset.k || 1, z = Math.max(2, Math.floor(k) + 1), rx = e.offsetX / img.clientWidth, ry = e.offsetY / img.clientHeight;
            img.style.width = img.naturalWidth * z + "px"; img.style.height = img.naturalHeight * z + "px";
            stage.scrollLeft = img.offsetWidth * rx - stage.clientWidth / 2; stage.scrollTop = img.offsetHeight * ry - stage.clientHeight / 2;
          } else fit(img);
        });
      }
      $("#lb-title").textContent = it.title || "";
      $("#lb-more").textContent = it.more || "";
      $("#lb-count").textContent = list.length > 1 ? `${at + 1} / ${list.length}` : "";
      $$("button", strip).forEach((b, k) => b.setAttribute("aria-current", String(k === at)));
      const cur = $(`[data-k="${at}"]`, strip); if (cur) cur.scrollIntoView({ block: "nearest", inline: "center" });
    }
    const step = d => { if (list.length > 1) { at = (at + d + list.length) % list.length; show(); } };
    $("#lb-prev").onclick = () => step(-1); $("#lb-next").onclick = () => step(1);
    $("#lb-close").onclick = () => lb.close();
    strip.addEventListener("click", e => { const b = e.target.closest("[data-k]"); if (b) { at = +b.dataset.k; show(); } });
    lb.addEventListener("click", e => { if (e.target === lb || e.target === stage) lb.close(); });
    lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1); });
    lb.addEventListener("close", () => {
      if (lb.open) return; // vừa mở lại ngay sau khi đóng
      stage.innerHTML = ""; document.documentElement.classList.remove("lb-open");
      if (opener) opener.focus({ preventScroll: true });
      $$("video").forEach(v => { if (!lb.contains(v) && !still && v.getBoundingClientRect().bottom > 0 && v.getBoundingClientRect().top < innerHeight) v.play().catch(() => {}); });
    });
    let tx = null;
    stage.addEventListener("touchstart", e => { tx = stage.classList.contains("zoomed") ? null : e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); tx = null; });
    addEventListener("resize", () => { const img = $("img", stage); if (img && lb.open && !stage.classList.contains("zoomed")) fit(img); });

    // Ảnh và clip trên trang: gom theo nhóm [data-gallery], còn lại mỗi cái một mình
    const zoomables = $$(".shot img, .realm-thumbs img, .req.f8 img, .clip");
    zoomables.forEach(el => {
      let t = el;
      if (el.tagName === "IMG") { const w = document.createElement("span"); w.className = "zw"; el.replaceWith(w); w.appendChild(el); t = w; }
      t.classList.add("zoomable"); t.tabIndex = 0; t.setAttribute("role", "button");
      t.setAttribute("aria-label", "Phóng to: " + ((itemOf(t) || {}).title || ""));
    });
    const go = t => {
      const g = t.closest("[data-gallery]");
      const members = g ? $$(".zoomable", g) : [t];
      open(members.map(m => { const it = itemOf(m); if (it && g && g.id === "videos") { const c = m.closest("figure").querySelector("figcaption"); if (c) it.title = c.firstChild.textContent.trim(); } return it; }), members.indexOf(t), t);
    };
    // Thẻ tính năng: video và ảnh của tính năng đó, kèm đoạn giới thiệu dài hơn
    const goFeat = card => {
      const title = $("h3", card).textContent, more = card.dataset.more;
      open(card.dataset.media.split("|").map(m => { const it = m.startsWith("v:") ? vItem(m.slice(2)) : { img: m, title }; return it && Object.assign({}, it, { title, more }); }), 0, card);
    };
    document.addEventListener("click", e => {
      const z = e.target.closest(".zoomable"); if (z) { e.preventDefault(); go(z); return; }
      const f = e.target.closest(".feat[data-media]"); if (f) goFeat(f);
    });
    document.addEventListener("keydown", e => {
      if ((e.key !== "Enter" && e.key !== " ") || lb.open) return;
      const z = e.target.closest && e.target.closest(".zoomable, .feat[data-media]"); if (!z) return;
      e.preventDefault(); z.classList.contains("feat") ? goFeat(z) : go(z);
    });
  }
})();
