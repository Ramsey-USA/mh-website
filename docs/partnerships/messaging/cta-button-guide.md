# MH Construction CTA Button Guide - Client vs Vendor Distinctions

## 🎯 **CTA BUTTON FRAMEWORK**

This guide provides specific button text and messaging patterns to distinguish between:

- **CLIENT PARTNERSHIPS**: Project collaborations with homeowners, businesses, and organizations
- **VENDOR PARTNERSHIPS**: Trade relationships with subcontractors, suppliers, and service providers

---

## 🏠 **CLIENT-FOCUSED CTA BUTTONS**

### **Primary Client Actions**

```typescript
// Project Initiation CTAs
"Get Free Estimate"           // Replaces generic "Get Quote"
"Schedule Consultation"       // Replaces generic "Contact Us"
"Begin Partnership"          // Replaces generic "Start Project"
"Discuss Your Vision"        // For discovery calls
"Book Site Visit"            // For property assessments
"Request Project Review"     // For existing plans

// Consultation & Discovery CTAs
"Schedule Discovery Call"    // Initial project exploration
"Book Free Consultation"    // No-obligation discussion
"Arrange Site Visit"         // On-location assessment
"Plan Partnership Meeting"   // Collaborative planning session
"Schedule Project Review"    // Plans and vision review
"Book Estimate Appointment" // Formal estimate meeting
```

### **Secondary Client Actions**

```typescript
// Information & Exploration CTAs
"Explore Partnership Options"    // Learn about collaboration
"View Project Gallery"          // See completed work
"Read Partnership Stories"      // Client testimonials
"Download Project Guide"        // Educational resources
"Calculate Project Cost"        // AI estimator tool
"Learn Our Process"            // How we work

// Communication CTAs
"Chat with Expert"             // Live chat or contact
"Send Project Details"         // Form submission
"Ask Project Question"         // Quick inquiry
"Share Your Ideas"            // Vision sharing
"Get Project Advice"          // Expert guidance
"Connect with Team"           // Meet the people
```

---

## 🔧 **VENDOR-FOCUSED CTA BUTTONS**

### **Primary Vendor Actions**

```typescript
// Application & Registration CTAs
"Apply to be Approved Vendor"      // Main vendor application
"Join Our Trade Partnership Network" // Network membership
"Submit Vendor Application"         // Application process
"Become a Trade Partner"           // Partnership opportunity
"Register as Approved Vendor"      // Vendor registration
"Apply for Trade Network"          // Network application

// Business Development CTAs
"Explore Vendor Opportunities"     // Business growth
"Join Professional Network"        // Trade partnerships
"Grow Your Business with Us"       // Partnership benefits
"Access Vendor Portal"            // Existing vendor login
"View Current Opportunities"       // Available projects
"Schedule Vendor Meeting"         // Business discussion
```

### **Secondary Vendor Actions**

```typescript
// Information & Requirements CTAs
"Download Vendor Package"          // Requirements & forms
"View Partnership Requirements"    // Qualification criteria
"Learn Application Process"        // Step-by-step guide
"Check Qualification Criteria"     // Requirements review
"Access Vendor Resources"         // Tools and materials
"Read Vendor Benefits"           // Partnership advantages

// Communication CTAs
"Contact Vendor Relations"        // Dedicated vendor team
"Speak with Trade Manager"        // Business development
"Ask Partnership Questions"       // General inquiry
"Submit Trade Inquiry"           // Initial contact
"Schedule Business Discussion"    // Formal meeting
"Connect with Vendor Team"       // Direct communication
```

---

## 📱 **CONTEXT-SPECIFIC IMPLEMENTATIONS**

### **Homepage Hero Section**

```typescript
// CLIENT VERSION (Default/Primary)
Primary CTA: "Get Free Estimate"
Secondary CTA: "Schedule Consultation"
Tertiary CTA: "Explore Our Process"

// VENDOR VERSION (Separate section or page)
Primary CTA: "Apply to be Approved Vendor"
Secondary CTA: "Join Trade Partnership Network"
Tertiary CTA: "View Vendor Requirements"
```

### **Contact Page**

```typescript
// CLIENT CONTACT FORM
Submit Button: "Request Free Consultation"
Alt Submit: "Schedule Project Discussion"
Quick Action: "Get Instant Estimate"

// VENDOR CONTACT FORM
Submit Button: "Submit Vendor Application"
Alt Submit: "Request Partnership Information"
Quick Action: "Download Vendor Package"
```

### **Services Page**

```typescript
// CLIENT SERVICE CTAs
"Schedule Service Consultation"
"Get Project Estimate"
"Discuss This Service"
"Plan Your Project"
"Book Service Review"

// VENDOR OPPORTUNITY CTAs
"Apply for This Trade"
"Join This Service Network"
"Become [Trade] Partner"
"Submit [Trade] Application"
```

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

```css
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
```

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
```

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
```

### **Vendor CTA Metrics**

```typescript
// Track Vendor Engagement
- "Apply to be Approved Vendor" clicks → Vendor applications
- "Join Trade Network" clicks → Network growth
- "Download Vendor Package" clicks → Interest level
- Application submissions → Vendor pipeline
- Portal access → Active vendors
```

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
*Implementing clear distinctions between client partnerships and trade partnerships*
