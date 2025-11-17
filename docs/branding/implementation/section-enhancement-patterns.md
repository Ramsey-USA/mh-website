# Section Enhancement Patterns

**Version:** 2.1.0  
**Created:** November 17, 2025  
**Updated:** November 17, 2025  
**Status:** ✅ Active Standard

> **Purpose:** Standardized visual enhancement patterns for sections across the website, ensuring consistent and polished presentation that aligns with MH branding. Includes architectural patterns for composition, animations, performance, and comprehensive button guidelines.

---

## 🎨 **Core Enhancement Pattern**

All major content sections should follow this consistent visual pattern for a cohesive, professional appearance.

### **Section Structure Template**

```tsx
<section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
  {/* Enhanced Background Effects */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
  <div className="top-20 right-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
  <div
    className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
    style={{ animationDelay: "1s" }}
  ></div>
  <div
    className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
    style={{ animationDelay: "0.5s" }}
  ></div>

  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Section Header */}
    <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
      {/* Icon Container */}
      <div className="flex justify-center items-center mb-6 sm:mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
            <MaterialIcon icon="icon_name" size="2xl" className="text-white" />
          </div>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
        <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
          Section Subtitle
        </span>
        <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
          Section Title
        </span>
      </h2>

      {/* Section Description */}
      <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
        Section description text that explains the value and purpose of this
        section.
      </p>
    </div>

    {/* Section Content */}
    {/* Cards, content, or other elements go here */}
  </div>
</section>
```

---

## 🎯 **Key Design Elements**

### **1. Background Gradients**

**Light Mode:**

```tsx
className = "bg-gradient-to-b from-white via-gray-50 to-white";
```

**Dark Mode:**

```tsx
className = "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";
```

**Radial Gradient Overlays:**

```tsx
{
  /* Top right accent - Primary color */
}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>;

{
  /* Bottom left accent - Secondary color */
}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>;
```

**Animated Blur Orbs:**

```tsx
{
  /* Blur orb - top right */
}
<div className="top-20 right-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>;

{
  /* Blur orb - bottom left with delay */
}
<div
  className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
  style={{ animationDelay: "1s" }}
></div>;

{
  /* Blur orb - center with delay */
}
<div
  className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
  style={{ animationDelay: "0.5s" }}
></div>;
```

**Important Notes:**

- ✅ Use `bg-gradient-to-b` for vertical gradient
- ✅ Radial gradients with dark mode variants (higher opacity in dark mode)
- ✅ Three animated blur orbs with staggered delays
- ✅ Blur orbs use `/10` opacity in light, `/20` in dark mode
- ✅ Ensure readability in both light and dark modes

---

### **2. Icon Headers**

Every major section should have an icon header for visual consistency:

```tsx
<div className="flex justify-center items-center mb-6 sm:mb-8">
  <div className="relative">
    <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
    <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
      <MaterialIcon icon="icon_name" size="2xl" className="text-white" />
    </div>
  </div>
</div>
```

**Icon Size Standards:**

- **Header Icons**: `size="2xl"` - Large icons for section headers
- **Card Icons**: `size="xl"` - Standard size for card content icons
- **Small Icons**: `size="md"` or `size="sm"` - For check marks, indicators, etc.
- **Button Icons**: `size="lg"` or `size="md"` - For CTA button icons

**CRITICAL:** Always use the `size` prop, never use `className="text-5xl"` or similar text size utilities for icons.

**Icon Selection Guide:**

- **Core Values:** `shield`, `verified`, `integrity`, `emoji_events`
- **Services:** `explore`, `construction`, `build`, `handyman`
- **Stats/Numbers:** `analytics`, `insights`, `trending_up`
- **Partnership:** `handshake`, `people`, `groups`
- **Projects:** `apartment`, `home_work`, `domain`
- **Testimonials:** `forum`, `rate_review`, `stars`
- **Technology:** `smart_toy`, `devices`, `engineering`

**Icon Container Variants:**

```tsx
{
  /* Primary gradient */
}
className = "bg-gradient-to-br from-brand-primary to-brand-primary-dark";

{
  /* Secondary gradient */
}
className = "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark";

{
  /* Accent gradient */
}
className = "bg-gradient-to-br from-brand-accent to-bronze-600";
```

**NO Spinning Icons on Headers:**

- ❌ Do NOT add `animate-spin-slow` to header icons
- ✅ Header icons remain static for professionalism
- ✅ Card icons can spin on hover (see Card Patterns below)

---

### **3. Typography Hierarchy**

**h2 Main Title Container:**

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
```

**CRITICAL:** Use `dark:text-gray-100` for h2 titles in light sections, NOT `dark:text-white`.

**Section Subtitle (Top line):**

```tsx
<span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
  Section Subtitle
</span>
```

**Section Title (Main line):**

```tsx
<span className="block text-brand-primary dark:text-brand-primary-light font-black">
  Section Title
</span>
```

**Section Description:**

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
  Description text
</p>
```

**Responsive Text Sizing:**

- Mobile (xs): `text-xl` → `text-3xl` → `text-base`
- Small (sm): `text-2xl` → `text-4xl` → `text-lg`
- Medium (md): `text-3xl` → `text-5xl` → `text-xl`
- Large (lg): `text-4xl` → `text-6xl` → `text-2xl`
- XL (xl): `text-5xl` → `text-7xl` → `text-2xl`

---

### **4. Spacing Standards**

**Section Padding:**

```tsx
className = "py-12 sm:py-16 lg:py-24 xl:py-32";
```

**Header to Content Gap:**

```tsx
className = "mb-12 sm:mb-16 lg:mb-20";
```

**Icon to Title Gap:**

```tsx
className = "mb-6 sm:mb-8";
```

**Title to Description Gap:**

```tsx
className = "mb-6 sm:mb-8";
```

---

## 🎴 **Card Enhancement Patterns**

### **Standard Card with Icon**

```tsx
<div className="group h-full">
  <div className="h-full flex flex-col p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    {/* Icon Container with Hover Effect */}
    <div className="mb-6 flex justify-center">
      <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-md group-hover:scale-110 transition-transform duration-300">
        <MaterialIcon icon="icon_name" size="xl" className="text-white" />
      </div>
    </div>

    {/* Card Title */}
    <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
      Card Title
    </h3>

    {/* Card Content */}
    <div className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
      {/* Content here */}
    </div>
  </div>
</div>
```

**Card Icon Animations:**

- ✅ Icons scale on card hover: `group-hover:scale-110`
- ✅ Icons can spin on card hover: `group-hover:animate-spin`
- ✅ Smooth transitions: `transition-transform duration-300`

---

### **3D Flip Card Enhancement**

For sections using flip cards (Core Values, Services, etc.):

**Front Card:**

```tsx
<div className="absolute inset-0 backface-hidden">
  <div className="h-full flex flex-col p-6 sm:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
    {/* Icon with gradient background */}
    <div className="mb-6 flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full"></div>
        <div className="relative rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg">
          <MaterialIcon icon="icon_name" size="xl" className="text-white" />
        </div>
      </div>
    </div>

    {/* Title and Tagline */}
    <h3 className="mb-2 text-center font-black text-gray-900 dark:text-white text-xl sm:text-2xl">
      Card Title
    </h3>
    <p className="mb-4 text-center font-medium text-brand-primary text-sm">
      Tagline Text
    </p>

    {/* Description */}
    <p className="text-center text-gray-700 dark:text-gray-300 text-sm sm:text-base flex-grow">
      Brief description text
    </p>

    {/* CTA at bottom */}
    <div className="mt-auto pt-4 flex justify-center items-center text-brand-secondary">
      <MaterialIcon icon="touch_app" size="md" className="mr-2" />
      <span className="font-medium text-sm">Hover to Learn More</span>
    </div>
  </div>
</div>
```

**Back Card:**

```tsx
<div className="absolute inset-0 backface-hidden rotate-y-180">
  <div className="h-full flex flex-col p-6 sm:p-8 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-xl text-white">
    {/* Icon Header */}
    <div className="mb-4 flex justify-center">
      <MaterialIcon icon="icon_name" size="lg" className="text-white" />
    </div>

    {/* Title */}
    <h4 className="mb-4 text-center font-bold text-lg sm:text-xl">
      Card Title
    </h4>

    {/* Details - Limit to 3-4 items */}
    <ul className="space-y-3 flex-grow">
      <li className="flex items-start">
        <MaterialIcon
          icon="check_circle"
          size="sm"
          className="flex-shrink-0 mr-2 mt-1 text-brand-secondary"
        />
        <span className="text-sm sm:text-base">Detail item</span>
      </li>
      {/* Maximum 3-4 items to avoid scrolling */}
    </ul>

    {/* Stats or additional info */}
    <div className="mt-auto pt-4 text-center">
      <p className="text-brand-secondary font-bold text-2xl">95%</p>
      <p className="text-white/80 text-xs">Stat label</p>
    </div>
  </div>
</div>
```

**Card Height Standards:**

- Mobile: `h-[450px]`
- Small: `sm:h-[480px]`
- Medium: `md:h-[500px]`
- Large: `lg:h-[520px]`

**Critical Requirements:**

- ✅ Fixed heights prevent layout shifts
- ❌ NO scrolling on back cards
- ✅ Limit back card content to 3-4 items
- ✅ Use smaller text on back: `text-sm sm:text-base`

---

## 🔘 **Button Patterns**

### **Button Component Usage**

All buttons should use the `Button` component from `@/components/ui` with proper variants and sizes:

**Standard Button with Icon:**

```tsx
<Button variant="primary" size="lg" className="group/btn w-full">
  <MaterialIcon
    icon="icon_name"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Button Text
</Button>
```

**Button Variants:**

- `variant="primary"` - Brand primary color (green) - Main CTAs
- `variant="secondary"` - Brand secondary color (tan) - Alternative CTAs
- `variant="outline"` - Outlined style - Tertiary actions
- Custom: `bg-brand-accent` for accent actions

**Button Sizes:**

- `size="lg"` - Standard CTA buttons (48px min height)
- `size="xl"` - Featured/prominent buttons (64px+ min height)
- `size="md"` - Inline/compact buttons

**Button Icon Sizing:**

- Primary CTA icons: `size="lg"` (24px)
- Large button icons: `size="xl"` (32px)
- Small button icons: `size="md"` (20px)

### **CTA Button Grid Pattern**

For multiple CTAs in a grid layout:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
  {ctaButtons.map((cta) => (
    <Link href={cta.href} key={cta.title}>
      <Button
        variant={cta.variant}
        size="lg"
        className="group w-full h-auto min-h-[48px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
      >
        <MaterialIcon
          icon={cta.icon}
          size="lg"
          className="mr-2 sm:mr-3 flex-shrink-0"
        />
        <span className="font-medium text-sm sm:text-base">{cta.title}</span>
      </Button>
    </Link>
  ))}
</div>
```

**Grid Patterns:**

- **4-column**: Features, CTAs, navigation - `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- **3-column**: Next Steps section - `grid-cols-1 md:grid-cols-3`
- **2-column**: Alternative CTAs - `grid-cols-1 sm:grid-cols-2`

### **Multi-line Button Pattern**

For buttons with icon and multi-line text (PartnershipCTA):

```tsx
<Button
  variant="primary"
  size="lg"
  className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4"
>
  <div className="flex flex-col justify-center items-center">
    <MaterialIcon icon="icon_name" size="lg" className="flex-shrink-0 mb-1" />
    <span className="font-medium text-center text-xs sm:text-sm leading-tight">
      Line 1<br />
      Line 2
    </span>
  </div>
</Button>
```

### **Native HTML Button Pattern**

For video controls and simple actions (use sparingly):

```tsx
<button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg min-w-[240px]">
  <MaterialIcon icon="icon_name" size="lg" className="inline mr-2" />
  Button Text
</button>
```

**When to Use Native Buttons:**

- ✅ Video/media controls (play, pause, mute)
- ✅ Modal close buttons
- ✅ Inline toggle actions
- ❌ Primary CTAs (use Button component)
- ❌ Navigation actions (use Button component)

### **Button Best Practices**

**DO:**

- ✅ Use Button component for CTAs and navigation
- ✅ Include icons with `size="lg"` for visual clarity
- ✅ Add `group` and `group-hover` for icon animations
- ✅ Use `touch-manipulation` for mobile optimization
- ✅ Set minimum heights: `min-h-[48px]` for accessibility
- ✅ Add descriptive text alongside icons
- ✅ Use proper semantic HTML (`<Link>` wrapping `<Button>`)

**DO NOT:**

- ❌ Mix Button component and native buttons in same section
- ❌ Use buttons without icons (reduces visual hierarchy)
- ❌ Forget hover states and transitions
- ❌ Use overly long button text (keep concise)
- ❌ Skip mobile-optimized sizing (sm: breakpoints)
- ❌ Use icon-only buttons without aria-labels

### **Button Color Guidelines**

**Primary Green:**

- Main CTAs (Schedule Consultation, Get Estimate)
- High-priority actions
- Conversion-focused buttons

**Secondary Tan:**

- Alternative CTAs
- Government/Trade Partner actions
- Featured sections (Most Popular)

**Outline:**

- Tertiary actions (View Work, Learn More)
- Less prominent options
- Supporting actions

**Accent/Bronze:**

- Contact/Support actions
- Special categories
- Complementary CTAs

---

## 🎬 **Animation Standards**

### **CSS Utilities**

**Spin Animation (for icons):**

```css
/* In globals.css */
@layer utilities {
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }
}
```

**Usage:**

```tsx
{
  /* Card icon spinning on hover */
}
<MaterialIcon
  icon="icon_name"
  size="xl"
  className="group-hover:animate-spin"
/>;

{
  /* Slower continuous spin (use sparingly) */
}
<MaterialIcon icon="icon_name" size="xl" className="animate-spin-slow" />;

{
  /* Hover indicator with autorenew icon */
}
<MaterialIcon
  icon="autorenew"
  size="md"
  className="animate-spin-slow group-hover:animate-spin"
/>;
```

### **Framer Motion Wrappers**

**Fade In When Visible:**

```tsx
<FadeInWhenVisible>
  <div className="section-header">{/* Header content */}</div>
</FadeInWhenVisible>
```

**Staggered Animations:**

```tsx
<StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id}>{/* Card content */}</div>
  ))}
</StaggeredFadeIn>
```

---

## 📋 **Implementation Checklist**

When enhancing a section, ensure:

### **Visual Elements:**

- [ ] Icon header with gradient container added
- [ ] Background gradient with radial overlays AND animated blur orbs (3 required)
- [ ] Responsive typography hierarchy (subtitle → title → description)
- [ ] Proper spacing: `py-12 sm:py-16 lg:py-24 xl:py-32`
- [ ] Header margin: `mb-12 sm:mb-16 lg:mb-20`
- [ ] Dark mode support on all elements
- [ ] Brand color consistency (primary, secondary, accent)
- [ ] h2 titles use `dark:text-gray-100` (not `dark:text-white`)
- [ ] Title spans have `drop-shadow-sm`

### **Icons:**

- [ ] Material Icons with `icon=` prop (NOT `name=`)
- [ ] Header icons use `size="2xl"`
- [ ] Card icons use `size="xl"`
- [ ] Small icons use `size="md"` or `size="sm"`
- [ ] Hover indicators with autorenew icon (where applicable)
- [ ] Card icons with hover effects (scale or spin)

### **Cards & Content:**

- [ ] Fixed heights on flip cards
- [ ] No internal scrolling on cards
- [ ] Proper card hover effects (shadow, translate)
- [ ] Icon containers with blur glow effect

### **Animations:**

- [ ] FadeInWhenVisible wrapper for header
- [ ] StaggeredFadeIn for card grids
- [ ] Blur orbs with staggered delays (0s, 0.5s, 1s)

### **Architectural:**

- [ ] Component accepts props for customization (title, subtitle, description)
- [ ] Dynamic imports for heavy below-the-fold components
- [ ] Analytics tracking integrated (where applicable)
- [ ] Responsive behavior tested on all breakpoints

### **Buttons & CTAs:**

- [ ] Use Button component (not native HTML buttons for CTAs)
- [ ] Proper variant: `primary`, `secondary`, or `outline`
- [ ] Proper size: `lg` for standard CTAs, `xl` for featured
- [ ] Icons with `size="lg"` in buttons
- [ ] Icon hover animations: `group-hover/btn:scale-110`
- [ ] Minimum height: `min-h-[48px]` for accessibility
- [ ] Touch optimization: `touch-manipulation` class
- [ ] Semantic HTML: `<Link>` wrapping `<Button>`

---

## 📊 **Implemented Examples**

### **Homepage Sections:**

- ✅ Core Values Section (`CoreValuesSection.tsx`)
- ✅ Services Showcase (`ServicesShowcase.tsx`)
- ✅ Why Partner Section (`WhyPartnerSection.tsx`)
- ✅ Testimonials Section (`TestimonialsSection.tsx`)
- ✅ Before/After Showcase (inline in `page.tsx`)
- ✅ Company Stats (`CompanyStats.tsx`)
- ✅ Features Section (`FeaturesSection.tsx`)
- ✅ AI Estimator CTA (`AIEstimatorCTA.tsx`)
- ✅ Smart Recommendations (inline in `page.tsx`)
- ✅ Next Steps Section (`NextStepsSection.tsx`)
- ✅ Partnership CTA (`PartnershipCTA.tsx`)

### **About Page Sections:**

- ✅ Why Values Matter Section (inline in `about/page.tsx`)

### **Sections Following This Pattern:**

All major content sections should follow this enhancement pattern for visual consistency across the website. When creating new sections or updating existing ones, reference the implemented examples above.

---

## 🚫 **Common Mistakes to Avoid**

### **DO NOT:**

- ❌ Use `name=` prop on MaterialIcon (use `icon=` instead)
- ❌ Use spinning header icons (only card icons can spin)
- ❌ Add scrolling to flip card backs
- ❌ Use emojis instead of Material Icons
- ❌ Mix different gradient patterns in same section
- ❌ Forget dark mode variants
- ❌ Use inconsistent spacing values
- ❌ Add too much content to card backs (max 3-4 items)
- ❌ Use `text-5xl` directly (use `size="2xl"` prop instead)
- ❌ Forget the blur glow behind icon containers
- ❌ Use native HTML buttons for primary CTAs
- ❌ Mix Button component and native buttons in same section
- ❌ Skip icon animations on button hover

### **DO:**

- ✅ Use `icon=` prop for MaterialIcon (CRITICAL!)
- ✅ Use `size="2xl"` for header icons
- ✅ Include blur glow effect behind icon containers
- ✅ Add three animated blur orbs with staggered delays
- ✅ Use `bg-gradient-to-b` for section backgrounds
- ✅ Keep header icons static
- ✅ Add hover animations to card icons
- ✅ Limit flip card content to prevent scrolling
- ✅ Use Material Icons consistently
- ✅ Follow established spacing standards
- ✅ Test in both light and dark modes
- ✅ Ensure responsive scaling on all breakpoints
- ✅ Include `dark:text-gray-100` (not `dark:text-white`) for h2 titles
- ✅ Add `drop-shadow-sm` to title spans
- ✅ Use Button component for all CTAs with proper variants
- ✅ Include icons in buttons with `size="lg"`
- ✅ Add `group-hover` animations to button icons
- ✅ Set `min-h-[48px]` on all buttons for accessibility

---

## 📐 **Architectural Patterns**

### **Component Composition**

**Reusable Section Components with Props:**

Many sections accept props for customization while maintaining visual consistency:

```tsx
// Testimonials Section
<TestimonialsSection
  subtitle="What Our"
  title="Client Partners Say"
  description="Read testimonials from valued partners..."
  autoPlay={true}
  autoPlayInterval={5000}
/>

// Company Stats
<CompanyStats
  subtitle="Our Track"
  title="Record"
  description="Proven results..."
  variant="primary"
  headerIcon="analytics"
/>

// AI Estimator CTA
<AIEstimatorCTA
  variant="full" // or "compact"
  location="homepage"
/>
```

**Section Ordering Strategy:**

Follow this trust-building progression on homepage:

1. **Hero** - Visual impact and mission
2. **Core Values** - Establish trust and character
3. **Services** - What we do
4. **Why Partner** - Partnership philosophy
5. **Testimonials** - Social proof
6. **Before/After** - Tangible results
7. **Stats** - Credibility through numbers
8. **Features** - Modern tools
9. **CTAs** - Multiple conversion paths

### **Animation Integration**

**FadeInWhenVisible Wrapper:**

Wrap section headers for entrance animations:

```tsx
<FadeInWhenVisible>
  <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
    {/* Section header content */}
  </div>
</FadeInWhenVisible>
```

**When to Use:**

- ✅ Section headers with icon, title, description
- ✅ Before/After showcase sections
- ✅ Recommendation cards
- ❌ Hero sections (always visible)
- ❌ Navigation elements

### **Dynamic Imports**

For below-the-fold components, use Next.js dynamic imports:

```tsx
const SmartRecommendations = dynamic(
  () => import("../components/recommendations/SmartRecommendations"),
  {
    loading: () => (
      <div className="bg-muted rounded-lg h-64 animate-pulse"></div>
    ),
    ssr: false,
  },
);
```

**When to Use:**

- ✅ Heavy components below the fold
- ✅ Interactive features (recommendations, calculators)
- ✅ Third-party widgets
- ❌ Above-the-fold content
- ❌ Critical navigation

### **Background Gradient Variations**

**Standard Light Background:**

```tsx
className =
  "relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";
```

**Dark Background (CTAs):**

```tsx
className =
  "relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark";
```

**Radial Gradient Position Variations:**

```tsx
{/* Standard: top-right primary, bottom-left secondary */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)]"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)]"></div>

{/* Alternate: top-left secondary, bottom-right primary */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)]"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)]"></div>
```

**Blur Orb Positioning:**

Vary positions to create visual interest between sections:

```tsx
{/* Set A: Standard positioning */}
<div className="top-20 right-10 absolute bg-brand-primary/10 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
<div className="left-10 bottom-20 absolute bg-brand-secondary/10 blur-3xl rounded-full w-40 h-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
<div className="top-1/2 left-1/4 absolute bg-brand-secondary/5 blur-3xl rounded-full w-24 h-24 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

{/* Set B: Alternate positioning */}
<div className="top-20 left-10 absolute bg-brand-secondary/10 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
<div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-3xl rounded-full w-40 h-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
<div className="top-1/2 right-1/4 absolute bg-brand-primary/5 blur-3xl rounded-full w-24 h-24 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
```

### **Interactive Components**

**BeforeAfterSlider:**

```tsx
<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  beforeAlt="Project before construction"
  afterAlt="Project after construction"
  caption="Example transformation"
  height="h-[400px] sm:h-[500px] lg:h-[600px]"
  showLabels={true}
/>
```

**SmartRecommendations:**

```tsx
<SmartRecommendations
  variant="compact"
  maxRecommendations={6}
  showVeteranBenefits={true}
  onRecommendationClick={(recommendation) => {
    trackEvent("recommendation_click", {
      project_type: recommendation.projectType,
    });
  }}
  onGetEstimate={(recommendation) => {
    // Navigate to estimator with pre-filled data
    window.location.href = `/estimator?project=${recommendation.projectType}`;
  }}
  className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl"
/>
```

### **Hero Section Pattern**

The homepage uses a unique full-screen video hero:

```tsx
<section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Video */}
  <div className="absolute inset-0">
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      loop
      playsInline
    >
      <source src="/videos/hero-video.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900/30 to-brand-secondary/20 z-10"></div>
  </div>

  {/* Play Button Overlay */}
  {showPlayButton && (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <button className="bg-brand-primary/90 p-8 rounded-full hover:scale-110 transition-all">
        <MaterialIcon icon="play_arrow" size="lg" className="text-white" />
      </button>
    </div>
  )}

  {/* Main Content */}
  <div className="relative z-30 text-center px-4 max-w-7xl mx-auto">
    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white drop-shadow-2xl">
      <span className="block text-brand-secondary">Your Tagline</span>
      <span className="block text-white/95">Main Message</span>
    </h1>
  </div>

  {/* Page Navigation */}
  <PageNavigation
    items={navigationConfigs.home}
    className="absolute bottom-0"
  />
</section>
```

---

## 🔗 **Related Documentation**

- **[Component Standards](./component-standards.md)** - Base component patterns
- **[Branding Quick Reference](./branding-quick-reference.md)** - Color and icon standards
- **[Typography Standards](../standards/typography.md)** - Text sizing and hierarchy
- **[Color System](../standards/color-system.md)** - Brand color definitions
- **[Homepage Architecture](../../technical/homepage-architecture.md)** - SEO, analytics, performance patterns

---

**Maintained by:** MH Construction Development Team  
**Last Updated:** November 17, 2025  
**Questions?** Reference implemented examples in `src/components/home/` and `src/components/about/`
