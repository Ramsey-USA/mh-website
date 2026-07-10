# Consistency Implementation Checklists

**Category:** Development - Standards Companion
**Last Updated:** July 10, 2026
**Status:** Active

Use this companion with [Consistency Guide](./consistency-guide.md) for implementation gating.

## Implementation Checklist

### Before Creating a New Page

- [ ] Choose hero pattern (image/video background or gradient)
- [ ] NO veteran badges in hero or section headers
- [ ] Use correct typography tier (hero vs standard section)
- [ ] Include all responsive breakpoints in typography
- [ ] Alternating section backgrounds (white/gray-50)
- [ ] Container with proper padding: `relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`

### Before Creating a New Section

- [ ] Use standard section structure template
- [ ] Two-line header: subtitle + main title
- [ ] NO section badges (only modals have badges)
- [ ] Responsive typography with all breakpoints
- [ ] FadeInWhenVisible wrapper on header
- [ ] StaggeredFadeIn on grid content
- [ ] Proper vertical padding uses approved rhythm tiers (`py-12 sm:py-16 lg:py-20 xl:py-24` or `py-10 sm:py-12 lg:py-16`)
- [ ] CTA cluster follows primary-secondary-tertiary hierarchy
- [ ] Header scale is chosen intentionally for cadence with adjacent sections
- [ ] Deferred placeholder (if used) matches final section shell spacing and background
- [ ] CTA route actions use `Button asChild` + `Link` composition
- [ ] No utility-important (`!`) class overrides in section composition
- [ ] Motion classes are tokenized or documented as explicit exceptions

### Before Creating a New Component

- [ ] Use MaterialIcon instead of emojis
- [ ] Brand colors via Tailwind classes (never hardcoded)
- [ ] Touch targets minimum 44px × 44px
- [ ] Include `touch-manipulation` class
- [ ] Full dark mode support
- [ ] Responsive sizing with all breakpoints
- [ ] Hover states with proper transitions
- [ ] Accessibility attributes (aria-labels, roles)

### Before Creating Forms

- [ ] Input fields: `min-h-[44px]`
- [ ] Include `touch-manipulation` class
- [ ] Brand color focus rings
- [ ] Error state styling
- [ ] Helper text support
- [ ] Dark mode support
- [ ] Proper label associations

### Mobile Optimization Checklist

- [ ] All text readable at 320px width
- [ ] Touch targets meet 44px minimum
- [ ] No horizontal scroll at any breakpoint
- [ ] Proper spacing between interactive elements
- [ ] Images responsive with proper aspect ratios
- [ ] Animations smooth on mobile devices
- [ ] Forms usable with touch keyboards

### Deferred Rendering Checklist

- [ ] Loading placeholders inherit final section spacing classes.
- [ ] Loading placeholders inherit final section background variant.
- [ ] Placeholder structure approximates final content density to reduce layout pop.

## Quick Reference Commands

### Search for Consistency Issues

```bash
# Find emojis in source code
grep -r "[\u{1F600}-\u{1F64F}]" src/

# Find hardcoded colors
grep -r "#386851\|#BD9264" src/

# Find missing touch-manipulation
grep -rL "touch-manipulation" src/components/

# Find missing responsive typography
grep -L "xs:text-" src/app/*/page.tsx
```

### Validation

```bash
# Run type checking
pnpm run type-check

# Run linting
pnpm run lint

# Build test
pnpm run build

# Branding compliance check
./scripts/validation/check-branding-compliance.sh
```

## Quality Control

### Brand Compliance Checklist

#### Visual Elements

- [ ] Hunter Green (#386851) and Leather Tan (#BD9264) used correctly
- [ ] Mendl font family implemented
- [ ] Material Icons used exclusively (no emojis)
- [ ] Proper contrast ratios maintained (4.5:1 minimum)
- [ ] Consistent spacing and layout

#### Messaging Compliance

- [ ] Aligned with appropriate messaging group from
      [Page-Specific Messaging Guide](../../branding/strategy/page-specific-messaging-guide.md)
- [ ] Voice and tone match page group requirements
- [ ] Keyword prioritization follows group strategy
- [ ] Partnership language emphasized appropriately for group
- [ ] Veteran heritage mentioned appropriately (stronger in Groups 2, 4)
- [ ] Technology positioning matches group strategy (background in Groups 1-5, forefront in Group 6)
- [ ] Client benefits clearly communicated
- [ ] Professional yet approachable tone
- [ ] Contact information standardized

#### Technical Implementation

- [ ] Responsive design functioning (320px to 1920px+)
- [ ] Dark mode support working
- [ ] Accessibility standards met (WCAG AA)
- [ ] Performance benchmarks achieved (<3s load)
- [ ] Cross-browser compatibility verified

### Review Process

Pre-launch review:

1. Brand guidelines compliance check
2. Visual consistency audit
3. Typography and color verification
4. Icon usage audit (no emojis)
5. Messaging alignment review
6. Performance testing
7. Accessibility audit
8. Mobile responsiveness check
9. Cross-browser testing
10. SEO optimization verification

Approval authority:

- Marketing Materials: Leadership Team
- Website Content: Marketing and Development Team
- Business Communications: Project Manager and Leadership
- External Materials: Full Leadership Team

### Performance Metrics

- Page Load Speed: <3 seconds
- Mobile Responsiveness: 100% functional
- Accessibility Score: WCAG AA minimum
- Brand Consistency: 95%+ adherence

## Related

- [Consistency Guide](./consistency-guide.md)
- [Branding Congruency Checklist](./branding-congruency-checklist.md)
- [Unified Component Standards](../../branding/standards/unified-component-standards.md)
