/**
 * @jest-environment node
 */

const mockGenerateEnhancedMetadata = jest.fn((input) => ({
  title: input.title,
  description: input.description,
  keywords: input.keywords,
  schemas: input.schemas,
  alternates: { canonical: input.canonicalUrl },
}));

const mockGenerateConstructionFAQSchema = jest.fn(() => ({ type: "faq" }));
const mockGenerateServiceSchema = jest.fn((service) => ({
  type: "service",
  name: service.name,
}));
const mockGenerateLocalBusinessSchema = jest.fn(() => ({
  type: "localBusiness",
}));
const mockGenerateEnhancedOrganizationSchema = jest.fn(() => ({
  type: "organization",
}));
const mockGenerateWebsiteSchema = jest.fn(() => ({ type: "website" }));
const mockGenerateBreadcrumbSchema = jest.fn((items) => ({
  type: "breadcrumb",
  items,
}));
const mockGetJeremyRibbon = jest.fn((routeKey: string) => ({
  eyebrow: "Words from the General",
  quote: `Quote for ${routeKey} route proving leadership continuity`,
  attribution: "Jeremy Thamert, Owner & President",
}));

jest.mock("@/components/seo/EnhancedSEO", () => ({
  generateEnhancedMetadata: (input: unknown) =>
    mockGenerateEnhancedMetadata(input),
  generateConstructionFAQSchema: () => mockGenerateConstructionFAQSchema(),
  generateServiceSchema: (service: unknown) =>
    mockGenerateServiceSchema(service),
  generateLocalBusinessSchema: () => mockGenerateLocalBusinessSchema(),
  generateEnhancedOrganizationSchema: () =>
    mockGenerateEnhancedOrganizationSchema(),
  generateWebsiteSchema: () => mockGenerateWebsiteSchema(),
  generateBreadcrumbSchema: (items: unknown) =>
    mockGenerateBreadcrumbSchema(items),
  enhancedSEO: {
    siteUrl: "https://www.mhc-gc.com",
    companyInfo: {
      name: "MH Construction, Inc.",
    },
  },
}));

jest.mock("@/lib/content/jeremy-ribbons", () => ({
  getJeremyRibbon: (routeKey: string) => mockGetJeremyRibbon(routeKey),
}));

import {
  getAboutSEO,
  getCareersSEO,
  getContactSEO,
  getFAQSEO,
  getGovernmentSEO,
  getHomepageSEO,
  getProjectsSEO,
  getServiceDetailSEO,
  getServicesSEO,
  getTeamSEO,
  getTestimonialsSEO,
  getTradePartnersSEO,
  getVeteransSEO,
} from "../page-seo-utils";
import { JEREMY_SEO_ROUTE_KEYS } from "../jeremy-seo-route-keys";

function expectJeremyQuoteSchema(
  seoResult: { schemas?: unknown[] },
  expectedQuoteId: string,
) {
  expect(seoResult.schemas).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        "@type": "Quotation",
        "@id": expectedQuoteId,
        creator: expect.objectContaining({
          "@type": "Person",
          "@id": "https://www.mhc-gc.com/jeremy-thamert#person",
          name: "Jeremy Thamert",
        }),
      }),
    ]),
  );
}

describe("page seo utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("builds homepage seo with expected canonical url and schema helpers", () => {
    const result = getHomepageSEO();

    expect(result.alternates!.canonical).toBe("https://www.mhc-gc.com");
    expect(mockGenerateConstructionFAQSchema).toHaveBeenCalled();
    expect(mockGenerateLocalBusinessSchema).toHaveBeenCalled();
    expect(mockGenerateEnhancedOrganizationSchema).toHaveBeenCalled();
    expect(mockGenerateWebsiteSchema).toHaveBeenCalled();
    expect(mockGenerateBreadcrumbSchema).toHaveBeenCalledWith([
      { name: "Home", url: "https://www.mhc-gc.com" },
    ]);
    expect(result.schemas).toHaveLength(7);
    expect(result.schemas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Quotation",
          "@id": "https://www.mhc-gc.com#jeremy-quote",
        }),
      ]),
    );
  });

  it("builds services seo and creates service schemas for each service", () => {
    const result = getServicesSEO();

    expect(result.alternates!.canonical).toBe(
      "https://www.mhc-gc.com/services",
    );
    expect(mockGenerateServiceSchema).toHaveBeenCalledTimes(6);
    expect(result.schemas.length).toBeGreaterThanOrEqual(9);
  });

  it("builds projects seo with breadcrumbs", () => {
    const result = getProjectsSEO();

    expect(result.alternates!.canonical).toBe(
      "https://www.mhc-gc.com/projects",
    );
    expect(mockGenerateBreadcrumbSchema).toHaveBeenCalledWith([
      { name: "Home", url: "https://www.mhc-gc.com" },
      { name: "Projects", url: "https://www.mhc-gc.com/projects" },
    ]);
    expect(result.schemas.length).toBeGreaterThan(0);
  });

  it("builds all remaining page seo objects with expected canonical urls", () => {
    const cases = [
      [getAboutSEO, "https://www.mhc-gc.com/about"],
      [getTeamSEO, "https://www.mhc-gc.com/team"],
      [getGovernmentSEO, "https://www.mhc-gc.com/public-sector"],
      [getVeteransSEO, "https://www.mhc-gc.com/veterans"],
      [getTradePartnersSEO, "https://www.mhc-gc.com/allies"],
      [getTestimonialsSEO, "https://www.mhc-gc.com/testimonials"],
      [getCareersSEO, "https://www.mhc-gc.com/careers"],
      [getContactSEO, "https://www.mhc-gc.com/contact"],
      [getFAQSEO, "https://www.mhc-gc.com/faq"],
    ] as const;

    for (const [builder, canonical] of cases) {
      const result = builder();
      expect(result.alternates!.canonical).toBe(canonical);
      expect(result.title).toBeTruthy();
      expect(result.description).toBeTruthy();
      expect(result.schemas.length).toBeGreaterThan(0);
    }
  });

  it("calls generateEnhancedMetadata once per exported builder", () => {
    getHomepageSEO();
    getAboutSEO();
    getServicesSEO();
    getTeamSEO();
    getGovernmentSEO();
    getVeteransSEO();
    getTradePartnersSEO();
    getTestimonialsSEO();
    getCareersSEO();
    getProjectsSEO();
    getContactSEO();
    getFAQSEO();

    expect(mockGenerateEnhancedMetadata).toHaveBeenCalledTimes(12);
  });

  it("injects route-specific Jeremy quote signals into SEO keywords", () => {
    const homepage = getHomepageSEO();
    const projects = getProjectsSEO();

    expect(mockGetJeremyRibbon).toHaveBeenCalledWith("home");
    expect(mockGetJeremyRibbon).toHaveBeenCalledWith("projects");
    expect(homepage.keywords).toEqual(
      expect.arrayContaining([
        "Jeremy Thamert home quote",
        "Jeremy Thamert leadership message home",
      ]),
    );
    expect(projects.keywords).toEqual(
      expect.arrayContaining([
        "Jeremy Thamert projects quote",
        "Jeremy Thamert leadership message projects",
      ]),
    );
  });

  it("enforces Jeremy quotation schema across all SEO builders", () => {
    const service = {
      slug: "tenant-improvements",
      title: "Tenant Improvements",
      metaDescription:
        "Tenant improvement planning and delivery for occupied facilities.",
      category: "Fit-Out Services",
      supportedProjectTypes: ["Office"],
      focusAreas: ["Scheduling"],
      technicalPriorities: ["Quality Control"],
      summary:
        "Mission-ready fit-outs with clear sequencing and disciplined field coordination.",
    };

    const cases: Array<{ result: { schemas?: unknown[] }; quoteId: string }> = [
      {
        result: getHomepageSEO(),
        quoteId: "https://www.mhc-gc.com#jeremy-quote",
      },
      {
        result: getAboutSEO(),
        quoteId: "https://www.mhc-gc.com/about#jeremy-quote",
      },
      {
        result: getServicesSEO(),
        quoteId: "https://www.mhc-gc.com/services#jeremy-quote",
      },
      {
        result: getServiceDetailSEO(service),
        quoteId:
          "https://www.mhc-gc.com/services/tenant-improvements#jeremy-quote",
      },
      {
        result: getTeamSEO(),
        quoteId: "https://www.mhc-gc.com/team#jeremy-quote",
      },
      {
        result: getGovernmentSEO(),
        quoteId: "https://www.mhc-gc.com/public-sector#jeremy-quote",
      },
      {
        result: getVeteransSEO(),
        quoteId: "https://www.mhc-gc.com/veterans#jeremy-quote",
      },
      {
        result: getTradePartnersSEO(),
        quoteId: "https://www.mhc-gc.com/allies#jeremy-quote",
      },
      {
        result: getTestimonialsSEO(),
        quoteId: "https://www.mhc-gc.com/testimonials#jeremy-quote",
      },
      {
        result: getCareersSEO(),
        quoteId: "https://www.mhc-gc.com/careers#jeremy-quote",
      },
      {
        result: getProjectsSEO(),
        quoteId: "https://www.mhc-gc.com/projects#jeremy-quote",
      },
      {
        result: getContactSEO(),
        quoteId: "https://www.mhc-gc.com/contact#jeremy-quote",
      },
      {
        result: getFAQSEO(),
        quoteId: "https://www.mhc-gc.com/faq#jeremy-quote",
      },
    ];

    for (const { result, quoteId } of cases) {
      expectJeremyQuoteSchema(result, quoteId);
    }

    const routeKeyValues = Object.values(JEREMY_SEO_ROUTE_KEYS);
    expect(routeKeyValues).toEqual(
      expect.arrayContaining([
        "home",
        "services",
        "services/[slug]",
        "public-sector",
      ]),
    );
  });
});
