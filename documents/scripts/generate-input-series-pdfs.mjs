#!/usr/bin/env node
/* eslint-disable no-console */

import puppeteer from "puppeteer";
import mammoth from "mammoth";
import { readdir, readFile, rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, basename, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const INPUT_ROOT = join(ROOT, "documents/input");
const OUTPUT_ROOT = join(ROOT, "documents/generated-pdfs/input-series");
const BRAND_PATH = join(ROOT, "documents/brands/mhc.json");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  return args[i + 1] || null;
};

const familyArg = (getArg("--family") || "").trim();
const familyFilter = familyArg
  ? new Set(
      familyArg
        .split(",")
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean),
    )
  : null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildLicensesInline(brand) {
  const licenses = brand?.licenses || {};
  const parts = [];
  if (licenses.WA) parts.push(`WA ${licenses.WA}`);
  if (licenses.OR) parts.push(`OR ${licenses.OR}`);
  if (licenses.ID) parts.push(`ID ${licenses.ID}`);
  return parts.join(" | ");
}

function buildBrandedHtml({ brand, sourcePath, title, bodyHtml }) {
  const licensesInline = buildLicensesInline(brand);
  const sourceLabel = relative(ROOT, sourcePath).replaceAll("\\", "/");
  const primary = brand?.colors?.primary || "#386851";
  const secondary = brand?.colors?.secondary || "#BD9264";
  const secondaryText = brand?.colors?.secondaryText || "#8A6B49";
  const company = brand?.companyName || "MH Construction, Inc.";
  const address =
    brand?.address ||
    `${brand?.addressStreet || "3111 N Capitol Ave."}, ${brand?.addressCityStateZip || "Pasco, WA 99301"}`;
  const phone = brand?.phone || "(509) 308-6489";
  const website = brand?.website || "www.mhc-gc.com";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        --brand-primary: ${primary};
        --brand-secondary: ${secondary};
        --brand-secondary-text: ${secondaryText};
        --ink: #142920;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      @page {
        size: letter portrait;
        margin: 0;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: "mendl-sans-dusk", "Mendl Sans Dusk", "Segoe UI", sans-serif;
        color: var(--ink);
        background: #fff;
      }
      .frame-outer,
      .frame-inner,
      .left-ribbon,
      .page-footer {
        position: fixed;
        pointer-events: none;
      }
      .frame-outer {
        inset: 0.22in;
        border: 1.2pt solid var(--brand-primary);
        z-index: 1;
      }
      .frame-inner {
        inset: 0.33in;
        border: 0.6pt solid var(--brand-secondary);
        z-index: 1;
      }
      .left-ribbon {
        top: 0.45in;
        left: 0.45in;
        width: 0.28in;
        bottom: 0.45in;
        background: linear-gradient(
          180deg,
          var(--brand-primary) 0%,
          var(--brand-primary) 68%,
          var(--brand-secondary) 100%
        );
        z-index: 1;
      }
      .page-footer {
        left: 0.92in;
        right: 0.9in;
        bottom: 0.62in;
        padding-top: 9pt;
        border-top: 1.2pt solid var(--brand-primary);
        display: grid;
        grid-template-columns: 1.45fr 1fr;
        gap: 0.25in;
        align-items: end;
        z-index: 2;
        background: #fff;
      }
      .page-footer::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 2.5pt;
        height: 0.6pt;
        background: var(--brand-secondary);
      }
      .footer-label {
        margin: 0;
        font-size: 7pt;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--brand-secondary);
      }
      .footer-company {
        margin: 2pt 0 0;
        font-size: 8.2pt;
        font-weight: 700;
        color: var(--brand-primary);
      }
      .footer-copy {
        margin: 1pt 0 0;
        font-size: 7.8pt;
        color: var(--brand-secondary-text);
      }
      .footer-licenses {
        margin-top: 2pt;
        font-size: 7.2pt;
        color: var(--brand-secondary);
      }
      .footer-trust {
        text-align: right;
      }
      .doc {
        position: relative;
        z-index: 3;
        margin: 1.0in 1.0in 1.45in 1.2in;
      }
      .doc-header {
        margin-bottom: 0.22in;
        padding-bottom: 10pt;
        border-bottom: 1px solid rgba(56, 104, 81, 0.3);
      }
      .doc-title {
        margin: 0;
        font-size: 16pt;
        line-height: 1.2;
        letter-spacing: 0.01em;
        color: var(--brand-primary);
        text-transform: none;
      }
      .doc-source {
        margin-top: 4pt;
        font-size: 8pt;
        color: var(--brand-secondary-text);
      }
      .doc-body {
        font-size: 10.5pt;
        line-height: 1.45;
      }
      .doc-body table {
        width: 100%;
        border-collapse: collapse;
        margin: 10pt 0;
      }
      .doc-body th,
      .doc-body td {
        border: 0.6pt solid rgba(56, 104, 81, 0.24);
        padding: 6pt;
        vertical-align: top;
      }
      .doc-body h1,
      .doc-body h2,
      .doc-body h3,
      .doc-body h4 {
        color: var(--brand-primary);
        page-break-after: avoid;
      }
      .doc-body p,
      .doc-body li {
        orphans: 3;
        widows: 3;
      }
    </style>
  </head>
  <body>
    <div class="frame-outer"></div>
    <div class="frame-inner"></div>
    <div class="left-ribbon"></div>

    <main class="doc">
      <header class="doc-header">
        <h1 class="doc-title">${escapeHtml(title)}</h1>
        <div class="doc-source">Source: ${escapeHtml(sourceLabel)}</div>
      </header>
      <section class="doc-body">${bodyHtml}</section>
    </main>

    <footer class="page-footer" aria-label="Company footer">
      <div>
        <p class="footer-label">Company Contact</p>
        <p class="footer-company">${escapeHtml(company)}</p>
        <p class="footer-copy">${escapeHtml(address)}</p>
        <p class="footer-copy">${escapeHtml(phone)} | ${escapeHtml(website)}</p>
        <p class="footer-licenses">${escapeHtml(licensesInline)}</p>
      </div>
      <div class="footer-trust">
        <p class="footer-label">Accreditation and Trust</p>
        <p class="footer-copy">Veteran-Owned | Bonded | Licensed | Insured</p>
      </div>
    </footer>
  </body>
</html>`;
}

async function collectInputDocxTargets() {
  if (!existsSync(INPUT_ROOT)) {
    throw new Error(`Input root not found: ${INPUT_ROOT}`);
  }

  const entries = await readdir(INPUT_ROOT, { withFileTypes: true });
  const families = entries
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const selectedFamilies = familyFilter
    ? families.filter((name) => familyFilter.has(name.toLowerCase()))
    : families;

  if (familyFilter && selectedFamilies.length === 0) {
    throw new Error(
      `No matching families for --family=${familyArg}. Available: ${families.join(", ")}`,
    );
  }

  const targets = [];
  for (const family of selectedFamilies) {
    const familyDir = join(INPUT_ROOT, family);
    const files = await readdir(familyDir, { withFileTypes: true });
    const docxFiles = files
      .filter(
        (entry) =>
          entry.isFile() && extname(entry.name).toLowerCase() === ".docx",
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const fileName of docxFiles) {
      targets.push({
        family,
        inputPath: join(familyDir, fileName),
        outputPath: join(
          OUTPUT_ROOT,
          family,
          `${basename(fileName, ".docx")}.pdf`,
        ),
        title: basename(fileName, ".docx"),
      });
    }
  }

  if (targets.length === 0) {
    throw new Error(
      "No DOCX files were found under numbered input folders. Nothing to generate.",
    );
  }

  return targets;
}

async function renderTarget(page, brand, target) {
  const { value: htmlBody, messages } = await mammoth.convertToHtml({
    path: target.inputPath,
  });

  if (messages.length > 0) {
    const warnSummary = messages
      .map((message) => String(message.message || ""))
      .filter(Boolean)
      .slice(0, 3)
      .join(" | ");
    if (warnSummary) {
      console.warn(`  ⚠  ${basename(target.inputPath)}: ${warnSummary}`);
    }
  }

  const html = buildBrandedHtml({
    brand,
    sourcePath: target.inputPath,
    title: target.title,
    bodyHtml: htmlBody,
  });

  await mkdir(dirname(target.outputPath), { recursive: true });
  await page.setContent(html, {
    waitUntil: "domcontentloaded",
    timeout: 180000,
  });
  await page.pdf({
    path: target.outputPath,
    format: "letter",
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    preferCSSPageSize: true,
  });
}

async function main() {
  const brand = JSON.parse(await readFile(BRAND_PATH, "utf-8"));
  const targets = await collectInputDocxTargets();

  await rm(OUTPUT_ROOT, { recursive: true, force: true });
  await mkdir(OUTPUT_ROOT, { recursive: true });

  console.log("🧱 Generating one-to-one MH-branded input series PDFs…");
  console.log(
    `  Families: ${[...new Set(targets.map((t) => t.family))].join(", ")}`,
  );
  console.log(`  Files: ${targets.length}`);

  const browser = await puppeteer.launch({
    headless: true,
    timeout: 600000,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(180000);
  page.setDefaultNavigationTimeout(180000);
  await page.emulateMediaType("print");

  let rendered = 0;
  try {
    for (const target of targets) {
      await renderTarget(page, brand, target);
      rendered += 1;
      console.log(
        `  ✓  ${relative(ROOT, target.outputPath).replaceAll("\\", "/")}`,
      );
    }
  } finally {
    await page.close();
    await browser.close();
  }

  console.log(
    `✅  Generated ${rendered} one-to-one PDF(s) in documents/generated-pdfs/input-series/`,
  );
}

await main();
