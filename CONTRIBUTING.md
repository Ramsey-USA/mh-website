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
serving the Pacific Northwest. The platform emphasizes community partnership, transparent
communication, and veteran excellence.

### Current Status

- **Foundation-Only Architecture**: Clean slate approach with homepage and core components
- **Technology Stack**: Next.js 15.5.2, TypeScript 5.9, Tailwind CSS 3.4.0
- **Build Status**: Production-ready with zero TypeScript errors

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
```

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ramsey-USA/mh-website.git
   cd mh-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup** (✅ Firebase Active)

   ```bash
   cp .env.example .env.local
   # Firebase configuration is already active in .env.local
   # Project: mhc-gc-website (Live Firebase project)
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Verify setup**

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

2. **Make your changes**
   - Follow code standards (see below)
   - Write/update tests as needed
   - Update documentation

3. **Quality checks**

   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit and push**

   ```bash
   git add .
   git commit -m "feat: add feature description"
   git push origin feature/feature-name
   ```

5. **Create Pull Request**
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
- **Responsive Design**: Mobile-first approach
- **CSS Variables**: Use design system tokens

```tsx
// Good - Tailwind utilities
<button className="bg-brand-primary hover:bg-brand-primary-light px-4 py-2 rounded-lg">
  Button
</button>

// Custom CSS only when needed
<div className="custom-complex-layout">
  {/* Complex layout requiring custom CSS */}
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

- Follow the design system documented in `docs/technical/DESIGN_SYSTEM.md`
- Use standardized button variants
- Implement proper hover states and transitions
- Ensure WCAG 2.1 AA accessibility compliance

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

### Firebase Security (✅ Active & Configured)

- ✅ **Security Rules Deployed**: Firestore and Storage rules active
- ✅ **Authentication Checks**: Role-based access control implemented
- ✅ **Input Validation**: All user inputs properly validated
- ✅ **Production Ready**: Security rules tested and deployed

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

### Deployment Commands (✅ Firebase Integration Active)

```bash
# Production build
npm run build

# Full Firebase deployment (all services)
firebase deploy

# Specific service deployments
firebase deploy --only hosting        # Static site hosting
firebase deploy --only firestore:rules # Database security rules
firebase deploy --only functions      # Cloud Functions API
firebase deploy --only storage        # File storage rules

# NPM scripts for convenience
npm run firebase:deploy   # Deploy all services
npm run firebase:emulate  # Local development with emulators
```text

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

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
2. **Code Review**: At least one team member review
3. **Testing**: Manual testing for UI changes
4. **Documentation**: Updated if necessary
5. **Merge**: Squash and merge preferred

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

### Development Team

- **Lead Developer**: <office@mhc-gc.com>
- **Project Manager**: <office@mhc-gc.com>
- **Emergency Support**: <office@mhc-gc.com>

### Business Contacts

- **General Inquiries**: [(509) 308-6489](tel:+15093086489)
  - **Client Contact**: [ext. 100](tel:+15093086489,100) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
  - **Vendor Contact**: [ext. 150](tel:+15093086489,150) | [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **General Email**: <office@mhc-gc.com>

---

## 🎯 Project Values

Remember that this project represents MH Construction's commitment to:

- **Partnership**: "We Work With You" philosophy
- **Community**: Serving Pacific Northwest communities
- **Excellence**: Veteran-owned quality and precision
- **Transparency**: Open communication and honest practices

Every contribution should reflect these values and support the company's mission of building lasting
partnerships through exceptional construction services.

---

**Thank you for contributing to MH Construction's digital presence!**

### Last updated: October 2025 | MH Construction Development Team
````
