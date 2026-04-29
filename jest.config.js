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
    "/backups/",
    // Shared test utilities — not test suites themselves
    "/__tests__/helpers/",
  ],

  // Coverage report formats
  coverageReporters: ["text", "lcov", "html", "json"],

  // Max workers for CI
  maxWorkers: process.env.CI ? 2 : "50%",
};

// Export Jest config
module.exports = createJestConfig(customJestConfig);
