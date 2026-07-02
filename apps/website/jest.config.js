/**
 * MH Construction - Jest Configuration
 *
 * Test configuration for Next.js 16 with TypeScript
 * Unit and integration testing with coverage tracking
 *
 * @see https://nextjs.org/docs/app/building-your-application/testing/jest
 * @see testing/mh-testing-guide.md
 * @version 2.1.0
 * @lastUpdated 2026-04-29
 */

const nextJest = require("next/jest");
const path = require("node:path");

const createJestConfig = nextJest({
  // Provide path to Next.js app to load next.config.js and .env files
  dir: "./",
});

// Shared lib module mappings — mirrors the tsconfig paths and webpack aliases.
// Each `@/lib/<module>` import resolves to packages/shared/src/lib/<module>.
const sharedRoot = path.resolve(__dirname, "../../packages/shared/src/lib");
const sharedLibs = [
  "db",
  "auth",
  "security",
  "utils",
  "constants",
  "types",
  "cloudflare",
  "api",
  "email",
  "notifications",
  "analytics",
  "monitoring",
  "safety",
];
// Two patterns per lib: bare import (@/lib/X) and sub-path import (@/lib/X/foo).
// Using a plain object with unique keys (bare first, sub-path second so Jest
// tries the more-specific sub-path pattern first due to its ordering strategy).
const sharedModuleMap = {};
sharedLibs.forEach((lib) => {
  // Sub-path: @/lib/constants/company → packages/shared/src/lib/constants/company
  sharedModuleMap[`^@/lib/${lib}/(.*)$`] = `${sharedRoot}/${lib}/$1`;
  // Bare: @/lib/constants → packages/shared/src/lib/constants
  sharedModuleMap[`^@/lib/${lib}$`] = `${sharedRoot}/${lib}`;
});

// Custom Jest configuration
const customJestConfig = {
  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Test environment
  testEnvironment: "jest-environment-jsdom",

  // Module name mapping (path aliases)
  moduleNameMapper: {
    "^@opennextjs/cloudflare$": "<rootDir>/test/mocks/opennext-cloudflare.js",
    "^@/lib/constants/company$": "<rootDir>/test/mocks/company-constants.js",
    "^next-intl$": "<rootDir>/test/mocks/next-intl.js",
    "^next-intl/server$": "<rootDir>/test/mocks/next-intl-server.js",
    // Shared lib resolves from packages/shared (mirrors tsconfig paths + webpack aliases)
    ...sharedModuleMap,
    // App-specific modules
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/app/layout.tsx",
    "!src/app/**/layout.tsx",
    // Barrel re-export files — no executable logic, just re-exports
    "!src/**/index.ts",
    "!src/**/index.tsx",
    // Pure TypeScript type declaration files — no executable code
    "!src/types/**",
  ],

  // Use V8 coverage provider instead of the default babel/istanbul provider.
  // babel-plugin-istanbul depends on test-exclude which calls promisify() on
  // an Object under Node ≥20, crashing the coverage worker. V8 coverage is
  // built into the runtime, faster, and more accurate for ESM + dynamic imports.
  coverageProvider: "v8",

  // Coverage thresholds
  // Global thresholds are intentionally not enforced: coverage spans the entire
  // src/ tree, but only core utilities currently have unit tests (~1% global).
  // As test coverage grows, re-enable with realistic per-directory thresholds.
  // coverageThreshold: { global: { branches: 60, functions: 60, lines: 60, statements: 60 } },

  // Test file patterns
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Ignore patterns
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/.open-next/",
    "/.wrangler/",
    "/backups/",
    "/coverage/",
    "/lighthouse-results/",
    "/documents/output/",
    "/public/docs/",
    // Shared test utilities — not test suites themselves
    "/__tests__/helpers/",
  ],

  // Some dependencies ship ESM-only builds (for example next-intl/use-intl).
  // Let Jest transform them instead of ignoring node_modules entirely.
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl|use-intl|@formatjs)/)",
  ],

  // Skip Haste map scans of large generated trees (faster startup)
  modulePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/.open-next/",
    "<rootDir>/.wrangler/",
    "<rootDir>/coverage/",
    "<rootDir>/lighthouse-results/",
    "<rootDir>/documents/output/",
    "<rootDir>/public/docs/",
    "<rootDir>/backups/",
  ],

  // Persistent transform cache (rebuilds skip ts->js for unchanged files)
  cacheDirectory: "<rootDir>/node_modules/.cache/jest",

  // Coverage report formats
  coverageReporters: ["text", "lcov", "html", "json"],

  // Max workers for CI
  maxWorkers: process.env.CI ? 2 : "50%",
};

// Export Jest config
module.exports = createJestConfig(customJestConfig);
