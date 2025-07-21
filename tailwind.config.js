/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',

      },
    },
    extend: {
      colors: {
        'primary-500': '#51080D', // Vermelho queimado (alerta elegante)
        'primary-600': '#A72E2E', // Vermelho escuro profundo (destaque)
        'secondary-500': '#FF4F00', // Laranja queimado (alerta complementar)

        'off-white': '#F2F2F2', // Quase branco para fundos claros
        'red': '#D72638', // Vermelho vivo para alertas fortes

        'dark-1': '#000000', // Preto absoluto
        'dark-2': '#1B1B1B', // Grafite profundo
        'dark-3': '#101012', // Quase preto com leve tom azulado
        'dark-4': '#1F1F22', // Cinza escuro azulado (elegante)

        'light-1': '#FFFFFF', // Branco puro
        'light-2': '#EDEDED', // Cinza claro 
        'light-3': '#B0B0B0', // Cinza neutro para detalhes
        'light-4': '#6B6B6B', // Cinza médio sofisticado
      },
      screens: {
        'xs': '480px',

      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: "fadeIn 2s ease-in-out"
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
