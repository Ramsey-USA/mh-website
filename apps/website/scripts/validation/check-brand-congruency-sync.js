#!/usr/bin/env node

/**
 * Brand Congruency Sync Check
 *
 * Prevents content drift by validating that core-value slogan pairs remain
 * synchronized across:
 * - packages/shared core constants
 * - apps/website/messages/home/en.json
 * - apps/website/messages/home/es.json
 * - root messages/home/en.json
 * - root messages/home/es.json
 * - CoreValuesSection localization bindings
 * - branding QA checklist documentation
 *
 * Usage:
 *   node scripts/validation/check-brand-congruency-sync.js
 */

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const CONSTANTS_FILE = path.join(
  REPO_ROOT,
  "packages",
  "shared",
  "src",
  "lib",
  "constants",
  "company.ts",
);
const EN_MESSAGES_FILE = path.join(REPO_ROOT, "messages", "home", "en.json");
const ES_MESSAGES_FILE = path.join(REPO_ROOT, "messages", "home", "es.json");
const CORE_VALUES_COMPONENT_FILE = path.join(
  APP_ROOT,
  "src",
  "components",
  "home",
  "CoreValuesSection.tsx",
);
const QA_CHECKLIST_FILE = path.join(
  REPO_ROOT,
  "docs",
  "branding",
  "strategy",
  "brand-congruency-qa-checklist.md",
);

const CORE_VALUE_KEYS = [
  "honesty",
  "integrity",
  "professionalism",
  "thoroughness",
];

const CORE_VALUE_NAMES = [
  "Honesty",
  "Integrity",
  "Professionalism",
  "Thoroughness",
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function extractConstantsCoreValues(source) {
  const result = {};

  for (const key of CORE_VALUE_KEYS) {
    const regex = new RegExp(
      `${key}:\\s*\\{[\\s\\S]*?primary:\\s*"([^"]+)"[\\s\\S]*?supporting:\\s*"([^"]+)"`,
      "m",
    );

    const match = source.match(regex);
    if (!match) {
      fail(
        `Could not parse COMPANY_INFO.slogan.coreValues.${key} from company.ts`,
      );
    }

    result[key] = {
      primary: match[1],
      supporting: match[2],
    };
  }

  return result;
}

function validateEnMessages(enMessages, constantsMap) {
  const values = enMessages?.coreValues?.values;

  if (!Array.isArray(values) || values.length !== 4) {
    fail(
      "messages/home/en.json must define exactly 4 coreValues.values entries.",
    );
  }

  for (let i = 0; i < CORE_VALUE_NAMES.length; i += 1) {
    const expectedName = CORE_VALUE_NAMES[i];
    const expectedKey = CORE_VALUE_KEYS[i];
    const row = values[i];

    if (row?.value !== expectedName) {
      fail(
        `messages/home/en.json core value index ${i} must be ${expectedName}, found ${row?.value}`,
      );
    }

    if (row?.valueSlogan !== constantsMap[expectedKey].primary) {
      fail(
        `EN valueSlogan mismatch for ${expectedName}: expected \"${constantsMap[expectedKey].primary}\"`,
      );
    }

    if (row?.supportingSlogan !== constantsMap[expectedKey].supporting) {
      fail(
        `EN supportingSlogan mismatch for ${expectedName}: expected \"${constantsMap[expectedKey].supporting}\"`,
      );
    }
  }

  return values;
}

function validateEsMessages(esMessages, enValues) {
  const values = esMessages?.coreValues?.values;

  if (!Array.isArray(values) || values.length !== 4) {
    fail(
      "messages/home/es.json must define exactly 4 coreValues.values entries.",
    );
  }

  for (let i = 0; i < enValues.length; i += 1) {
    const enPrimary = enValues[i].valueSlogan;
    const enSupporting = enValues[i].supportingSlogan;
    const esRow = values[i];

    if (typeof esRow?.valueSlogan !== "string" || !esRow.valueSlogan.trim()) {
      fail(`ES valueSlogan missing at index ${i}`);
    }

    if (
      typeof esRow?.supportingSlogan !== "string" ||
      !esRow.supportingSlogan.trim()
    ) {
      fail(`ES supportingSlogan missing at index ${i}`);
    }

    if (!esRow.valueSlogan.startsWith(`${enPrimary} (`)) {
      fail(
        `ES valueSlogan must preserve EN canonical phrase prefix for index ${i}: expected prefix \"${enPrimary} (\"`,
      );
    }

    if (!esRow.supportingSlogan.startsWith(`${enSupporting} (`)) {
      fail(
        `ES supportingSlogan must preserve EN canonical phrase prefix for index ${i}: expected prefix \"${enSupporting} (\"`,
      );
    }
  }
}

function validateCoreValuesComponent(componentSource) {
  const requiredSnippets = [
    "valueSlogan: t.values[i]?.valueSlogan ?? item.valueSlogan",
    "supportingSlogan: t.values[i]?.supportingSlogan ?? item.supportingSlogan",
    "{item.valueSlogan}",
    "{item.supportingSlogan}",
  ];

  for (const snippet of requiredSnippets) {
    if (!componentSource.includes(snippet)) {
      fail(
        `CoreValuesSection.tsx missing required slogan binding/render snippet: ${snippet}`,
      );
    }
  }
}

function validateChecklist(checklistSource, constantsMap) {
  const mustContain = [
    "## Core Value Slogan Pairs (Canonical)",
    "## Placement Map (Current Website)",
    "## QA Workflow",
  ];

  for (const snippet of mustContain) {
    if (!checklistSource.includes(snippet)) {
      fail(`Checklist missing required section heading: ${snippet}`);
    }
  }

  for (const key of CORE_VALUE_KEYS) {
    const pair = constantsMap[key];
    if (!checklistSource.includes(pair.primary)) {
      fail(`Checklist missing primary slogan text: ${pair.primary}`);
    }
    if (!checklistSource.includes(pair.supporting)) {
      fail(`Checklist missing supporting slogan text: ${pair.supporting}`);
    }
  }
}

function main() {
  const constantsSource = fs.readFileSync(CONSTANTS_FILE, "utf8");
  const enMessages = JSON.parse(fs.readFileSync(EN_MESSAGES_FILE, "utf8"));
  const esMessages = JSON.parse(fs.readFileSync(ES_MESSAGES_FILE, "utf8"));
  const componentSource = fs.readFileSync(CORE_VALUES_COMPONENT_FILE, "utf8");
  const checklistSource = fs.readFileSync(QA_CHECKLIST_FILE, "utf8");

  const constantsMap = extractConstantsCoreValues(constantsSource);
  const enValues = validateEnMessages(enMessages, constantsMap);
  validateEsMessages(esMessages, enValues);
  validateCoreValuesComponent(componentSource);
  validateChecklist(checklistSource, constantsMap);

  console.log(
    "PASS: Brand congruency sources are synchronized (constants, messages, component, checklist).",
  );
}

main();
