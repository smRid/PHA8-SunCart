/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sun: {
          100: "#FFEFC2",
          200: "#FFE08A",
          300: "#FFC857",
          400: "#FFB02E",
          500: "#FF8C2A",
          600: "#F26B1F",
          700: "#C94B14",
          800: "#8A3210",
          900: "#4A1A08",
        },
        ocean: {
          100: "#BFF3FF",
          300: "#3FD8FF",
          400: "#00C2E8",
          500: "#0099BB",
          600: "#006B85",
        },
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
      },
    },
  },
};

export default config;
