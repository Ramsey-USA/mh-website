/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next-intl", () => ({
  useTranslations: () =>
    ((key: string) => {
      const map: Record<string, string> = {
        heading: "Something went wrong",
        message: "We ran into an issue loading this page.",
        tryAgain: "Try Again",
        goHome: "Go Home",
        contact: "Contact Support",
      };

      return map[key] ?? key;
    }) as unknown as (key: string) => string,
}));

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
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

jest.mock("@/lib/monitoring/sentry", () => ({
  captureException: jest.fn(),
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
      "Route error boundary triggered",
      {
        boundary: "route-error",
        errorName: "Error",
        digest: "abc123",
      },
    );
  });

  it("forwards exception to sentry with safe context", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    const { captureException } = require("@/lib/monitoring/sentry");
    expect(captureException).toHaveBeenCalledWith(testError, {
      boundary: "route-error",
      errorName: "Error",
      digest: "abc123",
    });
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
      description: "route-error:abc123",
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

  it("renders a home navigation link", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("keeps an accessible landmark and heading structure", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
  });

  it("does not expose raw error text in the rendered fallback", () => {
    render(<ErrorPage error={testError} reset={mockReset} />);
    expect(screen.queryByText("Test failure")).not.toBeInTheDocument();
  });

  it("supports Try Again interaction", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={testError} reset={mockReset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
