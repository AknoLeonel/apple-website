import highlightFirstmv from "/assets/videos/explore.mp4";
import highlightSectmv from "/assets/videos/hightlight-third.mp4";
import highlightThirdmv from "/assets/videos/hightlight-sec.mp4";
import highlightFourthmv from "/assets/videos/hightlight-fourth.mp4";
import framemv from "/assets/videos/frame.mp4";

import pslogo from "/assets/images/pslogo.webp";

import right from "/assets/images/right.svg";
import replay from "/assets/images/replay.svg";
import play from "/assets/images/play.svg";
import pause from "/assets/images/pause.svg";

import frame from "/assets/images/frame.png";

export const highlightFirstVideo = highlightFirstmv;
export const highlightSecondVideo = highlightSectmv;
export const highlightThirdVideo = highlightThirdmv;
export const highlightFourthVideo = highlightFourthmv;
export const frameVideo = framemv;

export const pslogoImg = pslogo;

export const rightImg = right;
export const replayImg = replay;
export const playImg = play;
export const pauseImg = pause;

export const frameImg = frame;

export const formatMoney = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
