/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F7F3",
        surface: "#FFFFFF",
        line: "rgba(20, 32, 27, 0.08)",
        text: "#14201B",
        textdim: "#5B6B63",
        accent: "#1F6F54",
        accent2: "#8FB339",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
