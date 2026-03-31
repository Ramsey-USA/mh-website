import { render, screen } from "@testing-library/react";
import { Input, Textarea } from "../index";

describe("Input", () => {
  it("shows error border and aria-invalid when error is provided", () => {
    render(<Input id="test-input" error="Required field" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("error"),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
  });

  it("shows helper text and valid border when no error", () => {
    render(<Input id="test-input" helperText="Enter your name" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("helper"),
    );
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
  });

  it("has no aria-describedby when neither error nor helperText", () => {
    render(<Input id="test-input" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("renders label when provided", () => {
    render(<Input id="test-input" label="Full Name" />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
  });

  it("uses generated id when no id prop is provided", () => {
    render(<Input label="Auto ID" />);
    expect(screen.getByLabelText("Auto ID")).toBeInTheDocument();
  });
});

describe("Textarea", () => {
  it("shows error border and aria-invalid when error is provided", () => {
    render(<Textarea id="test-ta" error="Required" />);
    const ta = screen.getByRole("textbox");
    expect(ta).toHaveAttribute("aria-invalid", "true");
    expect(ta).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("error"),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("shows helper text and valid border when no error", () => {
    render(<Textarea id="test-ta" helperText="Be descriptive" />);
    const ta = screen.getByRole("textbox");
    expect(ta).not.toHaveAttribute("aria-invalid");
    expect(ta).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("helper"),
    );
    expect(screen.getByText("Be descriptive")).toBeInTheDocument();
  });

  it("has no aria-describedby when neither error nor helperText", () => {
    render(<Textarea id="test-ta" />);
    const ta = screen.getByRole("textbox");
    expect(ta).not.toHaveAttribute("aria-describedby");
    expect(ta).not.toHaveAttribute("aria-invalid");
  });

  it("uses generated id when no id prop is provided", () => {
    render(<Textarea label="Auto ID" />);
    expect(screen.getByLabelText("Auto ID")).toBeInTheDocument();
  });
});
