# Branding Congruency Checklist

**Category:** Development - Branding Governance  
**Last Updated:** May 17, 2026  
**Status:** ✅ Active

> **Canonical Reference:** For exact brand values, see [Brand Constants](../../branding/brand-constants.md).
> **Canonical Merge Gate:** Start with the [Brand Congruency Master Checklist](../../branding/governance/brand-congruency-master-checklist.md).

## Purpose

This file is the development implementation companion to the canonical branding merge gate.
Use it for component and token-level checks after the master checklist is complete.

## Development Companion Checks

1. **Visual consistency:** Corner radii and hover effects use centralized design tokens (see [Design System Standards](./design-system-standards.md)).
1. **Exception scope:** Approved visual exceptions stay limited to their documented component.
1. **Cross-surface alignment:** Related docs, metadata, and page content stay terminology-consistent after implementation changes.

## Visual Consistency (New)

When adding or modifying UI components:

- [ ] Corner radii use `cornerRadius.*` tokens, not hardcoded `rounded-*` classes
- [ ] Hover effects use `hoverMotion.*` tokens, not inline `group-hover:scale-*` patterns
- [ ] Transitions use `transitionDuration.*` tokens for consistent timing
- [ ] No hardcoded border radius values in component code
- [ ] No inline hover scale/rotate patterns

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
