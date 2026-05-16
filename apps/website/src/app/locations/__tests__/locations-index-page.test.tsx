/** @jest-environment jsdom */

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/navigation/Breadcrumbs", () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs" />,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (asChild ? children : <button>{children}</button>),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: () => <span aria-hidden="true" />,
}));

import { render, screen } from "@testing-library/react";

describe("Locations index page", () => {
  it("renders the service area hub and location cards", async () => {
    const { default: LocationsPage } = require("../page") as {
      default: () => Promise<React.ReactElement>;
    };

    const page = await LocationsPage();
    render(page);

    expect(
      await screen.findByRole("heading", {
        name: /regional coverage built for local decisions/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review pasco market/i }),
    ).toHaveAttribute("href", "/locations/pasco");
  });
});
