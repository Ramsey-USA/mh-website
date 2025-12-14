# Navigation Documentation Index

**Category:** Technical - Navigation System  
**Last Updated:** December 14, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md) - Central hub for all documentation
- [🛠️ Technical Index](../technical-index.md) - Technical documentation hub
- [🎨 Design System Hub](../design-system/design-system-index.md) - Design system navigation
- [🔘 Buttons & CTAs](../design-system/buttons-ctas-complete-guide.md) - Navigation link patterns

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

### Complete Navigation System Guide ⭐

**[navigation-complete-guide.md](./navigation-complete-guide.md)** - Complete navigation system documentation ⭐ **CONSOLIDATED!**

**Version 2.0.0** - Comprehensive guide consolidating 4 previous navigation documents into a single source of truth.

**This guide replaces:**

- `navigation.md` (225 lines)
- `navigation-technical-guide.md` (643 lines)
- `navigation-architecture.md` (289 lines)
- `navigation-components-guide.md` (213 lines)

**Complete Topics Covered:**

- **System Overview** - Dual navigation philosophy and architecture
- **Global Hamburger Menu** - Page-to-page navigation implementation
- **Page Sectional Navigation** - Within-page contextual navigation
- **Component Implementation** - PageNavigation, Breadcrumb, configurations
- **Page-Specific Configs** - All page navigation configurations
- **Responsive Design** - Mobile, tablet, desktop optimization
- **Breadcrumb Navigation** - Hierarchical navigation context (NEW!)
- **Quality Assurance** - Testing checklists and validation
- **Common Tasks** - Quick reference for frequent operations
- **Troubleshooting** - Complete problem-solving guide

**When to Use:**

- **Adding navigation to new pages** - Quick start 3-step process
- **Understanding dual navigation** - Global menu vs page navigation
- **Implementing components** - PageNavigation, Breadcrumb usage
- **Configuring navigation items** - navigationConfigs.ts patterns
- **Responsive optimization** - Mobile, tablet, desktop behavior
- **Debugging navigation** - Troubleshooting section with solutions
- **Quality assurance** - Complete testing checklists

**Key Features:**

✅ Single source of truth for all navigation documentation  
✅ Zero content duplication  
✅ Complete quick-start guide with code examples  
✅ Comprehensive troubleshooting section  
✅ Breadcrumb navigation implementation  
✅ Quality assurance checklists

---

### Navigation Audit Report (Historical)

**Archived:** [navigation-audit-report.md](../../project/history/navigation-audit-report.md)

Historical navigation audit stub moved to project history. For current navigation testing and QA, see the
[Complete Navigation Guide](./navigation-complete-guide.md) Quality Assurance section.

**Use the Complete Navigation Guide for:**

- Testing checklists and validation
- QA procedures and standards
- Performance optimization guidance

---

## 🎯 Quick Reference Guide

**All navigation topics are now in one place:**

| Task                           | Section in Complete Guide      | Why                              |
| ------------------------------ | ------------------------------ | -------------------------------- |
| **Learn navigation basics**    | System Overview                | Dual navigation philosophy       |
| **Understand system design**   | Dual Navigation Architecture   | Complete system architecture     |
| **Implement navigation**       | Component Implementation       | Detailed code examples           |
| **Add new page navigation**    | Quick Start & Common Tasks     | 3-step implementation process    |
| **Configure navigation links** | Page-Specific Configurations   | All page configs with examples   |
| **Debug navigation issues**    | Troubleshooting                | Complete problem-solving guide   |
| **Plan navigation changes**    | System Overview & Architecture | System-level understanding       |
| **Test navigation**            | Quality Assurance              | Complete testing checklists      |
| **Responsive optimization**    | Responsive Design              | Mobile, tablet, desktop patterns |
| **Add breadcrumbs**            | Breadcrumb Navigation          | Hierarchical context             |

**One guide, complete coverage: [navigation-complete-guide.md](./navigation-complete-guide.md)**

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
- [Buttons & CTAs](../design-system/buttons-ctas-complete-guide.md) - Navigation button patterns
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

**Last Updated:** December 14, 2025  
**Status:** ✅ Active  
**Files:** 4 (Overview, Architecture, Technical Guide, Breadcrumb Component)

**Recent Updates:**

- November 11, 2025: Added Breadcrumb navigation component and documentation
- November 6, 2025: Updated navigation system documentation
- October 13, 2025: Created comprehensive navigation technical guide
