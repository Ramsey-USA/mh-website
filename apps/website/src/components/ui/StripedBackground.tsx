import React from "react";
import { DiagonalStripePattern } from "@/components/ui/backgrounds";

/**
 * StripedBackground: A reusable background wrapper for the MH logo paraplex treatment.
 * Usage: Wrap main content sections (not hero/footer) for visual congruency.
 */
export const StripedBackground: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div className={`relative ${className}`}>
    <DiagonalStripePattern className="pointer-events-none z-0" />
    {/* Content Layer */}
    <div className="relative z-10">{children}</div>
  </div>
);
