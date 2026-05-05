#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * documents/scripts/build-safety-manual-public.mjs
 *
 * Derives the slim PUBLIC preview manifest used by the public Safety Manual
 * cluster pages from the full extraction manifest.
 *
 * Source : documents/content/safety-manual.json   (full, may contain proprietary text)
 * Output : documents/content/safety-manual-public.json
 *
 * Why
 * ───
 * The public route `/resources/safety-manual/[cluster]` only renders the
 * allow-listed Purpose / Scope / References blocks per section. Importing the
 * full ~770 KB manifest into the route ships proprietary section bodies into
 * the Cloudflare Worker bundle and forces `extractPreviewHtml()` to run for
 * every section on every build. Pre-deriving a slim, preview-only manifest:
 *
 *   • Drops the worker bundle by hundreds of KB.
 *   • Removes proprietary `body` text from the public bundle entirely.
 *   • Eliminates per-render CPU cost in the cluster page.
 *
 * Run automatically as part of `npm run prebuild`.
 *
 * Usage:
 *   npm run docs:build-public
 *   node documents/scripts/build-safety-manual-public.mjs
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import sanitizeHtml from "sanitize-html";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SOURCE = join(ROOT, "documents/content/safety-manual.json");
const OUTPUT = join(ROOT, "documents/content/safety-manual-public.json");

// ── Allow-listed preview heading regex (mirror of
//    src/lib/data/safety-manual-preview.ts). Keep these in sync. ───────────
const ALLOWED_HEADINGS = [
  /^\s*1(?:\.0)?\s+purpose\b/i,
  /^\s*2(?:\.0)?\s+scope\b/i,
  /^\s*training\s*(?:&|and)\s*reference\s*resources?\b/i,
  /^\s*purpose\s*$/i,
  /^\s*scope\s*$/i,
];

const HEADING_TAG = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
const STRIP_ATTRS = /\s(?:on\w+|style|class|id)=("[^"]*"|'[^']*'|[^\s>]+)/gi;
const SCRIPT_OR_STYLE = /<(script|style)\b[\s\S]*?<\/\1>/gi;
const WORD_RE = /\S+/g;

function wordCount(html) {
  return (html.replace(/<[^>]+>/g, " ").match(WORD_RE) || []).length;
}

function extractPreviewHtml(body, maxWords = 250) {
  if (!body || typeof body !== "string") return "";
  const safe = sanitizeHtml(body, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    disallowedTagsMode: "discard",
  });

  const matches = [];
  HEADING_TAG.lastIndex = 0;
  let m;
  while ((m = HEADING_TAG.exec(safe)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      text: (m[2] ?? "").replace(/<[^>]+>/g, " ").trim(),
    });
  }
  if (matches.length === 0) return "";

  const blocks = [];
  let totalWords = 0;
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    if (!ALLOWED_HEADINGS.some((re) => re.test(cur.text))) continue;
    const nextStart =
      i + 1 < matches.length ? matches[i + 1].start : safe.length;
    const chunk = safe.slice(cur.start, nextStart).replace(STRIP_ATTRS, "");
    blocks.push(chunk);
    totalWords += wordCount(chunk);
    if (totalWords >= maxWords) break;
  }
  return blocks.join("\n").trim();
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.warn(
      "⚠  safety-manual.json not found — skipping public manifest derivation.",
    );
    console.warn("   Run `npm run docs:extract-word` first if needed.");
    process.exit(0);
  }

  const raw = JSON.parse(await readFile(SOURCE, "utf8"));
  const sections = Array.isArray(raw.sections) ? raw.sections : [];

  const slim = sections
    .map((s) => ({
      id: s.id,
      number: s.number,
      numberStr: s.numberStr,
      key: s.key,
      title: s.title,
      slug: s.slug,
      previewHtml: extractPreviewHtml(s.body),
    }))
    .sort((a, b) => Number(a.number) - Number(b.number));

  const out = {
    document: {
      id: raw?.document?.id ?? "safety-manual",
      title: raw?.document?.title ?? "Safety Manual",
      revisionYear: raw?.document?.revisionYear,
      revisionDate: raw?.document?.revisionDate,
      derivedAt: new Date().toISOString(),
      derivedFrom: "documents/content/safety-manual.json",
      totalSections: slim.length,
    },
    sections: slim,
  };

  await writeFile(OUTPUT, JSON.stringify(out, null, 2) + "\n", "utf8");

  const sizeKb = (JSON.stringify(out).length / 1024).toFixed(1);
  console.log(
    `✔ Wrote safety-manual-public.json (${slim.length} sections, ${sizeKb} KB)`,
  );
}

main().catch((err) => {
  console.error("✖ Failed to build safety-manual-public.json:", err);
  process.exit(1);
});
