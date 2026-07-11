/**
 * MH Construction - Jest Configuration
 *
 * Test configuration for Next.js 16 with TypeScript
 * Unit and integration testing with coverage tracking
 *
 * @see https://nextjs.org/docs/app/building-your-application/testing/jest
 * @see apps/website/testing/mh-testing-guide.md
 * @version 2.1.0
 * @lastUpdated 2026-04-29
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide path to Next.js app to load next.config.js and .env files
  dir: "./",
});

// Custom Jest configuration
const customJestConfig = {
  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Test environment
  testEnvironment: "jest-environment-jsdom",

  // Module name mapping (path aliases)
  moduleNameMapper: {
    "^@opennextjs/cloudflare$":
      "<rootDir>/apps/website/test/mocks/opennext-cloudflare.js",
    "^next-intl$": "<rootDir>/apps/website/test/mocks/next-intl.js",
    "^next-intl/server$":
      "<rootDir>/apps/website/test/mocks/next-intl-server.js",
    // Dashboard-specific aliases used by dashboard test suites opened from
    // the repository root (Problems panel/Jest extension context).
    "^@/lib/dashboard/read-model$":
      "<rootDir>/apps/dashboard/src/lib/dashboard/read-model",
    "^@/lib/hub/resources$": "<rootDir>/apps/dashboard/src/lib/hub/resources",
    "^@/app/api/analytics/overview/route$":
      "<rootDir>/apps/dashboard/src/app/api/analytics/overview/route",
    "^@/app/api/analytics/leads/route$":
      "<rootDir>/apps/dashboard/src/app/api/analytics/leads/route",
    "^@/app/api/analytics/safety/route$":
      "<rootDir>/apps/dashboard/src/app/api/analytics/safety/route",
    "^@/app/api/analytics/drivers/route$":
      "<rootDir>/apps/dashboard/src/app/api/analytics/drivers/route",
    "^@/app/api/analytics/access-log/route$":
      "<rootDir>/apps/dashboard/src/app/api/analytics/access-log/route",
    "^@/(.*)$": "<rootDir>/apps/website/src/$1",
  },

  // Coverage collection
  collectCoverageFrom: [
    "apps/website/src/**/*.{js,jsx,ts,tsx}",
    "!apps/website/src/**/*.d.ts",
    "!apps/website/src/**/*.stories.{js,jsx,ts,tsx}",
    "!apps/website/src/**/__tests__/**",
    "!apps/website/src/app/layout.tsx",
    "!apps/website/src/app/**/layout.tsx",
    // Barrel re-export files — no executable logic, just re-exports
    "!apps/website/src/**/index.ts",
    "!apps/website/src/**/index.tsx",
    // Pure TypeScript type declaration files — no executable code
    "!apps/website/src/types/**",
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
    "/documents/generated-pdfs/",
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
    "<rootDir>/documents/generated-pdfs/",
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
