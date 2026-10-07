import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppsProvider } from './lib/AppsContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AppDetailPage } from './pages/AppDetailPage';
import { AdminPage } from './pages/AdminPage';

const NotFound = () => (
  <div className="pt-40 pb-24 text-center px-4">
    <h1 className="text-3xl font-black text-white mb-3">404 • Không tìm thấy trang</h1>
    <Link to="/" className="text-amber-300 font-bold hover:underline">← Về Trang Chủ</Link>
  </div>
);

/**
 * Sơ đồ trang:
 *  /               Trang Chủ
 *  /ve-chung-toi   Về Chúng Tôi
 *  /app/:slug      Chi tiết sản phẩm (4 app)
 *  /admin          Quản trị (đăng nhập Supabase Auth)
 */
export function App() {
  return (
    <AppsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ve-chung-toi" element={<AboutPage />} />
            <Route path="/app/:slug" element={<AppDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppsProvider>
  );
}

export default App;
