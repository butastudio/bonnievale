# NV7 (Web và Cẩm Nang) - trạng thái, đọc trước tiên sau khi nén ngữ cảnh

**Sau compact: đọc STATE → INBOX/NV7.md. Chủ game đã gõ "đồng ý" (19-10) cho R3-07, nhưng CHƯA đẩy: chờ A10 (máy chủ deploy) + Release v0.4.1. Tin 0.4.1 trong config.js xong nội dung (10 sửa/16 đổi/5 đang sửa; commit 5662302 + 18546e2), date còn "ngày phát bản": đặt ngày thật lúc đẩy, rồi kiểm Pages build. R3-03: tools/release/latest_0.4.1.json (d18c94d, sha/cỡ khớp zip, chưa tải lên). KẾ: bước 1 A10 = tải Release v0.4.1 (zip + latest.json đổi tên) CHỈ khi Leader báo chạy lại VÀ chủ game tự gõ "đồng ý phát bản 0.4.1" trong phiên NV7; lệnh soạn sẵn trong INBOX/leader.md. Còn: W2, W3, W9. Local chưa đẩy: eceff84, 5662302, 5cc8829, d18c94d, 18546e2 và commit STATE này.** [19-10 chiều] R3-04 xong cục bộ (0cd6fd3: bỏ câu nên lưu game; W2 phần này đóng). R9-74b (hướng dẫn dịch vụ thư, docs/handoff/dev/HUONG_DAN_DICH_VU_THU.md): CHƯA BẮT ĐẦU, tệp chưa tồn tại, chưa tra trang nào, chưa có số liệu. Làm lại từ đầu: so 2-3 dịch vụ trên trang chính thức (ghi link + ngày xem), các bước DNS SPF/DKIM, tên biến .env để chủ game tự đặt; không tạo tài khoản, không đụng DNS. Zip 0.4.1 cũ không phát, chờ zip mới (R1-06) rồi thay latest_0.4.1.json. 19-10 20:18: đã push dddeb52, Pages built; web = 0.4.1 (tin, Cẩm Nang bf95cda08/20c4e4289, nút tải v0.4.1). R3-09 (ghi chú 0.4.1 chia mục, commit cục bộ, CHƯA push) TẠM DỪNG: Leader hiểu nhầm (chủ game nói bản tin Discord), chờ Leader hỏi chủ game có làm lại mục web không.

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
- 2026-10-12: đẩy khung xem lớn (50d3765).

- 2026-10-12: chủ game "đồng ý" → đẩy bản sửa Cốt truyện (c06f80d), không chờ 0.4.0.

## Đã push (tiếp)
- 2026-10-12: chủ game "đồng ý" → đẩy M74c câu Vaelthorn/Hư Không (722d4e4), trang thật OK. Không còn commit đang giữ.

## Đang chờ
- Dựng Cẩm Nang từ cây online đang hỏng (font raw mất, 541 icon vật phẩm mất): đừng dựng lại tới khi Dev báo sửa; nếu cần sửa chữ, vá thẳng cam-nang.html cũ.
- Chờ NV4 (M74) trả lời 5 chỗ lệch truyện trong dữ liệu game; Leader sẽ chuyển lại.

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

## Phát 0.4.0 - XONG (2026-10-12)
- Chủ game "đồng ý phát bản 0.4.0" → release v0.4.0 (zip 207.952.403 byte, sha256 e51d4d51…2036), config.js bật nút Tải + ghi chú phiên bản (aac6766). Tải về thật từ Releases: sha256 khớp. Trang thật: nút "Tải bản tester" trỏ đúng link.

## Cẩm Nang 10-14
- Đã push 84f7ad2: boss hang/săn ngủ 3 giờ thật CẢ KÊNH (tools/boss_rules.js), RA_CAM_NANG đợt 1 (tools/ra_rules.js). Cả hai chạy trong clean_book.js và chạy thẳng được trên cam-nang.html. Tiếp: đợt 2 của NV11 khi có.

## Phát 0.4.0.1 - XONG (2026-10-14)
- v0.4.0.1 Latest, zip 207.980.914 byte sha256 98b878b4…bb56, tải về khớp; config.js e60189c.

## 0.4.1 M101 (15-10)
- Phần A XONG: danh sách W1-W11 ở INBOX/LEADER.md. So tự động 50 boss SO_BOSS ↔ web: máu/XP/xu khớp.
- Phần B (chờ Leader): W2 bỏ câu lưu-vào-hang (sau 55), W3 Drill Queen drops, W4 vật liệu nhóm + Chiến Thắng Đầu Tiên, W5 nhãn loại boss (tools/boss_kinds.js), W6 ẩn Trial Dummy Elite, W8 bỏ "Từ ngày N", W9 thử dựng lại, W10 bài Hội Chợ.
