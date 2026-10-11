// Dados da loja: altere aqui e o site inteiro é atualizado.
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

export const navLists = [
  { label: "iPhones", href: "#iphones" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Como comprar", href: "#como-comprar" },
  { label: "Dúvidas", href: "#duvidas" },
];
