/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  corePlugins: {
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat']
    },
    extend: {}
  },
  plugins: []
}
