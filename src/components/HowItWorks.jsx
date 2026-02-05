import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    // Animação do Chip
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    // Textos
    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })

    // CORREÇÃO DO VÍDEO: Garantia de Play
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top 85%', // Começa um pouco antes de estar totalmente visível
        toggleActions: 'play pause play pause', // Toca ao entrar, pausa ao sair (economiza bateria)
        onEnter: () => {
             // Força o play caso o navegador tenha bloqueado
             if(videoRef.current) videoRef.current.play(); 
        }
      }
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="Processador A17 Pro" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Chip A17 Pro.
            <br /> Um monstro para jogos.
          </h2>

          <p className="hiw-subtitle text-center">
            Apresentamos o maior redesign na história das GPUs da Apple.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img 
                src={frameImg}
                alt="Gameplay Frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
                {/* CORREÇÃO: Removido preload="none" para garantir carregamento */}
                <video 
                  className="pointer-events-none" 
                  playsInline 
                  muted 
                  autoPlay 
                  ref={videoRef}
                  key={frameVideo} // Força o React a reconhecer o vídeo se a source mudar
                >
                  <source src={frameVideo} type="video/mp4" />
                </video>
              </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Honkai: Star Rail</p>
          </div>

          <div className="hiw-text-container">
                <div className="flex flex-1 justify-center flex-col">
                  <p className="hiw-text g_fadeIn">
                    O A17 Pro é uma categoria inteiramente nova de chip que entrega nossa {' '}
                    <span className="text-white">
                      melhor performance gráfica de longe
                    </span>.
                  </p>

                  <p className="hiw-text g_fadeIn">
                   Jogos mobile com {' '}
                    <span className="text-white">
                       visual e sensação imersivos
                    </span>,
                     ambientes detalhados e personagens realistas.
                  </p>
                  
                   {/* CTA Adicionado para manter o funil */}
                   <div className="g_fadeIn pt-5">
                    <a 
                      href="https://wa.me/5577999828813?text=Ol%C3%A1%20fiquei%20impressionado%20com%20o%20desempenho%20do%20iPhone%2015.%20Quero%20saber%20pre%C3%A7os!"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue hover:text-white font-bold text-lg transition-colors cursor-pointer"
                    >
                      Ver preços desse modelo &gt;
                    </a>
                  </div>
                </div>
              

              <div className="flex-1 flex justify-center flex-col g_fadeIn mt-10 md:mt-0">
                <p className="hiw-text">Nova</p>
                <p className="hiw-bigtext">GPU Classe Pro</p>
                <p className="hiw-text">com 6 núcleos</p>
              </div>
              </div>
            </div>
    </section>
  )
}

export default HowItWorks