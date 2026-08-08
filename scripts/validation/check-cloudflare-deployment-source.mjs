#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "../..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(repoRoot, relativePath), "utf8"));
}

function read(relativePath) {
  return readFileSync(resolve(repoRoot, relativePath), "utf8");
}

const websiteConfig = "apps/website/wrangler.toml";
const dashboardConfig = "apps/dashboard/wrangler.toml";

for (const path of [websiteConfig, dashboardConfig]) {
  if (!existsSync(resolve(repoRoot, path))) {
    fail(`Missing authoritative app-local Cloudflare config: ${path}`);
  }
}

if (existsSync(resolve(repoRoot, "wrangler.toml"))) {
  fail(
    "Root wrangler.toml is forbidden because it can silently target the wrong Worker.",
  );
}

for (const path of [
  "config/cloudflare/wrangler-example.toml",
  "config/cloudflare/wrangler-workers-example.toml",
  ".github/workflows/generate-pdfs.yml",
]) {
  if (existsSync(resolve(repoRoot, path))) {
    fail(`Stale deployment artifact must remain removed: ${path}`);
  }
}

const websitePackage = readJson("apps/website/package.json");
const dashboardPackage = readJson("apps/dashboard/package.json");
const websiteWrangler = websitePackage.devDependencies?.wrangler;
const dashboardWrangler = dashboardPackage.devDependencies?.wrangler;
const websiteOpenNext =
  websitePackage.devDependencies?.["@opennextjs/cloudflare"];
const dashboardOpenNext =
  dashboardPackage.devDependencies?.["@opennextjs/cloudflare"];

if (!/^\^?4\./.test(websiteWrangler ?? "")) {
  fail(
    `Website must use Wrangler v4.x; found ${websiteWrangler ?? "missing"}.`,
  );
}

if (
  websiteWrangler?.replace(/^\^/, "") !== dashboardWrangler?.replace(/^\^/, "")
) {
  fail(
    `Wrangler versions must match across apps; website=${websiteWrangler}, dashboard=${dashboardWrangler}.`,
  );
}

if (websiteOpenNext !== dashboardOpenNext) {
  fail(
    `OpenNext Cloudflare versions must match across apps; website=${websiteOpenNext}, dashboard=${dashboardOpenNext}.`,
  );
}

const workflow = read(".github/workflows/ci-cd.yml");
for (const required of [
  "push:",
  "branches: [main]",
  "Validate website Wrangler deployment bundle",
  "Validate dashboard Wrangler deployment bundle",
  "wrangler deploy --dry-run",
  "Deploy to Cloudflare Workers",
  "Deploy Dashboard API Worker",
]) {
  if (!workflow.includes(required)) {
    fail(`CI/CD workflow is missing required deployment control: ${required}`);
  }
}

const deployScript = read("scripts/deploy-opennext.mjs");
if (
  !deployScript.includes(
    'const wranglerConfigPath = join(appRoot, "wrangler.toml");',
  )
) {
  fail("Deploy script must require the app-local wrangler.toml.");
}

if (deployScript.includes('join(repoRoot, "wrangler.toml")')) {
  fail("Deploy script still contains the forbidden root Wrangler fallback.");
}

if (failures.length > 0) {
  console.error("Cloudflare deployment source check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Cloudflare deployment source check passed: Wrangler ${websiteWrangler}, OpenNext ${websiteOpenNext}.`,
);
