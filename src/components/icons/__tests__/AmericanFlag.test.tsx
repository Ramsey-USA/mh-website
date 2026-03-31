import { render, screen } from "@testing-library/react";
import { AmericanFlag } from "../AmericanFlag";

describe("AmericanFlag", () => {
  it("renders without crashing", () => {
    const { container } = render(<AmericanFlag />);
    expect(container).toBeTruthy();
  });

  it("renders an SVG element", () => {
    const { container } = render(<AmericanFlag />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("SVG has viewBox attribute", () => {
    const { container } = render(<AmericanFlag />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox");
  });

  it("has role=img on wrapper", () => {
    const { container } = render(<AmericanFlag />);
    const wrapper = container.querySelector('[role="img"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<AmericanFlag />);
    const flag = screen.getByRole("img");
    expect(flag).toHaveAttribute("aria-label");
    expect(flag.getAttribute("aria-label")).toContain("American Flag");
  });

  it("renders 13 stripes (rect elements for stripes)", () => {
    const { container } = render(<AmericanFlag animated={false} />);
    // 13 stripe rects + 1 blue canton rect = 14 rects
    const rects = container.querySelectorAll("svg rect");
    expect(rects.length).toBeGreaterThanOrEqual(13);
  });

  it("accepts size prop without crashing", () => {
    const { container } = render(<AmericanFlag size="sm" />);
    expect(container).toBeTruthy();
  });

  it("accepts animated=false prop", () => {
    const { container } = render(<AmericanFlag animated={false} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
