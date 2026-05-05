/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { HubCard } from "../HubCard";
import type { HubCardDefinition } from "@/lib/hub/cards";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-testid={`icon-${icon}`}>{icon}</span>
  ),
}));

jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return { __esModule: true, default: MockLink };
});

const card: HubCardDefinition = {
  title: "Field Forms",
  subtitle: "Toolbox talks, JHA, inspections, and safety forms",
  href: "/resources",
  icon: "description",
  badge: "Role-Gated Downloads",
};

describe("HubCard", () => {
  it("renders the card title, subtitle, badge, and link", () => {
    render(<HubCard card={card} />);

    expect(screen.getByText("Field Forms")).toBeInTheDocument();
    expect(
      screen.getByText("Toolbox talks, JHA, inspections, and safety forms"),
    ).toBeInTheDocument();
    expect(screen.getByText("Role-Gated Downloads")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/resources");
  });

  it("renders the icon supplied by the card definition", () => {
    render(<HubCard card={card} />);
    expect(screen.getByTestId("icon-description")).toBeInTheDocument();
  });

  it("applies primary accent styling by default", () => {
    render(<HubCard card={card} />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("hover:border-brand-primary/40");
  });

  it("applies secondary accent styling when requested", () => {
    render(<HubCard card={card} accent="secondary" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("hover:border-brand-secondary/50");
  });
});
