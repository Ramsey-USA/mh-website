#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const PAGE_SEO_UTILS_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "seo",
  "page-seo-utils.ts",
);
const ROOT_LAYOUT_FILE = path.join(ROOT, "src", "app", "layout.tsx");
const JEREMY_PROFILE_PAGE_FILE = path.join(
  ROOT,
  "src",
  "app",
  "jeremy-thamert",
  "page.tsx",
);

const JEREMY_REGEX = /Jeremy\s+Thamert|Jeremy/i;

// Focus on high-impact indexable marketing pages and explicitly avoid legal/compliance over-optimization.
const REQUIRED_SEO_BUILDERS = [
  "getHomepageSEO",
  "getAboutSEO",
  "getServicesSEO",
  "getTeamSEO",
  "getGovernmentSEO",
  "getVeteransSEO",
  "getTradePartnersSEO",
  "getTestimonialsSEO",
  "getCareersSEO",
  "getProjectsSEO",
  "getContactSEO",
  "getFAQSEO",
];

function fail(messages) {
  console.error("\nJeremy route metadata check failed:\n");
  for (const message of messages) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

function extractFunctionBlock(source, functionName) {
  const marker = `export function ${functionName}(`;
  const start = source.indexOf(marker);
  if (start === -1) {
    return null;
  }

  const rest = source.slice(start + marker.length);
  const nextExportIndex = rest.search(/\nexport function\s+/);
  const end =
    nextExportIndex === -1
      ? source.length
      : start + marker.length + nextExportIndex;

  return source.slice(start, end);
}

function checkRootLayoutSource(layoutSource, errors) {
  if (!layoutSource.includes("Jeremy Thamert")) {
    errors.push(
      "Root layout metadata must include 'Jeremy Thamert' to preserve sitewide inherited relevance.",
    );
  }

  if (!layoutSource.includes("keywords:")) {
    errors.push(
      "Root layout metadata must define keywords including Jeremy terms.",
    );
  }

  if (!layoutSource.includes("authors:")) {
    errors.push(
      "Root layout metadata must define authors including Jeremy Thamert.",
    );
  }
}

function main() {
  const errors = [];

  if (!fs.existsSync(PAGE_SEO_UTILS_FILE)) {
    fail([
      `Missing SEO helper source file: ${path.relative(ROOT, PAGE_SEO_UTILS_FILE)}`,
    ]);
  }

  const pageSeoSource = fs.readFileSync(PAGE_SEO_UTILS_FILE, "utf8");

  for (const builder of REQUIRED_SEO_BUILDERS) {
    const block = extractFunctionBlock(pageSeoSource, builder);
    if (!block) {
      errors.push(
        `Missing required SEO builder ${builder} in src/lib/seo/page-seo-utils.ts.`,
      );
      continue;
    }

    if (!JEREMY_REGEX.test(block)) {
      errors.push(
        `${builder} must include a Jeremy keyword signal (name or leadership reference) in metadata content.`,
      );
    }
  }

  if (!fs.existsSync(ROOT_LAYOUT_FILE)) {
    errors.push(
      `Missing root layout file: ${path.relative(ROOT, ROOT_LAYOUT_FILE)}.`,
    );
  } else {
    const rootLayoutSource = fs.readFileSync(ROOT_LAYOUT_FILE, "utf8");
    checkRootLayoutSource(rootLayoutSource, errors);
  }

  if (!fs.existsSync(JEREMY_PROFILE_PAGE_FILE)) {
    errors.push(
      `Missing Jeremy profile page file: ${path.relative(ROOT, JEREMY_PROFILE_PAGE_FILE)}.`,
    );
  } else {
    const jeremyProfileSource = fs.readFileSync(
      JEREMY_PROFILE_PAGE_FILE,
      "utf8",
    );
    if (!JEREMY_REGEX.test(jeremyProfileSource)) {
      errors.push(
        "Jeremy profile page metadata must include Jeremy name signal.",
      );
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    `Jeremy route metadata check passed: ${REQUIRED_SEO_BUILDERS.length} SEO builders include Jeremy signals with legal/compliance over-optimization excluded by design.`,
  );
}

main();
