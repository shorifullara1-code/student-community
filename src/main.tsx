import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './index.css';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import GenericPage from './pages/public/GenericPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminNotices from './pages/admin/AdminNotices';
import AdminLeaders from './pages/admin/AdminLeaders';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<GenericPage title="আমাদের সম্পর্কিত" contentKey="aboutText" />} />
            <Route path="committees" element={<GenericPage title="কমিটি সমূহ" />} />
            <Route path="projects" element={<GenericPage title="প্রকল্পসমূহ" />} />
            <Route path="contact" element={<GenericPage title="যোগাযোগ" />} />
            <Route path="gallery" element={<GenericPage title="গ্যালারি" />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="leaders" element={<AdminLeaders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
);
