
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        accent: '#FFC107',
        background: '#F5F5F5',
        text: '#333333',
      },
      fontFamily:{
        rubik:[ 'Rubik', 'Roboto','sans-serif']
      }
    },
  },
  plugins: [],
} 