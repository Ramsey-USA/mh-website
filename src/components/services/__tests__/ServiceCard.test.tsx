import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceCard } from "../ServiceCard";
import type { CoreService } from "../servicesData";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/ui", () => ({
  IconContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  GlowEffect: () => null,
}));

const baseService: CoreService = {
  iconName: "engineering",
  title: "Construction Management",
  subtitle: "Complete Oversight",
  description: "Full project management.",
  features: ["Planning", "Scheduling", "Safety", "Quality"],
  benefits: ["Cost savings"],
};

describe("ServiceCard", () => {
  it("renders title, subtitle, and up to 3 features", () => {
    const onOpen = jest.fn();
    render(<ServiceCard service={baseService} onOpenModal={onOpen} />);

    expect(screen.getByText("Construction Management")).toBeInTheDocument();
    expect(screen.getByText("Complete Oversight")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Scheduling")).toBeInTheDocument();
    expect(screen.getByText("Safety")).toBeInTheDocument();
    // 4th feature should be hidden, "+1 more" shown instead
    expect(screen.queryByText("Quality")).not.toBeInTheDocument();
    expect(screen.getByText(/\+1 more features/)).toBeInTheDocument();
  });

  it("does not show +N more when features <= 3", () => {
    const service = { ...baseService, features: ["A", "B"] };
    render(<ServiceCard service={service} onOpenModal={jest.fn()} />);
    expect(screen.queryByText(/more features/)).not.toBeInTheDocument();
  });

  it("calls onOpenModal on click", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(<ServiceCard service={baseService} onOpenModal={onOpen} />);

    await user.click(
      screen.getByRole("button", {
        name: /View details for Construction Management/i,
      }),
    );
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenModal on Enter key", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(<ServiceCard service={baseService} onOpenModal={onOpen} />);

    const card = screen.getByRole("button", {
      name: /View details for Construction Management/i,
    });
    card.focus();
    await user.keyboard("{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenModal on Space key", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();
    render(<ServiceCard service={baseService} onOpenModal={onOpen} />);

    const card = screen.getByRole("button", {
      name: /View details for Construction Management/i,
    });
    card.focus();
    await user.keyboard(" ");
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("generates a sanitized cardId from the title", () => {
    const service = {
      ...baseService,
      title: "Owner's Representative & PM",
    };
    const { container } = render(
      <ServiceCard service={service} onOpenModal={jest.fn()} />,
    );
    const card = container.querySelector("#owner-s-representative-pm");
    expect(card).toBeInTheDocument();
  });
});
