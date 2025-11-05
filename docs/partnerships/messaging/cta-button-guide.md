# MH Construction CTA Button Guide - Service & Partnership Distinctions

## 🎯 **CTA BUTTON FRAMEWORK**

This guide provides specific button text and messaging patterns using MH Construction's MaterialIcon
standards to distinguish between:

- **AI ESTIMATOR**: Automated self-service cost estimation (MaterialIcon: `smart_toy`)
- **IRL CONSULTATION**: In-person sales consultation (MaterialIcon: `event` or `handshake`)
- **CLIENT PARTNERSHIPS**: Project collaborations (MaterialIcon: `handshake`)
- **TRADE PARTNERSHIPS**: Vendor/subcontractor relationships (MaterialIcon: `construction`)

---

## 🤖 **AI ESTIMATOR CTA BUTTONS**

### **Automated Self-Service Cost Estimation**

**MaterialIcon:** `smart_toy`
**Color:** Leather Tan (#BD9264) - Secondary brand color for AI features
**Style:** Modern, digital, instant-action focused

````tsx
// Primary AI Estimator CTAs (using MH branding standards)
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Get Instant AI Estimate</span>
</Button>

<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Try AI Cost Calculator</span>
</Button>

<Button variant="secondary" size="lg">
  <MaterialIcon icon="calculate" size="lg" className="mr-3" />
  <span className="font-medium">Calculate Project Cost</span>
</Button>
```text

**Button Text Options:**

- "Get Instant AI Estimate"
- "Try AI Cost Calculator"
- "Calculate Project Cost Now"
- "See Pricing Instantly"
- "Use Smart Estimator"
- "Get Preliminary Pricing"

---

## 🤝 **IRL CONSULTATION CTA BUTTONS**

### **In-Person Professional Sales Consultation**

**MaterialIcon:** `event` or `handshake`
**Color:** Hunter Green (#386851) - Primary brand color
**Style:** Personal, professional, relationship-focused

```tsx
// Primary Consultation CTAs (using MH branding standards)
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>

<Button variant="primary" size="lg">
  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
  <span className="font-medium">Meet with Sales Rep</span>
</Button>

<Button variant="primary" size="lg">
  <MaterialIcon icon="place" size="lg" className="mr-3" />
  <span className="font-medium">Book Site Visit</span>
</Button>
```text

**Button Text Options:**

- "Schedule Free Consultation"
- "Book Site Visit"
- "Meet with Sales Rep"
- "Request In-Person Estimate"
- "Speak with Expert"
- "Schedule Discovery Call"

---

## 🏠 **CLIENT PARTNERSHIP CTA BUTTONS**

### **Project Client Collaborations**

**MaterialIcon:** `handshake`, `event`, `engineering`
**Color:** Hunter Green (#386851) - Primary brand color
**Style:** Welcoming, collaborative, partnership-focused

```tsx
// Client Partnership CTAs (using MH branding standards)
<Button variant="primary" size="lg">
  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
  <span className="font-medium">Begin Partnership</span>
</Button>

<Button variant="primary" size="lg">
  <MaterialIcon icon="engineering" size="lg" className="mr-3" />
  <span className="font-medium">Discuss Your Vision</span>
</Button>
```text

### **Primary Client Actions**

```typescript
// Project Initiation CTAs with MaterialIcons
"Get Free Estimate"; // icon: handshake
"Schedule Consultation"; // icon: event
"Begin Partnership"; // icon: handshake
"Discuss Your Vision"; // icon: engineering
"Book Site Visit"; // icon: place
"Request Project Review"; // icon: visibility

// Consultation & Discovery CTAs
"Schedule Discovery Call"; // Initial project exploration
"Book Free Consultation"; // No-obligation discussion
"Arrange Site Visit"; // On-location assessment
"Plan Partnership Meeting"; // Collaborative planning session
"Schedule Project Review"; // Plans and vision review
"Book Estimate Appointment"; // Formal estimate meeting
```text

### **Secondary Client Actions**

```typescript
// Information & Exploration CTAs
"Explore Partnership Options"; // Learn about collaboration
"View Project Gallery"; // See completed work
"Read Partnership Stories"; // Client testimonials
"Download Project Guide"; // Educational resources
"Calculate Project Cost"; // AI estimator tool
"Learn Our Process"; // How we work

// Communication CTAs
"Chat with Expert"; // Live chat or contact
"Send Project Details"; // Form submission
"Ask Project Question"; // Quick inquiry
"Share Your Ideas"; // Vision sharing
"Get Project Advice"; // Expert guidance
"Connect with Team"; // Meet the people
```text

---

## 🔧 **TRADE PARTNERSHIP CTA BUTTONS**

### **Vendor/Subcontractor Business Relationships**

**MaterialIcon:** `construction`, `work`, `check_circle`
**Color:** Leather Tan (#BD9264) - Secondary brand color
**Style:** Professional, credible, business opportunity-focused

```tsx
// Trade Partnership CTAs (using MH branding standards)
<Button variant="secondary" size="lg">
  <MaterialIcon icon="construction" size="lg" className="mr-3" />
  <span className="font-medium">Join Our Trade Partnership Network</span>
</Button>

<Button variant="secondary" size="lg">
  <MaterialIcon icon="check_circle" size="lg" className="mr-3" />
  <span className="font-medium">Apply to be Approved Vendor</span>
</Button>

<Button variant="secondary" size="lg">
  <MaterialIcon icon="work" size="lg" className="mr-3" />
  <span className="font-medium">Explore Vendor Opportunities</span>
</Button>
```text

### **Primary Vendor Actions**

```typescript
// Application & Registration CTAs with MaterialIcons
"Apply to be Approved Vendor"; // icon: check_circle
"Join Our Trade Partnership Network"; // icon: construction
"Submit Vendor Application"; // icon: contact_mail
"Become a Trade Partner"; // icon: work
"Register as Approved Vendor"; // icon: work
"Apply for Trade Network"; // icon: construction

// Business Development CTAs
"Explore Vendor Opportunities"; // Business growth
"Join Professional Network"; // Trade partnerships
"Grow Your Business with Us"; // Partnership benefits
"Access Vendor Portal"; // Existing vendor login
"View Current Opportunities"; // Available projects
"Schedule Vendor Meeting"; // Business discussion
```text

### **Secondary Vendor Actions**

```typescript
// Information & Requirements CTAs
"Download Vendor Package"; // Requirements & forms
"View Partnership Requirements"; // Qualification criteria
"Learn Application Process"; // Step-by-step guide
"Check Qualification Criteria"; // Requirements review
"Access Vendor Resources"; // Tools and materials
"Read Vendor Benefits"; // Partnership advantages

// Communication CTAs
"Contact Vendor Relations"; // Dedicated vendor team
"Speak with Trade Manager"; // Business development
"Ask Partnership Questions"; // General inquiry
"Submit Trade Inquiry"; // Initial contact
"Schedule Business Discussion"; // Formal meeting
"Connect with Vendor Team"; // Direct communication
```text

---

## 📱 **CONTEXT-SPECIFIC IMPLEMENTATIONS**

### **Homepage Hero Section**

```tsx
// CLIENT VERSION - Dual CTA Approach (using MH branding standards)

// AI Estimator CTA
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Get Instant AI Estimate</span>
</Button>

// IRL Consultation CTA
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>

// TRADE PARTNERSHIP VERSION (Separate section or page)
<Button variant="secondary" size="lg">
  <MaterialIcon icon="check_circle" size="lg" className="mr-3" />
  <span className="font-medium">Apply to be Approved Vendor</span>
</Button>

<Button variant="secondary" size="lg">
  <MaterialIcon icon="construction" size="lg" className="mr-3" />
  <span className="font-medium">Join Trade Partnership Network</span>
</Button>
```text

### **Contact Page**

```tsx
// CLIENT CONTACT OPTIONS
// Option 1: AI Estimator
<Button variant="secondary">
  <MaterialIcon icon="smart_toy" size="md" className="mr-2" />
  Get Instant AI Estimate
</Button>

// Option 2: Schedule Consultation
<Button variant="primary">
  <MaterialIcon icon="event" size="md" className="mr-2" />
  Request Free Consultation
</Button>

// TRADE PARTNERSHIP CONTACT
<Button variant="secondary">
  <MaterialIcon icon="contact_mail" size="md" className="mr-2" />
  Submit Vendor Application
</Button>
```text

### **Services Page**

```tsx
// CLIENT SERVICE CTAs with MaterialIcons
<Button variant="primary">
  <MaterialIcon icon="event" size="md" className="mr-2" />
  Schedule Service Consultation
</Button>

<Button variant="secondary">
  <MaterialIcon icon="smart_toy" size="md" className="mr-2" />
  Get AI Estimate
</Button>

// TRADE OPPORTUNITY CTAs with MaterialIcons
<Button variant="secondary">
  <MaterialIcon icon="construction" size="md" className="mr-2" />
  Join This Service Network
</Button>
```text

"Become [Trade] Partner"
"Submit [Trade] Application"

````

### **Navigation Menu**

```typescript
// CLIENT-FOCUSED NAVIGATION
"Get Estimate" (prominent placement)
"Schedule Consultation"
"Our Process"
"Project Gallery"
"Contact Us"

// VENDOR-FOCUSED NAVIGATION
"Trade Partners" (separate section)
"Vendor Application"
"Partnership Opportunities"
"Vendor Portal Login"
"Vendor Resources"
```

---

## 🎨 **BUTTON STYLING GUIDELINES**

### **Client CTAs - Styling Approach**

````css
/* Primary Client CTAs */
.client-primary-cta {
  background: brand-primary (green);
  color: white;
  emphasis: high;
  placement: prominent;
}

/* Secondary Client CTAs */
.client-secondary-cta {
  background: brand-secondary (bronze);
  color: dark;
  emphasis: medium;
  placement: supporting;
}
```text

### **Vendor CTAs - Styling Approach**

```css
/* Primary Vendor CTAs */
.vendor-primary-cta {
  background: brand-accent (blue);
  color: white;
  emphasis: high;
  placement: vendor-sections;
}

/* Secondary Vendor CTAs */
.vendor-secondary-cta {
  background: outline-style;
  border: brand-accent;
  color: brand-accent;
  emphasis: medium;
  placement: supporting;
}
```text

---

## 📊 **CONVERSION TRACKING**

### **Client CTA Metrics**

```typescript
// Track Client Engagement
- "Get Free Estimate" clicks → Lead generation
- "Schedule Consultation" clicks → Meeting bookings
- "Discuss Your Vision" clicks → Discovery calls
- Form submissions → Qualified leads
- Estimate completions → Project pipeline
```text

### **Vendor CTA Metrics**

```typescript
// Track Vendor Engagement
- "Apply to be Approved Vendor" clicks → Vendor applications
- "Join Trade Network" clicks → Network growth
- "Download Vendor Package" clicks → Interest level
- Application submissions → Vendor pipeline
- Portal access → Active vendors
```text

---

## ✅ **IMPLEMENTATION CHECKLIST**

### **Client CTA Implementation**

- [ ] Replace "Get Quote" with "Get Free Estimate"
- [ ] Replace "Contact Us" with "Schedule Consultation"
- [ ] Add "Discuss Your Vision" for discovery calls
- [ ] Include "Book Site Visit" for property projects
- [ ] Update form submit buttons to "Request Free Consultation"
- [ ] Ensure all client CTAs lead to consultation/estimate flows

### **Vendor CTA Implementation**

- [ ] Create "Apply to be Approved Vendor" primary CTA
- [ ] Add "Join Our Trade Partnership Network" secondary CTA
- [ ] Include "Download Vendor Package" information CTA
- [ ] Update vendor forms to "Submit Vendor Application"
- [ ] Ensure all vendor CTAs lead to application/qualification flows
- [ ] Create separate vendor navigation and contact paths

---

**CTA Button Guide** | **Version 1.0** | **October 14, 2025**
_Implementing clear distinctions between client partnerships and trade partnerships_
````
