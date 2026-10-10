import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { store, whatsappLink } from '../constants';
import PhoneArt from './PhoneArt';
import { WhatsAppIcon } from './Icons';

const paymentOptions = ['Pix (à vista com desconto)', `Cartão de crédito (até ${store.maxInstallments}x)`, 'Entrada + parcelas', 'Usado na troca + diferença'];

const CheckoutModal = () => {
  const { cart, products, location, isCartOpen, toggleCart, changeQty, removeFromCart, clearCart, formatMoney } = useContext(ShopContext);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
  const [nameError, setNameError] = useState(false);

  // Fecha com Esc e trava o scroll da página enquanto aberto
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => e.key === 'Escape' && toggleCart();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isCartOpen, toggleCart]);

  if (!isCartOpen) return null;

  const storeLabel = store.locations.find((l) => l.id === location)?.label;
  const cartItems = cart
    .map((item) => ({ ...item, ...products.find((p) => p.id === item.id) }))
    .filter((item) => item.model);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }

    let msg = `*PEDIDO PELO SITE — ${store.name}*\n`;
    msg += `----------------------------------\n`;
    msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    msg += `📍 *Loja:* ${storeLabel}\n`;
    msg += `💰 *Pagamento:* ${paymentMethod}\n\n`;
    msg += `*ITENS (novos e lacrados):*\n`;
    cartItems.forEach((item) => {
      msg += `📱 ${item.qty}x ${item.model} ${item.storage} — ${formatMoney(item.price)}\n`;
    });
    msg += `\n*TOTAL: ${formatMoney(total)}*\n`;
    msg += `----------------------------------\n`;
    msg += `Quero confirmar cor e disponibilidade.`;

    const url = whatsappLink(msg);
    if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion();
    window.open(url, '_blank', 'noopener');
    clearCart();
    toggleCart();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={toggleCart} />

      <div className="relative bg-[#121213] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col max-h-[92vh] animate-fade-up">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 id="cart-title" className="text-xl font-semibold text-white">Minha lista</h2>
            <p className="text-xs text-gray-200">Loja de {storeLabel} · enviamos tudo pelo WhatsApp</p>
          </div>
          <button onClick={toggleCart} className="w-9 h-9 flex items-center justify-center text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-full" aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-5 pr-1">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-200">Sua lista está vazia.</p>
              <a href="#iphones" onClick={toggleCart} className="inline-block mt-4 text-blue hover:underline text-sm">
                Ver iPhones
              </a>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white/[0.04] rounded-2xl border border-white/5">
                <div className="w-12 h-16 flex items-center justify-center flex-shrink-0">
                  <PhoneArt design={item.design} color={item.body} title={item.model} className="h-16 w-auto" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{item.model} {item.storage}</h4>
                  <p className="text-sm text-gray-200">{formatMoney(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-sm" aria-label="Diminuir quantidade">−</button>
                      <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-sm" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-300">Remover</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div>
              <label htmlFor="cart-name" className="text-xs text-gray-200 font-semibold ml-1">Seu nome</label>
              <input
                id="cart-name"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setNameError(false);
                }}
                autoComplete="name"
                className={`w-full bg-black/50 border ${nameError ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white focus:border-blue outline-none mt-1 text-sm`}
                placeholder="Para identificarmos seu pedido"
              />
              {nameError && <p className="text-red-400 text-xs mt-1 ml-1">Digite seu nome para continuar.</p>}
            </div>

            <div>
              <label htmlFor="cart-payment" className="text-xs text-gray-200 font-semibold ml-1">Forma de pagamento</label>
              <select
                id="cart-payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue outline-none mt-1 text-sm cursor-pointer"
              >
                {paymentOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-baseline py-2">
              <span className="text-gray-200 text-sm">Total</span>
              <span className="text-2xl font-semibold text-white">{formatMoney(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <WhatsAppIcon size={18} /> Enviar pedido no WhatsApp
            </button>
            <p className="text-[11px] text-center text-gray-100">
              Sem pagamento no site. Um consultor confirma cor, disponibilidade e condições.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
