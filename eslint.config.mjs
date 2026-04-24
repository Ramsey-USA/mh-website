import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/**
 * MH Construction - Modern ESLint Configuration
 *
 * Modern flat config (ESLint 9+) optimized for Next.js 15 with TypeScript
 * Production-ready rules ensuring code quality and consistency
 *
 * @see docs/project/architecture.md
 * @version 2.1.0
 * @lastUpdated 2026-03-26
 */
const eslintConfig = [
  // === IGNORE PATTERNS ===
  {
    ignores: [
      // Build outputs
      ".next/**",
      ".open-next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      ".turbo/**",
      ".vercel/**",

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

      // IDE and OS files
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo",
      ".DS_Store",

      // Temporary and generation scripts (not production code)
      "tmp/**",
      "documents/scripts/**",
    ],
  },

  // === BASE CONFIGURATION ===
  // Use legacy-compatible preset names. Note: @next/next core-web-vitals
  // preset is temporarily excluded because the current plugin config shape
  // triggers ESLint 9 schema validation errors in FlatCompat.
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ),

  // === CUSTOM RULES ===
  {
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      "@next/next": nextPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // === React & Next.js Rules ===
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Disabled: these Next 16 rules flag intentional React patterns
      // (hydration guards, data-fetch-on-mount, media-query sync, useRef init)
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
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

      // === Quality Control - Prevent Dead Code ===
      "no-warning-comments": [
        "warn",
        {
          terms: ["FIXME", "XXX", "HACK"],
          location: "start",
        },
      ],
      "no-unreachable": "error",
      "no-unused-labels": "error",
      "no-useless-catch": "warn",
      "no-useless-escape": "warn",

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
