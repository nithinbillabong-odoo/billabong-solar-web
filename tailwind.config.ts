import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Billabong Solar brand colors
        orange: {
          DEFAULT: "#FF660D",
          light: "#FF8C42",
          dark: "#E5520A",
        },
        navy: {
          DEFAULT: "#272E7D",
          dark: "#002244",
          darker: "#072032",
        },
        solar: {
          orange: "#FF660D",
          navy: "#272E7D",
          dark: "#002244",
          deeper: "#072032",
          gray: "#54595F",
          text: "#7A7A7A",
        },
      },
      fontFamily: {
        sans: ["Roboto", "DM Sans", "sans-serif"],
        heading: ["DM Sans", "Roboto", "sans-serif"],
        slab: ["Roboto Slab", "Georgia", "serif"],
      },
      maxWidth: {
        "8xl": "1300px",
        "9xl": "1400px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
