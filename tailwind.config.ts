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
        bg: {
          DEFAULT: "#FBFAF7",
          paper: "#F4F1EA",
          subtle: "#ECE7DE",
        },
        navy: {
          DEFAULT: "#14213D",
          light: "#2B3954",
          muted: "#5C677D",
          hairline: "rgba(20, 33, 61, 0.12)",
        },
        serbian: {
          red: "#B3202A",
          redDark: "#941B22",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderWidth: {
        hairline: "1px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
