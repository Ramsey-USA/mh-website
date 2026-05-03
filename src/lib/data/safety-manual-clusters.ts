/**
 * Safety Manual Cluster Definitions
 * ─────────────────────────────────
 * The 50 MISH sections are grouped into 9 themed clusters. Each cluster
 * renders as a single page (`/resources/safety-manual/{cluster.slug}`)
 * with one anchored card per section (`#mish-NN`). QR codes deep-link
 * via the fragment, e.g. `/resources/safety-manual/fall-and-access-safety#mish-21`.
 *
 * This file is the single source of truth for the cluster mapping. It is
 * mirrored (intentionally duplicated as plain JS constants) in
 * `scripts/generate-qr-codes.js` and `documents/scripts/generate.mjs` so
 * the static-site, image-pipeline, and PDF-pipeline contexts all agree.
 *
 * ── MUST mirror the CLUSTERS array in
 *    `src/app/resources/safety-manual/contents/page.tsx` ──
 */

import safetyManualPublicJson from "../../../documents/content/safety-manual-public.json";

export interface SafetyManualCluster {
  /** URL-safe slug — verbose for SEO clarity. */
  readonly slug: string;
  /** Human-readable display name. */
  readonly name: string;
  /** Inclusive lower MISH section number (1–50). */
  readonly min: number;
  /** Inclusive upper MISH section number (1–50). */
  readonly max: number;
  /** Short marketing blurb shown on the cluster hero. */
  readonly description: string;
}

export const SAFETY_MANUAL_CLUSTERS: readonly SafetyManualCluster[] = [
  {
    slug: "program-foundation",
    name: "Program Foundation",
    min: 1,
    max: 3,
    description:
      "Program governance, leadership commitment, and the foundational roles that anchor every MH Construction jobsite safety effort.",
  },
  {
    slug: "field-onboarding-and-communication",
    name: "Field Onboarding & Communication",
    min: 4,
    max: 9,
    description:
      "Worker orientation, drug-free workplace expectations, pre-job planning, and the daily safety communication rhythm.",
  },
  {
    slug: "safety-oversight-and-industrial-hygiene",
    name: "Safety Oversight & Industrial Hygiene",
    min: 10,
    max: 19,
    description:
      "Inspections, incident reporting, PPE, hazard communication, respiratory protection, heat illness, silica, bloodborne pathogens, and housekeeping.",
  },
  {
    slug: "fall-and-access-safety",
    name: "Fall & Access Safety",
    min: 20,
    max: 24,
    description:
      "Signs and barricades, fall protection, scaffolds, ladders, and protection of open floor surfaces.",
  },
  {
    slug: "excavation-confined-spaces-and-energy-control",
    name: "Excavation, Confined Spaces & Energy Control",
    min: 25,
    max: 27,
    description:
      "Excavation, trenching, shoring, confined space entry, and lockout/tagout (LOTO) hazardous-energy control.",
  },
  {
    slug: "energy-and-fire-hazards",
    name: "Energy & Fire Hazards",
    min: 28,
    max: 32,
    description:
      "Electrical safety, welding/cutting/heating, flammable and combustible liquids, fire prevention, and compressed gas/air.",
  },
  {
    slug: "motor-vehicles-and-heavy-equipment",
    name: "Motor Vehicles & Heavy Equipment",
    min: 33,
    max: 41,
    description:
      "Motor vehicle safety, distracted driving, MVR program, equipment maintenance, aerial lifts, cranes, rigging, forklifts, and equipment modifications.",
  },
  {
    slug: "tools-and-materials",
    name: "Tools & Materials",
    min: 42,
    max: 45,
    description:
      "Hand and power tools, waste management, concrete and masonry, and miscellaneous construction safety requirements.",
  },
  {
    slug: "program-compliance-and-continuity",
    name: "Program Compliance & Continuity",
    min: 46,
    max: 50,
    description:
      "Subcontractor management, insurance and contractual risk transfer, emergency response, incident investigation, and return-to-work.",
  },
] as const;

/**
 * Look up the cluster (and per-section anchor id) for a given MISH section
 * number.
 *
 * @param sectionNumber - integer 1–50 (MISH section). Numbers outside the
 *   defined cluster ranges return `null`.
 * @returns `{ cluster, anchor, href }` where:
 *   - `cluster` is the `SafetyManualCluster` covering the section,
 *   - `anchor` is the DOM id (`mish-NN`),
 *   - `href` is the full route + fragment used by web links / QR targets.
 */
export function clusterForSection(sectionNumber: number): {
  cluster: SafetyManualCluster;
  anchor: string;
  href: string;
} | null {
  if (!Number.isFinite(sectionNumber)) return null;
  const n = Math.trunc(sectionNumber);
  const cluster = SAFETY_MANUAL_CLUSTERS.find((c) => n >= c.min && n <= c.max);
  if (!cluster) return null;
  const anchor = `mish-${String(n).padStart(2, "0")}`;
  return {
    cluster,
    anchor,
    href: `/resources/safety-manual/${cluster.slug}#${anchor}`,
  };
}

/**
 * Resolve a cluster by slug.
 *
 * @param slug - URL slug from `[cluster]` route param.
 * @returns matching cluster, or `null` if unknown.
 */
export function getClusterBySlug(slug: string): SafetyManualCluster | null {
  return SAFETY_MANUAL_CLUSTERS.find((c) => c.slug === slug) ?? null;
}

/**
 * The full list of cluster slugs — useful for `generateStaticParams()`.
 */
export const ALL_CLUSTER_SLUGS: readonly string[] = SAFETY_MANUAL_CLUSTERS.map(
  (c) => c.slug,
);

// ── Manual section data (slim public manifest) ──────────────────────────────
//
// We import the *public* derived manifest (~15 KB) instead of the full
// extraction (~770 KB). The slim manifest contains only allow-listed preview
// HTML per section and is regenerated by `npm run prebuild`
// (documents/scripts/build-safety-manual-public.mjs). This keeps proprietary
// section bodies out of the public web bundle and shrinks the Cloudflare
// Worker payload.

/** Canonical typed view of a section in `safety-manual-public.json`. */
export interface ManualSection {
  id: string;
  number: number;
  numberStr: string;
  key: string;
  title: string;
  slug: string;
  /** Pre-rendered, allow-listed preview HTML (Purpose / Scope / References). */
  previewHtml: string;
}

interface ManualJsonShape {
  sections: ManualSection[];
}

const manualJson = safetyManualPublicJson as unknown as ManualJsonShape;

/** All 50 canonical MISH sections, in order (number 1–50). */
export const MANUAL_SECTIONS: ReadonlyArray<ManualSection> =
  manualJson.sections;

/** All sections that belong to a given cluster slug, in MISH order. */
export function sectionsForCluster(clusterSlug: string): ManualSection[] {
  const cluster = getClusterBySlug(clusterSlug);
  if (!cluster) return [];
  return MANUAL_SECTIONS.filter(
    (s) => s.number >= cluster.min && s.number <= cluster.max,
  );
}
