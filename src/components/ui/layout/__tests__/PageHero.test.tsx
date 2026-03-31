import React from "react";
import { render, screen } from "@testing-library/react";
import { PageHero } from "../PageHero";

// Mock MaterialIcon to avoid font loading
jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

// Mock framer motion component
jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe("PageHero", () => {
  const defaultProps = {
    title: "Welcome to MH Construction",
    subtitle: "Building Excellence",
    description: "Your trusted construction partner",
  };

  it("renders without crashing", () => {
    const { container } = render(<PageHero {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it("renders the title", () => {
    render(<PageHero {...defaultProps} />);
    expect(screen.getByText("Welcome to MH Construction")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<PageHero {...defaultProps} />);
    expect(screen.getByText("Building Excellence")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<PageHero {...defaultProps} />);
    expect(
      screen.getByText("Your trusted construction partner"),
    ).toBeInTheDocument();
  });

  it("renders title in an h1", () => {
    render(<PageHero {...defaultProps} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toContain("Welcome to MH Construction");
  });

  it("renders a section element", () => {
    const { container } = render(<PageHero {...defaultProps} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders navigation bar at bottom", () => {
    render(<PageHero {...defaultProps} />);
    // The hero nav has multiple links
    const nav = screen.getAllByRole("navigation");
    expect(nav.length).toBeGreaterThan(0);
  });

  it("renders navigation links", () => {
    render(<PageHero {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
