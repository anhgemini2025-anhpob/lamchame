import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Send, Phone, Mail, MessageSquare, CheckCircle2, Sparkles, ExternalLink, MapPin } from 'lucide-react';
import { openExternalApp } from '../utils/navigation';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAppId?: string;
}

const TOPIC_TO_APP: Record<string, string | null> = {
  both: null,
  app1: 'nuoi-duong-be-0-60',
  app2: 'nuoi-day-tre-6-11',
  app3: 'thau-hieu-thieu-nien-12-15',
  app4: 'dinh-huong-thanh-nien-16-18',
  custom: null,
};

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose, defaultAppId }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [topic, setTopic] = useState('both');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Mở từ trang Chi tiết app -> tự chọn sẵn chủ đề app đó
  useEffect(() => {
    if (!isOpen) return;
    const key = Object.keys(TOPIC_TO_APP).find((k) => TOPIC_TO_APP[k] === defaultAppId);
    setTopic(key || 'both');
    setError('');
  }, [isOpen, defaultAppId]);

  if (!isOpen) return null;

  // CREATE: lưu yêu cầu tư vấn vào bảng Supabase "consultations"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const { error: dbError } = await supabase.from('consultations').insert({
      full_name: name.trim(),
      contact: contact.trim(),
      topic,
      app_id: TOPIC_TO_APP[topic],
      message: message.trim(),
    });
    setSending(false);
    if (dbError) {
      console.error(dbError);
      setError('Chưa gửi được yêu cầu (' + dbError.message + '). Vui lòng thử lại hoặc liên hệ Zalo.');
      return;
    }
    setSubmitted(true);
    setName('');
    setContact('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      
      <div className="w-full max-w-lg bg-[#081321] border-l border-amber-400/40 h-full flex flex-col shadow-2xl animate-slideLeft">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#0A192F] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Tư Vấn &amp; Trao Đổi Cùng Duy Anh Lab
              </h3>
              <p className="text-xs text-slate-400">
                Hiện thực hóa ý tưởng phần mềm &amp; ứng dụng giáo dục
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

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Quick Direct Contacts */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://zalo.me/84908095693"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
              className="p-3 rounded-2xl bg-[#0A192F] border border-slate-700 hover:border-amber-400 transition-colors text-center group cursor-pointer"
            >
              <div className="text-[11px] text-slate-400 font-semibold">Zalo / Hotline:</div>
              <div className="text-sm font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5">
                +84 908095693
              </div>
            </a>

            <a
              href="mailto:anhpob@gmail.com"
              className="p-3 rounded-2xl bg-[#0A192F] border border-slate-700 hover:border-amber-400 transition-colors text-center group"
            >
              <div className="text-[11px] text-slate-400 font-semibold">Email trao đổi:</div>
              <div className="text-sm font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5 truncate">
                anhpob@gmail.com
              </div>
            </a>
          </div>

          {/* Office Address Card */}
          <a
            href="https://www.google.com/maps/place/i2.32,+River+Park/@10.810246,106.7886395,17z/data=!3m1!4b1!4m6!3m5!1s0x317527e477a11af7:0x58dc05159773f648!8m2!3d10.810246!4d106.7912144!16s%2Fg%2F11spwrshw9?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-[#0A192F] border border-slate-700 hover:border-amber-400 transition-colors flex items-start gap-2.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                <span>Địa chỉ văn phòng:</span>
                <span className="text-amber-400 text-[10px] flex items-center gap-0.5 font-bold">Google Maps <ExternalLink className="w-2.5 h-2.5" /></span>
              </div>
              <div className="text-xs text-slate-200 group-hover:text-white mt-0.5 font-medium leading-snug">
                i2-35 KDC River Park, Võ Chí Công, P. Phước Long, TPHCM.
              </div>
            </div>
          </a>

          {/* Form */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-white">Yêu Cầu Đã Được Ghi Nhận!</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yêu cầu đã được lưu vào hệ thống. Đội ngũ kỹ thuật Duy Anh Lab sẽ phản hồi bạn qua Zalo hoặc Email trong thời gian sớm nhất.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Họ và tên của bạn:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A192F] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Số điện thoại Zalo / Email liên hệ:
                </label>
                <input
                  type="text"
                  required
                  placeholder="0908xxxxxx hoặc email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A192F] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Chủ đề bạn quan tâm:
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A192F] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="both">Góp ý / Hỗ trợ về 4 App Làm Cha Mẹ</option>
                  <option value="app1">App 1: Nuôi dưỡng bé 0-60 tháng</option>
                  <option value="app2">App 2: Nuôi dạy con 6-11 tuổi (Tiểu học)</option>
                  <option value="app3">App 3: Thấu hiểu thiếu niên 12-15 tuổi (THCS)</option>
                  <option value="app4">App 4: Định hướng thanh niên 16-18 tuổi (THPT)</option>
                  <option value="custom">Yêu cầu phát triển Web App / AI theo yêu cầu riêng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Nội dung chi tiết hoặc ý tưởng của bạn:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Chia sẻ trăn trở nuôi dạy con hoặc ý tưởng tính năng bạn muốn hiện thực hóa..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A192F] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {error && (
                <p className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/40 rounded-lg p-2.5">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="disabled:opacity-60 w-full py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? 'Đang gửi...' : 'Gửi Yêu Cầu Trao Đổi Ngay'}</span>
              </button>

            </form>
          )}

          {/* Philosophy note */}
          <div className="p-4 rounded-xl bg-[#0A192F] border border-slate-800 text-center space-y-1">
            <div className="text-xs font-mono font-bold text-amber-300">
              DUY ANH DIGITAL LAB
            </div>
            <div className="text-[11px] text-slate-400">
              "MONG MUỐN &rarr; Ý TƯỞNG &rarr; HIỆN THỰC"
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
