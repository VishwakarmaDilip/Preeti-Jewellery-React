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
  "theamColor": "#8C6A5D",       // Dusty rose-brown (primary)
  "theamColor2": "#B89B72",      // Muted gold (secondary accent)

  "backgroundColor": "#F8F6F4",  // Light beige/cream
  "backgroundColor2": "#FFFFFF", // Clean white
  "backgroundColor3": "#EDE9E4", // Muted bone/ivory

  "textColor1": "#2E2E2E",       // Deep charcoal (primary text)
  "textColor2": "#FFFFFF",       // White (for contrast buttons)
  "textColor3": "#7A7A7A",       // Soft grey (for secondary info)

  "navBag": "#FFFFFFCC",         // Semi-transparent white (navigation bg)
  "navBag2": "#FFFFFFF2",        // Less transparent nav bg

  "buttonColor": "#B89B72",      // Button primary (muted gold)
  "buttonColor2": "#8C6A5D",     // Button alt (dusty rose-brown)

  "clickColor": "#D5BDAF",       // Click highlight (soft rose beige)
  "clickColor2": "#B89B72",      // Secondary click color

  "hoverColor": "#9E7F69",       // Darker rose-brown on hover
  "footerBag": "#EFE6DC",        // Light beige for footer

  "inputBG": "#F4F1EE"           // Soft cream for input backgrounds
},
      boxShadow: {
        "boxShadow": "0.5rem 0.4rem 1.2rem rgb(182, 180, 180)",
        "boxShadow2": "-2px 0 3px rgb(37, 36, 36)"
      },
      keyframes: {
        'fade-in-scale': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'fade-out-scale': {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-in-scale': 'fade-in-scale 0.2s ease-out forwards',
        'fade-out-scale': 'fade-out-scale 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}