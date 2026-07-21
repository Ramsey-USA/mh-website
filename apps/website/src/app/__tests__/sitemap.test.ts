/**
 * @jest-environment node
 */

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

  it("uses a single canonical URL per route without locale prefixes", () => {
    const entries = sitemapFn();
    expect(entries.some((entry) => /\/es(?:\/|$)/.test(entry.url))).toBe(false);
    expect(entries.some((entry) => /\/en(?:\/|$)/.test(entry.url))).toBe(false);
  });

  it("does not emit locale alternates for cookie-driven locale routing", () => {
    const entries = sitemapFn();
    const home = entries.find(
      (entry) =>
        entry.url === "https://www.mhc-gc.com/" ||
        entry.url === "https://www.mhc-gc.com",
    );

    expect(home?.alternates).toBeUndefined();
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
  it("returns deterministic URL ordering for stable crawl diffs", () => {
    const entries = sitemapFn();
    const urls = entries.map((entry) => entry.url);
    const sorted = [...urls].sort((a, b) => a.localeCompare(b));

    expect(urls).toEqual(sorted);
  });

  it("does not include raw media asset URLs", () => {
    const entries = sitemapFn();

    expect(
      entries.some(
        (entry) =>
          entry.url.includes("/images/") || entry.url.includes("/videos/"),
      ),
    ).toBe(false);
  });

  it("includes Jeremy Thamert authority page as canonical path only", () => {
    const entries = sitemapFn();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://www.mhc-gc.com/jeremy-thamert");
    expect(urls).not.toContain("https://www.mhc-gc.com/en/jeremy-thamert");
    expect(urls).not.toContain("https://www.mhc-gc.com/es/jeremy-thamert");
  });

  it("includes services overview page as canonical path only", () => {
    const entries = sitemapFn();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://www.mhc-gc.com/services");
    expect(urls).not.toContain("https://www.mhc-gc.com/en/services");
    expect(urls).not.toContain("https://www.mhc-gc.com/es/services");
  });

  it("includes news and insights route as canonical path only", () => {
    const entries = sitemapFn();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://www.mhc-gc.com/news");
    expect(urls).not.toContain("https://www.mhc-gc.com/en/news");
    expect(urls).not.toContain("https://www.mhc-gc.com/es/news");
  });

  it("excludes utility and redirected routes", () => {
    const urls = sitemapFn().map((entry) => entry.url);

    expect(urls).not.toContain("https://www.mhc-gc.com/qr-codes");
    expect(urls).not.toContain("https://www.mhc-gc.com/sitemap");
    expect(urls).not.toContain("https://www.mhc-gc.com/partners");
  });

  it("does not include /events by default", () => {
    delete process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];
    const urls = sitemapFn().map((entry) => entry.url);

    expect(urls).not.toContain("https://www.mhc-gc.com/events");
  });

  it("includes /events when explicitly enabled", () => {
    process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] = "1";
    const urls = sitemapFn().map((entry) => entry.url);

    expect(urls).toContain("https://www.mhc-gc.com/events");
  });
});
