import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../Modal";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("Modal", () => {
  it("moves initial focus into the dialog and traps tab navigation", async () => {
    const user = userEvent.setup();

    render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Shared Modal Test"
        backdropAriaLabel="Dismiss shared modal overlay"
      >
        <input aria-label="First field" />
        <button type="button">Last action</button>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const closeButton = within(dialog).getByRole("button", {
      name: /Close modal/i,
    });
    const firstField = screen.getByLabelText(/First field/i);
    const lastAction = screen.getByRole("button", { name: /Last action/i });

    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });

    await user.tab();
    expect(firstField).toHaveFocus();

    await user.tab();
    expect(lastAction).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(lastAction).toHaveFocus();
  });

  it("locks body scroll while open and restores it when closed", () => {
    const { rerender } = render(
      <Modal isOpen onClose={jest.fn()} title="Scroll Lock Test">
        <button type="button">Action</button>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={jest.fn()} title="Scroll Lock Test">
        <button type="button">Action</button>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("");
  });
});
