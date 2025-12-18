# Home Page Standardization - MH Branding Standard

**Date:** December 15, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active Standard - All Pages Must Comply

---

## 📋 Overview

The home page styling has been established as the **official MH Construction branding standard** for all
website sections. This standardization ensures visual consistency, simplified maintenance, and professional
presentation across the entire site.

**STANDARD PATTERN:** All home page sections use consistent custom header markup with icon, decorative lines,
two-line gradient heading (subtitle + title), and description text.

---

## 🎨 Core Standards

### 1. Section Background Pattern (REQUIRED)

All content sections MUST use this exact background pattern:

```tsx
<section
  id="section-id"
  className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  {/* Diagonal Stripe Background Pattern */}
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

  {/* Large Brand Color Blobs */}
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content */}
  </div>
</section>
```

**Key Elements:**

- **Base Background:** Solid `bg-white dark:bg-gray-900` (no gradients)
- **Padding:** Consistent `py-12 sm:py-16 lg:py-20 xl:py-24`
- **Diagonal Stripes:** Hunter Green (#386851) at 45deg angle
- **Color Blobs:** Two large (w-96 h-96) positioned blobs
- **Overflow:** Always `overflow-hidden`

---

### 2. Section Header Pattern (REQUIRED)

All home page section headers MUST use this exact custom markup pattern:

```tsx
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
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Subtitle Text
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Main Title Text
    </span>
  </h2>

  {/* Description */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text with optional{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      highlighted keywords
    </span>{" "}
    for emphasis.
  </p>
</div>;
```

**Key Elements:**

- **Decorative Lines:** Horizontal gradient lines on both sides of icon
- **Icon Container:** Glow effect + gradient background + large icon (2xl)
- **Two-Line Heading:** Smaller subtitle (gray) + larger gradient title
- **Description:** Light text with optional bold keyword highlights
- **Gradient Colors:** Uses `from-brand-primary via-brand-secondary to-brand-primary`

**Icon Color Variations:**

- `from-brand-primary via-brand-primary-dark to-brand-primary-darker` - Green theme (values, trust)
- `from-brand-secondary via-bronze-700 to-bronze-800` - Tan/bronze theme (services, partnerships)

**NOTE:** All home page sections use this custom header pattern for consistent styling across all sections.

---

### 3. Brand Color Compliance (REQUIRED)

**Official MH Brand Colors:**

| Color                   | Hex Code | Usage                                        | Tailwind Classes                             |
| ----------------------- | -------- | -------------------------------------------- | -------------------------------------------- |
| Hunter Green (Primary)  | #386851  | Trust, integrity, check marks, primary icons | `text-brand-primary`, `bg-brand-primary`     |
| Leather Tan (Secondary) | #BD9264  | Partnerships, highlights, veteran elements   | `text-brand-secondary`, `bg-brand-secondary` |

**✅ CORRECT Usage:**

```tsx
className = "text-brand-primary"; // Check marks, primary icons
className = "text-brand-secondary"; // Highlights, partnerships
className = "bg-brand-primary"; // Primary backgrounds
className = "bg-brand-secondary"; // Secondary backgrounds
```

**❌ DEPRECATED - REMOVED - DO NOT USE:**

```tsx
className = "text-brand-accent"; // REMOVED - inconsistent, use brand-secondary
className = "bg-brand-accent"; // REMOVED - use brand-secondary
className = "from-brand-accent"; // REMOVED - use brand-secondary in gradients
```

---

## 📐 Component Implementation Examples

### Standard Section with Custom Header

```tsx
export function ExampleSection() {
  return (
    <section
      id="example"
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
        {/* Section Header - Military Construction Standard */}
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
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              Subtitle Text
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Main Title
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Description text with optional{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              keyword highlighting
            </span>
            .
          </p>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards or content */}
        </div>
      </div>
    </section>
  );
}
```

---

## 🚫 Deprecated Patterns

### OLD - Complex Gradients (REMOVED)

```tsx
// ❌ DO NOT USE
<section className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
```

### OLD - Radial Gradient Overlays (REMOVED)

```tsx
// ❌ DO NOT USE
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)]"></div>
```

### OLD - Small Animated Blobs (REMOVED)

```tsx
// ❌ DO NOT USE
<div className="absolute top-20 right-10 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full animate-pulse"></div>
```

---

## ✅ Implementation Checklist

When creating or updating a page section:

- [ ] Base background is `bg-white dark:bg-gray-900`
- [ ] Padding is `py-12 sm:py-16 lg:py-20 xl:py-24`
- [ ] Diagonal stripe pattern included with correct opacity
- [ ] Two large color blobs (w-96 h-96) positioned correctly
- [ ] Using custom header pattern (icon with decorative lines + two-line gradient heading + description)
- [ ] Icon uses appropriate gradient (brand-primary or brand-secondary/bronze)
- [ ] All colors use `brand-primary` or `brand-secondary` (no brand-accent)
- [ ] Check marks use `text-brand-primary`
- [ ] Partnership/veteran highlights use `text-brand-secondary`
- [ ] Section has unique `id` attribute
- [ ] Includes `overflow-hidden` class
- [ ] Content wrapper has `relative z-10` classes

---

## 📚 Related Documentation

- **Component Standards:** `/docs/branding/standards/component-standards.md`
- **Section Enhancement Patterns:** `/docs/branding/implementation/section-enhancement-patterns.md`
- **Quick Reference:** `/docs/branding/implementation/branding-quick-reference.md`
- **Hero Section Standards:** `/docs/branding/standards/hero-section-standards.md`

---

## 🔄 Migration Status

### ✅ Completed (December 18, 2025)

**Home Page - All sections using custom header pattern:**

- CoreValuesSection ✅ (custom header with icon, gradient heading, description)
- ServicesShowcase ✅ (custom header with icon, gradient heading, description)
- WhyPartnerSection ✅ (custom header with icon, gradient heading, description + callout)
- Our Process section ✅ (custom header with icon, gradient heading, description)
- CompanyStats ✅ (used on multiple pages)

**About Page:**

- PartnershipPhilosophy ✅
- AboutValues ✅
- SafetySection ✅
- AwardsSection ✅
- LeadershipTeam ✅
- Why Values Matter (inline) ✅
- News & Achievements (inline) ✅

**Projects Page:**

- ProjectsStatsSection ✅ (custom header with icon, gradient heading, description + standard background)
- CapabilitiesSection ✅ (uses Section component with standard background)
- WhyChooseSection ✅ (uses Section component with standard background)
- TestimonialsSection ✅ (uses Section component with standard background)
- PartnershipProcessSection ✅ (uses Section component with standard background)

**Services Page:**

- ConstructionExpertiseSection ✅
- CoreServicesSection ✅
- SpecialtyServicesSection ✅
- GovernmentProjectsSection ✅
- ConstructionProcessSection ✅
- Interactive Timeline section ✅
- Partnership Types section ✅

**Contact Page:**

- Quick Contact Section ✅
- Interactive Map Section ✅
- Strategic CTAs Section ✅

**Careers Page:**

- Why Work With Us section ✅
- Employee Benefits section ✅
- Veteran Benefits section ✅
- Open Positions section ✅
- Application Process section ✅
- Employee Testimonials section ✅
- General Application section ✅

**FAQ Page:**

- Introduction Section ✅
- FAQ Categories sections ✅
- CTA Section ✅

**Allies Page:**

- Important Distinction Notice ✅
- Trade Partnership Philosophy ✅
- Trade Partner Categories ✅
- Partnership Benefits ✅
- Vendor Requirements ✅
- CTA Section ✅

**Team Page:**

- Team header section ✅ (verified custom header pattern)

**Veterans Page:**

- Veterans Benefits sections ✅
- Annual Fishing Event section ✅
- Partnership Opportunities section ✅

**Section Component:**

- Updated Section component ✅ (now includes diagonal stripe pattern and large color blobs by default)

### 🔄 Pending Migration

**Specialized Pages (Acceptable Variations):**

- **Public Sector** - Under construction flag active, intentional deviation acceptable
- **Urgent** - Emergency page with intentional orange branding for urgent situations
- **Service Area Sections** - Gradient backgrounds acceptable for visual distinction in showcase sections

### ✅ ALL CUSTOMER-FACING PAGES NOW COMPLIANT

---

## 📝 Notes

- This standardization was established December 15, 2025
- All new sections must follow this pattern
- **SYSTEMATIC UPDATE COMPLETED:** December 18, 2025 - All customer-facing pages now comply
- **Pages Updated:** Home, About, Projects, Services, Contact, Careers, FAQ, Allies, Team, Veterans
- **Total Sections Standardized:** 50+ sections across 10 pages
- Breaking changes from previous patterns are intentional for consistency
- Documentation supersedes all previous section styling guidelines

---

**Questions or Issues?** Contact the development team or refer to the branding documentation index.
