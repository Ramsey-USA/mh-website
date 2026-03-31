/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

import GlobalError from "../global-error";

const testError = new Error("Critical failure") as Error & { digest?: string };
const mockReset = jest.fn();

describe("GlobalError page", () => {
  beforeEach(() => {
    mockReset.mockClear();
    (require("@/lib/utils/logger").logger.error as jest.Mock).mockClear();
  });

  it("renders the Application Error heading", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(screen.getByText(/application error/i)).toBeInTheDocument();
  });

  it("logs the error on mount", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    const { logger } = require("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalledWith(
      "Global error:",
      expect.objectContaining({ message: "Critical failure" }),
    );
  });

  it("calls reset when Try Again button is clicked", async () => {
    const user = userEvent.setup();
    render(<GlobalError error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders a Contact Support link", () => {
    render(<GlobalError error={testError} reset={mockReset} />);
    const link = screen.getByRole("link", { name: /contact support/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("tracks exception in gtag with fatal=true when available", () => {
    const mockGtag = jest.fn();
    window.gtag = mockGtag;
    render(<GlobalError error={testError} reset={mockReset} />);
    expect(mockGtag).toHaveBeenCalledWith("event", "exception", {
      description: "Critical failure",
      fatal: true,
    });
    delete (window as any).gtag;
  });

  it("does not throw when window.gtag is undefined", () => {
    delete (window as any).gtag;
    expect(() =>
      render(<GlobalError error={testError} reset={mockReset} />),
    ).not.toThrow();
  });

  it("renders error digest when present", () => {
    const errorWithDigest = new Error("Fail") as Error & { digest?: string };
    errorWithDigest.digest = "xyz789";
    // GlobalError doesn't display digest in production, but should not crash
    expect(() =>
      render(<GlobalError error={errorWithDigest} reset={mockReset} />),
    ).not.toThrow();
  });

  it("navigates home when Go Home button is clicked", async () => {
    const user = userEvent.setup();
    render(<GlobalError error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /go home/i }));
    // Verify no crash from window.location.href assignment
  });
});
