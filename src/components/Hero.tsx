import React, { useState } from 'react';
import { Play, Sparkles, ShieldCheck, WifiOff, Smartphone, Award, ArrowRight, Heart, Users, ChevronRight } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { useApps } from '../lib/AppsContext';
import { openExternalApp } from '../utils/navigation';

interface HeroProps {
  onOpenVideoTour: (app: AppItem) => void;
  onOpenGallery: (app: AppItem) => void;
  onOpenPwaGuide: () => void;
  onScrollToApp: (appId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenVideoTour,
  onOpenGallery,
  onOpenPwaGuide,
  onScrollToApp
}) => {
  const LAMCHAME_APPS = useApps();
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeApp = LAMCHAME_APPS[activeStageIdx];

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#050B14] via-[#07111E] to-[#0A192F]">
      
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#142C4C10_1px,transparent_1px),linear-gradient(to_bottom,#142C4C10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hook Badge */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto mb-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/15 via-yellow-400/20 to-amber-500/15 border border-amber-400/40 shadow-lg shadow-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300">
              TRỌN BỘ 4 ỨNG DỤNG ĐỒNG HÀNH LÀM CHA MẸ (0–18 TUỔI)
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Nuôi Con Không Cần Phải Là Cuộc Chiến{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Đơn Độc Giữa Biển Rối Bời
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            Từ tiếng khóc chào đời đầu tiên đến khoảnh khắc con tự tin sải cánh vào giảng đường đại học và cuộc sống tự lập.
            Hệ sinh thái 4 ứng dụng Web PWA độc lập, chuẩn khoa học, <strong className="text-amber-300 font-semibold">hoạt động ngoại tuyến 100%</strong> và bảo mật dữ liệu tuyệt đối trên thiết bị của bạn.
          </p>

          {/* Value Props Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] border border-amber-400/20 text-slate-200">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Chế độ PWA Ngoại Tuyến 100%</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] border border-amber-400/20 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bảo mật dữ liệu trên máy</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] border border-amber-400/20 text-slate-200">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Trợ lý AI &amp; Kịch bản NVC</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A192F] border border-amber-400/20 text-slate-200">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Không tạo KPI áp lực điểm số</span>
            </div>
          </div>

        </div>

        {/* 4 Stage Interactive Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {LAMCHAME_APPS.map((app, idx) => {
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={app.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`relative text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0E223D] border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.02]'
                    : 'bg-[#0A192F]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0E223D]/60'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <div className="absolute -top-[1px] left-4 right-4 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-t-full" />
                )}

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={app.logoUrl}
                      alt={app.name}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono uppercase font-black px-1.5 py-0.5 rounded border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                      Giai đoạn {app.number}
                    </span>
                    <div className="text-xs font-bold text-slate-300 mt-0.5">
                      {app.ageRange}
                    </div>
                  </div>
                </div>

                <div className="text-sm sm:text-base font-extrabold text-white line-clamp-1">
                  {app.name}
                </div>
                <div className="text-xs text-amber-300/90 font-medium line-clamp-1 mt-0.5">
                  {app.educationStage}
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-800/80 pt-2">
                  <span className="text-amber-400">10 Tính năng cốt lõi</span>
                  <span className="flex items-center gap-0.5 text-slate-300 group-hover:text-amber-300">
                    Khám phá <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Box for Selected App */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#0E223D] to-[#0A192F] border border-amber-500/30 p-4 sm:p-7 shadow-2xl shadow-black/80">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left: App Info & Hook */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider border ${activeApp.theme.badgeBg} ${activeApp.theme.badgeText} ${activeApp.theme.badgeBorder}`}>
                  Ứng dụng {activeApp.number} • {activeApp.stageName}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                  {activeApp.ageRange}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  PWA Ngoại tuyến 100%
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {activeApp.name}
              </h2>

              {/* Hook Question Box */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#07111E]/90 border border-amber-400/40 shadow-inner">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Câu hỏi trăn trở lớn nhất của cha mẹ:</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-amber-200 italic leading-snug">
                  "{activeApp.hookQuestion}"
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeApp.hookHeadline}
              </p>

              {/* Unique Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeApp.uniqueHighlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={activeApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp(activeApp.url, e)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r ${activeApp.theme.buttonGradient} hover:opacity-95 shadow-xl transition-all cursor-pointer`}
                >
                  <span>Mở Trải Nghiệm App {activeApp.number} Ngay</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </a>

                <button
                  onClick={() => onOpenVideoTour(activeApp)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#07111E] border border-amber-400/40 hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-md"
                >
                  <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Xem Video Tour ({activeApp.videoDuration})</span>
                </button>

                <button
                  onClick={() => onScrollToApp(activeApp.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-[#0A192F] border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                >
                  <span>Chi tiết 10 tính năng</span>
                </button>
              </div>

            </div>

            {/* Right: Screen & Video Teaser */}
            <div className="lg:col-span-5 relative group">
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-950 aspect-[16/10] sm:aspect-[4/3]">
                <img
                  src={activeApp.coverImage}
                  alt={activeApp.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Top Badge on image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-[#07111E]/90 border border-amber-400/40 text-[11px] font-mono font-bold text-amber-300 backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Giao diện thực tế PWA</span>
                  </div>
                </div>

                {/* Bottom Overlay Info & Play Trigger */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-xs font-black text-white">Video Tour Có Thuyết Minh</div>
                    <div className="text-[11px] text-slate-300 font-mono">11 Cảnh trình diễn • {activeApp.videoDuration}</div>
                  </div>

                  <button
                    onClick={() => onOpenVideoTour(activeApp)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-400/30 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Phát Tour</span>
                  </button>
                </div>
              </div>

              {/* Quick links beneath image */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 px-1">
                <button
                  onClick={() => onOpenGallery(activeApp)}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>📷 Xem 10 ảnh giao diện</span>
                </button>
                <button
                  onClick={onOpenPwaGuide}
                  className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>📱 Hướng dẫn cài lên màn hình</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
