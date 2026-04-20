/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { AppShell } from "../AppShell";

const mockUsePWA = jest.fn();

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
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
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
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
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /PWA quick actions/i }),
    ).not.toBeInTheDocument();
  });

  it("renders slim standalone shell with quick actions and trust link in PWA mode", () => {
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

    expect(screen.queryByTestId("site-navigation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("site-footer")).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Operations Hub/i }),
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

    expect(
      screen.getByRole("link", { name: /Safety Credentials/i }),
    ).toHaveAttribute("href", "/safety");
    expect(
      screen.getByText(/Veteran-Owned Since January 2025/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
