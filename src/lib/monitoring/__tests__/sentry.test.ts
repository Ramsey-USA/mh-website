/**
 * @jest-environment jsdom
 *
 * Tests for lib/monitoring/sentry.ts
 *
 * Covers:
 *   - initSentry()         — initialises once, skips on repeated calls
 *   - captureException()   — with and without context
 *   - captureMessage()     — with and without context
 *   - setUser()
 *   - addBreadcrumb()
 */

// ── Mock @sentry/browser before importing the module ─────────────────────────

const mockInit = jest.fn();
const mockCaptureException = jest.fn();
const mockCaptureMessage = jest.fn();
const mockSetUser = jest.fn();
const mockAddBreadcrumb = jest.fn();
const mockWithScope = jest.fn((cb: (scope: unknown) => void) => {
  cb({ setExtras: jest.fn() });
});
const mockBrowserTracingIntegration = jest.fn().mockReturnValue({});
const mockReplayIntegration = jest.fn().mockReturnValue({});

jest.mock("@sentry/browser", () => ({
  init: (...args: unknown[]) => mockInit(...args),
  captureException: (...args: unknown[]) => mockCaptureException(...args),
  captureMessage: (...args: unknown[]) => mockCaptureMessage(...args),
  setUser: (...args: unknown[]) => mockSetUser(...args),
  addBreadcrumb: (...args: unknown[]) => mockAddBreadcrumb(...args),
  withScope: (cb: (scope: unknown) => void) => mockWithScope(cb),
  browserTracingIntegration: () => mockBrowserTracingIntegration(),
  replayIntegration: (opts: unknown) => mockReplayIntegration(opts),
}));

import type { SeverityLevel } from "@sentry/browser";

// ── Import after mocking ──────────────────────────────────────────────────────

let initSentry: () => void;
let captureException: (error: unknown, ctx?: Record<string, unknown>) => void;
let captureMessage: (
  msg: string,
  level?: SeverityLevel,
  ctx?: Record<string, unknown>,
) => void;
let setUser: (
  u: { id?: string; email?: string; username?: string } | null,
) => void;
let addBreadcrumb: (b: {
  category?: string;
  message: string;
  level?: SeverityLevel;
  data?: Record<string, unknown>;
}) => void;

beforeAll(async () => {
  ({ initSentry, captureException, captureMessage, setUser, addBreadcrumb } =
    await import("@/lib/monitoring/sentry"));
});

describe("initSentry()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("calls SentryBrowser.init once", () => {
    initSentry();
    expect(mockInit).toHaveBeenCalledTimes(1);
  });

  it("does not call init again on subsequent invocations (already initialised)", () => {
    // isInitialized is now true — second call should no-op
    initSentry();
    expect(mockInit).not.toHaveBeenCalled();
  });
});

describe("captureException()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("calls SentryBrowser.captureException directly without context", () => {
    captureException(new Error("no context"));
    expect(mockCaptureException).toHaveBeenCalledWith(expect.any(Error));
  });

  it("calls withScope + captureException when context is provided", () => {
    captureException(new Error("with context"), { userId: "123" });
    expect(mockWithScope).toHaveBeenCalled();
    expect(mockCaptureException).toHaveBeenCalled();
  });
});

describe("captureMessage()", () => {
  beforeEach(() => jest.clearAllMocks());

  it("calls SentryBrowser.captureMessage directly without context", () => {
    captureMessage("Hello");
    expect(mockCaptureMessage).toHaveBeenCalledWith("Hello", "info");
  });

  it("calls withScope + captureMessage when context is provided", () => {
    captureMessage("Event", "warning", { detail: "x" });
    expect(mockWithScope).toHaveBeenCalled();
    expect(mockCaptureMessage).toHaveBeenCalled();
  });
});

describe("setUser()", () => {
  it("calls SentryBrowser.setUser", () => {
    setUser({ id: "u-1", email: "test@test.com" });
    expect(mockSetUser).toHaveBeenCalledWith({
      id: "u-1",
      email: "test@test.com",
    });
  });

  it("accepts null to clear the user", () => {
    setUser(null);
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});

describe("addBreadcrumb()", () => {
  it("calls SentryBrowser.addBreadcrumb with message and defaults", () => {
    addBreadcrumb({ message: "Page load" });
    expect(mockAddBreadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Page load", level: "info" }),
    );
  });

  it("includes category and data when provided", () => {
    addBreadcrumb({
      category: "navigation",
      message: "Clicked link",
      level: "debug",
      data: { href: "/about" },
    });
    expect(mockAddBreadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({
        category: "navigation",
        message: "Clicked link",
        data: { href: "/about" },
      }),
    );
  });
});
