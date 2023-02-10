/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-primary": "#8A1538",
        "app-secondary": "#FF004C",
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
        Tajawal: ["Tajawal, sans-serif"],
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
};