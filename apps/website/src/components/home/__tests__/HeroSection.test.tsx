import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

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

  it("renders primary and secondary hero actions", () => {
    render(<HeroSection />);

    const contactLink = screen.getByRole("link", {
      name: /start a project conversation/i,
    });
    const projectsLink = screen.getByRole("link", {
      name: /view project proof/i,
    });

    expect(contactLink).toHaveAttribute("href", "/contact");
    expect(projectsLink).toHaveAttribute("href", "/projects");
  });

  it("uses the static hero poster as the current first-view media", () => {
    const { container } = render(<HeroSection />);

    const heroImage = screen.getByAltText(
      /MH Construction project leadership and team collaboration/i,
    );

    expect(heroImage).toHaveAttribute("src", "/images/home-hero-poster.webp");
    expect(container.querySelector("video")).toBeNull();
  });

  it("renders the service area text", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Tri-Cities HQ \(Pasco, Richland, Kennewick\)/i),
    ).toBeInTheDocument();
  });
});
