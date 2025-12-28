# AlternatingShowcase Component Pattern

## Overview

The `AlternatingShowcase` component provides a reusable alternating image/text layout pattern originally developed for the homepage Core Values section. This format creates visual interest through alternating left/right layouts with professional image/content pairs.

## Component Location

**File:** `/src/components/ui/AlternatingShowcase.tsx`

## Origin

Extracted from the **homepage CoreValuesSection** (`/src/components/home/CoreValuesSection.tsx`), this pattern represents the unique alternating image/text layout that makes core values visually engaging and professional.

## Purpose

- Visual storytelling with high-quality images
- Alternating left/right layouts for visual rhythm and interest
- Professional showcase format with consistent branding
- Responsive design that adapts from mobile stacking to desktop side-by-side

## Key Features

- **Decorative Header:** Icon with decorative lines, two-line gradient heading, rich description
- **Alternating Layout:** Even-indexed items have image on left, odd-indexed on right
- **Image Overlays:** Gradient overlays ensure icon badges remain visible
- **Icon Badges:** Colored icon badges positioned on images
- **Stats Display:** Optional key metrics with analytics icon
- **Hover Effects:** Smooth scale transitions on images
- **Responsive:** Mobile stacks vertically, desktop shows side-by-side

## Component Interface

```typescript
interface AlternatingShowcaseItem {
  id: string; // Unique identifier
  title: string; // Main title
  icon: string; // Material icon name
  tagline: string; // Subtitle/tagline
  description: string; // Main description text
  image: string; // Path to showcase image
  iconBg: string; // Icon background color class
  stats?: string; // Optional stat or metric
  statsLabel?: string; // Optional stat label (defaults to "Key Metric")
}

interface AlternatingShowcaseProps {
  items: AlternatingShowcaseItem[]; // Array of items to display
  title: string; // Section heading (line 2)
  subtitle: string; // Section subtitle (line 1)
  icon: string; // Main section icon
  description: ReactNode; // Description with optional JSX
  sectionId?: string; // Optional section ID for anchors
  iconGradient?: string; // Optional icon background gradient
}
```

## Current Usage

### ✅ Homepage Core Values

**Location:** `/src/components/home/CoreValuesSection.tsx` (Original implementation)

- **Items:** 4 core values (Honesty, Integrity, Professionalism, Thoroughness)
- **Images:** Professional photography at `/images/values/`
- **Purpose:** Establishes foundational values with visual reinforcement
- **Special Note:** This section remains unique with its own data—pattern is mimicked, not copied

### ✅ About Page Safety Section

**Location:** `/src/components/about/SafetySection.tsx` (New implementation using AlternatingShowcase)

- **Items:** 4 safety features (Zero-Incident Culture, Award-Winning EMR, Regulatory Excellence, Quality Control)
- **Images:** Safety-focused photography at `/images/safety/`
- **Purpose:** Demonstrates safety commitment with visual evidence
- **Benefits:**
  - Replaces static card grid with engaging visual format
  - Maintains professional appearance consistent with homepage
  - Allows detailed descriptions with supporting imagery

## Usage Guidelines

### When to Use AlternatingShowcase

✅ **Perfect for:**

- Showcasing 3-6 key concepts with visual support
- Process steps that benefit from imagery
- Feature highlights with detailed descriptions
- Service capabilities with real-world examples
- Methodology explanations with visual context
- Any content where images add significant value

❌ **Not ideal for:**

- Simple lists or bullet points
- Content without appropriate imagery
- Sections with more than 6-7 items (becomes too long)
- Technical specifications better served by tables
- Content where text is primary and images are decorative only

### Implementation Steps

1. **Prepare Your Images**
   - Size: Minimum 800px wide, ideally 1200px+ for quality
   - Aspect ratio: 16:9 or 4:3 works well
   - Format: WebP preferred for performance
   - Location: Organize in `/public/images/[category]/`

2. **Define Your Items**

```typescript
const showcaseItems: AlternatingShowcaseItem[] = [
  {
    id: "feature-one",
    title: "Feature Title",
    icon: "engineering",
    tagline: "Short Compelling Tagline",
    description:
      "Detailed description explaining the feature, benefit, or concept. Should be 2-4 sentences providing meaningful context.",
    image: "/images/category/feature-one.webp",
    iconBg: "bg-brand-primary",
    stats: "100% Success Rate",
    statsLabel: "Proven Results",
  },
  // ... more items
];
```

1. **Implement the Component**

```typescript
import { AlternatingShowcase } from "@/components/ui";

export function MySection() {
  return (
    <AlternatingShowcase
      items={showcaseItems}
      title="Main Headline"
      subtitle="Section Category"
      icon="verified"
      description={
        <>
          Your section description with{" "}
          <span className="font-bold text-brand-primary">
            highlighted keywords
          </span>{" "}
          for emphasis.
        </>
      }
      sectionId="my-section"
    />
  );
}
```

## Design Principles

### Visual Rhythm

The alternating layout creates natural visual rhythm:

- **Even items (0, 2, 4):** Image left, content right
- **Odd items (1, 3, 5):** Content left, image right

This prevents monotony and keeps users engaged as they scroll.

### Icon Color Strategy

Use different icon background colors to create visual distinction:

```typescript
iconBg: "bg-brand-primary"; // Primary brand color
iconBg: "bg-brand-secondary"; // Secondary/bronze
iconBg: "bg-green-700"; // Success/compliance
iconBg: "bg-blue-700"; // Technical/quality
iconBg: "bg-purple-700"; // Innovation
```

### Content Length

- **Title:** 2-5 words (e.g., "Zero-Incident Culture")
- **Tagline:** 3-5 words (e.g., "Safety First, Always")
- **Description:** 2-4 sentences (80-150 words ideal)
- **Stats:** Short metric (e.g., ".64 EMR Rating")

## Responsive Behavior

### Mobile (< 1024px)

- Vertical stacking
- Image displayed above content
- Full-width layout
- Image height: 16-20rem

### Desktop (>= 1024px)

- Side-by-side 2-column grid
- Alternating image/content positioning
- Equal column widths (50/50)
- Image min-height: 500px

## Customization Options

### Custom Icon Gradient

```typescript
iconGradient = "from-blue-600 via-blue-700 to-blue-800";
```

### Optional Stats

Omit `stats` property to hide the metrics section:

```typescript
{
  id: "no-stats-example",
  // ... other properties
  // stats: undefined (omitted)
}
```

### Custom Stats Label

```typescript
stats: "15+ Years",
statsLabel: "Industry Experience"
```

## Performance Considerations

- **Image Optimization:** Use Next.js Image component (automatic in AlternatingShowcase)
- **Lazy Loading:** Images load as user scrolls (Next.js default)
- **Responsive Images:** `sizes="(max-width: 1024px) 100vw, 50vw"` ensures appropriate image size
- **WebP Format:** Reduces file size by 25-35% compared to JPEG

## Accessibility Features

- Semantic HTML structure
- Alt text from `title` and `tagline`
- Proper heading hierarchy (h2 for section, h3 for items)
- Keyboard navigation support
- Screen reader friendly

## Examples & Use Cases

### Process Steps

Show construction phases with before/after images or site progress photos.

### Service Features

Highlight service capabilities with relevant project imagery.

### Team Specializations

Display expertise areas with team members in action.

### Project Types

Showcase different project categories with completed work examples.

### Technology Stack

Explain tools and systems with interface screenshots or diagrams.

## Migration from Other Patterns

### From Static Cards

Replace grid layouts with AlternatingShowcase when:

- You have quality images for each item
- Descriptions are detailed (more than one sentence)
- Visual storytelling would enhance understanding

### From Simple Lists

Upgrade list-based content to AlternatingShowcase when:

- Adding visual context significantly improves comprehension
- Professional presentation is priority
- You want to increase engagement and scroll depth

## Comparison with Other Patterns

| Pattern                 | Best For                    | Image Focus | Layout      |
| ----------------------- | --------------------------- | ----------- | ----------- |
| **AlternatingShowcase** | 3-6 key features            | High        | Alternating |
| **ContentCard Grid**    | 6+ items, consistent format | Medium      | Grid        |
| **Timeline**            | Chronological progression   | Low         | Vertical    |
| **ValuesShowcase**      | Interactive exploration     | Low         | Modal-based |

## Related Components

- **ContentCard:** For grid-based layouts with smaller content blocks
- **Timeline:** For chronological or sequential content
- **ValuesShowcase:** For interactive modal-based exploration (About page values)
- **CoreValuesSection:** Original implementation (homepage)

## Best Practices

1. **Image Quality:** Use professional, high-resolution images
2. **Consistent Style:** Keep all images in similar style/tone
3. **Alt Text:** Descriptive alt text combines title and tagline
4. **Icon Selection:** Choose icons that clearly represent concepts
5. **Description Length:** Keep descriptions scannable (2-4 sentences)
6. **Stats Relevance:** Only include stats that add meaningful context

## Future Enhancements

Potential improvements to consider:

- [ ] Animation on scroll (fade-in/slide-in)
- [ ] Video support as alternative to images
- [ ] Optional CTA buttons on each item
- [ ] Gallery lightbox for image expansion
- [ ] Mobile swipe gestures for navigation
- [ ] Integration with CMS for dynamic content

## Troubleshooting

### Images Not Displaying

- Verify image paths are correct and images exist in `/public/`
- Check WebP format support (fallback to JPEG if needed)
- Ensure Next.js Image optimization is working

### Layout Breaking

- Verify all items have required properties
- Check icon names are valid Material Icons
- Ensure iconBg classes are valid Tailwind classes

### Performance Issues

- Optimize images (compress, convert to WebP)
- Limit to 6-7 items maximum
- Consider lazy loading for below-fold sections

---

**Last Updated:** December 2024  
**Component Version:** 1.0  
**Original Pattern:** Homepage Core Values Section  
**Mimicked By:** About Page Safety Section
