# CTA & Link Validation Guide for MH Construction Website

## Overview

This guide provides comprehensive information about validating and maintaining all Call-to-Action (CTA) buttons
and links across the MH Construction website.

## Current Issues Found (Nov 3, 2025)

### 🔴 Critical Issues

1. **Broken Internal Links**
   - `/portfolio` - Referenced in `src/app/page.tsx:1494` but page doesn't exist
   - `/blog` - Referenced in `src/app/page.tsx:1395` but page doesn't exist
   - `/news` - Referenced in `src/app/page.tsx:1411` but page doesn't exist

   **Action Required**: Either create these pages or remove/redirect the links

### 🟡 Warnings

1. **Phone Number Pattern Inconsistency**
   - Should consistently use: `tel:+15093086489`
   - Some locations may use different formats

2. **Email Address Inconsistency**
   - Standard email: `office@mhc-gc.com`
   - Found specialist emails in VeteranSpecialistCard that differ
   - **Location**: `src/components/veteran/VeteranSpecialistCard.tsx:139`

3. **Physical Address Variations**
   - Standard format: `3111 N. Capital Ave., Pasco, WA 99301`
   - Found variations without periods in abbreviations
   - **Locations**:
     - `src/components/map/InteractiveMap.tsx:124`
     - `src/app/contact/page.tsx:44`
     - `src/app/contact/page.tsx:1043`

4. **Navigation Pattern Anti-patterns**
   - Found 4 instances of `onClick={() => window.location.href = ...}`
   - Should use Next.js `<Link>` component for better performance
   - **Locations**:
     - `src/components/recommendations/SmartRecommendations.tsx:536`
     - `src/components/map/InteractiveMap.tsx:320`
     - `src/components/ui/modals/QuickBookingModal.tsx:305`
     - `src/app/page.tsx` (2 instances)

## Valid Routes & Pages

All the following routes are active and functional:

| Route | Page Location | Status |
|-------|--------------|--------|
| `/` | `src/app/page.tsx` | ✅ Active |
| `/about` | `src/app/about/page.tsx` | ✅ Active |
| `/services` | `src/app/services/page.tsx` | ✅ Active |
| `/projects` | `src/app/projects/page.tsx` | ✅ Active |
| `/team` | `src/app/team/page.tsx` | ✅ Active |
| `/government` | `src/app/government/page.tsx` | ✅ Active |
| `/trade-partners` | `src/app/trade-partners/page.tsx` | ✅ Active |
| `/careers` | `src/app/careers/page.tsx` | ✅ Active |
| `/contact` | `src/app/contact/page.tsx` | ✅ Active |
| `/booking` | `src/app/booking/page.tsx` | ✅ Active |
| `/estimator` | `src/app/estimator/page.tsx` | ✅ Active |
| `/testimonials` | `src/app/testimonials/page.tsx` | ✅ Active |

## Contact Information Standards

### Phone Number

- **Format**: `tel:+15093086489`
- **Display**: `(509) 308-6489`
- **Usage**:

  ```tsx
  <a href="tel:+15093086489">(509) 308-6489</a>
  ```

### Email Address

- **Primary**: `office@mhc-gc.com`
- **Format**: `mailto:office@mhc-gc.com`
- **Usage**:

  ```tsx
  <a href="mailto:office@mhc-gc.com">office@mhc-gc.com</a>
  ```

### Physical Address

- **Standard Format**: `3111 N. Capital Ave., Pasco, WA 99301`
- **Google Maps URL**: `https://maps.google.com/?q=3111+N.+Capital+Ave.+Pasco+WA+99301`

## Social Media Links

All social media links are properly configured:

| Platform | URL | Occurrences |
|----------|-----|-------------|
| Facebook | `https://facebook.com/mhconstruction` | 4 |
| Instagram | `https://instagram.com/mhconstruction` | 4 |
| X (Twitter) | `https://x.com/mhconstruction` | 2 |
| YouTube | `https://youtube.com/@mhconstruction` | 3 |
| LinkedIn | `https://linkedin.com/company/mhconstruction` | 4 |

## CTA Distribution Analysis

Current CTA distribution across the site:

- **Contact CTAs**: 7 occurrences
- **Booking CTAs**: 5 occurrences
- **Estimator CTAs**: 2 occurrences

### Recommended CTA Placement

1. **Homepage**: Primary CTA to booking/contact, secondary to estimator
2. **Services Pages**: Contact and project-specific CTAs
3. **About/Team**: Career and contact CTAs
4. **Projects**: Contact for similar projects
5. **Government**: Specialized contact for government projects

## Best Practices for CTAs

### 1. Use Next.js Link Component

✅ **Correct Pattern**:

```tsx
import Link from "next/link";

<Link href="/contact">
  <Button variant="primary" size="lg">
    <MaterialIcon icon="phone" className="mr-2" size="md" />
    Contact Us
  </Button>
</Link>
```

❌ **Avoid**:

```tsx
<Button onClick={() => window.location.href = "/contact"}>
  Contact Us
</Button>
```

### 2. External Links with Security

```tsx
<a
  href="https://facebook.com/mhconstruction"
  target="_blank"
  rel="noopener noreferrer"
>
  Follow Us
</a>
```

### 3. Tel and Mailto Links

```tsx
{/* Phone Link */}
<a 
  href="tel:+15093086489"
  className="text-brand-primary hover:text-brand-accent"
>
  (509) 308-6489
</a>

{/* Email Link */}
<a 
  href="mailto:office@mhc-gc.com"
  className="text-brand-primary hover:text-brand-accent"
>
  office@mhc-gc.com
</a>
```

### 4. Button Component with MaterialIcon

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-2" size="md" />
  Schedule Consultation
</Button>
```

## Validation Script Usage

### Running the Validation Script

```bash
# Make executable (first time only)
chmod +x scripts/validation/validate-ctas.sh

# Run validation
./scripts/validation/validate-ctas.sh
```

### What the Script Checks

1. ✅ All internal page routes exist
2. ✅ No broken internal links
3. ✅ Contact information consistency
4. ✅ External link formats
5. ✅ Button usage patterns
6. ✅ CTA distribution
7. ✅ Social media links

### Interpreting Results

- **Green ✓**: Check passed
- **Yellow ⚠**: Warning (should investigate)
- **Red ✗**: Critical issue (must fix)

## Common Issues & Solutions

### Issue 1: Link to Non-Existent Page

**Problem**: `<Link href="/portfolio">` but `/portfolio` page doesn't exist

**Solutions**:

1. Create the page: `src/app/portfolio/page.tsx`
2. Redirect to existing page: Change to `/projects`
3. Remove the link if not needed

### Issue 2: Inconsistent Contact Info

**Problem**: Different formats for phone/email/address

**Solution**: Use constants from a central config:

```tsx
// src/lib/constants.ts
export const CONTACT_INFO = {
  phone: {
    raw: "+15093086489",
    display: "(509) 308-6489",
    href: "tel:+15093086489"
  },
  email: {
    primary: "office@mhc-gc.com",
    href: "mailto:office@mhc-gc.com"
  },
  address: {
    full: "3111 N. Capital Ave., Pasco, WA 99301",
    googleMaps: "https://maps.google.com/?q=3111+N.+Capital+Ave.+Pasco+WA+99301"
  }
};
```

### Issue 3: Using onClick Instead of Link

**Problem**: Performance impact and loss of Next.js benefits

**Solution**: Refactor to use Next.js Link component as shown in Best Practices section

## Maintenance Checklist

### Before Each Deployment

- [ ] Run `./scripts/validation/validate-ctas.sh`
- [ ] Fix all critical (red) issues
- [ ] Review and address warnings
- [ ] Test all CTAs manually on key pages
- [ ] Verify phone/email links on mobile device
- [ ] Check social media links open correctly

### Monthly Review

- [ ] Audit CTA conversion rates
- [ ] Review CTA placement effectiveness
- [ ] Update outdated CTAs
- [ ] Verify all contact information is current
- [ ] Test all external links still work

### After Adding New Pages

- [ ] Add route to validation script if needed
- [ ] Ensure page has appropriate CTAs
- [ ] Update navigation components
- [ ] Run validation script
- [ ] Update this documentation

## Tools & Resources

### Validation Script

- **Location**: `scripts/validation/validate-ctas.sh`
- **Purpose**: Automated CTA and link validation
- **Frequency**: Run before each deployment

### Related Documentation

- [Button System](/docs/technical/design-system/buttons/button-system.md)
- [MH Branding Guide](/docs/business/mh-branding.md)
- [Navigation Configuration](/docs/navigation.md)

### Component References

- Button: `src/components/ui/base/button.tsx`
- MaterialIcon: `src/components/icons/MaterialIcon.tsx`
- Navigation: `src/components/layout/Navigation.tsx`
- Footer: `src/components/layout/Footer.tsx`

## Quick Fix Priority List

Based on current validation results:

### Priority 1 (Critical - Fix Immediately)

1. Fix or remove broken links to `/portfolio`, `/blog`, `/news`

### Priority 2 (High - Fix Soon)

1. Standardize phone number format across all files
2. Standardize physical address format
3. Convert onClick window.location.href to Next.js Link

### Priority 3 (Medium - Address in Next Sprint)

1. Create contact info constants file
2. Refactor all contact info to use constants
3. Add automated tests for CTAs

## Contact

For questions about CTA validation or this guide:

- **Email**: <office@mhc-gc.com>
- **Phone**: (509) 308-6489

---

*Last Updated: November 3, 2025*
*Version: 1.0*
