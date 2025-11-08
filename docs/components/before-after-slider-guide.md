# Before/After Image Slider - Image Guidelines

## Component Ready - Awaiting Images

The `BeforeAfterSlider` component is production-ready and waiting for project images.

### Current Status

✅ **Component Complete**

- Draggable divider (desktop)
- Touch-friendly swipe (mobile)
- Tap-to-toggle functionality
- Keyboard accessible (arrow keys)
- Before/After labels
- Responsive design

⏳ **Awaiting Images** (Next Week)

- Before/after photo pairs needed
- Professional project photography

### Image Requirements

**Format:**

- **File Type**: JPG or WebP (recommended)
- **Resolution**: Minimum 1920x1080px
- **Aspect Ratio**: 16:9 (default), also supports 4:3, 1:1, 3:2
- **File Size**: < 500KB per image (optimized)

**Content Guidelines:**

- Same angle/perspective for before & after
- Consistent lighting conditions
- Clear view of transformation
- Professional quality photography

**Naming Convention:**

```text
/public/images/projects/[project-name]-before.jpg
/public/images/projects/[project-name]-after.jpg
```

### Usage Example

```tsx
import { BeforeAfterSlider } from "@/components/images";

<BeforeAfterSlider
  beforeImage="/images/projects/commercial-office-before.jpg"
  afterImage="/images/projects/commercial-office-after.jpg"
  title="Commercial Office Renovation"
  description="Complete interior transformation with modern finishes"
  aspectRatio="16/9"
  initialPosition={50}
  showLabels={true}
/>;
```

### Recommended Implementations

**Homepage:**

- 1-2 featured project transformations
- Hero section or after testimonials
- Showcase dramatic results

**Projects Page:**

- Individual project case studies
- Portfolio section highlighting transformations
- Category-specific examples (commercial, residential)

**Services Page:**

- Service-specific examples
- Demonstrate capabilities
- Build confidence in quality

### Props Reference

| Prop              | Type    | Default  | Description                     |
| ----------------- | ------- | -------- | ------------------------------- |
| `beforeImage`     | string  | required | Path to before image            |
| `afterImage`      | string  | required | Path to after image             |
| `beforeAlt`       | string  | "Before" | Alt text for before image       |
| `afterAlt`        | string  | "After"  | Alt text for after image        |
| `title`           | string  | -        | Optional project title          |
| `description`     | string  | -        | Optional description            |
| `initialPosition` | number  | 50       | Initial slider position (0-100) |
| `showLabels`      | boolean | true     | Show BEFORE/AFTER labels        |
| `aspectRatio`     | string  | "16/9"   | Image aspect ratio              |
| `className`       | string  | ""       | Additional CSS classes          |

### Placeholder Images (Temporary)

For development/preview purposes, you can use placeholder images:

```tsx
<BeforeAfterSlider
  beforeImage="https://via.placeholder.com/1920x1080/cccccc/666666?text=Before"
  afterImage="https://via.placeholder.com/1920x1080/4CAF50/ffffff?text=After"
  title="Project Example"
  description="Placeholder for demonstration"
/>
```

**Note**: Replace with real project photos before production deployment.

### Next Steps

1. ⏳ **Week of Nov 11-15**: Gather before/after photo pairs from projects
2. ⏳ **Image Optimization**: Compress and optimize images
3. ⏳ **Upload to /public/images/projects/**
4. ⏳ **Update pages** with BeforeAfterSlider components
5. ⏳ **Test on mobile/desktop** for UX validation

### File Location

Component: `/src/components/images/BeforeAfterSlider.tsx`
Export: `/src/components/images/index.ts`

### Features

- ✅ **Desktop**: Click and drag divider
- ✅ **Mobile**: Swipe or tap to move slider
- ✅ **Keyboard**: Arrow keys to adjust (accessibility)
- ✅ **SEO**: Proper alt tags and semantic HTML
- ✅ **Performance**: Next.js Image optimization
- ✅ **Dark Mode**: Fully supported

---

**Status**: Foundation complete, awaiting images (November 2025)
