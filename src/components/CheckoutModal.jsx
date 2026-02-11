import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const CheckoutModal = () => {
  const { cart, inventory, location, isCartOpen, toggleCart, removeFromCart, formatMoney, products } = useContext(ShopContext);
  const [customerName, setCustomerName] = useState('');
  
  // Mudamos de "Forma de Pagamento" para "Intenção de Pagamento"
  const [paymentMethod, setPaymentMethod] = useState('Pix (Preferencial)');

  if (!isCartOpen) return null;

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    const price = inventory[location][item.id].price;
    return { ...item, ...product, price };
  });

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (!customerName.trim()) return alert("Por favor, digite seu nome para o orçamento!");
    if (cartItems.length === 0) return alert("Selecione pelo menos um aparelho.");

    // MENSAGEM FOI REESCRITA PARA "ORÇAMENTO/ENCOMENDA"
    let msg = `*SOLICITAÇÃO DE RESERVA/ORÇAMENTO*\n`;
    msg += `----------------------------------\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    msg += `📍 *Cidade:* ${location.toUpperCase()}\n`;
    msg += `💰 *Pref. Pagamento:* ${paymentMethod}\n`;
    msg += `🚚 *Ciente do Prazo:* Sim (Até 7 dias úteis)\n\n`;
    msg += `*ITENS DESEJADOS:*\n`;

    cartItems.forEach(item => {
        msg += `📱 ${item.qty}x ${item.name} - ${item.specs}\n`;
        msg += `   (Valor ref: ${formatMoney(item.price)})\n`;
    });

    msg += `\n*VALOR TOTAL ESTIMADO: ${formatMoney(total)}*\n`;
    msg += `----------------------------------\n`;
    msg += `Gostaria de confirmar a disponibilidade e agendar a entrega.`;

    const phone = "5577999828813"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    
    window.open(url, '_blank');
    toggleCart();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={toggleCart}></div>

        <div className="relative bg-[#101010] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col max-h-[90vh] animate-fade-up">
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Lista de Interesse</h2>
                    <p className="text-xs text-gray-500">Solicitação de orçamento</p>
                </div>
                <button onClick={toggleCart} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full">✕</button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg mb-4">
                <p className="text-amber-500 text-xs font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                    Atenção ao Prazo
                </p>
                <p className="text-gray-400 text-[10px] mt-1">
                    Trabalhamos com encomendas. A entrega é realizada em até <strong>7 dias úteis</strong> após a confirmação.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        Sua lista está vazia.
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-14 h-14 bg-black rounded-lg p-1 flex-shrink-0">
                                <img src={item.image} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-blue-400 font-mono">
                                        {formatMoney(item.price)}
                                    </span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-400">Remover</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                    <div>
                        <label className="text-xs text-gray-500 uppercase font-bold ml-1">Seu Nome Completo</label>
                        <input 
                            type="text" 
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none mt-1 text-sm"
                            placeholder="Para identificarmos seu pedido"
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs text-gray-500 uppercase font-bold ml-1">Preferência de Pagamento</label>
                        <select 
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none mt-1 text-sm cursor-pointer"
                        >
                            <option>Pix (Maior Desconto)</option>
                            <option>Cartão de Crédito</option>
                            <option>Entrada + Parcelas</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-400 text-sm">Total Estimado:</span>
                        <span className="text-xl font-bold text-white">{formatMoney(total)}</span>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Falar com Consultor</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/></svg>
                    </button>
                    <p className="text-[10px] text-center text-gray-600">Ao clicar, você será redirecionado para o WhatsApp.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default CheckoutModal;