/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        shakespeare: ["'Times New Roman'", "serif"],
      },
      colors: {
        gold: "#EAB580",
        wine: "#8D2929",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}