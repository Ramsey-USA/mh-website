# MH Construction CTA Standardization Plan

**Date:** November 4, 2025  
**Standards Reference:** [Content & Messaging Standards](./content-messaging-standards.md)  
**Status:** 🔄 Implementation Phase

---

## 📊 **Current CTA Analysis**

### ✅ **COMPLIANT CTAs** (Already Following Standards)

1. **"Schedule Free Consultation"** - ✅ Perfect
   - Found in: homepage, about page, services page
   - Variant: `primary`
   - Icon: `event`

2. **"Get Instant AI Estimate"** - ✅ Good (AI-specific)
   - Found in: homepage, contact page
   - Variant: `secondary`
   - Icon: `smart_toy`

3. **"View Our Work"** - ✅ Perfect
   - Standard secondary portfolio CTA
   - Should be used consistently

### ⚠️ **NON-COMPLIANT CTAs** (Need Standardization)

#### **Portfolio/Projects Variations**

```tsx
// FOUND VARIATIONS (need standardization)
"View Portfolio" ❌
"Explore our collaborations" ❌  
"View Projects" ❌
"See Our Work" ❌
"Our Projects" ❌

// SHOULD BE (standardized)
"View Our Work" ✅
```

#### **Contact/Connection Variations**

```tsx
// FOUND VARIATIONS
"Connect with Expert" ❌
"Get In Touch" ❌
"Contact Us" ❌
"Let's Connect" ❌
"Start Partnership" ❌

// SHOULD BE (standardized)
"Begin Our Partnership" ✅ (forms/major actions)
"Get In Touch" ✅ (secondary contact)
```

#### **Services/Information Variations**

```tsx
// FOUND VARIATIONS
"Explore Services" ❌
"Explore Capabilities" ❌
"Explore Partnership Approach" ❌
"Our Services" ❌

// SHOULD BE (standardized) 
"Explore Our Solutions" ✅ (primary)
"Our Services" ✅ (secondary)
```

#### **Career/Application Variations**

```tsx
// FOUND VARIATIONS
"Apply Now" ❌
"Submit General Application" ❌
"Contact HR" ❌
"Join Our Team" ❌

// SHOULD BE (career-specific approved)
"Apply for Position" ✅
"Submit Application" ✅
"Contact HR Team" ✅
"Join Our Team" ✅ (this one is actually okay)
```

---

## 🎯 **Standardization Implementation Plan**

### **Phase 1: Primary CTAs** (High Impact)

#### **1.1 Portfolio/Work Viewing**

**Target Text:** "View Our Work"
**Files to Update:**

- `/src/app/page.tsx` - Multiple instances
- `/src/app/contact/page.tsx` - Main CTA grid
- `/src/app/projects/page.tsx` - Navigation

#### **1.2 Partnership/Contact Actions**

**Target Text:** "Begin Our Partnership" (major forms) / "Get In Touch" (secondary)
**Files to Update:**

- `/src/app/contact/page.tsx` - Hero section
- `/src/app/page.tsx` - Connection CTAs

#### **1.3 Services/Solutions**

**Target Text:** "Explore Our Solutions"
**Files to Update:**

- `/src/app/booking/page.tsx` - Service exploration
- `/src/app/about/page.tsx` - Partnership approach

### **Phase 2: Secondary CTAs** (Medium Impact)

#### **2.1 Information/Learn More**

**Standard:** "Learn More" (keep as-is, widely used correctly)

#### **2.2 Navigation CTAs**

**Standards:**

- "Our Services" ✅
- "Our Team" ✅  
- "Our Projects" → "View Our Work" ✅

### **Phase 3: Specialized CTAs** (Context Specific)

#### **3.1 Career CTAs**

- "Apply for Position" (specific roles)
- "Submit Application" (general applications)
- "Join Our Team" ✅ (navigation/general)

#### **3.2 Technical CTAs**

- "Get Expert Estimate" ✅ (AI alternative)
- "Schedule Free Consultation" ✅ (primary)

---

## 🚀 **Implementation Steps**

### **Step 1: Homepage Standardization**

Key file: `/src/app/page.tsx`

**Current Issues:**

1. "View Portfolio" → "View Our Work"
2. "Connect with Expert" → "Get In Touch"  
3. "Explore our collaborations" → "View Our Work"

### **Step 2: Contact Page Standardization**

Key file: `/src/app/contact/page.tsx`

**Current Issues:**

1. "Our Projects" → "View Our Work"
2. "Join Our Team" ✅ (already good)
3. "View Services" → "Explore Our Solutions"

### **Step 3: Projects Page Standardization**  

Key file: `/src/app/projects/page.tsx`

**Current Issues:**

1. "Start Partnership" → "Begin Our Partnership"
2. "Explore Capabilities" → "Explore Our Solutions"

### **Step 4: About Page Standardization**

Key file: `/src/app/about/page.tsx`

**Current Issues:**

1. "Explore Partnership Approach" → "Explore Our Solutions"

---

## 📋 **Priority Fix List**

### **🔥 HIGH PRIORITY** (User-facing impact)

1. **Homepage hero CTAs** - Most visible
2. **Contact page main CTAs** - Primary conversion path
3. **Navigation consistency** - Site-wide experience

### **🟡 MEDIUM PRIORITY** (Consistency improvement)

1. **About page CTAs** - Secondary pages
2. **Project page CTAs** - Portfolio section
3. **Service page CTAs** - Information architecture

### **🟢 LOW PRIORITY** (Minor inconsistencies)

1. **Career page CTAs** - Specialized context
2. **Booking page CTAs** - Process-specific
3. **Footer CTAs** - Supporting elements

---

## 📝 **Approved CTA Reference**

### **Primary CTAs** (Use `variant="primary"`)

- "Schedule Free Consultation" + `event` icon
- "Begin Our Partnership" + `handshake` icon
- "Get Expert Estimate" + `calculate` icon

### **Secondary CTAs** (Use `variant="secondary"` or `variant="outline"`)

- "View Our Work" + `visibility` icon
- "Explore Our Solutions" + `build` icon  
- "Get In Touch" + `contact_phone` icon
- "Learn More" + `arrow_forward` icon

### **Specialized CTAs** (Context dependent)

- "Get Instant AI Estimate" + `smart_toy` icon
- "Apply for Position" + `send` icon
- "Our Services" + `construction` icon

---

## ✅ **Success Metrics**

### **Target Compliance** (30 days)

- Primary CTA Consistency: 100%
- Secondary CTA Alignment: 95%
- Icon-Text Pairing: 100%
- Brand Voice Adherence: 95%

### **Quality Measures**

- Zero non-approved CTA language
- Consistent icon usage with approved CTAs
- Proper button variants aligned with CTA hierarchy
- Brand voice maintained across all touchpoints

---

**Next Action:** Begin implementing Phase 1 homepage standardization
