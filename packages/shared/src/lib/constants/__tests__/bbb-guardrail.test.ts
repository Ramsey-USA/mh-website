/**
 * BBB guardrails for accreditation constants.
 *
 * These checks prevent accidental drift in canonical BBB link targets and
 * accreditation dates used across trust surfaces and schema output.
 */

import { COMPANY_INFO } from "../company";

describe("BBB accreditation constants", () => {
  it("keeps the canonical BBB profile URL stable", () => {
    expect(COMPANY_INFO.bbb.profileUrl).toBe(
      "https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036",
    );
  });

  it("keeps the seal click URL tied to the canonical profile", () => {
    expect(COMPANY_INFO.bbb.sealClickUrl).toBe(
      `${COMPANY_INFO.bbb.profileUrl}/#sealclick`,
    );
  });

  it("keeps BBB accreditation date fields in sync", () => {
    expect(COMPANY_INFO.details.bbbAccreditedSince).toBe("2026-04-07");
    expect(COMPANY_INFO.bbb.accreditedSince).toBe("April 7, 2026");
  });

  it("keeps BBB rating consistent across detail and badge metadata", () => {
    expect(COMPANY_INFO.details.bbbRating).toBe("A+");
    expect(COMPANY_INFO.bbb.rating).toBe(COMPANY_INFO.details.bbbRating);
  });
});

describe("Richland Chamber accreditation constants", () => {
  it("keeps Richland Chamber directory URL stable", () => {
    expect(COMPANY_INFO.chambers.richland.memberDirectoryUrl).toBe(
      "https://www.richlandchamber.org/member-directory",
    );
  });

  it("keeps Richland Chamber top-tier membership metadata current", () => {
    expect(COMPANY_INFO.chambers.richland.membershipLevel).toBe(
      "Advocate Level Member",
    );
    expect(COMPANY_INFO.chambers.richland.membershipTier).toBe("Top Tier");
  });
});

describe("Pasco Chamber accreditation constants", () => {
  it("keeps Pasco Chamber contractor directory URL stable", () => {
    expect(COMPANY_INFO.chambers.pasco.memberDirectoryUrl).toBe(
      "https://pascochamber.org/construction-equipment-contractors/",
    );
  });
});

describe("Tri-City Regional Chamber accreditation constants", () => {
  it("keeps Tri-City Regional Chamber listing URL stable", () => {
    expect(COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl).toBe(
      "https://web.tricityregionalchamber.com/Contractor-General/MH-Construction,-Inc-6318",
    );
  });
});

describe("Washington veteran-owned accreditation constants", () => {
  it("keeps WA DES vendor-detail verification URL stable", () => {
    expect(COMPANY_INFO.waVob.verifyUrl).toBe(
      "https://pr-webs-vendor.des.wa.gov/ViewVendorSearch.aspx",
    );
  });
});
