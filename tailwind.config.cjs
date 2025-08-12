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
          50: '#f5faff',
          100: '#e6f4ff',
          200: '#bfe5ff',
          300: '#80ceff',
          400: '#2fb3ff',
          500: '#008fe9',
          600: '#006fbd',
          700: '#005391',
          800: '#003a66',
          900: '#012540'
        },
        accent: {
          50: '#fff6ed',
          100: '#ffe7d1',
          200: '#ffcea3',
          300: '#ffb170',
          400: '#ff943d',
          500: '#ff780a',
          600: '#db5d00',
          700: '#b74600',
          800: '#933300',
          900: '#7a2800'
        },
        success: '#18c964',
        danger: '#ff3b30',
        warning: '#ffba08'
      }
    }
  },
  plugins: []
};
