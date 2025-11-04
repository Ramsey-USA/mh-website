# MH Construction Bubble Headings Policy

**Date:** November 4, 2025  
**Policy Version:** 4.1.0  
**Status:** ✅ Active Policy

---

## 🎯 **Policy Statement**

MH Construction maintains a **professional, minimal design** that emphasizes **visual content (photos/videos)** over
decorative elements. Headings should be clean and readable, not competing with background containers.

---

## ✅ **ALLOWED: Gradient Headings on Clean Backgrounds**

### **Hero Sections**

```tsx
// ✅ GOOD: Hero heading on clean background
<section className="bg-hero-image">
  <h1 className="text-white">
    <span className="bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent">
      Partnership Success Stories
    </span>
  </h1>
</section>
```

### **Page Section Headers**

```tsx
// ✅ GOOD: Section heading on clean white/dark background
<section className="bg-white dark:bg-gray-900 py-20">
  <h2 className="text-center">
    <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
      Proven Track Record
    </span>
  </h2>
</section>
```

### **Full-Width Sections**

```tsx
// ✅ GOOD: Clean background, no container interference
<div className="py-16">
  <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    Our Expertise
  </h3>
</div>
```

---

## ❌ **NOT ALLOWED: Headings Inside Bubble Containers**

### **Card Components**

```tsx
// ❌ BAD: Heading inside rounded card container
<Card className="bg-white rounded-xl shadow-lg p-6">
  <CardHeader>
    <CardTitle>
      <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
        ❌ Don't do this!
      </span>
    </CardTitle>
  </CardHeader>
</Card>

// ✅ GOOD: Solid color heading inside card
<Card className="bg-white rounded-xl shadow-lg p-6">
  <CardHeader>
    <CardTitle className="text-brand-primary">
      ✅ Use solid brand colors
    </CardTitle>
  </CardHeader>
</Card>
```

### **Rounded Background Containers**

```tsx
// ❌ BAD: Heading inside rounded background bubble
<div className="bg-gray-50 p-6 rounded-xl">
  <h3 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    ❌ Avoid this pattern
  </h3>
</div>

// ✅ GOOD: Solid color heading inside container
<div className="bg-gray-50 p-6 rounded-xl">
  <h3 className="text-brand-primary">
    ✅ Clean and professional
  </h3>
</div>
```

### **Form Sections**

```tsx
// ❌ BAD: Gradient heading inside form container
<div className="bg-white border rounded-lg p-8">
  <h4 className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    ❌ Cluttered appearance
  </h4>
</div>

// ✅ GOOD: Solid heading for form clarity
<div className="bg-white border rounded-lg p-8">
  <h4 className="text-brand-primary">
    ✅ Professional form header
  </h4>
</div>
```

---

## 🔍 **Detection Patterns**

### **Bubble Container Indicators**

- `rounded-*` classes (rounded-lg, rounded-xl, rounded-2xl, etc.)
- `bg-*` background colors or gradients on containers
- `p-*` padding combined with rounded corners
- Card components (`<Card>`, `<CardHeader>`, etc.)
- Shadow classes (`shadow-*`) indicating elevated containers

### **Clean Background Indicators**  

- Hero sections with image/video backgrounds
- Full-width page sections (`py-*`, `px-*` on section level)
- Clean `bg-white` or `bg-gray-900` page backgrounds
- No rounded containers around the heading

---

## 🎨 **Approved Color Patterns**

### **For Clean Backgrounds (Gradients OK)**

```tsx
// Primary gradient
"bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent"

// Hero gradient with white accent
"bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent"

// Subtle brand gradient
"bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-dark text-transparent"
```

### **For Bubble Containers (Solid Colors Only)**

```tsx
// Primary brand color
"text-brand-primary"

// Secondary brand color  
"text-brand-secondary"

// Dark contrast for light containers
"text-gray-900 dark:text-white"

// Muted for subtle headings
"text-gray-700 dark:text-gray-300"
```

---

## ✅ **Current Implementation Status**

### **Fixed Issues (Bubble Container Violations)**

- ✅ Booking page: "What Happens Next" (inside gray rounded container)
- ✅ Booking page: Form section headings (inside Card components)
- ✅ Any headings inside rounded divs with background colors

### **Preserved Gradients (Clean Backgrounds)**

- ✅ Booking page: "Expert Consultation" hero heading
- ✅ Projects page: "Stories" hero heading
- ✅ Projects page: "Record" section heading
- ✅ All hero section headings remain gradient-styled

### **Pattern Recognition**

```tsx
// ❌ VIOLATION: Container with rounded + background + padding containing gradient heading
<div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
  <h3 className="gradient-text">❌ Remove gradient</h3>
</div>

// ✅ COMPLIANT: Clean section background with gradient heading
<section className="bg-white py-20">
  <h2 className="gradient-text">✅ Keep gradient</h2>
</section>
```

---

## 📋 **Implementation Checklist**

### **For Developers**

- [ ] Check if heading is inside rounded container (`rounded-*`)
- [ ] Check if heading is inside Card component
- [ ] Check if heading is inside background container (`bg-*` + `p-*`)
- [ ] If YES to any above → Use solid `text-brand-primary`
- [ ] If NO to all above → Gradient text is allowed

### **For Designers**

- [ ] Avoid placing gradient headings inside visual containers
- [ ] Use gradient headings for impact on clean backgrounds
- [ ] Maintain contrast ratios for accessibility
- [ ] Test readability across light/dark themes

---

## 🎯 **Brand Reasoning**

1. **Professional Appearance**: Avoid visual clutter by separating gradient effects from container backgrounds
2. **Content Focus**: Let photos and videos be the visual impact, not competing text effects
3. **Readability**: Ensure headings are always clearly readable against their immediate background
4. **Consistency**: Maintain predictable patterns across the entire site

---

**Bottom Line**: Gradient headings are beautiful on clean backgrounds. Keep them simple inside containers.
