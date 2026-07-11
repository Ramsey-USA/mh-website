#!/usr/bin/env node
/* eslint-disable no-console */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANUALS_DIR = path.join(ROOT, "documents/manuals");
const REPORT_PATH = path.join(
  ROOT,
  "documents/generated-pdfs/mish-overrun-audit.json",
);

const PREPARE = process.argv.includes("--prepare");
const STRICT = !process.argv.includes("--no-strict");

const IGNORED_SELECTOR_SUBSTRINGS = [
  "left-ribbon",
  "veteran-strip",
  "bottom-rule",
  "brand-block",
  "logo-",
  "qr-img",
  "qr-card",
  "trust",
  "badges",
];

async function run(cmd, args, env = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: ROOT,
      env: { ...process.env, ...env },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      return reject(
        new Error(`${cmd} ${args.join(" ")} exited with code ${code}`),
      );
    });
  });
}

async function prepareTmpHtml() {
  console.log("🧪 Preparing full manual temp HTML for overrun audit...");
  await run(process.execPath, ["documents/scripts/generate.mjs"], {
    DEBUG_KEEP_HTML: "1",
  });
}

async function findTargets() {
  if (!existsSync(MANUALS_DIR)) {
    throw new Error(`Manuals directory not found: ${MANUALS_DIR}`);
  }

  const entries = await readdir(MANUALS_DIR);
  const files = entries
    .filter(
      (name) =>
        /^_tmp_section_\d+\.html$/.test(name) ||
        name === "_tmp_toc.html" ||
        name === "_tmp_safety_manual_reference.html",
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    throw new Error(
      "No manual temp HTML files found. Run with --prepare or execute DEBUG_KEEP_HTML=1 node documents/scripts/generate.mjs --template sections first.",
    );
  }
  return files;
}

async function auditTargets(files) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 1 });

  const report = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    filesWithIssues: 0,
    totalIssues: 0,
    notes: [
      "Decorative chrome elements are excluded from run-off findings (left-ribbon, trust logos, page ornaments).",
      "Audit targets content clipping and text/table overflow only.",
    ],
    results: [],
  };

  for (const file of files) {
    const abs = path.join(MANUALS_DIR, file);
    await page.goto(pathToFileURL(abs).href, { waitUntil: "networkidle0" });

    const issues = await page.evaluate((ignored) => {
      const cssPath = (el) => {
        const parts = [];
        let cur = el;
        while (cur && parts.length < 5) {
          let seg = cur.tagName.toLowerCase();
          if (cur.id) seg += `#${cur.id}`;
          const cls = (cur.className || "")
            .toString()
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 3);
          if (cls.length) seg += `.${cls.join(".")}`;
          parts.unshift(seg);
          cur = cur.parentElement;
        }
        return parts.join(" > ");
      };

      const shouldIgnore = (selector) => {
        const lower = selector.toLowerCase();
        return ignored.some((token) => lower.includes(token));
      };

      const found = [];
      const viewportWidth = document.documentElement.clientWidth;

      for (const el of document.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const selector = cssPath(el);
        if (shouldIgnore(selector)) continue;

        const text = (el.textContent || "").trim();
        const hasText = text.length > 0;

        const isClippedContainer = /(hidden|clip)/.test(
          `${cs.overflow}|${cs.overflowX}|${cs.overflowY}`,
        );
        const overflowY = Math.max(0, el.scrollHeight - el.clientHeight);
        const overflowX = Math.max(0, el.scrollWidth - el.clientWidth);

        if (isClippedContainer && hasText && (overflowY > 1 || overflowX > 1)) {
          found.push({
            type: "overflow-clipped",
            selector,
            overflowY: Number(overflowY.toFixed(2)),
            overflowX: Number(overflowX.toFixed(2)),
            sample: text.slice(0, 140),
          });
        }

        const isTruncated =
          (cs.whiteSpace === "nowrap" || cs.textOverflow === "ellipsis") &&
          hasText &&
          el.clientWidth > 0 &&
          el.scrollWidth - el.clientWidth > 1;
        if (isTruncated) {
          found.push({
            type: "text-truncated",
            selector,
            overflowX: Number((el.scrollWidth - el.clientWidth).toFixed(2)),
            sample: text.slice(0, 140),
          });
        }

        if (hasText && rect.right - viewportWidth > 1.5) {
          found.push({
            type: "off-page-right",
            selector,
            overRightPx: Number((rect.right - viewportWidth).toFixed(2)),
            sample: text.slice(0, 140),
          });
        }
      }

      const unique = [];
      const seen = new Set();
      for (const issue of found) {
        const key = `${issue.type}|${issue.selector}|${issue.sample}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(issue);
        }
      }

      return unique;
    }, IGNORED_SELECTOR_SUBSTRINGS);

    report.results.push({
      file: `documents/manuals/${file}`,
      issueCount: issues.length,
      issues,
    });

    if (issues.length > 0) {
      report.filesWithIssues += 1;
      report.totalIssues += issues.length;
    }
  }

  await browser.close();
  return report;
}

async function main() {
  if (PREPARE) {
    await prepareTmpHtml();
  }

  const files = await findTargets();
  console.log(`🔍 Auditing manual overrun across ${files.length} file(s)...`);

  const report = await auditTargets(files);
  await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const rel = path.relative(ROOT, REPORT_PATH);
  console.log(`📄 Report written: ${rel}`);
  console.log(
    `✅ Files with issues: ${report.filesWithIssues}/${report.filesScanned} · Total issues: ${report.totalIssues}`,
  );

  if (STRICT && report.totalIssues > 0) {
    console.error("\n❌ MISH overrun audit failed in strict mode.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n❌ MISH overrun audit failed:", err);
  process.exit(1);
});
