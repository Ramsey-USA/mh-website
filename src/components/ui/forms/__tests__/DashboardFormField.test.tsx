/**
 * @jest-environment jsdom
 *
 * Tests for DashboardFormField, DashboardSelectField, DashboardTextareaField
 */

import { render, screen } from "@testing-library/react";
import {
  DashboardFormField,
  DashboardSelectField,
  DashboardTextareaField,
  DASHBOARD_INPUT_CLASS,
  DASHBOARD_SELECT_CLASS,
  DASHBOARD_LABEL_CLASS,
  DASHBOARD_SECTION_HEADER_CLASS,
  DASHBOARD_TABLE_HEADER_CLASS,
} from "../DashboardFormField";

// ─── Constants ────────────────────────────────────────────────────────────────

describe("exported CSS constants", () => {
  it("DASHBOARD_INPUT_CLASS is a non-empty string", () => {
    expect(typeof DASHBOARD_INPUT_CLASS).toBe("string");
    expect(DASHBOARD_INPUT_CLASS.length).toBeGreaterThan(0);
  });

  it("DASHBOARD_SELECT_CLASS extends DASHBOARD_INPUT_CLASS with appearance-none", () => {
    expect(DASHBOARD_SELECT_CLASS).toContain(DASHBOARD_INPUT_CLASS);
    expect(DASHBOARD_SELECT_CLASS).toContain("appearance-none");
  });

  it("DASHBOARD_LABEL_CLASS is a non-empty string", () => {
    expect(typeof DASHBOARD_LABEL_CLASS).toBe("string");
    expect(DASHBOARD_LABEL_CLASS.length).toBeGreaterThan(0);
  });

  it("DASHBOARD_SECTION_HEADER_CLASS is a non-empty string", () => {
    expect(typeof DASHBOARD_SECTION_HEADER_CLASS).toBe("string");
    expect(DASHBOARD_SECTION_HEADER_CLASS.length).toBeGreaterThan(0);
  });

  it("DASHBOARD_TABLE_HEADER_CLASS is a non-empty string", () => {
    expect(typeof DASHBOARD_TABLE_HEADER_CLASS).toBe("string");
    expect(DASHBOARD_TABLE_HEADER_CLASS.length).toBeGreaterThan(0);
  });
});

// ─── DashboardFormField ───────────────────────────────────────────────────────

describe("DashboardFormField", () => {
  it("renders a labelled input", () => {
    render(<DashboardFormField label="First Name" />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("connects label to input via id", () => {
    render(<DashboardFormField label="Email" id="email-field" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("generates an id when none is provided", () => {
    render(<DashboardFormField label="Auto ID" />);
    expect(screen.getByLabelText("Auto ID")).toBeInTheDocument();
  });

  it("shows required asterisk when isRequired is true", () => {
    render(<DashboardFormField label="Phone" isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show asterisk when isRequired is false (default)", () => {
    render(<DashboardFormField label="Phone" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("displays the error message when error prop is provided", () => {
    render(<DashboardFormField label="Phone" error="Invalid phone" />);
    expect(screen.getByText("Invalid phone")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<DashboardFormField label="Phone" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<DashboardFormField label="Phone" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("passes additional html attributes to the input", () => {
    render(
      <DashboardFormField
        label="Name"
        id="name"
        placeholder="Enter name"
        maxLength={50}
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter name");
    expect(input).toHaveAttribute("maxLength", "50");
  });

  it("merges custom className", () => {
    render(<DashboardFormField label="Name" id="n" className="my-custom" />);
    expect(screen.getByRole("textbox")).toHaveClass("my-custom");
  });
});

// ─── DashboardSelectField ─────────────────────────────────────────────────────

describe("DashboardSelectField", () => {
  it("renders a labelled select", () => {
    render(
      <DashboardSelectField label="Status">
        <option value="">Choose…</option>
      </DashboardSelectField>,
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("connects label to select via id", () => {
    render(
      <DashboardSelectField label="Role" id="role-select">
        <option value="admin">Admin</option>
      </DashboardSelectField>,
    );
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
  });

  it("generates an id when none is provided", () => {
    render(
      <DashboardSelectField label="Auto Select">
        <option>A</option>
      </DashboardSelectField>,
    );
    expect(screen.getByLabelText("Auto Select")).toBeInTheDocument();
  });

  it("shows required asterisk when isRequired is true", () => {
    render(
      <DashboardSelectField label="Type" isRequired>
        <option>A</option>
      </DashboardSelectField>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders children as options", () => {
    render(
      <DashboardSelectField label="Type">
        <option value="a">Alpha</option>
        <option value="b">Beta</option>
      </DashboardSelectField>,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    render(
      <DashboardSelectField label="Type" error="Required">
        <option>A</option>
      </DashboardSelectField>,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(
      <DashboardSelectField label="Type" error="Required">
        <option>A</option>
      </DashboardSelectField>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(
      <DashboardSelectField label="Type">
        <option>A</option>
      </DashboardSelectField>,
    );
    expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-invalid");
  });

  it("merges custom className", () => {
    render(
      <DashboardSelectField label="x" className="extra-class">
        <option>x</option>
      </DashboardSelectField>,
    );
    expect(screen.getByRole("combobox")).toHaveClass("extra-class");
  });
});

// ─── DashboardTextareaField ───────────────────────────────────────────────────

describe("DashboardTextareaField", () => {
  it("renders a labelled textarea", () => {
    render(<DashboardTextareaField label="Notes" />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("connects label to textarea via id", () => {
    render(<DashboardTextareaField label="Description" id="desc" />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("generates an id when none is provided", () => {
    render(<DashboardTextareaField label="Auto Textarea" />);
    expect(screen.getByLabelText("Auto Textarea")).toBeInTheDocument();
  });

  it("shows required asterisk when isRequired is true", () => {
    render(<DashboardTextareaField label="Notes" isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    render(<DashboardTextareaField label="Notes" error="Too short" />);
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<DashboardTextareaField label="Notes" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<DashboardTextareaField label="Notes" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("passes rows and placeholder attributes through", () => {
    render(
      <DashboardTextareaField label="Notes" rows={4} placeholder="Add notes" />,
    );
    const ta = screen.getByRole("textbox");
    expect(ta).toHaveAttribute("rows", "4");
    expect(ta).toHaveAttribute("placeholder", "Add notes");
  });

  it("merges custom className", () => {
    render(<DashboardTextareaField label="x" className="custom-ta" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-ta");
  });
});
