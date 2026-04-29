# Icon System - Complete Implementation Guide

**Category:** UI Components - Icons and Visual Indicators  
**Last Updated:** March 15, 2026  
**Status:** ✅ Active - Consolidated Documentation  
**Version:** 2.0.0 (Consolidated)

**⚠️ CONSOLIDATED DOCUMENT:** This guide consolidates and supersedes:

- `icon-policy.md` (policy & standards)
- `icon-system-guide.md` (implementation guide)
- `icon-hover-effects.md` (animations & interactions)
- `icon-troubleshooting.md` (common issues & solutions)
- `icon-usage-inventory.md` (site-wide inventory)

**Complete Icon System:** Material Icons implementation guide and standards

---

## 📋 Table of Contents

1. [Emoji-Free Policy](#emoji-free-policy-critical)
2. [Material Icons Standards](#material-icons-standards)
3. [Implementation Guide](#implementation-guide)
4. [Sizing & Spacing](#sizing--spacing)
5. [Hover Effects & Animations](#hover-effects--animations)
6. [Accessibility](#accessibility)
7. [Site-Wide Icon Inventory](#site-wide-icon-inventory)
   - [People Icon Standard](#-people-icon-standard-critical)
   - [Work & Career Icons](#-work--career-icons)
   - [Social Media Icons](#-social-media-icons)
   - [Information Context Icons](#ℹ️-information-context-icons)
   - [Core Brand Icons](#core-brand-icons)
   - [Navigation & UI Icons](#navigation--ui-icons)
8. [Troubleshooting](#troubleshooting)

---

## 🚫 Emoji-Free Policy (CRITICAL)

### Policy Statement

**MH Construction enforces a strict emoji-free source code policy:**

- ✅ **REQUIRED:** Material Icons ONLY in all application source code
- ❌ **PROHIBITED:** Emojis in ANY source code files (`.ts`, `.tsx`, `.js`, `.jsx`)
- ✅ **PERMITTED:** Emojis in documentation files (`.md`, `.mdx`, `README`)

### Why This Policy Exists

#### 1. Technical Reasons

**Rendering Consistency:**

- Emojis render differently across browsers, devices, and operating systems
- Material Icons render identically everywhere
- Color customization is impossible with emojis
- Size control is unreliable with emojis

**Performance:**

- Material Icons can be tree-shaken (unused icons removed from bundle)
- Emojis bloat bundle size
- Icons load faster and cache better

**Accessibility:**

- Screen readers handle icons with proper `aria-label` predictably
- Emoji screen reader support varies wildly
- Icons can be hidden from screen readers when decorative

#### 2. Brand Reasons

**Professional Image:**

- Material Icons convey enterprise professionalism
- Emojis can appear unprofessional or childish
- Icons maintain serious, trustworthy brand identity

**Design Consistency:**

- All icons follow unified design language
- Icons match our brand colors exactly
- Visual hierarchy is consistent

**Client Confidence:**

- Government/commercial clients expect professional interfaces
- Material Icons signal technical competency
- Consistency builds trust

### Policy Scope

#### WHERE Policy Applies

**✅ REQUIRED - Material Icons Only:**

- All TypeScript files (`.ts`, `.tsx`)
- All JavaScript files (`.js`, `.jsx`)
- Component files
- Page files
- Utility files
- Configuration files

**Example - COMPLIANT Code:**

```tsx
// ✅ CORRECT - Material Icon
<MaterialIcon icon="verified" size="lg" className="text-brand-primary" />
<MaterialIcon icon="engineering" size="xl" />
<MaterialIcon icon="handshake" size="md" className="text-brand-secondary" />
```

**Example - NON-COMPLIANT Code:**

```tsx
// ❌ WRONG - Emoji in source code
<span>✅ Verified</span>
<span>🔧 Engineering</span>
<span>🤝 Partnership</span>
```

#### WHERE Policy Does NOT Apply

**✅ PERMITTED - Emojis Allowed:**

- Markdown documentation (`.md`, `.mdx`)
- README files
- Comments in code (though discouraged)
- Git commit messages
- Issue descriptions
- Pull request descriptions

**Example - COMPLIANT Documentation:**

```markdown
<!-- ✅ CORRECT - Emoji in markdown documentation -->

## 🎯 Quick Start

### ✅ Features

- Fast performance
- 🔒 Secure
- ♿ Accessible
```

### Policy Enforcement

**Automated Enforcement:**

- ESLint rules flag emoji usage
- Pre-commit hooks scan for violations
- CI/CD pipeline fails on emoji detection

**Manual Review:**

- Code reviews check for compliance
- Pull requests require policy adherence
- Documentation updates maintain standards

**Consequences of Violations:**

- PR rejection until fixed
- Failed build/deployment
- Code quality score impact

---

## 🎨 Material Icons Standards

### Why Material Icons?

1. **Google's Design System** - Industry standard, actively maintained
2. **Huge Library** - 2000+ icons covering all use cases
3. **Consistent Design** - Unified visual language
4. **Excellent Support** - React component available, TypeScript support
5. **Performance** - Optimized SVGs, tree-shakeable
6. **Customizable** - Size, color, rotation, animation all controllable

### Installation & Setup

The `MaterialIcon` component is already installed and available — no additional packages required.
It uses Google Material Icons (font-based rendering) loaded globally via the root layout.

**Component Import:**

```tsx
import { MaterialIcon } from "@/components/icons/MaterialIcon";
```

---

## 🛠️ Implementation Guide

### Basic Usage

```tsx
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function Example() {
  return (
    <div>
      {/* Basic icon */}
      <MaterialIcon icon="check_circle" />

      {/* Sized icon */}
      <MaterialIcon icon="verified" size="lg" />

      {/* Colored icon */}
      <MaterialIcon icon="engineering" className="text-brand-primary" />

      {/* Multiple modifiers */}
      <MaterialIcon
        icon="handshake"
        size="xl"
        className="text-brand-secondary hover:scale-110 transition-transform"
      />
    </div>
  );
}
```

### Common Patterns

#### 1. Icon with Text

```tsx
<div className="flex items-center gap-2">
  <MaterialIcon icon="verified" size="md" className="text-bronze-300" />
  <span>Veteran-Owned</span>
</div>
```

#### 2. Icon Button

```tsx
<button className="group flex items-center gap-2">
  <MaterialIcon
    icon="event"
    size="lg"
    className="group-hover:scale-110 transition-transform"
  />
  <span>Schedule Consultation</span>
</button>
```

#### 3. Icon in Card Header

```tsx
<div className="flex items-center gap-3 mb-4">
  <div className="p-3 bg-brand-primary/10 rounded-lg">
    <MaterialIcon icon="engineering" size="xl" className="text-brand-primary" />
  </div>
  <h3 className="text-xl font-semibold">Expert Craftsmanship</h3>
</div>
```

#### 4. Icon List

```tsx
<ul className="space-y-3">
  {items.map((item) => (
    <li key={item.id} className="flex items-start gap-3">
      <MaterialIcon
        icon="check_circle"
        className="text-green-500 flex-shrink-0 mt-1"
      />
      <span>{item.text}</span>
    </li>
  ))}
</ul>
```

---

## 📏 Sizing & Spacing

### Size Scale

| Size Name | Pixels | Use Case                                    |
| --------- | ------ | ------------------------------------------- |
| `xs`      | 20px   | Dense layouts, inline small icons           |
| `sm`      | 24px   | Small buttons, compact containers           |
| `md`      | 30px   | Body text icons, standard buttons (default) |
| `lg`      | 36px   | Section headers, CTA buttons                |
| `xl`      | 48px   | Card headers, feature highlights            |
| `2xl`     | 60px   | Hero sections, major feature callouts       |
| `3xl`     | 72px   | Large hero/display icons                    |
| `4xl`     | 96px   | Extra-large display sizes                   |
| `5xl`     | 120px  | Maximum hero displays                       |

### Spacing Guidelines

**Icon + Text Spacing:**

```tsx
// Small context (inline)
<div className="flex items-center gap-1.5">

// Standard context (buttons, cards)
<div className="flex items-center gap-2">

// Large context (hero, features)
<div className="flex items-center gap-3">
```

**Icon Margins:**

```tsx
// Leading icon
className = "mr-2"; // or mr-3 for larger contexts

// Trailing icon
className = "ml-2"; // or ml-3 for larger contexts

// Icon in button
className = "mr-2 sm:mr-3"; // responsive spacing
```

### Responsive Sizing

```tsx
// Responsive icon size
<MaterialIcon
  icon="verified"
  className="text-base sm:text-lg md:text-xl"
/>

// Responsive in button
<button className="group">
  <MaterialIcon
    icon="event"
    className="text-base sm:text-lg md:text-xl mr-2 sm:mr-3"
  />
  <span className="text-sm sm:text-base md:text-lg">
    Schedule Consultation
  </span>
</button>
```

---

## ✨ Hover Effects & Animations

### Standard Hover Scale

**Most Common Pattern:**

```tsx
<MaterialIcon
  icon="handshake"
  className="group-hover:scale-110 transition-transform duration-200"
/>
```

**Usage:** Buttons, clickable cards, interactive elements

### Rotation Effects

**Clockwise Rotation:**

```tsx
<MaterialIcon
  icon="refresh"
  className="group-hover:rotate-180 transition-transform duration-300"
/>
```

**Usage:** Refresh buttons, sync indicators, loading states

### Translation Effects

**Horizontal Shift:**

```tsx
// Arrow forward on hover
<MaterialIcon
  icon="arrow_forward"
  className="group-hover:translate-x-1 transition-transform"
/>

// Arrow back on hover
<MaterialIcon
  icon="arrow_back"
  className="group-hover:-translate-x-1 transition-transform"
/>
```

**Vertical Shift:**

```tsx
<MaterialIcon
  icon="expand_more"
  className="group-hover:translate-y-1 transition-transform"
/>
```

### Color Transitions

```tsx
<MaterialIcon
  icon="favorite"
  className="text-gray-400 group-hover:text-red-500 transition-colors"
/>
```

### Combined Effects

```tsx
<button className="group flex items-center gap-2">
  <MaterialIcon
    icon="event"
    className="
      text-brand-primary
      group-hover:scale-110 
      group-hover:text-brand-primary/80
      transition-all
      duration-200
    "
  />
  <span>Schedule Consultation</span>
</button>
```

### Animation Timing

| Duration | Tailwind       | Use Case                      |
| -------- | -------------- | ----------------------------- |
| Fast     | `duration-100` | Instant feedback (clicks)     |
| Normal   | `duration-200` | Standard hover effects        |
| Smooth   | `duration-300` | Rotations, complex animations |
| Slow     | `duration-500` | Loading states, emphasis      |

### Easing Functions

```tsx
// Default easing (ease)
className="transition-transform"

// Ease-in-out (smooth start and end)
className="transition-transform ease-in-out"

// Linear (constant speed)
className="transition-transform ease-linear"

// Custom cubic-bezier
className="transition-transform"
style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
```

---

## ♿ Accessibility

### Decorative Icons (Most Common)

**When:** Icon is purely visual, redundant with text

```tsx
<button>
  <MaterialIcon icon="event" aria-hidden="true" />
  Schedule Consultation
</button>
```

**Rule:** Always use `aria-hidden="true"` when text is present

### Semantic Icons (Icon-Only)

**When:** Icon is the only indicator of meaning

```tsx
<button aria-label="Close dialog">
  <MaterialIcon icon="close" />
</button>

<button aria-label="Search">
  <MaterialIcon icon="search" />
</button>
```

**Rule:** Always provide `aria-label` when no text is present

### Icon with Hidden Text (Screen Reader Only)

```tsx
<button className="group">
  <MaterialIcon icon="facebook" className="text-2xl" />
  <span className="sr-only">Follow us on Facebook</span>
</button>
```

### Interactive Icon States

```tsx
<button
  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  aria-pressed={isFavorite}
>
  <MaterialIcon
    icon={isFavorite ? "favorite" : "favorite_border"}
    className="transition-colors"
  />
</button>
```

### Loading States

```tsx
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <MaterialIcon icon="hourglass_empty" className="animate-spin" />
      <span className="sr-only">Loading...</span>
    </>
  ) : (
    <>
      <MaterialIcon icon="send" />
      Submit
    </>
  )}
</button>
```

---

## 📊 Site-Wide Icon Inventory

### 👥 People Icon Standard (CRITICAL)

> **📁 Source of Truth:** `/src/lib/constants/navigation-icons.ts` → `SEMANTIC_ICONS`

**MH Construction uses a strict standard for people-related icons:**

| Icon    | Material Icon | Visual       | Represents                               |
| ------- | ------------- | ------------ | ---------------------------------------- |
| Allies  | `handshake`   | Two hands    | Partners, trade partners, subcontractors |
| Clients | `group`       | Two people   | Client partners, project owners          |
| Team    | `groups`      | Three people | Our staff, crew, employees               |

**Mental Model:**

- 🤝 **Handshake** = Allies (partnerships, working together)
- 👥 **Two People** = Clients (the client partner relationship)
- 👥👤 **Three People** = Team (our internal crew)

**Usage Examples:**

```tsx
import { SEMANTIC_ICONS } from "@/lib/constants/navigation-icons";

// Allies/Partners context
<MaterialIcon icon={SEMANTIC_ICONS.allies} />      // "handshake"
<MaterialIcon icon={SEMANTIC_ICONS.partnership} /> // "handshake"

// Client context
<MaterialIcon icon={SEMANTIC_ICONS.clients} />     // "group"

// Team context
<MaterialIcon icon={SEMANTIC_ICONS.team} />        // "groups"
<MaterialIcon icon={SEMANTIC_ICONS.teamwork} />    // "groups"
```

**Why This Matters:**

- Provides instant visual recognition across the site
- Users learn the icon language: handshake = partners, two people = clients, three people = team
- Maintains brand consistency and reduces cognitive load

---

### 💼 Work & Career Icons

| Context   | Icon              | Visual     | Use Case                        |
| --------- | ----------------- | ---------- | ------------------------------- |
| Careers   | `work`            | Briefcase  | Jobs page, career links         |
| Personnel | `badge`           | Name badge | HR, credentials, personnel docs |
| Business  | `business_center` | Briefcase  | Business/corporate contexts     |

### 📢 Social Media Icons

| Platform  | Icon              | Rationale               |
| --------- | ----------------- | ----------------------- |
| Facebook  | `thumb_up`        | "Like" concept          |
| Instagram | `photo_camera`    | Photo-focused platform  |
| Twitter   | `alternate_email` | @ mentions              |
| YouTube   | `smart_display`   | Video content           |
| LinkedIn  | `business_center` | Professional networking |

### ℹ️ Information Context Icons

| Context      | Icon            | When to Use                            |
| ------------ | --------------- | -------------------------------------- |
| About (page) | `military_tech` | Company identity, veteran-owned status |
| General info | `info`          | Informational content within pages     |
| Review/Rate  | `rate_review`   | Prompting user reviews                 |
| Rating       | `star`          | Displaying ratings/reviews             |

---

### Core Brand Icons

> **Note:** These are _semantic/conceptual_ icons representing brand values and concepts. For page navigation icons, see the "Navigation & UI Icons" section above.

**Primary Identity:**

- `engineering` - Engineering expertise, core services
- `verified` - Quality assurance, certifications
- `handshake` - Allies, partners, trade partners (see People Icon Standard above)
- `military_tech` - Veteran-owned status, military precision

**Service Icons (Conceptual):**

- `construction` - Construction work, vendor services (concept)
- `business` - Commercial projects, business services
- `home` - Residential projects, homeowner services
- `factory` - Industrial projects, manufacturing facilities

### Navigation & UI Icons

> **📁 Source of Truth:** `/src/lib/constants/navigation-icons.ts`
>
> All page navigation icons are centralized in this file. Import `PAGE_ICONS` or `SEMANTIC_ICONS` from this module to ensure consistency.

**Standardized Page Icons:**

| Page          | Icon                | Usage                              |
| ------------- | ------------------- | ---------------------------------- |
| Home          | `home`              | Homepage navigation                |
| Contact       | `contact_phone`     | Contact page links                 |
| Services      | `build`             | Services page navigation           |
| Projects      | `photo_library`     | Project portfolio links            |
| Resources     | `folder_open`       | Resources/downloads page           |
| Safety        | `verified_user`     | Safety information page            |
| FAQ           | `help`              | FAQ/help page                      |
| About         | `military_tech`     | About page (veteran-owned)         |
| Team          | `groups`            | Team/staff page (3 people)         |
| Allies        | `handshake`         | Partner trade partners (handshake) |
| Public Sector | `account_balance`   | Government services page           |
| Veterans      | `workspace_premium` | Veterans services page             |
| Careers       | `work`              | Careers/jobs page                  |
| Testimonials  | `star`              | Client partner reviews page        |
| Privacy       | `shield`            | Privacy policy                     |
| Terms         | `gavel`             | Terms of service                   |
| Accessibility | `accessibility`     | Accessibility statement            |
| Sitemap       | `account_tree`      | Site map page                      |

**Usage Example:**

```tsx
import { PAGE_ICONS, SEMANTIC_ICONS } from "@/lib/constants/navigation-icons";

// Direct lookup
<MaterialIcon icon={PAGE_ICONS.services} /> // "build"

// In a link component
<Link href="/services">
  <MaterialIcon icon={PAGE_ICONS.services} />
  Services
</Link>

// Semantic/contextual icons (can differ from page icons)
<MaterialIcon icon={SEMANTIC_ICONS.partnership} /> // "handshake"
```

**User Actions:**

- `event` - Schedule consultation (PRIMARY CTA)
- `phone` - Call to action
- `email` - Email contact
- `arrow_forward` - Next/Continue actions
- `arrow_back` - Back/Previous actions

### Feature & Value Icons

**Core Values (Branding Standard):**

- `shield` - Honesty
- `balance` - Integrity (scale)
- `business_center` - Professionalism (suitcase)
- `task_alt` - Thoroughness (checkmark)

**Technology Features:**

- `calculate` - Cost calculator
- `analytics` - Project analytics
- `insights` - Smart recommendations
- `dashboard` - Project dashboard

### Status & Feedback Icons

**Positive States:**

- `check_circle` - Success, completion, approval
- `verified` - Verified, certified, approved
- `thumb_up` - Approval, satisfaction

**Neutral States:**

- `info` - Information, details
- `help` - Help, support, questions
- `pending` - In progress, pending

**Attention States:**

- `warning` - Warning, caution
- `error` - Error, problem
- `priority_high` - High priority, urgent

### Social & External Icons

**Social Media:**

- `facebook` - Facebook profile
- `linkedin` - LinkedIn company page
- `instagram` - Instagram account

**External Actions:**

- `open_in_new` - External link
- `download` - File download
- `share` - Share content
- `print` - Print page

### Icon Usage by Page

**Homepage:**

- `engineering`, `verified`, `handshake`, `military_tech`
- `event`, `calculate`
- `check_circle`, `workspace_premium`, `shield`

**Services Page:**

- `construction`, `business`, `home`, `factory`
- `engineering`, `dashboard`, `insights`

**About Page:**

- `military_tech`, `verified`, `shield`
- `people`, `history`, `location_on`

**Contact Page:**

- `event`, `phone`, `email`, `location_on`
- `schedule`, `directions`

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Icon Not Appearing

**Problem:** Icon renders as blank space

**Solutions:**

```tsx
// Check import
import { MaterialIcon } from '@/components/icons/MaterialIcon';

// Verify icon name (exact match, lower_snake_case)
<MaterialIcon icon="CheckCircle" />  // ❌ Wrong (PascalCase)
<MaterialIcon icon="check_circle" /> // ✅ Correct (snake_case)

// Browse available icons:
// https://fonts.google.com/icons
```

#### 2. Icon Wrong Size

**Problem:** Icon doesn't scale properly

**Solutions:**

```tsx
// Use size prop, not className for base size
<MaterialIcon icon="event" size="lg" />  // ✅ Correct

// Available sizes: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
// For custom sizing override:
<MaterialIcon
  icon="event"
  size="lg"
  style={{ fontSize: '40px' }}  // Override if needed
/>
```

#### 3. Icon Not Changing Color

**Problem:** Color classes don't apply

**Solutions:**

```tsx
// Ensure color class is specific enough
<MaterialIcon icon="event" className="text-blue-500" />  // ✅

// Check parent styles aren't overriding
<div className="text-red-500">
  <MaterialIcon icon="event" className="!text-blue-500" />  // Use !important
</div>

// Verify dark mode support
<MaterialIcon
  icon="event"
  className="text-gray-900 dark:text-gray-100"
/>
```

#### 4. Hover Effect Not Working

**Problem:** Hover animation doesn't trigger

**Solutions:**

```tsx
// Ensure parent has group class
<button className="group">  // ✅ Must have group
  <MaterialIcon
    icon="event"
    className="group-hover:scale-110"
  />
</button>

// Add transition class
<MaterialIcon
  icon="event"
  className="group-hover:scale-110 transition-transform"  // ✅
/>
```

#### 5. Icon Misaligned with Text

**Problem:** Icon doesn't center with adjacent text

**Solutions:**

```tsx
// Use flex container with items-center
<div className="flex items-center gap-2">  // ✅
  <MaterialIcon icon="event" />
  <span>Schedule Consultation</span>
</div>

// Adjust icon baseline for inline
<span className="inline-flex items-center gap-2">
  <MaterialIcon icon="verified" className="relative top-0.5" />
  <span>Verified</span>
</span>
```

#### 6. Icon Too Large on Mobile

**Problem:** Icon oversized on small screens

**Solutions:**

```tsx
// Use responsive sizing
<MaterialIcon
  icon="event"
  className="text-base sm:text-lg md:text-xl"
/>

// Or use size prop with responsive container
<div className="text-sm sm:text-base">
  <MaterialIcon icon="event" />  // Inherits parent size
</div>
```

#### 7. Screen Reader Issues

**Problem:** Screen reader reads icon incorrectly

**Solutions:**

```tsx
// Decorative icon (with text)
<button>
  <MaterialIcon icon="event" aria-hidden="true" />  // ✅
  Schedule Consultation
</button>

// Semantic icon (icon-only)
<button aria-label="Close dialog">  // ✅
  <MaterialIcon icon="close" />
</button>
```

### Performance Issues

#### Bundle Size Concerns

**Problem:** Icons increasing bundle size

**Solution:** Icons are already tree-shaken automatically by Next.js. Only used icons are included in the bundle.

#### Loading Performance

**Problem:** Icons cause layout shift

**Solutions:**

```tsx
// Reserve space for icon
<div className="w-6 h-6">  // Match icon size
  <MaterialIcon icon="event" size="lg" />
</div>

// Use skeleton loader
<div className="animate-pulse bg-gray-200 w-6 h-6 rounded" />
```

---

## 📋 Quick Reference Card

### Essential Icons

| Use Case           | Icon Name      | Size | Color        |
| ------------------ | -------------- | ---- | ------------ |
| Schedule CTA       | `event`        | `lg` | Hunter Green |
| Client CTA         | `handshake`    | `lg` | Hunter Green |
| Ally Partnership   | `construction` | `lg` | Leather Tan  |
| Verified/Certified | `verified`     | `md` | Bronze       |
| Engineering        | `engineering`  | `xl` | Hunter Green |
| Success Check      | `check_circle` | `md` | Green        |
| Information        | `info`         | `md` | Blue         |
| Warning            | `warning`      | `md` | Amber        |

### Standard Patterns

```tsx
// Button with icon
<button className="group">
  <MaterialIcon
    icon="event"
    size="lg"
    className="mr-2 group-hover:scale-110 transition-transform"
  />
  Schedule Consultation
</button>

// Card header
<div className="flex items-center gap-3">
  <MaterialIcon icon="engineering" size="xl" className="text-brand-primary" />
  <h3>Expert Craftsmanship</h3>
</div>

// List item
<li className="flex items-start gap-2">
  <MaterialIcon icon="check_circle" className="text-green-500 flex-shrink-0 mt-1" />
  <span>Licensed in WA, OR, ID</span>
</li>
```

---

## 📚 Related Documentation

### Essential References

- **[Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)** - Icon usage in buttons
- **[Consistency Guide](../../development/standards/consistency-guide.md)** - Implementation standards

### Brand Guidelines

- **[Color System](../../branding/standards/color-system.md)** - Brand colors for icons
- **[Unified Component Standards](../../branding/standards/unified-component-standards.md)** - Component design & typography

---

## 🎯 Summary & Key Takeaways

### Critical Rules

1. **NO EMOJIS in source code** - Material Icons only (`.ts`, `.tsx`, `.js`, `.jsx`)
2. **ALWAYS use MaterialIcon component** - Never raw SVG or font icons
3. **aria-hidden="true" when with text** - Accessibility requirement
4. **aria-label when icon-only** - Screen reader support
5. **Use size prop for consistency** - Don't rely only on className

### Best Practices

- ✅ Use group hover for button icons
- ✅ Add transition classes for smooth animations
- ✅ Use flex layout for icon + text alignment
- ✅ Choose semantic icon names
- ✅ Test on mobile devices
- ✅ Verify accessibility with screen reader

### Common Mistakes to Avoid

- ❌ Using emojis in components
- ❌ Forgetting transition classes on hover effects
- ❌ Missing aria attributes
- ❌ Inconsistent icon sizes
- ❌ Wrong icon for context (AI vs IRL services)
- ❌ Not testing mobile responsiveness

---

**Document Maintained By:** MH Construction Development Team  
**Last Major Update:** January 2025 (Navigation icon standardization)  
**Next Review Date:** April 2025  
**Version:** 2.1.0 (Added centralized navigation icons)

---

**Questions or Issues?**

- [Main README](../../../README.md) - Central documentation hub
- [Material Icons Library](https://mui.com/material-ui/material-icons/) - Browse available icons
