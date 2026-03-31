/**
 * Tests for src/app/contact/page.tsx (server component wrapper)
 * Verifies that ContactPage renders the ContactPageClient and StructuredData
 * components without error.
 */

jest.mock("@/app/contact/ContactPageClient", () => ({
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
    phone: { tel: "+15093086489" },
    email: { main: "office@mhc-gc.com" },
    urls: { site: "https://mhc-gc.com" },
    address: {
      street: "123 Main St",
      city: "Pasco",
      stateCode: "WA",
      zip: "99301",
      country: "US",
    },
    coordinates: { latitude: 46.2396, longitude: -119.1006 },
  },
}));

import { render, screen } from "@testing-library/react";
import ContactPage from "../page";

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
