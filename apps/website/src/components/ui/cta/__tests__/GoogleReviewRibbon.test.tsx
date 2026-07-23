/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

import { GoogleReviewRibbon } from "../GoogleReviewRibbon";

describe("GoogleReviewRibbon", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders on public marketing routes", () => {
    render(<GoogleReviewRibbon />);

    expect(
      screen.getByRole("complementary", { name: /Google review request/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Leave a Google review/i }),
    ).toHaveAttribute("href", "https://g.page/r/CVdv3YZLzJvdEAE/review");
  });

  it("does not render on testimonials where review CTAs already exist", () => {
    mockUsePathname.mockReturnValue("/testimonials");
    const { container } = render(<GoogleReviewRibbon />);

    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on safety routes", () => {
    mockUsePathname.mockReturnValue("/safety/incident-report");
    const { container } = render(<GoogleReviewRibbon />);

    expect(container).toBeEmptyDOMElement();
  });
});
