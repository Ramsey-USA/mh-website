import {
  type ProjectMarketingRecord,
  type MarketingPhase,
} from "@/lib/data/project-marketing";

export const PROJECT_MARKETING_RECORDS: readonly ProjectMarketingRecord[] = [
  {
    slug: "volm-companies-remodel",
    marketingPhase: "post-launch",
    contentAngle: "quality-closeout",
    mediaAssets: [
      {
        src: "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-main-entrance-and-signage-p001-photo.webp",
        alt: "Volm Companies project frontage and entrance",
      },
    ],
    walkthrough: {
      status: "planned",
    },
    reviews: [
      {
        quote:
          "The team maintained communication and completed the frontage package as planned.",
        rating: 5,
      },
    ],
    milestones: [
      {
        title: "Frontage permit closeout verified",
      },
    ],
  },
  {
    slug: "darigold-pasco-production-facility",
    marketingPhase: "post-launch",
    contentAngle: "field-progress",
    mediaAssets: [
      {
        src: "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp",
        alt: "Darigold production facility main entrance record",
      },
    ],
    walkthrough: {
      status: "planned",
    },
    reviews: [
      {
        quote:
          "Field documentation and milestone updates were delivered with consistent discipline.",
        rating: 4,
      },
    ],
    milestones: [
      {
        title: "Exterior condition package published",
      },
    ],
  },
  {
    slug: "franklin-county-coroners-office-morgue",
    marketingPhase: "post-launch",
    contentAngle: "safety-controls",
    mediaAssets: [
      {
        src: "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp",
        alt: "Franklin County Coroner facility frontage",
      },
    ],
    walkthrough: {
      status: "planned",
    },
    reviews: [
      {
        quote:
          "Coordination stayed clear across public agency checkpoints and closeout review.",
        rating: 5,
      },
    ],
    milestones: [
      {
        title: "County opening milestone documented",
      },
    ],
  },
  {
    slug: "auto-lot-nw",
    marketingPhase: "post-launch",
    contentAngle: "partnership-proof",
    mediaAssets: [
      {
        src: "/images/projects/alverez-auto-lot/atc-e-20190128-p009.webp",
        alt: "Auto Lot completed dealership frontage",
      },
    ],
    walkthrough: {
      status: "planned",
    },
    reviews: [
      {
        quote:
          "The project stayed organized from storefront detailing through final turnover.",
        rating: 5,
      },
    ],
    milestones: [
      {
        title: "Dealership turnover package completed",
        eventHref: "/events/cool-desert-nights",
      },
    ],
  },
];

export function getProjectMarketingRecordBySlug(slug: string) {
  return PROJECT_MARKETING_RECORDS.find((record) => record.slug === slug);
}

export function getProjectMarketingPhaseBySlug(
  slug: string,
): MarketingPhase | undefined {
  return getProjectMarketingRecordBySlug(slug)?.marketingPhase;
}
