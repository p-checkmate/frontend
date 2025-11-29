import tailwindPlugin from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  plugins: [tailwindPlugin], // 이렇게 직접 넣어주면 무조건 작동합니다.
};
