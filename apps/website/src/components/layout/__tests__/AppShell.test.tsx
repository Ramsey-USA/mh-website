/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { AppShell } from "../AppShell";

const mockUsePWA = jest.fn();

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
  SmokeBossFunnel: () => (
    <aside data-testid="smoke-boss-funnel">Smoke Boss Funnel</aside>
  ),
}));

describe("AppShell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders full website shell when not in standalone PWA mode", () => {
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell>
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("site-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("semiquincentennial-banner")).toBeInTheDocument();
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
      <AppShell>
        <div>Page Content</div>
      </AppShell>,
    );

    expect(screen.getByTestId("site-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("semiquincentennial-banner")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /PWA Command Deck/i }),
    ).toHaveAttribute("href", "/hub");
    const quickActionsNav = screen.getByRole("navigation", {
      name: /PWA quick actions/i,
    });
    expect(quickActionsNav).toBeInTheDocument();

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

  it("places the event funnel after hero when a script precedes hero content", async () => {
    mockUsePWA.mockReturnValue({
      isStandalone: false,
      isInstallable: true,
      isIOS: false,
    });

    render(
      <AppShell>
        <>
          <script type="application/ld+json">{"{}"}</script>
          <section data-page-hero="true" data-testid="page-hero">
            Hero
          </section>
          <div>Body</div>
        </>
      </AppShell>,
    );

    const funnel = await screen.findByTestId("smoke-boss-funnel");
    const hero = screen.getByTestId("page-hero");
    const slotAfterHero = hero.nextElementSibling as HTMLElement | null;

    expect(slotAfterHero).not.toBeNull();
    expect(slotAfterHero?.contains(funnel)).toBe(true);
  });
});
