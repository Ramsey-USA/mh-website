/**
 * Auto SEO Manager - Ultimate SEO Optimization System
 *
 * This system automatically:
 * 1. Generates comprehensive metadata for all pages
 * 2. Adapts to new pages automatically
 * 3. Maintains SEO best practices
 * 4. Tracks and validates SEO compliance
 * 5. Provides real-time SEO scoring
 */

import { Metadata } from "next";
import { enhancedSEO } from "@/components/seo/enhanced-seo";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  schemas?: object[];
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  noindex?: boolean;
  nofollow?: boolean;
}

export interface PageSEOScore {
  overall: number;
  titleScore: number;
  descriptionScore: number;
  keywordsScore: number;
  schemaScore: number;
  imageScore: number;
  recommendations: string[];
}

// ============================================================================
// SEO RULES & BEST PRACTICES
// ============================================================================

const SEO_RULES = {
  title: {
    minLength: 30,
    maxLength: 60,
    optimal: 50,
  },
  description: {
    minLength: 120,
    maxLength: 160,
    optimal: 150,
  },
  keywords: {
    min: 3,
    max: 15,
    optimal: 7,
  },
  url: {
    maxLength: 100,
    preferredStructure: /^[a-z0-9-\/]+$/,
  },
};

// ============================================================================
// AUTO PAGE DETECTION & CATEGORIZATION
// ============================================================================

export const PAGE_CATEGORIES = {
  homepage: {
    patterns: ["/"],
    priority: 1.0,
    changeFrequency: "monthly" as const,
    schemas: ["Organization", "WebSite", "LocalBusiness", "FAQ"],
  },
  services: {
    patterns: ["/services", "/service/"],
    priority: 0.9,
    changeFrequency: "monthly" as const,
    schemas: ["Service", "Offer"],
  },
  projects: {
    patterns: ["/projects", "/project/", "/portfolio"],
    priority: 0.8,
    changeFrequency: "weekly" as const,
    schemas: ["CreativeWork"],
  },
  team: {
    patterns: ["/team", "/about"],
    priority: 0.7,
    changeFrequency: "monthly" as const,
    schemas: ["Person", "Organization"],
  },
  contact: {
    patterns: ["/contact", "/booking", "/consultation"],
    priority: 0.9,
    changeFrequency: "monthly" as const,
    schemas: ["ContactPage", "LocalBusiness"],
  },
  careers: {
    patterns: ["/careers", "/jobs"],
    priority: 0.7,
    changeFrequency: "weekly" as const,
    schemas: ["JobPosting"],
  },
  tools: {
    patterns: ["/estimator", "/calculator", "/3d-explorer"],
    priority: 0.85,
    changeFrequency: "monthly" as const,
    schemas: ["SoftwareApplication"],
  },
  emergency: {
    patterns: ["/urgent", "/emergency"],
    priority: 0.85,
    changeFrequency: "monthly" as const,
    schemas: ["Service", "EmergencyService"],
  },
  partnerships: {
    patterns: ["/partners", "/trade-partners", "/government"],
    priority: 0.75,
    changeFrequency: "monthly" as const,
    schemas: ["Service", "Organization"],
  },
} as const;

// ============================================================================
// AUTO-DETECT PAGE TYPE
// ============================================================================

export function detectPageType(
  pathname: string
): keyof typeof PAGE_CATEGORIES | null {
  for (const [type, config] of Object.entries(PAGE_CATEGORIES)) {
    if (
      config.patterns.some(
        (pattern) => pathname === pattern || pathname.startsWith(pattern)
      )
    ) {
      return type as keyof typeof PAGE_CATEGORIES;
    }
  }
  return null;
}

// ============================================================================
// SMART METADATA GENERATION
// ============================================================================

export function generateSmartMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalUrl,
    ogImage,
    noindex = false,
    nofollow = false,
  } = config;

  // Build full title with brand
  const fullTitle = title.includes("MH Construction")
    ? title
    : `${title} | MH Construction`;

  // Combine with default keywords
  const allKeywords = [
    ...new Set([
      ...keywords,
      ...enhancedSEO.defaultKeywords.slice(0, 5), // Add top 5 defaults
    ]),
  ];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || enhancedSEO.siteUrl,
      siteName: enhancedSEO.siteName,
      images: [
        {
          url: ogImage || `${enhancedSEO.siteUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage || `${enhancedSEO.siteUrl}/images/og-default.jpg`],
      creator: enhancedSEO.twitterHandle,
    },
    alternates: {
      canonical: canonicalUrl || enhancedSEO.siteUrl,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // Add other verification codes as needed
    },
  };

  return metadata;
}

// ============================================================================
// SEO SCORE CALCULATOR
// ============================================================================

export function calculateSEOScore(config: SEOConfig): PageSEOScore {
  const recommendations: string[] = [];
  let titleScore = 100;
  let descriptionScore = 100;
  let keywordsScore = 100;
  let schemaScore = 100;
  let imageScore = 100;

  // Title scoring
  const titleLength = config.title.length;
  if (titleLength < SEO_RULES.title.minLength) {
    titleScore -= 30;
    recommendations.push(
      `Title too short (${titleLength} chars). Aim for ${SEO_RULES.title.optimal} chars.`
    );
  } else if (titleLength > SEO_RULES.title.maxLength) {
    titleScore -= 20;
    recommendations.push(
      `Title too long (${titleLength} chars). Keep under ${SEO_RULES.title.maxLength} chars.`
    );
  }
  if (!config.title.includes("|") && !config.title.includes("-")) {
    titleScore -= 10;
    recommendations.push("Consider adding brand separator (| or -) in title.");
  }

  // Description scoring
  const descLength = config.description.length;
  if (descLength < SEO_RULES.description.minLength) {
    descriptionScore -= 30;
    recommendations.push(
      `Description too short (${descLength} chars). Aim for ${SEO_RULES.description.optimal} chars.`
    );
  } else if (descLength > SEO_RULES.description.maxLength) {
    descriptionScore -= 20;
    recommendations.push(
      `Description too long (${descLength} chars). Keep under ${SEO_RULES.description.maxLength} chars.`
    );
  }

  // Keywords scoring
  const keywordCount = config.keywords?.length || 0;
  if (keywordCount < SEO_RULES.keywords.min) {
    keywordsScore -= 30;
    recommendations.push(
      `Too few keywords (${keywordCount}). Add ${SEO_RULES.keywords.min - keywordCount} more.`
    );
  } else if (keywordCount > SEO_RULES.keywords.max) {
    keywordsScore -= 15;
    recommendations.push(
      `Too many keywords (${keywordCount}). Focus on ${SEO_RULES.keywords.optimal} most relevant.`
    );
  }

  // Schema scoring
  const schemaCount = config.schemas?.length || 0;
  if (schemaCount === 0) {
    schemaScore -= 40;
    recommendations.push(
      "Add structured data schemas for better search visibility."
    );
  } else if (schemaCount === 1) {
    schemaScore -= 10;
    recommendations.push(
      "Consider adding more relevant schemas (e.g., LocalBusiness, Service)."
    );
  }

  // Image scoring
  if (!config.ogImage) {
    imageScore -= 20;
    recommendations.push(
      "Add custom Open Graph image for better social sharing."
    );
  }

  // Canonical URL check
  if (!config.canonicalUrl) {
    recommendations.push(
      "Add canonical URL to prevent duplicate content issues."
    );
  }

  // Calculate overall score
  const overall = Math.round(
    titleScore * 0.25 +
      descriptionScore * 0.25 +
      keywordsScore * 0.2 +
      schemaScore * 0.2 +
      imageScore * 0.1
  );

  return {
    overall,
    titleScore,
    descriptionScore,
    keywordsScore,
    schemaScore,
    imageScore,
    recommendations,
  };
}

// ============================================================================
// AUTO-GENERATE SEO FOR NEW PAGES
// ============================================================================

export function autoGenerateSEO(
  pathname: string,
  customTitle?: string
): SEOConfig {
  const pageType = detectPageType(pathname);
  const category = pageType ? PAGE_CATEGORIES[pageType] : null;

  // Extract page name from path
  const pageName =
    pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Home";

  // Generate title
  const title =
    customTitle ||
    `${pageName} | MH Construction - Veteran-Owned Construction Excellence`;

  // Generate description based on page type
  const descriptions: Record<string, string> = {
    homepage: enhancedSEO.defaultDescription,
    services: `Professional ${pageName.toLowerCase()} services from MH Construction. Veteran-owned construction excellence serving the Pacific Northwest with AI-powered solutions and military precision.`,
    projects: `Explore MH Construction's ${pageName.toLowerCase()} portfolio. Quality craftsmanship and partnership-driven results across Washington, Oregon, and Idaho.`,
    team: `Meet the MH Construction ${pageName.toLowerCase()} team. Veteran-led professionals bringing military precision and authentic relationships to every project.`,
    contact: `Get in touch with MH Construction. Schedule consultations, request estimates, or connect with our veteran-owned construction team serving the Pacific Northwest.`,
    careers: `Join MH Construction's veteran-owned team. ${pageName} opportunities with competitive benefits and a partnership-driven culture.`,
    tools: `${pageName} tool from MH Construction. AI-powered construction technology for instant estimates and project planning in the Pacific Northwest.`,
    emergency: `${pageName} construction support from MH Construction. Expert response for critical structural challenges with veteran-owned reliability.`,
    partnerships: `${pageName} opportunities with MH Construction. Build lasting partnerships with our veteran-owned construction platform.`,
  };

  const description = category
    ? descriptions[pageType as keyof typeof descriptions]
    : `${pageName} | MH Construction - Veteran-owned construction excellence serving the Pacific Northwest with AI-powered solutions, military precision, and authentic partnerships.`;

  // Generate keywords
  const keywords = [
    pageName.toLowerCase(),
    "MH Construction",
    "veteran-owned construction",
    "Pacific Northwest",
    "Tri-Cities WA",
    ...(category?.schemas || []).map((s) => s.toLowerCase()),
  ];

  return {
    title,
    description,
    keywords,
    canonicalUrl: `${enhancedSEO.siteUrl}${pathname}`,
    priority: category?.priority || 0.5,
    changeFrequency: category?.changeFrequency || "monthly",
    schemas: [],
  };
}

// ============================================================================
// SEO VALIDATOR
// ============================================================================

export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: PageSEOScore;
}

export function validateSEO(config: SEOConfig): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!config.title || config.title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!config.description || config.description.trim().length === 0) {
    errors.push("Description is required");
  }

  // Title validations
  if (config.title.length > 70) {
    errors.push(
      "Title exceeds 70 characters and will be truncated in search results"
    );
  }
  if (config.title.length < 30) {
    warnings.push("Title is shorter than recommended 30 characters");
  }

  // Description validations
  if (config.description.length > 160) {
    warnings.push("Description exceeds 160 characters and may be truncated");
  }
  if (config.description.length < 120) {
    warnings.push("Description is shorter than recommended 120 characters");
  }

  // Keywords validations
  if (!config.keywords || config.keywords.length === 0) {
    warnings.push("No keywords provided");
  } else if (config.keywords.length > 15) {
    warnings.push("Too many keywords may dilute focus");
  }

  // URL validation
  if (config.canonicalUrl && config.canonicalUrl.length > 100) {
    warnings.push("URL is very long; shorter URLs perform better");
  }

  const score = calculateSEOScore(config);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score,
  };
}

// ============================================================================
// BATCH SEO GENERATOR FOR SITEMAP
// ============================================================================

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export function generateSitemapEntries(pages: string[]): SitemapEntry[] {
  return pages.map((pathname) => {
    const pageType = detectPageType(pathname);
    const category = pageType ? PAGE_CATEGORIES[pageType] : null;

    return {
      url: `${enhancedSEO.siteUrl}${pathname}`,
      lastModified: new Date(),
      changeFrequency: category?.changeFrequency || "monthly",
      priority: category?.priority || 0.5,
    };
  });
}

// ============================================================================
// SEO REPORTING
// ============================================================================

export function generateSEOReport(
  pages: Array<{ path: string; config: SEOConfig }>
): string {
  let report = "# SEO Audit Report\n\n";
  report += `Generated: ${new Date().toISOString()}\n`;
  report += `Total Pages: ${pages.length}\n\n`;

  let totalScore = 0;
  const issues: string[] = [];

  pages.forEach(({ path, config }) => {
    const validation = validateSEO(config);
    totalScore += validation.score.overall;

    report += `## ${path}\n`;
    report += `Score: ${validation.score.overall}/100\n`;

    if (validation.errors.length > 0) {
      report += `Errors: ${validation.errors.length}\n`;
      validation.errors.forEach((err) => {
        report += `- ❌ ${err}\n`;
        issues.push(`${path}: ${err}`);
      });
    }

    if (validation.warnings.length > 0) {
      report += `Warnings: ${validation.warnings.length}\n`;
      validation.warnings.forEach((warn) => (report += `- ⚠️ ${warn}\n`));
    }

    report += "\n";
  });

  const avgScore = Math.round(totalScore / pages.length);
  report += `\n## Summary\n`;
  report += `Average Score: ${avgScore}/100\n`;
  report += `Critical Issues: ${issues.length}\n`;

  if (avgScore >= 90) report += "Status: ✅ Excellent\n";
  else if (avgScore >= 80) report += "Status: ✅ Good\n";
  else if (avgScore >= 70) report += "Status: ⚠️ Needs Improvement\n";
  else report += "Status: ❌ Poor - Action Required\n";

  return report;
}
