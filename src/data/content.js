import {
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
} from '../utils/assets';
import { store } from '../config/store';

export const highlightSlides = [
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
