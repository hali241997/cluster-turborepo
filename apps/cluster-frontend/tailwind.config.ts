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
        background: "#13181E",
        darkPrimary: "#222C36",
        greyPrimary: "#242C35",
        greySecondary: "#2D3E4E",
        whitePrimary: "#f3f3f3",
        whiteSecondary: "#C7CACC",
        whiteTertiary: "#A6AAAE",
        bluePrimary: "#00A3CA",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      fontSize: {
        h1: ["20px", { lineHeight: "28px", fontWeight: 300 }],
        h2: ["18px", { lineHeight: "28px" }],
        h3: ["16px", { lineHeight: "24px", fontWeight: 500 }],
      },
    },
  },
  plugins: [],
};
export default config;
