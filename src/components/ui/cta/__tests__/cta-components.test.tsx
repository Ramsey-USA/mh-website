/**
 * @jest-environment jsdom
 *
 * Tests for UI/CTA components: StrategicCTABanner, PitchDeckCTA, NextStepsSection.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

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

jest.mock("@/components/analytics/EnhancedAnalytics", () => ({
  useAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));

jest.mock("@/components/templates/BrandedContentSection", () => ({
  BrandedContentSection: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => <section id={id}>{children}</section>,
}));

jest.mock("@/components/ui", () => ({
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

// PitchDeckCTA is used inside NextStepsSection — stub to avoid re-importing
jest.mock("@/components/ui/cta", () => ({
  PitchDeckCTA: () => <div data-testid="pitch-deck-cta" />,
}));

import { StrategicCTABanner } from "../StrategicCTABanner";
import { PitchDeckCTA } from "../PitchDeckCTA";
import { NextStepsSection } from "@/components/shared-sections/NextStepsSection";

// ── StrategicCTABanner — all variants ────────────────────────────────────────

describe("StrategicCTABanner", () => {
  it("renders pwa variant without throwing", () => {
    expect(() => render(<StrategicCTABanner variant="pwa" />)).not.toThrow();
  });

  it("renders pitch-deck variant without throwing", () => {
    expect(() =>
      render(<StrategicCTABanner variant="pitch-deck" />),
    ).not.toThrow();
  });

  it("renders consultation variant without throwing", () => {
    expect(() =>
      render(<StrategicCTABanner variant="consultation" />),
    ).not.toThrow();
  });

  it("renders combo variant (default) without throwing", () => {
    expect(() => render(<StrategicCTABanner />)).not.toThrow();
  });

  it("pwa variant renders a landmark section", () => {
    render(<StrategicCTABanner variant="pwa" />);
    // The pwa variant uses role="complementary"
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });
});

// ── PitchDeckCTA — all variants ───────────────────────────────────────────────

describe("PitchDeckCTA", () => {
  it("renders banner variant without throwing", () => {
    expect(() => render(<PitchDeckCTA variant="banner" />)).not.toThrow();
  });

  it("renders card variant without throwing", () => {
    expect(() => render(<PitchDeckCTA variant="card" />)).not.toThrow();
  });

  it("renders inline variant without throwing", () => {
    expect(() => render(<PitchDeckCTA variant="inline" />)).not.toThrow();
  });

  it("renders default (card) when no variant given", () => {
    expect(() => render(<PitchDeckCTA />)).not.toThrow();
  });

  it("card variant contains link to pitch-deck contact page", () => {
    render(<PitchDeckCTA variant="card" />);
    const links = screen
      .getAllByRole("link")
      .filter((el) => (el as HTMLAnchorElement).href.includes("pitch-deck"));
    expect(links.length).toBeGreaterThan(0);
  });

  it("banner variant contains link to pitch-deck contact page", () => {
    render(<PitchDeckCTA variant="banner" />);
    const links = screen
      .getAllByRole("link")
      .filter((el) => (el as HTMLAnchorElement).href.includes("pitch-deck"));
    expect(links.length).toBeGreaterThan(0);
  });
});

// ── NextStepsSection ──────────────────────────────────────────────────────────

describe("NextStepsSection", () => {
  it("renders without throwing with default props", () => {
    expect(() => render(<NextStepsSection />)).not.toThrow();
  });

  it("renders the PitchDeckCTA stub", () => {
    render(<NextStepsSection />);
    expect(screen.getByTestId("pitch-deck-cta")).toBeInTheDocument();
  });

  it("renders with id=next-steps", () => {
    const { container } = render(<NextStepsSection />);
    expect(container.querySelector("#next-steps")).toBeInTheDocument();
  });
});
