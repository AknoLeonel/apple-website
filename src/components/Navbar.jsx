import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { pslogoImg } from '../utils';
import { navLists, store } from '../constants';
import { BagIcon } from './Icons';

const Navbar = () => {
  const { location, setLocation, cart, toggleCart } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const storeSelect = (
    <label className="flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/10">
      <span className="text-[11px] text-gray-200 mr-2">Loja</span>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer"
        aria-label="Escolher loja"
      >
        {store.locations.map((l) => (
          <option key={l.id} value={l.id} className="bg-black text-white">
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b ${
        scrolled || menuOpen ? 'bg-black/80 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="screen-max-width flex items-center h-16 px-5 sm:px-10" aria-label="Principal">
        <a href="#inicio" className="flex items-center hover:opacity-80 transition-opacity" aria-label="PS IPHONES - início">
          <img src={pslogoImg} alt="PS IPHONES" width={84} height={50} className="object-contain h-10 w-auto" />
        </a>

        <div className="hidden md:block ml-6">{storeSelect}</div>

        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map((nav) => (
            <a
              key={nav.href}
              href={nav.href}
              className="px-4 text-sm text-gray-200 hover:text-white transition-colors"
            >
              {nav.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 max-md:ml-auto">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-white/10 transition"
            aria-label={`Abrir minha lista (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-5 pb-6 pt-2 flex flex-col gap-1 animate-fade-in">
          {navLists.map((nav) => (
            <a
              key={nav.href}
              href={nav.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-2xl font-semibold text-gray-100 hover:text-white border-b border-white/5"
            >
              {nav.label}
            </a>
          ))}
          <div className="pt-4">{storeSelect}</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
