import { useState } from 'react';
import { buySteps, faqs, store, whatsappLink } from '../constants';
import { WhatsAppIcon } from './Icons';

const BuyAndFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section id="como-comprar" className="common-padding bg-zinc scroll-mt-16">
        <div className="screen-max-width">
          <p className="text-sm font-semibold text-blue">Como comprar</p>
          <h2 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
            Três passos <span className="text-gray">até o seu iPhone.</span>
          </h2>

          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {buySteps.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-[#161617] border border-white/[0.06] p-7">
                <span className="text-5xl font-semibold text-white/15">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-200 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="duvidas" className="common-padding bg-black scroll-mt-16">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <p className="text-sm font-semibold text-blue">Dúvidas frequentes</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
              Ficou alguma dúvida?
            </h2>
            <p className="mt-4 text-gray-200">
              Fale direto com a nossa equipe pelo WhatsApp {store.whatsappDisplay}.
            </p>
            <a
              href={whatsappLink('Olá! Tenho uma dúvida sobre os iPhones do site.')}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-6"
            >
              <WhatsAppIcon size={16} /> Tirar dúvida
            </a>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg font-medium text-white hover:text-blue transition-colors"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                    >
                      {item.q}
                      <span className={`text-2xl font-light text-gray-200 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <p className="overflow-hidden text-gray-200 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BuyAndFaq;
