/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f',
          800: '#112240',
          700: '#1a365d',
          600: '#2a4365',
        },
      },
      backgroundImage: {
        'gradient-game': 'linear-gradient(to bottom right, black, rgb(17, 24, 39), black)',
        'gradient-header': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))',
      },
    },
  },
  plugins: [],
};