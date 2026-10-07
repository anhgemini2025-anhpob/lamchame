import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Shield, Compass, BookOpen, Heart } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { useApps } from '../lib/AppsContext';

interface JourneyTimelineProps {
  onScrollToApp: (appId: string) => void;
  onOpenVideoTour: (app: AppItem) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  onScrollToApp,
  onOpenVideoTour
}) => {
  const LAMCHAME_APPS = useApps();
  return (
    <section id="journey" className="py-20 bg-[#07111E] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A192F] border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HÀNH TRÌNH 18 NĂM KHÔNG THỂ LÀM LẠI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            4 Cột Mốc Thay Đổi Tâm Lý &amp; Thể Chất Của Con
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Mỗi giai đoạn con lớn lên đòi hỏi một phương pháp và công cụ hoàn toàn khác biệt.
            Nếu 5 năm đầu là chăm sóc và bảo bọc, thì tiểu học là rèn thói quen, cấp 2 là thấu hiểu ranh giới, và cấp 3 là trao quyền tự lập.
          </p>
        </div>

        {/* Timeline Horizontal / Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {LAMCHAME_APPS.map((app, index) => (
            <div
              key={app.id}
              className="relative rounded-2xl bg-[#0A192F] border border-slate-800 p-5 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-black text-sm flex items-center justify-center">
                  0{app.number}
                </span>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                  {app.ageRange}
                </span>
              </div>

              {/* Title & Stage */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {app.stageName} • {app.educationStage}
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3">
                  "{app.emotionalQuote}"
                </p>
              </div>

              {/* Core Mission */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-slate-200">Trọng tâm giải quyết:</div>
                <div className="text-slate-400 line-clamp-2">
                  {app.painPoints[0]}
                </div>
              </div>

              {/* Bottom Quick Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onScrollToApp(app.id)}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenVideoTour(app)}
                  className="text-[11px] font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Tour {app.videoDuration}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Contrast: Old Way vs. Modern AI Way */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1A2F] via-[#0E223D] to-[#0A192F] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-xl sm:text-3xl font-black text-white">
              Sự Khác Biệt Khi Bạn Có Bộ Công Cụ Đúng Đắn
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tại sao hàng nghìn phụ huynh cảm thấy nhẹ nhõm và gắn kết hơn sau khi áp dụng hệ thống Làm Cha Mẹ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* The Old Painful Way */}
            <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-2.5 text-rose-400 font-extrabold text-base sm:text-lg">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Nỗi Khổ Khi Nuôi Dạy Cảm Tính &amp; Đơn Độc</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Hoang mang kiến thức:</strong> Mỗi trang mạng một kiểu, mất bình tĩnh khi con ốm sốt hay biến động tâm lý.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Bàn học thành chiến trường:</strong> Quát tháo, la mắng làm con sợ hãi học tập và tạo hố sâu ngăn cách.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Xâm phạm ranh giới tuổi dậy thì:</strong> Xem trộm tin nhắn vì lo sợ cạm bẫy mạng, khiến con đóng sập cửa phòng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Áp đặt tương lai:</strong> Bắt con chọn ngành theo định kiến cũ, đối mặt nguy cơ thất nghiệp trước làn sóng AI.</span>
                </li>
              </ul>
            </div>

            {/* The Modern Scientific Way */}
            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Khoa Học, Bình Tĩnh &amp; Gắn Kết Với Bộ 4 App</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Chuẩn WHO &amp; Sơ cứu SOS ngoại tuyến:</strong> Nắm chắc dữ liệu tăng trưởng, tự tin xử lý mọi trường hợp khẩn cấp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Kịch bản giao tiếp &amp; Nút SOS 60s:</strong> Đổi câu la mắng thành câu hỏi thấu hiểu, giữ bình tĩnh tuyệt đối.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Khiên an toàn số &amp; Giao tiếp NVC:</strong> Bảo vệ con trước bẫy Grooming bằng kiến thức pháp lý và niềm tin cởi mở.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>3 Kịch bản tương lai Ikigai:</strong> Cùng con hoạch định con đường đại học, nghề nghiệp vững vàng bước vào tuổi 18.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
