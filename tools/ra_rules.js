// NV11 rà Cẩm Nang so với mã online (cat-valley/docs/handoff/support/RA_CAM_NANG.md, đợt 1, 2026-10-14).
// Chỉ các dòng có nguồn tệp:dòng; dòng "chưa kiểm được" (14, 15) và dòng chờ NV4 (9) để nguyên.
// Dùng trong clean_book.js, và chạy riêng được trên cam-nang.html đã dựng: node tools/ra_rules.js cam-nang.html
function fix(h) {
  let n = 0, miss = [];
  const rep = (tag, a, b) => { if (h.includes(b)) return; if (!h.includes(a)) { miss.push(tag); return; } h = h.replace(a, b); n++; };
  // 5: bỏ câu "Mở hang xong, nên lưu game" (R3-04, 19-10): cam-nang.html đã sửa tay, không thêm lại
  // 6: ai trao nhánh Lv 10 (data/skillbooks/*.json home; skill_book.gd 26-30; bonnievale.lua 2065-2069)
  { const i = h.indexOf("<p><b>Tổ đội:</b>"), add = "\n  <p><b>Chọn nhánh (Lv 10):</b> mỗi lớp chỉ chọn ở một người: Chiến binh, Trung sĩ Ironjaw (Sảnh Huấn Luyện, Barkridge); Cung thủ, Sư phụ Fenna (Meowmont); Pháp sư, Bracken, Sứ giả xứ Gấu; Sát thủ, Inkling, Sứ giả xứ Cáo (hai sứ giả ở Hội Chợ Quả Sồi). Phải tới tận chỗ người đó mới chọn được.</p>";
    if (h.includes("<b>Chọn nhánh (Lv 10):</b>")) {} else if (i < 0) miss.push("6"); else { const j = h.indexOf("</p>", i) + 4; h = h.slice(0, j) + add + h.slice(j); n++; } }
  // 7: Thẻ Lữ Khách (core_travellers_pass*.tres)
  for (const id of ["q-quest-core-travellers_pass", "q-quest-core-travellers_pass_dog"]) {
    const i = h.indexOf(`id="${id}"`); const k = "gặp ông bầu Filbert.</div>";
    if (i > 0 && h.slice(i, h.indexOf("</article>", i)).includes("sang xứ khác")) continue;
    const j = i < 0 ? -1 : h.indexOf(k, i);
    if (j < 0 || j > h.indexOf("</article>", i)) { miss.push("7 " + id); continue; }
    h = h.slice(0, j) + "gặp ông bầu Filbert. Cần thẻ này để sang xứ khác, ví dụ Chiến binh Xứ Mèo sang Barkridge gặp Trung sĩ Ironjaw chọn nhánh.</div>" + h.slice(j + k.length); n++;
  }
  // 8: chơi tập không tính (fair_prizes.gd 188-191; fair_games.gd 150-153)
  rep("8", "cái cân thì không cần vé.</div>", "cái cân thì không cần vé. Chơi tập (miễn phí) không tính cho bước này.</div>");
  // 10: quặng và đá mọc lại (mine_rock.gd 32; debris.gd 60-63)
  rep("10", "đá hoa cương / sắt / pha lê cần Đào Mỏ III.</div>", "đá hoa cương / sắt / pha lê cần Đào Mỏ III. Mạch quặng mọc lại mỗi ngày lịch, riêng cho từng người. Đá và tảng ở ngoài đập là mất, trừ ở Hầm Mỏ Khởi Đầu, Mạch Rễ và Hầm Mộ Chìm (mọc lại mỗi ngày lịch).</div>");
  // 11: 3 boss mỗi ngày lịch, góp 10% máu (boss_rewards.gd 8-52)
  rep("11", "1/5 kinh nghiệm, không đồ, không xu. Phong ấn đã tan thì mở mãi.", "1/5 kinh nghiệm, không đồ, không xu. Mỗi ngày lịch chỉ 3 boss khác nhau đầu tiên được trả đủ quà, và bạn hoặc tổ phải góp ít nhất 10% máu boss. Phong ấn đã tan thì mở mãi.");
  // 16: tỉ lệ rơi (boss_thornmaw_queen.tres 32-39)
  rep("16", "<li>Mang thuốc (F để uống nhanh).", "<li>Tỉ lệ rơi đồ của boss là cho mỗi lần hạ được trả đủ quà.</li>\n  <li>Mang thuốc (F để uống nhanh).");
  console.log(`RA_CAM_NANG: ${n} fixes` + (miss.length ? `, not found: ${miss.join(", ")}` : ""));
  return h;
}
module.exports = { fix };
if (require.main === module) {
  const fs = require("fs"), f = process.argv[2];
  fs.writeFileSync(f, fix(fs.readFileSync(f, "utf8")));
}
