/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

const mockWithGeoMetadata = jest.fn((metadata) => ({
  ...metadata,
  other: {
    ...(metadata.other || {}),
    "geo.region": "US-WA",
  },
}));

jest.mock("@/lib/seo/geo-metadata", () => ({
  withGeoMetadata: (metadata: unknown) => mockWithGeoMetadata(metadata),
}));

import {
  StructuredData,
  enhancedSEO,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateConstructionFAQSchema,
  generateEnhancedMetadata,
  generateEnhancedOrganizationSchema,
  generateFAQSchema,
  generateIRLConsultationSchema,
  generateLocalBusinessSchema,
  generateProjectSchema,
  generateServiceSchema,
  generateWebsiteSchema,
} from "../EnhancedSEO";

describe("EnhancedSEO helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exposes the expected enhancedSEO base configuration", () => {
    expect(enhancedSEO.siteName).toBe("MH Construction");
    expect(enhancedSEO.siteUrl).toMatch(/^https?:\/\//);
    expect(enhancedSEO.defaultKeywords.length).toBeGreaterThan(10);
    expect(enhancedSEO.companyInfo.veteranOwned).toBe(true);
  });

  it("builds the enhanced organization schema with key identity fields", () => {
    const schema = generateEnhancedOrganizationSchema();

    expect(schema["@type"]).toEqual(
      expect.arrayContaining(["GeneralContractor", "VeteranOwnedBusiness"]),
    );
    expect(schema.name).toBe(enhancedSEO.companyInfo.name);
    expect(schema.url).toBe(enhancedSEO.siteUrl);
    expect(schema.sameAs).toEqual(
      expect.arrayContaining([
        enhancedSEO.socialMedia.facebook,
        enhancedSEO.socialMedia.linkedin,
      ]),
    );
    expect(schema.potentialAction).toHaveLength(2);
  });

  it("builds service and IRL consultation schemas", () => {
    const service = generateServiceSchema({
      name: "Commercial Construction",
      description: "Commercial projects",
      category: "Commercial Services",
      duration: "6 months",
    });
    const consultation = generateIRLConsultationSchema();

    expect(service["@type"]).toBe("Service");
    expect(service.name).toBe("Commercial Construction");
    expect(service.priceRange).toBe("$$$$");
    expect(service.duration).toBe("6 months");
    expect(consultation.name).toContain("In-Person Construction Consultation");
    expect(consultation.offers.price).toBe("0");
  });

  it("builds FAQ and construction FAQ schemas", () => {
    const faq = generateFAQSchema([
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ]);
    const constructionFaq = generateConstructionFAQSchema();

    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(2);
    expect(constructionFaq.mainEntity.length).toBeGreaterThan(5);
    expect(constructionFaq.mainEntity[0]?.["@type"]).toBe("Question");
  });

  it("builds breadcrumb, project, article, website, and local business schemas", () => {
    const breadcrumb = generateBreadcrumbSchema([
      { name: "Home", url: enhancedSEO.siteUrl },
      { name: "Projects", url: `${enhancedSEO.siteUrl}/projects` },
    ]);
    const project = generateProjectSchema({
      name: "Audi Tri-Cities",
      description: "A premium dealership build.",
      category: "Commercial",
      location: { city: "Richland", state: "WA" },
      completionDate: "2025-01-01",
      budget: "$1M",
      images: [{ url: `${enhancedSEO.siteUrl}/audi.jpg`, caption: "Front" }],
    });
    const article = generateArticleSchema({
      title: "Construction Trends",
      description: "What is changing in the industry.",
      author: "MH Team",
      publishedDate: "2026-01-01",
      image: `${enhancedSEO.siteUrl}/article.jpg`,
      url: `${enhancedSEO.siteUrl}/blog/construction-trends`,
      category: "Insights",
    });
    const website = generateWebsiteSchema();
    const localBusiness = generateLocalBusinessSchema();

    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(project["@type"]).toBe("ConstructionProject");
    expect(project.image[0]?.caption).toBe("Front");
    expect(article["@type"]).toBe("Article");
    expect(article.dateModified).toBe(article.datePublished);
    expect(website["@type"]).toBe("WebSite");
    expect(website.url).toBe(enhancedSEO.siteUrl);
    expect(localBusiness["@type"]).toBe("LocalBusiness");
    expect(localBusiness.areaServed.length).toBeGreaterThan(5);
  });

  it("renders structured data and escapes closing script tags", () => {
    render(
      <StructuredData
        data={{
          "@context": "https://schema.org",
          text: "</script><script>alert(1)</script>",
        }}
      />,
    );

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script?.innerHTML).toContain("<\\/script>");
    expect(screen.queryByText("alert(1)")).not.toBeInTheDocument();
  });

  it("generates enhanced metadata with defaults and geo wrapper", () => {
    const result = generateEnhancedMetadata({ schemas: [{ id: 1 }] });

    expect(result.title).toBe(enhancedSEO.defaultTitle);
    expect(result.description).toBe(enhancedSEO.defaultDescription);
    expect(result.alternates?.canonical).toBe(enhancedSEO.siteUrl);
    expect(result.robots).toBe("index,follow");
    expect(result.schemas).toEqual([{ id: 1 }]);
    expect(result.other?.["geo.region"]).toBe("US-WA");
    expect(mockWithGeoMetadata).toHaveBeenCalled();
  });

  it("generates enhanced metadata with custom values and noIndex", () => {
    const result = generateEnhancedMetadata({
      title: "Custom Page",
      description: "Custom description",
      keywords: ["custom", "seo"],
      canonicalUrl: `${enhancedSEO.siteUrl}/custom`,
      ogImage: `${enhancedSEO.siteUrl}/custom.png`,
      ogType: "article",
      noIndex: true,
      schemas: [{ id: 2 }],
    });

    expect(result.title).toBe("Custom Page | MH Construction");
    expect(result.description).toBe("Custom description");
    expect(result.keywords).toContain("custom");
    expect(result.alternates?.canonical).toBe(`${enhancedSEO.siteUrl}/custom`);
    expect(
      (result.openGraph as unknown as Record<string, unknown>)?.["type"],
    ).toBe("article");
    expect((result.openGraph?.images as unknown[])?.[0]).toEqual(
      expect.objectContaining({ url: `${enhancedSEO.siteUrl}/custom.png` }),
    );
    expect(result.twitter?.images).toEqual([
      `${enhancedSEO.siteUrl}/custom.png`,
    ]);
    expect(result.robots).toBe("noindex,nofollow");
    expect(result.schemas).toEqual([{ id: 2 }]);
  });
});
