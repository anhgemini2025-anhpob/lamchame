import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { openExternalApp } from '../utils/navigation';

interface ScreenshotGalleryModalProps {
  app: AppItem | null;
  onClose: () => void;
}

export const ScreenshotGalleryModal: React.FC<ScreenshotGalleryModalProps> = ({ app, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = app ? app.detailImages : [];

  useEffect(() => {
    setActiveIdx(0);
    setProgress(0);
    setIsAutoPlay(true);
  }, [app?.id]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, images.length]);

  // Slideshow timer
  useEffect(() => {
    if (!isAutoPlay || isHovered || images.length <= 1) return;

    const intervalMs = 50;
    const step = (intervalMs / 3500) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((current) => (current + 1) % images.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, images.length]);

  if (!app || images.length === 0) return null;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-5xl bg-[#081321] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A192F] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img src={app.logoUrl} alt={app.name} className="w-7 h-7 object-contain rounded-lg" />
            <div>
              <span className="text-xs sm:text-sm font-black text-white">
                {app.name} - Ảnh Giao Diện Thực Tế ({activeIdx + 1}/{images.length})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-1.5 px-2.5 rounded-lg bg-[#07111E] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAutoPlay ? 'Tự động' : 'Tạm dừng'}</span>
            </button>

            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(app.url, e)}
              className="p-1.5 px-3 rounded-lg bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Vào App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex-1 bg-black flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[300px] sm:min-h-[500px]"
        >
          <img
            src={images[activeIdx]}
            alt={`Ảnh giao diện ${activeIdx + 1}`}
            className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white transition-all backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white transition-all backdrop-blur-md cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar for Slideshow */}
        <div className="w-full h-1 bg-slate-800">
          <div
            className="h-full bg-amber-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Thumbnails Strip */}
        <div className="bg-[#0A192F] p-3 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setProgress(0);
              }}
              className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/30'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
