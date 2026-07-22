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

jest.mock("next/headers", () => ({
  __esModule: true,
  headers: jest.fn(async () => ({
    get: () => null,
  })),
  cookies: jest.fn(async () => ({
    get: () => undefined,
  })),
}));

jest.mock("@opennextjs/cloudflare", () => ({
  __esModule: true,
  getCloudflareContext: () => ({
    env: {},
    cf: {},
    ctx: { waitUntil: () => undefined },
  }),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
  TrackedBridgeLink: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/lib/icons/AmericanFlag", () => ({
  AmericanFlag: () => null,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (asChild ? <>{children}</> : <button type="button">{children}</button>),
  ContentCard: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
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

jest.mock("../careers/print/PrintableApplicationClient", () => ({
  __esModule: true,
  default: () => <div data-testid="careers-print-client" />,
}));

jest.mock("@/components/shared-sections", () => ({
  NextStepsSection: () => null,
  TestimonialsSection: () => null,
  AccreditationsLogoRow: () => null,
  JeremyAuthorityLinksStrip: () => null,
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
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
    bbb: {
      profileUrl: "https://www.bbb.org/test",
      sealClickUrl: "https://www.bbb.org/test#sealclick",
      sealHorizontal: "/images/bbb-seal.png",
      sealHorizontalWhite: "/images/bbb-seal-white.png",
      sealVertical: "/images/bbb-seal-vertical.png",
      sealVerticalWhite: "/images/bbb-seal-vertical-white.png",
      rating: "A+",
      accreditedSince: "April 7, 2026",
    },
    travelers: {
      website: "https://www.travelers.com",
      logo: "/images/travelers-logo.png",
      logoWhite: "/images/travelers-logo-white.png",
    },
    chambers: {
      pasco: {
        name: "Pasco Chamber of Commerce",
        memberDirectoryUrl: "https://pascochamber.org/test",
        logo: "/images/credentials/pasco-chamber.webp",
        logoWhite: "/images/credentials/pasco-chamber-white.webp",
      },
      richland: {
        name: "Richland Chamber of Commerce",
        memberDirectoryUrl: "https://www.richlandchamber.org/test",
        logo: "/images/credentials/richland-chamber.webp",
        logoWhite: "/images/credentials/richland-chamber.webp",
      },
      triCityRegional: {
        name: "Tri-City Regional Chamber of Commerce",
        memberDirectoryUrl: "https://web.tricityregionalchamber.com/test",
        logo: "/images/credentials/tricityregional-chamber.webp",
        logoWhite: "/images/credentials/tricityregional-chamber.webp",
      },
    },
    address: {
      street: "3111 N Capitol Ave",
      city: "Pasco",
      stateCode: "WA",
      zip: "99301",
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
  getServiceDetailSEO: jest.fn(() => ({ schemas: [] })),
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

jest.mock("@/lib/data/vintage-team", () => ({
  vintageTeamMembers: [],
  getPublicVintageTeamMembers: () => [],
  getJeremyThamertLeadershipSources: () => [],
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

jest.mock("next-intl", () => ({
  useLocale: jest.fn(() => "en"),
  useTranslations: jest.fn(() => {
    const translate = ((key: string) => key) as ((key: string) => string) & {
      raw: (key: string) => unknown;
    };
    translate.raw = (key: string) => {
      if (key === "testimonialsData.clientTestimonials") return [];
      if (key === "careersPage.data.employeeTestimonials") return [];
      return [];
    };
    return translate;
  }),
}));

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => {
    const translate = ((key: string) => key) as ((key: string) => string) & {
      raw: (key: string) => unknown;
    };
    translate.raw = () => [];
    return translate;
  }),
}));

jest.mock("@/components/home", () => ({
  HeroSection: () => null,
  ProjectGallerySectionDeferred: () => null,
  CoreValuesSection: () => null,
  ServicesShowcase: () => null,
  WhyPartnerSection: () => null,
}));

jest.mock("@/components/pwa", () => ({
  PWAInstallCTA: () => null,
  DownloadGate: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// ── Mocks for resources/safety pages ──────────────────────────────────────────

jest.mock("@/lib/data/documents", () => ({
  getDocumentById: jest.fn(() => ({
    id: "safety-manual",
    title: "Safety Manual",
    sections: [
      {
        slug: "table-of-contents",
        number: "0",
        title: "Table of Contents",
        summary: "TOC",
      },
      {
        slug: "section-1",
        number: "1",
        title: "Section 1",
        summary: "First section",
      },
    ],
  })),
  manuals: [],
  forms: [],
}));

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

jest.mock("@/components/resources/SafetyComplianceBadge", () => ({
  SafetyComplianceBadge: () => null,
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
    safety: { sections: [] },
  },
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: () => null,
}));

// Mock for useParams in client components
const mockUseParams = jest.fn(() => ({ id: "test-123" }));
const mockRedirect = jest.fn();
const mockPermanentRedirect = jest.fn((url: string) => {
  // Match Next.js behavior: throw a NEXT_REDIRECT-shaped error so callers see
  // the same control flow as production while letting tests assert the target.
  const err = new Error(`NEXT_REDIRECT: ${url}`);
  (err as { digest?: string }).digest = `NEXT_REDIRECT;replace;${url};308;`;
  throw err;
});
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: (...args: unknown[]) => mockRedirect(...args),
  permanentRedirect: (url: string) => mockPermanentRedirect(url),
  useParams: () => mockUseParams(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/safety/print/test-123",
}));

import { render } from "@testing-library/react";
import { eventRecords } from "@/lib/data/events";
import { getLocationSlugs } from "@/lib/data/locations";
import { getPublishedProjectCaseStudySlugs } from "@/lib/data/project-case-studies";
import { getPublishedServiceDetailRouteSlugs } from "@/lib/data/service-routes";

const { axe } = require("jest-axe") as {
  axe: (container: Element | DocumentFragment) => Promise<{
    violations: unknown[];
  }>;
};

const fs = require("node:fs") as typeof import("node:fs");
const path = require("node:path") as typeof import("node:path");
const APP_ROOT = path.resolve(__dirname, "../../..");
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

// ── About page ────────────────────────────────────────────────────────────────

describe("About page", () => {
  it("renders without throwing", async () => {
    const { default: AboutPage } = await import("../about/page");
    const page = await AboutPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── FAQ page ──────────────────────────────────────────────────────────────────

describe("FAQ page", () => {
  it("renders without throwing", async () => {
    const { default: FAQPage } = await import("../faq/page");
    const page = await FAQPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Services page ─────────────────────────────────────────────────────────────

describe("Services page", () => {
  it("renders without throwing", async () => {
    const { default: ServicesPage } = await import("../services/page");
    const page = await ServicesPage();
    expect(() => render(page)).not.toThrow();
  });
});

describe("Service detail page", () => {
  it("renders without throwing for a published service slug", async () => {
    const slug = getPublishedServiceDetailRouteSlugs()[0];
    if (!slug) {
      throw new Error("Expected at least one published service detail slug");
    }

    const { default: ServiceDetailPage } =
      await import("../services/[slug]/page");
    const page = await ServiceDetailPage({
      params: Promise.resolve({ slug }),
    });

    expect(() => render(page)).not.toThrow();
  });
});

// ── Projects hub page ────────────────────────────────────────────────────────

describe("Projects hub page", () => {
  it("renders without throwing", async () => {
    const { default: ProjectsPage } = await import("../projects/page");
    expect(() => render(<ProjectsPage />)).not.toThrow();
  });
});

// ── Projects detail page ─────────────────────────────────────────────────────

describe("Project detail page", () => {
  it("renders without throwing for a published project slug", async () => {
    const slug = getPublishedProjectCaseStudySlugs()[0];
    if (!slug) {
      throw new Error("Expected at least one published project slug");
    }

    const { default: ProjectDetailPage } =
      await import("../projects/[slug]/page");
    const page = await ProjectDetailPage({
      params: Promise.resolve({ slug }),
    });
    expect(() => render(page)).not.toThrow();
  });
});

// ── Events hub page ──────────────────────────────────────────────────────────

describe("Events hub page", () => {
  it("renders without throwing", async () => {
    const { default: EventsPage } = await import("../events/page");
    const page = await EventsPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Events detail page ───────────────────────────────────────────────────────

describe("Event detail page", () => {
  it("renders without throwing for a published event slug", async () => {
    const firstEvent = eventRecords[0];
    if (!firstEvent?.slug) {
      throw new Error("Expected at least one event record slug");
    }

    const { default: EventDetailPage } = await import("../events/[slug]/page");
    const page = await EventDetailPage({
      params: Promise.resolve({ slug: firstEvent.slug }),
    });
    expect(() => render(page)).not.toThrow();
  });
});

// ── Locations hub page ───────────────────────────────────────────────────────

describe("Locations hub page", () => {
  it("renders without throwing", async () => {
    const { default: LocationsPage } = await import("../locations/page");
    const page = await LocationsPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Locations detail page ────────────────────────────────────────────────────

describe("Location detail page", () => {
  it("renders without throwing for a known city slug", async () => {
    const city = getLocationSlugs()[0];
    if (!city) {
      throw new Error("Expected at least one location slug");
    }

    const { default: LocationPage } = await import("../locations/[city]/page");
    const page = await LocationPage({ params: Promise.resolve({ city }) });
    expect(() => render(page)).not.toThrow();
  });
});

describe("Branding congruency smoke", () => {
  it("keeps the canonical primary slogan with supporting slogan in shared constants", () => {
    const companyConstantsPath = path.join(
      REPO_ROOT,
      "packages",
      "shared",
      "src",
      "lib",
      "constants",
      "company.ts",
    );
    const source = fs.readFileSync(companyConstantsPath, "utf8");
    expect(source).toContain('primary: "Built on Quality, Backed by Trust."');
    expect(source).toContain(
      'supporting: "Clear facts. No spin. No surprises."',
    );
  });

  it("keeps services overview indexable with a concrete service detail route", () => {
    const servicesSeoUtilsPath = path.join(
      APP_ROOT,
      "src",
      "lib",
      "seo",
      "page-seo-utils.ts",
    );
    const servicesSeoSource = fs.readFileSync(servicesSeoUtilsPath, "utf8");
    const serviceSlugPagePath = path.join(
      APP_ROOT,
      "src",
      "app",
      "services",
      "[slug]",
      "page.tsx",
    );

    expect(servicesSeoSource).toContain(
      "const servicesUrl = `${enhancedSEO.siteUrl}/services`;",
    );
    expect(fs.existsSync(serviceSlugPagePath)).toBe(true);
  });

  it("keeps services flow represented on home and routes to /services", () => {
    const homePagePath = path.join(APP_ROOT, "src", "app", "page.tsx");
    const homeSource = fs.readFileSync(homePagePath, "utf8");

    expect(homeSource).toContain("<HeroSection");
    expect(homeSource).toContain("/services?utm_source=homepage");
    expect(homeSource).toContain("utm_campaign=home-splash");
  });
});

// ── Team page ─────────────────────────────────────────────────────────────────

describe("Team page", () => {
  it("renders without throwing", async () => {
    const { default: TeamPage } = require("../team/page") as {
      default: () => Promise<React.ReactElement>;
    };
    const page = await TeamPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Veterans page ─────────────────────────────────────────────────────────────

describe("Veterans page", () => {
  it("renders without throwing", async () => {
    const { default: VeteransPage } = require("../veterans/page") as {
      default: () => Promise<React.ReactElement>;
    };
    const page = await VeteransPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Testimonials page ─────────────────────────────────────────────────────────

describe("Testimonials page", () => {
  it("renders without throwing", async () => {
    const { default: TestimonialsPage } = require("../testimonials/page") as {
      default: () => Promise<React.ReactElement>;
    };
    const page = await TestimonialsPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Public Sector page ────────────────────────────────────────────────────────

describe("Public Sector page", () => {
  it("renders without throwing", async () => {
    const { default: PublicSectorPage } = require("../public-sector/page") as {
      default: () => Promise<React.ReactElement>;
    };

    const page = await PublicSectorPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Privacy page ──────────────────────────────────────────────────────────────

describe("Privacy page", () => {
  it("renders without throwing", async () => {
    const { default: PrivacyPage } = await import("../privacy/page");
    const page = await PrivacyPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Terms page ────────────────────────────────────────────────────────────────

describe("Terms page", () => {
  it("renders without throwing", async () => {
    const { default: TermsPage } = await import("../terms/page");
    const page = await TermsPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Accessibility page ────────────────────────────────────────────────────────

describe("Accessibility page", () => {
  it("renders without throwing", async () => {
    const { default: AccessibilityPage } =
      await import("../accessibility/page");
    const page = await AccessibilityPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Allies page ───────────────────────────────────────────────────────────────

describe("Allies page", () => {
  it("renders without throwing", async () => {
    const { default: AlliesPage } = require("../allies/page") as {
      default: () => Promise<React.ReactElement>;
    };
    const page = await AlliesPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Home page ─────────────────────────────────────────────────────────────────

describe("Home page", () => {
  it("renders without throwing", async () => {
    const { default: HomePage } = await import("../page");
    const page = await HomePage();
    expect(() => render(page)).not.toThrow();
  });

  it("has no obvious accessibility violations", async () => {
    const { default: HomePage } = await import("../page");
    const page = await HomePage();
    const { container } = render(page);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ── Resources page ────────────────────────────────────────────────────────────

describe("Resources page", () => {
  it("renders without throwing", async () => {
    const { default: ResourcesPage } = await import("../resources/page");
    const page = await ResourcesPage();
    expect(() => render(page as Parameters<typeof render>[0])).not.toThrow();
  });
});

// ── News page ────────────────────────────────────────────────────────────────

describe("News page", () => {
  it("renders without throwing", async () => {
    const { default: NewsPage } = await import("../news/page");
    const page = await NewsPage();
    expect(() => render(page as Parameters<typeof render>[0])).not.toThrow();
  });
});

// ── Resources Safety Program page ─────────────────────────────────────────────

describe("Resources Safety Program page", () => {
  it("renders without throwing", async () => {
    const { default: SafetyProgramPage } =
      await import("../resources/safety-program/page");
    const page = await SafetyProgramPage();
    expect(() => render(page as Parameters<typeof render>[0])).not.toThrow();
  });
});

// ── Safety page ───────────────────────────────────────────────────────────────

describe("Safety page", () => {
  it("renders without throwing", async () => {
    const { default: SafetyPage } = await import("../safety/page");
    const page = await SafetyPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Safety Intake page ────────────────────────────────────────────────────────

describe("Safety Intake page", () => {
  it("renders without throwing", async () => {
    const { default: SafetyIntakePage } = await import("../safety/intake/page");
    const page = await SafetyIntakePage();
    expect(() => render(page as Parameters<typeof render>[0])).not.toThrow();
  });
});

// ── Careers Print page ────────────────────────────────────────────────────────

describe("Careers Print page", () => {
  it("renders without throwing", async () => {
    const { default: CareersPrintPage } = await import("../careers/print/page");
    const page = await CareersPrintPage();
    expect(() => render(page)).not.toThrow();
  });
});

// ── Safety Manual Section page ────────────────────────────────────────────────

describe("Safety Manual Section page", () => {
  beforeEach(() => {
    mockPermanentRedirect.mockClear();
  });

  it("308-redirects a known section to its cluster anchor", async () => {
    const { default: SectionPage } =
      require("../resources/safety-manual/section/[slug]/page") as {
        default: (props: {
          params: Promise<{ slug: string }>;
        }) => Promise<unknown>;
      };
    await expect(
      SectionPage({ params: Promise.resolve({ slug: "section-1" }) }),
    ).rejects.toThrow(/NEXT_REDIRECT/);
    expect(mockPermanentRedirect).toHaveBeenCalledWith(
      "/resources/safety-manual/program-foundation#mish-01",
    );
  });

  it("308-redirects an unknown section slug to the contents page", async () => {
    const { default: SectionPage } =
      require("../resources/safety-manual/section/[slug]/page") as {
        default: (props: {
          params: Promise<{ slug: string }>;
        }) => Promise<unknown>;
      };
    await expect(
      SectionPage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
    ).rejects.toThrow(/NEXT_REDIRECT/);
    expect(mockPermanentRedirect).toHaveBeenCalledWith(
      "/resources/safety-manual/contents",
    );
  });
});

// ── Safety Print page ─────────────────────────────────────────────────────────

describe("Safety Print page", () => {
  it("renders without throwing", () => {
    const { default: SafetyPrintPage } =
      require("../safety/print/[id]/page") as {
        default: React.ComponentType;
      };
    expect(() => render(<SafetyPrintPage />)).not.toThrow();
  });
});

// ── Safety Manual redirect page ───────────────────────────────────────────────

describe("Safety Manual redirect page", () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it("redirects to /resources/safety-manual/contents", async () => {
    const { default: SafetyManualPage } =
      require("../resources/safety-manual/page") as {
        default: () => unknown;
      };
    await SafetyManualPage();
    expect(mockRedirect).toHaveBeenCalledWith(
      "/resources/safety-manual/contents",
    );
  });
});
