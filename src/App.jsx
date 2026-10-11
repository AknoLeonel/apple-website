import { Suspense, lazy, useContext } from 'react';
import { ShopContext } from './context/ShopContext';

import Navbar from './components/layout/Navbar';
import WhatsAppFab from './components/layout/WhatsAppFab';
import Hero from './components/sections/Hero';
import CartDrawer from './components/shop/CartDrawer';

// Seções abaixo da dobra são carregadas sob demanda
const ProductGrid = lazy(() => import('./components/sections/ProductGrid'));
const Highlights = lazy(() => import('./components/sections/Highlights'));
const Features = lazy(() => import('./components/sections/Features'));
const Performance = lazy(() => import('./components/sections/Performance'));
const BuyAndFaq = lazy(() => import('./components/sections/BuyAndFaq'));
const Footer = lazy(() => import('./components/layout/Footer'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));

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
        <Performance />
        <BuyAndFaq />
        <Footer />
      </Suspense>

      <CartDrawer />
      <WhatsAppFab />
    </main>
  );
};

export default App;
