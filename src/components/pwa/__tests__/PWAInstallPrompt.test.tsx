import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PWAInstallPrompt } from "../PWAInstallPrompt";

// jest.setup.js mocks usePathname to return "/" by default

// Provide a matchMedia stub for jsdom (which doesn't implement it)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
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
    window.dispatchEvent(event);
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
    (window.matchMedia as jest.Mock).mockReturnValueOnce({
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
