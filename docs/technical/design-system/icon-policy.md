# Icon Policy Complete Guide

**Last Updated:** November 6, 2025  
**Version:** 5.0.0  
**Status:** ✅ Active - Consolidated Policy & Implementation

---

## 📋 Table of Contents

- [Mission & Policy Overview](#mission--policy-overview)
- [Critical Policy: Emoji-Free Codebase](#critical-policy-emoji-free-codebase)
- [Policy Scope & Requirements](#policy-scope--requirements)
- [Policy Rationale & Benefits](#policy-rationale--benefits)
- [Implementation Standards](#implementation-standards)
- [Common Icon Reference](#common-icon-reference)
- [Quality Assurance](#quality-assurance)
- [Browser Support](#browser-support)
- [Enforcement Strategy](#enforcement-strategy)
- [Success Metrics](#success-metrics)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Mission & Policy Overview

### Core Policy Statement

**MH Construction maintains a strict EMOJI-FREE source code policy. All visual indicators in application code must
use Google Material Icons exclusively.**

### Authority & Implementation

- **Policy Authority:** MH Construction Leadership Team
- **Implementation Date:** October 8, 2025
- **Status:** ✅ IMPLEMENTED & ENFORCED
- **Enforcement:** Required for all production code
- **Compliance:** 100% source code adherence

### Quick Policy Summary

| Context                                | Requirement                        | Status       |
| -------------------------------------- | ---------------------------------- | ------------ |
| **Source Code** (.ts, .tsx, .js, .jsx) | Material Icons ONLY                | ✅ REQUIRED  |
| **Components** (React, Vue, Svelte)    | MaterialIcon component exclusively | ✅ REQUIRED  |
| **Documentation** (.md, .mdx, README)  | Emojis permitted for clarity       | ✅ PERMITTED |
| **Comments** (code comments)           | Emojis acceptable                  | ✅ PERMITTED |
| **Commit Messages**                    | Emojis optional                    | ✅ PERMITTED |

---

## 🚨 CRITICAL POLICY: EMOJI-FREE CODEBASE

### Icon Standards Enforcement

**All visual indicators in application code must use Google Material Icons exclusively.**

#### ✅ APPROVED: Material Icons Only

**Correct Implementation:**

```tsx
// ✅ Correct - Use MaterialIcon component
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" />
<MaterialIcon icon="phone" className="mr-2" />
<MaterialIcon icon="mail" size="sm" className="text-gray-600" />
```

**Component Usage:**

```tsx
// ✅ Correct - In buttons
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-3" />
  Schedule Consultation
</Button>

// ✅ Correct - In navigation
<Link href="/booking">
  <MaterialIcon icon="handshake" size="md" className="mr-2" />
  Start Partnership
</Link>

// ✅ Correct - With hover effects
<MaterialIcon
  icon="arrow_forward"
  className="text-brand-primary hover:text-brand-accent transition-colors"
/>
```

---

#### ❌ PROHIBITED: Emojis in Source Code

**Never Use These Patterns:**

```tsx
// ❌ WRONG - Never use emojis in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule</button>
<div className="title">🎯 Project Goals</div>
const title = 'Update 🎯'
const message = "Thanks! 👍"

// ❌ WRONG - Even in strings
const labels = {
  construction: '🏗️ Construction',
  phone: '📞 Call Us'
};

// ❌ WRONG - Even in conditional renders
{isComplete ? '✅' : '❌'}
```

**Why This Is Critical:**

- Emojis render inconsistently across platforms and browsers
- Screen readers handle emojis poorly for accessibility
- Unicode emoji standards change, causing maintenance issues
- Professional branding requires consistent visual identity
- Performance degrades with emoji font dependencies

---

#### 📝 PERMITTED: Documentation Emojis

**Emojis ARE allowed in these contexts:**

```markdown
## ✅ Acceptable Documentation Usage

### 🎯 Project Goals

- ✅ Complete Phase 1
- 🚧 Working on Phase 2
- 📋 Planning Phase 3

### 🚨 Critical Items

- ⚠️ High priority task
- 💡 Enhancement idea
- 🔧 Technical improvement

### 📊 Status Updates

- 🟢 On track
- 🟡 At risk
- 🔴 Blocked
```

**Permitted File Types:**

- **Markdown files** (.md, .mdx) - Documentation clarity
- **README files** - Developer experience enhancement
- **Project planning docs** - Status indicators and organization
- **Commit messages** - Optional visual context
- **Code comments** - Clarification and emphasis

---

## 📜 Policy Scope & Requirements

### ✅ REQUIRED: Material Icons Only

**Source Files:**

- `.ts` - TypeScript files
- `.tsx` - React TypeScript components
- `.js` - JavaScript files
- `.jsx` - React JavaScript components
- `.vue` - Vue components
- `.svelte` - Svelte components

**Component Requirements:**

- **MaterialIcon component** exclusively for all visual indicators
- **Semantic icon names** from Google Material Icons library
- **Proper sizing** using standardized size props
- **Accessible implementation** with aria-labels when needed

**UI Elements:**

- All buttons, forms, navigation, dashboards
- Contact information displays
- Status indicators and alerts
- Interactive elements and controls
- Feature highlights and callouts

**AI/Dynamic Content:**

- Use text labels for string contexts: `[ICON_NAME]`
- Material Icons for rendered UI components
- No emojis in dynamic content generation

---

### 📝 PERMITTED: Documentation Contexts

**Markdown Documentation:**

- Section headers with emojis for visual organization
- Status indicators in project planning
- Priority markers in task lists
- Category identifiers in reference docs

**Developer Experience:**

- README files with emoji for quick scanning
- Contributing guidelines with visual markers
- Changelog entries with categorical emojis
- Pull request templates with section indicators

**Communication:**

- Commit messages (optional emojis)
- Code comments for emphasis
- Issue templates with visual guides
- Documentation comments

---

## 🎖️ Policy Rationale & Benefits

### Technical Advantages

**Cross-Platform Consistency:**

- Identical rendering across all devices and operating systems
- No emoji font discrepancies between platforms
- Consistent appearance in Windows, macOS, Linux, iOS, Android

**Performance Optimization:**

- No emoji font dependencies reducing bundle size
- Faster rendering with icon fonts
- No unicode compatibility issues
- Reduced browser rendering overhead

**Accessibility Compliance:**

- Screen readers properly interpret Material Icons with aria-labels
- Semantic icon names provide context
- WCAG AA compliance achieved
- Better keyboard navigation support

**Maintainability:**

- Centralized icon system with semantic naming
- Easy to update icons globally
- Version control friendly (no unicode issues)
- Searchable icon usage across codebase

**Theme Integration:**

- Seamless light/dark mode support
- Icons automatically adapt to theme colors
- Consistent styling with Tailwind classes
- Easy color customization per context

---

### Brand Advantages

**Professional Appearance:**

- Cohesive, business-appropriate visual identity
- Military precision aligning with veteran-owned standards
- Consistent brand presentation across all platforms
- Professional credibility in construction industry

**Scalability:**

- Consistent sizing and styling system
- Easy to extend icon library
- Simple to add new icon mappings
- Future-proof implementation

**Military Precision:**

- Reflects attention to detail
- Demonstrates commitment to quality
- Aligns with veteran-owned values
- Professional standards throughout

**Future-Proof:**

- No dependency on evolving unicode emoji standards
- Material Icons actively maintained by Google
- Long-term stability and support
- Backward compatibility guaranteed

---

## 🛠️ Implementation Standards

### MaterialIcon Component Usage

#### Basic Usage

```tsx
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// Simple icon
<MaterialIcon icon="construction" />;
```

#### With Size Prop

```tsx
// Size variants: xs (16px), sm (20px), md (24px), lg (32px), xl (40px)
<MaterialIcon icon="construction" size="xs" />
<MaterialIcon icon="construction" size="sm" />
<MaterialIcon icon="construction" size="md" /> // Default
<MaterialIcon icon="construction" size="lg" />
<MaterialIcon icon="construction" size="xl" />
```

#### With Styling

```tsx
// Using Tailwind classes
<MaterialIcon
  icon="phone"
  size="md"
  className="text-brand-primary hover:text-brand-accent"
/>

// With transitions
<MaterialIcon
  icon="arrow_forward"
  size="sm"
  className="text-gray-600 hover:text-brand-primary transition-colors duration-300"
/>

// With spacing
<MaterialIcon icon="event" className="mr-3" />
<MaterialIcon icon="mail" className="ml-2" />
```

#### In Components

**Buttons:**

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-3" />
  Schedule Consultation
</Button>

<Button variant="secondary">
  <MaterialIcon icon="smart_toy" className="mr-2" />
  Try AI Estimator
</Button>
```

**Links:**

```tsx
<Link href="/booking">
  <MaterialIcon icon="handshake" size="md" className="mr-2" />
  Start Partnership
</Link>

<a href="tel:+15093086489">
  <MaterialIcon icon="call" size="sm" className="mr-2" />
  (509) 308-6489
</a>
```

**Navigation:**

```tsx
<nav>
  <Link href="/">
    <MaterialIcon icon="home" size="md" />
    Home
  </Link>
  <Link href="/services">
    <MaterialIcon icon="build" size="md" />
    Services
  </Link>
  <Link href="/contact">
    <MaterialIcon icon="contact_phone" size="md" />
    Contact
  </Link>
</nav>
```

**Status Indicators:**

```tsx
// Success state
<div className="flex items-center text-green-600">
  <MaterialIcon icon="check_circle" size="sm" className="mr-2" />
  Project Complete
</div>

// Warning state
<div className="flex items-center text-yellow-600">
  <MaterialIcon icon="warning" size="sm" className="mr-2" />
  Review Required
</div>

// Error state
<div className="flex items-center text-red-600">
  <MaterialIcon icon="error" size="sm" className="mr-2" />
  Action Needed
</div>
```

---

### Accessibility Implementation

**Always Provide Context:**

```tsx
// With aria-label for icon-only buttons
<button aria-label="Schedule consultation">
  <MaterialIcon icon="event" size="lg" />
</button>

// With visible text label (preferred)
<button>
  <MaterialIcon icon="event" className="mr-2" />
  Schedule Consultation
</button>

// With screen reader text
<a href="/contact">
  <MaterialIcon icon="mail" size="sm" />
  <span className="sr-only">Email us</span>
</a>
```

---

## 📖 Common Icon Reference

### Business & Construction Icons

| Icon Name       | Use Case             | Context                                   |
| --------------- | -------------------- | ----------------------------------------- |
| `construction`  | Main business icon   | Brand identity, general construction      |
| `business`      | Commercial projects  | Business partnerships, corporate work     |
| `military_tech` | Veteran emphasis     | Veteran-owned branding, military projects |
| `handshake`     | Partnership focus    | Client relationships, collaborations      |
| `engineering`   | Technical work       | Engineering services, technical projects  |
| `build`         | General construction | Building services, construction work      |

### Action Icons

| Icon Name        | Use Case       | Context                               |
| ---------------- | -------------- | ------------------------------------- |
| `phone` / `call` | Phone contact  | Contact information, call actions     |
| `mail` / `email` | Email contact  | Email addresses, contact forms        |
| `event`          | Scheduling     | IRL consultations, appointments       |
| `smart_toy`      | AI features    | AI Estimator tool, automated services |
| `calculate`      | Calculations   | Cost estimator, pricing tools         |
| `arrow_forward`  | Next/Continue  | Navigation, progression               |
| `download`       | File downloads | Resource downloads, documents         |
| `upload`         | File uploads   | Form submissions, document uploads    |

### Navigation Icons

| Icon Name     | Use Case        | Context                           |
| ------------- | --------------- | --------------------------------- |
| `home`        | Homepage        | Main navigation, breadcrumbs      |
| `menu`        | Mobile menu     | Hamburger menu, navigation toggle |
| `close`       | Close actions   | Modal close, menu close           |
| `expand_more` | Dropdowns       | Expandable sections, menus        |
| `expand_less` | Collapse        | Collapsible sections              |
| `arrow_back`  | Back navigation | Return to previous page           |

### Status & Feedback Icons

| Icon Name      | Use Case           | Context                           |
| -------------- | ------------------ | --------------------------------- |
| `check_circle` | Success/Complete   | Completed items, success messages |
| `info`         | Information        | Informational messages, help text |
| `warning`      | Warnings           | Warning messages, caution alerts  |
| `error`        | Errors             | Error messages, failed actions    |
| `help`         | Help/Support       | Help sections, tooltips           |
| `verified`     | Verified/Certified | Credentials, certifications       |

### Social Media Icons

| Icon Name      | Use Case    | Context                             |
| -------------- | ----------- | ----------------------------------- |
| `thumb_up`     | Facebook    | Facebook social links               |
| `photo_camera` | Instagram   | Instagram social links              |
| `close`        | X (Twitter) | X/Twitter social links (repurposed) |
| `play_circle`  | YouTube     | YouTube social links                |
| `work`         | LinkedIn    | LinkedIn social links               |

### Contact & Location Icons

| Icon Name               | Use Case         | Context                      |
| ----------------------- | ---------------- | ---------------------------- |
| `place` / `location_on` | Physical address | Office location, map markers |
| `directions`            | Directions       | Google Maps links            |
| `contact_phone`         | General contact  | Contact pages, forms         |

---

## ✅ Quality Assurance

### Code Review Checklist

**Before Submitting Code:**

- [ ] No emojis in .ts, .tsx, .js, .jsx files
- [ ] All icons use MaterialIcon component
- [ ] Icon names are semantic and clear from Material Icons library
- [ ] Proper size props used (xs, sm, md, lg, xl)
- [ ] Appropriate color classes applied
- [ ] Accessibility considerations met (aria-labels, text labels)
- [ ] Icons render correctly in light and dark modes
- [ ] Hover states and transitions implemented where appropriate
- [ ] No custom icon libraries or inconsistent implementations

---

### Automated Validation

**Check for Emoji Usage:**

```bash
# Search for emojis in source code (should return no results)
grep -r "[\u{1F600}-\u{1F64F}]" src/ --exclude="*.md"
grep -r "[\u{1F300}-\u{1F5FF}]" src/ --exclude="*.md"
grep -r "[\u{1F680}-\u{1F6FF}]" src/ --exclude="*.md"
```

**Verify MaterialIcon Usage:**

```bash
# Count MaterialIcon usages
grep -r "<MaterialIcon" src/ | wc -l

# Find potential emoji violations
grep -rn "[🏗️📅🎯👍✅❌]" src/ --include="*.tsx" --include="*.ts"
```

**Validate Icon Names:**

```bash
# List all icon names used in codebase
grep -roh 'icon="[^"]*"' src/ | sort -u

# Check for potential typos in icon names
grep -rn 'icon="[^"]*"' src/ | grep -v -E 'icon="(construction|phone|mail|event|smart_toy|calculate|arrow_forward|home|menu|close|check_circle|info|warning|error)"'
```

---

### Manual Testing

**Cross-Browser Testing:**

- [ ] Chrome/Chromium - Icons render correctly
- [ ] Firefox - Icons render correctly
- [ ] Safari - Icons render correctly
- [ ] Edge - Icons render correctly
- [ ] Mobile browsers (iOS Safari, Chrome Mobile) - Icons render correctly

**Theme Testing:**

- [ ] Light mode - All icons visible and properly colored
- [ ] Dark mode - All icons visible and properly colored
- [ ] Theme transitions - Icons adapt smoothly

**Accessibility Testing:**

- [ ] Screen reader - Icons announced properly or hidden appropriately
- [ ] Keyboard navigation - Icon buttons/links operable via keyboard
- [ ] Focus indicators - Visible focus states on interactive icons
- [ ] Color contrast - Icons meet WCAG AA contrast requirements (3:1 minimum)

**Responsive Testing:**

- [ ] Desktop - Icons sized appropriately
- [ ] Tablet - Icons scale correctly
- [ ] Mobile - Icons sized for touch targets (44x44px minimum for interactive)

---

## 🌐 Browser Support

### Supported Browsers

Material Icons work consistently across:

- ✅ **Chrome/Chromium** - All versions from 2020+
- ✅ **Firefox** - All versions from 2020+
- ✅ **Safari** - All versions from 2020+
- ✅ **Edge** - All versions from 2020+
- ✅ **Mobile browsers** - iOS Safari, Chrome Mobile, Samsung Internet

### Known Compatibility

- **Icon rendering:** 100% consistent across all supported browsers
- **Color application:** Tailwind classes work universally
- **Size scaling:** Icons scale properly at all sizes
- **Accessibility:** Screen reader support in all modern browsers
- **Performance:** No performance degradation on any platform

---

## 🛡️ Enforcement Strategy

### Technical Enforcement

**Build Process Integration:**

- Integrated into CI/CD pipeline
- Automated linting rules to detect policy violations
- Pre-commit hooks (optional, recommended)
- Build failures on emoji detection in source code

**Code Review Process:**

- Manual verification during pull request reviews
- Automated checks in PR pipelines
- Reviewer checklist includes icon policy compliance
- Documentation of any exceptions (rare)

**Linting Rules:**

```javascript
// ESLint rule example (custom)
{
  "no-emoji-in-source": "error",
  "material-icons-only": "error"
}
```

---

### Developer Education

**Onboarding:**

- New developers trained on icon policy during onboarding
- Policy documentation review required
- Code examples provided for reference
- Mentorship on first few PRs to ensure compliance

**Reference Materials:**

- This complete policy guide
- Quick reference in README
- Code examples in component library
- Icon usage inventory for pattern reference

**Support:**

- Technical team available for guidance and questions
- Slack/communication channels for policy clarification
- Regular updates on policy changes or additions
- FAQ documentation for common scenarios

---

### Exception Process

**Rare Exception Scenarios:**

In extremely rare cases where Material Icons cannot provide needed functionality:

1. **Document the requirement** - Explain why Material Icons insufficient
2. **Propose alternative** - Suggest Material Icon library or custom SVG solution
3. **Get approval** - Leadership and technical team must approve
4. **Document exception** - Record in code comments and documentation
5. **Review annually** - Re-evaluate if Material Icons now support the use case

**Example Exception Documentation:**

```tsx
// EXCEPTION APPROVED: Nov 6, 2025 - Leadership Team
// Reason: Specific brand logo requirement not in Material Icons
// Alternative: Custom SVG component with proper accessibility
// Review Date: Nov 6, 2026
<CustomBrandLogo />
```

---

## 📊 Success Metrics

### Policy Compliance

**Current Status:**

- ✅ **100% Source Code Compliance** - Zero emojis in application files
- ✅ **Material Icons Standardized** - Consistent icon system implemented
- ✅ **Documentation Complete** - Comprehensive policy guides available
- ✅ **Build Process Updated** - Policy integrated into CI/CD workflow
- ✅ **Team Training Complete** - All developers understand policy

### Quality Metrics

**Implementation Quality:**

- ✅ **Cross-Browser Consistency** - Icons render identically across platforms
- ✅ **Accessibility Verified** - Screen reader compatibility confirmed
- ✅ **Performance Maintained** - No negative impact on site speed or bundle size
- ✅ **Theme Compatibility** - Light/dark mode support fully functional
- ✅ **Mobile Optimization** - Icons scale properly on all devices
- ✅ **Touch Targets** - Interactive icons meet 44x44px minimum

### Long-Term Impact

**Brand Consistency:**

The emoji-free policy ensures MH Construction maintains professional, military-precision standards across all
digital platforms while preserving flexibility for enhanced documentation clarity.

**Technical Excellence:**

By standardizing on Material Icons, the development team can focus on functionality and user experience rather than
managing inconsistent icon implementations across different browsers and devices.

**Veteran Values:**

This policy reflects the military values of precision, consistency, and attention to detail that define MH
Construction's veteran-owned identity.

---

## 🔧 Troubleshooting

### Issue: Icon Not Displaying

**Symptoms:**

- Empty space where icon should appear
- Console error about icon name
- Icon name displayed as text

**Solutions:**

1. **Verify icon name exists in Material Icons library:**
   - Check [Google Material Icons](https://fonts.google.com/icons)
   - Ensure correct spelling (e.g., `construction` not `construct`)
   - Use underscores not spaces (e.g., `check_circle` not `check circle`)

2. **Check component import:**

   ```tsx
   // ✅ Correct
   import { MaterialIcon } from "@/components/icons/MaterialIcon";

   // ❌ Wrong
   import MaterialIcon from "@/components/icons/MaterialIcon";
   ```

3. **Verify icon prop format:**

   ```tsx
   // ✅ Correct
   <MaterialIcon icon="event" />

   // ❌ Wrong
   <MaterialIcon icon={event} />  // Missing quotes
   <MaterialIcon name="event" />  // Wrong prop name
   ```

---

### Issue: Icon Size Incorrect

**Symptoms:**

- Icon too large or too small
- Icon doesn't match design specs
- Inconsistent sizing across components

**Solutions:**

1. **Use standard size props:**

   ```tsx
   // ✅ Correct - Use standard sizes
   <MaterialIcon icon="construction" size="sm" />
   <MaterialIcon icon="construction" size="md" />  // Default
   <MaterialIcon icon="construction" size="lg" />

   // ❌ Avoid custom sizes unless necessary
   <MaterialIcon icon="construction" style={{fontSize: '19px'}} />
   ```

2. **Check for conflicting CSS:**

   ```tsx
   // Remove conflicting styles
   className="text-sm"  // Can affect icon size
   style={{fontSize: ...}}  // Can override size prop
   ```

3. **Verify parent container constraints:**
   - Check if parent has size restrictions
   - Ensure no max-width or max-height limiting icon

---

### Issue: Icon Color Not Changing

**Symptoms:**

- Icon stays default color
- Hover effects not working
- Theme colors not applying

**Solutions:**

1. **Use Tailwind color classes:**

   ```tsx
   // ✅ Correct
   <MaterialIcon
     icon="phone"
     className="text-brand-primary hover:text-brand-accent"
   />

   // ❌ Wrong - Inline styles less flexible
   <MaterialIcon icon="phone" style={{color: '#386851'}} />
   ```

2. **Check theme context:**

   ```tsx
   // Ensure dark mode classes included
   className = "text-brand-primary dark:text-bronze-400";
   ```

3. **Verify no parent overrides:**
   - Check parent elements for color inheritance
   - Look for conflicting CSS specificity

---

### Issue: Accessibility Warnings

**Symptoms:**

- Screen reader announces incorrectly
- Missing aria-label warnings
- Keyboard navigation issues

**Solutions:**

1. **Add text labels for icon-only actions:**

   ```tsx
   // ✅ Best - Visible text label
   <button>
     <MaterialIcon icon="event" className="mr-2" />
     Schedule Consultation
   </button>

   // ✅ Acceptable - aria-label for icon-only
   <button aria-label="Schedule consultation">
     <MaterialIcon icon="event" />
   </button>

   // ❌ Wrong - No context for screen readers
   <button>
     <MaterialIcon icon="event" />
   </button>
   ```

2. **Hide decorative icons from screen readers:**

   ```tsx
   <div>
     <MaterialIcon icon="construction" aria-hidden="true" />
     <span>Construction Services</span>
   </div>
   ```

3. **Ensure keyboard operability:**
   - Interactive icons must be in focusable elements
   - Visible focus indicators required
   - Logical tab order maintained

---

### Issue: Policy Violation Detected

**Symptoms:**

- Build failure due to emoji detection
- Code review flagged for policy violation
- Linter error in CI/CD pipeline

**Solutions:**

1. **Replace emoji with Material Icon:**

   ```tsx
   // ❌ Wrong
   <span>🏗️ Construction</span>

   // ✅ Correct
   <span>
     <MaterialIcon icon="construction" size="sm" className="mr-2" />
     Construction
   </span>
   ```

2. **Move emoji to documentation if needed:**

   ```tsx
   // If emoji needed for documentation, move to .md file
   // .md files: ✅ Emojis permitted
   // .tsx files: ❌ Emojis prohibited
   ```

3. **Request exception if truly necessary:**
   - Follow exception process documented above
   - Provide detailed justification
   - Propose alternative solutions
   - Get leadership approval

---

## 📚 Related Documentation

### Policy & Standards

- **[Icons Index](./icons-index.md)** - Icon documentation hub
- **[Icon Usage Inventory](./icon-usage-inventory.md)** - Complete site icon inventory
- **[Icon System Quick Reference](./icon-system-quick-reference.md)** - Developer quick reference
- **[Brand Standards](../../../branding/standards/standards-index.md)** - Visual standards hub

### Technical Implementation

- **[Icon Hover Effects Guide](./icon-hover-effects-guide.md)** - Hover and interaction patterns
- **[Icon Size Troubleshooting](./icon-size-troubleshooting.md)** - Size issue resolution
- **[Design System](../design-system.md)** - Complete design system overview
- **[Consistency Guide](../../../development/consistency-guide.md)** - Implementation patterns

### External Resources

- **[Google Material Icons](https://fonts.google.com/icons)** - Complete icon library
- **[Material Design Guidelines](https://material.io/design/iconography)** - Icon design principles
- **[WCAG Icon Accessibility](https://www.w3.org/WAI/WCAG21/Understanding/)** - Accessibility standards

---

## 📞 Support & Questions

For questions about icon policy or implementation:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Phone:** (509) 308-6489
- **Documentation Issues:** Submit to project repository

---

## 📝 Version History

- **5.0.0** (Nov 6, 2025): Consolidated policy and implementation documentation
  - Combined icon-policy.md and icon-policy-implementation.md
  - Enhanced with comprehensive troubleshooting section
  - Added detailed quality assurance checklist
  - Expanded common icon reference tables
- **4.0.2** (Nov 4, 2025): Updated brand standards integration
- **4.0.1** (Oct 8, 2025): Policy implementation complete
- **3.0.0** (Oct 2025): Initial emoji-free policy established

---

**Document Version:** 5.0.0  
**Status:** ✅ Active - Consolidated Policy & Implementation  
**Last Updated:** November 6, 2025  
**Consolidates:** icon-policy.md (v4.0.2), icon-policy-implementation.md  
**Authority:** MH Construction Leadership Team  
**For Use By:** All developers, designers, content creators
