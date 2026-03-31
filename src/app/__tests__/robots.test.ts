/**
 * @jest-environment node
 */

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    urls: { getSiteUrl: () => "https://mhc-gc.com" },
  },
}));

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

  it("sets sitemap and host from COMPANY_INFO when env var is absent", () => {
    const result = robotsFn();
    expect(result.sitemap).toBe("https://mhc-gc.com/sitemap.xml");
    expect(result.host).toBe("https://mhc-gc.com");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://staging.mhc-gc.com";
    const result = robotsFn();
    expect(result.sitemap).toBe("https://staging.mhc-gc.com/sitemap.xml");
    expect(result.host).toBe("https://staging.mhc-gc.com");
  });
});
