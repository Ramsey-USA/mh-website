/**
 * Tests for lib/email/template-builder.ts
 *
 * All functions are pure HTML/string generators — no async, no network.
 */

import {
  EMAIL_COLORS,
  EMAIL_STYLES,
  emailHeader,
  emailFooter,
  textFooter,
  buildEmail,
  infoBox,
  veteranBox,
  tableRow,
  dataTable,
  link,
  phoneLink,
  emailLink,
} from "@/lib/email/template-builder";

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    address: { full: "123 Main St, Kennewick WA 99336" },
    phone: { display: "(509) 555-0100", tel: "+15095550100" },
    email: { main: "info@mhc-gc.com" },
  },
}));

// ── COLOR / STYLE CONSTANTS ────────────────────────────────────────────────────

describe("EMAIL_COLORS", () => {
  it("exports primary green", () => {
    expect(EMAIL_COLORS.primary).toMatch(/^#/);
  });

  it("exports all required color keys", () => {
    const required = [
      "primary",
      "primaryDark",
      "gold",
      "bgLight",
      "bgContent",
      "text",
      "textMuted",
      "border",
    ];
    required.forEach((k) =>
      expect(EMAIL_COLORS[k as keyof typeof EMAIL_COLORS]).toBeDefined(),
    );
  });
});

describe("EMAIL_STYLES", () => {
  it("contains fontStack and headerGradient", () => {
    expect(typeof EMAIL_STYLES.fontStack).toBe("string");
    expect(EMAIL_STYLES.headerGradient).toContain("linear-gradient");
  });
});

// ── emailHeader ────────────────────────────────────────────────────────────────

describe("emailHeader()", () => {
  it("renders a <tr> element", () => {
    const html = emailHeader();
    expect(html).toContain("<tr>");
    expect(html).toContain("</tr>");
  });

  it("includes default heading when none provided", () => {
    const html = emailHeader();
    expect(html).toContain("MH Construction");
  });

  it("includes custom heading when provided", () => {
    const html = emailHeader({ heading: "Custom Title" });
    expect(html).toContain("Custom Title");
  });

  it("includes tagline when provided", () => {
    const html = emailHeader({ tagline: "My Tagline" });
    expect(html).toContain("My Tagline");
  });

  it("omits tagline paragraph when tagline is empty string", () => {
    const html = emailHeader({ tagline: "" });
    // Should not render an empty <p> for the tagline
    expect(html).not.toContain('style="color: #d4af37');
  });

  it("escapes HTML in heading", () => {
    const html = emailHeader({ heading: '<script>alert("xss")</script>' });
    expect(html).not.toContain("<script>");
  });
});

// ── emailFooter ────────────────────────────────────────────────────────────────

describe("emailFooter()", () => {
  it("renders a <tr> element with company info", () => {
    const html = emailFooter();
    expect(html).toContain("<tr>");
    expect(html).toContain("MH Construction");
    expect(html).toContain("123 Main St");
  });
});

// ── textFooter ────────────────────────────────────────────────────────────────

describe("textFooter()", () => {
  it("returns plain text footer with company info", () => {
    const text = textFooter();
    expect(text).toContain("MH Construction");
    expect(text).toContain("info@mhc-gc.com");
  });
});

// ── buildEmail ────────────────────────────────────────────────────────────────

describe("buildEmail()", () => {
  it("returns a complete HTML document", () => {
    const html = buildEmail({
      subject: "Test Email",
      content: "<p>Hello world</p>",
    });
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html>");
    expect(html).toContain("Hello world");
  });

  it("includes the subject in the <title>", () => {
    const html = buildEmail({
      subject: "Welcome Message",
      content: "<p>Hi</p>",
    });
    expect(html).toContain("Welcome Message");
  });

  it("includes the footer by default", () => {
    const html = buildEmail({ subject: "S", content: "<p>C</p>" });
    expect(html).toContain("MH Construction");
  });

  it("omits the footer when includeFooter is false", () => {
    const html = buildEmail({
      subject: "S",
      content: "<p>C</p>",
      includeFooter: false,
    });
    // Footer tr is not rendered — 123 Main St won't appear
    expect(html).not.toContain("123 Main St");
  });

  it("applies custom contentPadding", () => {
    const html = buildEmail({
      subject: "S",
      content: "<p>X</p>",
      contentPadding: "10px 5px",
    });
    expect(html).toContain("10px 5px");
  });

  it("passes header options through", () => {
    const html = buildEmail({
      subject: "S",
      content: "<p>C</p>",
      header: { heading: "Custom Heading" },
    });
    expect(html).toContain("Custom Heading");
  });
});

// ── infoBox ───────────────────────────────────────────────────────────────────

describe("infoBox()", () => {
  it("wraps content in a div with infoBox styles", () => {
    const html = infoBox("<p>Info</p>");
    expect(html).toContain("<div");
    expect(html).toContain("<p>Info</p>");
  });
});

// ── veteranBox ────────────────────────────────────────────────────────────────

describe("veteranBox()", () => {
  it("wraps content in a div with veteranBox styles", () => {
    const html = veteranBox("Veteran content");
    expect(html).toContain("<div");
    expect(html).toContain("Veteran content");
  });
});

// ── tableRow ──────────────────────────────────────────────────────────────────

describe("tableRow()", () => {
  it("creates a <tr> with label and value", () => {
    const html = tableRow("Name", "Alice");
    expect(html).toContain("<tr>");
    expect(html).toContain("Name:");
    expect(html).toContain("Alice");
  });

  it("escapes HTML in label and value", () => {
    const html = tableRow("<script>", "<img src=x onerror=alert(1)>");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
  });
});

// ── dataTable ─────────────────────────────────────────────────────────────────

describe("dataTable()", () => {
  it("wraps rows in a <table>", () => {
    const row = tableRow("Key", "Value");
    const html = dataTable([row]);
    expect(html).toContain("<table");
    expect(html).toContain(row);
  });

  it("handles an empty rows array", () => {
    const html = dataTable([]);
    expect(html).toContain("<table");
    expect(html).toContain("</table>");
  });
});

// ── link helpers ──────────────────────────────────────────────────────────────

describe("link()", () => {
  it("creates an anchor with href and text", () => {
    const html = link("https://example.com", "Click here");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain("Click here");
  });

  it("escapes HTML in href and text", () => {
    const html = link("javascript:alert(1)", "<b>click</b>");
    expect(html).not.toContain("<b>");
    expect(html).toContain("javascript");
  });
});

describe("phoneLink()", () => {
  it("creates a tel: anchor", () => {
    const html = phoneLink("(509) 555-0100");
    expect(html).toContain("tel:");
    expect(html).toContain("(509) 555-0100");
  });
});

describe("emailLink()", () => {
  it("creates a mailto: anchor", () => {
    const html = emailLink("info@mhc-gc.com");
    expect(html).toContain("mailto:");
    expect(html).toContain("info@mhc-gc.com");
  });
});
