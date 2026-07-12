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

  it("renders event update content while campaign is active", () => {
    render(<SmokeBossFunnel />);

    expect(
      screen.getByRole("heading", {
        name: /Explore Sponsored and Hosted Events/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Explore Events Hub/i }),
    ).toHaveAttribute("href", "/events");
  });

  it("does not render after campaign completion", () => {
    mockUseSmokeBossCampaignStatus.mockReturnValue({ isMissionComplete: true });
    const { container } = render(<SmokeBossFunnel />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on the featured event route", () => {
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
