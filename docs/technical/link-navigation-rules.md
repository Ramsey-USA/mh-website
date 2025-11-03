# MH Construction - Link & Navigation Rules

**Last Updated**: October 15, 2025  
**Status**: ✅ Cleaned and Unified

---

## 🎯 Overview

This document defines the **single source of truth** for all link and navigation patterns
in the MH Construction website. All competing or duplicate code has been removed.

---

## 📋 Navigation System Architecture

### **1. Main Site Navigation**

**Component**: `/src/components/layout/Navigation.tsx`

- **Purpose**: Global site header navigation
- **Usage**: Automatically included in root layout
- **Features**:
  - Responsive mobile/desktop menu
  - Theme toggle
  - Logo and branding
  - Main site pages links
  - Social media links

**Import Pattern**:

````tsx
// In layout.tsx
import { Navigation } from "@/components/layout";
```text

---

### **2. Page-Specific Navigation**

**Component**: `/src/components/navigation/PageNavigation.tsx`

- **Purpose**: Contextual navigation within individual pages
- **Usage**: Add below hero section on each page
- **Features**:
  - Section links (anchors)
  - Related page links
  - Call-to-action links
  - Consistent icon-based navigation

**Import Pattern**:

```tsx
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// In page component
<PageNavigation items={navigationConfigs.pageName} />;
```text

---

### **3. Navigation Configuration**

**File**: `/src/components/navigation/navigationConfigs.ts`

- **Purpose**: Centralized configuration for all page navigation
- **Format**:

```typescript
export const navigationConfigs = {
  pageName: [
    { href: "/path", label: "Label", icon: "material_icon_name" },
    { href: "/page#section", label: "Section", icon: "icon_name" },
  ],
};
```text

---

## 🔗 Link Usage Rules

### **Rule #1: Always Use Next.js Link Component**

✅ **CORRECT**:

```tsx
import Link from "next/link";

<Link href="/about" className="...">
  About Us
</Link>;
```text

❌ **INCORRECT**:

```tsx
<a href="/about">About Us</a> // Don't use <a> for internal links
```text

---

### **Rule #2: External Links Use Anchor Tags**

✅ **CORRECT**:

```tsx
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```text

---

### **Rule #3: Anchor Links (Same Page)**

For same-page section navigation:

```tsx
<Link href="#section-id">Jump to Section</Link>
```text

For cross-page section navigation:

```tsx
<Link href="/services#modularization">Services - Modularization</Link>
```text

---

## 📁 Component Location Rules

| Component Type  | Location                                          | Import Path                                 |
| --------------- | ------------------------------------------------- | ------------------------------------------- |
| Main Navigation | `/src/components/layout/Navigation.tsx`           | `@/components/layout`                       |
| Page Navigation | `/src/components/navigation/PageNavigation.tsx`   | `@/components/navigation/PageNavigation`    |
| Footer          | `/src/components/layout/Footer.tsx`               | `@/components/layout`                       |
| Nav Config      | `/src/components/navigation/navigationConfigs.ts` | `@/components/navigation/navigationConfigs` |

---

## 🧹 Removed/Deprecated Files

The following files have been **REMOVED** to eliminate competing rules:

- ❌ `/src/components/layout/Navigation-old.tsx` (removed October 15, 2025)
- ❌ Any other navigation variants

**If you need navigation**, use only the components listed above.

---

## ✅ Implementation Checklist

When adding navigation to a new page:

- [ ] Use `<Link>` from `next/link` for internal navigation
- [ ] Import `PageNavigation` component
- [ ] Import `navigationConfigs` from centralized config
- [ ] Add page config to `navigationConfigs.ts`
- [ ] Use Material Design icon names from [Google Fonts Icons](https://fonts.google.com/icons)
- [ ] Test responsive behavior
- [ ] Verify anchor links scroll correctly

---

## 🎨 Styling Rules

### **Navigation Colors**

Use Tailwind classes with brand colors:

```tsx
// Primary brand hover
className = "hover:text-brand-primary dark:hover:text-bronze-400";

// Navigation backgrounds
className = "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md";

// Border accent
className = "border-t-4 border-brand-primary";
```text

### **Hover Effects**

```tsx
className = "group transition-all duration-300 hover:scale-105";
```text

---

## 📚 Related Documentation

- **[Navigation Architecture](./navigation-architecture.md)** - System overview
- **[Navigation Technical Guide](./navigation-technical-guide.md)** - Implementation details
- **[Branding Guidelines](../business/mh-branding.md)** - Design system

---

## 🔧 Troubleshooting

### **Issue: Links not working**

1. Verify you're using `<Link>` from `next/link`
2. Check href format (no trailing slashes unless intentional)
3. Ensure Next.js dev server is running

### **Issue: Navigation not appearing**

1. Check import paths are correct
2. Verify config exists in `navigationConfigs.ts`
3. Ensure component is rendered in page

### **Issue: Styling conflicts**

1. Check for duplicate Tailwind classes
2. Verify dark mode classes are included
3. Use `group` for hover effects on child elements

---

## 🚀 Quick Reference

**Add navigation to a new page:**

```tsx
"use client";
import Link from "next/link";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export default function NewPage() {
  return (
    <div>
      {/* Hero Section */}
      <section>{/* ... */}</section>

      {/* Page Navigation */}
      <PageNavigation items={navigationConfigs.newPage} />

      {/* Page Content */}
      <section>{/* ... */}</section>
    </div>
  );
}
```text

**Add config to navigationConfigs.ts:**

```typescript
export const navigationConfigs = {
  // ... existing configs

  newPage: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/newpage#section1", label: "Section 1", icon: "icon_name" },
    { href: "/related", label: "Related Page", icon: "icon_name" },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],
};
```text

---

**For questions or issues, refer to the technical documentation or contact the development team.**
````
