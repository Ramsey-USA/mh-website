---
name: mh-branding-guardrails
description: "Always enforce MH branding standards, voice consistency, veteran-owned factual framing, trust and accreditation preservation, accessibility, and SEO naming alignment."
applyTo: "**/*.{ts,tsx,js,jsx,css,scss,md,mdx,json}"
---

# MH Branding Guardrails

Always enforce:

1. Standards from README and unified component standards.
2. Consistency guide terminology and cross-page cohesion.
3. Relationship-first, no-hype messaging.
4. Trust and accreditation preservation on relevant surfaces.
5. Accessibility and SEO naming alignment.

Never:

1. Introduce off-brand visual patterns without explicit approval.
2. Remove trust or credential sections unintentionally.
3. Use slogan-heavy or militarized aliases in page or SEO labels unless explicitly approved.

Approved exceptions:

1. **Veteran Owned badge container** (`WaVobBadge` component only): A patriotic red-to-blue
   gradient border (`red-600` → `blue-700`) is approved for the WA DVA Veteran Owned Business
   certification badge. The non-transparent logo background requires a container, and the
   patriotic colors are inseparable from the certification's authenticity. This exception is
   **scoped exclusively to `src/components/ui/WaVobBadge.tsx`**. Do not apply these colors
   anywhere else. See `docs/branding/standards/color-system.md` §Veteran Owned Badge Exception
   and `.github/branding-exceptions.json` for the formal record.

If conflict appears:

1. Recommend compliant alternative.
2. Flag risk clearly.
3. Record exception status if approved.
