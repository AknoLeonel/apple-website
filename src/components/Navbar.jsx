import { bagImg, searchImg, pslogoImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  // Mapeamento manual para conectar os textos do menu às seções do site
  // Isso garante que o usuário seja guiado pelo funil
  const navLinks = {
    "Início": "#",
    "iPhones": "#models",        // Leva para a Tabela de Preços (Vitrine)
    "Acessórios": "#highlights", // Leva para os Destaques
    "Contato": "https://wa.me/5577999828813?text=Ol%C3%A1%20vim%20pelo%20site%20e%20preciso%20de%20ajuda!" // Link direto de conversão
  };

  return (
    // 'fixed' e 'backdrop-blur-md' dão o efeito de vidro fosco premium estilo Apple
    // O header fica fixo no topo para facilitar a navegação em qualquer momento da compra
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md transition-all duration-300 border-b border-white/5">
      <nav className="flex w-full screen-max-width">
        
        {/* LOGO: Clicar nela volta ao topo (Recomeço do Funil) */}
        <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity flex items-center">
             <img 
               src={pslogoImg} 
               alt="PS IPHONES - Voltar ao início" 
               width={90} 
               className="object-contain" 
             />
        </a>

        {/* MENU DESKTOP */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <a 
              key={nav} 
              href={navLinks[nav] || "#"}
              // Se for contato, abre em nova aba para não tirar o cliente do site
              target={nav === "Contato" ? "_blank" : "_self"}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-colors duration-300 font-medium tracking-wide"
            >
              {nav}
            </a>
          ))}
        </div>

        {/* ÍCONES (Visíveis em Mobile e Desktop) */}
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          {/* Lupa: Atalho rápido para ver os modelos (Busca visual) */}
          <a href="#models" className="cursor-pointer hover:text-white transition-colors" aria-label="Buscar Modelos">
            <img src={searchImg} alt="Buscar" width={18} height={18} />
          </a>
          
          {/* Sacola: Atalho rápido para Comprar (WhatsApp/Carrinho) */}
          {/* Aumenta a conversão permitindo compra rápida */}
          <a 
            href="https://wa.me/5577999828813?text=Ol%C3%A1%20quero%20finalizar%20uma%20compra!" 
            target="_blank" 
            rel="noreferrer"
            className="cursor-pointer hover:opacity-80 transition-transform active:scale-95"
            aria-label="Carrinho de Compras"
          >
            <img src={bagImg} alt="Carrinho" width={18} height={18} />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar