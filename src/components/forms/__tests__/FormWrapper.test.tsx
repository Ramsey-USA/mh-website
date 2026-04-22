import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from "../FormWrapper";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("FormInput", () => {
  it("renders label, required indicator, and helper text", () => {
    render(
      <FormInput
        label="Name"
        name="name"
        required
        helperText="Use your legal name."
      />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("name", "name");
    expect(screen.getByText("Name", { selector: "label" })).toHaveTextContent(
      "Name*",
    );
    expect(screen.getByText("Use your legal name.")).toBeInTheDocument();
  });

  it("shows error messaging and suppresses helper text", () => {
    render(
      <FormInput
        label="Email"
        name="email"
        error="Email is required."
        helperText="We only use this for follow-up."
      />,
    );

    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(
      screen.queryByText("We only use this for follow-up."),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
  });
});

describe("FormTextarea", () => {
  it("renders helper text when no error is provided", () => {
    render(
      <FormTextarea
        label="Message"
        name="message"
        helperText="Keep details concise."
      />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("name", "message");
    expect(screen.getByText("Keep details concise.")).toBeInTheDocument();
  });
});

describe("FormSelect", () => {
  it("renders default option, custom options, and field error", () => {
    render(
      <FormSelect
        label="Service"
        name="service"
        error="Please select a service."
        options={[
          { value: "general", label: "General Contracting" },
          { value: "public", label: "Public Sector" },
        ]}
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Select an option" }),
    ).toHaveValue("");
    expect(
      screen.getByRole("option", { name: "General Contracting" }),
    ).toHaveValue("general");
    expect(screen.getByText("Please select a service.")).toBeInTheDocument();
  });
});

describe("FormWrapper", () => {
  it("submits the form and supports a secondary action", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());
    const onSecondaryClick = jest.fn();

    render(
      <FormWrapper
        onSubmit={onSubmit}
        submitButtonLabel="Send"
        secondaryButtonLabel="Cancel"
        onSecondaryClick={onSecondaryClick}
        submitError="Submission failed."
        submitSuccess="Saved successfully."
        layout="row"
        className="custom-form"
      >
        <input aria-label="Hidden field" />
      </FormWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);

    fireEvent.submit(
      screen.getByRole("button", { name: "Send" }).closest("form")!,
    );
    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Submission failed.")).toBeInTheDocument();
    expect(screen.getByText("Saved successfully.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send" }).closest("form"),
    ).toHaveClass("flex-row", "gap-6", "custom-form");
  });

  it("disables actions while submitting and hides incomplete secondary config", () => {
    render(
      <FormWrapper
        onSubmit={(e) => e.preventDefault()}
        submitButtonLabel="Submitting"
        secondaryButtonLabel="Cancel"
        isSubmitting
        disableSubmit
      >
        <input aria-label="Field" />
      </FormWrapper>,
    );

    expect(
      screen.queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submitting" })).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });
});
