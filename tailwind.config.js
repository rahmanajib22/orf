/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#F0EDE8',
          dark: '#1A1A1A',
          red: '#C0272D',
        }
      }
    },
  },
  plugins: [],
}
