import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })

    animateWithGsap('#features_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          {/* MUDANÇA 1: Título da Seção */}
          <h1 id="features_title" className="section-heading">Qualidade Garantida.</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            {/* MUDANÇA 2: Manchetes Grandes */}
            <h2 className="text-5xl lg:text-7xl font-semibold">PS IPHONES.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Confiança em 1º lugar.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video playsInline id="exploreVideo" className="w-full h-full object-cover object-center" preload="none" muted autoPlay ref={videoRef}>
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                </div>
              </div>

              <div className="feature-text-container">
                {/* MUDANÇA 3: Textos Explicativos */}
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Na PS IPHONES, cada aparelho passa por uma rigorosa inspeção de qualidade. {' '}
                    <span className="text-white">
                      Garantimos a procedência e o funcionamento perfeito
                    </span>,
                    para que você tenha a melhor experiência Apple sem preocupações.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Oferecemos as melhores condições de troca e parcelamento do mercado. {' '}
                    <span className="text-white">
                      Seu iPhone novo está mais perto do que você imagina.
                    </span>
                    Venha conferir nosso estoque e se surpreender.
                  </p>
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