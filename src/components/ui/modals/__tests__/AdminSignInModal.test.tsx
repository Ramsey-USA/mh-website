import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminSignInModal } from "../AdminSignInModal";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock("@/components/ui", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("AdminSignInModal", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    pushMock.mockReset();
    globalThis.localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it("closes on escape and clears entered credentials on reopen", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { rerender } = render(<AdminSignInModal isOpen onClose={onClose} />);

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@mhc-gc.com",
    );
    await user.type(screen.getByLabelText(/Password/i), "secret123");

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<AdminSignInModal isOpen={false} onClose={onClose} />);
    rerender(<AdminSignInModal isOpen onClose={onClose} />);

    expect(screen.getByLabelText(/Email Address/i)).toHaveValue("");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("");
  });

  it("submits successfully, stores auth state, and routes to the dashboard", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        accessToken: "token-123",
        user: { email: "admin@mhc-gc.com", role: "admin" },
      }),
    } as Response);

    render(<AdminSignInModal isOpen onClose={onClose} />);

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@mhc-gc.com",
    );
    await user.type(screen.getByLabelText(/Password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/auth/admin-login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    // Token is persisted as an httpOnly cookie by the server — not in localStorage.
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows server error message when response is not ok (covers else branch)", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Account locked" }),
    } as Response);

    render(<AdminSignInModal isOpen onClose={onClose} />);

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@mhc-gc.com",
    );
    await user.type(screen.getByLabelText(/Password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText("Account locked")).toBeInTheDocument();
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows fallback error when response.ok is false and no error field", async () => {
    const user = userEvent.setup();
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<AdminSignInModal isOpen onClose={jest.fn()} />);

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@mhc-gc.com",
    );
    await user.type(screen.getByLabelText(/Password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("shows generic error message when fetch throws (covers catch block)", async () => {
    const user = userEvent.setup();
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<AdminSignInModal isOpen onClose={jest.fn()} />);

    await user.type(
      screen.getByLabelText(/Email Address/i),
      "admin@mhc-gc.com",
    );
    await user.type(screen.getByLabelText(/Password/i), "secret");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Authentication failed. Please try again."),
      ).toBeInTheDocument();
    });
  });
});
