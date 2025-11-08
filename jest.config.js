/**
 * MH Construction - Jest Configuration
 *
 * Test configuration for Next.js 15 with TypeScript
 * Unit and integration testing with coverage tracking
 *
 * @see https://nextjs.org/docs/app/building-your-application/testing/jest
 * @see docs/testing/mh-testing-guide.md
 * @version 2.0.0
 * @lastUpdated 2025-11-08
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
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },

  // Test file patterns
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Ignore patterns
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/backups/",
    "/.config-backup/",
  ],

  // Coverage report formats
  coverageReporters: ["text", "lcov", "html", "json"],

  // Max workers for CI
  maxWorkers: process.env.CI ? 2 : "50%",
};

// Export Jest config
module.exports = createJestConfig(customJestConfig);
