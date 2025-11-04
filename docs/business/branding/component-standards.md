# MH Construction Component Standards

**Version:** 4.0.2  
**Last Updated:** December 2024  
**Status:** ✅ Active Standard

> **Purpose:** Unified component design system ensuring visual consistency across all website elements using our brand guidelines.

---

## 🎨 **Core Component Principles**

### **Brand Color Integration**

- **Primary Actions:** Hunter Green (#386851)
- **Secondary Actions:** Leather Tan (#BD9264)
- **Supporting Colors:** Black, White, Gray scale only
- **NO Gradients:** Solid colors only (Professional, not decorative)

### **Material Icons Only**

- **NO EMOJIS:** Use Material Icons exclusively
- **Standard Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- **Consistent Spacing:** `mr-2`, `mr-3`, `mr-4` for icon-text combinations

### **Card Grid Layout Standards**

- **Large Screens (lg):** 3 cards per row optimal (standard sections)
- **Extra Large (xl):** Use `xl:grid-cols-4` for 6+ card sets
- **Tablet (md):** 2 cards per row
- **Mobile:** 1 card per row (stack vertically)
- **Spacing:** `gap-6 lg:gap-8` for consistent card spacing

**Examples:**

- 6 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3` (prefer 3-wide)
- 4 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4`
- 3 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**LAYOUT PHILOSOPHY:** Prefer 3-4 columns on large screens rather than multiple rows for better visual
balance and cleaner layout.

---

## 🔘 **Button Component Standards**

### **Required Pattern**

```tsx
<Button
  variant="primary|secondary|outline|neutral"
  size="sm|default|lg|xl"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2 group-hover:scale-110" />
  Button Text
</Button>
```

### **Touch Accessibility**

- **Minimum Height:** 44px (WCAG compliant)
- **Interactive States:** hover, focus, active
- **Disabled States:** 50% opacity, no hover effects

### **Spacing Standards**

- **Icon Spacing:** `mr-2` (small), `mr-3` (medium), `mr-4` (large)
- **Button Gaps:** `gap-3` between multiple buttons
- **Container Margins:** `mb-6` for button groups

---

## 🎴 **Card Component Standards**

### **Standard Card Structure**

```tsx
<Card
  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 
  group p-8"
>
  {/* Icon Container - Standard Sizes */}
  <div
    className="flex justify-center items-center bg-brand-primary/10 mb-6 
    rounded-2xl w-16 h-16 p-2"
  >
    <MaterialIcon icon="icon_name" size="xl" className="text-brand-primary" />
  </div>

  {/* Card Header */}
  <CardHeader>
    <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
      Card Title
    </CardTitle>
  </CardHeader>

  {/* Card Content */}
  <CardContent>
    <p
      className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg 
      leading-relaxed mb-6"
    >
      Card description content
    </p>
  </CardContent>

  {/* Card Action - Bottom Aligned */}
  <div className="mt-auto">
    <Button variant="outline" size="sm" className="w-full">
      <MaterialIcon icon="arrow_forward" className="mr-2" />
      Action Text
    </Button>
  </div>
</Card>
```

### **Card Flip Implementation (3D Transform)**

**CRITICAL:** Card flips should NOT use internal scrolling. All content must fit within the card height
for clean UX with single main page scroll.

```tsx
<div
  className="group perspective h-[400px] cursor-pointer"
  style={{ perspective: "1000px" }}
>
  <div
    className="relative w-full h-full transition-transform duration-700 preserve-3d 
    group-hover:rotate-y-180"
  >
    {/* Front of card */}
    <div className="absolute inset-0 backface-hidden">
      <Card
        className="bg-white dark:bg-gray-800 border border-gray-200 
        dark:border-gray-700 h-full"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <MaterialIcon
              icon="icon_name"
              className="mr-3 text-brand-primary text-4xl"
            />
          </div>
          <CardTitle className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
            Card Title
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p
            className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg 
            leading-relaxed mb-6"
          >
            Front card description
          </p>
          <div className="flex items-center justify-center mt-8 text-brand-primary">
            <MaterialIcon
              icon="autorenew"
              className="mr-2 text-xl sm:text-2xl animate-pulse"
            />
            <span className="font-medium text-xs sm:text-sm">
              Hover to see more
            </span>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Back of card */}
    <div
      className="absolute inset-0 backface-hidden rotate-y-180"
      style={{ transform: "rotateY(180deg)" }}
    >
      <Card
        className="bg-gradient-to-br from-brand-primary to-brand-primary-dark 
        dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary 
        dark:border-brand-primary/50 h-full"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <MaterialIcon
              icon="checklist"
              className="mr-2 text-brand-secondary text-2xl sm:text-3xl"
            />
            <p className="font-bold text-white text-base sm:text-lg md:text-xl">
              Details:
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3">
            <li className="flex items-start">
              <MaterialIcon
                icon="check_circle"
                className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary text-base sm:text-lg"
              />
              <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base">
                Detail item
              </span>
            </li>
          </ul>
          <div className="flex items-center justify-center mt-6 text-brand-secondary">
            <MaterialIcon
              icon="autorenew"
              className="mr-2 text-lg sm:text-xl"
            />
            <span className="font-medium text-xs">Hover to return</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
```

#### Card Flip Requirements

- **Fixed Height:** Use `h-[400px]` or `h-[450px]` for consistent card dimensions
- **NO Internal Scroll:** ❌ Never use `overflow-y-auto` or `max-h-[]` on card content
- **Content Fitting:** All content must fit within fixed height naturally
- **Responsive Text:** Use `text-xs sm:text-sm md:text-base` for back content to fit better
- **Single Main Scroll:** Only the page scrolls, not individual cards
- **3D Transform:** Required classes: `perspective`, `preserve-3d`, `backface-hidden`, `rotate-y-180`
- **Smooth Animation:** Use `duration-700` for comfortable flip timing

### **Card Typography Standards**

```tsx
{/* Card Titles - Responsive */}
<CardTitle className="text-lg sm:text-xl md:text-2xl">

{/* Card Body Text - Standard */}
<p className="text-sm sm:text-base md:text-lg">

{/* Card Fine Print - Flip Backs */}
<span className="text-xs sm:text-sm md:text-base">
```

### **Card Variants**

- **Standard Cards:** `p-8`, `rounded-3xl`
- **Compact Cards:** `p-6`, `rounded-2xl`
- **Feature Cards:** `p-10`, `rounded-3xl`

---

## 📝 **Form Component Standards**

### **Input Field Pattern**

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Field Label
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
      rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 
      transition-all duration-300 touch-manipulation min-h-[44px]"
    placeholder="Enter information"
  />
</div>
```

### **Form Submission Standards**

```tsx
<div className="flex gap-3 justify-end">
  <Button variant="outline" size="default">
    Cancel
  </Button>
  <Button variant="primary" size="default" type="submit">
    <MaterialIcon icon="check" className="mr-2" />
    Submit Form
  </Button>
</div>
```

---

## 🚀 **Animation & Interaction Standards**

### **Standard Transitions**

- **Duration:** `duration-300` (consistent across all components)
- **Easing:** `ease-out` for natural feel
- **Hover Effects:** `hover:scale-105`, `hover:shadow-2xl`
- **Focus States:** `focus:ring-2 focus:ring-brand-primary`

### **Group Interactions**

```tsx
className = "group";
// Icon animations within groups
className = "group-hover:scale-110 transition-transform duration-300";
// Text animations within groups
className = "group-hover:text-brand-primary transition-colors duration-300";
```

---

## 📱 **Responsive Component Standards**

### **Mobile-First Approach**

- **Base:** Mobile (320px+)
- **sm:** Small screens (640px+)
- **md:** Tablets (768px+)
- **lg:** Desktop (1024px+)

### **Touch Optimization**

- **Minimum Touch Targets:** 44px height
- **Touch Class:** `touch-manipulation` on all interactive elements
- **Tap Feedback:** Visual feedback on touch interactions

### **Grid Responsiveness**

```tsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";
```

---

## 🎯 **Section Component Standards**

### **Hero Section Structure (For Photo/Video Backgrounds)**

**UPDATED:** November 4, 2025 - v4.0.2 Hero Standards

**CRITICAL REQUIREMENTS:**

- ✅ **NO badges** or bubble containers (veteran badges, decorative badges)
- ✅ **NO CTA buttons** (Schedule, Get Estimate, Contact buttons)
- ✅ **NO stats/cards** (30+ years, 100+ projects displays)
- ✅ **NO trust indicators** (satisfaction rates, project counts)
- ✅ **Content ONLY**: Title, subtitle, description text
- ✅ **Navigation at bottom**: PageNavigation at `absolute bottom-0`
- ✅ **Full viewport height**: `h-screen flex items-center justify-center`

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Content - CLEAN AND SIMPLE */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      {/* Main Title - USE BRAND COLOR */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Page Title Content
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        Tagline or key message
      </p>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Building for the Owner, NOT the Dollar" — Supporting description with partnership language
      </p>
    </div>
  </div>

  {/* Page Navigation - ALWAYS AT BOTTOM */}
  <PageNavigation
    items={navigationConfigs.pageName}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

### **Standard Section Structure**

```tsx
<section className="relative py-12 lg:py-16 bg-white dark:bg-gray-900">
  {/* Background decorative elements */}
  <div
    className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white 
    dark:from-gray-800 dark:to-gray-900"
  ></div>
  <div
    className="absolute top-20 right-20 bg-brand-primary/5 blur-3xl 
    rounded-full w-32 h-32"
  ></div>

  {/* Content container */}
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Section Header */}
    <div className="mb-10 lg:mb-12 text-center">
      <h2
        className="mb-6 font-black text-gray-900 dark:text-gray-100 
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter"
      >
        <span
          className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 
          text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight"
        >
          Section Context
        </span>
        <span className="block text-brand-primary">Section Title</span>
      </h2>
      <p
        className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 
        text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide"
      >
        Section description
      </p>
    </div>

    {/* Section Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {/* Cards or content - Use 3-4 cards per row on large screens */}
    </div>
  </div>
</section>
```

---

## ♿ **Accessibility Standards**

### **Required Attributes**

- **ARIA Labels:** Descriptive labels for screen readers
- **Focus Management:** Visible focus indicators
- **Keyboard Navigation:** Tab order and Enter/Space activation
- **Color Contrast:** WCAG AA compliance with brand colors

### **Implementation Example**

```tsx
<Button
  variant="primary"
  aria-label="Schedule a free consultation with MH Construction"
  className="focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
>
  <MaterialIcon icon="event" className="mr-2" />
  Schedule Consultation
</Button>
```

---

## 🔍 **Quality Checklist**

### **Component Review Criteria**

- [ ] Uses approved brand colors only (Hunter Green, Leather Tan, grays)
- [ ] Material Icons instead of emojis
- [ ] Consistent spacing and padding
- [ ] Proper responsive breakpoints
- [ ] Accessibility attributes included
- [ ] Dark mode support implemented
- [ ] Standard animation timings (300ms)
- [ ] Touch-friendly sizing (min 44px)
- [ ] Hover and focus states defined
- [ ] Semantic HTML structure

---

## 📚 **Related Documentation**

- **[MH Branding Guidelines](../mh-branding.md)** - Complete brand system
- **[Typography Standards](./typography.md)** - Text and heading standards
- **[Color System](./color-system.md)** - Brand color definitions
- **[Icon Policy](./icon-policy.md)** - Material Icons standards
- **[Page Layout Standards](../../technical/design-system/layout/page-layout-standards.md)** - Layout specifications

---

**Maintained by:** MH Construction Development Team  
**Questions?** Refer to component examples in `src/components/ui/` directory
