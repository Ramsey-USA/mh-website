/**
 * @jest-environment node
 */

import { PortfolioService, portfolioData } from "../portfolio-service";
// Side-effect import so lib/types/index.ts is loaded and covered by V8
import "@/lib/types";

describe("PortfolioService", () => {
  const publishedProjects = portfolioData.filter((p) => p.isPublished);

  it("returns only published projects from getAllProjects", () => {
    const projects = PortfolioService.getAllProjects();

    expect(projects.length).toBe(publishedProjects.length);
    expect(projects.every((p) => p.isPublished)).toBe(true);
  });

  it("returns only featured published projects", () => {
    const featured = PortfolioService.getFeaturedProjects();
    const expectedFeaturedCount = publishedProjects.filter(
      (p) => p.isFeatured,
    ).length;

    expect(featured).toHaveLength(expectedFeaturedCount);
    expect(featured.every((p) => p.isPublished && p.isFeatured)).toBe(true);
  });

  it("finds a project by published slug and returns undefined for unknown slug", () => {
    const known = publishedProjects[0]?.seoMetadata.slug;
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
      tags: ["tenant-improvement"],
      location: "pasco",
      dateRange: {
        start: new Date("2020-01-01"),
        end: new Date("2020-12-31"),
      },
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toContain("Volm Companies Remodel");
  });

  it("searches published projects by precomputed text fields", () => {
    const pascoResults = PortfolioService.searchProjects("all", "pasco");
    const commercialResults = PortfolioService.searchProjects(
      "commercial",
      "morgue",
    );

    expect(pascoResults.length).toBeGreaterThan(0);
    expect(
      pascoResults.every((project) =>
        [
          project.title,
          project.description,
          project.location.city,
          project.location.state,
          ...project.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes("pasco"),
      ),
    ).toBe(true);
    expect(commercialResults).toHaveLength(1);
    expect(commercialResults[0]?.title).toContain("Morgue");
  });

  it("returns related published projects in the same category and excludes the current project", () => {
    const related = PortfolioService.getRelatedProjects("proj-009", 5);

    expect(related.length).toBeGreaterThan(0);
    expect(related.every((p) => p.id !== "proj-009")).toBe(true);
    expect(related.every((p) => p.category === "commercial")).toBe(true);
  });

  it("returns an empty array when asking for related projects for an unknown id", () => {
    expect(PortfolioService.getRelatedProjects("missing-id")).toEqual([]);
  });

  it("returns accurate portfolio statistics", () => {
    const stats = PortfolioService.getPortfolioStats();

    expect(stats.totalProjects).toBe(publishedProjects.length);
    expect(stats.featuredProjects).toBe(
      publishedProjects.filter((p) => p.isFeatured).length,
    );
    expect(stats.completedProjects).toBe(
      publishedProjects.filter((p) => p.status === "completed").length,
    );
    expect(stats.categories.sort()).toEqual(
      Array.from(new Set(publishedProjects.map((p) => p.category))).sort(),
    );
  });
});
