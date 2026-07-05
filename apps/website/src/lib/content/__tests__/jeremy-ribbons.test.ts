import {
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

  it("falls back to default ribbon for unknown routes", () => {
    const ribbon = getJeremyRibbon("unknown-route");

    expect(ribbon.eyebrow).toBe("Words from the General");
    expect(ribbon.quote).toContain("every page");
  });
});
