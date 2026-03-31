/**
 * @jest-environment jsdom
 *
 * Smoke tests for all zero-coverage app/projects/components files.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// ─── Shared mocks ────────────────────────────────────────────────────────────

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

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  HoverScale: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/ui", () => ({
  Card: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <div data-testid="card" onClick={onClick} className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3>{children}</h3>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/media/OptimizedImage", () => ({
  OptimizedImage: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("@/components/ui/AnimatedCounter", () => ({
  AnimatedCounter: ({ end }: { end: number }) => <span>{end}</span>,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => <nav data-testid="page-navigation" />,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { projects: [] },
}));

jest.mock("@/lib/styles/card-variants", () => ({
  getCardClassName: () => "card-class",
}));

jest.mock("@/lib/analytics/marketing-tracking", () => ({
  trackProjectInterest: jest.fn(),
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    phone: "509-308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N Capitol Ave",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
  },
}));

// ─── Shared test fixture ─────────────────────────────────────────────────────

const mockProject = {
  id: "proj-1",
  title: "Test Project",
  description: "A great project",
  category: "commercial" as const,
  subcategory: "Office Building",
  status: "completed" as const,
  location: { city: "Pasco", state: "WA", isPublic: true },
  images: [
    {
      url: "/img.jpg",
      alt: "Project photo",
      isPrimary: true,
      width: 800,
      height: 600,
    },
  ],
  details: {
    squareFootage: 5000,
    duration: "6 months",
    completionDate: new Date("2024-06-01"),
  },
  tags: ["commercial", "veteran-owned"],
  seoMetadata: { slug: "test-project", keywords: [] },
  isFeatured: false,
  clientTestimonial: {
    quote: "Great work!",
    clientName: "John Doe",
    clientTitle: "CEO",
    rating: 5,
  },
};

const mockFeaturedProject = {
  ...mockProject,
  id: "proj-2",
  isFeatured: true,
  images: [],
};

// ─── CapabilitiesSection ─────────────────────────────────────────────────────

describe("CapabilitiesSection", () => {
  it("renders the section with capabilities data", () => {
    const { CapabilitiesSection } = require("../CapabilitiesSection");
    const { container } = render(<CapabilitiesSection />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── PartnershipProcessSection ───────────────────────────────────────────────

describe("PartnershipProcessSection", () => {
  it("renders the partnership process section", () => {
    const {
      PartnershipProcessSection,
    } = require("../PartnershipProcessSection");
    const { container } = render(<PartnershipProcessSection />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── ProjectCard ─────────────────────────────────────────────────────────────

describe("ProjectCard", () => {
  it("renders project title and description", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeTruthy();
    expect(screen.getByText("A great project")).toBeTruthy();
  });

  it("shows Completed badge for completed projects", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Completed")).toBeTruthy();
  });

  it("shows In Progress badge for in-progress projects", () => {
    const { ProjectCard } = require("../ProjectCard");
    const inProgressProject = {
      ...mockProject,
      status: "in-progress" as const,
    };
    render(<ProjectCard project={inProgressProject} />);
    expect(screen.getByText("In Progress")).toBeTruthy();
  });

  it("shows Featured badge for featured projects", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockFeaturedProject} />);
    expect(screen.getByText("Featured")).toBeTruthy();
  });

  it("renders placeholder when no images", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockFeaturedProject} />);
    // no img rendered for no-image project
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("calls trackProjectInterest on card click", () => {
    const { ProjectCard } = require("../ProjectCard");
    const {
      trackProjectInterest,
    } = require("@/lib/analytics/marketing-tracking");
    render(<ProjectCard project={mockProject} />);
    fireEvent.click(screen.getByTestId("card"));
    expect(trackProjectInterest).toHaveBeenCalledWith(
      "Test Project",
      "commercial",
      "click",
      expect.objectContaining({ location: "Pasco" }),
    );
  });

  it("renders details (squareFootage, duration, completionDate)", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/5,000 sq ft/)).toBeTruthy();
    expect(screen.getByText("6 months")).toBeTruthy();
  });

  it("renders tags", () => {
    const { ProjectCard } = require("../ProjectCard");
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("commercial")).toBeTruthy();
  });
});

// ─── ProjectsCTASection ──────────────────────────────────────────────────────

describe("ProjectsCTASection", () => {
  it("renders the CTA section", () => {
    const { ProjectsCTASection } = require("../ProjectsCTASection");
    const { container } = render(<ProjectsCTASection />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── ProjectsFilterSection ───────────────────────────────────────────────────

describe("ProjectsFilterSection", () => {
  const defaultProps = {
    selectedCategory: "all",
    onCategoryChange: jest.fn(),
    searchQuery: "",
    onSearchChange: jest.fn(),
    onClearSearch: jest.fn(),
  };

  it("renders filter section", () => {
    const { ProjectsFilterSection } = require("../ProjectsFilterSection");
    const { container } = render(<ProjectsFilterSection {...defaultProps} />);
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders search input", () => {
    const { ProjectsFilterSection } = require("../ProjectsFilterSection");
    render(<ProjectsFilterSection {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("calls onSearchChange when input changes", () => {
    const { ProjectsFilterSection } = require("../ProjectsFilterSection");
    const onSearchChange = jest.fn();
    render(
      <ProjectsFilterSection
        {...defaultProps}
        onSearchChange={onSearchChange}
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "school" },
    });
    expect(onSearchChange).toHaveBeenCalledWith("school");
  });

  it("shows clear button when search query is non-empty", () => {
    const { ProjectsFilterSection } = require("../ProjectsFilterSection");
    const onClearSearch = jest.fn();
    render(
      <ProjectsFilterSection
        {...defaultProps}
        searchQuery="school"
        onClearSearch={onClearSearch}
      />,
    );
    const clearBtn = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearBtn);
    expect(onClearSearch).toHaveBeenCalled();
  });

  it("calls onCategoryChange when a category button is clicked", () => {
    const { ProjectsFilterSection } = require("../ProjectsFilterSection");
    const onCategoryChange = jest.fn();
    render(
      <ProjectsFilterSection
        {...defaultProps}
        onCategoryChange={onCategoryChange}
      />,
    );
    // The first button that's not "All" — click any category button
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]!);
    expect(onCategoryChange).toHaveBeenCalled();
  });
});

// ─── ProjectsGridSection ─────────────────────────────────────────────────────

describe("ProjectsGridSection", () => {
  it("renders 0 collaborations when no projects", () => {
    const { ProjectsGridSection } = require("../ProjectsGridSection");
    render(<ProjectsGridSection projects={[]} selectedCategory="all" />);
    expect(screen.getByText(/0 collaboration/)).toBeTruthy();
  });

  it("renders project cards for each project", () => {
    const { ProjectsGridSection } = require("../ProjectsGridSection");
    render(
      <ProjectsGridSection projects={[mockProject]} selectedCategory="all" />,
    );
    // ProjectCard is not mocked here so its content renders
    expect(screen.getByText("Test Project")).toBeTruthy();
  });
});

// ─── ProjectsHero ────────────────────────────────────────────────────────────

describe("ProjectsHero", () => {
  it("renders hero section", () => {
    const { ProjectsHero } = require("../ProjectsHero");
    const { container } = render(<ProjectsHero />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── ProjectsStatsSection ────────────────────────────────────────────────────

describe("ProjectsStatsSection", () => {
  it("renders stats section", () => {
    const { ProjectsStatsSection } = require("../ProjectsStatsSection");
    const { container } = render(<ProjectsStatsSection />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── TestimonialsSection (projects) ──────────────────────────────────────────

describe("TestimonialsSection (projects)", () => {
  it("returns null when no project has a clientTestimonial", () => {
    const { TestimonialsSection } = require("../TestimonialsSection");
    const projectNoTestimonial = {
      ...mockProject,
      clientTestimonial: undefined,
    };
    const { container } = render(
      <TestimonialsSection projects={[projectNoTestimonial]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders testimonials when at least one project has a testimonial", () => {
    const { TestimonialsSection } = require("../TestimonialsSection");
    render(<TestimonialsSection projects={[mockProject]} />);
    // quote is wrapped in curly-quote characters: "…"
    expect(screen.getByText(/Great work!/)).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
  });
});

// ─── VeteranBenefitsBanner ───────────────────────────────────────────────────

describe("VeteranBenefitsBanner", () => {
  it("renders veteran benefits banner", () => {
    const { VeteranBenefitsBanner } = require("../VeteranBenefitsBanner");
    const { container } = render(<VeteranBenefitsBanner />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});

// ─── WhyChooseSection ────────────────────────────────────────────────────────

describe("WhyChooseSection", () => {
  it("renders why-choose section", () => {
    const { WhyChooseSection } = require("../WhyChooseSection");
    const { container } = render(<WhyChooseSection />);
    expect(container.querySelector("section")).toBeTruthy();
  });
});
