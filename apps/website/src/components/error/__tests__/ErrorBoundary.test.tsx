/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "../ErrorBoundary";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
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

// ── Test helpers ──────────────────────────────────────────────────────────────

/** A component that throws during render when `shouldThrow` is true. */
function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("Test bomb error");
  return <div>Children rendered OK</div>;
}

/** Suppress React's built-in console.error noise for expected error boundaries. */
function silenceConsoleError() {
  return jest.spyOn(console, "error").mockImplementation(() => {});
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ErrorBoundary", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Children rendered OK")).toBeInTheDocument();
  });

  it("renders the default fallback UI when a child throws", () => {
    const spy = silenceConsoleError();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();

    spy.mockRestore();
  });

  it("calls the onError prop with error and errorInfo when a child throws", () => {
    const spy = silenceConsoleError();
    const onError = jest.fn();

    render(
      <ErrorBoundary onError={onError}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]![0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0]![0].message).toBe("Test bomb error");

    spy.mockRestore();
  });

  it("calls window.gtag with an exception event when a child throws", () => {
    const spy = silenceConsoleError();
    const gtagMock = jest.fn();
    Object.defineProperty(window, "gtag", { writable: true, value: gtagMock });

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "exception",
      expect.objectContaining({
        description: "component-error-boundary",
        fatal: true,
      }),
    );

    // Clean up
    Object.defineProperty(window, "gtag", {
      writable: true,
      value: undefined,
    });
    spy.mockRestore();
  });

  it("resets to render children again when the Try Again button is clicked", async () => {
    const user = userEvent.setup();
    const spy = silenceConsoleError();

    let shouldThrow = true;

    function ControlledBomb() {
      if (shouldThrow) throw new Error("Controlled error");
      return <div>Recovered</div>;
    }

    render(
      <ErrorBoundary>
        <ControlledBomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Allow the child to render normally on reset
    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(screen.getByText("Recovered")).toBeInTheDocument();

    spy.mockRestore();
  });

  it("renders the custom fallback prop instead of the default UI", () => {
    const spy = silenceConsoleError();
    const customFallback = jest.fn((error: Error, reset: () => void) => (
      <div>
        <p>Custom: {error.message}</p>
        <button onClick={reset}>Reset</button>
      </div>
    ));

    render(
      <ErrorBoundary fallback={customFallback}>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom: Test bomb error")).toBeInTheDocument();
    expect(customFallback).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Function),
    );
    // Default fallback UI should NOT be shown
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();

    spy.mockRestore();
  });

  it("renders a 'Go Home' link to the homepage", () => {
    const spy = silenceConsoleError();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    const goHomeLink = screen.getByRole("link", { name: /go home/i });
    expect(goHomeLink).toHaveAttribute("href", "/");

    spy.mockRestore();
  });

  it("does not render raw runtime error details", () => {
    const spy = silenceConsoleError();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.queryByText("Test bomb error")).not.toBeInTheDocument();
    spy.mockRestore();
  });
});
