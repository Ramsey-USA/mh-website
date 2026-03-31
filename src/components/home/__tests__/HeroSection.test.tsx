import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

jest.mock("@/components/icons/AmericanFlag", () => ({
  AmericanFlag: () => <div data-testid="american-flag" />,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => (
    <nav data-testid="page-nav" aria-label="Page navigation" />
  ),
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { home: [] },
}));

describe("HeroSection", () => {
  it("renders the section element", () => {
    render(<HeroSection />);
    // The outer element should be a <section>
    const { container } = render(<HeroSection />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the main heading text", () => {
    render(<HeroSection />);
    expect(
      screen.getAllByText(/Founded 2010, Veteran-Owned Since 2025/i)[0],
    ).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<HeroSection />);
    expect(
      screen.getAllByText(/Building projects for the Client/i)[0],
    ).toBeInTheDocument();
  });

  it("renders the American Flag icon", () => {
    render(<HeroSection />);
    expect(screen.getAllByTestId("american-flag")[0]).toBeInTheDocument();
  });

  it("renders the PageNavigation component", () => {
    render(<HeroSection />);
    expect(screen.getAllByTestId("page-nav")[0]).toBeInTheDocument();
  });

  it("renders the service area text", () => {
    render(<HeroSection />);
    expect(
      screen.getAllByText(/Serving Tri-Cities, Yakima, Spokane/i)[0],
    ).toBeInTheDocument();
  });
});
