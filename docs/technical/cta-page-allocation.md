# CTA Page Allocation

**Category:** Technical - CTA Governance  
**Last Updated:** May 17, 2026

## Decision

For multi-page reuse and performance consistency, keep `NextStepsSection` as the default CTA section.

Prefer `NextStepsSection` everywhere. `StrategicCTABanner` remains available as a specialized client CTA, but it is not currently used on the audited pages.

## Why

- `NextStepsSection` is now server-first and better for broad reuse.
- `StrategicCTABanner` is a client component with analytics event handlers, so it adds more hydration/runtime cost.
- Avoiding dual CTA blocks on a single page improves clarity and conversion flow.

## Home Page Change Applied

- Removed duplicate `StrategicCTABanner` from homepage.
- Homepage now keeps a single primary CTA section via `NextStepsSection`.

## Current CTA Usage (Observed)

`NextStepsSection` is present on:

- `/` (home)
- `/about`
- `/careers` (client page wrapper)
- `/cool-desert-nights` (client page wrapper)
- `/faq`
- `/projects`
- `/public-sector` (full page wrapper)
- `/resources`
- `/services`
- `/team`
- `/veterans`

`StrategicCTABanner` is currently unused on the audited page set.

## Recommended Allocation Standard

Default for all content and evergreen pages:

- Use `NextStepsSection` only.

Use `NextStepsSection` only on all audited pages, including `/`, `/about`, `/faq`, `/resources`, `/team`, `/testimonials`, `/veterans`, `/careers`, `/cool-desert-nights`, `/services`, `/projects`, and `/public-sector`.

## Documentation Rule for New Pages

When adding a new page:

1. Start with `NextStepsSection`.
2. Add `StrategicCTABanner` only with a clear conversion rationale and tracking plan.
3. Do not add both by default.

## Audit Checklist

- Confirm one primary CTA block per page unless exception is documented.
- Confirm analytics events exist for any `StrategicCTABanner` usage.

- Confirm CTA copy stays relationship-first and trust-aligned.

---

## CTA Component Distinction & Usage Policy

### NextStepsSection (Universal CTA)

- **Type:** Server-first, reusable, relationship-focused CTA section.
- **Usage:** Default for all major, evergreen, and content pages.
- **Purpose:** Drives trust, direct engagement, and clear next steps (consultation, view work, contact).
- **Performance:** No client-side hydration or analytics required; best for SEO and speed.
- **Copy:** Always relationship-first, veteran-owned, and trust-aligned.

### StrategicCTABanner (Specialized/Client CTA)

- **Type:** Client-only, analytics-enabled, compact banner.
- **Usage:** Only for campaign-specific, high-urgency, or analytics-tracked actions (e.g., PWA install, pitch deck, special consultation push).
- **Purpose:** Drives a single, urgent action with tracking; not for general use.
- **Performance:** Adds client-side runtime and analytics; use only with documented rationale.
- **Copy:** May be more direct or campaign-specific, but must remain on-brand.

### Decision Tree

1. **Is this a standard content or evergreen page?**
   - Use `NextStepsSection` only.
2. **Is there a campaign, experiment, or urgent action requiring analytics?**
   - Use `StrategicCTABanner` only if you have a documented conversion rationale and tracking plan.
3. **Never use both on the same page.**
4. **Document any exceptions in this file.**

### Implementation Rule

- When adding a new page, start with `NextStepsSection`.
- Only add `StrategicCTABanner` with a clear, documented reason.
- Cross-reference this policy in all CTA-related technical docs.
