# PS IPHONES — site da loja

Site da PS IPHONES feito com React, Three.js (react-three-fiber), GSAP e Tailwind, publicado na Vercel em www.psiphones.com.br.

## Rodar localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  config/store.js        # WhatsApp, endereço, lojas, parcelas, menu
  data/catalog.js        # iPhones e preços (edite aqui para mudar preços)
  data/content.js        # textos: destaques, vantagens, passos, dúvidas
  context/ShopContext    # lista de pedidos, loja selecionada, ajustes do admin
  components/
    layout/              # Navbar, Footer, botão do WhatsApp
    sections/            # seções da página (Hero, vitrine, vantagens...)
    shop/                # card de produto e lista de pedidos
    three/               # modelo 3D do iPhone e cena do topo
    admin/               # painel administrativo
    ui/                  # ícones e imagem de produto
tools/                   # gerador das fotos dos produtos a partir do 3D
```

## Atualizar preços e produtos

Edite `src/data/catalog.js`. Ao adicionar um produto novo (ou mudar `design`/`body`), gere a foto dele:

```bash
npm run render:products   # requer Playwright + Chromium e ImageMagick
```

As imagens são salvas em `public/assets/products/<id>.webp`.

## Painel administrativo

Acesse `/#admin`. A senha vem da variável de ambiente `VITE_ADMIN_PASSWORD` (configure na Vercel).
As mudanças feitas no painel ficam salvas apenas no navegador de quem as fez.
