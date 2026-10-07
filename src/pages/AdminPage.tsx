import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { LogOut, Trash2, RefreshCw, Lock, Star } from 'lucide-react';
import { supabase, Consultation, Review } from '../lib/supabase';
import { useApps } from '../lib/AppsContext';

const STATUSES: Consultation['status'][] = ['Mới', 'Đang xử lý', 'Đã liên hệ'];
const TOPIC_LABEL: Record<string, string> = {
  both: 'Góp ý chung', app1: 'App 1', app2: 'App 2', app3: 'App 3', app4: 'App 4', custom: 'Web App riêng',
};

/** TRANG QUẢN TRỊ (/admin) — UPDATE & DELETE dữ liệu, yêu cầu đăng nhập Supabase Auth */
export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = 'Quản trị | Duy Anh Lab';
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {!ready ? <p className="text-slate-400">Đang kiểm tra đăng nhập...</p> : session ? <Dashboard email={session.user.email || ''} /> : <LoginForm />}
    </div>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-[#07111E] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr('Đăng nhập thất bại: ' + error.message);
  };

  return (
    <form onSubmit={login} className="max-w-sm mx-auto p-6 rounded-2xl bg-[#0A192F] border border-amber-400/30 space-y-4">
      <div className="flex items-center gap-2 text-amber-300 font-extrabold"><Lock className="w-5 h-5" /> Đăng nhập Quản trị</div>
      <input type="email" required placeholder="Email admin" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      <input type="password" required placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      {err && <p className="text-xs text-rose-300">{err}</p>}
      <button disabled={busy} className="w-full py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 disabled:opacity-60 cursor-pointer">
        {busy ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      <p className="text-[11px] text-slate-500">Tài khoản admin được tạo trong Supabase → Authentication → Users.</p>
    </form>
  );
};

const Dashboard: React.FC<{ email: string }> = ({ email }) => {
  const apps = useApps();
  const appName = (id: string | null) => apps.find((a) => a.id === id)?.name || '—';
  const [tab, setTab] = useState<'consult' | 'reviews'>('consult');
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true);
    setErr('');
    const [c, r] = await Promise.all([
      supabase.from('consultations').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
    ]);
    if (c.error || r.error) setErr((c.error || r.error)!.message);
    setConsults((c.data as Consultation[]) || []);
    setReviews((r.data as Review[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // UPDATE: đổi trạng thái yêu cầu tư vấn
  const updateStatus = async (id: number, status: Consultation['status']) => {
    const { error } = await supabase.from('consultations').update({ status }).eq('id', id);
    if (error) return setErr(error.message);
    setConsults((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  // DELETE: xóa yêu cầu tư vấn
  const deleteConsult = async (id: number) => {
    if (!window.confirm('Xóa yêu cầu tư vấn này?')) return;
    const { error } = await supabase.from('consultations').delete().eq('id', id);
    if (error) return setErr(error.message);
    setConsults((list) => list.filter((c) => c.id !== id));
  };

  // DELETE: xóa đánh giá không phù hợp
  const deleteReview = async (id: number) => {
    if (!window.confirm('Xóa đánh giá này?')) return;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) return setErr(error.message);
    setReviews((list) => list.filter((r) => r.id !== id));
  };

  const shown = filter === 'all' ? consults : consults.filter((c) => c.status === filter);
  const count = (s: string) => consults.filter((c) => c.status === s).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Bảng Quản Trị</h1>
          <p className="text-xs text-slate-400">Đăng nhập: {email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="px-3 py-2 rounded-xl text-xs font-bold bg-[#0A192F] border border-slate-700 hover:border-amber-400 flex items-center gap-1.5 cursor-pointer">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </button>
          <button onClick={() => supabase.auth.signOut()} className="px-3 py-2 rounded-xl text-xs font-bold bg-[#0A192F] border border-slate-700 hover:border-rose-400 flex items-center gap-1.5 cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Đăng xuất
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Tổng yêu cầu" value={consults.length} />
        {STATUSES.map((s) => <Stat key={s} label={s} value={count(s)} />)}
      </div>

      {err && <p className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/40 rounded-lg p-2.5">{err}</p>}

      <div className="flex gap-2 border-b border-slate-800">
        {([['consult', `Yêu cầu tư vấn (${consults.length})`], ['reviews', `Đánh giá (${reviews.length})`]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 text-sm font-bold border-b-2 -mb-px cursor-pointer ${tab === k ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'consult' ? (
        <div className="space-y-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-[#0A192F] border border-slate-700 text-sm text-white">
            <option value="all">Tất cả trạng thái</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {shown.length === 0 && <p className="text-sm text-slate-400">Không có yêu cầu nào.</p>}
          {shown.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-[#0B1A2F] border border-slate-800 flex flex-col md:flex-row gap-3 md:items-start">
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <b className="text-white">{c.full_name}</b>
                  <span className="text-xs text-amber-300">{c.contact}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{TOPIC_LABEL[c.topic] || c.topic}</span>
                  {c.app_id && <span className="text-[11px] text-slate-400">{appName(c.app_id)}</span>}
                </div>
                <p className="text-sm text-slate-300 whitespace-pre-line">{c.message}</p>
                <p className="text-[11px] text-slate-500">{new Date(c.created_at).toLocaleString('vi-VN')}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.id, e.target.value as Consultation['status'])}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border bg-[#07111E] ${c.status === 'Mới' ? 'text-amber-300 border-amber-500/50' : c.status === 'Đang xử lý' ? 'text-sky-300 border-sky-500/50' : 'text-emerald-300 border-emerald-500/50'}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => deleteConsult(c.id)} className="p-2 rounded-lg border border-slate-700 hover:border-rose-400 hover:text-rose-300 cursor-pointer" title="Xóa">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-sm text-slate-400">Chưa có đánh giá.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-[#0B1A2F] border border-slate-800 flex gap-3 items-start">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <b className="text-white">{r.author_name}</b>
                  <span className="flex items-center gap-0.5 text-amber-300 text-xs"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{r.rating}</span>
                  <span className="text-[11px] text-slate-400">{appName(r.app_id)}</span>
                </div>
                <p className="text-sm text-slate-300 mt-1">{r.content}</p>
              </div>
              <button onClick={() => deleteReview(r.id)} className="p-2 rounded-lg border border-slate-700 hover:border-rose-400 hover:text-rose-300 cursor-pointer" title="Xóa">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="p-4 rounded-2xl bg-[#0A192F] border border-slate-800">
    <div className="text-2xl font-black text-amber-300">{value}</div>
    <div className="text-xs text-slate-400">{label}</div>
  </div>
);
