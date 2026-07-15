#!/usr/bin/env node

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const APP_DIR = path.join(APP_ROOT, "src", "app");
const STRICT = process.env["SPANISH_COVERAGE_STRICT"] === "1";
const REPORT_DIR = path.join(APP_ROOT, "tmp");
const REPORT_FILE = path.join(REPORT_DIR, "spanish-coverage-report.md");

const INVARIANT_ROUTES = new Set(["/accessibility", "/offline"]);

const LOCALE_SIGNAL_REGEXES = [
  /getTranslations\s*\(/,
  /useTranslations\s*\(/,
  /getServerLocale\s*\(/,
  /useLocale\s*\(/,
  /normalizeLocale\s*\(/,
  /LOCALE_COOKIE_NAME/,
  /\b(?:locale|isEs)\b/,
  /messages\/home\/(?:en|es)\.json/,
  /PATH_LOCALE_HEADER_NAME/,
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function toRouteFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath).replace(/\\/g, "/");
  if (!rel.endsWith("/page.tsx")) {
    return null;
  }
  const route = rel.slice(0, -"/page.tsx".length);
  if (!route) return "/";
  if (route.includes("[")) return null;
  if (route.startsWith("api/")) return null;
  return `/${route}`;
}

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function detectSignals(content) {
  const hits = [];
  for (const regex of LOCALE_SIGNAL_REGEXES) {
    if (regex.test(content)) {
      hits.push(String(regex));
    }
  }
  return hits;
}

function resolveImportedClientFiles(pageFilePath, content) {
  const result = new Set();
  const importMatches = [
    ...content.matchAll(/from\s+["'](\.{1,2}\/[^"']+)["']/g),
    ...content.matchAll(/import\s*\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)/g),
  ];

  for (const match of importMatches) {
    const spec = match[1];
    if (!spec) continue;
    for (const resolved of resolveLocalModulePaths(pageFilePath, spec)) {
      result.add(resolved);
    }
  }

  return [...result];
}

function resolveLocalModulePaths(fromFilePath, specifier) {
  const base = path.resolve(path.dirname(fromFilePath), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
  ];

  return candidates.filter((candidate, idx) => {
    return candidates.indexOf(candidate) === idx && fs.existsSync(candidate);
  });
}

function collectSignalGraph(entryFilePath, maxDepth = 2) {
  const visited = new Set();
  const queue = [{ file: entryFilePath, depth: 0 }];
  const signalHits = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) continue;
    if (visited.has(node.file)) continue;
    visited.add(node.file);

    const content = readIfExists(node.file);
    if (!content) continue;

    const localHits = detectSignals(content).map(
      (hit) => `${path.basename(node.file)}:${hit}`,
    );
    signalHits.push(...localHits);

    if (node.depth >= maxDepth) {
      continue;
    }

    const children = resolveImportedClientFiles(node.file, content);
    for (const childFile of children) {
      if (!visited.has(childFile)) {
        queue.push({ file: childFile, depth: node.depth + 1 });
      }
    }
  }

  return signalHits;
}

function classifyRoute(route, directSignals, indirectSignals) {
  if (directSignals.length > 0 || indirectSignals.length > 0) {
    return "LOCALIZED";
  }
  if (INVARIANT_ROUTES.has(route)) {
    return "INVARIANT-REVIEW";
  }
  return "MISSING-SIGNAL";
}

function escapeMarkdownTableCell(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/[\r\n]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim();
}

function main() {
  const pageFiles = walk(APP_DIR).filter((f) => f.endsWith("/page.tsx"));

  const rows = [];
  for (const pageFile of pageFiles) {
    const route = toRouteFromPageFile(pageFile);
    if (!route) continue;

    const pageContent = readIfExists(pageFile) || "";
    const directSignals = detectSignals(pageContent);

    const indirectSignals = collectSignalGraph(pageFile, 2).filter(
      (hit) => !hit.startsWith("page.tsx:"),
    );

    const status = classifyRoute(route, directSignals, indirectSignals);
    rows.push({
      route,
      status,
      directSignals,
      indirectSignals,
    });
  }

  rows.sort((a, b) => a.route.localeCompare(b.route));

  let localized = 0;
  let invariantReview = 0;
  let missingSignal = 0;

  const reportLines = [];
  reportLines.push("| Route | Status | Locale Signals | Notes |\n");
  reportLines.push("| :--- | :--- | :--- | :--- |\n");

  console.log("| Route | Status | Locale Signals | Notes |");
  console.log("| :--- | :--- | :--- | :--- |");

  for (const row of rows) {
    if (row.status === "LOCALIZED") localized += 1;
    if (row.status === "INVARIANT-REVIEW") invariantReview += 1;
    if (row.status === "MISSING-SIGNAL") missingSignal += 1;

    const signals = [...row.directSignals, ...row.indirectSignals]
      .slice(0, 3)
      .map((s) => escapeMarkdownTableCell(s))
      .join(", ");

    const notes =
      row.status === "MISSING-SIGNAL"
        ? "Add locale/translation wiring"
        : row.status === "INVARIANT-REVIEW"
          ? "Likely language-invariant route"
          : "";

    const escapedRoute = escapeMarkdownTableCell(row.route);
    const escapedStatus = escapeMarkdownTableCell(row.status);
    const escapedNotes = escapeMarkdownTableCell(notes);

    console.log(
      `| ${escapedRoute} | ${escapedStatus} | ${signals} | ${escapedNotes} |`,
    );
    reportLines.push(
      `| ${escapedRoute} | ${escapedStatus} | ${signals} | ${escapedNotes} |\n`,
    );
  }

  console.log("");
  console.log(
    `Summary: LOCALIZED=${localized} INVARIANT-REVIEW=${invariantReview} MISSING-SIGNAL=${missingSignal}`,
  );
  reportLines.push("\n");
  reportLines.push(
    `Summary: LOCALIZED=${localized} INVARIANT-REVIEW=${invariantReview} MISSING-SIGNAL=${missingSignal}\n`,
  );

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, reportLines.join(""), "utf8");
  console.log(`Report written: ${path.relative(APP_ROOT, REPORT_FILE)}`);
  if (!STRICT) {
    console.log(
      "Tip: set SPANISH_COVERAGE_STRICT=1 to fail when missing signals exist.",
    );
  }

  if (STRICT && missingSignal > 0) {
    process.exitCode = 1;
  }
}

main();
