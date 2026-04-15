#!/usr/bin/env node

/**
 * Resend All Submissions Script
 *
 * Retrieves ALL submissions from the production D1 database
 * (job applications, contact submissions, consultations, newsletter signups)
 * and sends a consolidated report email to Matt, Arnold, and office.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=xxx RESEND_API_KEY=xxx node scripts/resend-all-submissions.mjs
 *
 * Or with .env.local sourced:
 *   export $(grep -v '^#' .env.local | xargs) && node scripts/resend-all-submissions.mjs
 *
 * Options:
 *   --dry-run    Print what would be sent without actually sending email
 *   --json       Also save raw JSON files to scripts/output/
 */

const DRY_RUN = process.argv.includes("--dry-run");
const SAVE_JSON = process.argv.includes("--json");

// ── Config ──────────────────────────────────────────────────────────────────
const CLOUDFLARE_API_TOKEN =
  process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const D1_DATABASE_ID = "98ad144a-cfe2-4f19-a55c-c43140279840";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const RECIPIENTS = [
  "office@mhc-gc.com",
  "matt@mhc-gc.com",
  "arnold@mhc-gc.com",
];
const FROM_EMAIL = "MH Construction <noreply@mhc-gc.com>";

// ── Validation ──────────────────────────────────────────────────────────────
if (!CLOUDFLARE_API_TOKEN) {
  console.error(
    "❌ CLOUDFLARE_API_TOKEN (or CF_API_TOKEN) environment variable is required.",
  );
  console.error(
    "   Get one at: https://dash.cloudflare.com/profile/api-tokens",
  );
  process.exit(1);
}
if (!CLOUDFLARE_ACCOUNT_ID) {
  console.error("❌ CLOUDFLARE_ACCOUNT_ID environment variable is required.");
  console.error(
    "   Find it at: https://dash.cloudflare.com → right sidebar → Account ID",
  );
  process.exit(1);
}
if (!RESEND_API_KEY && !DRY_RUN) {
  console.error(
    "❌ RESEND_API_KEY environment variable is required (or use --dry-run).",
  );
  process.exit(1);
}

// ── D1 Query Helper ─────────────────────────────────────────────────────────
async function queryD1(sql) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(`D1 query failed: ${JSON.stringify(json.errors)}`);
  }

  return json.result?.[0]?.results ?? [];
}

// ── Resend Email Helper ─────────────────────────────────────────────────────
async function sendEmail({ to, subject, html, text }) {
  if (DRY_RUN) {
    console.log(`📧 [DRY RUN] Would send "${subject}" to ${to.join(", ")}`);
    return { success: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html, text }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error (${res.status}): ${text}`);
  }

  return res.json();
}

// ── HTML Formatters ─────────────────────────────────────────────────────────
function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateStr;
  }
}

function tableRow(label, value) {
  if (value == null || value === "") return "";
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;font-weight:600;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;">${escapeHtml(value)}</td>
    </tr>`;
}

function sectionHeader(title, count) {
  return `
    <tr>
      <td colspan="2" style="background:#386851;color:#fff;padding:16px 12px;font-size:18px;font-weight:700;">
        ${escapeHtml(title)} (${count})
      </td>
    </tr>`;
}

function submissionBlock(title, rows) {
  return `
    <table style="width:100%;border-collapse:collapse;margin:0 0 20px 0;border:1px solid #ddd;border-radius:6px;overflow:hidden;">
      <tr><td colspan="2" style="background:#f0f7f4;padding:10px 12px;font-weight:700;color:#386851;font-size:14px;">${escapeHtml(title)}</td></tr>
      ${rows}
    </table>`;
}

// ── Build Report Sections ───────────────────────────────────────────────────
function buildJobApplicationsHtml(apps) {
  if (!apps.length) return "<p>No job applications found.</p>";
  return apps
    .map((a, i) =>
      submissionBlock(
        `#${i + 1} — ${a.first_name} ${a.last_name} (${a.position})`,
        [
          tableRow("Name", `${a.first_name} ${a.last_name}`),
          tableRow("Email", a.email),
          tableRow("Phone", a.phone),
          tableRow("Position", a.position),
          tableRow("Experience", a.experience),
          tableRow("Availability", a.availability),
          tableRow("Location", [a.city, a.state].filter(Boolean).join(", ")),
          tableRow("Veteran Status", a.veteran_status),
          tableRow("Referral", a.referral_source),
          tableRow("Cover Letter", a.cover_letter),
          tableRow("Resume URL", a.resume_url),
          tableRow("Status", a.status),
          tableRow("Submitted", formatDate(a.created_at)),
        ].join(""),
      ),
    )
    .join("");
}

function buildContactSubmissionsHtml(subs) {
  if (!subs.length) return "<p>No contact submissions found.</p>";
  return subs
    .map((s, i) =>
      submissionBlock(
        `#${i + 1} — ${s.first_name} ${s.last_name}`,
        [
          tableRow("Name", `${s.first_name} ${s.last_name}`),
          tableRow("Email", s.email),
          tableRow("Phone", s.phone),
          tableRow("Project Type", s.project_type),
          tableRow("Location", s.project_location),
          tableRow("Budget", s.budget),
          tableRow("Timeline", s.timeline),
          tableRow("Urgency", s.urgency),
          tableRow("Preferred Contact", s.preferred_contact),
          tableRow("Message", s.message),
          tableRow("Status", s.status),
          tableRow("Submitted", formatDate(s.created_at)),
        ].join(""),
      ),
    )
    .join("");
}

function buildConsultationsHtml(consults) {
  if (!consults.length) return "<p>No consultation requests found.</p>";
  return consults
    .map((c, i) =>
      submissionBlock(
        `#${i + 1} — ${c.client_name}`,
        [
          tableRow("Client", c.client_name),
          tableRow("Email", c.email),
          tableRow("Phone", c.phone),
          tableRow("Project Type", c.project_type),
          tableRow("Description", c.project_description),
          tableRow("Location", c.location),
          tableRow("Budget", c.budget),
          tableRow("Requested Date", c.selected_date),
          tableRow("Requested Time", c.selected_time),
          tableRow("Notes", c.additional_notes),
          tableRow("Status", c.status),
          tableRow("Submitted", formatDate(c.created_at)),
        ].join(""),
      ),
    )
    .join("");
}

function buildNewsletterHtml(subs) {
  if (!subs.length) return "<p>No newsletter signups found.</p>";
  let rows = subs
    .map(
      (s) => `
    <tr>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(s.email)}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(s.name || "—")}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;">${s.subscribed ? "Active" : "Unsubscribed"}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #eee;">${formatDate(s.created_at)}</td>
    </tr>`,
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #ddd;">
      <tr style="background:#f0f7f4;">
        <th style="padding:8px 12px;text-align:left;color:#386851;">Email</th>
        <th style="padding:8px 12px;text-align:left;color:#386851;">Name</th>
        <th style="padding:8px 12px;text-align:left;color:#386851;">Status</th>
        <th style="padding:8px 12px;text-align:left;color:#386851;">Signed Up</th>
      </tr>
      ${rows}
    </table>`;
}

function buildPlainText(apps, contacts, consults, newsletter) {
  const lines = [];

  lines.push("=== MH CONSTRUCTION — ALL SUBMISSIONS REPORT ===");
  lines.push(
    `Generated: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}\n`,
  );

  lines.push(`--- JOB APPLICATIONS (${apps.length}) ---`);
  apps.forEach((a, i) => {
    lines.push(`\n#${i + 1}: ${a.first_name} ${a.last_name}`);
    lines.push(`  Position: ${a.position}`);
    lines.push(`  Email: ${a.email} | Phone: ${a.phone}`);
    lines.push(`  Experience: ${a.experience}`);
    if (a.availability) lines.push(`  Availability: ${a.availability}`);
    if (a.city || a.state)
      lines.push(`  Location: ${[a.city, a.state].filter(Boolean).join(", ")}`);
    if (a.veteran_status) lines.push(`  Veteran: ${a.veteran_status}`);
    if (a.cover_letter) lines.push(`  Cover Letter: ${a.cover_letter}`);
    if (a.resume_url) lines.push(`  Resume: ${a.resume_url}`);
    lines.push(
      `  Status: ${a.status} | Submitted: ${formatDate(a.created_at)}`,
    );
  });

  lines.push(`\n--- CONTACT SUBMISSIONS (${contacts.length}) ---`);
  contacts.forEach((s, i) => {
    lines.push(`\n#${i + 1}: ${s.first_name} ${s.last_name}`);
    lines.push(`  Email: ${s.email} | Phone: ${s.phone || "N/A"}`);
    if (s.project_type) lines.push(`  Project: ${s.project_type}`);
    if (s.project_location) lines.push(`  Location: ${s.project_location}`);
    if (s.budget) lines.push(`  Budget: ${s.budget}`);
    lines.push(`  Message: ${s.message}`);
    lines.push(
      `  Status: ${s.status} | Submitted: ${formatDate(s.created_at)}`,
    );
  });

  lines.push(`\n--- CONSULTATIONS (${consults.length}) ---`);
  consults.forEach((c, i) => {
    lines.push(`\n#${i + 1}: ${c.client_name}`);
    lines.push(`  Email: ${c.email} | Phone: ${c.phone || "N/A"}`);
    lines.push(`  Project: ${c.project_type}`);
    if (c.project_description)
      lines.push(`  Description: ${c.project_description}`);
    if (c.location) lines.push(`  Location: ${c.location}`);
    lines.push(`  Requested: ${c.selected_date} at ${c.selected_time}`);
    lines.push(
      `  Status: ${c.status} | Submitted: ${formatDate(c.created_at)}`,
    );
  });

  lines.push(`\n--- NEWSLETTER SIGNUPS (${newsletter.length}) ---`);
  newsletter.forEach((s) => {
    lines.push(
      `  ${s.email} | ${s.name || "—"} | ${s.subscribed ? "Active" : "Unsubscribed"} | ${formatDate(s.created_at)}`,
    );
  });

  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("📋 Retrieving all submissions from production D1 database...\n");

  // Query all tables in parallel
  const [jobApps, contacts, consultations, newsletter] = await Promise.all([
    queryD1("SELECT * FROM job_applications ORDER BY created_at DESC"),
    queryD1("SELECT * FROM contact_submissions ORDER BY created_at DESC"),
    queryD1("SELECT * FROM consultations ORDER BY created_at DESC"),
    queryD1("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC"),
  ]);

  console.log(`  Job Applications:     ${jobApps.length}`);
  console.log(`  Contact Submissions:  ${contacts.length}`);
  console.log(`  Consultations:        ${consultations.length}`);
  console.log(`  Newsletter Signups:   ${newsletter.length}`);

  const totalCount =
    jobApps.length + contacts.length + consultations.length + newsletter.length;

  if (totalCount === 0) {
    console.log("\n✅ No submissions found in the database. Nothing to send.");
    return;
  }

  // Optionally save raw JSON
  if (SAVE_JSON) {
    const { mkdirSync, writeFileSync } = await import("node:fs");
    const dir = "scripts/output";
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      `${dir}/job-applications.json`,
      JSON.stringify(jobApps, null, 2),
    );
    writeFileSync(
      `${dir}/contact-submissions.json`,
      JSON.stringify(contacts, null, 2),
    );
    writeFileSync(
      `${dir}/consultations.json`,
      JSON.stringify(consultations, null, 2),
    );
    writeFileSync(
      `${dir}/newsletter-subscribers.json`,
      JSON.stringify(newsletter, null, 2),
    );
    console.log(`\n💾 Raw JSON saved to ${dir}/`);
  }

  // Build email
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = `All Website Submissions Report — ${jobApps.length} Apps, ${contacts.length} Contacts, ${consultations.length} Consults, ${newsletter.length} Newsletter`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#212121;margin:0;padding:0;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background:linear-gradient(135deg,#386851 0%,#1E392C 100%);padding:30px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">📋 All Website Submissions</h1>
        <p style="color:#d4af37;margin:10px 0 0;font-size:14px;">MH Construction — Complete Report</p>
        <p style="color:#ccc;margin:8px 0 0;font-size:12px;">Generated: ${escapeHtml(now)}</p>
      </td>
    </tr>
    <tr><td style="padding:10px 20px;">
      <h3 style="color:#386851;margin:20px 0 5px;">Summary</h3>
      <ul>
        <li><strong>${jobApps.length}</strong> Job Applications</li>
        <li><strong>${contacts.length}</strong> Contact Submissions</li>
        <li><strong>${consultations.length}</strong> Consultation Requests</li>
        <li><strong>${newsletter.length}</strong> Newsletter Signups</li>
      </ul>
    </td></tr>

    ${
      jobApps.length
        ? `<tr><td style="padding:10px 20px;">
      <h2 style="color:#386851;border-bottom:2px solid #386851;padding-bottom:8px;">💼 Job Applications (${jobApps.length})</h2>
      ${buildJobApplicationsHtml(jobApps)}
    </td></tr>`
        : ""
    }

    ${
      contacts.length
        ? `<tr><td style="padding:10px 20px;">
      <h2 style="color:#386851;border-bottom:2px solid #386851;padding-bottom:8px;">📬 Contact Submissions (${contacts.length})</h2>
      ${buildContactSubmissionsHtml(contacts)}
    </td></tr>`
        : ""
    }

    ${
      consultations.length
        ? `<tr><td style="padding:10px 20px;">
      <h2 style="color:#386851;border-bottom:2px solid #386851;padding-bottom:8px;">📅 Consultation Requests (${consultations.length})</h2>
      ${buildConsultationsHtml(consultations)}
    </td></tr>`
        : ""
    }

    ${
      newsletter.length
        ? `<tr><td style="padding:10px 20px;">
      <h2 style="color:#386851;border-bottom:2px solid #386851;padding-bottom:8px;">📧 Newsletter Signups (${newsletter.length})</h2>
      ${buildNewsletterHtml(newsletter)}
    </td></tr>`
        : ""
    }

    <tr>
      <td style="background:#f5f5f5;padding:20px;text-align:center;font-size:12px;color:#666;">
        This is an automated report from the MH Construction website.<br>
        All data retrieved from the production database on ${escapeHtml(now)}.
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = buildPlainText(jobApps, contacts, consultations, newsletter);

  // Send email
  console.log(`\n📧 Sending report to: ${RECIPIENTS.join(", ")}...`);
  const result = await sendEmail({
    to: RECIPIENTS,
    subject,
    html,
    text,
  });

  console.log("✅ Report sent successfully!", result);
}

main().catch((err) => {
  console.error("❌ Script failed:", err.message || err);
  process.exit(1);
});
