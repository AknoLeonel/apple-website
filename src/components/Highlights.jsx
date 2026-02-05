import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from './VideoCarousel';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Garantir que o plugin de scroll esteja registrado
gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    // PERFORMANCE: Animação só ocorre quando o elemento entra na tela
    gsap.to('#title', { 
      opacity: 1, 
      y: 0,
      scrollTrigger: {
        trigger: '#highlights',
        start: 'top 85%', // Começa a animar quando o topo da seção estiver a 85% da tela
      }
    })
    
    gsap.to('.link', { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      stagger: 0.25,
      scrollTrigger: {
        trigger: '#highlights',
        start: 'top 85%',
      }
    })
  }, [])

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          
          {/* SEO: H2 para manter a hierarquia correta após o H1 do Hero */}
          {/* FUNIL: Título focado em autoridade e decisão */}
          <h2 id="title" className="section-heading">Por que escolher a PS IPHONES?</h2>

          <div className="flex flex-wrap items-end gap-5">
            {/* UX: Link funcional que leva para a vitrine (Modelos) */}
            <a href="#models" className="link group cursor-pointer">
              Ver ofertas
              {/* Micro-interação: Escala leve no hover */}
              <img src={watchImg} alt="Ver ofertas" className="ml-2 transition-transform group-hover:scale-110" />
            </a>

            {/* CONVERSÃO: Chamada para ação com gatilho de autoridade (Especialista) */}
            <a 
              href="https://wa.me/5577999828813?text=Ol%C3%A1%20vi%20os%20destaques%20no%20site%20e%20fiquei%20interessado!" 
              target="_blank" 
              rel="noreferrer" 
              className="link group text-blue hover:text-white transition-colors"
            >
              Fale com um especialista
              {/* Micro-interação: Seta se move para a direita no hover */}
              <img src={rightImg} alt="Seta para direita" className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Carrossel de Vídeos: Mantido, mas agora dentro de um contexto otimizado */}
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights