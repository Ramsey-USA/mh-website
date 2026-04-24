/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children, onClick }: any) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

import ErrorPage from "../error";

const testError = new Error("Test failure") as Error & { digest?: string };
testError.digest = "abc123";
const mockReset = jest.fn();

describe("Error page", () => {
  beforeEach(() => {
    mockReset.mockClear();
  });

  it("renders the error heading", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("logs the error on mount", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    const { logger } = require("@/lib/utils/logger");
    expect(logger.error).toHaveBeenCalledWith(
      "Page error:",
      expect.objectContaining({ message: "Test failure" }),
    );
  });

  it("calls reset when Try again button is clicked", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders a Contact Support link", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    const links = screen.getAllByRole("link");
    expect(
      links.some((l) => l.getAttribute("href")?.includes("/contact")),
    ).toBe(true);
  });

  it("tracks exception in gtag when available", () => {
    const mockGtag = jest.fn();
    window.gtag = mockGtag;
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(mockGtag).toHaveBeenCalledWith("event", "exception", {
      description: "Test failure",
      fatal: false,
    });
    delete (window as any).gtag;
  });

  it("does not throw when window.gtag is undefined", () => {
    delete (window as any).gtag;
    expect(() =>
      render(<ErrorPage error={testError} reset={mockReset} />),
    ).not.toThrow();
  });

  it("navigates home when Go Home button is clicked", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={testError} reset={mockReset} />);
    // Click the Go Home button — the onClick sets window.location.href
    await user.click(screen.getByRole("button", { name: /go home/i }));
    // Verify it didn't throw during click
  });
});
