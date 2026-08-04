# Browser Tab Titles — Construction-First Messaging

**Category:** Technical - SEO Metadata Inventory  
**Last Updated:** April 18, 2026  
**Status:** ✅ Historical Reference - verify against current metadata implementation before using as a canonical source

## Complete Site Title Inventory — Updated April 8, 2026

All browser tab titles should consistently use construction-first messaging,
with veteran heritage preserved as supporting context while maintaining clear,
civilian-accessible language.

---

## 🏠 Core Navigation Pages

### Home

**Title:** Generated in homepage metadata via the construction-first page title helper + services qualifier + company name
**Format:** Construction-first surface term | service qualifier | Company
**Location:** `/apps/website/src/app/page.tsx` (route metadata)

### About

**Title:** `About Us | Service-Earned Values and Trusted Construction Leadership | MH Construction`
**Format:** Civilian term | Value proposition | Company
**Location:** `/src/lib/seo/page-seo-utils.ts` (getAboutSEO)

### Services

**Title:** `Services | Mission-Ready Construction Excellence | MH Construction`
**Format:** Civilian term | Tagline | Company
**Location:** `/src/app/services/metadata.ts`

### Projects

**Title:** `Projects | 650+ Completed Projects Across the Pacific Northwest | MH Construction`
**Format:** Civilian term | Achievement | Company
**Location:** `/src/app/projects/metadata.ts`

### Team

**Title:** `Our Team | Experienced Construction Leadership | MH Construction`
**Format:** Civilian term | Expertise | Company
**Location:** `/src/app/team/metadata.ts`

### Contact

**Title:** `Contact | Your Project. Our Expertise. Let's Connect. | MH Construction`
**Format:** Civilian term | Value proposition | Company
**Location:** `/src/app/contact/metadata.ts`

---

## 🎖️ Veteran & Specialty Pages

### Veterans

**Title:** `Veterans | Year-Round Support for Those Who Served | MH Construction`
**Format:** Civilian term | Key benefits | Company
**Location:** `/src/app/veterans/page.tsx`

### Public Sector

**Title:** `Government | Veteran-Owned Construction Support for Public Projects | MH Construction`
**Format:** Civilian term | Specialization | Company
**Location:** `/src/app/public-sector/metadata.ts`

### Careers

**Title:** `Careers | Build Your Future With MH Construction | MH Construction`
**Format:** Civilian term | Call to action | Company
**Location:** `/src/app/careers/metadata.ts`

### Partners

**Title:** `Partners | Strategic Partnerships Built on Trust and Performance | MH Construction`
**Format:** Civilian term | Partnership values | Company
**Location:** `/src/app/allies/metadata.ts`

---

## 📚 Resources Pages

### Resources Hub

**Title:** `Field Resources | MH Construction`
**Format:** Plain-language label | Company
**Location:** `/src/app/resources/page.tsx`

### Safety Manual

**Title:** (inherits Resources Hub metadata)
**Location:** `/src/app/resources/safety-manual/page.tsx`

### Safety Program

**Title:** (inherits Resources Hub metadata)
**Location:** `/src/app/resources/safety-program/page.tsx`

---

## 📍 Location Pages

### Format Template

**Title:** `[City] Construction | General Contractor [State] | MH Construction`
**or** `General Contractor [City] WA | MH Construction`

### Implemented Locations

- **Richland:** `Richland Construction | General Contractor Richland WA | MH Construction`
- **Pasco:** `Pasco Construction | General Contractor Pasco WA | MH Construction`
- **Kennewick:** `Kennewick Construction | General Contractor Kennewick WA | MH Construction`
- **Yakima:** `Yakima Construction | General Contractor Yakima WA | MH Construction`
- **Spokane:** `Spokane Construction | General Contractor Spokane WA | MH Construction`
- **Walla Walla:** `Walla Walla Construction | General Contractor Walla Walla WA | MH Construction`
- **West Richland:** `West Richland Construction | General Contractor West Richland WA | MH Construction`

**Location:** `/src/lib/data/locations.ts` (location data with `militaryTitle` field)

---

## 📞 Support & Information Pages

### FAQ

**Title:** `FAQ | Direct Answers. Clear Guidance. Mission-Ready Information. | MH Construction`
**Format:** Civilian term | Value proposition | Company
**Location:** `/src/lib/seo/page-seo-utils.ts` (getFAQSEO)

### Testimonials/Reviews

**Title:** `Reviews | Verified Success Stories | MH Construction`
**Format:** Civilian term | Content type | Company
**Location:** `/src/app/testimonials/page.tsx`

---

## 📄 Legal & Policy Pages

**Note:** These pages intentionally use straightforward titles without military
terminology, as they are legal documents that should be clear and accessible.

### Privacy Policy

**Title:** `Privacy Policy | MH Construction, Inc.`
**Location:** `/src/app/privacy/page.tsx`

### Terms of Service

**Title:** `Terms of Service | MH Construction, Inc.`
**Location:** `/src/app/terms/page.tsx`

### Accessibility Statement

**Title:** `Accessibility Statement | MH Construction, Inc.`
**Location:** `/src/app/accessibility/page.tsx`

---

## 🎯 Messaging Guidelines Applied

### Primary Format

All main content pages should use the format:

```text
[Construction or service term] | [Value Proposition/Tagline] | MH Construction
```

### Military Terms Used

- **Home** - Home/Headquarters
- **Services** - Services
- **Projects** - Projects
- **Team** - Team structure
- **Contact** - Contact/Meeting point
- **Veterans** - Veterans
- **Partners** - Partners
- **Careers** - Careers/Join
- **Location terms** - Location designations
- **FAQ** - Information/FAQ
- **Reviews** - Reviews/Testimonials
- **Public Sector** - Government (already dual-use term)

### Key Descriptors

- **Built on Quality, Backed by Trust.**
- **Service-Earned Values**
- **Construction-First Messaging**
- **Mission-Ready**
- **Operational Excellence**
- **Veteran-Owned Since January 2025**
- **650+ Completed Projects**
- **Year-Round Veteran Support**

---

## 📊 SEO Optimization

### Title Structure

1. **Dual-label term** (Unique, memorable, brand-aligned)
2. **Primary keyword phrase** (SEO-targeted)
3. **Company name** (Brand recognition)

### Length

- Target: 50-60 characters
- Maximum: 70 characters (Google's display limit)
- All titles optimized within this range

### Keywords Integrated

- Veteran-owned
- Military precision
- Service-earned values
- Tri-Cities HQ / Tri-State Pacific Northwest
- General contractor / Construction
- Specific location names
- Specific service terms

---

## 🔧 Technical Implementation

### File Locations

- **Root Layout:** `/src/app/layout.tsx` (default title + template)
- **Page Metadata Files:** `/src/app/[page]/metadata.ts`
- **Page Component:** `/src/app/[page]/page.tsx` (inline metadata)
- **SEO Utilities:** `/src/lib/seo/page-seo-utils.ts` (reusable SEO functions)
- **Location Data:** `/src/lib/data/locations.ts` (centralized location SEO)

### Template Pattern

```typescript
export const metadata: Metadata = {
  title: "Construction Term | Value Prop | MH Construction",
  description: "Construction-first label: expanded description...",
  // ... other metadata
};
```

---

## ✅ Benefits Achieved

1. **Brand Consistency** - Every page reinforces dual-label messaging
2. **SEO Optimization** - Keywords naturally integrated
3. **Veteran Recognition** - Honors military heritage on every page
4. **Civilian Accessibility** - Clear civilian terminology always included
5. **Memorable** - Unique approach stands out in search results
6. **Scalable** - Clear pattern for future pages

---

## 📈 Next Steps (If Needed)

1. **Monitor Search Rankings** - Track keyword performance
2. **A/B Test Titles** - Experiment with variations if needed
3. **Add New Pages** - Apply same dual-label format
4. **Update OpenGraph** - Ensure social media titles match
5. **International** - Consider if dual-label translates well
