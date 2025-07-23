/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', "./src/**/*.{js,jsx,ts,tsx}",
    "../card/src/**/*.{js,jsx,ts,tsx}",
    "../dice/src/**/*.{js,jsx,ts,tsx}",
    "../limbo/src/**/*.{js,jsx,ts,tsx}",
    "../snakes/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
