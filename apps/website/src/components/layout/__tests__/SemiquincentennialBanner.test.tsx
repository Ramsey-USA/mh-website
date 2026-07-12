/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SemiquincentennialBanner } from "../SemiquincentennialBanner";

jest.mock("@/lib/icons/AmericanFlag", () => ({
  AmericanFlag: ({
    size,
    className,
  }: {
    size?: string;
    className?: string;
  }) => (
    <img
      data-testid="american-flag"
      data-size={size}
      className={className}
      alt="American Flag - Veteran-Owned Company"
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

const FROZEN_APRIL = new Date("2026-04-21T00:00:00.000Z").getTime();
const FROZEN_JULY = new Date("2026-07-10T12:00:00.000Z").getTime();

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(FROZEN_APRIL);

  // Stub canvas getContext so the fireworks path doesn't throw in jsdom
  jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("SemiquincentennialBanner", () => {
  it("renders the celebration section with an accessible region label", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByRole("region", {
        name: /United States July Celebration Ribbon/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the heading and support tagline", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByRole("heading", {
        name: /Celebrating America Throughout July/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/America's Semiquincentennial Support Month/i),
    ).toBeInTheDocument();
  });

  it("shows the non-July support copy outside July", () => {
    render(<SemiquincentennialBanner />);
    expect(
      screen.getByText(
        /Join us in supporting our communities and celebrating American values/i,
      ),
    ).toBeInTheDocument();
  });

  it("shows the July support copy during July", () => {
    jest.setSystemTime(FROZEN_JULY);
    render(<SemiquincentennialBanner />);

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(
      screen.getByText(
        /We proudly stand with our communities in honoring America all month long/i,
      ),
    ).toBeInTheDocument();
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

  it("does not render countdown unit labels", () => {
    render(<SemiquincentennialBanner />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
    expect(screen.queryByText("Hrs")).not.toBeInTheDocument();
    expect(screen.queryByText("Min")).not.toBeInTheDocument();
    expect(screen.queryByText("Sec")).not.toBeInTheDocument();
  });
});
