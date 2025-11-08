/**
 * Slogan Component
 *
 * Displays dedicated page-specific slogans with consistent brand styling.
 *
 * @see /docs/branding/strategy/slogan-rotation-guide.md - Complete slogan guide
 * @see /src/lib/data/slogans.ts - Slogan data and assignments
 */

import React from "react";
import {
  getSloganForPage,
  getSloganDetails,
  isSloganReusable,
} from "@/lib/data/slogans";

/**
 * Slogan display variants
 */
export type SloganVariant =
  | "hero" // Large hero text with dramatic styling
  | "hero-subtitle" // Subtitle under hero heading
  | "tagline" // Small tagline below main heading
  | "section" // Section heading accent
  | "footer" // Footer signature
  | "inline"; // Inline text within content

/**
 * Slogan component props
 */
export interface SloganProps {
  /** Page identifier to get dedicated slogan (e.g., 'homepage', 'about', 'services') */
  page: string;

  /** Context within the page (e.g., 'hero', 'tagline', 'cta', or section name) */
  context?: string;

  /** Display variant - affects size, weight, and styling */
  variant?: SloganVariant;

  /** Custom slogan text (overrides page assignment) - Use sparingly, prefer page assignments */
  customText?: string;

  /** Additional CSS classes */
  className?: string;

  /** Show tier badge for development/debugging */
  showTierBadge?: boolean;

  /** HTML element to render as (default: 'p') */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

/**
 * Slogan Component
 *
 * Renders page-specific slogans with proper brand styling and typography.
 * Automatically retrieves dedicated slogan for the specified page and context.
 *
 * @example
 * ```tsx
 * // Hero slogan on homepage
 * <Slogan page="homepage" context="hero" variant="hero" />
 *
 * // Tagline on services page
 * <Slogan page="services" context="tagline" variant="tagline" />
 *
 * // Section-specific slogan
 * <Slogan page="team" context="expertise" variant="section" as="h3" />
 *
 * // Custom slogan (use sparingly)
 * <Slogan
 *   page="custom"
 *   customText="Special Event Slogan"
 *   variant="hero-subtitle"
 * />
 * ```
 */
export function Slogan({
  page,
  context = "hero",
  variant = "tagline",
  customText,
  className = "",
  showTierBadge = false,
  as: Element = "p",
}: SloganProps) {
  // Get slogan text from page assignment or use custom text
  const sloganText = customText ?? getSloganForPage(page, context);

  // If no slogan found, return null (fail silently in production)
  if (!sloganText) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Slogan] No slogan found for page="${page}" context="${context}". ` +
          `Check /src/lib/data/slogans.ts PAGE_SLOGANS mapping.`,
      );
    }
    return null;
  }

  // Get slogan metadata for tier info
  const sloganDetails = getSloganDetails(sloganText);
  const isReusable = isSloganReusable(sloganText);

  // Build variant-specific classes
  const variantClasses = getVariantClasses(variant);

  // Build combined class string
  const combinedClasses = `${variantClasses} ${className}`.trim();

  return (
    <Element className={combinedClasses}>
      {sloganText}

      {/* Development tier badge */}
      {showTierBadge &&
        process.env.NODE_ENV === "development" &&
        sloganDetails && (
          <span
            className="ml-2 inline-block rounded-full bg-leather-tan/20 px-2 py-0.5 text-xs font-medium text-leather-tan"
            title={`Tier ${sloganDetails.tier} - ${isReusable ? "Reusable" : "Dedicated"}`}
          >
            T{sloganDetails.tier}
          </span>
        )}
    </Element>
  );
}

/**
 * Get Tailwind classes for each variant
 */
function getVariantClasses(variant: SloganVariant): string {
  const baseClasses = "font-display leading-tight";

  switch (variant) {
    case "hero":
      return `${baseClasses} text-4xl md:text-5xl lg:text-6xl font-bold text-hunter-green`;

    case "hero-subtitle":
      return `${baseClasses} text-2xl md:text-3xl lg:text-4xl font-semibold text-leather-tan`;

    case "tagline":
      return `${baseClasses} text-lg md:text-xl font-medium text-hunter-green/80 italic`;

    case "section":
      return `${baseClasses} text-xl md:text-2xl font-semibold text-hunter-green border-l-4 border-leather-tan pl-4`;

    case "footer":
      return `${baseClasses} text-sm md:text-base font-medium text-white/80 italic`;

    case "inline":
      return `font-display text-base font-medium text-hunter-green italic`;

    default:
      return baseClasses;
  }
}

/**
 * SloganDisplay - Preset component for common slogan placements
 *
 * Provides common slogan display patterns with pre-configured styling.
 */
export interface SloganDisplayProps
  extends Omit<SloganProps, "variant" | "as"> {
  /** Display location preset */
  location:
    | "page-hero"
    | "page-subtitle"
    | "section-header"
    | "footer-signature";
}

/**
 * SloganDisplay Component
 *
 * Pre-configured slogan displays for common page locations.
 *
 * @example
 * ```tsx
 * <SloganDisplay page="homepage" context="hero" location="page-hero" />
 * <SloganDisplay page="about" context="tagline" location="page-subtitle" />
 * ```
 */
export function SloganDisplay({
  page,
  context = "hero",
  location,
  ...rest
}: SloganDisplayProps) {
  const locationConfig = {
    "page-hero": {
      variant: "hero" as SloganVariant,
      as: "h1" as const,
      className: "text-center mb-4",
    },
    "page-subtitle": {
      variant: "hero-subtitle" as SloganVariant,
      as: "p" as const,
      className: "text-center mb-8",
    },
    "section-header": {
      variant: "section" as SloganVariant,
      as: "h2" as const,
      className: "mb-6",
    },
    "footer-signature": {
      variant: "footer" as SloganVariant,
      as: "p" as const,
      className: "text-center",
    },
  };

  const config = locationConfig[location];

  return (
    <Slogan
      page={page}
      context={context}
      variant={config.variant}
      as={config.as}
      className={config.className}
      {...rest}
    />
  );
}

/**
 * Hero Section with Integrated Slogan
 *
 * Complete hero section with heading, slogan, and optional CTA.
 */
export interface HeroWithSloganProps {
  /** Page identifier */
  page: string;

  /** Main hero heading */
  heading: string;

  /** Hero context for slogan (default: 'hero') */
  heroContext?: string;

  /** Tagline context for slogan (default: 'tagline') */
  taglineContext?: string;

  /** Optional CTA button */
  cta?: React.ReactNode;

  /** Background image URL */
  backgroundImage?: string;

  /** Additional container classes */
  className?: string;
}

/**
 * HeroWithSlogan Component
 *
 * Complete hero section with integrated slogan support.
 *
 * @example
 * ```tsx
 * <HeroWithSlogan
 *   page="homepage"
 *   heading="Welcome to MH Construction"
 *   heroContext="hero"
 *   taglineContext="tagline"
 *   cta={<Button>Get Started</Button>}
 *   backgroundImage="/images/hero-bg.jpg"
 * />
 * ```
 */
export function HeroWithSlogan({
  page,
  heading,
  heroContext = "hero",
  taglineContext = "tagline",
  cta,
  backgroundImage,
  className = "",
}: HeroWithSloganProps) {
  return (
    <section
      className={`relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-hunter-green to-hunter-green/80 py-20 text-white ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(56, 104, 81, 0.85), rgba(56, 104, 81, 0.85)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        <Slogan
          page={page}
          context={heroContext}
          variant="hero-subtitle"
          className="mx-auto mb-4 max-w-3xl text-leather-tan"
        />

        <Slogan
          page={page}
          context={taglineContext}
          variant="tagline"
          className="mx-auto mb-8 max-w-2xl text-white/90"
        />

        {cta && <div className="flex justify-center">{cta}</div>}
      </div>
    </section>
  );
}

/**
 * Slogan with icon
 *
 * Displays slogan with Material Icon
 */
export interface SloganWithIconProps extends SloganProps {
  /** Material Icon name (e.g., 'handshake', 'construction') */
  icon?: string;

  /** Icon position */
  iconPosition?: "left" | "right";
}

/**
 * SloganWithIcon Component
 *
 * Slogan with optional Material Icon decoration.
 *
 * @example
 * ```tsx
 * <SloganWithIcon
 *   page="trade-partners"
 *   context="hero"
 *   variant="section"
 *   icon="construction"
 *   iconPosition="left"
 * />
 * ```
 */
export function SloganWithIcon({
  icon,
  iconPosition = "left",
  page,
  context,
  variant,
  className = "",
  ...rest
}: SloganWithIconProps) {
  const sloganElement = (
    <Slogan
      page={page}
      context={context}
      variant={variant}
      className={className}
      {...rest}
    />
  );

  if (!icon) return sloganElement;

  return (
    <div className="flex items-center gap-3">
      {iconPosition === "left" && (
        <span className="material-icons text-leather-tan" aria-hidden="true">
          {icon}
        </span>
      )}

      {sloganElement}

      {iconPosition === "right" && (
        <span className="material-icons text-leather-tan" aria-hidden="true">
          {icon}
        </span>
      )}
    </div>
  );
}

export default Slogan;
