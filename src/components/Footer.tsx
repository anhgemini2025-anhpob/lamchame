import React from 'react';
import { ArrowUp, ExternalLink, Heart } from 'lucide-react';
import { LAMCHAME_APPS } from '../data/appsData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#050B14] border-t border-amber-500/20 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-md shadow-black/50">
              <img 
                src="/brand/logo.jpg" 
                alt="DUY ANH LAB • digital" 
                className="h-11 w-auto object-contain rounded"
              />
              <div className="border-l border-slate-700/60 pl-3.5">
                <div className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">Duy Anh Lab</div>
                <div className="text-xs text-slate-300 font-mono">Real-World Software Engineering</div>
              </div>
            </div>

            <p className="text-slate-300 max-w-md leading-relaxed text-sm">
              Chuyên thiết kế &amp; phát triển các ứng dụng Web chuyên sâu, giải pháp AI và phần mềm thực chiến phục vụ mọi ý tưởng: từ kinh doanh B2B, nghiên cứu R&amp;D, quản lý hộ kinh doanh đến giáo dục học tập, chăm sóc gia đình và đời sống.
            </p>

            <div className="text-xs text-amber-300/90 font-mono font-bold">
              "MONG MUỐN → Ý TƯỞNG → HIỆN THỰC"
            </div>
          </div>

          {/* Quick Links for 4 Apps */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-extrabold text-amber-300 text-base">Hệ Sinh Thái Làm Cha Mẹ</h4>
            <ul className="space-y-2.5 text-sm">
              {LAMCHAME_APPS.map((app) => (
                <li key={app.id}>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>App {app.number}: {app.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="https://ungdung.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Kho 20+ Web App Toàn Diện</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation & Support Information */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="font-extrabold text-amber-300 text-base">Tư Vấn &amp; Hiện Thực Hóa</h4>
            <p className="leading-relaxed text-slate-300 text-sm">
              Bạn có ý tưởng trong cuộc sống, giáo dục con cái, công việc hay kinh doanh cần hiện thực hóa thành ứng dụng Web riêng biệt? Đội ngũ kỹ thuật Duy Anh Lab luôn sẵn sàng đồng hành, tư vấn kiến trúc giải pháp và phát triển sản phẩm thực tế theo yêu cầu riêng của bạn.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Zalo / Hotline: +84 908095693</span>
              </div>
              <div className="text-slate-400 pl-4">Email: anhpob@gmail.com</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="text-slate-400">
            © 2026 DUY ANH DIGITAL LAB • <a href="https://ungdung.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:underline">ungdung.vercel.app</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              Dành tặng cho mọi gia đình Việt Nam <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-amber-400 text-amber-300 hover:text-slate-950 transition-all border border-amber-400/30 font-bold cursor-pointer text-xs sm:text-sm"
            >
              <span>Về đầu trang</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
