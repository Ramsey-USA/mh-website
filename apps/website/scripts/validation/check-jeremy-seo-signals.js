#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const POLICY_FILE = path.join(
  ROOT,
  "config",
  "seo",
  "route-indexing-policy.json",
);
const RIBBON_CONTENT_FILE = path.join(
  ROOT,
  "src",
  "content",
  "jeremy-page-ribbons.md",
);
const APP_SHELL_FILE = path.join(
  ROOT,
  "src",
  "components",
  "layout",
  "AppShell.tsx",
);
const RIBBON_COMPONENT_FILE = path.join(
  ROOT,
  "src",
  "components",
  "shared-sections",
  "JeremyQuoteRibbon.tsx",
);
const LAYOUT_FILE = path.join(ROOT, "src", "app", "layout.tsx");
const SEO_META_FILE = path.join(
  ROOT,
  "src",
  "components",
  "seo",
  "SeoMeta.tsx",
);

function fail(messages) {
  console.error("\nJeremy SEO signal check failed:\n");
  for (const message of messages) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

function normalizeRouteToRibbonKey(route) {
  if (route === "/") return "home";
  return route.replace(/^\/+|\/+$/g, "").toLowerCase();
}

function parseRibbonKeys(markdown) {
  return markdown
    .split(/^##\s+/m)
    .slice(1)
    .map((section) => section.split("\n")[0]?.trim().toLowerCase())
    .filter(Boolean);
}

function main() {
  const errors = [];

  if (!fs.existsSync(POLICY_FILE)) {
    fail([`Missing policy file: ${path.relative(ROOT, POLICY_FILE)}`]);
  }
  if (!fs.existsSync(RIBBON_CONTENT_FILE)) {
    fail([
      `Missing ribbon content file: ${path.relative(ROOT, RIBBON_CONTENT_FILE)}`,
    ]);
  }

  const policy = JSON.parse(fs.readFileSync(POLICY_FILE, "utf8"));
  const indexable = policy?.classes?.indexable;
  if (
    !indexable ||
    !Array.isArray(indexable.exact) ||
    !Array.isArray(indexable.patterns)
  ) {
    fail([
      "config/seo/route-indexing-policy.json must define classes.indexable.exact and classes.indexable.patterns arrays.",
    ]);
  }

  const ribbonSource = fs.readFileSync(RIBBON_CONTENT_FILE, "utf8");
  const ribbonKeys = parseRibbonKeys(ribbonSource);

  for (const route of indexable.exact) {
    const key = normalizeRouteToRibbonKey(route);
    if (!ribbonKeys.includes(key)) {
      errors.push(
        `Missing Jeremy ribbon key '${key}' for indexable route '${route}'.`,
      );
    }
  }

  for (const pattern of indexable.patterns) {
    const regex = new RegExp(pattern);
    const hasMatch = ribbonKeys.some((key) => regex.test(`/${key}`));
    if (!hasMatch) {
      errors.push(
        `No Jeremy ribbon key satisfies indexable pattern '${pattern}'. Add a matching key in src/content/jeremy-page-ribbons.md.`,
      );
    }
  }

  const appShellSource = fs.readFileSync(APP_SHELL_FILE, "utf8");
  if (!appShellSource.includes('aria-label="Jeremy leadership ribbon"')) {
    errors.push(
      "AppShell must render the global Jeremy ribbon section with aria-label 'Jeremy leadership ribbon'.",
    );
  }
  if (!appShellSource.includes('variant="global"')) {
    errors.push(
      "AppShell must render JeremyQuoteRibbon with variant='global'.",
    );
  }

  const ribbonComponentSource = fs.readFileSync(RIBBON_COMPONENT_FILE, "utf8");
  if (
    !ribbonComponentSource.includes('const JEREMY_FULL_NAME = "Jeremy Thamert"')
  ) {
    errors.push("JeremyQuoteRibbon must enforce Jeremy's full name constant.");
  }

  const layoutSource = fs.readFileSync(LAYOUT_FILE, "utf8");
  if (!layoutSource.includes("generateJeremyPersonSchema")) {
    errors.push(
      "Root layout must import and use generateJeremyPersonSchema in StructuredData.",
    );
  }

  const seoMetaSource = fs.readFileSync(SEO_META_FILE, "utf8");
  if (!seoMetaSource.includes("export function generateJeremyPersonSchema()")) {
    errors.push("SeoMeta must export generateJeremyPersonSchema().");
  }
  if (!seoMetaSource.includes("/jeremy-thamert#person")) {
    errors.push(
      "Jeremy person schema id '/jeremy-thamert#person' must be present in SeoMeta.",
    );
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    `Jeremy SEO signal check passed: ${indexable.exact.length} indexable exact routes mapped, ${indexable.patterns.length} indexable pattern rules covered.`,
  );
}

main();
