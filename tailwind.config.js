/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', "./src/**/*.{js,jsx,ts,tsx}",
    "../card/src/**/*.{js,jsx,ts,tsx}",
    "../dice/src/**/*.{js,jsx,ts,tsx}",
    "../limbo/src/**/*.{js,jsx,ts,tsx}",
    "../snakes/src/**/*.{js,jsx,ts,tsx}",
    "../game bollon/src/**/*.{js,jsx,ts,tsx}",
    "../minesweeper/src/**/*.{js,jsx,ts,tsx}",
    "../prediction-pulse/src/**/*.{js,jsx,ts,tsx}",
    "../toss game/src/**/*.{js,jsx,ts,tsx}",
    "../rps/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-bg-primary': '#0a1a2a',
        'cosmic-bg-secondary': '#132f4c',
        'cosmic-bg-tertiary': '#1f3b63',
        'cosmic-blue': '#3b82f6',
        'cosmic-blue-light': '#60a5fa',
        'cosmic-blue-dark': '#1d4ed8',
        'text-primary': '#ffffff',
        'text-secondary': '#d1d5db',
        'text-muted': '#9ca3af',
      },
      spacing: {
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
      borderRadius: {
        'cosmic': '12px',
      },
    },
  },
  plugins: [],
};
