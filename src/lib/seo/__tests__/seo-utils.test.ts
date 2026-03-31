import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { generateLocationMetadata } from "@/lib/seo/location-metadata";
import type { LocationData } from "@/lib/data/locations";

const MOCK_LOCATION: LocationData = {
  slug: "test-city",
  city: "Test City",
  state: "WA",
  county: "Test County",
  militaryTitle: "Test Base",
  tagline: "Test tagline",
  description: "Test description",
  telephone: "(509) 555-1234",
  email: "test@example.com",
  address: {
    street: "123 Main St",
    city: "Test City",
    state: "WA",
    zip: "99301",
  },
  coordinates: { latitude: 46.27, longitude: -119.27 },
  seo: {
    title: "Test City | General Contractor | MH Construction",
    metaDescription: "Test meta description for Test City.",
    keywords: ["general contractor test city", "construction test city wa"],
    openGraphDescription: "Test OG description",
    twitterDescription: "Test twitter description",
  },
  breadcrumbKey: "test-city",
  localExpertise: {
    title: "Local Expertise",
    description: ["Expert services"],
  },
};

describe("geo-metadata: withGeoMetadata()", () => {
  it("returns a metadata object with geo.region", () => {
    const result = withGeoMetadata({ title: "Test" });
    expect(result.other?.["geo.region"]).toBeDefined();
  });

  it("returns metadata with geo.placename", () => {
    const result = withGeoMetadata({ title: "Test" });
    expect(result.other?.["geo.placename"]).toBeDefined();
  });

  it("returns metadata with geo.position", () => {
    const result = withGeoMetadata({ title: "Test" });
    expect(result.other?.["geo.position"]).toBeDefined();
  });

  it("returns metadata with ICBM", () => {
    const result = withGeoMetadata({ title: "Test" });
    expect(result.other).toHaveProperty("ICBM");
  });

  it("uses overridden placename when provided", () => {
    const result = withGeoMetadata({ title: "Test" }, { placename: "Spokane" });
    expect(result.other!["geo.placename"]).toBe("Spokane");
  });

  it("uses overridden region when provided", () => {
    const result = withGeoMetadata({ title: "Test" }, { region: "US-OR" });
    expect(result.other!["geo.region"]).toBe("US-OR");
  });

  it("uses overridden coordinates when provided", () => {
    const result = withGeoMetadata(
      { title: "Test" },
      { latitude: 45.5, longitude: -122.6 },
    );
    expect(result.other!["geo.position"]).toBe("45.5;-122.6");
    expect(result.other!["ICBM"]).toBe("45.5, -122.6");
  });

  it("preserves existing metadata properties", () => {
    const result = withGeoMetadata({ title: "My Page", description: "Desc" });
    expect(result.title).toBe("My Page");
    expect(result.description).toBe("Desc");
  });

  it("preserves existing other metadata", () => {
    const result = withGeoMetadata({
      title: "Test",
      other: { "custom-key": "custom-value" },
    });
    expect(result.other!["custom-key"]).toBe("custom-value");
  });

  it("includes business contact data fields", () => {
    const result = withGeoMetadata({ title: "Test" });
    expect(result.other).toHaveProperty("business:contact_data:locality");
    expect(result.other).toHaveProperty("business:contact_data:region");
    expect(result.other).toHaveProperty("business:contact_data:postal_code");
    expect(result.other).toHaveProperty("business:contact_data:country_name");
  });
});

describe("location-metadata: generateLocationMetadata()", () => {
  it("returns metadata with title", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    expect(meta["title"]).toBe(MOCK_LOCATION.seo.title);
  });

  it("returns metadata with description", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    expect(meta["description"]).toBe(MOCK_LOCATION.seo.metaDescription);
  });

  it("returns metadata with keywords array", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    expect(Array.isArray(meta.keywords)).toBe(true);
    expect((meta.keywords as string[]).length).toBeGreaterThan(0);
  });

  it("includes location seo keywords", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    const keywords = meta.keywords as string[];
    expect(
      keywords.some((k) => k.includes("general contractor test city")),
    ).toBe(true);
  });

  it("returns openGraph with title and description", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og?.["title"]).toBe(MOCK_LOCATION.seo.title);
    expect(og?.["description"]).toBe(MOCK_LOCATION.seo.openGraphDescription);
  });

  it("returns canonical URL containing location slug", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    const canonical = (meta.alternates as Record<string, string>)?.[
      "canonical"
    ];
    expect(canonical).toContain("test-city");
  });

  it("includes geo metadata (other.geo.region)", () => {
    const meta = generateLocationMetadata(MOCK_LOCATION);
    expect(meta.other?.["geo.region"]).toBeDefined();
    expect(meta.other!["geo.region"]).toContain("WA");
  });
});
