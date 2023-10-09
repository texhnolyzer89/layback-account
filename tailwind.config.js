/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'nav-element': {
        active: 'rgba(255,255,255)',
        hover: 'rgba(255,255,255,0.75)',
        DEFAULT: 'rgba(255,255,255,0.5)',
      },
      'nav': {
        DEFAULT: '#212529'
      },
      'white': {
        DEFAULT: '#ffffff'
      },
      'gray': {
        DEFAULT: 'rgba(0, 0, 0, 0.125)',
        dark: 'rgba(0,0,0,0.75)',
        light: 'rgba(0,0,0,0.03)'
      },
      'black': {
        DEFAULT: 'rgba(0,0,0)'
      },
      'blue': {
        DEFAULT: '#0D6EFD'
      },
      'orange': {
        DEFAULT: '#f97316'
      }
    },
    extend: {},
  },
  plugins: [],
}
