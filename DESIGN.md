# DESIGN — Hệ thống thiết kế "Làm Cha Mẹ" • Duy Anh Lab

> **DESIGN.md** mô tả *sản phẩm trông như thế nào*: logo, màu sắc, font chữ, bố cục, thành phần giao diện. Giúp mọi trang mới (và mọi lần nhờ AI chỉnh sửa) giữ đúng phong cách thương hiệu, không bị "mỗi trang một kiểu".

## 1. Logo
- File: `public/brand/logo.jpg` (1280×506) — biểu tượng chữ **D** cách điệu kiểu mạch điện + chữ **DUYANH LAB • digital**, màu vàng champagne trên nền xanh navy.
- Thương hiệu hư cấu → logo được tạo trước, dùng thống nhất ở: Navbar, Footer, trang Về Chúng Tôi, favicon, ảnh chia sẻ mạng xã hội (`og:image`).
- Logo riêng của từng app: `public/apps/<slug>/app-logo.png`.

## 2. Màu sắc
| Vai trò | Mã màu | Dùng cho |
|---|---|---|
| Nền chính | `#07111E` | Body |
| Nền phụ / thẻ | `#0A192F`, `#0B1A2F`, `#0E223D` | Card, form, hover |
| Nền footer | `#050B14` | Footer |
| Nhấn chính (vàng) | `amber-400` `#FBBF24` → `yellow-500` | Nút CTA (gradient), tiêu đề nhấn, icon |
| Vàng kim loại | `#D4AF37` | Viền, điểm nhấn thương hiệu |
| Chữ | `slate-100` / `slate-300` / `slate-400` | Tiêu đề / nội dung / chú thích |
| Trạng thái | `emerald` (thành công), `rose` (lỗi), `sky` (đang xử lý) | Thông báo, badge admin |

Mỗi app có bộ màu riêng (`theme` trong dữ liệu) để phân biệt 4 giai đoạn.

## 3. Typography
- **Plus Jakarta Sans** (300–900): toàn bộ nội dung; tiêu đề dùng `font-black`, `tracking-tight`.
- **JetBrains Mono**: nhãn nhỏ, badge, số liệu ("GIAI ĐOẠN 1", "App 2").
- Tải từ Google Fonts trong `index.html`.

## 4. Bố cục
- Khung nội dung `max-w-7xl`, lề `px-4 sm:px-6 lg:px-8`; các section cách nhau `py-14`–`py-24`, phân tách bằng viền `border-slate-800`.
- Navbar cố định trên cùng (nền mờ khi cuộn); trang con có `pt-24` để không bị che.
- Lưới responsive: 1 cột (mobile) → 2 cột (tablet) → 4 cột (desktop).

## 5. Thành phần (Components)
| Thành phần | File | Ghi chú |
|---|---|---|
| Layout chung | `src/components/Layout.tsx` | Navbar + nội dung trang + Footer + các modal |
| Navbar | `Navbar.tsx` | Link trang, trạng thái active màu vàng, menu mobile |
| Footer | `Footer.tsx` | Link nhanh, Google Map, badge nguồn dữ liệu |
| Thẻ chi tiết app | `AppDetailCard.tsx` | Dùng ở trang `/app/:slug` |
| Form tư vấn | `ContactDrawer.tsx` | Ngăn kéo trượt từ phải, lưu Supabase |
| Video tour / Ảnh / PWA | `VideoTourModal.tsx`, `ScreenshotGalleryModal.tsx`, `PwaGuideModal.tsx` | Modal toàn màn hình |

**Nút:** CTA chính = gradient vàng chữ đen đậm, bo `rounded-xl`; nút phụ = nền navy viền vàng mờ.
**Thẻ:** `rounded-2xl`, viền `slate-700/800`, hover viền `amber-400`.

## 6. Giọng văn
Ấm áp, thấu hiểu nỗi lo của cha mẹ; mở đầu bằng câu hỏi "trăn trở" rồi đưa giải pháp. Tránh thuật ngữ khó; nếu dùng (PWA, NVC) thì giải thích ngắn.
