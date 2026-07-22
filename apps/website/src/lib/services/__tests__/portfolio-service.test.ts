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

  it("builds a deterministic gallery feed from public project images", () => {
    const slides = PortfolioService.getProjectGallerySlides();
    const expectedImageCount = publishedProjects
      .filter((project) => project.location.isPublic)
      .reduce((count, project) => count + project.images.length, 0);
    const latestProject = publishedProjects
      .filter((project) => project.location.isPublic)
      .slice()
      .sort((left, right) => {
        const leftCompleted = left.details.completionDate.getTime();
        const rightCompleted = right.details.completionDate.getTime();

        if (leftCompleted !== rightCompleted) {
          return rightCompleted - leftCompleted;
        }

        return left.title.localeCompare(right.title);
      })[0];

    expect(slides).toHaveLength(expectedImageCount);
    expect(slides.every((slide) => slide.projectLocation.isPublic)).toBe(true);
    expect(slides[0]?.projectId).toBe(latestProject?.id);

    const groupedOrders = slides.reduce<Map<string, number[]>>(
      (groups, slide) => {
        const existingOrders = groups.get(slide.projectId) ?? [];
        existingOrders.push(slide.image.order);
        groups.set(slide.projectId, existingOrders);
        return groups;
      },
      new Map(),
    );

    expect(
      Array.from(groupedOrders.values()).every((orders) => {
        const sortedOrders = [...orders].sort((left, right) => left - right);
        return JSON.stringify(orders) === JSON.stringify(sortedOrders);
      }),
    ).toBe(true);
  });

  it("finds a project by published slug and returns undefined for unknown slug", () => {
    const known = publishedProjects[0]?.seoMetadata.slug;
    expect(PortfolioService.getProjectBySlug(known || "")).toBeDefined();
    expect(
      PortfolioService.getProjectBySlug("missing-project"),
    ).toBeUndefined();
  });

  it("finds a project by published id", () => {
    const known = publishedProjects[0]?.id;

    expect(PortfolioService.getProjectById(known || "")).toBeDefined();
    expect(PortfolioService.getProjectById("missing-id")).toBeUndefined();
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

  it("returns only categories present in the public project selector", () => {
    expect(PortfolioService.getProjectCategoryIds().sort()).toEqual(
      Array.from(
        new Set(publishedProjects.map((project) => project.category)),
      ).sort(),
    );
  });
});
