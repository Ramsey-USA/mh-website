/**
 * Hero Section Type Definitions
 * Enforces MH Branding Standards v7.2.0 at compile time
 *
 * These types ensure that all hero sections conform to:
 * - Canonical CSS class structure
 * - Required component properties
 * - Proper text positioning and styling
 * - PageNavigation inclusion
 */

/**
 * Dual naming format: Military designation → Civilian label
 * Examples:
 *   - "Base HQ → Home"
 *   - "Our Oath → About Us"
 *   - "Operations → Services"
 *   - "Chain of Command → Our Team"
 */
export interface HeroDualNaming {
  /** Military or operations term (left side of →) */
  military: string;
  /** Civilian or standard label (right side of →) */
  civilian: string;

  /** Returns formatted string: "Military → Civilian" */
  toString(): string;
}

/**
 * Hero section content that must be included in all pages
 */
export interface HeroContent {
  /** Dual naming format: "Military → Civilian" */
  dualNaming: string | HeroDualNaming;

  /** Page-specific mantra or subtitle */
  mantra: string;

  /** Supporting description or mission statement */
  description?: string | undefined;

  /** Optional company slogan (defaults to "Built on Quality, Backed by Trust.") */
  slogan?: string | undefined;

  /** Additional context or serving area information */
  serving?: string | undefined;
}

/**
 * Hero section styling must conform to canonical structure
 */
export interface HeroStyling {
  /** Must include: "hero-section relative flex items-end justify-end text-white overflow-hidden" */
  className: string;

  /**
   * Must be: "calc(100vh - var(--mh-nav-offset, 6.5rem))"
   * Ensures hero clears fixed header and navigation
   */
  height: "calc(100vh - var(--mh-nav-offset, 6.5rem))";

  /**
   * Background must use gradient pattern:
   * "bg-linear-to-br from-gray-900 via-brand-primary to-gray-900"
   */
  backgroundGradient: string;

  /**
   * Overlay must use: "bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
   * Ensures text readability over background
   */
  overlayGradient: string;
}

/**
 * Bottom-right text positioning (required for all hero sections)
 */
export interface HeroTextPositioning {
  /** Must include ml-auto to push content to right */
  marginLeft: "ml-auto";

  /** Right margin classes: "mr-4 sm:mr-6 lg:mr-8 xl:mr-12" */
  marginRight: "mr-4 sm:mr-6 lg:mr-8 xl:mr-12";

  /** Bottom margin classes: "mb-32 sm:mb-36 md:mb-40 lg:mb-44" */
  marginBottom: "mb-32 sm:mb-36 md:mb-40 lg:mb-44";

  /** Max width constraint */
  maxWidth: "max-w-2xl";

  /** Text alignment */
  textAlign: "text-right";
}

/**
 * Typography scale for hero headings
 * Must scale from mobile to desktop using clamp() or responsive classes
 */
export interface HeroTypography {
  /**
   * Main heading classes:
   * "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
   */
  headingSize: string;

  /** Subheading size for dual naming line */
  subheadingSize: string;

  /** Color: must use text-white for main content */
  headingColor: "text-white";

  /** Brand color for accent lines: text-brand-secondary or text-brand-primary */
  accentColor: "text-brand-secondary" | "text-brand-primary";

  /** Font weight: font-black for headings */
  fontWeight: "font-black";
}

/**
 * PageNavigation requirement for all hero sections
 * Must be positioned at: "absolute bottom-0 left-0 right-0"
 */
export interface HeroNavigation {
  /** Component must be included */
  component: "PageNavigation";

  /** Fixed position at bottom */
  position: "absolute bottom-0 left-0 right-0";

  /** Z-index for proper layering */
  zIndex: number;

  /** Must show remaining pages overlay on "More" */
  showRemainingPagesOverlay: true;
}

/**
 * Props for a compliant hero section component
 * If a component doesn't satisfy this interface, it violates standards
 */
export interface CompliantHeroProps {
  /** Page content requirements */
  content: HeroContent;

  /** Styling must match canonical structure */
  styling: HeroStyling;

  /** Text must be positioned bottom-right */
  positioning: HeroTextPositioning;

  /** Typography must scale responsively */
  typography: HeroTypography;

  /** PageNavigation must be included */
  navigation: HeroNavigation;

  /** Optional: page-specific background image or video */
  backgroundMedia?: {
    src: string;
    alt: string;
    type: "image" | "video";
  };
}

/**
 * Validates hero section content at runtime
 * Throws if content violates standards
 */
export function validateHeroContent(content: HeroContent): void {
  // Dual naming must be present
  if (!content.dualNaming) {
    throw new Error(
      "Hero content missing required dual naming format (Military → Civilian)",
    );
  }

  // Mantra must be present and non-empty
  if (!content.mantra || content.mantra.trim().length === 0) {
    throw new Error("Hero content missing required page-specific mantra");
  }

  // Slogan should reference "Built on Quality, Backed by Trust."
  if (
    content.slogan &&
    !content.slogan.includes("Built on Quality, Backed by Trust")
  ) {
    console.warn(
      "Hero slogan should include 'Built on Quality, Backed by Trust.' for consistency",
    );
  }
}

/**
 * Validates hero section props structure at runtime
 */
export function validateHeroProps(props: Partial<CompliantHeroProps>): void {
  const required = [
    "content",
    "styling",
    "positioning",
    "typography",
    "navigation",
  ] as const;

  for (const field of required) {
    if (!props[field]) {
      throw new Error(
        `Hero component missing required property: ${field}\nAll hero sections must conform to CompliantHeroProps interface`,
      );
    }
  }

  if (props.content) {
    validateHeroContent(props.content);
  }

  // Validate styling
  if (
    props.styling &&
    !props.styling.className.includes("hero-section") &&
    !props.styling.className.includes("flex items-end justify-end")
  ) {
    throw new Error(
      "Hero styling className must include canonical classes: 'hero-section relative flex items-end justify-end text-white overflow-hidden'",
    );
  }

  // Validate height
  if (
    props.styling &&
    props.styling.height !== "calc(100vh - var(--mh-nav-offset, 6.5rem))"
  ) {
    throw new Error(
      "Hero height must be: 'calc(100vh - var(--mh-nav-offset, 6.5rem))'",
    );
  }

  // Validate positioning
  if (props.positioning && !props.positioning.marginLeft.includes("ml-auto")) {
    throw new Error(
      "Hero text must use bottom-right positioning with 'ml-auto'",
    );
  }

  // Validate navigation
  if (
    props.navigation &&
    props.navigation.position !== "absolute bottom-0 left-0 right-0"
  ) {
    throw new Error(
      "PageNavigation must be positioned at 'absolute bottom-0 left-0 right-0'",
    );
  }
}

/**
 * Helper to create a compliant hero content object
 */
export function createHeroContent(
  military: string,
  civilian: string,
  mantra: string,
  options?: {
    description?: string;
    slogan?: string;
    serving?: string;
  },
): HeroContent {
  return {
    dualNaming: `${military} → ${civilian}`,
    mantra,
    description: options?.description ?? undefined,
    slogan:
      options?.slogan ??
      "Built on Quality, Backed by Trust. Squared away from start to finish.",
    serving: options?.serving ?? undefined,
  };
}

/**
 * TypeScript brand for marking components as hero-compliant
 * Use this to ensure components follow standards at type level
 */
export type HeroCompliant = {
  readonly __heroCompliant: true;
};

/**
 * Branded type for hero components that pass validation
 */
export type ValidatedHeroComponent = React.FC<CompliantHeroProps> &
  HeroCompliant;
