import { fireEvent, render, screen } from "@testing-library/react";
import { ModalWrapper } from "../ModalWrapper";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("ModalWrapper", () => {
  it("does not render when closed unless success state is active", () => {
    const { rerender } = render(
      <ModalWrapper isOpen={false} onClose={jest.fn()} title="Hidden modal">
        <p>Content</p>
      </ModalWrapper>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <ModalWrapper
        isOpen={false}
        isSuccess
        onClose={jest.fn()}
        title="Success modal"
      >
        <p>Success content</p>
      </ModalWrapper>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders content, supports custom aria label, and handles close interactions", () => {
    const onClose = jest.fn();
    const { container, unmount } = render(
      <ModalWrapper
        isOpen
        onClose={onClose}
        title="Application"
        description="Submit your details"
        ariaLabel="Job application modal"
      >
        <p>Form fields</p>
      </ModalWrapper>,
    );

    expect(
      screen.getByRole("dialog", { name: "Application" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Job application modal",
    );
    expect(screen.getByText("Submit your details")).toBeInTheDocument();
    expect(screen.getByText("Form fields")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
    fireEvent.click(container.querySelector('[role="presentation"]')!);

    expect(onClose).toHaveBeenCalledTimes(3);

    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("respects backdrop and close button configuration", () => {
    const onClose = jest.fn();
    const { container } = render(
      <ModalWrapper
        isOpen
        onClose={onClose}
        title="Backdrop control"
        showCloseButton={false}
        closeOnBackdropClick={false}
      >
        <p>Modal details</p>
      </ModalWrapper>,
    );

    expect(
      screen.queryByRole("button", { name: "Close modal" }),
    ).not.toBeInTheDocument();

    fireEvent.click(container.querySelector('[role="presentation"]')!);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("shows loading state and can omit backdrop", () => {
    render(
      <ModalWrapper
        isOpen
        onClose={jest.fn()}
        title="Loading modal"
        showBackdrop={false}
        isLoading
      >
        <p>Should not render</p>
      </ModalWrapper>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Should not render")).not.toBeInTheDocument();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
