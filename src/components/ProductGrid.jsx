import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProductGrid = () => {
  const { products, inventory, location, addToCart, formatMoney } = useContext(ShopContext);

  return (
    <section id="models" className="common-padding bg-zinc space-y-12">
      <div className="screen-max-width">
        
        {/* Título e Subtítulo Focados em Reserva */}
        <div className="mb-12">
            <h1 id="heading" className="section-heading mb-4">
            Garanta seu <span className="text-white">Apple</span>.
            </h1>
            
            {/* --- NOVO: Banner de Prazo de Entrega --- */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-3.375h-5.843V3.093l-2.714 2.714" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Envios para {location.charAt(0).toUpperCase() + location.slice(1)}</h3>
                    <p className="text-gray-400 text-sm">
                        Trabalhamos com estoque rotativo. O prazo médio de entrega para pedidos feitos hoje é de <span className="text-blue-400 font-bold">até 7 dias úteis</span>. Garanta sua unidade antes que o lote acabe.
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const stock = inventory[location][product.id];
            const hasStock = stock.qty > 0;

            return (
              <div key={product.id} className="relative group bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden hover:border-blue-600/50 transition-all duration-500 flex flex-col">
                
                <div className="h-64 flex items-center justify-center relative mb-6">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                    
                    {/* Badge Alterada para "Últimas Unidades" ou "Encomenda" */}
                    <div className="absolute top-0 right-0">
                        {!hasStock ? (
                            <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold">
                                Lote Esgotado
                            </span>
                        ) : stock.qty < 3 ? (
                            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                ⚡ Restam {stock.qty} reservas
                            </span>
                        ) : (
                            <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold">
                                Disponível p/ Encomenda
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">{product.brand}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex flex-col mb-4">
                            <p className="text-xs text-gray-500 mb-1">Valor estimado (Seminovo)</p>
                            <span className="text-2xl font-bold text-white">{formatMoney(stock.price)}</span>
                            <span className="text-[10px] text-gray-500">Ou parcelado no cartão (Consulte taxas)</span>
                        </div>
                        
                        {/* Botão de Ação alterado para "Reservar" */}
                        <button 
                            onClick={() => addToCart(product.id)}
                            disabled={!hasStock}
                            className={`w-full py-3 rounded-full font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                                hasStock 
                                ? 'bg-white text-black hover:bg-blue-600 hover:text-white hover:scale-105' 
                                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            }`}
                        >
                            {hasStock ? (
                                <>
                                    <span>Solicitar Reserva</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                    </svg>
                                </>
                            ) : 'Indisponível'}
                        </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;