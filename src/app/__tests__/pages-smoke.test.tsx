/**
 * @jest-environment jsdom
 *
 * Smoke tests for zero-coverage server-component pages.
 * Each test just renders the page and asserts it doesn't throw —
 * that alone drives statement coverage for the entire page file.
 */

// ── Shared mocks ─────────────────────────────────────────────────────────────

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
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/icons/AmericanFlag", () => ({
  AmericanFlag: () => null,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
  IconContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  GlowEffect: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
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
  AlternatingShowcase: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/layout/UnderConstruction", () => ({
  UnderConstruction: () => null,
}));

jest.mock("@/components/allies/VendorPlatformLink", () => ({
  VendorPlatformLink: () => null,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/animations/ScrollReveal", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/about", () => ({
  AboutHero: () => null,
  PartnershipPhilosophy: () => null,
  CompanyStats: () => null,
  ValuesShowcase: () => null,
  LeadershipTeam: () => null,
  SafetySection: () => null,
  AwardsSection: () => null,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: {
    faq: [],
    veterans: [],
    team: [],
    services: [],
    testimonials: [],
    allies: [],
    publicSector: [],
  },
}));

jest.mock("@/components/shared-sections", () => ({
  NextStepsSection: () => null,
  TestimonialsSection: () => null,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
  generateSEOMetadata: () => ({}),
}));

jest.mock("@/components/team/TeamProfileSection", () => ({
  TeamProfileSection: () => null,
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    name: "MH Construction",
    phone: { display: "(509) 308-6489", tel: "+15093086489" },
    email: { main: "office@mhc-gc.com" },
    urls: {
      site: "https://mhc-gc.com",
      getSiteUrl: () => "https://mhc-gc.com",
    },
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      stateCode: "WA",
      zip: "99301",
    },
  },
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({ "@type": "BreadcrumbList" })),
  breadcrumbPatterns: {
    about: {},
    faq: {},
    services: {},
    team: {},
    veterans: {},
    publicSector: [],
    allies: [],
    accessibility: [],
    privacy: [],
    terms: [],
    testimonials: [],
  },
}));

jest.mock("@/lib/seo/howto-schema", () => ({
  generateHowToSchema: jest.fn(() => ({})),
}));

jest.mock("@/lib/seo/review-schema", () => ({
  generateReviewSchema: jest.fn(() => ({})),
  generateAggregateRating: jest.fn(() => ({})),
  generateAggregateRatingSchema: jest.fn(() => ({})),
}));

jest.mock("@/lib/seo/geo-metadata", () => ({
  generateGeoMetaTags: jest.fn(() => ({})),
  withGeoMetadata: (meta: Record<string, unknown>) => meta,
}));

jest.mock("@/lib/seo/page-seo-utils", () => ({
  getAboutSEO: jest.fn(() => ({})),
  getFaqSEO: jest.fn(() => ({})),
  getServicesSEO: jest.fn(() => ({})),
  getTeamSEO: jest.fn(() => ({})),
  getVeteransSEO: jest.fn(() => ({})),
  getHomepageSEO: jest.fn(() => ({ schemas: [] })),
}));

jest.mock("@/lib/data/about-timeline", () => ({
  aboutTimelineSteps: [],
}));

jest.mock("@/lib/styles/layout-variants", () => ({
  gridPresets: {
    cards3: () => "grid grid-cols-1 md:grid-cols-3",
    cards4: () => "grid grid-cols-1 md:grid-cols-4",
    twoColumn: () => "grid grid-cols-1 md:grid-cols-2",
    fourColumn: () => "grid grid-cols-1 md:grid-cols-4",
    heroStats: () => "grid grid-cols-2 md:grid-cols-4",
    twoThirdsOneThird: () => "grid grid-cols-1 md:grid-cols-3",
  },
}));

jest.mock("@/lib/data/testimonials", () => ({
  getEmployeeTestimonials: jest.fn(() => []),
  getClientTestimonials: jest.fn(() => []),
}));

jest.mock("@/lib/data/vintage-team", () => ({
  vintageTeamMembers: [],
}));

jest.mock("@/components/home", () => ({
  HeroSection: () => null,
  CoreValuesSection: () => null,
  ServicesShowcase: () => null,
  WhyPartnerSection: () => null,
}));

jest.mock("@/components/pwa", () => ({
  PWAInstallCTA: () => null,
}));

import { render } from "@testing-library/react";

// ── About page ────────────────────────────────────────────────────────────────

describe("About page", () => {
  it("renders without throwing", () => {
    const { default: AboutPage } = require("../about/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<AboutPage />)).not.toThrow();
  });
});

// ── FAQ page ──────────────────────────────────────────────────────────────────

describe("FAQ page", () => {
  it("renders without throwing", () => {
    const { default: FAQPage } = require("../faq/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<FAQPage />)).not.toThrow();
  });
});

// ── Services page ─────────────────────────────────────────────────────────────

describe("Services page", () => {
  it("renders without throwing", () => {
    const { default: ServicesPage } = require("../services/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<ServicesPage />)).not.toThrow();
  });
});

// ── Team page ─────────────────────────────────────────────────────────────────

describe("Team page", () => {
  it("renders without throwing", () => {
    const { default: TeamPage } = require("../team/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<TeamPage />)).not.toThrow();
  });
});

// ── Veterans page ─────────────────────────────────────────────────────────────

describe("Veterans page", () => {
  it("renders without throwing", () => {
    const { default: VeteransPage } = require("../veterans/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<VeteransPage />)).not.toThrow();
  });
});

// ── Testimonials page ─────────────────────────────────────────────────────────

describe("Testimonials page", () => {
  it("renders without throwing", () => {
    const { default: TestimonialsPage } = require("../testimonials/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<TestimonialsPage />)).not.toThrow();
  });
});

// ── Public Sector page ────────────────────────────────────────────────────────

describe("Public Sector page", () => {
  it("renders without throwing", () => {
    const { default: PublicSectorPage } = require("../public-sector/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<PublicSectorPage />)).not.toThrow();
  });
});

// ── Privacy page ──────────────────────────────────────────────────────────────

describe("Privacy page", () => {
  it("renders without throwing", () => {
    const { default: PrivacyPage } = require("../privacy/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<PrivacyPage />)).not.toThrow();
  });
});

// ── Terms page ────────────────────────────────────────────────────────────────

describe("Terms page", () => {
  it("renders without throwing", () => {
    const { default: TermsPage } = require("../terms/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<TermsPage />)).not.toThrow();
  });
});

// ── Accessibility page ────────────────────────────────────────────────────────

describe("Accessibility page", () => {
  it("renders without throwing", () => {
    const { default: AccessibilityPage } = require("../accessibility/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<AccessibilityPage />)).not.toThrow();
  });
});

// ── Allies page ───────────────────────────────────────────────────────────────

describe("Allies page", () => {
  it("renders without throwing", () => {
    const { default: AlliesPage } = require("../allies/page") as {
      default: React.ComponentType;
    };
    expect(() => render(<AlliesPage />)).not.toThrow();
  });
});

// ── Home page ─────────────────────────────────────────────────────────────────

describe("Home page", () => {
  it("renders without throwing", () => {
    const { default: HomePage } = require("../page") as {
      default: React.ComponentType;
    };
    expect(() => render(<HomePage />)).not.toThrow();
  });
});
