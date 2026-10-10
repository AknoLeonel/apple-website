import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { navLists, store, whatsappLink } from '../constants';
import { pslogoImg } from '../utils';
import { WhatsAppIcon } from './Icons';

const Footer = () => {
  const { setView } = useContext(ShopContext);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc border-t border-white/10 pt-14 pb-28 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={pslogoImg} alt={store.name} width={120} height={72} className="h-14 w-auto object-contain" loading="lazy" />
            <p className="mt-4 text-sm text-gray-200 max-w-xs">
              iPhones novos e lacrados com garantia Apple. Realizando sonhos desde {store.since}.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-100">Navegue</h3>
            <ul className="mt-4 space-y-2">
              {navLists.map((nav) => (
                <li key={nav.href}>
                  <a href={nav.href} className="text-sm text-gray-200 hover:text-white transition-colors">{nav.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-100">Atendimento</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li>Lojas em {store.locations.map((l) => l.label).join(' e ')}</li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/20 hover:text-white"
                >
                  {store.address}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Olá! Vim pelo site da PS IPHONES.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <WhatsAppIcon size={14} /> {store.whatsappDisplay}
                </a>
              </li>
              <li>Também trabalhamos com Samsung, Xiaomi e Realme. Consulte.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 my-8 h-px w-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-gray-100">
          <p>© {year} {store.name}. Todos os direitos reservados.</p>
          <p className="flex items-center gap-3">
            <span>Apple e iPhone são marcas da Apple Inc. Loja independente, sem vínculo com a Apple.</span>
            <button onClick={() => setView('admin')} className="text-gray-300 hover:text-gray-200" aria-label="Área administrativa">
              ·
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
