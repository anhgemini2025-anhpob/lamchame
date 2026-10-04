import React from 'react';
import { ArrowUp, ExternalLink, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { LAMCHAME_APPS } from '../data/appsData';

const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/i2.32,+River+Park/@10.810246,106.7886395,17z/data=!3m1!4b1!4m6!3m5!1s0x317527e477a11af7:0x58dc05159773f648!8m2!3d10.810246!4d106.7912144!16s%2Fg%2F11spwrshw9?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.784534884218!2d106.7886395!3d10.810246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e477a11af7%3A0x58dc05159773f648!2si2.32%2C%20River%20Park!5e0!3m2!1svi!2svn!4v1710000000000!5m2!1svi!2svn";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#050B14] border-t border-amber-500/20 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
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
          <div className="md:col-span-5 space-y-3.5">
            <h4 className="font-extrabold text-amber-300 text-base">Tư Vấn &amp; Hiện Thực Hóa</h4>
            <p className="leading-relaxed text-slate-300 text-sm">
              Bạn có ý tưởng trong cuộc sống, giáo dục con cái, công việc hay kinh doanh cần hiện thực hóa thành ứng dụng Web riêng biệt? Đội ngũ kỹ thuật Duy Anh Lab luôn sẵn sàng đồng hành, tư vấn kiến trúc giải pháp và phát triển sản phẩm thực tế theo yêu cầu riêng của bạn.
            </p>
            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-300">
              <a
                href="https://zalo.me/84908095693"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-300 font-bold hover:underline"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Zalo / Hotline: +84 908095693</span>
              </a>
              <a
                href="mailto:anhpob@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-amber-300 hover:underline"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Email: anhpob@gmail.com</span>
              </a>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-300 hover:text-amber-300 transition-colors group"
                title="Mở Google Maps chỉ đường"
              >
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  <strong className="text-amber-200">Địa chỉ:</strong> i2-35 KDC River Park, Võ Chí Công, P. Phước Long, TPHCM.
                </span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="pt-2">
              <div className="rounded-xl overflow-hidden border border-amber-500/30 bg-[#0A192F] shadow-lg shadow-black/50">
                <div className="relative w-full h-44 sm:h-48">
                  <iframe
                    title="Google Map Duy Anh Lab - i2-35 KDC River Park"
                    src={GOOGLE_MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full block"
                  />
                </div>
                <div className="px-3 py-2 bg-[#06101E] border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">KDC River Park, Võ Chí Công, P. Phước Long</span>
                  </span>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 hover:underline ml-auto"
                  >
                    <span>Mở Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
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
