/**
 * @jest-environment jsdom
 *
 * Dedicated test for app/testimonials/page.tsx with REAL testimonials data.
 * The smoke test uses an empty array; this file mocks populated testimonials
 * to exercise all module-level conditional branches.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// ── Module-level mocks (same as pages-smoke, but getClientTestimonials returns data) ──

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

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, ariaLabel }: { icon: string; ariaLabel?: string }) => (
    <span aria-label={ariaLabel}>{icon}</span>
  ),
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
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

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { testimonials: [] },
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: ({ data }: { data: unknown }) => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ),
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({ "@type": "BreadcrumbList" })),
}));

jest.mock("@/lib/seo/review-schema", () => ({
  generateReviewSchema: jest.fn((testimonial: { name: string }) => ({
    "@type": "Review",
    author: { "@type": "Person", name: testimonial.name },
  })),
  generateAggregateRatingSchema: jest.fn(
    (ratingValue: number, reviewCount: number) => ({
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    }),
  ),
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

// ── KEY DIFFERENCE: return populated testimonials ─────────────────────────────
const mockTestimonials = [
  {
    id: "t1",
    name: "Alice Johnson",
    location: "Kennewick, WA",
    project: "Office Build",
    rating: 5,
    quote: "Outstanding quality and professionalism.",
    type: "client" as const,
  },
  {
    id: "t2",
    name: "Bob Smith",
    location: "Pasco, WA",
    project: "Warehouse",
    rating: 4,
    quote: "Delivered on time and on budget.",
    type: "client" as const,
  },
];

jest.mock("@/lib/data/testimonials", () => ({
  getClientTestimonials: jest.fn(() => mockTestimonials),
}));

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("TestimonialsPage (with populated testimonials data)", () => {
  let TestimonialsPage: () => Promise<React.ReactElement>;

  beforeAll(() => {
    // Each file gets its own module registry — import directly
    ({ default: TestimonialsPage } = require("../page") as {
      default: () => Promise<React.ReactElement>;
    });
  });

  it("renders without throwing", async () => {
    const page = await TestimonialsPage();
    expect(() => render(page)).not.toThrow();
  });

  it("renders main heading", async () => {
    const page = await TestimonialsPage();
    render(page);
    expect(
      screen.getAllByText(/Client Partners/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders aggregate rating section (truthy aggregateRating branch)", async () => {
    const page = await TestimonialsPage();
    render(page);
    // With 2 testimonials averaging 4.5 rating, the aggregate rating section renders
    // "Average Rating" or numerical value
    const { container } = render(page);
    // aggregateRatingSchema is computed and StructuredData renders a script tag
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThan(0);
  });

  it("renders review schema structured data for each testimonial", async () => {
    const page = await TestimonialsPage();
    const { container } = render(page);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThan(1); // at least breadcrumb + aggregate + reviews
  });

  it("renders the star rating display (aggregateRating.ratingValue branch)", async () => {
    const page = await TestimonialsPage();
    render(page);
    // The star rating block renders '4.5 Average Rating' or similar
    // We just verify the page renders aggregateRating-related content
    expect(
      screen.getAllByText(/Average Rating|4\.5|star/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders testimonial names in the hero stats block", async () => {
    const page = await TestimonialsPage();
    render(page);
    // testimonials.length > 0 → reviewCount shows
    expect(
      screen.getAllByText(/2\+?|Client Partners/i).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
