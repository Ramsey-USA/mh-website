"use client";

import { type MouseEvent } from "react";
import { useTheme } from "@/contexts/theme-context";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({
  size = "md",
  showLabel = false,
  className = "",
  compact = false,
}: ThemeToggleProps) {
  const { theme, setTheme, isDarkMode } = useTheme();

  if (!theme) {
    // Return a simple fallback if theme is not available
    return (
      <div className={`flex items-center ${className}`}>
        <div className="bg-gray-200 rounded-full w-20 h-8 animate-pulse" />
      </div>
    );
  }

  const handleThemeToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(isDarkMode ? "light" : "dark");
  };

  const themes = [
    {
      key: "light" as const,
      label: "Light",
      icon: "light_mode",
      colors: "text-brand-secondary",
    },
    {
      key: "dark" as const,
      label: "Dark",
      icon: "dark_mode",
      colors: "text-brand-primary",
    },
    {
      key: "system" as const,
      label: "System",
      icon: "computer",
      colors: "text-gray-500",
    },
  ];

  const compactSizeClasses = {
    sm: "w-10 h-10 max-[360px]:w-9 max-[360px]:h-9",
    md: "w-11 h-11",
    lg: "w-12 h-12",
  };

  if (compact) {
    // Compact toggle for mobile/header use
    return (
      <div className="flex items-center">
        <button
          onClick={handleThemeToggle}
          className={cn(
            "relative inline-flex items-center justify-center",
            compactSizeClasses[size],
            "rounded-lg sm:rounded-xl",
            "bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
            "border-2 border-gray-300 dark:border-gray-500",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg hover:shadow-brand-primary/20",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
            "pointer-events-auto cursor-pointer",
            className,
          )}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          type="button"
        >
          <MaterialIcon
            icon={isDarkMode ? "dark_mode" : "light_mode"}
            size={size}
            className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-brand-primary" : "text-brand-secondary",
            )}
          />
        </button>

        {showLabel && (
          <span className="ml-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
            {isDarkMode ? "Dark" : "Light"}
          </span>
        )}
      </div>
    );
  }

  // Full theme selector with 3 options
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
          Theme:
        </span>
      )}

      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 rounded-lg">
        {themes.map(({ key, label, icon, colors }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={cn(
              "relative flex items-center justify-center px-3 py-2 rounded-md",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
              theme === key
                ? "bg-linear-to-r from-brand-primary to-brand-primary-dark text-white shadow-md scale-105"
                : "text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-secondary hover:bg-white dark:hover:bg-gray-700",
            )}
            aria-label={`Switch to ${label.toLowerCase()} mode`}
            title={label}
          >
            <MaterialIcon
              icon={icon}
              size={size}
              className={theme === key ? "text-white" : colors}
            />
            {size === "lg" && (
              <span className="ml-2 font-medium text-xs">{label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
