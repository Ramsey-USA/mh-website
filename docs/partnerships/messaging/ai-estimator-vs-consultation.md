# AI Estimator vs IRL Sales Consultation - Service Distinction Guide

## 🎯 Overview

MH Construction offers two distinct pathways for project cost estimation and planning. This guide establishes clear
language, icons, and messaging to differentiate these services across all platforms.

---

## 🤖 AI Estimator (Automated Self-Service)

### Service Description

**What It Is:** An instant, automated, AI-powered cost estimation tool available 24/7 on our website that provides
preliminary project pricing based on user input.

**Who It's For:**

- Clients in early planning stages
- Budget-conscious homeowners researching costs
- Users who prefer self-service tools
- Anyone seeking immediate ballpark estimates
- Tech-savvy clients comfortable with digital tools

### Key Characteristics

- ⚡ **Instant Results** - Receive estimate in seconds
- 🤖 **AI-Powered** - Advanced algorithms providing regional estimates
- 📱 **Available 24/7** - Access anytime, anywhere
- 🔢 **Preliminary Pricing** - Ballpark estimates for planning
- 🎮 **Interactive** - Adjust parameters and see real-time changes
- 📊 **Data-Driven** - Based on historical project data
- 🏷️ **No Commitment** - Explore costs without obligation

### Icons & Visual Identity

**Primary Icon:** `smart_toy` - Robot/AI representation (MaterialIcon)
**Alternative Icons:** `calculate`, `analytics`, `auto_awesome`
**Color Palette:** Blue/tech colors suggesting innovation
**UI Style:** Modern, digital, tech-forward

### Language & Terminology

#### Recommended CTAs

- "Get Instant AI Estimate"
- "Try Our AI Estimator"
- "Get Instant AI Estimate"
- "Get Smart Estimate"
- "Start AI Estimate"
- "See Pricing Instantly"

#### Descriptive Language

- "AI-powered cost estimation"
- "Instant preliminary pricing"
- "Automated estimator system"
- "Smart cost estimation tool"
- "Digital pricing intelligence"
- "Self-service estimation"

#### Benefit Statements

- "Get instant preliminary pricing with our AI estimator"
- "Explore project costs 24/7 with our automated estimator"
- "See ballpark estimates in seconds using advanced AI"
- "Plan your budget with instant intelligent cost analysis"
- "No waiting - get preliminary pricing right now"

---

## 🤝 IRL Sales Consultation (In-Person/Human Expert)

### Service Description

**What It Is:** A personalized, in-depth consultation with a qualified MH Construction sales representative who
visits your site, understands your vision, and provides detailed professional estimates.

**Who It's For:**

- Clients ready to move forward with projects
- Complex projects requiring site evaluation
- Those who prefer personal interaction
- Projects needing custom solutions
- Clients seeking expert guidance and advice

### Key Characteristics

- 👤 **Human Expert** - Personal interaction with experienced sales rep
- 🏗️ **Site Visit** - On-location assessment and evaluation
- 📋 **Preliminary Estimate** - Initial pricing for budget planning
- 💬 **Two-Way Dialogue** - Ask questions, discuss options
- 🎯 **Customized** - Tailored to your specific needs
- 📅 **Scheduled** - Appointment-based service
- 🤝 **Relationship Building** - Start of your partnership journey

### Icons & Visual Identity

**Primary Icon:** `handshake` - Human connection (MaterialIcon)
**Alternative Icons:** `event`, `place`, `phone`, `engineering`
**Color Palette:** Warm colors (orange/green) suggesting personal connection
**UI Style:** Professional, approachable, relationship-focused

### Language & Terminology

#### Recommended CTAs

- "Schedule Free Consultation"
- "Book Site Visit"
- "Meet with Sales Rep"
- "Get Professional Estimate"
- "Request In-Person Consultation"
- "Speak with Expert"
- "Schedule Discovery Call"

#### Descriptive Language

- "Professional in-person consultation"
- "Expert site evaluation"
- "Personal sales consultation"
- "Customized estimate from our team"
- "Face-to-face project discussion"
- "Human expert assessment"

#### Benefit Statements

- "Schedule a free consultation with our experienced sales team"
- "Get a detailed professional estimate with an on-site visit"
- "Discuss your project vision with a construction expert"
- "Receive personalized guidance from our sales representatives"
- "Book a site visit for comprehensive project assessment"

---

## 📊 Side-by-Side Comparison

| Feature           | AI Estimator           | IRL Consultation        |
| ----------------- | ---------------------- | ----------------------- |
| **Speed**         | Instant (seconds)      | Scheduled (days)        |
| **Interaction**   | Digital/Automated      | Human/Personal          |
| **Availability**  | 24/7 Online            | Business Hours          |
| **Detail Level**  | Preliminary/Ballpark   | Detailed/Comprehensive  |
| **Customization** | Template-based         | Fully Customized        |
| **Best For**      | Initial Research       | Project Planning        |
| **Cost**          | Free (Self-service)    | Free (Scheduled)        |
| **Commitment**    | None Required          | Exploring Partnership   |
| **Site Visit**    | Not Included           | Included                |
| **Expert Advice** | AI Guidance            | Human Expertise         |
| **MaterialIcon**  | `smart_toy`            | `handshake`             |
| **CTA Example**   | "Get Instant Estimate" | "Schedule Consultation" |

---

## 🎨 Implementation Guidelines

### Homepage Implementation

**Dual CTA Approach:**

````tsx
// AI Estimator Section
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Get Instant AI Estimate</span>
</Button>

// Consultation Section
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>
```text

### Services Page Implementation

**Estimation Services Section:**

```markdown
## Project Cost Estimation

### Two Ways to Get Pricing:

#### 1. Instant AI Estimator

Icon: MaterialIcon "smart_toy"
Get preliminary project costs in seconds with our AI-powered estimator.
Available 24/7 for immediate budget planning.
[Try AI Estimator →]

#### 2. Professional Consultation

Icon: MaterialIcon "handshake" or "event"
Schedule a site visit with our sales team for detailed, customized estimates.
Expert guidance tailored to your specific project.
[Schedule Consultation →]
```text

### Contact Page Implementation

**Service Selection:**

```markdown
## How Would You Like to Proceed?

○ Get Instant AI Estimate (Automated, Immediate)
→ Use our digital estimator for quick preliminary pricing

○ Schedule Sales Consultation (In-Person, Detailed)
→ Meet with our team for comprehensive project assessment
```text

---

## 🔄 User Journey Mapping

### AI Estimator Journey

1. **Discovery:** User finds AI estimator on website
2. **Input:** Enters project parameters (type, size, materials)
3. **Results:** Receives instant preliminary estimate
4. **Options:**
   - Save/email estimate
   - Adjust parameters to explore options
   - **Upgrade to consultation** if ready to proceed
5. **Next Step:** Schedule consultation when ready

### IRL Consultation Journey

1. **Request:** User schedules consultation via form/phone
2. **Confirmation:** Sales rep contacts to schedule site visit
3. **Preparation:** Rep reviews project details before meeting
4. **Site Visit:** In-person meeting, site evaluation, discussion
5. **Estimate:** Detailed professional estimate provided
6. **Follow-up:** Continue partnership dialogue
7. **Next Step:** Contract and project kickoff

---

## 📱 Mobile Considerations

### AI Estimator Mobile

- Prominent placement in mobile navigation
- Quick access from sticky header
- Full-screen estimator experience
- Easy parameter adjustment
- Share/save functionality

### Consultation Mobile

- Tap-to-call functionality prominent
- Easy form access with minimal fields
- Calendar integration for scheduling
- Location services for site address

---

## 🎯 Marketing Messages

### AI Estimator Marketing

**Value Propositions:**

- "See Your Project Cost in Seconds"
- "Military-Grade AI Pricing Technology"
- "Regional Pricing Intelligence"
- "No Appointment Needed"
- "Explore Options Instantly"

**Use Cases:**

- "Planning your budget? Try our AI estimator"
- "Not sure what it costs? Get instant preliminary pricing"
- "Research phase? Use our 24/7 cost calculator"

### IRL Consultation Marketing

**Value Propositions:**

- "Expert Guidance from Experienced Team"
- "Personalized Project Assessment"
- "Professional Site Evaluation"
- "Preliminary Pricing Estimates"
- "Start Your Partnership Journey"

**Use Cases:**

- "Ready to move forward? Schedule your consultation"
- "Complex project? Our experts will visit your site"
- "Want professional advice? Meet with our sales team"

---

## ✅ Quality Assurance Checklist

### Before Publishing - AI Estimator Content

- [ ] Uses 🤖 `smart_toy` or calculator icons consistently
- [ ] Emphasizes "instant," "automated," "AI-powered" language
- [ ] Clearly states "preliminary" or "ballpark" estimate nature
- [ ] Includes 24/7 availability messaging
- [ ] CTAs use words like "calculate," "instant," "try now"
- [ ] Clearly states "preliminary" or "ballpark" estimate nature
- [ ] Links to consultation option for next step

### Before Publishing - IRL Consultation Content

- [ ] Uses 🤝 `handshake` or person icons consistently
- [ ] Emphasizes "expert," "professional," "personalized" language
- [ ] Mentions site visit and in-person interaction
- [ ] Includes scheduling/appointment language
- [ ] CTAs use words like "schedule," "meet," "consult"
- [ ] Highlights human expertise and relationship building
- [ ] Clear about business hours and appointment process

### Cross-Service Consistency

- [ ] Both services clearly differentiated on all pages
- [ ] No confusion between automated and human services
- [ ] Upgrade path from AI to consultation is clear
- [ ] Icons are used consistently across all platforms
- [ ] CTAs are distinct and never ambiguous
- [ ] Both options presented as complementary, not competitive

---

## 📞 Contact Information Distinction

### AI Estimator Support

- **Access:** Website tool at /estimator
- **Help:** AI chatbot assistance
- **Tech Support:** <office@mhc-gc.com>
- **Purpose:** Tool usage, technical questions

### Sales Consultation Booking

- **Phone:** (509) 308-6489
- **Email:** <office@mhc-gc.com>
- **Purpose:** Schedule appointments, project discussions
- **Hours:** Monday-Friday, 8am-5pm PT

---

## 🚀 Future Enhancements

### AI Estimator Evolution

- Voice-activated estimation
- Photo-based project input
- AR visualization with costs
- Historical cost trends
- Material price alerts

### Consultation Experience

- Virtual consultation options
- 3D virtual site tours
- Digital estimate presentations
- Real-time collaboration tools
- Post-consultation portal

---

## 📖 Related Documentation

- **CTA Button Guide:** `/docs/partnerships/messaging/cta-button-guide.md`
- **Partnership Messaging:** `/docs/partnerships/messaging/partnership-messaging-guide.md`
- **Client vs Vendor:** `/docs/partnerships/messaging/client-vs-vendor-distinctions.md`
- **Services Overview:** `/docs/business/services.md`

---

**Last Updated:** October 15, 2025
**Maintained By:** Marketing & Business Development
**Next Review:** Quarterly or as services evolve

---

_Clear service distinctions create better user experiences and more qualified leads._
````
