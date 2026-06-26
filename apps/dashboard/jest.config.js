/**
 * MH Construction Dashboard - Jest Configuration
 */

const nextJest = require("next/jest");
const path = require("node:path");

const createJestConfig = nextJest({
  dir: "./",
});

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
const sharedModuleMap = {};
sharedLibs.forEach((lib) => {
  sharedModuleMap[`^@/lib/${lib}/(.*)$`] = `${sharedRoot}/${lib}/$1`;
  sharedModuleMap[`^@/lib/${lib}$`] = `${sharedRoot}/${lib}`;
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "^@opennextjs/cloudflare$": "<rootDir>/test/mocks/opennext-cloudflare.js",
    // Shared lib resolves from packages/shared
    ...sharedModuleMap,
    // App-specific
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/app/layout.tsx",
    "!src/**/index.ts",
    "!src/types/**",
  ],

  coverageProvider: "v8",

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/.open-next/",
    "/.wrangler/",
    "/coverage/",
    // Test utility helpers — not test suites themselves
    "/__tests__/helpers/",
  ],

  modulePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/.open-next/",
    "<rootDir>/.wrangler/",
    "<rootDir>/coverage/",
  ],

  cacheDirectory: "<rootDir>/node_modules/.cache/jest",
  coverageReporters: ["text", "lcov", "html", "json"],
  maxWorkers: process.env.CI ? 2 : "50%",
};

module.exports = createJestConfig(customJestConfig);
