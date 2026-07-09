#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const safetyPath = path.join(
  rootDir,
  "documents/manuals/safety-manual-section.html",
);
const handbookPath = path.join(
  rootDir,
  "documents/manuals/employee-handbook-section.html",
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function extractStyleBlock(html, filePath) {
  const match = html.match(/<style>\n([\s\S]*?)\n\s*<\/style>/);
  if (!match) {
    throw new Error(`Unable to find <style> block in ${filePath}`);
  }
  return match[1]
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, "").replace(/^\s+/g, ""))
    .join("\n")
    .trim();
}

function findFirstDifference(a, b) {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const max = Math.max(aLines.length, bLines.length);

  for (let i = 0; i < max; i += 1) {
    if (aLines[i] !== bLines[i]) {
      return {
        line: i + 1,
        safetyLine: aLines[i] ?? "<missing>",
        handbookLine: bLines[i] ?? "<missing>",
      };
    }
  }
  return null;
}

function assertSharedStructure(html, filePath) {
  const requiredSnippets = [
    '<section class="section-header-card"',
    '<div class="section-body">{{SECTION_BODY}}</div>',
    'class="shc-title"',
    'class="shc-meta-grid"',
  ];

  for (const snippet of requiredSnippets) {
    if (!html.includes(snippet)) {
      throw new Error(
        `Missing required shared structure in ${filePath}: ${snippet}`,
      );
    }
  }
}

try {
  const safetyHtml = read(safetyPath);
  const handbookHtml = read(handbookPath);

  assertSharedStructure(safetyHtml, safetyPath);
  assertSharedStructure(handbookHtml, handbookPath);

  const safetyStyle = extractStyleBlock(safetyHtml, safetyPath);
  const handbookStyle = extractStyleBlock(handbookHtml, handbookPath);

  const diff = findFirstDifference(safetyStyle, handbookStyle);
  if (diff) {
    console.error("[manual-congruence] FAIL: Template style drift detected.");
    console.error(
      `[manual-congruence] First mismatch at style line ${diff.line}`,
    );
    console.error(
      `[manual-congruence] safety-manual-section:    ${diff.safetyLine}`,
    );
    console.error(
      `[manual-congruence] employee-handbook-section: ${diff.handbookLine}`,
    );
    console.error(
      "[manual-congruence] Keep the <style> blocks congruent to preserve brand consistency.",
    );
    process.exit(1);
  }

  console.log(
    "[manual-congruence] PASS: MISH and handbook section style blocks are congruent.",
  );
} catch (error) {
  console.error(`[manual-congruence] FAIL: ${error.message}`);
  process.exit(1);
}
