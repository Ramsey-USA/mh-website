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
      expect.objectContaining({ fatal: true }),
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

  it("renders a 'Go Home' button that can be clicked without throwing", async () => {
    const user = userEvent.setup();
    const spy = silenceConsoleError();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    const goHomeBtn = screen.getByRole("button", { name: /go home/i });
    expect(goHomeBtn).toBeInTheDocument();

    // Click invokes the onClick handler (window.location.href = "/").
    // jsdom doesn't fully navigate, but the handler code path is covered.
    await user.click(goHomeBtn);

    spy.mockRestore();
  });

  it("renders dev error details block when NODE_ENV is 'development'", () => {
    const spy = silenceConsoleError();
    const originalEnv = process.env.NODE_ENV;
    // Force development mode so the <details> block renders
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      writable: true,
      configurable: true,
    });

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    // The <details> element and "Error Details (Development Only)" summary are rendered
    expect(
      screen.getByText(/error details \(development only\)/i),
    ).toBeInTheDocument();
    // The error message appears inside the dev details block
    expect(screen.getByText("Test bomb error")).toBeInTheDocument();

    // Restore
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
    spy.mockRestore();
  });
});
