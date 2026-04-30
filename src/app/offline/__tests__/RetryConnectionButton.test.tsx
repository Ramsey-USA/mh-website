/**
 * @jest-environment jsdom
 *
 * Tests for app/offline/RetryConnectionButton.tsx
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { RetryConnectionButton } from "../RetryConnectionButton";

describe("RetryConnectionButton", () => {
  // jsdom does not implement navigation; suppress the expected console error
  // so it doesn't pollute test output.
  let navErrorSpy: jest.SpyInstance;
  beforeEach(() => {
    navErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation((...args: unknown[]) => {
        if (
          typeof args[0] === "string" &&
          args[0].includes("Not implemented: navigation")
        )
          return;
      });
  });
  afterEach(() => {
    navErrorSpy.mockRestore();
  });

  it("renders a button with 'Retry Connection' text", () => {
    render(<RetryConnectionButton />);
    expect(
      screen.getByRole("button", { name: /retry connection/i }),
    ).toBeInTheDocument();
  });

  it("has type='button' to avoid accidental form submission", () => {
    render(<RetryConnectionButton />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("calls window.location.reload() when clicked (does not throw)", () => {
    render(<RetryConnectionButton />);
    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
  });

  it("renders a refresh SVG icon inside the button", () => {
    const { container } = render(<RetryConnectionButton />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
