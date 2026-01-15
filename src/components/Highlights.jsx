import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"

import VideoCarousel from './VideoCarousel';

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 })
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
  }, [])

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          {/* MUDANÇA 1: Título traduzido */}
          <h1 id="title" className="section-heading">Nossos Destaques.</h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              {/* MUDANÇA 2: Link visual */}
              Veja os detalhes
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            {/* MUDANÇA 3: Link funcional para WhatsApp */}
            <a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noreferrer" className="link">
              Fale com a gente
              <img src={rightImg} alt="right" className="ml-2" />
            </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights