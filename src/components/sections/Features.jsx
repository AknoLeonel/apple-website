import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { store, whatsappLink } from '../../config/store';
import { benefits } from '../../data/content';
import { BenefitIcon, WhatsAppIcon } from '../ui/Icons';

const Features = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.benefit-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '#vantagens', start: 'top 75%' } }
    );
  }, []);

  return (
    <section id="vantagens" className="common-padding bg-zinc scroll-mt-16">
      <div className="screen-max-width">
        <p className="text-sm font-semibold text-blue">Vantagens</p>
        <h2 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
          Comprar seu iPhone novo
          <span className="text-gray"> nunca foi tão tranquilo.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="benefit-card rounded-3xl bg-[#161617] border border-white/[0.06] p-7">
              <div className="w-12 h-12 rounded-2xl bg-blue/10 text-blue flex items-center justify-center">
                <BenefitIcon name={b.icon} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#1c2a44] via-[#151b28] to-[#161617] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-4xl font-semibold text-white">Troque seu iPhone usado.</h3>
            <p className="mt-2 text-gray-200 max-w-xl">
              Mande o modelo, a capacidade e o estado do seu aparelho. A gente avalia e o valor vira entrada no seu iPhone novo.
            </p>
          </div>
          <a
            href={whatsappLink('Olá! Quero avaliar meu iPhone usado para dar de entrada em um novo.')}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0"
          >
            <WhatsAppIcon size={16} /> Avaliar meu usado
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-100">
          {store.name} · realizando sonhos desde {store.since}.
        </p>
      </div>
    </section>
  );
};

export default Features;
