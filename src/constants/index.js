import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
} from "../utils";

// 1. Menu traduzido
export const navLists = ["Início", "iPhones", "Acessórios", "Contato"];

// 2. Destaques focados em VENDAS e BENEFÍCIOS
export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "PS IPHONES.",
      "O melhor preço",
      "da sua região.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Garantia Total.", "Segurança na", "sua compra."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "Pegamos seu usado",
      "na troca com a",
      "melhor avaliação.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["Parcelamos em", "até 18x no cartão."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

// 3. Modelos (Mantivemos a estrutura técnica, mas traduzimos os títulos)
export const models = [
  {
    id: 1,
    title: "iPhone 15 Pro - Titânio Natural",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro - Titânio Azul",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro - Titânio Branco",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro - Titânio Preto",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg,
  },
];

export const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

// 4. Rodapé traduzido
export const footerLinks = [
  "Política de Privacidade",
  "Termos de Uso",
  "Política de Vendas",
  "Legal",
  "Mapa do Site",
];