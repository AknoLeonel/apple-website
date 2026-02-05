import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  // PERFORMANCE: Inicialização segura para evitar erros de build/renderização
  const [videoSrc, setVideoSrc] = useState(
    typeof window !== 'undefined' && window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    // UX/FUNIL: Reduzi o delay de 2s para 1.5s. 
    // O cliente não pode esperar muito para ver onde clicar.
    gsap.to('#hero', { opacity: 1, delay: 1.5 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 1.5 })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        {/* SEO: Mudança OBRIGATÓRIA de <p> para <h1> para indexação correta */}
        <h1 id="hero" className="hero-title">PS IPHONES</h1>
        
        <div className="md:w-10/12 w-9/12">
          <video 
            className="pointer-events-none" 
            autoPlay 
            muted 
            playsInline={true} 
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        {/* FUNIL: Chamada para ação clara com feedback visual (hover) */}
        <a 
          href="https://wa.me/5577999828813?text=Ol%C3%A1%20gostaria%20de%20fazer%20meu%20or%C3%A7amento!" 
          target="_blank" 
          rel="noreferrer"
          className="btn transition-transform hover:scale-105 duration-300"
        >
          Comprar no WhatsApp
        </a>
        
        {/* ELEGÂNCIA: Tipografia ajustada */}
        <p className="font-normal text-xl mt-2 text-gray-100">Parcelamento em até 18x</p>
      </div>
    </section>
  )
}

export default Hero