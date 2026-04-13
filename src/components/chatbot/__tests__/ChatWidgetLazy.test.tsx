/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidgetLazy from "../ChatWidgetLazy";

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

describe("ChatWidgetLazy", () => {
  it("lazy-loads and renders the ChatWidget", async () => {
    render(<ChatWidgetLazy />);

    // The lazy-loaded component should eventually render
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /open partnership guide chat/i }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("lazy-loaded widget is fully functional", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        response: "We provide commercial construction services.",
      }),
    });

    render(<ChatWidgetLazy />);

    // Wait for lazy load
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /open partnership guide chat/i }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Open chat
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Send a message
    const input = screen.getByRole("textbox", { name: /type your message/i });
    await user.type(input, "What services do you offer?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Verify message is sent
    expect(screen.getByText("What services do you offer?")).toBeInTheDocument();

    // Wait for response
    await waitFor(() => {
      expect(
        screen.getByText("We provide commercial construction services."),
      ).toBeInTheDocument();
    });
  });

  it("lazy-loaded widget shows quick actions", async () => {
    const user = userEvent.setup();
    render(<ChatWidgetLazy />);

    // Wait for lazy load
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /open partnership guide chat/i }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Open chat
    await user.click(
      screen.getByRole("button", { name: /open partnership guide chat/i }),
    );

    // Quick actions should be visible
    expect(screen.getByText("Your services")).toBeInTheDocument();
    expect(screen.getByText("Meet our Allies")).toBeInTheDocument();
    expect(screen.getByText("Veteran benefits")).toBeInTheDocument();
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });
});
