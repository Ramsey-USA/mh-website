import { render } from "@testing-library/react";
import { MaterialIcon } from "../MaterialIcon";

describe("MaterialIcon", () => {
  it("applies colorStyle when primaryColor provided and no color class", () => {
    const { container } = render(
      <MaterialIcon icon="home" primaryColor="#ff0000" theme="default" />,
    );
    const span = container.querySelector("span");
    expect(span).toHaveStyle({ color: "#ff0000" });
  });

  it("does not apply colorStyle when primaryColor is absent (falsy branch)", () => {
    const { container } = render(<MaterialIcon icon="home" theme="default" />);
    const span = container.querySelector("span");
    // No inline color style should be set
    expect(span?.style.color).toBeFalsy();
  });

  it("does not apply colorStyle when className already contains a text- color class", () => {
    const { container } = render(
      <MaterialIcon
        icon="home"
        primaryColor="#ff0000"
        className="text-blue-500"
        theme="default"
      />,
    );
    const span = container.querySelector("span");
    expect(span?.style.color).toBeFalsy();
  });

  it("does not apply colorStyle when theme is not default", () => {
    const { container } = render(
      <MaterialIcon icon="home" primaryColor="#ff0000" theme="veteran" />,
    );
    const span = container.querySelector("span");
    expect(span?.style.color).toBeFalsy();
  });
});
