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
  it("renders the service area hub and location cards", () => {
    const { default: LocationsPage } = require("../page") as {
      default: React.ComponentType;
    };

    render(<LocationsPage />);

    expect(
      screen.getByRole("heading", {
        name: /regional coverage built for local decisions/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review pasco market/i }),
    ).toHaveAttribute("href", "/locations/pasco");
  });
});
