/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => {
    const strings: Record<string, string> = {
      "offlinePage.eyebrow": "Connection Status",
      "offlinePage.title": "Offline Hub",
      "offlinePage.highlight": "You are offline",
      "offlinePage.description":
        "Critical resources remain available from cache while connectivity is restored.",
      "offlinePage.cachedNotice": "Cached project resources remain available.",
      "offlinePage.offlineBody":
        "You're offline, but the app is still available from cache.",
      "offlinePage.availableOffline": "Available offline",
      "offlinePage.goHome": "Go Home",
      "offlinePage.footer": "MH Construction, Inc. · Offline mode active",
    };

    const t = ((key: string) => strings[key] ?? key) as ((
      key: string,
    ) => string) & {
      raw: (key: string) => string[];
    };
    t.raw = (key: string) =>
      key === "offlinePage.features" ? ["Previously loaded pages"] : [];

    return t;
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("../RetryConnectionButton", () => ({
  RetryConnectionButton: () => <button type="button">Retry Connection</button>,
}));

import OfflinePage from "../page";

describe("OfflinePage", () => {
  it("renders the offline heading", async () => {
    render(await OfflinePage());
    expect(screen.getByText(/Offline Hub/i)).toBeInTheDocument();
  });

  it("renders the Go Home link", async () => {
    render(await OfflinePage());
    expect(screen.getByRole("link", { name: /Go Home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the Retry Connection button", async () => {
    render(await OfflinePage());
    expect(
      screen.getByRole("button", { name: /Retry Connection/i }),
    ).toBeInTheDocument();
  });

  it("Retry Connection button click executes without error", async () => {
    const user = userEvent.setup();
    render(await OfflinePage());
    await expect(
      user.click(screen.getByRole("button", { name: /Retry Connection/i })),
    ).resolves.toBeUndefined();
  });
});
