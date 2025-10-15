# MH Construction Icon Policy & Standards

**Date:** October 9, 2025
**Status:** ✅ Current
**Category:** Business - Brand Standards
**Last Updated:** October 9, 2025

## Quick Navigation

- [🏠 Brand Documentation](./BRANDING_INDEX.md)
- [🎨 Color System](./COLOR_SYSTEM.md)
- [📝 Typography](./TYPOGRAPHY.md)
- [🔧 Implementation Guide](./IMPLEMENTATION_GUIDE.md)

---

## 🚨 CRITICAL POLICY: EMOJI-FREE CODEBASE (v3.7.2)

### **Icon Standards Enforcement**

**MH Construction maintains a strict EMOJI-FREE source code policy. All visual
indicators must use Google Material Icons exclusively.**

#### **✅ APPROVED: Material Icons Only**

**Correct Implementation:**

```tsx
// ✅ Correct - Use MaterialIcon component
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" />
<MaterialIcon icon="phone" className="mr-2" />
<MaterialIcon icon="email" size="sm" className="text-gray-600" />
```text

## ❌ PROHIBITED: Emojis in Source Code

**Never Use These Patterns:**

```tsx
// ❌ Never use emojis in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule</button>
<div className="title">🎯 Project Goals</div>
const title = 'Update 🎯'
```text

## Policy Rationale

### Why Material Icons Only?

- **Cross-platform consistency**: Material Icons render identically across all devices
- **Professional branding**: Maintains cohesive visual identity
- **Accessibility compliance**: Screen readers handle Material Icons properly
- **Performance optimization**: No emoji rendering dependencies
- **Maintainability**: Centralized icon system with semantic naming
- **Scalability**: Easy to modify and extend icon usage

### Technical Benefits

- **Consistent Sizing**: All icons use standardized size props (`sm`, `md`, `lg`, `xl`)
- **Theme Support**: Icons automatically adapt to light/dark mode
- **Color Integration**: Icons use Tailwind color classes for brand consistency
- **Performance**: Font-based icons load faster than emoji or image icons

## Exception: Documentation Files

**Emojis ARE allowed in these contexts:**

- **Markdown files**: Emojis acceptable for documentation clarity
- **README files**: Visual enhancement for developer experience
- **Project planning**: Emojis help organize and communicate project status
- **Comments**: Code comments can use emojis for clarity

**Examples of Acceptable Documentation Usage:**

```markdown
## 🎯 Project Goals
- ✅ Complete Phase 1
- 🚧 Working on Phase 2
- 📋 Planning Phase 3

### 🚨 Critical Items
- ⚠️ High priority task
- 💡 Enhancement idea
```text

## Implementation Standards

### MaterialIcon Component Usage

**Basic Usage:**

```tsx
<MaterialIcon icon="icon_name" />
```text

**With Size:**

```tsx
<MaterialIcon icon="construction" size="lg" />
```text

**With Styling:**

```tsx
<MaterialIcon
  icon="phone"
  size="md"
  className="text-brand-primary hover:text-brand-secondary"
/>
```text

**In Buttons:**

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-3" />
  Schedule Consultation
</Button>
```text

### Common Icon Names

**Business Icons:**

- `construction` - Main business icon
- `business` - Commercial projects
- `military_tech` - Veteran-owned emphasis
- `handshake` - Partnership focus

**Action Icons:**

- `phone` - Contact actions
- `email` - Email actions
- `event` - Scheduling (IRL Consultations)
- `smart_toy` - AI Estimator tool
- `arrow_forward` - Next/Continue actions

**Navigation Icons:**

- `home` - Homepage
- `menu` - Mobile menu
- `close` - Close actions
- `expand_more` - Dropdown indicators

**Status Icons:**

- `check_circle` - Completed items
- `info` - Information
- `warning` - Warnings
- `error` - Errors

## Quality Assurance

### Code Review Checklist

- [ ] No emojis in TSX/JSX files
- [ ] All icons use MaterialIcon component
- [ ] Icon names are semantic and clear
- [ ] Proper size props used
- [ ] Appropriate color classes applied
- [ ] Accessibility considerations met

### Automated Checks

```bash
# Check for emoji usage in source code
grep -r "[\u{1F600}-\u{1F64F}]" src/ --exclude="*.md"

# Verify MaterialIcon usage
grep -r "<MaterialIcon" src/ | wc -l
```text

## Browser Support

Material Icons work consistently across:

- ✅ Chrome/Chromium (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Edge (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Related Documentation

- [**Color System**](./COLOR_SYSTEM.md) - Icon color guidelines
- [**Typography**](./TYPOGRAPHY.md) - Text and icon pairing
- [**Implementation Guide**](./IMPLEMENTATION_GUIDE.md) - Technical implementation
- [**Design System**](../technical/DESIGN_SYSTEM.md) - Complete design standards

---

**Policy Authority**: MH Construction Leadership Team
**Implementation**: Foundation-Only Architecture with Google Material Icons
**Enforcement**: Required for all production code
