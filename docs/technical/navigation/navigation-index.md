# Navigation Documentation Index

**Category:** Technical - Navigation System  
**Last Updated:** November 11, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md) - Central hub for all documentation
- [🛠️ Technical Index](../technical-index.md) - Technical documentation hub
- [🎨 Design System Hub](../design-system/design-system-index.md) - Design system navigation
- [🔘 Buttons & CTAs](../design-system/buttons-ctas-index.md) - Navigation link patterns

---

## 📋 Overview

Complete navigation system documentation for MH Construction website, covering architecture, implementation, routing,
and component patterns for both main navigation and page-specific navigation.

**What's Here:**

- Navigation system architecture and design
- Technical implementation guides
- Component usage and patterns
- Routing and link standards
- Responsive navigation patterns

---

## 📚 Documentation Files

### Navigation System Overview

**[navigation.md](./navigation.md)** - Navigation system fundamentals (247 lines)

Core navigation concepts, component overview, and basic usage patterns for the MH Construction navigation system.

**Topics Covered:**

- Navigation component overview
- Basic implementation patterns
- Link structures and routing
- Navigation hierarchy
- Component relationships

**When to Use:**

- First-time navigation implementation
- Understanding navigation basics
- Quick overview of navigation system
- Reference for simple navigation tasks

---

### Navigation Architecture

**[navigation-architecture.md](./navigation-architecture.md)** - System architecture (221 lines)

Comprehensive architecture documentation covering navigation system design, structure, and organizational patterns.

**Topics Covered:**

- Navigation system architecture
- Component hierarchy and relationships
- State management patterns
- Route configuration
- Navigation context and providers
- System design decisions

**When to Use:**

- Understanding navigation system design
- Planning navigation changes or extensions
- Architecting new navigation features
- System-level troubleshooting
- Contributing to navigation codebase

---

### Navigation Technical Guide

**[navigation-technical-guide.md](./navigation-technical-guide.md)** - Implementation guide (510 lines)

Detailed technical implementation guide with code examples, patterns, and best practices for implementing navigation
across the site.

**Topics Covered:**

- Detailed implementation instructions
- Code examples and patterns
- Navigation component API
- PageNavigation component usage
- Link component patterns (Next.js Link)
- Navigation configuration (navigationConfigs.ts)
- Responsive navigation implementation
- Mobile menu patterns
- Accessibility requirements
- Performance optimization
- Common patterns and use cases
- Troubleshooting and debugging

**When to Use:**

- Implementing navigation in pages
- Adding new navigation links
- Customizing navigation behavior
- Building responsive navigation
- Debugging navigation issues
- Performance optimization
- Following best practices

---

## 🎯 When to Use Each Guide

| Task                           | Use This Guide                                                   | Why                               |
| ------------------------------ | ---------------------------------------------------------------- | --------------------------------- |
| **Learn navigation basics**    | [navigation.md](./navigation.md)                                 | Overview and fundamentals         |
| **Understand system design**   | [navigation-architecture.md](./navigation-architecture.md)       | Architecture and design decisions |
| **Implement navigation**       | [navigation-technical-guide.md](./navigation-technical-guide.md) | Detailed code examples            |
| **Add new page navigation**    | [navigation-technical-guide.md](./navigation-technical-guide.md) | PageNavigation implementation     |
| **Configure navigation links** | [navigation-technical-guide.md](./navigation-technical-guide.md) | navigationConfigs.ts patterns     |
| **Debug navigation issues**    | [navigation-technical-guide.md](./navigation-technical-guide.md) | Troubleshooting section           |
| **Plan navigation changes**    | [navigation-architecture.md](./navigation-architecture.md)       | System-level understanding        |

---

## 🚀 Quick Start

### Main Navigation Component

The main navigation is automatically included in the root layout:

```tsx
// Already in layout.tsx
import { Navigation } from "@/components/layout";

<Navigation />;
```

### Breadcrumb Navigation

Add hierarchical breadcrumb navigation to show user location in site structure:

```tsx
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Parent Page", href: "/parent" },
    { label: "Current Page" }, // No href for current page
  ]}
/>;
```

### Page-Specific Navigation

Add contextual navigation to individual pages:

```tsx
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export default function MyPage() {
  return (
    <div>
      {/* Hero section */}
      <section>{/* Hero content */}</section>

      {/* Breadcrumb navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "My Page" }]}
      />

      {/* Page navigation */}
      <PageNavigation items={navigationConfigs.myPage} />

      {/* Page content */}
      <section>{/* Content */}</section>
    </div>
  );
}
```

### Navigation Configuration

Define navigation links in `navigationConfigs.ts`:

```typescript
// src/components/navigation/navigationConfigs.ts
export const navigationConfigs = {
  myPage: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/mypage#section1", label: "Section 1", icon: "visibility" },
    { href: "/related", label: "Related Page", icon: "arrow_forward" },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],
};
```

### Internal Links (Next.js Link)

Always use Next.js Link for internal navigation:

```tsx
import Link from 'next/link';

// Internal link
<Link href="/about">About Us</Link>

// Link with button
<Link href="/booking">
  <Button variant="primary">
    <MaterialIcon icon="event" className="mr-2" />
    Schedule Consultation
  </Button>
</Link>

// Anchor link (same page)
<Link href="#section-id">Jump to Section</Link>

// Cross-page anchor link
<Link href="/services#modularization">Services - Modularization</Link>
```

---

## 📊 Navigation System Components

### Component Hierarchy

```text
Navigation (Main site navigation)
├── Desktop Menu
│   ├── Logo
│   ├── Navigation Links
│   ├── Theme Toggle
│   └── Mobile Menu Button
└── Mobile Menu
    ├── Navigation Links
    ├── Social Links
    └── Close Button

Breadcrumb (Hierarchical navigation)
├── Home Link
├── Parent Links (optional)
└── Current Page (text only)

PageNavigation (Page-specific navigation)
├── Navigation Items
│   ├── Icon
│   ├── Label
│   └── Link/Anchor
└── Responsive Layout
```

### Key Files

| File                     | Location                      | Purpose                              |
| ------------------------ | ----------------------------- | ------------------------------------ |
| **Navigation.tsx**       | `/src/components/layout/`     | Main site navigation                 |
| **Breadcrumb.tsx**       | `/src/components/navigation/` | Hierarchical breadcrumb navigation   |
| **PageNavigation.tsx**   | `/src/components/navigation/` | Page-specific navigation             |
| **navigationConfigs.ts** | `/src/components/navigation/` | Centralized navigation configuration |
| **index.ts**             | `/src/components/navigation/` | Navigation exports barrel file       |
| **Footer.tsx**           | `/src/components/layout/`     | Footer navigation                    |

---

## 🔗 Related Documentation

### Design System

- [Design System Hub](../design-system/design-system-index.md) - Complete design system
- [Buttons & CTAs](../design-system/buttons-ctas-index.md) - Navigation button patterns
- [Icons](../design-system/icons-index.md) - Navigation icons
- [Mobile Optimization](../design-system/mobile-optimization-guide.md) - Mobile navigation

### Development

- [Consistency Guide](../../development/consistency-guide.md) - Implementation patterns
- [Development Standards](../../development/development-standards.md) - Coding conventions
- [Component Standards](../../branding/standards/component-standards.md) - Component design standards
- [Navigation Components Guide](../../../src/components/navigation/navigation-components-guide.md) - Navigation
  component implementation

### Technical

- [Technical Index](../technical-index.md) - All technical documentation
- [Features](../features.md) - Platform features

---

## ✅ Navigation Implementation Checklist

When implementing navigation:

- [ ] Use Next.js `<Link>` for internal links (not `<a>`)
- [ ] Include Breadcrumb navigation below hero section on all pages
- [ ] Include PageNavigation below breadcrumb on content pages
- [ ] Add page config to `navigationConfigs.ts`
- [ ] Use Material Icons for navigation icons
- [ ] Include aria-labels for accessibility
- [ ] Test mobile menu behavior
- [ ] Verify keyboard navigation works
- [ ] Check focus indicators visible
- [ ] Test on all breakpoints
- [ ] Ensure smooth scrolling for anchor links
- [ ] Verify breadcrumb trail is accurate and complete

---

## 🆘 Troubleshooting

### Links Not Working

**Symptoms:** Clicking link does nothing, page refresh, or 404 error

**Solutions:**

1. Verify using Next.js `<Link>` component (not `<a>`)
2. Check href format (no trailing slashes unless intentional)
3. Ensure route exists in `/src/app/`
4. Check Next.js dev server is running

**Reference:** [navigation-technical-guide.md - Troubleshooting](./navigation-technical-guide.md)

---

### Mobile Menu Not Opening

**Symptoms:** Mobile menu button doesn't toggle menu

**Solutions:**

1. Verify Navigation component imported correctly
2. Check state management in Navigation.tsx
3. Test on actual mobile device (not just browser resize)
4. Verify z-index not conflicting with other elements

**Reference:** [navigation-technical-guide.md - Mobile Navigation](./navigation-technical-guide.md)

---

### PageNavigation Not Showing

**Symptoms:** Page navigation doesn't render

**Solutions:**

1. Check PageNavigation component imported correctly
2. Verify navigationConfigs entry exists for page
3. Ensure config array has items
4. Check component rendered in correct location

**Reference:** [navigation-technical-guide.md - PageNavigation](./navigation-technical-guide.md)

---

### Anchor Links Not Scrolling

**Symptoms:** Clicking anchor link doesn't scroll to section

**Solutions:**

1. Verify target element has correct id attribute
2. Check for duplicate ids on page
3. Ensure smooth scroll CSS applied
4. Test without hash in URL first

**Reference:** [navigation-technical-guide.md - Anchor Links](./navigation-technical-guide.md)

---

## 📈 Navigation System Statistics

**Current Implementation:**

- **Main Navigation Links:** 11 primary pages
- **Breadcrumb Navigation:** ✅ Implemented across all major pages (November 2025)
- **Page Navigation:** Implemented on major content pages
- **Footer Navigation:** Comprehensive footer links + resources
- **Social Media Links:** 5 platforms integrated
- **Mobile Optimization:** Fully responsive with mobile menu

**Navigation Types:**

- Main site navigation (persistent header)
- Breadcrumb navigation (hierarchical context) - **NEW**
- Page-specific navigation (contextual)
- Footer navigation (comprehensive links)
- Anchor navigation (section jumps)

**Pages with Breadcrumb Navigation:**

- 3D Explorer (`/3d-explorer`)
- Booking (`/booking`)
- Careers (`/careers`)
- Estimator (`/estimator`)
- Government Projects (`/government`)
- Projects (`/projects`)
- Team (`/team`)
- Trade Partners (`/trade-partners`)
- Urgent Support (`/urgent`)

---

## 📞 Support

For questions about navigation implementation:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Documentation Issues:** Submit to project repository
- **Technical Guide:** [navigation-technical-guide.md](./navigation-technical-guide.md)

---

**Last Updated:** November 11, 2025  
**Status:** ✅ Active  
**Files:** 4 (Overview, Architecture, Technical Guide, Breadcrumb Component)

**Recent Updates:**

- November 11, 2025: Added Breadcrumb navigation component and documentation
- November 6, 2025: Updated navigation system documentation
- October 13, 2025: Created comprehensive navigation technical guide
