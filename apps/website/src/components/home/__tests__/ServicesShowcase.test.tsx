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
      screen.getByRole("button", {
        name: /View details for Commercial Tenant Improvements/i,
      }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByText("Commercial Tenant Improvements"),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Commercial TI execution with phased coordination/i,
      ),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("What's Included")).toBeInTheDocument();
    expect(within(dialog).getByText("Key Benefits")).toBeInTheDocument();
    expect(trackServiceInterest).toHaveBeenCalledWith(
      "Commercial Tenant Improvements",
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
        name: /View details for AG and Winery Communities/i,
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
      name: /View details for AG and Winery Communities/i,
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(trackServiceInterest).toHaveBeenCalledWith(
      "AG and Winery Communities",
      "click",
      expect.objectContaining({
        location: "homepage-showcase",
        position: 1,
      }),
    );
  });

  it("renders the updated commercial delivery subtitle", () => {
    render(<ServicesShowcase />);
    expect(
      screen.getByText("Public-Sector Delivery with Compliance Controls"),
    ).toBeInTheDocument();
  });

  it("renders all six service cards", () => {
    render(<ServicesShowcase />);
    const cards = screen.getAllByRole("button", { name: /View details for/i });
    expect(cards).toHaveLength(6);
  });
});
