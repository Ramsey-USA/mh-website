import { COMPANY_INFO } from "@/lib/constants/company";

export type ClaimCategory =
  "veteran-ownership" | "licensing" | "certification" | "company-history";

export type ClaimApprovalState = "approved" | "under-review" | "withdrawn";

export type ClaimContext =
  | "metadata"
  | "schema"
  | "seo-keyword"
  | "public-sector"
  | "safety"
  | "trust-surface"
  | "badge";

export type ClaimEvidenceReference = {
  sourceType: "public-record" | "internal-record" | "policy-doc";
  reference: string;
  note?: string;
};

export type ClaimRecord = {
  stableId: string;
  approvedEn: string;
  reviewedEs?: string;
  category: ClaimCategory;
  evidenceReferences: ClaimEvidenceReference[];
  ownerRole: string;
  approvalState: ClaimApprovalState;
  allowedContexts: ClaimContext[];
  prohibitedContexts?: ClaimContext[];
  effectiveDate: string;
  nextReviewDate: string;
  withdrawalReason?: string;
};

const CLAIMS = {
  veteran_owned_since_2025: {
    stableId: "claim:veteran_owned_since_2025",
    approvedEn: "Veteran-Owned Since January 2025",
    reviewedEs: "Propiedad de veterano desde enero de 2025",
    category: "veteran-ownership",
    evidenceReferences: [
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#details.veteranOwnedSince",
      },
      {
        sourceType: "public-record",
        reference:
          "https://dva.wa.gov/veterans-service-members-and-their-families/veteran-owned-businesses",
        note: "Program verification path for veteran-owned status context.",
      },
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.waVob.verifyUrl,
        note: "WA DES vendor-detail listing confirms veteran-owned profile visibility.",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: [
      "metadata",
      "schema",
      "seo-keyword",
      "public-sector",
      "safety",
      "trust-surface",
      "badge",
    ],
    effectiveDate: "2025-01-01",
    nextReviewDate: "2027-06-30",
  },
  wa_des_veteran_small_business_status: {
    stableId: "claim:wa_des_veteran_small_business_status",
    approvedEn:
      "WA DES Vendor Listing: Veteran-Owned Business True; Washington Small Business",
    reviewedEs:
      "Listado WA DES: negocio de veterano verdadero; pequena empresa de Washington",
    category: "certification",
    evidenceReferences: [
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.waVob.verifyUrl,
        note: "Vendor detail listing shows Veteran-Owned Business=True and OMWBE Washington Small Business status.",
      },
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#waVob.verifyUrl",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: ["metadata", "schema", "trust-surface", "badge"],
    effectiveDate: "2026-07-23",
    nextReviewDate: "2027-06-30",
  },
  tri_state_licensed_wa_or_id: {
    stableId: "claim:tri_state_licensed_wa_or_id",
    approvedEn: "Licensed in WA, OR, and ID",
    reviewedEs: "Con licencia en WA, OR e ID",
    category: "licensing",
    evidenceReferences: [
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#details.licenses",
      },
      {
        sourceType: "policy-doc",
        reference:
          "docs/branding/governance/brand-congruency-master-checklist.md",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: ["metadata", "schema", "seo-keyword", "public-sector"],
    prohibitedContexts: ["badge"],
    effectiveDate: "2010-01-01",
    nextReviewDate: "2027-06-30",
  },
  bbb_accredited_a_plus: {
    stableId: "claim:bbb_accredited_a_plus",
    approvedEn: "BBB Accredited Business — A+ Rating",
    reviewedEs: "Empresa acreditada por BBB — calificacion A+",
    category: "certification",
    evidenceReferences: [
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.bbb.profileUrl,
      },
      {
        sourceType: "internal-record",
        reference: "packages/shared/src/lib/constants/company.ts#bbb",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: ["metadata", "trust-surface", "badge"],
    effectiveDate: "2026-04-07",
    nextReviewDate: "2027-06-30",
  },
  richland_chamber_advocate_level_member: {
    stableId: "claim:richland_chamber_advocate_level_member",
    approvedEn: "Richland Chamber of Commerce Advocate Level Member (Top Tier)",
    reviewedEs:
      "Miembro nivel Advocate de la Camara de Comercio de Richland (nivel superior)",
    category: "certification",
    evidenceReferences: [
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.chambers.richland.memberDirectoryUrl,
      },
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#chambers.richland",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: [
      "metadata",
      "schema",
      "seo-keyword",
      "trust-surface",
      "badge",
    ],
    effectiveDate: "2026-07-23",
    nextReviewDate: "2027-06-30",
  },
  pasco_chamber_contractor_directory_member: {
    stableId: "claim:pasco_chamber_contractor_directory_member",
    approvedEn: "Pasco Chamber of Commerce Contractor Directory Member",
    reviewedEs:
      "Miembro del directorio de contratistas de la Camara de Comercio de Pasco",
    category: "certification",
    evidenceReferences: [
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.chambers.pasco.memberDirectoryUrl,
      },
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#chambers.pasco",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: ["metadata", "schema", "trust-surface", "badge"],
    effectiveDate: "2026-07-23",
    nextReviewDate: "2027-06-30",
  },
  tri_city_regional_chamber_kennewick_member: {
    stableId: "claim:tri_city_regional_chamber_kennewick_member",
    approvedEn:
      "Tri-City Regional Chamber of Commerce Member (Kennewick Chamber)",
    reviewedEs: "Miembro de la Camara Regional Tri-City (Camara de Kennewick)",
    category: "certification",
    evidenceReferences: [
      {
        sourceType: "public-record",
        reference: COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl,
      },
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#chambers.triCityRegional",
      },
    ],
    ownerRole: "claim-approver",
    approvalState: "approved",
    allowedContexts: ["metadata", "schema", "trust-surface", "badge"],
    effectiveDate: "2026-07-23",
    nextReviewDate: "2027-06-30",
  },
  founded_2010: {
    stableId: "claim:founded_2010",
    approvedEn: "Founded 2010",
    reviewedEs: "Fundada en 2010",
    category: "company-history",
    evidenceReferences: [
      {
        sourceType: "internal-record",
        reference:
          "packages/shared/src/lib/constants/company.ts#details.foundingYear",
      },
    ],
    ownerRole: "content-owner",
    approvalState: "approved",
    allowedContexts: ["metadata", "schema", "trust-surface"],
    effectiveDate: "2010-01-01",
    nextReviewDate: "2027-06-30",
  },
} as const satisfies Record<string, ClaimRecord>;

export type ClaimId = keyof typeof CLAIMS;

function isClaimCurrent(claim: ClaimRecord, onDate: Date): boolean {
  const effective = new Date(claim.effectiveDate);
  const review = new Date(claim.nextReviewDate);

  if (
    !Number.isFinite(effective.getTime()) ||
    !Number.isFinite(review.getTime())
  ) {
    return false;
  }

  return onDate >= effective && onDate <= review;
}

export function getClaimRecord(id: ClaimId): ClaimRecord {
  const claim = CLAIMS[id];
  if (!claim) {
    throw new Error(`Unknown claim id: ${id}`);
  }

  return claim;
}

export function getApprovedClaim(options: {
  id: ClaimId;
  context: ClaimContext;
  locale?: "en" | "es";
  onDate?: Date;
}): string | undefined {
  const { id, context, locale = "en", onDate = new Date() } = options;
  const claim = getClaimRecord(id);

  if (claim.approvalState !== "approved") {
    return undefined;
  }

  if (claim.withdrawalReason) {
    return undefined;
  }

  if (!isClaimCurrent(claim, onDate)) {
    return undefined;
  }

  if (!claim.allowedContexts.includes(context)) {
    return undefined;
  }

  if (claim.prohibitedContexts?.includes(context)) {
    return undefined;
  }

  if (locale === "es" && claim.reviewedEs) {
    return claim.reviewedEs;
  }

  return claim.approvedEn;
}

export function getApprovedClaimOrFallback(options: {
  id: ClaimId;
  context: ClaimContext;
  fallback: string;
  locale?: "en" | "es";
  onDate?: Date;
}): string {
  const request = {
    id: options.id,
    context: options.context,
    ...(options.locale ? { locale: options.locale } : {}),
    ...(options.onDate ? { onDate: options.onDate } : {}),
  };

  return getApprovedClaim(request) ?? options.fallback;
}
