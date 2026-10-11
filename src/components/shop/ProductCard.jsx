import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { store, whatsappLink } from '../../config/store';
import { stockStatus } from '../../data/catalog';
import ProductImage from '../ui/ProductImage';
import { WhatsAppIcon } from '../ui/Icons';

const ProductCard = ({ product }) => {
  const { getStatus, addToCart, formatMoney, location } = useContext(ShopContext);
  const status = getStatus(product.id);
  const unavailable = status === 'esgotado';
  const storeLabel = store.locations.find((l) => l.id === location)?.label;

  return (
    <article className="group relative flex flex-col rounded-3xl bg-[#161617] border border-white/[0.06] hover:border-white/15 transition-colors duration-300 overflow-hidden">
      <div className="relative h-80 flex items-center justify-center pt-10 overflow-hidden">
        <div
          className="absolute inset-x-0 top-10 mx-auto w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: product.body }}
          aria-hidden="true"
        />
        <ProductImage
          product={product}
          className="relative h-[17.5rem] w-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]"
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

export default ProductCard;
