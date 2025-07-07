/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "xs": "500px",
    },
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
        "buttonColor2": "#967203",

        "clickColor": "#d1aa37",
        "clickColor2":"#b89c04",

        "hoverColor": "#a88f03",
        "footerBag": "#ebd6b4"
      },
      boxShadow: {
        "boxShadow": "0.5rem 0.4rem 1.2rem rgb(182, 180, 180)",
        "boxShadow2": "-2px 0 3px rgb(37, 36, 36)"
      }
    },
  },
  plugins: [],
}