import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/server/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      fontFamily: {
        serif: ["Newsreader", "serif"],
        sans: ["Outfit", "sans-serif"],
        condensed: ["Roboto Condensed", "sans-serif"],
      },
      minWidth: {
        article: "var(--max-width-article)",
      },
      maxWidth: {
        article: "var(--max-width-article)",
      },
      width: {
        article: "var(--max-width-article)",
      },
      listStyleType: {
        "lower-alpha": "lower-alpha",
      },
    },
  },
  plugins: [],
} satisfies Config;
