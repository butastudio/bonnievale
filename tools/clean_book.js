// Makes the site's handbook (cam-nang.html) from the book the online tree builds
// (bonnievale-online: tools/GuideBook.tscn -> docs/guide/out/Bonnievale_CamNang_Sach.html).
// The data chapters (quests, bosses, monsters, items, NPCs...) come straight from the game data and stay.
// The hand-written parts of the old offline book that no longer hold online are taken out
// (old update box, saving in bed, the old Cat chapter frame and day-by-day road plan), and a short
// "playing online" page goes in at the front.
// Run: node tools/clean_book.js <built book.html>   (writes cam-nang.html next to index.html)
const fs = require("fs"), path = require("path");
const src = process.argv[2];
if (!src) { console.error("usage: node tools/clean_book.js <Bonnievale_CamNang_Sach.html>"); process.exit(1); }
let h = fs.readFileSync(src, "utf8");

// Articles that describe the offline game or an old story frame.
const DROP = ["g-update", "g-basics", "g-ch1", "g-ch2", "g-ch3", "g-ch4", "g-lastmem", "g-hollow", "g-p1", "g-p2", "g-p3", "g-p4", "g-p5"];
let dropped = 0;
for (const id of DROP) {
  const re = new RegExp(`<article [^>]*id="${id}"[\\s\\S]*?</article>`);
  if (re.test(h)) { h = h.replace(re, ""); dropped++; }
}

const ONLINE = `<article class="entry guide prose" data-kind="guide" data-n="Chơi online: tài khoản, nhân vật, tổ đội, báo lỗi F8" id="g-online">
  <h3>Chơi online</h3>
  <div class="cols2">
  <p><b>Tài khoản:</b> ở màn đăng nhập, tạo tài khoản bằng email và mật khẩu từ 8 ký tự. Nhân vật, túi đồ và nông trại lưu trên máy chủ, đăng nhập ở máy nào cũng chơi tiếp được.</p>
  <p><b>Nhân vật:</b> tạo nhân vật trong một màn 5 thẻ (Danh tính, Ngoại hình, Trang phục, Xuất thân, Nông trại). Xứ bắt đầu là <b>Xứ Mèo</b> hoặc <b>Xứ Chó</b>; mỗi xứ có quê nhà, cốt truyện và nhiệm vụ đầu riêng.</p>
  <p><b>Thế giới chung:</b> người chơi khác đi lại, đánh quái và boss săn ngay trên bản đồ của bạn. Ngày đêm và mùa trôi theo giờ máy chủ.</p>
  <p><b>Tổ đội:</b> lập tổ tới 4 người. Hộ Vệ các tầng hầm ngục đánh theo tổ trong phòng riêng (vào qua bia đá), máu boss tăng theo số người.</p>
  <p><b>Đi đâu tiếp:</b> theo đom đóm và thẻ <b>Tiếp theo</b> ở góc màn hình; người có dấu <b>!</b> trên đầu đang có việc cho bạn.</p>
  <p><b>Báo lỗi:</b> nhấn <b>F8</b>, viết điều đã xảy ra, giữ ô đính kèm ảnh nếu muốn rồi bấm Gửi.</p>
  </div>
  <p class="dim">Cẩm Nang này tạo tự động từ dữ liệu game của bản thử nghiệm. Số liệu có thể đổi giữa các bản vá.</p>
</article>`;
// Put it first in chapter I, before the controls table.
h = h.replace(/(<article class="entry guide" data-kind="guide" data-n="Phím điều khiển" id="g-keys">)/, ONLINE + "\n  $1");

// Words of the old offline book.
h = h.replace("Bản cập nhật Cây Cổ Thụ · in ngày", "Bonnievale Online · bản thử nghiệm · in ngày");
h = h.replace(/<p class="lede">Bạn vừa nhận một mảnh đất nhỏ ở rìa Meowmont[^<]*<\/p>/,
  '<p class="lede">Bạn là một chú mèo hoặc một chú chó vừa về nhận mảnh đất nhỏ của mình. Cuốn cẩm nang này đi cùng bạn từ luống đất đầu tiên tới những tầng sâu nhất của hầm ngục. Gõ bất cứ thứ gì vào ô tra cứu phía trên, bấm ô vuông ở góc mỗi mục để đánh dấu những gì bạn đã làm xong.</p>');
h = h.replace(/<p class="lede">Lộ trình gợi ý cho người chơi tập trung\.[^<]*<\/p>/,
  '<p class="lede">Bảng dưới liệt kê nhiệm vụ theo thứ tự xuất hiện. Trong game, thẻ Tiếp theo và đom đóm luôn chỉ việc kế tiếp, nên bạn không cần đi theo đúng bảng.</p>');
h = h.replace(/<p class="lede">Năm vương quốc, một loài hoa phát sáng[^<]*<\/p>/,
  '<p class="lede">Năm xứ và một Khế Ước cổ. Đây là đoạn mở đầu mà mọi người chơi đều thấy; phần còn lại của câu chuyện mở dần theo nhiệm vụ trong game.</p>');

// --- M51: NV4's online-rules fixes (docs/handoff/INBOX/NV7.md) ----------------------------------
let fixed = 0;
const li = (start, html) => { // replace the whole <li> that starts with `start`
  const i = h.indexOf("<li>" + start); if (i < 0) { console.warn("M51: not found:", start); return; }
  const j = h.indexOf("</li>", i); h = h.slice(0, i) + "<li>" + html + "</li>" + h.slice(j + 5); fixed++;
};
const rep = (a, b) => { if (!h.includes(a)) { console.warn("M51: not found:", a.slice(0, 60)); return; } h = h.replace(a, b); fixed++; };
// V. Maps and hunting grounds
rep('vỡ khi hạ <b class="foe">Thủ lĩnh cướp Gristle</b>.</li>', 'vỡ khi hạ <b class="foe">Thủ lĩnh cướp Gristle</b>. Từ phía Xứ Chó, rào chặn lối về tây: đi xe rễ ở bến, hoặc qua Cầu Máng sau chương 5.</li>');
rep("Sau đó boss trở lại mỗi 3 ngày. Bảng Thợ Săn trong game cho biết boss đã hồi sinh chưa.",
  "Sau đó boss thức tỉnh là boss chung của cả kênh: tổ 1-4 người cùng đánh, máu boss tăng theo số người. Bạn hạ nó xong thì 3 giờ thật sau nó dậy lại; boss gốc trong hang trở lại sau 3 ngày lịch (khoảng 36 giờ thật). Bảng Thợ Săn cho biết còn bao lâu.");
// VI. The Elder Heartwood
li("<b>Chiến lợi phẩm của Hộ Vệ</b>", "<b>Hộ Vệ luôn có mặt mỗi lần bạn vào đấu trường.</b> Lần hạ đầu tiên trong mỗi ngày lịch mới có chiến lợi phẩm và xu (ngày lịch qua lúc 6:00 và 18:00 giờ Việt Nam). Hạ lại trong cùng ngày là đánh giúp bạn bè: 1/5 kinh nghiệm, không đồ, không xu. Phong ấn đã tan thì mở mãi.</li>\n  <li><b>Chiến lợi phẩm của Hộ Vệ</b> (tăng theo tầng): <b>2 hạt giống</b> của tầng (100%), thuốc của tầng (70%), Đá Tia Lửa (15%), xu (38-76 ở tầng 1 tới 185-370 ở tầng 9), <b>chiến lợi phẩm riêng 10%</b>, Viên Đá Khứ Hồi 25% (tầng 4+), Vảy Rồng 8% (tầng 7+).");
li("<b>Độ khó Hộ Vệ:</b>", "<b>Độ khó Hộ Vệ:</b> khi đánh một mình, máu khoảng 6.700 (tầng 1) tới 38.700 (tầng 9), xem thẻ từng tầng; đánh theo tổ thì máu tăng theo số người. Sát thương 20 tới 44, gần như không bị đẩy lùi. Mang thuốc, né vùng báo trước và đánh lúc nó hồi chiêu.");
// IX. Bosses
rep("tự hồi máu (dồn sát thương để cắt).</li>", "tự hồi máu (dồn sát thương để cắt). Khi khiên lính còn, đòn của bạn chỉ còn 1/4 sức: luôn giết lính trước. Boss tầng và boss săn đánh được theo tổ 1-4 người; máu boss tăng theo số người.</li>");
// XI. Farm (crops grow on real time)
{ const i = h.indexOf("<li><b>Tưới</b>"); const j = h.indexOf("</li>", i);
  if (i > 0) { h = h.slice(0, i) + "<li><b>Tưới</b> bằng Bình tưới: đất giữ ẩm 24 giờ thật. Ngày trong game qua hai lần mỗi ngày thật, lúc 6:00 và 18:00 giờ Việt Nam; mỗi lần qua ngày, cây trên đất ẩm lớn một giai đoạn. Đất khô hay trái mùa thì cây đứng yên, không bao giờ chết. Trời mưa tự tưới ngoài trời. Bình hết nước → đứng cạnh nước (sông, giếng, ao) và dùng để đổ đầy.</li>" + h.slice(j + 5); fixed++; }
  else console.warn("M51: not found: Tưới"); }
rep("tiền về lúc 6:00 sáng hôm sau.</li>", "tiền về ở lần qua ngày kế tiếp (6:00 hoặc 18:00 giờ Việt Nam).</li>");
rep("tưới lúc <b>6:00 mỗi sáng</b> các ô đã cuốc trong tầm:", "giữ ẩm các ô đã cuốc trong tầm ở <b>mỗi lần qua ngày</b>:");
rep("sáng hôm sau ra hạt giống.</li>", "tới lần qua ngày kế tiếp ra 1-3 hạt giống.</li>");
rep("mỗi sáng một chú Mầm tự thu hoạch", "mỗi lần qua ngày, một chú Mầm tự thu hoạch");
// XIII. Classes
li("<b>Chọn lớp</b>", "<b>Chọn lớp</b> từ Lv1: gặp Rowan ở Hội Phiêu Lưu (Meowmont) hoặc các thầy ở Sảnh Huấn Luyện (Barkridge). Lớp chọn vĩnh viễn, nên đọc cả bốn lớp trước.");
rep("Mỗi ngày có thể luyện tập với thầy một lần.", "Mỗi ngày lịch (12 giờ thật) luyện với thầy được một lần.");
li("<b>Nhánh Chuyên Sâu:</b>", "<b>Nhánh Chuyên Sâu:</b> từ Lv 10, người trao nhánh mở Thử Thách Nhánh, một sân riêng. Mỗi nhánh thử tới 2 phút với đủ bộ chiêu; đủ 30 giây là tính đã thử. Thử đủ cả ba nhánh rồi mới chọn được 1 (vĩnh viễn). Người trao nhánh: Chiến binh, Đại Sư Ironjaw (Barkridge); Cung thủ, Đại Sư Fenna (Meowmont); Pháp sư và Sát thủ, Sứ giả Bracken và Inkling ở Hội Chợ Quả Sồi. Nhánh cho vũ khí riêng, đặc tính luôn bật, 4 kỹ năng (Z B H Y ở Lv 10/12/14/16) và 2 nội tại (Lv 11/15).</li>\n<li><b>Sách Kỹ Năng (O):</b> mỗi kỹ năng là một trang. Từ Lv2, mỗi cấp cho 2 điểm để nâng trang.");

// Generated from data (tools/guide_export.gd in the online tree; reported to the Dev team to fix at the source):
// the "Xuất hiện" line of every boss card and the Guardian line of every Heartwood floor card.
let cards = 0;
h = h.replace(/<article class="entry boss[^>]*id="b-([^"]+)"[\s\S]*?<\/article>/g, (art, id) => {
  return art.replace(/(<b>Xuất hiện:<\/b> )([^<]*)/, (m, pre, line) => {
    const dog = id.startsWith("enemy-dog-boss"), hunt = id.startsWith("enemy-hunt");
    const guardian = line.includes("Phong Ấn Nhựa") && line.includes("hồi sinh mỗi sáng");
    let s = line
      .replace(/cần mở khóa trước \(hunt\.[^)]*\)/, "mở bằng chuỗi nhiệm vụ ẩn của bãi săn")
      .replace(/cần mở khóa trước \([^)]*\)/, "cần mở khóa trước")
      .replace(/, quay lại sau \d+ ngày/, "");
    if (dog) s = s.replace("hạ nó để mở Phong Ấn Nhựa lên tầng tiếp", "hạ nó để mở tầng dưới của Giếng Sâu");
    if (guardian) s = s.replace("hồi sinh mỗi sáng", "có mặt mỗi lần vào phòng; lần hạ đầu mỗi ngày lịch mới có đồ");
    else if (hunt) s = s.replace(/hồi sinh (mỗi sáng|sau \d+ ngày)/, "boss chung, dậy lại 3 giờ thật sau khi bạn hạ");
    else s = s.replace(/hồi sinh sau (\d+) ngày/, "trở lại sau $1 ngày lịch").replace("hồi sinh mỗi sáng", "trở lại sau 1 ngày lịch");
    cards++;
    return pre + s;
  });
});
const floorLines = (h.match(/ · hồi sinh sau 3 ngày · /g) || []).length;
h = h.replace(/ · hồi sinh sau 3 ngày · /g, " · có mặt mỗi lần vào phòng · ");
h = require("./boss_rules").fix(h);
h = require("./ra_rules").fix(h);
console.log(`M51: ${fixed} text fixes, ${cards} boss cards, ${floorLines} floor Guardian lines`);

// --- M55: NV4's story check against the canon (docs/handoff/INBOX/NV7.md) -------------------------------------
let m55 = 0;
const r55 = (a, b, all) => { if (!h.includes(a)) { console.warn("M55: not found:", a.slice(0, 60)); return; } h = all ? h.split(a).join(b) : h.replace(a, b); m55++; };
{ const i = h.indexOf("Đoạn mở đầu sau khi tạo nhân vật"); if (i > 0) { const p0 = h.lastIndexOf("<p>", i), p1 = h.indexOf("</p>", i) + 4;
  h = h.slice(0, p0) + "<p>Lần đầu mở game, phim mở đầu (khoảng một phút rưỡi, có nhạc) kể chuyện xa hơn nữa: ngôi sao rơi xuống thành Cây Cổ Thụ, năm món quà của Cây, Lumir sa vào bóng tối thành Dạ Tôn Vaelthorn, Năm Người Lập Nghề, Ngũ Dạ Tướng và Trận Thượng Đỉnh bốn mươi năm trước. Xem lại ở menu chính: <b>Xem phim mở đầu</b>.</p>" + h.slice(p1); m55++; } else console.warn("M55: no opening sentence"); }
{ const i = h.indexOf("<p>Mười năm trước, <b>Rosalind</b>"); if (i > 0) { const j = h.indexOf("</p>", i) + 4;
  h = h.slice(0, j) + "\n  <p>Nếu chọn <b>Xứ Chó</b>, bạn bắt đầu trên sườn đồi Barkridge. Bốn mươi năm nay Giếng Sâu bị một chiếc nắp sắt bịt kín, ai cũng bảo là để cứu thị trấn, và một chiếc chìa khóa giếng cũ sắp tìm tới tay bạn.</p>" + h.slice(j); m55++; } }
r55("Sổ tay (N) → thẻ Ký ức", "Cẩm Nang (N) → thẻ Ký ức");
r55("người học việc <b>Thistle</b> bị biến thành Sứ Giả Hư Không, vàng của Hư Không", "người học việc của Rosalind, vàng từ bên dưới");
r55("Sổ tay (Ký ức", "Cẩm Nang (Ký ức");
r55("Chiến đấu Lv", "Lv", true);
r55("cấp Chiến đấu tối thiểu", "cấp nhân vật tối thiểu");
r55("Chiến binh, Đại Sư Ironjaw (Barkridge); Cung thủ, Đại Sư Fenna (Meowmont)", "Chiến binh, Trung sĩ Ironjaw (Barkridge); Cung thủ, Sư phụ Fenna (Meowmont)");
// "only for the cat-born": by the quest's own realm (origin is a realm, not a species)
h = h.replace(/<article class="entry quest[^>]*id="q-quest-([^"]+)"[\s\S]*?<\/article>/g, (art, id) =>
  art.split("chỉ cho mèo sinh ra ở Xứ Mèo").join(id.startsWith("dog") ? "chỉ cho người quê Chó" : "chỉ cho người quê Mèo"));
// timeline: the Day column (always 1 online) becomes a Realm column
h = h.replace(/(<table class="timeline"><thead><tr><th>✓<\/th>)<th>Ngày<\/th>/, "$1<th>Xứ</th>");
h = h.replace(/(<table class="timeline">[\s\S]*?<\/table>)/, t => t.replace(/<tr><td>(<input[^>]*data-track="q-quest-([a-z]+)[^"]*"[^>]*>)<\/td><td>[^<]*<\/td>/g, (m, inp, realm) =>
  `<tr><td>${inp}</td><td>${realm === "dog" ? "Chó" : realm === "cat" ? "Mèo" : "-"}</td>`).split("chỉ cho mèo sinh ra ở Xứ Mèo").join("chỉ cho người cùng quê"));
// --- Cốt truyện, phần mở đầu (2026-10-12): ba đoạn đầu đã sửa ở gốc cam_nang_book.html (M74c). Ở đây chỉ còn hai đoạn
// chỉ có trên bản online (Xứ Chó, phim mở đầu kèm câu Vaelthorn/Hư Không của NV4, câu lộ truyện để trong phần gấp). Lý do cũ:
// ai cũng thấy các câu ở Đá Đồng Cỏ ("a cat and a dog held one lantern between their paws"), rương "inside Rose Cottage",
// "the Rootway flooded the deep mines, the dogs blamed the flower", Khế Ước Đầu Tiên của vua mộ có trước Khế Ước Đèn Lồng,
// phim mở đầu: Trận Thượng Đỉnh rồi Đại Rạn Nứt.
let story = 0;
const block = (start, end, html) => { // thay từ chỗ bắt đầu bằng `start` tới hết `end` đầu tiên sau đó
  const i = h.indexOf(start); if (i < 0) { console.warn("story: not found:", start.slice(0, 50)); return; }
  const j = h.indexOf(end, i) + end.length; h = h.slice(0, i) + html + h.slice(j); story++;
};
block("<p>Nếu chọn <b>Xứ Chó</b>", "</p>",
`<p>Nếu chọn <b>Xứ Chó</b>, bạn bắt đầu ở Barkridge trên sườn núi. Đã bốn mươi năm Giếng Sâu bị bịt bằng một chiếc nắp sắt, ai cũng bảo làm vậy để cứu thị trấn. Rồi một chiếc chìa khóa giếng cũ tìm đến tay bạn.</p>`);
block("<p>Lần đầu mở game, phim mở đầu", "</p>",
`<p>Lần đầu vào game, phim mở đầu (khoảng một phút rưỡi, có nhạc) kể chuyện từ xa xưa hơn: ngôi sao rơi xuống thung lũng và mọc thành Cây Cổ Thụ, năm món quà của Cây, Lumir sa vào bóng tối và trở thành Dạ Tôn Vaelthorn, Năm Người Lập Nghề, Ngũ Dạ Tướng, rồi Trận Thượng Đỉnh và Đại Rạn Nứt bốn mươi năm trước. Xem lại ở menu chính: <b>Xem phim mở đầu</b>.</p>
  <p>Hư Không là bóng tối dưới lòng đất mà bạn gặp ở Xứ Mèo; phim mở đầu cho thấy kẻ đứng sau nó: Dạ Tôn Vaelthorn.</p>
  <details class="spoil"><summary>Hiện (lộ truyện)</summary><p>Hư Không là chiếc rễ cái của Cây Cổ Thụ, chiếc rễ đã trói Vaelthorn (Lumir sa ngã) dưới đáy Vực; hắn đầu độc nó, nên nó vừa là nhà tù vừa là tay chân của hắn.</p></details>`);
console.log(`story: ${story}/2 paragraphs rewritten`);

const SPOIL = s => `<details class="spoil"><summary>Hiện (lộ truyện)</summary>${s}</details>`;
let folded = 0;
h = h.replace(/<div class="mlines">[\s\S]*?<\/div>/g, m => { folded++; return SPOIL(m); });
h = h.replace(/<ul class="phases">[\s\S]*?<\/ul>/g, m => { folded++; return SPOIL(m); });
h = h.replace(/<article class="entry quest[\s\S]*?<\/article>/g, art => {
  const ch = art.match(/<span class="chap">Chương (\d+)/);
  if (!art.includes("b-story") || !ch || +ch[1] < 3) return art;
  return art.replace(/<div class="qdesc">[\s\S]*?<\/div>/, m => { folded++; return SPOIL(m); });
});
h = h.replace(/(<article class="entry item[^>]*id="it-item-(?:story|quest)-[^"]*"[\s\S]*?<div class="iname">[^<]*<\/div>)([\s\S]*?)(<\/div><\/div><\/article>)/g, (m, a, body, z) => { folded++; return a + SPOIL(body) + z; });
console.log(`M55: ${m55} text fixes, ${folded} spoilers folded`);

// M55 item 11: two names still wrong in the game's translations until 0.4.1 (NV2 fixes the source).
{ const a = (h.match(/Lão Wick/g) || []).length, b = (h.match(/Archivist Ledger/g) || []).length;
  h = h.split("Lão Wick").join("Bà Wick").split("Thủ thư Archivist Ledger").join("Thủ thư Ledger").split("Archivist Ledger").join("Thủ thư Ledger");
  console.log(`names: Lão Wick ${a}, Archivist Ledger ${b} replaced`); }

// Search must not read folded story text (its snippets would give it away).
r55('n.parentElement.closest(".tick")', 'n.parentElement.closest(".tick, .spoil")');

// --- M53: a realm filter (Tất cả / Xứ Mèo / Xứ Chó) on top of the book's own search and chapter filters --------
let tagged = { cat: 0, dog: 0 };
h = h.replace(/<article class="entry([^"]*)"([^>]*?) id="([^"]+)"/g, (m, cls, rest, id) => {
  const r = /dog/.test(id) ? "dog" : (/(^|-)cat(-|$)|cat_|(^|-)hw-|heartwood|enemy-boss-|enemy-hunt-(old|mistmother|hollow|rustbone|raider|crackmarch)/.test(id) ? "cat" : "");
  if (!r) return m;
  tagged[r]++;
  return `<article class="entry${cls}"${rest} id="${id}" data-realm="${r}"`;
});
const REALM_UI = `<div class="realmbar" id="realmbar" role="group" aria-label="Lọc theo xứ"><span>Xứ:</span>
<button type="button" data-r="" aria-pressed="true">Tất cả</button><button type="button" data-r="cat" aria-pressed="false">Xứ Mèo</button><button type="button" data-r="dog" aria-pressed="false">Xứ Chó</button></div>`;
const REALM_CSS = `<style>
.realmbar { display: flex; align-items: center; gap: 6px; margin-top: 10px; font: .78rem var(--f-pixel); color: var(--ink-soft); flex-wrap: wrap; }
.realmbar button { padding: 4px 10px; }
.entry.realm-off { display: none !important; }
.spoil { margin: 4px 0; }
.spoil > summary { cursor: pointer; display: inline-block; font: .74rem var(--f-pixel); color: var(--seal); padding: 2px 8px; box-shadow: 0 0 0 1.5px var(--seal); margin: 2px 0; }
.spoil[open] > summary { color: var(--ink-faint); box-shadow: 0 0 0 1.5px var(--line); }
</style>`;
const REALM_JS = `<script>
(() => {
  const KEY = "bonnievale.camnang.realm"; let r = "";
  try { r = localStorage.getItem(KEY) || ""; } catch (e) {}
  const bar = document.getElementById("realmbar");
  function apply() {
    document.querySelectorAll(".entry[data-realm]").forEach(el => el.classList.toggle("realm-off", !!r && el.dataset.realm !== r));
    bar.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.r === r)));
    try { localStorage.setItem(KEY, r); } catch (e) {}
  }
  bar.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { r = b.dataset.r; apply(); } });
  // a search result or a link always shows its target, whatever the realm filter
  document.addEventListener("click", e => {
    const t = e.target.closest('a[href^="#"], .res'); if (!t || !r) return;
    setTimeout(() => { const el = document.getElementById(location.hash.slice(1)); if (el && el.classList.contains("realm-off")) { r = ""; apply(); el.scrollIntoView({ block: "start" }); } }, 60);
  }, true);
  apply();
})();
</script>`;
h = h.replace('<div class="kinds" id="kinds"', REALM_UI + '\n    <div class="kinds" id="kinds"');
h = h.replace("</head>", REALM_CSS + "\n</head>");
h = h.replace(/<\/body>\s*<\/html>\s*$/, REALM_JS + "\n</body>\n</html>\n");
console.log(`M53: realm tags cat ${tagged.cat}, dog ${tagged.dog}; realm bar ${h.includes('id="realmbar"') ? "in" : "MISSING"}`);

const out = path.join(__dirname, "..", "cam-nang.html");
fs.writeFileSync(out, h);
const left = (h.match(/<article class="entry/g) || []).length;
console.log(`book: dropped ${dropped}/${DROP.length} old articles, ${left} entries, ${Math.round(h.length / 1024)} KB -> ${out}`);
