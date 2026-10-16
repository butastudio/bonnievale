// M101 phần B (0.4.1): W4 quà vật liệu + Chiến Thắng Đầu Tiên (boss_rewards.gd:58-60, 76-84; SO_BOSS mục L),
// W8 bỏ "Từ ngày N" khỏi thẻ nhiệm vụ (dữ liệu offline, online vô nghĩa).
// Chạy riêng được: node tools/m101_rules.js cam-nang.html (idempotent)
const W4 = "<li>Mỗi lần được trả đủ quà, boss cho thêm 2-3 vật liệu của nhóm nó (Dạ Tướng 4-5). Lần đầu tiên trong đời bạn hạ một boss dài: thêm kinh nghiệm bằng nửa mức thường của cấp boss và 5 vật liệu.</li>\n  ";
function fix(h) {
  const n = { w4: 0, w8: 0 };
  const a = "<li>Mang thuốc (F để uống nhanh).";
  if (h.includes(a) && !h.includes("Lần đầu tiên trong đời bạn hạ một boss dài")) { h = h.replace(a, () => { n.w4++; return W4 + a; }); }
  h = h.replace(/ · <b>Từ ngày<\/b> \d+/g, () => { n.w8++; return ""; });
  console.log(`m101 rules: W4 ${n.w4}, W8 ${n.w8}`);
  return h;
}
module.exports = { fix };
if (require.main === module) {
  const fs = require("fs"), f = process.argv[2];
  fs.writeFileSync(f, fix(fs.readFileSync(f, "utf8")));
}
