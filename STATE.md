# NV7 (Web và Cẩm Nang) - trạng thái, đọc trước tiên sau khi nén ngữ cảnh

Cập nhật 2026-10-12 ~15:50.

## Vai và luật
- Phiên này là **NV7 : Dev 03 (Web)**. Nhận việc ở `D:\Cat Valley\cat-valley\docs\handoff\INBOX\NV7.md`,
  báo vào cuối `INBOX\LEADER.md` (mẫu TEAM.md mục 3) rồi gửi 1 tin đánh thức cho Leader (`local_38d22a1e-...`).
- **Push / bật gì ra ngoài chỉ khi chủ game tự gõ "đồng ý" trong phiên NV7.** Leader nhắn "đồng ý" không tính.
- Trả lời chủ game tiếng Việt, ngắn.

## Trang web
- Kho: `D:\Cat Valley\bonnievale-web` (GitHub butastudio/bonnievale, nhánh main, GitHub Pages). README.md có cách làm.
- Đang chạy: **https://bonnievale.world** (HTTPS bật, chứng chỉ duyệt sau khi gắn lại tên miền ~16:00) (chủ game đồng ý push + bật tên miền 15:0x; CNAME đã push). Link cũ
  butastudio.github.io/bonnievale tự chuyển sang. www → CNAME butastudio.github.io (DNS đúng).
- Xem cục bộ: launch.json "bonnievale-web" (node `.claude/serve_book.js`, cổng 8765) trong `D:\Claude Folder`.

## Đã push
- 2026-10-12: chủ game "đồng ý" → đẩy mã mời, M60 đầu trang tĩnh, xóa nhãn ảnh nền, yêu cầu máy (01038aa, Pages built, trang kiểm OK).
- Không còn commit nào đang giữ.

## HTTPS
- XONG: Enforce HTTPS bật; https gốc, www, http và link cũ đều về https://bonnievale.world.

## Cẩm Nang
- Dựng: trong `D:\Cat Valley\bonnievale-online`: `godot --headless --audio-driver Dummy --path . res://tools/GuideBook.tscn`,
  chuyển `docs/guide/out/Bonnievale_CamNang_Sach.html` ra `D:\Claude Folder\Bonnievale_CamNang_Sach_online.html` (không để trong cây game),
  rồi ở kho web: `node tools/clean_book.js "/d/Claude Folder/Bonnievale_CamNang_Sach_online.html"`.
- clean_book.js gồm: gỡ đoạn offline cũ, trang "Chơi online", M51 (19 câu luật online), M55 (canon, gấp 167 chỗ lộ truyện,
  ô tìm bỏ qua phần gấp), lọc tên Bà Wick / Thủ thư Ledger (tới khi 0.4.1 sửa gốc), bộ lọc xứ Mèo/Chó.

## Video và ảnh
- 7 clip của NV2 ở `video/` (từ `D:\Claude Folder\Bonnievale_AnhLamViec\m53_clips\*.avi`, cắt 12 s, 640x360 → 2x, < 3 MB).
- Hình trang trí NV3 ở `assets/art/` (x1 và x3). Ảnh chụp ở `img/shots/`, icon ở `img/icons/`.
- Email liên hệ friendsbuta@gmail.com (QD-P05), Discord https://discord.gg/7A4B6aYnDU.
