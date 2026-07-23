/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { AppShell } from "../AppShell";

const footerSlot = <footer data-testid="site-footer">Footer</footer>;

const JEREMY_STAMP = {
  key: "jeremy-thamert",
  icon: "star" as const,
  stars: 4,
  label: "Four-Star Command Stamp",
  ariaLabel: "Jeremy Thamert individual branding stamp",
};

const mockUsePWA = jest.fn();
const mockUsePathname = jest.fn(() => "/");

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, prefetch: _prefetch, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/hooks/usePWA", () => ({
  usePWA: () => mockUsePWA(),
}));

jest.mock("@/components/layout", () => ({
  Navigation: () => <nav data-testid="site-navigation">Navigation</nav>,
  Footer: () => <footer data-testid="site-footer">Footer</footer>,
  SemiquincentennialBanner: () => (
    <div data-testid="semiquincentennial-banner">250th Anniversary Banner</div>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/ui/cta", () => ({
  EventsHubBanner: () => (
    <aside data-testid="events-hub-banner">Events Hub Banner</aside>
  ),
}));

describe("AppShell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("/");
    Object.defineProperty(globalThis, "scrollY", {
      configurable: true,
      value: 0,
      writable: true,
    });
  });

  it("renders full website shell when not in standalone PWA mode", () => {
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot} jeremyStamp={JEREMY_STAMP}>
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("site-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("events-hub-banner")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /Jeremy leadership ribbon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /Jeremy Thamert individual branding stamp/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /PWA quick actions/i }),
    ).not.toBeInTheDocument();
  });

  it("renders standalone shell with global navigation and quick actions in PWA mode", () => {
    mockUsePWA.mockReturnValue({
      isStandalone: true,
      isInstallable: false,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot}>
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("site-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("events-hub-banner")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /Jeremy leadership ribbon/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /PWA Command Deck/i }),
    ).toHaveAttribute("href", "/hub");
    const quickActionsNav = screen.getByRole("navigation", {
      name: /PWA quick actions/i,
    });
    expect(quickActionsNav).toBeInTheDocument();
    expect(quickActionsNav.closest("header")).toHaveClass("fixed");
    expect(quickActionsNav.closest("header")).toHaveClass(
      "top-[var(--mh-nav-offset, 0px)]",
    );

    expect(
      within(quickActionsNav).getByRole("link", { name: /Hub/i }),
    ).toHaveAttribute("href", "/hub");
    expect(
      within(quickActionsNav).getByRole("link", { name: /Safety/i }),
    ).toHaveAttribute("href", "/safety");
    expect(
      within(quickActionsNav).getByRole("link", { name: /Incident/i }),
    ).toHaveAttribute("href", "/safety/incident-report");
    expect(
      within(quickActionsNav).getByRole("link", { name: /Resources/i }),
    ).toHaveAttribute("href", "/resources");

    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });

  it("places the July banner after hero when a script precedes hero content", async () => {
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot}>
        <>
          <script type="application/ld+json">{"{}"}</script>
          <section data-page-hero="true" data-testid="page-hero">
            Hero
          </section>
          <div>Body</div>
        </>
      </AppShell>,
    );

    const hero = screen.getByTestId("page-hero");
    await waitFor(() => {
      expect(
        (hero.nextElementSibling as HTMLElement | null)?.dataset[
          "semiquincentennialAfterHero"
        ],
      ).toBe("true");
    });

    expect(
      screen.queryByTestId("semiquincentennial-banner"),
    ).not.toBeInTheDocument();

    Object.defineProperty(globalThis, "scrollY", {
      configurable: true,
      value: 200,
      writable: true,
    });
    fireEvent.scroll(globalThis);

    const banner = await screen.findByTestId("semiquincentennial-banner");
    const slotAfterHero = hero.nextElementSibling as HTMLElement | null;
    expect(slotAfterHero).not.toBeNull();
    expect(slotAfterHero?.contains(banner)).toBe(true);
  });

  it("places the global ribbon directly above the footer", () => {
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot}>
        <div>Page Content</div>
      </AppShell>,
    );

    const footer = screen.getByTestId("site-footer");
    const eventsBanner = screen.getByTestId("events-hub-banner");
    const ribbon = screen.getByRole("region", {
      name: /Jeremy leadership ribbon/i,
    });

    expect(ribbon.previousElementSibling).toBe(eventsBanner);
    expect(footer.previousElementSibling).toBe(ribbon);
  });

  it("renders fallback breadcrumb after hero and before semiquincentennial banner", async () => {
    mockUsePathname.mockReturnValue("/about");
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot}>
        <>
          <section data-page-hero="true" data-testid="page-hero">
            Hero
          </section>
          <div>Body</div>
        </>
      </AppShell>,
    );

    const fallbackBreadcrumb = await screen.findByLabelText(
      /breadcrumb navigation/i,
    );
    const hero = screen.getByTestId("page-hero");
    await waitFor(() => {
      expect(
        (hero.nextElementSibling as HTMLElement | null)?.dataset[
          "semiquincentennialAfterHero"
        ],
      ).toBe("true");
    });

    const slotAfterHero = hero.nextElementSibling as HTMLElement | null;
    expect(slotAfterHero).not.toBeNull();
    expect(slotAfterHero?.contains(fallbackBreadcrumb)).toBe(true);
    expect(
      screen.queryByTestId("semiquincentennial-banner"),
    ).not.toBeInTheDocument();

    Object.defineProperty(globalThis, "scrollY", {
      configurable: true,
      value: 200,
      writable: true,
    });
    fireEvent.scroll(globalThis);

    const banner = await screen.findByTestId("semiquincentennial-banner");
    expect(slotAfterHero?.contains(banner)).toBe(true);
    expect(
      fallbackBreadcrumb.compareDocumentPosition(banner) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps fallback breadcrumb after hero on /events while suppressing semiquincentennial banner", async () => {
    mockUsePathname.mockReturnValue("/events");
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell footer={footerSlot}>
        <>
          <section data-page-hero="true" data-testid="events-hero">
            Events Hero
          </section>
          <div>Body</div>
        </>
      </AppShell>,
    );

    const fallbackBreadcrumb = await screen.findByLabelText(
      /breadcrumb navigation/i,
    );
    const hero = screen.getByTestId("events-hero");
    const slotAfterHero = hero.nextElementSibling as HTMLElement | null;

    expect(slotAfterHero).not.toBeNull();
    expect(slotAfterHero?.contains(fallbackBreadcrumb)).toBe(true);
    expect(
      screen.queryByTestId("semiquincentennial-banner"),
    ).not.toBeInTheDocument();
  });

  it("renders the route-specific Jeremy quote from dynamic ribbon keys", () => {
    mockUsePathname.mockReturnValue("/projects/riverfront-retail");
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell
        footer={footerSlot}
        jeremyRibbons={{
          "projects/[slug]": {
            eyebrow: "Words from the General",
            quote: "Project ribbon quote",
            attribution: "Jeremy Thamert, Owner & President",
          },
          default: {
            eyebrow: "Words from the General",
            quote: "Default ribbon quote",
            attribution: "Jeremy Thamert, Owner & President",
          },
        }}
      >
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByText("Project ribbon quote")).toBeInTheDocument();
    expect(screen.queryByText("Default ribbon quote")).not.toBeInTheDocument();
  });

  it("renders default Jeremy quote when route key is not available", () => {
    mockUsePathname.mockReturnValue("/unmapped-route");
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell
        footer={footerSlot}
        jeremyRibbons={{
          about: {
            eyebrow: "Words from the General",
            quote: "About ribbon quote",
            attribution: "Jeremy Thamert, Owner & President",
          },
          default: {
            eyebrow: "Words from the General",
            quote: "Default ribbon quote",
            attribution: "Jeremy Thamert, Owner & President",
          },
        }}
      >
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByText("Default ribbon quote")).toBeInTheDocument();
    expect(screen.queryByText("About ribbon quote")).not.toBeInTheDocument();
  });
});
