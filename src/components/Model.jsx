import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { yellowImg, blueImg, whiteImg, blackImg } from "../utils";
import { useRef, useState } from "react"; // Adicionei useState

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const containerRef = useRef(null); // Referência para o container
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const phones = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      desc: "Titânio. A potência máxima.",
      price: "12x de R$ 799,90",
      img: yellowImg, 
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      desc: "Câmera de 48MP. Incrível.",
      price: "12x de R$ 549,90",
      img: blueImg,
    },
    {
      id: 3,
      name: "iPhone 13",
      desc: "O custo-benefício perfeito.",
      price: "12x de R$ 349,90",
      img: whiteImg,
    },
    {
      id: 4,
      name: "Xiaomi & Realme",
      desc: "Consulte estoque atualizado.",
      price: "A partir de R$ 1.200",
      img: blackImg,
    },
  ];

  const infinitePhones = [...phones, ...phones, ...phones, ...phones, ...phones, ...phones];

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1, duration: 1 })

    gsap.from('.phone-card', { 
        y: 100, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.05,
        clearProps: "all",
        scrollTrigger: {
            trigger: '.carousel-container',
            start: 'top 90%',
        }
    })
  }, []);

  // --- LÓGICA DE ARRASTAR COM O MOUSE (DRAG TO SCROLL) ---
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
    const walk = (x - startX) * 2; // O número 2 é a velocidade do scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="common-padding relative z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black overflow-hidden">
      
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading mb-12 text-center text-white opacity-0 translate-y-10">
          Catálogo Completo
        </h1>

        <div className="flex flex-col items-center carousel-container">
          
          <div 
            ref={containerRef}
            // Eventos do Mouse adicionados aqui:
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            
            className={`w-full flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-5 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] 
            ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'} active:cursor-grabbing`}
          >
            
            {infinitePhones.map((phone, index) => (
              <div 
                key={`${phone.id}-${index}`} 
                // 'pointer-events-none' na imagem evita que você arraste a imagem "fantasma" ao invés do carrossel
                className="phone-card relative flex-shrink-0 w-[85vw] md:w-[320px] 
                  bg-zinc-900/40 backdrop-blur-xl border border-white/10 
                  rounded-3xl p-6 snap-center transition-all duration-300 group hover:border-white/30 hover:bg-zinc-800/50 select-none"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <div className="w-full h-64 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-black/20 shadow-inner">
                    <img 
                      src={phone.img} 
                      alt={phone.name} 
                      loading="lazy" 
                      // Adicionei pointer-events-none para a imagem não atrapalhar o arrastar
                      className="h-[85%] w-auto object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out will-change-transform pointer-events-none" 
                    />
                </div>

                <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{phone.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 font-medium">{phone.desc}</p>
                    
                    <div className="my-4 w-full h-[1px] bg-white/10"></div>
                    
                    <p className="text-lg font-semibold text-white mb-6">{phone.price}</p>
                    
                    <a 
                        href={`https://wa.me/5500000000000?text=Olá, vi o ${phone.name} no site e tenho interesse!`} 
                        target="_blank"
                        rel="noreferrer"
                        // onMouseDown para evitar conflito com o scroll
                        onMouseDown={(e) => e.stopPropagation()} 
                        className="inline-flex justify-center items-center w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10 cursor-pointer"
                    >
                        Comprar Agora
                    </a>
                </div>
              </div>
            ))}

          </div>
          
          <div className="flex items-center gap-3 mt-6 opacity-60 animate-bounce text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-sm font-medium tracking-wide uppercase">Arraste para o lado</span>
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