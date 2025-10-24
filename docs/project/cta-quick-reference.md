# CTA & Link Branding Standards - Quick Reference

**Version:** 3.7.2  
**Last Updated:** October 15, 2025  
**Status:** Active Reference Document

---

## 🎯 Button Variants Quick Reference

| Variant       | Color                  | When to Use                                   | Example Text                 |
| ------------- | ---------------------- | --------------------------------------------- | ---------------------------- |
| **Primary**   | Hunter Green (#386851) | Main CTAs, IRL consultations, primary actions | "Schedule Free Consultation" |
| **Secondary** | Leather Tan (#BD9264)  | AI Estimator, supporting actions              | "Get Instant AI Estimate"    |
| **Outline**   | Transparent            | Subtle actions, navigation                    | "Learn More"                 |
| **Neutral**   | Theme-aware            | System actions, UI controls                   | "Back", "Cancel"             |

---

## 🤖 Service Type CTAs

### AI Estimator (Automated Self-Service)

**Button Variant:** Secondary  
**Icon:** `smart_toy`, `calculate`  
**Approved CTAs:**

- "Get Instant AI Estimate"
- "Try AI Cost Calculator"
- "Calculate Project Cost"
- "See Pricing Instantly"

**Markdown Format:**

```markdown
**AI Estimator:**

- **Get Instant AI Estimate** - Automated cost calculation (`smart_toy`)
```

---

### IRL Consultation (In-Person Professional Service)

**Button Variant:** Primary  
**Icon:** `event`, `handshake`, `place`  
**Approved CTAs:**

- "Schedule Free Consultation"
- "Book Site Visit"
- "Meet with Expert"
- "Request In-Person Estimate"

**Markdown Format:**

```markdown
**In-Person Consultation:**

- **Schedule Free Consultation** - Meet with our project specialists (`event`)
- **Book Site Visit** - Arrange an on-location assessment (`place`)
```

---

## 🤝 Partnership Type CTAs

### Client Partnership (Project Collaborations)

**Icon:** `handshake`, `event`, `engineering`  
**Contact:** , <office@mhc-gc.com>  
**Approved CTAs:**

- "Begin Partnership"
- "Discuss Your Vision"
- "Request Project Review"
- "Schedule Discovery Call"

**Markdown Format:**

```markdown
**Client Projects:**

- **Schedule Free Consultation** - Meet with our team (`event`)
- **Book Site Visit** - On-location assessment (`place`)

**Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Trade Partnership (Vendor/Subcontractor)

**Icon:** `construction`, `work`, `check_circle`  
**Contact:** , <office@mhc-gc.com>  
**Approved CTAs:**

- "Apply to be Approved Vendor"
- "Join Trade Network"
- "Submit Vendor Application"
- "Download Vendor Package"

**Markdown Format:**

```markdown
**Vendor Partnerships:**

- **Apply to be Approved Vendor** - Join our network (`check_circle`)
- **Download Vendor Package** - Get requirements (`download`)

**Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

## 📞 Contact Information Standards

### Phone Numbers

```markdown
✅ CORRECT:
[(509) 308-6489](tel:+15093086489) # Client contact
[(509) 308-6489](tel:+15093086489) # Vendor contact

❌ INCORRECT:
 (509) 308-6489 # Correct format
Call us at (509) 308-6489 # Not linked
```

### Email Addresses

```markdown
✅ CORRECT:
[office@mhc-gc.com](mailto:office@mhc-gc.com) # Client email
[office@mhc-gc.com](mailto:office@mhc-gc.com) # Vendor email
[office@mhc-gc.com](mailto:office@mhc-gc.com) # General email

❌ INCORRECT:
office@mhc-gc.com # Not linked
<office@mhc-gc.com> # Wrong format
```

---

## 🔍 CTA Text Standards

### ✅ APPROVED CTA Phrases

**Client Actions:**

- Schedule Free Consultation
- Book Site Visit
- Request Project Review
- Discuss Your Vision
- Begin Partnership
- Meet with Expert

**Vendor Actions:**

- Apply to be Approved Vendor
- Join Trade Network
- Download Vendor Package
- Submit Vendor Application

**AI Estimator:**

- Get Instant AI Estimate
- Try AI Cost Calculator
- Calculate Project Cost

**Information:**

- Learn More About [Specific Topic]
- View Project Gallery
- Explore Our Services
- Download [Specific Resource]

---

### ❌ DEPRECATED CTA Phrases (Do Not Use)

**Replace These:**

- ❌ "Contact Us" → ✅ "Schedule Free Consultation"
- ❌ "Get in Touch" → ✅ "Book Site Visit"
- ❌ "Reach Out" → ✅ "Meet with Expert"
- ❌ "Click Here" → ✅ Use descriptive text
- ❌ "Learn More" (alone) → ✅ "Learn More About [Topic]"
- ❌ "Submit" → ✅ "Request Free Consultation"

---

## 🎨 MaterialIcon References

### Common CTA Icons

| CTA Type     | Icon Name      | Usage                 |
| ------------ | -------------- | --------------------- |
| Schedule     | `event`        | Consultation bookings |
| Location     | `place`        | Site visits           |
| Partnership  | `handshake`    | Client relationships  |
| Construction | `construction` | Vendor partnerships   |
| AI/Tech      | `smart_toy`    | AI estimator          |
| Calculate    | `calculate`    | Cost calculations     |
| Apply        | `check_circle` | Vendor applications   |
| Download     | `download`     | Resource downloads    |
| Contact      | `mail`         | Email communications  |
| Phone        | `phone`        | Phone contacts        |

### Icon Format in Markdown

```markdown
**Correct Format:**

- **CTA Text** - Description (`icon_name`)

**Example:**

- **Schedule Free Consultation** - Meet with our team (`event`)
```

---

## 📝 Complete CTA Section Template

### For Client-Facing Pages

```markdown
## Get Started Today

Ready to discuss your construction project? We offer two convenient options:

### In-Person Consultation

Schedule a personalized consultation with our experienced sales team for
expert guidance and detailed planning.

**Client Services:**

- **Schedule Free Consultation** - Meet with our project specialists (`event`)
- **Book Site Visit** - Arrange an on-location assessment (`place`)
- **Request Project Review** - Submit your plans for expert analysis (`visibility`)

**Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)

### AI Cost Estimator

Get instant preliminary pricing with our automated cost estimation tool.

**AI Services:**

- **Get Instant AI Estimate** - Automated cost calculation (`smart_toy`)
- **Try AI Cost Calculator** - Quick preliminary pricing (`calculate`)

---

**Location:** Serving the Tri-Cities area (Richland, Kennewick, Pasco) and throughout
Washington, Oregon, and Idaho
```

---

### For Vendor-Facing Pages

```markdown
## Join Our Trade Partnership Network

Interested in becoming an approved vendor? We're always looking for qualified
subcontractors and suppliers.

### Vendor Opportunities

**Trade Partnerships:**

- **Apply to be Approved Vendor** - Submit your application (`check_circle`)
- **Join Trade Network** - Partner with established contractor (`construction`)
- **Download Vendor Package** - Get requirements and materials (`download`)
- **Schedule Vendor Meeting** - Discuss business opportunities (`work`)

**Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)

### Requirements

- Valid business license and insurance
- Proven track record in construction industry
- Commitment to quality and professionalism
- Tri-Cities service area coverage
```

---

## 🚫 Common Mistakes to Avoid

### 1. Missing Extension Numbers

```markdown
❌ WRONG:
Call (509) 308-6489 for more information

✅ CORRECT:
**Client Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)
```

### 2. Generic CTA Text

```markdown
❌ WRONG:
[Contact Us](#contact)

✅ CORRECT:

- **Schedule Free Consultation** - Meet with our specialists (`event`)
```

### 3. Missing Icon References

```markdown
❌ WRONG:

- Schedule Free Consultation

✅ CORRECT:

- **Schedule Free Consultation** - Meet with our team (`event`)
```

### 4. Wrong Button Variant

```markdown
❌ WRONG:
AI Estimator with Primary button variant

✅ CORRECT:
AI Estimator with Secondary button variant
IRL Consultation with Primary button variant
```

### 5. Bare URLs

```markdown
❌ WRONG:
Email: office@mhc-gc.com

✅ CORRECT:
Email: [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

## 🔄 Before & After Examples

### Example 1: Simple Contact Section

**BEFORE:**

```markdown
## Contact

For more information, contact us:
Phone: (509) 308-6489
Email: office@mhc-gc.com
```

**AFTER:**

```markdown
## Get Started Today

**Client Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)

**Vendor Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)

**General Inquiries:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Example 2: Service CTA

**BEFORE:**

```markdown
Interested in our services? Learn more or contact us today.
```

**AFTER:**

```markdown
**Ready to start your project?**

- **Schedule Free Consultation** - Meet with our specialists (`event`)
- **Get Instant AI Estimate** - Try our automated calculator (`smart_toy`)

**Contact:** [(509) 308-6489](tel:+15093086489) |
[office@mhc-gc.com](mailto:office@mhc-gc.com)
```

---

### Example 3: Navigation Link

**BEFORE:**

```markdown
[Services](../business/services.md)
```

**AFTER:**

```markdown
[**Services Overview**](../business/services.md) - Complete service offerings and capabilities
```

---

## 📚 Related Documentation

- [Full Implementation Plan](./../archive/redundant-reports/../archive/redundant-reports/../archive/redundant-reports/../archive/redundant-reports/CTA_BRANDING_UPDATE_PHASES.md)
- [Review Summary](./../archive/redundant-reports/../archive/redundant-reports/../archive/redundant-reports/../archive/redundant-reports/CTA_REVIEW_SUMMARY.md)
- [MH Branding Guidelines v3.7.2](../business/mh-branding.md)
- [CTA Button Guide](../partnerships/messaging/cta-button-guide.md)
- [Button System Documentation](../technical/design-system/buttons/button-system.md)

---

## ✅ Validation Checklist

Use this checklist when reviewing or creating markdown files:

- [ ] All CTAs use approved phrases from this guide
- [ ] Phone numbers include proper extensions ( or )
- [ ] Email addresses are properly linked with mailto:
- [ ] MaterialIcon references are included for all CTAs
- [ ] Button variants are correctly assigned (primary/secondary/outline)
- [ ] Service distinctions are clear (AI vs IRL)
- [ ] Partnership distinctions are clear (Client vs Trade)
- [ ] No deprecated phrases (Contact Us, Click Here, etc.)
- [ ] Links use descriptive text, not generic labels
- [ ] Contact information matches the audience (client vs vendor)

---

**Quick Reference Status:** ✅ Active  
**For Use By:** Content creators, developers, documentation writers  
**Last Updated:** October 15, 2025  
**Version:** 3.7.2
