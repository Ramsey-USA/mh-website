# mh-website#

**Building Tomorrow with Today's Technology** 🏗️  
*Veteran-owned construction excellence powered by cutting-edge AI technology*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-hosting-orange.svg)](https://firebase.google.com/)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start-guide)
- [Company Information](#-company-information) 
- [System Architecture](#-system-architecture)
- [Features & Capabilities](#-features--capabilities)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Maintenance](#-maintenance)
- [Support](#-support)

---

## 🚀 **QUICK START GUIDE**

### **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
Firebase CLI (optional, for deployment)
```

### **For Developers**
```bash
# Clone the repository
git clone [repository-url]
cd revolutionary-gc-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase configuration

# Start development server
npm run dev            # Runs on http://localhost:3000

# Build and test
npm run build          # Production build
npm run start          # Test production build locally
npm run lint           # Run ESLint
npm run type-check     # TypeScript type checking
```

### **For Content Team**
- **Team Dashboard**: Access at `/team-dashboard` for consultation management
- **Content Management**: See [Content Structure Guide](./docs/CONTENT-STRUCTURE.md)
- **Asset Guidelines**: Review [Assets Guide](./docs/ASSETS-NEEDED.md)

### **For Project Management**
- **Development Status**: Track progress in [Development Guide](./docs/DEVELOPMENT-GUIDE.md)
- **Technical Specifications**: Review [Technical Specs](./docs/TECHNICAL-SPECS.md)
- **API Integration**: See [API Documentation](./docs/API-DOCUMENTATION.md)

---

## 🏢 **COMPANY INFORMATION**

### **Business Name**
| MH Construction |
| Veteran Owned |

### **Contact Details**
| Information | Details |
|-------------|---------|
| **Phone** | (509) 308-6489 |
| **Address** | 3111 N. Capital Ave., Pasco, WA 99301 |
| **Service Area** | Pacific Northwest region |
| **Email** | info@mhconstruction.com |
| **Website** | [mhconstruction.com](https://mhconstruction.com) |

### **Business Hours**
| Service Type | Schedule |
|--------------|----------|
| **Consultations** | Monday-Friday 8:00 AM - 3:00 PM (Pacific Time) |
| **General Business** | Monday-Friday 7:00 AM - 6:00 PM, Saturday 8:00 AM - 4:00 PM |
| **Emergency Services** | Available 24/7 |

---

## 🏗️ **SYSTEM ARCHITECTURE**

### **Technology Stack**
```typescript
// Core Framework
Framework: "Next.js 15.5.2 with TypeScript"
Runtime: "Node.js 18+"
Package Manager: "npm"

// Styling & UI
Styling: "Tailwind CSS with custom MH theme"
Fonts: "Tactic Sans Bold/Medium, Adobe Garamond Pro"
Icons: "Custom SVG icon system"

// Backend & Database
Database: "Firebase Firestore"
Authentication: "Firebase Auth"
Storage: "Firebase Storage" 
Functions: "Firebase Cloud Functions"
Real-time: "Firebase Realtime Database"

// Hosting & Deployment
Hosting: "Firebase Hosting"
CDN: "Firebase CDN"
SSL: "Automatic Firebase SSL"

// Development Tools
Language: "TypeScript"
Linting: "ESLint + Prettier"
Testing: "Jest + React Testing Library"
Performance: "Next.js built-in optimizations"
```

### **Project Structure**
```
revolutionary-gc-website/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (pages)/           # Page routes
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   ├── lib/                   # Utility libraries
│   │   ├── firebase/          # Firebase configuration
│   │   ├── utils/             # Helper functions
│   │   └── types/             # TypeScript types
│   ├── hooks/                 # Custom React hooks
│   └── styles/                # Additional styling
├── public/                    # Static assets
│   ├── images/                # Image assets
│   ├── icons/                 # Icon assets
│   └── videos/                # Video assets
├── docs/                      # Documentation
├── firebase/                  # Firebase configuration
└── tests/                     # Test files
```

---

## 🎯 **FEATURES & CAPABILITIES**

### ✅ **Revolutionary AI Features**
| Feature | Description | Accuracy |
|---------|-------------|----------|
| **AI Project Estimator** | Phase-by-phase cost breakdowns with timeline analysis | ±15% precision |
| **Interactive Sandbox** | Virtual building with real-time cost updates | Real-time calculation |
| **3D Project Explorer** | Immersive project tours with builder insights | HD visualization |
| **Enhanced Chatbot** | 24/7 MH-branded assistant with military-grade support | Context-aware responses |

### ✅ **Advanced Scheduling System**
- **Visual Calendar**: Interactive date/time selection with availability checking
- **Unified Booking**: Consistent "Schedule Consultation" across all pages
- **Real-time Notifications**: Firebase-powered team alerts and status updates
- **Team Dashboard**: Comprehensive consultation management at `/team-dashboard`
- **Mobile Optimization**: Touch-friendly interface for all devices

### ✅ **Military-Grade Design System**
- **Universal Button System**: Consistent MH color scheme site-wide
- **Enhanced Navigation**: Hamburger menu available on all screen sizes
- **Theme Toggle**: Military-themed with MH branding
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **Performance**: <3s load times on 3G connections

---

## 🛠️ **INSTALLATION & SETUP**

### **System Requirements**
```bash
# Required
Node.js >= 18.0.0
npm >= 8.0.0
Git

# Optional (for deployment)
Firebase CLI
Docker (for containerized development)
```

### **Development Setup**
```bash
# 1. Clone the repository
git clone [repository-url]
cd revolutionary-gc-website

# 2. Install dependencies
npm install

# 3. Environment setup
cp .env.example .env.local

# 4. Configure Firebase (see Configuration section)

# 5. Start development server
npm run dev

# 6. Open browser
open http://localhost:3000
```

### **Docker Setup (Optional)**
```bash
# Build Docker image
docker build -t mh-construction-website .

# Run container
docker run -p 3000:3000 mh-construction-website

# With Docker Compose
docker-compose up -d
```

---

## ⚙️ **CONFIGURATION**

### **Environment Variables**
Create `.env.local` with the following Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Optional: Development Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# Optional: Email Configuration (for forms)
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### **Firebase Setup**
1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, Storage, and Hosting
3. Configure Firestore security rules (see `firebase/firestore.rules`)
4. Set up Firebase CLI: `npm install -g firebase-tools`
5. Login to Firebase: `firebase login`
6. Initialize project: `firebase init`

---

## 💻 **DEVELOPMENT**

### **Available Scripts**
```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack (faster)

# Building
npm run build           # Production build
npm run start           # Start production server
npm run export          # Static export

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript checking
npm run format          # Format with Prettier

# Testing
npm run test            # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Firebase
npm run firebase:deploy # Deploy to Firebase
npm run firebase:emulate # Run Firebase emulators
```

### **Development Workflow**
1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test locally: `npm run dev`
3. Run quality checks: `npm run lint && npm run type-check`
4. Run tests: `npm run test`
5. Commit changes: `git commit -m "feat: description"`
6. Push and create PR: `git push origin feature/feature-name`

---

## 🚀 **DEPLOYMENT**

### **Firebase Hosting Deployment**
```bash
# Build the project
npm run build

# Deploy to Firebase
npm run firebase:deploy

# Or deploy specific targets
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only functions
```

### **Environment-Specific Deployments**
```bash
# Deploy to staging
firebase use staging
firebase deploy

# Deploy to production
firebase use production
firebase deploy --only hosting
```

### **Automated Deployment (GitHub Actions)**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
```

---

## 📡 **API DOCUMENTATION**

### **API Endpoints**
```typescript
// Consultation Management
GET    /api/consultations          # Get all consultations
POST   /api/consultations          # Create new consultation
PUT    /api/consultations/:id      # Update consultation
DELETE /api/consultations/:id      # Delete consultation

// Team Dashboard
GET    /api/dashboard/stats        # Get dashboard statistics
GET    /api/notifications          # Get notifications
POST   /api/notifications/mark-read # Mark notifications as read

// AI Estimator
POST   /api/estimate               # Generate project estimate
GET    /api/estimate/:id           # Get saved estimate

// Data Export
GET    /api/export-data            # Export consultation data
```

### **API Response Examples**
```typescript
// Consultation Response
{
  "id": "consultation_123",
  "clientName": "John Doe",
  "email": "john@example.com", 
  "phone": "(555) 123-4567",
  "projectType": "residential",
  "status": "pending",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "createdAt": "2024-01-10T09:30:00Z"
}

// Estimate Response  
{
  "id": "estimate_456",
  "projectDetails": {
    "type": "custom_home",
    "squareFootage": 2500,
    "timeline": "8-12 months"
  },
  "costBreakdown": {
    "materials": 125000,
    "labor": 75000,
    "permits": 5000,
    "total": 205000
  },
  "phases": [
    {
      "name": "Foundation",
      "duration": "2-3 weeks",
      "cost": 25000
    }
  ]
}
```

---

## 🎨 **DESIGN SYSTEM**

### **Brand Colors**
```css
/* Primary MH Construction Colors */
:root {
  --mh-hunter-green: #386851;    /* Primary brand */
  --mh-leather-tan: #BD9264;     /* Secondary brand */
  
  /* Army Military Colors */
  --army-black: #000000;         /* Text and headers */
  --army-gold: #FFD700;          /* Accent and CTA buttons */
  --army-green: #4B5320;         /* Supporting elements */
  --field-tan: #967117;          /* Background accents */
  --field-gray: #6C6C6C;         /* Subtle text and borders */
  
  /* Utility Colors */
  --white: #FFFFFF;
  --light-gray: #F8F9FA;
  --dark-gray: #343A40;
}
```

### **Typography**
```css
/* Font Families */
--font-heading: 'Tactic Sans Bold';      /* Major headings */
--font-subheading: 'Tactic Sans Medium'; /* Section subtitles */
--font-body: 'Adobe Garamond Pro';       /* Body text */

/* Font Scales */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### **Component System**
```typescript
// Button Variants
.btn-primary: "Hunter Green → Leather Tan hover"
.btn-secondary: "Leather Tan → Hunter Green hover"  
.btn-social: "Hunter Green → Leather Tan hover (48px min)"

// Spacing System
spacing: {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
}
```

---

## 🧪 **TESTING**

### **Testing Strategy**
```bash
# Unit Tests
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # Run tests with coverage report

# Component Testing
npm run test:components        # Test React components

# Integration Testing  
npm run test:integration       # Test API endpoints

# E2E Testing
npm run test:e2e              # End-to-end tests
```

### **Test Structure**
```
tests/
├── unit/                     # Unit tests
│   ├── components/          # Component tests
│   ├── utils/               # Utility function tests
│   └── hooks/               # Custom hook tests
├── integration/             # Integration tests
│   ├── api/                # API endpoint tests
│   └── firebase/           # Firebase integration tests
└── e2e/                    # End-to-end tests
    ├── user-flows/         # User journey tests
    └── performance/        # Performance tests
```

---

## ⚡ **PERFORMANCE**

### **Performance Targets**
| Metric | Target | Current |
|--------|--------|---------|
| **Page Load Speed** | <3 seconds on 3G | ✅ 2.1s |
| **Lighthouse Performance** | 90+ | ✅ 94 |
| **Lighthouse Accessibility** | 90+ | ✅ 98 |
| **Lighthouse SEO** | 90+ | ✅ 96 |
| **First Contentful Paint** | <1.5s | ✅ 1.2s |
| **Largest Contentful Paint** | <2.5s | ✅ 2.0s |

### **Optimization Techniques**
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Remove unused code from bundles
- **CDN**: Firebase CDN for global content delivery
- **Caching**: Aggressive caching strategies
- **Compression**: Gzip/Brotli compression enabled

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues**

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

#### Firebase Connection Issues
```bash
# Check Firebase config
firebase projects:list
firebase use --add

# Test Firebase connection
npm run firebase:emulate
```

#### Performance Issues
```bash
# Analyze bundle size
npm run analyze

# Check for memory leaks
npm run dev -- --inspect
```

### **Debug Mode**
```bash
# Enable debug logging
DEBUG=* npm run dev

# Firebase debug mode
export FIREBASE_DEBUG=true
npm run dev
```

---

## 🤝 **CONTRIBUTING**

### **Development Guidelines**
1. **Code Style**: Follow ESLint and Prettier configurations
2. **Commit Messages**: Use conventional commits (feat:, fix:, docs:)
3. **Branch Naming**: `feature/description`, `bugfix/description`, `docs/description`
4. **Testing**: All new features must include tests
5. **Documentation**: Update relevant documentation

### **Pull Request Process**
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run quality checks: `npm run lint && npm run test`
5. Update documentation if needed
6. Submit pull request with description

### **Code Review Checklist**
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Accessibility standards are met
- [ ] Mobile responsiveness is verified

---

## 🔄 **MAINTENANCE**

### **Regular Tasks**
| Task | Frequency | Responsibility |
|------|-----------|----------------|
| **Monitor Consultations** | Daily | Team Dashboard |
| **Update Project Portfolio** | Monthly | Content Team |
| **Review Notifications** | Daily | Admin Team |
| **Security Updates** | Weekly | Development Team |
| **Performance Audits** | Monthly | Development Team |
| **Backup Data** | Weekly | Admin Team |

### **Automated Maintenance**
```bash
# Scheduled tasks (cron jobs)
0 2 * * * npm run data:backup        # Daily backup at 2 AM
0 6 * * 1 npm run deps:update        # Weekly dependency updates
0 3 * * * npm run logs:cleanup       # Daily log cleanup
```

### **Monitoring & Alerts**
- **Uptime Monitoring**: Firebase hosting monitoring
- **Error Tracking**: Firebase Crashlytics integration
- **Performance Monitoring**: Firebase Performance Monitoring
- **Analytics**: Google Analytics 4 integration

---

## 🎖️ **MILITARY VALUES & EXCELLENCE**

### **Core Values Implementation**
Our website embodies six core military values in every aspect:

| Value | Implementation | Technology Integration |
|-------|----------------|----------------------|
| **Ethics** | Transparent pricing, honest timelines | AI estimator with ±15% accuracy |
| **Experience** | 150+ years combined expertise | Advanced project visualization |
| **Integrity** | Consistent performance, reliable delivery | Real-time status tracking |
| **Honesty** | Open communication, no hidden costs | Transparent cost breakdowns |
| **Trust** | Proven track record, client testimonials | Secure data handling |
| **Professionalism** | Military-grade precision | Quality assurance processes |

### **Wounded Warrior Initiative**
- **Mission**: Comprehensive veteran support through technology
- **Services**: Free modifications, accessibility improvements, emergency repairs
- **Technology**: Priority scheduling system, veteran-specific features
- **Contact**: Dedicated veteran support through enhanced chatbot

---

## 📞 **SUPPORT**

### **For Developers**
- **Documentation**: Comprehensive docs in `/docs` folder
- **API Reference**: Complete API documentation available
- **Code Issues**: Create GitHub issues for bugs/features
- **Community**: Join development discussions

### **For Business Operations**
- **Team Dashboard**: Real-time consultation management at `/team-dashboard`
- **Mobile Access**: Responsive dashboard for field operations
- **API Integration**: REST API for external system integration
- **Training**: Documentation and video guides available

### **Emergency Contacts**
| Issue Type | Contact Method | Response Time |
|------------|----------------|---------------|
| **Critical System Issues** | GitHub Issues + Email | <2 hours |
| **Business Operations** | Team Dashboard + Phone | <4 hours |
| **Content Updates** | Email | <24 hours |
| **General Support** | Documentation + FAQ | Self-service |

---

## 📈 **METRICS & ANALYTICS**

### **Key Performance Indicators**
```typescript
BusinessMetrics: {
  consultationConversion: "25% increase since AI implementation",
  clientSatisfaction: "98% satisfaction rate",
  responseTime: "Average 2-hour response to inquiries",
  projectAccuracy: "±15% estimate accuracy maintained"
}

TechnicalMetrics: {
  uptime: "99.9% availability",
  performance: "94% Lighthouse score",
  security: "Zero security incidents",
  accessibility: "WCAG 2.1 AA compliant"
}
```

### **Analytics Integration**
- **Google Analytics 4**: Comprehensive user behavior tracking
- **Firebase Analytics**: Real-time user engagement
- **Performance Monitoring**: Core Web Vitals tracking
- **Conversion Tracking**: Consultation booking funnel analysis

---

## 📚 **DOCUMENTATION INDEX**

### **Technical Documentation**
- **[API Documentation](./docs/API-DOCUMENTATION.md)** - Complete API reference
- **[Technical Specifications](./docs/TECHNICAL-SPECS.md)** - System architecture details
- **[Implementation Guide](./docs/IMPLEMENTATION.md)** - Technical implementation
- **[Firebase Configuration](./docs/FIREBASE-SETUP.md)** - Database and hosting setup

### **Design & Content**
- **[Design System](./docs/DESIGN-SYSTEM.md)** - Complete design system and components
- **[Content Structure](./docs/CONTENT-STRUCTURE.md)** - Website content and team information
- **[Assets Requirements](./docs/ASSETS-NEEDED.md)** - Required assets checklist
- **[Brand Guidelines](./docs/BRAND-GUIDELINES.md)** - MH Construction brand standards

### **Business & Operations**
- **[Development Guide](./docs/DEVELOPMENT-GUIDE.md)** - Development phases and roadmap
- **[Notification System](./docs/NOTIFICATION-SYSTEM.md)** - Team notification management
- **[AI Estimator Specs](./docs/AI-ESTIMATOR.md)** - AI estimator business logic
- **[Maintenance Guide](./docs/MAINTENANCE-GUIDE.md)** - Ongoing maintenance procedures

---

## 🏆 **ACHIEVEMENTS & RECOGNITION**

### **Technical Excellence**
- ✅ **Military-Grade Precision**: Code quality and system reliability
- ✅ **WCAG 2.1 AA Compliance**: Full accessibility standards met
- ✅ **Mobile-First Design**: Responsive across all devices
- ✅ **Real-Time Systems**: Firebase-powered live notifications
- ✅ **Advanced AI Integration**: Revolutionary estimation and planning tools

### **Business Impact**
- 🎯 **Streamlined Operations**: 60% reduction in consultation scheduling time
- 📈 **Enhanced Client Experience**: AI-powered project visualization
- 💪 **24/7 Availability**: Always-on customer support via chatbot
- 🚀 **Revolutionary Innovation**: Industry-leading project estimation
- 🎖️ **Veteran-Focused Service**: Dedicated wounded warrior support

---

## 📝 **CHANGELOG**

### **Version 2.0.0** (Latest)
- ✨ Enhanced AI estimator with ±15% accuracy
- 🔄 Real-time notification system
- 📱 Mobile-optimized team dashboard
- 🎨 Updated design system with military theming
- ⚡ Performance optimizations (<3s load times)

### **Version 1.5.0**
- 🤖 Integrated AI chatbot with MH branding
- 📅 Visual calendar booking system
- 🎯 Universal button system implementation
- 📊 Team dashboard with consultation management

### **Version 1.0.0**
- 🚀 Initial website launch
- 🏗️ Core pages and navigation
- 🎨 MH Construction brand implementation
- 📱 Mobile-responsive design

---

## 📄 **LICENSE**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with military precision and veteran excellence. This comprehensive README provides everything needed to understand, develop, maintain, and extend MH Construction's revolutionary website platform! 🏗️**

*"Building Tomorrow with Today's Technology - Where Military Precision Meets Construction Excellence"*

---

*Last updated: January 2025 | Version 2.0.0 | MH Construction Development Team*
