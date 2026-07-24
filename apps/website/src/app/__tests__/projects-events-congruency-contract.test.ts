/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

function readAppSource(relativePath: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "src", "app", relativePath),
    "utf8",
  );
}

function expectOrderedTokens(source: string, orderedTokens: string[]) {
  let previousIndex = -1;

  for (const token of orderedTokens) {
    const index = source.indexOf(token);
    expect(index).toBeGreaterThan(-1);
    expect(index).toBeGreaterThan(previousIndex);
    previousIndex = index;
  }
}

describe("Projects and events page congruency contract", () => {
  it("keeps the shared page shell sequence aligned", () => {
    const projectsSource = readAppSource("projects/ProjectsPageClient.tsx");
    const eventsSource = readAppSource("events/EventsLandingPageClient.tsx");

    // Shared shell components that must exist on both pages.
    const sharedShellTokens = [
      "<Breadcrumb",
      "<JeremyAuthorityLinksStrip",
      "<TestimonialsSection",
      "<NextStepsSection",
    ];

    for (const token of sharedShellTokens) {
      expect(projectsSource).toContain(token);
      expect(eventsSource).toContain(token);
    }

    expectOrderedTokens(projectsSource, [
      "<ProjectsHero",
      "<Breadcrumb",
      "<JeremyAuthorityLinksStrip",
      "<TestimonialsSection",
      "<NextStepsSection",
    ]);

    expectOrderedTokens(eventsSource, [
      "<EventsHero",
      "<Breadcrumb",
      "<JeremyAuthorityLinksStrip",
      "<TestimonialsSection",
      "<NextStepsSection",
    ]);
  });

  it("keeps events testimonials on dedicated event partner content", () => {
    const eventsSource = readAppSource("events/EventsLandingPageClient.tsx");
    const eventDataSource = readAppSource("../lib/data/events.ts");

    expect(eventsSource).toContain("getLocalizedEventTestimonials");
    expect(eventsSource).not.toContain("normalizeStakeholderTestimonials");

    expect(eventDataSource).toContain("Richland Chamber of Commerce");
    expect(eventDataSource).toContain("Volunteer Program Coordinator");
  });
});
