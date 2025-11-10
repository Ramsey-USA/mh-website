# CompanyStats Component Usage Guide

**Component:** `CompanyStats`  
**Location:** `/src/components/about/CompanyStats.tsx`  
**Status:** ✅ Reusable & Brand-Compliant  
**Last Updated:** November 10, 2025

---

## Overview

The `CompanyStats` component is a flexible, reusable statistics display section that can be used
on any page to showcase numerical achievements, milestones, or key metrics. It features:

- ✅ **Equal-height cards** with flex layout for consistent sizing
- ✅ **Animated counters** for engaging number displays
- ✅ **Responsive design** with mobile-first breakpoints
- ✅ **Brand-compliant** colors, typography, and spacing
- ✅ **Three gradient variants** for visual variety
- ✅ **Full dark mode** support
- ✅ **Customizable content** via props

---

## Component Props

### `CompanyStatsProps`

```typescript
interface CompanyStatsProps {
  /**
   * Array of statistics to display
   * @default companyStats (from component file)
   */
  stats?: StatItem[];

  /**
   * Section title (main line)
   * @default "Record"
   */
  title?: string;

  /**
   * Section subtitle (appears above title)
   * @default "Our Track"
   */
  subtitle?: string;

  /**
   * Section description
   * @default "Proven results from a veteran-owned team..."
   */
  description?: string;

  /**
   * Icon to display above the title
   * @default "analytics"
   */
  headerIcon?: string;

  /**
   * Background gradient variant
   * @default "primary"
   * - primary: Hunter Green gradient
   * - secondary: Leather Tan gradient
   * - accent: Forest Green gradient
   */
  variant?: "primary" | "secondary" | "accent";

  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
}
```

### `StatItem`

```typescript
interface StatItem {
  /**
   * Material Icon name
   */
  iconName: string;

  /**
   * Numeric value to display
   */
  value: number;

  /**
   * Label text below the value
   */
  label: string;

  /**
   * Text to append after the value (e.g., "+", "%")
   */
  suffix?: string;

  /**
   * Text to prepend before the value (e.g., "$")
   */
  prefix?: string;

  /**
   * Number of decimal places for animated values
   */
  decimals?: number;

  /**
   * Whether to animate the counter
   * @default false
   */
  animated?: boolean;
}
```

---

## Usage Examples

### Basic Usage (Default Configuration)

```tsx
import { CompanyStats } from "@/components/about";

export default function AboutPage() {
  return (
    <div>
      {/* Uses default company stats data */}
      <CompanyStats />
    </div>
  );
}
```

### Custom Stats Data

```tsx
import { CompanyStats, type StatItem } from "@/components/about";

const projectStats: StatItem[] = [
  {
    iconName: "construction",
    value: 500,
    label: "Projects Completed",
    suffix: "+",
    animated: true,
  },
  {
    iconName: "star",
    value: 4.9,
    label: "Average Rating",
    suffix: "/5",
    decimals: 1,
    animated: true,
  },
  {
    iconName: "location_city",
    value: 50,
    label: "Cities Served",
    suffix: "+",
    animated: true,
  },
  {
    iconName: "verified",
    value: 100,
    label: "Client Satisfaction",
    suffix: "%",
    animated: true,
  },
];

export default function ProjectsPage() {
  return (
    <CompanyStats
      stats={projectStats}
      title="Achievements"
      subtitle="Project"
      description="A proven track record of successful construction partnerships
        across the Pacific Northwest"
      headerIcon="workspace_premium"
      variant="secondary"
    />
  );
}
```

### Service-Specific Stats

```tsx
import { CompanyStats, type StatItem } from "@/components/about";

const serviceStats: StatItem[] = [
  {
    iconName: "schedule",
    value: 95,
    label: "On-Time Completion Rate",
    suffix: "%",
    animated: true,
  },
  {
    iconName: "trending_up",
    value: 85,
    label: "Repeat Client Rate",
    suffix: "%",
    animated: true,
  },
  {
    iconName: "shield",
    value: 0.6,
    label: "Industry-Leading Safety Rating",
    suffix: " EMR",
    decimals: 1,
    animated: true,
  },
  {
    iconName: "groups",
    value: 150,
    label: "Years Combined Expertise",
    suffix: "+",
    animated: true,
  },
];

export default function ServicesPage() {
  return (
    <CompanyStats
      stats={serviceStats}
      title="Performance"
      subtitle="Service"
      description="Reliable construction management backed by data and veteran-owned excellence"
      headerIcon="monitoring"
      variant="accent"
    />
  );
}
```

### Minimal Configuration

```tsx
import { CompanyStats } from "@/components/about";

const quickStats = [
  { iconName: "verified", value: 2010, label: "Founded", animated: false },
  {
    iconName: "trending_up",
    value: 100,
    label: "Growth",
    suffix: "%",
    animated: true,
  },
  {
    iconName: "star",
    value: 5,
    label: "Star Rating",
    suffix: "/5",
    animated: false,
  },
];

export default function HomePage() {
  return (
    <CompanyStats
      stats={quickStats}
      title="At a Glance"
      subtitle=""
      description=""
      headerIcon=""
      className="py-12 lg:py-20" // Override default padding
    />
  );
}
```

---

## Visual Variants

### Primary Variant (Default)

- **Colors:** Hunter Green → Forest Green → Dark Hunter Green
- **Best For:** About page, main statistics, company overview

### Secondary Variant

- **Colors:** Leather Tan → Lighter Tan → Hunter Green
- **Best For:** Service pages, project highlights, alternative sections

### Accent Variant

- **Colors:** Forest Green → Hunter Green → Dark Hunter Green
- **Best For:** Achievement sections, safety records, special milestones

---

## Branding Compliance Checklist

✅ **Typography:** All responsive breakpoints included (`xs:` through `lg:`)  
✅ **Colors:** Brand colors only (Hunter Green, Leather Tan, Forest Green)  
✅ **Icons:** Material Icons exclusively (no emojis)  
✅ **Spacing:** Standard section padding (`py-20 lg:py-32 xl:py-40`)  
✅ **Cards:** Equal heights with `h-full flex flex-col`  
✅ **Animations:** Smooth transitions with `duration-300`  
✅ **Touch Targets:** Adequate spacing for mobile interactions  
✅ **Dark Mode:** Full support with proper contrast  
✅ **Accessibility:** Semantic HTML and proper ARIA labels

---

## Common Use Cases

### 1. **About Page** (Current Implementation)

Display company milestones, founding date, team experience, and safety records.

### 2. **Services Page**

Show service-related metrics like completion rates, client satisfaction, and project counts.

### 3. **Projects Portfolio**

Highlight project achievements, total square footage built, cities served.

### 4. **Trade Partners Page**

Display partner network size, years of collaboration, mutual success rates.

### 5. **Safety Page**

Feature safety statistics, EMR rating, incident-free days, certifications.

### 6. **Landing Pages**

Quick stats section to build credibility and showcase key achievements.

---

## Mobile Responsiveness

The component automatically adjusts for all screen sizes:

- **Mobile (< 640px):** 1 card per row, stacked vertically
- **Small Tablets (640px+):** 2 cards per row
- **Large Tablets/Laptops (1024px+):** 4 cards per row

### Typography Scales

- **Title:** `text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- **Subtitle:** `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- **Description:** `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- **Card Values:** `text-4xl sm:text-5xl`

---

## Best Practices

### ✅ Do

- Use 4 stats for optimal layout (fills one row on desktop)
- Include animated counters for impact (`animated: true`)
- Choose Material Icons that relate to the stat meaning
- Write concise, scannable labels (< 40 characters)
- Provide meaningful context in the description

### ❌ Don't

- Use more than 8 stats (causes visual clutter)
- Mix static and animated values randomly
- Use non-Material icons or emojis
- Hardcode color values (use Tailwind brand classes)
- Omit responsive breakpoints in custom styling

---

## Animation Details

The component uses two types of animations:

1. **FadeInWhenVisible:** Entire section fades in when scrolled into view
2. **HoverScale:** Cards scale up slightly on hover (desktop)
3. **AnimatedCounter:** Numbers count up from 0 to target value (2-second duration)

All animations are:

- GPU-accelerated for smooth performance
- Respectful of `prefers-reduced-motion` settings
- Mobile-optimized to avoid jank

---

## Customization Examples

### Adjust Card Grid for Different Counts

```tsx
// 3 cards - use 3-column grid
<CompanyStats
  stats={threeStats}
  className="[&_.grid]:lg:grid-cols-3"
/>

// 6 cards - use 3-column grid with 2 rows
<CompanyStats
  stats={sixStats}
  className="[&_.grid]:lg:grid-cols-3"
/>

// 5 cards - use 5-column grid (advanced)
<CompanyStats
  stats={fiveStats}
  className="[&_.grid]:lg:grid-cols-5"
/>
```

### Override Section Padding

```tsx
// Less padding for homepage hero
<CompanyStats className="py-12 lg:py-16" />

// More padding for standalone section
<CompanyStats className="py-32 lg:py-40 xl:py-48" />
```

### Custom Background

```tsx
// Solid background instead of gradient
<CompanyStats className="!bg-brand-primary" variant="primary" />
```

---

## Related Components

- **AboutValues:** Display company values with detailed descriptions
- **AwardsSection:** Showcase awards and recognitions
- **LeadershipTeam:** Present team member profiles
- **SafetySection:** Highlight safety certifications and policies

---

## Maintenance Notes

### Updating Default Stats

Edit the `companyStats` array in `CompanyStats.tsx`:

```tsx
export const companyStats: StatItem[] = [
  {
    iconName: "calendar_today",
    value: 2010, // Update year as needed
    label: "Company Founded",
    animated: false,
  },
  // ... other stats
];
```

### Adding New Gradient Variants

Add to the `gradientVariants` object:

```tsx
const gradientVariants = {
  primary: "...",
  secondary: "...",
  accent: "...",
  custom: "bg-gradient-to-br from-[color] via-[color] to-[color]",
};
```

---

## Questions or Issues?

- **Branding Questions:** See `/docs/branding/branding-index.md`
- **Component Standards:** See `/docs/branding/standards/component-standards.md`
- **Development Guide:** See `/docs/development/consistency-guide.md`
- **Report Issues:** Contact development team

---

**Last Updated:** November 10, 2025  
**Maintained By:** MH Construction Development Team
