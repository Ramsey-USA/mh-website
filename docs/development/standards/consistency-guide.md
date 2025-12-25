# MH Construction Consistency Guide

## Comprehensive Standards for Pages, Sections, Components, and Mobile

**Category:** Development - Implementation Standards  
**Last Updated:** December 13, 2025 | **Version:** 2.0.0 | **Status:** Official Standard

**⭐ UPDATE (Dec 2025)**: Complete shift to veteran/honest messaging. All content now emphasizes
veteran-owned excellence, honest communication, transparent pricing, and proven craftsmanship.

## 🧭 Quick Navigation

- [🎯 Development Standards](./development-standards.md) - Core standards
- [🎨 Branding](../../branding/) - Brand guidelines
- [🏠 Documentation Home](../../START-HERE.md) - Central documentation hub

---

## 📋 Table of Contents

- [Brand Foundation](#brand-foundation)
- [Page-Specific Messaging Strategy](#page-specific-messaging-strategy)
- [Hero Section Tagline Strategy](#hero-section-tagline-strategy)
- [Typography System](#typography-system)
- [Page Layout Standards](#page-layout-standards)
- [Section Standards](#section-standards)
- [Component Standards](#component-standards)
- [Mobile Consistency](#mobile-consistency)
- [Implementation Checklist](#implementation-checklist)

---

## 🎯 Page-Specific Messaging Strategy

### November 15, 2025 Update

**⭐ CRITICAL FOR ALL CONTENT DEVELOPMENT:** All pages must follow the 7-group messaging strategy
documented in **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)**.

### Why This Matters

Each page has a specific role in the user journey and must use appropriate voice, tone, and keyword
prioritization:

1. **Group 1: Traditional Business Foundation** (Homepage, Contact, Booking)
   - Voice: Warm, trustworthy, approachable
   - Priority: Trust → Values → People → Technology
   - Focus: Relationship-building and partnership invitation

2. **Group 2: Heritage & Track Record** (About, Projects)
   - Voice: Proud, accomplished, proven
   - Priority: Experience → History → Results → Relationships
   - Focus: Credibility through demonstrated success

3. **Group 3: Future Vision & Expertise** (Team, Services)
   - Voice: Professional, forward-looking, comprehensive
   - Priority: Expertise → Capabilities → Vision → Tools
   - Focus: What we offer and how we deliver

4. **Group 4: Professional Patriotic** (Government, Veterans)
   - Voice: Respectful, service-focused, capable
   - Priority: Service → Standards → Capabilities → Partnership
   - Focus: Alignment with mission and values

5. **Group 5: Recruitment & Opportunity** (Careers)
   - Voice: Welcoming, growth-focused, team-oriented
   - Priority: Culture → Opportunity → Team → Benefits
   - Focus: Career development and belonging

6. **Group 6: Resources & Help** (FAQ, Support, Resources)
   - Voice: Helpful, accessible, professional
   - Priority: Service → Support → Communication → Trust
   - Focus: Direct human assistance, no automation emphasis

7. **Group 7: Partnership & Urgency** (Trade Partners, Urgent Projects)
   - Voice: Decisive, responsive, solution-oriented
   - Priority: Speed → Solution → Partnership → Action
   - Focus: Immediate response and collaboration

### Implementation Requirements

**Before creating or editing any page:**

1. Identify which messaging group the page belongs to
2. Review the specific voice, tone, and keyword priorities
3. Align hero section, page description, and CTAs with group strategy
4. Ensure SEO metadata matches keyword prioritization
5. Verify messaging consistency with group requirements

**SEO Impact:**

- Homepage follows trust-first approach (see
  [Homepage Optimization](../branding/strategy/homepage-optimization-complete.md))
- All 15 pages optimized (see
  [SEO Optimization Complete](../branding/strategy/seo-optimization.md))
- Keyword ordering varies by messaging group
- Technology mentions positioned strategically by group

---

## 🎯 Hero Section Tagline Strategy

### November 11, 2025 Update

**NEW STANDARD:** Each page's hero section features a **unique, page-specific tagline**
instead of repeating "THE ROI IS THE RELATIONSHIP" across all pages.

### Why This Change?

- **Reduces tagline fatigue** - Visitors see the same phrase less often
- **Increases message retention** - Variety makes messages more memorable
- **Reinforces page purpose** - Each tagline directly relates to page content
- **Maintains brand consistency** - All taglines align with core values

### Creating Effective Hero Taglines

**Guidelines:**

1. **Length**: Keep to 3-7 words for maximum impact
2. **Relevance**: Connect directly to the page's primary purpose
3. **Brand alignment**: Reflect MH Construction's values (integrity, partnership, quality)
4. **Clarity**: Immediately understandable without additional context
5. **Uniqueness**: Different from other pages' taglines

**Examples of Strong Taglines:**

- "Where Vision Meets Execution" (Homepage - partnership + delivery)
- "Excellence Through Experience" (About - veteran values + quality)
- "Experience You Can Trust" (Team - expertise focus)
- "Mission-Ready, Compliance-Driven" (Government - federal expertise)

**Avoid:**

- Generic phrases that could apply to any construction company
- Overusing "THE ROI IS THE RELATIONSHIP" in hero sections
- Taglines longer than one sentence
- Industry jargon without context

### Where "THE ROI IS THE RELATIONSHIP" Still Belongs

This phrase remains powerful and should be used in:

- **Body content** - Within page descriptions and value propositions
- **Testimonials** - When explaining our relationship-first approach
- **Team bios** - Describing company culture and philosophy
- **About sections** - Explaining our business model
- **Partnership pages** - Emphasizing relationship focus

Just not repeated in every single hero section.

### Implementation Checklist

When creating a new page hero section:

- [ ] Create a unique tagline specific to this page's purpose
- [ ] Verify tagline is 3-7 words
- [ ] Ensure tagline aligns with brand values
- [ ] Check that no other page uses the same tagline
- [ ] Test tagline clarity with team members
- [ ] Document the tagline in this guide's reference table

### Current Hero Taglines Reference

| Page           | Unique Hero Tagline                                                        | Focus Area               |
| -------------- | -------------------------------------------------------------------------- | ------------------------ |
| Homepage       | "Veteran-Owned Excellence \| Honest Communication \| Proven Craftsmanship" | Veteran values emphasis  |
| About          | "Excellence Through Experience"                                            | Veteran values + quality |
| Services       | "Your project deserves expert oversight"                                   | Service quality          |
| Projects       | "Proven Results, Trusted Partnerships"                                     | Track record             |
| Team           | "Experience You Can Trust"                                                 | Team expertise           |
| Careers        | "Your Future Starts Here"                                                  | Career growth            |
| Booking        | "Start Your Project With Confidence"                                       | Consultation confidence  |
| Urgent         | "When Time Is Critical, We Respond"                                        | Rapid response           |
| Government     | "Mission-Ready, Compliance-Driven"                                         | Federal expertise        |
| Trade Partners | "Building Success Together"                                                | B2B partnership          |
| Veterans       | "Honoring Those Who Served"                                                | Veteran support          |

**NOTE**: Booking, AI Estimator, and 3D Explorer pages have been removed (Dec 2025).
All consultation CTAs now direct to `/contact` for face-to-face consultation.

### 🎯 Direct Consultation Path (Dec 2025)

#### Single User Path: Direct Human Consultation

- **Purpose**: Face-to-face project consultation and assessment
- **Approach**: Honest communication, transparent pricing
- **Availability**: Scheduled consultations with veteran-owned team
- **User Flow**: Contact form → Human response → In-person consultation
- **Color**: Hunter Green (`#386851`)
- **Icons**: `handshake`, `person`, `schedule`
- **CTAs**: "Schedule Consultation", "Discuss Your Project", "Contact Our Team"

### Component Props

---

## 🎨 Brand Foundation

### Core Brand Colors

```css
/* Primary Colors - Use these via Tailwind classes */
--brand-primary: #386851; /* Hunter Green - Main CTAs, headers */
--brand-secondary: #bd9264; /* Leather Tan - Secondary buttons, accents */

/* Extended Palette */
--bronze-300: #cd7f32; /* Veteran badge highlights */
--bronze-400: #b8691c; /* Dark mode veteran badges */
```

### Brand Color Usage Rules

```tsx
// ✅ CORRECT: Use Tailwind classes
className="bg-brand-primary text-brand-secondary border-brand-secondary"
className="text-bronze-300 dark:text-bronze-400"

// ❌ INCORRECT: Never hardcode hex values
style={{backgroundColor: '#386851'}}
className="bg-[#BD9264]"
```

### Icon System

#### ALWAYS use MaterialIcon component - NO emojis in source code

```tsx
// ✅ CORRECT
import { MaterialIcon } from "@/components/icons/MaterialIcon";
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />

// ❌ INCORRECT: Never use emojis
<span>🏗️</span>
```

**Icon Sizes**: `sm`, `md`, `lg`, `xl`, `2xl`

---

## 📝 Typography System

### Two-Tier Pattern: Hero vs Standard Sections

#### 1. Hero Section Typography (Background Images/Videos)

**Used on**: Pages with photo/video backgrounds (Homepage, Careers, Team, Government, Trade Partners)

#### NO veteran badges in hero sections

```tsx
{
  /* Hero Title */
}
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
  <span className="block text-brand-secondary font-black drop-shadow-lg">
    Your Partnership in Construction Excellence
  </span>
</h1>;

{
  /* Hero Tagline */
}
<p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
  "Building projects for the client, NOT the dollar"
</p>;

{
  /* Hero Description */
}
<p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
  Serving the Pacific Northwest with partnership-driven construction management.
</p>;
```

#### 2. Standard Section Headers (Clean Backgrounds)

**Used on**: Services, About, Home, and content sections with solid backgrounds

#### NO section badges - Clean, professional

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
  {/* Subtitle Line */}
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Partnership-Focused
  </span>
  {/* Main Title Line */}
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Construction Management
  </span>
</h2>;

{
  /* Section Description */
}
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
  Planning a new commercial building demands{" "}
  <span className="font-medium text-gray-800 dark:text-gray-200">
    intricate details
  </span>{" "}
  and expert partnership oversight.
</p>;
```

### Typography Scale Reference

| Element                     | Responsive Classes                                                   | Usage                          |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------ |
| **Hero Title**              | `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl` | Hero sections with backgrounds |
| **Section Header Main**     | `text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl`           | Standard section titles        |
| **Section Header Subtitle** | `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`            | Section subtitle line          |
| **Section Description**     | `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl`             | Large descriptive text         |
| **Hero Tagline**            | `text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl`              | Hero taglines                  |
| **Card Title**              | `text-xl xs:text-2xl sm:text-3xl md:text-4xl`                        | Component/card titles          |
| **Card Subtitle**           | `text-lg xs:text-xl sm:text-2xl md:text-3xl`                         | Component/card subtitles       |
| **Body Text**               | `text-base xs:text-lg sm:text-xl md:text-xl`                         | Standard paragraphs            |
| **Small Text**              | `text-sm xs:text-sm sm:text-base`                                    | Helper text, labels            |

### Typography Rules

1. **Always use responsive scaling** - Include all breakpoints: `xs:`, `sm:`, `md:`, `lg:`, `xl:`
2. **Two-line headers** - Subtitle + main title pattern for consistency
3. **NO badges on sections** - Only modals use veteran badges
4. **Gradient text** - Use `text-brand-primary` on clean backgrounds
5. **Drop shadows** - Use `drop-shadow-lg` on light text over images
6. **Font weights** - Headers: `font-black`, Subtitles: `font-semibold`, Body: `font-light`

---

## 🏗️ Page Layout Standards

### Page Structure Template

```tsx
export default function PageName() {
  return (
    <div className="relative bg-white dark:bg-gray-900 w-full min-h-screen overflow-x-hidden">
      {/* Hero Section - REQUIRED with PageNavigation */}
      <PageHero />

      {/* Content Sections - Each with unique id for navigation */}
      <section
        id="section-name"
        className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40"
      >
        <div className="mx-auto px-4 container">{/* Section content */}</div>
      </section>

      {/* CTA Section - RECOMMENDED */}
      <PageCTA />
    </div>
  );
}
```

**Navigation Pattern (Dec 2025):**

- ✅ **Section-Based Navigation**: All PageNavigation items use `#section-id` anchors
- ✅ **Hero Integration**: PageNavigation placed at bottom of hero section
- ✅ **Hamburger Menu**: Handles cross-page navigation and social media links
- ✅ **Section IDs Required**: Each navigable section must have unique `id` attribute
- ✅ **Mobile Responsive**: Uses dual-label pattern (full/mobile labels)

### Hero Section Patterns

#### Pattern A: Image/Video Background Hero (Bottom-Right Text)

**HOMEPAGE/PRIMARY PAGES**: Text positioned bottom-right to allow photos/videos to be focal point.

```tsx
<section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
  {/* Background Image/Video - Primary Visual */}
  <div className="absolute inset-0">
    <Image src="/images/hero-bg.jpg" fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80" />
  </div>

  {/* Header Text - Bottom Right (Allows visual to dominate) */}
  <div className="relative z-30 mb-20 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
    <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
      <span className="block text-brand-secondary">
        Veteran-Owned Excellence
      </span>
      <span className="block">|</span>
      <span className="block text-white/95">Honest Communication</span>
      <span className="block">|</span>
      <span className="block text-brand-primary">Proven Craftsmanship</span>
    </h1>
  </div>

  {/* Page Navigation - Section Anchors Only */}
  <PageNavigation
    items={navigationConfigs.page}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

**Navigation Config Pattern:**

```typescript
// navigationConfigs.ts
pageName: [
  {
    href: "#section-id", // MUST be section anchor, not cross-page link
    label: "Full Label", // Desktop label
    mobileLabel: "Short", // Mobile label
    icon: "material_icon", // Material icon name
  },
  // More sections...
];
```

#### Pattern B: Gradient Background Hero (Clean, Professional)

```tsx
<section className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-gray-900 py-20 sm:py-24 lg:py-32 text-white">
  <div className="relative mx-auto px-4 container">
    {/* NO BADGES - Professional and clean */}
    <h1
      className="text-center font-bold mb-6 text-brand-secondary"
      style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
    >
      Page Title
    </h1>
    <p
      className="text-center mb-8 font-medium"
      style={{ fontSize: "clamp(1.125rem, 3vw, 2.25rem)" }}
    >
      "Building projects for the client,
      <span className="text-bronze-300">
        <em>NOT</em>
      </span>{" "}
      the dollar"
    </p>
  </div>
</section>
```

---

## 📦 Section Standards

### Standard Section Structure

```tsx
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
  <div className="mx-auto px-4 container">
    <FadeInWhenVisible>
      {/* Section Header - NO BADGES */}
      <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
        <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
          <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
            Subtitle Text
          </span>
          <span className="block text-brand-primary dark:text-brand-primary font-black">
            Main Title
          </span>
        </h2>

        <p className="mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
          Description with{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            emphasis
          </span>
          .
        </p>
      </div>
    </FadeInWhenVisible>

    {/* Section Content */}
    <StaggeredFadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Content cards */}
      </div>
    </StaggeredFadeIn>
  </div>
</section>
```

### Section Background Colors

```tsx
// Alternating pattern for visual hierarchy
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
<section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
```

### Section Spacing

- **Vertical padding**: `py-20 lg:py-32 xl:py-40`
- **Container**: `mx-auto px-4 container`
- **Header margin bottom**: `mb-16 lg:mb-24`
- **Content grid gaps**: `gap-6 lg:gap-8`

---

## 🧩 Component Standards

### Button Component

**Variants**: `primary`, `secondary`, `outline`, `neutral`, `ghost`, `link`

```tsx
import { Button } from "@/components/ui";

{
  /* Primary Action - Hunter Green */
}
<Button variant="primary" size="lg" className="transition-all duration-300">
  <MaterialIcon icon="build" size="lg" className="mr-3" />
  <span className="font-medium">Start Project</span>
</Button>;

{
  /* Secondary Action - Leather Tan */
}
<Button variant="secondary" size="lg" className="transition-all duration-300">
  <MaterialIcon icon="phone" size="lg" className="mr-3" />
  <span className="font-medium">Contact Us</span>
</Button>;

{
  /* Outline - Subtle */
}
<Button variant="outline" size="lg" className="transition-all duration-300">
  <MaterialIcon icon="info" size="lg" className="mr-3" />
  <span className="font-medium">Learn More</span>
</Button>;
```

**Button Sizes**: `sm`, `default`, `lg`, `xl`, `icon`, `icon-sm`, `icon-lg`

**Touch Targets**: All buttons automatically meet 44px minimum height

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-2 duration-300">
  <CardHeader className="text-center">
    <MaterialIcon
      icon="construction"
      className="mb-4 text-brand-primary text-5xl"
    />
    <CardTitle className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl md:text-3xl">
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
      Card description content.
    </p>
  </CardContent>
</Card>;
```

**Card Standards**:

- **Border radius**: `rounded-3xl` (already in base Card)
- **Border**: `border border-gray-200 dark:border-gray-700`
- **Shadow**: `hover:shadow-xl dark:hover:shadow-gray-600/50`
- **Animation**: `hover:-translate-y-2 transition-all duration-300`
- **Accent border**: Add `border-l-4 border-l-brand-primary` for emphasis

### Modal Component

#### ONLY modals use veteran badges

```tsx
import { Modal } from "@/components/ui";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="lg"
  showVeteranBadge={true} // ✅ Modals CAN have badges
>
  {/* Modal content */}
</Modal>;
```

**Modal Standards**:

- **Veteran badge**: Always shown by default (`showVeteranBadge={true}`)
- **Gradient header**: `from-brand-primary via-brand-secondary to-brand-primary`
- **Sizes**: `sm`, `md`, `lg`, `xl`
- **Backdrop**: `bg-black/75 backdrop-blur-sm`

### Form Components

```tsx
import { Input, Textarea } from "@/components/ui/forms/Input";

<Input
  label="Full Name"
  placeholder="John Doe"
  error={errors.name}
  helperText="Required for contact"
  className="w-full"
/>

<Textarea
  label="Project Description"
  placeholder="Tell us about your project..."
  rows={5}
  className="w-full"
/>
```

**Form Standards**:

- **Minimum height**: `min-h-[44px]` for inputs
- **Touch optimization**: `touch-manipulation` class included
- **Focus rings**: Brand color focus rings (`focus:ring-brand-primary`)
- **Dark mode**: Full dark mode support
- **Error states**: Red borders and text for validation errors

---

## 📱 Mobile Consistency

### Mobile-First Breakpoints

```css
/* Tailwind breakpoints - ALWAYS use mobile-first approach */
xs:   475px+    /* Large phones */
sm:   640px+    /* Small tablets+ */
md:   768px+    /* Tablets+ */
lg:   1024px+   /* Laptops+ */
xl:   1280px+   /* Desktops+ */
2xl:  1536px+   /* Large screens+ */
```

### Touch Target Requirements

#### Minimum 44px × 44px for ALL interactive elements

```tsx
// ✅ CORRECT: Buttons with touch targets
<button className="p-2.5 xs:p-3 min-h-[44px] min-w-[44px] touch-manipulation">

// ✅ CORRECT: Links with touch targets
<a className="px-3 xs:px-4 py-2.5 xs:py-3 touch-manipulation">

// ✅ CORRECT: Icon buttons
<button className="p-2 xs:p-2.5 sm:p-3 touch-manipulation">
```

### Mobile Spacing Patterns

```tsx
// Section Padding - Progressive scaling
className = "pt-6 xs:pt-8 sm:pt-10 lg:pt-16 xl:pt-20";
className = "pb-4 xs:pb-5 sm:pb-6 lg:pb-8 xl:pb-10";

// Container Padding
className = "px-3 xs:px-4 sm:px-6 lg:px-8";

// Grid Gaps
className = "gap-2 xs:gap-3 sm:gap-4 lg:gap-6";

// Element Spacing
className = "space-y-2 xs:space-y-3 sm:space-y-4 lg:space-y-6";
```

### Mobile Grid Patterns

```tsx
// Two-column navigation grids
className = "grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3";

// Responsive card grids
className =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6";

// Footer columns
className =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6";
```

### Mobile Performance Classes

#### Required for all interactive elements

```tsx
// Touch manipulation (prevents 300ms tap delay)
className = "touch-manipulation";

// GPU acceleration for animations
className = "transform-gpu will-change-transform";
```

---

## ✅ Implementation Checklist

### Before Creating a New Page

- [ ] Choose hero pattern (image/video background or gradient)
- [ ] NO veteran badges in hero or section headers
- [ ] Use correct typography tier (hero vs standard section)
- [ ] Include all responsive breakpoints in typography
- [ ] Alternating section backgrounds (white/gray-50)
- [ ] Container with proper padding: `mx-auto px-4 container`

### Before Creating a New Section

- [ ] Use standard section structure template
- [ ] Two-line header: subtitle + main title
- [ ] NO section badges (only modals have badges)
- [ ] Responsive typography with all breakpoints
- [ ] FadeInWhenVisible wrapper on header
- [ ] StaggeredFadeIn on grid content
- [ ] Proper vertical padding: `py-20 lg:py-32 xl:py-40`

### Before Creating a New Component

- [ ] Use MaterialIcon instead of emojis
- [ ] Brand colors via Tailwind classes (never hardcoded)
- [ ] Touch targets minimum 44px × 44px
- [ ] Include `touch-manipulation` class
- [ ] Full dark mode support
- [ ] Responsive sizing with all breakpoints
- [ ] Hover states with proper transitions
- [ ] Accessibility attributes (aria-labels, roles)

### Before Creating Forms

- [ ] Input fields: `min-h-[44px]`
- [ ] Include `touch-manipulation` class
- [ ] Brand color focus rings
- [ ] Error state styling
- [ ] Helper text support
- [ ] Dark mode support
- [ ] Proper label associations

### Mobile Optimization Checklist

- [ ] All text readable at 320px width
- [ ] Touch targets meet 44px minimum
- [ ] No horizontal scroll at any breakpoint
- [ ] Proper spacing between interactive elements
- [ ] Images responsive with proper aspect ratios
- [ ] Animations smooth on mobile devices
- [ ] Forms usable with touch keyboards

---

## 🚀 Quick Reference Commands

### Search for Consistency Issues

```bash
# Find emojis in source code
grep -r "[\u{1F600}-\u{1F64F}]" src/

# Find hardcoded colors
grep -r "#386851\|#BD9264" src/

# Find missing touch-manipulation
grep -rL "touch-manipulation" src/components/

# Find missing responsive typography
grep -L "xs:text-" src/app/*/page.tsx
```

### Validation

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build

# Branding compliance check
./scripts/validation/check-branding-compliance.sh
```

---

## � Digital Asset Implementation

### Primary Slogan Styling Rule

**CRITICAL STYLING REQUIREMENT**: When displaying the slogan "Building projects for the client, NOT the dollar",
the word **"NOT"** must ALWAYS be styled in a contrasting color to emphasize the core philosophy.

**Implementation Standards**:

```tsx
// ✅ CORRECT - Light backgrounds
<p>
  Building projects for the client,{" "}
  <span className="font-black italic text-bronze-300">NOT</span> the dollar
</p>

// ✅ CORRECT - Dark backgrounds
<p>
  Building projects for the client,{" "}
  <span className="font-black italic text-brand-secondary">NOT</span> the dollar
</p>

// ❌ INCORRECT - No color distinction
<p>Building projects for the client, <em>NOT</em> the dollar</p>
```

**Color Choices by Context**:

- **Light backgrounds**: Use `text-bronze-600` or `text-brand-secondary`
- **Dark backgrounds**: Use `text-bronze-300` or `text-brand-secondary`
- **Hero sections**: Use `text-bronze-300` for strong contrast
- **Always bold**: Use `font-black` or `font-bold` on "NOT"

**This applies to**:

- All page hero sections
- Footer taglines
- Section descriptions
- Email signatures (use color: #cd7f32)
- Documentation examples
- Marketing materials

### Business Card Standards

**Required Elements**:

- Company name: "MH Construction, Inc."
- Primary tagline: "Building projects for the client, **NOT** the dollar" (NOT in contrasting color)
- Phone: (509) 308-6489
- Address: "3111 N. Capitol Ave., Pasco, WA 99301"
- Email: <office@mhc-gc.com>
- "Licensed in WA, OR, ID | Veteran-Owned & Operated"

**Color Scheme**: Hunter Green (#386851) background with white text

### Email Signature Standards

```html
<div style="font-family: Inter, Arial, sans-serif; color: #212121;">
  <div style="font-weight: 600; color: #386851; margin-bottom: 8px;">
    [Name] | [Title]
  </div>
  <div style="font-weight: 600; margin-bottom: 4px;">MH Construction, Inc.</div>
  <div style="color: #757575; margin-bottom: 8px;">
    Building projects for the client, NOT the dollar
  </div>
  <div style="margin-bottom: 4px;">
    Phone: <a href="tel:+15093086489" style="color: #386851;">(509) 308-6489</a>
  </div>
  <div style="margin-bottom: 4px;">
    Email:
    <a href="mailto:office@mhc-gc.com" style="color: #386851;"
      >office@mhc-gc.com</a
    >
  </div>
  <div style="color: #757575; font-size: 12px;">
    Licensed in WA, OR, ID | Veteran-Owned & Operated
  </div>
</div>
```

### Address Formatting

**Display Format** (business cards, websites, documents):

- "3111 N. Capitol Ave., Pasco, WA 99301" (with periods)

**Map Link Format** (Google Maps integration):

- "3111 N Capitol Ave, Pasco, WA 99301" (no periods)

```html
<!-- Professional Display -->
<p>Visit us at: 3111 N. Capitol Ave., Pasco, WA 99301</p>

<!-- Map Link -->
<a href="https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301">
  Get Directions
</a>
```

---

## 🔍 Quality Control

### Brand Compliance Checklist

#### Visual Elements

- [ ] Hunter Green (#386851) and Leather Tan (#BD9264) used correctly
- [ ] Inter font family implemented
- [ ] Material Icons used exclusively (no emojis)
- [ ] Proper contrast ratios maintained (4.5:1 minimum)
- [ ] Consistent spacing and layout

#### Messaging Compliance

- [ ] Aligned with appropriate messaging group from
      [Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)
- [ ] Voice and tone match page group requirements
- [ ] Keyword prioritization follows group strategy
- [ ] Partnership language emphasized appropriately for group
- [ ] Veteran heritage mentioned appropriately (stronger in Groups 2, 4)
- [ ] Technology positioning matches group strategy (background in Groups 1-5, forefront in Group 6)
- [ ] Client benefits clearly communicated
- [ ] Professional yet approachable tone
- [ ] Contact information standardized

#### Technical Implementation

- [ ] Responsive design functioning (320px to 1920px+)
- [ ] Dark mode support working
- [ ] Accessibility standards met (WCAG AA)
- [ ] Performance benchmarks achieved (<3s load)
- [ ] Cross-browser compatibility verified

### Review Process

**Pre-Launch Review**:

1. Brand guidelines compliance check
2. Visual consistency audit
3. Typography and color verification
4. Icon usage audit (no emojis)
5. Messaging alignment review
6. Performance testing
7. Accessibility audit
8. Mobile responsiveness check
9. Cross-browser testing
10. SEO optimization verification

**Approval Authority**:

- Marketing Materials: Leadership Team
- Website Content: Marketing and Development Team
- Business Communications: Project Manager and Leadership
- External Materials: Full Leadership Team

### Performance Metrics

**Website Performance Targets**:

- Page Load Speed: <3 seconds
- Mobile Responsiveness: 100% functional
- Accessibility Score: WCAG AA minimum
- Brand Consistency: 95%+ adherence

---

## 📚 Related Documentation

- **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** - ⭐
  **CRITICAL** - 7-group messaging strategy
- **[Section Visual Standards](./guidelines/section-visual-standards.md)** - ⭐ **NEW** -
  Complete section styling guide
- **[Homepage Optimization Guide](../branding/strategy/homepage-optimization-complete.md)** - Trust-first
  optimization approach
- **[SEO Optimization Complete](../branding/strategy/seo-optimization.md)** - Complete
  SEO audit
- **[Design System](../technical/design-system/design-system.md)** - Complete design system
- **[Mobile Optimization Guide](../../technical/design-system/mobile-optimization-guide.md)** - Mobile
  patterns (includes quick reference cheat sheet)
- **[Brand Strategy](../branding/strategy/)** - Brand identity and messaging
- **[Brand Standards](../branding/standards/)** - Visual and typography standards
- **[Component Library](../components/ui/mh-ui-guide.md)** - UI components
- **[Developer Checklist](./reference/developer-checklist.md)** - Pre-commit checks

---

## 🎯 Key Principles

1. **Consistency First** - Use established patterns, don't invent new ones
2. **Mobile-First** - Always include responsive breakpoints
3. **Brand Compliance** - MaterialIcon components, brand colors only
4. **Accessibility** - Touch targets, semantic HTML, ARIA labels
5. **Performance** - Touch manipulation, GPU acceleration
6. **Dark Mode** - Full support across all components
7. **NO Badges on Pages** - Only modals use veteran badges

---

**Remember**: When in doubt, reference existing pages (Home, About, Services) for proven patterns.

**Questions?** Check related documentation or contact the development team.

---

**Version History**:

- **1.0.0** (Nov 6, 2025): Initial comprehensive consistency guide
