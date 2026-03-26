import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/analytics/TrackedContactLinks", () => ({
  TrackedPhoneLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a {...props}>{children}</a>
  ),
  TrackedEmailLink: ({ children, trackId, trackProperties, ...props }: any) => (
    <a {...props}>{children}</a>
  ),
  TrackedLocationLink: ({
    children,
    trackId,
    trackProperties,
    ...props
  }: any) => <a {...props}>{children}</a>,
}));

jest.mock("@/components/ui/modals/AdminSignInModal", () => ({
  AdminSignInModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? (
      <div role="dialog" aria-labelledby="admin-access-title">
        <h2 id="admin-access-title">Admin Access</h2>
      </div>
    ) : null,
}));

describe("Footer", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows license numbers without relying on hover tooltips", () => {
    render(<Footer />);

    expect(screen.getByText("MHCONCI907R7")).toBeVisible();
    expect(screen.getByText("765043-99")).toBeVisible();
    expect(screen.getByText("RCE-49250")).toBeVisible();
  });

  it("submits the newsletter form with accessible status feedback", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    await user.type(input, "builder@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/newsletter",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "builder@example.com" }),
        }),
      );
    });

    expect(await screen.findByRole("status")).toHaveTextContent("Subscribed!");
    expect(input).toHaveValue("");
  });

  it("opens the admin modal from the private keyboard shortcut", () => {
    render(<Footer />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "A", ctrlKey: true, shiftKey: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /admin access/i }),
    ).toBeInTheDocument();
  });
});
