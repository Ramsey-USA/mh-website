import { render, screen } from "@testing-library/react";
import { ServicesHero } from "../ServicesHero";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const messages: Record<string, string> = {
      "services.hero.sectionSubtitle": "Services -> Operations",
      "services.hero.sectionTitle": "Construction Services Built on Trust",
      "services.hero.sectionTagline":
        "Transparent planning. Disciplined execution. Trusted results.",
      "services.hero.sectionDescription":
        "Commercial, industrial, and public-sector delivery across Washington, Oregon, and Idaho from our Tri-Cities headquarters.",
    };

    return (key: string) => messages[key] ?? key;
  },
}));

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
    expect(
      screen.getByText("Construction Services Built on Trust"),
    ).toBeInTheDocument();
  });

  it("renders the strategic excellence heading", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(
        "Transparent planning. Disciplined execution. Trusted results.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the Operations breadcrumb text", () => {
    render(<ServicesHero />);
    expect(screen.getByText("Services -> Operations")).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(
        /Commercial, industrial, and public-sector delivery across Washington, Oregon, and Idaho/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the PageNavigation component", () => {
    render(<ServicesHero />);
    expect(screen.getByTestId("page-nav")).toBeInTheDocument();
  });
});
