/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { ServiceDetailPageContent } from "../ServiceDetailPageContent";
import type { ServiceRecord } from "@/lib/data/service-routes";

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

jest.mock("@/components/navigation/Breadcrumbs", () => ({
  Breadcrumbs: ({
    items,
  }: {
    items: Array<{ label: string; href?: string }>;
  }) => (
    <nav aria-label="Breadcrumbs">
      {items.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ) : (
          <span key={item.label}>{item.label}</span>
        ),
      )}
    </nav>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

jest.mock("@/components/shared-sections", () => ({
  NextStepsSection: () => <section data-testid="next-steps" />,
}));

const service: ServiceRecord = {
  slug: "commercial-construction",
  title: "Mission-Ready Construction",
  summary: "Summary",
  supportedProjectTypes: ["Commercial shell and interiors"],
  processStatements: ["Align scope before procurement."],
  proofReferences: ["projects/volm-companies-remodel"],
  ctaLabel: "Schedule a mission scope review",
  ctaHref: "/contact",
  publishStatus: "published",
  metaTitle: "meta",
  metaDescription: "meta desc",
  ogImage: "/images/og/services/commercial-construction.webp",
  category: "Mission-Ready Construction",
  overview: "Overview",
  focusAreas: ["Focus area"],
  technicalPriorities: ["Priority"],
  deliverySteps: ["Step"],
  safetyCommitments: ["Commitment"],
};

describe("ServiceDetailPageContent", () => {
  it("renders one H1 and breadcrumb links", () => {
    render(
      <ServiceDetailPageContent
        service={service}
        relatedServices={[
          { slug: "municipal-public-work", title: "Municipal & Government" },
        ]}
      />,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("includes required routing links", () => {
    render(
      <ServiceDetailPageContent
        service={service}
        relatedServices={[
          { slug: "municipal-public-work", title: "Municipal & Government" },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", { name: /Back to Services Hub/i }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", { name: /Schedule a mission scope review/i }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: /Review related project case study/i }),
    ).toHaveAttribute("href", "/projects/volm-companies-remodel");
    expect(
      screen.getByRole("link", { name: /Municipal & Government/i }),
    ).toHaveAttribute("href", "/services/municipal-public-work");
  });
});
