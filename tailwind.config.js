/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F7FB",
        surface: "#FFFFFF",
        line: "rgba(27, 23, 38, 0.08)",
        text: "#1B1726",
        textdim: "#6B6478",
        violet: "#8B5CF6",
        blue: "#5B8DEF",
        teal: "#2DD4BF",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
