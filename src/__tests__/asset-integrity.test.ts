/**
 * Asset Integrity Guard
 *
 * Parses every Link: rel=preload header declared in middleware.ts and
 * verifies that every referenced asset exists in the /public directory.
 *
 * Why this matters
 * ----------------
 * A preload hint for a missing file causes browsers to fire a failing
 * network request before the page even begins rendering, wasting CPU and
 * LCP budget. It also silently masks deleted or moved assets.
 *
 * MHC Core Value: Thoroughness — we never ship hints that point nowhere.
 *
 * What this test does
 * -------------------
 * 1. Reads middleware.ts as source text (static analysis, no execution).
 * 2. Extracts every response.headers.set("Link", ...) value.
 * 3. Parses RFC 8288 <URL>; rel=preload directives from those values.
 * 4. Asserts each URL path resolves to a real file under /public.
 * 5. Asserts no absolute HTTP/HTTPS URLs appear (self-hosted assets only).
 *
 * When to update this test
 * ------------------------
 * If you intentionally add a preload to middleware.ts, also add the asset
 * to /public (or this guard will fail the CI pipeline until you do).
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "../..");
const MIDDLEWARE_PATH = path.join(ROOT, "middleware.ts");
const PUBLIC_DIR = path.join(ROOT, "public");

// ---------------------------------------------------------------------------
// Parsing helpers (no regex engine surprises – kept deliberately simple)
// ---------------------------------------------------------------------------

/**
 * Extracts every string literal that is passed as the second argument to
 * `response.headers.set("Link", ...)` inside middleware source text.
 *
 * Handles single-quoted, double-quoted, and template-literal values.
 */
function extractLinkHeaderValues(source: string): string[] {
  // Matches: response.headers.set("Link",   "value")
  //          response.headers.set('Link',   'value')
  //          response.headers.set("Link",   `value`)
  const pattern =
    /response\.headers\.set\(\s*["']Link["']\s*,\s*(?:"([^"\\]*)"|'([^'\\]*)'|`([^`]*)`)\s*\)/g;

  const values: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const value = match[1] ?? match[2] ?? match[3];
    if (value) values.push(value);
  }
  return values;
}

/**
 * Parses RFC 8288 link-values of the form:
 *   </path/to/asset>; rel=preload; as=image
 *   </a.js>; rel=preload; as=script, </b.css>; rel=preload; as=style
 *
 * Returns only entries that carry rel=preload (other relations are ignored).
 * Absolute URLs (http://, https://) are returned as-is for the separate
 * absolute-URL assertion below.
 */
function parsePreloadPaths(linkHeaderValue: string): string[] {
  const entries = linkHeaderValue.split(",").map((s) => s.trim());
  const paths: string[] = [];

  for (const entry of entries) {
    // Entry must contain rel=preload to be relevant to this guard.
    if (!/rel\s*=\s*["']?preload["']?/i.test(entry)) continue;

    const urlMatch = entry.match(/^<([^>]+)>/);
    if (urlMatch?.[1]) {
      paths.push(urlMatch[1].trim());
    }
  }
  return paths;
}

function fileExistsInPublic(assetPath: string): boolean {
  const relative = assetPath.replace(/^\//, "");
  return fs.existsSync(path.join(PUBLIC_DIR, relative));
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe("Middleware Link: rel=preload — asset integrity", () => {
  let middlewareSource: string;
  let allPreloadPaths: string[];

  beforeAll(() => {
    middlewareSource = fs.readFileSync(MIDDLEWARE_PATH, "utf-8");

    const linkValues = extractLinkHeaderValues(middlewareSource);
    allPreloadPaths = linkValues.flatMap(parsePreloadPaths);
    // Deduplicate: same asset may appear in multiple header strings.
    allPreloadPaths = [...new Set(allPreloadPaths)];
  });

  // -------------------------------------------------------------------------
  // Guard 1 — all preloaded paths must exist in /public
  // -------------------------------------------------------------------------
  it("all preloaded asset paths must resolve to files in /public", () => {
    if (allPreloadPaths.length === 0) {
      // No preload headers declared — guard passes trivially.
      // This is valid if preloads were moved to <link rel=preload> in layout.tsx.
      return;
    }

    const absoluteUrls = allPreloadPaths.filter((p) => /^https?:\/\//i.test(p));
    const publicPaths = allPreloadPaths.filter((p) => !/^https?:\/\//i.test(p));

    const missing = publicPaths.filter((p) => !fileExistsInPublic(p));

    // Jest prints the missing array content on failure; the path list below provides
    // additional context via console.error so the fix path is immediately obvious.
    if (missing.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        `[asset-integrity] Preload assets declared in middleware.ts but missing from /public:\n` +
          missing
            .map(
              (p) =>
                `  • ${p}  →  ${path.join(PUBLIC_DIR, p.replace(/^\//, ""))}`,
            )
            .join("\n") +
          `\n\nAction required: remove stale preload references or restore the assets.`,
      );
    }
    expect(missing).toEqual([]);

    // Absolute-URL preloads are also reported here for completeness.
    if (absoluteUrls.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        "[asset-integrity] Absolute URLs found in Link preload headers – " +
          "prefer self-hosted paths to guarantee availability:\n" +
          absoluteUrls.map((u) => `  • ${u}`).join("\n"),
      );
    }
  });

  // -------------------------------------------------------------------------
  // Guard 2 — no absolute HTTP/HTTPS URLs in preload hints
  // -------------------------------------------------------------------------
  it("preload hints must not reference external absolute URLs", () => {
    const absoluteUrls = allPreloadPaths.filter((p) => /^https?:\/\//i.test(p));
    // External preload URLs can fail due to CORS, CDN outages, or domain changes.
    // All preloadable assets for MHC are self-hosted under /public.
    expect(absoluteUrls).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Guard 3 — regression: ensure canonical critical assets still exist
  // These are the assets that must always be present regardless of whether
  // they appear in middleware preloads or layout.tsx <link> tags.
  // -------------------------------------------------------------------------
  describe("canonical critical assets are present in /public", () => {
    const CRITICAL_ASSETS = [
      {
        path: "/fonts/MaterialIcons-Regular.woff2",
        description: "Material Icons font (preloaded in layout.tsx)",
      },
      {
        path: "/images/logo/mh-veteran-bg.webp",
        description: "Hero background image (preloaded in layout.tsx)",
      },
      { path: "/images/logo/mh-logo.png", description: "OG/Twitter card logo" },
      { path: "/manifest.json", description: "PWA manifest" },
      { path: "/sw.js", description: "Service worker" },
      { path: "/robots.txt", description: "Robots crawl directives" },
      { path: "/sitemap-index.xml", description: "SEO sitemap index" },
    ] as const;

    test.each(CRITICAL_ASSETS)(
      "$path exists ($description)",
      ({ path: assetPath }) => {
        expect(fileExistsInPublic(assetPath)).toBe(true);
      },
    );
  });
});
