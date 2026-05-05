/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SemiquincentennialBanner } from "../SemiquincentennialBanner";

jest.mock("@/components/icons/AmericanFlag", () => ({
  AmericanFlag: ({
    size,
    className,
  }: {
    size?: string;
    className?: string;
  }) => (
    <div
      data-testid="american-flag"
      data-size={size}
      className={className}
      role="img"
      aria-label="American Flag - Veteran-Owned Company"
    />
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, className }: { icon: string; className?: string }) => (
    <span data-testid={`icon-${icon}`} className={className}>
      {icon}
    </span>
  ),
}));

// Freeze time well before July 4, 2026 so we always see the countdown
const FROZEN_NOW = new Date("2026-04-21T00:00:00.000Z").getTime();

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(FROZEN_NOW);

  // Stub canvas getContext so the fireworks path doesn't throw in jsdom
  jest
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null as unknown as CanvasRenderingContext2D);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("SemiquincentennialBanner", () => {
  it("renders the countdown section with an accessible region label", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByRole("region", {
        name: /United States 250th Anniversary Countdown/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the heading and tagline", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByRole("heading", { name: /Countdown to July 4, 2026/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/America's Semiquincentennial/i),
    ).toBeInTheDocument();
  });

  it("shows a non-zero day count when far from July 4, 2026", () => {
    render(<SemiquincentennialBanner />);
    const daysLabel = screen.getByText("Days");
    const daysValue = daysLabel.previousSibling as HTMLElement;
    const days = parseInt(daysValue.textContent ?? "0", 10);
    expect(days).toBeGreaterThan(0);
  });

  it("renders all four countdown unit labels", () => {
    render(<SemiquincentennialBanner />);
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hrs")).toBeInTheDocument();
    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("Sec")).toBeInTheDocument();
  });

  it("renders at least one AmericanFlag icon", () => {
    render(<SemiquincentennialBanner />);
    const flags = screen.getAllByTestId("american-flag");
    expect(flags.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Celebrate button with the correct aria-label", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByRole("button", {
        name: /Launch fireworks to celebrate America's 250th anniversary/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the celebration icon on the button", () => {
    render(<SemiquincentennialBanner />);
    expect(screen.getByTestId("icon-celebration")).toBeInTheDocument();
  });

  it("Celebrate! button click does not throw (canvas getContext returns null in jsdom)", () => {
    render(<SemiquincentennialBanner />);
    const btn = screen.getByRole("button", { name: /Launch fireworks/i });
    expect(() => fireEvent.click(btn)).not.toThrow();
  });

  it("countdown div has aria-live=polite and aria-atomic=true", () => {
    render(<SemiquincentennialBanner />);
    const liveRegion = document.querySelector("[aria-live='polite']");
    expect(liveRegion).not.toBeNull();
    expect(liveRegion).toHaveAttribute("aria-atomic", "true");
  });

  it("shows the 'seconds' value update after one tick", () => {
    render(<SemiquincentennialBanner />);
    const initialSeconds = parseInt(
      (screen.getByText("Sec").previousSibling as HTMLElement).textContent ??
        "0",
      10,
    );

    act(() => {
      jest.advanceTimersByTime(1_000);
    });

    const updatedSeconds = parseInt(
      (screen.getByText("Sec").previousSibling as HTMLElement).textContent ??
        "0",
      10,
    );
    // After 1 second the value should change by 1 (or wrap from 00 to 59)
    const expected = initialSeconds === 0 ? 59 : initialSeconds - 1;
    expect(updatedSeconds).toBe(expected);
  });

  it("renders the 'Happy Birthday' variant when the date has passed", () => {
    // Advance past July 4, 2026
    jest.setSystemTime(new Date("2026-07-05T00:00:00.000Z").getTime());
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByText(/Happy 250th Birthday, America/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Launch fireworks/i }),
    ).not.toBeInTheDocument();
  });
});
