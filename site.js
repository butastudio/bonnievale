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
  $$("[data-discord]").forEach(a => { if (S.discordUrl) { a.href = S.discordUrl; a.hidden = false; } });

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

  // Contact on the privacy page
  $$("[data-contact]").forEach(el => {
    el.innerHTML = S.contactEmail ? `email <b class="mail">${esc(S.contactEmail)}</b>` : (S.discordUrl ? `<a href="${esc(S.discordUrl)}" rel="noopener">Discord của Bonnievale</a>` : "kênh liên hệ ghi trên trang chủ");
  });
})();
