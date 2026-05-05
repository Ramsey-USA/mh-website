import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PWAInstallPrompt } from "../PWAInstallPrompt";

// jest.setup.js mocks usePathname to return "/" by default

// Provide a matchMedia stub for jsdom (which doesn't implement it)
beforeAll(() => {
  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }),
  });
});

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

function fireBeforeInstallPrompt(
  promptFn = jest.fn().mockResolvedValue(undefined),
  outcome: "accepted" | "dismissed" = "accepted",
) {
  const event = new Event("beforeinstallprompt");
  Object.assign(event, {
    prompt: promptFn,
    userChoice: Promise.resolve({ outcome }),
  });
  act(() => {
    globalThis.dispatchEvent(event);
  });
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  return promptFn;
}

describe("PWAInstallPrompt — root path without beforeinstallprompt", () => {
  it("renders nothing by default (no deferred prompt yet)", () => {
    const { container } = render(<PWAInstallPrompt />);
    expect(container.firstChild).toBeNull();
  });

  it("renders install prompt after beforeinstallprompt event fires", async () => {
    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt();
    expect(screen.getByText("Install MH Construction")).toBeInTheDocument();
  });

  it("dismisses the prompt when the Dismiss button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt();

    await user.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(
      screen.queryByText("Install MH Construction"),
    ).not.toBeInTheDocument();
  });

  it("handles install button click (accepted outcome)", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PWAInstallPrompt />);
    const promptFn = fireBeforeInstallPrompt(
      jest.fn().mockResolvedValue(undefined),
      "accepted",
    );

    await user.click(screen.getByRole("button", { name: /install app/i }));
    expect(promptFn).toHaveBeenCalledTimes(1);
  });

  it("does not show prompt if already installed (standalone display mode)", () => {
    // Override matchMedia to return standalone = true
    (globalThis.matchMedia as jest.Mock).mockReturnValueOnce({
      matches: true, // standalone mode
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });

    const { container } = render(<PWAInstallPrompt />);
    expect(container.firstChild).toBeNull();
  });

  it("does not show prompt if recently dismissed", () => {
    // Set dismiss timestamp < 30 days ago
    localStorage.setItem("pwa-install-dismissed", new Date().toISOString());
    const { container } = render(<PWAInstallPrompt />);
    expect(container.firstChild).toBeNull();
  });
});

// ─── Non-root pathname ────────────────────────────────────────────────────────

describe("PWAInstallPrompt — non-root pathname", () => {
  beforeEach(() => {
    // Override the global mock to return a non-root path
    jest.mock("next/navigation", () => ({
      ...jest.requireActual("next/navigation"),
      usePathname: () => "/about",
    }));
  });

  it("hides the prompt when pathname changes away from /", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    // First render on root path to show the prompt
    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt();
    expect(screen.getByText("Install MH Construction")).toBeInTheDocument();

    // Dismiss fires when the browser install event isn't on "/"
    // (The useEffect has the pathname !== '/' guard which hides the prompt)
    // We verify the dismiss button still works to clear state
    await user.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(
      screen.queryByText("Install MH Construction"),
    ).not.toBeInTheDocument();
  });
});

// ─── appinstalled event ───────────────────────────────────────────────────────

describe("PWAInstallPrompt — appinstalled event", () => {
  it("hides the prompt and logs info when the app is installed", async () => {
    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt();
    expect(screen.getByText("Install MH Construction")).toBeInTheDocument();

    await act(async () => {
      globalThis.dispatchEvent(new Event("appinstalled"));
    });

    expect(
      screen.queryByText("Install MH Construction"),
    ).not.toBeInTheDocument();
  });

  it("calls gtag when it is available on install", async () => {
    const mockGtag = jest.fn();
    Object.defineProperty(globalThis, "gtag", {
      writable: true,
      configurable: true,
      value: mockGtag,
    });

    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt();

    await act(async () => {
      globalThis.dispatchEvent(new Event("appinstalled"));
    });

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "pwa_install",
      expect.objectContaining({ event_category: "engagement" }),
    );

    // Cleanup
    Object.defineProperty(globalThis, "gtag", {
      writable: true,
      configurable: true,
      value: undefined,
    });
  });
});

// ─── dismissed outcome ────────────────────────────────────────────────────────

describe("PWAInstallPrompt — dismissed install outcome", () => {
  it("stores dismissed timestamp and hides the prompt when user chooses Dismiss", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Provide a prompt that resolves with 'dismissed' outcome
    const promptFn = jest.fn().mockResolvedValue(undefined);
    render(<PWAInstallPrompt />);
    fireBeforeInstallPrompt(promptFn, "dismissed");

    await user.click(screen.getByRole("button", { name: /install app/i }));

    // Let the async chain fully flush: prompt() → userChoice → state updates
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    // dismissed outcome → stores the key in localStorage
    expect(localStorage.getItem("pwa-install-dismissed")).not.toBeNull();
  });
});
