import { render, screen } from "@testing-library/react";
import { CompanyStats, companyStats } from "../CompanyStats";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  HoverScale: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/ui/AnimatedCounter", () => ({
  AnimatedCounter: ({
    value,
    suffix,
    prefix,
  }: {
    value: number;
    suffix?: string;
    prefix?: string;
  }) => (
    <span data-testid="counter">
      {prefix}
      {value}
      {suffix}
    </span>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

describe("CompanyStats", () => {
  it("renders all default stat labels", () => {
    render(<CompanyStats />);
    expect(screen.getByText("Award-Winning Safety EMR")).toBeInTheDocument();
    expect(screen.getByText("Years Combined Experience")).toBeInTheDocument();
    expect(screen.getByText("States Licensed & Insured")).toBeInTheDocument();
  });

  it("renders AnimatedCounter for animated stats", () => {
    render(<CompanyStats />);
    // Animated stats should render via AnimatedCounter mock
    const counters = screen.getAllByTestId("counter");
    expect(counters.length).toBeGreaterThan(0);
  });

  it("renders raw value for non-animated stat", () => {
    render(<CompanyStats />);
    // States Licensed stat has animated: false, value 3
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("accepts custom stats array", () => {
    const customStats = [
      { iconName: "star", value: 42, label: "Custom Stat", animated: false },
    ];
    render(<CompanyStats stats={customStats} />);
    expect(screen.getByText("Custom Stat")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("accepts custom title, subtitle, description, and id props", () => {
    render(
      <CompanyStats
        title="Our Numbers"
        subtitle="By The Numbers"
        description="Proven track record."
        id="stats-section"
      />,
    );
    // BrandedContentSection is mocked, so just ensure render succeeds
    expect(screen.getByText("Award-Winning Safety EMR")).toBeInTheDocument();
  });

  it("exports companyStats default data with expected count", () => {
    expect(companyStats.length).toBeGreaterThanOrEqual(4);
  });
});
