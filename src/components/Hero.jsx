import { useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShopContext } from '../context/ShopContext';
import { store, whatsappLink } from '../constants';
import PhoneArt from './PhoneArt';
import { WhatsAppIcon } from './Icons';

const Hero = () => {
  const { products, formatMoney } = useContext(ShopContext);

  const flagship = products.filter((p) => p.line === '18');
  const flagshipFrom = Math.min(...flagship.map((p) => p.price));
  const cheapest = Math.min(...products.map((p) => p.price));

  useGSAP(() => {
    gsap.fromTo('.hero-reveal', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo('.hero-phone', { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
    gsap.to('.hero-phones', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true } });
  }, []);

  return (
    <section id="inicio" className="relative w-full min-h-[100svh] bg-black overflow-hidden pt-24 pb-10 flex flex-col">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(232,116,47,0.22),transparent)] blur-2xl" />
        <div className="absolute left-[15%] top-[70%] w-[500px] h-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(41,151,255,0.16),transparent)] blur-2xl" />
      </div>

      <div className="relative screen-max-width px-5 sm:px-10 w-full flex flex-col items-center text-center">
        <p className="hero-reveal opacity-0 text-sm font-semibold tracking-[0.2em] uppercase text-[#f0a46a]">Lançamento · Lacrado</p>
        <h1 className="hero-reveal opacity-0 mt-3 text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-gradient">
          iPhone 18 Pro Max
        </h1>
        <p className="hero-reveal opacity-0 mt-4 text-lg sm:text-2xl text-gray-200 max-w-2xl">
          O mais novo da Apple já está na {store.name}. Novo, original e com garantia Apple.
        </p>
        <p className="hero-reveal opacity-0 mt-3 text-base sm:text-lg text-gray-100">
          A partir de <span className="text-white font-semibold">{formatMoney(flagshipFrom)}</span> ou em até {store.maxInstallments}x no cartão
        </p>

        <div className="hero-reveal opacity-0 mt-7 flex flex-wrap items-center justify-center gap-3">
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

      <div className="hero-phones relative flex-1 flex items-end justify-center mt-10 min-h-[300px]">
        <div className="hero-phone opacity-0 w-[26vw] max-w-[190px] -mr-[6vw] sm:-mr-10 rotate-[-10deg] translate-y-8">
          <PhoneArt design="plateau" color="#33415c" className="w-full drop-shadow-2xl" title="iPhone 17 Pro Azul-profundo" />
        </div>
        <div className="hero-phone opacity-0 relative z-10 w-[34vw] max-w-[240px]">
          <PhoneArt design="plateau" color="#2b2b30" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" title="iPhone 18 Pro Max" />
        </div>
        <div className="hero-phone opacity-0 w-[26vw] max-w-[190px] -ml-[6vw] sm:-ml-10 rotate-[10deg] translate-y-8">
          <PhoneArt design="plateau" color="#e8742f" className="w-full drop-shadow-2xl" title="iPhone 17 Pro Laranja-cósmico" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </div>

      <p className="relative z-30 text-center text-sm text-gray-100 -mt-6">
        iPhones lacrados a partir de <span className="text-white font-semibold">{formatMoney(cheapest)}</span>
      </p>
    </section>
  );
};

export default Hero;
