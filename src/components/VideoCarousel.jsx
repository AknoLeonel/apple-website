import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // Estado do vídeo e do carrossel
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // 1. Animação de transição dos slides (Corrigido para usar classe em vez de ID duplicado)
    gsap.to(".video-carousel_card", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", 
    });

    // 2. ScrollTrigger: Só dá play quando o vídeo entra na tela (Economia de dados/bateria)
    gsap.to("#video-player", {
      scrollTrigger: {
        trigger: "#video-player",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Lógica da Barra de Progresso
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animação da barra
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            // Largura responsiva da barra
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // Cor e preenchimento
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // Atualizador do ticker do GSAP (Sincronia perfeita com o vídeo)
      const animUpdate = () => {
        // Verificação de segurança para evitar erro se o vídeo não carregou
        if(videoRef.current[videoId]) {
            anim.progress(
            videoRef.current[videoId].currentTime /
                hightlightsSlides[videoId].videoDuration
            );
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      }

      // Remove o listener ao trocar de vídeo (antes ficava acumulando a cada slide)
      return () => {
        gsap.ticker.remove(animUpdate);
        anim.kill();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, startPlay]);

  // Controle de Play/Pause baseado no estado
  useEffect(() => {
    if (loadedData.length >= hightlightsSlides.length) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} className="video-carousel_card sm:pr-20 pr-10">
            <div className="video-carousel_container relative">
              {/* Container do Vídeo com Bordas Arredondadas e Sombra */}
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black shadow-2xl border border-gray-800">
                <video
                  id="video-player" // ID único para o trigger
                  playsInline={true}
                  className={`${
                    list.id === 2 ? "translate-x-44" : ""
                  } pointer-events-none object-cover h-full w-full`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== hightlightsSlides.length - 1
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/* Textos sobre o vídeo (Destaques de Venda) */}
              <div className="absolute top-12 left-[5%] z-10 bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium drop-shadow-md text-white">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles do Player */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full shadow-lg">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button
          className="control-btn"
          aria-label={isLastVideo ? "Repetir" : isPlaying ? "Pausar" : "Reproduzir"}
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt=""
            className="w-5 h-5"
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;