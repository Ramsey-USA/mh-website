/**
 * @jest-environment node
 */

import { GET } from "../sitemap-index.xml/route";

describe("sitemap index route", () => {
  afterEach(() => {
    delete process.env["NEXT_PUBLIC_SITE_URL"];
  });

  it("returns a sitemap index with the canonical sitemap entry", async () => {
    process.env["NEXT_PUBLIC_SITE_URL"] = "https://staging.mhc-gc.com";

    const response = await GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/xml");
    expect(body).toContain("<sitemapindex");
    expect(body).toContain("https://staging.mhc-gc.com/sitemap.xml");
  });
});
