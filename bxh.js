// Bảng xếp hạng. Đọc GET /bxh/v1 (docs/handoff/dev/BXH_API.md). Chưa deploy / lỗi mạng: dùng dữ liệu mẫu.
(() => {
  const API_URL = "https://play.bonnievale.world/bxh/v1";
  const MIN_MS = 60 * 1000, DEFAULT_MS = 3 * 60 * 1000;
  const REALMS = { "realm.cat": "Xứ Mèo", "realm.dog": "Xứ Chó", "realm.bear": "Xứ Gấu", "realm.fox": "Xứ Cáo", "realm.rabbit": "Xứ Thỏ" };
  const nf = new Intl.NumberFormat("vi-VN");
  const BOARDS = {
    level:  { src: "level",  title: "Top cấp",       sub: "Người chơi có cấp chiến đấu cao nhất.",        unit: v => "Lv " + v },
    quests: { src: "quests", title: "Top nhiệm vụ",  sub: "Hoàn thành nhiều nhiệm vụ nhất.",              unit: v => nf.format(v) + " nhiệm vụ" },
    hours:  { src: "online", title: "Top giờ chơi",  sub: "Dành nhiều thời gian ở Bonnievale nhất.",      unit: v => new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v / 3600) + " giờ" },
    harvest:{ src: "farm",   title: "Top nông trại", sub: "Thu hoạch nhiều nhất (số nông sản đã thu).",   unit: v => nf.format(v) + " nông sản" }
  };
  const $ = s => document.querySelector(s);
  let cur = "level", data = null, stale = false, timer = 0;

  function fake() {
    const names = ["Mochi", "Sói Xám", "Lá Non", "Bếp Trưởng", "Cáo Con", "Tiểu Bạch", "Nấm Lùn", "Gấu Mật", "Thỏ Đá", "Chim Sẻ", "Mây", "Đèn Lồng"];
    const realms = Object.keys(REALMS);
    const mk = (top, step) => names.map((n, i) => ({ rank: i + 1, name: i === 4 || i === 9 ? "" : n, hidden: i === 4 || i === 9, realm: realms[i % 5], value: Math.max(1, Math.round(top - i * step)) }));
    const now = Math.floor(Date.now() / 1000);
    return { v: 1, at: now, next: now + 120, demo: true, boards: {
      level: mk(20, 1.4), quests: mk(98, 7), online: mk(150 * 3600, 11 * 3600), farm: mk(2100, 160) } };
  }

  function esc(s) { const d = document.createElement("span"); d.textContent = s; return d.innerHTML; }

  function render() {
    const b = BOARDS[cur], rows = (data && data.boards && data.boards[b.src]) || [];
    $("#bxh-title").textContent = b.title;
    $("#bxh-sub").textContent = b.sub;
    $("#bxh-empty").hidden = rows.length > 0;
    $("#bxh-list").innerHTML = rows.slice(0, 20).map((r, i) => {
      const anon = r.hidden || !r.name, realm = REALMS[r.realm];
      return '<li class="bxh-row r' + (i < 3 ? i + 1 : 0) + '"><span class="bxh-rank">' + (r.rank || i + 1) + '</span>' +
        '<span class="bxh-who"><span class="bxh-name' + (anon ? ' anon' : '') + '">' + (anon ? "Người chơi ẩn danh" : esc(r.name)) + '</span>' +
        (realm ? '<span class="bxh-realm">' + realm + '</span>' : '') + '</span>' +
        '<span class="bxh-val">' + esc(b.unit(r.value)) + '</span></li>';
    }).join("");
    document.querySelectorAll(".bxh-tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.k === cur)));
    $("#bxh-demo").hidden = !(data && data.demo);
    const t = data && data.at ? new Date(data.at * 1000) : null;
    $("#bxh-time").textContent = (t && !isNaN(t) ? t.toLocaleString("vi-VN") : "—") + (stale ? " (đang cập nhật)" : "");
  }

  async function load() {
    let wait = DEFAULT_MS;
    try {
      const r = await fetch(API_URL, { cache: "no-store" });
      if (!r.ok) throw 0;
      const j = await r.json();
      if (!j || !j.boards) throw 0;
      data = j; stale = false;
      if (j.next) wait = Math.max(MIN_MS, j.next * 1000 - Date.now());
    } catch (e) {
      if (data && !data.demo) stale = true; else { data = fake(); stale = false; }
    }
    render();
    clearTimeout(timer); timer = setTimeout(load, Math.min(wait, DEFAULT_MS));
  }

  document.querySelectorAll(".bxh-tab").forEach(t => t.onclick = () => { cur = t.dataset.k; render(); });
  load();
})();
