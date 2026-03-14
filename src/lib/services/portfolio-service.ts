// Portfolio service for managing project data
import { type ProjectPortfolio, type ProjectFilter } from "../types";

// Sample portfolio data - Coming Soon
// In production, this would come from Cloudflare D1 or KV
export const portfolioData: ProjectPortfolio[] = [];

export class PortfolioService {
  // Get all published projects
  static getAllProjects(): ProjectPortfolio[] {
    return portfolioData.filter((project) => project.isPublished);
  }

  // Get featured projects for homepage
  static getFeaturedProjects(): ProjectPortfolio[] {
    return portfolioData.filter(
      (project) => project.isPublished && project.isFeatured,
    );
  }

  // Get project by slug
  static getProjectBySlug(slug: string): ProjectPortfolio | undefined {
    return portfolioData.find(
      (project) => project.isPublished && project.seoMetadata.slug === slug,
    );
  }

  // Filter projects by category
  static getProjectsByCategory(category: string): ProjectPortfolio[] {
    if (category === "all") {
      return this.getAllProjects();
    }
    return portfolioData.filter(
      (project) => project.isPublished && project.category === category,
    );
  }

  // Search and filter projects
  static filterProjects(filter: ProjectFilter): ProjectPortfolio[] {
    let filteredProjects = this.getAllProjects();

    if (filter.category && filter.category.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        filter.category!.includes(project.category),
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        filter.tags!.some((tag) => project.tags.includes(tag)),
      );
    }

    if (filter.location) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.location.city
            .toLowerCase()
            .includes(filter.location!.toLowerCase()) ||
          project.location.state
            .toLowerCase()
            .includes(filter.location!.toLowerCase()),
      );
    }

    if (filter.dateRange) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.details.completionDate >= filter.dateRange!.start &&
          project.details.completionDate <= filter.dateRange!.end,
      );
    }

    return filteredProjects;
  }

  // Get related projects (same category, different project)
  static getRelatedProjects(projectId: string, limit = 3): ProjectPortfolio[] {
    const currentProject = portfolioData.find((p) => p.id === projectId);
    if (!currentProject) return [];

    return portfolioData
      .filter(
        (project) =>
          project.isPublished &&
          project.id !== projectId &&
          project.category === currentProject.category,
      )
      .slice(0, limit);
  }

  // Get project statistics
  static getPortfolioStats() {
    const projects = this.getAllProjects();
    const categories = Array.from(new Set(projects.map((p) => p.category)));

    return {
      totalProjects: projects.length,
      categories: categories,
      featuredProjects: projects.filter((p) => p.isFeatured).length,
      completedProjects: projects.filter((p) => p.status === "completed")
        .length,
    };
  }
}
