import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
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

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Chip A17 Pro.
            <br /> Um monstro para jogos.
          </h2>

          <p className="hiw-subtitle">
            Apresentamos o maior redesign na história das GPUs da Apple.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img 
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
                <video className="pointer-events-none" playsInline preload="none" muted autoPlay ref={videoRef}>
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
                </div>
              

              <div className="flex-1 flex justify-center flex-col g_fadeIn">
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