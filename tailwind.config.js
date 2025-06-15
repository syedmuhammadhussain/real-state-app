/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // A sophisticated, calm blue/gray for primary actions
          default: "#2E4C6D",
          light: "#54728C",
          dark: "#1F3B57",
          hover: "#3B678C",
        },
        secondary: {
          // A warm brown for secondary elements
          default: "#A5672E",
          light: "#C78044",
          dark: "#804E21",
          hover: "#C78044",
        },
        accent: {
          // A neutral gold/beige accent
          default: "#DABE82",
          light: "#EEE2B7",
          dark: "#B9A46D",
          hover: "#EEE2B7",
        },
        textColor: {
          // Mostly neutral text colors
          default: "#2D2D2D", 
          dark: "#1A1A1A", 
          light: "#F7F7F7", 
          muted: "#9CA3AF", 
        },
        errorColor: {
          // Standard red for errors
          default: "#E53E3E",
          light: "#FC8181",
        },
        spanColor: {
          // Slightly different hue for highlights or badges
          default: "#4C51BF",
        },
        labelColor: {
          // For form labels or minor headings
          default: "#1A1A1A",
          light: "#D1D5DB",
        },
        background: {
          // Backgrounds & surfaces
          default: "#FFFFFF",
          dark: "#1A202C",
          light: "#F3F4F6",
          hover: "#EDF2F7",
        },
      },
      animation: {
        slide: "slide 20s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      fontFamily: {
        // Optionally add your custom fonts here
        // e.g. pp: ["PP Neue Montreal", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-primary": theme("colors.primary.default"),
          "--color-primary-light": theme("colors.primary.light"),
          "--color-primary-dark": theme("colors.primary.dark"),
          "--color-primary-gold": theme("colors.primary.hover"),
          "--color-secondary": theme("colors.secondary.default"),
          "--color-accent": theme("colors.accent.default"),
        },
      });
    },
  ],
};
