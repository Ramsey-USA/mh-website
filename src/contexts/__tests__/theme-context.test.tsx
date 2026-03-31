/**
 * ThemeProvider / useTheme — unit tests
 */
import React from "react";
import { render, screen, act, renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

function ThemeConsumer() {
  const { theme, setTheme, isDarkMode } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="dark">{String(isDarkMode)}</span>
      <button data-testid="set-dark" onClick={() => setTheme("dark")}>
        dark
      </button>
      <button data-testid="set-light" onClick={() => setTheme("light")}>
        light
      </button>
      <button data-testid="set-system" onClick={() => setTheme("system")}>
        system
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  const matchMediaMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  beforeEach(() => {
    localStorage.clear();
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <span data-testid="child">hello</span>
      </ThemeProvider>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides the default theme (system)", () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("setTheme changes the active theme", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await act(async () => {
      screen.getByTestId("set-dark").click();
    });

    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("persists the chosen theme to localStorage", async () => {
    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await act(async () => {
      screen.getByTestId("set-light").click();
    });

    expect(localStorage.getItem("test-theme")).toBe("light");
  });

  it("reads initial theme from localStorage", () => {
    localStorage.setItem("test-theme-read", "dark");
    render(
      <ThemeProvider storageKey="test-theme-read">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    // The component initially renders with the stored theme
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("toggles dark class on media query change when theme is system", async () => {
    let changeHandler: ((e: { matches: boolean }) => void) | null = null;
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: (
        _event: string,
        handler: (e: { matches: boolean }) => void,
      ) => {
        changeHandler = handler;
      },
      removeEventListener: jest.fn(),
    });

    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    // Initially light (matches: false)
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Simulate OS switching to dark mode
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    await act(async () => {
      changeHandler?.({ matches: true });
    });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

describe("useTheme outside ThemeProvider", () => {
  it("returns the initial default context without throwing", () => {
    function NoProvider() {
      const { theme } = useTheme();
      return <span data-testid="t">{theme}</span>;
    }
    render(<NoProvider />);
    // Default context value has theme = "system"
    expect(screen.getByTestId("t").textContent).toBe("system");
  });

  it("throws when useContext returns undefined for the theme context", () => {
    const originalUseContext = React.useContext;
    jest.spyOn(React, "useContext").mockImplementation((ctx) => {
      const result = originalUseContext(ctx);
      // Intercept the ThemeProviderContext result (has a `theme` property)
      if (result !== null && typeof result === "object" && "theme" in result) {
        return undefined;
      }
      return result;
    });
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    jest.restoreAllMocks();
    consoleSpy.mockRestore();
  });
});
