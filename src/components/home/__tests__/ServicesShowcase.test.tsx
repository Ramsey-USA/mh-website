import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServicesShowcase } from "../ServicesShowcase";

const trackServiceInterest = jest.fn();

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

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

jest.mock("@/components/ui", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Button: ({
    children,
    className,
    variant,
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
  }) => (
    <button type="button" className={className} data-variant={variant}>
      {children}
    </button>
  ),
}));

jest.mock("@/lib/analytics/marketing-tracking", () => ({
  trackServiceInterest: (...args: unknown[]) => trackServiceInterest(...args),
}));

describe("ServicesShowcase", () => {
  beforeEach(() => {
    trackServiceInterest.mockReset();
  });

  it("opens a service detail modal from the card trigger and closes it with escape", async () => {
    const user = userEvent.setup();

    render(<ServicesShowcase />);

    await user.click(
      screen.getByRole("button", { name: /View details for Master Planning/i }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Master Planning")).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Transform your vision into actionable plans/i),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("What's Included")).toBeInTheDocument();
    expect(within(dialog).getByText("Key Benefits")).toBeInTheDocument();
    expect(trackServiceInterest).toHaveBeenCalledWith(
      "Master Planning",
      "click",
      expect.objectContaining({
        location: "homepage-showcase",
        position: 2,
      }),
    );

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the service detail modal when the shared backdrop button is clicked", async () => {
    const user = userEvent.setup();

    render(<ServicesShowcase />);

    await user.click(
      screen.getByRole("button", {
        name: /View details for Construction Management/i,
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Close service details modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens modal via Enter key on a service card button", async () => {
    const user = userEvent.setup();
    render(<ServicesShowcase />);

    const card = screen.getByRole("button", {
      name: /View details for Construction Management/i,
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(trackServiceInterest).toHaveBeenCalledWith(
      "Construction Management",
      "click",
      expect.objectContaining({
        location: "homepage-showcase",
        position: 1,
      }),
    );
  });

  it("renders the styled NOT in the Owner's Representative subtitle", () => {
    render(<ServicesShowcase />);
    // The subtitle "Built projects for the Client, NOT the Dollar" should
    // split "NOT" into its own italicized span
    const notSpan = screen.getByText("NOT");
    expect(notSpan.tagName).toBe("SPAN");
    expect(notSpan.className).toContain("italic");
  });

  it("renders all six service cards", () => {
    render(<ServicesShowcase />);
    const cards = screen.getAllByRole("button", { name: /View details for/i });
    expect(cards).toHaveLength(6);
  });
});
