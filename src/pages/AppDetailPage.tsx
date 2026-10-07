import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, Star, Send } from 'lucide-react';
import { useApps, useAppsSource } from '../lib/AppsContext';
import { supabase, Review } from '../lib/supabase';
import { LayoutActions } from '../components/Layout';
import { AppDetailCard } from '../components/AppDetailCard';

/** TRANG CHI TIẾT SẢN PHẨM (/app/:slug) */
export function AppDetailPage() {
  const { slug } = useParams();
  const apps = useApps();
  const source = useAppsSource();
  const { openVideo, openGallery, openPwaGuide, openContact } = useOutletContext<LayoutActions>();

  const idx = apps.findIndex((a) => a.id === slug);
  const app = apps[idx];

  useEffect(() => {
    if (app) document.title = `${app.name} | Làm Cha Mẹ • Duy Anh Lab`;
  }, [app]);

  if (!app) {
    return (
      <div className="pt-36 pb-24 text-center px-4">
        {source === 'loading' ? (
          <p className="text-slate-400">Đang tải dữ liệu...</p>
        ) : (
          <>
            <h1 className="text-2xl font-black text-white mb-3">Không tìm thấy ứng dụng</h1>
            <Link to="/" className="text-amber-300 font-bold hover:underline">← Về Trang Chủ</Link>
          </>
        )}
      </div>
    );
  }

  const prev = apps[(idx - 1 + apps.length) % apps.length];
  const next = apps[(idx + 1) % apps.length];

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-xs text-slate-400 flex items-center gap-2">
        <Link to="/" className="hover:text-amber-300">Trang Chủ</Link>
        <span>/</span>
        <span className="text-slate-300">Ứng dụng</span>
        <span>/</span>
        <span className="text-amber-300 font-semibold">{app.name}</span>
      </div>

      <AppDetailCard
        app={app}
        onOpenVideoTour={openVideo}
        onOpenGallery={openGallery}
        onOpenPwaGuide={openPwaGuide}
      />

      <ReviewsSection appId={app.id} appName={app.name} />

      {/* CTA + điều hướng app trước/sau */}
      <section className="border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-stretch justify-between">
          <Link to={`/app/${prev.id}`} className="flex-1 p-4 rounded-2xl bg-[#0B1A2F] border border-slate-700 hover:border-amber-400 group">
            <div className="text-[11px] text-slate-400 flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> App trước</div>
            <div className="text-sm font-bold text-white group-hover:text-amber-300 mt-1">App {prev.number}: {prev.name}</div>
          </Link>
          <button
            onClick={() => openContact(app.id)}
            className="flex-1 p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer hover:from-amber-300"
          >
            <MessageSquare className="w-4 h-4" /> Đăng ký tư vấn về app này
          </button>
          <Link to={`/app/${next.id}`} className="flex-1 p-4 rounded-2xl bg-[#0B1A2F] border border-slate-700 hover:border-amber-400 group text-right">
            <div className="text-[11px] text-slate-400 flex items-center gap-1 justify-end">App tiếp theo <ArrowRight className="w-3.5 h-3.5" /></div>
            <div className="text-sm font-bold text-white group-hover:text-amber-300 mt-1">App {next.number}: {next.name}</div>
          </Link>
        </div>
      </section>
    </div>
  );
}

/** Đánh giá của phụ huynh — READ + CREATE trên bảng Supabase "reviews" */
const ReviewsSection: React.FC<{ appId: string; appName: string }> = ({ appId, appName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('app_id', appId)
      .order('created_at', { ascending: false });
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    setMsg(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    const { error } = await supabase
      .from('reviews')
      .insert({ app_id: appId, author_name: author.trim(), rating, content: content.trim() });
    setSending(false);
    if (error) {
      setMsg({ ok: false, text: 'Chưa gửi được đánh giá: ' + error.message });
      return;
    }
    setAuthor('');
    setContent('');
    setRating(5);
    setMsg({ ok: true, text: 'Cảm ơn bạn! Đánh giá đã được lưu.' });
    load();
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section id="reviews" className="border-t border-slate-800/80 py-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black text-white">Đánh Giá Của Phụ Huynh</h2>
            {reviews.length > 0 && (
              <div className="text-sm text-slate-300 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <b className="text-amber-300">{avg.toFixed(1)}</b>/5 • {reviews.length} đánh giá
              </div>
            )}
          </div>

          {loading ? (
            <p className="text-sm text-slate-400">Đang tải đánh giá...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-slate-400">Chưa có đánh giá nào cho {appName}. Hãy là người đầu tiên!</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="p-4 rounded-2xl bg-[#0B1A2F] border border-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">{r.author_name}</span>
                    <span className="text-[11px] text-slate-500">{new Date(r.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <Stars value={r.rating} />
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{r.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={submit} className="lg:col-span-2 p-5 rounded-2xl bg-[#0A192F] border border-amber-400/30 space-y-3 h-fit">
          <h3 className="font-extrabold text-amber-300">Viết đánh giá</h3>
          <input
            required
            minLength={2}
            maxLength={60}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Tên của bạn (VD: Mẹ Bắp)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#07111E] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Số sao">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={`${n} sao`}
                className="p-0.5 cursor-pointer"
              >
                <Star className={`w-6 h-6 ${n <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
          <textarea
            required
            minLength={5}
            maxLength={1000}
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Trải nghiệm của bạn với ứng dụng..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#07111E] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
          />
          {msg && (
            <p className={`text-xs rounded-lg p-2.5 border ${msg.ok ? 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30' : 'text-rose-300 border-rose-500/40 bg-rose-950/30'}`}>
              {msg.text}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> {sending ? 'Đang gửi...' : 'Gửi đánh giá'}
          </button>
        </form>
      </div>
    </section>
  );
};

const Stars: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex gap-0.5 mt-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={`w-3.5 h-3.5 ${n <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
    ))}
  </div>
);
