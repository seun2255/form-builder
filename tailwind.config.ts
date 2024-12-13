import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      xxxl: { max: "3019px" },
      xxl: { max: "2560px" },
      xl: { max: "1920px" },
      "desktop-l": { max: "1880px" },
      "desktop-m": { max: "1680px" },
      "laptop-x": { max: "1440px" },
      "laptop-m": { max: "1280px" },
      "nav-lg": { max: "1328px" },
      "profile-md": { max: "1450px" },
      "profile-sm": { max: "1340px" },
      "banner-tablet": { max: "1060px" },
      "tablet-notifications": { max: "855px" },
      "settings-small": { max: "1069px" },
      "settings-xs": { max: "890px" },
      lg: { max: "1190px" },
      md: { max: "991px" },
      sm: { max: "767px" },
      xs: { max: "414px" },
      xxs: { max: "375px" },
      "2xl": "1921px",
      DEFAULT: "1576px",
    },
  },
  plugins: [],
} satisfies Config;
