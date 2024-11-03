import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-source-sans)", ...fontFamily.sans],
        mono: ["var(--font-source-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
