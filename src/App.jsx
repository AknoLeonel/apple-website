import React, { Suspense, lazy, useContext } from 'react'; 
import { ShopContext } from './context/ShopContext'; 

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel'; 
import AdminLogin from './components/AdminLogin'; // [NOVO] Importar Login

const Highlights = lazy(() => import('./components/Highlights'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Footer = lazy(() => import('./components/Footer'));

const SectionLoader = () => (
  <div className="w-full h-[30vh] flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  // Ler visão e autenticação
  const { view, isAuthenticated } = useContext(ShopContext);

  // --- LÓGICA DE PROTEÇÃO ---
  if (view === 'admin') {
    // Se está logado, mostra o Painel. Se não, mostra o Login.
    return isAuthenticated ? <AdminPanel /> : <AdminLogin />;
  }

  // --- MODO CLIENTE (LOJA) ---
  return (
    <main className="bg-black relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <Highlights />
        <ProductGrid />
        <Features />
        <HowItWorks />
        <Footer />
      </Suspense>

      <CheckoutModal />

      <a 
        href="https://wa.me/5577999828813?text=Ol%C3%A1%20gostaria%20de%20fazer%20meu%20or%C3%A7amento!"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 px-5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all hover:scale-110 animate-bounce-slow cursor-pointer font-bold group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="group-hover:animate-pulse">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

    </main>
  )
}

export default App;