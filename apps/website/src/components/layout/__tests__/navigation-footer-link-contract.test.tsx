import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "../Navigation";
import Footer from "../Footer";

const trackClickMock = jest.fn();

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/i18n/navigation", () => ({
  __esModule: true,
  Link: ({ children, href, ...props }: any) => (
    <a
      href={typeof href === "string" ? href : "/"}
      onClick={(event) => event.preventDefault()}
      {...props}
    >
      {children}
    </a>
  ),
  usePathname: () => "/",
  useRouter: () => ({
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
}));

jest.mock("@/components/ui/layout/ThemeToggle", () => ({
  ThemeToggle: ({ className }: any) => (
    <button
      type="button"
      aria-label="Switch to light mode"
      className={className}
    >
      Theme toggle
    </button>
  ),
}));

jest.mock("@/components/ui/LanguageToggle", () => ({
  LanguageToggle: ({ className }: any) => (
    <div className={className} aria-label="Language selector">
      <button type="button">EN</button>
      <button type="button">ES</button>
    </div>
  ),
}));

jest.mock("@/hooks/useLocale", () => ({
  useLocale: () => "en",
}));

jest.mock("next-intl", () => ({
  __esModule: true,
  useLocale: () => "en",
  useTranslations:
    () =>
    (key: string): string => {
      const map: Record<string, string> = {
        navLabel: "Primary",
        mobileMenuLabel: "Menu",
        openMenuLabel: "Open primary navigation",
        closeMenuLabel: "Close primary navigation",
        moreLabel: "More",
        ctaLabel: "Discuss Your Project",
        phoneShortcutLabel: "Call",
        brandStatement: "Veteran Owned • Licensed WA OR ID",
        homeAriaLabel: "MH Construction home",
        "utilityBar.utilityLabel": "Utility links",
        "utilityBar.callLabel": "Call",
        "utilityBar.locationLabel": "Serving",
        "utilityBar.contactLinkLabel": "Contact",
        "locale.currentLanguageLabel": "Language",
        "locale.switcherLabel": "Switch language",
        "locale.english": "English",
        "locale.spanish": "Spanish",
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
        "nav.services": "Services",
        "nav.projects": "Projects",
        "nav.publicSector": "Public Sector",
        "nav.about": "About MH",
        "nav.contact": "Contact",
        "nav.events": "Events",
        "nav.resources": "Resources",
        "nav.careers": "Careers",
        "nav.safety": "Safety",
        "nav.tradePartners": "Trade Partners",
        "nav.veterans": "Veterans",
        "nav.team": "Team",
        "nav.podcast": "Podcast",
      };

      return map[key] ?? key;
    },
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/lib/analytics/hooks", () => ({
  useClickTracking: () => trackClickMock,
}));

jest.mock("@/lib/analytics/components/TrackedContactLinks", () => ({
  TrackedPhoneLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a href="tel:+15093086489" {...props}>
      {children}
    </a>
  ),
  TrackedEmailLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a href="mailto:office@mhc-gc.com" {...props}>
      {children}
    </a>
  ),
  TrackedLocationLink: ({
    children,
    trackId,
    trackProperties,
    ...props
  }: any) => (
    <a href="https://www.google.com/maps/search/?api=1" {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/ui/modals/AdminSignInModal", () => ({
  AdminSignInModal: () => null,
}));

describe("Navigation and Footer link contract", () => {
  it("keeps all key internal links wired for navbar, hamburger menu, and footer", async () => {
    process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"] = "1";
    process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"] = "1";

    const user = userEvent.setup();

    const { container } = render(
      <>
        <Navigation />
        <Footer />
      </>,
    );

    await user.click(
      screen.getByRole("button", { name: /open primary navigation/i }),
    );

    const hrefs = new Set(
      Array.from(container.querySelectorAll("a"))
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );

    const expectedInternalLinks = [
      "/",
      "/about",
      "/projects",
      "/events",
      "/team",
      "/jeremy-thamert",
      "/testimonials",
      "/careers",
      "/public-sector",
      "/allies",
      "/veterans",
      "/resources",
      "/news",
      "/faq",
      "/safety",
      "/services",
      "/privacy",
      "/accessibility",
      "/sitemap",
      "/contact?intent=project-discussion",
    ];

    expectedInternalLinks.forEach((href) => {
      expect(hrefs.has(href)).toBe(true);
    });

    expect(
      screen.getAllByRole("link", { name: /about/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /services/i }).length,
    ).toBeGreaterThan(0);

    delete process.env["NEXT_PUBLIC_EVENTS_HUB_INDEXABLE"];
    delete process.env["NEXT_PUBLIC_HTML_SITEMAP_ENABLED"];
  });
});
