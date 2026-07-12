const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Reuse the website Next.js context for SWC/Jest transforms.
  dir: "../../apps/website",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/../../jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/contexts/auth-context$": "<rootDir>/src/lib/auth/auth-context",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@opennextjs/cloudflare$":
      "<rootDir>/../../apps/website/test/mocks/opennext-cloudflare.js",
    "^next-intl$": "<rootDir>/../../apps/website/test/mocks/next-intl.js",
    "^next-intl/server$":
      "<rootDir>/../../apps/website/test/mocks/next-intl-server.js",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/index.ts",
    "!src/**/index.tsx",
  ],
  coverageProvider: "v8",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/coverage/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(next-intl|use-intl|@formatjs)/)",
  ],
  cacheDirectory: "<rootDir>/node_modules/.cache/jest",
};

module.exports = createJestConfig(customJestConfig);
