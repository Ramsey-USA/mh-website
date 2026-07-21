# Branding Congruency Checklist

**Category:** Development - Branding Governance  
**Last Updated:** July 11, 2026  
**Status:** ✅ Active

> **Canonical Reference:** For exact brand values, see [Brand Constants](../../branding/brand-constants.md).
> **Canonical Merge Gate:** Start with the [Brand Congruency Master Checklist](../../branding/governance/brand-congruency-master-checklist.md).

## Purpose

This file is the development implementation companion to the canonical branding merge gate.
Use it for component, template, and route-state checks after the master checklist is complete.

## Development Companion Checks

1. **Visual consistency:** Corner radii and hover effects use centralized design tokens (see [Design System Standards](./design-system-standards.md)).
1. **Exception scope:** Approved visual exceptions stay limited to their documented component.
1. **Cross-surface alignment:** Related docs, metadata, and page content stay terminology-consistent after implementation changes.
1. **Language hierarchy enforcement:** Implementation preserves construction terminology first and veteran field standards second across UI copy, metadata, and supporting docs.
1. **Print chip consistency:** For manual/handbook TOC and form-cover templates, program/chapter/form identifier chips keep the canonical `1.5pt` corner radius with safety/handbook parity.
1. **Print TOC structure consistency:** Chapter/form rows remain associated in two-column TOC layout, continuation pages retain page-1 spacing, TOC row spacing remains `0.1in`, safety/handbook TOC footer structures stay label-free and matched, and handbook TOC suppresses empty continuation pages.
1. **Print spine metadata consistency:** Spine templates use `.spine-meta` for logo-to-year/revision spacing with `.spine-logo-wrap { gap: 0; }`, `.spine-meta { padding-top: 0.1in; gap: 0.1in; }`, and safety/handbook parity.
1. **Print tabs consistency:** Tab templates keep canonical frame/ribbon/footer/veteran-strip geometry, two-part approval-signature block contract (handbook: Jeremy + Kimberly, safety: Jeremy + Matt) with per-signer signature/date lane ratio `1.5fr 0.85fr`, fixed tuned spacing (`.tab-sig-row` gap `10pt`, divider inset `10pt`, role margin-bottom `6pt`, `.tab-sig-lines` gap `10pt`), chamber-logo row presence, and safety/handbook content separation.
1. **State parity:** Loading/error/offline/not-found and interactive states preserve the same brand visual system.
1. **Template parity:** Dynamic-route templates preserve heading cadence, CTA hierarchy, and trust continuity.

## Visual Consistency (New)

When adding or modifying UI components:

- [ ] Corner radii use `cornerRadius.*` tokens, not hardcoded `rounded-*` classes
- [ ] Hover effects use `hoverMotion.*` tokens, not inline `group-hover:scale-*` patterns
- [ ] Transitions use `transitionDuration.*` tokens for consistent timing
- [ ] No hardcoded border radius values in component code
- [ ] No inline hover scale/rotate patterns

## Comprehensive Surface Checklist

Apply checks for each surface touched by the change:

### App Shell and Global Surfaces

- [ ] Header/navigation overlay follow canonical spacing, typography, and interaction patterns
- [ ] Jeremy leadership ribbon remains present and visually consistent above footer
- [ ] Footer trust/accreditation surfaces remain present and legible at all breakpoints

### Route Templates and Page Bodies

- [ ] Shared section shells preserve approved section rhythm tier across the page
- [ ] Heading/subheading hierarchy matches canonical visual contract
- [ ] CTA clusters maintain primary-secondary-tertiary emphasis and spacing
- [ ] Adjacent related pages remain visually aligned (for example: Services -> Projects -> Contact)

### Dynamic and State Surfaces

- [ ] Dynamic routes (slug/city/category/detail) keep the same template-level visual contract
- [ ] `loading.tsx` states visually match the final section shells
- [ ] `error.tsx` and `global-error.tsx` preserve brand voice, trust language, and CTA hierarchy
- [ ] `not-found.tsx` and offline experiences remain on-brand and accessible

### Form and Feedback States

- [ ] Empty, validation, pending, and submission-result states are visually consistent
- [ ] Focus-visible styles are present and readable on all interactive controls
- [ ] Trust indicators and bot-protection messaging remain visible and not visually downgraded

### Media and Motion Surfaces

- [ ] Video/image overlays use approved gradients and preserve text contrast
- [ ] Icon usage follows Material icon standards (no emoji in source code)
- [ ] Motion/hover behavior avoids ad-hoc transforms and matches approved token patterns

## Logical Gap Repair Prompts

Use these prompts before merge to catch missing coverage:

1. Which adjacent route shares this template and could now drift visually?
2. Which non-happy-path states (loading/error/offline/not-found) were affected indirectly?
3. Which trust surface could be hidden, reordered, or visually de-emphasized at mobile width?
4. Which metadata or breadcrumb label changed without visible heading updates (or vice versa)?
5. Which component was restyled locally instead of using canonical tokenized variants?

## Required Evidence Pack

For branding-sensitive implementation changes, include:

1. Mobile and desktop before/after screenshots for affected surfaces.
2. One keyboard navigation pass (focus-visible) for changed interactive clusters.
3. State captures for any changed loading/error/offline/not-found or form states.
4. PASS/FAIL output from the master checklist and this companion checklist.

See [Design System Standards](./design-system-standards.md) for complete guidelines.

## How to Use

- Complete the [Brand Congruency Master Checklist](../../branding/governance/brand-congruency-master-checklist.md) first.
- Check the relevant branding, development, and SEO standards next.
- Verify both the edited surface and neighboring surfaces that share the same terminology.
- If a check fails, update the underlying canonical source before publishing the downstream copy.

## Related Standards

- [Branding Index](../../branding/index.md)
- [Brand Congruency Master Checklist](../../branding/governance/brand-congruency-master-checklist.md)
- [Development Standards](./development-standards.md)
- [Design System Standards](./design-system-standards.md) ← **NEW**
- [Heading and Typography Visual Contract](../../branding/standards/unified-component-standards.md#heading-and-typography-visual-contract-canonical)
- [Button Visual Contract](../../branding/standards/unified-component-standards.md#button-visual-contract-canonical)
- [Container and Modal Visual Contract](../../branding/standards/unified-component-standards.md#container-and-modal-visual-contract-canonical)
- [Card Visual Contract](../../branding/standards/unified-component-standards.md#card-visual-contract-canonical)
- [Form Field and Form Shell Visual Contract](../../branding/standards/unified-component-standards.md#form-field-and-form-shell-visual-contract-canonical)
- [Navigation Overlay and Header Action Visual Contract](../../branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical)
- [Footer Accreditation and Trust Continuity Visual Contract](../../branding/standards/unified-component-standards.md#footer-accreditation-and-trust-continuity-visual-contract-canonical)
- [AI Development Guidelines](./ai-development-guidelines.md)
- [Consistency Guide](./consistency-guide.md)
- [Universal Terminology Guide](../../branding/strategy/universal-terminology-guide.md)
- [Messaging Guide](../../branding/strategy/messaging.md)
- [Complete SEO Guide](../../technical/seo/seo-complete-guide.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
