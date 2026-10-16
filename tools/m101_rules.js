// M101 phần B (0.4.1): W4 quà vật liệu + Chiến Thắng Đầu Tiên (boss_rewards.gd:58-60, 76-84; SO_BOSS mục L),
// W8 bỏ "Từ ngày N" khỏi thẻ nhiệm vụ (dữ liệu offline, online vô nghĩa).
// Chạy riêng được: node tools/m101_rules.js cam-nang.html (idempotent)
const W4 = "<li>Mỗi lần được trả đủ quà, boss cho thêm 2-3 vật liệu của nhóm nó (Dạ Tướng 4-5). Lần đầu tiên trong đời bạn hạ một boss dài: thêm kinh nghiệm bằng nửa mức thường của cấp boss và 5 vật liệu.</li>\n  ";
// W10: bài Hội Chợ Quả Sồi (HOI_DAP mục Hội Chợ; root_carts.gd:4-9, 12; fair_games.gd:10-12, 18-20; week_boss.gd:10). Tên và mốc Đua Lá do Leader chốt 16-10.
const FAIR = `<article class="entry guide prose" data-kind="guide" data-n="Hội Chợ Quả Sồi: xe rễ, vé, trò chơi, huy chương" id="g-fair">
  <h3>Hội Chợ Quả Sồi</h3>
  <div class="cols2">
  <p><b>Đi tới:</b> bằng xe rễ của bầy sóc. Trạm nằm ở thị trấn đầu tiên của mỗi xứ (Meowmont, Barkridge), cạnh trạm Hội Phiêu Lưu. Đi tới Hội Chợ và về lại đúng thị trấn đã đi thì miễn phí. Có <b>Thẻ Lữ Khách</b> (Lv 10) thì đi trạm nào tới trạm nào cũng được, 50 xu một lượt; chặng tới và về Hội Chợ vẫn miễn phí.</p>
  <p><b>Vé Hội Chợ:</b> nhiệm vụ <a class="qref" href="#q-quest-fair-first_visit">Ngày Đầu Ở Hội Chợ</a> cho thêm vé. Mỗi ngày lịch, việc vặt của Người Đưa Xe Hội Chợ cho 1 vé. Lần đầu hạ boss tuần trong tuần cho thêm 2 vé. Quầy Cobnut ghi rõ.</p>
  <p><b>Câu Vịt Gỗ:</b> đứng bờ ao, bấm <b>E</b> rồi chọn Chơi hay Chơi tập. Trong 60 giây, bấm <b>E</b> để thả câu, vịt cắn thì bấm <b>E</b> kéo lên. Mỗi vịt 1-3 điểm. Huy chương: đồng 5, bạc 10, vàng 16 điểm.</p>
  <p><b>Đua Lá Rơi:</b> đứng ở vạch xuất phát, bấm <b>E</b>. Chạy 2 vòng, qua lần lượt 3 lá cờ phía bắc rồi về vạch, đi sát cờ mới tính. Tối đa 3 phút. Huy chương theo thời gian: đồng 40 giây, bạc 33 giây, vàng 28 giây. Chạy dưới 15 giây thì không tính.</p>
  <p><b>Cân Lớn:</b> bấm <b>E</b> ở cái cân, chọn một nông sản trong túi. Không cần vé.</p>
  <p><b>Quà:</b> một vé chơi được một lượt, cho Quả Sồi Quà và Điểm Hội Chợ (huy chương càng cao càng nhiều; có người chơi khác đứng gần thì thêm 1 điểm). Đổi điểm lấy đồ ở quầy Trinket. <b>Chơi tập</b> (miễn phí) không tính cho nhiệm vụ.</p>
  </div>
</article>
  `;
function fix(h) {
  const n = { w4: 0, w8: 0, w10: 0 };
  const a = "<li>Mang thuốc (F để uống nhanh).";
  if (h.includes(a) && !h.includes("Lần đầu tiên trong đời bạn hạ một boss dài")) { h = h.replace(a, () => { n.w4++; return W4 + a; }); }
  h = h.replace(/ · <b>Từ ngày<\/b> \d+/g, () => { n.w8++; return ""; });
  if (!h.includes("id=\"g-fair\"")) h = h.replace("  <h3>Các vùng đất</h3>", () => { n.w10++; return FAIR + "<h3>Các vùng đất</h3>"; });
  console.log(`m101 rules: W4 ${n.w4}, W8 ${n.w8}, W10 ${n.w10}`);
  return h;
}
module.exports = { fix };
if (require.main === module) {
  const fs = require("fs"), f = process.argv[2];
  fs.writeFileSync(f, fix(fs.readFileSync(f, "utf8")));
}
