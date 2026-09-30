(() => {
  const S = window.SITE || {}, B = window.BV || {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = k => (B.icons || {})[k] || "";
  const scale = h => Math.max(1, Math.floor(128 / h));

  $$("[data-v]").forEach(e => e.textContent = S.version || B.version || "");

  // Menu on phones
  const burger = $("#burger"), menu = $("#menu");
  burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); };
  menu.addEventListener("click", e => { if (e.target.closest("a")) { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

  // Downloads
  const WIN = '<svg viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges"><path fill="currentColor" d="M1 2h6v6H1zM9 2h6v6H9zM1 9h6v6H1zM9 9h6v6H9z"/></svg>';
  $$("[data-downloads]").forEach(row => {
    row.innerHTML = (S.downloads || []).map((d, i) => {
      const main = i === 0, ready = !!d.url;
      const label = ready ? d.label : (main ? d.label + " · sắp mở" : d.label);
      const note = ready || !main ? d.note : "Link tải đang được chuẩn bị";
      return `<div class="dl${main ? "" : " minor"}">${ready
        ? `<a class="btn" href="${esc(d.url)}" rel="noopener">${d.id === "win" ? WIN : ""}${esc(label)}</a>`
        : `<span class="btn" aria-disabled="true">${d.id === "win" ? WIN : ""}${esc(label)}</span>`}<small>${esc(note)}</small></div>`;
    }).join("");
  });

  // Icon ticker (doubled so the loop is seamless)
  const tk = Object.values(B.icons || {}).map(p => `<img src="${p}" alt="" width="32" height="32">`).join("");
  $("#ticker").innerHTML = tk + tk;

  // Numbers
  const c = B.counts || {};
  $("#stats").innerHTML = [[c.quests, "nhiệm vụ"], [c.items, "vật phẩm"], [c.enemies, "quái & boss"], [c.crops, "loại cây trồng"], [c.recipes, "công thức"], [c.npcs, "cư dân"], [c.floors, "tầng Cây Cổ Thụ"]]
    .filter(x => x[0]).map(([n, l]) => `<div class="stat frame"><b>${n}</b><span>${l}</span></div>`).join("");

  // Feature cards
  const F = [
    ["trophy_gnawroot", "Cây Cổ Thụ chín tầng", "Một dungeon bên trong thân cây: mỗi tầng một cách di chuyển, bẫy, phòng phục kích, kho báu và một Hộ Vệ hồi sinh mỗi sáng."],
    ["keepers_lantern", "Cốt truyện có chiều sâu", "Bốn chương về Khế Ước Đèn Lồng, chín ký ức của Cây Cổ Thụ và bí mật của Người Giữ Đèn Rosalind."],
    ["moon_sprinkler", "Tự động hóa nông trại", "Vòi tưới ba cấp, thùng nước mưa, máy làm hạt giống và chú Mầm tự thu hoạch để bạn dành thời gian phiêu lưu."],
    ["heartwood_tonic", "Nấu ăn, bào chế, rèn", "Hơn 80 công thức ở bếp, vạc thuốc, lò rèn, khung dệt và Vạc Cổ Thụ. Thuốc từ nông trại là thuốc tốt nhất thung lũng."],
    ["cloud_wisp", "Cân Đẩu Vân", "Gom Sợi Mây, bay khắp thung lũng nhanh gấp gần hai lần. Đá Dấu Chân dịch chuyển giữa các vùng."],
    ["return_stone", "Bãi săn boss ẩn", "Lần theo manh mối, mở hang và săn phiên bản thức tỉnh của boss, quay lại mỗi ba ngày."],
    ["sovereign_crown", "230 món thời trang", "Salon đổi màu lông, giống mèo, gương mặt và màu mắt. Mũ, kính, áo quần chỉ để mặc cho đẹp."],
    ["fishing_rod", "Câu cá, đào mỏ, hái lượm", "Nghề nào cũng có cấp và thầy dạy. Lên Bậc Thầy để trồng được hạt giống Cổ Thụ hiếm nhất."],
  ];
  $("#features").innerHTML = F.map(([k, t, d]) => `<div class="card frame">${icon(k) ? `<img src="${icon(k)}" alt="" width="48" height="48">` : ""}<h4>${t}</h4><p>${d}</p></div>`).join("");

  // Story slideshow
  const story = B.story || [];
  let si = 0, timer = 0;
  const dots = $("#story-dots");
  dots.innerHTML = story.map((s, i) => `<button type="button" role="tab" aria-label="Tranh ${i + 1}" data-i="${i}"></button>`).join("");
  function showStory(i, user) {
    if (!story.length) return;
    si = (i + story.length) % story.length;
    const s = story[si], img = $("#story-img");
    img.style.opacity = 0;
    setTimeout(() => { img.src = s.img; img.alt = s.when; img.style.opacity = 1; }, 150);
    $("#story-when").textContent = s.when; $("#story-cap").textContent = s.text;
    $$("button", dots).forEach((b, j) => b.setAttribute("aria-selected", String(j === si)));
    if (user) { clearInterval(timer); timer = 0; }
  }
  $("#story-prev").onclick = () => showStory(si - 1, true);
  $("#story-next").onclick = () => showStory(si + 1, true);
  dots.onclick = e => { const b = e.target.closest("button"); if (b) showStory(+b.dataset.i, true); };
  showStory(0);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => showStory(si + 1), 9000);

  // Classes
  const classes = B.classes || [];
  const tabs = $("#class-tabs"), panel = $("#class-panel");
  tabs.innerHTML = classes.map((k, i) => `<button class="btn ghost" type="button" role="tab" id="tab-${k.id}" aria-controls="class-panel" data-i="${i}">${k.weapon ? `<img src="${k.weapon}" alt="">` : ""}${esc(k.name)}</button>`).join("");
  const short = s => { const a = String(s || "").split(", ").filter(Boolean); return a.slice(0, 4).join(", ") + (a.length > 4 ? "…" : ""); };
  function showClass(i) {
    const k = classes[i]; if (!k) return;
    $$("button", tabs).forEach((b, j) => { b.setAttribute("aria-selected", String(j === i)); b.classList.toggle("ghost", j !== i); });
    panel.setAttribute("aria-labelledby", "tab-" + k.id);
    panel.innerHTML = `<div><div class="k-head">${k.weapon ? `<img src="${k.weapon}" alt="">` : ""}<div><div class="eyebrow">Thầy: ${esc(k.master)}</div><h3>${esc(k.name)}</h3></div></div>
      <p>${esc(k.desc)}</p>${k.passive ? `<p class="meta"><b>Nội tại:</b> ${esc(k.passive)}</p>` : ""}
      <p class="meta"><b>Mạnh với:</b> ${esc(short(k.good))}</p><p class="meta"><b>Yếu với:</b> ${esc(short(k.bad))}</p></div>
      <div class="skills">${k.skills.map(s => `<div class="skill${s.hidden ? " hidden" : ""}"><span class="key">${esc(s.key)}</span><div><b>${esc(s.name)}</b>${s.hidden ? ' <small class="eyebrow">kỹ năng ẩn</small>' : ""}<p>${esc(s.desc)}</p></div></div>`).join("")}</div>
      <div class="subs">${k.subs.map(s => `<div class="sub"><small>Nhánh chuyên sâu</small><b>${esc(s.name)}</b><p>${esc(s.desc)}</p></div>`).join("")}</div>`;
  }
  tabs.onclick = e => { const b = e.target.closest("button"); if (b) showClass(+b.dataset.i); };
  showClass(0);

  // Bestiary
  const foes = B.foes || [];
  const KIND = { boss: "Boss", guardian: "Hộ Vệ", monster: "Quái" };
  const filters = [["all", "Tất cả"], ["boss", "Boss"], ["guardian", "Hộ Vệ Cây Cổ Thụ"], ["monster", "Quái thường"]];
  let fk = "boss", showAll = false;
  $("#foe-filter").innerHTML = filters.map(([k, l]) => `<button class="btn btn-sm ghost" type="button" data-k="${k}">${l} <small>${k === "all" ? foes.length : foes.filter(f => f.kind === k).length}</small></button>`).join("");
  function drawFoes() {
    $$("#foe-filter button").forEach(b => { const on = b.dataset.k === fk; b.setAttribute("aria-pressed", String(on)); b.classList.toggle("ghost", !on); });
    const list = foes.filter(f => fk === "all" || f.kind === fk);
    const cut = showAll ? list : list.slice(0, 18);
    $("#bestiary").innerHTML = cut.map(f => {
      const s = scale(f.h);
      return `<div class="foe frame" tabindex="0">${f.kind !== "monster" ? `<span class="tag${f.kind === "guardian" ? " g" : ""}">${KIND[f.kind]}</span>` : ""}
        <div class="stage"><div class="sprite" style="--w:${f.w};--h:${f.h};--s:${s};background-image:url(${f.img})" role="img" aria-label="${esc(f.name)}"></div></div>
        <h4>${esc(f.name)}</h4><div class="where">${esc(f.where)}</div><div class="st">HP ${f.hp} · Công ${f.atk}${f.weak ? ` · Yếu ${esc(f.weak)}` : ""}</div></div>`;
    }).join("") + "";
    const more = $("#foe-more");
    if (more) more.remove();
    if (list.length > cut.length) $("#bestiary").insertAdjacentHTML("afterend", `<div class="more" id="foe-more"><button class="btn ghost" type="button">Xem tất cả ${list.length} con</button></div>`);
    const m = $("#foe-more button"); if (m) m.onclick = () => { showAll = true; drawFoes(); };
  }
  $("#foe-filter").onclick = e => { const b = e.target.closest("button"); if (b) { fk = b.dataset.k; showAll = false; drawFoes(); } };
  $("#bestiary").addEventListener("click", e => { const f = e.target.closest(".foe"); if (f) f.classList.toggle("play"); });
  drawFoes();

  // Villagers
  $("#villagers").innerHTML = (B.npcs || []).map(n => `<div class="vill frame"><div class="sprite" style="--w:32;--h:32;--s:3;background-image:url(${n.img});animation-delay:-${(Math.random() * .6).toFixed(2)}s" role="img" aria-label="${esc(n.name)}"></div><b>${esc(n.name)}</b><span>${esc(n.role)}</span></div>`).join("");

  // News
  const news = S.news || [];
  $("#news").innerHTML = `<div class="news-list">${news.map((n, i) => `<article class="news frame${i > 1 ? " old" : ""}"><div class="when">${esc(n.date)} · Bản ${esc(n.version)}</div><h3>${esc(n.title)}</h3><ul>${n.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></article>`).join("")}</div>`
    + (news.length > 2 ? `<div class="more"><button class="btn ghost" type="button" id="news-more">Xem các bản cũ hơn</button></div>` : "");
  const nm = $("#news-more"); if (nm) nm.onclick = () => { $(".news-list").classList.add("all"); nm.parentElement.remove(); };

  // Contact
  const ct = [];
  if (S.email) ct.push(`<span class="mail">${esc(S.email)}</span><button class="btn btn-sm ghost" type="button" id="copy-mail">Chép địa chỉ</button><a class="btn btn-sm" href="mailto:${esc(S.email)}">Gửi email</a>`);
  if (S.discord) ct.push(`<a class="btn btn-sm" href="${esc(S.discord)}" rel="noopener">Vào Discord</a>`);
  if (S.facebook) ct.push(`<a class="btn btn-sm ghost" href="${esc(S.facebook)}" rel="noopener">Facebook</a>`);
  $("#contact").innerHTML = ct.length ? ct.join("") : `<span class="empty">Kênh liên hệ sẽ được cập nhật sớm.</span>`;
  const cm = $("#copy-mail");
  if (cm) cm.onclick = () => navigator.clipboard.writeText(S.email).then(() => cm.textContent = "Đã chép", () => { const r = document.createRange(); r.selectNodeContents($(".mail")); getSelection().removeAllRanges(); getSelection().addRange(r); });
})();
