import { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { store } from '../../config/store';
import { productFilters } from '../../data/catalog';
import ProductCard from '../shop/ProductCard';

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
          Preços de aparelhos novos e lacrados, sujeitos a alteração sem aviso prévio. Imagens ilustrativas.
          Disponibilidade de cores e capacidades confirmada no atendimento. Modelos sob encomenda chegam em até {store.deliveryDays} dias úteis.
        </p>
      </div>
    </section>
  );
};

export default ProductGrid;
