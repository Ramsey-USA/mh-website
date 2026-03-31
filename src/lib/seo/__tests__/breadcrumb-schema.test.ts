import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumb-schema";

describe("generateBreadcrumbSchema", () => {
  const items: BreadcrumbItem[] = [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    { name: "Commercial", url: "https://www.mhc-gc.com/services/commercial" },
  ];

  it("returns an object with @context set to schema.org", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("returns an object with @type set to BreadcrumbList", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("maps items to ListItem entries in itemListElement", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement).toHaveLength(items.length);
    schema.itemListElement.forEach((entry) => {
      expect(entry["@type"]).toBe("ListItem");
    });
  });

  it("assigns position starting from 1", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement[0]!.position).toBe(1);
    expect(schema.itemListElement[1]!.position).toBe(2);
    expect(schema.itemListElement[2]!.position).toBe(3);
  });

  it("maps item name correctly", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement[0]!.name).toBe("Home");
    expect(schema.itemListElement[1]!.name).toBe("Services");
    expect(schema.itemListElement[2]!.name).toBe("Commercial");
  });

  it("maps item url to the 'item' field", () => {
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement[0]!.item).toBe("https://www.mhc-gc.com");
    expect(schema.itemListElement[1]!.item).toBe(
      "https://www.mhc-gc.com/services",
    );
  });

  it("handles an empty array", () => {
    const schema = generateBreadcrumbSchema([]);
    expect(schema.itemListElement).toHaveLength(0);
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("handles a single item", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "https://www.mhc-gc.com" },
    ]);
    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0]!.position).toBe(1);
  });
});

describe("breadcrumbPatterns", () => {
  const requiredKeys = [
    "services",
    "about",
    "projects",
    "team",
    "contact",
    "careers",
    "government",
    "publicSector",
    "allies",
    "tradePartners",
    "veterans",
    "faq",
    "accessibility",
    "privacy",
    "terms",
  ] as const;

  it.each(requiredKeys)('has "%s" key', (key) => {
    expect(breadcrumbPatterns).toHaveProperty(key);
  });

  it.each(requiredKeys)('"%s" is an array', (key) => {
    expect(Array.isArray(breadcrumbPatterns[key])).toBe(true);
  });

  it.each(requiredKeys)('"%s" has at least one item', (key) => {
    expect(breadcrumbPatterns[key].length).toBeGreaterThan(0);
  });

  it.each(requiredKeys)('"%s" items have name and url properties', (key) => {
    breadcrumbPatterns[key].forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("url");
      expect(typeof item.name).toBe("string");
      expect(typeof item.url).toBe("string");
    });
  });

  it.each(requiredKeys)('"%s" first item is the Home breadcrumb', (key) => {
    const items = breadcrumbPatterns[key];
    expect(items[0]!.name).toBe("Home");
  });

  it("services has 2 items (Home + Services)", () => {
    expect(breadcrumbPatterns.services).toHaveLength(2);
    expect(breadcrumbPatterns.services[1]!.name).toBe("Services");
  });

  it("location patterns exist for Richland, Kennewick, Pasco", () => {
    expect(breadcrumbPatterns).toHaveProperty("locationRichland");
    expect(breadcrumbPatterns).toHaveProperty("locationKennewick");
    expect(breadcrumbPatterns).toHaveProperty("locationPasco");
  });

  it("location patterns have 3 items (Home + Services + Location)", () => {
    expect(breadcrumbPatterns.locationRichland).toHaveLength(3);
    expect(breadcrumbPatterns.locationRichland[1]!.name).toBe("Services");
    expect(breadcrumbPatterns.locationRichland[2]!.name).toBe("Richland, WA");
  });

  it("all item URLs are valid URL strings", () => {
    Object.values(breadcrumbPatterns).forEach((items) => {
      items.forEach((item) => {
        expect(item.url).toMatch(/^https?:\/\//);
      });
    });
  });
});
