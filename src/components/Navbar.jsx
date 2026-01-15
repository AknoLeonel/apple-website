import { bagImg, searchImg, pslogoImg } from '../utils'; // 1. Adicionamos pslogoImg aqui
import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        
        {/* 2. MUDANÇA: Trocamos o texto pela Imagem da Logo */}
        <div className="cursor-pointer hover:opacity-80 transition-all flex items-center">
             <img 
               src={pslogoImg} 
               alt="PS IPHONES" 
               width={100} // Ajuste esse tamanho se ficar muito grande ou pequeno
               className="object-contain" 
             />
        </div>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar