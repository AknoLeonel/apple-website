import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CORREÇÃO: Removemos o 'base: "/apple-website/"'
  // Agora o site vai funcionar na raiz (vercel.app)
  build: {
    sourcemap: false // Otimização: deixa o site mais leve
  }
});