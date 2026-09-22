import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/pages/HomePage';
import EstoquePage from '@/pages/EstoquePage';
import VehicleDetailPage from '@/pages/VehicleDetailPage';
import SobrePage from '@/pages/SobrePage';
import ContatoPage from '@/pages/ContatoPage';
import NotFoundPage from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estoque" element={<EstoquePage />} />
          <Route path="/veiculos/:slug" element={<VehicleDetailPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
