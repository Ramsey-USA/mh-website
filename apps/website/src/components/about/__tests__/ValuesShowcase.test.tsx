import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ValuesShowcase } from "../ValuesShowcase";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

describe("ValuesShowcase", () => {
  it("opens a value detail modal and closes it with escape", async () => {
    const user = userEvent.setup();

    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );

    await user.click(
      screen.getAllByRole("button", { name: /Learn more about/i })[0]!,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("For Our Partners")).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Stakeholder Partnership Excellence/i),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Long-term partnership beyond project completion/i,
      ),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the value detail modal when the backdrop button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );

    await user.click(
      screen.getAllByRole("button", { name: /Learn more about/i })[1]!,
    );
    expect(
      within(screen.getByRole("dialog")).getByText("For Our Community"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Close value details modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens modal via the single card button target", async () => {
    const user = userEvent.setup();
    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );

    const card = screen.getByRole("button", {
      name: /Learn more about For Our Partners/i,
    });
    await user.click(card);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens modal via keyboard Enter key on card", async () => {
    const user = userEvent.setup();
    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );

    const card = screen.getByRole("button", {
      name: /Learn more about For Our Partners/i,
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders all three value category cards", () => {
    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );
    const cards = screen.getAllByRole("button", { name: /Learn more about/i });
    expect(cards).toHaveLength(3);
  });

  it("does not render nested learn-more buttons inside the cards", () => {
    render(
      <ValuesShowcase
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />,
    );

    expect(
      screen.queryByRole("button", { name: /^Learn More$/i }),
    ).not.toBeInTheDocument();
  });
});
