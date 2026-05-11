#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "src", "app");
const SITEMAP_FILE = path.join(APP_DIR, "sitemap.ts");
const POLICY_FILE = path.join(
  ROOT,
  "config",
  "seo",
  "route-indexing-policy.json",
);

function fail(messages) {
  console.error("\nSEO route indexing policy check failed:\n");
  for (const message of messages) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

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

function parseStaticSitemapPaths(source) {
  const matches = source.matchAll(/path:\s*"([^"]+)"/g);
  const paths = new Set();
  for (const match of matches) {
    paths.add(match[1]);
  }
  return paths;
}

function toRegexes(patterns) {
  return (patterns || []).map((pattern) => new RegExp(pattern));
}

function matchesClass(route, classRules) {
  if ((classRules.exact || []).includes(route)) {
    return true;
  }

  const regexes = toRegexes(classRules.patterns);
  return regexes.some((regex) => regex.test(route));
}

function validatePolicyStructure(policy) {
  const requiredClasses = ["indexable", "noindex", "redirect"];
  const messages = [];

  if (!policy || typeof policy !== "object") {
    messages.push("Policy file must be a JSON object.");
    return messages;
  }

  if (!policy.classes || typeof policy.classes !== "object") {
    messages.push("Policy must include a top-level classes object.");
    return messages;
  }

  for (const className of requiredClasses) {
    const classRules = policy.classes[className];
    if (!classRules) {
      messages.push(`Missing policy class: ${className}`);
      continue;
    }
    if (!Array.isArray(classRules.exact)) {
      messages.push(`${className}.exact must be an array.`);
    }
    if (!Array.isArray(classRules.patterns)) {
      messages.push(`${className}.patterns must be an array.`);
    }
  }

  if (
    policy.dynamicSitemapCoverage &&
    !Array.isArray(policy.dynamicSitemapCoverage)
  ) {
    messages.push("dynamicSitemapCoverage must be an array when provided.");
  }

  if (
    policy.pendingClassification !== undefined &&
    !Array.isArray(policy.pendingClassification)
  ) {
    messages.push("pendingClassification must be an array when provided.");
  }

  return messages;
}

function routeFilePath(route) {
  if (route === "/") {
    return path.join(APP_DIR, "page.tsx");
  }
  return path.join(APP_DIR, route.slice(1), "page.tsx");
}

function routeLayoutPath(route) {
  if (route === "/") {
    return path.join(APP_DIR, "layout.tsx");
  }
  return path.join(APP_DIR, route.slice(1), "layout.tsx");
}

function hasMetadataExport(source) {
  return /export\s+(const|async\s+function|function)\s+metadata|export\s+(async\s+)?function\s+generateMetadata/.test(
    source,
  );
}

function hasRouteMetadata(route) {
  const candidates = [routeFilePath(route), routeLayoutPath(route)];
  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const source = fs.readFileSync(filePath, "utf8");
    if (hasMetadataExport(source)) {
      return true;
    }
  }
  return false;
}

function getRouteClass(route, policyClasses) {
  const classes = ["indexable", "noindex", "redirect"];
  return classes.filter((className) =>
    matchesClass(route, policyClasses[className]),
  );
}

function validateIndexableRoute(
  route,
  policy,
  sitemapSource,
  sitemapStaticPaths,
) {
  const errors = [];

  if (route.includes("[")) {
    const coverageRules = (policy.dynamicSitemapCoverage || []).filter((rule) =>
      new RegExp(rule.pattern).test(route),
    );

    if (coverageRules.length === 0) {
      errors.push(
        `Dynamic indexable route ${route} has no dynamicSitemapCoverage rule.`,
      );
      return errors;
    }

    for (const rule of coverageRules) {
      const requiredSignals = rule.requiresAny || [];
      const hasSignal = requiredSignals.some((signal) =>
        sitemapSource.includes(signal),
      );
      if (!hasSignal) {
        errors.push(
          `Dynamic indexable route ${route} is missing sitemap coverage signal. Expected one of: ${requiredSignals.join(", ")}.`,
        );
      }
    }

    return errors;
  }

  if (!sitemapStaticPaths.has(route)) {
    errors.push(
      `Indexable route ${route} is not listed in src/app/sitemap.ts ACTIVE_PAGES.`,
    );
  }

  return errors;
}

function validateNonIndexableRoute(route, routeClass, sitemapStaticPaths) {
  const errors = [];

  if (sitemapStaticPaths.has(route)) {
    errors.push(
      `Non-indexable route ${route} appears in src/app/sitemap.ts and must be removed.`,
    );
  }

  if (!hasRouteMetadata(route)) {
    errors.push(
      `Route ${route} is classed as ${routeClass} and must export explicit metadata (page.tsx or same-segment layout.tsx).`,
    );
  }

  if (routeClass !== "redirect") {
    return errors;
  }

  const pagePath = routeFilePath(route);
  const source = fs.readFileSync(pagePath, "utf8");
  if (!/\b(permanentRedirect|redirect)\(/.test(source)) {
    errors.push(
      `Redirect-class route ${route} must call redirect() or permanentRedirect().`,
    );
  }

  return errors;
}

function main() {
  const errors = [];

  if (!fs.existsSync(POLICY_FILE)) {
    fail([
      `Policy file not found: ${path.relative(ROOT, POLICY_FILE)}`,
      "Create config/seo/route-indexing-policy.json and classify all routes.",
    ]);
  }

  if (!fs.existsSync(SITEMAP_FILE)) {
    fail([`Sitemap file not found: ${path.relative(ROOT, SITEMAP_FILE)}`]);
  }

  const policy = JSON.parse(fs.readFileSync(POLICY_FILE, "utf8"));
  const policyErrors = validatePolicyStructure(policy);
  if (policyErrors.length > 0) {
    fail(policyErrors);
  }

  const pendingClassification = Array.isArray(policy.pendingClassification)
    ? policy.pendingClassification
    : [];

  if (pendingClassification.length > 0) {
    fail([
      `Pending route classifications must be resolved: ${pendingClassification.join(", ")}`,
      "Classify each route under classes.indexable/noindex/redirect and remove it from pendingClassification.",
    ]);
  }

  const pageFiles = listPageFiles(APP_DIR);
  const routes = pageFiles
    .map(routeFromPageFile)
    .sort((left, right) => left.localeCompare(right));
  const sitemapSource = fs.readFileSync(SITEMAP_FILE, "utf8");
  const sitemapStaticPaths = parseStaticSitemapPaths(sitemapSource);

  for (const route of routes) {
    const matchedClasses = getRouteClass(route, policy.classes);

    if (matchedClasses.length === 0) {
      errors.push(
        `Route ${route} is not classified. Add it to config/seo/route-indexing-policy.json.`,
      );
      continue;
    }

    if (matchedClasses.length > 1) {
      errors.push(
        `Route ${route} matches multiple classes (${matchedClasses.join(", ")}). Make class rules mutually exclusive.`,
      );
      continue;
    }

    const routeClass = matchedClasses[0];
    if (routeClass === "indexable") {
      errors.push(
        ...validateIndexableRoute(
          route,
          policy,
          sitemapSource,
          sitemapStaticPaths,
        ),
      );
    } else {
      errors.push(
        ...validateNonIndexableRoute(route, routeClass, sitemapStaticPaths),
      );
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    `SEO route indexing policy check passed for ${routes.length} routes.`,
  );
}

main();
