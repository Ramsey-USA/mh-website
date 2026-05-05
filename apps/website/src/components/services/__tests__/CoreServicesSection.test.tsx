import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CoreServicesSection } from "../CoreServicesSection";
import { coreServices } from "../servicesData";

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

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    className,
    variant,
    size,
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    size?: string;
  }) => (
    <button
      type="button"
      className={className}
      data-size={size}
      data-variant={variant}
    >
      {children}
    </button>
  ),
  IconContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  GlowEffect: () => null,
}));

describe("CoreServicesSection", () => {
  it("opens a core service detail modal and closes it with escape", async () => {
    const user = userEvent.setup();

    render(<CoreServicesSection services={coreServices} />);

    await user.click(
      screen.getByRole("button", {
        name: /View details for Master Planning \(Pre-Construction\)/i,
      }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByText("Master Planning (Pre-Construction)"),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Unlock Your Building's Potential with Comprehensive Planning/i,
      ),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("What's Included")).toBeInTheDocument();
    expect(
      within(dialog).getByText("Partnership Benefits"),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Zero gaps in scope coverage during construction planning/i,
      ),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the core service detail modal when the shared backdrop button is clicked", async () => {
    const user = userEvent.setup();

    render(<CoreServicesSection services={coreServices} />);

    await user.click(
      screen.getByRole("button", {
        name: /View details for Commercial Construction Management/i,
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Close core service details modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
