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
- `VintageBaseballCard.tsx` - Vintage-styled team member card

## Import Usage

### Recommended: Use Index Exports

```tsx
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

## Development Guidelines

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
