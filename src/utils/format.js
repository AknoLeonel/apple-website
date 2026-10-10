export const formatMoney = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
