import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "480px",
        ssm: "600px",
        md: "790px",
        xl: "880px",
        "1xl": "1140px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
