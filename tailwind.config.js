/** @type {import('tailwindcss').Config} */
//import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        red: "#FF6868",
        secondary: "#555",
        primaryBG: "#FCFCFC",
      },
      // fontFamily: {
      //   primary: ["Inter", "sans-serif"],
      // },
    },
  },
  plugins: [require("daisyui")],
};
