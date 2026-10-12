# Gắn tên miền bonnievale.world cho trang web (GitHub Pages)

Trang web vẫn chạy trên GitHub Pages của kho `butastudio/bonnievale` (miễn phí, HTTPS tự động).
Máy chủ game `play.bonnievale.world` là chuyện riêng: **không sửa bản ghi `play`**.

## Bước 1. Chủ game thêm bản ghi DNS ở Mắt Bão (quản lý DNS của bonnievale.world)

| Loại | Tên (Host) | Giá trị | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `butastudio.github.io` | 3600 |

Không bắt buộc (cho mạng IPv6), thêm nếu Mắt Bão cho:

| AAAA | `@` | `2606:50c0:8000::153` |
|---|---|---|
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

- Nếu ở `@` đang có bản ghi A hay CNAME khác (trang đỗ mặc định của Mắt Bão), xóa bản đó đi, chỉ giữ 4 dòng A ở trên.
- Không đụng `play`, `MX` hay bản ghi email nào.

## Bước 2. (Nên làm) Xác minh tên miền với GitHub, chống người khác chiếm

GitHub → ảnh đại diện → Settings → Pages → **Add a verified domain** → nhập `bonnievale.world`. GitHub đưa một
bản ghi TXT dạng `_github-pages-challenge-butastudio` = `<mã>`; thêm đúng bản ghi đó ở Mắt Bão rồi bấm Verify.

## Bước 3. Web (NV7) bật tên miền, sau khi chủ game đồng ý

1. Thêm tệp `CNAME` (một dòng `bonnievale.world`) vào kho web, commit, push.
2. GitHub → kho `butastudio/bonnievale` → Settings → Pages → Custom domain = `bonnievale.world` → chờ kiểm DNS
   xanh → bật **Enforce HTTPS** (chứng chỉ có sau vài phút đến vài giờ).
3. Kiểm: `https://bonnievale.world`, `https://www.bonnievale.world` (tự chuyển về gốc), và link cũ
   `butastudio.github.io/bonnievale` tự chuyển sang tên miền mới.

DNS có thể mất từ vài phút tới 24 giờ để có hiệu lực.
