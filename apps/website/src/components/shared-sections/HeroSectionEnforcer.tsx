/**
 * Hero Section Enforcer Component
 * Ensures all hero sections conform to MH Branding Standards v7.2.0
 *
 * This component wraps hero section implementation and enforces:
 * - Canonical CSS structure
 * - Required content (dual naming, mantra)
 * - Proper spacing and positioning
 * - No prohibited elements (CTA buttons, stats in hero)
 *
 * Usage:
 * <HeroSectionEnforcer
 *   dualNaming="Base HQ → Home"
 *   mantra="Your Mission"
 *   content={<your hero content>}
 * />
 */

import { type ReactNode } from "react";
import { MH_SLOGANS } from "@/lib/branding/page-names";

export interface HeroSectionEnforcerProps {
  /** Dual naming format: "Military → Civilian" */
  dualNaming: string;

  /** Page-specific mantra */
  mantra: string;

  /** Hero content (text, subtitle, etc.) - passed as children or explicit content prop */
  content?: ReactNode;

  /** Optional background image/video element */
  backgroundElement?: ReactNode;

  /** Optional page slogan (defaults to canonical slogan) */
  slogan?: string;

  /** Optional serving area information */
  serving?: string;

  /** Optional supporting slogan (defaults to approved supporting line) */
  supportingSlogan?: string;

  /** Additional className overrides (should not break canonical structure) */
  contentClassName?: string;

  /** Children used as hero content if content prop not provided */
  children?: ReactNode;
}

/**
 * HeroSectionEnforcer Component
 * Guarantees all hero sections maintain MH Branding compliance
 */
export function HeroSectionEnforcer({
  dualNaming,
  mantra,
  content,
  backgroundElement,
  slogan = MH_SLOGANS.primary,
  supportingSlogan = "No gaps. No guesswork. Just accountable follow-through.",
  serving,
  contentClassName = "",
  children,
}: Readonly<HeroSectionEnforcerProps>) {
  // Validate required fields at runtime
  if (!dualNaming || !dualNaming.includes("→")) {
    throw new Error(
      "HeroSectionEnforcer: dualNaming must include '→' (e.g., 'Military → Civilian')",
    );
  }

  if (!mantra) {
    throw new Error("HeroSectionEnforcer: mantra is required");
  }

  const heroContent = content || children;

  return (
    <section
      data-page-hero="true"
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
    >
      {/* CANONICAL BACKGROUND STRUCTURE */}
      <div className="absolute inset-0">
        {backgroundElement ? (
          <>{backgroundElement}</>
        ) : (
          <>
            {/* Default gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
            {/* Overlay for text readability */}
            <div
              className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* CANONICAL TEXT POSITIONING: BOTTOM-RIGHT */}
      <div
        className={`hero-safe-top hero-safe-bottom relative z-10 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176 ${contentClassName}`}
      >
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            {/* Dual Naming: Military → Civilian */}
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              {dualNaming}
            </span>

            {/* Page-Specific Mantra */}
            <span className="block text-brand-secondary">{mantra}</span>

            {/* Optional Hero Content */}
            {heroContent && (
              <span className="block text-white/90 text-base sm:text-lg mt-2">
                {heroContent}
              </span>
            )}

            {/* Company Slogan */}
            <span className="block text-white mt-2">{slogan}</span>

            {/* Supporting Slogan */}
            <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
              {supportingSlogan}
            </span>

            {/* Optional Serving Area */}
            {serving && (
              <span className="block text-brand-secondary/75 text-xs xs:text-sm sm:text-base mt-2">
                {serving}
              </span>
            )}
          </h1>
        </div>
      </div>
    </section>
  );
}

/**
 * Type guard: verify that a component uses HeroSectionEnforcer
 */
export function isHeroSectionEnforcer(
  component: ReactNode,
): component is ReturnType<typeof HeroSectionEnforcer> {
  if (component == null || typeof component !== "object") {
    return false;
  }

  const candidate = component as { type?: unknown };
  return "type" in component && candidate.type === HeroSectionEnforcer;
}

/**
 * Validation hook for custom hero implementations
 * Use in custom hero components to verify they meet standards
 */
export function useHeroValidation(config: {
  hasDualNaming: boolean;
  hasMantra: boolean;
  hasBottomRightPositioning: boolean;
  hasCanonicalClass: boolean;
  hasProperHeight: boolean;
}): { isValid: boolean; violations: string[] } {
  const violations: string[] = [];

  if (!config.hasDualNaming) {
    violations.push("Missing dual naming format (Military → Civilian)");
  }
  if (!config.hasMantra) {
    violations.push("Missing page-specific mantra");
  }
  if (!config.hasBottomRightPositioning) {
    violations.push("Missing bottom-right text positioning (ml-auto required)");
  }
  if (!config.hasCanonicalClass) {
    violations.push(
      'Missing canonical hero class: "hero-section relative flex items-end justify-end text-white overflow-hidden"',
    );
  }
  if (!config.hasProperHeight) {
    violations.push(
      'Missing proper height: "calc(100vh - var(--mh-nav-offset, 6.5rem))"',
    );
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}
