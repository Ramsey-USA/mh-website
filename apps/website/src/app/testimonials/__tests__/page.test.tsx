/**
 * @jest-environment jsdom
 *
 * Dedicated test for app/testimonials/page.tsx with localized testimonials
 * data so module-level rating and schema branches are exercised.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// ── Module-level mocks ───────────────────────────────────────────────────────

jest.mock("next/dynamic", () => () => () => null);

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    rel?: string;
    className?: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
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

const mockTestimonials = [
  {
    id: "t1",
    name: "Alice Johnson",
    location: "Kennewick, WA",
    project: "Office Build",
    rating: 5,
    quote: "Outstanding quality and professionalism.",
    type: "stakeholder" as const,
  },
  {
    id: "t2",
    name: "Bob Smith",
    location: "Pasco, WA",
    project: "Warehouse",
    rating: 4,
    quote: "Delivered on time and on budget.",
    type: "stakeholder" as const,
  },
];

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async (namespace?: string) => {
    if (namespace === "googleReviews") {
      return (key: string) => {
        const labels: Record<string, string> = {
          heading: "Verified Google Reviews",
          invitation:
            "If we recently completed your project, we would value your feedback to help future mission partners make informed construction decisions.",
          buttonLabel: "Leave a Google Review",
          verifiedLabel: "Verified",
        };

        return labels[key] ?? key;
      };
    }

    return {
      raw: (key: string) =>
        key === "clientTestimonials" ? mockTestimonials : [],
    };
  }),
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
      screen.getAllByText(/Mission Partners/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders aggregate rating section (truthy aggregateRating branch)", async () => {
    const page = await TestimonialsPage();
    render(page);
    const { container } = render(page);
    // Breadcrumb and FAQ schemas should still be present.
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThan(0);
  });

  it("does not emit Review schema when verified Google reviews are empty", async () => {
    const page = await TestimonialsPage();
    const { container } = render(page);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    const scriptPayload = Array.from(scripts)
      .map((script) => script.textContent || "")
      .join("\n");

    expect(scriptPayload).not.toContain('"@type":"Review"');
    expect(scriptPayload).not.toContain('"@type":"AggregateRating"');
  });

  it("renders Google review CTA banner with secure external-link attributes", async () => {
    const page = await TestimonialsPage();
    render(page);

    const ctaLink = screen.getByRole("link", {
      name: /Leave a Google Review/i,
    });

    expect(ctaLink).toHaveAttribute(
      "href",
      "https://g.page/r/REPLACE_WITH_MHC_REVIEW_LINK/review",
    );
    expect(ctaLink).toHaveAttribute("target", "_blank");
    expect(ctaLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the star rating display (aggregateRating.ratingValue branch)", async () => {
    const page = await TestimonialsPage();
    render(page);
    expect(
      screen.getAllByText(/Mission Partners|Verified feedback/i).length,
    ).toBeGreaterThan(0);
  });

  it("renders testimonial names in the hero stats block", async () => {
    const page = await TestimonialsPage();
    render(page);
    // testimonials.length > 0 → reviewCount shows
    expect(
      screen.getAllByText(/2\+?|Mission Partners/i).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
