import { useContext } from 'react'; // Importar hook
import { ShopContext } from '../context/ShopContext'; // Importar nosso contexto

import { bagImg, searchImg, pslogoImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  // Acessar os dados do ShopContext (Adicionado setView para o botão Admin)
  const { location, setLocation, cart, toggleCart, setView } = useContext(ShopContext);

  // Calcular total de itens
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md transition-all duration-300 border-b border-white/5">
      <nav className="flex w-full screen-max-width items-center">
        
        <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity flex items-center">
             <img src={pslogoImg} alt="Logo" width={90} className="object-contain" />
        </a>

        {/* --- NOVO: Seletor de Cidade --- */}
        <div className="hidden md:flex ml-8 items-center bg-white/10 rounded-full px-3 py-1 border border-white/10">
            <span className="text-xs text-gray-400 mr-2">LOJA:</span>
            <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-white text-xs font-bold uppercase outline-none cursor-pointer"
            >
                <option value="barreiras" className="bg-black text-white">Barreiras</option>
                <option value="formosa" className="bg-black text-white">Formosa</option>
            </select>
        </div>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <a key={nav} href="#" className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-colors duration-300 font-medium tracking-wide">
              {nav}
            </a>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} className="cursor-pointer hover:opacity-80" />
          
          {/* --- NOVO: Ícone da Sacola Funcional --- */}
          <div onClick={toggleCart} className="relative cursor-pointer hover:opacity-80 transition-transform active:scale-95 group">
            <img src={bagImg} alt="bag" width={18} height={18} />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                </span>
            )}
          </div>

          {/* --- NOVO: BOTÃO ADMIN (ESCUDO) --- */}
          {/* Clique aqui para entrar no painel de controle */}
          <button 
            onClick={() => setView('admin')}
            className="text-gray-500 hover:text-white transition-colors p-1"
            title="Acesso Administrativo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </button>

        </div>
      </nav>
    </header>
  )
}

export default Navbar