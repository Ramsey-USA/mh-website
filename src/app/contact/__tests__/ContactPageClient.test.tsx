import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactPageClient from "../ContactPageClient";

function getLinkByHref(href: string) {
  const match = screen
    .getAllByRole("link")
    .find((link) => link.getAttribute("href") === href);

  expect(match).toBeDefined();
  return match as HTMLAnchorElement;
}

function getLinkByHrefContaining(fragment: string) {
  const match = screen
    .getAllByRole("link")
    .find((link) => link.getAttribute("href")?.includes(fragment));

  expect(match).toBeDefined();
  return match as HTMLAnchorElement;
}

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: ({ pageName }: { pageName: string }) => (
    <div>Tracking: {pageName}</div>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, ariaLabel }: { icon: string; ariaLabel?: string }) => (
    <span aria-label={ariaLabel}>{icon}</span>
  ),
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: ({ items }: { items: Array<{ label: string }> }) => (
    <div>Page nav items: {items.length}</div>
  ),
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: ({ items }: { items: Array<{ label: string }> }) => (
    <nav>{items.map((item) => item.label).join(" / ")}</nav>
  ),
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: {
    contact: [{ label: "Quick Contact" }, { label: "Service Areas" }],
  },
}));

jest.mock("@/lib/styles/layout-variants", () => ({
  gridPresets: {
    twoColumn: () => "two-column-grid",
    cards3: () => "cards-grid",
  },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    phone: { display: "(509) 555-0100", tel: "+15095550100" },
    email: { main: "office@mhc-gc.com" },
    address: { full: "3111 N Capitol Ave, Pasco, WA 99301" },
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
  },
}));

describe("ContactPageClient", () => {
  it("renders the hero, quick contact cards, and partnership CTAs with the correct links", () => {
    render(<ContactPageClient />);

    expect(screen.getByText("Tracking: Contact")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /your project. our expertise. let's connect./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Page nav items: 2")).toBeInTheDocument();
    expect(screen.getByText("Home / Introductions")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /call mh construction at \(509\) 555-0100/i,
      }),
    ).toHaveAttribute("href", "tel:+15095550100");
    expect(
      screen.getByRole("link", { name: /send email to mh construction/i }),
    ).toHaveAttribute("href", "mailto:office@mhc-gc.com");
    expect(
      getLinkByHrefContaining("google.com/maps/search/?api=1&query="),
    ).toHaveAccessibleName(
      /get directions to mh construction office in pasco, wa/i,
    );
    expect(
      getLinkByHrefContaining("google.com/maps/search/?api=1&query="),
    ).toHaveAttribute(
      "href",
      expect.stringContaining(
        "https://www.google.com/maps/search/?api=1&query=3111%20N%20Capitol%20Ave%2C%20Pasco%2C%20WA%2099301",
      ),
    );

    expect(screen.getByText("Call Now")).toBeInTheDocument();
    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getAllByText("Get Directions").length).toBeGreaterThanOrEqual(
      2,
    );

    expect(getLinkByHref("/contact")).toHaveAccessibleName(/contact us today/i);
    expect(getLinkByHref("/services")).toHaveAccessibleName(
      /explore services/i,
    );
    expect(getLinkByHref("/allies")).toHaveAccessibleName(
      /apply as approved vendor/i,
    );
    expect(getLinkByHref("/allies#benefits")).toHaveAccessibleName(
      /view ally benefits/i,
    );
  });

  it("renders the strategic CTA cards and service area links", () => {
    render(<ContactPageClient />);

    expect(
      screen.getByRole("link", {
        name: /explore construction services and solutions/i,
      }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", {
        name: /view completed projects and partnerships/i,
      }),
    ).toHaveAttribute("href", "/projects");
    expect(
      screen.getByRole("link", {
        name: /meet the mh construction partnership team/i,
      }),
    ).toHaveAttribute("href", "/team");
    expect(
      screen.getByRole("link", {
        name: /explore career opportunities at mh construction/i,
      }),
    ).toHaveAttribute("href", "/careers");

    expect(getLinkByHref("/locations/pasco")).toHaveAccessibleName(
      /pasco, wa/i,
    );
    expect(getLinkByHref("/locations/kennewick")).toHaveAccessibleName(
      /kennewick, wa/i,
    );
    expect(
      getLinkByHref(
        "https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301",
      ),
    ).toHaveAccessibleName(
      /get directions to mh construction office in pasco, washington/i,
    );
    expect(
      screen.getByTitle(
        "MH Construction Office Location - 3111 N Capitol Ave, Pasco, WA 99301",
      ),
    ).toBeInTheDocument();
  });
});
