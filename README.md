# Bonnievale - trang web

Trang giới thiệu và tải game Bonnievale (bản thử nghiệm miễn phí). Trang tĩnh, không cần máy chủ:
mở `index.html` là chạy.

- `config.js` - phiên bản, **link tải**, email/Discord, tin tức. Sửa file này khi ra bản mới.
- `data.js`, `img/`, `video/`, `cam-nang.html` - tạo tự động từ game:
  trong `cat-valley` chạy `sh tools/guide_book.sh && sh tools/web_export.sh`.
- `index.html`, `site.css`, `site.js` - giao diện.

## Đăng lên mạng

- Trang: GitHub Pages từ nhánh `main` của https://github.com/butastudio/bonnievale -> https://butastudio.github.io/bonnievale/
  (đẩy commit mới lên `main` là trang tự cập nhật sau 1-2 phút).
- File game: GitHub Releases của cùng kho, mỗi bản một tag `vX.Y.Z`.

Ra bản mới (vd 0.3.2), từ thư mục này:
1. `gh release create v0.3.2 "../builds/Bonnievale_Tester_0.3.2.zip" --title "Bonnievale 0.3.2 - bản thử nghiệm" --notes "..." --latest`
2. Trong `config.js`: đổi `version`, `url` + `note` (dung lượng) của nút Windows, thêm một mục ở đầu `news`.
3. `git commit -am "Release 0.3.2" && git push`
