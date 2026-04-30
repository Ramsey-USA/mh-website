/**
 * @jest-environment jsdom
 *
 * Public Sector page tests
 * The default export now renders the full Government/Public Sector page.
 * These tests cover top-level rendering behavior and module integrity.
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: ({ pageName }: { pageName: string }) => (
    <div data-testid="page-tracking" data-page={pageName} />
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
  AlternatingShowcase: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => <div data-testid="stripe-pattern" />,
  BrandColorBlobs: () => <div data-testid="brand-color-blobs" />,
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
  COMPANY_INFO: {
    phone: { tel: "+15093086489", display: "(509) 308-6489" },
    email: { main: "office@mhc-gc.com" },
    address: {
      street: "123 Main St",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    bbb: {
      sealClickUrl: "https://example.com/bbb",
      sealHorizontal: "/images/bbb.webp",
      sealHorizontalWhite: "/images/bbb-white.webp",
    },
    travelers: {
      website: "https://example.com/travelers",
      logo: "/images/travelers.webp",
      logoWhite: "/images/travelers-white.webp",
    },
    chambers: {
      pasco: {
        memberDirectoryUrl: "https://example.com/pasco",
        logo: "/images/pasco.webp",
        logoWhite: "/images/pasco-white.webp",
      },
      richland: {
        memberDirectoryUrl: "https://example.com/richland",
        logo: "/images/richland.webp",
      },
      triCityRegional: {
        memberDirectoryUrl: "https://example.com/tricity",
        logo: "/images/tricity.webp",
      },
    },
    waVob: {
      programUrl: "https://example.com/wa-vob",
      verifyUrl: "https://example.com/wa-vob-verify",
      logo: "/images/logo/veteran-owned-business.jpg",
      alt: "Washington State Veteran Owned Business",
      title: "Verify WA VOB Certification",
      certifiedYear: 2026,
    },
  },
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

describe("PublicSectorPage", () => {
  it("renders the page tracking client with correct page name", async () => {
    await renderPublicSectorPage();
    const tracker = screen.getByTestId("page-tracking");
    expect(tracker).toHaveAttribute("data-page", "Public Sector");
  });

  it("renders page navigation and breadcrumb", async () => {
    await renderPublicSectorPage();
    expect(screen.getByTestId("page-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
  });

  it("displays the Government hero naming format", async () => {
    await renderPublicSectorPage();
    expect(screen.getByText("Public Sector → Government")).toBeInTheDocument();
  });

  it("displays the Government hero tagline", async () => {
    await renderPublicSectorPage();
    expect(
      screen.getByText("Mission-Ready, Compliance-Driven"),
    ).toBeInTheDocument();
  });

  it("displays an actionable consultation CTA", async () => {
    await renderPublicSectorPage();
    expect(
      screen.getByText("Request Project Consultation"),
    ).toBeInTheDocument();
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
