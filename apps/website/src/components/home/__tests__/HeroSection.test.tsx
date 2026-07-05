import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

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
    const { container } = render(<HeroSection />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the main heading text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Home\s*->\s*Command Center/i)).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Built on Quality, Backed by Trust\./i),
    ).toBeInTheDocument();
  });

  it("renders the current hero supporting tagline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Straight answers from the Command Center\./i),
    ).toBeInTheDocument();
  });

  it("renders the PageNavigation component", () => {
    render(<HeroSection />);
    expect(screen.getAllByTestId("page-nav")[0]).toBeInTheDocument();
  });

  it("renders the service area text", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Tri-Cities HQ \(Pasco, Richland, Kennewick\)/i),
    ).toBeInTheDocument();
  });
});
