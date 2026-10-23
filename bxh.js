// Bảng xếp hạng. API_URL để trống = dùng dữ liệu mẫu (chờ NV1 chốt docs/handoff/dev/BXH_API.md).
(() => {
  const API_URL = "";
  const REFRESH_MS = 3 * 60 * 1000;
  const BOARDS = {
    level:   { title: "Top cấp",       sub: "Người chơi có cấp cao nhất.",            unit: v => "Cấp " + v },
    quests:  { title: "Top nhiệm vụ",  sub: "Hoàn thành nhiều nhiệm vụ nhất.",        unit: v => v + " nhiệm vụ" },
    hours:   { title: "Top giờ chơi",  sub: "Dành nhiều thời gian ở Bonnievale nhất.", unit: v => v + " giờ" },
    harvest: { title: "Top nông trại", sub: "Thu hoạch nhiều nhất (số lần thu hoạch).", unit: v => v + " lần" }
  };
  const $ = s => document.querySelector(s);
  let cur = "level", data = null;

  function fake() {
    const names = ["Mochi", "Sói Xám", "Lá Non", "Bếp Trưởng", "Cáo Con", "Tiểu Bạch", "Nấm Lùn", "Gấu Mật", "Thỏ Đá", "Chim Sẻ", "Mây", "Đèn Lồng"];
    const mk = (base, step) => names.map((n, i) => ({ name: i === 4 || i === 9 ? null : n, value: Math.max(1, Math.round(base - i * step - (i * 7 % 5))) }));
    return { updated: new Date().toISOString(), demo: true,
      level: mk(42, 3), quests: mk(130, 9), hours: mk(210, 15), harvest: mk(3400, 260) };
  }

  function esc(s) { const d = document.createElement("span"); d.textContent = s; return d.innerHTML; }

  function render() {
    const b = BOARDS[cur], rows = (data && data[cur]) || [];
    $("#bxh-title").textContent = b.title;
    $("#bxh-sub").textContent = b.sub;
    $("#bxh-empty").hidden = rows.length > 0;
    $("#bxh-list").innerHTML = rows.slice(0, 20).map((r, i) => {
      const anon = !r.name;
      return '<li class="bxh-row r' + (i < 3 ? i + 1 : 0) + '"><span class="bxh-rank">' + (i + 1) + '</span>' +
        '<span class="bxh-name' + (anon ? ' anon' : '') + '">' + (anon ? "Người chơi ẩn danh" : esc(r.name)) + '</span>' +
        '<span class="bxh-val">' + esc(b.unit(r.value)) + '</span></li>';
    }).join("");
    document.querySelectorAll(".bxh-tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.k === cur)));
    $("#bxh-demo").hidden = !(data && data.demo);
    const t = data && data.updated ? new Date(data.updated) : null;
    $("#bxh-time").textContent = t && !isNaN(t) ? t.toLocaleString("vi-VN") : "—";
  }

  async function load() {
    if (!API_URL) { data = fake(); render(); return; }
    try { const r = await fetch(API_URL, { cache: "no-store" }); if (!r.ok) throw 0; data = await r.json(); }
    catch (e) { if (!data) data = { updated: null }; }
    render();
  }

  document.querySelectorAll(".bxh-tab").forEach(t => t.onclick = () => { cur = t.dataset.k; render(); });
  load(); setInterval(load, REFRESH_MS);
})();
