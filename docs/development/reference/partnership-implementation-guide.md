# Partnership Implementation Quick Reference

**Last Updated:** December 14, 2025 | **Version:** 1.0.0 | **Status:** Developer Reference

---

## 🧭 Quick Navigation

- [📚 Reference Index](./reference-index.md)
- [📘 Development Index](../development-index.md)
- [🤝 Partnership Type Definitions](../../partnerships/partnership-type-definitions.md) (Comprehensive Guide)
- [📝 Terminology Guide](../terminology-guide.md)

---

## 🎯 Purpose

Quick reference for developers implementing partnership-related features, ensuring correct distinction
between **Client Partnerships** (project collaborations) and **Trade Partnerships** (vendor relationships).

**For complete definitions and examples**, see
[Partnership Type Definitions](../../partnerships/partnership-type-definitions.md).

---

## ⚡ Quick Decision Tree

```text
Is this about someone HIRING us for a project?
├─ YES → CLIENT PARTNERSHIP
│   ├─ Use: handshake icon, Hunter Green color
│   ├─ CTA: "Get Free Estimate", "Schedule Consultation"
│   ├─ Route: /booking, /services
│   └─ Form: ClientConsultationForm
│
└─ NO → Is this about a vendor/subcontractor working WITH us?
    └─ YES → TRADE PARTNERSHIP
        ├─ Use: construction icon, Leather Tan color
        ├─ CTA: "Apply to be Approved Vendor"
        ├─ Route: /allies
        └─ Form: TradePartnerApplicationForm
```

---

## 🎨 Visual Identity Reference

### Client Partnerships (Project Collaborations)

```tsx
// Colors
const clientColors = {
  primary: "bg-brand-primary", // Hunter Green #386851
  text: "text-brand-primary",
  hover: "hover:bg-brand-secondary", // Leather Tan #BD9264
  border: "border-brand-primary",
};

// Icons (Material Design)
const clientIcons = {
  primary: "handshake", // Collaboration
  secondary: "event", // Scheduling/consultation
  tertiary: "phone", // Contact/discussion
  alternate: "engineering", // Project planning
};

// Button Example
<Button variant="primary" className="bg-brand-primary hover:bg-brand-secondary">
  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
  <span>Schedule Free Consultation</span>
</Button>;
```

### Trade Partnerships (Vendor Relationships)

```tsx
// Colors
const tradeColors = {
  primary: "bg-brand-secondary", // Leather Tan #BD9264
  text: "text-brand-secondary",
  hover: "hover:bg-bronze-300", // Bronze #cd7f32
  border: "border-brand-secondary",
};

// Icons (Material Design)
const tradeIcons = {
  primary: "construction", // Trade professionals
  secondary: "business", // Business relationship
  tertiary: "work", // Professional work
  alternate: "check_circle", // Approved/qualified
};

// Button Example
<Button variant="secondary" className="bg-brand-secondary hover:bg-bronze-300">
  <MaterialIcon icon="construction" size="lg" className="mr-3" />
  <span>Join Our Trade Partnership Network</span>
</Button>;
```

---

## 📁 Component Naming Conventions

### ✅ DO: Use Clear, Specific Names

```tsx
// Client Partnership Components
<ClientConsultationForm />
<ClientPartnershipCTA />
<ClientProjectInquirySection />
<ClientBookingWidget />
<ClientTestimonialCarousel />

// Trade Partnership Components
<TradePartnerApplicationForm />
<TradePartnerRecruitmentSection />
<VendorQualificationChecklist />
<TradePartnerPortalAccess />
<VendorBenefitsOverview />

// Context-Specific Components (when used in both contexts)
<PartnershipHeroSection
  partnershipType="client" // or "trade"
/>
<ContactSection
  audience="client" // or "vendor"
/>
```

### ❌ DON'T: Use Ambiguous Names

```tsx
// Too vague - which partnership type?
<PartnershipForm />         // Client or trade?
<PartnerCTA />              // Project or vendor?
<ApplicationForm />         // Job, client, or vendor?
<PartnerDashboard />        // Client or trade portal?
```

---

## 🛣️ Route Organization

```typescript
// Client Partnership Routes
'/services'              // Service descriptions for clients
'/booking'               // Project consultation booking
'/contact'               // General contact (both audiences, separate sections)
'/success-stories'       // Client project showcases

// Trade Partnership Routes
'/allies'                // Trade partner information & application
'/vendor-portal'         // Trade partner dashboard (authenticated)
'/allies/apply'          // Direct application route

// Shared Routes with Audience Distinction
'/contact'
  └─ Section 1: Client consultation
  └─ Section 2: Vendor application
```

---

## 💬 CTA Text Patterns

### Client Partnership CTAs

```typescript
// Primary Actions
"Get Free Estimate";
"Schedule Free Consultation";
"Begin Your Partnership";
"Discuss Your Vision";
"Request Project Consultation";

// Secondary Actions
"Book Discovery Call";
"Schedule Site Visit";
"View Our Services";
"See Success Stories";

// Form Submissions
"Request Free Consultation";
"Share Your Project Vision";
"Book Consultation Now";
```

### Trade Partnership CTAs

```typescript
// Primary Actions
"Apply to be Approved Vendor";
"Join Our Trade Partnership Network";
"Become a Trade Partner";
"Submit Vendor Application";

// Secondary Actions
"Download Vendor Package";
"View Partnership Requirements";
"Learn About Benefits";
"See Partnership Levels";

// Form Submissions
"Submit Application";
"Apply for Vendor Status";
"Request Partnership Information";
```

---

## 📝 Form Field Considerations

### Client Consultation Forms

```typescript
interface ClientConsultationForm {
  // Contact Info
  name: string;
  email: string;
  phone: string;

  // Project Details
  projectType: "residential" | "commercial" | "renovation" | "other";
  projectDescription: string;
  timeline: "immediate" | "1-3 months" | "3-6 months" | "6+ months";
  budget?: string; // Optional, sensitive
  propertyAddress?: string;

  // Consultation Preferences
  preferredContactMethod: "phone" | "email" | "in-person";
  availabilityNotes?: string;
}
```

### Trade Partner Application Forms

```typescript
interface TradePartnerApplication {
  // Company Info
  companyName: string;
  businessStructure: "sole-proprietor" | "LLC" | "corporation" | "partnership";
  yearsInBusiness: number;

  // Credentials
  tradeSpecialty: string[];
  licenseNumbers: {
    washington?: string;
    oregon?: string;
    idaho?: string;
  };
  insuranceCoverage: {
    liability: boolean;
    workersComp: boolean;
    bondingCapacity?: number;
  };

  // Business Details
  serviceArea: string[];
  projectCapacity: "small" | "medium" | "large" | "all";
  references: Reference[];

  // Contact
  primaryContact: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}
```

---

## 🎯 Props & Type Definitions

### Partnership Type Enum

```typescript
// types/partnerships.ts
export enum PartnershipType {
  CLIENT = "client", // Project collaborations
  TRADE = "trade", // Vendor/subcontractor relationships
}

export enum ClientPartnershipStage {
  INQUIRY = "inquiry",
  CONSULTATION = "consultation",
  PLANNING = "planning",
  ACTIVE_PROJECT = "active",
  COMPLETED = "completed",
}

export enum TradePartnershipLevel {
  APPLICANT = "applicant",
  APPROVED_VENDOR = "approved",
  PREFERRED_PARTNER = "preferred",
  STRATEGIC_PARTNER = "strategic",
  ALLIANCE_PARTNER = "alliance",
}
```

### Component Props Pattern

```typescript
// Flexible components that handle both types
interface PartnershipSectionProps {
  partnershipType: PartnershipType;
  title?: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
    icon: string;
  };
}

// Usage
<PartnershipSection
  partnershipType={PartnershipType.CLIENT}
  title="Ready to Begin Your Project?"
  cta={{
    text: "Schedule Free Consultation",
    href: "/booking",
    icon: "handshake"
  }}
/>

<PartnershipSection
  partnershipType={PartnershipType.TRADE}
  title="Join Our Trade Network"
  cta={{
    text: "Apply to be Approved Vendor",
    href: "/allies#apply",
    icon: "construction"
  }}
/>
```

---

## 🏷️ CSS Class Patterns

### Utility Classes by Partnership Type

```css
/* Client Partnership Styles */
.client-partnership-primary {
  @apply bg-brand-primary text-white hover:bg-brand-secondary;
}

.client-partnership-icon {
  @apply text-brand-primary;
}

.client-partnership-border {
  @apply border-brand-primary border-2;
}

/* Trade Partnership Styles */
.trade-partnership-primary {
  @apply bg-brand-secondary text-white hover:bg-bronze-300;
}

.trade-partnership-icon {
  @apply text-brand-secondary;
}

.trade-partnership-border {
  @apply border-brand-secondary border-2;
}
```

### Component-Specific Styles

```tsx
// Dynamic styling based on partnership type
const getPartnershipStyles = (type: PartnershipType) => {
  return type === PartnershipType.CLIENT
    ? {
        bgColor: "bg-brand-primary",
        textColor: "text-brand-primary",
        hoverColor: "hover:bg-brand-secondary",
        icon: "handshake",
      }
    : {
        bgColor: "bg-brand-secondary",
        textColor: "text-brand-secondary",
        hoverColor: "hover:bg-bronze-300",
        icon: "construction",
      };
};
```

---

## 📧 Email/Communications Patterns

### Subject Line Prefixes

```typescript
// Client Partnership Emails
"New Project Inquiry: [Client Name]";
"Consultation Request: [Project Type]";
"Project Update: [Project Name]";
"Free Estimate Request: [Location]";

// Trade Partnership Emails
"New Vendor Application: [Company Name]";
"Trade Partner Inquiry: [Trade Specialty]";
"Vendor Update: [Company Name]";
"Partnership Opportunity: [Project Type]";
```

### Auto-Response Templates

```typescript
// Client auto-response
const clientAutoResponse = {
  subject: "Thank you for your project inquiry",
  greeting: "Thank you for considering MH Construction for your project!",
  body: "We've received your consultation request and will be in touch within 24 hours...",
  cta: "Schedule a Call",
};

// Trade partner auto-response
const tradeAutoResponse = {
  subject: "Thank you for your vendor application",
  greeting:
    "Thank you for your interest in joining our trade partnership network!",
  body: "We've received your application and will review your qualifications...",
  cta: "Check Application Status",
};
```

---

## 🔍 Search/Filter Patterns

### Client-Focused Search

```typescript
// Client partnership search contexts
const clientSearchCategories = [
  "services",
  "project-types",
  "success-stories",
  "team-members",
  "service-areas",
  "project-timeline",
];
```

### Trade-Focused Search

```typescript
// Trade partnership search contexts
const tradeSearchCategories = [
  "trade-specialties",
  "partnership-benefits",
  "application-requirements",
  "partnership-levels",
  "project-opportunities",
];
```

---

## 🧪 Testing Considerations

### Test Data Separation

```typescript
// test/fixtures/partnerships.ts

export const mockClientPartnership = {
  type: PartnershipType.CLIENT,
  name: "Jane Doe",
  email: "jane@example.com",
  projectType: "residential",
  // ... client-specific fields
};

export const mockTradePartnership = {
  type: PartnershipType.TRADE,
  companyName: "ABC Electrical LLC",
  email: "contact@abcelectrical.com",
  tradeSpecialty: ["electrical"],
  // ... trade-specific fields
};
```

### Component Tests

```typescript
describe('PartnershipCTA', () => {
  it('renders client partnership with correct styling', () => {
    render(<PartnershipCTA type={PartnershipType.CLIENT} />);
    expect(screen.getByRole('button')).toHaveClass('bg-brand-primary');
    expect(screen.getByText(/consultation/i)).toBeInTheDocument();
  });

  it('renders trade partnership with correct styling', () => {
    render(<PartnershipCTA type={PartnershipType.TRADE} />);
    expect(screen.getByRole('button')).toHaveClass('bg-brand-secondary');
    expect(screen.getByText(/vendor/i)).toBeInTheDocument();
  });
});
```

---

## ✅ Pre-Deployment Checklist

### Client Partnership Implementation

- [ ] Uses "Get Free Estimate" or "Schedule Consultation" CTAs
- [ ] Routes to `/booking` or `/services`
- [ ] Uses `handshake` or `event` icon
- [ ] Applies Hunter Green color scheme (`bg-brand-primary`)
- [ ] Form captures project details (type, timeline, vision)
- [ ] Auto-response mentions "consultation" and "project"
- [ ] Component names include "Client" prefix
- [ ] Links to client success stories or testimonials

### Trade Partnership Implementation

- [ ] Uses "Apply to be Approved Vendor" or similar CTAs
- [ ] Routes to `/trade-partners`
- [ ] Uses `construction` or `business` icon
- [ ] Applies Leather Tan color scheme (`bg-brand-secondary`)
- [ ] Form captures company details (credentials, specialties)
- [ ] Auto-response mentions "application" and "vendor"
- [ ] Component names include "Trade" or "Vendor" prefix
- [ ] Links to partnership benefits or requirements

---

## 🚨 Common Pitfalls

### ❌ Mixing Contexts

```tsx
// WRONG - Mixed messaging
<Button href="/booking">
  Apply to Become a Vendor
</Button>

// RIGHT - Clear separation
<Button href="/booking" className="bg-brand-primary">
  Schedule Free Consultation
</Button>

<Button href="/trade-partners" className="bg-brand-secondary">
  Apply to Become a Vendor
</Button>
```

### ❌ Ambiguous Component Names

```tsx
// WRONG - Unclear purpose
<PartnerForm />
<PartnershipInfo />

// RIGHT - Explicit purpose
<ClientConsultationForm />
<TradePartnerApplicationInfo />
```

### ❌ Incorrect Icon Usage

```tsx
// WRONG - Wrong icons for context
<ClientCTA icon="construction" />  // Construction icon is for trade partners
<TradeCTA icon="handshake" />      // Handshake icon is for client partnerships

// RIGHT - Context-appropriate icons
<ClientCTA icon="handshake" />     // Collaborative partnership
<TradeCTA icon="construction" />   // Trade professional
```

---

## 📚 Additional Resources

### Documentation

- **[Partnership Type Definitions](../../partnerships/partnership-type-definitions.md)** - Comprehensive guide
- **[Terminology Guide](../terminology-guide.md)** - Language usage standards
- **[Branding Index](../../branding/branding-index.md)** - Visual identity guidelines
- **[Consistency Guide](../consistency-guide.md)** - Overall standards

### Code References

- **Components:** `/src/components/partnerships/`
- **Types:** `/src/types/partnerships.ts`
- **Forms:** `/src/components/forms/`
- **Styles:** `/src/styles/partnerships.css`

### Questions?

Contact the development team or refer to the comprehensive
[Partnership Type Definitions](../../partnerships/partnership-type-definitions.md) guide.

---

**Remember:** When in doubt, ask "Is this about hiring us (CLIENT) or working with us (TRADE)?"

_Clear distinctions lead to better user experiences._
