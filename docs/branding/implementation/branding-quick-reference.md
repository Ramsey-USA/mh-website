# MH Construction Branding Quick Reference

**For Developers** | **Last Updated**: December 15, 2025 | **Version**: 6.0.0

**⭐ BREAKING CHANGES (Dec 15, 2025)**: Home page standardization complete. All sections MUST use diagonal
stripe backgrounds, large color blobs, custom header pattern, and strict brand color compliance. Brand-accent color removed.

**Previous Update (Dec 13, 2025)**: Complete shift to veteran/honest messaging. All branding emphasizes
veteran-owned excellence, honest communication, transparent pricing, and proven craftsmanship.

## 🚨 Critical Requirements (Must-Have)

### Section Background Pattern - NEW STANDARD

```tsx
// ✅ REQUIRED: All sections must use this pattern
<section
  id="section-id"
  className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  {/* Diagonal Stripe Pattern */}
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #386851 0px,
          #386851 2px,
          transparent 2px,
          transparent 60px
        )`,
      }}
    ></div>
  </div>

  {/* Large Color Blobs */}
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Use custom header pattern shown below */}
    {/* Content */}
  </div>
</section>

// ❌ DEPRECATED: Old patterns
<section className="bg-gradient-to-b from-white via-gray-50 to-white"> // Complex gradients
<div className="w-32 h-32 animate-pulse"> // Small animated blobs
```

### Section Header Pattern - OFFICIAL STANDARD

```tsx
// ✅ REQUIRED: Use this custom header pattern for all sections
{
  /* Section Header - Military Construction Standard */
}
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
      Subtitle Text
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Main Title
    </span>
  </h2>

  {/* Description */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text with optional{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      keyword highlights
    </span>
  </p>
</div>;
```

### Emoji Policy

```tsx
// ❌ NEVER use emojis in source code
<span>🏗️ Construction</span>

// ✅ ALWAYS use MaterialIcon instead
<MaterialIcon icon="construction" size="md" className="text-brand-primary" />
```

### Color Standards - UPDATED

```tsx
// ✅ CORRECT: Use brand classes
className="text-brand-primary"      // Hunter Green - check marks, primary icons
className="text-brand-secondary"    // Leather Tan - highlights, partnerships
className="bg-brand-primary"
className="bg-brand-secondary"
className="border-brand-primary"

// ❌ INCORRECT: Deprecated/hardcoded colors
className="text-brand-accent"       // REMOVED - use brand-primary or brand-secondary
className="bg-brand-accent"         // REMOVED - use brand-secondary
style={{backgroundColor: '#386851'}} // Use Tailwind classes
className="bg-[#BD9264]"            // Use bg-brand-secondary
```

### Typography Patterns

````tsx
// ✅ CORRECT: Hero section (for photo/video backgrounds) - NO BADGES
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
  <span className="block text-brand-secondary font-black drop-shadow-lg">
    Your Partnership in Construction Excellence
  </span>
</h1>

<p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
  Tagline or subtitle content
</p>

<p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
  Description content with partnership language
</p>

// ✅ CORRECT: Standard section header - NO SECTION BADGES
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Subtitle Text
  </span>
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Main Title
  </span>
</h2>

// ✅ CORRECT: Standard body text
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
  Body content with proper responsive scaling
</p>
```text

## 📝 Required Messaging

### Core Veteran/Honest Messaging (Priority)

**Veteran-Owned Excellence:**

> "Veteran-owned excellence where honest communication and proven craftsmanship build lasting trust."

**Honest Communication:**

> "Honest communication, transparent pricing, face-to-face consultation."

**Proven Craftsmanship:**

> "Proven craftsmanship over cutting-edge technology. Traditional business values that last."

### Core Brand Slogans

**Primary Slogan:**

> "Building projects for the client, NOT the dollar"

**Relationship-Focused Slogan:**

> "THE ROI IS THE RELATIONSHIP"

Use these companion slogans to emphasize our partnership-first approach.

**Partnership Call-to-Action:**

> "Let's Build More than Just Structures - Partner with a team that puts your vision—and your relationship—first."

**Supporting Statement:**

> "We're big enough to scale and small enough to stay personal."

### Mission & Vision

**Mission**: We deliver high-quality construction rooted in veteran integrity, honest communication,
and long-term relationships built on transparency.

**Vision**: To be the Pacific Northwest's most trusted veteran-owned construction partner - renowned for
honest communication, proven craftsmanship, and transparent pricing.

### Partnership Language

- "We Work With You"
- "Partnership-Driven Construction"
- "Collaborative Excellence"
- "The ROI is the relationship"
- "Your success comes first"

### Our Owner-First Process

1. **Pre-Construction Planning**
2. **Budget Transparency**
3. **Proactive Communication**
4. **Quality Execution**
5. **Seamless Close-Out**

Use these process steps to communicate our systematic, client-focused approach.

### Regional Focus

- Tri-Cities area (Pasco, Kennewick, Richland)
- Service regions: Washington, Oregon, Idaho
- Pacific Northwest

### Veteran Identity & Honest Communication

**Veteran-Owned Excellence:**
- "Veteran-owned since January 2025"
- "Veteran integrity in every project"
- "Military precision meets honest communication"
- "Service-earned values guide every partnership"

**Honest Communication Priority:**
- "Honest communication always"
- "Transparent pricing, no hidden costs"
- "Face-to-face consultation over automated tools"
- "Your word is your bond - so is ours"

**Proven Craftsmanship:**
- "Proven methods over innovation"
- "650+ completed projects demonstrate reliability"
- "Traditional business values that last generations"
- "Craftsmanship you can see and trust"

## 🎨 Brand Colors

```css
/* Primary Colors */
--brand-primary: #386851;        /* Hunter Green */
--brand-secondary: #BD9264;      /* Leather Tan */

/* Extended Palette */
--brand-primary-light: #4a7a63;
--brand-primary-dark: #2d5240;
--brand-secondary-light: #c9a176;
--brand-secondary-dark: #a67d52;
```text

## 🔧 Component Standards

### Cards

```tsx
<Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-2 duration-300">
```text

### Buttons

```tsx
<Button variant="primary" size="lg" className="group transition-all duration-300">
<Button variant="secondary" size="lg" className="group transition-all duration-300">
<Button variant="outline" size="lg" className="group transition-all duration-300">
```text

### MaterialIcon Usage

```tsx
// Size options: sm, md, lg, xl, 2xl
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="handshake" size="md" className="mr-2 text-brand-secondary" />
```text

## 📱 Responsive Requirements

### Breakpoints

- `xs:` - 475px+
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

### Typography Scaling

```tsx
// Headers: Progressive scaling
text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl

// Body: Moderate scaling
text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl

// Small text: Minimal scaling
text-sm sm:text-base md:text-lg
```text

## ⚡ Animation Standards

### Timing

- Standard transition: `duration-300` (300ms)
- Hover effects: `transition-all duration-300`
- Page load animations: `duration-500`

### Common Patterns

```tsx
// Hover scale
className="hover:scale-105 transition-transform duration-300"

// Hover translate
className="hover:-translate-y-2 transition-all duration-300"

// Fade in animations
<FadeInWhenVisible>
<StaggeredFadeIn>
```text

## 🔍 Validation Checklist

### Before Committing

- [ ] No emojis in source code
- [ ] MaterialIcon components used
- [ ] Brand colors use approved classes
- [ ] Typography follows patterns
- [ ] Responsive scaling implemented
- [ ] Dark mode support included

### Testing Requirements

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Dark mode toggle
- [ ] Animation performance

## 🚀 Quick Commands

### Run Branding Check

```bash
./scripts/validation/check-branding-compliance.sh
```text

### Common Fixes

```bash
# Search for emojis
grep -r "[\u{1F600}-\u{1F64F}]" src/app/

# Find hardcoded colors
grep -r "#386851\|#BD9264" src/app/

# Check MaterialIcon usage
grep -r "MaterialIcon" src/app/
```text

## 📞 Support

### Documentation

- **Consistency Guide**: `/docs/development/consistency-guide.md`
- **Design System**: `/docs/technical/design-system/design-system.md`
- **Brand Guidelines**: `/docs/branding/`

### Key Contacts

- **Development Team**: Technical questions
- **Brand Authority**: MH Construction Leadership
- **QA Process**: Monthly compliance audits

---

**Remember**: When in doubt, check existing compliant pages (Home, About) for patterns to follow.
````
