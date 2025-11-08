# CTAs Complete Guide

**Last Updated:** November 6, 2025  
**Version:** 4.0.0  
**Status:** ✅ Active - Consolidated Reference

---

## 📋 Table of Contents

- [Mission & Purpose](#mission--purpose)
- [CTA Standards & Variants](#cta-standards--variants)
- [Service Type CTAs](#service-type-ctas)
- [Partnership Type CTAs](#partnership-type-ctas)
- [Contact Information Standards](#contact-information-standards)
- [Link & Navigation Rules](#link--navigation-rules)
- [Icon Reference](#icon-reference)
- [Implementation Examples](#implementation-examples)
- [Validation & Quality](#validation--quality)
- [Common Mistakes](#common-mistakes)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Mission & Purpose

This guide provides the **single source of truth** for all Call-to-Action (CTA) buttons, links, and navigation patterns
across the MH Construction website.

### Key Objectives

1. **Consistency**: All CTAs follow unified branding and messaging standards
2. **Clarity**: Service distinctions (AI vs IRL) and partnership types (Client vs Trade) are immediately clear
3. **Accessibility**: All CTAs meet WCAG AA standards for contrast, focus, and screen readers
4. **Performance**: Use Next.js Link component for optimal navigation and SEO

### When to Use CTAs

- **Primary Actions**: Schedule consultation, book site visit, begin partnership
- **Secondary Actions**: Get AI estimate, download resources, explore services
- **Navigation**: Internal page navigation, section anchors, related content
- **Contact**: Phone calls, email communications, location directions

---

## 🎨 CTA Standards & Variants

### Button Variant Quick Reference

| Variant       | Color                  | When to Use                                   | Example Text                 |
| ------------- | ---------------------- | --------------------------------------------- | ---------------------------- |
| **Primary**   | Hunter Green (#386851) | Main CTAs, IRL consultations, primary actions | "Schedule Free Consultation" |
| **Secondary** | Leather Tan (#BD9264)  | AI Estimator, supporting actions              | "Get Instant AI Estimate"    |
| **Outline**   | Transparent            | Subtle actions, navigation                    | "Learn More"                 |
| **Neutral**   | Theme-aware            | System actions, UI controls                   | "Back", "Cancel"             |

### CTA Text Standards

#### ✅ APPROVED CTA Phrases

**Client Actions:**

- Schedule Free Consultation
- Book Site Visit
- Request Project Review
- Discuss Your Vision
- Begin Partnership
- Meet with Expert

**Vendor Actions:**

- Apply to be Approved Vendor
- Join Trade Network
- Download Vendor Package
- Submit Vendor Application

**AI Estimator:**

- Get Instant AI Estimate
- Try AI Cost Calculator
- Calculate Project Cost

**Information:**

- Learn More About [Specific Topic]
- View Project Gallery
- Explore Our Services
- Download [Specific Resource]

#### ❌ DEPRECATED CTA Phrases (Do Not Use)

**Replace These:**

- ❌ "Contact Us" → ✅ "Schedule Free Consultation"
- ❌ "Get in Touch" → ✅ "Book Site Visit"
- ❌ "Reach Out" → ✅ "Meet with Expert"
- ❌ "Click Here" → ✅ Use descriptive text
- ❌ "Learn More" (alone) → ✅ "Learn More About [Topic]"
- ❌ "Submit" → ✅ "Request Free Consultation"

---

## 🤖 Service Type CTAs

### AI Estimator (Automated Self-Service)

**Button Variant:** Secondary  
**Icon:** `smart_toy`, `calculate`  
**Target Audience:** Self-service users seeking instant pricing

**Approved CTAs:**

- "Get Instant AI Estimate"
- "Try AI Cost Calculator"
- "Calculate Project Cost"
- "See Pricing Instantly"

**Markdown Format:**

```markdown
**AI Estimator:**

- **Get Instant AI Estimate** - Automated cost calculation (`smart_toy`)
```

**Component Format:**

```tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" className="mr-2" size="md" />
  Get Instant AI Estimate
</Button>
```

---

### IRL Consultation (In-Person Professional Service)

**Button Variant:** Primary  
**Icon:** `event`, `handshake`, `place`  
**Target Audience:** Clients seeking personalized consultation

**Approved CTAs:**

- "Schedule Free Consultation"
- "Book Site Visit"
- "Meet with Expert"
- "Request In-Person Estimate"

**Markdown Format:**

```markdown
**In-Person Consultation:**

- **Schedule Free Consultation** - Meet with our project specialists (`event`)
- **Book Site Visit** - Arrange an on-location assessment (`place`)
```

**Component Format:**

```tsx
<Link href="/booking">
  <Button variant="primary" size="lg">
    <MaterialIcon icon="event" className="mr-2" size="md" />
    Schedule Free Consultation
  </Button>
</Link>
```

---

## 🤝 Partnership Type CTAs

### Client Partnership (Project Collaborations)

**Icon:** `handshake`, `event`, `engineering`  
**Contact:** (509) 308-6489, <office@mhc-gc.com>

**Approved CTAs:**

- "Begin Partnership"
- "Discuss Your Vision"
- "Request Project Review"
- "Schedule Discovery Call"

**Markdown Format:**

```markdown
**Client Projects:**

- **Schedule Free Consultation** - Meet with our team (`event`)
- **Book Site Visit** - On-location assessment (`place`)

**Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

**Component Format:**

```tsx
<div className="space-y-4">
  <Link href="/booking">
    <Button variant="primary" size="lg" className="w-full">
      <MaterialIcon icon="handshake" className="mr-2" size="md" />
      Begin Partnership
    </Button>
  </Link>

  <div className="text-center">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      <a
        href="tel:+15093086489"
        className="text-brand-primary hover:text-brand-accent"
      >
        (509) 308-6489
      </a>
      {" | "}
      <a
        href="mailto:office@mhc-gc.com"
        className="text-brand-primary hover:text-brand-accent"
      >
        office@mhc-gc.com
      </a>
    </p>
  </div>
</div>
```

---

### Trade Partnership (Vendor/Subcontractor)

**Icon:** `construction`, `work`, `check_circle`  
**Contact:** (509) 308-6489, <office@mhc-gc.com>

**Approved CTAs:**

- "Apply to be Approved Vendor"
- "Join Trade Network"
- "Submit Vendor Application"
- "Download Vendor Package"

**Markdown Format:**

```markdown
**Vendor Partnerships:**

- **Apply to be Approved Vendor** - Join our network (`check_circle`)
- **Download Vendor Package** - Get requirements (`download`)

**Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

**Component Format:**

```tsx
<Link href="/trade-partners">
  <Button variant="primary" size="lg">
    <MaterialIcon icon="check_circle" className="mr-2" size="md" />
    Apply to be Approved Vendor
  </Button>
</Link>
```

---

## 📞 Contact Information Standards

### Phone Numbers

**Standard Format:** `tel:+15093086489`  
**Display Format:** `(509) 308-6489`

```markdown
✅ CORRECT:
[(509) 308-6489](tel:+15093086489)

❌ INCORRECT:
(509) 308-6489 # Not linked
Call us at (509) 308-6489 # Not linked
```

**Component Format:**

```tsx
<a
  href="tel:+15093086489"
  className="text-brand-primary hover:text-brand-accent transition-colors"
>
  (509) 308-6489
</a>
```

---

### Email Addresses

**Primary Email:** `office@mhc-gc.com`  
**Format:** `mailto:office@mhc-gc.com`

```markdown
✅ CORRECT:
[office@mhc-gc.com](mailto:office@mhc-gc.com)

❌ INCORRECT:
office@mhc-gc.com # Not linked
<office@mhc-gc.com> # Wrong format
```

**Component Format:**

```tsx
<a
  href="mailto:office@mhc-gc.com"
  className="text-brand-primary hover:text-brand-accent transition-colors"
>
  office@mhc-gc.com
</a>
```

---

### Physical Address

**Standard Format:** `3111 N. Capital Ave., Pasco, WA 99301`  
**Google Maps URL:** `https://maps.google.com/?q=3111+N.+Capital+Ave.+Pasco+WA+99301`

**Component Format:**

```tsx
<a
  href="https://maps.google.com/?q=3111+N.+Capital+Ave.+Pasco+WA+99301"
  target="_blank"
  rel="noopener noreferrer"
  className="text-brand-primary hover:text-brand-accent transition-colors"
>
  3111 N. Capital Ave., Pasco, WA 99301
</a>
```

---

### Social Media Links

| Platform    | URL                                                      |
| ----------- | -------------------------------------------------------- |
| Facebook    | `https://www.facebook.com/profile.php?id=61575511773974` |
| Instagram   | `https://www.instagram.com/mh_construction_inc/reels/`   |
| X (Twitter) | `https://x.com/mhconstruction`                           |
| YouTube     | `https://youtube.com/@mhconstruction`                    |
| LinkedIn    | `https://linkedin.com/company/mhconstruction`            |

**Component Format:**

```tsx
<a
  href="https://www.facebook.com/profile.php?id=61575511773974"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-600 hover:text-brand-primary dark:text-gray-400 dark:hover:text-bronze-400 transition-colors"
>
  <MaterialIcon icon="facebook" size="lg" />
</a>
```

---

## 🔗 Link & Navigation Rules

### Rule #1: Always Use Next.js Link Component for Internal Links

✅ **CORRECT:**

```tsx
import Link from "next/link";

<Link href="/about" className="...">
  About Us
</Link>;
```

❌ **INCORRECT:**

```tsx
<a href="/about">About Us</a>  // Don't use <a> for internal links
<Button onClick={() => window.location.href = "/about"}>  // Performance issue
```

---

### Rule #2: External Links Use Anchor Tags with Security

✅ **CORRECT:**

```tsx
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

---

### Rule #3: Anchor Links (Same Page & Cross-Page)

**Same-page section navigation:**

```tsx
<Link href="#section-id">Jump to Section</Link>
```

**Cross-page section navigation:**

```tsx
<Link href="/services#modularization">Services - Modularization</Link>
```

---

### Navigation System Architecture

#### Main Site Navigation

- **Component:** `/src/components/layout/Navigation.tsx`
- **Purpose:** Global site header navigation
- **Features:** Responsive menu, theme toggle, logo, main pages, social links

#### Page-Specific Navigation

- **Component:** `/src/components/navigation/PageNavigation.tsx`
- **Purpose:** Contextual navigation within pages
- **Usage:** Add below hero section

**Implementation:**

```tsx
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

<PageNavigation items={navigationConfigs.pageName} />;
```

#### Navigation Configuration

- **File:** `/src/components/navigation/navigationConfigs.ts`
- **Purpose:** Centralized configuration for all page navigation

```typescript
export const navigationConfigs = {
  pageName: [
    { href: "/path", label: "Label", icon: "material_icon_name" },
    { href: "/page#section", label: "Section", icon: "icon_name" },
  ],
};
```

---

## 🎨 Icon Reference

### Common CTA Icons

| CTA Type     | Icon Name      | Usage                 |
| ------------ | -------------- | --------------------- |
| Schedule     | `event`        | Consultation bookings |
| Location     | `place`        | Site visits           |
| Partnership  | `handshake`    | Client relationships  |
| Construction | `construction` | Vendor partnerships   |
| AI/Tech      | `smart_toy`    | AI estimator          |
| Calculate    | `calculate`    | Cost calculations     |
| Apply        | `check_circle` | Vendor applications   |
| Download     | `download`     | Resource downloads    |
| Contact      | `mail`         | Email communications  |
| Phone        | `phone`        | Phone contacts        |

### Icon Format in Markdown

```markdown
**Correct Format:**

- **CTA Text** - Description (`icon_name`)

**Example:**

- **Schedule Free Consultation** - Meet with our team (`event`)
```

### Icon Format in Components

```tsx
<MaterialIcon icon="event" className="mr-2" size="md" />
```

**Icon Sizes:**

- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 32px
- `xl`: 40px

---

## 💼 Implementation Examples

### Example 1: Client-Facing CTA Section

**Complete Section Template:**

```markdown
## Get Started Today

Ready to discuss your construction project? We offer two convenient options:

### In-Person Consultation

Schedule a personalized consultation with our experienced sales team for expert guidance and detailed planning.

**Client Services:**

- **Schedule Free Consultation** - Meet with our project specialists (`event`)
- **Book Site Visit** - Arrange an on-location assessment (`place`)
- **Request Project Review** - Submit your plans for expert analysis (`visibility`)

**Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)

### AI Cost Estimator

Get instant preliminary pricing with our automated cost estimation tool.

**AI Services:**

- **Get Instant AI Estimate** - Automated cost calculation (`smart_toy`)
- **Try AI Cost Calculator** - Quick preliminary pricing (`calculate`)

---

**Location:** Serving the Tri-Cities area (Richland, Kennewick, Pasco) and throughout Washington, Oregon, and Idaho
```

**Component Implementation:**

```tsx
<section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Get Started Today</h2>

    <div className="grid md:grid-cols-2 gap-8">
      {/* IRL Consultation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">In-Person Consultation</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Schedule a personalized consultation with our experienced sales team.
        </p>

        <div className="space-y-4">
          <Link href="/booking">
            <Button variant="primary" size="lg" className="w-full">
              <MaterialIcon icon="event" className="mr-2" size="md" />
              Schedule Free Consultation
            </Button>
          </Link>

          <Link href="/booking?type=site-visit">
            <Button variant="outline" size="lg" className="w-full">
              <MaterialIcon icon="place" className="mr-2" size="md" />
              Book Site Visit
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            <a
              href="tel:+15093086489"
              className="text-brand-primary hover:text-brand-accent"
            >
              (509) 308-6489
            </a>
            {" | "}
            <a
              href="mailto:office@mhc-gc.com"
              className="text-brand-primary hover:text-brand-accent"
            >
              office@mhc-gc.com
            </a>
          </p>
        </div>
      </div>

      {/* AI Estimator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">AI Cost Estimator</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get instant preliminary pricing with our automated tool.
        </p>

        <div className="space-y-4">
          <Link href="/estimator">
            <Button variant="secondary" size="lg" className="w-full">
              <MaterialIcon icon="smart_toy" className="mr-2" size="md" />
              Get Instant AI Estimate
            </Button>
          </Link>

          <Link href="/estimator">
            <Button variant="outline" size="lg" className="w-full">
              <MaterialIcon icon="calculate" className="mr-2" size="md" />
              Try AI Cost Calculator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### Example 2: Vendor-Facing CTA Section

**Markdown Template:**

```markdown
## Join Our Trade Partnership Network

Interested in becoming an approved vendor? We're always looking for qualified subcontractors and suppliers.

### Vendor Opportunities

**Trade Partnerships:**

- **Apply to be Approved Vendor** - Submit your application (`check_circle`)
- **Join Trade Network** - Partner with established contractor (`construction`)
- **Download Vendor Package** - Get requirements and materials (`download`)
- **Schedule Vendor Meeting** - Discuss business opportunities (`work`)

**Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)

### Requirements

- Valid business license and insurance
- Proven track record in construction industry
- Commitment to quality and professionalism
- Tri-Cities service area coverage
```

**Component Implementation:**

```tsx
<section className="py-16 px-4">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">
      Join Our Trade Partnership Network
    </h2>

    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Vendor Opportunities</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link href="/trade-partners#apply">
          <Button variant="primary" size="lg" className="w-full">
            <MaterialIcon icon="check_circle" className="mr-2" size="md" />
            Apply to be Approved Vendor
          </Button>
        </Link>

        <Link href="/trade-partners#download">
          <Button variant="outline" size="lg" className="w-full">
            <MaterialIcon icon="download" className="mr-2" size="md" />
            Download Vendor Package
          </Button>
        </Link>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400">
          <a
            href="tel:+15093086489"
            className="text-brand-primary hover:text-brand-accent"
          >
            (509) 308-6489
          </a>
          {" | "}
          <a
            href="mailto:office@mhc-gc.com"
            className="text-brand-primary hover:text-brand-accent"
          >
            office@mhc-gc.com
          </a>
        </p>
      </div>
    </div>
  </div>
</section>
```

---

### Example 3: Simple Contact Section (Before & After)

**BEFORE:**

```markdown
## Contact

For more information, contact us:
Phone: (509) 308-6489
Email: office@mhc-gc.com
```

**AFTER:**

```markdown
## Get Started Today

**Client Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)

**Vendor Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)

**General Inquiries:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Example 4: Navigation Link Enhancement

**BEFORE:**

```markdown
[Services](../business/services.md)
```

**AFTER:**

```markdown
[**Services Overview**](../business/services.md) - Complete service offerings and capabilities
```

---

## ✅ Validation & Quality

### Validation Checklist

Use this checklist when reviewing or creating markdown files:

- [ ] All CTAs use approved phrases from this guide
- [ ] Phone numbers include proper format: `tel:+15093086489`
- [ ] Email addresses are properly linked with `mailto:`
- [ ] MaterialIcon references are included for all CTAs
- [ ] Button variants are correctly assigned (primary/secondary/outline)
- [ ] Service distinctions are clear (AI vs IRL)
- [ ] Partnership distinctions are clear (Client vs Trade)
- [ ] No deprecated phrases (Contact Us, Click Here, etc.)
- [ ] Links use descriptive text, not generic labels
- [ ] Contact information matches the audience (client vs vendor)
- [ ] Internal links use Next.js `<Link>` component
- [ ] External links include `target="_blank"` and `rel="noopener noreferrer"`

---

### Automated Validation Script

**Location:** `scripts/validation/validate-ctas.sh`

**Running the Script:**

```bash
# Make executable (first time only)
chmod +x scripts/validation/validate-ctas.sh

# Run validation
./scripts/validation/validate-ctas.sh
```

**What the Script Checks:**

1. ✅ All internal page routes exist
2. ✅ No broken internal links
3. ✅ Contact information consistency
4. ✅ External link formats
5. ✅ Button usage patterns
6. ✅ CTA distribution
7. ✅ Social media links

**Interpreting Results:**

- **Green ✓**: Check passed
- **Yellow ⚠**: Warning (should investigate)
- **Red ✗**: Critical issue (must fix)

---

### Valid Routes & Pages

| Route             | Page Location                     | Status                         |
| ----------------- | --------------------------------- | ------------------------------ |
| `/`               | `src/app/page.tsx`                | ✅ Active                      |
| `/about`          | `src/app/about/page.tsx`          | ✅ Active                      |
| `/services`       | `src/app/services/page.tsx`       | ✅ Active                      |
| `/projects`       | `src/app/projects/page.tsx`       | ✅ Active                      |
| `/team`           | `src/app/team/page.tsx`           | ✅ Active                      |
| `/government`     | `src/app/government/page.tsx`     | ✅ Active                      |
| `/trade-partners` | `src/app/trade-partners/page.tsx` | ✅ Active                      |
| `/careers`        | `src/app/careers/page.tsx`        | ✅ Active                      |
| `/contact`        | `src/app/contact/page.tsx`        | ✅ Active                      |
| `/booking`        | `src/app/booking/page.tsx`        | ✅ Active                      |
| `/estimator`      | `src/app/estimator/page.tsx`      | ✅ Active                      |
| `/3d-explorer`    | `src/app/3d-explorer/page.tsx`    | ✅ Active (Under Construction) |

**Note:** `/testimonials` and `/blog` pages removed (Nov 3, 2025) - now implemented as reusable section components

---

## 🚫 Common Mistakes

### Mistake #1: Missing Extension Numbers

```markdown
❌ WRONG:
Call (509) 308-6489 for more information

✅ CORRECT:
**Client Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Mistake #2: Generic CTA Text

```markdown
❌ WRONG:
[Contact Us](#contact)

✅ CORRECT:

- **Schedule Free Consultation** - Meet with our specialists (`event`)
```

---

### Mistake #3: Missing Icon References

```markdown
❌ WRONG:

- Schedule Free Consultation

✅ CORRECT:

- **Schedule Free Consultation** - Meet with our team (`event`)
```

---

### Mistake #4: Wrong Button Variant

```markdown
❌ WRONG:
AI Estimator with Primary button variant

✅ CORRECT:
AI Estimator with Secondary button variant
IRL Consultation with Primary button variant
```

---

### Mistake #5: Bare URLs

```markdown
❌ WRONG:
Email: office@mhc-gc.com

✅ CORRECT:
Email: [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Mistake #6: Using onClick Instead of Link

```tsx
❌ WRONG:
<Button onClick={() => window.location.href = '/contact'}>
  Contact Us
</Button>

✅ CORRECT:
<Link href="/contact">
  <Button variant="primary" size="lg">
    <MaterialIcon icon="phone" className="mr-2" size="md" />
    Schedule Free Consultation
  </Button>
</Link>
```

---

### Mistake #7: Inconsistent Contact Information

```tsx
❌ WRONG:
Different formats across files:
- (509) 308-6489
- 509-308-6489
- tel:5093086489

✅ CORRECT:
Use constants from central config:
import { CONTACT_INFO } from '@/lib/constants';

<a href={CONTACT_INFO.phone.href}>
  {CONTACT_INFO.phone.display}
</a>
```

---

## 🔧 Troubleshooting

### Issue: Links Not Working

**Symptoms:**

- Clicking link does nothing
- 404 error on navigation
- Page refresh instead of smooth transition

**Solutions:**

1. **Verify Next.js Link Component:**

   ```tsx
   // ✅ Correct
   import Link from 'next/link';
   <Link href="/about">About</Link>

   // ❌ Wrong
   <a href="/about">About</a>
   ```

2. **Check href Format:**

   ```tsx
   // ✅ Correct
   href = "/services";
   href = "/services#modularization";

   // ❌ Wrong
   href = "/services/"; // Trailing slash
   href = "services"; // Missing leading slash
   ```

3. **Ensure Dev Server Running:**

   ```bash
   npm run dev
   ```

---

### Issue: Navigation Not Appearing

**Symptoms:**

- PageNavigation component doesn't render
- Navigation items missing
- Import errors

**Solutions:**

1. **Check Import Paths:**

   ```tsx
   // ✅ Correct
   import { PageNavigation } from "@/components/navigation/PageNavigation";
   import { navigationConfigs } from "@/components/navigation/navigationConfigs";

   // ❌ Wrong
   import { PageNavigation } from "@/components/PageNavigation";
   ```

2. **Verify Config Exists:**

   ```typescript
   // In navigationConfigs.ts
   export const navigationConfigs = {
     yourPage: [
       // Make sure this exists
       { href: "/", label: "Home", icon: "home" },
     ],
   };
   ```

3. **Ensure Component Rendered:**

   ```tsx
   <PageNavigation items={navigationConfigs.yourPage} />
   ```

---

### Issue: Styling Conflicts

**Symptoms:**

- CTA buttons don't match brand colors
- Hover effects not working
- Dark mode issues

**Solutions:**

1. **Check Tailwind Classes:**

   ```tsx
   // ✅ Correct - No duplicate classes
   className = "hover:text-brand-primary dark:hover:text-bronze-400";

   // ❌ Wrong - Conflicting classes
   className = "text-blue-500 text-red-600"; // Multiple color classes conflict
   ```

2. **Verify Dark Mode Classes:**

   ```tsx
   // ✅ Correct
   className = "bg-white dark:bg-gray-900";

   // ❌ Wrong - Missing dark mode
   className = "bg-white";
   ```

3. **Use Group for Hover Effects:**

   ```tsx
   <Link href="/about" className="group">
     <Button className="group-hover:scale-105">Learn More</Button>
   </Link>
   ```

---

### Issue: Contact Info Inconsistency

**Symptoms:**

- Different phone formats across pages
- Email addresses vary
- Address formatting inconsistent

**Solutions:**

1. **Create Constants File:**

   ```typescript
   // src/lib/constants.ts
   export const CONTACT_INFO = {
     phone: {
       raw: "+15093086489",
       display: "(509) 308-6489",
       href: "tel:+15093086489",
     },
     email: {
       primary: "office@mhc-gc.com",
       href: "mailto:office@mhc-gc.com",
     },
     address: {
       full: "3111 N. Capital Ave., Pasco, WA 99301",
       googleMaps:
         "https://maps.google.com/?q=3111+N.+Capital+Ave.+Pasco+WA+99301",
     },
   };
   ```

2. **Use Constants Consistently:**

   ```tsx
   import { CONTACT_INFO } from "@/lib/constants";

   <a href={CONTACT_INFO.phone.href}>{CONTACT_INFO.phone.display}</a>;
   ```

3. **Run Validation Script:**

   ```bash
   ./scripts/validation/validate-ctas.sh
   ```

---

### Issue: Broken Internal Links

**Symptoms:**

- 404 errors on internal navigation
- Validation script reports broken links

**Solutions:**

1. **Verify Route Exists:**
   - Check `src/app/[route]/page.tsx` exists
   - Review Valid Routes table above

2. **Create Missing Page:**

   ```tsx
   // src/app/portfolio/page.tsx
   export default function Portfolio() {
     return <div>Portfolio Page</div>;
   }
   ```

3. **Redirect to Existing Page:**

   ```tsx
   // Change link from /portfolio to /projects
   <Link href="/projects">View Portfolio</Link>
   ```

4. **Remove Link If Not Needed:**
   - Remove or comment out broken links
   - Update navigation configs

---

### Issue: Performance Problems

**Symptoms:**

- Slow page transitions
- Full page reloads on navigation
- SEO issues

**Solutions:**

1. **Replace onClick Navigation:**

   ```tsx
   // ❌ Wrong - Causes full page reload
   <Button onClick={() => window.location.href = '/about'}>
     About
   </Button>

   // ✅ Correct - Next.js optimized navigation
   <Link href="/about">
     <Button>About</Button>
   </Link>
   ```

2. **Prefetch Important Links:**

   ```tsx
   <Link href="/services" prefetch={true}>
     Services
   </Link>
   ```

3. **Use Dynamic Imports for Heavy Components:**

   ```tsx
   import dynamic from "next/dynamic";

   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <p>Loading...</p>,
   });
   ```

---

## 📚 Related Documentation

### Primary References

- **[Buttons Complete Guide](./buttons-complete-guide.md)** - Button system specifications and examples
- **[Buttons & CTAs Index](./buttons-ctas-index.md)** - Navigation hub for all button/CTA documentation
- **[MH Branding Index](../../../branding/branding-index.md)** - Modular brand docs
- **[Partnership Messaging](../../partnerships/messaging/cta-button-guide.md)** - Partnership-specific CTA guidance

### Technical References

- **[Navigation Architecture](../navigation/navigation-architecture.md)** - System overview
- **[Navigation Technical Guide](../navigation/navigation-technical-guide.md)** - Implementation details
- **[Component Library](../../../src/components/)** - React component source code

### Historical References

- Previous implementation plans and review summaries have been consolidated into current documentation
- Archive files available in `docs/branding/archive/` for historical context

---

## 🎯 Quick Reference Summary

### Most Common CTAs

**Client Services:**

```markdown
- **Schedule Free Consultation** - Meet with our specialists (`event`)
- **Book Site Visit** - On-location assessment (`place`)
```

**AI Estimator:**

```markdown
- **Get Instant AI Estimate** - Automated cost calculation (`smart_toy`)
```

**Vendor Partnerships:**

```markdown
- **Apply to be Approved Vendor** - Join our network (`check_circle`)
```

### Contact Information

```markdown
**Contact:** [(509) 308-6489](tel:+15093086489) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

### Navigation Pattern

```tsx
import Link from "next/link";

<Link href="/page">
  <Button variant="primary" size="lg">
    <MaterialIcon icon="icon_name" className="mr-2" size="md" />
    CTA Text
  </Button>
</Link>;
```

---

## 🔄 Maintenance & Updates

### Before Each Deployment

- [ ] Run validation script: `./scripts/validation/validate-ctas.sh`
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
- [ ] Review analytics for CTA performance

### After Adding New Pages

- [ ] Add route to validation script if needed
- [ ] Ensure page has appropriate CTAs
- [ ] Add navigation config to `navigationConfigs.ts`
- [ ] Update related index files
- [ ] Run validation script
- [ ] Update this documentation

---

## 📞 Support & Questions

For questions about CTA implementation or this guide:

- **Email:** <office@mhc-gc.com>
- **Phone:** (509) 308-6489
- **Documentation Issues:** Submit to project repository

---

**Document Version:** 4.0.0  
**Status:** ✅ Active - Consolidated Reference  
**Last Updated:** November 6, 2025  
**Consolidates:** cta-quick-reference.md (v3.7.2), cta-link-validation-guide.md (v1.0), link-navigation-rules.md  
**For Use By:** Developers, content creators, documentation writers
