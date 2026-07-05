#!/usr/bin/env node
/* eslint-disable no-console */

const { readdir, readFile } = require("node:fs/promises");
const { join, extname, relative } = require("node:path");

const ROOT = process.cwd();

const TARGET_DIRS = [
  "src/app/safety",
  "src/app/resources",
  "src/app/employee-handbook",
];

const TARGET_FILES = [
  "src/components/layout/AppShell.tsx",
  "src/lib/data/documents.ts",
];

const VALID_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

const CANONICAL_LIGATURES = new Set([
  "info",
  "error_outline",
  "warning",
  "gpp_maybe",
  "check_box_outline_blank",
  "fact_check",
  "edit_note",
  "description",
  "table_chart",
  "draw",
  "route",
  "verified_user",
  "menu_book",
  "dns",
]);

function isTargetFile(filePath) {
  const rel = relative(ROOT, filePath).replaceAll("\\", "/");
  if (rel.includes("/__tests__/")) return false;
  if (TARGET_FILES.includes(rel)) return true;
  return TARGET_DIRS.some((dir) => rel.startsWith(`${dir}/`));
}

async function collectFiles(dirPath) {
  const out = [];
  let entries = [];
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectFiles(full)));
      continue;
    }
    if (!VALID_EXTENSIONS.has(extname(entry.name))) continue;
    if (!isTargetFile(full)) continue;
    out.push(full);
  }

  return out;
}

function lineNumberForIndex(text, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function collectViolationsInSource(source, relPath) {
  const violations = [];

  const jsxPattern = /<MaterialIcon[\s\S]{0,220}?\bicon\s*=\s*"([a-z0-9_]+)"/gi;
  for (const match of source.matchAll(jsxPattern)) {
    const icon = String(match[1] || "").trim();
    if (!CANONICAL_LIGATURES.has(icon)) continue;
    const idx = match.index ?? 0;
    violations.push({
      file: relPath,
      line: lineNumberForIndex(source, idx),
      icon,
      kind: 'MaterialIcon icon="..." literal',
    });
  }

  const objectPattern = /\bicon\s*:\s*"([a-z0-9_]+)"/gi;
  for (const match of source.matchAll(objectPattern)) {
    const icon = String(match[1] || "").trim();
    if (!CANONICAL_LIGATURES.has(icon)) continue;
    const idx = match.index ?? 0;
    violations.push({
      file: relPath,
      line: lineNumberForIndex(source, idx),
      icon,
      kind: 'icon: "..." literal',
    });
  }

  return violations;
}

async function main() {
  const roots = [
    ...TARGET_DIRS.map((dir) => join(ROOT, dir)),
    ...TARGET_FILES.map((file) => join(ROOT, file)),
  ];

  const files = new Set();
  for (const rootPath of roots) {
    const collected = await collectFiles(rootPath);
    for (const file of collected) files.add(file);
  }

  const violations = [];
  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const relPath = relative(ROOT, filePath).replaceAll("\\", "/");
    violations.push(...collectViolationsInSource(source, relPath));
  }

  if (violations.length > 0) {
    console.error(
      "\n[forms-manual-icons] FAIL: canonical icon map drift detected.\n",
    );
    for (const v of violations) {
      console.error(`  - ${v.file}:${v.line} -> ${v.kind} uses '${v.icon}'`);
    }
    console.error(
      "\nUse FORM_MANUAL_ICONS constants from @/lib/constants/navigation-icons in these safety/resources/employee-handbook surfaces.",
    );
    process.exit(1);
  }

  console.log(
    "[forms-manual-icons] PASS: canonical icon map usage is enforced.",
  );
}

main().catch((err) => {
  console.error("[forms-manual-icons] ERROR:", err);
  process.exit(1);
});
