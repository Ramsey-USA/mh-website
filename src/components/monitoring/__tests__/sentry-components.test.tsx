/**
 * @jest-environment jsdom
 *
 * Tests for:
 *   components/monitoring/SentryInit.tsx
 *   components/monitoring/SentryTestButton.tsx
 */

import { render, screen } from "@testing-library/react";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockInitSentry = jest.fn();
jest.mock("@/lib/monitoring/sentry", () => ({
  initSentry: () => mockInitSentry(),
}));

jest.mock("@/hooks/useLocale", () => ({
  useLocale: jest.fn().mockReturnValue("en"),
}));

const mockUseSearchParams = jest.fn(() => new URLSearchParams());

// Override the shared next/navigation mock with a jest.fn() for useSearchParams
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: jest.fn().mockReturnValue("/"),
  useSearchParams: () => mockUseSearchParams(),
}));

import { SentryInit } from "../SentryInit";
import { SentryTestButton } from "../SentryTestButton";

// =============================================================================
// SentryInit
// =============================================================================

describe("SentryInit", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders null (no visible output)", () => {
    const { container } = render(<SentryInit />);
    expect(container.firstChild).toBeNull();
  });

  it("calls initSentry() on mount", () => {
    render(<SentryInit />);
    expect(mockInitSentry).toHaveBeenCalledTimes(1);
  });

  it("does not call initSentry() again on re-render", () => {
    const { rerender } = render(<SentryInit />);
    rerender(<SentryInit />);
    // useEffect runs once on mount; subsequent renders don't trigger it again
    expect(mockInitSentry).toHaveBeenCalledTimes(1);
  });
});

// =============================================================================
// SentryTestButton
// =============================================================================

describe("SentryTestButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it("renders nothing when ?sentry_test=1 is absent", () => {
    const { container } = render(<SentryTestButton />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a button when ?sentry_test=1 is present", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sentry_test=1"));
    render(<SentryTestButton />);
    expect(screen.getByRole("button", { name: /sentry/i })).toBeInTheDocument();
  });

  it("renders Spanish label when locale is 'es'", () => {
    const { useLocale } = jest.requireMock("@/hooks/useLocale") as {
      useLocale: jest.Mock;
    };
    useLocale.mockReturnValueOnce("es");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sentry_test=1"));
    render(<SentryTestButton />);
    expect(screen.getByRole("button").getAttribute("aria-label")).toMatch(
      /Disparar/i,
    );
  });

  it("button is present and clickable (error is intentional)", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sentry_test=1"));
    render(<SentryTestButton />);
    const btn = screen.getByRole("button");
    // The click intentionally calls an undefined function to trigger Sentry.
    // We just verify the button is enabled and interactive.
    expect(btn).toBeEnabled();
  });
});
