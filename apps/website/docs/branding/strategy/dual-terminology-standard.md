# Dual Terminology Standard

**Last Updated:** April 24, 2026  
**Status:** Canonical Reference (website terminology)

## Purpose

Define one source of truth for dual terminology used across MH Construction website surfaces.

This standard governs:

- Navigation labels
- Breadcrumb labels
- Hero labels
- Browser tab titles (metadata)
- Structured data name fields
- CTA labels and chatbot page-reference labels

## Core Rule

Use plain-language primary labels for clarity and SEO.

Dual terminology may use arrow format only when approved for that surface:

`Primary Label → Context Label`

Do not use slogan-heavy or militarized aliases as standalone page labels in SEO-facing surfaces.

## Canonical Label Set

### Services

- Primary label: `Services`
- Approved dual form: `Operations → Services`
- Browser tab standard: `Operations → Services | Commercial and Industrial Construction Services | MH Construction`

### Projects

- Primary label: `Projects`
- Approved dual form: `Portfolio → Projects`
- Browser tab standard: `Portfolio → Projects | Completed Commercial and Industrial Construction Projects | MH Construction`

### Contact

- Primary label: `Contact`
- Approved dual form: `Contact → Consultation`
- Browser tab standard: `Contact → Consultation | Your Project. Honest Guidance. Let's Connect. | MH Construction`

### Team

- Primary label: `Our Team`
- Approved dual form: `Chain of Command → Our Team`
- Keep veteran-owned factual framing and leadership clarity.

## SEO and Accessibility Guardrails

1. Primary terms must remain human-readable and search-friendly.
2. Labels must stay consistent across nav, metadata, schema, and visible headings.
3. ARIA labels should prioritize plain-language clarity.
4. Spanish equivalents must match intent and avoid terminology drift.

## Trust and Compliance Guardrails

1. Never remove accreditation/trust surfaces while normalizing terminology.
2. Never alter WA/OR/ID license values or verification links during terminology-only changes.
3. Preserve factual ownership phrasing: `Founded 2010, Veteran-Owned Since January 2025`.

## Implementation References

- Metadata generators: `src/lib/seo/page-seo-utils.ts`
- Global metadata baseline: `src/app/layout.tsx`
- Shared SEO defaults: `src/components/seo/EnhancedSEO.tsx`
- Navigation labels: `src/components/layout/Navigation.tsx`
- Footer labels: `src/components/layout/Footer.tsx`
- Chatbot page references: `src/lib/chatbot/knowledge-base.ts`

## Change Control

If terminology changes are approved:

1. Update this file first.
2. Apply synchronized updates across all affected surfaces.
3. Run targeted tests for changed areas.
4. Record any temporary exceptions in project governance notes.
