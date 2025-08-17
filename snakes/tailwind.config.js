/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'horror-red': '#8b0000',
        'horror-gold': {
          100: '#fff7cc',
          200: '#fce96a',
          300: '#fcc419',
          400: '#f59f00',
          500: '#e67700',
          600: '#d9480f',
        },
        'horror-blue': {
          800: '#001440',
          900: '#000c26',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 4s infinite alternate',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        'horror': '0 0 15px rgba(239, 68, 68, 0.5)',
      },
    },
  },
  plugins: [],
};