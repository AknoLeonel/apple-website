# PS IPHONES — site da loja

Site da PS IPHONES (React + Vite + Tailwind + GSAP), publicado na Vercel em www.psiphones.com.br.

## Rodar localmente

```bash
npm install
npm run dev
```

## Atualizar preços e produtos

Tudo fica em `src/constants/index.js`:

- `store`: WhatsApp, endereço, lojas e número máximo de parcelas.
- `products`: catálogo de iPhones lacrados. Para mudar um preço, edite o campo `price`.

## Painel administrativo

Acesse `/#admin`. A senha vem da variável de ambiente `VITE_ADMIN_PASSWORD` (configure na Vercel).
As mudanças feitas no painel ficam salvas apenas no navegador de quem as fez.
