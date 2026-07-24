/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

const SRC_ROOT = path.join(process.cwd(), "src", "app", "events");

function readRouteSource(relativePath: string): string {
  return fs.readFileSync(path.join(SRC_ROOT, relativePath), "utf8");
}

describe("Event route content contract", () => {
  const sharedInteractionSnippets = [
    "min-h-11",
    "hover:-translate-y-0.5",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-4",
  ];

  it("keeps canonical interaction classes on dynamic and dedicated event route CTAs", () => {
    const dynamicSource = readRouteSource("[slug]/page.tsx");
    const coolDesertSource = readRouteSource("cool-desert-nights/page.tsx");

    for (const snippet of sharedInteractionSnippets) {
      expect(dynamicSource).toContain(snippet);
      expect(coolDesertSource).toContain(snippet);
    }
  });

  it("preserves the three-card hero status pattern on dynamic and dedicated event routes", () => {
    const dynamicSource = readRouteSource("[slug]/page.tsx");
    const coolDesertSource = readRouteSource("cool-desert-nights/page.tsx");

    expect(dynamicSource).toContain("Status");
    expect(dynamicSource).toContain("Schedule");
    expect(dynamicSource).toContain("Coverage");

    expect(coolDesertSource).toContain("Status");
    expect(coolDesertSource).toContain("Event window");
    expect(coolDesertSource).toContain("Coverage");
  });

  it("keeps quick panel and brand trust section labels on both event route templates", () => {
    const dynamicSource = readRouteSource("[slug]/page.tsx");
    const coolDesertSource = readRouteSource("cool-desert-nights/page.tsx");

    expect(dynamicSource).toContain("Quick Panel");
    expect(dynamicSource).toContain("Brand Trust");

    expect(coolDesertSource).toContain("Quick Panel");
    expect(coolDesertSource).toContain("Brand Trust");
  });

  it("retains the primary slogan on shared and dedicated event pages", () => {
    const dynamicSource = readRouteSource("[slug]/page.tsx");
    const coolDesertSource = readRouteSource("cool-desert-nights/page.tsx");

    const slogan = "Built on Quality, Backed by Trust.";

    expect(dynamicSource).toContain(slogan);
    expect(coolDesertSource).toContain(slogan);
  });

  it("keeps Cool Desert Nights route explicitly framed as an archive route", () => {
    const coolDesertSource = readRouteSource("cool-desert-nights/page.tsx");

    expect(coolDesertSource).toContain("Archive Route");
    expect(coolDesertSource).toContain("Archived record with accountability");
    expect(coolDesertSource).toContain("/events/cool-desert-nights");
  });
});
