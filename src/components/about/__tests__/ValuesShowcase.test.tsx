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

    render(<ValuesShowcase />);

    await user.click(
      screen.getAllByRole("button", { name: /Learn More/i })[0]!,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("For Our Partners")).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Client Partnership Excellence/i),
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

    render(<ValuesShowcase />);

    await user.click(
      screen.getAllByRole("button", { name: /Learn More/i })[1]!,
    );
    expect(screen.getByText("For Our Community")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Close value details modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
