#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SRC_DIR = join(ROOT, "documents/content/mhc-employee-handbook-2026");
const OUT_DIR = join(SRC_DIR, "html-sources");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function extractPdfText(pdfPath) {
  try {
    return execFileSync(
      "pdftotext",
      ["-layout", "-nopgbrk", "-enc", "UTF-8", pdfPath, "-"],
      { encoding: "utf8" },
    );
  } catch {
    return execFileSync(
      "pdftotext",
      ["-nopgbrk", "-enc", "UTF-8", pdfPath, "-"],
      {
        encoding: "utf8",
      },
    );
  }
}

function normalizeText(text) {
  return String(text || "")
    .replaceAll(/\r\n?/g, "\n")
    .replaceAll(/\f/g, "\n")
    .replaceAll(/[\u2010\u2011\u2012\u2013\u2014\u2212-]\s*\n\s*(?=[a-z])/g, "")
    .replaceAll(/\u00AD/g, "")
    .replaceAll(/\n{3,}/g, "\n\n")
    .trim();
}

function isHeading(line) {
  const text = String(line || "").trim();
  if (!text || text.length > 92) return false;
  if (/^[0-9]+$/.test(text)) return false;
  if (/^[A-Z][A-Z\s/&()'\-]{4,}$/.test(text)) return true;
  if (/[.!?:;]$/.test(text)) return false;
  return /^[A-Z][A-Za-z0-9 ,&()/'\-]{3,}$/.test(text);
}

function renderBodyHtml(text) {
  const lines = text.split("\n");
  const parts = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const combined = paragraph
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim();
    if (combined) {
      parts.push(`<p>${escapeHtml(combined)}</p>`);
    }
    paragraph = [];
  };

  const pushListItem = (itemText) => {
    flushParagraph();
    parts.push(`<li>${escapeHtml(itemText.trim())}</li>`);
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (/^[\u2022\u25AA\u25CF\u25E6\uF0B7]\s+/.test(line)) {
      pushListItem(line.replace(/^[\u2022\u25AA\u25CF\u25E6\uF0B7]\s+/, ""));
      continue;
    }

    if (/^\d{1,2}[.)]\s+/.test(line)) {
      pushListItem(line.replace(/^\d{1,2}[.)]\s+/, ""));
      continue;
    }

    if (isHeading(line)) {
      flushParagraph();
      parts.push(`<h2>${escapeHtml(line)}</h2>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  // Wrap consecutive list items in <ul> for readable structure.
  const html = parts.join("\n    ");
  return html.replaceAll(/(?:<li>[\s\S]*?<\/li>\n?)+/g, (match) => {
    return `<ul>\n    ${match.trim()}\n    </ul>`;
  });
}

function renderHtmlDocument(sourcePdfName, bodyHtml) {
  const title = basename(sourcePdfName, ".pdf");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="source-pdf" content="${escapeHtml(sourcePdfName)}" />
  </head>
  <body>
    <main data-source-pdf="${escapeHtml(sourcePdfName)}">
    ${bodyHtml || "<p><em>No text extracted.</em></p>"}
    </main>
  </body>
</html>
`;
}

function run() {
  mkdirSync(OUT_DIR, { recursive: true });
  const files = readdirSync(SRC_DIR)
    .filter((name) => name.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.log(
      "No PDF files found in documents/content/mhc-employee-handbook-2026.",
    );
    return;
  }

  for (const file of files) {
    const pdfPath = join(SRC_DIR, file);
    const text = normalizeText(extractPdfText(pdfPath));
    const body = renderBodyHtml(text);
    const html = renderHtmlDocument(file, body);
    const outPath = join(OUT_DIR, `${basename(file, ".pdf")}.html`);
    writeFileSync(outPath, html, "utf8");
    console.log(`created ${outPath}`);
  }

  console.log(`\nConverted ${files.length} PDF file(s) to HTML in ${OUT_DIR}`);
}

run();
