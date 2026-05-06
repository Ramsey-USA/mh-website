/**
 * Tests for src/app/contact/page.tsx (server component wrapper)
 * Verifies that ContactPage renders the ContactPageClient and StructuredData
 * components without error.
 */

jest.mock("../ContactPageClient", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-page-client" />,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: ({ data }: { data: unknown }) => (
    <script
      data-testid="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ),
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({ "@type": "BreadcrumbList" })),
  breadcrumbPatterns: { contact: {} },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    name: "MH Construction",
    phone: { display: "(509) 308-6489", tel: "+15093086489" },
    email: { main: "office@mhc-gc.com" },
    urls: { site: "https://mhc-gc.com" },
    address: {
      street: "123 Main St",
      city: "Pasco",
      stateCode: "WA",
      zip: "99301",
      country: "US",
      full: "123 Main St, Pasco, WA 99301",
    },
    coordinates: { latitude: 46.2396, longitude: -119.1006 },
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
        logo: "/images/pasco-chamber.png",
        logoWhite: "/images/pasco-chamber-white.png",
      },
      richland: {
        name: "Richland Chamber of Commerce",
        memberDirectoryUrl: "https://richlandchamber.org/test",
        logo: "/images/richland-chamber.png",
        logoWhite: "/images/richland-chamber-white.png",
      },
      triCityRegional: {
        name: "Tri-City Regional Chamber",
        memberDirectoryUrl: "https://tricityregionalchamber.org/test",
        logo: "/images/tri-city-chamber.png",
        logoWhite: "/images/tri-city-chamber-white.png",
      },
    },
  },
}));

import { render, screen } from "@testing-library/react";
import ContactPage from "../page";

// IntersectionObserver is not available in jsdom
if (typeof global.IntersectionObserver === "undefined") {
  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  });
}

describe("ContactPage (server component)", () => {
  it("renders without throwing", () => {
    expect(() => render(<ContactPage />)).not.toThrow();
  });

  it("renders the ContactPageClient", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-page-client")).toBeInTheDocument();
  });

  it("renders two StructuredData blocks (breadcrumb + GeneralContractor)", () => {
    render(<ContactPage />);
    const scripts = screen.getAllByTestId("structured-data");
    expect(scripts).toHaveLength(2);
  });

  it("includes GeneralContractor schema with correct @type", () => {
    render(<ContactPage />);
    const scripts = screen.getAllByTestId("structured-data");
    const schemas = scripts.map((s) =>
      JSON.parse(
        s.getAttribute("data-testid") === "structured-data"
          ? (s as HTMLScriptElement).innerHTML
          : "{}",
      ),
    );
    // One of the schemas should be GeneralContractor
    const gcSchema = schemas.find((s) => s["@type"] === "GeneralContractor");
    expect(gcSchema).toBeDefined();
    expect(gcSchema.name).toBe("MH Construction");
  });
});
