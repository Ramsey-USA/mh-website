import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * MH Construction - Modern ESLint Configuration
 *
 * Modern flat config (ESLint 9+) optimized for Next.js 15 with TypeScript
 * Production-ready rules ensuring code quality and consistency
 *
 * @see docs/technical/configuration-guide.md
 * @version 2.0.0
 * @lastUpdated 2025-11-08
 */
const eslintConfig = [
  // === IGNORE PATTERNS ===
  {
    ignores: [
      // Build outputs
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      ".turbo/**",

      // Dependencies
      "node_modules/**",

      // Config files (allow manual review)
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "postcss.config.js",

      // Test files
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "__tests__/**",
      "**/__mocks__/**",

      // Scripts and tooling
      "scripts/**/*.js",
      "scripts/**/*.mjs",

      // Next.js generated files
      "next-env.d.ts",

      // Backups
      "**/*.bak",
      "**/*.backup",
      ".config-backup/**",

      // IDE and OS files
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo",
      ".DS_Store",
    ],
  },

  // === BASE CONFIGURATION ===
  // Extend Next.js recommended configs (ensure Next plugin detected)
  ...compat.extends("next", "next/core-web-vitals", "next/typescript"),

  // === CUSTOM RULES ===
  {
    rules: {
      // === React & Next.js Rules ===
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off", // Allow typographic quotes
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "warn",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-danger": "off", // Allowed for JSON-LD structured data
      "react/prop-types": "off", // Using TypeScript instead

      // === TypeScript Rules ===
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // === General Code Quality ===
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "warn",

      // === Import Organization ===
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../**/components/*", "../../**/components/*"],
              message: "Use @/components/* instead of relative imports",
            },
            {
              group: ["../**/hooks/*", "../../**/hooks/*"],
              message: "Use @/hooks/* instead of relative imports",
            },
            {
              group: ["../**/lib/*", "../../**/lib/*"],
              message: "Use @/lib/* instead of relative imports",
            },
            {
              group: ["../**/types/*", "../../**/types/*"],
              message: "Use @/types/* instead of relative imports",
            },
          ],
        },
      ],

      // === Code Style ===
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "multi-line", "consistent"],
      "brace-style": ["warn", "1tbs", { allowSingleLine: true }],

      // === Best Practices ===
      "no-implicit-coercion": "warn",
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "warn",
      "require-await": "warn",
      "no-return-await": "warn",

      // === Accessibility ===
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    },
  },
];

export default eslintConfig;
