import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Target, Eye, ShieldCheck, WifiOff, HeartHandshake, FlaskConical, MapPin, ArrowRight, MessageSquare } from 'lucide-react';
import { useApps } from '../lib/AppsContext';
import { LayoutActions } from '../components/Layout';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.784534884218!2d106.7886395!3d10.810246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e477a11af7%3A0x58dc05159773f648!2si2.32%2C%20River%20Park!5e0!3m2!1svi!2svn!4v1710000000000!5m2!1svi!2svn';

const VALUES = [
  { icon: FlaskConical, title: 'Chuẩn khoa học', desc: 'Nội dung dựa trên chuẩn WHO, chương trình GDPT 2018 và các phương pháp giao tiếp đã được kiểm chứng (NVC, GROW).' },
  { icon: ShieldCheck, title: 'Riêng tư tuyệt đối', desc: 'Dữ liệu nhật ký của gia đình lưu ngay trên thiết bị, không cần tạo tài khoản.' },
  { icon: WifiOff, title: 'Dùng được khi mất mạng', desc: 'Chuẩn PWA: ghim ra màn hình chính, mở tức thì kể cả khi không có Internet.' },
  { icon: HeartHandshake, title: 'Đồng hành, không áp lực', desc: 'Không chấm KPI, không so sánh con với "con nhà người ta" — chỉ giúp cha mẹ bình tĩnh và thấu hiểu.' },
];

/** TRANG VỀ CHÚNG TÔI (/ve-chung-toi) */
export function AboutPage() {
  const apps = useApps();
  const { openContact } = useOutletContext<LayoutActions>();

  useEffect(() => {
    document.title = 'Về Chúng Tôi | Duy Anh Lab • Làm Cha Mẹ';
  }, []);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block p-2 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-xl">
            <img src="/brand/logo.jpg" alt="DUY ANH LAB • digital" className="h-20 sm:h-24 w-auto rounded-lg" />
          </div>
          <div className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Về Chúng Tôi</div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Duy Anh Lab • <span className="text-amber-400">digital</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Phòng lab phần mềm nhỏ, biến những trăn trở rất đời thường thành công cụ số thực dụng.
            <b className="text-amber-300"> "Làm Cha Mẹ"</b> là bộ 4 ứng dụng chúng tôi xây dựng để đồng hành cùng
            các gia đình Việt suốt 18 năm khôn lớn của con.
          </p>
          <div className="text-sm font-mono font-bold text-amber-300/90">"MONG MUỐN → Ý TƯỞNG → HIỆN THỰC"</div>
        </div>
      </section>

      {/* Câu chuyện + Sứ mệnh/Tầm nhìn */}
      <section className="py-14 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white">Câu chuyện thương hiệu</h2>
            <p className="text-slate-300 leading-relaxed">
              Là một phụ huynh, chúng tôi từng lúng túng giữa "ma trận" thông tin nuôi dạy con trên mạng: mỗi nơi một kiểu,
              lúc cần gấp lại không tìm thấy. Từ đó, ý tưởng về một bộ công cụ <b>gọn – chuẩn – luôn sẵn sàng</b> ra đời.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Thay vì một ứng dụng ôm đồm, chúng tôi chia hành trình 0–18 tuổi thành <b>4 giai đoạn</b>, mỗi giai đoạn một app
              chuyên biệt với 10 tính năng cốt lõi — vì nhu cầu của cha mẹ có con sơ sinh hoàn toàn khác với cha mẹ có con sắp thi đại học.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1A2F] border border-amber-400/30">
              <Target className="w-7 h-7 text-amber-400 mb-3" />
              <h3 className="font-extrabold text-white mb-1.5">Sứ mệnh</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Giúp cha mẹ bình tĩnh hơn, hiểu con hơn và ra quyết định dựa trên kiến thức đúng — ngay cả lúc nửa đêm, khi mất mạng.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0B1A2F] border border-amber-400/30">
              <Eye className="w-7 h-7 text-amber-400 mb-3" />
              <h3 className="font-extrabold text-white mb-1.5">Tầm nhìn</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Trở thành bộ công cụ làm cha mẹ quen thuộc của các gia đình Việt, miễn phí và tôn trọng quyền riêng tư.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-14 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white mb-6">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-[#0B1A2F] border border-slate-800">
                <Icon className="w-6 h-6 text-amber-400 mb-3" />
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm */}
      <section className="py-14 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white mb-6">Sản phẩm của chúng tôi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {apps.map((app) => (
              <Link
                key={app.id}
                to={`/app/${app.id}`}
                className="p-4 rounded-2xl bg-[#0B1A2F] border border-slate-700 hover:border-amber-400 flex items-center gap-4 group"
              >
                <img src={app.logoUrl} alt={app.name} className="w-12 h-12 rounded-xl object-contain bg-slate-900 p-1" />
                <div className="flex-1">
                  <div className="text-[11px] font-mono text-amber-400 font-bold">App {app.number} • {app.ageRange}</div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-300">{app.name}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ + Google Map */}
      <section className="py-14 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white">Liên hệ</h2>
            <p className="text-slate-300 flex gap-2"><MapPin className="w-5 h-5 text-amber-400 shrink-0" /> i2-35 KDC River Park, Võ Chí Công, P. Phước Long, TP.HCM</p>
            <p className="text-slate-300">Zalo / Hotline: <a href="https://zalo.me/84908095693" className="text-amber-300 font-bold hover:underline">+84 908095693</a></p>
            <p className="text-slate-300">Email: <a href="mailto:anhpob@gmail.com" className="text-amber-300 font-bold hover:underline">anhpob@gmail.com</a></p>
            <button
              onClick={() => openContact()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Gửi yêu cầu tư vấn
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-amber-400/30 shadow-xl">
            <iframe
              title="Bản đồ văn phòng Duy Anh Lab"
              src={MAP_EMBED}
              className="w-full h-80"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
