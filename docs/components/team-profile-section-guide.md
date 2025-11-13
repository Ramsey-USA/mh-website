# Team Profile Section Component Guide

## Overview

The `TeamProfileSection` component provides a modern, professional layout for displaying team member
profiles with comprehensive information including skills radar charts, career statistics, and personal
details. This replaces the previous vintage baseball card theme with a more spacious and informative design.

**Component Location:** `src/components/team/TeamProfileSection.tsx`

**Last Updated:** November 13, 2025

---

## Features

### Visual Design

- **Modern Card Layout** - Clean, professional design with brand-aligned borders and shadows
- **Brand Color Integration** - Hunter green (#386851) and leather tan (#BD9264) throughout
- **Bronze Veteran Badges** - Per branding guidelines, veteran badges use bronze color (#CD7F32)
- **Alternating Layout** - Even/odd profiles alternate left/right for visual variety
- **Responsive Grid** - Two-column layout on desktop, single column on mobile
- **Typography Standards** - Bold, black text (font-weight: 700-900) with tight tracking
- **Hover States** - Enhanced border interactions on hover for engagement

### Content Sections

1. **Header with Photo**
   - Profile photo (128x128px) with brand-colored border
   - Name, nickname, role, and department
   - Veteran badge for military service members
   - Quick stats (years of experience, total projects)

2. **Bio and Highlights**
   - Comprehensive biography
   - Career highlights with checkmarks
   - Specialty tags in pill format

3. **Skills Radar Chart**
   - Interactive radar chart showing 6 key skills:
     - Leadership
     - Technical
     - Communication
     - Safety
     - Problem Solving
     - Teamwork
   - Values on 0-100 scale
   - Powered by Recharts library

4. **Performance Stats**
   - 2025 current year statistics
   - Career totals
   - Client satisfaction ratings
   - Safety records

5. **Personal Details**
   - Hometown
   - Education
   - Certifications
   - Awards
   - Years at MH Construction

**Note:** Each team member also has an associated QR code for business card printing (not displayed on website).
See [Team QR Codes Guide](./team-qr-codes-guide.md) for details.

- Years at MH

---

## Data Structure

### VintageTeamMember Interface

```typescript
interface VintageTeamMember {
  // Basic identification
  name: string;
  role: string;
  department: string;
  position: string;
  nickname?: string;

  // Personal details
  yearsWithCompany: number;
  hometown?: string;
  education?: string;
  veteranStatus?: string;

  // Skills for radar chart (0-100 scale)
  skills: {
    leadership: number;
    technical: number;
    communication: number;
    safety: number;
    problemSolving: number;
    teamwork: number;
  };

  // Career stats
  careerStats: {
    totalProjects: number;
    yearsExperience: number;
    specialtyAreas: number;
    mentorships: number;
  };

  // Current year performance
  currentYearStats: {
    projectsCompleted: number;
    clientSatisfaction: number;
    safetyRecord: string;
    teamCollaborations: number;
  };

  // Awards and content
  awards?: string;
  bio: string;
  careerHighlights: string[];
  certifications?: string;
  specialties: string[];
  avatar?: string;
  active: boolean;
  slug: string;
}
```

---

## Usage

### In Team Page

```tsx
import { TeamProfileSection } from "@/components/team/TeamProfileSection";
import { vintageTeamMembers } from "@/lib/data/vintage-team";

// Group by department
const membersByDepartment = groupByDepartment(vintageTeamMembers);

// Render
{
  membersByDepartment[department].map((member, index) => (
    <TeamProfileSection key={member.slug} member={member} index={index} />
  ));
}
```

### Props

| Prop     | Type                | Required | Description                             |
| -------- | ------------------- | -------- | --------------------------------------- |
| `member` | `VintageTeamMember` | Yes      | Team member data object                 |
| `index`  | `number`            | Yes      | Index for alternating layout (even/odd) |

---

## Skills Generation

Skills are automatically generated based on role and experience using the `add-team-skills.js` script:

### Skill Scoring Logic

- **Base Factor:** 60-95 based on years of experience (1.5 points per year)
- **Role Adjustments:**
  - **Leadership Roles:** +5 leadership, +3 communication, +5 safety
  - **Project Managers:** +5 communication, +5 problem solving
  - **Field Operations:** +5 technical, +10 safety
  - **Estimators:** +5 technical, +3 problem solving

### Running the Script

```bash
node scripts/add-team-skills.js
```

This will:

- Read `src/lib/data/team-data.json`
- Generate skill profiles for each team member
- Update the JSON file with new skills data

---

## Radar Chart Configuration

### Recharts Setup

```tsx
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
```

### Chart Styling

- **Width:** 100% (responsive)
- **Height:** 300px
- **Grid Color:** Hunter green (#386851) with 0.3 opacity
- **Fill:** Hunter green with 0.6 opacity
- **Stroke:** Hunter green, 2px width

### Data Format

```typescript
const radarData = [
  { skill: "Leadership", value: 95, fullMark: 100 },
  { skill: "Technical", value: 88, fullMark: 100 },
  // ... more skills
];
```

---

## Layout Patterns

### Alternating Design

```typescript
const isReversed = index % 2 === 1;

<div className={`grid lg:grid-cols-2 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
  <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
    {/* Left content */}
  </div>
  <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
    {/* Right content */}
  </div>
</div>
```

### Benefits

- Visual variety breaks monotony
- Guides eye flow down the page
- Professional magazine-style layout
- Maintains balance and symmetry

---

## Styling Classes

### Brand Guidelines Compliance

The component follows strict MH Construction branding standards:

**Color Palette:**

- Primary: Hunter Green (#386851) for main headings and borders
- Secondary: Leather Tan (#BD9264) for subheadings and accents
- Bronze (#CD7F32): Exclusively for veteran badges per branding policy
- Solid colors only - NO gradient text or bg-clip-text per typography guidelines

**Typography:**

- Inter font family throughout
- Font weights: Black (900) for names, Bold (700) for headings, Semibold (600) for values, Medium (500) for labels
- Tight letter tracking (tracking-tight) for professional appearance

**Borders & Shadows:**

- Professional photo borders: border-4 with shadow-lg on images
- Card section borders: border-2 on stats and personal details
- Hover states: Enhanced brand-primary borders
- Dark mode variants included

### Key Tailwind Classes

```css
/* Main card */
.bg-white .dark:bg-gray-800 .shadow-xl .rounded-2xl .overflow-hidden

/* Photo container - Brand compliant borders */
.relative .w-32 .h-32 .rounded-xl .border-4 .border-brand-primary .shadow-lg

/* Veteran badge - Bronze per branding */
.absolute .-top-2 .-right-2 .bronze-badge .text-white .rounded-full

/* Name typography - Bold black with tight tracking */
.text-2xl .font-black .text-brand-primary .tracking-tight

/* Headings - Brand colors with proper weights */
.text-lg .font-bold .text-brand-primary .tracking-tight

/* Radar chart container */
.bg-gradient-to-br .from-brand-primary/5 .to-brand-secondary/5 .p-6 .rounded-xl

/* Stats cards - With borders */
.bg-brand-primary/5 .border-2 .border-brand-primary/20 .p-4 .rounded-lg

/* Specialty tags */
.px-3 .py-1 .bg-brand-primary/10 .text-brand-primary .rounded-full
```

---

## Accessibility

### Features

- **Semantic HTML:** Proper heading hierarchy (h3, h4, h5)
- **Alt Text:** All images have descriptive alt attributes
- **Color Contrast:** WCAG AA compliant contrast ratios
- **Responsive Design:** Mobile-first approach
- **Icon Labels:** Material Icons paired with text labels

### Keyboard Navigation

- Profile cards are fully navigable via keyboard
- Proper focus states on interactive elements
- Logical tab order maintained

---

## Performance Considerations

### Image Optimization

```tsx
<Image
  src={member.avatar}
  alt={member.name}
  fill
  sizes="128px"
  className="rounded-xl object-cover"
/>
```

- Next.js Image component for automatic optimization
- Explicit sizes for better loading performance
- Object-cover for consistent aspect ratios

### Chart Rendering

- Recharts uses SVG for crisp rendering at any size
- Responsive container prevents layout shift
- Minimal bundle size impact (~36 packages added)

---

## Migration from Baseball Cards

### What Changed

1. **Layout:** From flippable cards to comprehensive sections
2. **Information Density:** More room for content and details
3. **Visual Theme:** Modern professional vs. vintage nostalgic
4. **Interactive Element:** Radar charts replace flip animation
5. **Data Structure:** Added skills object to existing interface

### Backward Compatibility

- Original `VintageTeamMember` interface preserved
- Baseball card component still available if needed
- Team data JSON structure extended, not replaced
- No breaking changes to existing data

### Future Use Cases

The baseball card component (`VintageBaseballCard.tsx`) remains available for:

- Print materials
- Fun team events
- Archive/history section
- Alternative mobile view

---

## Troubleshooting

### Common Issues

**Radar chart not displaying:**

- Check that `skills` object exists in team data
- Verify all 6 skill properties are present
- Ensure values are numbers between 0-100

**Layout breaking on mobile:**

- Check grid classes: `grid-cols-1 lg:grid-cols-2`
- Verify responsive spacing classes
- Test with browser dev tools mobile view

**Missing images:**

- Verify avatar path in team data JSON
- Check image exists in `/public/images/team/`
- Ensure Next.js Image component configured

**Skills not appearing:**

- Run `node scripts/add-team-skills.js`
- Check team-data.json for skills object
- Verify TypeScript interface matches data

---

## Dependencies

### New Dependencies

```json
{
  "recharts": "^2.x.x"
}
```

Install with:

```bash
npm install recharts
```

### Peer Dependencies

- React 18+
- Next.js 15+
- Tailwind CSS 3+

---

## Related Documentation

- [Team Data Structure](../technical/data-structures.md)
- [Component Architecture](./components-index.md)
- [Brand Guidelines](../branding/branding-index.md)
- [Material Icons](../technical/design-system/icons/icons-index.md)

---

## Maintenance

### Adding New Team Members

1. Add data to `src/lib/data/team-data.json`
2. Run `node scripts/add-team-skills.js` to generate skills
3. Add avatar image to `/public/images/team/`
4. Deploy and verify on team page

### Updating Skills

Skills can be manually adjusted in team-data.json or regenerated with the script. Consider these factors:

- Years of experience
- Role responsibilities
- Special certifications
- Recent achievements

### Future Enhancements

Potential improvements:

- [ ] Print-friendly view
- [ ] Export to PDF
- [ ] Compare team members side-by-side
- [ ] Interactive skill filtering
- [ ] Animated chart transitions
- [ ] Team member search/filter

---

**Last Updated:** November 13, 2025  
**Component Version:** 1.0.0  
**Status:** ✅ Production Ready
