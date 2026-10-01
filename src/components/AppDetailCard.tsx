import React, { useState } from 'react';
import { ExternalLink, Play, Image as ImageIcon, Download, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, WifiOff, Smartphone, ArrowRight, Share2, Copy } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { openExternalApp } from '../utils/navigation';

interface AppDetailCardProps {
  app: AppItem;
  onOpenVideoTour: (app: AppItem) => void;
  onOpenGallery: (app: AppItem) => void;
  onOpenPwaGuide: () => void;
}

export const AppDetailCard: React.FC<AppDetailCardProps> = ({
  app,
  onOpenVideoTour,
  onOpenGallery,
  onOpenPwaGuide
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(app.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article
      id={`app-${app.id}`}
      className="py-16 sm:py-24 border-t border-slate-800/80 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400/50 p-1.5 shadow-xl shrink-0 flex items-center justify-center">
              <img
                src={app.logoUrl}
                alt={`${app.name} logo`}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-black uppercase tracking-wider border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                  Ứng Dụng {app.number} • {app.stageName}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300">
                  {app.ageRange}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {app.educationStage}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {app.name}
              </h2>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-[#0A192F] border border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Sao chép đường link ứng dụng"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>{copiedLink ? 'Đã chép link!' : 'Chia sẻ'}</span>
            </button>

            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(app.url, e)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-slate-950 bg-gradient-to-r ${app.theme.buttonGradient} hover:opacity-95 shadow-md shadow-amber-500/20 transition-all cursor-pointer`}
            >
              <span>Vào Ứng Dụng Ngay</span>
              <ExternalLink className="w-4 h-4 text-slate-950" />
            </a>
          </div>

        </div>

        {/* Hook Callout Box */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#0E223D] via-[#0A192F] to-[#0E223D] border border-amber-500/30 p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Câu Hỏi &amp; Nỗi Trăn Trở Cốt Lõi:</span>
              </div>
              <p className="text-base sm:text-xl font-bold text-amber-200 italic leading-snug">
                "{app.hookQuestion}"
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {app.hookHeadline}
              </p>
            </div>

            {/* Video Tour Quick Trigger */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                onClick={() => onOpenVideoTour(app)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/25 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Xem Video Tour ({app.videoDuration})</span>
              </button>

              <button
                onClick={() => onOpenGallery(app)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#07111E] border border-amber-400/40 text-slate-200 hover:text-amber-300 text-xs font-bold transition-all cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Xem 10 Ảnh Màn Hình</span>
              </button>
            </div>

          </div>
        </div>

        {/* Two-Column Layout: Visual Showcase (Left) + Pain Points & Core Features (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Visual Screenshot & Quick Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Preview Mockup */}
            <div
              onClick={() => onOpenGallery(app)}
              className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-950 cursor-pointer group aspect-[16/10]"
            >
              <img
                src={app.coverImage}
                alt={app.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
              
              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-mono text-amber-300 font-bold">
                10 Màn hình chi tiết
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Bấm để xem phóng to</span>
                </span>
                <span className="text-[11px] text-slate-300 font-mono">PWA Ngoại Tuyến</span>
              </div>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {app.uniqueHighlights.map((hl, hlIdx) => (
                <div
                  key={hlIdx}
                  className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{hl}</span>
                </div>
              ))}
            </div>

            {/* PWA 100% Offline Promise Banner */}
            <div className="p-4 rounded-2xl bg-[#0A192F] border border-amber-400/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <WifiOff className="w-4 h-4 text-amber-400" />
                <span>Hoạt Động Ngay Cả Khi Mất Mạng Hoàn Toàn</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ứng dụng sử dụng chuẩn Progressive Web App (PWA). Toàn bộ dữ liệu nhật ký, sơ cứu khẩn cấp, tài liệu được lưu trực tiếp trên thiết bị của bạn. Không sợ gián đoạn kết nối.
              </p>
              <button
                onClick={onOpenPwaGuide}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer pt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xem cách ghim app ra màn hình chính (10 giây)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Pain Points & 10 Core Features */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pain Points Box */}
            <div className="p-5 rounded-2xl bg-[#0A192F] border border-slate-800 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                Thực Tế &amp; Khó Khăn Của Phụ Huynh Trong Giai Đoạn Này:
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {app.painPoints.map((pain, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 10 Core Features List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>10 Tính Năng Cốt Lõi Được Thiết Kế Chuyên Biệt</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">10 / 10 Tính năng</span>
              </div>

              <div className="space-y-2.5">
                {app.keyFeatures.map((feat, fIdx) => {
                  const isExpanded = expandedFeature === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-xl bg-[#0A192F] border border-slate-800/80 hover:border-amber-400/40 transition-colors overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFeature(isExpanded ? null : fIdx)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {fIdx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {feat.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-[#07111E]/40">
                          {feat.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp(app.url, e)}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r ${app.theme.buttonGradient} hover:opacity-95 shadow-lg shadow-amber-500/20 transition-all cursor-pointer`}
              >
                <span>Mở Dùng Miễn Phí App {app.number}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              <button
                onClick={() => onOpenVideoTour(app)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0A192F] border border-amber-400/40 hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Xem Trình Diễn Video</span>
              </button>

              <button
                onClick={onOpenPwaGuide}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-[#07111E] border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Cài Đặt Màn Hình Điện Thoại</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </article>
  );
};
