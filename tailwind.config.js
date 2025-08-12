/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#e0f0ff',
          200: '#b9e0ff',
          300: '#7ec6ff',
          400: '#38a6ff',
          500: '#0d86ff',
          600: '#0069db',
          700: '#0054b0',
          800: '#084a8f',
          900: '#0d3e74'
        }
      }
    }
  },
  plugins: []
};
