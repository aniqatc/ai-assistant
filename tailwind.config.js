module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "465px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      fontFamily: {
        sans: [
          "Noto Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "Source Code Pro",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      colors: {},
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1024px",
          "2xl": "1024px",
        },
      },
      keyframes: {
        slideInY: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideInY 500ms ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
