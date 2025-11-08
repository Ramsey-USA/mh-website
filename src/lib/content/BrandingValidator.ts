/**
 * MH Construction Brand Validation Utility
 * Ensures content compliance with MH branding guidelines
 */

export interface BrandValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
}

export interface BrandingGuidelines {
  primaryTagline: string;
  supportingTaglines: string[];
  primaryColors: string[];
  secondaryColors: string[];
  prohibitedEmojis: boolean;
  requiredIcons: string[];
  regionalFocus: string[];
  partnershipMessaging: string[];
}

// MH Construction branding guidelines from MD files
export const MH_BRANDING_GUIDELINES: BrandingGuidelines = {
  primaryTagline: "Building for the Owner, NOT the Dollar",
  supportingTaglines: [
    "Your Partner in Building Tomorrow",
    "Working WITH you to serve our communities",
    "Where Military Precision Meets Construction Excellence",
    "We Work With You",
  ],
  primaryColors: ["#386851", "#BD9264"], // Hunter Green, Leather Tan
  secondaryColors: ["#4a7a63", "#c9a176"], // Light variants
  prohibitedEmojis: true, // Emojis prohibited in source code
  requiredIcons: ["construction", "military_tech", "handshake", "engineering"],
  regionalFocus: ["Tri-Cities", "Pasco", "Washington", "Oregon", "Idaho"],
  partnershipMessaging: [
    "partnership",
    "we work with you",
    "collaboration",
    "trust",
  ],
};

/**
 * Validate content against MH branding guidelines
 */
export function validateBrandCompliance(
  content: string,
  contentType: "page" | "component" | "markdown" = "page"
): BrandValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Check for emoji usage in source code (critical violation)
  if (contentType !== "markdown") {
    // Simple emoji detection for common emojis used in construction/business
    const commonEmojis = [
      "🏗️",
      "🔧",
      "⚡",
      "🎯",
      "📝",
      "📞",
      "✅",
      "❌",
      "🚀",
      "💼",
      "🏢",
      "👥",
    ];
    const foundEmojis = commonEmojis.filter((emoji) => content.includes(emoji));

    if (foundEmojis.length > 0) {
      errors.push(
        `CRITICAL: Emojis found in source code: ${foundEmojis.join(", ")}. Use MaterialIcon components instead.`
      );
      score -= 30;
    }
  }

  // Check for primary tagline presence
  const hasMainTagline = content.includes(
    MH_BRANDING_GUIDELINES.primaryTagline
  );
  if (!hasMainTagline && contentType === "page") {
    warnings.push(
      `Primary tagline "${MH_BRANDING_GUIDELINES.primaryTagline}" not found. Consider including for brand consistency.`
    );
    score -= 10;
  }

  // Check for partnership messaging
  const partnershipTerms = MH_BRANDING_GUIDELINES.partnershipMessaging.some(
    (term) => content.toLowerCase().includes(term.toLowerCase())
  );
  if (!partnershipTerms && contentType === "page") {
    warnings.push(
      'Partnership messaging not detected. Consider including "We Work With You" philosophy.'
    );
    score -= 5;
  }

  // Check for regional focus
  const regionalTerms = MH_BRANDING_GUIDELINES.regionalFocus.some((region) =>
    content.toLowerCase().includes(region.toLowerCase())
  );
  if (!regionalTerms && contentType === "page") {
    warnings.push(
      "Regional focus (Tri-Cities, Pasco, WA, OR, ID) not mentioned. Consider adding service area information."
    );
    score -= 5;
  }

  // Check for proper Material Icon usage
  const hasMaterialIcons = content.includes("MaterialIcon");
  const _hasIconImports =
    content.includes("MaterialIcon") ||
    content.includes("@/components/icons/MaterialIcon");

  if (contentType === "component" && !hasMaterialIcons) {
    warnings.push(
      "No MaterialIcon components detected. Ensure visual elements use approved icon system."
    );
    score -= 5;
  }

  // Check for proper color usage (CSS custom properties)
  const hasProperColors =
    content.includes("text-primary") ||
    content.includes("bg-primary") ||
    content.includes("var(--brand-primary)") ||
    content.includes("#386851") ||
    content.includes("#BD9264");

  if (contentType === "component" && !hasProperColors) {
    warnings.push(
      "Brand colors not detected. Use primary/secondary color classes or CSS custom properties."
    );
    score -= 5;
  }

  // Check for hardcoded content vs dynamic loading
  if (contentType === "page") {
    const hasHardcodedContent =
      content.includes("const coreValues =") ||
      content.includes("const services =") ||
      content.includes("const teamData =");

    if (hasHardcodedContent) {
      warnings.push(
        "Hardcoded content detected. Consider migrating to dynamic markdown loading for better maintainability."
      );
      score -= 10;
    }
  }

  // Check for proper responsive design patterns
  const hasResponsiveClasses =
    content.includes("md:") ||
    content.includes("lg:") ||
    content.includes("sm:");
  if (contentType === "component" && !hasResponsiveClasses) {
    warnings.push(
      "Responsive design classes not detected. Ensure mobile-first approach."
    );
    score -= 5;
  }

  // Calculate final validation result
  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
    score: Math.max(0, score),
  };
}

/**
 * Validate multiple content pieces at once
 */
export function validateMultipleContent(
  contentMap: Record<
    string,
    { content: string; type: "page" | "component" | "markdown" }
  >
): Record<string, BrandValidationResult> {
  const results: Record<string, BrandValidationResult> = {};

  Object.entries(contentMap).forEach(([key, { content, type }]) => {
    results[key] = validateBrandCompliance(content, type);
  });

  return results;
}

/**
 * Generate a brand compliance report
 */
export function generateComplianceReport(
  results: Record<string, BrandValidationResult>
): string {
  let report = "# MH Construction Brand Compliance Report\n\n";

  const totalFiles = Object.keys(results).length;
  const validFiles = Object.values(results).filter((r) => r.isValid).length;
  const averageScore =
    Object.values(results).reduce((sum, r) => sum + r.score, 0) / totalFiles;

  report += `## Summary\n`;
  report += `- **Total Files Checked**: ${totalFiles}\n`;
  report += `- **Valid Files**: ${validFiles}/${totalFiles} (${Math.round((validFiles / totalFiles) * 100)}%)\n`;
  report += `- **Average Score**: ${Math.round(averageScore)}/100\n\n`;

  report += `## Detailed Results\n\n`;

  Object.entries(results).forEach(([filename, result]) => {
    report += `### ${filename}\n`;
    report += `- **Score**: ${result.score}/100\n`;
    report += `- **Status**: ${result.isValid ? "✅ Valid" : "❌ Invalid"}\n`;

    if (result.errors.length > 0) {
      report += `- **Errors**:\n`;
      result.errors.forEach((error) => (report += `  - ${error}\n`));
    }

    if (result.warnings.length > 0) {
      report += `- **Warnings**:\n`;
      result.warnings.forEach((warning) => (report += `  - ${warning}\n`));
    }

    report += `\n`;
  });

  return report;
}

/**
 * Quick validation check for a single piece of content
 */
export function quickValidation(content: string): boolean {
  const result = validateBrandCompliance(content);
  return result.isValid && result.score >= 80;
}
