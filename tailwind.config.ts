import { Transform } from "stream";
import { renderUrlImage } from "./utils/log-helper";
import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg1: renderUrlImage(
          "https://baodienbienphu.vn/assets/images/home/bg.jpg"
        ),
        bg2: renderUrlImage(
          "https://baodienbienphu.vn/assets/images/home/bg1.jpg"
        ),
      },
    },
  },
  plugins: [],
};
export default config;
