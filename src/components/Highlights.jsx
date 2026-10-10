import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg } from "../utils";
import { whatsappLink } from "../constants";
import VideoCarousel from './VideoCarousel';

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0, scrollTrigger: { trigger: '#highlights', start: 'top 85%' } });
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25, scrollTrigger: { trigger: '#highlights', start: 'top 85%' } });
  }, []);

  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-black">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h2 id="title" className="section-heading">Por que comprar na PS IPHONES?</h2>

          <div className="flex flex-wrap items-end gap-5">
            <a href="#iphones" className="link group">
              Ver preços
              <img src={rightImg} alt="" className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink('Olá! Vi os destaques no site e quero falar com um especialista.')}
              target="_blank"
              rel="noreferrer"
              className="link group"
            >
              Fale com um especialista
              <img src={rightImg} alt="" className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
