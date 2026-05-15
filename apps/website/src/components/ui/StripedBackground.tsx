import React from "react";

/**
 * StripedBackground: A reusable background component for consistent brand stripes.
 * Applies diagonal stripes in both light and dark mode, with mode-aware color/opacity.
 * Usage: Wrap main content sections (not hero/footer) for visual congruency.
 */
export const StripedBackground: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div className={`relative ${className}`}>
    {/* Stripes Layer */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(56,104,81,0.13) 0px, rgba(56,104,81,0.13) 2px, transparent 2px, transparent 56px)",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 2px, transparent 2px, transparent 56px)",
        }}
      />
    </div>
    {/* Content Layer */}
    <div className="relative z-10">{children}</div>
  </div>
);
