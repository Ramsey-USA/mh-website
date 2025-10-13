# Navigation Components

This directory contains the navigation components for the MH Construction website's dual navigation system.

## 📁 Structure

```text
src/components/navigation/
├── README.md                  # This file - Navigation components documentation
├── PageNavigation.tsx         # Page-specific sectional navigation component
└── navigationConfigs.ts       # Navigation configurations for all pages
```

## 🧭 Navigation System Overview

MH Construction implements a **dual navigation system**:

1. **Global Hamburger Menu** (`/src/components/layout/Navigation.tsx`)
   - Page-to-page navigation
   - Fixed position, appears on all pages
   - Social media integration

2. **Page-Specific Sectional Navigation** (`PageNavigation.tsx`)
   - Within-page section navigation
   - Contextual to each page's content
   - Placed after hero sections

## 🔧 Components

### PageNavigation.tsx

**Purpose**: Provides contextual navigation for page sections and related content.

**Key Features**:
- Horizontal scrolling navigation bar
- Material Design icons with hover effects
- Responsive design with touch-friendly targets
- Backdrop blur background with brand accent
- Dark/light theme support

**Usage**:

```tsx
import { PageNavigation } from "../../components/navigation/PageNavigation";
import { navigationConfigs } from "../../components/navigation/navigationConfigs";

// Add after hero section
<PageNavigation items={navigationConfigs.yourPage} />
```

### navigationConfigs.ts

**Purpose**: Central configuration file for all page-specific navigation items.

**Structure**:

```typescript
export const navigationConfigs = {
  home: [
    { href: "/services#section", label: "Section", icon: "icon_name" },
    // ... more items
  ],
  about: [
    // ... page-specific items
  ],
  // ... other pages
};
```

**Adding New Page Configuration**:
1. Add new page object to `navigationConfigs`
2. Include relevant section links and related pages
3. Use Material Design icon names
4. Import and use in your page component

## 📱 Responsive Behavior

### Desktop (≥1024px)
- All navigation items visible horizontally
- Larger touch targets and spacing

### Tablet (768px-1023px)
- Horizontal scroll for overflow items
- Medium touch targets

### Mobile (≤767px)
- Horizontal scroll with compact spacing
- Optimized for touch interaction

## 🎨 Styling

The navigation components use:
- **Background**: White/dark with 95% opacity and backdrop blur
- **Border**: 4px brand primary top accent
- **Icons**: Material Design with smooth transitions
- **Hover**: Brand primary color with background tint

## 🔗 Navigation Patterns

### Page Section Links

```typescript
{ href: "/services#modularization", label: "Modularization", icon: "precision_manufacturing" }
```

### Related Page Links

```typescript
{ href: "/estimator", label: "AI Estimator", icon: "calculate" }
```

### Call-to-Action Links

```typescript
{ href: "/contact", label: "Contact", icon: "contact_phone" }
```

## 📋 Implementation Checklist

For each new page requiring navigation:

- [ ] Add configuration to `navigationConfigs.ts`
- [ ] Import `PageNavigation` component in page
- [ ] Import `navigationConfigs` in page
- [ ] Add `<PageNavigation items={navigationConfigs.yourPage} />` after hero
- [ ] Test all navigation links work correctly
- [ ] Verify responsive behavior on all devices
- [ ] Check icon rendering and hover effects

## 🧪 Testing

### Unit Tests
- Component rendering with different item arrays
- Link functionality and accessibility
- Responsive behavior across breakpoints

### E2E Tests
- Navigation between page sections
- Cross-page navigation flows
- Mobile touch interaction

## 📚 Related Documentation

- **[Navigation Architecture](../../docs/technical/NAVIGATION_ARCHITECTURE.md)** - Complete system overview
- **[Navigation Technical Guide](../../docs/technical/NAVIGATION_TECHNICAL_GUIDE.md)** - Implementation guide
- **[Navigation Audit Report](../../docs/technical/NAVIGATION_AUDIT_REPORT.md)** - Current implementation status

## 🔧 Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type checking
npm run type-check
```

### Build Process

```bash
# Production build
npm run build

# Preview build
npm run preview
```

## 🚨 Common Issues

### Icons Not Displaying
- Verify Material Design icon names at [Google Fonts Icons](https://fonts.google.com/icons)
- Check MaterialIcon component import

### Navigation Not Appearing
- Ensure PageNavigation is imported and used
- Verify navigationConfigs has your page configuration
- Check component placement after hero section

### Responsive Issues
- Test horizontal scrolling on mobile
- Verify touch targets are 44px minimum
- Check backdrop blur support in target browsers

---

**Maintained By**: MH Construction Development Team  
**Last Updated**: October 13, 2025
