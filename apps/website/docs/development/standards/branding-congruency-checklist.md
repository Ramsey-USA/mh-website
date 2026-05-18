# Branding Congruency Checklist

**Category:** Development - Branding Governance  
**Last Updated:** May 17, 2026  
**Status:** ✅ Active

> **Canonical Reference:** For exact brand values, see [Brand Constants](../../branding/brand-constants.md).

## Purpose

Use this checklist before publishing or merging any branding-sensitive change. It is a quick gate for voice, trust, accessibility, naming congruency, and visual consistency.

## Required Checks

1. **Voice:** Copy is relationship-first, factual, and free of hype.
1. **Veteran framing:** Veteran-owned language is accurate, hyphenated, and not slogan-heavy.
1. **Trust content:** Credentials, accreditation, and credibility sections are preserved.
1. **Accessibility:** Headings, labels, contrast, and semantic structure remain intact.
1. **SEO naming:** Titles, labels, slugs, and schema names match approved terminology.
1. **Visual consistency:** Corner radii and hover effects use centralized design tokens (see [Design System Standards](./design-system-standards.md)).
1. **Exception scope:** Approved visual exceptions stay limited to their documented component.
1. **Cross-surface alignment:** Related docs, metadata, and page content use the same terminology.

## Visual Consistency (New)

When adding or modifying UI components:

- [ ] Corner radii use `cornerRadius.*` tokens, not hardcoded `rounded-*` classes
- [ ] Hover effects use `hoverMotion.*` tokens, not inline `group-hover:scale-*` patterns
- [ ] Transitions use `transitionDuration.*` tokens for consistent timing
- [ ] No hardcoded border radius values in component code
- [ ] No inline hover scale/rotate patterns

See [Design System Standards](./design-system-standards.md) for complete guidelines.

## How to Use

- Check the relevant branding, development, and SEO standards first.
- Verify both the edited surface and neighboring surfaces that share the same terminology.
- If a check fails, update the underlying canonical source before publishing the downstream copy.

## Related Standards

- [Branding Index](../../branding/index.md)
- [Development Standards](./development-standards.md)
- [Design System Standards](./design-system-standards.md) ← **NEW**
- [AI Development Guidelines](./ai-development-guidelines.md)
- [Consistency Guide](./consistency-guide.md)
- [Universal Terminology Guide](../../branding/strategy/universal-terminology-guide.md)
- [Messaging Guide](../../branding/strategy/messaging.md)
- [Complete SEO Guide](../../technical/seo/seo-complete-guide.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
