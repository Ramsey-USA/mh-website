# Partnership Type Definitions - Client vs Trade

**Last Updated:** December 14, 2025 | **Version:** 1.0.0 | **Status:** Official Standard

---

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../master-index.md)
- [🤝 Partnerships Index](./partnerships-index.md)
- [📋 Business Documentation](../business/business-index.md)
- [💻 Development Terminology Guide](../development/terminology-guide.md)

---

## 🎯 Purpose

This document establishes clear, unambiguous definitions for the two distinct types of relationships at MH Construction:

1. **Client Relationships** - Project collaborations with homeowners, businesses, and organizations
2. **Ally Relationships** - Business relationships with subcontractors, suppliers, and vendors

**CRITICAL:** These terms are NOT interchangeable and must be used consistently across all documentation, code, and communications.

---

## 📋 Relationship Type Definitions

### 1. Client Relationships

#### Definition

**Clients** are the people or organizations who hire
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

- "Client"
- "Project Client"
- "Client Collaboration"
- "Partnership" (when context is clear it refers to working with clients)
- "Partnership-Driven Approach" (describing how we work with clients)

❌ **AVOID:**

- "Customer" (transactional, not partnership-focused)
- "Buyer" (too sales-focused)
- "Owner" (ambiguous - Jeremy is the owner)
- "Client Partner" (redundant)

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

### 2. Ally Relationships

#### Definition

**Allies** are professional business relationships between MH Construction and the subcontractors,
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
- **Financial Flow:** MH Construction pays Ally for services/goods

#### Key Terms & Synonyms

✅ **CORRECT USAGE:**

- "Ally"
- "Allies"
- "Ally Network"
- "Approved Ally"
- "Vendor" (when technical specificity needed)

❌ **AVOID:**

- "Trade Partner" (old terminology)
- "Subcontractor Partner" (redundant)
- "Partner" without qualifier (ambiguous with client relationships)
- Just "Supplier" (doesn't emphasize relationship)

#### Typical Journey Stages

1. **Application:** Vendor submits application and qualifications
2. **Evaluation:** MH reviews credentials, insurance, references
3. **Onboarding:** Training on standards, systems, and procedures
4. **Activation:** First project assignments and performance monitoring
5. **Growth:** Advancing partnership levels based on performance

#### Ally Levels

1. **Approved Ally** - Entry level with project opportunities
2. **Preferred Ally** - Priority consideration, enhanced terms
3. **Strategic Ally** - Exclusive opportunities, premium benefits
4. **Alliance Partner** - Joint ventures, co-marketing, strategic planning

#### Where They Interact

- **Website Pages:** `/trade-partners` (Allies in Force page), `/contact` (Ally section)
- **CTAs:** "Apply to be Approved Ally", "Join Ally Network"
- **Forms:** Ally applications, qualification submissions
- **Portal:** Vendor dashboard, project opportunities, invoicing
- **Communications:** Project coordination, business development discussions

---

## 🔍 Critical Distinctions

### Terminology Comparison

| Aspect                   | Client Relationships             | Ally Relationships                       |
| ------------------------ | -------------------------------- | ---------------------------------------- |
| **Primary Page**         | `/services`, `/booking`          | `/trade-partners`                        |
| **Navigation Label**     | "Services", "Book Consultation"  | "Allies in Force"                        |
| **Icon (Material)**      | `handshake`, `event`             | `construction`, `business`               |
| **Primary CTA**          | "Get Free Estimate"              | "Apply to be Approved Ally"              |
| **Secondary CTA**        | "Schedule Consultation"          | "Join Ally Network"                      |
| **Form Type**            | Project consultation request     | Ally application                         |
| **Communication Focus**  | Project vision, timeline, budget | Qualifications, capacity, business terms |
| **Email Subject Prefix** | "New Project Inquiry:"           | "New Ally Application:"                  |
| **Portal Access**        | Client project dashboard         | Ally business portal                     |
| **Relationship Goal**    | Successful project delivery      | Ongoing business growth                  |

### Visual Identity Distinctions

#### Client Branding

- **Primary Color:** Hunter Green (#386851) - Trust and partnership
- **Primary Icon:** `handshake` - Collaborative relationship
- **Tone:** Welcoming, consultative, vision-focused
- **Photography:** Happy homeowners, finished projects, team collaboration

#### Ally Branding

- **Primary Color:** Leather Tan (#BD9264) - Professional and business-focused
- **Primary Icon:** `construction` or `business` - Professional trades
- **Tone:** Professional, opportunity-focused, growth-oriented
- **Photography:** Trade professionals at work, quality craftsmanship, team coordination

---

## 💻 Implementation Guidelines

### For Developers

#### Code Comments

```tsx
// CLIENT: Consultation booking for project clients
// NOT for Ally applications

// ALLY: Ally application form
// NOT for client project inquiries
```

#### Component Naming

```tsx
// ✅ CLEAR NAMING
<ClientConsultationForm />
<AllyApplicationForm />
<ClientPartnershipCTA />
<AllyRecruitmentSection />

// ❌ AMBIGUOUS NAMING
<PartnershipForm />  // Which type?
<PartnerCTA />       // Client or ally?
<ApplicationForm />  // Job or ally?
```

#### Route Organization

```text
/booking           → Client consultation booking
/contact           → General contact (both audiences)
/trade-partners    → Ally information and application ("Allies in Force" page)
/services          → Client-facing service descriptions
```

### For Content Writers

#### Headlines

```markdown
✅ CLIENT-FOCUSED:

- "Ready to Begin Your Partnership?"
- "Schedule Your Free Consultation"
- "Let's Discuss Your Vision"

✅ ALLY-FOCUSED:

- "Join Our Ally Network"
- "Apply to Become an Approved Ally"
- "Grow Your Business with MH Construction"

❌ AMBIGUOUS:

- "Become a Partner" (Which type?)
- "Join Our Network" (Client or ally?)
- "Apply Today" (For what?)
```

#### Body Copy

```markdown
✅ CLIENT CONTEXT:
"At MH Construction, we believe in building partnerships, not just projects.
When you work with us, you're not just a customer—you're a valued client
in creating something exceptional."

✅ ALLY CONTEXT:
"MH Construction is building a network of quality trade professionals across
the Pacific Northwest. Join our Ally Network and grow your business
with consistent, quality project opportunities."

❌ MIXED CONTEXT:
"Join our partnership program today!" (Too vague)
```

### For Marketing Team

#### Email Segmentation

- **Client List:** Project updates, consultation offers, success stories
- **Ally List:** Project opportunities, vendor news, qualification updates
- **Never mix segments** - Messages are fundamentally different

#### Campaign Tracking

```text
utm_source=website&utm_campaign=client-2025
utm_source=website&utm_campaign=ally-recruitment-2025
```

#### Ad Copy Targeting

- **Client Ads:** Focus on vision, consultation, partnership approach
- **Ally Ads:** Focus on opportunities, business growth, professional network

---

## 📊 Usage Examples by Context

### Website Footer

```tsx
// Column: For Clients
- "Get Free Estimate" → /booking
- "Schedule Consultation" → /booking
- "Our Services" → /services
- "Success Stories" → /success-stories

// Column: For Allies
- "Join Ally Network" → /trade-partners
- "Apply as Ally" → /trade-partners#application
- "Ally Portal Login" → /vendor-portal
- "Ally Benefits" → /trade-partners#benefits
```

### Contact Page

```tsx
// Section 1: Project Consultations (Clients)
<h2>Start Your Project</h2>
<ClientConsultationForm />

// Section 2: Ally Inquiries
<h2>Join Our Ally Network</h2>
<AllyApplicationForm />
```

### Navigation Menu

```tsx
// Main Nav
Services → /services          // CLIENT
Allies in Force → /trade-partners  // ALLIES
Book Consultation → /booking     // CLIENT
Our Team → /team                // INFORMATIONAL

// Mobile Nav (same structure with clear labels)
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Mix Contexts

```markdown
WRONG:
"Whether you're a client or Ally, contact us to get started!"

RIGHT:
Page 1: "Ready to begin your project? Schedule a free consultation with our team."
Page 2: "Looking to join our Ally Network? Apply to become an approved Ally."
```

### ❌ Don't Use Generic "Partnership"

```markdown
WRONG:
"Join our partnership program" // Which one?

RIGHT (Client):
"Begin your project partnership with MH Construction"

RIGHT (Ally):
"Join our Ally Network as an approved member"
```

### ❌ Don't Mix Audience Benefits

```markdown
WRONG:
"Partners enjoy free consultations and business growth opportunities"
// Mixes client and Ally benefits

RIGHT (Client):
"Clients receive free consultations, transparent communication,
and collaborative project planning"

RIGHT (Ally):
"Allies access consistent project opportunities, fair payment terms,
and professional business growth support"
```

---

## 🔄 Maintenance & Review

### Quarterly Review Checklist

- [ ] Review all "partnership" terminology for clarity
- [ ] Verify client vs Ally distinction in all new content
- [ ] Check that CTAs route to correct audience type
- [ ] Confirm email segmentation maintains separation
- [ ] Validate form routing and response templates
- [ ] Test user journeys for both audience types

### New Content Review Questions

Before publishing any content mentioning "partnership", ask:

1. **Which audience type does this reference?**
   - Client (project collaboration)
   - Ally (vendor/subcontractor relationship)
   - Both (requires separate sections)

2. **Is the context immediately clear?**
   - Would a new visitor understand which audience this addresses?
   - Does the terminology match the audience expectations?

3. **Are the CTAs audience-appropriate?**
   - Do buttons lead to correct forms/pages?
   - Is the language specific to the audience type?

4. **Is the visual identity consistent?**
   - Correct colors (Hunter Green for Clients, Leather Tan for Allies)?
   - Correct icons (handshake for Clients, construction for Allies)?

---

## 📞 Questions & Support

### For Terminology Questions

- **Development Team:** Use this guide as source of truth
- **Marketing Team:** Reference messaging guides in `/docs/partnerships/messaging/`
- **Content Questions:** See `/docs/development/terminology-guide.md`

### Related Documentation

- [Partnership Messaging Complete Guide](./messaging/partnership-messaging-complete-guide.md)
- [Ally Guide](./vendor-trade/trade-partnership-guide.md)
- [Development Terminology Guide](../development/terminology-guide.md)
- [Branding Standards](../branding/branding-index.md)

---

## ✅ Quick Reference Card

```text
CLIENTS = Project Collaborations
├─ WHO: Homeowners, businesses hiring us for projects
├─ PAGE: /services, /booking
├─ CTA: "Get Free Estimate", "Schedule Consultation"
├─ ICON: handshake (partnership collaboration)
├─ COLOR: Hunter Green (#386851)
└─ GOAL: Successful project delivery

ALLIES = Vendor/Subcontractor Relationships
├─ WHO: Subcontractors, suppliers providing services/goods to us
├─ PAGE: /trade-partners
├─ CTA: "Apply to be Approved Ally", "Join Ally Network"
├─ ICON: construction, business (professional trades)
├─ COLOR: Leather Tan (#BD9264)
└─ GOAL: Mutual business growth
```

---

**This document is the authoritative source for partnership type definitions.**  
When in doubt, consult this guide before creating or modifying any partnership-related content.

_Building clear partnerships through clear communication._
