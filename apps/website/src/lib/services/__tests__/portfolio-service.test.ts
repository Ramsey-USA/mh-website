/**
 * @jest-environment node
 */

import { PortfolioService, portfolioData } from "../portfolio-service";
// Side-effect import so lib/types/index.ts is loaded and covered by V8
import "@/lib/types";

describe("PortfolioService", () => {
  it("returns only published projects from getAllProjects", () => {
    const projects = PortfolioService.getAllProjects();

    expect(projects.length).toBe(
      portfolioData.filter((p) => p.isPublished).length,
    );
    expect(projects.every((p) => p.isPublished)).toBe(true);
  });

  it("returns only featured published projects", () => {
    const featured = PortfolioService.getFeaturedProjects();

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.isPublished && p.isFeatured)).toBe(true);
  });

  it("finds a project by published slug and returns undefined for unknown slug", () => {
    const known = portfolioData[0]?.seoMetadata.slug;
    expect(PortfolioService.getProjectBySlug(known || "")).toBeDefined();
    expect(
      PortfolioService.getProjectBySlug("missing-project"),
    ).toBeUndefined();
  });

  it("filters projects by category and supports the all shortcut", () => {
    const allProjects = PortfolioService.getAllProjects();
    expect(PortfolioService.getProjectsByCategory("all")).toHaveLength(
      allProjects.length,
    );

    const commercial = PortfolioService.getProjectsByCategory("commercial");
    expect(commercial.length).toBeGreaterThan(0);
    expect(commercial.every((p) => p.category === "commercial")).toBe(true);
  });

  it("filters projects by category array, tags, location, and date range", () => {
    const filtered = PortfolioService.filterProjects({
      category: ["commercial"],
      tags: ["healthcare"],
      location: "spokane",
      dateRange: {
        start: new Date("2023-01-01"),
        end: new Date("2023-12-31"),
      },
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toContain("Spokane Healthcare Clinic");
  });

  it("searches published projects by precomputed text fields", () => {
    const pascoResults = PortfolioService.searchProjects("all", "pasco");
    const commercialResults = PortfolioService.searchProjects(
      "commercial",
      "clinic",
    );

    expect(pascoResults).toHaveLength(1);
    expect(pascoResults[0]?.title).toContain("Pasco Industrial Warehouse");
    expect(commercialResults).toHaveLength(1);
    expect(commercialResults[0]?.title).toContain("Spokane Healthcare Clinic");
  });

  it("returns related published projects in the same category and excludes the current project", () => {
    const related = PortfolioService.getRelatedProjects("proj-003", 5);

    expect(related.length).toBeGreaterThan(0);
    expect(related.every((p) => p.id !== "proj-003")).toBe(true);
    expect(related.every((p) => p.category === "residential")).toBe(true);
  });

  it("returns an empty array when asking for related projects for an unknown id", () => {
    expect(PortfolioService.getRelatedProjects("missing-id")).toEqual([]);
  });

  it("returns accurate portfolio statistics", () => {
    const stats = PortfolioService.getPortfolioStats();
    const published = portfolioData.filter((p) => p.isPublished);

    expect(stats.totalProjects).toBe(published.length);
    expect(stats.featuredProjects).toBe(
      published.filter((p) => p.isFeatured).length,
    );
    expect(stats.completedProjects).toBe(
      published.filter((p) => p.status === "completed").length,
    );
    expect(stats.categories.sort()).toEqual(
      Array.from(new Set(published.map((p) => p.category))).sort(),
    );
  });
});
