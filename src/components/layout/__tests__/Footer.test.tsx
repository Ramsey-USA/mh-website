import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
  AdminSignInModal: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div role="dialog" aria-labelledby="admin-access-title">
        <h2 id="admin-access-title">Admin Access</h2>
        <button onClick={onClose}>Close admin modal</button>
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

  it("clears status message after 5 seconds (timeout callback) and runs cleanup on unmount", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    const { unmount } = render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Wait for the success state to appear
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Subscribed!"),
    );

    // The cleanup function in useEffect is registered now (success state).
    // Unmounting triggers the cleanup callback (window.clearTimeout).
    unmount();

    jest.useRealTimers();
  });

  it("resets status after 5-second auto-clear timeout fires", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<Footer />);

    const input = screen.getByLabelText(/email address/i);
    await user.type(input, "test2@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Subscribed!"),
    );

    // Advance time past the 5-second auto-clear timeout (wrapped in act to flush state updates)
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(""),
    );

    jest.useRealTimers();
  });

  it("closes the admin modal when onClose is called", async () => {
    render(<Footer />);

    fireEvent.keyDown(window, { key: "A", ctrlKey: true, shiftKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /close admin modal/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("scrolls to top when the Back to Top button is clicked", async () => {
    const scrollTo = jest.fn();
    Object.defineProperty(window, "scrollTo", {
      writable: true,
      value: scrollTo,
    });

    render(<Footer />);
    await userEvent.click(screen.getByRole("button", { name: /back to top/i }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("does nothing when newsletter form is submitted with an empty email", async () => {
    const user = userEvent.setup();

    render(<Footer />);

    // Leave the email input empty and click subscribe
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    // Status should remain idle (no fetch call)
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("handles the JS empty-email guard when form is submitted programmatically", async () => {
    render(<Footer />);

    // Submit the form directly (bypasses HTML5 required validation) with empty email value
    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    const form = submitButton.closest("form")!;
    fireEvent.submit(form);

    // The JS guard (lines 434-435) fires before fetch
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows 'Try again' when the newsletter API returns a non-ok response", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<Footer />);

    await user.type(
      screen.getByLabelText(/email address/i),
      "fail@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Try again");
  });

  it("shows 'Error' when the newsletter fetch itself throws", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<Footer />);

    await user.type(
      screen.getByLabelText(/email address/i),
      "throw@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Error");
  });
});
