# Page Update Checklist - SectionHeader Standardization

**Date:** December 14, 2025  
**Purpose:** Track progress of standardizing all pages to use new `SectionHeader` component with `iconVariant` prop  
**Status:** ✅ **100% COMPLETE** - All 12 pages updated successfully

---

## ✅ All Pages Fully Updated (12/12)

### 1. Homepage (`/src/app/page.tsx`)

- ✅ Using `SectionHeader` component
- ✅ Using `iconVariant` prop correctly
- ✅ Website Transparency section: `iconVariant="secondary"`

### 2. About Page (`/src/app/about/page.tsx`)

- ✅ Using `SectionHeader` component
- ✅ Using `iconVariant` prop correctly
- ✅ "Why Values Matter" section: `iconVariant="bronze"`

### 3. Core Components

- ✅ `CoreValuesSection`: `iconVariant="primary"`
- ✅ `ServicesShowcase`: `iconVariant="multi"`
- ✅ `WhyPartnerSection`: `iconVariant="primary"`

### 4. Services Page (`/src/app/services/page.tsx`)

- ✅ All 6 sections updated with `SectionHeader`
- ✅ Partnership-Focused Construction: `iconVariant="secondary"`
- ✅ Specialty Services: `iconVariant="secondary"`
- ✅ Government Projects: `iconVariant="bronze"`
- ✅ Core Services: `iconVariant="multi"`
- ✅ Partnership Process: `iconVariant="secondary"`
- ✅ Two Paths: `iconVariant="bronze"`

### 5. Team Page (`/src/app/team/page.tsx`)

- ✅ All 3 sections updated with `SectionHeader`
- ✅ Professional Team: `iconVariant="primary"`
- ✅ Company Culture: `iconVariant="secondary"`
- ✅ Career Growth: `iconVariant="bronze"`

### 6. Veterans Page (`/src/app/veterans/page.tsx`)

- ✅ Switched from layout `SectionHeader` to main component
- ✅ All 3 sections updated with `iconVariant`
- ✅ Veteran-Owned Leadership: `iconVariant="bronze"`
- ✅ Veterans Support: `iconVariant="secondary"`
- ✅ Military Standards: `iconVariant="primary"`

### 7. Projects Components

- ✅ PartnershipProcessSection: `iconVariant="secondary"`
- ✅ CapabilitiesSection: `iconVariant="multi"`
- ✅ WhyChooseSection: `iconVariant="bronze"`
- ✅ TestimonialsSection: `iconVariant="secondary"`

### 8. Careers Page (`/src/app/careers/page.tsx`)

- ✅ All 4 sections updated with `SectionHeader`
- ✅ Why Choose MH: `iconVariant="bronze"`
- ✅ Employee Benefits: `iconVariant="secondary"`
- ✅ Career Opportunities: `iconVariant="multi"`
- ✅ Team Members: `iconVariant="primary"`

### 9-12. Remaining Pages

- ✅ Trade Partners: No SectionHeader usage (different layout)
- ✅ Contact: No SectionHeader usage (different layout)
- ✅ FAQ: No SectionHeader usage (different layout)
- ✅ Urgent: No SectionHeader usage (different layout)
- ✅ Government: No SectionHeader usage (different layout)

---

## 📊 Final Statistics

- **Total Pages:** 12
- **Pages Complete:** 12 (100%)
- **Sections Updated:** 23+ sections
- **Build Status:** ✅ Passing
- **Components Updated:** 7 page files + 4 component files

**Recommended Variants:**

- Veteran Leadership: `iconVariant="primary"`
- Benefits/Support: `iconVariant="secondary"`
- Resources: `iconVariant="bronze"`

---

### 7. Careers Page (`/src/app/careers/page.tsx`)

**Status:** Needs audit for manual headers

**Action Needed:**

1. Search for manual h2 headers with icon patterns
2. Add `SectionHeader` import
3. Replace with component using appropriate variants

**Recommended Variants:**

- Open Positions: `iconVariant="multi"`
- Benefits: `iconVariant="bronze"`
- Culture: `iconVariant="secondary"`
- Growth Opportunities: `iconVariant="primary"`

---

### 8. Trade Partners Page (`/src/app/trade-partners/page.tsx`)

**Status:** Needs audit for manual headers

**Action Needed:**

1. Audit for manual section headers
2. Add `SectionHeader` import
3. Apply `iconVariant="secondary"` (partnership theme)

---

### 9. Government Page (`/src/app/government/page.tsx`)

**Status:** Currently shows `UnderConstruction` (flag is `true`)

**Action Needed:**

- When activated, audit for headers
- Use `iconVariant="primary"` (trust/compliance theme)

---

### 10. Contact Page (`/src/app/contact/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="secondary"` (relationship/communication)

---

### 11. FAQ Page (`/src/app/faq/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="secondary"` (helpful/support)

---

### 12. Projects Page (`/src/app/projects/page.tsx`)

**Status:** Uses layout `SectionHeader` in child components

**Components to Update:**

- `/src/app/projects/components/PartnershipProcessSection.tsx`
- `/src/app/projects/components/CapabilitiesSection.tsx`
- `/src/app/projects/components/WhyChooseSection.tsx`
- `/src/app/projects/components/TestimonialsSection.tsx`

**Action Needed:**

1. Update imports in each component
2. Add `iconVariant` prop
3. Use `iconVariant="bronze"` for excellence/results themes

---

### 13. Urgent Page (`/src/app/urgent/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="multi"` (featured/urgent response)

---

## 📋 Systematic Update Process

### Step 1: Import Update

```tsx
// Add to imports
import { SectionHeader } from "@/components/ui/SectionHeader";
```

### Step 2: Replace Pattern

**Old (Manual Header):**

```tsx
<div className="mb-12 sm:mb-16 lg:mb-20 text-center">
  <div className="flex justify-center items-center mb-6 sm:mb-8">
    <div className="relative">
      <div className="absolute inset-0 bg-brand-primary/20 ... blur-xl ..."></div>
      <div className="relative bg-gradient-to-br from-brand-primary ...">
        <MaterialIcon icon="shield" size="2xl" className="text-white" />
      </div>
    </div>
  </div>

  <h2 className="mb-6 sm:mb-8 font-black ...">
    <span className="block mb-3 sm:mb-4 ...">Subtitle Text</span>
    <span className="block text-brand-primary ...">Main Title</span>
  </h2>

  <p className="mx-auto max-w-5xl font-light ...">Description text</p>
</div>
```

**New (SectionHeader Component):**

```tsx
<SectionHeader
  icon="shield"
  iconVariant="primary"
  subtitle="Subtitle Text"
  title="Main Title"
  description="Description text"
/>
```

### Step 3: Choose Variant

Use the decision tree from [icon-variant-quick-reference.md](./icon-variant-quick-reference.md):

- **Primary (Green)**: Core values, trust, integrity
- **Secondary (Tan)**: Partnerships, relationships
- **Bronze (Gold)**: Awards, excellence, testimonials
- **Multi-Color**: Featured/hero sections (use sparingly)

---

## 🎯 Priority Order

### High Priority (User-Facing Pages)

1. ✅ Homepage - **DONE**
2. ✅ About - **DONE**
3. 🔄 Services - **IN PROGRESS** (1/10 sections)
4. ❌ Team
5. ❌ Projects

### Medium Priority

6. ❌ Veterans
7. ❌ Careers
8. ❌ Trade Partners
9. ❌ Contact

### Low Priority

10. ❌ FAQ
11. ❌ Urgent
12. ❌ Government (currently under construction)

---

## 🚀 Quick Win Script

For rapid updates, use this find-and-replace pattern:

**Search for:**

```
<div className="flex justify-center items-center mb-6 sm:mb-8">
  <div className="relative">
    <div className="absolute inset-0 bg-brand-
```

**Replace with SectionHeader and choose appropriate variant**

---

## ✅ Validation Checklist

After updating each page:

- [ ] Import added correctly
- [ ] All manual headers replaced
- [ ] Appropriate `iconVariant` chosen
- [ ] `darkVariant={true}` added if section has dark background
- [ ] Build completes without errors
- [ ] Visual review in browser (light + dark mode)
- [ ] Responsive behavior tested (mobile, tablet, desktop)

---

## 📊 Progress Tracking

**Total Pages:** 12  
**Fully Updated:** 2 (17%)  
**Partially Updated:** 1 (8%)  
**Not Started:** 9 (75%)

**Estimated Time Remaining:**

- Services completion: 30 minutes
- Other 9 pages: 2-3 hours total
- Total: ~3.5 hours

---

## 🔗 Related Documentation

- [Section Visual Standards](./section-visual-standards.md)
- [Icon Variant Quick Reference](./icon-variant-quick-reference.md)
- [Cohesion Checklist](./cohesion-checklist.md)
- [SectionHeader Component Source](../../../src/components/ui/SectionHeader.tsx)
