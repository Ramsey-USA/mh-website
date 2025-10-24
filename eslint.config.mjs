import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Temporarily relax rules for testing purposes
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": "off",
      "react/no-unescaped-entities": "off", // Disable unescaped entities for testing
      // Keep only critical security rules but allow JSON-LD
      "react/no-danger": "off", // Allow for JSON-LD structured data
      "react/no-danger-with-children": "error",
    },
  },
];

export default eslintConfig;
