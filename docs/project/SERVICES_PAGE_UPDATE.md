# Services Page Update - October 2025

## Overview

Comprehensive update to the Services page and SERVICES.md documentation to reflect new messaging, enhanced service descriptions, and improved content hierarchy.

---

## Changes Made

### 1. Documentation Update (`docs/business/SERVICES.md`)

#### Core Services Section (Expanded from 4 to 5 services)

**New First Service:**

- **Commercial Construction Management**
  - Headline: "Streamline Your Project Success with Construction Management in the Tri-Cities"
  - Focus on expert oversight and client experience
  - Lists 5 key business types served
  - Includes CTA: Call (509) 308-6489

**Updated Services (now 2-5):**

1. **Master Planning (Pre-Construction)**
   - Updated headline: "Unlock Your Building's Potential"
   - Emphasis on preventing scope creep
   - Lists 5 key planning considerations

2. **Procurement & Vendor Management**
   - Updated headline: "Reliable Construction Material Procurement"
   - Focus on long lead item management
   - 6 key service provisions

3. **Constructability & Budget Control**
   - Updated headline: "Constructability Review and Proactive Budget Control Services"
   - Emphasis on collaboration with subcontractors
   - 3 key determination factors

4. **Modularization**
   - Headline: "Project Modularization: Advanced Subproject Management"
   - "Ushering in a New Era of Project Management"
   - Focus on phase specialists vs. single PM

#### Specialty Services Section (Reorganized)

**New Structure:**

1. **Markets** - Comprehensive overview
   - 6 diverse market segments
   - Emphasis on 150+ years experience

2. **Tenant Improvements**
   - Updated with urgency language
   - Includes CTA for immediate scheduling

3. **Commercial New Build-Outs**
   - "Build Your Business Right" messaging
   - Lists 5 specific construction types
   - Emphasis on top-grade materials

4. **Light Industrial**
   - "Functional & Safe" emphasis
   - 13+ years experience highlighted
   - 5 high-quality material features

5. **Religious Facilities**
   - New dedicated section
   - Thoughtful design emphasis
   - Community respect focus

---

## 2. Services Page Component Update (`src/app/services/page.tsx`)

### Core Services Array (`coreServices`)

**Added as First Service:**

```typescript
{
  iconName: 'engineering',
  title: 'Commercial Construction Management',
  subtitle: 'Streamline Your Project Success',
  description: '...',
  features: [5 business types],
  benefits: [3 key benefits],
  ctaText: 'Call (509) 308-6489 today...'
}
```text

**Updated Existing Services:**

- Master Planning - Updated description and benefits
- Procurement & Vendor Management - Enhanced subtitle and features
- Constructability & Budget Control - New subtitle and refined focus
- Modularization - Updated benefits to emphasize new era of PM

**New Feature:**

- Added `ctaText` support in core services cards
- Displays in blue-bordered callout box
- Only shows for services with CTA text

### Specialty Services Array (`specialtyServices`)

**Completely Restructured:**

Previously: `projectTypes` (6 items)
Now: `specialtyServices` (5 items with rich metadata)

**New Data Structure:**

```typescript
{
  iconName: string,
  title: string,
  subtitle: string,
  description: string,
  markets?: string[],          // For Markets section
  capabilities?: string[],     // For TI and Religious
  buildTypes?: string[],       // For New Build-Outs
  features?: string[],         // For Light Industrial
  note?: string,               // Additional context
  ctaText?: string            // Call to action
}
```text

**Enhanced Rendering:**

- Conditional rendering based on data structure
- Different icon styles for different list types
- Support for notes and CTAs
- More descriptive subtitles

### Hero/Top Section Updates

**Updated Content:**

- New focus on "Planning a new commercial building"
- "Our Priority" messaging vs. "Key Focus"
- Added prominent CTA button with phone number
- Link to /contact page

---

## Key Messaging Changes

### Emphasis Shifts

**From → To:**

- "Transform your vision" → "Planning demands expert oversight"
- "Unlock potential" → "Prevent scope creep and changes"
- "Eliminate bottlenecks" → "Proactive long lead item management"
- "Feasible and cost-effective" → "Collaboration makes it possible"
- "Reduce complexity" → "New era of project management"

### New CTAs Added

1. **Commercial CM:** "Call (509) 308-6489 today to take the first step toward your new building construction."
2. **Tenant Improvements:** "Call us right away to schedule tenant improvement services."
3. **Hero Section:** Prominent button linking to contact page

### Industry Experience Callouts

- **150+ years** combined construction experience (emphasized throughout)
- **13+ years** light industrial construction services
- **Decades** of tenant improvement experience

---

## Component Structure

### Core Services Section

- 2-column grid on medium+ screens
- Large service cards with hover effects
- Segmented information:
  - Icon + Title + Subtitle
  - Description
  - "What's Included" features list (green checkmarks)
  - "Benefits" list (blue stars)
  - CTA callout (when applicable)

### Specialty Services Section

- 3-column grid on large screens
- 2-column on medium screens
- Flexible rendering based on data:
  - Markets list (green checkmarks)
  - Build Types list (blue arrows)
  - Features list (blue verified icons)
  - Capabilities list (blue arrows)
  - Notes (italic, small text, top border)
  - CTAs (blue bordered callout)

---

## SEO & Content Improvements

### Keywords Enhanced

- "Tri-Cities" mentioned in every major section
- "Washington, Oregon, Idaho" consistently referenced
- Specific cities: Pasco, Kennewick, Richland
- Industry terms: Construction Management, Master Planning, Procurement

### Local Focus

- Headquarters: Pasco, WA (emphasized)
- Service Area: Tri-Cities + Pacific Northwest
- Phone number prominently featured: (509) 308-6489

### Service Specificity

- Clear service categorization (5 core + 5 specialty)
- Specific business types served
- Measurable experience claims
- Concrete deliverables and benefits

---

## Technical Implementation

### TypeScript Safety

- All components properly typed
- No TypeScript errors
- Conditional rendering safely handled

### Animations

- FadeInWhenVisible for hero sections
- StaggeredFadeIn for service grids
- HoverScale effects on cards

### Responsive Design

- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3 columns (specialty services)
- Desktop: 2 columns (core services)

---

## Files Modified

1. `/workspaces/mh-website/docs/business/SERVICES.md`
   - Complete content reorganization
   - 5 core services (was 4)
   - 5 specialty services with enhanced descriptions

2. `/workspaces/mh-website/src/app/services/page.tsx`
   - Updated `coreServices` array (5 items)
   - New `specialtyServices` array (replaces `projectTypes`)
   - Enhanced hero section with CTA button
   - Conditional rendering for flexible content display
   - CTA support added to service cards

---

## Next Steps (Recommended)

### Content Enhancements

1. Add actual project images to specialty service cards
2. Consider adding client testimonials per service type
3. Create service-specific landing pages (e.g., `/services/master-planning`)

### Integration

1. Update main navigation to highlight services
2. Link from homepage hero to specific services
3. Add "Related Services" cross-links between pages

### Analytics

1. Track CTA button clicks
2. Monitor time on page
3. Track scroll depth to specialty services section

### SEO

1. Update metadata.ts with new keywords
2. Add structured data for services (Schema.org)
3. Create service-specific blog content

---

## Notes

- All changes maintain existing design system
- No breaking changes to components or imports
- Fully responsive and accessible
- Performance optimized with lazy loading animations

**Last Updated:** October 2, 2025
**Updated By:** Development Team
**Status:** ✅ Complete - Ready for Production
