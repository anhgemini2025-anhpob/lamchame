import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Download, Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { useApps } from '../lib/AppsContext';

interface NavbarProps {
  onOpenPwaGuide: () => void;
  onOpenContactDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPwaGuide, onOpenContactDrawer }) => {
  const LAMCHAME_APPS = useApps();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07111E]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl shadow-black/40 py-2.5'
          : 'bg-[#07111E]/80 backdrop-blur-sm border-b border-slate-800/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="p-1 rounded-xl bg-[#0A192F] border border-amber-400/40 shadow-md group-hover:border-amber-400 transition-colors">
              <img
                src="/brand/logo.jpg"
                alt="DUY ANH LAB • digital"
                className="h-9 w-auto object-contain rounded"
              />
            </div>
            <div className="hidden xs:block border-l border-slate-700/60 pl-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wide">
                  DUY ANH LAB
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300/90 border border-amber-400/30">
                  Parenting Series
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Hệ Sinh Thái 4 App Làm Cha Mẹ (0–18 Tuổi)
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink to="/" end className={({ isActive }) => `px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors ${isActive ? 'text-amber-300 bg-[#0E223D]' : 'text-slate-300 hover:text-amber-300 hover:bg-[#0E223D]'}`}>
              Trang Chủ
            </NavLink>
            <NavLink to="/ve-chung-toi" className={({ isActive }) => `px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors ${isActive ? 'text-amber-300 bg-[#0E223D]' : 'text-slate-300 hover:text-amber-300 hover:bg-[#0E223D]'}`}>
              Về Chúng Tôi
            </NavLink>
            {LAMCHAME_APPS.map((app) => (
              <NavLink
                key={app.id}
                to={`/app/${app.id}`}
                title={app.name}
                className={({ isActive }) => `px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${isActive ? 'text-amber-300 bg-[#0E223D]' : 'text-slate-300 hover:text-amber-300 hover:bg-[#0E223D]'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>App {app.number}</span>
              </NavLink>
            ))}
            <Link
              to="/#comparison"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-300 hover:text-amber-300 hover:bg-[#0E223D] transition-colors"
            >
              So Sánh
            </Link>
            <a
              href="https://ungdung.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Kho App Toàn Diện</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPwaGuide}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#0A192F] border border-amber-400/30 hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
              title="Hướng dẫn cài đặt ứng dụng về màn hình điện thoại dùng ngoại tuyến"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Cài Đặt PWA</span>
            </button>

            <button
              onClick={onOpenContactDrawer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Tư Vấn &amp; Trao Đổi</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#0A192F] border border-slate-700 text-slate-300 hover:text-amber-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 pb-2 space-y-1.5 animate-fadeIn">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-[#0E223D] hover:text-amber-300">
              Trang Chủ
            </Link>
            <Link to="/ve-chung-toi" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-[#0E223D] hover:text-amber-300">
              Về Chúng Tôi
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 px-3 py-1 font-bold">
              4 Ứng Dụng Trong Hệ Sinh Thái
            </div>
            {LAMCHAME_APPS.map((app) => (
              <Link
                key={app.id}
                to={`/app/${app.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-[#0E223D] hover:text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold flex items-center justify-center">
                    {app.number}
                  </span>
                  <span>{app.name}</span>
                </div>
                <span className="text-xs text-slate-400">{app.ageRange}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPwaGuide();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0A192F] border border-amber-400/40 text-amber-300 text-xs font-bold"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Xem Hướng Dẫn Cài Đặt PWA Ngoại Tuyến</span>
              </button>
              
              <a
                href="https://ungdung.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 text-xs text-slate-400 hover:text-amber-300 flex items-center justify-center gap-1"
              >
                <span>Xem toàn bộ kho ứng dụng tại ungdung.vercel.app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
