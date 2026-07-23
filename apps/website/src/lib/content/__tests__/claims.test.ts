/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  getApprovedClaim,
  getClaimRecord,
  type ClaimId,
} from "@/lib/content/claims";

const CLAIM_IDS: ClaimId[] = [
  "veteran_owned_since_2025",
  "wa_des_veteran_small_business_status",
  "tri_state_licensed_wa_or_id",
  "bbb_accredited_a_plus",
  "pasco_chamber_contractor_directory_member",
  "richland_chamber_advocate_level_member",
  "tri_city_regional_chamber_kennewick_member",
  "founded_2010",
];

describe("public claim register", () => {
  it("keeps evidence references on every controlled claim", () => {
    for (const id of CLAIM_IDS) {
      const claim = getClaimRecord(id);
      expect(claim.evidenceReferences.length).toBeGreaterThan(0);
    }
  });

  it("fails closed for context misuse", () => {
    const misuse = getApprovedClaim({
      id: "tri_state_licensed_wa_or_id",
      context: "badge",
      onDate: new Date("2026-07-20T00:00:00.000Z"),
    });

    expect(misuse).toBeUndefined();
  });

  it("fails closed for expired review windows", () => {
    const stale = getApprovedClaim({
      id: "veteran_owned_since_2025",
      context: "metadata",
      onDate: new Date("2028-01-01T00:00:00.000Z"),
    });

    expect(stale).toBeUndefined();
  });

  it("returns reviewed Spanish text when available", () => {
    const esClaim = getApprovedClaim({
      id: "veteran_owned_since_2025",
      context: "metadata",
      locale: "es",
      onDate: new Date("2026-07-20T00:00:00.000Z"),
    });

    expect(esClaim).toBe("Propiedad de veterano desde enero de 2025");
  });

  it("keeps BBB claim effective date in sync with canonical accreditation date", () => {
    const bbbClaim = getClaimRecord("bbb_accredited_a_plus");

    expect(bbbClaim.effectiveDate).toBe(
      COMPANY_INFO.details.bbbAccreditedSince,
    );
  });

  it("guards metadata and schema surfaces against direct raw phrase bypass", () => {
    const cwd = process.cwd();
    const guardedFiles = [
      "src/app/layout.tsx",
      "src/components/seo/EnhancedSEO.tsx",
      "src/lib/seo/page-seo-utils.ts",
      "src/app/public-sector/PublicSectorFullPage.tsx",
      "src/app/safety/page.tsx",
      "src/components/shared-sections/AccreditationsLogoRow.tsx",
      "src/components/resources/SafetyComplianceBadge.tsx",
    ];

    const controlledPhrases = [
      "Veteran-Owned Since January 2025",
      "WA DES Vendor Listing: Veteran-Owned Business True; Washington Small Business",
      "Licensed in WA, OR, and ID",
      "BBB Accredited Business — A+ Rating",
      "Pasco Chamber of Commerce Contractor Directory Member",
      "Richland Chamber of Commerce Advocate Level Member (Top Tier)",
      "Tri-City Regional Chamber of Commerce Member (Kennewick Chamber)",
    ];

    for (const relativePath of guardedFiles) {
      const filePath = path.join(cwd, relativePath);
      const content = fs.readFileSync(filePath, "utf8");

      expect(
        content.includes("getApprovedClaim") ||
          content.includes("getApprovedClaimOrFallback"),
      ).toBe(true);

      for (const phrase of controlledPhrases) {
        if (relativePath.endsWith("claims.ts")) {
          continue;
        }

        expect(content.includes(phrase)).toBe(false);
      }
    }
  });
});
