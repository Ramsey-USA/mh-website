#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "src", "app");
const POLICY_FILE = path.join(
  ROOT,
  "config",
  "seo",
  "route-indexing-policy.json",
);

const args = new Set(process.argv.slice(2));
const isCheckMode = args.has("--check");
const isWriteMode = args.has("--write") || !isCheckMode;

function listPageFiles(currentDir, result = []) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      listPageFiles(fullPath, result);
      continue;
    }
    if (entry.isFile() && entry.name === "page.tsx") {
      result.push(fullPath);
    }
  }
  return result;
}

function routeFromPageFile(filePath) {
  const relative = path.relative(APP_DIR, filePath).split(path.sep).join("/");
  if (relative === "page.tsx") {
    return "/";
  }
  return `/${relative.replace(/\/page\.tsx$/, "")}`;
}

function stableSort(values) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function ensurePolicyShape(policy) {
  const normalized = policy && typeof policy === "object" ? { ...policy } : {};

  normalized.classes = normalized.classes || {};

  for (const className of ["indexable", "noindex", "redirect"]) {
    const classRules = normalized.classes[className] || {};
    normalized.classes[className] = {
      exact: Array.isArray(classRules.exact) ? classRules.exact : [],
      patterns: Array.isArray(classRules.patterns) ? classRules.patterns : [],
    };
  }

  normalized.pendingClassification = Array.isArray(
    normalized.pendingClassification,
  )
    ? normalized.pendingClassification
    : [];

  return normalized;
}

function collectAllExplicitRoutes(policy) {
  const result = new Set();
  for (const className of ["indexable", "noindex", "redirect"]) {
    for (const route of policy.classes[className].exact) {
      result.add(route);
    }
  }
  for (const route of policy.pendingClassification) {
    result.add(route);
  }
  return result;
}

function routeMatchesAnyPattern(route, policy) {
  for (const className of ["indexable", "noindex", "redirect"]) {
    for (const pattern of policy.classes[className].patterns) {
      if (new RegExp(pattern).test(route)) {
        return true;
      }
    }
  }
  return false;
}

function syncPolicy(policy, currentRoutes) {
  const currentSet = new Set(currentRoutes);

  for (const className of ["indexable", "noindex", "redirect"]) {
    const existing = policy.classes[className].exact;
    policy.classes[className].exact = stableSort(
      existing.filter((route) => currentSet.has(route)),
    );
    policy.classes[className].patterns = stableSort(
      policy.classes[className].patterns,
    );
  }

  policy.pendingClassification = stableSort(
    policy.pendingClassification.filter((route) => currentSet.has(route)),
  );

  const trackedRoutes = collectAllExplicitRoutes(policy);
  const untrackedRoutes = currentRoutes.filter(
    (route) =>
      !trackedRoutes.has(route) && !routeMatchesAnyPattern(route, policy),
  );

  if (untrackedRoutes.length > 0) {
    policy.pendingClassification = stableSort([
      ...policy.pendingClassification,
      ...untrackedRoutes,
    ]);
  }

  return {
    addedToPending: untrackedRoutes,
  };
}

function main() {
  if (!fs.existsSync(POLICY_FILE)) {
    console.error(
      `Policy file not found: ${path.relative(ROOT, POLICY_FILE)}. Run policy setup first.`,
    );
    process.exit(1);
  }

  const originalRaw = fs.readFileSync(POLICY_FILE, "utf8");
  const originalParsed = JSON.parse(originalRaw);
  const policy = ensurePolicyShape(originalParsed);

  const currentRoutes = stableSort(
    listPageFiles(APP_DIR).map(routeFromPageFile),
  );

  const syncSummary = syncPolicy(policy, currentRoutes);
  const nextRaw = `${JSON.stringify(policy, null, 2)}\n`;
  const changed = nextRaw !== originalRaw;

  if (isCheckMode && changed) {
    console.error("SEO route policy is out of date.");
    if (syncSummary.addedToPending.length > 0) {
      console.error(
        `New routes requiring classification: ${syncSummary.addedToPending.join(", ")}`,
      );
    }
    console.error(
      "Run: npm run seo:routes:sync and then classify pending routes in config/seo/route-indexing-policy.json",
    );
    process.exit(1);
  }

  if (changed && isWriteMode) {
    fs.writeFileSync(POLICY_FILE, nextRaw);
  }

  const pendingCount = policy.pendingClassification.length;
  console.log(
    `SEO route policy sync ${changed ? "updated" : "checked"}. Pending classifications: ${pendingCount}.`,
  );
}

main();
