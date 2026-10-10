import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { frameImg, frameVideo } from '../../utils/assets';
import { animateWithGsap } from '../../utils/animations';
import { whatsappLink } from '../../config/store';

// Seção de desempenho: destaca o chip A19 Pro da linha iPhone 17 Pro.
const Performance = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: { trigger: '#chip', start: '20% bottom' },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });

    animateWithGsap('.g_fadeIn', { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' });

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top 85%',
        toggleActions: 'play pause play pause',
        onEnter: () => videoRef.current?.play(),
      },
    });
  }, []);

  return (
    <section className="common-padding bg-black">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <div className="chip" role="img" aria-label="Chip A19 Pro">
            <span className="text-4xl font-semibold tracking-tight text-white">A19</span>
            <span className="text-lg font-semibold tracking-[0.3em] text-gray-200">PRO</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Chip A19 Pro.
            <br /> Desempenho que não esquenta.
          </h2>
          <p className="hiw-subtitle text-center">
            No iPhone 17 Pro e 17 Pro Max, com resfriamento por câmara de vapor.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img src={frameImg} alt="" className="bg-transparent relative z-10" loading="lazy" />
            </div>
            <div className="hiw-video">
              <video className="pointer-events-none" playsInline muted loop preload="none" ref={videoRef}>
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Honkai: Star Rail</p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              O A19 Pro foi feito para{' '}
              <span className="text-white">aguentar sessões longas de jogo e edição de vídeo</span>{' '}
              sem perder desempenho.
            </p>
            <p className="hiw-text g_fadeIn mt-4">
              A câmara de vapor espalha o calor pelo corpo de alumínio,{' '}
              <span className="text-white">mantendo o iPhone rápido e frio</span>.
            </p>
            <div className="g_fadeIn pt-5">
              <a
                href={whatsappLink('Olá! Quero saber mais sobre o iPhone 17 Pro e o 17 Pro Max.')}
                target="_blank"
                rel="noreferrer"
                className="text-blue hover:text-white font-semibold text-lg transition-colors"
              >
                Quero um iPhone 17 Pro &gt;
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn mt-10 md:mt-0">
            <p className="hiw-text">Nova</p>
            <p className="hiw-bigtext">GPU de 6 núcleos</p>
            <p className="hiw-text">com aceleradores neurais em cada núcleo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;
