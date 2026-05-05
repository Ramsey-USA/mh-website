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
  "db", "auth", "security", "utils", "constants",
  "types", "cloudflare", "api", "email", "notifications",
  "analytics", "monitoring", "safety",
];

const sharedModuleMap = Object.fromEntries(
  sharedLibs.map((lib) => [
    `^@/lib/${lib}(/(.*))?$`,
    `${sharedRoot}/${lib}$2`,
  ])
);

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
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
