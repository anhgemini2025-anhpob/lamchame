import React from 'react';
import { Check, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';
import { LAMCHAME_APPS } from '../data/appsData';
import { openExternalApp } from '../utils/navigation';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="comparison" className="py-20 bg-[#07111E] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A192F] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BẢNG SO SÁNH TỔNG THỂ HỆ SINH THÁI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Năng Lực Chuyên Biệt Của Từng Ứng Dụng
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Mỗi giai đoạn phát triển đòi hỏi một cấu trúc tính năng và triết lý đồng hành khác biệt.
            Dưới đây là bức tranh so sánh chi tiết giúp bạn chọn đúng công cụ phù hợp với lứa tuổi của con.
          </p>
        </div>

        {/* Responsive Comparison Table Container */}
        <div className="rounded-2xl border border-amber-500/30 bg-[#0A192F] overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[750px]">
            
            {/* Table Header: 4 Apps */}
            <thead>
              <tr className="border-b border-slate-800 bg-[#081321]">
                <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold w-1/5">
                  Tiêu Chí So Sánh
                </th>
                {LAMCHAME_APPS.map((app) => (
                  <th key={app.id} className="p-4 sm:p-5 w-1/5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <img src={app.logoUrl} alt={app.name} className="w-6 h-6 object-contain rounded" />
                      <span className={`text-[10px] font-mono font-black uppercase px-1.5 py-0.2 rounded border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                        App {app.number}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">
                      {app.name}
                    </div>
                    <div className="text-[11px] text-amber-300 font-medium">
                      {app.ageRange}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
              
              {/* Row 1: Target Focus */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  Trọng tâm cốt lõi
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Chăm sóc, tăng trưởng WHO, ăn dặm &amp; sơ cứu SOS
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Thói quen học tập, gỡ lỗ hổng kiến thức, hạ nhiệt cơn giận
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Vượt bão dậy thì, an toàn mạng Grooming, phân luồng 9+
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Thi THPT GDPT 2018, Ikigai chọn nghề, hành trang tuổi 18
                </td>
              </tr>

              {/* Row 2: AI Assistance */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  Trợ lý AI chuyên biệt
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Tư vấn khoa học nhi &amp; chuẩn bị câu hỏi khám bệnh
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Kịch bản Parenting Scripts đối chiếu ❌ vs ✅
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Giả lập đối thoại AI tập nói chuyện trước với con
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Trợ lý 'Nói sao với con' &amp; La bàn 3 kịch bản tương lai
                </td>
              </tr>

              {/* Row 3: Physical & Health Tracking */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  Thể chất &amp; Dinh dưỡng
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Chuẩn WHO (Cân nặng, chiều cao, vòng đầu) + Tủ lạnh có gì
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Theo dõi chiều cao, cân nặng, giấc ngủ &amp; bữa sáng 15 phút
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Thang Tanner dậy thì, Canxi D3K2 bứt phá tầm vóc
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Giấc ngủ, dinh dưỡng mùa thi &amp; biểu đồ căng thẳng
                </td>
              </tr>

              {/* Row 4: Conflict Resolution & Emotional Aid */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  Giải tỏa cảm xúc &amp; Xung đột
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Cẩm nang quan sát 5 mốc nhẹ nhàng, giảm âu lo
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Zone hạ nhiệt SOS 60s (nhạc sóng Alpha + nhịp thở)
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Bộ sơ cứu cảm xúc &amp; Giao tiếp phi bạo lực NVC 4 bước
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Mô hình GROW đối thoại, tôn trọng ranh giới riêng tư
                </td>
              </tr>

              {/* Row 5: Safety & Legal Foundation */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  An toàn &amp; Pháp lý
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Nút SOS sơ cứu ngoại tuyến (hóc dị vật, sốt giật, bỏng)
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Thỏa thuận công nghệ gia đình tự nguyện
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Khiên an toàn số chống Grooming / Sextortion &amp; Hotline 111
                </td>
                <td className="p-4 sm:p-5 text-slate-300">
                  Hành trang pháp lý công dân tuổi 18 (VNeID, căn cước, tài chính)
                </td>
              </tr>

              {/* Row 6: Technology & Deployment */}
              <tr className="hover:bg-[#0E223D]/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-amber-300 bg-[#081321]/50">
                  Công nghệ vận hành
                </td>
                <td colSpan={4} className="p-4 sm:p-5 text-emerald-400 font-bold">
                  ✓ Progressive Web App (PWA) 100% Ngoại Tuyến • Bảo mật dữ liệu trên máy • Không cần cài đặt từ App Store • Tốc độ siêu tốc
                </td>
              </tr>

              {/* Row 7: Action Button */}
              <tr className="bg-[#081321]">
                <td className="p-4 sm:p-5 font-bold text-white bg-[#081321]/80">
                  Trải nghiệm ngay
                </td>
                {LAMCHAME_APPS.map((app) => (
                  <td key={app.id} className="p-4 sm:p-5">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => openExternalApp(app.url, e)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r ${app.theme.buttonGradient} hover:opacity-95 shadow-md cursor-pointer`}
                    >
                      <span>Vào App {app.number}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                    </a>
                  </td>
                ))}
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
};
