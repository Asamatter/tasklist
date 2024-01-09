/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        pistachio: {
          50: '#f7ffe5',
          100: '#ebffc6',
          200: '#d6ff93',
          300: '#b8ff55',
          400: '#9bf823',
          500: '#75d303',
          600: '#5eb300',
          700: '#488704',
          800: '#3b6a0a',
          900: '#335a0d',
          950: '#173201',
        },
      },
    },
  },
  plugins: [],
}

