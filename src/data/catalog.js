// CATÁLOGO: iPhones LACRADOS
// Para mudar um preço, edite o campo `price` (número, com centavos).
// `design` e `body` definem o modelo 3D usado na foto do produto:
//   "plateau"  -> iPhone 17 Pro / 18 Pro (barra de câmeras de ponta a ponta)
//   "vertical" -> iPhone 16 / 17 (duas câmeras empilhadas)
//   "diagonal" -> iPhone 14 / 15 (duas câmeras na diagonal)
// As fotos ficam em public/assets/products/<id>.webp (gere com `npm run render:products`).

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
    body: "#8a8c92",
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
    body: "#8a8c92",
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

export const productImage = (id) => `/assets/products/${id}.webp`;
