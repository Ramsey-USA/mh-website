#!/usr/bin/env node
/**
 * Translation completeness check.
 *
 * Blocks release if any MISH 05 (JHA) action-item keys found in en.json
 * are missing from es.json.  Also checks that every top-level key group
 * present in en.json exists in es.json.
 *
 * Exit 0 = pass.  Exit 1 = fail (blocks CI).
 */

"use strict";

const fs = require("fs");
const path = require("path");

const EN_PATH = path.resolve(__dirname, "../messages/en.json");
const ES_PATH = path.resolve(__dirname, "../messages/es.json");

const en = JSON.parse(fs.readFileSync(EN_PATH, "utf8"));
const es = JSON.parse(fs.readFileSync(ES_PATH, "utf8"));

let failures = 0;

function fail(msg) {
  console.error("  FAIL:", msg);
  failures++;
}

/** Recursively collect dot-path keys from an object. */
function collectKeys(obj, prefix = "") {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    keys.push(full);
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...collectKeys(v, full));
    }
  }
  return keys;
}

/** Get a value at a dot-path from an object, or undefined if missing. */
function getAt(obj, dotPath) {
  return dotPath.split(".").reduce((cur, key) => cur?.[key], obj);
}

console.log("Checking translation completeness...\n");

// ── 1. MISH 05 / JHA action items (highest priority) ──────────────────────────
const enActionItems = en?.safety?.forms?.jha?.actionItems;
const esActionItems = es?.safety?.forms?.jha?.actionItems;

if (!enActionItems) {
  fail(
    "en.json is missing safety.forms.jha.actionItems — add them before releasing.",
  );
} else if (!esActionItems) {
  fail("es.json is missing safety.forms.jha.actionItems (MISH 05 block).");
} else {
  console.log("Checking MISH 05 (JHA) action items...");
  for (const key of Object.keys(enActionItems)) {
    if (!(key in esActionItems)) {
      fail(`es.json missing safety.forms.jha.actionItems.${key}`);
    } else if (!esActionItems[key] || !esActionItems[key].trim()) {
      fail(`es.json has empty value for safety.forms.jha.actionItems.${key}`);
    } else {
      console.log(`  OK  safety.forms.jha.actionItems.${key}`);
    }
  }
}

// ── 2. Top-level key groups ────────────────────────────────────────────────────
console.log("\nChecking top-level groups...");
for (const topKey of Object.keys(en)) {
  if (!(topKey in es)) {
    fail(`es.json is missing top-level key "${topKey}"`);
  } else {
    console.log(`  OK  ${topKey}`);
  }
}

// ── 3. All leaf keys under safety.forms.jha (full sub-tree) ───────────────────
console.log("\nChecking full JHA sub-tree...");
const enJhaKeys = collectKeys(en?.safety?.forms?.jha ?? {}, "safety.forms.jha");
for (const dotPath of enJhaKeys) {
  const esVal = getAt(es, dotPath);
  if (esVal === undefined) {
    fail(`es.json missing ${dotPath}`);
  } else {
    console.log(`  OK  ${dotPath}`);
  }
}

// ── Result ─────────────────────────────────────────────────────────────────────
console.log("");
if (failures > 0) {
  console.error(`Translation check FAILED with ${failures} error(s).`);
  console.error(
    "All MISH 05 action-item strings must have Spanish translations before release.",
  );
  process.exit(1);
} else {
  console.log("Translation check PASSED.");
  process.exit(0);
}
