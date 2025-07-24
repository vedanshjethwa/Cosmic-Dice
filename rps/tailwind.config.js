/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'game-overlay-1': 'rgba(45,55,72,0.3)',
        'game-overlay-2': 'rgba(66,153,225,0.15)',
        'mine-glow': 'rgba(239,68,68,0.5)',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
        'button-gradient': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
    },
  },
  plugins: [],
};