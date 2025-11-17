import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#84CC16", // lime-500
        "background-dark": "#111111",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "marquee-left-to-right": "marquee-left-to-right 60s linear infinite",
        "marquee-left-to-right2": "marquee-left-to-right2 60s linear infinite",
      },
      keyframes: {
        "marquee-left-to-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-left-to-right2": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
