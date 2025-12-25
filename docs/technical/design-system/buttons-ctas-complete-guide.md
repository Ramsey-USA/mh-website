# Buttons & CTAs - Complete Implementation Guide

**Category:** UI Components - Buttons & Call-to-Actions  
**Last Updated:** December 25, 2025  
**Status:** ✅ Active - Emergency & Government Color Schemes Added  
**Version:** 3.2.0 - Emergency/Urgent + Government/Federal Button Variants

**⚠️ CONSOLIDATED DOCUMENT:** This guide consolidates and supersedes:

- `buttons-guide.md` (technical implementation)
- `ctas-guide.md` (CTA patterns & standards)
- `cta-standardization-plan.md` (branding standards)
- `cta-button-guide.md` (messaging & service distinctions)

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Button Variants](#button-variants)
3. [Service Type CTAs](#service-type-ctas)
4. [Partnership Type CTAs](#partnership-type-ctas)
5. [Implementation Standards](#implementation-standards)
6. [Messaging Guidelines](#messaging-guidelines)
7. [Accessibility & Compliance](#accessibility--compliance)
8. [Examples & Patterns](#examples--patterns)
9. [Validation & Testing](#validation--testing)

---

## 🎯 Quick Reference

### Button Variant Matrix

| Variant       | Color                  | Use Case                    | Icon Examples             | Text Examples                |
| ------------- | ---------------------- | --------------------------- | ------------------------- | ---------------------------- |
| **Primary**   | Hunter Green (#386851) | Main CTAs, consultations    | `phone`, `email`          | "Call Us Today"              |
| **Secondary** | Leather Tan (#BD9264)  | Supporting actions          | `handshake`, `visibility` | "View Our Work"              |
| **Outline**   | Transparent border     | Subtle actions, navigation  | `arrow_forward`, `info`   | "Learn More", "View Details" |
| **Neutral**   | Theme-aware            | System actions, UI controls | `close`, `arrow_back`     | "Back", "Cancel"             |

### Service Type Distinctions

| Service Type         | Icon             | Color        | Button Variant | Example Text            |
| -------------------- | ---------------- | ------------ | -------------- | ----------------------- |
| **Direct Contact**   | `phone`, `email` | Hunter Green | `primary`      | "Contact Us Today"      |
| **View Work**        | `photo_library`  | Leather Tan  | `secondary`    | "View Our Victories"    |
| **Client CTA**       | `handshake`      | Hunter Green | `primary`      | "Begin Our Partnership" |
| **Ally Partnership** | `construction`   | Leather Tan  | `secondary`    | "Apply as Vendor"       |

---

## 🔘 Button Variants

### 1. Primary Buttons (Hunter Green)

**Purpose:** Main conversion CTAs, primary user actions, in-person consultations

**Colors:** Hunter Green (#386851), white text on hover

**Technical Implementation:**

```tsx
<Button variant="primary" size="lg" className="group/btn">
  <MaterialIcon
    icon="event"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Schedule Free Consultation
</Button>
```

**When to Use:**

- Direct contact actions (phone/email)
- Client contact forms
- Primary conversion goals
- In-person consultation requests
- Partnership initiation

**Approved Text Patterns:**

- "Begin Your Project"
- "Schedule Consultation"
- "Book Site Visit"
- "Start Your Partnership"
- "Discuss Your Vision"
- "Build With Us"
- "Contact Client Services"
- "Experience Our Values"

---

### 2. Secondary Buttons (Leather Tan)

**Purpose:** Automated tools, supporting actions, complementary options

**Colors:** Leather Tan (#BD9264), white text on hover

**Technical Implementation:**

```tsx
<Button variant="secondary" size="lg" className="group/btn">
  <MaterialIcon
    icon="smart_toy"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Get Instant AI Estimate
</Button>
```

**When to Use:**

- Secondary information requests
- Portfolio viewing
- Resource downloads
- Partner applications

**Approved Text Patterns:**

- "Trust In Action" (for portfolio/testimonials)
- "Our Values-Driven Services"
- "Our Foundation" (for about/values)
- "Apply as Vendor"
- "View Our Work"
- "Learn More"
- "Download Resources"

---

### 3. Outline Buttons (Transparent)

**Purpose:** Subtle actions, secondary navigation, less emphasis

**Colors:** Transparent with border, theme-aware

**Technical Implementation:**

```tsx
<Button variant="outline" size="md" className="group/btn">
  <MaterialIcon
    icon="arrow_forward"
    size="md"
    className="ml-2 group-hover/btn:translate-x-1 transition-transform"
  />
  Learn More
</Button>
```

**When to Use:**

- Secondary navigation
- "Learn More" links
- Supporting actions
- Less critical CTAs

**Approved Text Patterns:**

- "Learn More"
- "View Details"
- "Explore Options"
- "See More Projects"

---

### 4. Neutral Buttons (Theme-Aware)

**Purpose:** System actions, UI controls, cancel actions

**Colors:** Neutral gray, theme-aware

**Technical Implementation:**

```tsx
<Button variant="neutral" size="md">
  <MaterialIcon icon="close" size="sm" className="mr-2" />
  Cancel
</Button>
```

**When to Use:**

- Cancel/close actions
- Back navigation
- Form resets
- System controls

---

### 5. Emergency/Urgent Buttons (Orange Accent)

**Purpose:** Emergency response CTAs, 24/7 rapid deployment actions, critical contractor support

**Colors:** Orange-600 hover to Orange-700 on standard button, used on urgent page with standard MH backgrounds

**Technical Implementation:**

```tsx
<button className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-orange-600 hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
  <MaterialIcon
    icon="phone"
    size="lg"
    className="mr-2 group-hover:scale-110 transition-transform"
  />
  Call Emergency Line Now
</button>
```

**When to Use:**

- Emergency/urgent page (`/urgent`) ONLY
- 24/7 rapid response services
- Critical contractor deployment
- Time-sensitive project support
- Emergency contact CTAs

**Design Context:**

- Used on standard gray/white MH backgrounds
- Page features orange and red diagonal stripe patterns
- Icon backgrounds use orange gradients
- Red accents reserved for "What We Don't Provide" indicators

**DO NOT Use On:**

- Standard service pages (use Hunter Green primary)
- General contact forms (use Hunter Green primary)
- Non-emergency content
- Homepage or about pages

**Approved Text Patterns:**

- "Call Emergency Line Now"
- "Email Emergency Response"
- "24/7 Rapid Deployment"
- "Immediate Project Support"
- "Contact Emergency Team"

**Design Philosophy:**

- **Urgency:** Orange-red gradient creates immediate action impulse
- **Trust Balance:** Pair with brand green trust signals (certifications, safety records)
- **Professional:** Maintains credibility through context and supporting content
- **Contractor Focus:** Designed for B2B emergency situations, not consumer panic

**Trust Signal Integration:**

Always include nearby trust elements when using emergency buttons:

```tsx
{
  /* Emergency CTA */
}
<button className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 ...">
  Call Emergency Line Now
</button>;

{
  /* Trust Signal - Use brand green */
}
<div className="mt-6 flex items-center gap-4">
  <div className="flex items-center gap-2">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon icon="verified_user" className="text-white" />
    </div>
    <span className="text-sm text-gray-600">Licensed WA, OR, ID</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon icon="health_and_safety" className="text-white" />
    </div>
    <span className="text-sm text-gray-600">.64 EMR Safety Record</span>
  </div>
</div>;
```

---

### 6. Government/Public Sector Buttons (Grayscale Gradient)

**Purpose:** Federal contracting CTAs, government compliance actions, institutional authority

**Colors:** Slate-600 via Gray-700 grayscale gradient, professional darkening on hover

**Technical Implementation:**

```tsx
<button className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600 hover:from-slate-700 hover:via-gray-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
  <MaterialIcon
    icon="account_balance"
    size="lg"
    className="mr-2 group-hover:scale-110 transition-transform"
  />
  Request Grant Support
</button>
```

**When to Use:**

- Government/public sector page (`/public-sector`) ONLY
- Federal contracting and compliance services
- Grant application support
- DOE/Hanford project contexts
- Institutional authority messaging

**DO NOT Use On:**

- Commercial construction pages (use Hunter Green primary)
- Emergency services (use orange-red gradient)
- General contact forms (use Hunter Green primary)
- Consumer-facing pages

**Approved Text Patterns:**

- "Request Grant Support"
- "Federal Compliance Consultation"
- "Discuss Government Project"
- "Subcontracting Inquiry"
- "DOE Project Support"

**Design Philosophy:**

- **Authority:** Grayscale conveys institutional credibility and federal standards
- **Professional:** Maintains neutrality appropriate for government work
- **Trust Balance:** Pair with brand green veteran credentials and bronze military heritage
- **Compliance:** Reflects regulatory and federal procurement standards

**Veteran/Trust Signal Integration:**

Always include veteran-owned and safety credentials when using government buttons:

```tsx
{
  /* Government CTA */
}
<button className="bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600 ...">
  Request Grant Support
</button>;

{
  /* Veteran Trust Signals - Use brand green and bronze */
}
<div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon
        icon="military_tech"
        className="text-white text-2xl"
        aria-label="Veteran owned"
      />
    </div>
    <p className="text-sm font-medium">Veteran-Owned</p>
    <p className="text-xs text-gray-600">Army Veteran Leadership</p>
  </div>
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon
        icon="health_and_safety"
        className="text-white text-2xl"
        aria-label="Safety record"
      />
    </div>
    <p className="text-sm font-medium">.64 EMR Safety</p>
    <p className="text-xs text-gray-600">40% Better Than Industry</p>
  </div>
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon
        icon="verified_user"
        className="text-white text-2xl"
        aria-label="Licensed"
      />
    </div>
    <p className="text-sm font-medium">Multi-State Licensed</p>
    <p className="text-xs text-gray-600">WA, OR, ID</p>
  </div>
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-bronze-600 via-bronze-700 to-bronze-800 flex items-center justify-center">
      <MaterialIcon
        icon="handshake"
        className="text-white text-2xl"
        aria-label="Experience"
      />
    </div>
    <p className="text-sm font-medium">150+ Years</p>
    <p className="text-xs text-gray-600">Combined Experience</p>
  </div>
</div>;
```

---

## 🎯 Service Type CTAs

### 📞 Direct Contact CTAs

**Service:** Direct communication with team  
**Icon:** `phone`, `email`, or `handshake`  
**Color:** Hunter Green (#386851)  
**Variant:** `primary`  
**Style:** Professional, personal, action-focused

**Implementation:**

```tsx
<Link href="/contact">
  <Button variant="primary" size="lg" className="group/btn min-h-[48px]">
    <MaterialIcon
      icon="phone"
      size="lg"
      className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
    />
    <span className="font-medium text-sm sm:text-base">Contact Us Today</span>
  </Button>
</Link>
```

**Approved Button Text:**

- "Contact Us Today" (primary)
- "Introductions" (page title)
- "Get In Touch"
- "Start Your Project"
- "Call (509) 308-6489"

**Messaging Guidelines:**

- Emphasize personal service & expertise
- Highlight veteran-owned values
- Focus on partnership approach
- Clear contact information

---

### 🚨 Emergency Response CTAs

**Service:** 24/7 emergency contractor deployment, rapid response for professional contractors  
**Icon:** `bolt`, `phone`, `emergency`, or `military_tech`  
**Color:** Orange-600 with hover to Orange-700  
**Variant:** `emergency` (orange accent on standard backgrounds)  
**Style:** Urgent, action-focused, professional

**Design Context:**

- Standard MH gray/white backgrounds
- Orange and red diagonal stripe patterns throughout page
- Orange gradient icon backgrounds
- Red accents for negative/exclusion indicators only

**Implementation:**

```tsx
<Link href="tel:5093086489">
  <button className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-orange-600 hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[48px]">
    <MaterialIcon
      icon="phone"
      size="lg"
      className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform"
      aria-label="Emergency phone"
    />
    <span className="font-medium text-sm sm:text-base">
      Call Emergency Line Now
    </span>
  </button>
</Link>
```

**Approved Button Text:**

- "Call Emergency Line Now" (primary)
- "Email Emergency Response"
- "24/7 Rapid Deployment"
- "Immediate Project Support"
- "Contact Emergency Team"

**Page Context:**

- **ONLY on `/urgent` page**
- Contractor-focused emergency services
- NOT for general emergencies (life safety)
- Professional project support context

**Messaging Guidelines:**

- Emphasize 24/7 availability
- Highlight rapid response capabilities
- Note contractor-only focus
- Include response timeframes ("2-4 hours")
- Pair with trust signals (licensing, safety record, experience)

**Trust Signal Requirements:**

Emergency CTAs MUST be accompanied by credibility indicators:

```tsx
{
  /* Emergency CTA */
}
<button className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 ...">
  Call Emergency Line Now
</button>;

{
  /* Required: Response timeframe */
}
<p className="text-sm text-gray-600 mt-2">
  <MaterialIcon
    icon="schedule"
    className="text-yellow-300"
    aria-label="Response time"
  />
  Typical response: 2-4 hours
</p>;

{
  /* Required: Trust signals nearby */
}
<div className="mt-6 grid grid-cols-2 gap-4">
  <div className="flex items-center gap-2">
    <MaterialIcon
      icon="verified_user"
      className="text-brand-primary"
      aria-label="Licensed and insured"
    />
    <span>Licensed WA, OR, ID</span>
  </div>
  <div className="flex items-center gap-2">
    <MaterialIcon
      icon="health_and_safety"
      className="text-brand-primary"
      aria-label="Safety record"
    />
    <span>.64 EMR Safety Record</span>
  </div>
</div>;
```

**Example Full Context:**

```tsx
<section className="bg-white dark:bg-gray-900 py-16">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">
      <span className="block text-gray-700 dark:text-gray-300 text-2xl mb-2">
        When Contractors Need
      </span>
      <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
        Immediate Professional Support
      </span>
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
      24/7 rapid deployment for licensed contractors. Not for general
      emergencies.
    </p>

    {/* Emergency CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <button className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:from-orange-700 hover:via-red-700 hover:to-orange-800 ...">
        <MaterialIcon icon="phone" aria-label="Call" />
        Call Emergency Line Now
      </button>
      <button className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:from-orange-700 hover:via-red-700 hover:to-orange-800 ...">
        <MaterialIcon icon="email" aria-label="Email" />
        Email Emergency Response
      </button>
    </div>

    {/* Trust Signals - USE BRAND GREEN */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
          <MaterialIcon
            icon="military_tech"
            className="text-white text-2xl"
            aria-label="Veteran owned"
          />
        </div>
        <p className="text-sm font-medium">Veteran-Owned</p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
          <MaterialIcon
            icon="health_and_safety"
            className="text-white text-2xl"
            aria-label="Safety record"
          />
        </div>
        <p className="text-sm font-medium">.64 EMR Safety</p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
          <MaterialIcon
            icon="verified_user"
            className="text-white text-2xl"
            aria-label="Licensed"
          />
        </div>
        <p className="text-sm font-medium">Multi-State Licensed</p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
          <MaterialIcon
            icon="handshake"
            className="text-white text-2xl"
            aria-label="Experience"
          />
        </div>
        <p className="text-sm font-medium">150+ Years</p>
      </div>
    </div>
  </div>
</section>
```

---

### 📞 Direct Contact CTAs (Standard)

**Service:** In-person professional sales consultation  
**Icon:** `event` or `handshake`  
**Color:** Hunter Green (#386851)  
**Variant:** `primary`  
**Style:** Personal, professional, relationship-focused

**Implementation:**

```tsx
<Link href="/contact">
  <Button variant="primary" size="lg" className="group/btn min-h-[48px]">
    <MaterialIcon
      icon="phone"
      size="lg"
      className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
    />
    <span className="font-medium text-sm sm:text-base">Call Us Today</span>
  </Button>
</Link>
```

**Approved Button Text:**

- "Schedule Free Consultation" (primary)
- "Book Site Visit"
- "Request Project Review"
- "Meet with Expert"
- "Discuss Your Vision"
- "Begin Our Partnership"

**Messaging Guidelines:**

- Emphasize personal attention & expertise
- Highlight "free" when applicable
- Note face-to-face value proposition
- Stress collaborative approach

**Example Context:**

```tsx
<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
  Work directly with our expert team. We'll visit your site, discuss your
  vision, and provide transparent open-book pricing.
</p>
<Button variant="primary">Schedule Free Consultation</Button>
<p className="text-xs text-gray-500 mt-2">
  Response within 24 hours. Licensed WA, OR, ID.
</p>
```

---

## 🤝 Partnership Type CTAs

### Client CTAs

**Audience:** Homeowners, businesses hiring MH for projects  
**Icon:** `handshake`  
**Color:** Hunter Green (#386851)  
**Variant:** `primary`  
**Routes:** `/services`, `/contact`

**Implementation:**

```tsx
<Button variant="primary" size="lg" className="group/btn">
  <MaterialIcon
    icon="handshake"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Begin Our Partnership
</Button>
```

**Approved Button Text:**

- "Begin Our Partnership"
- "Start Your Project"
- "Partner With Us"
- "Let's Build Together"

**Messaging Focus:**

- Collaborative relationship
- Long-term trust
- "Client" terminology (not "customer")
- Partnership-first philosophy

---

### Ally Partnership CTAs

**Audience:** Allies (subcontractors, suppliers, vendors)  
**Icon:** `construction`  
**Color:** Leather Tan (#BD9264)  
**Variant:** `secondary`  
**Routes:** `/allies`, `/vendor-application`

**Implementation:**

```tsx
<Button variant="secondary" size="lg" className="group/btn">
  <MaterialIcon
    icon="construction"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Apply as Approved Vendor
</Button>
```

**Approved Button Text:**

- "Apply as Approved Vendor"
- "Join Ally Network"
- "Become an Ally"
- "Download Vendor Package"
- "Submit Vendor Application"

**Messaging Focus:**

- Professional business relationship
- Mutual benefit & growth
- "Ally" terminology for trade partners/vendors
- Quality standards & approval process

---

## 📐 Implementation Standards

### Critical Requirements ✅

**All buttons MUST include:**

1. **Button Component:** Import from `@/components/ui`

```tsx
import { Button } from "@/components/ui/button";
```

1. **Proper Variant:** `primary`, `secondary`, `outline`, or `neutral`

```tsx
<Button variant="primary">...</Button>
```

1. **MaterialIcon Integration:** Use `icon=` prop with proper size

```tsx
<MaterialIcon icon="event" size="lg" />
```

1. **Hover Animation:** Icon scale on hover

```tsx
className = "group-hover/btn:scale-110 transition-transform";
```

1. **Responsive Text:** Scale across breakpoints

```tsx
className = "text-sm sm:text-base";
```

1. **Accessibility Height:** Minimum 48px touch target

```tsx
className = "min-h-[48px]";
```

1. **Semantic HTML:** Wrap in `<Link>` for navigation

```tsx
<Link href="/contact">
  <Button>...</Button>
</Link>
```

---

### Icon Sizing Standards

| Button Size     | Icon Size | Icon Class  | Spacing        |
| --------------- | --------- | ----------- | -------------- |
| `lg` (CTAs)     | `lg`      | `size="lg"` | `mr-2 sm:mr-3` |
| `md` (Standard) | `md`      | `size="md"` | `mr-2`         |
| `sm` (Compact)  | `sm`      | `size="sm"` | `mr-1.5`       |

---

### Responsive Typography

```tsx
// Large CTAs (hero sections, primary conversions)
className = "text-sm sm:text-base md:text-lg";

// Standard CTAs (section buttons)
className = "text-sm sm:text-base";

// Compact CTAs (cards, inline)
className = "text-xs sm:text-sm";
```

---

### Color Specifications

**Primary (Hunter Green):**

```css
/* Tailwind classes */
bg-brand-primary hover:bg-brand-primary/90 text-white

/* CSS variables */
background: var(--brand-primary);  /* #386851 */
color: white;
```

**Secondary (Leather Tan):**

```css
/* Tailwind classes */
bg-brand-secondary hover:bg-brand-secondary/90 text-white

/* CSS variables */
background: var(--brand-secondary);  /* #BD9264 */
color: white;
```

---

## 💬 Messaging Guidelines

### Standardized CTA Text Library

#### ✅ APPROVED: Consultations & Meetings

- "Schedule Free Consultation" (primary, most common)
- "Book Site Visit"
- "Request Project Review"
- "Meet with Expert"
- "Discuss Your Vision"

#### ✅ APPROVED: Portfolio & Projects

- "View Our Work" (primary, standardized)
- "See Project Gallery"
- "Browse Portfolio"

#### ✅ APPROVED: Partnerships

- "Begin Our Partnership" (client, primary)
- "Apply as Approved Vendor" (trade, primary)
- "Join Trade Network"

#### ✅ APPROVED: Information

- "Explore Our Solutions"
- "Learn More"
- "View Details"

#### ❌ NON-COMPLIANT: Avoid These

- "Contact Us" (too generic, use specific action)
- "Click Here" (not descriptive)
- "Submit" (not action-oriented)
- "View Portfolio" (use "View Our Work")
- "Get In Touch" (use specific action)

---

### Messaging Principles

1. **Action-Oriented:** Start with strong verbs
   - ✅ "Schedule", "Book", "Begin", "Request"
   - ❌ "Click", "Submit", "Send"

2. **Benefit-Clear:** Communicate value
   - ✅ "Free Consultation"
   - ❌ "Consultation"

3. **Context-Specific:** Match service type
   - AI Tools: "Instant", "Automated", "Calculate"
   - Human Services: "Schedule", "Meet", "Discuss"

4. **Partnership Language:** Emphasize collaboration
   - ✅ "Begin Our Partnership"
   - ❌ "Hire Us"

5. **Concise:** 2-4 words typically
   - ✅ "Schedule Free Consultation" (3 words)
   - ❌ "Click Here to Schedule a Free Consultation with Our Team" (too long)

---

## ♿ Accessibility & Compliance

### WCAG AA Requirements

**Color Contrast:**

- ✅ Hunter Green on white: 4.75:1 (AA compliant)
- ✅ Leather Tan on white: 3.65:1 (AA large text)
- ✅ All button text uses sufficient contrast

**Touch Targets:**

- ✅ Minimum 48px height (`min-h-[48px]`)
- ✅ Adequate spacing between buttons (16px minimum)
- ✅ Responsive sizing maintains targets on mobile

**Focus States:**

- ✅ Visible focus rings on all buttons
- ✅ Keyboard navigation supported
- ✅ Focus order follows visual layout

---

### ARIA Labels & Screen Readers

**Basic Implementation:**

```tsx
<Button
  variant="primary"
  aria-label="Schedule a free consultation with our team"
>
  <MaterialIcon icon="event" size="lg" aria-hidden="true" />
  Schedule Free Consultation
</Button>
```

**Icon-Only Buttons:**

```tsx
<Button variant="outline" size="md" aria-label="Close dialog">
  <MaterialIcon icon="close" size="sm" />
</Button>
```

**Loading States:**

```tsx
<Button
  variant="primary"
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label={isLoading ? "Submitting form..." : "Submit form"}
>
  {isLoading ? "Submitting..." : "Submit"}
</Button>
```

---

### Keyboard Navigation

**Required Keyboard Support:**

- `Tab` - Focus next button
- `Shift + Tab` - Focus previous button
- `Enter` or `Space` - Activate button
- `Esc` - Close modal/dialog (if applicable)

**Implementation:**

```tsx
<Button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAction();
    }
  }}
>
  Button Text
</Button>
```

---

## 💡 Examples & Patterns

### Complete CTA Section Pattern

```tsx
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose the path that works best for you
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA - Phone Contact */}
          <Link href="tel:+15093086489">
            <Button
              variant="primary"
              size="lg"
              className="group/btn min-h-[48px]"
            >
              <MaterialIcon
                icon="phone"
                size="lg"
                className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
              />
              <span className="font-medium text-sm sm:text-base">
                Call (509) 308-6489
              </span>
            </Button>
          </Link>

          {/* Secondary CTA - Email Contact */}
          <Link href="mailto:info@mhconstruction.com">
            <Button
              variant="secondary"
              size="lg"
              className="group/btn min-h-[48px]"
            >
              <MaterialIcon
                icon="email"
                size="lg"
                className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
              />
              <span className="font-medium text-sm sm:text-base">Email Us</span>
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Talk to a real person - no automation, no bots
        </p>
      </div>
    </section>
  );
}
```

---

### Next Steps Section Pattern (3 Options)

```tsx
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";

export function NextStepsSection() {
  const options = [
    {
      icon: "phone",
      title: "Call Us",
      description: "Speak with our expert team for personalized guidance",
      href: "tel:+15093086489",
      variant: "primary" as const,
      buttonText: "Call (509) 308-6489",
    },
    {
      icon: "email",
      title: "Email Us",
      description: "Send us your project details and questions",
      href: "mailto:info@mhconstruction.com",
      variant: "secondary" as const,
      buttonText: "Email Us",
    },
    {
      icon: "location_on",
      title: "Visit Us",
      description: "Come to our office for an in-person consultation",
      href: "/contact",
      variant: "outline" as const,
      buttonText: "Get Directions",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Next Step
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option) => (
            <div
              key={option.href}
              className="flex flex-col items-center text-center p-6 border rounded-lg"
            >
              <MaterialIcon
                icon={option.icon}
                size="2xl"
                className="text-brand-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {option.description}
              </p>
              <Link href={option.href} className="w-full">
                <Button
                  variant={option.variant}
                  size="lg"
                  className="w-full group/btn"
                >
                  <MaterialIcon
                    icon={option.icon}
                    size="md"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  {option.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Mobile-Optimized CTA Pattern

```tsx
export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-4 md:hidden z-50">
      <div className="flex gap-2">
        <Link href="/booking" className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            <MaterialIcon icon="event" size="md" className="mr-1.5" />
            <span className="text-xs sm:text-sm">Book Now</span>
          </Button>
        </Link>
        <Link href="tel:+15093086489">
          <Button variant="outline" size="lg" className="aspect-square">
            <MaterialIcon icon="phone" size="md" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

---

## ✅ Validation & Testing

### Pre-Launch Checklist

**Visual Inspection:**

- [ ] All buttons use correct variant (primary/secondary/outline)
- [ ] Icons are properly sized and positioned
- [ ] Hover animations work smoothly
- [ ] Text is readable on all backgrounds
- [ ] Mobile sizing is appropriate
- [ ] Spacing is consistent

**Technical Validation:**

- [ ] Buttons import from `@/components/ui/button`
- [ ] MaterialIcon imported and configured correctly
- [ ] `Link` wraps navigational buttons
- [ ] `min-h-[48px]` applied to all CTAs
- [ ] Proper `variant` specified
- [ ] Group hover classes present

**Accessibility Testing:**

- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus states are visible
- [ ] ARIA labels present where needed
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥48px

**Content Review:**

- [ ] CTA text matches approved patterns
- [ ] Service type distinctions clear (AI vs IRL)
- [ ] Partnership type appropriate (Client vs Trade)
- [ ] Action verbs are strong and clear
- [ ] No generic text ("Click Here", "Submit")

---

### Common Mistakes & Fixes

#### ❌ Mistake #1: Generic CTA Text

```tsx
// WRONG
<Button variant="primary">Contact Us</Button>

// RIGHT
<Button variant="primary">Schedule Free Consultation</Button>
```

#### ❌ Mistake #2: Missing Icon Animation

```tsx
// WRONG
<MaterialIcon icon="event" size="lg" className="mr-2" />

// RIGHT
<MaterialIcon
  icon="event"
  size="lg"
  className="mr-2 group-hover/btn:scale-110 transition-transform"
/>
```

#### ❌ Mistake #3: Wrong Variant for Action Type

```tsx
// WRONG - Outline for primary action
<Button variant="outline">Call Us Today</Button>

// RIGHT
<Button variant="primary">Call Us Today</Button>
```

#### ❌ Mistake #4: Missing Link Wrapper

```tsx
// WRONG - Button without Link
<Button variant="primary" onClick={() => router.push('/contact')}>
  Contact Us
</Button>

// RIGHT - Wrapped in Link
<Link href="/contact">
  <Button variant="primary">Contact Us</Button>
</Link>
```

---

## 📚 Related Documentation

### Essential References

- **[Button System Documentation](./buttons-ctas-complete-guide.md)** - This complete guide (you are here)
- **[Section Enhancement Patterns](../../branding/implementation/section-enhancement-patterns.md)** - Technical patterns
- **[Partnership Type Definitions](../../partnerships/partnership-type-definitions.md)** - Client vs Trade
- **[Messaging Guidelines](../../branding/strategy/messaging.md)** - Voice & tone
- **[Color System](../../branding/standards/color-system.md)** - Brand colors

### Design System

- **[Design System Index](./design-system-index.md)** - Complete design system
- **[Icon System](./icons-index.md)** - Material Icon standards
- **[Typography](../../branding/standards/typography.md)** - Text styling

### Development

- **[Consistency Guide](../../development/consistency-guide.md)** - Implementation standards
- **[Development Standards](../../development/development-standards.md)** - Coding conventions
- **[Documentation Home](../../START-HERE.md)** - Central documentation hub

---

## 🎯 Summary & Key Takeaways

### Remember These Core Principles

1. **Service Type Matters**
   - AI/Automated = Secondary (Leather Tan)
   - Human/IRL = Primary (Hunter Green)

2. **Partnership Type Matters**
   - Client Projects = Primary with `handshake`
   - Allies = Secondary with `construction`

3. **Be Specific**
   - ✅ "Schedule Free Consultation"
   - ❌ "Contact Us"

4. **Always Accessible**
   - 48px minimum height
   - Keyboard navigation
   - Proper ARIA labels

5. **Consistent Implementation**
   - Use Button component
   - Include MaterialIcon
   - Add hover animations
   - Wrap in Link for navigation

---

**Document Maintained By:** MH Construction Development Team  
**Last Major Update:** November 17, 2025 (Consolidation)  
**Next Review Date:** December 17, 2025  
**Version:** 2.0.0 (Consolidated from 4 source files)

---

**Questions or Issues?**

- [Button System Documentation](./buttons-ctas-complete-guide.md) - This complete guide
- [Documentation Home](../../START-HERE.md) - Central documentation hub
- [Consistency Guide](../../development/consistency-guide.md) - General implementation standards
