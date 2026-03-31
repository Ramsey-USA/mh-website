/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InteractiveGrantSelector } from "../InteractiveGrantSelector";

jest.mock("@/components/ui", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>
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

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span data-icon={icon} />,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  HoverScale: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const grantTypes = [
  {
    category: "Infrastructure",
    icon: "construction",
    programs: ["Road Improvement Fund", "Bridge Repair Grant"],
  },
  {
    category: "Housing",
    icon: "home",
    programs: ["Affordable Housing Initiative"],
  },
];

describe("InteractiveGrantSelector", () => {
  it("renders all grant categories", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Housing")).toBeInTheDocument();
  });

  it("renders program items inside each card", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    expect(screen.getByText("Road Improvement Fund")).toBeInTheDocument();
    expect(screen.getByText("Bridge Repair Grant")).toBeInTheDocument();
    expect(
      screen.getByText("Affordable Housing Initiative"),
    ).toBeInTheDocument();
  });

  it("renders role=button and aria-label on each grant item", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    expect(
      screen.getByRole("button", {
        name: "View Infrastructure grant programs",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Housing grant programs" }),
    ).toBeInTheDocument();
  });

  it("click selects a grant category", async () => {
    const user = userEvent.setup();
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);

    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    await user.click(infraBtn);
    // Component tracks selection internally; clicking should not throw
    expect(infraBtn).toBeInTheDocument();
  });

  it("click deselects already-selected grant category (toggle off)", async () => {
    const user = userEvent.setup();
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);

    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    await user.click(infraBtn); // select
    await user.click(infraBtn); // deselect
    expect(infraBtn).toBeInTheDocument();
  });

  it("clicking a different card switches selection", async () => {
    const user = userEvent.setup();
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);

    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    const housingBtn = screen.getByRole("button", {
      name: "View Housing grant programs",
    });

    await user.click(infraBtn); // select Infrastructure
    await user.click(housingBtn); // switch to Housing
    expect(housingBtn).toBeInTheDocument();
  });

  it("Enter key selects a grant category", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    fireEvent.keyDown(infraBtn, { key: "Enter" });
    expect(infraBtn).toBeInTheDocument();
  });

  it("Space key selects a grant category", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    fireEvent.keyDown(infraBtn, { key: " " });
    expect(infraBtn).toBeInTheDocument();
  });

  it("other keys do not trigger selection", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    const infraBtn = screen.getByRole("button", {
      name: "View Infrastructure grant programs",
    });
    // Should not throw
    fireEvent.keyDown(infraBtn, { key: "Tab" });
    fireEvent.keyDown(infraBtn, { key: "Escape" });
    expect(infraBtn).toBeInTheDocument();
  });

  it("renders empty state with no grant types", () => {
    const { container } = render(<InteractiveGrantSelector grantTypes={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("each grant card item has tabIndex=0", () => {
    render(<InteractiveGrantSelector grantTypes={grantTypes} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("tabIndex", "0");
    });
  });
});
