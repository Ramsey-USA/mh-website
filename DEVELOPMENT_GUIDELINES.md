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
```

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
```

### ❌ PROHIBITED PRACTICES

#### Never Use Emojis in Source Code

```tsx
// ❌ NEVER do this in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule Meeting</button>
title: 'Project Update 🎯'

console.log('🔧 Debug message')
```

#### Invalid Icon Approaches

```tsx
// ❌ Don't mix icon libraries
import { Award } from 'lucide-react'
import { FaHammer } from 'react-icons/fa'

// ❌ Don't use custom SVGs without approval
<CustomHammerIcon />

// ❌ Don't use emoji unicode
<span>&#x1F3D7;</span>

```

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
```

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
```

#### Accessibility Requirements

```tsx
// ✅ Include proper accessibility attributes
<MaterialIcon 

  icon="phone" 
  size="md" 
  className="text-blue-600"
  aria-label="Contact phone number"
/>

```

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

**Questions?** Contact the development team or reference the MH-BRANDING.md file for detailed implementation examples.
