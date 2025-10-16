# MH Construction Button System

## 🎯 **Mission Overview**

This document establishes a cohesive button system for MH Construction's website that ensures:

- **Consistent naming conventions** across all button variants
- **Proper icon integration** with standardized sizing and positioning
- **Cohesive color schemes** for light/dark modes
- **Unified hover effects** with smooth transitions
- **Accessibility compliance** with proper focus states

---

## 🔘 **Button Variants**

### **Primary Buttons (Hunter Green)**

- **Purpose**: Primary actions, CTAs, main navigation, IRL consultations
- **Colors**: Hunter Green (#386851) with white text on hover
- **Usage**: "Schedule Free Consultation", "Request Project Review", "Contact Client Services"

````tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-2 w-5 h-5" />
  Schedule Free Consultation
</Button>
```text

### **Secondary Buttons (Leather Tan)**

- **Purpose**: Secondary actions, complementary options
- **Colors**: Leather Tan (#BD9264) with white text on hover
- **Usage**: "Learn More", "View Portfolio", "Download Brochure"

```tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="download" className="mr-2 w-5 h-5" />
  Download Brochure
</Button>
```text

### **Outline Buttons**

- **Purpose**: Subtle actions, alternative options
- **Colors**: Hunter Green border with transparent background
- **Usage**: "Cancel", "Back", "Skip"

```tsx
<Button variant="outline" size="default">
  <MaterialIcon icon="arrow_back" className="mr-2 w-5 h-5" />
  Go Back
</Button>
```text

### **Neutral Buttons**

- **Purpose**: Theme-aware, system-level actions
- **Colors**: Adaptive gray colors that follow theme
- **Usage**: Settings, toggles, utility functions

```tsx
<Button variant="neutral" size="default">
  <MaterialIcon icon="settings" className="mr-2 w-5 h-5" />
  Settings
</Button>
```text

---

## 🎨 **Color Standards**

### **Light Mode**

- **Primary**: White background → Hunter Green on hover
- **Secondary**: White background → Leather Tan on hover
- **Outline**: Transparent → Hunter Green tint on hover
- **Neutral**: White → Dark gray on hover

### **Dark Mode**

- **Primary**: Dark gray background → Hunter Green on hover
- **Secondary**: Dark gray background → Leather Tan on hover
- **Outline**: Transparent → Hunter Green tint on hover
- **Neutral**: Dark gray → Light gray on hover

---

## 📐 **Size Standards**

### **Size Variants**

- **sm**: 32px height - Compact spaces, inline actions
- **default**: 40px height - Standard form elements
- **lg**: 48px height - Primary CTAs, hero sections
- **xl**: 56px height - Major actions, hero buttons

### **Icon Sizes**

- **sm**: 16px icons (w-4 h-4)
- **default**: 20px icons (w-5 h-5)
- **lg**: 24px icons (w-6 h-6)
- **xl**: 28px icons (w-7 h-7)

---

## 🚀 **Hover Effects**

### **Standardized Transitions**

```css
transition-all duration-300
```text

### **Movement Effects**

- **Lift**: `hover:-translate-y-0.5` (subtle upward movement)
- **Active**: `active:translate-y-0` (click feedback)

### **Shadow Effects**

- **Primary**: Enhanced green shadows on hover
- **Secondary**: Enhanced tan shadows on hover
- **Outline**: Subtle shadow appearance on hover

---

## 🔗 **Icon Integration**

### **Icon Positioning**

- **Left icons**: `mr-2` (8px margin)
- **Right icons**: `ml-2` (8px margin)
- **Icon-only**: Use `icon`, `icon-sm`, or `icon-lg` sizes

### **Icon Sizing by Button Size**

```tsx
// Small buttons
<Button variant="primary" size="sm">
  <MaterialIcon icon="phone" className="mr-2 w-4 h-4" />
  Call
</Button>

// Default buttons
<Button variant="primary" size="default">
  <MaterialIcon icon="email" className="mr-2 w-5 h-5" />
  Email
</Button>

// Large buttons
<Button variant="primary" size="lg">
  <MaterialIcon icon="calendar_today" className="mr-2 w-6 h-6" />
  Schedule
</Button>
```text

---

## 📱 **Responsive Considerations**

### **Mobile Optimizations**

- Minimum touch target: 44px (use `size="lg"` on mobile)
- Adequate spacing between buttons: 16px gap
- Consider full-width buttons on mobile: `className="w-full"`

### **Desktop Enhancements**

- Hover states are more pronounced
- Tooltip support for icon-only buttons
- Keyboard navigation support

---

## ♿ **Accessibility Standards**

### **Focus States**

- All buttons include `focus-visible:ring-2` with brand colors
- Ring offset for better visibility: `focus-visible:ring-offset-2`

### **ARIA Labels**

```tsx
// Icon-only buttons
<Button variant="primary" size="icon" aria-label="Schedule consultation">
  <MaterialIcon icon="calendar_today" className="w-5 h-5" />
</Button>

// Descriptive buttons
<Button variant="outline" aria-describedby="help-text">
  <MaterialIcon icon="help" className="mr-2 w-5 h-5" />
  Need Help?
</Button>
```text

---

## 🏗️ **Common Patterns**

### **Contact Buttons**

```tsx
// Client contact - Primary (Hunter Green)
<Button variant="primary" size="lg" className="w-full">
  <MaterialIcon icon="phone" className="mr-2 w-6 h-6" />
  <span className="text-center">
    Client Contact<br />
    (509) 308-6489
  </span>
</Button>

// Vendor contact - Secondary (Leather Tan)
<Button variant="secondary" size="lg">
  <MaterialIcon icon="phone" className="mr-2 w-6 h-6" />
  <span className="text-center">
    Vendor Contact<br />
    (509) 308-6489
  </span>
</Button>

// Email actions
<Button variant="outline" size="lg">
  <MaterialIcon icon="email" className="mr-2 w-6 h-6" />
  office@mhc-gc.com
</Button>
```text

### **Navigation Buttons**

```tsx
// Forward navigation
<Button variant="primary" size="default">
  Continue
  <MaterialIcon icon="arrow_forward" className="ml-2 w-5 h-5" />
</Button>

// Back navigation
<Button variant="outline" size="default">
  <MaterialIcon icon="arrow_back" className="mr-2 w-5 h-5" />
  Go Back
</Button>
```text

### **Action Buttons**

```tsx
// Download/Save actions
<Button variant="secondary" size="default">
  <MaterialIcon icon="download" className="mr-2 w-5 h-5" />
  Download PDF
</Button>

// Share actions
<Button variant="outline" size="default">
  <MaterialIcon icon="share" className="mr-2 w-5 h-5" />
  Share Project
</Button>
```text

---

## 🔧 **Implementation Examples**

### **Hero Section CTA**

```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Button variant="primary" size="xl">
    <MaterialIcon icon="build" className="mr-3 w-7 h-7" />
    Start Your Project
  </Button>
  <Button variant="outline" size="xl">
    <MaterialIcon icon="visibility" className="mr-3 w-7 h-7" />
    View Portfolio
  </Button>
</div>
```text

### **Form Actions**

```tsx
<div className="flex gap-3 justify-end">
  <Button variant="outline" size="default">
    Cancel
  </Button>
  <Button variant="primary" size="default" type="submit">
    <MaterialIcon icon="check" className="mr-2 w-5 h-5" />
    Submit Form
  </Button>
</div>
```text

### **Card Actions**

```tsx
<div className="flex gap-2 mt-4">
  <Button variant="primary" size="sm" className="flex-1">
    <MaterialIcon icon="info" className="mr-2 w-4 h-4" />
    Learn More
  </Button>
  <Button variant="outline" size="icon-sm" aria-label="Save to favorites">
    <MaterialIcon icon="favorite_border" className="w-4 h-4" />
  </Button>
</div>
```text

---

## ✅ **Quality Checklist**

### **Before Implementation**

- [ ] Button has appropriate variant for its purpose
- [ ] Size is appropriate for context and touch targets
- [ ] Icon size matches button size standards
- [ ] Icon positioning follows spacing guidelines
- [ ] Colors work in both light and dark modes
- [ ] Hover effects are smooth and appropriate
- [ ] Focus states are clearly visible
- [ ] ARIA labels are present for icon-only buttons

### **Testing Requirements**

- [ ] Test all hover states in light/dark modes
- [ ] Verify keyboard navigation works properly
- [ ] Check mobile touch targets are adequate
- [ ] Ensure text contrast meets WCAG standards
- [ ] Validate smooth transitions and animations

---

## 🎯 **Brand Compliance**

This button system ensures:

- **Visual Consistency**: All buttons follow MH Construction's brand guidelines
- **User Experience**: Predictable interactions across the site
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized CSS and smooth animations
- **Maintainability**: Clear naming conventions and documentation

---

*Last Updated: October 8, 2025*
*System Version: 2.0*
````
