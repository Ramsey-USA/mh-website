import { redirects, findRedirectConflicts } from "../redirects";

describe("routing redirects registry", () => {
  it("does not include a /sitemap redirect because /sitemap is a page", () => {
    const sitemapRedirect = redirects.find(
      (record) => record.source === "/sitemap",
    );

    expect(sitemapRedirect).toBeUndefined();
  });

  it("has no duplicate sources and no self-loop redirects", () => {
    const conflicts = findRedirectConflicts(redirects);

    expect(conflicts.duplicates).toEqual([]);
    expect(conflicts.loops).toEqual([]);
  });

  it("keeps redirect destinations one hop for the public redirects list", () => {
    const sources = new Set(redirects.map((record) => record.source));
    const oneHopViolations = redirects.filter((record) =>
      sources.has(record.destination),
    );

    expect(oneHopViolations).toEqual([]);
  });
});
