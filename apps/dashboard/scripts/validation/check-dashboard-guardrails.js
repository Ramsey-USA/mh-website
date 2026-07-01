#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const appRoot = path.resolve(__dirname, "..", "..");
const wranglerPath = path.join(appRoot, "wrangler.toml");
const deployScriptPath = path.join(
  appRoot,
  "..",
  "..",
  "scripts",
  "deploy-opennext.mjs",
);

const requiredDashboardRoutePatterns = [
  "www.mhc-gc.com/dashboard*",
  "www.mhc-gc.com/hub*",
  "www.mhc-gc.com/api/auth/*",
  "www.mhc-gc.com/api/safety/*",
  "www.mhc-gc.com/api/drivers/*",
  "www.mhc-gc.com/api/leads/*",
  "www.mhc-gc.com/api/analytics/dashboard*",
  "www.mhc-gc.com/api/testimonials/*",
  "www.mhc-gc.com/api/team-profile/*",
  "www.mhc-gc.com/api/functions/*",
  "www.mhc-gc.com/api/security/*",
];

function fail(message) {
  console.error(`FAIL: ${message}`);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

let hasFailures = false;

if (!fs.existsSync(wranglerPath)) {
  fail("apps/dashboard/wrangler.toml is missing.");
  process.exit(1);
}

const wranglerToml = fs.readFileSync(wranglerPath, "utf8");

if (/REPLACE_WITH_/i.test(wranglerToml)) {
  hasFailures = true;
  fail(
    "wrangler.toml contains placeholder values (REPLACE_WITH_*). Replace them before deploy.",
  );
} else {
  pass("No placeholder values detected in apps/dashboard/wrangler.toml.");
}

for (const routePattern of requiredDashboardRoutePatterns) {
  const escaped = routePattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patternRegex = new RegExp(`pattern\\s*=\\s*"${escaped}"`);
  if (!patternRegex.test(wranglerToml)) {
    hasFailures = true;
    fail(`Missing dashboard route pattern: ${routePattern}`);
  }
}

if (!hasFailures) {
  pass("All required dashboard route patterns are present.");
}

if (!fs.existsSync(deployScriptPath)) {
  hasFailures = true;
  fail("scripts/deploy-opennext.mjs is missing.");
} else {
  const deployScript = fs.readFileSync(deployScriptPath, "utf8");
  const expectsLocalWrangler = deployScript.includes(
    'existsSync(join(appRoot, "wrangler.toml"))',
  );
  if (!expectsLocalWrangler) {
    hasFailures = true;
    fail(
      "Deploy script does not prioritize app-local wrangler.toml; dashboard deploys may target wrong worker config.",
    );
  } else {
    pass("Deploy script prioritizes app-local wrangler.toml.");
  }
}

if (hasFailures) {
  console.error("\nDashboard guardrails check failed.");
  process.exit(1);
}

console.log("\nDashboard guardrails check passed.");
