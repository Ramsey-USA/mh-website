import { render, screen } from "@testing-library/react";
import { SkipLink } from "../SkipLink";

describe("SkipLink", () => {
  it("renders without crashing", () => {
    const { container } = render(<SkipLink />);
    expect(container).toBeTruthy();
  });

  it("renders a link element", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("href points to #main-content", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("has visible text for screen readers", () => {
    render(<SkipLink />);
    const link = screen.getByText(/skip to main content/i);
    expect(link).toBeInTheDocument();
  });

  it("has skip-link class", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("skip-link");
  });
});
