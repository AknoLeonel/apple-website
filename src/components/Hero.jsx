import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

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
      // CORREÇÃO: Estava escrito 'reisze' errado no original
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        {/* MUDANÇA 1: Nome da Loja */}
        <p id="hero" className="hero-title">PS IPHONES</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        {/* MUDANÇA 2: Link do WhatsApp (Não esqueça de colocar seu número real) */}
        <a 
          href="https://wa.me/5577999828813?text=Ol%C3%A1%20gostaria%20de%20fazer%20meu%20or%C3%A7amento!" 
          target="_blank" 
          rel="noreferrer"
          className="btn"
        >
          Comprar no WhatsApp
        </a>
        {/* MUDANÇA 3: Slogan de Venda */}
        <p className="font-normal text-xl">Parcelamento em até 18x</p>
      </div>
    </section>
  )
}

export default Hero