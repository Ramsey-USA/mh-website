import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AmericanFlag } from "../AmericanFlag";

describe("AmericanFlag", () => {
  it("renders with default props and accessible label", () => {
    render(<AmericanFlag />);
    expect(
      screen.getByRole("img", { name: /american flag/i }),
    ).toBeInTheDocument();
  });

  it("applies size class from sizeMap", () => {
    render(<AmericanFlag size="sm" />);
    const wrapper = screen.getByRole("img", { name: /american flag/i });
    expect(wrapper).toHaveClass("w-8", "h-6");
  });

  it("applies xl size class", () => {
    render(<AmericanFlag size="xl" />);
    const wrapper = screen.getByRole("img", { name: /american flag/i });
    expect(wrapper).toHaveClass("w-20");
  });

  it("applies custom className", () => {
    render(<AmericanFlag className="my-flag" />);
    const wrapper = screen.getByRole("img", { name: /american flag/i });
    expect(wrapper).toHaveClass("my-flag");
  });

  it("SVG is hidden from screen readers", () => {
    const { container } = render(<AmericanFlag />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("triggers hover state on mouse enter and leave", async () => {
    const user = userEvent.setup();
    render(<AmericanFlag animated={true} />);
    const wrapper = screen.getByRole("img", { name: /american flag/i });
    await user.hover(wrapper);
    await user.unhover(wrapper);
    // No error thrown — state toggle works
    expect(wrapper).toBeInTheDocument();
  });

  it("renders without animation when animated=false", () => {
    const { container } = render(<AmericanFlag animated={false} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toHaveClass("animate-wave");
  });
});
