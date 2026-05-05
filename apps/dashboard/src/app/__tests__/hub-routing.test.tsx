/**
 * @jest-environment jsdom
 *
 * Operations Hub page routing tests — dashboard app
 */

import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

describe("Operations Hub page routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.localStorage.clear();
  });

  it("keeps Incident Reporting card mapped to direct incident entry route", () => {
    const { default: HubPage } = require("../hub/page") as {
      default: React.ComponentType;
    };

    render(<HubPage />);

    const incidentCard = screen.getByRole("link", {
      name: /Incident Reporting/i,
    });

    expect(incidentCard).toHaveAttribute("href", "/safety/incident-report");
  });

  it("keeps Employee Handbook card mapped to placeholder route", () => {
    const { default: HubPage } = require("../hub/page") as {
      default: React.ComponentType;
    };

    render(<HubPage />);

    const handbookCard = screen.getByRole("link", {
      name: /Employee Handbook/i,
    });

    expect(handbookCard).toHaveAttribute("href", "/employee-handbook");
  });
});
