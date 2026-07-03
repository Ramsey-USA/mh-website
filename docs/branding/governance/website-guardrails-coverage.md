# Website Guardrails Coverage Map

**Category:** Branding - Governance  
**Last Updated:** July 3, 2026  
**Status:** Active - Website-Wide Requirement

## Purpose

Define how MH Branding Guardrails must be applied across all website surfaces so enforcement is
explicit, complete, and repeatable.

This document operationalizes the guardrails from:

- `docs/branding/agent-branding-policy.md`
- `docs/branding/governance/brand-congruency-master-checklist.md`
- `.github/instructions/mh-branding-guardrails.instructions.md`

## Required Guardrail Dimensions

Every in-scope website change must preserve all dimensions below:

1. **Voice:** Relationship-first, factual, no hype language.
2. **Veteran framing:** Accurate veteran-owned wording and chronology.
3. **Trust continuity:** Accreditation, licenses, and credibility signals remain present where required.
4. **Terminology:** UI, metadata, schema, and docs use canonical naming.
5. **Accessibility:** Semantics, labels, contrast, keyboard flow remain compliant.
6. **SEO naming:** Plain-language naming and route/metadata consistency.
7. **Visual system:** Typography, color, and component behavior align with canonical standards.

### Canonical Visual Enforcement Path (Buttons, Headings, Containers, Modals, Cards, Forms, Navigation, Footer Trust, and Hover Motion)

To avoid cross-doc conflicts, enforce this order for component and overlay behavior:

1. `docs/branding/standards/unified-component-standards.md`
2. `docs/development/standards/design-system-standards.md`
3. `docs/technical/design-system/buttons-ctas-complete-guide.md`
4. `docs/development/standards/page-compliance-checklist.md` (verification only)

Canonical anchor for button implementation: `#button-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for heading and subheading implementation:
`#heading-and-typography-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for container and modal implementation:
`#container-and-modal-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for card implementation:
`#card-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for form field and form shell implementation:
`#form-field-and-form-shell-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for navigation overlay and header action implementation:
`#navigation-overlay-and-header-action-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for footer accreditation and trust continuity implementation:
`#footer-accreditation-and-trust-continuity-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Rule: verification checklists must not introduce alternate implementation patterns that conflict
with canonical component and token standards.

## Canonical Contracts Matrix (Development Routing)

Use this table to route implementation and review decisions to the correct canonical source.

| UI Surface                 | Canonical Anchor (Source of Truth)                                                                                           | Implementation Companion                                      | Verification Gate                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| Headings/Subheadings       | `docs/branding/standards/unified-component-standards.md#heading-and-typography-visual-contract-canonical`                    | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Buttons/CTAs               | `docs/branding/standards/unified-component-standards.md#button-visual-contract-canonical`                                    | `docs/technical/design-system/buttons-ctas-complete-guide.md` | `docs/development/standards/page-compliance-checklist.md` |
| Containers/Modals          | `docs/branding/standards/unified-component-standards.md#container-and-modal-visual-contract-canonical`                       | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Cards                      | `docs/branding/standards/unified-component-standards.md#card-visual-contract-canonical`                                      | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Form Fields/Shells         | `docs/branding/standards/unified-component-standards.md#form-field-and-form-shell-visual-contract-canonical`                 | `docs/technical/form-security-standards.md`                   | `docs/development/standards/page-compliance-checklist.md` |
| Navigation/Overlay         | `docs/branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical`      | `docs/technical/homepage.md`                                  | `docs/development/standards/page-compliance-checklist.md` |
| Footer/Accreditation Trust | `docs/branding/standards/unified-component-standards.md#footer-accreditation-and-trust-continuity-visual-contract-canonical` | `docs/branding/brand-constants.md`                            | `docs/development/standards/page-compliance-checklist.md` |

Enforcement rule: if a companion or verification file conflicts with a canonical anchor above,
the canonical anchor wins and downstream files must be updated.

## Website Surface Coverage Matrix

| Surface Class                    | Example Areas                                                      | Required Guardrail Check                                       |
| -------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Marketing and conversion pages   | Home, About, Services hub/lane pages, Projects, Contact            | Master checklist + strategy companion when messaging changes   |
| Trust and credential surfaces    | Footer, Contact trust strip, Allies, Public-Sector, Veterans       | Master checklist with trust continuity emphasis                |
| SEO surfaces                     | Page titles, metadata utilities, schema, route indexing docs       | Master checklist + SEO consistency validation                  |
| UI implementation surfaces       | Shared components, section templates, tokens, theming              | Master checklist + development companion checklist             |
| Safety and resource surfaces     | Safety pages, resources, manuals/forms entry points                | Master checklist + trust/accessibility validation              |
| Operational and support surfaces | FAQ, Careers, accessibility/privacy/terms, offline/PWA touchpoints | Master checklist with terminology and accessibility validation |

## Minimum Review Workflow (Per Change)

1. Run `docs/branding/governance/brand-congruency-master-checklist.md`.
2. Add strategy companion checks for slogan/core-value/messaging changes.
3. Add development companion checks for component/token/implementation changes.
4. Record PASS/FAIL in PR notes for branding-sensitive changes.

## Conflict Resolution Protocol (Required)

When documentation or implementation guidance conflicts:

1. Resolve source-of-truth using the Canonical Contracts Matrix in this file.
2. Treat canonical anchors in `docs/branding/standards/unified-component-standards.md` as authoritative.
3. Update downstream companion and verification docs in the same PR.
4. Run `pnpm docs:guardrails:contracts` before merge.
5. Record conflict, resolution, and updated files in PR notes.

Escalation rule: if conflict cannot be resolved without a standard change, update the canonical
anchor first, then propagate to companions and verification docs.

## Definition of Complete Coverage

Coverage is complete only when:

- Entry-point docs link to this file and the master checklist.
- Branding, development, and technical indexes route contributors to canonical guardrails.
- No parallel checklist is treated as a standalone gate ahead of the master checklist.

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
