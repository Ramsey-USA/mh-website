/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidgetLazy from "../ChatWidgetLazy";

const mockUsePathname = jest.fn();
const mockUseLocale = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/hooks/useLocale", () => ({
  useLocale: () => mockUseLocale(),
}));

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
Object.defineProperty(globalThis, "matchMedia", {
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

Object.defineProperty(globalThis, "requestIdleCallback", {
  writable: true,
  value: jest.fn().mockImplementation((callback: IdleRequestCallback) => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50,
    });
    return 1;
  }),
});

Object.defineProperty(globalThis, "cancelIdleCallback", {
  writable: true,
  value: jest.fn(),
});

// Mock fetch globally
const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  mockUsePathname.mockReturnValue("/");
  mockUseLocale.mockReturnValue("en");
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

  it("does not render on excluded operational routes", async () => {
    mockUsePathname.mockReturnValue("/dashboard");

    render(<ChatWidgetLazy />);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", {
          name: /open partnership guide chat/i,
        }),
      ).not.toBeInTheDocument();
    });
  });

  it("uses Spanish local fallback when fetch fails", async () => {
    const user = userEvent.setup();
    mockUseLocale.mockReturnValue("es");
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ChatWidgetLazy />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", {
            name: /abrir chat de guía de alianzas/i,
          }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(
      screen.getByRole("button", { name: /abrir chat de guía de alianzas/i }),
    );

    const input = screen.getByRole("textbox", {
      name: /escriba su mensaje/i,
    });
    await user.type(input, "¿Qué servicios ofrecen?");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/MH Construction ofrece construcción comercial/i),
      ).toBeInTheDocument();
    });
  });
});
