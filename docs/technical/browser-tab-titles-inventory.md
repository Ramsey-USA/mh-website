# Browser Tab Titles - Dual Military/Construction Messaging

## Complete Site Title Inventory - Updated December 27, 2025

All browser tab titles now consistently use the dual military → construction
messaging format, honoring our veteran heritage while maintaining civilian
accessibility.

---

## 🏠 Core Navigation Pages

### Home

**Title:** `Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction`
**Format:** Military term → Civilian term | Brand promise | Company
**Location:** `/src/app/layout.tsx` (default title)

### About

**Title:** `Our Oath → About Us | Service-Earned Values, Battle-Tested Excellence | MH Construction`
**Format:** Military term → Civilian term | Value proposition | Company
**Location:** `/src/lib/seo/page-seo-utils.ts` (getAboutSEO)

### Services

**Title:** `Operations → Services | The Battle Plan - Mission-Ready Construction Excellence | MH Construction`
**Format:** Military term → Civilian term | Tagline | Company
**Location:** `/src/app/services/metadata.ts`

### Projects

**Title:** `Missions → Projects | Mission Success: 650+ Completed Operations | MH Construction`
**Format:** Military term → Civilian term | Achievement | Company
**Location:** `/src/app/projects/metadata.ts`

### Team

**Title:** `Chain of Command → Our Team | 150+ Years Combined Military-Grade Expertise | MH Construction`
**Format:** Military term → Civilian term | Expertise | Company
**Location:** `/src/app/team/metadata.ts`

### Contact

**Title:** `Rally Point → Contact | Your Project. Our Expertise. Let's Connect. | MH Construction`
**Format:** Military term → Civilian term | Value proposition | Company
**Location:** `/src/app/contact/metadata.ts`

---

## 🎖️ Veteran & Specialty Pages

### Veterans

**Title:** `Allied Forces → Veterans | Combat Veteran Discount, Year-Round Support | MH Construction`
**Format:** Military term → Civilian term | Key benefits | Company
**Location:** `/src/app/veterans/page.tsx`

### Public Sector

**Title:** `Public Sector → Government | Veteran-Owned Excellence for Government Operations | MH Construction`
**Format:** Dual term → Specific term | Specialization | Company
**Location:** `/src/app/public-sector/metadata.ts`

### Careers

**Title:** `Enlist → Careers | Build Your Future - Join the Mission | MH Construction`
**Format:** Military term → Civilian term | Call to action | Company
**Location:** `/src/app/careers/metadata.ts`

### Partners

**Title:** `Allies → Partners | Strategic Partnerships Built on Trust, Performance, and Mutual Success | MH Construction`
**Format:** Military term → Civilian term | Partnership values | Company
**Location:** `/src/app/allies/metadata.ts`

---

## 📍 Location Pages

### Format Template

**Title:** `Operations Base → [City] | General Contractor [State] | MH Construction`
**or** `Outpost [City] → [City] Construction | General Contractor [State] | MH Construction`

### Implemented Locations

- **Richland:** `Operations Base → Richland | General Contractor Richland WA | MH Construction`
- **Pasco:** `Operations Base → Pasco | General Contractor Pasco WA | MH Construction`
- **Kennewick:** `Forward Operating Base → Kennewick | General Contractor Kennewick WA | MH Construction`
- **Yakima:** `Forward Operating Base → Yakima | General Contractor Yakima WA | MH Construction`
- **Spokane:** `Forward Operating Base → Spokane | General Contractor Spokane WA | MH Construction`
- **Walla Walla:** `Forward Operating Base → Walla Walla | General Contractor Walla Walla WA | MH Construction`
- **West Richland:** `Operations Base → West Richland | General Contractor West Richland WA | MH Construction`

**Location:** `/src/lib/data/locations.ts` (location data with `militaryTitle` field)

---

## 📞 Support & Information Pages

### FAQ

**Title:** `Intel Brief → FAQ | Direct Answers. Clear Guidance. Mission-Ready Information. | MH Construction`
**Format:** Military term → Civilian term | Value proposition | Company
**Location:** `/src/lib/seo/page-seo-utils.ts` (getFAQSEO)

### Testimonials/Reviews

**Title:** `Commendations → Reviews | After-Action Reports: Verified Success Stories | MH Construction`
**Format:** Military term → Civilian term | Content type | Company
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

### Dual-Label Format

All main content pages use the format:

```text
[Military Term] → [Civilian Term] | [Value Proposition/Tagline] | MH Construction
```

### Military Terms Used

- **Base HQ** - Home/Headquarters
- **Operations** - Services
- **Missions** - Projects
- **Chain of Command** - Team structure
- **Rally Point** - Contact/Meeting point
- **Allied Forces** - Veterans
- **Allies** - Partners
- **Enlist** - Careers/Join
- **Operations Base / Forward Operating Base / Outpost** - Location designations
- **Intel Brief** - Information/FAQ
- **Commendations** - Reviews/Testimonials
- **Public Sector** - Government (already dual-use term)

### Key Descriptors

- **Service-Earned Values**
- **Battle-Tested Excellence**
- **Mission-Ready**
- **Military Precision**
- **Operational Excellence**
- **150+ Years Combined Military-Grade Expertise**
- **650+ Completed Operations/Missions**
- **Combat Veteran Discount**

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
- Tri-Cities / Pacific Northwest
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
  title: "Military Term → Civilian Term | Value Prop | MH Construction",
  description: "Military Term → Civilian Term: Expanded description...",
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

---

Last Updated: December 27, 2025
Status: ✅ Complete - All main content pages updated
