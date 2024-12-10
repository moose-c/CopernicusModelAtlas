/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        copernicusYellow: '#FFCD00',
        copernicusGrey: '#EFEFEE',
        CopernicusText: '#3B3B3B'
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        merr: ["Merriweather", "sans-serif"]
      }
    },
  },
  plugins: [],
}