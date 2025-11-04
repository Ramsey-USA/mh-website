# MH Construction Branding Quick Reference

**For Developers** | **Last Updated**: November 4, 2025 | **Version**: 4.0.2

## 🚨 Critical Requirements (Must-Have)

### Emoji Policy

````tsx
// ❌ NEVER use emojis in source code
<span>🏗️ Construction</span>

// ✅ ALWAYS use MaterialIcon instead
<MaterialIcon icon="construction" size="md" className="text-brand-primary" />
```text

### Color Standards

```tsx
// ✅ CORRECT: Use brand classes
className="bg-brand-primary text-white"
className="text-brand-secondary"
className="border-brand-accent"

// ❌ INCORRECT: Hardcoded colors
style={{backgroundColor: '#386851'}}
className="bg-[#BD9264]"
```text

### Typography Patterns

```tsx
// ✅ CORRECT: Hero section (for photo/video backgrounds) - NO BADGES
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
  <span className="block text-brand-secondary font-black drop-shadow-lg">
    Your Partnership in Construction Excellence
  </span>
</h1>

<p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
  Tagline or subtitle content
</p>

<p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
  Description content with partnership language
</p>

// ✅ CORRECT: Standard section header - NO SECTION BADGES
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Subtitle Text
  </span>
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Main Title
  </span>
</h2>

// ✅ CORRECT: Standard body text
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
  Body content with proper responsive scaling
</p>
```text

## 📝 Required Messaging

### Primary Tagline

Include "Building for the Owner, NOT the Dollar" on key pages

### Partnership Language

- "We Work With You"
- "Partnership-Driven Construction"
- "Collaborative Excellence"

### Regional Focus

- Tri-Cities area (Pasco, Kennewick, Richland)
- Service regions: Washington, Oregon, Idaho
- Pacific Northwest

### Veteran Identity

- "Veteran-owned excellence"
- "Military precision"
- "Where military precision meets construction excellence"

## 🎨 Brand Colors

```css
/* Primary Colors */
--brand-primary: #386851;        /* Hunter Green */
--brand-secondary: #BD9264;      /* Leather Tan */

/* Extended Palette */
--brand-primary-light: #4a7a63;
--brand-primary-dark: #2d5240;
--brand-secondary-light: #c9a176;
--brand-secondary-dark: #a67d52;
```text

## 🔧 Component Standards

### Cards

```tsx
<Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-2 duration-300">
```text

### Buttons

```tsx
<Button variant="primary" size="lg" className="group transition-all duration-300">
<Button variant="secondary" size="lg" className="group transition-all duration-300">
<Button variant="outline" size="lg" className="group transition-all duration-300">
```text

### MaterialIcon Usage

```tsx
// Size options: sm, md, lg, xl, 2xl
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="handshake" size="md" className="mr-2 text-brand-secondary" />
```text

## 📱 Responsive Requirements

### Breakpoints

- `xs:` - 475px+
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

### Typography Scaling

```tsx
// Headers: Progressive scaling
text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl

// Body: Moderate scaling
text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl

// Small text: Minimal scaling
text-sm sm:text-base md:text-lg
```text

## ⚡ Animation Standards

### Timing

- Standard transition: `duration-300` (300ms)
- Hover effects: `transition-all duration-300`
- Page load animations: `duration-500`

### Common Patterns

```tsx
// Hover scale
className="hover:scale-105 transition-transform duration-300"

// Hover translate
className="hover:-translate-y-2 transition-all duration-300"

// Fade in animations
<FadeInWhenVisible>
<StaggeredFadeIn>
```text

## 🔍 Validation Checklist

### Before Committing

- [ ] No emojis in source code
- [ ] MaterialIcon components used
- [ ] Brand colors use approved classes
- [ ] Typography follows patterns
- [ ] Responsive scaling implemented
- [ ] Dark mode support included

### Testing Requirements

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Dark mode toggle
- [ ] Animation performance

## 🚀 Quick Commands

### Run Branding Check

```bash
./scripts/validation/check-branding-compliance.sh
```text

### Common Fixes

```bash
# Search for emojis
grep -r "[\u{1F600}-\u{1F64F}]" src/app/

# Find hardcoded colors
grep -r "#386851\|#BD9264" src/app/

# Check MaterialIcon usage
grep -r "MaterialIcon" src/app/
```text

## 📞 Support

### Documentation

- **Implementation Guide**: `/docs/development/BRANDING_implementation-guide.md`
- **Design System**: `/docs/technical/design-system/design-system.md`
- **Brand Guidelines**: `/docs/business/branding/`

### Key Contacts

- **Development Team**: Technical questions
- **Brand Authority**: MH Construction Leadership
- **QA Process**: Monthly compliance audits

---

**Remember**: When in doubt, check existing compliant pages (Home, About) for patterns to follow.
````
