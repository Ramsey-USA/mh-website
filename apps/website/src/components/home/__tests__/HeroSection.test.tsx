import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import fs from "node:fs";

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

  it("uses the active hero commercial video as the current first-view media", () => {
    const { container } = render(<HeroSection />);

    const heroVideo = screen.getByLabelText(
      /MH Construction homepage hero video highlighting project delivery leadership by Jeremy Thamert/i,
    );
    const videos = container.querySelectorAll("video");

    expect(heroVideo.tagName.toLowerCase()).toBe("video");
    expect(videos).toHaveLength(1);
    const webmSource = container.querySelector('source[type="video/webm"]');
    const mp4Source = container.querySelector('source[type="video/mp4"]');

    // The active commercial can ship as MP4-only; require at least one playable source.
    expect(mp4Source ?? webmSource).not.toBeNull();
    expect(heroVideo).toHaveClass("opacity-100");
    expect(heroVideo).not.toHaveClass("opacity-0");
  });

  it("falls back to the static hero poster when commercial media is unavailable", () => {
    const existsSyncSpy = jest.spyOn(fs, "existsSync");
    existsSyncSpy.mockImplementation((filePath) => {
      const normalized = String(filePath).replace(/\\\\/g, "/");

      if (normalized.endsWith("/config/hero-commercials.json")) {
        return false;
      }

      return true;
    });

    const { container } = render(<HeroSection />);

    const heroImage = screen.getByAltText(
      /MH Construction project leadership and team collaboration/i,
    );

    expect(heroImage).toHaveAttribute("src", "/images/home-hero-poster.webp");
    expect(container.querySelector("video")).toBeNull();

    existsSyncSpy.mockRestore();
  });

  it("renders the service area text", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Tri-Cities HQ \(Pasco, Richland, Kennewick\)/i),
    ).toBeInTheDocument();
  });
});
