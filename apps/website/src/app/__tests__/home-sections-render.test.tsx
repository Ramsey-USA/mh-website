/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => undefined,
  }),
}));

jest.mock("next-intl/server", () => ({
  getTranslations: async () => ({
    raw: () => [],
  }),
}));

jest.mock("next/dynamic", () => {
  return () => {
    return function DynamicSection() {
      return <section data-testid="dynamic-home-section" />;
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
  HeroSection: () => <section data-testid="hero-section" />,
  CoreValuesSection: () => <section data-testid="core-values-section" />,
  ServicesShowcase: () => <section data-testid="dynamic-home-section" />,
  WhyPartnerSection: () => <section data-testid="dynamic-home-section" />,
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
    process.env.NODE_ENV = "production";

    const ui = await Home();
    render(ui);

    expect(screen.getByTestId("page-tracking-client")).toBeInTheDocument();
    expect(screen.getByTestId("home-sentry-support")).toBeInTheDocument();
    expect(screen.getByTestId("structured-data")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("core-values-section")).toBeInTheDocument();

    expect(
      screen.getAllByTestId("dynamic-home-section").length,
    ).toBeGreaterThan(0);

    process.env.NODE_ENV = previousNodeEnv;
  });
});
