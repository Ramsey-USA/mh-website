# Icon Selection & Usage Standards

**Category:** Design System - Icon Standards  
**Last Updated:** December 15, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active

---

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md)
- [🎨 Icons Documentation Hub](./icons-index.md)
- [🎖️ Military Icon Guide](./military-icon-guide.md)
- [📖 Icon System Complete](./icon-system-complete.md)

---

## 📋 Overview

Comprehensive standards for selecting, implementing, and maintaining icons across the MH Construction
website. This guide ensures consistency, accessibility, and semantic clarity in icon usage.

---

## 🎯 Selection Principles

### 1. Semantic Accuracy

**Choose icons that clearly represent their purpose.**

✅ **Good Examples:**

```tsx
// Phone contact - clear meaning
<MaterialIcon icon="phone" size="md" />

// Construction services - obvious connection
<MaterialIcon icon="construction" size="xl" />

// Veteran status - appropriate symbol
<MaterialIcon icon="military_tech" size="lg" />
```

❌ **Bad Examples:**

```tsx
// Using "build" for phone contact - confusing
<MaterialIcon icon="build" size="md" />

// Using "star" for construction - unclear
<MaterialIcon icon="star" size="xl" />

// Using "person" for company - not specific enough
<MaterialIcon icon="person" size="lg" />
```

---

### 2. Consistency

**Use the same icon for the same purpose throughout the site.**

**Established Patterns:**

| Purpose          | Icon                      | Do Not Use                      |
| ---------------- | ------------------------- | ------------------------------- |
| Phone contact    | `phone` or `call`         | ❌ `contact_phone`, `call_made` |
| Email contact    | `email` or `mail`         | ❌ `mail_outline`, `send`       |
| Location         | `location_on` or `place`  | ❌ `pin_drop`, `room`           |
| Construction     | `construction`            | ❌ `build`, `home_repair`       |
| Veteran status   | `military_tech`           | ❌ `verified`, `badge`          |
| Army veteran     | `shield`                  | ❌ `security`, `verified_user`  |
| Navy veteran     | `anchor`                  | ❌ `sailing`, `directions_boat` |
| Success/Complete | `check_circle` or `check` | ❌ `done`, `task_alt`           |
| Information      | `info`                    | ❌ `info_outline`, `help`       |
| Warning          | `warning`                 | ❌ `error`, `report_problem`    |

---

### 3. Visual Weight

**Match icon size to importance and context.**

**Size Hierarchy:**

```tsx
// Hero icons - 4xl (96px) - maximum visual impact
<MaterialIcon icon="flag" size="4xl" />

// Section headers - 2xl/3xl (60-72px) - strong presence
<MaterialIcon icon="map" size="2xl" />

// Card headers - xl (48px) - clear focal point
<MaterialIcon icon="construction" size="xl" />

// Feature items - lg (36px) - balanced emphasis
<MaterialIcon icon="handshake" size="lg" />

// Buttons - md/lg (30-36px) - appropriate for CTAs
<MaterialIcon icon="phone" size="lg" />

// Inline text - sm (24px) - text-integrated
<MaterialIcon icon="check" size="sm" />
```

---

### 4. Brand Alignment

**Choose icons that reinforce military-precision, veteran-owned brand identity.**

**Military-Aligned Icons (Preferred):**

- `military_tech` - Veteran recognition
- `shield` - Protection, Army, security
- `flag` - Mission, objectives, achievements
- `map` - Strategic planning, battle plan
- `badge` - Credentials, qualifications
- `workspace_premium` - Excellence, elite status
- `engineering` - Technical precision
- `verified` - Trust, certification

**Generic Icons (Use When No Military Alternative):**

- `construction` - Industry standard
- `phone` - Universal communication
- `email` - Universal communication
- `calendar` - Standard scheduling

---

### 5. Accessibility

**Ensure icons are perceivable and understandable.**

```tsx
// Always pair with text for clarity
<button className="flex items-center gap-2">
  <MaterialIcon icon="phone" size="md" />
  <span>Call Us</span>
</button>

// Provide aria-label for icon-only elements
<button aria-label="Close modal">
  <MaterialIcon icon="close" size="md" />
</button>

// Use appropriate color contrast
<MaterialIcon
  icon="info"
  className="text-blue-600 dark:text-blue-400" // Meets WCAG contrast
/>

// Don't rely on icon alone for critical actions
// ❌ Bad
<button><MaterialIcon icon="send" /></button>

// ✅ Good
<button>
  <MaterialIcon icon="send" size="md" className="mr-2" />
  Submit Form
</button>
```

---

## 📐 Size Standards

### Size Selection Matrix

| Context              | Size           | Pixel Size | Use When                            |
| -------------------- | -------------- | ---------- | ----------------------------------- |
| **Hero Sections**    | `4xl`          | 96px       | Page hero icons, major focal points |
| **Section Headers**  | `2xl` or `3xl` | 60-72px    | Section headers, major features     |
| **Large Cards**      | `xl`           | 48px       | Card headers, prominent features    |
| **Standard Cards**   | `lg`           | 36px       | Feature cards, standard emphasis    |
| **Large Buttons**    | `lg`           | 36px       | Primary CTAs, important buttons     |
| **Standard Buttons** | `md`           | 30px       | Secondary buttons, standard actions |
| **Small Buttons**    | `sm`           | 24px       | Tertiary actions, inline buttons    |
| **List Items**       | `sm`           | 24px       | List decorations, inline indicators |
| **Inline Text**      | `sm`           | 24px       | Embedded in text flow               |

---

### Container Sizing

**Icon should fill 75-80% of container:**

```tsx
// 64px container → xl (48px) icon
<div className="w-16 h-16 flex items-center justify-center">
  <MaterialIcon icon="construction" size="xl" />
</div>

// 80px container → 2xl (60px) icon
<div className="w-20 h-20 flex items-center justify-center">
  <MaterialIcon icon="military_tech" size="2xl" />
</div>

// 96px container → 3xl (72px) icon
<div className="w-24 h-24 flex items-center justify-center">
  <MaterialIcon icon="shield" size="3xl" />
</div>
```

---

## 🎨 Color Standards

### Semantic Color Mapping

**Military/Veteran Context:**

```tsx
// Veteran-owned emphasis
className = "text-bronze-300";
className = "text-brand-accent";

// Army (primary veteran)
className = "text-brand-primary"; // Hunter green

// Navy
className = "text-brand-secondary"; // Tan/leather

// Air Force
className = "text-sky-600 dark:text-sky-400";

// Marines
className = "text-red-600 dark:text-red-400";

// Coast Guard
className = "text-cyan-600 dark:text-cyan-400";
```

**Service Categories:**

```tsx
// Construction/primary services
className = "text-brand-primary";

// Emergency/urgent
className = "text-orange-600 dark:text-orange-400";

// Success/completion
className = "text-green-600 dark:text-green-400";

// Information
className = "text-blue-600 dark:text-blue-400";

// Warning/caution
className = "text-yellow-600 dark:text-yellow-400";
```

**Interaction States:**

```tsx
// Hover transition
className =
  "text-brand-primary hover:text-brand-accent transition-colors duration-300";

// Active state
className = "text-brand-accent";

// Disabled state
className = "text-gray-400 dark:text-gray-600 opacity-50";
```

---

## 🔄 Animation Standards

### Animation Types

#### 1. Scale (Most Common)

```tsx
// Standard hover scale
className = "group-hover:scale-110 transition-transform duration-300";

// Subtle scale
className = "group-hover:scale-105 transition-transform duration-200";

// Pronounced scale
className = "group-hover:scale-125 transition-transform duration-300";
```

#### 2. Rotation

```tsx
// Subtle rotation (tactical feel)
className = "group-hover:rotate-12 transition-transform duration-300";

// Quarter turn
className = "group-hover:rotate-90 transition-transform duration-300";

// Continuous spin (loading)
className = "animate-spin";
```

#### 3. Color Transition

```tsx
// Color change on hover
className =
  "text-gray-600 group-hover:text-brand-primary transition-colors duration-300";
```

#### 4. Combined Effects

```tsx
// Scale + color (recommended for CTAs)
className =
  "text-brand-primary group-hover:scale-110 group-hover:text-brand-accent transition-all duration-300";
```

---

### Animation Guidelines

**When to Use:**

- ✅ Buttons and interactive elements
- ✅ Card hover states
- ✅ Navigation items
- ✅ Expandable sections
- ✅ Modal open/close

**When NOT to Use:**

- ❌ Static content icons
- ❌ List item decorations
- ❌ Inline text icons
- ❌ Loading states (except spin)
- ❌ Hero section static icons

---

## 📍 Context-Specific Guidelines

### Buttons

```tsx
// Primary CTA with icon
<Button variant="primary" size="lg" className="group">
  <MaterialIcon
    icon="phone"
    size="lg"
    className="mr-3 group-hover:scale-110 transition-transform"
  />
  Call Now
</Button>

// Icon-only button
<button
  aria-label="Close"
  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
>
  <MaterialIcon icon="close" size="md" />
</button>
```

---

### Cards

```tsx
// Card with icon header
<Card className="group">
  <CardHeader>
    {/* Icon container with glow effect */}
    <div className="relative">
      <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full" />
      <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl">
        <MaterialIcon
          icon="construction"
          size="xl"
          className="text-white group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
    <CardTitle>Expert Craftsmanship</CardTitle>
  </CardHeader>
</Card>
```

---

### Lists

```tsx
// List with checkmark icons
<ul className="space-y-3">
  <li className="flex items-start gap-2">
    <MaterialIcon
      icon="check_circle"
      size="sm"
      className="text-green-600 flex-shrink-0 mt-1"
    />
    <span>Licensed in WA, OR, ID</span>
  </li>
</ul>

// List with custom icons
<ul className="space-y-4">
  {items.map((item) => (
    <li key={item.id} className="flex items-start gap-3">
      <MaterialIcon
        icon={item.icon}
        size="md"
        className="text-brand-primary flex-shrink-0"
      />
      <div>
        <h4 className="font-bold">{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </li>
  ))}
</ul>
```

---

### Navigation

```tsx
// Navigation link with icon
<Link href="/services" className="group flex items-center gap-2">
  <MaterialIcon
    icon="construction"
    size="md"
    className="group-hover:text-brand-accent transition-colors"
  />
  <span className="group-hover:text-brand-accent transition-colors">
    The Battle Plan
  </span>
</Link>
```

---

### Badges

```tsx
// Veteran badge
<div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full">
  <MaterialIcon icon="military_tech" size="md" className="text-bronze-300" />
  <span className="font-bold text-brand-primary">Veteran-Owned</span>
</div>
```

---

## 🚫 Common Mistakes

### ❌ Don't: Use Multiple Icons for Same Purpose

```tsx
// Inconsistent - multiple phone icons
<MaterialIcon icon="phone" />      // Page 1
<MaterialIcon icon="call" />       // Page 2
<MaterialIcon icon="contact_phone" /> // Page 3
```

### ✅ Do: Standardize Icon Usage

```tsx
// Consistent - same icon everywhere
<MaterialIcon icon="phone" /> // All pages
```

---

### ❌ Don't: Ignore Size Hierarchy

```tsx
// Wrong - button icon larger than header
<h2><MaterialIcon icon="construction" size="md" /></h2>
<button><MaterialIcon icon="phone" size="xl" /></button>
```

### ✅ Do: Follow Size Hierarchy

```tsx
// Correct - proper visual hierarchy
<h2><MaterialIcon icon="construction" size="2xl" /></h2>
<button><MaterialIcon icon="phone" size="md" /></button>
```

---

### ❌ Don't: Use Icon Without Context

```tsx
// Ambiguous - what does this button do?
<button>
  <MaterialIcon icon="arrow_forward" />
</button>
```

### ✅ Do: Provide Clear Context

```tsx
// Clear - obvious purpose
<button>
  <MaterialIcon icon="arrow_forward" className="mr-2" />
  Next Step
</button>
```

---

### ❌ Don't: Over-Animate

```tsx
// Distracting - too much movement
<MaterialIcon
  icon="construction"
  className="animate-spin group-hover:scale-150 group-hover:rotate-180"
/>
```

### ✅ Do: Use Subtle Animations

```tsx
// Professional - subtle enhancement
<MaterialIcon
  icon="construction"
  className="group-hover:scale-110 transition-transform duration-300"
/>
```

---

### ❌ Don't: Sacrifice Accessibility

```tsx
// Not accessible - no context for screen readers
<button>
  <MaterialIcon icon="close" />
</button>
```

### ✅ Do: Include Accessibility Features

```tsx
// Accessible - clear label
<button aria-label="Close modal">
  <MaterialIcon icon="close" />
</button>
```

---

## 📊 Icon Audit Checklist

Use this checklist when adding or reviewing icons:

### Semantic Clarity

- [ ] Icon clearly represents its purpose
- [ ] Icon is universally recognizable
- [ ] No ambiguity about icon meaning
- [ ] Icon aligns with user expectations

### Consistency

- [ ] Icon matches existing usage patterns
- [ ] Same icon used for same purpose site-wide
- [ ] Icon fits within established categories
- [ ] Icon documented in usage inventory

### Brand Alignment

- [ ] Icon supports military-precision brand
- [ ] Icon maintains professional tone
- [ ] Icon appropriate for construction industry
- [ ] Icon accessible to all audiences

### Technical Implementation

- [ ] Proper size for context
- [ ] Appropriate color contrast (WCAG AA)
- [ ] Animation is subtle and purposeful
- [ ] Icon paired with text for critical actions
- [ ] Accessibility attributes included

### Performance

- [ ] Icon loads efficiently
- [ ] No layout shift on icon load
- [ ] Animation doesn't cause jank
- [ ] Icon works across all browsers

---

## 🔍 Decision Tree

### Choosing the Right Icon

```text
START
  ↓
Does a standard icon exist for this purpose?
  ├─ YES → Use the standard icon
  │         (Check icon-usage-inventory.md)
  └─ NO → Continue
          ↓
       Is there a military-themed alternative?
          ├─ YES → Use military icon if appropriate
          │         (Check military-icon-guide.md)
          └─ NO → Continue
                  ↓
               Choose most semantic Material Icon
                  ↓
               Test with users for clarity
                  ↓
               Document in usage inventory
                  ↓
               END
```

---

## 📚 Related Documentation

- [Military Icon Enhancement Guide](./military-icon-guide.md) - Military-themed icon recommendations
- [Icon System Complete Guide](./icon-system-complete.md) - Complete implementation reference
- [Icons Documentation Hub](./icons-index.md) - Central icon documentation
- [Component Standards](../../branding/standards/component-standards.md) - Component-level standards
- [Development Standards](../../development/standards/development-standards.md) - General dev standards

---

## 🎯 Quick Reference

**Most Common Icons:**

- `construction` - Construction services
- `military_tech` - Veteran-owned
- `phone` - Phone contact
- `email` - Email contact
- `location_on` - Location
- `handshake` - Partnerships
- `check_circle` - Verification/success
- `shield` - Army veteran, protection
- `anchor` - Navy veteran
- `map` - Strategic planning

**Standard Sizes:**

- Hero: `4xl` (96px)
- Section header: `2xl` (60px)
- Card: `xl` (48px)
- Button: `lg` (36px)
- Inline: `sm` (24px)

**Common Animations:**

- Hover scale: `group-hover:scale-110`
- Color transition: `hover:text-brand-accent transition-colors`
- Loading spin: `animate-spin`

---

**Document Status:** Active  
**Next Review:** March 2026  
**Maintained By:** Development Team
