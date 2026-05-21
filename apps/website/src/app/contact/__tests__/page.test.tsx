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
    phone: { tel: "+15093086489" },
    email: { main: "office@mhc-gc.com" },
    urls: { site: "https://mhc-gc.com" },
    bbb: {
      sealClickUrl:
        "https://www.bbb.org/us/wa/pasco/profile/general-contractor/mh-construction-inc-1296-1000169655",
      sealHorizontal: "/images/badges/BBB-h.webp",
      sealHorizontalWhite: "/images/badges/BBB-h-w.webp",
    },
    travelers: {
      website: "https://www.travelers.com",
      logo: "/images/logos/travelers-logo.webp",
      logoWhite: "/images/logos/travelers-logo-white.webp",
    },
    chambers: {
      pasco: {
        website: "https://www.pascochamber.org",
        logo: "/images/logos/Pasco-Chamber.webp",
      },
      richland: {
        website: "https://www.richlandchamber.org",
        logo: "/images/logos/Richland-Chamber.webp",
      },
      triCityRegional: {
        website: "https://www.tricityregionalchamber.com",
        logo: "/images/logos/Tri-City-Regional-Chamber.webp",
      },
    },
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

jest.mock("next/headers", () => ({
  __esModule: true,
  headers: jest.fn(async () => ({
    get: () => "",
  })),
}));

import { render, screen } from "@testing-library/react";
import ContactPage from "../page";

describe("ContactPage (server component)", () => {
  async function renderPage() {
    const ui = await ContactPage();
    render(ui);
  }

  it("renders without throwing", async () => {
    await expect(renderPage()).resolves.toBeUndefined();
  });

  it("renders the ContactPageClient", async () => {
    await renderPage();
    expect(screen.getByTestId("contact-page-client")).toBeInTheDocument();
  });

  it("renders two StructuredData blocks (breadcrumb + GeneralContractor)", async () => {
    await renderPage();
    const scripts = screen.getAllByTestId("structured-data");
    expect(scripts).toHaveLength(2);
  });

  it("includes GeneralContractor schema with correct @type", async () => {
    await renderPage();
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
