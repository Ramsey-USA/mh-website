import { render, screen } from "@testing-library/react";
import { ServicesHero } from "../ServicesHero";

describe("ServicesHero", () => {
  it("renders the governed enterprise hero and capability proof", () => {
    const { container } = render(<ServicesHero />);

    expect(
      container.querySelector(".enterprise-route-hero"),
    ).toBeInTheDocument();
    expect(container.querySelector(".enterprise-proof-bar")).toBeInTheDocument();
  });

  it("renders the enterprise services heading", () => {
    render(<ServicesHero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "One delivery system. Full accountability.",
      }),
    ).toBeInTheDocument();
  });

  it("renders the approved primary and supporting slogans", () => {
    render(<ServicesHero heroSlogan="Controlled supporting slogan." />);

    expect(
      screen.getByText("Built on Quality, Backed by Trust."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Controlled supporting slogan."),
    ).toBeInTheDocument();
  });

  it("renders the project briefing and proof actions", () => {
    render(<ServicesHero />);

    expect(
      screen.getByRole("link", { name: "Start a scope briefing" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Review project proof" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("renders the controlled delivery proof labels", () => {
    render(<ServicesHero />);

    expect(
      screen.getByText("Scope, risk, and constructability"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Production, safety, and quality"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cost, schedule, and change")).toBeInTheDocument();
    expect(
      screen.getByText("Turnover and audit-ready record"),
    ).toBeInTheDocument();
  });
});
