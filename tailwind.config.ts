import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    variants: {
      extend: {
        borderColor: ["group-hover"],
      },
    },
  },
};

export default config;
