/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    name: "MH Construction",
    urls: { getSiteUrl: () => "https://mhc-gc.com" },
    social: { twitterHandle: "@mhconstruction" },
    address: {
      street: "3111 N Capitol Ave",
      city: "Pasco",
      stateCode: "WA",
      zip: "99301",
      country: "US",
    },
    phone: { display: "(509) 308-6489" },
    email: { main: "office@mhc-gc.com" },
    bbb: {
      profileUrl: "https://www.bbb.org/test",
      sealClickUrl: "https://www.bbb.org/test#sealclick",
    },
    chambers: {
      pasco: {
        memberDirectoryUrl: "https://pascochamber.org/test",
      },
      richland: {
        memberDirectoryUrl: "https://www.richlandchamber.org/test",
      },
      triCityRegional: {
        memberDirectoryUrl: "https://web.tricityregionalchamber.com/test",
      },
    },
  },
}));

import {
  generateSEOMetadata,
  StructuredData,
  generateOrganizationStructuredData,
  generateProjectStructuredData,
  generateBreadcrumbStructuredData,
  generateWebsiteSchema,
  generateEnhancedOrganizationSchema,
} from "../SeoMeta";

describe("generateSEOMetadata()", () => {
  it("generates default metadata when called with no options", () => {
    const meta = generateSEOMetadata({});
    expect(meta.title).toBe(
      "MH Construction - Veteran-Owned Construction Excellence in the Pacific Northwest",
    );
    expect(meta.description).toMatch(/exceptional/i);
    expect((meta as any).robots).toBe("index,follow");
  });

  it("generates titled metadata with siteName appended", () => {
    const meta = generateSEOMetadata({ title: "About Us" });
    expect(meta.title).toBe("About Us | MH Construction");
  });

  it("applies custom description and keywords", () => {
    const meta = generateSEOMetadata({
      description: "Custom desc",
      keywords: ["veteran", "remodel"],
    });
    expect(meta.description).toBe("Custom desc");
    expect(meta.keywords as string).toContain("veteran");
    expect(meta.keywords as string).toContain("remodel");
  });

  it("sets robots to noindex,nofollow when noIndex=true", () => {
    const meta = generateSEOMetadata({ noIndex: true });
    expect((meta as any).robots).toBe("noindex,nofollow");
  });

  it("uses custom ogType", () => {
    const meta = generateSEOMetadata({ ogType: "article" });
    expect((meta.openGraph as any)?.type).toBe("article");
  });

  it("applies canonicalUrl to alternates", () => {
    const meta = generateSEOMetadata({
      canonicalUrl: "https://mhc-gc.com/about",
    });
    expect((meta.alternates as any)?.canonical).toBe(
      "https://mhc-gc.com/about",
    );
  });

  it("applies ogImage to openGraph images", () => {
    const meta = generateSEOMetadata({
      ogImage: "https://mhc-gc.com/custom-og.png",
    });
    const images = (meta.openGraph as any)?.images;
    expect(Array.isArray(images)).toBe(true);
    expect(images[0].url).toBe("https://mhc-gc.com/custom-og.png");
  });
});

describe("StructuredData component", () => {
  it("renders a single schema as JSON-LD script tag", () => {
    const { container } = render(
      <StructuredData data={{ "@type": "Organization", name: "Test" }} />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const parsed = JSON.parse(script!.textContent!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0]["@type"]).toBe("Organization");
  });

  it("renders an array schema preserving all items", () => {
    const data = [{ "@type": "BreadcrumbList" }, { "@type": "Organization" }];
    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]["@type"]).toBe("BreadcrumbList");
  });

  it("escapes </script> tags to prevent injection", () => {
    const { container } = render(
      <StructuredData data={{ name: "Hack</script><script>alert(1)" }} />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    // Raw innerHTML must not contain an unescaped </script>
    expect(script!.innerHTML).not.toMatch(/<\/script>/i);
    expect(script!.innerHTML).toContain("<\\/script");
  });
});

describe("generateOrganizationStructuredData()", () => {
  it("returns a GeneralContractor schema with required fields", () => {
    const schema = generateOrganizationStructuredData();
    expect(schema["@type"]).toBe("GeneralContractor");
    expect(schema.name).toBe("MH Construction");
    expect(schema.url).toBe("https://mhc-gc.com");
    expect(schema.telephone).toBe("(509) 308-6489");
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });
});

describe("generateProjectStructuredData()", () => {
  it("builds a CreativeWork schema with location and images", () => {
    const schema = generateProjectStructuredData({
      title: "Office Build",
      description: "Commercial project",
      details: { startDate: "2025-01-01", completionDate: "2025-06-01" },
      location: { city: "Pasco", state: "WA" },
      tags: ["commercial"],
      category: "Commercial",
      images: [
        { url: "https://mhc-gc.com/img.jpg", caption: "Front view" },
        { url: "https://mhc-gc.com/img2.jpg" },
      ],
    });
    expect(schema["@type"]).toBe("CreativeWork");
    expect(schema.name).toBe("Office Build");
    expect(schema.image).toHaveLength(2);
    // Second image uses title as caption when none provided
    expect(schema.image[1]!.caption).toBe("Office Build");
  });
});

describe("generateBreadcrumbStructuredData()", () => {
  it("maps breadcrumbs to ListItem elements with 1-based position", () => {
    const schema = generateBreadcrumbStructuredData([
      { name: "Home", url: "https://mhc-gc.com" },
      { name: "Services", url: "https://mhc-gc.com/services" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement[0]!.position).toBe(1);
    expect(schema.itemListElement[1]!.position).toBe(2);
    expect(schema.itemListElement[1]!.name).toBe("Services");
  });
});

describe("generateWebsiteSchema()", () => {
  it("returns a WebSite schema with a SearchAction", () => {
    const schema = generateWebsiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toBe("https://mhc-gc.com");
    expect((schema.potentialAction as any)["@type"]).toBe("SearchAction");
  });
});

describe("generateEnhancedOrganizationSchema()", () => {
  it("extends the base schema with @type array and legalName", () => {
    const schema = generateEnhancedOrganizationSchema();
    expect(Array.isArray(schema["@type"])).toBe(true);
    expect((schema["@type"] as string[]).includes("VeteranOwnedBusiness")).toBe(
      true,
    );
    expect(schema.legalName).toContain("Veteran-Owned");
    expect(Array.isArray(schema.contactPoint)).toBe(true);
  });
});
