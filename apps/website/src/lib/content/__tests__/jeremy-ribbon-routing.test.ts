import { resolveJeremyRibbonKey } from "@/lib/content/jeremy-ribbon-routing";

describe("resolveJeremyRibbonKey", () => {
  const keys = [
    "home",
    "about",
    "events/operation-cast-recover",
    "events/[slug]",
    "projects",
    "projects/[slug]",
    "faq",
    "faq/[category]",
    "resources/safety-manual/section/[slug]",
    "resources/safety-manual/[cluster]",
    "safety/print/[id]",
  ] as const;

  it("returns exact static route key when available", () => {
    expect(resolveJeremyRibbonKey("/about", keys)).toBe("about");
    expect(resolveJeremyRibbonKey("/projects", keys)).toBe("projects");
    expect(resolveJeremyRibbonKey("/events/operation-cast-recover", keys)).toBe(
      "events/operation-cast-recover",
    );
  });

  it("maps root path to home", () => {
    expect(resolveJeremyRibbonKey("/", keys)).toBe("home");
  });

  it("matches single-segment dynamic keys", () => {
    expect(resolveJeremyRibbonKey("/events/cool-desert-nights", keys)).toBe(
      "events/[slug]",
    );
    expect(resolveJeremyRibbonKey("/projects/airport-apron", keys)).toBe(
      "projects/[slug]",
    );
    expect(resolveJeremyRibbonKey("/faq/safety", keys)).toBe("faq/[category]");
    expect(resolveJeremyRibbonKey("/safety/print/JHA-1022", keys)).toBe(
      "safety/print/[id]",
    );
  });

  it("matches deep dynamic keys", () => {
    expect(
      resolveJeremyRibbonKey(
        "/resources/safety-manual/section/fall-protection",
        keys,
      ),
    ).toBe("resources/safety-manual/section/[slug]");
    expect(resolveJeremyRibbonKey("/resources/safety-manual/forms", keys)).toBe(
      "resources/safety-manual/[cluster]",
    );
  });

  it("normalizes path before matching", () => {
    expect(resolveJeremyRibbonKey("/ABOUT/?utm=source#hash", keys)).toBe(
      "about",
    );
  });

  it("returns null when no key matches", () => {
    expect(resolveJeremyRibbonKey("/does-not-exist", keys)).toBeNull();
  });
});
