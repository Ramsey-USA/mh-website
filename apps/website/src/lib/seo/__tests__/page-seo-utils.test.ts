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

import {
  getAboutSEO,
  getCareersSEO,
  getContactSEO,
  getFAQSEO,
  getGovernmentSEO,
  getHomepageSEO,
  getProjectsSEO,
  getServicesSEO,
  getTeamSEO,
  getTestimonialsSEO,
  getTradePartnersSEO,
  getVeteransSEO,
} from "../page-seo-utils";

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
    expect(result.schemas).toHaveLength(6);
  });

  it("builds services seo and creates service schemas for each service", () => {
    const result = getServicesSEO();

    expect(result.alternates!.canonical).toBe(
      "https://www.mhc-gc.com/services",
    );
    expect(mockGenerateServiceSchema).toHaveBeenCalledTimes(6);
    expect(result.schemas.length).toBeGreaterThanOrEqual(8);
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
});
