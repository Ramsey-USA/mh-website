/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";
import {
  getProjectCaseStudySlugs,
  projectCaseStudies,
} from "@/lib/data/project-case-studies";
import { portfolioData } from "@/lib/services/portfolio-service";

const repoRoot = path.resolve(process.cwd(), "..", "..");
const contractPath = path.join(
  repoRoot,
  "documents",
  "content",
  "project-archive",
  "archive-contract.json",
);

describe("Project archive scalability contract", () => {
  const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));

  it("defines controlled intake, storage, rights, and discovery boundaries", () => {
    expect(contract.status).toBe("foundation-active");
    expect(contract.sourceModel.target).toBe("one-record-per-project");
    expect(contract.storage.publicMedia).toContain("Cloudflare R2");
    expect(contract.publicationRules.unknownRightsPublic).toBe(false);
    expect(contract.publicationRules.unverifiedScopePublic).toBe(false);
    expect(contract.discovery.defaultPageSize).toBeLessThanOrEqual(
      contract.discovery.maximumPageSize,
    );
    expect(contract.discovery.filterDimensions).toEqual(
      expect.arrayContaining([
        "projectType",
        "location",
        "completionYear",
        "status",
      ]),
    );
  });

  it("keeps current project IDs and slugs unique during incremental migration", () => {
    const projectIds = portfolioData.map((project) => project.id);
    const portfolioSlugs = portfolioData.map(
      (project) => project.seoMetadata.slug,
    );
    const caseStudySlugs = getProjectCaseStudySlugs();

    expect(new Set(projectIds).size).toBe(projectIds.length);
    expect(new Set(portfolioSlugs).size).toBe(portfolioSlugs.length);
    expect(new Set(caseStudySlugs).size).toBe(caseStudySlugs.length);
  });

  it("requires every case study to resolve to one portfolio record", () => {
    const portfolioIds = new Set(portfolioData.map((project) => project.id));
    const missing = projectCaseStudies
      .filter((caseStudy) => !portfolioIds.has(caseStudy.projectId))
      .map((caseStudy) => caseStudy.slug);

    expect(missing).toEqual([]);
  });

  it("prevents duplicate media IDs, URLs, and sort orders within a project", () => {
    const violations = portfolioData.flatMap((project) => {
      const ids = project.images.map((image) => image.id);
      const urls = project.images.map((image) => image.url);
      const orders = project.images.map((image) => image.order);
      const invalid =
        new Set(ids).size !== ids.length ||
        new Set(urls).size !== urls.length ||
        new Set(orders).size !== orders.length;

      return invalid ? [project.seoMetadata.slug] : [];
    });

    expect(violations).toEqual([]);
  });

  it("requires governance before a case study can be published", () => {
    const violations = projectCaseStudies
      .filter((caseStudy) => caseStudy.isPublished !== false)
      .filter(
        (caseStudy) =>
          !caseStudy.governance ||
          caseStudy.governance.lifecycle !== "published" ||
          caseStudy.governance.approvalState !== "approved" ||
          caseStudy.governance.publishState !== "public",
      )
      .map((caseStudy) => caseStudy.slug);

    expect(violations).toEqual([]);
  });
});

