import { render, screen } from "@testing-library/react";
import { MaterialIcon } from "../MaterialIcon";

describe("MaterialIcon", () => {
  it("renders without crashing", () => {
    const { container } = render(<MaterialIcon icon="home" />);
    expect(container).toBeTruthy();
  });

  it("renders the icon name as text content", () => {
    render(<MaterialIcon icon="star" />);
    expect(screen.getByText("star")).toBeInTheDocument();
  });

  it("accepts name via icon prop and renders it", () => {
    render(<MaterialIcon icon="settings" />);
    expect(screen.getByText("settings")).toBeInTheDocument();
  });

  it("applies material-icons class", () => {
    const { container } = render(<MaterialIcon icon="home" />);
    const span = container.querySelector("span");
    expect(span?.className).toContain("material-icons");
  });

  it("is aria-hidden by default (decorative)", () => {
    const { container } = render(<MaterialIcon icon="home" />);
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("aria-hidden", "true");
  });

  it("sets aria-hidden false when ariaLabel provided", () => {
    const { container } = render(
      <MaterialIcon icon="home" ariaLabel="Go to home" />,
    );
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("aria-hidden", "false");
    expect(span).toHaveAttribute("aria-label", "Go to home");
  });

  it("defaults size to md", () => {
    const { container } = render(<MaterialIcon icon="home" />);
    const span = container.querySelector("span");
    // md maps to 30px in sizeMap
    expect(span?.style.fontSize).toBe("30px");
  });

  it("applies sm size correctly", () => {
    const { container } = render(<MaterialIcon icon="home" size="sm" />);
    const span = container.querySelector("span");
    expect(span?.style.fontSize).toBe("24px");
  });

  it("applies lg size correctly", () => {
    const { container } = render(<MaterialIcon icon="home" size="lg" />);
    const span = container.querySelector("span");
    expect(span?.style.fontSize).toBe("36px");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MaterialIcon icon="home" className="text-red-500" />,
    );
    const span = container.querySelector("span");
    expect(span?.className).toContain("text-red-500");
  });

  it("has displayName MaterialIcon", () => {
    expect(MaterialIcon.displayName).toBe("MaterialIcon");
  });
});
