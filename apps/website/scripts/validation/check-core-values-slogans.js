#!/usr/bin/env node

/**
 * Core Values Slogan Validator
 *
 * Enforces unique primary/supported slogan pairs for the four core values
 * in the English home messaging payload.
 *
 * Usage:
 *   node scripts/validation/check-core-values-slogans.js
 */

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");
const EN_HOME_MESSAGES = path.join(REPO_ROOT, "messages", "home", "en.json");
const ES_HOME_MESSAGES = path.join(REPO_ROOT, "messages", "home", "es.json");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function main() {
  const raw = fs.readFileSync(EN_HOME_MESSAGES, "utf8");
  const parsed = JSON.parse(raw);
  const esRaw = fs.readFileSync(ES_HOME_MESSAGES, "utf8");
  const esParsed = JSON.parse(esRaw);
  const values = parsed?.coreValues?.values;
  const esValues = esParsed?.coreValues?.values;

  if (!Array.isArray(values) || values.length !== 4) {
    fail(
      "messages/home/en.json must define exactly 4 coreValues.values entries.",
    );
  }

  if (!Array.isArray(esValues) || esValues.length !== 4) {
    fail(
      "messages/home/es.json must define exactly 4 coreValues.values entries.",
    );
  }

  const requiredNames = new Set([
    "Honesty",
    "Integrity",
    "Professionalism",
    "Thoroughness",
  ]);

  const names = new Set();
  const primarySet = new Set();
  const supportingSet = new Set();

  for (const value of values) {
    const name = value?.value;
    const primary = value?.valueSlogan;
    const supporting = value?.supportingSlogan;

    if (typeof name !== "string" || !name.trim()) {
      fail("Each core value must include a non-empty value name.");
    }

    names.add(name);

    if (typeof primary !== "string" || !primary.trim()) {
      fail(`Core value ${name} is missing valueSlogan.`);
    }

    if (typeof supporting !== "string" || !supporting.trim()) {
      fail(`Core value ${name} is missing supportingSlogan.`);
    }

    if (primarySet.has(primary)) {
      fail(`Duplicate valueSlogan detected: ${primary}`);
    }

    if (supportingSet.has(supporting)) {
      fail(`Duplicate supportingSlogan detected: ${supporting}`);
    }

    primarySet.add(primary);
    supportingSet.add(supporting);
  }

  for (const requiredName of requiredNames) {
    if (!names.has(requiredName)) {
      fail(`Missing required core value: ${requiredName}`);
    }
  }

  for (let i = 0; i < values.length; i += 1) {
    const enPrimary = values[i].valueSlogan;
    const enSupporting = values[i].supportingSlogan;
    const esValue = esValues[i];

    if (
      typeof esValue?.valueSlogan !== "string" ||
      !esValue.valueSlogan.trim()
    ) {
      fail(`messages/home/es.json is missing valueSlogan for index ${i}.`);
    }

    if (
      typeof esValue?.supportingSlogan !== "string" ||
      !esValue.supportingSlogan.trim()
    ) {
      fail(`messages/home/es.json is missing supportingSlogan for index ${i}.`);
    }

    if (!esValue.valueSlogan.startsWith(`${enPrimary} (`)) {
      fail(
        `Spanish valueSlogan at index ${i} must preserve EN canonical phrase prefix: ${enPrimary}`,
      );
    }

    if (!esValue.supportingSlogan.startsWith(`${enSupporting} (`)) {
      fail(
        `Spanish supportingSlogan at index ${i} must preserve EN canonical phrase prefix: ${enSupporting}`,
      );
    }

    if (!esValue.valueSlogan.endsWith(")")) {
      fail(
        `Spanish valueSlogan at index ${i} must include parenthetical translation.`,
      );
    }

    if (!esValue.supportingSlogan.endsWith(")")) {
      fail(
        `Spanish supportingSlogan at index ${i} must include parenthetical translation.`,
      );
    }
  }

  console.log(
    "PASS: Core value slogan pairs are complete, unique, and synchronized for EN/ES.",
  );
}

main();
