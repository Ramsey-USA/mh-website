import {
  generateReviewSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo/review-schema";
import type { ReviewSchemaProps } from "@/lib/seo/review-schema";

describe("generateReviewSchema", () => {
  const sampleReview: ReviewSchemaProps = {
    author: "John Smith",
    datePublished: "2024-01-15",
    reviewBody: "Excellent work on our commercial renovation project.",
    ratingValue: 5,
    reviewTitle: "Great contractor",
  };

  it("returns @context set to schema.org", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("returns @type set to Review", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema["@type"]).toBe("Review");
  });

  it("includes author with @type Person and correct name", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema.author["@type"]).toBe("Person");
    expect(schema.author.name).toBe("John Smith");
  });

  it("includes datePublished", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema.datePublished).toBe("2024-01-15");
  });

  it("includes reviewBody", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema.reviewBody).toBe(
      "Excellent work on our commercial renovation project.",
    );
  });

  it("includes optional reviewTitle as name", () => {
    const schema = generateReviewSchema(sampleReview);
    expect(schema.name).toBe("Great contractor");
  });

  it("includes undefined name when reviewTitle is omitted", () => {
    const reviewWithoutTitle: ReviewSchemaProps = {
      author: "Jane Doe",
      datePublished: "2024-02-01",
      reviewBody: "Great work!",
      ratingValue: 4,
    };
    const schema = generateReviewSchema(reviewWithoutTitle);
    expect(schema.name).toBeUndefined();
  });

  describe("reviewRating", () => {
    it("has @type Rating", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.reviewRating["@type"]).toBe("Rating");
    });

    it("has the provided ratingValue", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.reviewRating.ratingValue).toBe(5);
    });

    it("has bestRating of 5", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.reviewRating.bestRating).toBe(5);
    });

    it("has worstRating of 1", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.reviewRating.worstRating).toBe(1);
    });

    it("reflects a lower ratingValue", () => {
      const lowRating = { ...sampleReview, ratingValue: 3 };
      const schema = generateReviewSchema(lowRating);
      expect(schema.reviewRating.ratingValue).toBe(3);
    });
  });

  describe("itemReviewed", () => {
    it("has @type LocalBusiness", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed["@type"]).toBe("LocalBusiness");
    });

    it("has name MH Construction", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.name).toBe("MH Construction");
    });

    it("has a telephone", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.telephone).toBeTruthy();
    });

    it("has priceRange", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.priceRange).toBeTruthy();
    });

    it("has an image URL", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.image).toMatch(/^https?:\/\//);
    });

    it("has a PostalAddress", () => {
      const schema = generateReviewSchema(sampleReview);
      const address = schema.itemReviewed.address;
      expect(address["@type"]).toBe("PostalAddress");
      expect(address.streetAddress).toBeTruthy();
      expect(address.addressLocality).toBeTruthy();
      expect(address.addressRegion).toBeTruthy();
      expect(address.postalCode).toBeTruthy();
      expect(address.addressCountry).toBeTruthy();
    });

    it("address locality is Pasco", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.address.addressLocality).toBe("Pasco");
    });

    it("address region is WA", () => {
      const schema = generateReviewSchema(sampleReview);
      expect(schema.itemReviewed.address.addressRegion).toBe("WA");
    });
  });
});

describe("generateAggregateRatingSchema", () => {
  it("returns @context set to schema.org", () => {
    const schema = generateAggregateRatingSchema(4.8, 120);
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("returns @type set to LocalBusiness", () => {
    const schema = generateAggregateRatingSchema(4.8, 120);
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("includes name MH Construction", () => {
    const schema = generateAggregateRatingSchema(4.8, 120);
    expect(schema.name).toBe("MH Construction");
  });

  describe("aggregateRating", () => {
    it("has @type AggregateRating", () => {
      const schema = generateAggregateRatingSchema(4.8, 120);
      expect(schema.aggregateRating["@type"]).toBe("AggregateRating");
    });

    it("has the provided ratingValue", () => {
      const schema = generateAggregateRatingSchema(4.5, 50);
      expect(schema.aggregateRating.ratingValue).toBe(4.5);
    });

    it("has the provided reviewCount", () => {
      const schema = generateAggregateRatingSchema(4.8, 120);
      expect(schema.aggregateRating.reviewCount).toBe(120);
    });

    it("has bestRating of 5", () => {
      const schema = generateAggregateRatingSchema(4.8, 120);
      expect(schema.aggregateRating.bestRating).toBe(5);
    });

    it("has worstRating of 1", () => {
      const schema = generateAggregateRatingSchema(4.8, 120);
      expect(schema.aggregateRating.worstRating).toBe(1);
    });
  });
});
