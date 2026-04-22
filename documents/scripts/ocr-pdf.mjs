#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * documents/scripts/ocr-pdf.mjs
 *
 * OCR pipeline for scanned PDFs.
 * Renders each PDF page to an image with pdfjs, then runs OCR with tesseract.js.
 *
 * Usage:
 *   node documents/scripts/ocr-pdf.mjs --input "documents/input/Traho Architects.pdf"
 *   npm run docs:ocr -- --input "documents/input/Traho Architects.pdf"
 *
 * Options:
 *   --input <path>        Required. PDF to OCR.
 *   --out <path>          Optional. Output text file path.
 *   --lang <code>         Optional. Tesseract language code (default: eng).
 *   --scale <number>      Optional. Render scale for OCR quality (default: 2).
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";
import { createWorker } from "tesseract.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DEFAULT_OUT_DIR = join(ROOT, "documents/output/ocr");

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

const inputArg = getArg("--input");
const outArg = getArg("--out");
const lang = getArg("--lang") || "eng";
const scaleRaw = getArg("--scale");
const scale = scaleRaw ? Number(scaleRaw) : 2;

if (!inputArg) {
  console.error("❌  Missing required arg: --input <path-to-pdf>");
  process.exit(1);
}
if (Number.isNaN(scale) || scale <= 0) {
  console.error("❌  --scale must be a positive number");
  process.exit(1);
}

const inputPath = resolve(inputArg);
const inputBase = basename(inputPath, extname(inputPath));
const outputPath = outArg
  ? resolve(outArg)
  : join(DEFAULT_OUT_DIR, `${inputBase}.ocr.txt`);

async function main() {
  console.log("🔎 PDF OCR");
  console.log(`Input:  ${inputPath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Lang:   ${lang}`);
  console.log(`Scale:  ${scale}`);

  const pdfBytes = await readFile(inputPath);
  const pdf = await getDocument({
    data: new Uint8Array(pdfBytes),
    isEvalSupported: false,
    useSystemFonts: true,
  }).promise;

  await mkdir(dirname(outputPath), { recursive: true });

  const worker = await createWorker(lang);
  const pages = [];

  try {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`  • OCR page ${pageNum}/${pdf.numPages}`);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = createCanvas(
        Math.ceil(viewport.width),
        Math.ceil(viewport.height),
      );
      const ctx = canvas.getContext("2d");

      await page.render({ canvasContext: ctx, viewport }).promise;

      const png = canvas.toBuffer("image/png");
      const result = await worker.recognize(png);
      const text = (result?.data?.text || "").trim();

      pages.push(`--- Page ${pageNum} ---\n${text}\n`);
    }
  } finally {
    await worker.terminate();
  }

  const output = pages.join("\n").trim() + "\n";
  await writeFile(outputPath, output, "utf-8");

  console.log(`✅ OCR complete: ${outputPath}`);
}

main().catch((err) => {
  console.error("❌ OCR failed:", err?.message || err);
  process.exit(1);
});
