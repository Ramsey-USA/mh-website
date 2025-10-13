#!/bin/bash

# Fix line length issues in navigation documentation
cd /workspaces/mh-website

# Create temp files with corrected content
cat > /tmp/nav_arch_fix.md << 'EOF'
# Navigation Architecture Documentation

## Overview

This document establishes the dual navigation system implemented across
the MH website, designed to provide both global page-to-page navigation
and precise within-page sectional navigation.

## Executive Summary

The MH website implements a dual navigation architecture with distinct
purposes:

### **🍔 Global Hamburger Menu**

#### Page-to-Page Navigation

- **Primary Function**: Main navigation between pages
- **Organization**: Category-based menu structure
- **Scope**: Site-wide navigation system
- **Location**: Header component, accessible from all pages

#### **Category Structure**

```
Main Pages
├── Home
├── Team  
├── Careers
├── Contact

Services
├── Estimator
├── Trade Partners
├── Government

About
├── Company Profile
├── Service Overview
```

#### **Navigation Patterns**

- Hamburger icon in header
- Slide-out menu on mobile
- Dropdown menus on desktop
- Category-based organization
- Clear visual hierarchy

### **Menu Design Philosophy**

- **Simplicity**: Clean, uncluttered design
- **Accessibility**: Full keyboard and screen reader support
- **Consistency**: Same navigation experience across all pages
- **Performance**: Fast loading with smooth animations

### **Menu Technical Features**

- Responsive design (mobile-first approach)
- Touch-friendly interaction
- CSS animations for smooth transitions
- ARIA compliance for accessibility
- Theme-aware styling

---

## 📍 Page-Specific Sectional Navigation

### **Page Navigation Design Philosophy**

- **Contextual Relevance**: Each page has custom navigation tailored
  to its content
- **Quick Access**: Direct links to important page sections
- **Cross-Page Integration**: Strategic links to related pages
- **User Journey**: Guides users through logical next steps

### **Navigation Patterns**

#### **Home Page Navigation**

```typescript
{
  items: [
    { href: "#revolutionary-features", label: "Features", 
      icon: "star" },
    { href: "#feature-ai-estimator", label: "AI Estimator", 
      icon: "psychology" },
    { href: "#core-values", label: "Values", icon: "favorite" },
    { href: "#why-choose-mh", label: "Why MH", icon: "verified" },
    { href: "/team", label: "Meet Team", icon: "people" },
    { href: "/contact", label: "Start Project", 
      icon: "contact_phone" }
  ]
}
```

#### **Other Pages Navigation**

```typescript
// Team Page
{ href: "/careers", label: "Join Us", icon: "work" }
{ href: "/contact", label: "Start Project", icon: "contact_phone" }

// Careers Page  
{ href: "/team", label: "Meet Team", icon: "people" }
{ href: "/contact", label: "Apply Now", icon: "send" }

// Estimator Page
{ href: "/team", label: "Meet Team", icon: "people" }
{ href: "/government", label: "Government", icon: "account_balance" }
{ href: "/trade-partners", label: "Partners", icon: "group" }
{ href: "/contact", label: "Start Project", icon: "contact_phone" }
```

### **Page Navigation Technical Features**

- Responsive horizontal scrolling
- Material Design icons
- Smooth hover effects
- Theme-aware styling
- Backdrop blur background
- Primary brand accent top border

---

## 🎯 Implementation Strategy

### **Global Menu Implementation**

The global hamburger menu is implemented in the main header component
(`src/components/navigation/Navigation.tsx`) and provides consistent
navigation across all pages.

#### **Key Features**

- Always visible in header
- Category-based organization
- Responsive design
- Smooth animations
- Accessibility compliance

### **Page Navigation Implementation**

Page-specific navigation is implemented using the `PageNavigation`
component, configured per page with custom navigation items.

#### **Implementation Pattern**

```typescript
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { navigationConfigs } from '@/lib/navigationConfigs';

// In page component
<PageNavigation items={navigationConfigs.pageName} />
```

#### **Configuration Management**

All navigation configurations are centralized in 
`src/lib/navigationConfigs.ts` for easy maintenance and consistency.

---

## 📋 Quality Assurance Checklist

### **Functional Testing**

- [ ] All navigation links work correctly
- [ ] Page sections scroll to correct positions  
- [ ] External links open appropriately
- [ ] Mobile navigation functions properly
- [ ] Desktop dropdown menus work

### **Design Consistency**

- [ ] Navigation styling matches design system
- [ ] Icons are consistent and appropriate
- [ ] Hover effects work smoothly
- [ ] Active states are clearly indicated
- [ ] Brand colors used consistently

### **Technical Validation**

- [ ] No console errors or warnings
- [ ] Navigation loads quickly
- [ ] Responsive behavior works across all devices
- [ ] Accessibility standards met (ARIA labels, keyboard nav)
- [ ] Performance optimized (code splitting, lazy loading)

### **Content Review**

- [ ] Navigation labels are clear and concise
- [ ] Links are contextually relevant
- [ ] User journey flows logically
- [ ] Call-to-action placement is strategic
- [ ] No broken or invalid links

---

## 🔮 Future Enhancements

### **Planned Improvements**

- Analytics tracking for navigation usage
- A/B testing for optimal navigation placement
- Dynamic navigation based on user behavior
- Enhanced accessibility features
- Progressive Web App navigation support

### **Potential Additions**

- Breadcrumb navigation for deep pages
- Search functionality integration
- Favorite pages/bookmarking
- Context-aware navigation suggestions
- Multi-language navigation support

---

*This document serves as the authoritative guide for navigation
architecture and should be updated whenever navigation changes are made.*
EOF

# Apply the fixed content
mv /tmp/nav_arch_fix.md docs/technical/NAVIGATION_ARCHITECTURE.md

echo "Navigation architecture documentation fixed!"