#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");

const ROUTE_MANIFEST_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "seo",
  "route-manifest.ts",
);
const REDIRECTS_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "routing",
  "redirects.json",
);
const SITEMAP_FILE = path.join(ROOT, "src", "app", "sitemap.ts");
const PROJECTS_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "data",
  "project-case-studies.ts",
);
const FAQ_FILE = path.join(ROOT, "src", "lib", "data", "faq-data.ts");
const LOCATIONS_FILE = path.join(ROOT, "src", "lib", "data", "locations.ts");
const SAFETY_CLUSTERS_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "data",
  "safety-manual-clusters.ts",
);
const GLOBAL_MENU_FILE = path.join(
  ROOT,
  "src",
  "components",
  "layout",
  "globalMenuItems.ts",
);
const FOOTER_FILE = path.join(
  ROOT,
  "src",
  "components",
  "layout",
  "Footer.tsx",
);
const NAV_CONFIG_FILE = path.join(
  ROOT,
  "src",
  "components",
  "navigation",
  "navigationConfigs.ts",
);

const BASE_REQUIRED_ROUTES = [
  "/",
  "/services",
  "/projects",
  "/about",
  "/contact",
  "/events/operation-cast-recover",
];
const UTILITY_PREFIXES = ["/api/", "/sitemap", "/qr-codes", "/offline"];
const FORBIDDEN_STATUS_FRAGMENTS = [
  "/draft",
  "/canceled",
  "/cancelled",
  "/private",
];
const CROSS_APP_PREFIXES = ["/hub", "/dashboard"];

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function listFilesRecursive(startDir) {
  const stack = [startDir];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function routeFromAppFile(filePath) {
  const relative = path.relative(APP_DIR, filePath).split(path.sep).join("/");

  if (relative === "page.tsx") return "/";
  if (relative === "sitemap.ts") return "/sitemap.xml";
  if (relative === "robots.ts") return "/robots.txt";
  if (relative === "manifest.ts") return "/manifest.webmanifest";

  if (relative.endsWith("/page.tsx")) {
    return `/${relative.replace(/\/page\.tsx$/, "")}`;
  }

  if (relative.endsWith("/route.ts")) {
    return `/${relative.replace(/\/route\.ts$/, "")}`;
  }

  return null;
}

function collectRouteTemplates() {
  const files = listFilesRecursive(APP_DIR).filter((filePath) =>
    /(\/page\.tsx|\/route\.ts|\/(sitemap|robots|manifest)\.ts)$/.test(filePath),
  );

  const templates = [];
  for (const filePath of files) {
    const route = routeFromAppFile(filePath);
    if (route) {
      templates.push(route === "" ? "/" : route);
    }
  }

  return [...new Set(templates)].sort((a, b) => a.localeCompare(b));
}

function normalizePath(pathname) {
  if (!pathname) return "/";
  if (!pathname.startsWith("/")) return `/${pathname}`;
  if (pathname.length > 1) return pathname.replace(/\/+$/, "");
  return pathname;
}

function pathMatchesTemplate(actualPath, template) {
  const actual = normalizePath(actualPath).split("/").filter(Boolean);
  const pattern = normalizePath(template).split("/").filter(Boolean);

  let i = 0;
  let j = 0;

  while (i < actual.length && j < pattern.length) {
    const part = pattern[j];
    if (/^\[\.\.\.[^\]]+\]$/.test(part)) {
      return true;
    }
    if (/^\[[^\]]+\]$/.test(part)) {
      i += 1;
      j += 1;
      continue;
    }
    if (part !== actual[i]) {
      return false;
    }
    i += 1;
    j += 1;
  }

  if (i === actual.length && j === pattern.length) return true;
  if (j === pattern.length - 1 && /^\[\.\.\.[^\]]+\]$/.test(pattern[j])) {
    return true;
  }

  return false;
}

function isRouteImplemented(routePath, templates) {
  return templates.some((template) => pathMatchesTemplate(routePath, template));
}

function parseStaticManifestEntries(source) {
  const staticBlockMatch = source.match(
    /const\s+STATIC_ROUTES(?:\s*:[^=]+)?\s*=\s*\[(?<block>[\s\S]*?)\n\];/,
  );
  const block = staticBlockMatch?.groups?.block || "";
  const matches = block.matchAll(
    /path:\s*"([^"]+)"[\s\S]*?locales:\s*\{\s*en:\s*true(?:\s+as\s+const)?\s*,\s*es:\s*(true|false)/g,
  );

  const entries = [];
  for (const match of matches) {
    entries.push({
      path: normalizePath(match[1]),
      locales: { en: true, es: match[2] === "true" },
      source: "static",
    });
  }

  return entries;
}

function parseProjectSlugs() {
  const source = readText(PROJECTS_FILE);
  const allSlugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const unpublishedSlugs = new Set(
    [
      ...source.matchAll(
        /slug:\s*"([^"]+)"[\s\S]{0,600}?isPublished:\s*false/g,
      ),
    ].map((m) => m[1]),
  );

  return {
    all: [...new Set(allSlugs)],
    published: [
      ...new Set(allSlugs.filter((slug) => !unpublishedSlugs.has(slug))),
    ],
    unpublished: [...unpublishedSlugs],
  };
}

function parseFaqCategorySlugs() {
  const source = readText(FAQ_FILE);
  return [
    ...new Set([...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1])),
  ];
}

function parseLocationSlugs() {
  const source = readText(LOCATIONS_FILE);
  return [
    ...new Set([...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((m) => m[1])),
  ];
}

function parseSafetyClusterSlugs() {
  const source = readText(SAFETY_CLUSTERS_FILE);
  const blockMatch = source.match(
    /ALL_CLUSTER_SLUGS\s*=\s*\[(?<block>[\s\S]*?)\]\s*as\s+const/,
  );
  const block = blockMatch?.groups?.block || "";
  return [...new Set([...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]))];
}

function parseRedirects() {
  const redirects = JSON.parse(readText(REDIRECTS_FILE));
  return redirects.map((record) => ({
    source: normalizePath(record.source),
    destination: normalizePath(record.destination),
    permanent: Boolean(record.permanent),
  }));
}

function parseRequireArgs(argv) {
  const required = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--require") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("Missing value for --require");
      }
      required.push(normalizePath(value));
      i += 1;
    }
  }
  return required;
}

function parseLinkHrefs() {
  const hrefs = new Set();

  const globalMenuSource = readText(GLOBAL_MENU_FILE);
  for (const match of globalMenuSource.matchAll(/href:\s*"([^"]+)"/g)) {
    hrefs.add(match[1]);
  }

  const footerSource = readText(FOOTER_FILE);
  for (const varName of ["footerNavCol1Hrefs", "footerNavCol2Hrefs"]) {
    const blockMatch = footerSource.match(
      new RegExp(`${varName}\\s*=\\s*\\[(?<block>[\\s\\S]*?)\\]`, "m"),
    );
    const block = blockMatch?.groups?.block || "";
    for (const match of block.matchAll(/"([^"]+)"/g)) {
      hrefs.add(match[1]);
    }
  }
  for (const match of footerSource.matchAll(/href:\s*"([^"]+)"/g)) {
    hrefs.add(match[1]);
  }

  const navConfigSource = readText(NAV_CONFIG_FILE);
  for (const match of navConfigSource.matchAll(/href:\s*"([^"]+)"/g)) {
    hrefs.add(match[1]);
  }

  return [...hrefs]
    .map((href) => href.split("#", 1)[0]?.split("?", 1)[0] || "")
    .map((href) => normalizePath(href))
    .filter((href) => href.startsWith("/"));
}

function buildCanonicalManifest(eventsPublished) {
  const manifestSource = readText(ROUTE_MANIFEST_FILE);
  const staticEntries = parseStaticManifestEntries(manifestSource);

  const projectSlugs = parseProjectSlugs().published;
  const faqSlugs = parseFaqCategorySlugs();
  const locationSlugs = parseLocationSlugs();
  const clusterSlugs = parseSafetyClusterSlugs();

  const dynamicEntries = [
    ...projectSlugs.map((slug) => ({
      path: normalizePath(`/projects/${slug}`),
      locales: { en: true, es: false },
      source: "project",
      slug,
    })),
    ...faqSlugs.map((slug) => ({
      path: normalizePath(`/faq/${slug}`),
      locales: { en: true, es: false },
      source: "faq",
      slug,
    })),
    ...locationSlugs.map((slug) => ({
      path: normalizePath(`/locations/${slug}`),
      locales: { en: true, es: false },
      source: "location",
      slug,
    })),
    ...clusterSlugs.map((slug) => ({
      path: normalizePath(`/resources/safety-manual/${slug}`),
      locales: { en: true, es: false },
      source: "safety-cluster",
      slug,
    })),
  ];

  const eventEntry = eventsPublished
    ? [
        {
          path: "/events",
          locales: { en: true, es: true },
          source: "events",
          slug: "events",
        },
      ]
    : [];

  const redirects = parseRedirects();
  const redirectSources = new Set(redirects.map((record) => record.source));

  const allEntries = [...staticEntries, ...dynamicEntries, ...eventEntry]
    .filter((entry) => !entry.path.startsWith("/api/"))
    .filter((entry) => entry.path !== "/en" && !entry.path.startsWith("/en/"))
    .filter((entry) => entry.path !== "/qr-codes")
    .filter(
      (entry) =>
        entry.path !== "/offline" && !entry.path.startsWith("/offline/"),
    )
    .filter(
      (entry) =>
        entry.path !== "/sitemap" && !entry.path.startsWith("/sitemap/"),
    )
    .filter((entry) => !redirectSources.has(entry.path));

  const unique = new Map();
  for (const entry of allEntries) {
    unique.set(entry.path, entry);
  }

  return [...unique.values()].sort((a, b) => a.path.localeCompare(b.path));
}

function toSitemapRows(manifestEntries, siteOrigin) {
  const rows = [];

  for (const entry of manifestEntries) {
    rows.push({
      url: `${siteOrigin}${entry.path}`,
      routePath: entry.path,
      source: entry.source,
    });
  }

  return rows.sort((a, b) => a.url.localeCompare(b.url));
}

function getSiteOrigin() {
  const fallback = "https://www.mhc-gc.com";
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || fallback).trim();
  try {
    return new URL(raw).origin;
  } catch {
    return fallback;
  }
}

function checkRouteIntegrity() {
  const errors = [];

  const cliRequiredRoutes = parseRequireArgs(process.argv.slice(2));
  const requiredRoutes = [
    ...new Set([...BASE_REQUIRED_ROUTES, ...cliRequiredRoutes]),
  ];

  const routeTemplates = collectRouteTemplates();
  const redirects = parseRedirects();
  const redirectMap = new Map(
    redirects.map((record) => [record.source, record.destination]),
  );

  const eventsPublished = process.env.NEXT_PUBLIC_EVENTS_HUB_INDEXABLE === "1";
  const activeManifest = buildCanonicalManifest(eventsPublished);
  const activeManifestPaths = new Set(
    activeManifest.map((entry) => entry.path),
  );
  const siteOrigin = getSiteOrigin();
  const sitemapRows = toSitemapRows(activeManifest, siteOrigin);

  const dynamicEvidence = {
    projects: parseProjectSlugs(),
    faqSlugs: new Set(parseFaqCategorySlugs()),
    locationSlugs: new Set(parseLocationSlugs()),
    clusterSlugs: new Set(parseSafetyClusterSlugs()),
  };

  // 1. Every static canonical route maps to a page or route implementation.
  for (const entry of activeManifest.filter(
    (item) => item.source === "static",
  )) {
    if (!isRouteImplemented(entry.path, routeTemplates)) {
      errors.push(
        `${entry.path}: missing App Router implementation for static canonical route (expected page.tsx or route.ts).`,
      );
    }
  }

  // 2. Every dynamic sitemap entry maps to a published content record.
  for (const entry of activeManifest.filter(
    (item) => item.source !== "static" && item.source !== "events",
  )) {
    const slug =
      entry.slug || entry.path.split("/").filter(Boolean).at(-1) || "";

    if (entry.source === "project") {
      if (!dynamicEvidence.projects.published.includes(slug)) {
        errors.push(
          `${entry.path}: project slug is not published in project-case-studies.ts.`,
        );
      }
    }

    if (entry.source === "faq") {
      if (!dynamicEvidence.faqSlugs.has(slug)) {
        errors.push(
          `${entry.path}: FAQ category slug missing from faq-data.ts.`,
        );
      }
    }

    if (entry.source === "location") {
      if (!dynamicEvidence.locationSlugs.has(slug)) {
        errors.push(`${entry.path}: location slug missing from locations.ts.`);
      }
    }

    if (entry.source === "safety-cluster") {
      if (!dynamicEvidence.clusterSlugs.has(slug)) {
        errors.push(
          `${entry.path}: safety cluster slug missing from safety-manual-clusters.ts.`,
        );
      }
    }
  }

  // Ensure unpublished project slugs are not in the canonical manifest.
  for (const unpublishedSlug of dynamicEvidence.projects.unpublished) {
    const candidate = `/projects/${unpublishedSlug}`;
    if (activeManifestPaths.has(candidate)) {
      errors.push(
        `${candidate}: unpublished project appears in canonical manifest.`,
      );
    }
  }

  // 3. No route is both canonical and redirected.
  for (const entry of activeManifest) {
    if (redirectMap.has(entry.path)) {
      errors.push(
        `${entry.path}: route is both canonical and redirect source.`,
      );
    }
  }

  // 4. No redirect target is another redirect.
  for (const record of redirects) {
    if (redirectMap.has(record.destination)) {
      errors.push(
        `${record.source} -> ${record.destination}: redirect target is also a redirect source.`,
      );
    }
  }

  // 5. No navigation or footer link points to a missing route.
  const navLinks = parseLinkHrefs();
  for (const href of navLinks) {
    if (
      CROSS_APP_PREFIXES.some(
        (prefix) => href === prefix || href.startsWith(`${prefix}/`),
      )
    ) {
      continue;
    }

    if (href.startsWith("/api/")) {
      continue;
    }

    const implemented = isRouteImplemented(href, routeTemplates);
    const redirected = redirectMap.has(href);
    if (!implemented && !redirected) {
      errors.push(
        `${href}: navigation/footer link points to missing route implementation.`,
      );
    }
  }

  // 6. Sitemap excludes disallowed route classes.
  for (const row of sitemapRows) {
    if (row.routePath === "/en" || row.routePath.startsWith("/en/")) {
      errors.push(
        `${row.routePath}: /en-prefixed alias must not appear in sitemap.`,
      );
    }

    if (row.routePath === "/es" || row.routePath.startsWith("/es/")) {
      errors.push(
        `${row.routePath}: /es-prefixed alias must not appear in sitemap.`,
      );
    }

    if (
      UTILITY_PREFIXES.some(
        (prefix) =>
          row.routePath === prefix || row.routePath.startsWith(prefix),
      )
    ) {
      errors.push(
        `${row.routePath}: utility/API route must not appear in sitemap.`,
      );
    }

    if (
      FORBIDDEN_STATUS_FRAGMENTS.some((fragment) =>
        row.routePath.includes(fragment),
      )
    ) {
      errors.push(
        `${row.routePath}: draft/canceled/private route must not appear in sitemap.`,
      );
    }

    if (redirectMap.has(row.routePath)) {
      errors.push(
        `${row.routePath}: redirect source must not appear in sitemap.`,
      );
    }
  }

  // 7. Every canonical manifest route has a direct sitemap URL.
  for (const entry of activeManifest) {
    const canonicalUrl = `${siteOrigin}${entry.path}`;
    const hasCanonical = sitemapRows.some((row) => row.url === canonicalUrl);

    if (!hasCanonical) {
      errors.push(`${entry.path}: missing canonical sitemap entry.`);
    }
  }

  // 8. Critical routes remain present.
  for (const routePath of requiredRoutes) {
    if (!activeManifestPaths.has(routePath)) {
      errors.push(
        `${routePath}: required canonical route missing from manifest.`,
      );
    }
  }

  // 9. /events is included when event hub is published.
  const withEvents = buildCanonicalManifest(true).map((entry) => entry.path);
  if (!withEvents.includes("/events")) {
    errors.push(
      "/events: expected in canonical manifest when event hub is published.",
    );
  }

  if (eventsPublished && !activeManifestPaths.has("/events")) {
    errors.push(
      "/events: NEXT_PUBLIC_EVENTS_HUB_INDEXABLE=1 but /events is missing from active manifest.",
    );
  }

  // Guard the sitemap implementation wiring.
  const sitemapSource = readText(SITEMAP_FILE);
  if (
    !/toSitemapEntries\(buildCanonicalRouteManifest\(\)\)/.test(sitemapSource)
  ) {
    errors.push(
      "src/app/sitemap.ts: sitemap must be generated from buildCanonicalRouteManifest via toSitemapEntries().",
    );
  }

  return errors;
}

function main() {
  let errors = [];

  try {
    errors = checkRouteIntegrity();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("\nRoute integrity check failed:\n");
    console.error(`- fatal: ${message}`);
    process.exit(1);
  }

  if (errors.length > 0) {
    console.error("\nRoute integrity check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("PASS: route integrity check passed.");
}

main();
