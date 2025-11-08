# MH Construction Terminology Guide

## Critical Navigation & Content Distinctions

**Last Updated:** October 10, 2025

This guide establishes the critical terminology distinctions used throughout the MH Construction
website to ensure consistent messaging and prevent user confusion.

---

## 🎯 **Primary Terminology Distinctions**

### **Partnership Types: Client vs Trade**

**CRITICAL FOUNDATION:** MH Construction uses "partnership" terminology in two fundamentally different contexts.
Understanding this distinction is essential for all content creation and development.

For comprehensive definitions, implementation guidelines, and examples, see:
**[Partnership Type Definitions](../partnerships/partnership-type-definitions.md)**

#### **Quick Overview**

**Client Partnerships:**

- **Who**: Homeowners, businesses hiring MH for projects
- **What**: Project collaboration relationships
- **Pages**: `/services`, `/booking`
- **CTAs**: "Get Free Estimate", "Schedule Consultation"
- **Icon**: `handshake` (collaborative partnership)
- **Color**: Hunter Green (#386851)

**Trade Partnerships:**

- **Who**: Subcontractors, suppliers, vendors working with MH
- **What**: B2B vendor/subcontractor relationships
- **Pages**: `/trade-partners`
- **CTAs**: "Apply to be Approved Vendor", "Join Trade Network"
- **Icon**: `construction`, `business` (professional trades)
- **Color**: Leather Tan (#BD9264)

---

### **"Our Team" vs "Trade Partners"**

**CRITICAL RULE:** These terms are NOT interchangeable and refer to completely different groups of people.

#### **"Our Team" (`/team` page)**

- **Definition:** Internal MH Construction employees, staff, and leadership
- **Includes:**
  - Executive leadership (Jeremy Thamert, Todd Schoeff, etc.)
  - Project managers and estimators
  - Site superintendents and field operations
  - Administrative and support staff
  - All W-2 employees and direct hires
- **Navigation Label:** "Our Team"
- **Page Title:** "Our Team"
- **Icon:** `people` (Material Design)
- **Context:** When referring to MH Construction's internal workforce

#### **"Trade Partners" (`/trade-partners` page)**

- **Definition:** External subcontractors, vendors, and business partnerships
- **Includes:**
  - Subcontractors (electrical, plumbing, HVAC, etc.)
  - Material suppliers and vendors
  - Equipment rental companies
  - Specialized trade services
  - 1099 contractors and business-to-business relationships
- **Navigation Label:** "Trade Partners"
- **Page Title:** "Our Trade Partners"
- **Icon:** `business` (Material Design)
- **Context:** When referring to external business partnerships

### **Partnership Context Terms**

#### **"Your Partnership Team"**

- **Definition:** The collaborative team formed between client + MH Construction
- **Usage:** When describing the combined effort of client and MH working together
- **Context:** Client-facing communications about collaboration
- **Type:** Refers to CLIENT PARTNERSHIPS (project collaborations)

#### **"Partnership-Focused Team"**

- **Definition:** How we describe our internal team's approach to client relationships
- **Usage:** Marketing and service descriptions
- **Context:** Emphasizing our collaborative approach with clients
- **Type:** Refers to CLIENT PARTNERSHIPS (project collaborations)

#### **"Trade Partnership Network"**

- **Definition:** The collective group of vendors, subcontractors, and suppliers
- **Usage:** When describing our network of business partners
- **Context:** Vendor recruitment and business development
- **Type:** Refers to TRADE PARTNERSHIPS (vendor/subcontractor relationships)

**See [Partnership Type Definitions](../partnerships/partnership-type-definitions.md) for complete guidelines.**

---

## 📋 **Content Guidelines**

### **Navigation & Menu Items**

````typescript
✅ CORRECT USAGE:
"Our Team" → /team (Internal employees)
"Trade Partners" → /trade-partners (External contractors)
"Start Partnership" → /booking (Client engagement)

❌ INCORRECT USAGE:
"Your Partners" → /team (Confusing - implies external relationship)
"Our Partners" → /trade-partners (Unclear ownership)
```text

### **Page Content**

```markdown
✅ CORRECT EXAMPLES:
- "Meet Our Team" (when introducing MH employees)
- "Our Trade Partners" (when introducing external contractors)
- "Your Partnership Team" (client + MH working together)
- "Connect with Our Team" (contact internal staff)

❌ INCORRECT EXAMPLES:
- "Meet Your Partners" (confusing for internal team)
- "Our Partners" (ambiguous about internal vs external)
- "The Team" (too generic, lacks ownership clarity)
```text

### **Call-to-Action Buttons**

```typescript
✅ CORRECT CTAs:
- "Meet Our Team" → /team
- "View Trade Partners" → /trade-partners
- "Start Partnership" → /booking
- "Join Our Team" → /careers

❌ INCORRECT CTAs:
- "Meet Your Partners" (confusing terminology)
- "See Our Partners" (ambiguous)
```text

---

## 🔍 **Implementation Checklist**

### **Navigation Components**

- [x] Main Navigation: "Our Team" with `people` icon
- [x] PageHero Navigation: "Our Team" with `people` icon
- [x] Footer Links: "Our Team" terminology
- [x] Mobile Menu: Consistent "Our Team" labeling

### **Page Content**

- [x] Team Page: Title "Our Team", content references internal employees
- [x] Contact Page: "Meet Our Team" CTA
- [x] About Page: "Meet Our Team" section header
- [x] Trade Partners Page: Clear distinction from internal team

### **Documentation**

- [x] OPTIMIZATION_TRACKER.md: Updated with terminology distinction
- [x] COMPREHENSIVE_OPTIMIZATION_TRACKER.md: Team page marked complete
- [x] MH_PARTNERSHIP_MESSAGING_GUIDE.md: Navigation terminology clarified
- [x] icon-usage-reference.md: Updated with correct icon assignments

---

## 🎨 **Design System Integration**

### **Icons**

- **Our Team:** `people` (Material Design)
- **Trade Partners:** `business` (Material Design)
- **Start Partnership:** `handshake` (Material Design)

### **Color Coding**

- **Internal Team:** Brand primary colors (`brand-primary`)
- **Trade Partners:** Brand secondary colors (`brand-secondary`)
- **Partnership Actions:** Brand accent colors (`brand-accent`)

---

## 📝 **Content Review Process**

When creating or editing content, always ask:

1. **Who are we referring to?**
   - Internal MH employees → "Our Team"
   - External contractors → "Trade Partners"
   - Combined collaboration → "Your Partnership Team"

2. **What page does this link to?**
   - `/team` → "Our Team"
   - `/trade-partners` → "Trade Partners"
   - `/booking` → "Start Partnership"

3. **Is the context clear?**
   - Avoid ambiguous terms like "partners" without qualification
   - Always specify internal vs external relationships
   - Use consistent terminology across all touchpoints

---

## 🚨 **Common Mistakes to Avoid**

### **❌ Don't Use:**

- "Your Partners" (for internal team)
- "Our Partners" (ambiguous)
- "The Team" (lacks ownership clarity)
- "Partners" (without specification)

### **✅ Always Use:**

- "Our Team" (for internal employees)
- "Trade Partners" (for external contractors)
- "Your Partnership Team" (for client collaboration)
- "Partnership-Focused Team" (for service approach)

---

## 📊 **Impact & Results**

This terminology distinction provides:

1. **User Clarity:** Eliminates confusion about who clients will be working with
2. **Professional Positioning:** Clearly defines internal capabilities vs external resources
3. **Brand Consistency:** Establishes uniform language across all touchpoints
4. **SEO Benefits:** Improves content clarity for search engines
5. **Team Pride:** Gives internal employees clear ownership and identity

---

## 🔄 **Maintenance**

This terminology guide should be:

- Reviewed quarterly for consistency
- Updated when new team members join
- Referenced during all content creation
- Shared with any external content creators
- Integrated into style guide training

**Questions about terminology?** Contact the development team or refer to this guide before
making content decisions.
````
