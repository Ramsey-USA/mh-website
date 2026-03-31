/**
 * @jest-environment jsdom
 *
 * Smoke tests for zero-coverage about section components.
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

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
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
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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
}));

jest.mock("@/components/ui/AlternatingShowcase", () => ({
  AlternatingShowcase: ({
    items,
  }: {
    items: Array<{ id: string; title: string }>;
  }) => (
    <div>
      {items.map((item) => (
        <div key={item.id} data-testid="showcase-item">
          {item.title}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { about: [] },
}));

import { render, screen } from "@testing-library/react";

// ── AboutHero ─────────────────────────────────────────────────────────────────

describe("AboutHero", () => {
  it("renders without throwing", () => {
    const { AboutHero } = require("../AboutHero");
    expect(() => render(<AboutHero />)).not.toThrow();
  });

  it("renders the heading text", () => {
    const { AboutHero } = require("../AboutHero");
    render(<AboutHero />);
    expect(screen.getByText(/Service-Earned Values/i)).toBeInTheDocument();
  });
});

// ── AwardsSection ─────────────────────────────────────────────────────────────

describe("AwardsSection", () => {
  it("renders without throwing", () => {
    const { AwardsSection } = require("../AwardsSection");
    expect(() => render(<AwardsSection />)).not.toThrow();
  });

  it("renders a recognition card", () => {
    const { AwardsSection } = require("../AwardsSection");
    render(<AwardsSection />);
    expect(
      screen.getByText(/Veteran Business Enterprise/i),
    ).toBeInTheDocument();
  });
});

// ── PartnershipPhilosophy ─────────────────────────────────────────────────────

describe("PartnershipPhilosophy", () => {
  it("renders without throwing", () => {
    const { PartnershipPhilosophy } = require("../PartnershipPhilosophy");
    expect(() => render(<PartnershipPhilosophy />)).not.toThrow();
  });

  it("renders section content", () => {
    const { PartnershipPhilosophy } = require("../PartnershipPhilosophy");
    const { container } = render(<PartnershipPhilosophy />);
    expect(container.firstChild).not.toBeNull();
  });
});

// ── SafetySection ─────────────────────────────────────────────────────────────

describe("SafetySection", () => {
  it("renders without throwing", () => {
    const { SafetySection } = require("../SafetySection");
    expect(() => render(<SafetySection />)).not.toThrow();
  });

  it("renders AlternatingShowcase items for each safety feature", () => {
    const { SafetySection } = require("../SafetySection");
    render(<SafetySection />);
    const items = screen.getAllByTestId("showcase-item");
    expect(items.length).toBeGreaterThan(0);
  });
});

// ── LeadershipTeam ────────────────────────────────────────────────────────────

describe("LeadershipTeam", () => {
  it("renders without throwing", () => {
    const { LeadershipTeam } = require("../LeadershipTeam");
    expect(() => render(<LeadershipTeam />)).not.toThrow();
  });

  it("renders team specialty titles", () => {
    const { LeadershipTeam } = require("../LeadershipTeam");
    render(<LeadershipTeam />);
    expect(screen.getByText("Mission Leadership")).toBeInTheDocument();
    expect(screen.getByText("Safety Excellence")).toBeInTheDocument();
  });
});

// ── ValuesShowcase ────────────────────────────────────────────────────────────

describe("ValuesShowcase", () => {
  it("renders without throwing", () => {
    const { ValuesShowcase } = require("../ValuesShowcase");
    expect(() => render(<ValuesShowcase />)).not.toThrow();
  });
});
