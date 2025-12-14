# Icon Variant Quick Reference Guide

**Version:** 1.0.0  
**Date:** December 14, 2025  
**Status:** ✅ Official Standard  
**Category:** Development Guidelines - Visual Consistency

---

## 🎯 Quick Decision Tree

```text
Need a section header icon?
│
├─ Core values, trust, integrity themes?
│  └─ Use iconVariant="primary" (Green) ✅
│
├─ Partnerships, relationships, community?
│  └─ Use iconVariant="secondary" (Tan/Orange) ✅
│
├─ Awards, excellence, testimonials?
│  └─ Use iconVariant="bronze" (Gold/Bronze) ✅
│
└─ Featured/hero section, homepage highlight?
   └─ Use iconVariant="multi" (All colors) ✅
```

---

## 📋 The 4 Official Standards

### 1️⃣ Primary (Green) - Trust & Values

**When to use:**

- Core values sections
- Trust-building content
- Integrity themes
- Security/safety sections

**Example:**

```tsx
<SectionHeader
  iconVariant="primary"
  icon="shield"
  subtitle="Mission-Ready Values"
  title="Built on Honesty"
  description="..."
/>
```

**Visual:** Hunter green with professional authority

- Light mode: Deep green tones
- Dark mode: Lighter green with enhanced glow

---

### 2️⃣ Secondary (Tan/Orange) - Partnerships

**When to use:**

- Partnership sections
- Relationship content
- Community themes
- Collaboration focus

**Example:**

```tsx
<SectionHeader
  iconVariant="secondary"
  icon="handshake"
  subtitle="Building Together"
  title="Strong Partnerships"
  description="..."
/>
```

**Visual:** Warm tan/orange for approachability

- Light mode: Warm leather tan
- Dark mode: Bronze tones with soft glow

---

### 3️⃣ Bronze - Excellence & Awards

**When to use:**

- Awards & achievements
- Testimonials
- Premium services
- Excellence themes
- Quality craftsmanship

**Example:**

```tsx
<SectionHeader
  iconVariant="bronze"
  icon="emoji_events"
  subtitle="Recognized Excellence"
  title="Award-Winning Quality"
  description="..."
/>
```

**Visual:** Rich bronze/gold for prestige

- Light mode: Deep bronze with gold highlights
- Dark mode: Warm golden tones

---

### 4️⃣ Multi-Color - Featured Sections

**When to use:**

- Homepage hero sections (not regular heroes)
- Major featured content
- Signature sections
- ⚠️ Use sparingly - 1-2 per page max

**Example:**

```tsx
<SectionHeader
  iconVariant="multi"
  icon="stars"
  subtitle="Featured"
  title="Signature Services"
  description="..."
/>
```

**Visual:** All three brand colors for maximum impact

- Light mode: Full gradient spectrum
- Dark mode: Balanced with enhanced visibility

---

## 🏠 Real-World Examples

### Homepage

```tsx
// Core Values - Primary (Green)
<SectionHeader iconVariant="primary" icon="shield" ... />

// Services Showcase - Multi-Color (Featured)
<SectionHeader iconVariant="multi" icon="explore" ... />

// Transparency Notice - Secondary (Partnership)
<SectionHeader iconVariant="secondary" icon="construction" ... />

// Why Partner - Primary (Trust)
<SectionHeader iconVariant="primary" icon="verified" ... />
```

### About Page

```tsx
// Values Matter - Bronze (Excellence)
<SectionHeader iconVariant="bronze" icon="verified" ... />

// Partnership Philosophy - Secondary
<SectionHeader iconVariant="secondary" icon="handshake" ... />

// Awards Section - Bronze
<SectionHeader iconVariant="bronze" icon="emoji_events" ... />
```

### Services Page

```tsx
// Service Categories - Primary
<SectionHeader iconVariant="primary" icon="engineering" ... />

// Partner Benefits - Secondary
<SectionHeader iconVariant="secondary" icon="people" ... />
```

---

## ⚠️ Common Mistakes to Avoid

❌ **Don't:** Use multi-color for every section

```tsx
// Bad - overuse
<SectionHeader iconVariant="multi" icon="people" ... />
<SectionHeader iconVariant="multi" icon="build" ... />
<SectionHeader iconVariant="multi" icon="verified" ... />
```

✅ **Do:** Use multi-color sparingly for featured content

```tsx
// Good - strategic use
<SectionHeader iconVariant="multi" icon="stars" ... />     // Featured
<SectionHeader iconVariant="primary" icon="shield" ... />  // Values
<SectionHeader iconVariant="secondary" icon="people" ... /> // Team
```

---

❌ **Don't:** Ignore semantic meaning

```tsx
// Bad - bronze for basic content
<SectionHeader iconVariant="bronze" icon="info" ... />
```

✅ **Do:** Match variant to content theme

```tsx
// Good - bronze for awards
<SectionHeader iconVariant="bronze" icon="emoji_events" ... />
```

---

## 🎨 Icon + Variant Pairings

| Icon                | Variant              | Usage                 |
| ------------------- | -------------------- | --------------------- |
| `shield`            | Primary              | Core values, security |
| `verified`          | Primary or Bronze    | Trust, certification  |
| `handshake`         | Secondary            | Partnerships          |
| `people`            | Secondary            | Team, community       |
| `emoji_events`      | Bronze               | Awards, achievements  |
| `workspace_premium` | Bronze               | Premium services      |
| `explore`           | Multi                | Featured services     |
| `stars`             | Multi                | Signature content     |
| `construction`      | Primary or Secondary | Services, operations  |
| `security`          | Primary              | Safety, compliance    |

---

## 💡 Pro Tips

1. **Consistency within page**: Use same variant for similar-level sections
2. **Hierarchy**: Primary for main, Bronze for premium, Multi for featured
3. **Dark mode testing**: All variants tested in both light and dark modes
4. **One multi per page**: Reserve multi-color for 1-2 sections maximum
5. **Semantic first**: Choose based on content meaning, not just aesthetics

---

## 🔗 Related Documentation

- [Section Visual Standards](./section-visual-standards.md) - Complete implementation details
- [Cohesion Checklist](./cohesion-checklist.md) - Page consistency checklist
- [SectionHeader Component](../../../src/components/ui/SectionHeader.tsx) - Component source

---

## 📝 Version History

### v1.0.0 (December 14, 2025)

- Initial release of 4 official icon variant standards
- Established semantic usage guidelines
- Created decision tree and examples
