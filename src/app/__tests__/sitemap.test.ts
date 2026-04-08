/**
 * @jest-environment node
 */

// Mock fs so we don't scan the real public directory
jest.mock("node:fs", () => ({
  readdirSync: jest.fn(() => []),
  statSync: jest.fn(() => ({ isDirectory: () => false })),
  existsSync: jest.fn(() => false),
}));

jest.mock("node:path", () => {
  const actual = jest.requireActual<typeof import("node:path")>("node:path");
  return {
    ...actual,
    join: (...args: string[]) => args.join("/"),
  };
});

import sitemapFn from "../sitemap";

describe("sitemap()", () => {
  afterEach(() => {
    delete process.env["NEXT_PUBLIC_SITE_URL"];
  });

  it("returns an array of sitemap entries", () => {
    const entries = sitemapFn();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://staging.mhc-gc.com";
    const entries = sitemapFn();
    expect(entries[0]!.url).toContain("https://staging.mhc-gc.com");
  });

  it("falls back to default base URL when env var is absent", () => {
    const entries = sitemapFn();
    expect(entries[0]!.url).toContain("mhc-gc.com");
  });

  it("includes the homepage at priority 1.0", () => {
    const entries = sitemapFn();
    const home = entries.find(
      (e) => e.url.endsWith("/") || e.url.match(/mhc-gc\.com\/$/),
    );
    expect(home).toBeDefined();
    expect(home!.priority).toBe(1.0);
  });

  it("every entry has a url, lastModified, changeFrequency and priority", () => {
    const entries = sitemapFn();
    for (const entry of entries.slice(0, 5)) {
      expect(typeof entry.url).toBe("string");
      expect(entry.lastModified).toBeDefined();
      expect(entry.changeFrequency).toBeDefined();
      expect(typeof entry.priority).toBe("number");
    }
  });
});

// ─── Media URL branches ───────────────────────────────────────────────────────

describe("sitemap() with media files", () => {
  // Re-require a fresh module after each test since jest.mock is hoisted but
  // we need to change the mock implementation per test.
  beforeEach(() => {
    jest.resetModules();
    // Re-apply the path mock so join stays predictable
    jest.mock("node:path", () => {
      const actual =
        jest.requireActual<typeof import("node:path")>("node:path");
      return { ...actual, join: (...args: string[]) => args.join("/") };
    });
  });

  it("skips non-existent media target directories", () => {
    jest.mock("node:fs", () => ({
      existsSync: jest.fn(() => false),
      readdirSync: jest.fn(() => []),
    }));
    const { default: sitemap } = require("../sitemap") as {
      default: () => unknown[];
    };
    const entries = sitemap();
    // Only static pages — no media entries
    expect(
      entries.every((e: unknown) => {
        const entry = e as { url: string };
        return (
          !entry.url.includes("/images/") && !entry.url.includes("/videos/")
        );
      }),
    ).toBe(true);
  });

  it("includes media files from images directory with correct priority", () => {
    jest.mock("node:fs", () => ({
      existsSync: jest.fn(() => true),
      readdirSync: jest.fn((dir: string) => {
        if (dir.endsWith("images")) {
          return [
            { name: "jobsite-photo.jpg", isDirectory: () => false },
            { name: "logo.png", isDirectory: () => false },
            { name: "document.pdf", isDirectory: () => false }, // not allowed ext
          ];
        }
        if (dir.endsWith("videos")) {
          return [{ name: "boom-video.mp4", isDirectory: () => false }];
        }
        return [];
      }),
    }));
    const { default: sitemap } = require("../sitemap") as {
      default: () => unknown[];
    };
    const entries = sitemap() as Array<{ url: string; priority: number }>;
    const mediaEntries = entries.filter(
      (e) => e.url.includes("/images/") || e.url.includes("/videos/"),
    );
    expect(mediaEntries.length).toBeGreaterThan(0);

    // jobsite-photo.jpg should match "jobsite" → priority 0.7
    const jobsite = mediaEntries.find((e) => e.url.includes("jobsite"));
    expect(jobsite?.priority).toBe(0.7);

    // logo.png doesn't match important patterns → priority 0.4
    const logo = mediaEntries.find((e) => e.url.includes("logo"));
    expect(logo?.priority).toBe(0.4);

    // boom-video.mp4 matches "boom" → priority 0.7
    const boom = mediaEntries.find((e) => e.url.includes("boom"));
    expect(boom?.priority).toBe(0.7);

    // document.pdf should be excluded
    expect(entries.some((e) => e.url.includes("document.pdf"))).toBe(false);
  });

  it("recurses into subdirectories for media file collection", () => {
    let callCount = 0;
    jest.mock("node:fs", () => ({
      existsSync: jest.fn(() => true),
      readdirSync: jest.fn((dir: string) => {
        callCount++;
        if (dir.endsWith("images")) {
          return [{ name: "subfolder", isDirectory: () => true }];
        }
        if (dir.endsWith("subfolder")) {
          return [{ name: "zoom-photo.webp", isDirectory: () => false }];
        }
        // videos dir
        return [];
      }),
    }));
    const { default: sitemap } = require("../sitemap") as {
      default: () => unknown[];
    };
    const entries = sitemap() as Array<{ url: string; priority: number }>;
    const zoom = entries.find((e) => e.url.includes("zoom"));
    expect(zoom).toBeDefined();
    expect(zoom?.priority).toBe(0.7); // "zoom" is an important pattern
    expect(callCount).toBeGreaterThan(2); // proves recursion
  });

  it("getMediaPriority returns 0.7 for all known important keywords", () => {
    // Keywords defined here for the assertion loop only.
    // The factory below inlines the same list to avoid jest.mock hoisting
    // issues with closure references to locally-declared variables.
    const importantKeywords = [
      "zoom",
      "boom",
      "forklift",
      "safety",
      "job-site",
      "jobsite",
      "industrial",
    ];
    jest.mock("node:fs", () => ({
      existsSync: jest.fn(() => true),
      readdirSync: jest.fn((dir: string) => {
        if (dir.endsWith("images")) {
          return [
            "zoom",
            "boom",
            "forklift",
            "safety",
            "job-site",
            "jobsite",
            "industrial",
          ].map((k) => ({
            name: `${k}-image.jpg`,
            isDirectory: () => false,
          }));
        }
        return [];
      }),
    }));
    const { default: sitemap } = require("../sitemap") as {
      default: () => unknown[];
    };
    const entries = sitemap() as Array<{ url: string; priority: number }>;
    for (const kw of importantKeywords) {
      // Search only within media entries to avoid matching static page URLs
      // (e.g. /resources/safety-manual also contains "safety" at priority 0.75)
      const found = entries.find(
        (e) =>
          (e.url.includes("/images/") || e.url.includes("/videos/")) &&
          e.url.includes(kw),
      );
      expect(found?.priority).toBe(0.7);
    }
  });
});
