/**
 * @jest-environment jsdom
 *
 * Smoke test for the Projects client-component page.
 */

jest.mock("next/dynamic", () => () => () => null);

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/lib/services/portfolio-service", () => ({
  PortfolioService: {
    getAllProjects: jest.fn(() => []),
    getProjectsByCategory: jest.fn(() => []),
  },
}));

jest.mock("../components/useProjectsSearch", () => ({
  useProjectsSearch: jest.fn(() => ({
    selectedCategory: "all",
    setSelectedCategory: jest.fn(),
    searchQuery: "",
    setSearchQuery: jest.fn(),
    projects: [],
    clearSearch: jest.fn(),
  })),
}));

jest.mock("../components/ProjectsHero", () => ({
  ProjectsHero: () => <div data-testid="projects-hero" />,
}));

jest.mock("../components/ProjectsFilterSection", () => ({
  ProjectsFilterSection: (props: Record<string, unknown>) => (
    <div
      data-testid="projects-filter"
      data-category={props["selectedCategory"]}
      data-search={props["searchQuery"]}
    />
  ),
}));

jest.mock("../components/ProjectsGridSection", () => ({
  ProjectsGridSection: (props: Record<string, unknown>) => (
    <div
      data-testid="projects-grid"
      data-category={props["selectedCategory"]}
      data-count={
        Array.isArray(props["projects"])
          ? (props["projects"] as unknown[]).length
          : 0
      }
    />
  ),
}));

jest.mock("@/components/ui/SimpleSkeleton", () => ({
  SimpleSkeleton: () => null,
}));

jest.mock("@/components/ui/cta", () => ({
  StrategicCTABanner: () => null,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({ "@type": "BreadcrumbList" })),
  breadcrumbPatterns: { projects: [] },
}));

import { render, screen } from "@testing-library/react";

describe("Projects page", () => {
  it("renders without throwing", () => {
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    expect(() => render(<ProjectsPage />)).not.toThrow();
  });

  it("renders the hero section", () => {
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);
    expect(screen.getByTestId("projects-hero")).toBeInTheDocument();
  });

  it("renders the filter section", () => {
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);
    expect(screen.getByTestId("projects-filter")).toBeInTheDocument();
  });

  it("renders the grid section", () => {
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);
    expect(screen.getByTestId("projects-grid")).toBeInTheDocument();
  });

  it("calls usePageTracking with 'Projects'", () => {
    const { usePageTracking } = require("@/lib/analytics/hooks");
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);
    expect(usePageTracking).toHaveBeenCalledWith("Projects");
  });

  it("passes hook state to filter and grid sections", () => {
    const { useProjectsSearch } = require("../components/useProjectsSearch");
    (useProjectsSearch as jest.Mock).mockReturnValue({
      selectedCategory: "government",
      setSelectedCategory: jest.fn(),
      searchQuery: "Pasco",
      setSearchQuery: jest.fn(),
      projects: [{ id: 1 }, { id: 2 }],
      clearSearch: jest.fn(),
    });

    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);

    const filter = screen.getByTestId("projects-filter");
    expect(filter).toHaveAttribute("data-category", "government");
    expect(filter).toHaveAttribute("data-search", "Pasco");

    const grid = screen.getByTestId("projects-grid");
    expect(grid).toHaveAttribute("data-category", "government");
    expect(grid).toHaveAttribute("data-count", "2");
  });

  it("calls PortfolioService.getAllProjects", () => {
    const { PortfolioService } = require("@/lib/services/portfolio-service");
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    render(<ProjectsPage />);
    expect(PortfolioService.getAllProjects).toHaveBeenCalled();
  });

  it("renders breadcrumb schema JSON-LD", () => {
    const { default: ProjectsPage } = require("../page") as {
      default: React.ComponentType;
    };
    const { container } = render(<ProjectsPage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
    expect(script!.innerHTML).toContain("BreadcrumbList");
  });
});
