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

- `BaseballCard.tsx` - Team member display component
- `VintageBaseballCard.tsx` - Legacy team member card (deprecated, use TeamProfileSection)

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

- Baseball card themed team displays
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

## SectionHeader Component

**Location**: `/src/components/ui/SectionHeader.tsx`

### Overview

Universal section header component with authoritative, military-inspired design matching veteran/honesty values. Provides consistent branding and professional presence across all major page sections.

### Design Philosophy

- **Military-inspired precision**: Sharp lines, squared corners, bold shadows
- **Authoritative typography**: Bold uppercase subtitles with underline borders
- **Professional presence**: Direct, no-nonsense messaging with clear hierarchy
- **Veteran values**: Reflects honesty, integrity, and straightforward communication

### Props

```typescript
interface SectionHeaderProps {
  icon: string;              // Material icon name
  subtitle: string;          // Uppercase text above title
  title: string;             // Main heading text
  description?: string;      // Optional description text
  children?: React.ReactNode; // Optional additional content
  iconGradient?: string;     // Custom icon gradient colors
  centered?: boolean;        // Center alignment (default: true)
  darkVariant?: boolean;     // Light-on-dark version (default: false)
}
```

### Usage Examples

#### Basic Usage

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";

<SectionHeader
  icon="shield"
  subtitle="Veteran-Owned Values"
  title="Built on Integrity & Honesty"
  description="Four foundational values guide every honest conversation."
/>
```

#### Dark Variant (for dark backgrounds)

```tsx
<SectionHeader
  icon="analytics"
  subtitle="Our Track"
  title="Record"
  description="Proven results from a veteran-owned team."
  darkVariant={true}
/>
```

#### With Custom Content

```tsx
<SectionHeader
  icon="verified"
  subtitle="Veteran-Owned Excellence"
  title="Proven Performance & Integrity"
>
  <div className="inline-block">
    <p className="font-bold text-xl">
      "Building projects for the client, NOT the dollar"
    </p>
  </div>
</SectionHeader>
```

### Key Features

✅ **Consistent Brand Voice** - Authoritative tone across all sections
✅ **Descender-Safe Typography** - Fixed clipping with `paddingBottom: 0.15em`
✅ **Responsive Design** - Adapts from mobile to desktop
✅ **Dark Mode Support** - Automatic dark variant
✅ **Accessibility** - Semantic HTML with proper hierarchy
✅ **Performance** - FadeInWhenVisible animation wrapper

### Technical Notes

- Uses `leading-[1.3]` for optimal line height
- Inline style `paddingBottom: 0.15em` prevents descender clipping (g, p, y, q, j)
- `py-2` on h2 provides breathing room for large text
- Gradient text uses `bg-clip-text` with proper fallbacks
- Icon container features layered shadows for depth

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
