# Contributing to MH Construction Website

## Table of Contents

- [🏗️ Project Overview](#️-project-overview)
  - [Current Status](#current-status)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Setup](#development-setup)
- [📋 Development Workflow](#-development-workflow)
  - [Branch Strategy](#branch-strategy)
  - [Creating a Feature](#creating-a-feature)
- [💻 Code Standards](#-code-standards)
  - [TypeScript Guidelines](#typescript-guidelines)

We welcome contributions to the MH Construction website! This document provides guidelines for
developers working on this project.

## 🏗️ Project Overview

This is a partnership-driven foundation platform for MH Construction, a veteran-owned company
serving the Pacific Northwest. The platform emphasizes collaborative client partnerships, professional
trade partnerships, and veteran excellence.

**⚠️ CRITICAL PARTNERSHIP DISTINCTION:** The platform serves two distinct partnership audiences:

- **Client Partnerships** 🏠 - Project collaborations with homeowners and businesses (routes: `/services`, `/booking`)
- **Trade Partnerships** 🏗️ - Business relationships with subcontractors and vendors (routes: `/trade-partners`)

See [Partnership Type Definitions](./docs/partnerships/partnership-type-definitions.md) for complete implementation guidelines.

### Current Status

- **Foundation-Only Architecture**: Clean slate approach with homepage and core components
- **Technology Stack**: Next.js 15.5.2, TypeScript 5.9, Tailwind CSS 3.4.0
- **Build Status**: Production-ready with zero TypeScript errors

## 🚀 Getting Started

### Prerequisites

````bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
```text

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ramsey-USA/mh-website.git
   cd mh-website
````

1. **Install dependencies**

   ```bash
   npm install
   ```

1. **Environment setup**

   ```bash
   cp .env.example .env.local
   # Add your environment variables for Cloudflare if needed
   ```

1. **Start development server**

   ```bash
   npm run dev
   ```

1. **Verify setup**

   ```bash
   npm run build
   npm run lint
   npm run type-check
   ```

## 📋 Development Workflow

### Branch Strategy

- **main**: Production-ready code, protected branch
- **develop**: Integration branch for features (if applicable)
- **feature/**: Feature development branches
- **fix/**: Bug fix branches
- **hotfix/**: Critical production fixes

### Creating a Feature

1. **Create a feature branch**

   ```bash
   git checkout -b feature/feature-name
   ```

1. **Make your changes**
   - Follow code standards (see below)
   - Write/update tests as needed
   - Update documentation

1. **Quality checks**

   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

1. **Commit and push**

   ```bash
   git add .
   git commit -m "feat: add feature description"
   git push origin feature/feature-name
   ```

1. **Create Pull Request**
   - Use the PR template
   - Request review from team members
   - Ensure all checks pass

## 💻 Code Standards

### TypeScript Guidelines

- **Strict Mode**: All TypeScript strict mode rules enforced
- **Type Safety**: Avoid `any` types, use proper type definitions
- **Interfaces**: Define clear interfaces for props and data structures
- **Error Handling**: Proper error boundaries and type-safe error handling

````typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Avoid
const Button = (props: any) => { ... }
```text

### React Best Practices

- **Functional Components**: Use functional components with hooks
- **Component Structure**: One component per file, clear naming
- **Props Validation**: Use TypeScript interfaces for props
- **Performance**: Use React.memo, useMemo, useCallback when appropriate

```tsx
// Component structure example
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic

  return (
    // JSX
  );
};

export default Component;
```text

### CSS and Tailwind

- **Tailwind Classes**: Use Tailwind utility classes
- **Custom CSS**: Only when Tailwind is insufficient
- **Responsive Design**: Mobile-first approach following [Mobile Optimization Guide](/docs/technical/design-system/mobile-optimization-guide.md)
- **CSS Variables**: Use design system tokens
- **Touch Optimization**: Include `touch-manipulation` class for all interactive elements

```tsx
// Good - Mobile-optimized Tailwind utilities
<button className="bg-brand-primary hover:bg-brand-primary-light px-4 xs:px-5 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base touch-manipulation">
  Button
</button>

// Mobile-responsive layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
  {/* Content */}
</div>
```text

### File Organization

src/
├── app/                  # Next.js App Router
│   ├── page.tsx         # Pages
│   ├── layout.tsx       # Layouts
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # Generic UI components
│   ├── layout/         # Layout components
│   ├── features/       # Feature-specific components
│   └── icons/          # Icon components
├── lib/                # Utilities and services
│   ├── utils/          # Utility functions
│   ├── services/       # API services
│   └── types/          # Type definitions
└── hooks/              # Custom hooks

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `NavBar.tsx`)
- **Files**: kebab-case for non-components (`api-client.ts`)
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`btn-primary`, `nav-item`)

## 🎨 Design System Compliance

### Brand Colors

- **Primary**: `#386851` (Hunter Green)
- **Secondary**: `#BD9264` (Leather Tan)
- Use CSS variables: `var(--brand-primary)`, `var(--brand-secondary)`

### Component Standards

- Follow the design system documented in `docs/technical/design-system/DESIGN_SYSTEM.md`
- **Mobile Optimization**: Follow mobile standards in `docs/technical/design-system/mobile-optimization-guide.md`
- All sections must use the standardized typography patterns with mobile-responsive scaling
- Use standardized button variants with proper touch targets (44px minimum)
- Implement proper hover states and transitions with `touch-manipulation` class
- Ensure WCAG 2.1 AA accessibility compliance including mobile accessibility

### Mobile-First Requirements

- **Touch Targets**: Minimum 44px × 44px for all interactive elements
- **Typography**: Use responsive scaling pattern: `text-sm xs:text-base sm:text-lg`
- **Spacing**: Progressive scaling: `px-3 xs:px-4 sm:px-6`
- **Performance**: Include `touch-manipulation` for all interactive elements
- **Testing**: Verify functionality on 320px+ screen widths

### Icons

- Use Google Material Icons via the `MaterialIcon` component
- Consistent sizing: `sm`, `md`, `lg`, `xl`, `2xl`
- Proper aria-labels for accessibility

## ✅ Quality Assurance

### Code Quality Checks

```bash
# Linting
npm run lint              # ESLint check
npm run lint:fix          # Auto-fix ESLint issues

# Type checking
npm run type-check        # TypeScript validation

# Building
npm run build            # Production build test
```text

### Testing Standards

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Ensure WCAG compliance
- **Performance Tests**: Monitor Core Web Vitals

```bash
# Testing commands (when implemented)
npm run test             # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```text

### Performance Standards

| Metric | Target | Current |
|--------|--------|---------|
| **Lighthouse Performance** | 90+ | ✅ 94+ |
| **First Contentful Paint** | <1.5s | ✅ <1.2s |
| **TypeScript Errors** | 0 | ✅ 0 |
| **Build Time** | <30s | ✅ <20s |

## 🔐 Security Guidelines

### Environment Variables

- Never commit `.env` files
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Store sensitive data in secure environment management

### Security Best Practices

- ✅ **Security Headers**: CSP, HSTS, X-Frame-Options configured
- ✅ **Input Validation**: All user inputs properly validated
- ✅ **API Protection**: Rate limiting and authentication
- ✅ **Production Ready**: Security handled by Cloudflare WAF

### Dependencies

- Keep dependencies updated
- Review security implications of new packages
- Security handled by Cloudflare security layer

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper semantic HTML and ARIA labels
- **Focus Management**: Clear focus indicators

### Testing Accessibility

```bash
# Accessibility testing tools
npm run test:a11y        # (When implemented)
```text

### Implementation Checklist

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] ARIA labels for complex interactions
- [ ] Keyboard navigation support
- [ ] Focus management

## 📝 Documentation Standards

### Code Documentation

- **Components**: Document props, usage examples
- **Functions**: JSDoc comments for complex functions
- **APIs**: Document endpoints, parameters, responses
- **README Updates**: Keep documentation current

### Documentation Structure

docs/
├── business/           # Business documentation
├── technical/          # Technical documentation
├── project/           # Project-specific docs
└── development/       # Development guides

### Writing Guidelines

- Clear, concise language
- Code examples where helpful
- Screenshots for UI components
- Update dates and version information

## 🚀 Deployment Process

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Performance metrics within targets

### Deployment Commands

```bash
# Production build (Cloudflare-optimized)
npm run build:cloudflare

# Deploy to Cloudflare Pages
npm run pages:deploy

# Or push to Git for automatic deployment
git push origin main
```text

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Step one
1. Step two
1. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser:
- OS:
- Node version:
- Build version:

## Screenshots
If applicable
```text

### Priority Levels

- **Critical**: Breaks core functionality, production impact
- **High**: Significant feature impact, affects user experience
- **Medium**: Minor functionality issues, workarounds available
- **Low**: Cosmetic issues, enhancements

## 📊 Performance Guidelines

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Optimization Techniques

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimize bundle size
- Efficient CSS and JavaScript

### Monitoring

```bash
# Bundle analysis
npm run analyze

# Performance audits
npm run lighthouse    # (When implemented)
```text

## 🤝 Community Guidelines

### Code of Conduct

- Respectful and inclusive communication
- Constructive feedback and reviews
- Support for new contributors
- Focus on project goals and user needs

### Getting Help

- **Documentation**: Check existing docs first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: development team at <office@mhc-gc.com>

## 📋 Pull Request Process

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings/errors
```text

### Review Process

1. **Automated Checks**: All CI checks must pass
1. **Code Review**: At least one team member review
1. **Testing**: Manual testing for UI changes
1. **Documentation**: Updated if necessary
1. **Merge**: Squash and merge preferred

## 🔄 Release Process

### Versioning

- Follow Semantic Versioning (SemVer)
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

### Release Checklist

- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] Performance metrics verified
- [ ] Deployment successful

## 📞 Contact Information

### Email System Integration (November 2025)

**All website forms now send email notifications to <office@mhc-gc.com> using Resend:**

- **Contact Forms**: General inquiries and project requests
- **Job Applications**: Career submissions with resume uploads
- **Consultation Bookings**: Partnership discussion scheduling
- **AI Estimator**: Project estimates and follow-ups

**Email Service Details:**

- **Provider**: Resend (<https://resend.com>)
- **API Endpoint**: `/src/app/api/contact/route.ts`
- **Environment Variables**: `RESEND_API_KEY`, `EMAIL_FROM`
- **Status**: ✅ Operational with domain verification complete

**For Development:**
When testing forms locally, ensure `.env.local` has the Resend API key configured.
All submissions are logged even if email service is unavailable (graceful fallback).

### Development Team

- **Lead Developer**: <office@mhc-gc.com>
- **Project Manager**: <office@mhc-gc.com>
- **Urgent Support**: <office@mhc-gc.com>

### Business Contacts

- **General Inquiries**: [(509) 308-6489](tel:+15093086489)
  - **Client Partnership Inquiries (projects)**: [ext. 100](tel:+15093086489,100) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
  - **Trade Partnership Inquiries (vendors)**: [ext. 150](tel:+15093086489,150) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **General Email**: <office@mhc-gc.com>

**Partnership Distinction:** See [Partnership Type Definitions](./docs/partnerships/partnership-type-definitions.md)
for guidance on client vs trade partnership communications.

---

## 🎯 Project Values

Remember that this project represents MH Construction's commitment to:

- **Client Partnerships**: "We Work With You" philosophy for project collaborations
- **Trade Partnerships**: Professional business relationships with quality vendors and subcontractors
- **Community**: Serving Pacific Northwest communities
- **Excellence**: Veteran-owned quality and precision
- **Transparency**: Open communication and honest practices

Every contribution should reflect these values and support the company's mission of building lasting
partnerships through exceptional construction services.

**Partnership Implementation:** Always maintain clear distinction between Client Partnerships
(homeowners/businesses hiring us) and Trade Partnerships (vendors/subcontractors working with us).
See [Partnership Implementation Guide](./docs/development/reference/partnership-implementation-guide.md).

---

**Thank you for contributing to MH Construction's digital presence!**

### Last updated: October 2025 | MH Construction Development Team
````
