import {
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
} from "../utils";

// =====================================================================
// 1. DADOS DA LOJA — altere aqui e o site inteiro é atualizado
// =====================================================================
export const store = {
  name: "PS IPHONES",
  whatsapp: "5577999828813",
  whatsappDisplay: "(77) 99982-8813",
  address: "Avenida Formosa 1876, Centro",
  since: 2022,
  maxInstallments: 18,
  deliveryDays: 7,
  locations: [
    { id: "barreiras", label: "Barreiras" },
    { id: "formosa", label: "Formosa" },
  ],
};

export const whatsappLink = (text) =>
  `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;

// =====================================================================
// 2. MENU (âncoras para as seções da página)
// =====================================================================
export const navLists = [
  { label: "iPhones", href: "#iphones" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Como comprar", href: "#como-comprar" },
  { label: "Dúvidas", href: "#duvidas" },
];

// =====================================================================
// 3. CATÁLOGO — iPhones LACRADOS
// Para mudar um preço: edite o campo `price` (número, com centavos).
// `design` controla a ilustração do aparelho:
//   "plateau"  -> iPhone 17 Pro / 18 Pro (barra de câmeras de lado a lado)
//   "vertical" -> iPhone 16 / 17 (duas câmeras na vertical)
//   "diagonal" -> iPhone 14 / 15 (duas câmeras na diagonal)
// =====================================================================
const proColors = [
  { name: "Laranja-cósmico", hex: "#e8742f" },
  { name: "Azul-profundo", hex: "#33415c" },
  { name: "Prateado", hex: "#dcdcd8" },
];

export const products = [
  {
    id: "ip18pm-512",
    model: "iPhone 18 Pro Max",
    storage: "512GB",
    price: 13999.99,
    line: "18",
    tag: "Lançamento",
    design: "plateau",
    body: "#2b2b30",
    colors: [],
    highlights: [
      "O topo de linha mais recente da Apple",
      "Espaço de sobra: 512GB para fotos e vídeos em 4K",
      "Sistema de câmeras Pro",
    ],
  },
  {
    id: "ip18pm-256",
    model: "iPhone 18 Pro Max",
    storage: "256GB",
    price: 10899.99,
    line: "18",
    tag: "Lançamento",
    design: "plateau",
    body: "#2b2b30",
    colors: [],
    highlights: [
      "O topo de linha mais recente da Apple",
      "Tela grande Pro Max",
      "Sistema de câmeras Pro",
    ],
  },
  {
    id: "ip17pm-512",
    model: "iPhone 17 Pro Max",
    storage: "512GB",
    price: 8999.99,
    line: "17",
    design: "plateau",
    body: "#e8742f",
    colors: proColors,
    highlights: [
      "Tela de 6,9\" ProMotion até 120 Hz",
      "Chip A19 Pro com resfriamento por câmara de vapor",
      "Três câmeras de 48 MP e zoom de qualidade óptica de 8x",
    ],
  },
  {
    id: "ip17pm-256",
    model: "iPhone 17 Pro Max",
    storage: "256GB",
    price: 7499.99,
    line: "17",
    tag: "Mais vendido",
    design: "plateau",
    body: "#33415c",
    colors: proColors,
    highlights: [
      "Tela de 6,9\" ProMotion até 120 Hz",
      "A maior duração de bateria já vista num iPhone",
      "Três câmeras de 48 MP e zoom de qualidade óptica de 8x",
    ],
  },
  {
    id: "ip17p-256",
    model: "iPhone 17 Pro",
    storage: "256GB",
    price: 6999.99,
    line: "17",
    design: "plateau",
    body: "#dcdcd8",
    colors: proColors,
    highlights: [
      "Tela de 6,3\" ProMotion até 120 Hz",
      "Chip A19 Pro e corpo unibody em alumínio",
      "Três câmeras de 48 MP e zoom de qualidade óptica de 8x",
    ],
  },
  {
    id: "ip17-256",
    model: "iPhone 17",
    storage: "256GB",
    price: 5699.99,
    line: "17",
    tag: "Melhor custo-benefício",
    design: "vertical",
    body: "#a9b48a",
    colors: [
      { name: "Lavanda", hex: "#d9c8e6" },
      { name: "Sálvia", hex: "#a9b48a" },
      { name: "Azul-névoa", hex: "#98aecd" },
      { name: "Branco", hex: "#f2f2f0" },
      { name: "Preto", hex: "#353535" },
    ],
    highlights: [
      "Tela de 6,3\" ProMotion até 120 Hz",
      "Chip A19 e câmera frontal Center Stage de 18 MP",
      "Já começa com 256GB de armazenamento",
    ],
  },
  {
    id: "ip16-128",
    model: "iPhone 16",
    storage: "128GB",
    price: 4699.99,
    line: "anteriores",
    design: "vertical",
    body: "#9aadf2",
    colors: [
      { name: "Ultramarino", hex: "#9aadf2" },
      { name: "Verde-acinzentado", hex: "#b0d4d2" },
      { name: "Rosa", hex: "#f2adda" },
      { name: "Branco", hex: "#f5f5f3" },
      { name: "Preto", hex: "#3c3d3a" },
    ],
    highlights: [
      "Chip A18 e botão Controle da Câmera",
      "Câmera Fusion de 48 MP",
      "Botão de Ação personalizável",
    ],
  },
  {
    id: "ip15-128",
    model: "iPhone 15",
    storage: "128GB",
    price: 4099.99,
    line: "anteriores",
    design: "diagonal",
    body: "#f2d9db",
    colors: [
      { name: "Rosa", hex: "#f2d9db" },
      { name: "Amarelo", hex: "#f4efd0" },
      { name: "Verde", hex: "#dfe6d8" },
      { name: "Azul", hex: "#cfdfe8" },
      { name: "Preto", hex: "#35393b" },
    ],
    highlights: [
      "Dynamic Island",
      "Câmera principal de 48 MP",
      "Conector USB‑C",
    ],
  },
  {
    id: "ip14-128",
    model: "iPhone 14",
    storage: "128GB",
    price: 3699.99,
    line: "anteriores",
    tag: "Menor preço",
    design: "diagonal",
    body: "#a5b6c8",
    colors: [
      { name: "Meia-noite", hex: "#1f2020" },
      { name: "Estelar", hex: "#f4efe9" },
      { name: "Azul", hex: "#a5b6c8" },
      { name: "Roxo", hex: "#e1d8e8" },
      { name: "(PRODUCT)RED", hex: "#d4152b" },
    ],
    highlights: [
      "Chip A15 Bionic",
      "Câmera dupla de 12 MP com Modo Ação",
      "Tela Super Retina XDR de 6,1\"",
    ],
  },
];

export const productFilters = [
  { id: "todos", label: "Todos" },
  { id: "18", label: "iPhone 18" },
  { id: "17", label: "iPhone 17" },
  { id: "anteriores", label: "14, 15 e 16" },
];

// Status de disponibilidade por loja (editável no painel admin)
export const stockStatus = {
  disponivel: { label: "Disponível", className: "text-green-400 bg-green-500/10 border-green-500/20" },
  encomenda: { label: "Sob encomenda", className: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  esgotado: { label: "Esgotado", className: "text-red-400 bg-red-500/10 border-red-500/20" },
};

// =====================================================================
// 4. DESTAQUES (Carrossel de vídeos)
// =====================================================================
export const hightlightsSlides = [
  {
    id: 1,
    textLists: ["iPhones lacrados.", "Originais, novos", "e com garantia."],
    video: highlightFirstVideo,
    videoDuration: 4.97,
  },
  {
    id: 2,
    textLists: ["Do iPhone 14", "ao iPhone 18 Pro Max.", "Todos em um só lugar."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: ["Seu usado vale", "como entrada", "no iPhone novo."],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["Parcele em", `até ${store.maxInstallments}x no cartão.`],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

// =====================================================================
// 5. VANTAGENS
// =====================================================================
export const benefits = [
  {
    title: "Lacrado e original",
    text: "Aparelhos novos, na caixa, nunca ativados. Você abre o lacre.",
    icon: "box",
  },
  {
    title: "Garantia Apple",
    text: "Garantia oficial de 1 ano da Apple, válida em qualquer assistência autorizada.",
    icon: "shield",
  },
  {
    title: `Até ${store.maxInstallments}x no cartão`,
    text: "Parcelamento facilitado no cartão de crédito ou desconto à vista no Pix.",
    icon: "card",
  },
  {
    title: "Seu usado na troca",
    text: "Avaliamos o seu iPhone usado e usamos o valor como entrada no novo.",
    icon: "swap",
  },
];

// =====================================================================
// 6. COMO COMPRAR
// =====================================================================
export const buySteps = [
  {
    title: "Escolha o seu iPhone",
    text: "Adicione os modelos que você quer à sua lista. Os preços já estão no site.",
  },
  {
    title: "Fale com um consultor",
    text: "Sua lista vai pronta para o nosso WhatsApp. A gente confirma cor e disponibilidade.",
  },
  {
    title: "Retire ou receba",
    text: `Retire na loja ou receba em até ${store.deliveryDays} dias úteis nos modelos sob encomenda.`,
  },
];

// =====================================================================
// 7. DÚVIDAS FREQUENTES
// =====================================================================
export const faqs = [
  {
    q: "Os iPhones são novos?",
    a: "Sim. Todos os aparelhos desta vitrine são lacrados: novos, originais, na caixa e nunca ativados.",
  },
  {
    q: "Qual é a garantia?",
    a: "Os aparelhos têm a garantia oficial de 1 ano da Apple, que você aciona em qualquer assistência técnica autorizada.",
  },
  {
    q: "Em quantas vezes posso parcelar?",
    a: `Em até ${store.maxInstallments}x no cartão de crédito. As taxas do parcelamento são informadas pelo consultor no atendimento. No Pix, você paga à vista com desconto.`,
  },
  {
    q: "Vocês aceitam meu iPhone usado na troca?",
    a: "Sim. Mande o modelo, a capacidade e o estado do aparelho no WhatsApp e fazemos a avaliação. O valor entra como parte do pagamento.",
  },
  {
    q: "Quanto tempo demora a entrega?",
    a: `Modelos disponíveis saem na hora. Os modelos sob encomenda chegam em até ${store.deliveryDays} dias úteis após a confirmação do pedido.`,
  },
  {
    q: "Onde fica a loja?",
    a: `Temos lojas em Barreiras e Formosa. Endereço: ${store.address}. Chame no WhatsApp ${store.whatsappDisplay} para combinar a retirada.`,
  },
];
