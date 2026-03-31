/**
 * MH Construction - Jest Configuration
 *
 * Test configuration for Next.js 15 with TypeScript
 * Unit and integration testing with coverage tracking
 *
 * @see https://nextjs.org/docs/app/building-your-application/testing/jest
 * @see docs/testing/mh-testing-guide.md
 * @version 3.0.0
 * @lastUpdated 2026-03-31
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

  // Coverage collection — every source file except:
  //   • TypeScript declaration files (.d.ts)
  //   • Storybook story files
  //   • Test files themselves
  //   • Next.js layout wrappers (pure composition, no testable logic)
  //   • Next.js loading skeletons (trivial UI stubs)
  //   • Next.js API route handlers — server-side only; covered by
  //     the existing integration tests in src/__tests__/integration/
  //   • Static-generation helpers (robots.ts, sitemap.ts, not-found.tsx)
  //     that only export metadata objects with no branching logic
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/app/layout.tsx",
    "!src/app/**/layout.tsx",
    "!src/app/**/loading.tsx",
    "!src/app/**/route.ts",
    "!src/app/robots.ts",
    "!src/app/sitemap.ts",
    "!src/app/not-found.tsx",
    "!src/app/error.tsx",
    "!src/app/global-error.tsx",
  ],

  // Coverage thresholds — enforced against the filtered file list above.
  // Security-critical and core-utility modules are fully tested (80–100%).
  // The global floor accounts for remaining component/page stubs that have
  // render-only tests but not full branch coverage yet.
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 15,
      functions: 20,
      lines: 20,
    },
    // Security modules must maintain high coverage
    "src/lib/security/sanitization.ts": {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
    "src/lib/security/security-manager.ts": {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
    "src/lib/utils/validation.ts": {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },

  // Test file patterns
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Ignore patterns
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/backups/"],

  // Coverage report formats
  coverageReporters: ["text", "lcov", "html", "json"],

  // Max workers for CI
  maxWorkers: process.env.CI ? 2 : "50%",
};

// Export Jest config
module.exports = createJestConfig(customJestConfig);
