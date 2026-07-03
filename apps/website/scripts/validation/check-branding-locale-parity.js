#!/usr/bin/env node

/**
 * Branding Locale Parity Check
 *
 * Validates:
 * - app/root home message files stay synchronized (EN + ES)
 * - EN canonical branding phrases remain present
 * - ES preserves canonical EN phrases with Spanish companion text
 * - EN/ES key-path coverage remains aligned for core home messaging payloads
 */

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const APP_EN_FILE = path.join(APP_ROOT, "messages", "home", "en.json");
const APP_ES_FILE = path.join(APP_ROOT, "messages", "home", "es.json");
const ROOT_EN_FILE = path.join(REPO_ROOT, "messages", "home", "en.json");
const ROOT_ES_FILE = path.join(REPO_ROOT, "messages", "home", "es.json");

const REQUIRED_EN_PHRASES = [
  "Built on Quality, Backed by Trust.",
  "Squared away from start to finish.",
  "From Handshake to Handoff, we got your 'six.'",
  "Professional on the line. Thorough in the details.",
  "No gaps. No guesswork. Just accountable follow-through.",
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function collectPaths(value, prefix = "", result = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((entry, idx) => {
      collectPaths(entry, `${prefix}[${idx}]`, result);
    });
    return result;
  }

  if (value && typeof value === "object") {
    Object.keys(value)
      .sort()
      .forEach((key) => {
        const next = prefix ? `${prefix}.${key}` : key;
        result.add(next);
        collectPaths(value[key], next, result);
      });
    return result;
  }

  if (prefix) {
    result.add(prefix);
  }
  return result;
}

function assertRootAppParity(appJson, rootJson, locale) {
  if (!deepEqual(appJson, rootJson)) {
    fail(
      `Root/app home message payload drift detected for locale ${locale}. Run docs/message sync and resolve differences.`,
    );
  }
}

function assertEnPhrasesPresent(enString) {
  for (const phrase of REQUIRED_EN_PHRASES) {
    if (!enString.includes(phrase)) {
      fail(`EN home messages missing canonical phrase: ${phrase}`);
    }
  }
}

function assertEsPhraseCompanions(esString) {
  for (const phrase of REQUIRED_EN_PHRASES) {
    const regex = new RegExp(`${escapeRegExp(phrase)}\\s*\\(`);
    if (!regex.test(esString)) {
      fail(
        `ES home messages must preserve EN canonical phrase with Spanish companion: ${phrase}`,
      );
    }
  }
}

function assertLocalePathParity(enJson, esJson) {
  const enPaths = collectPaths(enJson);
  const esPaths = collectPaths(esJson);

  const missingInEs = [...enPaths].filter((entry) => !esPaths.has(entry));
  const extraInEs = [...esPaths].filter((entry) => !enPaths.has(entry));

  if (missingInEs.length > 0) {
    fail(
      `ES home messages missing EN key paths (sample): ${missingInEs
        .slice(0, 10)
        .join(", ")}`,
    );
  }

  if (extraInEs.length > 0) {
    fail(
      `ES home messages contain non-parity key paths (sample): ${extraInEs
        .slice(0, 10)
        .join(", ")}`,
    );
  }
}

function main() {
  const appEn = readJson(APP_EN_FILE);
  const appEs = readJson(APP_ES_FILE);
  const rootEn = readJson(ROOT_EN_FILE);
  const rootEs = readJson(ROOT_ES_FILE);

  assertRootAppParity(appEn, rootEn, "en");
  assertRootAppParity(appEs, rootEs, "es");
  assertLocalePathParity(appEn, appEs);

  const enString = JSON.stringify(appEn);
  const esString = JSON.stringify(appEs);
  assertEnPhrasesPresent(enString);
  assertEsPhraseCompanions(esString);

  console.log(
    "PASS: Branding locale parity is synchronized (root/app parity, key paths, canonical EN/ES phrase handling).",
  );
}

main();
