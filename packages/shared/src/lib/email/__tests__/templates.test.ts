/**
 * @jest-environment node
 */

import {
  generateConsultationAcknowledgment,
  generateContactAcknowledgment,
  generateJobApplicationAcknowledgment,
  generateNewsletterAcknowledgment,
  generateLicenseExpiringAlert,
  generateMvrReviewDueAlert,
  generateDriverAlertSummary,
} from "../templates";

describe("email templates", () => {
  it("generates job application acknowledgment content with applicant details", () => {
    const result = generateJobApplicationAcknowledgment({
      firstName: "Jane",
      lastName: "Doe",
      position: "Project Manager",
      email: "jane@example.com",
    });

    expect(result.subject).toContain("Project Manager Position");
    expect(result.html).toContain("Dear Jane Doe");
    expect(result.text).toContain("3-5 business days");
  });

  it("generates consultation acknowledgment with scheduled appointment details when present", () => {
    const result = generateConsultationAcknowledgment({
      name: "John Smith",
      projectType: "Commercial Build",
      email: "john@example.com",
      selectedDate: "2026-03-27",
      selectedTime: "10:30 AM",
    });

    expect(result.subject).toContain("Commercial Build");
    expect(result.html).toContain("Your Consultation is Scheduled");
    expect(result.text).toContain("YOUR CONSULTATION IS SCHEDULED");
    expect(result.text).toContain("10:30 AM");
  });

  it("omits appointment block when consultation date/time are missing", () => {
    const result = generateConsultationAcknowledgment({
      name: "John Smith",
      projectType: "Commercial Build",
      email: "john@example.com",
    });

    expect(result.html).not.toContain("Your Consultation is Scheduled");
    expect(result.text).not.toContain("YOUR CONSULTATION IS SCHEDULED");
  });

  it("generates contact acknowledgment with company contact details", () => {
    const result = generateContactAcknowledgment({
      name: "Alex",
      email: "alex@example.com",
      type: "contact",
    });

    expect(result.subject).toContain("We'll Be in Touch Soon");
    expect(result.html).toContain("Thank You for Reaching Out");
    expect(result.text).toContain("(509) 308-6489");
    expect(result.text).toContain("office@mhc-gc.com");
  });

  it("defaults newsletter greeting to Friend when no name is provided", () => {
    const result = generateNewsletterAcknowledgment({
      email: "subscriber@example.com",
    });

    expect(result.subject).toContain("Welcome to MH Construction Newsletter");
    expect(result.html).toContain("Dear Friend");
    expect(result.text).toContain("Dear Friend");
    expect(result.text).toContain("unsubscribe");
  });

  it("uses provided newsletter name when available", () => {
    const result = generateNewsletterAcknowledgment({
      email: "subscriber@example.com",
      name: "Jordan",
    });

    expect(result.html).toContain("Dear Jordan");
    expect(result.text).toContain("Dear Jordan");
    expect(result.html).toContain("https://www.mhc-gc.com/contact");
  });
});

// ─── generateLicenseExpiringAlert ─────────────────────────────────────────────

const baseDriver = {
  employee_name: "John Driver",
  license_number: "WA123456",
  license_state: "WA",
  license_expiration_date: "2026-05-01",
};

describe("generateLicenseExpiringAlert()", () => {
  it("uses URGENT severity when daysUntilExpiry <= 7", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 5);
    expect(result.subject).toContain("[URGENT]");
    expect(result.html).toContain("URGENT");
    expect(result.text).toContain("[URGENT]");
  });

  it("uses WARNING severity when daysUntilExpiry <= 30", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 20);
    expect(result.subject).toContain("[WARNING]");
    expect(result.html).toContain("WARNING");
  });

  it("uses NOTICE severity when daysUntilExpiry > 30", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 60);
    expect(result.subject).toContain("[NOTICE]");
    expect(result.html).toContain("NOTICE");
  });

  it("includes driver name, license number and state in the html", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 14);
    expect(result.html).toContain("John Driver");
    expect(result.html).toContain("WA123456");
    expect(result.html).toContain("WA");
  });

  it("includes license class row when license_class is provided", () => {
    const result = generateLicenseExpiringAlert(
      { ...baseDriver, license_class: "CDL-A" },
      14,
    );
    expect(result.html).toContain("CDL-A");
    expect(result.text).toContain("CDL-A");
  });

  it("omits license class row when license_class is absent", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 14);
    expect(result.html).not.toContain("License Class:");
    expect(result.text).not.toContain("Class:");
  });

  it("uses singular 'Day' in the HTML badge when daysUntilExpiry is 1", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 1);
    // The main urgency badge in HTML uses the ternary: "1 Day" (not "1 Days")
    expect(result.html).toMatch(/Expires in 1 Day[^s]/);
  });

  it("uses plural 'Days' when daysUntilExpiry > 1", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 7);
    expect(result.html).toContain("7 Days");
  });

  it("includes company phone in text body", () => {
    const result = generateLicenseExpiringAlert(baseDriver, 30);
    expect(result.text).toContain("MH Construction, Inc.");
  });
});

// ─── generateMvrReviewDueAlert ────────────────────────────────────────────────

describe("generateMvrReviewDueAlert()", () => {
  const mvrDriver = {
    ...baseDriver,
    next_mvr_check_date: "2026-04-30",
  };

  it("generates subject containing employee name", () => {
    const result = generateMvrReviewDueAlert(mvrDriver);
    expect(result.subject).toContain("John Driver");
    expect(result.subject).toContain("MVR Review Due");
  });

  it("includes MVR check due date in html and text", () => {
    const result = generateMvrReviewDueAlert(mvrDriver);
    expect(result.html).toContain("2026-04-30");
    expect(result.text).toContain("2026-04-30");
  });

  it("includes driver license number and state", () => {
    const result = generateMvrReviewDueAlert(mvrDriver);
    expect(result.html).toContain("WA123456");
    expect(result.html).toContain("WA");
  });

  it("returns subject, html and text", () => {
    const result = generateMvrReviewDueAlert(mvrDriver);
    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("html");
    expect(result).toHaveProperty("text");
  });
});

// ─── generateDriverAlertSummary ───────────────────────────────────────────────

describe("generateDriverAlertSummary()", () => {
  it("uses singular 'Item' when totalIssues is 1", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 1,
      missingConsentCount: 0,
    });
    expect(result.subject).toContain("1 Item Need Attention");
    expect(result.subject).not.toContain("1 Items");
  });

  it("uses plural 'Items' when totalIssues is 2+", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 2,
      missingConsentCount: 0,
    });
    expect(result.subject).toContain("2 Items Need Attention");
  });

  it("renders expiring license rows when list is non-empty", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [
        { ...baseDriver, days_until: 5 },
        { ...baseDriver, employee_name: "Jane Lic", days_until: 45 },
      ],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result.html).toContain("John Driver");
    expect(result.html).toContain("Jane Lic");
    expect(result.html).toContain("5 days");
    expect(result.html).toContain("45 days");
    expect(result.text).toContain("EXPIRING LICENSES");
  });

  it("renders overdue MVR rows when list is non-empty", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [{ ...baseDriver, next_mvr_check_date: "2026-01-01" }],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result.html).toContain("John Driver");
    expect(result.html).toContain("2026-01-01");
    expect(result.text).toContain("OVERDUE MVR CHECKS");
  });

  it("omits expiring license section when list is empty", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result.html).not.toContain("Expiring Licenses");
    expect(result.text).not.toContain("EXPIRING LICENSES");
  });

  it("omits MVR section when list is empty", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result.html).not.toContain("Overdue MVR Checks");
    expect(result.text).not.toContain("OVERDUE MVR CHECKS");
  });

  it("includes pending count when > 0", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 3,
      missingConsentCount: 0,
    });
    expect(result.html).toContain("3");
    expect(result.text).toContain("PENDING AUTHORIZATIONS: 3");
  });

  it("includes missing consent count when > 0", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 4,
    });
    expect(result.html).toContain("4");
    expect(result.text).toContain("MISSING CONSENT: 4");
  });

  it("omits pending/consent sections when both are 0", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result.text).not.toContain("PENDING AUTHORIZATIONS");
    expect(result.text).not.toContain("MISSING CONSENT");
  });

  it("returns subject, html and text properties", () => {
    const result = generateDriverAlertSummary({
      expiringLicenses: [],
      overdueMvr: [],
      pendingCount: 0,
      missingConsentCount: 0,
    });
    expect(result).toHaveProperty("subject");
    expect(result).toHaveProperty("html");
    expect(result).toHaveProperty("text");
  });
});
