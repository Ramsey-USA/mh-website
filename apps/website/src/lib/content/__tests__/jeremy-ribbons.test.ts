import {
  getAllJeremyRibbons,
  getJeremyRibbon,
  getJeremyRibbonForPath,
} from "@/lib/content/jeremy-ribbons";

describe("jeremy-ribbons", () => {
  it("returns a configured ribbon for known static routes", () => {
    const ribbon = getJeremyRibbon("about");

    expect(ribbon.eyebrow).toBe("Words from the General");
    expect(ribbon.quote).toContain("About us");
    expect(ribbon.attribution).toContain("Jeremy Thamert");
  });

  it("returns a configured ribbon for the services page key", () => {
    const ribbon = getJeremyRibbon("services");

    expect(ribbon.eyebrow).toBe("Words from the General");
    expect(ribbon.quote).toContain("Services");
  });

  it("maps root path to the home ribbon", () => {
    const ribbon = getJeremyRibbonForPath("/");

    expect(ribbon.quote).toContain("home page");
  });

  it("maps dynamic paths to dynamic ribbon keys", () => {
    const projectRibbon = getJeremyRibbonForPath(
      "/projects/tri-cities-medical",
    );
    const faqRibbon = getJeremyRibbonForPath("/faq/safety");
    const sectionRibbon = getJeremyRibbonForPath(
      "/resources/safety-manual/section/fall-protection",
    );

    expect(projectRibbon.quote).toContain("project profile");
    expect(faqRibbon.quote).toContain("FAQ category");
    expect(sectionRibbon.quote).toContain("safety section");
  });

  it("normalizes path casing, query string, hash, and trailing slash", () => {
    const ribbon = getJeremyRibbonForPath("/ABOUT/?utm=mh#leadership");

    expect(ribbon.quote).toContain("About us");
  });

  it("returns complete ribbon records for all configured keys", () => {
    const ribbons = getAllJeremyRibbons();

    expect(Object.keys(ribbons).length).toBeGreaterThan(20);

    for (const ribbon of Object.values(ribbons)) {
      expect(ribbon.eyebrow).toBeTruthy();
      expect(ribbon.quote).toBeTruthy();
      expect(ribbon.attribution).toContain("Jeremy Thamert");
    }
  });

  it("falls back to default ribbon for unknown routes", () => {
    const ribbon = getJeremyRibbon("unknown-route");

    expect(ribbon.eyebrow).toBe("Words from the General");
    expect(ribbon.quote).toContain("every page");
  });
});
