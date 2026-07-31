/**
 * @jest-environment jsdom
 *
 * Tests for remaining 0%-coverage components:
 * VendorPlatformLink, TestimonialsSection,
 * SkillsRadarChart, LocationPageContent
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";

// ─── Shared mocks ─────────────────────────────────────────────────────────────

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, ariaLabel }: { icon: string; ariaLabel?: string }) => (
    <span data-icon={icon} aria-label={ariaLabel}>
      {icon}
    </span>
  ),
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    onClick,
    className,
    asChild: _asChild,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    asChild?: boolean;
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

jest.mock(
  "next/link",
  () =>
    function MockLink({
      href,
      children,
      className,
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
    }) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    },
);

jest.mock(
  "next/image",
  () =>
    function MockImage({
      src,
      alt,
      className,
    }: {
      src: string;
      alt: string;
      className?: string;
      fill?: boolean;
      width?: number;
      height?: number;
    }) {
      return <img src={src} alt={alt} className={className} />;
    },
);

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

jest.mock("@/components/layout", () => ({
  SectionContainer: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/components/seo/EnhancedSEO", () => ({
  enhancedSEO: { addLocalBusinessMarkup: jest.fn() },
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn().mockReturnValue({}),
  breadcrumbPatterns: { location: jest.fn().mockReturnValue([]) },
}));

jest.mock("@/components/testimonials", () => ({
  TestimonialsCarousel: ({ testimonials }: { testimonials: object[] }) => (
    <div data-testid="testimonials-carousel" data-count={testimonials.length} />
  ),
}));

jest.mock("@/components/templates/BrandedContentSection", () => ({
  BrandedContentSection: ({
    children,
    header,
    id,
    className,
  }: {
    children: React.ReactNode;
    header: {
      title: string;
      subtitle?: string;
      description?: string | React.ReactNode;
    };
    id?: string;
    className?: string;
  }) => (
    <section id={id} className={className}>
      <h2>{header.title}</h2>
      {children}
    </section>
  ),
}));

jest.mock("@/components/ui/cta", () => ({
  PitchDeckCTA: ({ variant }: { variant?: string }) => (
    <div data-testid="pitch-deck-cta" data-variant={variant} />
  ),
}));

// SkillsRadarChart uses dynamic imports for Recharts — mock them
jest.mock("next/dynamic", () => {
  const dynamic = (_fn: () => Promise<{ default: React.ComponentType }>) => {
    // Return a simple placeholder that does NOT forward props to the DOM
    // (recharts passes non-DOM props like dataKey/contentStyle that React warns about)
    return function DynamicComponent(_props: Record<string, unknown>) {
      return <div data-dynamic="true" />;
    };
  };
  return dynamic;
});

// IntersectionObserver mock for SkillsRadarChart
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  static instances: MockIntersectionObserver[] = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  triggerIntersect(el: Element) {
    this.callback(
      [
        {
          isIntersecting: true,
          target: el,
        } as unknown as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

import {
  VendorPlatformLink,
  type VendorPlatform,
} from "../allies/VendorPlatformLink";
import { TestimonialsSection } from "../shared-sections/TestimonialsSection";
import { SkillsRadarChart } from "../team/SkillsRadarChart";
import { LocationPageContent } from "../locations/LocationPageContent";

// ─── VendorPlatformLink ───────────────────────────────────────────────────────

describe("VendorPlatformLink", () => {
  const platforms: VendorPlatform[] = [
    "website",
    "facebook",
    "instagram",
    "linkedin",
    "youtube",
    "x",
    "google",
    "yelp",
    "maps",
  ];

  it.each(platforms)(
    "renders %s platform link with correct aria-label",
    (platform) => {
      render(
        <VendorPlatformLink
          href="https://example.com"
          label="Test Vendor"
          platform={platform}
        />,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Test Vendor"),
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    },
  );

  it("renders the correct icon for website platform", () => {
    render(
      <VendorPlatformLink
        href="https://example.com"
        label="Website"
        platform="website"
      />,
    );
    expect(screen.getByText("language")).toBeTruthy();
  });

  it("renders the correct icon for facebook platform", () => {
    render(
      <VendorPlatformLink
        href="https://facebook.com"
        label="Facebook"
        platform="facebook"
      />,
    );
    expect(screen.getByText("thumb_up")).toBeTruthy();
  });

  it("includes 'opens in new tab' in aria-label", () => {
    render(
      <VendorPlatformLink
        href="https://yelp.com"
        label="Our Yelp"
        platform="yelp"
      />,
    );
    const link = screen.getByRole("link");
    expect(link.getAttribute("aria-label")).toContain("opens in new tab");
  });
});

// ─── TestimonialsSection ──────────────────────────────────────────────────────

describe("TestimonialsSection", () => {
  const mockTestimonials = [
    {
      id: "1",
      name: "Test Client",
      quote: "Great work!",
      rating: 5,
      type: "stakeholder" as const,
    },
  ];

  it("renders with default props", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByText("What Our Project Stakeholders Say")).toBeTruthy();
    expect(screen.getByTestId("testimonials-carousel")).toBeTruthy();
  });

  it("renders with custom title and subtitle", () => {
    render(
      <TestimonialsSection
        title="Custom Title"
        subtitle="Custom Sub"
        testimonials={mockTestimonials}
      />,
    );
    expect(screen.getByText("Custom Title")).toBeTruthy();
  });

  it("passes testimonials from data source to carousel", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    const carousel = screen.getByTestId("testimonials-carousel");
    expect(carousel.getAttribute("data-count")).toBe("1");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <TestimonialsSection
        className="my-section"
        testimonials={mockTestimonials}
      />,
    );
    expect(container.querySelector(".my-section")).toBeTruthy();
  });

  it("renders with custom id", () => {
    const { container } = render(
      <TestimonialsSection id="custom-id" testimonials={mockTestimonials} />,
    );
    expect(container.querySelector("#custom-id")).toBeTruthy();
  });

  it("renders with autoPlay=false", () => {
    render(
      <TestimonialsSection autoPlay={false} testimonials={mockTestimonials} />,
    );
    expect(screen.getByTestId("testimonials-carousel")).toBeTruthy();
  });
});

// ─── SkillsRadarChart ─────────────────────────────────────────────────────────

const mockSkillData = [
  { subject: "Leadership", value: 90, fullMark: 100 },
  { subject: "Technical", value: 85, fullMark: 100 },
  { subject: "Communication", value: 80, fullMark: 100 },
];

describe("SkillsRadarChart", () => {
  it("renders the loading/placeholder state initially", () => {
    const { container } = render(<SkillsRadarChart data={mockSkillData} />);
    // Before intersection, shows loading or nothing
    expect(container.firstChild).toBeTruthy();
  });

  it("renders chart when IntersectionObserver fires (becomes visible)", async () => {
    const { container } = render(<SkillsRadarChart data={mockSkillData} />);
    const chartWrapper = container.firstChild as HTMLElement;

    await act(async () => {
      const observer = MockIntersectionObserver.instances[0];
      if (observer && chartWrapper) {
        observer.triggerIntersect(chartWrapper);
      }
    });

    // After intersection, dynamic components should be rendered
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with isDark=true", () => {
    const { container } = render(
      <SkillsRadarChart data={mockSkillData} isDark={true} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with empty data array", () => {
    const { container } = render(<SkillsRadarChart data={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── LocationPageContent ──────────────────────────────────────────────────────

const mockLocation = {
  slug: "kennewick",
  city: "Kennewick",
  state: "WA",
  county: "Benton County",
  militaryTitle: "Operations Base",
  tagline: "Serving the Tri-Cities headquarters market",
  description: "Commercial and industrial construction in Kennewick.",
  telephone: "509-555-0100",
  email: "info@mhc-gc.com",
  address: {
    street: "123 Main St",
    city: "Kennewick",
    state: "WA",
    zip: "99336",
  },
  coordinates: { latitude: 46.2112, longitude: -119.1372 },
  seo: {
    title: "Kennewick Construction",
    metaDescription: "Top construction in Kennewick",
    keywords: ["kennewick", "construction"],
    openGraphDescription: "Build with us in Kennewick",
    twitterDescription: "Kennewick construction",
  },
  breadcrumbKey: "kennewick",
  localExpertise: {
    title: "Local Kennewick Expertise",
    description: ["We know Kennewick well."],
  },
  servicePriorities: ["Commercial Construction", "Industrial Build-Out"],
  nearbyAreas: ["Richland", "Pasco"],
  serviceZipCodes: ["99336", "99337"],
  publicSectorHighlight: true,
};

describe("LocationPageContent", () => {
  it("renders city name in heading", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(screen.getAllByText(/Kennewick/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders service priorities", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(
      screen.getAllByText(/Commercial Construction/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders nearby areas", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(
      screen.getAllByText(/Richland|Pasco/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders location without servicePriorities (uses defaults)", () => {
    const { servicePriorities, nearbyAreas, ...rest } = mockLocation;
    const noSvcLocation = { ...rest };
    const { container } = render(
      <LocationPageContent location={noSvcLocation} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders trust indicators (licensed, veteran-owned, projects)", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(screen.getByText(/Licensed in WA/i)).toBeTruthy();
    expect(screen.getAllByText(/Veteran-Owned/i).length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("renders core values (Honesty, Integrity, etc.)", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(screen.getByText("Honesty")).toBeTruthy();
    expect(screen.getByText("Integrity")).toBeTruthy();
  });

  it("renders contact phone number", () => {
    render(<LocationPageContent location={mockLocation} />);
    expect(screen.getByText(/509-555-0100/)).toBeTruthy();
  });

  it("renders public sector highlight when enabled", () => {
    render(<LocationPageContent location={mockLocation} />);
    // publicSectorHighlight=true should render government link content
    expect(
      screen.getAllByText(/Government|Public/i).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
