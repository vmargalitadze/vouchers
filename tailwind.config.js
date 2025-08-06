export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      border: {
        gray: "0.5px solid #FFFFFF",
      },
      boxShadow: {
        yellowShadow: "0px 0px 30.5px 0px #FFD106;",
        white: "0 35px 60px -55px rgba(0, 0, 0, 0.3)",
        dark: "0 35px 60px -55px rgba(255, 255, 255, 0.1)",
      },

      colors: {
        cardBgBlack: "rgba(20, 20, 20, 1)",
        bgBlackTransparent: "rgba(0, 0, 0, 0.766)",
        yellowButton: "rgba(255, 209, 6, 1)",
        yellowButtonHover: "rgba(246, 210, 8, 0.956)",
        // Dark mode colors
        dark: {
          bg: "#0f0f0f",
          card: "#1a1a1a",
          surface: "#2d2d2d",
          border: "#404040",
          text: "#ffffff",
          textSecondary: "#a0a0a0",
          accent: "#FFD106",
        },
        // Light mode colors
        light: {
          bg: "#ffffff",
          card: "#f8f9fa",
          surface: "#ffffff",
          border: "#e5e7eb",
          text: "#1f2937",
          textSecondary: "#6b7280",
          accent: "#FFD106",
        },
      },
      fontFamily: {
        interM: ["interMedium"],
        ninoM: ["bpg_nino_mtavruli_normal"],
      },
      screens: {
        "4xl": { max: "1800px" },
        "3xl": { max: "1400px" },
        "2xl": { max: "1200px" },
        xl: { max: "1068px" },
        lg: { max: "992px" },
        md: { max: "771px" },
        sm: { max: "590px" },
      },
    },
  },
  plugins: [],
};
