"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  isDarkMode: true,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function isValidTheme(theme: string | null): theme is Theme {
  return theme === "dark" || theme === "light" || theme === "system";
}

function resolveIsDark(theme: Theme) {
  if (theme === "dark") {
    return true;
  }

  if (theme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "mh-construction-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem(storageKey);
    if (isValidTheme(storedTheme)) {
      setThemeState(storedTheme);
    } else {
      setThemeState(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const applyTheme = () => {
      const isDark = resolveIsDark(theme);
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    };

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", applyTheme);
        return () => mediaQuery.removeEventListener("change", applyTheme);
      }

      mediaQuery.addListener(applyTheme);
      return () => mediaQuery.removeListener(applyTheme);
    }

    return undefined;
  }, [theme, mounted]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
    [storageKey],
  );

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      setTheme,
      isDarkMode: mounted && resolveIsDark(theme),
    }),
    [theme, setTheme, mounted],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
