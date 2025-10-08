# MH Construction Development Guidelines

## Icon Usage Policy - Material Icons Only

**Effective Date:** October 8, 2025  
**Policy Version:** 1.0  
**Authority:** MH Construction Leadership Team

### 🚨 EMOJI-FREE SOURCE CODE POLICY

#### Core Policy Statement

MH Construction maintains a strict policy prohibiting emojis in all source code files (.ts, .tsx, .js, .jsx, .vue, etc.)

### ✅ APPROVED PRACTICES

#### Material Icons Component Usage

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

// ✅ Correct implementations
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" />
<MaterialIcon icon="phone" size="xl" className="text-blue-600" />
```text

#### Semantic Icon Mapping

| Function | Material Icon | Usage Context |
|----------|---------------|---------------|
| Construction Projects | `construction` | Building, projects, work |
| Veteran Recognition | `military_tech` | Military service, awards |
| Scheduling/Calendar | `event` | Appointments, dates |
| Contact Information | `phone` | Phone numbers, calls |
| Email Communication | `email` | Email addresses, messages |
| Location/Address | `place` | Addresses, locations |
| AI/Smart Features | `smart_toy` | AI estimator, chatbot |
| Security Features | `security` | Protection, safety |
| Success/Completion | `check_circle` | Success states |
| Warnings/Alerts | `warning` | Caution, alerts |

#### Text Labels for Non-UI Contexts

```typescript
// ✅ For AI responses and string-based contexts
const response = `**TACTICAL ASSESSMENT** [GPS_FIXED]
Mission parameters received [CHECK_CIRCLE]
Veteran status confirmed [MILITARY_TECH]`
```text

### ❌ PROHIBITED PRACTICES

#### Never Use Emojis in Source Code

```tsx
// ❌ NEVER do this in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule Meeting</button>
title: 'Project Update 🎯'

console.log('🔧 Debug message')
```text

#### Invalid Icon Approaches

```tsx
// ❌ Don't mix icon libraries
import { Award } from 'lucide-react'
import { FaHammer } from 'react-icons/fa'

// ❌ Don't use custom SVGs without approval
<CustomHammerIcon />

// ❌ Don't use emoji unicode
<span>&#x1F3D7;</span>

```text

### 📋 ACCEPTABLE EMOJI USAGE

#### Documentation Files Only

- **Markdown files** (.md): Emojis enhance readability and organization
- **README files**: Visual indicators improve developer experience  
- **Project planning**: Status indicators and visual hierarchy
- **Commit messages**: Brief visual context (optional)

#### Examples of Acceptable Documentation Usage

```markdown
## 🚀 Getting Started
### ✅ Setup Complete
#### 📋 Next Steps

- 🎯 Deploy to production
- 📊 Monitor performance
```text

### 🔧 IMPLEMENTATION STANDARDS

#### Size Guidelines

| Size | Usage Context | Example |

|------|---------------|---------|
| `sm` (18px) | Inline text, small buttons | Form field icons |
| `md` (20px) | Standard buttons, content | Navigation icons |
| `lg` (24px) | Large buttons, headers | CTA buttons |
| `xl` (30px) | Section headers | Feature highlights |
| `2xl` (36px) | Hero sections | Major features |

#### Theme Compatibility

```tsx

// ✅ Always include dark mode support
<MaterialIcon 
  icon="construction" 
  size="lg" 
  className="text-brand-primary dark:text-brand-primary-light" 
/>
```text

#### Accessibility Requirements

```tsx
// ✅ Include proper accessibility attributes
<MaterialIcon 

  icon="phone" 
  size="md" 
  className="text-blue-600"
  aria-label="Contact phone number"
/>

```text

### 🎯 ENFORCEMENT

#### Pre-commit Checks

- **ESLint rules**: Flag emoji usage in source files
- **Build validation**: Fail builds with emoji violations
- **Code review**: Manual verification during PR reviews

#### Migration Process

1. **Identify emojis**: Search codebase for unicode emoji characters
2. **Map to Material Icons**: Use semantic mapping table
3. **Replace systematically**: Convert to MaterialIcon components

4. **Test thoroughly**: Ensure functionality maintained
5. **Document changes**: Update component usage guides

### 📊 BENEFITS

#### Technical Advantages

- **Cross-platform consistency**: Identical rendering across all devices

- **Performance optimization**: No emoji font dependencies
- **Accessibility compliance**: Screen reader compatibility
- **Maintainability**: Centralized icon management

#### Brand Advantages  

- **Professional appearance**: Cohesive visual identity

- **Scalability**: Consistent sizing and styling
- **Theme integration**: Seamless light/dark mode support
- **Semantic clarity**: Icons match their intended function

### 🆘 EXCEPTIONS PROCESS

#### Requesting Emoji Usage

1. **Business justification**: Document specific need
2. **Technical review**: Assess alternatives
3. **Leadership approval**: Get written authorization  
4. **Implementation plan**: Define scope and timeline
5. **Documentation update**: Record approved exception

#### Emergency Overrides

- **Production hotfixes**: Temporary emoji usage allowed
- **24-hour documentation**: Must document within one business day
- **Follow-up ticket**: Create immediate remediation task

---

**This policy ensures MH Construction maintains professional, accessible, and consistent visual standards across all digital platforms while preserving the enhanced developer experience in documentation.**

---

## Quick Reference

### ✅ DO

- Use `<MaterialIcon icon="name" />` for all UI icons

- Include size and className props for styling
- Use text labels `[ICON_NAME]` for string contexts
- Keep emojis in markdown documentation
- Test dark mode compatibility
- Include accessibility attributes

### ❌ DON'T  

- Use emojis in .ts, .tsx, .js, .jsx files
- Mix different icon libraries
- Create custom SVG icons without approval
- Ignore accessibility requirements
- Use hardcoded emoji unicode
- Skip theme compatibility testing

---

## UI Component Standards & Design Rules

### 🚫 **NO BUBBLE HEADINGS POLICY**

**Effective Date:** October 8, 2025  
**Policy Version:** 1.1  
**Authority:** MH Construction Design Team

#### Bubble Headings Policy Statement

MH Construction maintains a strict policy prohibiting bubble-style headings in all sections to maintain professional, clean visual hierarchy.

#### ✅ APPROVED HEADING STYLES

```tsx
// ✅ Correct - Clean section headers
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
  Section Title
</h2>

// ✅ Correct - With subtitle pattern
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
    Context Text
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
    Main Title
  </span>
</h2>
```text

#### ❌ PROHIBITED BUBBLE STYLES

```tsx
// ❌ Never use bubble/pill-shaped decorative containers
<div className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-8 px-8 py-4 border border-brand-primary/20 rounded-full">
  <MaterialIcon icon="construction" size="md" />
  <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
    Section Label
  </span>
</div>

// ❌ No decorative header badges
<div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full px-6 py-2">
  Section Badge
</div>
```text

#### Benefits of Clean Headers

- **Professional Appearance**: Clean, modern aesthetic aligned with veteran precision
- **Visual Hierarchy**: Section titles have greater prominence without visual competition
- **Better UX**: Improved readability and faster visual scanning
- **Consistent Branding**: Unified design language across all pages

---

### 🎴 **CARD FLIPPING STANDARDS**

**Effective Date:** October 8, 2025  
**Policy Version:** 1.0  
**Authority:** MH Construction Development Team

#### Card Flipping Policy Statement

All cards showing additional information must utilize card flipping animations to present descriptions on the back of cards, maintaining interactive user experience.

#### ✅ REQUIRED CARD FLIP IMPLEMENTATION

```tsx
// ✅ Standard card flip structure
<div className="group perspective-1000 cursor-pointer" onClick={handleFlip}>
  <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
    
    {/* Front of Card */}
    <div className="absolute inset-0 w-full h-full backface-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {/* Front content - Title, icon, brief description */}
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {shortDescription}
        </p>
        <div className="mt-4 text-sm text-brand-primary">
          Hover/Click for details
        </div>
      </div>
    </div>

    {/* Back of Card */}
    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
      <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl p-6 shadow-lg text-white">
        {/* Back content - Detailed description, features, etc. */}
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        <p className="text-white/90 leading-relaxed">
          {detailedDescription}
        </p>
        <ul className="mt-4 space-y-2">
          {features.map(feature => (
            <li key={feature} className="flex items-center">
              <MaterialIcon icon="check_circle" size="sm" className="mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>
```text

#### Required CSS Classes

```css
/* Essential 3D flip utilities */
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
```text

#### Card Flip Guidelines

- **Trigger**: Click or hover (specify clearly for users)
- **Duration**: 700ms transition for smooth experience
- **Content**: Front shows overview, back shows detailed information
- **Visual Indicators**: Include "Click for details" or flip icons
- **Accessibility**: Ensure keyboard navigation support

---

### 🦸 **HERO SECTION CONSISTENCY POLICY**

**Effective Date:** October 8, 2025  
**Policy Version:** 1.0  
**Authority:** MH Construction Design Team

#### Hero Section Policy Statement

All Hero sections across the website must follow the current state of the home page hero section to maintain visual consistency and professional branding.

#### ✅ STANDARD HERO IMPLEMENTATION

```tsx
// ✅ Required hero structure using PageHero component
<PageHero
  title="Page Title Here"
  subtitle="Supporting subtitle that explains the page focus"
  description="Detailed description providing context and value proposition for the visitor."
/>
```text

#### PageHero Component Features

- **Full-screen height**: `h-screen` for impactful presence
- **Video/background support**: Ready for future video background integration
- **Gradient overlay**: Professional dark overlay for text readability
- **Responsive typography**: Scales from mobile to desktop seamlessly
- **Navigation integration**: Bottom navigation bar for site-wide navigation
- **Animation support**: Built-in `FadeInWhenVisible` animations

#### Required Hero Structure

```tsx
// Current implementation pattern
interface PageHeroProps {
  title: string      // Main page title
  subtitle: string   // Supporting context
  description: string // Detailed value proposition
}

// Typography hierarchy
title: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" // Large, bold statement
subtitle: "text-xl sm:text-2xl md:text-3xl" // Supporting context
description: "text-lg md:text-xl" // Detailed explanation
```text

#### Hero Content Guidelines

- **Title**: Clear, impactful page identifier (2-5 words)
- **Subtitle**: Supporting context or unique value proposition
- **Description**: Detailed explanation of page purpose and benefits
- **Consistent Styling**: Must use gradient text effects and proper spacing
- **Navigation Bar**: Include bottom navigation for all hero sections

#### ❌ PROHIBITED HERO VARIATIONS

```tsx
// ❌ Don't create custom hero layouts
<section className="custom-hero-different-height">
  {/* Custom implementation */}
</section>

// ❌ Don't skip the PageHero component
<div className="py-20 bg-gray-900">
  <h1>Direct Title Without Component</h1>
</div>

// ❌ Don't use different typography scales
<h1 className="text-2xl">Small Title</h1> // Too small
<h1 className="text-9xl">Huge Title</h1>  // Too large
```text

#### Benefits of Hero Consistency

- **Brand Recognition**: Immediate visual consistency across all pages
- **User Experience**: Familiar navigation and layout patterns
- **Professional Appearance**: Cohesive design language
- **Maintenance**: Single component to update for site-wide changes
- **Performance**: Consistent loading and animation patterns

---

**Questions?** Contact the development team or reference the MH-BRANDING.md file for detailed implementation examples.

---

## 📋 **QUICK REFERENCE: UI STANDARDS CHECKLIST**

### **✅ SECTION HEADERS** (No Bubbles)

```tsx
// ✅ Use clean typography hierarchy
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Section Title
</h2>
```text

### **✅ INFORMATIONAL CARDS** (Must Flip)

```tsx
// ✅ Required 3D flip structure
<div className="group perspective-1000 cursor-pointer">
  <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
    <div className="absolute inset-0 backface-hidden">{/* Front */}</div>
    <div className="absolute inset-0 backface-hidden rotate-y-180">{/* Back */}</div>
  </div>
</div>
```text

### **✅ HERO SECTIONS** (Consistent Pattern)

```tsx
// ✅ Required PageHero component
<PageHero
  title="Clear Page Identifier"
  subtitle="Supporting context"
  description="Detailed value proposition"
/>
```text

### **❌ PROHIBITED PATTERNS**

```tsx
// ❌ No bubble/pill decorations
<div className="bg-brand-primary/10 rounded-full px-6 py-2">Badge</div>

// ❌ No static information cards
<div className="p-6">{/* Static content only */}</div>

// ❌ No custom hero layouts
<section className="py-20"><h1>Custom Hero</h1></section>
```text

### **📚 REFERENCE DOCUMENTS**

- **Complete Implementation:** `DEVELOPMENT_GUIDELINES.md` (this file)
- **Layout Standards:** `LAYOUT_STANDARDS_COMPLETE.md`
- **Brand Guidelines:** `docs/business/MH-BRANDING.md`
- **Update Summary:** `UI_COMPONENT_STANDARDS_UPDATE.md`
