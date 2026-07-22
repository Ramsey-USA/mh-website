/**
 * @jest-environment node
 */

import robotsFn from "../robots";

describe("robots()", () => {
  afterEach(() => {
    delete process.env["NEXT_PUBLIC_SITE_URL"];
  });

  it("returns a Rules object with allow / and disallow list", () => {
    const result = robotsFn();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule?.allow).toBe("/");
    expect(rule?.disallow).toContain("/api/");
    expect(rule?.disallow).toContain("/admin/");
  });

  it("sets sitemap and host from canonical defaults when env var is absent", () => {
    const result = robotsFn();
    expect(result.sitemap).toEqual([
      "https://www.mhc-gc.com/sitemap.xml",
      "https://www.mhc-gc.com/sitemap-index.xml",
    ]);
    expect(result.host).toBe("www.mhc-gc.com");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://staging.mhc-gc.com";
    const result = robotsFn();
    expect(result.sitemap).toEqual([
      "https://staging.mhc-gc.com/sitemap.xml",
      "https://staging.mhc-gc.com/sitemap-index.xml",
    ]);
    expect(result.host).toBe("staging.mhc-gc.com");
  });

  it("defines explicit directives for major search engine crawlers", () => {
    const result = robotsFn();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const userAgents = rules.map((rule) => rule.userAgent);

    expect(userAgents).toEqual(
      expect.arrayContaining([
        "Googlebot",
        "Bingbot",
        "DuckDuckBot",
        "Slurp",
        "YandexBot",
        "Baiduspider",
        "*",
      ]),
    );
  });
});
