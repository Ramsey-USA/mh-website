# Complete Partnership Messaging Guide

**Version:** 2.1.0  
**Last Updated:** December 22, 2025  
**Status:** ✅ Official Standard & Comprehensive

> **Update Note (Dec 22, 2025):** Added **Dual-Label Navigation Pattern** - All navigation elements now use civilian + military-themed dual labels to balance accessibility with veteran brand identity.

> **Consolidation Note:** This document consolidates and supersedes:
>
> - `partnership-messaging-guide.md` (779 lines)
> - `client-vs-vendor-distinctions.md` (301 lines)
> - `ai-estimator-vs-consultation.md` (379 lines)

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Core Messaging Framework](#core-messaging-framework)
3. [Dual-Label Navigation Pattern](#dual-label-navigation-pattern) ⭐ **NEW**
4. [Partnership Language Distinctions](#partnership-language-distinctions)
5. [Service Type Distinctions](#service-type-distinctions)
6. [Website Implementation](#website-implementation)
7. [UI/UX Elements](#uiux-elements)
8. [Trade Partnership Messaging](#trade-partnership-messaging)
9. [Quality Guidelines](#quality-guidelines)

---

## 🚀 Quick Start

### Core Messaging Principles

**Primary Brand Message:** "Building projects for the client, NOT the dollar"

**Supporting Taglines:**

- "Building Tomorrow with Today's Technology"
- "Where Military Precision Meets Construction Excellence"
- "Your Partner in Building Tomorrow"

**Core Philosophy:** We work **WITH** clients and partners, not just **FOR** them. This partnership-centered culture
must be reflected in all communications.

---

## 🎯 Core Messaging Framework

### Primary Brand Message

#### "Building projects for the client, NOT the dollar"

This tagline emphasizes our commitment to client success over profit maximization — the heart of veteran-owned business values.

### Brand Positioning

- **Partnership-Centered:** Collaborative relationships with clients and trade partners
- **Veteran-Owned Values:** Military precision, integrity, commitment to excellence
- **Technology-Enhanced:** Modern tools supporting traditional personal service
- **Pacific Northwest Focus:** Community-centered regional expertise

### Messaging Pillars

1. **Partnership Collaboration** - "We Work WITH You" approach
2. **Veteran Leadership** - Military precision and values-driven service
3. **Technology Support** - Modern tools enhancing human expertise
4. **Community Impact** - Pacific Northwest regional focus
5. **Quality Excellence** - Professional-grade results guaranteed

---

## 🧭 Dual-Label Navigation Pattern

**Status:** ✅ Active Standard (December 22, 2025)  
**Location:** Mobile hamburger menu + Footer navigation  
**Purpose:** Balance accessibility with veteran-owned military brand identity

### Pattern Overview

Every navigation element displays **two labels**:

1. **Primary Label** (Standard civilian terminology)
   - Clear, universally understood
   - Accessible to all users
   - Standard size and weight

2. **Sublabel** (Military-themed term)
   - 9px font size
   - Brand tan color (#BD9264)
   - 75% opacity
   - Honors veteran heritage

### Complete Label Mapping

| Primary Label | Military Sublabel | Purpose                  |
| ------------- | ----------------- | ------------------------ |
| Home          | Base HQ           | Homepage/main hub        |
| About Us      | Our Oath          | Company values/mission   |
| Services      | Operations        | Service offerings        |
| Projects      | Missions          | Portfolio/completed work |
| Our Team      | Team Six          | Leadership/personnel     |
| Reviews       | Commendations     | Client testimonials      |
| Careers       | Enlist            | Job opportunities        |
| Contact       | Rally Point       | Get in touch             |
| Government    | Public Sector     | Government projects      |
| Partners      | Allies            | Trade partnerships       |
| Veterans      | Service First     | Veteran programs         |
| Emergency     | Rapid Response    | Urgent support           |
| Help/FAQ      | Intel Brief       | Information/support      |
| Inspections   | Quality Assurance | Quality inspections      |
| Maintenance   | Field Service     | Repair services          |
| Safety        | Force Protection  | Safety programs          |

### Implementation

**Mobile Navigation:**

```tsx
<span className="flex flex-col">
  <span>Primary Label</span>
  <span className="text-[9px] text-brand-secondary opacity-75">
    Military Sublabel
  </span>
</span>
```

**Footer Navigation:**

```tsx
<span className="flex flex-col">
  <span>Primary Label</span>
  <span className="text-[9px] text-brand-secondary opacity-75">
    Military Sublabel
  </span>
</span>
```

### Messaging Philosophy

This pattern honors MH Construction's veteran-owned identity while maintaining accessibility:

- **Primary labels** ensure all users immediately understand navigation
- **Military sublabels** reinforce veteran heritage and brand differentiation
- **Visual hierarchy** keeps primary labels prominent
- **Consistent application** builds brand recognition

### Documentation

Complete technical implementation: [Navigation Complete Guide](../../technical/navigation/navigation-complete-guide.md#dual-label-navigation-pattern)

---

## 🏷️ Partnership Language Distinctions

### Two Distinct Relationship Types

MH Construction serves two fundamentally different audiences:

1. **CLIENTS** - Project collaborations with homeowners, businesses, and organizations
2. **ALLIES** - Business relationships with subcontractors, suppliers, and vendors

**CRITICAL:** These terms are NOT interchangeable. Clear distinction is essential for proper messaging.

---

## 👥 CLIENT MESSAGING

### Target Audience

Homeowners, businesses, and organizations seeking construction services — the people and entities who hire MH
Construction for project delivery.

### Visual Identity

- **Primary Icon:** `handshake` (MaterialIcon) - Represents collaborative partnership
- **Alternative Icons:** `event`, `phone`, `engineering`, `place`
- **Color Palette:** MH brand colors (Hunter Green #386851 / Leather Tan #BD9264)
- **UI Style:** Relationship-focused, professional, approachable

### Language Framework

#### Recommended CTAs

**Primary Action:**

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
  <span className="font-medium">Start Your Project Partnership</span>
</Button>
```

**Alternative CTAs:**

- "Partner With Us on Your Project"
- "Begin Your Construction Partnership"
- "Schedule Partnership Consultation"
- "Let's Build Together"
- "Get Free Project Estimate"

#### Key Terminology

| Traditional      | Client Partnership Language      | MaterialIcon |
| ---------------- | -------------------------------- | ------------ |
| "Get Quote"      | "Get Free Estimate"              | `handshake`  |
| "Hire Us"        | "Partner With Us"                | `handshake`  |
| "Contact Sales"  | "Schedule Consultation"          | `event`      |
| "Submit Request" | "Start Partnership Conversation" | `forum`      |
| "Our Customers"  | "Our Partners"                   | `people`     |
| "Client Portal"  | "Partnership Portal"             | `dashboard`  |

#### Messaging Examples

**Homepage Hero:**

```text
"Your Partner in Building Tomorrow"
"We work WITH you to bring your vision to life through collaborative
partnership and military-grade precision."
```

**Services Page:**

```text
"Partnership-Driven Construction Management"
"From initial consultation to project completion, we work WITH you every
step of the way."
```

**Contact Page:**

```text
"Ready to start your project partnership?"
"Schedule a free consultation and discover how we work WITH clients to deliver exceptional results."
```

---

## 🔧 TRADE PARTNERSHIP MESSAGING

### Target Audience

Subcontractors, suppliers, and vendors seeking business relationships with MH Construction — the professionals who
provide specialized services TO our projects.

### Visual Identity

- **Primary Icon:** `group` (MaterialIcon) - Represents professional network
- **Alternative Icons:** `business`, `construction`, `badge`, `verified`
- **Color Palette:** Professional blue/gray with MH accent colors
- **UI Style:** Business-focused, professional, opportunity-driven

### Language Framework

#### Recommended CTAs

**Primary Action:**

```tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="group" size="lg" className="mr-3" />
  <span className="font-medium">Join Our Trade Network</span>
</Button>
```

**Alternative CTAs:**

- "Become a Trade Partner"
- "Apply to Trade Network"
- "Join Our Vendor Network"
- "Partner as a Subcontractor"
- "Grow Your Business With Us"

#### Key Terminology

| Traditional        | Trade Partnership Language | MaterialIcon      |
| ------------------ | -------------------------- | ----------------- |
| "Hire Contractors" | "Trade Partner Network"    | `group`           |
| "Subcontractors"   | "Trade Partners"           | `construction`    |
| "Vendors"          | "Supply Partners"          | `inventory`       |
| "Apply Now"        | "Join Our Network"         | `person_add`      |
| "Vendor Portal"    | "Trade Partner Portal"     | `business_center` |
| "Contractor List"  | "Trade Network Directory"  | `contacts`        |

#### Messaging Examples

**Trade Partners Page:**

```text
"Join the MH Construction Trade Network"
"Grow your business with a veteran-owned construction leader. Access
consistent, quality projects and professional partnership opportunities."
```

**Application Page:**

```text
"Become a Valued Trade Partner"
"We're seeking qualified subcontractors and suppliers who share our
commitment to quality, safety, and collaborative professionalism."
```

**Trade Partner Benefits:**

```text
✓ Consistent project flow year-round
✓ Fair payment terms and professional treatment
✓ Long-term partnership growth opportunities
✓ Diverse project portfolio (residential to commercial)
✓ Military precision project management
✓ Priority for veteran-owned businesses
```

---

## 🤖 Service Type Distinctions

### Two Distinct Service Pathways

MH Construction offers two ways to get project cost estimates, each with unique characteristics and messaging.

---

## 🔢 AUTOMATED ESTIMATOR (Automated Self-Service)

### Service Description

**What It Is:** An instant, automated cost estimation tool available 24/7 that provides preliminary project pricing
based on user input.

**Who It's For:**

- Clients in early planning stages
- Budget-conscious homeowners researching costs
- Users who prefer self-service tools
- Anyone seeking immediate ballpark estimates
- Tech-savvy clients comfortable with digital tools

### Visual Identity

- **Primary Icon:** `smart_toy` (MaterialIcon) - Robot/Automated representation
- **Alternative Icons:** `calculate`, `analytics`, `auto_awesome`
- **Color Palette:** Blue/tech colors suggesting innovation
- **UI Style:** Modern, digital, tech-forward

### Key Characteristics

- ⚡ **Instant Results** - Receive estimate in seconds
- 🤖 **Automated** - Advanced algorithms providing regional estimates
- 📱 **Available 24/7** - Access anytime, anywhere
- 🔢 **Preliminary Pricing** - Ballpark estimates for planning
- 🎮 **Interactive** - Adjust parameters and see real-time changes
- 📊 **Data-Driven** - Based on historical project data
- 🏷️ **No Commitment** - Explore costs without obligation

### Messaging Language

#### Recommended CTAs

```tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Get Instant AI Estimate</span>
</Button>
```

**Alternative CTAs:**

- "Try Our Automated Estimator"
- "Get Smart Estimate"
- "Start Automated Estimate"
- "See Pricing Instantly"

#### Descriptive Language

- "Automated cost estimation"
- "Instant preliminary pricing"
- "Automated estimator system"
- "Smart cost estimation tool"
- "Digital pricing intelligence"
- "Self-service estimation"
- "24/7 automated estimates"

#### Benefit Statements

- "Get instant preliminary pricing with our automated estimator"
- "Explore project costs 24/7 with our automated estimator"
- "See ballpark estimates in seconds using advanced automation"
- "Plan your budget with instant intelligent cost analysis"
- "No waiting - get preliminary pricing right now"

### When to Recommend

✅ **Best For:**

- Initial research and budget planning
- Comparing different project scopes
- Quick ballpark estimates
- Self-service preferred
- After-hours access needed

❌ **Not Recommended For:**

- Complex custom projects
- Final pricing decisions
- Detailed project planning
- Projects requiring site evaluation
- Clients needing expert guidance

---

## 🤝 IRL SALES CONSULTATION (In-Person/Human Expert)

### Service Description

**What It Is:** A personalized, in-depth consultation with a qualified MH Construction sales representative who
visits your site, understands your vision, and provides detailed professional estimates.

**Who It's For:**

- Clients ready to move forward with projects
- Complex projects requiring site evaluation
- Buyers preferring human expert guidance
- Projects needing detailed planning and design input
- Clients who value relationship-building and face-to-face communication

### Visual Identity

- **Primary Icon:** `event` (MaterialIcon) - Scheduling/appointment focus
- **Alternative Icons:** `handshake`, `phone`, `person`, `meeting_room`
- **Color Palette:** MH brand colors (professional, trustworthy)
- **UI Style:** Personal, professional, relationship-focused

### Key Characteristics

- 👤 **Personal Service** - Direct human expert consultation
- 🏗️ **Site Evaluation** - On-location project assessment
- 📋 **Detailed Estimates** - Comprehensive professional pricing
- 🎯 **Expert Guidance** - Qualified sales representative advice
- 🤝 **Relationship-Building** - Face-to-face partnership start
- 📞 **Scheduled** - Appointments during business hours
- ✅ **Professional** - Industry-qualified expertise

### Messaging Language

#### Recommended CTAs

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>
```

**Alternative CTAs:**

- "Book Your Free Consultation"
- "Schedule Expert Consultation"
- "Meet With Our Team"
- "Get Professional Estimate"
- "Start Your Partnership"

#### Descriptive Language

- "In-person consultation"
- "Professional estimate"
- "Expert guidance"
- "Site evaluation"
- "Detailed project planning"
- "Personal consultation"
- "Qualified sales representative"

#### Benefit Statements

- "Schedule a free consultation with our expert team"
- "Get a detailed, professional estimate from qualified professionals"
- "Meet with us on-site for comprehensive project evaluation"
- "Receive personalized guidance from construction experts"
- "Start your project with a professional consultation"

### When to Recommend

✅ **Best For:**

- Complex or custom projects
- Projects requiring site visits
- Detailed planning and design
- Professional guidance needed
- Building client relationships
- Final project decisions

❌ **Not Recommended For:**

- Quick ballpark estimates only
- After-hours research
- Self-service preference
- Initial budget exploration only

---

## 🔄 SERVICE COMPARISON

| Aspect            | Automated Estimator  | IRL Consultation          |
| ----------------- | -------------------- | ------------------------- |
| **Speed**         | Instant (seconds)    | Scheduled appointment     |
| **Availability**  | 24/7 automated       | Business hours only       |
| **Detail Level**  | Preliminary ballpark | Detailed professional     |
| **Human Contact** | None                 | Direct expert interaction |
| **Site Visit**    | No                   | Yes (on-location)         |
| **Best Use**      | Research & planning  | Project execution         |
| **Commitment**    | None required        | Scheduling required       |
| **Accuracy**      | General estimates    | Precise professional      |
| **Icon**          | `smart_toy`          | `event`                   |
| **Button Color**  | Secondary (blue)     | Primary (hunter green)    |

### Combined Messaging

**Both Options Available:**

```text
Choose Your Path to Project Success:

🤖 Quick Start: Get instant ballpark pricing with our Automated Estimator
🤝 Expert Guidance: Schedule a free consultation for detailed planning

Either path connects you with MH Construction's partnership-driven service.
```

---

## 💻 Website Implementation

### Homepage Implementation

**Hero Section:**

```tsx
<Section className="hero">
  <h1>Your Partner in Building Tomorrow</h1>
  <p>
    We work WITH you to bring your vision to life through collaborative
    partnership and military-grade precision.
  </p>

  {/* Dual CTA Options */}
  <div className="cta-group">
    {/* Primary: Human Consultation */}
    <Button variant="primary" size="lg">
      <MaterialIcon icon="event" size="lg" />
      Schedule Free Consultation
    </Button>

    {/* Secondary: Automated Tool */}
    <Button variant="secondary" size="lg">
      <MaterialIcon icon="smart_toy" size="lg" />
      Get Instant AI Estimate
    </Button>
  </div>
</Section>
```

### Services Page Implementation

**Service Categories:**

```tsx
<Section variant="services">
  <h2>Partnership-Driven Construction Services</h2>

  {/* Client Partnership Services */}
  <ServiceCard icon="handshake" title="Residential Partnership">
    Work WITH us on your dream home renovation or new construction
  </ServiceCard>

  <ServiceCard icon="business" title="Commercial Partnership">
    Partner WITH us for professional-grade commercial projects
  </ServiceCard>

  <ServiceCard icon="account_balance" title="Government Partnership">
    Collaborate WITH veteran-owned expertise on government projects
  </ServiceCard>
</Section>
```

### Contact Page Implementation

**Split Path Contact:**

```tsx
<Section variant="contact">
  <h2>Ready to Start Your Partnership?</h2>

  {/* Client Partnership Path */}
  <ContactCard>
    <MaterialIcon icon="handshake" size="2xl" />
    <h3>Start a Project Partnership</h3>
    <p>Work WITH us on your construction project</p>
    <Button variant="primary">
      <MaterialIcon icon="event" />
      Schedule Consultation
    </Button>
  </ContactCard>

  {/* Trade Partnership Path */}
  <ContactCard>
    <MaterialIcon icon="group" size="2xl" />
    <h3>Join Our Trade Network</h3>
    <p>Grow your business as a trade partner</p>
    <Button variant="secondary">
      <MaterialIcon icon="person_add" />
      Apply to Network
    </Button>
  </ContactCard>
</Section>
```

### Trade Partners Page Implementation

```tsx
<Section className="trade-partners">
  <h1>Join the MH Construction Trade Network</h1>
  <p>
    Grow your business with a veteran-owned construction leader. Access
    consistent, quality projects and professional partnership opportunities
    throughout the Pacific Northwest.
  </p>

  <BenefitsList icon="check_circle">
    <Benefit>Consistent project flow year-round</Benefit>
    <Benefit>Fair payment terms and professional treatment</Benefit>
    <Benefit>Long-term partnership growth opportunities</Benefit>
    <Benefit>Priority for veteran-owned businesses</Benefit>
  </BenefitsList>

  <Button variant="primary" size="lg">
    <MaterialIcon icon="person_add" />
    Join Our Trade Network
  </Button>
</Section>
```

---

## 🎨 UI/UX Elements

### Button Text Standards

#### Client Partnership Buttons

```tsx
// Primary Actions
"Schedule Free Consultation";
"Start Your Project Partnership";
"Get Professional Estimate";
"Partner With Us";
"Begin Your Partnership";

// Secondary Actions
"Get Instant AI Estimate";
"Try Automated Estimator";
"Explore Pricing";
"Learn More";
"View Portfolio";
```

#### Trade Partnership Buttons

```tsx
// Primary Actions
"Join Our Trade Network";
"Become a Trade Partner";
"Apply to Network";
"Partner as Subcontractor";

// Secondary Actions
"View Network Benefits";
"Download Application";
"Learn About Partnership";
"Contact Trade Relations";
```

### Navigation Labels

#### Main Navigation

```text
Home | Services | Projects | About | Team | Contact

// Services Dropdown
- Residential Partnership
- Commercial Partnership
- Government Partnership
- Automated Estimator
- Trade Partners
```

#### Footer Navigation

```text
Client Partnerships
├── Schedule Consultation
├── Get AI Estimate
├── View Services
└── Project Portfolio

Trade Partnerships
├── Join Network
├── Application Process
├── Partner Benefits
└── Trade Portal Login
```

### Form Labels

#### Client Contact Form

```text
Your Name*
Project Type*
[ ] Residential  [ ] Commercial  [ ] Government
Preferred Service:
[ ] Schedule Consultation (Recommended)
[ ] Start with Automated Estimate
Project Description*
Phone Number*
Email Address*
Preferred Contact Method: [ ] Phone  [ ] Email
```

#### Trade Partner Application

```text
Company Name*
Trade Specialty*
Years in Business*
Licensing Information*
Insurance Details*
Service Area*
Why Join MH Network?*
Veteran-Owned? [ ] Yes  [ ] No
```

---

## 📊 Quality Guidelines

### Implementation Checklist

#### Client Partnership Messaging

- [ ] All CTAs use "partnership" language (not "hire us" or "get quote")
- [ ] MaterialIcon `handshake` used for client partnership actions
- [ ] "We work WITH you" messaging prominent
- [ ] Service descriptions emphasize collaboration
- [ ] Consultation scheduling prioritized over automated tools
- [ ] MH brand colors (Hunter Green/Leather Tan) used consistently

#### Trade Partnership Messaging

- [ ] Clear distinction from client partnerships
- [ ] MaterialIcon `group` used for trade network actions
- [ ] Professional business-focused language
- [ ] Benefits clearly communicated (consistent work, fair terms, growth)
- [ ] Application process clearly explained
- [ ] Veteran-owned business priority mentioned

#### Service Type Distinctions

- [ ] Automated Estimator labeled as "Automated" or "AI" (not "instant quote")
- [ ] MaterialIcon `smart_toy` used for automated estimator
- [ ] Consultation labeled as "Free" and emphasizes human expertise
- [ ] MaterialIcon `event` used for consultation scheduling
- [ ] Both options presented with clear distinctions
- [ ] Proper context provided for when to use each service

### Testing Checklist

#### User Experience Testing

- [ ] Users can clearly distinguish client vs trade partnership paths
- [ ] Service type options (Automated vs Consultation) are clearly differentiated
- [ ] CTAs are prominent and action-oriented
- [ ] Navigation makes sense for both client and trade audiences
- [ ] Forms collect appropriate information for each audience
- [ ] Mobile experience maintains clarity and distinction

#### Content Consistency Testing

- [ ] "Partnership" language used consistently across site
- [ ] No outdated "customer" or "client" language in partnership contexts
- [ ] Trade partner content doesn't mix with client project content
- [ ] Service descriptions align with partnership philosophy
- [ ] Testimonials reflect partnership experience
- [ ] Case studies emphasize collaborative approach

#### Technical Implementation Testing

- [ ] MaterialIcon components render correctly
- [ ] Button variants and colors match specifications
- [ ] Icons are appropriate size and color
- [ ] Forms submit to correct endpoints (client vs trade)
- [ ] Links direct to appropriate pages
- [ ] Mobile responsive behavior maintained

---

## 📋 Quick Reference

### Icon Quick Reference

| Purpose                 | Icon | Material Name  | Usage               |
| ----------------------- | ---- | -------------- | ------------------- |
| Client Partnership      | 🤝   | `handshake`    | Primary client CTAs |
| Consultation Scheduling | 📅   | `event`        | Book appointments   |
| Trade Network           | 👥   | `group`        | Trade partner CTAs  |
| Automated Estimator     | 🤖   | `smart_toy`    | AI/automated tools  |
| Phone Contact           | 📞   | `phone`        | Call actions        |
| Email Contact           | ✉️   | `email`        | Email actions       |
| Location                | 📍   | `place`        | Address/location    |
| Projects                | 🏗️   | `construction` | Portfolio           |

### Color Quick Reference

| Purpose            | Color             | Hex Code | Usage                    |
| ------------------ | ----------------- | -------- | ------------------------ |
| Primary Brand      | Hunter Green      | #386851  | Primary buttons, headers |
| Secondary Brand    | Leather Tan       | #BD9264  | Accents, highlights      |
| Client Partnership | Hunter Green      | #386851  | Client-focused CTAs      |
| Trade Partnership  | Professional Blue | #2563EB  | Trade-focused CTAs       |
| Automated Service  | Tech Blue         | #3B82F6  | Automated estimator      |
| Success            | Green             | #10B981  | Success states           |
| Warning            | Amber             | #F59E0B  | Warnings, alerts         |

---

## ✨ Summary

This comprehensive partnership messaging guide provides:

✅ **Clear distinction** between client and trade partnerships  
✅ **Service type clarity** for Automated Estimator vs IRL Consultation  
✅ **Consistent language** across all communications  
✅ **Visual identity standards** with MaterialIcon specifications  
✅ **Implementation examples** for all major pages  
✅ **Quality assurance** checklists and testing procedures  
✅ **Quick reference** for icons, colors, and terminology

**Core Principles:**

1. **Partnership Language:** We work WITH clients and partners
2. **Clear Distinctions:** Client partnerships ≠ Trade partnerships
3. **Service Clarity:** Automated tools vs Human consultation
4. **Visual Consistency:** Proper icons and colors throughout
5. **User-Focused:** Clear paths for different audience types

**Quick Actions:**

- **Implementing CTAs:** Use correct icon + language for audience
- **Creating content:** Follow partnership language patterns
- **Designing forms:** Collect appropriate info for each audience
- **Testing pages:** Use quality assurance checklists
- **Maintaining consistency:** Reference quick guides regularly

---

**Document Version:** 2.0.0  
**Last Updated:** December 14, 2025  
**Consolidates:** 3 previous partnership messaging documents  
**Status:** 🟢 Official Standard & Comprehensive  
**Maintained By:** MH Construction Marketing & Development Team

---

_This complete guide serves as the single source of truth for all partnership messaging, language distinctions, and
service type communications for the MH Construction website and marketing materials._
