# MH Construction Button System - Implementation Examples

This file demonstrates proper implementation of the cohesive button system across
different components and pages.

## 🏠 **Homepage Hero Section**

```tsx
// Hero CTA buttons with proper icon integration
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Button variant="primary" size="xl">
    <MaterialIcon icon="build" className="mr-3 w-7 h-7" />
    Start Your Project
  </Button>
  <Button variant="outline" size="xl">
    <MaterialIcon icon="visibility" className="mr-3 w-7 h-7" />
    View Our Work
  </Button>
</div>
```text

## 📞 **Contact Sections**

```tsx
// Contact buttons with phone/email actions
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="phone" className="mr-3 w-6 h-6" />
    <span className="text-center">
      Call Now<br />
      <span className="text-sm opacity-90">(509) 308-6489</span>
    </span>
  </Button>

  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="email" className="mr-3 w-6 h-6" />
    Send Email
  </Button>
</div>
```text

## 📅 **Booking/Scheduling**

```tsx
// Scheduling flow buttons
<div className="space-y-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="calendar_today" className="mr-3 w-6 h-6" />
    Schedule Consultation
  </Button>

  <Button variant="outline" size="lg" className="w-full">
    <MaterialIcon icon="assessment" className="mr-3 w-6 h-6" />
    Get Instant Estimate
  </Button>
</div>
```text

## 🏗️ **Service Cards**

```tsx
// Service card actions
<div className="flex gap-3 mt-6">
  <Button variant="primary" size="default" className="flex-1">
    <MaterialIcon icon="info" className="mr-2 w-5 h-5" />
    Learn More
  </Button>
  <Button variant="outline" size="icon" aria-label="Save to favorites">
    <MaterialIcon icon="favorite_border" className="w-5 h-5" />
  </Button>
  <Button variant="outline" size="icon" aria-label="Share service">
    <MaterialIcon icon="share" className="w-5 h-5" />
  </Button>
</div>
```text

## 📱 **Mobile Navigation**

```tsx
// Mobile-optimized buttons
<div className="flex flex-col gap-3 p-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="construction" className="mr-3 w-6 h-6" />
    Our Services
  </Button>

  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="photo_library" className="mr-3 w-6 h-6" />
    Portfolio
  </Button>

  <Button variant="outline" size="lg" className="w-full">
    <MaterialIcon icon="group" className="mr-3 w-6 h-6" />
    About Us
  </Button>
</div>
```text

## 📝 **Form Actions**

```tsx
// Form submission buttons
<div className="flex flex-col sm:flex-row gap-3 justify-end">
  <Button variant="outline" size="default">
    <MaterialIcon icon="close" className="mr-2 w-5 h-5" />
    Cancel
  </Button>
  <Button variant="neutral" size="default">
    <MaterialIcon icon="save" className="mr-2 w-5 h-5" />
    Save Draft
  </Button>
  <Button variant="primary" size="default" type="submit">
    <MaterialIcon icon="send" className="mr-2 w-5 h-5" />
    Submit
  </Button>
</div>
```text

## 🎯 **Project Estimation**

```tsx
// Estimator flow buttons
<div className="space-y-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="calculate" className="mr-3 w-6 h-6" />
    Calculate Estimate
  </Button>

  <div className="flex gap-3">
    <Button variant="outline" size="default" className="flex-1">
      <MaterialIcon icon="arrow_back" className="mr-2 w-5 h-5" />
      Previous
    </Button>
    <Button variant="primary" size="default" className="flex-1">
      Next
      <MaterialIcon icon="arrow_forward" className="ml-2 w-5 h-5" />
    </Button>
  </div>
</div>
```text

## 👥 **Team/About Section**

```tsx
// Team member cards
<div className="text-center space-y-4">
  <Button variant="secondary" size="default">
    <MaterialIcon icon="person" className="mr-2 w-5 h-5" />
    View Profile
  </Button>

  <div className="flex gap-2 justify-center">
    <Button variant="outline" size="icon-sm" aria-label="LinkedIn profile">
      <MaterialIcon icon="business" className="w-4 h-4" />
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Email contact">
      <MaterialIcon icon="email" className="w-4 h-4" />
    </Button>
  </div>
</div>
```text

## 🏢 **Government/Commercial**

```tsx
// Government services section
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="account_balance" className="mr-3 w-6 h-6" />
    Government Projects
  </Button>

  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="business" className="mr-3 w-6 h-6" />
    Commercial Services
  </Button>
</div>
```text

## 🎨 **Portfolio/Gallery**

```tsx
// Gallery navigation and actions
<div className="flex flex-wrap gap-3 justify-center">
  <Button variant="outline" size="default">
    <MaterialIcon icon="filter_list" className="mr-2 w-5 h-5" />
    Filter Projects
  </Button>

  <Button variant="outline" size="default">
    <MaterialIcon icon="view_module" className="mr-2 w-5 h-5" />
    Grid View
  </Button>

  <Button variant="primary" size="default">
    <MaterialIcon icon="add" className="mr-2 w-5 h-5" />
    View All Projects
  </Button>
</div>
```text

## 🔧 **Settings/Admin**

```tsx
// Administrative buttons
<div className="space-y-3">
  <Button variant="neutral" size="default" className="w-full justify-start">
    <MaterialIcon icon="settings" className="mr-3 w-5 h-5" />
    Account Settings
  </Button>

  <Button variant="neutral" size="default" className="w-full justify-start">
    <MaterialIcon icon="security" className="mr-3 w-5 h-5" />
    Security
  </Button>

  <Button variant="destructive" size="default" className="w-full justify-start">
    <MaterialIcon icon="logout" className="mr-3 w-5 h-5" />
    Sign Out
  </Button>
</div>
```text

## 🌙 **Theme Toggle Integration**

```tsx
// Theme-aware button example
<div className="flex items-center gap-4">
  <ThemeToggle size="md" showLabel />

  <Button variant="neutral" size="default">
    <MaterialIcon icon="palette" className="mr-2 w-5 h-5" />
    Customize
  </Button>
</div>
```text

## 📱 **Responsive Patterns**

```tsx
// Responsive button layouts
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  {/* Mobile: Full width stack */}
  {/* Desktop: Horizontal row */}
  <Button variant="primary" size="lg" className="w-full sm:w-auto">
    <MaterialIcon icon="phone" className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
    <span className="hidden sm:inline">Schedule Consultation</span>
    <span className="sm:hidden">Call Us</span>
  </Button>

  <Button variant="outline" size="lg" className="w-full sm:w-auto">
    <MaterialIcon icon="email" className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
    <span className="hidden sm:inline">Send Message</span>
    <span className="sm:hidden">Email</span>
  </Button>
</div>
```text

---

## ✅ **Implementation Checklist**

When implementing buttons, ensure:

- [ ] Appropriate variant for the action type
- [ ] Correct size for context and touch targets
- [ ] Proper icon sizing relative to button size
- [ ] Consistent spacing (mr-2, mr-3 based on button size)
- [ ] ARIA labels for icon-only buttons
- [ ] Responsive considerations for mobile/desktop
- [ ] Dark mode compatibility
- [ ] Focus states for accessibility

---

*This system ensures consistent, accessible, and brand-compliant button implementations across the
entire MH Construction website.*
