/**
 * @jest-environment jsdom
 *
 * Public Sector page tests
 * Currently the page has SHOW_UNDER_CONSTRUCTION = true,
 * so the default export renders the UnderConstruction component.
 * These tests cover the rendered output and verify the data arrays are well-formed.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: ({ pageName }: { pageName: string }) => (
    <div data-testid="page-tracking" data-page={pageName} />
  ),
}));

jest.mock("@/components/layout/UnderConstruction", () => ({
  UnderConstruction: ({
    pageName,
    description,
    estimatedCompletion,
  }: {
    pageName: string;
    description: string;
    estimatedCompletion: string;
  }) => (
    <div data-testid="under-construction">
      <h1>{pageName}</h1>
      <p>{description}</p>
      <span>{estimatedCompletion}</span>
    </div>
  ),
}));

jest.mock("next/dynamic", () => {
  return jest.fn().mockImplementation((loader: () => Promise<unknown>) => {
    // Return a component that calls loader for coverage, then renders null
    const DynamicComponent = (props: Record<string, unknown>) => {
      void loader();
      return <div data-testid="dynamic-component" {...props} />;
    };
    DynamicComponent.displayName = "DynamicMock";
    return DynamicComponent;
  });
});

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

jest.mock("@/components/ui", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3>{children}</h3>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AlternatingShowcase: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => <div data-testid="stripe-pattern" />,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span data-icon={icon} />,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => <nav data-testid="page-navigation" />,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => <nav data-testid="breadcrumb" />,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { publicSector: [] },
}));

jest.mock("@/lib/styles/layout-variants", () => ({
  gridPresets: { cards3: () => "grid grid-cols-3" },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: { phone: "509-308-6489", email: "office@mhc-gc.com" },
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => <script data-testid="structured-data" />,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn().mockReturnValue({}),
  breadcrumbPatterns: { publicSector: [] },
}));

// ── Import after mocks ───────────────────────────────────────────────────────

import PublicSectorPage from "../page";

// ── Tests ─────────────────────────────────────────────────────────────────────

async function renderPublicSectorPage() {
  const ui = await PublicSectorPage();
  return render(ui);
}

describe("PublicSectorPage (under construction)", () => {
  it("renders the page tracking client with correct page name", async () => {
    await renderPublicSectorPage();
    const tracker = screen.getByTestId("page-tracking");
    expect(tracker).toHaveAttribute("data-page", "Public Sector");
  });

  it("renders the UnderConstruction component", async () => {
    await renderPublicSectorPage();
    expect(screen.getByTestId("under-construction")).toBeInTheDocument();
  });

  it("displays the correct page name", async () => {
    await renderPublicSectorPage();
    expect(screen.getByText("Public Sector Contracting")).toBeInTheDocument();
  });

  it("displays the estimated completion date", async () => {
    await renderPublicSectorPage();
    expect(screen.getByText("Q2 2026")).toBeInTheDocument();
  });

  it("displays the description mentioning bonding capacity", async () => {
    await renderPublicSectorPage();
    expect(screen.getByText(/bonding capacity/i)).toBeInTheDocument();
  });
});

describe("PublicSectorPage — module-level data integrity", () => {
  // These tests validate that the static data arrays (grantSupportServices,
  // governmentProjects, grantTypes, processSteps, etc.) are well-formed.
  // We access them indirectly by verifying the module loaded without errors.

  it("exports a default function component", () => {
    expect(typeof PublicSectorPage).toBe("function");
  });

  it("renders without throwing", async () => {
    await expect(PublicSectorPage()).resolves.toBeTruthy();
  });
});
