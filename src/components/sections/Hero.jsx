import { Suspense, lazy, useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShopContext } from '../../context/ShopContext';
import { store, whatsappLink } from '../../config/store';
import { WhatsAppIcon } from '../ui/Icons';

// Three.js só é baixado depois que o texto do topo já apareceu
const HeroScene = lazy(() => import('../three/HeroScene'));

const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

const Hero = () => {
  const { products, formatMoney } = useContext(ShopContext);
  const flagshipFrom = Math.min(...products.filter((p) => p.line === '18').map((p) => p.price));
  const webgl = typeof window !== 'undefined' && supportsWebGL();

  useGSAP(() => {
    gsap.fromTo('.hero-reveal', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.hero-canvas', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3 });
  }, []);

  return (
    <section id="inicio" className="relative w-full min-h-[100svh] bg-black overflow-hidden pt-20 lg:pt-16 flex items-center">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(232,116,47,0.18),transparent)]" />
        <div className="absolute left-[-15%] bottom-[-20%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(41,151,255,0.12),transparent)]" />
      </div>

      <div className="relative screen-max-width w-full px-5 sm:px-10 grid lg:grid-cols-[1fr_1.05fr] items-center gap-4">
        <div className="text-center lg:text-left pt-6 lg:pt-0 z-10">
          <p className="hero-reveal opacity-0 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#f0a46a]">
            Lançamento · Lacrado
          </p>
          <h1 className="hero-reveal opacity-0 mt-3 text-5xl sm:text-7xl xl:text-[88px] leading-[0.95] font-semibold tracking-tight text-gradient">
            iPhone 18
            <br />
            Pro Max
          </h1>
          <p className="hero-reveal opacity-0 mt-5 text-lg sm:text-xl text-gray-200 max-w-md mx-auto lg:mx-0">
            O mais novo da Apple já chegou na {store.name}. Novo, original e com garantia Apple.
          </p>
          <p className="hero-reveal opacity-0 mt-4 text-gray-200">
            A partir de <span className="text-white text-xl font-semibold">{formatMoney(flagshipFrom)}</span>
            <span className="block text-sm">ou em até {store.maxInstallments}x no cartão</span>
          </p>
          <div className="hero-reveal opacity-0 mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a href="#iphones" className="btn-primary">Ver todos os iPhones</a>
            <a
              href={whatsappLink('Olá! Vi no site o iPhone 18 Pro Max e quero saber mais.')}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <WhatsAppIcon size={16} /> Comprar pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-canvas opacity-0 relative h-[56svh] sm:h-[60svh] lg:h-[82svh] -mx-5 sm:mx-0">
          {webgl ? (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          ) : (
            <img src="/assets/products/ip17pm-512.webp" alt="iPhone Pro" className="h-full mx-auto object-contain" />
          )}
          <p className="absolute bottom-3 inset-x-0 text-center text-[11px] text-gray-100 pointer-events-none max-lg:hidden">
            Arraste para girar
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
