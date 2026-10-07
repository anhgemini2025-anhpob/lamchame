# PRD — Website "Làm Cha Mẹ" • Duy Anh Lab

> **PRD (Product Requirements Document)** là tài liệu mô tả *sản phẩm cần làm gì*: mục tiêu, người dùng, các trang, chức năng và tiêu chí hoàn thành. Đây là "đầu bài" để AI/lập trình viên bám theo khi xây dựng, tránh làm sai hoặc thiếu.

## 1. Tổng quan
| Mục | Nội dung |
|---|---|
| Thương hiệu | **DUY ANH LAB • digital** (thương hiệu hư cấu, logo tự thiết kế: `public/brand/logo.jpg`) |
| Lĩnh vực | Giáo dục gia đình / công cụ số cho phụ huynh |
| Sản phẩm | Bộ 4 Web App PWA "Làm Cha Mẹ" đồng hành 0–18 tuổi |
| Website | https://lamchame.vercel.app |
| Mục tiêu | Giới thiệu 4 app, dẫn người dùng vào dùng thử, thu thập yêu cầu tư vấn và đánh giá |

## 2. Người dùng mục tiêu
- Cha mẹ có con 0–18 tuổi, dùng điện thoại là chính.
- Quản trị viên (Duy Anh Lab) xử lý yêu cầu tư vấn, kiểm duyệt đánh giá.

## 3. Sơ đồ trang
| Đường dẫn | Trang | Nội dung chính |
|---|---|---|
| `/` | **Trang Chủ** | Hero chọn giai đoạn, hành trình 4 cột mốc, thẻ dẫn sang 4 trang chi tiết, bảng so sánh, CTA |
| `/ve-chung-toi` | **Về Chúng Tôi** | Logo, câu chuyện thương hiệu, sứ mệnh/tầm nhìn, giá trị cốt lõi, danh sách sản phẩm, liên hệ + **Google Map** |
| `/app/:slug` | **Chi tiết sản phẩm** | 10 tính năng, ảnh giao diện, video tour, pain points, **đánh giá phụ huynh**, nút đăng ký tư vấn, app trước/sau |
| `/admin` | Quản trị | Đăng nhập; quản lý yêu cầu tư vấn & đánh giá |

Menu (Navbar) và Footer có mặt ở mọi trang, liên kết qua lại giữa tất cả các trang.

## 4. Dữ liệu (Supabase — PostgreSQL)
| Bảng | Mô tả | Quyền khách | Quyền admin |
|---|---|---|---|
| `apps` | 4 ứng dụng (cột chính + `data` JSONB chứa toàn bộ nội dung chi tiết) | Đọc | Toàn quyền |
| `consultations` | Yêu cầu tư vấn: họ tên, liên hệ, chủ đề, app, nội dung, trạng thái | Thêm | Xem / Sửa / Xóa |
| `reviews` | Đánh giá: app, tên, số sao 1–5, nội dung | Đọc / Thêm | Xóa |

Bảo mật bằng **Row Level Security**. Script tạo bảng + dữ liệu mẫu: `supabase/schema.sql`.

## 5. Chức năng
| # | Chức năng | Thao tác DB | Trang |
|---|---|---|---|
| F1 | Hiển thị 4 app từ database | SELECT `apps` | Trang Chủ, Chi tiết, Về Chúng Tôi |
| F2 | Gửi yêu cầu tư vấn | **INSERT** `consultations` | Mọi trang (nút "Tư Vấn & Trao Đổi") |
| F3 | Viết đánh giá app | **INSERT** `reviews` | Chi tiết |
| F4 | Đổi trạng thái yêu cầu (Mới → Đang xử lý → Đã liên hệ) | **UPDATE** `consultations` | Admin |
| F5 | Xóa yêu cầu tư vấn | **DELETE** `consultations` | Admin |
| F6 | Xóa đánh giá không phù hợp | **DELETE** `reviews` | Admin |
| F7 | Video tour có thuyết minh, thư viện ảnh, hướng dẫn cài PWA | — | Trang Chủ, Chi tiết |
| F8 | Nhúng Google Map văn phòng | — | Về Chúng Tôi, Footer |

## 6. Yêu cầu phi chức năng
- Responsive (điện thoại → desktop), tiếng Việt.
- Nếu Supabase lỗi mạng, site vẫn hiển thị nhờ dữ liệu dự phòng (badge ở footer báo nguồn dữ liệu).
- Không lưu khóa bí mật trong code; chỉ dùng *publishable key* + RLS.

## 7. Tiêu chí hoàn thành
- [x] ≥ 3 trang liên kết với nhau (Trang Chủ, Về Chúng Tôi, Chi tiết)
- [x] Dùng database Supabase
- [x] ≥ 2 chức năng chỉnh sửa DB (INSERT ×2, UPDATE, DELETE ×2)
- [x] Nhúng Google Map
- [x] Có file .md (README, PRD, DESIGN, BAO_CAO)
- [x] Code public trên GitHub, deploy trên Vercel
