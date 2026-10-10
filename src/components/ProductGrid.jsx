import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { productFilters, stockStatus, store, whatsappLink } from '../constants';
import PhoneArt from './PhoneArt';
import { WhatsAppIcon } from './Icons';

const ProductCard = ({ product }) => {
  const { getStatus, addToCart, formatMoney, location } = useContext(ShopContext);
  const status = getStatus(product.id);
  const unavailable = status === 'esgotado';
  const storeLabel = store.locations.find((l) => l.id === location)?.label;

  return (
    <article className="group relative flex flex-col rounded-3xl bg-[#161617] border border-white/[0.06] hover:border-white/15 transition-colors duration-300 overflow-hidden">
      <div className="relative h-72 flex items-center justify-center pt-8 overflow-hidden">
        <div
          className="absolute inset-x-0 top-6 mx-auto w-56 h-56 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: product.body }}
          aria-hidden="true"
        />
        <PhoneArt
          design={product.design}
          color={product.body}
          title={product.model}
          className="relative h-60 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg]"
        />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
          {product.tag ? (
            <span className="text-[11px] font-semibold text-[#f0a46a] bg-[#e8742f]/10 border border-[#e8742f]/25 px-2.5 py-1 rounded-full">
              {product.tag}
            </span>
          ) : <span />}
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${stockStatus[status].className}`}>
            {stockStatus[status].label}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-200">Novo · Lacrado</span>
        </div>
        <h3 className="mt-1 text-2xl font-semibold text-white">
          {product.model} <span className="text-gray-200 font-normal">{product.storage}</span>
        </h3>

        <ul className="mt-4 space-y-1.5 text-sm text-gray-200">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-blue mt-[3px]" aria-hidden="true">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {product.colors.length > 0 ? (
          <div className="mt-4 flex items-center gap-1.5" aria-label="Cores">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ background: c.hex }}
              />
            ))}
            <span className="ml-1 text-[11px] text-gray-100">cores sujeitas a disponibilidade</span>
          </div>
        ) : (
          <p className="mt-4 text-[11px] text-gray-100">Consulte as cores disponíveis</p>
        )}

        <div className="mt-auto pt-6">
          <div className="border-t border-white/10 pt-5">
            <p className="text-3xl font-semibold text-white tracking-tight">{formatMoney(product.price)}</p>
            <p className="text-xs text-gray-200 mt-1">
              ou em até {store.maxInstallments}x no cartão · desconto no Pix
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => addToCart(product.id)}
              disabled={unavailable}
              className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                unavailable
                  ? 'bg-white/5 text-gray-100 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-blue hover:text-white active:scale-[0.98]'
              }`}
            >
              {unavailable ? 'Esgotado' : 'Adicionar à lista'}
            </button>
            <a
              href={whatsappLink(
                `Olá! Tenho interesse no ${product.model} ${product.storage} lacrado (${formatMoney(product.price)}) na loja de ${storeLabel}. Está disponível?`
              )}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 hover:bg-[#25D366] hover:text-white transition"
              aria-label={`Perguntar sobre o ${product.model} ${product.storage} no WhatsApp`}
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const ProductGrid = () => {
  const { products } = useContext(ShopContext);
  const [filter, setFilter] = useState('todos');

  const visible = filter === 'todos' ? products : products.filter((p) => p.line === filter);

  return (
    <section id="iphones" className="common-padding bg-zinc scroll-mt-16">
      <div className="screen-max-width">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-blue">Vitrine atualizada</p>
            <h2 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
              iPhones lacrados.
              <span className="block text-gray">Escolha o seu.</span>
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0" role="tablist" aria-label="Filtrar por linha">
            {productFilters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition ${
                  filter === f.id
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-200 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-100 text-center max-w-2xl mx-auto">
          Preços de aparelhos novos e lacrados, sujeitos a alteração sem aviso prévio.
          Disponibilidade de cores e capacidades confirmada no atendimento. Modelos sob encomenda chegam em até {store.deliveryDays} dias úteis.
        </p>
      </div>
    </section>
  );
};

export default ProductGrid;
