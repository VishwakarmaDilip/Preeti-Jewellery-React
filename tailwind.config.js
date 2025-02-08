/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theamColor": "#967203",
        "theamColor2": "#ddbd5d",
      
        "backgroundColor": "#fff0d8",
        "backgroundColor2": "white",
        "backgroundColor3": "#e5c07f",
      
        "textColor1": "black",
        "textColor2": "white",
        "textColor3": "grey",
      
        "navBag": "#ffffff6e",
        "navBag2": "#ffffffb8",
      
        "buttonColor": "#ddbd5d",
        "clickColor": "#d1aa37",
        "footerBag": "#ebd6b4"
      },
      boxShadow: {
        "boxShadow": "0.5rem 0.4rem 1.2rem rgb(182, 180, 180)"
      }
    },
  },
  plugins: [],
}