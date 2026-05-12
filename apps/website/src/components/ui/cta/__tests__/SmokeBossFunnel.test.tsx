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

import { SmokeBossFunnel } from "../SmokeBossFunnel";

describe("SmokeBossFunnel", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockUseSmokeBossCampaignStatus.mockReturnValue({
      isMissionComplete: false,
    });
  });

  it("renders event update content while campaign is active", () => {
    render(<SmokeBossFunnel />);

    expect(
      screen.getByRole("heading", {
        name: /Meet the Smoke Boss at Cool Desert Nights/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View Event Briefing/i }),
    ).toHaveAttribute("href", "/events");
  });

  it("does not render after mission complete", () => {
    mockUseSmokeBossCampaignStatus.mockReturnValue({ isMissionComplete: true });
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the mission page route", () => {
    mockUsePathname.mockReturnValue("/cool-desert-nights");
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the events entry route", () => {
    mockUsePathname.mockReturnValue("/events");
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });
});
