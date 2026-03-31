import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpecialtyServiceCard } from "../SpecialtyServiceCard";
import type { SpecialtyService } from "../servicesData";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("@/components/ui", () => ({
  Card: ({
    children,
    onClick,
    onKeyDown,
    role,
    tabIndex,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
  }: React.HTMLAttributes<HTMLDivElement> & {
    "aria-expanded"?: boolean;
    "aria-label"?: string;
  }) => (
    <div
      role={role}
      tabIndex={tabIndex}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3>{children}</h3>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/lib/styles/card-variants", () => ({
  getCardClassName: (_variant: string, extra: string) => extra,
}));

const service: SpecialtyService = {
  iconName: "home_work",
  title: "Residential Renovation",
  subtitle: "Full-Home Remodels",
  description: "Expert residential renovation services.",
  markets: ["Single-family homes", "Condos"],
  buildTypes: ["Kitchen remodels", "Bathroom remodels"],
  features: ["Licensed contractors", "5-year warranty"],
};

describe("SpecialtyServiceCard", () => {
  it("renders service title and subtitle", () => {
    render(<SpecialtyServiceCard service={service} />);
    expect(screen.getByText("Residential Renovation")).toBeInTheDocument();
    expect(screen.getByText("Full-Home Remodels")).toBeInTheDocument();
  });

  it("shows collapsed state by default", () => {
    render(<SpecialtyServiceCard service={service} />);
    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    expect(card).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Click to view details")).toBeInTheDocument();
  });

  it("expands on click showing markets and build types", async () => {
    const user = userEvent.setup();
    render(<SpecialtyServiceCard service={service} />);

    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    await user.click(card);

    expect(card).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Single-family homes")).toBeInTheDocument();
    expect(screen.getByText("Kitchen remodels")).toBeInTheDocument();
  });

  it("collapses on second click", async () => {
    const user = userEvent.setup();
    render(<SpecialtyServiceCard service={service} />);

    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    await user.click(card);
    await user.click(
      screen.getByRole("button", {
        name: /Collapse Residential Renovation details/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /Expand Residential Renovation details/i,
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Click to view details")).toBeInTheDocument();
  });

  it("toggles on Enter key", async () => {
    const user = userEvent.setup();
    render(<SpecialtyServiceCard service={service} />);

    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(card).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles on Space key", async () => {
    const user = userEvent.setup();
    render(<SpecialtyServiceCard service={service} />);

    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    card.focus();
    await user.keyboard(" ");

    expect(card).toHaveAttribute("aria-expanded", "true");
  });

  it("renders features when expanded", async () => {
    const user = userEvent.setup();
    render(<SpecialtyServiceCard service={service} />);

    const card = screen.getByRole("button", {
      name: /Expand Residential Renovation details/i,
    });
    await user.click(card);
    expect(screen.getByText("Licensed contractors")).toBeInTheDocument();
    expect(screen.getByText("5-year warranty")).toBeInTheDocument();
  });
});
