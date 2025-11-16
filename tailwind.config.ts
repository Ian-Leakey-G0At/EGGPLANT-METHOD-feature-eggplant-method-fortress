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
        'scroll-ltr': 'scroll-ltr var(--animation-duration, 40s) linear infinite',
        'scroll-rtl': 'scroll-rtl var(--animation-duration, 40s) linear infinite',
      },
      keyframes: {
        'scroll-ltr': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-rtl': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
