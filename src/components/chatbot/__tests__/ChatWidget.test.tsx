/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatWidget } from "../ChatWidget";

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({
    icon,
    ariaLabel,
    className,
  }: {
    icon: string;
    ariaLabel?: string;
    className?: string;
    size?: string;
  }) => (
    <span
      data-testid={`icon-${icon}`}
      aria-label={ariaLabel}
      className={className}
    >
      {icon}
    </span>
  ),
}));

// Mock scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = jest.fn();

// Mock matchMedia (not available in jsdom)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe("ChatWidget", () => {
  it("renders the floating trigger button", () => {
    render(<ChatWidget />);
    expect(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    ).toBeInTheDocument();
  });

  it("opens the chat panel when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    expect(
      screen.getByRole("dialog", {
        name: /partnership guide/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it("closes the chat panel when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close (use first close button — mobile back arrow; desktop X also present)
    const closeButtons = screen.getAllByRole("button", { name: /close chat/i });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(closeButtons[0]!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the chat panel on Escape key", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows quick action buttons in the initial state", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    expect(screen.getByText("Your services")).toBeInTheDocument();
    expect(screen.getByText("Meet our Allies")).toBeInTheDocument();
    expect(screen.getByText("Veteran benefits")).toBeInTheDocument();
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("sends a message and displays the response", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        response: "MH Construction provides commercial construction services.",
      }),
    });

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "What do you do?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // User message appears
    expect(screen.getByText("What do you do?")).toBeInTheDocument();

    // Wait for assistant response
    await waitFor(() => {
      expect(
        screen.getByText(
          "MH Construction provides commercial construction services.",
        ),
      ).toBeInTheDocument();
    });

    // Verify fetch was called correctly
    expect(mockFetch).toHaveBeenCalledWith("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.stringContaining("What do you do?"),
    });
  });

  it("shows error message when fetch fails", async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "Hello");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/having trouble connecting/i),
      ).toBeInTheDocument();
    });
  });

  it("sends message on Enter key", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: "Hello!" }),
    });

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "Hi{Enter}");

    expect(screen.getByText("Hi")).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalled();
  });

  it("triggers quick action on button click", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: "We provide many services." }),
    });

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    await user.click(screen.getByText("Your services"));

    expect(
      screen.getByText("What services does MH Construction provide?"),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("We provide many services.")).toBeInTheDocument();
    });
  });

  it("displays the phone number disclaimer at the bottom", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    expect(screen.getByText("(509) 308-6489")).toBeInTheDocument();
  });

  it("disables send button when input is empty", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeDisabled();
  });

  it("locks body scroll on mobile when chat opens and restores on close", async () => {
    // Override matchMedia to simulate a mobile viewport (max-width: 639px matches)
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query.includes("639px"), // mobile breakpoint
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    // Scroll lock should be applied on mobile
    expect(document.body.style.overflow).toBe("hidden");

    // Close chat — cleanup function restores overflow
    const closeButtons = screen.getAllByRole("button", { name: /close chat/i });
    await user.click(closeButtons[0]!);

    expect(document.body.style.overflow).not.toBe("hidden");

    // Restore default matchMedia mock for subsequent tests
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it("displays fallback message when API response has no 'response' field", async () => {
    const user = userEvent.setup();
    // Return an ok response but with no `response` field
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "Help");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/I wasn't able to process that/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error message when fetch returns a non-ok HTTP status", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "Hello");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/having trouble connecting/i),
      ).toBeInTheDocument();
    });
  });

  it("sendMessage ignores empty/whitespace input (covers !trimmed branch)", async () => {
    render(<ChatWidget />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    // Press Enter with empty input → sendMessage("") → !trimmed=true → early return
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", shiftKey: false });

    // No fetch should be triggered
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("sendMessage ignores call when isLoading is true (covers isLoading branch)", async () => {
    const user = userEvent.setup();
    // A fetch that hangs indefinitely to keep isLoading=true
    let resolveFetch!: (v: unknown) => void;
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );

    render(<ChatWidget />);
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "First message");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // isLoading is now true; set a non-empty value via fireEvent.change (bypasses disabled)
    fireEvent.change(input, { target: { value: "Second message" } });

    // Submit the form while loading — sendMessage should return early
    const form = input.closest("form")!;
    fireEvent.submit(form);

    // Only the initial fetch should have fired (not a second one)
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Clean up hanging fetch
    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ response: "Done" }) });
    });
  });

  it("Shift+Enter does not send the message (covers !e.shiftKey branch)", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "Hello");

    // Shift+Enter should insert a newline, NOT send
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", shiftKey: true });

    // No fetch should be triggered
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("desktop X close button closes the panel", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // closeButtons[0] is the mobile arrow-back, closeButtons[1] is the desktop X
    const closeButtons = screen.getAllByRole("button", { name: /close chat/i });
    expect(closeButtons.length).toBeGreaterThanOrEqual(2);
    await user.click(closeButtons[1]!);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("setTimeout focus-cleanup fires when panel closes before 150 ms", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<ChatWidget />);

    // Open panel — starts the 150 ms focus timer
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    // Close panel immediately — cleanup cancels the pending timer
    const closeButtons = screen.getAllByRole("button", { name: /close chat/i });
    await user.click(closeButtons[0]!);

    // Advance past 150 ms — confirm nothing throws after cleanup
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
