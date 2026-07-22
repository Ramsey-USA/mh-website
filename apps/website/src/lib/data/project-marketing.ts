export const MARKETING_PHASES = [
  "preconstruction",
  "active",
  "closing",
  "post-launch",
] as const;

export const CONTENT_ANGLES = [
  "schedule-transparency",
  "field-progress",
  "safety-controls",
  "quality-closeout",
  "partnership-proof",
] as const;

export type MarketingPhase = (typeof MARKETING_PHASES)[number];
export type ContentAngle = (typeof CONTENT_ANGLES)[number];

export interface ProjectMarketingMediaAsset {
  src: string;
  alt: string;
}

export interface ProjectMarketingWalkthrough {
  status: "live" | "planned";
  embedUrl?: string;
}

export interface ProjectMarketingReview {
  quote: string;
  rating: number;
}

export interface ProjectMarketingMilestone {
  title: string;
  eventHref?: string;
}

export interface ProjectMarketingRecord {
  slug: string;
  marketingPhase: MarketingPhase;
  contentAngle: ContentAngle;
  mediaAssets: readonly ProjectMarketingMediaAsset[];
  walkthrough: ProjectMarketingWalkthrough;
  reviews: readonly ProjectMarketingReview[];
  milestones: readonly ProjectMarketingMilestone[];
}
