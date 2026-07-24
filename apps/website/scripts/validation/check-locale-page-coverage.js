#!/usr/bin/env node

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const APP_DIR = path.join(APP_ROOT, "src", "app");
const REPORT_FILE = path.join(APP_ROOT, "tmp", "spanish-coverage-report.md");
const SMOKE_TEST_FILE = path.join(
  APP_ROOT,
  "src",
  "app",
  "__tests__",
  "pages-smoke.test.tsx",
);

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function routeFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath).replace(/\\/g, "/");
  if (rel === "page.tsx") return "/";
  if (!rel.endsWith("/page.tsx")) return null;

  const route = `/${rel.slice(0, -"/page.tsx".length)}`;
  if (route.startsWith("/api/")) return null;
  return route;
}

function parseReportRoutes(reportRaw) {
  const routes = new Set();
  for (const line of reportRaw.split(/\r?\n/)) {
    const match = line.match(
      /^\|([^|]+)\|(?:LOCALIZED|INVARIANT-REVIEW|MISSING-SIGNAL)\|/,
    );
    if (!match) continue;
    const route = match[1].trim();
    if (route.startsWith("/")) {
      routes.add(route);
    }
  }
  return routes;
}

function toSmokeImportToken(route) {
  return `../${route.slice(1)}/page`;
}

function main() {
  if (!fs.existsSync(REPORT_FILE)) {
    fail(
      `Expected report file not found: ${path.relative(APP_ROOT, REPORT_FILE)}. Run report:spanish:coverage first.`,
    );
  }

  if (!fs.existsSync(SMOKE_TEST_FILE)) {
    fail(
      `Smoke test file not found: ${path.relative(APP_ROOT, SMOKE_TEST_FILE)}`,
    );
  }

  const pageFiles = walk(APP_DIR).filter((file) => file.endsWith("page.tsx"));
  const discoveredRoutes = pageFiles
    .map(routeFromPageFile)
    .filter((route) => route !== null);

  const staticRoutes = discoveredRoutes.filter((route) => !route.includes("["));
  const dynamicRoutes = discoveredRoutes.filter((route) => route.includes("["));

  const reportRoutes = parseReportRoutes(fs.readFileSync(REPORT_FILE, "utf8"));
  const smokeSource = fs.readFileSync(SMOKE_TEST_FILE, "utf8");

  const missingStaticCoverage = staticRoutes.filter(
    (route) => !reportRoutes.has(route),
  );
  if (missingStaticCoverage.length > 0) {
    fail(
      `Static routes missing from Spanish coverage report: ${missingStaticCoverage.join(", ")}`,
    );
  }

  const missingDynamicCoverage = dynamicRoutes.filter((route) => {
    const token = toSmokeImportToken(route);
    return !smokeSource.includes(token);
  });

  if (missingDynamicCoverage.length > 0) {
    fail(
      `Dynamic routes missing from pages-smoke locale coverage imports: ${missingDynamicCoverage.join(", ")}`,
    );
  }

  console.log(
    `PASS: Locale coverage references all discovered public page routes (static=${staticRoutes.length}, dynamic=${dynamicRoutes.length}, total=${discoveredRoutes.length}).`,
  );
}

main();
