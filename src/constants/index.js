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

// 1. Menu de Navegação (Links do Topo)
export const navLists = ["Início", "iPhones", "Acessórios", "Contato"];

// 2. Destaques (Carrossel de Vídeos - Foco em Benefícios)
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

// 3. TABELA DE PREÇOS (Vitrine Principal)
// Centralizamos aqui para facilitar a atualização diária de preços
export const pricingModels = [
  // --- LINHA IPHONE 16 & 15 (PREMIUM) ---
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    desc: "O lançamento mais poderoso. Semi-novo.",
    price: "R$ 6.799,99",
    img: blackImg,
  },
  {
    id: 2,
    name: "iPhone 16 Pro 128GB",
    desc: "Inteligência Apple e poder extremo.",
    price: "R$ 4.999,99",
    img: whiteImg,
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max 256GB",
    desc: "Titânio Aeroespacial. USB-C.",
    price: "R$ 5.300,00",
    img: blueImg,
  },
  {
    id: 4,
    name: "iPhone 15 Pro 128GB",
    desc: "Desempenho Pro em tamanho ideal.",
    price: "R$ 4.599,99",
    img: yellowImg,
  },
  {
    id: 5,
    name: "iPhone 15 128GB",
    desc: "Dynamic Island e câmera de 48MP.",
    price: "R$ 3.699,99",
    img: blueImg,
  },
  // --- LINHA IPHONE 14 ---
  {
    id: 6,
    name: "iPhone 14 Pro Max",
    desc: "Tela Grande. Bateria Gigante.",
    price: "R$ 4.299,99",
    img: blackImg,
  },
  {
    id: 7,
    name: "iPhone 14 Pro 128GB",
    desc: "Ilha Dinâmica. Semi-novo impecável.",
    price: "R$ 3.799,99",
    img: blackImg,
  },
  {
    id: 8,
    name: "iPhone 14 256GB",
    desc: "Muito espaço e câmeras incríveis.",
    price: "R$ 3.299,99",
    img: whiteImg,
  },
  {
    id: 9,
    name: "iPhone 14 128GB",
    desc: "O queridinho do momento.",
    price: "R$ 2.899,99",
    img: blueImg,
  },
  // --- LINHA IPHONE 13 ---
  {
    id: 10,
    name: "iPhone 13 Pro Max",
    desc: "Tela ProMotion 120Hz.",
    price: "R$ 3.699,99",
    img: blueImg,
  },
  {
    id: 11,
    name: "iPhone 13 Pro 128GB",
    desc: "Câmeras Pro. Aço Inoxidável.",
    price: "R$ 2.999,99",
    img: blackImg,
  },
  {
    id: 12,
    name: "iPhone 13 128GB",
    desc: "Modo Cinema. Bateria duradoura.",
    price: "R$ 2.550,00",
    img: whiteImg,
  },
  // --- LINHA IPHONE 12 & 11 (CUSTO BENEFÍCIO) ---
  {
    id: 13,
    name: "iPhone 12 Pro Max",
    desc: "O maior da família 12.",
    price: "R$ 2.699,99",
    img: blueImg,
  },
  {
    id: 14,
    name: "iPhone 12 Pro 128GB",
    desc: "Acabamento Premium.",
    price: "R$ 2.399,99",
    img: blackImg,
  },
  {
    id: 15,
    name: "iPhone 12 128GB",
    desc: "O primeiro com 5G da Apple.",
    price: "R$ 2.100,00",
    img: whiteImg,
  },
  {
    id: 16,
    name: "iPhone 12 64GB",
    desc: "Compacto e poderoso.",
    price: "R$ 2.000,00",
    img: blueImg,
  },
  {
    id: 17,
    name: "iPhone 11 128GB",
    desc: "O clássico que nunca sai de moda.",
    price: "R$ 1.799,99",
    img: yellowImg,
  },
  {
    id: 18,
    name: "iPhone 11 64GB",
    desc: "Melhor preço para começar no iOS.",
    price: "R$ 1.499,99",
    img: blackImg,
  },
];

// 4. Modelos 3D (Legado - Mantido caso queira reativar o 3D no futuro)
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

// 5. Rodapé (Links Institucionais)
export const footerLinks = [
  "Política de Privacidade",
  "Termos de Uso",
  "Política de Vendas",
  "Rastrear Pedido",      // Novo: Aumenta confiança
  "Trocas e Devoluções",  // Novo: Remove objeção de compra
];