/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out",
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [
    // Plugin personalizado para esconder a barra de rolagem (scrollbar-hide)
    // Isso evita ter que instalar bibliotecas externas como 'tailwind-scrollbar-hide'
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          /* IE and Edge */
          '-ms-overflow-style': 'auto',
          /* Firefox */
          'scrollbar-width': 'auto',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
      });
    }),
  ],
};