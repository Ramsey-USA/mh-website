# MH Website UI Components Organization

Organized component library for the MH Construction website with logical categorization and improved maintainability.

## Directory Structure

### 📁 `/base/` - Foundation UI Components

- `alert.tsx` - Alert notifications and status messages
- `badge.tsx` - Small status indicators and labels
- `button.tsx` - Primary button component with MH branding
- `card.tsx` - Card container with header, content, and footer
- `progress.tsx` - Progress indicators and loading bars
- `tabs.tsx` - Tabbed interface components

### 📁 `/forms/` - Form & Input Components

- `Input.tsx` - Text inputs, textareas, and form controls

### 📁 `/layout/` - Layout & Structure Components

- `LazyWrapper.tsx` - Lazy loading wrapper for performance optimization
- `PageHero.tsx` - Page header with title, subtitle, and navigation
- `SectionHeader.tsx` - Universal section header with authoritative design
- `ThemeToggle.tsx` - Dark/light theme switcher
- `loading-placeholder.tsx` - Loading states and skeleton components

### 📁 `/media/` - Media & Visual Components

- `OptimizedImage.tsx` - Performance-optimized image component with lazy loading

### 📁 `/modals/` - Modal & Overlay Components

- `JobApplicationModal.tsx` - Career application form modal
- `Modal.tsx` - Base modal component for overlays
- `QuickBookingModal.tsx` - Fast consultation booking modal

### 📁 `/specialty/` - Themed & Custom Components

- `ServiceRecordCard.tsx` - Team member display component (military-themed)
- `VintageServiceRecordCard.tsx` - Legacy team member card (deprecated, use TeamProfileSection)

### 📁 `/shared-sections/` - Reusable Page Sections

Located at `/src/components/shared-sections/` (separate from `/ui/`)

- `TestimonialsSection.tsx` - Testimonials carousel section
- `NextStepsSection.tsx` - Three-option CTA cards section
- `AIEstimatorCTA.tsx` - Automated estimator promotional section

**Note**: See [Shared Sections Guide](../shared-sections-guide.md) for detailed documentation on these components.

---

### Recommended: Use Index Exports

````tsx
// ✅ Preferred - Clean imports through index
import { Button, Card, Badge } from "@/components/ui";
import { PageHero, ThemeToggle } from "@/components/ui";
import { Modal, QuickBookingModal } from "@/components/ui";
```text

### Direct Imports (When Needed)

```tsx
// ✅ Direct category imports for specific needs
import { Button } from "@/components/ui/base/button";
import { PageHero } from "@/components/ui/layout/PageHero";
import { Modal } from "@/components/ui/modals/Modal";
```text

## Component Categories Explained

### Base Components

Foundation UI elements following shadcn/ui patterns with MH Construction branding.

- Highly reusable across the application
- Consistent design system implementation
- Primary interaction elements

### Form Components

Input controls and form-related UI elements.

- Accessible form controls
- Validation states and feedback
- MH Construction styling

### Layout Components

Structural and navigational components that shape page layouts.

- Page structure and hero sections
- Theme management
- Performance optimization wrappers

### Media Components

Components for handling images, videos, and visual content.

- Performance-optimized media loading
- Responsive image handling
- Accessibility features

### Modal Components

Overlay interfaces for focused interactions.

- Application-specific modals
- Base modal functionality
- Business process flows

### Specialty Components

Custom components with specific themes or unique functionality.

- Service record card themed team displays
- Brand-specific visual elements
- Unique interaction patterns

### Shared Section Components

Reusable full-page sections for consistent implementation across multiple pages. Located in `/src/components/shared-sections/`.

- Testimonials carousel sections
- CTA card layouts
- Promotional sections with analytics
- See [Shared Sections Guide](../shared-sections-guide.md) for details

---

### Adding New Components

1. **Determine Category**: Choose appropriate directory based on component purpose
2. **Follow Naming**: Use PascalCase for component files (e.g., `NewComponent.tsx`)
3. **Update Index**: Add export to main `index.ts` file
4. **Documentation**: Include component purpose in this guide

### Component Organization Rules

- **Single Responsibility**: Each component serves one clear purpose
- **Category Consistency**: Components in same category share similar patterns
- **Export Management**: All components available through main index
- **Import Hygiene**: Prefer index imports over direct paths

## Benefits

- **83% reduction** in root UI directory clutter (18 files → organized structure)
- **Logical categorization** by component purpose and usage
- **Improved discoverability** of UI components
- **Consistent import patterns** across the codebase
- **Clear separation of concerns** for component types

This organization maintains all existing functionality while providing a cleaner, more
maintainable structure for the UI component library.

---

## Section Header Standard - Military-Construction Pattern

**Status**: ✅ Official Standard (December 2025)
**Replaces**: Old `SectionHeader` component pattern

### Overview

All major sections across the website must use this military-construction header pattern with icon, decorative lines, two-line heading, and colored keyword highlighting. This establishes visual consistency and reinforces our veteran-owned, honest communication brand identity.

### Design Philosophy

- **Military-construction precision**: Icon centered between decorative lines
- **Two-tier hierarchy**: Subtitle (context) + main title (impact)
- **Gradient emphasis**: Brand gradient on main title for visual authority
- **Colored keywords**: Strategic bold colored spans in description for emphasis
- **Professional presence**: Reflects honesty, integrity, and straightforward communication

### Complete Pattern Structure

```tsx
{/* Section Header - Military Construction Standard */}
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
        <MaterialIcon
          icon="shield"
          size="2xl"
          className="text-white drop-shadow-lg"
        />
      </div>
    </div>
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Veteran-Owned Values
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Built on Honesty & Integrity
    </span>
  </h2>

  {/* Description with colored keyword highlighting */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Four foundational values guide every{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      project and partnership
    </span>
    —focused on building for the{" "}
    <span className="font-bold text-gray-900 dark:text-gray-100">
      client, NOT the dollar
    </span>
    .
  </p>
</div>
```

### Icon Variant Colors

Choose icon gradient based on section theme:

**Primary (Green) - Trust, Values, Integrity:**
```tsx
<div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
```

**Secondary (Tan/Bronze) - Partnerships, Excellence:**
```tsx
<div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
```

**Secondary (Bronze/Gold) - Awards, Premium:**
```tsx
<div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
```

### Key Features

✅ **Consistent Visual Language** - Every section follows same pattern
✅ **Descender-Safe Typography** - `py-2 pb-3 leading-normal` prevents clipping
✅ **Responsive Design** - Full mobile-to-desktop scaling
✅ **Dark Mode Support** - Automatic theme adaptation
✅ **Accessibility** - Semantic HTML with proper hierarchy
✅ **Performance** - No external component dependencies

### Implementation Checklist

When creating a new section:

- [ ] Center-aligned header wrapper with `mb-16 sm:mb-20 text-center`
- [ ] Icon with decorative horizontal lines on both sides
- [ ] Glow effect behind icon (`absolute -inset-4` blur layer)
- [ ] Two-line heading: subtitle + gradient main title
- [ ] Gradient must be `from-brand-primary via-brand-secondary to-brand-primary`
- [ ] Main title must have `py-2 pb-3 leading-normal` to prevent clipping
- [ ] Description with strategic colored keyword spans
- [ ] Use `font-bold text-brand-primary` for primary emphasis
- [ ] Use `font-bold text-gray-900 dark:text-gray-100` for strong emphasis

### Technical Notes

- **Clipping Prevention**: `py-2 pb-3 leading-normal` on gradient text prevents descender clipping (g, p, y, q, j)
- **Gradient Text**: Uses `bg-clip-text text-transparent` with proper overflow handling
- **Icon Size**: Always use `size="2xl"` (60px) for section headers
- **Spacing**: Consistent `gap-4` between decorative lines and icon
- **Blur Glow**: `-inset-4` with `blur-2xl` creates professional depth effect

#### Icon Styling Details

The header icon features a distinctive military-inspired design:

**Structure:**
- **Decorative Lines**: Horizontal gradient lines on both sides (0.5px height, 12-16px width)
- **Glow Effect**: Absolute positioned blur layer (`-inset-4`, `blur-2xl`) with gradient from brand colors
- **Icon Container**:
  - Squared corners with `rounded-xl` (not fully rounded - maintains authority)
  - Gradient background: `bg-gradient-to-br` with custom iconGradient prop
  - Responsive padding: `p-4 sm:p-5`
  - Double border: `border-2` with white/gray-700 at 50% opacity
  - Layered shadows: `shadow-2xl` for depth
- **Icon Element**: Material icon at `2xl` size with white color and drop-shadow

**CSS Classes:**
```tsx
// Outer flex container
className="flex items-center justify-center mb-8 gap-4"

// Left decorative line
className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-transparent to-brand-primary rounded-full"

// Glow layer (absolute, behind icon)
className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"

// Icon container
className="relative bg-gradient-to-br [iconGradient] p-4 sm:p-5 rounded-xl shadow-2xl border-2 border-white/50"

// Right decorative line
className="h-0.5 w-12 sm:w-16 bg-gradient-to-l from-transparent to-brand-secondary rounded-full"
```

**Dark Variant Differences:**
- Lines change from brand colors to `white/50`
- Maintains same structure and spacing
- Glow effect adjusted for dark backgrounds

**Design Philosophy:**
- Sharp, squared corners (not circular) for military precision
- Horizontal lines create visual anchoring and balance
- Layered shadows provide depth and authority
- Gradient backgrounds add sophistication without being flashy
- Responsive sizing maintains impact across devices

### Current Usage

- CoreValuesSection
- WhyPartnerSection
- ServicesShowcase
- TestimonialsSection
- CompanyStats
- Website Transparency Section

---
````
