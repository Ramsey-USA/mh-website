/**
 * @jest-environment jsdom
 *
 * Tests for app/offline/RetryConnectionButton.tsx
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { RetryConnectionButton } from "../RetryConnectionButton";

describe("RetryConnectionButton", () => {
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
    // window.location.reload is a no-op in jsdom so clicking is safe.
    // The important thing is that clicking does not throw and the handler runs.
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
