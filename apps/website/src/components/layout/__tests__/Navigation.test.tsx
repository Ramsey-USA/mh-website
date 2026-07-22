import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { Navigation } from "../Navigation";

const trackClickMock = jest.fn();
const mockPathname = jest.fn(() => "/");
const mockReplace = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
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
  usePathname: () => mockPathname(),
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
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
        "locale.spanish": "Español",
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

jest.mock("@/lib/analytics/hooks", () => ({
  useClickTracking: () => trackClickMock,
}));

jest.mock("@/lib/analytics/components/TrackedContactLinks", () => ({
  TrackedPhoneLink: ({ children, className }: any) => (
    <a href="tel:+15093086489" className={className}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/ui/layout/ThemeToggle", () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

jest.mock("@/components/ui/WaVobBadge", () => ({
  WaVobBadge: () => <span>WA VOB</span>,
}));

describe("Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/");
  });

  it("renders buyer-first desktop primary links and single CTA", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Public Sector" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About MH" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Contact" }).length,
    ).toBeGreaterThan(0);

    const cta = screen.getAllByRole("link", {
      name: "Discuss Your Project",
    })[0];
    expect(cta).toHaveAttribute("href", "/contact?intent=project-discussion");

    expect(
      screen.queryByRole("link", { name: "Podcast" }),
    ).not.toBeInTheDocument();
  });

  it("keeps requested desktop header order and CTA placement", () => {
    render(<Navigation />);

    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    const utils = within(desktopNav);

    const services = utils.getByRole("link", { name: "Services" });
    const projects = utils.getByRole("link", { name: "Projects" });
    const publicSector = utils.getByRole("link", { name: "Public Sector" });
    const about = utils.getByRole("link", { name: "About MH" });
    const contact = utils.getByRole("link", { name: "Contact" });
    const more = utils.getByRole("button", { name: "More" });
    const cta = utils.getByRole("link", { name: "Discuss Your Project" });

    expect(
      services.compareDocumentPosition(projects) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      projects.compareDocumentPosition(publicSector) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      publicSector.compareDocumentPosition(about) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      about.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      contact.compareDocumentPosition(more) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      more.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    expect(cta).toHaveAttribute("href", "/contact?intent=project-discussion");
  });

  it("opens and closes mobile menu and handles Escape", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    const toggle = screen.getByRole("button", {
      name: "Open primary navigation",
    });
    await user.click(toggle);

    expect(screen.getByRole("dialog", { name: "Primary" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: "Primary" }),
    ).not.toBeInTheDocument();
  });

  it("marks active route in both desktop and mobile nav", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/projects");

    render(<Navigation />);

    const desktopActiveLinks = screen.getAllByRole("link", {
      name: "Projects",
      current: "page",
    });
    expect(desktopActiveLinks.length).toBeGreaterThan(0);

    await user.click(
      screen.getByRole("button", { name: "Open primary navigation" }),
    );

    const mobileActiveLinks = screen.getAllByRole("link", {
      name: "Projects",
      current: "page",
    });
    expect(mobileActiveLinks.length).toBeGreaterThan(1);
  });

  it("dispatches analytics event when CTA is clicked", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    const cta = screen.getAllByRole("link", {
      name: "Discuss Your Project",
    })[0];
    expect(cta).toBeDefined();
    await user.click(cta!);

    expect(trackClickMock).toHaveBeenCalledWith(
      "header-primary-cta",
      expect.objectContaining({ href: "/contact?intent=project-discussion" }),
    );
  });
});
