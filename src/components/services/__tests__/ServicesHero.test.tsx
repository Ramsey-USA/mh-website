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

  it("renders The Battle Plan heading", () => {
    render(<ServicesHero />);
    expect(screen.getByText("The Battle Plan")).toBeInTheDocument();
  });

  it("renders the strategic excellence heading", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText("Strategic Construction Excellence"),
    ).toBeInTheDocument();
  });

  it("renders the Operations breadcrumb text", () => {
    render(<ServicesHero />);
    expect(screen.getByText("Operations → Services")).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(/Building projects for the client/i),
    ).toBeInTheDocument();
  });

  it("renders the PageNavigation component", () => {
    render(<ServicesHero />);
    expect(screen.getByTestId("page-nav")).toBeInTheDocument();
  });
});
