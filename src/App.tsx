import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PricingPage } from './pages/public/PricingPage';
import { OurWorkPage } from './pages/public/OurWorkPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { ClientLayout } from './pages/client/ClientLayout';
import { AdminLayout } from './pages/admin/AdminLayout';
import { StrategyCallModal } from './components/StrategyCallModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { VoiceStrategyModal } from './components/VoiceStrategyModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { role, publicPage, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#080D16] text-white flex flex-col font-sans selection:bg-[#E5B94F] selection:text-black antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 animate-bounce duration-300">
          <div className="px-4 py-3 rounded-xl bg-[#121A27] border border-[#E5B94F]/40 shadow-2xl text-xs font-semibold text-white flex items-center space-x-2.5 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#E5B94F] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Role-based Router */}
      {role === 'PUBLIC' && (
        <>
          <Navbar />
          <main className="flex-1">
            {publicPage === 'home' && <HomePage />}
            {publicPage === 'services' && <ServicesPage />}
            {publicPage === 'pricing' && <PricingPage />}
            {publicPage === 'our-work' && <OurWorkPage />}
            {publicPage === 'about' && <AboutPage />}
            {publicPage === 'contact' && <ContactPage />}
          </main>
          <Footer />
        </>
      )}

      {role === 'CLIENT' && <ClientLayout />}

      {role === 'ADMIN' && <AdminLayout />}

      {/* Global Modals & Portals */}
      <StrategyCallModal />
      <ProjectDetailModal />
      <VoiceStrategyModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
