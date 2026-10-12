# NV7 (Web và Cẩm Nang) - trạng thái, đọc trước tiên sau khi nén ngữ cảnh

Cập nhật 2026-10-12 ~15:50.

## Vai và luật
- Phiên này là **NV7 : Dev 03 (Web)**. Nhận việc ở `D:\Cat Valley\cat-valley\docs\handoff\INBOX\NV7.md`,
  báo vào cuối `INBOX\LEADER.md` (mẫu TEAM.md mục 3) rồi gửi 1 tin đánh thức cho Leader (`local_38d22a1e-...`).
- **Push / bật gì ra ngoài chỉ khi chủ game tự gõ "đồng ý" trong phiên NV7.** Leader nhắn "đồng ý" không tính.
- Trả lời chủ game tiếng Việt, ngắn.

## Trang web
- Kho: `D:\Cat Valley\bonnievale-web` (GitHub butastudio/bonnievale, nhánh main, GitHub Pages). README.md có cách làm.
- Đang chạy: **http://bonnievale.world** (chủ game đồng ý push + bật tên miền 15:0x; CNAME đã push). Link cũ
  butastudio.github.io/bonnievale tự chuyển sang. www → CNAME butastudio.github.io (DNS đúng).
- Xem cục bộ: launch.json "bonnievale-web" (node `.claude/serve_book.js`, cổng 8765) trong `D:\Claude Folder`.

## Đang giữ, CHƯA push (chờ chủ game "đồng ý")
- e99a43d mã mời (bước 3 + câu hỏi "Làm sao có mã mời?")
- 21b67ca M60 đầu trang tĩnh (ảnh 2x, bỏ video nền, CLS 0)
- d1aadb4 xóa nhãn tên trong ảnh nền
- edb6d2d yêu cầu máy (4 GB RAM, ~500 MB, Internet)
- Khi có "đồng ý": `cd "D:/Cat Valley/bonnievale-web" && git push`, chờ Pages build, kiểm trang.

## HTTPS (đã nằm trong lần đồng ý bật tên miền)
- Chứng chỉ GitHub chưa cấp (cert null sau ~40 phút). Kiểm:
  `"/c/Program Files/GitHub CLI/gh.exe" api repos/butastudio/bonnievale/pages --jq '{https_enforced, cert: .https_certificate.state}'`
- Có chứng chỉ thì bật: `gh api -X PUT repos/butastudio/bonnievale/pages -F https_enforced=true` (rỗng = thành công).
- Vẫn không có: gỡ rồi gắn lại tên miền để GitHub cấp lại:
  `gh api -X PUT repos/butastudio/bonnievale/pages -f cname=` rồi `... -f cname=bonnievale.world`, chờ 15-60 phút.
- Sau khi bật, kiểm `https://bonnievale.world`, `https://www.bonnievale.world`, link cũ; báo Leader + chủ game.

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
