import { Suspense, lazy, useContext } from 'react';
import { ShopContext } from './context/ShopContext';
import { whatsappLink } from './constants';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CheckoutModal from './components/CheckoutModal';
import { WhatsAppIcon } from './components/Icons';

const ProductGrid = lazy(() => import('./components/ProductGrid'));
const Highlights = lazy(() => import('./components/Highlights'));
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const BuyAndFaq = lazy(() => import('./components/BuyAndFaq'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));

const SectionLoader = () => (
  <div className="w-full h-[30vh] flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const { view, isAuthenticated } = useContext(ShopContext);

  if (view === 'admin') {
    return (
      <Suspense fallback={<SectionLoader />}>
        {isAuthenticated ? <AdminPanel /> : <AdminLogin />}
      </Suspense>
    );
  }

  return (
    <main className="bg-black relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <ProductGrid />
        <Highlights />
        <Features />
        <HowItWorks />
        <BuyAndFaq />
        <Footer />
      </Suspense>

      <CheckoutModal />

      <a
        href={whatsappLink('Olá! Gostaria de fazer meu orçamento.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 px-4 sm:px-5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 font-semibold"
      >
        <WhatsAppIcon size={22} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
};

export default App;
