/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--bg-tertiary)",
        "black-100": "var(--bg-card-sub)",
        "black-200": "var(--bg-card-sub2)",
        "white-100": "var(--text-white100)"
      },
      boxShadow: {
        card: "var(--shadow-card)"
      },
      screens: {
        xs: "450px"
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')"
      }
    }
  },
  plugins: []
};
