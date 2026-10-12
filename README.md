# Bonnievale Online - trang web

Trang giới thiệu và tải bản tester của Bonnievale Online. Trang tĩnh trên GitHub Pages
(kho butastudio/bonnievale, tên miền bonnievale.world - xem `TEN_MIEN.md`).

- `config.js` - bản tester (version, downloadUrl, downloadSize), `discordUrl`, `contactEmail`, ghi chú phiên bản. Sửa file này khi ra bản mới.
- `index.html` (trang chủ, giới thiệu, tải, ghi chú), `dieu-khoan.html`, `quyen-rieng-tu.html`, `site.css`, `site.js`.
- `cam-nang.html` - Cẩm Nang, tạo từ dữ liệu game của cây online:
  1. trong `bonnievale-online`: `godot --headless --audio-driver Dummy --path . res://tools/GuideBook.tscn`
     (ra `docs/guide/out/Bonnievale_CamNang_Sach.html`; chép tệp đó ra ngoài kho game rồi xóa khỏi cây online)
  2. ở đây: `node tools/clean_book.js <tệp vừa chép>` (gỡ các đoạn viết tay đã lỗi thời, thêm trang "Chơi online").
- `img/shots/` - ảnh chụp thật trong game, cỡ 1x. Không dùng hình Pipoya ngoài game.

## Ra bản tester mới (chỉ khi chủ game đồng ý ngay trong phiên Web)
1. `gh release create vX.Y.Z "<đường dẫn zip>" --title "Bonnievale Online X.Y.Z - bản tester" --notes "..." --latest`
2. `config.js`: version, released, downloadUrl (link tải của release), downloadSize, thêm một mục đầu `news`
   (mẫu VAN_HANH_TESTER mục 4: intro, fixed, changed, todo).
3. `git commit -am "Release X.Y.Z" && git push`
