import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

const mockLocale = jest.fn<"en" | "es", []>(() => "en");

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

jest.mock("@/i18n/navigation", () => ({
  __esModule: true,
  Link: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("next-intl", () => ({
  __esModule: true,
  useLocale: () => mockLocale(),
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      const map: Record<string, string> = {
        "siteFooter.homeAriaLabel": "MH Construction home",
        "siteFooter.brandDescriptor":
          "Veteran-owned general contractor serving Washington, Oregon, and Idaho.",
        "siteFooter.veteranOwnedLabel": "Veteran Owned",
        "siteFooter.ctaLabel": "Discuss Your Project",
        "siteFooter.servicesMarketsHeading": "Services & Markets",
        "siteFooter.companyProofHeading": "Company & Proof",
        "siteFooter.resourcesCommunityHeading": "Resources & Community",
        "siteFooter.contactHeading": "Contact & Service Area",
        "siteFooter.contactDescriptor":
          "Based in Pasco, Washington with service coverage across Washington, Oregon, and Idaho.",
        "siteFooter.phoneLabel": "Phone",
        "siteFooter.emailLabel": "Email",
        "siteFooter.addressLabel": "Office",
        "siteFooter.serviceAreaLabel": "Service area",
        "siteFooter.primaryRegionLabel": "Primary region",
        "siteFooter.legalNavLabel": "Legal",
        "siteFooter.htmlSitemapLabel": "HTML Sitemap",
        "siteFooter.copyrightLabel": "All rights reserved.",
        "siteFooterEs.homeAriaLabel": "Inicio de MH Construction",
        "siteFooterEs.brandDescriptor":
          "Contratista general de propiedad veterana que atiende Washington, Oregon e Idaho.",
        "siteFooterEs.veteranOwnedLabel": "Empresa veterana",
        "siteFooterEs.ctaLabel": "Hablemos de su proyecto",
        "siteFooterEs.servicesMarketsHeading": "Servicios y Mercados",
        "siteFooterEs.companyProofHeading": "Empresa y Confianza",
        "siteFooterEs.resourcesCommunityHeading": "Recursos y Comunidad",
        "siteFooterEs.contactHeading": "Contacto y Cobertura",
        "siteFooterEs.contactDescriptor":
          "Con sede en Pasco, Washington y cobertura de servicio en Washington, Oregon e Idaho.",
        "siteFooterEs.phoneLabel": "Teléfono",
        "siteFooterEs.emailLabel": "Correo",
        "siteFooterEs.addressLabel": "Oficina",
        "siteFooterEs.serviceAreaLabel": "Área de servicio",
        "siteFooterEs.primaryRegionLabel": "Región principal",
        "siteFooterEs.legalNavLabel": "Legal",
        "siteFooterEs.htmlSitemapLabel": "Mapa HTML",
        "siteFooterEs.copyrightLabel": "Todos los derechos reservados.",
      };

      const scopedNamespace =
        mockLocale() === "es" ? "siteFooterEs" : namespace;
      return map[`${scopedNamespace}.${key}`] ?? key;
    },
}));

describe("Footer", () => {
  const originalHtmlSitemap = process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"];
  const originalEventsHub = process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocale.mockReturnValue("en");
    delete process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"];
    delete process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];
  });

  afterAll(() => {
    process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] = originalHtmlSitemap;
    process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] = originalEventsHub;
  });

  it("renders the concise buyer, trust, and wayfinding footer", () => {
    render(<Footer />);

    expect(
      screen.getByRole("heading", { name: "Services & Markets" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Company & Proof" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Resources & Community" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Contact & Service Area" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Discuss Your Project" }),
    ).toHaveAttribute("href", "/contact?intent=project-discussion");
    expect(screen.queryByText(/newsletter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/accreditations/i)).not.toBeInTheDocument();
  });

  it("renders verified contact details and current year without HTML sitemap by default", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: "(509) 308-6489" }),
    ).toHaveAttribute("href", "tel:+15093086489");
    expect(
      screen.getByRole("link", { name: "office@mhc-gc.com" }),
    ).toHaveAttribute("href", "mailto:office@mhc-gc.com");
    expect(screen.getByText("3111 N Capitol Ave")).toBeVisible();
    expect(screen.getByText("Pasco, WA 99301")).toBeVisible();
    expect(
      screen.getByText(String(new Date().getFullYear()), { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "HTML Sitemap" }),
    ).not.toBeInTheDocument();
  });

  it("renders localized Spanish copy", () => {
    mockLocale.mockReturnValue("es");

    render(<Footer />);

    expect(
      screen.getByRole("heading", { name: "Servicios y Mercados" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Contacto y Cobertura" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Hablemos de su proyecto" }),
    ).toBeVisible();
    expect(screen.getByText("Empresa veterana")).toBeVisible();
    expect(screen.getByRole("link", { name: "Privacidad" })).toBeVisible();
  });

  it("shows HTML sitemap only when explicitly enabled", () => {
    process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] = "1";

    render(<Footer />);

    expect(screen.getByRole("link", { name: "HTML Sitemap" })).toHaveAttribute(
      "href",
      "/sitemap",
    );
  });
});
