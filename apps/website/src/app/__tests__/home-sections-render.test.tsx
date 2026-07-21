/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { projectCaseStudies } from "@/lib/data/project-case-studies";

jest.mock("next/headers", () => ({
  __esModule: true,
  cookies: jest.fn(async () => ({
    get: () => undefined,
  })),
  headers: jest.fn(async () => ({
    get: () => null,
  })),
}));

jest.mock("next-intl/server", () => ({
  getTranslations: async () => ({
    raw: () => [],
  }),
}));

jest.mock("next/dynamic", () => {
  return () => {
    return function DynamicSection(props: {
      includePublicSectorLink?: boolean;
    }) {
      return (
        <section data-testid="dynamic-home-section">
          {props.includePublicSectorLink ? (
            <a href="/public-sector">Public Sector</a>
          ) : null}
        </section>
      );
    };
  };
});

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => <div data-testid="page-tracking-client" />,
}));

jest.mock("@/components/monitoring/HomePageSentrySupport", () => ({
  HomePageSentrySupport: () => <div data-testid="home-sentry-support" />,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => <div data-testid="structured-data" />,
}));

jest.mock("@/lib/seo/geo-metadata", () => ({
  withGeoMetadata: (metadata: unknown) => metadata,
}));

jest.mock("@/lib/seo/page-seo-utils", () => ({
  getHomepageSEO: () => ({ schemas: [] }),
}));

jest.mock("@/components/home", () => ({
  HeroSection: () => (
    <section data-testid="hero-section">
      <h1>Home Hero</h1>
      <a href="/contact">Start a project conversation</a>
      <a href="/projects">View project proof</a>
    </section>
  ),
  ServicesShowcase: () => <section data-testid="dynamic-home-section" />,
  WhyPartnerSection: () => <section data-testid="dynamic-home-section" />,
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({
    id,
    children,
  }: {
    id?: string;
    children: ReactNode;
  }) => (
    <section data-testid="dynamic-home-section" id={id}>
      {children}
    </section>
  ),
}));

jest.mock("@/components/pwa", () => ({
  PWAInstallCTA: () => <section data-testid="pwa-install-cta" />,
}));

jest.mock("@/components/shared-sections", () => ({
  TestimonialsSection: () => <section data-testid="dynamic-home-section" />,
  NextStepsSection: () => <section data-testid="dynamic-home-section" />,
}));

jest.mock("@/components/ui/Timeline", () => ({
  Timeline: () => <section data-testid="dynamic-home-section" />,
}));

describe("Home page section rendering", () => {
  it("mounts all static and dynamic section slots", async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    try {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        configurable: true,
      });

      const { default: Home } = await import("../page");
      const ui = await Home();
      render(ui);

      expect(screen.getByTestId("page-tracking-client")).toBeInTheDocument();
      expect(screen.getByTestId("home-sentry-support")).toBeInTheDocument();
      expect(screen.getByTestId("structured-data")).toBeInTheDocument();
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(
        screen.getAllByTestId("dynamic-home-section").length,
      ).toBeGreaterThan(0);

      const h1Elements = document.querySelectorAll("h1");
      expect(h1Elements).toHaveLength(1);

      expect(
        screen.getByRole("link", { name: /start a project conversation/i }),
      ).toHaveAttribute("href", "/contact");
      expect(
        screen.getByRole("link", { name: /view project proof/i }),
      ).toHaveAttribute("href", "/projects");
      expect(
        screen.getByRole("link", { name: /public sector/i }),
      ).toHaveAttribute("href", "/public-sector");

      const orderedSectionIds = [
        "stats",
        "services",
        "our-process",
        "why-partner",
      ];
      const sectionIdNodes = orderedSectionIds.map((id) =>
        document.getElementById(id),
      );
      sectionIdNodes.forEach((node) => {
        expect(node).not.toBeNull();
      });

      for (let index = 1; index < sectionIdNodes.length; index += 1) {
        const previous = sectionIdNodes[index - 1]!;
        const current = sectionIdNodes[index]!;
        expect(
          previous.compareDocumentPosition(current) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).not.toBe(0);
      }

      const featuredProjectSlugs = projectCaseStudies
        .filter((project) => project.isPublished !== false)
        .slice(0, 3)
        .map((project) => project.slug);

      featuredProjectSlugs.forEach((slug) => {
        expect(
          document.querySelector(`a[href="/projects/${slug}"]`),
        ).not.toBeNull();
      });
    } finally {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: previousNodeEnv,
        configurable: true,
      });
    }
  });
});
