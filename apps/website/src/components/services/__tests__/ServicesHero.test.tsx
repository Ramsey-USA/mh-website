import { render, screen } from "@testing-library/react";
import { ServicesHero } from "../ServicesHero";

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => (
    <nav data-testid="page-nav" aria-label="Page navigation" />
  ),
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { services: [] },
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ ariaLabel }: { ariaLabel?: string }) => (
    <span aria-label={ariaLabel} />
  ),
}));

describe("ServicesHero", () => {
  it("renders the section element", () => {
    const { container } = render(<ServicesHero />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders construction services heading", () => {
    render(<ServicesHero />);
    expect(screen.getByText("Construction Services")).toBeInTheDocument();
  });

  it("renders the strategic excellence heading", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText("Your project deserves expert oversight"),
    ).toBeInTheDocument();
  });

  it("renders the Operations breadcrumb text", () => {
    render(<ServicesHero />);
    expect(screen.getByText("Operations → Services")).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(
        /Commercial, industrial, and public-sector delivery across the Pacific Northwest/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the PageNavigation component", () => {
    render(<ServicesHero />);
    expect(screen.getByTestId("page-nav")).toBeInTheDocument();
  });
});
