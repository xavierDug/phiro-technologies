import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // src/components/ui is registry-owned: files are installed verbatim from
    // shadcn / Magic UI / React Bits and re-installed on update. Linting them to
    // our standards would mean hand-editing vendor code that the next
    // `shadcn add --overwrite` throws away. Our own code is still fully linted.
    files: ["src/components/ui/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "prefer-const": "off",
    },
  },
];

export default eslintConfig;
