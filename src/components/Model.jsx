import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { yellowImg, blueImg, whiteImg, blackImg } from "../utils";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// PERFORMANCE: Dados estáticos movidos para fora do componente para evitar recriação em cada render
const phones = [
  // --- LINHA IPHONE 16 & 15 (PREMIUM) ---
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    desc: "O lançamento mais poderoso. Semi-novo.",
    price: "R$ 6.799,99",
    img: blackImg, 
  },
  {
    id: 2,
    name: "iPhone 16 Pro 128GB",
    desc: "Inteligência Apple e poder extremo.",
    price: "R$ 4.999,99",
    img: whiteImg,
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max 256GB",
    desc: "Titânio Aeroespacial. USB-C.",
    price: "R$ 5.300,00",
    img: blueImg, 
  },
  {
    id: 4,
    name: "iPhone 15 Pro 128GB",
    desc: "Desempenho Pro em tamanho ideal.",
    price: "R$ 4.599,99",
    img: yellowImg, 
  },
  {
    id: 5,
    name: "iPhone 15 128GB",
    desc: "Dynamic Island e câmera de 48MP.",
    price: "R$ 3.699,99",
    img: blueImg,
  },
  // --- LINHA IPHONE 14 ---
  {
    id: 6,
    name: "iPhone 14 Pro Max",
    desc: "Tela Grande. Bateria Gigante.",
    price: "R$ 4.299,99",
    img: blackImg,
  },
  {
    id: 7,
    name: "iPhone 14 Pro 128GB",
    desc: "Ilha Dinâmica. Semi-novo impecável.",
    price: "R$ 3.799,99",
    img: blackImg,
  },
  {
    id: 8,
    name: "iPhone 14 256GB",
    desc: "Muito espaço e câmeras incríveis.",
    price: "R$ 3.299,99",
    img: whiteImg, 
  },
  {
    id: 9,
    name: "iPhone 14 128GB",
    desc: "O queridinho do momento.",
    price: "R$ 2.899,99",
    img: blueImg,
  },
  // --- LINHA IPHONE 13 ---
  {
    id: 10,
    name: "iPhone 13 Pro Max",
    desc: "Tela ProMotion 120Hz.",
    price: "R$ 3.699,99",
    img: blueImg, 
  },
  {
    id: 11,
    name: "iPhone 13 Pro 128GB",
    desc: "Câmeras Pro. Aço Inoxidável.",
    price: "R$ 2.999,99",
    img: blackImg, 
  },
  {
    id: 12,
    name: "iPhone 13 128GB",
    desc: "Modo Cinema. Bateria duradoura.",
    price: "R$ 2.550,00",
    img: whiteImg,
  },
  // --- LINHA IPHONE 12 & 11 (CUSTO BENEFÍCIO) ---
  {
    id: 13,
    name: "iPhone 12 Pro Max",
    desc: "O maior da família 12.",
    price: "R$ 2.699,99",
    img: blueImg, 
  },
  {
    id: 14,
    name: "iPhone 12 Pro 128GB",
    desc: "Acabamento Premium.",
    price: "R$ 2.399,99",
    img: blackImg,
  },
  {
    id: 15,
    name: "iPhone 12 128GB",
    desc: "O primeiro com 5G da Apple.",
    price: "R$ 2.100,00",
    img: whiteImg,
  },
  {
    id: 16,
    name: "iPhone 12 64GB",
    desc: "Compacto e poderoso.",
    price: "R$ 2.000,00",
    img: blueImg,
  },
  {
    id: 17,
    name: "iPhone 11 128GB",
    desc: "O clássico que nunca sai de moda.",
    price: "R$ 1.799,99",
    img: yellowImg,
  },
  {
    id: 18,
    name: "iPhone 11 64GB",
    desc: "Melhor preço para começar no iOS.",
    price: "R$ 1.499,99",
    img: blackImg,
  },
];

// Duplicamos a lista para simular scroll infinito visualmente
const infinitePhones = [...phones, ...phones];

const Model = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useGSAP(() => {
    // Animação de entrada do título
    gsap.to('#heading', { 
      y: 0, 
      opacity: 1, 
      duration: 1,
      scrollTrigger: {
        trigger: '#models', // Trigger ajustado para a seção
        start: 'top 80%',
      }
    })

    // Animação escalonada dos cards (efeito cascata)
    gsap.from('.phone-card', { 
        y: 100, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.05,
        clearProps: "all",
        scrollTrigger: {
            trigger: '.carousel-container',
            start: 'top 85%', // Começa a animar um pouco antes
        }
    })
  }, []);

  // --- Lógica de Mouse Drag (Desktop) ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    // ID "models" adicionado para linkar com o menu e highlights
    <section id="models" className="common-padding relative z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black overflow-hidden">
      
      <div className="screen-max-width">
        {/* SEO: H2 para hierarquia correta */}
        <h2 id="heading" className="section-heading mb-4 text-center text-white opacity-0 translate-y-10">
          Tabela de Preços
        </h2>
        <p className="text-gray-400 text-center mb-10 text-sm font-medium">
          Todos os aparelhos são semi-novos, rigorosamente revisados e com garantia PS IPHONES.
        </p>

        <div className="flex flex-col items-center carousel-container">
          
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // MUDANÇA: Adicionadas classes para esconder scrollbar em todos os browsers
            // [&::-webkit-scrollbar]:hidden -> Chrome, Safari, Opera
            // [-ms-overflow-style:'none'] -> IE e Edge
            // [scrollbar-width:'none'] -> Firefox
            className={`w-full flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-5 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x'} active:cursor-grabbing`}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            
            {infinitePhones.map((phone, index) => (
              <div 
                key={`${phone.id}-${index}`} 
                className="phone-card relative flex-shrink-0 w-[85vw] md:w-[300px] 
                  bg-zinc-900/60 backdrop-blur-md border border-white/10 
                  rounded-3xl p-6 snap-center transition-all duration-300 group hover:border-blue/50 hover:bg-zinc-800/80 select-none shadow-lg"
              >
                {/* Brilho no topo do card */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue/50 to-transparent opacity-50"></div>

                {/* Tag de "Semi-novo" */}
                <div className="absolute top-4 right-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 backdrop-blur-sm">
                  <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Semi-novo</p>
                </div>

                {/* Imagem do Produto */}
                <div className="w-full h-56 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-black/30 shadow-inner mt-4 relative">
                    {/* Efeito de brilho atrás do celular */}
                    <div className="absolute inset-0 bg-blue/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={phone.img} 
                      alt={`Comprar ${phone.name}`} 
                      loading="lazy" 
                      className="h-[85%] w-auto object-contain drop-shadow-2xl z-10 group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out will-change-transform pointer-events-none" 
                    />
                </div>

                {/* Informações */}
                <div className="text-center relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{phone.name}</h3>
                    <p className="text-gray-400 text-xs mb-4 font-medium h-8 flex items-center justify-center line-clamp-2">
                        {phone.desc}
                    </p>
                    
                    <div className="my-3 w-full h-[1px] bg-white/5"></div>
                    
                    <p className="text-2xl font-bold text-white mb-5 tracking-wide">{phone.price}</p>
                    
                    {/* Botão de Conversão Direta */}
                    <a 
                        href={`https://wa.me/5577999828813?text=Ol%C3%A1%20gostaria%20de%20fazer%20meu%20or%C3%A7amento!,%20vi%20o%20*${phone.name}*%20por%20*${phone.price}*%20no%20site%20e%20tenho%20interesse!`} 
                        target="_blank"
                        rel="noreferrer"
                        onMouseDown={(e) => e.stopPropagation()} 
                        className="flex justify-center items-center w-full py-3.5 rounded-full bg-blue hover:bg-white text-white hover:text-black font-bold text-sm transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-[0_0_15px_rgba(41,151,255,0.4)] cursor-pointer"
                    >
                        Garanta o seu
                    </a>
                    
                    {/* Gatilho de Escassez */}
                    <p className="mt-3 text-[10px] text-gray-500 uppercase tracking-widest">Estoque Limitado</p>
                </div>
              </div>
            ))}

          </div>
          
          {/* Instrução Visual para Mobile */}
          <div className="flex items-center gap-3 mt-8 opacity-60 animate-pulse text-white md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-xs font-bold tracking-widest uppercase">Deslize para ver mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Model