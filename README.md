# TRỌN BỘ 4 ỨNG DỤNG ĐỒNG HÀNH LÀM CHA MẸ (0–18 TUỔI)
## Landing Page Giới Thiệu Chuyên Sâu • Duy Anh Digital Lab

Trang Landing Page độc lập giới thiệu chuyên sâu trọn bộ 4 ứng dụng Web PWA trong chuỗi **"Làm Cha Mẹ" (0–18 Tuổi)** được phát triển bởi **Duy Anh Digital Lab**.

---

### 🌐 4 ỨNG DỤNG TRONG HỆ SINH THÁI:
1. **Giai đoạn 1 (0 – 5 Tuổi / 0–60 Tháng):** [Nuôi Dưỡng Bé 0–60 Tháng](https://lamchame1.vercel.app/)
   - *Khởi đầu vàng & Sơ cứu SOS ngoại tuyến 100%*
   - Chuẩn tăng trưởng WHO, gợi ý ăn dặm từ tủ lạnh, lịch tiêm chủng, ví giấy tờ PDF.
2. **Giai đoạn 2 (6 – 11 Tuổi / Lớp 1 Đến Lớp 5):** [Nuôi Dạy Con 6 Đến 11 Tuổi](https://lamchame2.vercel.app/)
   - *Vững bước Tiểu học & Kịch bản giao tiếp Parenting Scripts*
   - Xóa bỏ chiến trường bàn học, đồ thị truy vết kiến thức nền tảng, hồ sơ con không KPI điểm số, nút hạ nhiệt SOS 60 giây.
3. **Giai đoạn 3 (12 – 15 Tuổi / Lớp 6 Đến Lớp 9):** [Thấu Hiểu Thiếu Niên 12 Đến 15 Tuổi](https://lamchame3.vercel.app/)
   - *Vượt bão dậy thì & Tấm khiên an toàn số chống Grooming*
   - Thang Tanner bứt phá chiều cao, bộ sơ cứu cảm xúc NVC 4 bước, hotline 111, nhận thức pháp lý tuổi 14, trắc nghiệm Holland RIASEC 9+.
4. **Giai đoạn 4 (16 – 18 Tuổi / Lớp 10 Đến Lớp 12):** [Định Hướng Thanh Niên 16 Đến 18 Tuổi](https://lamchame4.vercel.app/)
   - *Trưởng thành vững vàng & La bàn 3 kịch bản tương lai*
   - Bản đồ tuyển sinh GDPT 2018, la bàn Ikigai chọn nghề thời AI, kịch bản giao tiếp GROW, hành trang pháp lý công dân tuổi 18.

---

### 🚀 TÍNH NĂNG NỔI BẬT CỦA TRANG LANDING PAGE:
- **Phong cách thiết kế:** Tông màu sang trọng Deep Navy (`#07111E`, `#0A192F`, `#0E223D`) phối kim loại ánh vàng (`#D4AF37`), gradient tinh tế tương đồng với trang trung tâm `ungdung.vercel.app`.
- **Trình chiếu Video Tour có thuyết minh:** Tích hợp Audio Engine đồng bộ 11 cảnh trình diễn cho từng app, điều chỉnh tốc độ thuyết minh (1x, 1.25x, 1.5x), bật/tắt tiếng, nhảy cảnh nhanh.
- **Thư viện ảnh màn hình thực tế (Screenshot Gallery):** Tự động trình chiếu Slideshow 10 ảnh giao diện sắc nét cho từng app với thanh tiến trình và thanh chọn thumbnail.
- **Nội dung thu hút & Các câu Hook trăn trở:** Chạm trúng nỗi lo lắng sâu kín của cha mẹ Việt (bàn học thành chiến trường, con đóng cửa phòng, chọn sai ngành nghề, cấp cứu nửa đêm).
- **Hướng dẫn cài đặt PWA trong 10 giây:** Hướng dẫn chi tiết cho iPhone (Safari), Android (Chrome) và Máy tính bàn để ghim app ra màn hình dùng ngoại tuyến.
- **Bảng so sánh tổng thể (Comparison Matrix):** Đối chiếu chi tiết 4 giai đoạn theo từng tiêu chí khoa học.
- **Drawer liên hệ tư vấn:** Tích hợp kết nối trực tiếp Hotline/Zalo (+84 908095693) và Email (anhpob@gmail.com).
- **Footer thương hiệu chuẩn:** Đồng bộ thông tin bản quyền và triết lý *"MONG MUỐN → Ý TƯỞNG → HIỆN THỰC"* của Duy Anh Lab.

---

### 🗂️ CẤU TRÚC WEBSITE (React Router)
| Đường dẫn | Trang |
|---|---|
| `/` | Trang Chủ |
| `/ve-chung-toi` | Về Chúng Tôi (câu chuyện thương hiệu, Google Map) |
| `/app/:slug` | Chi tiết từng ứng dụng + đánh giá phụ huynh |
| `/admin` | Quản trị yêu cầu tư vấn & đánh giá |

```
src/
├── App.tsx              # Khai báo router
├── lib/supabase.ts      # Kết nối Supabase
├── lib/AppsContext.tsx  # Tải dữ liệu 4 app từ bảng apps
├── pages/               # HomePage, AboutPage, AppDetailPage, AdminPage
├── components/          # Layout, Navbar, Footer, modal...
└── data/appsData.ts     # Dữ liệu gốc (dùng để seed & dự phòng offline)
supabase/schema.sql      # Tạo bảng + RLS + dữ liệu mẫu
```

### 🗄️ DATABASE SUPABASE
1. Supabase → **SQL Editor** → dán toàn bộ `supabase/schema.sql` → **Run** (tạo 3 bảng `apps`, `consultations`, `reviews` + chính sách bảo mật + dữ liệu mẫu).
2. **Authentication → Users → Add user** để tạo tài khoản admin (đăng nhập tại `/admin`).
3. (Tuỳ chọn) đặt biến môi trường `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`; mặc định code dùng publishable key công khai của dự án.

| Chức năng | Thao tác |
|---|---|
| Gửi yêu cầu tư vấn | INSERT `consultations` |
| Viết đánh giá app | INSERT `reviews` |
| Admin đổi trạng thái yêu cầu | UPDATE `consultations` |
| Admin xóa yêu cầu / đánh giá | DELETE |

### 📄 TÀI LIỆU
- [`PRD.md`](PRD.md) — yêu cầu sản phẩm
- [`DESIGN.md`](DESIGN.md) — hệ thống thiết kế
- [`BAO_CAO.md`](BAO_CAO.md) — báo cáo đồ án

---

### 💻 CÁCH KHỞI CHẠY VÀ TRIỂN KHAI:

#### 1. Chạy thử nghiệm cục bộ (Local Development):
```bash
npm install
npm run dev
```
Trang web sẽ chạy tại `http://localhost:5173/`.

#### 2. Đóng gói bản Production:
```bash
npm run build
```
Thư mục `dist/` đã sẵn sàng tối ưu hóa 100%.

#### 3. Triển khai lên Vercel:
```bash
vercel --prod
```
