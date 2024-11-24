import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0369A1",
        "main-darker": "#44403C",
      },
      textColor: {
        muted: "#A1A1AA",
      },
      fontFamily: { "jetBrains-mono": "var(--jet-brains-mono)" },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 44px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0, 28px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 150ms ease-in",
      },
    },
  },
  plugins: [],
};
export default config;
