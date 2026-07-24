/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

const mockUsePathname = jest.fn();
const mockUseSmokeBossCampaignStatus = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/hooks", () => ({
  useSmokeBossCampaignStatus: () => mockUseSmokeBossCampaignStatus(),
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

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <button className={className}>{children}</button>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

import { SmokeBossFunnel } from "../EventsHubBanner";

describe("SmokeBossFunnel", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockUseSmokeBossCampaignStatus.mockReturnValue({
      isMissionComplete: false,
    });
  });

  it("renders BBQ contest content while campaign is active", () => {
    render(<SmokeBossFunnel />);

    expect(
      screen.getByRole("heading", {
        name: /Pacific Northwest Annual BBQ Competition/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View BBQ Contest/i }),
    ).toHaveAttribute("href", "/events/bbq-contest");
  });

  it("does not render after campaign completion", () => {
    mockUseSmokeBossCampaignStatus.mockReturnValue({ isMissionComplete: true });
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the BBQ contest route", () => {
    mockUsePathname.mockReturnValue("/events/bbq-contest");
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the Cool Desert Nights event route", () => {
    mockUsePathname.mockReturnValue("/events/cool-desert-nights");
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the events entry route", () => {
    mockUsePathname.mockReturnValue("/events");
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });
});
