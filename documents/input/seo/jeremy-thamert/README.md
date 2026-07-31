# Jeremy SEO Source Drop Folder

Place new Jeremy source material here so it can be reviewed and integrated into website SEO updates.

## What to drop here

- Certification links (official issuer pages preferred)
- News or story links about Jeremy or MH leadership
- PDFs, DOCX, or notes with source URLs
- Any citation details (issuer, date, credential ID when available)
- Name-variant notes that support the approved Jeremy SEO trio: `Jeremy Gale Thamert`, `Jeremy G. Thamert`, and `Jeremy Thamert`
- References that reinforce the shared `Words from the General` ribbon and route-level leadership coverage across the public site

## Suggested file naming

- `YYYY-MM_jeremy-certs-links.md`
- `YYYY-MM_jeremy-stories-links.md`
- `YYYY-MM_jeremy-seo-notes.md`

## Source quality notes

- Prefer primary/official sources over reposts.
- Include publication or verification date when possible.
- Avoid confidential/internal-only material.

## SEO structure checklist (Jeremy authority)

- Keep canonical naming aligned to the approved trio on every source update: `Jeremy Gale Thamert`, `Jeremy G. Thamert`, `Jeremy Thamert`.
- Ensure each new source can strengthen one or more entity signals:
  - Credential verification (license, certification, or regulator records)
  - Membership/association proof (chamber, AGC, or equivalent)
  - Independent story mentions (news or third-party coverage)
- Include direct source URLs (no redirect chains) so structured data can safely reference stable `sameAs`, `hasCredential`, and `subjectOf` links.
- If a source references a name variant not in the approved trio, add a short note explaining whether it should map to one of the approved variants.
- Prioritize evergreen, crawlable sources over social-only references for long-term search consistency.

## Numbered reference-map contract

- The authoritative numbered list lives in `apps/website/src/lib/data/team/jeremy-thamert.json` under `referenceLinks`.
- Preserve citation IDs `1` through `14` for the current DOCX package unless source evidence changes.
- Keep page rendering and schema output synchronized with this list:
  - `apps/website/src/app/jeremy-thamert/page.tsx` (Verified Sources reference map + Person `subjectOf` references)
  - `apps/website/src/components/seo/SeoMeta.tsx` (shared Person `citation` references)
- If links are added, removed, or re-ordered, update test expectations in `apps/website/src/components/seo/__tests__/SeoMeta.test.tsx`.
