// Boss hang và boss săn khi chơi online (support/CO_CHE_BOSS.md mục 2-3, Leader 2026-10-14):
// ngủ 3 giờ thật sau lần bạn hạ, tính riêng từng người; "3 ngày" là luật bản chơi không mạng.
// Dùng trong clean_book.js, và chạy riêng được trên cam-nang.html đã dựng: node tools/boss_rules.js cam-nang.html
const HUNT_P = "Sau đó boss thức tỉnh là boss chung, nhưng chỉ người đã mở hang mới thấy và đánh được nó. Tổ 1-4 người cùng đánh, máu boss tăng theo số người. Hạ xong, boss ngủ <b>3 giờ thật</b>; thời gian này tính riêng cho từng người, theo lần hạ của chính bạn. Quà trả đủ ở lần hạ đầu của mỗi boss trong một ngày lịch (ngày lịch qua lúc 06:00 và 18:00 giờ Việt Nam), tối đa 3 boss khác nhau mỗi ngày lịch; bạn hoặc tổ phải góp ít nhất 10% máu boss mới có quà. Bảng Thợ Săn cho biết boss đã dậy chưa.";
const CARD = "mở bằng chuỗi nhiệm vụ ẩn của bãi săn; chỉ người đã mở hang thấy và đánh được; ngủ 3 giờ thật sau lần bạn hạ (tính riêng từng người)";
function fix(h) {
  const n = { para: 0, cards: 0, ambush: 0 };
  // đoạn "Bãi săn boss": câu gốc của sách, hoặc câu M51 cũ
  h = h.replace(/Sau đó boss (?:trở lại mỗi \d+ ngày\. Bảng Thợ Săn trong game cho biết boss đã hồi sinh chưa\.|thức tỉnh là boss chung của cả kênh:[^<]*?Bảng Thợ Săn cho biết còn bao lâu\.)/, () => { n.para++; return HUNT_P; });
  // dòng "Xuất hiện" của thẻ boss săn và boss hang
  h = h.replace(/mở bằng chuỗi nhiệm vụ ẩn của bãi săn, (?:boss chung, dậy lại 3 giờ thật sau khi bạn hạ|trở lại sau \d+ ngày lịch)/g, () => { n.cards++; return CARD; });
  // phòng phục kích ở Cây Cổ Thụ
  h = h.replace("thì rương mở được. Đầy lại sau 3 ngày.", () => { n.ambush++; return "thì rương mở được. Quái trong phòng đầy lại 5 phút sau khi dọn, rương đầy lại mỗi ngày lịch."; });
  console.log(`boss rules: hunt paragraph ${n.para}, boss cards ${n.cards}, ambush ${n.ambush}`);
  return h;
}
module.exports = { fix };
if (require.main === module) {
  const fs = require("fs"), f = process.argv[2];
  fs.writeFileSync(f, fix(fs.readFileSync(f, "utf8")));
}
