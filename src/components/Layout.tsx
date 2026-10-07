import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppItem } from '../data/appsData';
import { useApps } from '../lib/AppsContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { VideoTourModal } from './VideoTourModal';
import { ScreenshotGalleryModal } from './ScreenshotGalleryModal';
import { PwaGuideModal } from './PwaGuideModal';
import { ContactDrawer } from './ContactDrawer';

/** Các hành động dùng chung cho mọi trang (mở modal, drawer...) */
export interface LayoutActions {
  openVideo: (app: AppItem) => void;
  openGallery: (app: AppItem) => void;
  openPwaGuide: () => void;
  openContact: (appId?: string) => void;
}

export const Layout: React.FC = () => {
  const apps = useApps();
  const location = useLocation();
  const [activeVideoApp, setActiveVideoApp] = useState<AppItem | null>(null);
  const [activeGalleryApp, setActiveGalleryApp] = useState<AppItem | null>(null);
  const [isPwaGuideOpen, setIsPwaGuideOpen] = useState(false);
  const [contactAppId, setContactAppId] = useState<string | null>(null); // null = đóng

  // Đổi trang: cuộn lên đầu, hoặc tới #anchor nếu có (ví dụ /#comparison)
  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  const actions: LayoutActions = {
    openVideo: setActiveVideoApp,
    openGallery: setActiveGalleryApp,
    openPwaGuide: () => setIsPwaGuideOpen(true),
    openContact: (appId) => setContactAppId(appId ?? ''),
  };

  return (
    <div className="min-h-screen bg-[#07111E] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Navbar onOpenPwaGuide={actions.openPwaGuide} onOpenContactDrawer={() => actions.openContact()} />

      <main className="min-h-[60vh]">
        <Outlet context={actions} />
      </main>

      <Footer />

      <VideoTourModal
        app={activeVideoApp}
        onClose={() => setActiveVideoApp(null)}
        onSelectApp={(newApp) => setActiveVideoApp(newApp)}
        allApps={apps}
      />
      <ScreenshotGalleryModal app={activeGalleryApp} onClose={() => setActiveGalleryApp(null)} />
      <PwaGuideModal isOpen={isPwaGuideOpen} onClose={() => setIsPwaGuideOpen(false)} />
      <ContactDrawer
        isOpen={contactAppId !== null}
        defaultAppId={contactAppId || undefined}
        onClose={() => setContactAppId(null)}
      />
    </div>
  );
};
