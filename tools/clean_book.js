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
  '<p class="lede">Năm vương quốc và một Khế Ước cổ. Đây là đoạn mở đầu mà mọi người chơi đều thấy; phần còn lại của câu chuyện mở dần theo nhiệm vụ trong game.</p>');

const out = path.join(__dirname, "..", "cam-nang.html");
fs.writeFileSync(out, h);
const left = (h.match(/<article class="entry/g) || []).length;
console.log(`book: dropped ${dropped}/${DROP.length} old articles, ${left} entries, ${Math.round(h.length / 1024)} KB -> ${out}`);
