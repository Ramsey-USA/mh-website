/**
 * Tests for SEO schema generators
 * Covers: breadcrumb-schema, howto-schema, review-schema, geo-metadata, location-metadata
 */

import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "../breadcrumb-schema";
import { generateHowToSchema } from "../howto-schema";
import {
  generateReviewSchema,
  generateAggregateRatingSchema,
} from "../review-schema";
import { withGeoMetadata } from "../geo-metadata";
import { generateLocationMetadata } from "../location-metadata";
import type { LocationData } from "@/lib/data/locations";

// ── breadcrumb-schema ─────────────────────────────────────────────────────────

describe("generateBreadcrumbSchema()", () => {
  it("returns a BreadcrumbList schema object", () => {
    const result = generateBreadcrumbSchema([
      { name: "Home", url: "https://www.mhc-gc.com" },
      { name: "Services", url: "https://www.mhc-gc.com/services" },
    ]);

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toHaveLength(2);
  });

  it("assigns sequential 1-based positions to each item", () => {
    const items = [
      { name: "Home", url: "https://www.mhc-gc.com" },
      { name: "About", url: "https://www.mhc-gc.com/about" },
      { name: "Team", url: "https://www.mhc-gc.com/team" },
    ];
    const { itemListElement } = generateBreadcrumbSchema(items);

    expect(itemListElement[0]!.position).toBe(1);
    expect(itemListElement[1]!.position).toBe(2);
    expect(itemListElement[2]!.position).toBe(3);
  });

  it("maps name and item (URL) correctly", () => {
    const { itemListElement } = generateBreadcrumbSchema([
      { name: "Contact", url: "https://www.mhc-gc.com/contact" },
    ]);
    expect(itemListElement[0]!.name).toBe("Contact");
    expect(itemListElement[0]!.item).toBe("https://www.mhc-gc.com/contact");
  });

  it("handles an empty array", () => {
    const result = generateBreadcrumbSchema([]);
    expect(result.itemListElement).toHaveLength(0);
  });

  it("breadcrumbPatterns.services has two items starting with Home", () => {
    const { services } = breadcrumbPatterns;
    expect(services[0]!.name).toBe("Home");
    expect(services).toHaveLength(2);
  });
});

// ── howto-schema ──────────────────────────────────────────────────────────────

describe("generateHowToSchema()", () => {
  const props = {
    name: "How to Get a Quote",
    description: "Request a construction estimate from MH Construction",
    steps: [
      { name: "Step 1", text: "Visit the contact page" },
      { name: "Step 2", text: "Fill in the form" },
    ],
  };

  it("returns a HowTo schema object", () => {
    const result = generateHowToSchema(props);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("HowTo");
    expect(result.name).toBe(props.name);
    expect(result.description).toBe(props.description);
  });

  it("maps steps with 1-based position", () => {
    const { step } = generateHowToSchema(props);
    expect(step[0]!.position).toBe(1);
    expect(step[0]!.name).toBe("Step 1");
    expect(step[1]!.position).toBe(2);
  });

  it("includes optional totalTime and estimatedCost when provided", () => {
    const result = generateHowToSchema({
      ...props,
      totalTime: "PT10M",
      estimatedCost: { currency: "USD", value: "0" },
    });
    expect(result.totalTime).toBe("PT10M");
    expect(result.estimatedCost).toEqual({ currency: "USD", value: "0" });
  });

  it("includes a HowToTool entry for MH Construction Website", () => {
    const result = generateHowToSchema(props);
    expect(result.tool![0]!.name).toBe("MH Construction Website");
  });

  it("passes image and url through on each step when provided", () => {
    const result = generateHowToSchema({
      ...props,
      steps: [
        {
          name: "s",
          text: "t",
          image: "https://example.com/img.png",
          url: "https://example.com",
        },
      ],
    });
    expect(result.step![0]!.image).toBe("https://example.com/img.png");
    expect(result.step![0]!.url).toBe("https://example.com");
  });
});

// ── review-schema ─────────────────────────────────────────────────────────────

describe("generateReviewSchema()", () => {
  const review = {
    author: "Jane Doe",
    datePublished: "2025-01-15",
    reviewBody: "Excellent work on our renovation.",
    ratingValue: 5,
    reviewTitle: "Outstanding service",
  };

  it("returns a Review schema object", () => {
    const result = generateReviewSchema(review);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Review");
  });

  it("sets author name and rating value", () => {
    const result = generateReviewSchema(review);
    expect(result.author.name).toBe("Jane Doe");
    expect(result.reviewRating.ratingValue).toBe(5);
    expect(result.reviewRating.bestRating).toBe(5);
    expect(result.reviewRating.worstRating).toBe(1);
  });

  it("includes reviewed LocalBusiness with address fields", () => {
    const result = generateReviewSchema(review);
    expect(result.itemReviewed["@type"]).toBe("LocalBusiness");
    expect(result.itemReviewed.address["@type"]).toBe("PostalAddress");
  });

  it("includes review title when provided", () => {
    const result = generateReviewSchema(review);
    expect(result.name).toBe("Outstanding service");
  });
});

describe("generateAggregateRatingSchema()", () => {
  it("returns an aggregate rating schema", () => {
    const result = generateAggregateRatingSchema(4.8, 127);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result.aggregateRating.ratingValue).toBe(4.8);
    expect(result.aggregateRating.reviewCount).toBe(127);
    expect(result.aggregateRating.bestRating).toBe(5);
  });
});

// ── geo-metadata ──────────────────────────────────────────────────────────────

describe("withGeoMetadata()", () => {
  it("adds geo.region, geo.placename, geo.position and ICBM tags", () => {
    const result = withGeoMetadata({ title: "Test Page" });
    expect(result.other?.["geo.region"]).toBeDefined();
    expect(result.other?.["geo.placename"]).toBeDefined();
    expect(result.other?.["geo.position"]).toBeDefined();
    expect(result.other?.["ICBM"]).toBeDefined();
  });

  it("uses override values when provided", () => {
    const result = withGeoMetadata(
      { title: "Spokane Page" },
      {
        placename: "Spokane",
        region: "US-WA",
        latitude: 47.6587,
        longitude: -117.426,
      },
    );
    expect(result.other?.["geo.placename"]).toBe("Spokane");
    expect(result.other?.["geo.region"]).toBe("US-WA");
    expect(result.other?.["geo.position"]).toContain("47.6587");
  });

  it("merges existing other metadata without overwriting it", () => {
    const result = withGeoMetadata({
      title: "Test",
      other: { "custom-tag": "custom-value" },
    });
    expect(result.other?.["custom-tag"]).toBe("custom-value");
    expect(result.other?.["geo.region"]).toBeDefined();
  });
});

// ── location-metadata ─────────────────────────────────────────────────────────

describe("generateLocationMetadata()", () => {
  const mockLocation: LocationData = {
    city: "Richland",
    state: "WA",
    slug: "richland-wa",
    coordinates: { latitude: 46.2804, longitude: -119.2752 },
    seo: {
      title: "General Contractor Richland WA | MH Construction",
      metaDescription: "MH Construction serves Richland WA",
      openGraphDescription: "MH Construction in Richland",
      twitterDescription: "Contractor in Richland WA",
      keywords: ["general contractor", "Richland", "WA"],
    },
    servicePriorities: ["commercial build", "renovation"],
    nearbyAreas: ["Kennewick", "Pasco"],
    recentProjects: [{ name: "City Hall", category: "commercial" }],
    serviceZipCodes: ["99352"],
  } as unknown as LocationData;

  it("returns a Next.js Metadata object", () => {
    const result = generateLocationMetadata(mockLocation);
    expect(result.title).toBe(mockLocation.seo.title);
    expect(result.description).toBe(mockLocation.seo.metaDescription);
  });

  it("includes geo metadata for the location coordinates", () => {
    const result = generateLocationMetadata(mockLocation);
    expect(result.other?.["geo.placename"]).toBe("Richland");
    expect(result.other?.["geo.region"]).toBe("US-WA");
  });

  it("includes keywords from seo, priorities, nearbyAreas, projects, and zips", () => {
    const result = generateLocationMetadata(mockLocation);
    const keywords = result.keywords as string[];
    // From servicePriorities
    expect(keywords.some((k) => k.includes("commercial build"))).toBe(true);
    // From nearbyAreas
    expect(keywords.some((k) => k.includes("Kennewick"))).toBe(true);
    // From project names
    expect(keywords.some((k) => k.includes("City Hall"))).toBe(true);
    // From zip codes
    expect(keywords.some((k) => k.includes("99352"))).toBe(true);
  });

  it("builds canonical URL from slug", () => {
    const result = generateLocationMetadata(mockLocation);
    expect(result.alternates?.canonical as string).toContain("richland-wa");
  });
});
