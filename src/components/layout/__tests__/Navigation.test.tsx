import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "../Navigation";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, fill, priority, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

jest.mock("@/components/ui/layout/ThemeToggle", () => ({
  ThemeToggle: () => <button type="button">Theme toggle</button>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("Navigation", () => {
  it("opens and closes the menu from the hamburger button", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    const toggleButton = screen.getByRole("button", { name: /open menu/i });
    expect(screen.queryByLabelText(/close menu/i)).not.toBeInTheDocument();

    await user.click(toggleButton);

    expect(screen.getAllByLabelText("Close menu")).toHaveLength(2);
    const closeButtons = screen.getAllByRole("button", { name: /close menu/i });
    expect(closeButtons).toHaveLength(2);

    await user.click(closeButtons[0]);

    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("closes the menu when the backdrop handles escape", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const closeButtons = screen.getAllByRole("button", { name: /close menu/i });
    const backdrop = closeButtons[0];
    fireEvent.keyDown(backdrop, { key: "Escape" });

    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("closes the menu after selecting a primary navigation link", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("link", { name: /about us/i }));

    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("closes the menu when the backdrop is clicked", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const closeButtons = screen.getAllByRole("button", { name: /close menu/i });
    await user.click(closeButtons[0]);

    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("closes the menu when a Services link is clicked", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("link", { name: /services/i }));

    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("does not render a Staff Access link", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    expect(
      screen.queryByRole("link", {
        name: /staff access/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("closes the menu after clicking each social media link", async () => {
    const user = userEvent.setup();

    render(<Navigation />);

    for (const label of [
      /follow mh construction on facebook/i,
      /view mh construction on instagram/i,
      /follow mh construction on x/i,
      /watch mh construction on youtube/i,
      /connect with mh construction on linkedin/i,
    ]) {
      // Open the menu
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      // Click the social link — its onClick closes the menu
      await user.click(screen.getByRole("link", { name: label }));
      // Menu should now be closed
      expect(
        screen.queryByLabelText("Close menu", { selector: "button" }),
      ).not.toBeInTheDocument();
    }
  });
});
