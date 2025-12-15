# Home Page Standardization - MH Branding Standard

**Date:** December 15, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active Standard - All Pages Must Comply

---

## 📋 Overview

The home page styling has been established as the **official MH Construction branding standard** for all website sections. This standardization ensures visual consistency, simplified maintenance, and professional presentation across the entire site.

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

### 2. SectionHeader Component (REQUIRED)

All section headers MUST use the standardized SectionHeader component:

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";

<SectionHeader
  icon="icon_name"
  iconVariant="primary" // primary | secondary | bronze
  subtitle="Section Subtitle"
  title="Section Title"
  description="Optional description text"
/>;
```

**Icon Variant Usage:**

- `primary` (Green): Trust, values, integrity, safety, compliance
- `secondary` (Tan): Partnerships, relationships, community
- `bronze` (Gold): Awards, excellence, achievements

**Benefits:**

- Consistent styling and animations
- Proper responsive design
- Standardized icon glow effects
- Automatic dark mode support

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

**❌ DEPRECATED - DO NOT USE:**

```tsx
className = "text-brand-accent"; // Removed - inconsistent
className = "bg-brand-accent"; // Use brand-secondary
className = "from-brand-accent"; // Use brand-secondary in gradients
```

---

## 📐 Component Implementation Examples

### Standard Section with SectionHeader

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
        <SectionHeader
          icon="shield"
          iconVariant="primary"
          subtitle="Our Core"
          title="Values"
          description="Four foundational principles that guide every project and partnership."
        />

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

### OLD - Custom Headers (DEPRECATED)

```tsx
// ❌ DO NOT USE - Use SectionHeader component instead
<div className="text-center mb-12">
  <div className="flex justify-center items-center mb-6">
    <div className="relative">
      <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl">
        <MaterialIcon icon="shield" size="2xl" className="text-white" />
      </div>
    </div>
  </div>
  <h2 className="font-black text-5xl">
    <span className="block text-gray-700">Subtitle</span>
    <span className="block text-brand-primary">Title</span>
  </h2>
</div>
```

---

## ✅ Implementation Checklist

When creating or updating a page section:

- [ ] Base background is `bg-white dark:bg-gray-900`
- [ ] Padding is `py-12 sm:py-16 lg:py-20 xl:py-24`
- [ ] Diagonal stripe pattern included with correct opacity
- [ ] Two large color blobs (w-96 h-96) positioned correctly
- [ ] Using SectionHeader component (not custom header)
- [ ] Icon variant appropriate for content type
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

### ✅ Completed (December 15, 2025)

**Home Page:**

- CoreValuesSection
- ServicesShowcase
- WhyPartnerSection
- CompanyStats (Our Process section)

**About Page:**

- PartnershipPhilosophy
- AboutValues
- SafetySection
- AwardsSection
- LeadershipTeam
- CompanyStats
- Why Values Matter (inline section)
- News & Achievements (inline section)

### 🔄 Pending Migration

- Services page sections
- Projects page sections
- Contact page sections
- Careers page sections
- Public Sector page sections
- Veterans page sections
- Allies page sections

---

## 📝 Notes

- This standardization was established December 15, 2025
- All new sections must follow this pattern
- Existing sections should be migrated during regular updates
- Breaking changes from previous patterns are intentional for consistency
- Documentation supersedes all previous section styling guidelines

---

**Questions or Issues?** Contact the development team or refer to the branding documentation index.
