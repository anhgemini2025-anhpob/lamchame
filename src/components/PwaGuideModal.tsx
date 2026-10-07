import React, { useState } from 'react';
import { X, Smartphone, Apple, Monitor, Download, CheckCircle2, ShieldCheck, WifiOff, ExternalLink } from 'lucide-react';
import { useApps } from '../lib/AppsContext';
import { openExternalApp } from '../utils/navigation';

interface PwaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaGuideModal: React.FC<PwaGuideModalProps> = ({ isOpen, onClose }) => {
  const LAMCHAME_APPS = useApps();
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-[#081321] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0A192F] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Hướng Dẫn Cài Đặt PWA Trong 10 Giây
              </h3>
              <p className="text-xs text-slate-400">
                Dùng như App bản địa, hoạt động ngoại tuyến 100%, không cần App Store
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Why PWA is superior */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 text-center space-y-1">
              <WifiOff className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-white">Ngoại Tuyến 100%</div>
              <div className="text-[11px] text-slate-400">Mất mạng vẫn mở được sơ cứu SOS</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="text-xs font-bold text-white">Bảo Mật Cực Cao</div>
              <div className="text-[11px] text-slate-400">Dữ liệu nằm trên máy, không rò rỉ</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 text-center space-y-1">
              <Smartphone className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="text-xs font-bold text-white">Dung Lượng Siêu Nhẹ</div>
              <div className="text-[11px] text-slate-400">Chỉ dưới 5MB, không nặng máy</div>
            </div>
          </div>

          {/* Platform Switcher Tabs */}
          <div className="flex rounded-xl bg-[#0A192F] p-1 border border-slate-800">
            <button
              onClick={() => setPlatform('ios')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                platform === 'ios'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>iPhone / iPad (iOS)</span>
            </button>

            <button
              onClick={() => setPlatform('android')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                platform === 'android'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Điện thoại Android</span>
            </button>

            <button
              onClick={() => setPlatform('desktop')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                platform === 'desktop'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Máy tính PC / Mac</span>
            </button>
          </div>

          {/* Step-by-Step Instructions */}
          {platform === 'ios' && (
            <div className="space-y-3.5 bg-[#0A192F] p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                Các bước cài đặt trên iPhone bằng Safari:
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Mở bất kỳ ứng dụng nào trong 4 link bên dưới bằng trình duyệt <strong>Safari</strong> trên iPhone.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Bấm vào nút <strong>Chia sẻ (biểu tượng ô vuông có mũi tên chỉ lên)</strong> ở thanh công cụ dưới đáy màn hình.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Cuộn xuống và chọn <strong>"Thêm vào Màn hình chính" (Add to Home Screen)</strong> &rarr; Nhấn <strong>"Thêm" (Add)</strong>.</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium pt-1">
                ✓ Biểu tượng ứng dụng sẽ xuất hiện ngay trên màn hình chính như một ứng dụng thật!
              </div>
            </div>
          )}

          {platform === 'android' && (
            <div className="space-y-3.5 bg-[#0A192F] p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                Các bước cài đặt trên điện thoại Android bằng Chrome:
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Mở liên kết ứng dụng bằng trình duyệt <strong>Google Chrome</strong> hoặc Cốc Cốc.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Nhấn vào <strong>dấu 3 chấm dọc</strong> ở góc trên bên phải màn hình.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Chọn <strong>"Cài đặt ứng dụng" (Install app)</strong> hoặc <strong>"Thêm vào Màn hình chính"</strong>.</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium pt-1">
                ✓ Ứng dụng sẽ tự động được ghim lên màn hình điện thoại với biểu tượng sắc nét.
              </div>
            </div>
          )}

          {platform === 'desktop' && (
            <div className="space-y-3.5 bg-[#0A192F] p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                Các bước cài đặt trên máy tính (Chrome, Edge, Brave):
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Truy cập trang web ứng dụng trên máy tính của bạn.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Nhìn lên thanh địa chỉ (URL bar), bạn sẽ thấy <strong>biểu tượng Cài đặt (màn hình có mũi tên tải xuống)</strong>.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Bấm vào biểu tượng đó và chọn <strong>"Cài đặt" (Install)</strong>. Ứng dụng sẽ mở trong cửa sổ riêng biệt không có thanh viền trình duyệt.</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick links to 4 apps */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-300">
              Chọn ứng dụng bạn muốn mở &amp; ghim ngay:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LAMCHAME_APPS.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp(app.url, e)}
                  className="p-3 rounded-xl bg-[#0A192F] border border-slate-800 hover:border-amber-400/60 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={app.logoUrl} alt={app.name} className="w-7 h-7 object-contain rounded" />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300">
                        {app.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{app.ageRange}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A192F] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-yellow-300 cursor-pointer"
          >
            Đã hiểu, đóng hướng dẫn
          </button>
        </div>

      </div>

    </div>
  );
};
