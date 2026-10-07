import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useApps } from '../lib/AppsContext';
import { LayoutActions } from '../components/Layout';
import { Hero } from '../components/Hero';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { ComparisonMatrix } from '../components/ComparisonMatrix';
import { ArrowRight, Smartphone, Download, ExternalLink } from 'lucide-react';
import { openExternalApp } from '../utils/navigation';

/** TRANG CHỦ (/) */
export function HomePage() {
  const LAMCHAME_APPS = useApps();
  const navigate = useNavigate();
  const { openVideo, openGallery, openPwaGuide, openContact } = useOutletContext<LayoutActions>();
  const goToApp = (appId: string) => navigate(`/app/${appId}`);

  return (
    <>
        {/* 2. Hero Section */}
        <Hero
          onOpenVideoTour={(app) => openVideo(app)}
          onOpenGallery={(app) => openGallery(app)}
          onOpenPwaGuide={() => openPwaGuide()}
          onScrollToApp={goToApp}
        />

        {/* 3. Journey Timeline & Contrast */}
        <JourneyTimeline
          onScrollToApp={goToApp}
          onOpenVideoTour={(app) => openVideo(app)}
        />

        {/* 4. Lối tắt sang trang Chi tiết từng App */}
        <section className="py-16 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Xem Chi Tiết Từng Ứng Dụng</h2>
            <p className="text-sm text-slate-400 mb-8">Mỗi app có trang riêng: 10 tính năng, ảnh giao diện, video tour và đánh giá của phụ huynh.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LAMCHAME_APPS.map((app) => (
                <Link
                  key={app.id}
                  to={`/app/${app.id}`}
                  className="group rounded-2xl overflow-hidden bg-[#0B1A2F] border border-slate-700 hover:border-amber-400 transition-all shadow-md flex flex-col"
                >
                  <img src={app.coverImage} alt={app.name} className="h-40 w-full object-cover object-top opacity-90 group-hover:opacity-100" loading="lazy" />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-[11px] font-mono text-amber-400 font-bold">App {app.number} • {app.ageRange}</div>
                    <div className="text-sm font-extrabold text-white mt-1 group-hover:text-amber-300">{app.name}</div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">{app.hookQuestion}</div>
                    <div className="mt-auto pt-3 text-xs font-bold text-amber-300 flex items-center gap-1">Xem chi tiết <ArrowRight className="w-3.5 h-3.5" /></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Comprehensive Comparison Matrix */}
        <ComparisonMatrix />

        {/* 6. High-Converting Bottom Conversion Banner */}
        <section className="py-20 bg-gradient-to-b from-[#07111E] via-[#0A192F] to-[#07111E] border-t border-b border-amber-500/20 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/25">
              <Smartphone className="w-8 h-8 text-slate-950" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Lưu Giữ Trọn Vẹn 18 Năm Khôn Lớn Của Con Ngay Hôm Nay
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Cả 4 ứng dụng đều là Progressive Web App (PWA) độc lập. Bạn có thể mở trực tiếp trên điện thoại, ghim ra màn hình chính trong 10 giây và sử dụng trọn vẹn ngoại tuyến mà không cần đăng ký tài khoản rườm rà.
            </p>

            {/* Quick 4 App Launcher Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left">
              {LAMCHAME_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp(app.url, e)}
                  className="p-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 hover:border-amber-400 hover:bg-[#0E223D] transition-all group cursor-pointer shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <img src={app.logoUrl} alt={app.name} className="w-8 h-8 object-contain rounded-lg" />
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 font-bold">App {app.number}</div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1">{app.name}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
                    <span>{app.ageRange}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300" />
                  </div>
                </a>
              ))}
            </div>

            {/* Direct Contact Cards */}
            <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <a
                href="https://zalo.me/84908095693"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
                className="p-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 shadow-md hover:border-amber-400 hover:bg-[#0E223D] transition-all text-center group cursor-pointer"
              >
                <div className="text-xs text-slate-400 font-semibold">Zalo / Hotline tư vấn:</div>
                <div className="text-base font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5">+84 908095693</div>
              </a>

              <a
                href="mailto:anhpob@gmail.com"
                className="p-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 shadow-md hover:border-amber-400 hover:bg-[#0E223D] transition-all text-center group"
              >
                <div className="text-xs text-slate-400 font-semibold">Email trao đổi dự án:</div>
                <div className="text-base font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5 truncate">anhpob@gmail.com</div>
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openPwaGuide()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Hướng dẫn ghim 4 App ra màn hình điện thoại</span>
              </button>

              <button
                onClick={() => openContact()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1A2F] border border-amber-400/40 hover:border-amber-400 hover:bg-[#0E223D] hover:text-amber-300 transition-all shadow-md cursor-pointer"
              >
                <span>Yêu cầu xây dựng Web App theo yêu cầu</span>
              </button>
            </div>

          </div>
        </section>

    </>
  );
}
