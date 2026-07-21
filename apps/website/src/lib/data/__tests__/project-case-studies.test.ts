/**
 * @jest-environment node
 */

import {
  getPublishedProjectCaseStudies,
  getPublishedProjectCaseStudyBySlug,
} from "../project-case-studies";

describe("project-case-studies", () => {
  it("keeps source-backed evidence on the top public case studies", () => {
    const published = getPublishedProjectCaseStudies();
    const topSlugs = published.slice(0, 3).map((project) => project.slug);

    expect(topSlugs).toEqual([
      "volm-companies-remodel",
      "darigold-pasco-production-facility",
      "franklin-county-coroners-office-morgue",
    ]);

    for (const slug of topSlugs) {
      const project = getPublishedProjectCaseStudyBySlug(slug);

      expect(project).toBeDefined();
      expect(project?.evidenceSourceFile).toEqual(expect.any(String));
      expect(project?.evidenceNotes).toEqual(expect.any(String));
      expect(project?.reviewStatus).toEqual(expect.any(String));
    }
  });
});
