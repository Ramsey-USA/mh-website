#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = [
  "apps/website/src",
  "apps/dashboard/src",
  "documents",
  "scripts",
];

const ALLOWED_EXTENSIONS = new Set([
  ".css",
  ".scss",
  ".html",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
]);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "coverage",
  "documents/generated-pdfs",
  "apps/website/documents/generated-pdfs",
]);

const GENERIC_ALLOWED = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "system-ui",
  "inherit",
  "initial",
  "unset",
]);

const SPECIAL_ALLOWED = new Set([
  "material icons",
  "material symbols outlined",
]);

const MENDL_TOKENS = new Set(["mendl-sans-dusk", "mendl sans dusk"]);

const FORBIDDEN_FONTS = [
  "roboto",
  "arial",
  "helvetica",
  "segoe ui",
  "inter",
  "din 2014",
  "din",
  "courier new",
  "poppins",
  "garamond",
  "times new roman",
  "georgia",
  "tahoma",
  "verdana",
  "abolition",
  "mendl sans dawn",
];

function normalizeToken(token) {
  return token
    .trim()
    .replaceAll(/^['"]+|['"]+$/g, "")
    .replaceAll(/\s+/g, " ")
    .toLowerCase();
}

function splitFamilies(value) {
  return value
    .split(",")
    .map((token) => normalizeToken(token))
    .filter(Boolean);
}

function isSkippedPath(path) {
  return [...SKIP_DIRS].some(
    (dir) => path.includes(`/${dir}/`) || path.endsWith(`/${dir}`),
  );
}

async function walk(dir, out = []) {
  const absolute = join(ROOT, dir);
  let entries;
  try {
    entries = await readdir(absolute, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const rel = join(dir, entry.name).replaceAll("\\", "/");
    if (entry.isDirectory()) {
      if (isSkippedPath(`/${rel}/`)) continue;
      await walk(rel, out);
      continue;
    }
    if (!ALLOWED_EXTENSIONS.has(extname(entry.name))) continue;
    if (isSkippedPath(`/${rel}`)) continue;
    out.push(rel);
  }
  return out;
}

function collectFontValues(content) {
  const values = [];

  const familyRegex = /font-family\s*:\s*([^;]+);/gi;
  for (const match of content.matchAll(familyRegex)) {
    values.push({ type: "font-family", value: match[1], snippet: match[0] });
  }

  const varRegex = /--font-(?:heading|body|mono)\s*:\s*([\s\S]*?);/gi;
  for (const match of content.matchAll(varRegex)) {
    values.push({ type: "font-var", value: match[1], snippet: match[0] });
  }

  const stackRegex =
    /PDF_FONT_STACK_(?:BODY|HEADING)\s*=\s*(["'`])([\s\S]*?)\1/g;
  for (const match of content.matchAll(stackRegex)) {
    values.push({ type: "pdf-stack", value: match[2], snippet: match[0] });
  }

  return values;
}

function validateFontValue(value, sourcePath, snippet, issues) {
  const raw = String(value || "").trim();
  if (!raw) return;

  // Generator template literals may hold runtime placeholders that resolve
  // to Mendl stacks; skip unresolved declarations at lint time.
  if (raw.includes("${")) return;

  if (/var\s*\(/i.test(raw)) return;
  if (/^inherit|initial|unset$/i.test(raw)) return;

  const families = splitFamilies(raw);
  if (families.length === 0) return;

  const hasSpecialAllowed = families.some((token) =>
    SPECIAL_ALLOWED.has(token),
  );
  if (hasSpecialAllowed) return;

  for (const token of families) {
    if (FORBIDDEN_FONTS.some((font) => token.includes(font))) {
      issues.push({
        path: sourcePath,
        message: `Forbidden font token \"${token}\" in declaration: ${snippet.trim()}`,
      });
      return;
    }
  }

  const nonGeneric = families.filter((token) => !GENERIC_ALLOWED.has(token));
  const hasMendl = nonGeneric.some((token) =>
    [...MENDL_TOKENS].some((mendl) => token.includes(mendl)),
  );

  if (!hasMendl) {
    issues.push({
      path: sourcePath,
      message: `Typography declaration must include Mendl Sans Dusk family: ${snippet.trim()}`,
    });
    return;
  }

  for (const token of nonGeneric) {
    const allowed = [...MENDL_TOKENS].some((mendl) => token.includes(mendl));
    if (!allowed) {
      issues.push({
        path: sourcePath,
        message: `Only Mendl Sans Dusk is allowed for UI/document typography. Found \"${token}\" in: ${snippet.trim()}`,
      });
      return;
    }
  }
}

async function main() {
  const files = [];
  for (const dir of TARGET_DIRS) {
    await walk(dir, files);
  }

  const issues = [];
  for (const file of files) {
    const content = await readFile(join(ROOT, file), "utf8");
    const values = collectFontValues(content);
    for (const entry of values) {
      validateFontValue(entry.value, file, entry.snippet, issues);
    }
  }

  if (issues.length > 0) {
    console.error(
      "[mendl-font-policy] FAIL: non-compliant font declarations found.",
    );
    for (const issue of issues) {
      console.error(`- ${issue.path}: ${issue.message}`);
    }
    process.exit(1);
  }

  console.log(
    "[mendl-font-policy] PASS: only Mendl Sans Dusk typography declarations were detected.",
  );
}

main().catch((error) => {
  console.error("[mendl-font-policy] ERROR:", error);
  process.exit(1);
});
