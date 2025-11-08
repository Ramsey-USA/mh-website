# Partnership Type Definitions - Client vs Trade

**Last Updated:** November 8, 2025 | **Version:** 1.0.0 | **Status:** Official Standard

---

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../MasterIndex.md)
- [🤝 Partnerships Index](./partnerships-index.md)
- [📋 Business Documentation](../business/business-index.md)
- [💻 Development Terminology Guide](../development/terminology-guide.md)

---

## 🎯 Purpose

This document establishes clear, unambiguous definitions for the two distinct types of partnerships at MH Construction:

1. **Client Partnerships** - Project collaborations with homeowners, businesses, and organizations
2. **Trade Partnerships** - Business relationships with subcontractors, suppliers, and vendors

**CRITICAL:** These terms are NOT interchangeable and must be used consistently across all documentation, code, and communications.

---

## 📋 Partnership Type Definitions

### 1. Client Partnerships

#### Definition

**Client Partnerships** are collaborative relationships between MH Construction and the people or organizations who hire
us to complete construction projects. This represents our core business philosophy of working WITH clients, not just FOR
them.

#### Who They Are

- Homeowners seeking residential construction or renovation
- Business owners needing commercial construction services
- Property managers requiring building improvements
- Organizations undertaking facility projects
- Government entities with construction needs
- Any person or entity hiring MH Construction for project delivery

#### Relationship Characteristics

- **Duration:** Project-based, typically 3-24 months
- **Nature:** Collaborative partnership where client is actively involved in decisions
- **Communication:** Regular consultations, updates, and collaborative planning
- **Goal:** Deliver successful project that meets client's vision and needs
- **Financial Flow:** Client pays MH Construction for services

#### Key Terms & Synonyms

✅ **CORRECT USAGE:**

- "Client Partnership"
- "Project Partnership"
- "Client Collaboration"
- "Your Partnership Team" (referring to client + MH team working together)
- "Partnership-Driven Approach" (describing how we work with clients)

❌ **AVOID:**

- "Customer" (transactional, not partnership-focused)
- "Buyer" (too sales-focused)
- "Owner" (ambiguous, could mean business owner)
- Just "Partnership" without qualifier (ambiguous)

#### Typical Journey Stages

1. **Discovery:** Initial consultation and vision discussion
2. **Planning:** Collaborative design and budget development
3. **Execution:** Project delivery with ongoing client involvement
4. **Completion:** Final walkthrough and satisfaction confirmation
5. **Relationship:** Ongoing support and potential future projects

#### Where They Interact

- **Website Pages:** `/`, `/services`, `/booking`, `/contact`
- **CTAs:** "Get Free Estimate", "Schedule Consultation", "Begin Partnership"
- **Forms:** Project consultation requests, estimate requests
- **Communications:** Project updates, vision discussions, milestone reviews

---

### 2. Trade Partnerships

#### Definition

**Trade Partnerships** are professional business relationships between MH Construction and the subcontractors,
suppliers, and specialty trade professionals who help us deliver projects. These are vendor-to-vendor relationships
focused on business growth and quality project delivery.

#### Who They Are

- Licensed subcontractors (electrical, plumbing, HVAC, framing, etc.)
- Material suppliers and distributors
- Equipment rental companies
- Specialized trade services (concrete, roofing, painting, etc.)
- Professional service providers (engineering, surveying, etc.)
- Any business entity providing goods or services TO MH Construction

#### Relationship Characteristics

- **Duration:** Ongoing business relationship spanning multiple projects
- **Nature:** Professional B2B partnership with mutual business growth
- **Communication:** Project-specific coordination and business development
- **Goal:** Deliver quality work/materials while growing both businesses
- **Financial Flow:** MH Construction pays trade partner for services/goods

#### Key Terms & Synonyms

✅ **CORRECT USAGE:**

- "Trade Partner"
- "Trade Partnership"
- "Vendor Partner"
- "Subcontractor Partnership"
- "Trade Network Member"
- "Approved Vendor"

❌ **AVOID:**

- Just "Vendor" (too transactional)
- Just "Subcontractor" (doesn't emphasize partnership)
- "Partner" without qualifier (ambiguous with client partnerships)
- "Supplier" alone (doesn't emphasize relationship)

#### Typical Journey Stages

1. **Application:** Vendor submits application and qualifications
2. **Evaluation:** MH reviews credentials, insurance, references
3. **Onboarding:** Training on standards, systems, and procedures
4. **Activation:** First project assignments and performance monitoring
5. **Growth:** Advancing partnership levels based on performance

#### Partnership Levels

1. **Approved Vendor** - Entry level with project opportunities
2. **Preferred Partner** - Priority consideration, enhanced terms
3. **Strategic Partner** - Exclusive opportunities, premium benefits
4. **Alliance Partner** - Joint ventures, co-marketing, strategic planning

#### Where They Interact

- **Website Pages:** `/trade-partners`, `/contact` (vendor section)
- **CTAs:** "Apply to be Approved Vendor", "Join Trade Partnership Network"
- **Forms:** Vendor applications, qualification submissions
- **Portal:** Vendor dashboard, project opportunities, invoicing
- **Communications:** Project coordination, business development discussions

---

## 🔍 Critical Distinctions

### Terminology Comparison

| Aspect                   | Client Partnerships              | Trade Partnerships                       |
| ------------------------ | -------------------------------- | ---------------------------------------- |
| **Primary Page**         | `/services`, `/booking`          | `/trade-partners`                        |
| **Navigation Label**     | "Services", "Book Consultation"  | "Trade Partners"                         |
| **Icon (Material)**      | `handshake`, `event`             | `construction`, `business`               |
| **Primary CTA**          | "Get Free Estimate"              | "Apply to be Approved Vendor"            |
| **Secondary CTA**        | "Schedule Consultation"          | "Join Trade Partnership Network"         |
| **Form Type**            | Project consultation request     | Vendor application                       |
| **Communication Focus**  | Project vision, timeline, budget | Qualifications, capacity, business terms |
| **Email Subject Prefix** | "New Project Inquiry:"           | "New Vendor Application:"                |
| **Portal Access**        | Client project dashboard         | Vendor business portal                   |
| **Relationship Goal**    | Successful project delivery      | Ongoing business growth                  |

### Visual Identity Distinctions

#### Client Partnership Branding

- **Primary Color:** Hunter Green (#386851) - Trust and partnership
- **Primary Icon:** `handshake` - Collaborative relationship
- **Tone:** Welcoming, consultative, vision-focused
- **Photography:** Happy homeowners, finished projects, team collaboration

#### Trade Partnership Branding

- **Primary Color:** Leather Tan (#BD9264) - Professional and business-focused
- **Primary Icon:** `construction` or `business` - Professional trades
- **Tone:** Professional, opportunity-focused, growth-oriented
- **Photography:** Trade professionals at work, quality craftsmanship, team coordination

---

## 💻 Implementation Guidelines

### For Developers

#### Code Comments

```tsx
// CLIENT PARTNERSHIP: Consultation booking for project clients
// NOT for trade partner applications

// TRADE PARTNERSHIP: Vendor application form
// NOT for client project inquiries
```

#### Component Naming

````tsx
// ✅ CLEAR NAMING
<ClientConsultationForm />
<TradePartnerApplicationForm />
<ClientPartnershipCTA />
<TradePartnerRecruitmentSection />

// ❌ AMBIGUOUS NAMING
<PartnershipForm />  // Which type?
<PartnerCTA />       // Client or trade?
<ApplicationForm />  // Job or vendor?
```text

#### Route Organization

```text
/booking           → Client consultation booking
/contact           → General contact (both audiences)
/trade-partners    → Trade partner information and application
/services          → Client-facing service descriptions
````

### For Content Writers

#### Headlines

```markdown
✅ CLIENT-FOCUSED:

- "Ready to Begin Your Partnership?"
- "Schedule Your Free Consultation"
- "Let's Discuss Your Vision"

✅ TRADE-FOCUSED:

- "Join Our Trade Partnership Network"
- "Apply to Become an Approved Vendor"
- "Grow Your Business with MH Construction"

❌ AMBIGUOUS:

- "Become a Partner" (Which type?)
- "Join Our Network" (Client or trade?)
- "Apply Today" (For what?)
```

#### Body Copy

```markdown
✅ CLIENT CONTEXT:
"At MH Construction, we believe in building partnerships, not just projects.
When you work with us, you're not just a customer—you're a valued partner
in creating something exceptional."

✅ TRADE CONTEXT:
"MH Construction is building a network of quality trade professionals across
the Pacific Northwest. Join our approved vendor program and grow your business
with consistent, quality project opportunities."

❌ MIXED CONTEXT:
"Join our partnership program today!" (Too vague)
```

### For Marketing Team

#### Email Segmentation

- **Client List:** Project updates, consultation offers, success stories
- **Trade Partner List:** Project opportunities, vendor news, qualification updates
- **Never mix segments** - Messages are fundamentally different

#### Campaign Tracking

```text
utm_source=website&utm_campaign=client-partnership-2025
utm_source=website&utm_campaign=trade-partnership-recruitment-2025
```

#### Ad Copy Targeting

- **Client Ads:** Focus on vision, consultation, partnership approach
- **Trade Ads:** Focus on opportunities, business growth, professional network

---

## 📊 Usage Examples by Context

### Website Footer

```tsx
// Column: For Clients
- "Get Free Estimate" → /booking
- "Schedule Consultation" → /booking
- "Our Services" → /services
- "Success Stories" → /success-stories

// Column: For Trade Partners
- "Join Trade Network" → /trade-partners
- "Apply as Vendor" → /trade-partners#application
- "Vendor Portal Login" → /vendor-portal
- "Trade Partner Benefits" → /trade-partners#benefits
```

### Contact Page

```tsx
// Section 1: Project Consultations (Client Partnerships)
<h2>Start Your Project Partnership</h2>
<ClientConsultationForm />

// Section 2: Trade Partnership Inquiries (Vendor Partnerships)
<h2>Join Our Trade Partnership Network</h2>
<TradePartnerApplicationForm />
```

### Navigation Menu

```tsx
// Main Nav
Services → /services          // CLIENT
Trade Partners → /trade-partners  // TRADE
Book Consultation → /booking     // CLIENT
Our Team → /team                // INFORMATIONAL

// Mobile Nav (same structure with clear labels)
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Mix Contexts

```markdown
WRONG:
"Whether you're a client or trade partner, contact us to get started!"

RIGHT:
Page 1: "Ready to begin your project? Schedule a free consultation with our team."
Page 2: "Looking to join our trade network? Apply to become an approved vendor."
```

### ❌ Don't Use Generic "Partnership"

```markdown
WRONG:
"Join our partnership program" // Which one?

RIGHT (Client):
"Begin your project partnership with MH Construction"

RIGHT (Trade):
"Join our trade partnership network as an approved vendor"
```

### ❌ Don't Mix Audience Benefits

```markdown
WRONG:
"Partners enjoy free consultations and business growth opportunities"
// Mixes client and trade benefits

RIGHT (Client):
"Project partners receive free consultations, transparent communication,
and collaborative project planning"

RIGHT (Trade):
"Trade partners access consistent project opportunities, fair payment terms,
and professional business growth support"
```

---

## 🔄 Maintenance & Review

### Quarterly Review Checklist

- [ ] Review all "partnership" terminology for clarity
- [ ] Verify client vs trade distinction in all new content
- [ ] Check that CTAs route to correct partnership type
- [ ] Confirm email segmentation maintains separation
- [ ] Validate form routing and response templates
- [ ] Test user journeys for both partnership types

### New Content Review Questions

Before publishing any content mentioning "partnership", ask:

1. **Which partnership type does this reference?**
   - Client partnership (project collaboration)
   - Trade partnership (vendor/subcontractor relationship)
   - Both (requires separate sections)

2. **Is the context immediately clear?**
   - Would a new visitor understand which audience this addresses?
   - Does the terminology match the audience expectations?

3. **Are the CTAs audience-appropriate?**
   - Do buttons lead to correct forms/pages?
   - Is the language specific to the partnership type?

4. **Is the visual identity consistent?**
   - Correct colors (Hunter Green for client, Leather Tan for trade)?
   - Correct icons (handshake for client, construction for trade)?

---

## 📞 Questions & Support

### For Terminology Questions

- **Development Team:** Use this guide as source of truth
- **Marketing Team:** Reference messaging guides in `/docs/partnerships/messaging/`
- **Content Questions:** See `/docs/development/terminology-guide.md`

### Related Documentation

- [Partnership Messaging Guide](./messaging/partnership-messaging-guide.md)
- [Client vs Vendor Distinctions](./messaging/client-vs-vendor-distinctions.md)
- [Trade Partnership Guide](./vendor-trade/trade-partnership-guide.md)
- [Development Terminology Guide](../development/terminology-guide.md)
- [Branding Standards](../branding/branding-index.md)

---

## ✅ Quick Reference Card

```text
CLIENT PARTNERSHIPS = Project Collaborations
├─ WHO: Homeowners, businesses hiring us for projects
├─ PAGE: /services, /booking
├─ CTA: "Get Free Estimate", "Schedule Consultation"
├─ ICON: handshake (partnership collaboration)
├─ COLOR: Hunter Green (#386851)
└─ GOAL: Successful project delivery

TRADE PARTNERSHIPS = Vendor/Subcontractor Relationships
├─ WHO: Subcontractors, suppliers providing services/goods to us
├─ PAGE: /trade-partners
├─ CTA: "Apply to be Approved Vendor", "Join Trade Network"
├─ ICON: construction, business (professional trades)
├─ COLOR: Leather Tan (#BD9264)
└─ GOAL: Mutual business growth
```

---

**This document is the authoritative source for partnership type definitions.**  
When in doubt, consult this guide before creating or modifying any partnership-related content.

_Building clear partnerships through clear communication._
