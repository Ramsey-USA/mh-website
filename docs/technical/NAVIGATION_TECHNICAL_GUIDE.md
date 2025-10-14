# MH Construction - Navigation Technical Implementation Guide

> **Developer Implementation Guide for Dual Navigation System**
> **Status:** ✅ Implementation Ready
> **Updated:** October 13, 2025

---

## 🎯 Quick Implementation Reference

### **Step 1: Understanding the System**

- **Global Hamburger Menu**: Fixed position, universal navigation between pages
- **Page Sectional Navigation**: Contextual navigation for page sections and related content

### **Step 2: Implementation Checklist**

- [ ] Global hamburger menu is imported in `layout.tsx`
- [ ] Page navigation is added after hero section on each page
- [ ] Navigation config exists for each page in `navigationConfigs.ts`
- [ ] Icons are properly imported from Material Design

---

## 🔧 Component Implementation

### **Global Hamburger Menu Implementation**

**File**: `/src/components/layout/Navigation.tsx`

```typescript
// Already implemented - no changes needed
// Automatically appears on all pages via layout.tsx
import { Navigation } from "../components/layout";

// Usage in layout.tsx:
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

### **Page Sectional Navigation Implementation**

**File**: `/src/components/navigation/PageNavigation.tsx`

```typescript
"use client";
import React from "react";
import Link from "next/link";
import { MaterialIcon } from "../icons/MaterialIcon";

interface NavigationItem {
  href: string;
  label: string;
  icon: string;
}

interface PageNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function PageNavigation({ items, className = "" }: PageNavigationProps) {
  return (
    <nav className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
      border-t-4 border-brand-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-4">
          <div className="flex space-x-1 overflow-x-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center
                  hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20
                  px-4 py-4 min-w-[80px] transition-colors duration-200
                  rounded-lg"
              >
                <MaterialIcon
                  icon={item.icon}
                  size="md"
                  className="mb-1 text-gray-600 dark:text-gray-400
                    group-hover:text-brand-primary transition-colors
                    duration-200"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300
                  group-hover:text-brand-primary font-medium transition-colors
                  duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

---

## ⚙️ Configuration Management

### **Navigation Configurations File**

**File**: `/src/components/navigation/navigationConfigs.ts`

```typescript
// Page-specific navigation configurations
export const navigationConfigs = {
  // Home page navigation
  home: [
    { href: "/services#modularization", label: "Modularization", icon: "precision_manufacturing" },
    { href: "/estimator", label: "AI Estimator", icon: "calculate" },
    { href: "/government", label: "Government", icon: "account_balance" },
    { href: "/services#procurement-vendor-management", label: "Procurement", icon: "inventory" },
    { href: "/services#constructability-budget-control", label: "Constructability",
      icon: "engineering" },
    { href: "/booking", label: "Start Partnership", icon: "handshake" },
    { href: "/contact", label: "Contact", icon: "contact_phone" }
  ],

  // Add more page configurations...
  services: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about#partnership-philosophy", label: "Our Approach", icon: "handshake" },
    { href: "/estimator", label: "Get Estimate", icon: "calculate" },
    { href: "/government", label: "Government", icon: "account_balance" },
    { href: "/trade-partners", label: "Partners", icon: "group" },
    { href: "/contact", label: "Start Project", icon: "contact_phone" }
  ]
};

export type PageType = keyof typeof navigationConfigs;
```

### **Adding New Page Navigation**

1. **Add configuration to `navigationConfigs.ts`:**

```typescript
export const navigationConfigs = {
  // ... existing configs

  newPage: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/newpage#section1", label: "Section 1", icon: "section_icon" },
    { href: "/newpage#section2", label: "Section 2", icon: "another_icon" },
    { href: "/related-page", label: "Related", icon: "related_icon" },
    { href: "/contact", label: "Contact", icon: "contact_phone" }
  ]
};
```

1. **Import and use in page component:**

```typescript
import { PageNavigation } from "../../components/navigation/PageNavigation";
import { navigationConfigs } from "../../components/navigation/navigationConfigs";

export default function NewPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero content */}
      </section>

      {/* Page-Specific Navigation */}
      <PageNavigation items={navigationConfigs.newPage} />

      {/* Page Content */}
      <main>
        {/* Page sections */}
      </main>
    </div>
  );
}
```

---

## 🎨 Styling Guidelines

### **Global Hamburger Menu Styling**

```css
/* Fixed positioning and z-index management */
.hamburger-menu {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
}

/* Backdrop overlay styling */
.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 40;
}

/* Menu container styling */
.menu-container {
  background: linear-gradient(to bottom right, var(--bg-primary), var(--bg-secondary));
  backdrop-filter: blur(16px);
}
```

### **Page Navigation Styling**

```css
/* Navigation bar styling */
.page-navigation {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-top: 4px solid var(--brand-primary);
}

/* Navigation items */
.nav-item {
  min-width: 80px;
  transition: all 200ms ease;
}

.nav-item:hover {
  background: rgba(var(--brand-primary-rgb), 0.1);
  color: var(--brand-primary);
}
```

---

## 📱 Responsive Implementation

### **Mobile-First Approach**

```typescript
// Mobile navigation considerations
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Adjust navigation based on screen size
<PageNavigation
  items={navigationConfigs.page}
  className={`${isMobile ? 'px-2' : 'px-4'}`}
/>
```

### **Responsive Breakpoints**

```css
/* Mobile (≤767px) */
@media (max-width: 767px) {
  .page-navigation {
    padding: 0.5rem;
  }

  .nav-item {
    min-width: 70px;
    padding: 0.75rem 0.5rem;
  }
}

/* Tablet (768px-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .page-navigation {
    padding: 1rem;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .page-navigation {
    padding: 1rem 2rem;
  }
}
```

---

## 🔍 Testing Implementation

### **Unit Tests**

```typescript
// __tests__/Navigation.test.tsx
import { render, screen } from '@testing-library/react';
import { Navigation } from '../src/components/layout/Navigation';

describe('Navigation Component', () => {
  it('renders hamburger menu button', () => {
    render(<Navigation />);
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it('opens menu when clicked', () => {
    render(<Navigation />);
    const button = screen.getByLabelText(/open menu/i);
    fireEvent.click(button);
    expect(screen.getByRole('navigation')).toBeVisible();
  });
});
```

```typescript
// __tests__/PageNavigation.test.tsx
import { render, screen } from '@testing-library/react';
import { PageNavigation } from '../src/components/navigation/PageNavigation';

const mockItems = [
  { href: '/section1', label: 'Section 1', icon: 'home' },
  { href: '/section2', label: 'Section 2', icon: 'info' }
];

describe('PageNavigation Component', () => {
  it('renders all navigation items', () => {
    render(<PageNavigation items={mockItems} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });
});
```

### **E2E Tests**

```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation System', () => {
  it('should navigate between pages using hamburger menu', () => {
    cy.visit('/');
    cy.get('[aria-label="Open menu"]').click();
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
  });

  it('should navigate to page sections using page navigation', () => {
    cy.visit('/services');
    cy.get('a[href="/services#core-services"]').click();
    cy.url().should('include', '#core-services');
  });
});
```

---

## 🚨 Common Issues & Solutions

### **Issue: Navigation Not Appearing**

```typescript
// Problem: Forgot to import or add PageNavigation
// Solution: Ensure proper import and usage

import { PageNavigation } from "../../components/navigation/PageNavigation";
import { navigationConfigs } from "../../components/navigation/navigationConfigs";

// Add after hero section
<PageNavigation items={navigationConfigs.yourPage} />
```

### **Issue: Icons Not Displaying**

```typescript
// Problem: Incorrect icon names or missing MaterialIcon import
// Solution: Use valid Material Design icon names

// Check available icons at: https://fonts.google.com/icons
{ href: "/section", label: "Section", icon: "home" } // ✅ Valid
{ href: "/section", label: "Section", icon: "invalid_icon" } // ❌ Invalid
```

### **Issue: Responsive Layout Breaking**

```css
/* Problem: Fixed widths causing overflow
   Solution: Use flexible layouts */

.page-navigation {
  overflow-x: auto; /* Allow horizontal scrolling on mobile */
}

.nav-item {
  min-width: 80px; /* Minimum width for touch targets */
  flex-shrink: 0; /* Prevent items from shrinking */
}
```

### **Issue: Z-Index Conflicts**

```css
/* Problem: Navigation hidden behind other elements
   Solution: Proper z-index management */

.hamburger-menu { z-index: 50; }
.menu-backdrop { z-index: 40; }
.page-navigation { z-index: 30; }
.page-content { z-index: 10; }
```

---

## 🔧 Development Workflow

### **Step-by-Step Implementation**

1. **Plan Navigation Structure**
   - Identify page sections needing navigation
   - Determine related pages to include
   - Choose appropriate Material Design icons

2. **Update Configuration**
   - Add page config to `navigationConfigs.ts`
   - Test navigation items work correctly
   - Verify responsive behavior

3. **Implement in Page**
   - Import PageNavigation component
   - Add after hero section
   - Test on multiple devices

4. **Quality Assurance**
   - Test all navigation links
   - Verify responsive design
   - Check accessibility compliance
   - Validate performance impact

### **Performance Considerations**

```typescript
// Lazy load navigation configs
const navigationConfigs = lazy(() => import('./navigationConfigs'));

// Memoize navigation items
const memoizedItems = useMemo(() => navigationConfigs.page, []);

// Optimize icon loading
const MaterialIcon = lazy(() => import('../icons/MaterialIcon'));
```

---

## 📋 Deployment Checklist

### **Pre-Deployment Validation**

- [ ] All navigation configs are properly defined
- [ ] Icons are valid Material Design names
- [ ] Links work correctly (internal and hash links)
- [ ] Responsive design works on all breakpoints
- [ ] Accessibility standards met (ARIA labels, keyboard navigation)
- [ ] Performance impact is minimal
- [ ] No console errors or warnings
- [ ] Cross-browser compatibility verified

### **Post-Deployment Monitoring**

- [ ] Analytics tracking for navigation usage
- [ ] User behavior flow analysis
- [ ] Mobile usability testing
- [ ] Performance metrics monitoring
- [ ] Accessibility audit compliance

---

## 📚 References

### **Related Documentation**

- **[Navigation Architecture](./NAVIGATION_ARCHITECTURE.md)** - System overview and design principles
- **[Material Design Icons](https://fonts.google.com/icons)** - Icon reference
- **[Component Documentation](../../src/components/README.md)** - Component API reference
- **[Design System](./DESIGN_SYSTEM.md)** - Visual design standards

### **Code References**

- **Navigation Component**: `/src/components/layout/Navigation.tsx`
- **PageNavigation Component**: `/src/components/navigation/PageNavigation.tsx`
- **Navigation Configs**: `/src/components/navigation/navigationConfigs.ts`
- **Material Icons**: `/src/components/icons/MaterialIcon.tsx`

---

**Document Authority**: MH Construction Development Team
**Last Review**: October 13, 2025
**Next Review**: January 2026 (Quarterly)
