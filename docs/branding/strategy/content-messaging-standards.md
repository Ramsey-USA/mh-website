# MH Construction Content & Messaging Standards

**Version:** 4.0.2  
**Last Updated:** December 2024  
**Status:** ✅ Active Standard

> **Purpose:** Standardized content patterns and messaging guidelines to ensure consistent voice, tone, and  
> communication across the entire website.

---

## 📝 **Content Writing Standards**

### **Brand Voice Principles**

- **Professional Authority:** Confident, knowledgeable, expert tone
- **Veteran Values:** Honor, integrity, precision, reliability
- **Client-Focused:** Building for the client, not the dollar
- **Solution-Oriented:** Problem-solving mindset in all copy

### **Required Messaging Patterns**

#### **Hero Section Content**

```markdown
// Standard Hero Pattern
Context Line: "Professional [Service/Industry] Solutions"
Main Headline: "Building [Specific Value] for [Target Audience]"
Subheadline: "Veteran-owned excellence where your [outcome] comes first"
CTA: "Schedule Free Consultation" or "Get Expert Estimate"
```

#### **Section Headers**

```markdown
// Standard Section Pattern  
Context: "[Department/Service] Excellence"
Title: "[Specific Benefit/Value]"
Description: "Professional [service] delivering [outcome] through [method/values]"
```

### **Forbidden Content Patterns**

- **NO Sales Pressure:** Avoid aggressive sales language
- **NO Superlatives:** Eliminate "best," "greatest," "ultimate"
- **NO Jargon:** Use clear, accessible language
- **NO Emojis:** Professional text only with Material Icons

---

## 🎯 **Call-to-Action Standards**

### **Primary CTA Language**

- **Consultation Focused:** "Schedule Free Consultation"
- **Expert Positioning:** "Get Expert Estimate"
- **Partnership Language:** "Begin Our Partnership"
- **Discovery Based:** "Explore Our Solutions"

### **Secondary CTA Language**

- **Portfolio:** "View Our Work"
- **Information:** "Learn More"
- **Contact:** "Get In Touch"
- **Services:** "Our Services"

### **CTA Button Implementation**

```tsx
// Primary consultation CTA
<Button variant="primary" size="xl">
  <MaterialIcon icon="event" className="mr-3" />
  Schedule Free Consultation
</Button>

// Secondary information CTA
<Button variant="outline" size="lg">
  <MaterialIcon icon="visibility" className="mr-3" />
  View Our Work
</Button>
```

---

## 📞 **Contact Information Standards**

### **Required Contact Display**

- **Phone Number:** (509) 308-6489 (consistent formatting)
- **Business Hours:** Monday-Friday, 7:00 AM - 6:00 PM PST
- **Response Time:** "We respond within 24 hours"
- **Emergency:** "For urgent matters, call directly"

### **Contact Section Pattern**

```tsx
<div className="text-gray-600 dark:text-gray-300 space-y-2">
  <div className="flex items-center gap-2">
    <MaterialIcon icon="phone" size="sm" className="text-brand-primary" />
    <span>(509) 308-6489</span>
  </div>
  <div className="flex items-center gap-2">
    <MaterialIcon icon="schedule" size="sm" className="text-brand-primary" />
    <span>Monday-Friday, 7:00 AM - 6:00 PM PST</span>
  </div>
  <div className="flex items-center gap-2">
    <MaterialIcon icon="reply" size="sm" className="text-brand-primary" />
    <span>We respond within 24 hours</span>
  </div>
</div>
```

---

## 🏗️ **Service Descriptions Standards**

### **Service Card Content Pattern**

```markdown
Title: "[Specific Service Name]"
Description: "Professional [service type] delivering [specific outcome] through [method/approach]. Our veteran-owned team ensures [quality promise] with [unique value]."
Features: 3-5 bullet points starting with action verbs
CTA: "Learn More" or "Get Estimate"
```

### **Project Outcome Language**

- **Results-Focused:** Specific measurable outcomes
- **Quality Emphasis:** Professional standards and precision
- **Timeline Commitments:** Realistic, achievable deadlines
- **Client Satisfaction:** Owner-focused completion criteria

---

## 🎖️ **Veteran Messaging Standards**

### **Veteran Value Proposition**

- **Core Message:** "Veteran-owned excellence where your success comes first"
- **Values Integration:** Honor, integrity, precision, reliability
- **Service Connection:** Military discipline applied to construction
- **Trust Building:** Battle-tested leadership and commitment

### **Veteran-Specific Content**

```markdown
// Veteran Recognition
"As fellow veterans, we understand the importance of [precision/reliability/commitment]"

// Military Values in Construction
"We bring military precision to every [project/detail/timeline]"

// Veteran Partnership
"Veteran-to-veteran partnerships built on [trust/honor/excellence]"
```

---

## 📋 **Form Copy Standards**

### **Form Introduction Text**

```markdown
// Contact Forms
"Ready to discuss your project? Share your details below and we'll connect within 24 hours to begin planning your success."

// Partnership Forms  
"Interested in working together? Tell us about your business and we'll explore partnership opportunities that benefit both our teams."

// Service Request Forms
"Need expert construction services? Describe your project and we'll provide a detailed consultation and accurate estimate."
```

### **Form Field Labels**

- **Professional Clarity:** Clear, specific field purposes
- **Required Indicators:** Visual markers for required fields
- **Helper Text:** Context for complex fields
- **Error Messages:** Helpful, solution-oriented guidance

---

## 📈 **Success Metrics Language**

### **Quantifiable Results**

- **Project Completion:** "Delivered on time and within budget"
- **Client Satisfaction:** "100% client satisfaction guarantee"
- **Quality Standards:** "Zero-defect construction standards"
- **Response Time:** "24-hour response commitment"

### **Testimonial Standards**

```markdown
// Client Testimonial Pattern
"[Specific result achieved] - [Client Name], [Project Type]"

Example: "Completed our office renovation 2 weeks ahead of schedule while staying within budget - Sarah Johnson, Commercial Property Manager"
```

---

## 🔍 **Content Quality Checklist**

### **Pre-Publication Review**

- [ ] Professional, authoritative tone maintained
- [ ] Veteran values integrated naturally
- [ ] Client benefits clearly stated
- [ ] No sales pressure or superlatives
- [ ] Material Icons used instead of emojis
- [ ] Contact information consistent
- [ ] CTA language follows standards
- [ ] Grammar and spelling reviewed
- [ ] Brand voice guidelines followed
- [ ] Accessibility considerations included

---

## 📚 **Content Templates**

### **Page Introduction Template**

```markdown
# [Page Title]

[Brief context about the service/topic]

At MH Construction, we deliver [specific value] through [approach/method]. Our veteran-owned team brings [unique qualities] to every project, ensuring [client benefit] with [quality promise].

[Call-to-action aligned with page purpose]
```

### **Service Section Template**

```markdown
## [Service Category] Excellence

### [Specific Service Title]

Professional [service description] designed to [achieve specific outcome]. We combine [method/approach] with [veteran values] to deliver [measurable results].

**What You Get:**

- [Specific benefit 1]
- [Specific benefit 2]
- [Specific benefit 3]

[Secondary CTA - "Learn More" or "Get Estimate"]
```

---

## 📞 **Communication Guidelines**

### **Email Response Templates**

- **Initial Contact:** Professional acknowledgment within 24 hours
- **Consultation Booking:** Clear next steps and preparation
- **Project Updates:** Regular progress communication
- **Completion Follow-up:** Satisfaction confirmation and future support

### **Phone Communication Standards**

- **Professional Greeting:** "MH Construction, [name] speaking"
- **Active Listening:** Confirm understanding of client needs
- **Clear Next Steps:** Specific actions and timelines
- **Documentation:** Follow up verbal agreements in writing

---

## 📚 **Related Documentation**

- **[MH Branding Index](../branding-index.md)** - Hub for all brand documentation
- **[Typography Standards](./typography.md)** - Text formatting standards
- **[Component Standards](./component-standards.md)** - UI component guidelines
- **[Icon Policy](./icon-policy.md)** - Material Icons standards

---

**Maintained by:** MH Construction Development Team  
**Questions?** Contact the marketing team for content review and approval
