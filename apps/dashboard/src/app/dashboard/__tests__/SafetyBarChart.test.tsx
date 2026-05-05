import { render, screen } from "@testing-library/react";
import { SafetyBarChart } from "../SafetyBarChart";

// Recharts renders SVG which jsdom handles partially; mock the full chart to
// keep the test focused on the component contract rather than SVG details.
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe("SafetyBarChart", () => {
  const sampleData = [
    { name: "Jan", count: 3 },
    { name: "Feb", count: 7 },
    { name: "Mar", count: 2 },
  ];

  it("renders without throwing", () => {
    expect(() => render(<SafetyBarChart data={sampleData} />)).not.toThrow();
  });

  it("renders the recharts container", () => {
    render(<SafetyBarChart data={sampleData} />);
    expect(screen.getByTestId("recharts-container")).toBeInTheDocument();
  });

  it("renders with an empty data array", () => {
    expect(() => render(<SafetyBarChart data={[]} />)).not.toThrow();
    expect(screen.getByTestId("recharts-container")).toBeInTheDocument();
  });
});
