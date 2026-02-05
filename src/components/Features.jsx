import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    // Animação do Vídeo Principal
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        if(videoRef.current) {
          videoRef.current.play();
        }
      }
    })

    // Títulos
    animateWithGsap('#features_title', { y: 0, opacity: 1 })
    
    // Imagens com efeito de zoom (Parallax feel)
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    
    // Textos explicativos
    animateWithGsap(
      '.g_text',
      { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
    )
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      {/* CORREÇÃO 1: Typo corrigido de 'wdith' para 'width' */}
      <div className="screen-max-width">
        
        <div className="mb-12 w-full">
          {/* SEO: Mudança de h1 para h2 para manter hierarquia correta */}
          <h2 id="features_title" className="section-heading">Qualidade Garantida.</h2>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          {/* MOBILE: Padding ajustado (pl-5 em mobile, pl-24 em desktop) */}
          <div className="mt-32 mb-24 px-5 md:pl-24 w-full">
            <h3 className="text-5xl lg:text-7xl font-semibold">PS IPHONES.</h3>
            <h3 className="text-5xl lg:text-7xl font-semibold">Confiança em 1º lugar.</h3>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video 
                playsInline 
                id="exploreVideo" 
                className="w-full h-full object-cover object-center rounded-lg shadow-2xl" 
                preload="none" 
                muted 
                autoPlay 
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh] rounded-lg">
                  {/* SEO: Alt Text descritivo */}
                  <img src={explore1Img} alt="Detalhe do acabamento premium do iPhone" loading="lazy" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh] rounded-lg">
                  {/* SEO: Alt Text descritivo */}
                  <img src={explore2Img} alt="Câmeras de alta performance do iPhone" loading="lazy" className="feature-video g_grow" />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Na PS IPHONES, cada aparelho passa por uma rigorosa inspeção de qualidade. {' '}
                    <span className="text-white">
                      Garantimos a procedência e o funcionamento perfeito
                    </span>,
                    para que você tenha a melhor experiência Apple sem preocupações.
                  </p>
                </div>

                <div className="flex-1 flex-center flex-col items-start">
                  <p className="feature-text g_text mb-6">
                    Oferecemos as melhores condições de troca e parcelamento do mercado. {' '}
                    <span className="text-white">
                      Seu iPhone novo está mais perto do que você imagina.
                    </span>
                    Venha conferir nosso estoque e se surpreender.
                  </p>

                  {/* FUNIL DE VENDAS: Botão CTA adicionado */}
                  <div className="g_text opacity-0 translate-y-10">
                    <a 
                      href="https://wa.me/5577999828813?text=Ol%C3%A1%20vi%20a%20garantia%20de%20voc%C3%AAs%20no%20site%20e%20fiquei%20interessado!"
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-3 bg-blue hover:bg-white hover:text-black text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(41,151,255,0.5)]"
                    >
                      Quero meu iPhone com Garantia
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features