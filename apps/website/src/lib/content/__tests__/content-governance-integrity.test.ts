/**
 * @jest-environment node
 */

import {
  hasSourceReferences,
  isPubliclyVisibleContent,
  isReviewOverdue,
  type ContentGovernanceRecord,
} from "@/lib/content/content-governance";
import { projectCaseStudies } from "@/lib/data/project-case-studies";
import { serviceRoutes } from "@/lib/data/service-routes";
import { eventRecords } from "@/lib/data/events";
import { vintageTeamMembers } from "@/lib/data/vintage-team";
import { getLocationSlugs, getLocationBySlug } from "@/lib/data/locations";
import { getNewsInsightsContent } from "@/lib/data/news-insights";
import {
  normalizeEmployeeTestimonials,
  normalizeStakeholderTestimonials,
} from "@/lib/data/testimonials";

type GovernedRecord = {
  id: string;
  governance: ContentGovernanceRecord;
};

function collectGovernedRecords(): GovernedRecord[] {
  const records = [
    ...projectCaseStudies.map((record) => ({
      id: `project:${record.slug}`,
      governance: record.governance,
    })),
    ...serviceRoutes.map((record) => ({
      id: `service:${record.slug}`,
      governance: record.governance,
    })),
    ...eventRecords.map((record) => ({
      id: `event:${record.slug}`,
      governance: record.governance,
    })),
    ...vintageTeamMembers.map((record) => ({
      id: `team:${record.slug}`,
      governance: record.governance,
    })),
    ...getLocationSlugs().map((slug) => {
      const location = getLocationBySlug(slug);
      return {
        id: `location:${slug}`,
        governance: location?.governance,
      };
    }),
    {
      id: "news:en",
      governance: getNewsInsightsContent("en").governance,
    },
    {
      id: "news:es",
      governance: getNewsInsightsContent("es").governance,
    },
    {
      id: "testimonial:stakeholder-sample",
      governance: normalizeStakeholderTestimonials([
        {
          id: "stakeholder-sample",
          name: "Mission Partner",
          location: "Pasco, WA",
          project: "Sample Project",
          company: "Sample Co",
          quote: "Sample stakeholder quote",
        },
      ])[0]?.governance,
    },
    {
      id: "testimonial:employee-sample",
      governance: normalizeEmployeeTestimonials([
        {
          id: "employee-sample",
          name: "Team Member",
          role: "Project Engineer",
          title: "Project Engineer",
          quote: "Sample employee quote",
        },
      ])[0]?.governance,
    },
  ];

  return records.filter(
    (record): record is GovernedRecord => record.governance !== undefined,
  );
}

describe("content governance integrity", () => {
  it("keeps source references on governed content records", () => {
    const records = collectGovernedRecords();

    for (const record of records) {
      expect(hasSourceReferences(record.governance)).toBe(true);
    }
  });

  it("does not expose public content without approved governance", () => {
    const records = collectGovernedRecords();

    for (const record of records) {
      if (!isPubliclyVisibleContent(record.governance)) {
        continue;
      }

      expect(record.governance.approvalState).toBe("approved");
      expect(record.governance.publishState).toBe("public");
    }
  });

  it("flags no overdue reviews in the current governed set", () => {
    const records = collectGovernedRecords();
    const now = new Date("2026-07-20T00:00:00.000Z");

    for (const record of records) {
      expect(isReviewOverdue(record.governance, now)).toBe(false);
    }
  });

  it("keeps withdrawn lifecycle records out of public visibility", () => {
    const records = collectGovernedRecords();

    for (const record of records) {
      if (record.governance.lifecycle !== "withdrawn") {
        continue;
      }

      expect(isPubliclyVisibleContent(record.governance)).toBe(false);
    }
  });
});
