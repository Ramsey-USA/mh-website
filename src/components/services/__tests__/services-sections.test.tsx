/**
 * @jest-environment jsdom
 *
 * Smoke tests for zero/low-coverage services components.
 */

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
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => <section id={id}>{children}</section>,
}));

jest.mock("@/components/ui", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Button: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
  IconContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/lib/styles/layout-variants", () => ({
  gridPresets: {
    cards3: () => "grid-cols-3",
    cards4: () => "grid-cols-4",
    twoColumn: () => "grid-cols-2",
  },
}));

// SpecialtyServiceCard is used by SpecialtyServicesSection; mock it here
jest.mock("../SpecialtyServiceCard", () => ({
  SpecialtyServiceCard: ({ title }: { title: string }) => (
    <div data-testid="specialty-card">{title}</div>
  ),
}));

// servicesData is imported by WhyChooseUs
jest.mock("../servicesData", () => ({
  whyChooseUs: [
    {
      icon: "military_tech",
      title: "Safety First",
      description: "Award-winning safety record.",
      stats: null,
    },
    {
      icon: "handshake",
      title: "Partnership Focus",
      description: "We partner with clients.",
      stats: null,
    },
  ],
}));

import { render, screen } from "@testing-library/react";

// ── ConstructionProcessSection ────────────────────────────────────────────────

describe("ConstructionProcessSection", () => {
  it("renders without throwing", () => {
    const {
      ConstructionProcessSection,
    } = require("../ConstructionProcessSection");
    expect(() => render(<ConstructionProcessSection />)).not.toThrow();
  });

  it("renders the process section", () => {
    const {
      ConstructionProcessSection,
    } = require("../ConstructionProcessSection");
    const { container } = render(<ConstructionProcessSection />);
    expect(container.querySelector("#process")).toBeInTheDocument();
  });
});

// ── GovernmentProjectsSection ─────────────────────────────────────────────────

describe("GovernmentProjectsSection", () => {
  it("renders without throwing", () => {
    const {
      GovernmentProjectsSection,
    } = require("../GovernmentProjectsSection");
    expect(() => render(<GovernmentProjectsSection />)).not.toThrow();
  });

  it("renders the government section", () => {
    const {
      GovernmentProjectsSection,
    } = require("../GovernmentProjectsSection");
    const { container } = render(<GovernmentProjectsSection />);
    expect(container.querySelector("#government")).toBeInTheDocument();
  });
});

// ── WhyChooseUs ───────────────────────────────────────────────────────────────

describe("WhyChooseUs", () => {
  it("renders without throwing", () => {
    const { WhyChooseUs } = require("../WhyChooseUs");
    expect(() => render(<WhyChooseUs />)).not.toThrow();
  });

  it("renders reason titles from servicesData", () => {
    const { WhyChooseUs } = require("../WhyChooseUs");
    render(<WhyChooseUs />);
    expect(screen.getByText("Safety First")).toBeInTheDocument();
    expect(screen.getByText("Partnership Focus")).toBeInTheDocument();
  });
});

// ── ConstructionExpertiseSection ──────────────────────────────────────────────

describe("ConstructionExpertiseSection", () => {
  it("renders without throwing", () => {
    const {
      ConstructionExpertiseSection,
    } = require("../ConstructionExpertiseSection");
    expect(() => render(<ConstructionExpertiseSection />)).not.toThrow();
  });

  it("renders the expertise section", () => {
    const {
      ConstructionExpertiseSection,
    } = require("../ConstructionExpertiseSection");
    const { container } = render(<ConstructionExpertiseSection />);
    expect(container.querySelector("#expertise")).toBeInTheDocument();
  });
});

// ── ServiceAreasSection ───────────────────────────────────────────────────────

describe("ServiceAreasSection", () => {
  const baseAreas = [
    {
      title: "Tri-Cities",
      iconName: "location_city",
      areas: ["Kennewick", "Pasco", "Richland"],
    },
  ];

  it("renders without throwing", () => {
    const { ServiceAreasSection } = require("../ServiceAreasSection");
    expect(() =>
      render(<ServiceAreasSection serviceAreas={baseAreas} />),
    ).not.toThrow();
  });

  it("renders area names", () => {
    const { ServiceAreasSection } = require("../ServiceAreasSection");
    render(<ServiceAreasSection serviceAreas={baseAreas} />);
    expect(screen.getByText("Kennewick")).toBeInTheDocument();
    expect(screen.getByText("Pasco")).toBeInTheDocument();
  });

  it("renders linked areas when links are provided", () => {
    const { ServiceAreasSection } = require("../ServiceAreasSection");
    const areasWithLinks = [
      {
        title: "Tri-Cities",
        iconName: "location_city",
        areas: ["Kennewick", "Pasco"],
        links: ["/locations/kennewick", null],
      },
    ];
    render(<ServiceAreasSection serviceAreas={areasWithLinks} />);
    const link = screen.getByRole("link", { name: /kennewick/i });
    expect(link).toHaveAttribute("href", "/locations/kennewick");
  });

  it("renders multiple service area cards", () => {
    const { ServiceAreasSection } = require("../ServiceAreasSection");
    const multipleAreas = [
      {
        title: "Tri-Cities",
        iconName: "location_city",
        areas: ["Kennewick"],
      },
      {
        title: "Eastern WA",
        iconName: "landscape",
        areas: ["Spokane"],
      },
    ];
    render(<ServiceAreasSection serviceAreas={multipleAreas} />);
    expect(screen.getByText("Tri-Cities")).toBeInTheDocument();
    expect(screen.getByText("Eastern WA")).toBeInTheDocument();
  });
});

// ── SpecialtyServicesSection ──────────────────────────────────────────────────

describe("SpecialtyServicesSection", () => {
  const mockServices = [
    {
      id: "medical",
      title: "Medical Facilities",
      subtitle: "Healthcare construction",
      icon: "local_hospital",
      features: ["Clean rooms", "Code compliance"],
    },
    {
      id: "industrial",
      title: "Industrial",
      subtitle: "Heavy construction",
      icon: "factory",
      features: ["Large scale", "Safety"],
    },
  ];

  it("renders without throwing", () => {
    const { SpecialtyServicesSection } = require("../SpecialtyServicesSection");
    expect(() =>
      render(<SpecialtyServicesSection services={mockServices} />),
    ).not.toThrow();
  });

  it("renders one SpecialtyServiceCard per service", () => {
    const { SpecialtyServicesSection } = require("../SpecialtyServicesSection");
    render(<SpecialtyServicesSection services={mockServices} />);
    expect(screen.getAllByTestId("specialty-card")).toHaveLength(2);
  });
});
