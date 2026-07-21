import { buildSiteFooterModel } from "../footer-data";

describe("footer-data", () => {
  const originalHtmlSitemap = process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"];
  const originalEventsHub = process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];

  beforeEach(() => {
    delete process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"];
    delete process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];
  });

  afterAll(() => {
    process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] = originalHtmlSitemap;
    process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] = originalEventsHub;
  });

  it("omits gated routes by default", () => {
    const model = buildSiteFooterModel("en");
    const allHrefs = model.navGroups.flatMap((group) =>
      group.items.map((item) => item.href),
    );

    expect(allHrefs).not.toContain("/events");
    expect(model.showHtmlSitemap).toBe(false);
  });

  it("includes events and html sitemap when enabled", () => {
    process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] = "1";
    process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] = "1";

    const model = buildSiteFooterModel("en");
    const allHrefs = model.navGroups.flatMap((group) =>
      group.items.map((item) => item.href),
    );

    expect(allHrefs).toContain("/events");
    expect(model.showHtmlSitemap).toBe(true);
  });

  it("keeps legal links constrained to approved routes", () => {
    const model = buildSiteFooterModel("en");

    expect(model.legalLinks).toEqual([
      { href: "/privacy", label: "Privacy" },
      { href: "/accessibility", label: "Accessibility" },
    ]);
  });
});
