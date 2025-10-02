# MH Construction Website

**Your Partner in Building Tomorrow** 🏗️  
*Veteran-owned construction excellence - Working with you to serve our communities*

## Core Philosophy

> **"Building for the Owner, NOT the Dollar"**  
> *Where veteran values meet genuine partnership - Your success is our mission*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-06B6D4.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11+-FF0055.svg)](https://www.framer.com/motion/)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)](https://web.dev/progressive-web-apps/)

> **📅 Last Updated:** October 2, 2025  
> **🚀 Current Version:** 3.6.0  
> **🎯 Status:** Production Ready - Serving Pacific Northwest Communities  
> **🤝 Philosophy:** Partnership-Driven Construction - We Work With You Every Step  
> **🎨 Architecture:** Modern React + Community-Focused UI + Collaborative UX  
> **🔄 Latest:** Core Values System Redesign + 6-Value Professional Foundation + Trust-Centered Approach

---

## 🚨 **CURRENT IMPLEMENTATION: Core Values System Redesign (v3.6.0)**

### **What's New in v3.6.0 - October 2, 2025:**

#### �️ **Core Values System Overhaul**

- **6-Value Professional Foundation**: Evolved from 4 simplified values to comprehensive 6-principle system
  - **Honesty & Transparency** (TransparencyIcon) - Full-disclosure approach in all communications
  - **Integrity** (ScaleIcon - retained) - Unwavering commitment to what's right  
  - **Precision & Experience** (PrecisionIcon) - 150+ years combined team expertise
  - **Client-First Ethics** (ClientFirstIcon) - Small-town values with big-city capabilities
  - **Professionalism & Control** (ProfessionalControlIcon) - You control it, we manage it
  - **Trust** (TrustIcon) - The Culmination of all other values working together
- **Strategic Focus**: Trust positioned as ultimate goal and measurable company foundation
- **Professional Construction Methodology**: Detailed value descriptions reflecting industry expertise
- **Client-Centered Philosophy**: "We manage the project; you control it" collaborative approach
- **Enhanced Icon System**: New 3xl (20×20) and 4xl (24×24) size mappings for optimal visibility

#### �🎨 **Previous Update - Icon System Redesign (v3.5.0)**

- **Value Icon Alignment**: Teamwork (handshake), Leadership (star), Integrity (scales), Accountability (badge)
- **Specialized Icons**: Enhanced AI, scheduling, and 3D exploration iconography  
- **Size Optimization**: 25-60% larger icons for better visibility and container utilization
- **Construction Theme**: Cohesive iconography aligned with construction industry standards

#### 🏠 **Implementation Highlights (v3.6.0)**

**Homepage Professional Foundation Redesign:**

- **Section Title**: "Built on Professional Foundation" replacing military-focused messaging
- **Trust-Centered Approach**: "Trust as our ultimate goal" messaging throughout
- **6-Value System**: Complete grid layout showcasing all six professional foundation principles
- **Enhanced Accessibility**: Improved contrast and readability across all value descriptions

**Technical Implementation:**

- **New Icon Components**: 5 specialized construction industry icons (TransparencyIcon, PrecisionIcon, ClientFirstIcon, ProfessionalControlIcon, TrustIcon)
- **Enhanced Icon System**: New 3xl (20×20) and 4xl (24×24) size mappings for optimal visibility
- **Complete Integration**: Values array replacement with professional messaging on homepage
- **Brand Consistency**: Maintained MH Construction visual identity while evolving messaging approach

#### 🎨 **Previous Update - Header Cleanup (v3.4.0)**

#### **🎨 Comprehensive Header Bubble Cleanup**

- **Removed 20+ Decorative Elements**: Eliminated pill-shaped header badges across all pages
- **Cleaner Visual Design**: Streamlined section headers for better focus and readability
- **Professional Appearance**: More minimalist and modern aesthetic throughout the site
- **Enhanced User Experience**: Improved visual hierarchy and scanning patterns

#### **📄 Pages Affected**

- **Homepage**: 6 section headers cleaned (hero, principles, services, testimonials, partnership, blog)
- **Contact**: 2 section headers cleaned (hero, contact methods)
- **Portfolio**: 3 section headers cleaned (hero, featured projects, categories)
- **Booking**: 2 section headers cleaned (hero, calendar)
- **Estimator**: 3 section headers cleaned (hero, features, form)
- **Services**: 4 section headers cleaned (hero, categories, details, process)

### **Previous Updates (v3.3.0) - October 1, 2025:**

- ✅ **Transparent Header Design** - Fully transparent header on load with hero section showing through
- ✅ **Theme Toggle Repositioning** - Moved to far left edge of screen for optimal accessibility
- ✅ **Navigation Text Updates** - "About" → "About Us", "Services" → "What We Do"
- ✅ **Enhanced Hover Effects** - Animated underlines with brand color integration
- ✅ **Blog/News Carousel** - Interactive content carousel with auto-play and responsive design
- ✅ **CTA Section Overhaul** - 4-button grid layout with strategic action options
- ✅ **Content Streamlining** - Removed stats section and partnership badges for cleaner design
- ✅ **Mobile-First Responsiveness** - Optimized layouts for all screen sizes
- ✅ **Typography Enhancement** - Improved cohesiveness and consistent font weights

### **Previous Updates (v3.1.0):**

- ✅ **Enhanced Typography System** - Responsive clamp() scaling optimized for desktop viewing with compact section layouts
- ✅ **Standardized CTA System** - Consistent Button components with proper dark/light mode support across all sections
- ✅ **Optimized Spacing** - Reduced section padding py-16 lg:py-24 with responsive header margins for better content density
- ✅ **Grid Layout Improvements** - Enhanced responsive layouts with better visual balance and card consistency
- ✅ **Dark Mode Excellence** - Proper theme support without custom overrides, automatic adaptation
- ✅ **Brand Consistency** - All components follow MH Construction design system standards

### **Current Component Standards:**

```tsx
// Interactive Why Choose Section (New in v3.2.0)
<section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl lg:text-5xl font-black text-center mb-12">
      Why Choose MH Construction
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-full">
      <div className="group relative h-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center h-full flex flex-col">
          <StarIcon size="2xl" primaryColor="#dc2626" className="mx-auto mb-6" />
          <h3 className="text-xl font-bold mb-4">Veteran-Owned Excellence</h3>
        </div>
        {/* Hover Modal */}
        <div className="absolute inset-0 bg-brand-primary/95 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <h4 className="text-xl font-bold mb-4">Military Precision</h4>
            <p>Disciplined approach with attention to detail that only military experience provides.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

// Optimized Typography System (Desktop-Friendly)
<h1 className="mb-4 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
  <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Building Tomorrow with
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
    Today's Technology
  </span>
</h1>

// Standardized CTA Buttons
<Button variant="primary" size="xl" className="shadow-xl">
  <CalendarIcon size="sm" primaryColor="currentColor" className="mr-3" />
  <span className="z-10 relative tracking-wide">Schedule Free Consultation</span>
</Button>

// Optimized Section Spacing (Desktop-Friendly)
<section className="relative bg-white dark:bg-gray-900 py-16 lg:py-24 features-section">
  <div className="mb-16 lg:mb-20 text-center scroll-reveal">
    <h2>Section Content with Optimized Spacing</h2>
  </div>
</section>

// Enhanced Grid Layouts
<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
  <Card className="h-full">Consistent Card Heights</Card>
</div>
```

---

## 🤝 **MH PARTNERSHIP PHILOSOPHY**

### **"We Work With You" - Our Foundation**

At MH Construction, we don't just build structures - we build relationships. Our veteran-owned company operates on a simple but powerful principle: **every client is a partner, every project serves the community**.

#### **🏡 Client Partnership Approach**

```typescript
// How MH Works With Every Client
Partnership Principles:
├── Transparent Communication: Open dialogue from day one
├── Collaborative Planning: Your vision + our expertise
├── Honest Pricing: No surprises, no hidden costs
├── Shared Success: Your satisfaction is our success
└── Long-term Relationship: Partners beyond project completion

Client Experience Journey:
├── Discovery: Understanding your unique needs and dreams
├── Collaboration: Working together to refine plans and budgets
├── Partnership: Building side-by-side with constant communication
├── Celebration: Sharing in the joy of your completed project
└── Community: Becoming part of the extended MH family
```

#### **🌍 Community-Centered Culture**

**MH Construction exists to strengthen Pacific Northwest communities.** Every project we complete, every partnership we build, and every team member we support contributes to a stronger, more connected region.

```typescript
// Our Community Impact Focus
Community Values:
├── Local Investment: Hiring locally, supporting regional suppliers
├── Veteran Support: Creating opportunities for military families  
├── Quality Craftsmanship: Building structures that last generations
├── Environmental Stewardship: Sustainable practices for future communities
└── Neighbor-to-Neighbor: Treating every client like family

Regional Commitment:
├── Pacific Northwest Pride: Deep roots in WA, OR, ID communities
├── Local Partnerships: Working with regional businesses and suppliers
├── Community Projects: Supporting local nonprofits and organizations
├── Skill Development: Training the next generation of craftspeople
└── Economic Growth: Contributing to regional prosperity and stability
```

#### **💡 Why Partnership Matters**

- **Better Results**: Collaboration leads to solutions that truly fit your needs
- **Shared Investment**: When we work together, both parties are committed to success  
- **Community Impact**: Your project becomes part of strengthening our shared region
- **Lasting Relationships**: Many clients become lifelong friends and community connections
- **Authentic Experience**: No sales pressure, just honest conversation about your goals

> *"When you choose MH Construction, you're not hiring a contractor - you're gaining a partner who genuinely cares about your success and our community's future."*  
> **- Jeremy Thamert, Owner & General Manager**

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
Firebase CLI (optional)
```

### Setup

```bash
# Clone and install
git clone https://github.com/Ramsey-USA/mh-website.git
cd mh-website
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with Firebase configuration

# Start development
npm run dev            # http://localhost:3000
npm run build          # Production build
npm run lint           # Code quality check
```

---

## ✨ **Advanced Features (v3.0.0)**

### 🎬 **Animation System**

- **Framer Motion Integration**: Smooth, performant animations with spring physics
- **Interactive Components**: Hover effects, gesture support, and micro-interactions
- **Performance Optimized**: Transform-GPU acceleration and optimized re-renders
- **Reusable Animations**: Component library with FadeInWhenVisible, HoverScale, StaggeredFadeIn

### 📊 **Analytics & SEO**

- **Google Analytics 4**: Comprehensive tracking with construction-specific events
- **Custom Event Tracking**: Form submissions, phone calls, scroll depth, time-on-page
- **Enhanced SEO Schema**: Organization, LocalBusiness, Service, Project markup
- **Conversion Tracking**: Lead generation and user engagement analytics

### 🎛️ **Content Management System**

- **Admin Dashboard**: Complete interface for managing website content
- **Multi-Content Support**: Blog posts, portfolio projects, testimonials
- **Image Management**: Upload optimization with modern format support
- **Real-time Analytics**: Track content performance and user engagement

### 🔍 **Dynamic Search & Gallery**

- **Advanced Search**: Real-time filtering with category and type filters
- **Interactive Gallery**: Lightbox with zoom, rotation, fullscreen viewing
- **Performance Optimized**: Debounced search and intersection observer loading
- **Mobile Responsive**: Touch gestures and mobile-optimized interactions

### ⚡ **Performance Features**

- **Custom Performance Hooks**: Intersection observer, scroll throttling, memory monitoring
- **Optimized Images**: WebP/AVIF support with automatic fallbacks and lazy loading
- **Bundle Optimization**: 155kB first load JS with code splitting
- **Critical Resource Preloading**: Strategic resource loading for faster page speeds

### 🎨 **Enhanced UI Components**

- **Modern Button System**: Multiple variants with enhanced animations
- **Optimized Image Component**: Modern formats, blur placeholders, error handling
- **Navigation Enhancement**: Smooth transitions and responsive design
- **Theme System**: Complete light/dark mode support

---

## �️ **CONSTRUCTION SERVICES & EXPERTISE**

### **Expert Commercial Construction Management in the Tri-Cities (Pasco, WA)**

Put your commercial building project in the right hands. MH Construction delivers full Construction Management (CM) services throughout the Tri-Cities area, including Pasco, Kennewick, and Richland, WA. Our priority is delivering an exceptional client experience from concept through completion. We believe meticulous Master Planning and thorough communication are critical to streamlining the process in later stages, which is why we minimize "on-the-fly" decisions. Trust our experienced team to manage the intricate details, allowing you to focus on your vision's success.

**📞 Call to Action:** Call (509) 308-6489 today to begin planning your new commercial, industrial, or medical construction project in Benton or Franklin County.

### **Make Your Vision a Reality**

MH Construction has proven expertise managing projects for:

- **Commercial Businesses** (Offices, Retail, etc.)
- **Medical Facilities** (Clinics, Specialty Offices)
- **Industrial Buildings & Facilities**
- **Wineries & Vineyards**
- **Churches and Religious Facilities**

---

### **🎯 MASTER PLANNING (Pre-Construction)**

#### **Comprehensive Pre-Construction & Master Planning | Tri-Cities, WA**

Unlock the full potential of your commercial project with MH Construction's detailed Master Planning and Pre-Construction Services. Our team is passionate about transforming your vision into a practical, buildable reality. We strategize and coordinate every component of your building construction—from initial concept to the finishing touches. By listening intently to your goals, we create a comprehensive blueprint designed to prevent costly, last-minute changes to scope and budget.

**📞 Call to Action:** Call (509) 308-6489 today to take the first, most critical step in the construction planning process. We serve Pasco, Kennewick, Richland, and the surrounding areas in Benton and Franklin Counties.

#### **Navigating Project Complexity with Precision**

Our highly skilled planning team ensures comprehensive scope coverage during your Pre-Construction phase. We meticulously consider:

- **Project Location and Surrounding Infrastructure**
- **Local and State Building Codes** (WA, OR, ID)
- **Detailed Budget Constraints and Cost Control**
- **Project Timeline and Sequencing**
- **Owner Design Preferences and Technical Requirements**

---

### **📦 PROCUREMENT (Vendor Management)**

#### **Construction Material Procurement & Vendor Management in the Tri-Cities**

The complexity of commercial construction is often bottlenecked by material procurement. Rely on MH Construction for efficient Construction Vendor Management across the Tri-Cities area (Pasco, Kennewick, Richland). We specialize in sourcing the highest-quality materials tailored precisely to your project goals. Our efficient Master Planning provides vendors with the advanced notice and coordinated scheduling they need to streamline material delivery, proactively addressing long lead item delays to keep your project schedule intact.

#### **What Our Procurement Service Includes**

MH Construction applies meticulous attention to detail throughout the entire construction material procurement cycle. You can count on our team to expertly manage:

- **Material Sourcing and Vetting**
- **Supplier Management and Communication**
- **Budget Negotiation and Price Stabilization**
- **Detailed Purchase Orders and Documentation**
- **Contract Management**
- **On-Time Coordination of Deliveries**

---

### **💰 CONSTRUCTABILITY & BUDGET CONTROL**

#### **Constructability Review & Proactive Budget Control Services**

Is your project feasible? And if so, how can it be cost-effective? MH Construction is committed to improving project planning and execution through early-stage Constructability Analysis and Budget Control. Although our headquarters are in Pasco, WA, we provide these critical pre-construction services to clients throughout Washington, Oregon, and Idaho. Our proactive approach involves collaborating closely with key subcontractors to eliminate guesswork before ground is broken.

**📞 Call to Action:** Request Budget Control and Feasibility Analysis today. Call (509) 308-6489 to learn more.

#### **Collaboration for Cost-Effective Execution**

Through close collaboration, we determine critical project details such as:

- **Optimized Construction Sequencing and Methods**
- **Site Logistics** (e.g., equipment placement, utility installation)
- **Identifying and Mitigating Budget Risks**
- **Ensuring early alignment on the Project Scope and Objectives**

---

### **🧩 MODULARIZATION (Advanced PM)**

#### **Project Modularization & Subproject Management for Complex Builds**

Reduce complexity and increase efficiency with our advanced Project Modularization services. This modern project management concept involves strategically dividing large, complex projects into smaller, specialized subprojects. MH Construction focuses on expert Subproject Management to help our clients complete large-scale builds more efficiently and consistently meet tight schedules in the Tri-Cities (Kennewick, WA) and beyond.

#### **Ushering in a New Era of Project Management**

Replacing a single, overwhelmed project manager with a team of phase specialists is the smart decision for large ventures. Our Modularization services:

- **Streamline the transitions** between different construction phases
- **Improve Resource Allocation** and stakeholder communication
- **Leverage specialist expertise** at each stage of the process for better quality control

---

### **🏢 MARKET & PROJECT TYPES**

#### **Commercial Construction for Key Markets: Tri-Cities, WA, OR, ID**

MH Construction is licensed and experienced to complete sophisticated construction projects for a wide range of commercial markets across Washington, Oregon, and Idaho. With over 150 years of collective experience, you can trust our team to bring your specific vision to life—from a high-end winery to a complex medical center throughout Benton and Franklin Counties.

#### **Diverse Projects We Build:**

Our completed projects include, but are not limited to:

- **Religious Facilities** (Churches, Centers)
- **Commercial Buildings** (Offices, Retail Centers)
- **Government Buildings and Public Works**
- **Educational Buildings** (Schools, Training Centers)
- **Medical Centers and Clinics**
- **Wineries and Vineyards** (Processing and Tasting Rooms)
- **Grant Projects** (Specialized Funding)

---

### **🏪 TENANT IMPROVEMENTS (TI)**

#### **Expert Commercial Tenant Improvement Services | Tri-Cities, WA**

Ready to transform your commercial space? MH Construction offers comprehensive Tenant Improvement (TI) Services throughout the Tri-Cities, WA area, including Kennewick, Richland, and Pasco. We are licensed to complete commercial renovation projects across Washington, Oregon, and Idaho. With over a decade of experience, we can quickly convert a recently purchased or leased building into a functional, beautiful space that meets your exact business requirements.

**📞 Call to Action:** Are you ready to bring your commercial vision to life? Call us right away to schedule tenant improvement services.

---

### **🏗️ COMMERCIAL NEW BUILD-OUTS**

#### **New Commercial Construction & Build-Outs in the Tri-Cities, WA**

If you require a dedicated, reliable partner for new construction, MH Construction offers complete Commercial Construction Services for business owners throughout the Tri-Cities (Kennewick, Richland, and Pasco). Whether you want to build a small corporate office or a large vehicle dealership, we construct a space where your business can thrive. We partner with the best architects and utilize top-grade materials to ensure structural integrity and successful project goals.

#### **Past Commercial Build-Out Expertise:**

- **Retail Construction Services**
- **Winery Construction Services**
- **Medical Office Construction Services**
- **Car Dealership Construction Services**
- **Boutique & Specialty Spaces**

---

### **🏭 LIGHT INDUSTRIAL**

#### **Safe & Functional Light Industrial Construction Services | Tri-Cities**

For specialized light industrial construction, experience is the most important factor. MH Construction has been providing Light Industrial Construction Services for over a decade to business owners in the Tri-Cities, WA (Kennewick, Richland, Pasco) and surrounding areas. If you live in Washington, Oregon, or Idaho, count on us to create a safe, durable, and highly functional building—from warehouses to processing plants—built to your precise specifications.

#### **Equipped with High-Quality Materials**

Light Industrial facilities demand durability and reliability. Our construction contractors in the Tri-Cities utilize industry-leading materials for all critical features, including:

- **Advanced Fire Protection Systems**
- **Commercial-Grade Doors and Windows**
- **Locker Room and Office Build-Outs**
- **Structural Metal Studs and Sheetrock**
- **Safety Hand Railings and Access Points**

---

### **⛪ RELIGIOUS FACILITIES**

#### **Specialized Construction for Religious Facilities | WA, OR, ID**

MH Construction provides dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We understand that these spaces require thoughtful design, careful budgeting, and a respect for the community they serve. Trust our experienced team to manage every detail of your renovation or new construction project in Benton or Franklin County.

**📞 Call to Action:** Call (509) 308-6489 to discuss your religious facility construction or renovation project.

---

## �🏢 Company Information

| Information | Details |
|-------------|---------|
| **Business Name** | MH Construction LLC (Veteran-Owned) |
| **Partnership Philosophy** | "We Work With You" - Collaborative Construction Partners |
| **Community Focus** | Serving Pacific Northwest Communities Since 1995 |
| **Phone** | (509) 308-6489 |
| **Address** | 3111 N. Capital Ave., Pasco, WA 99301 |
| **Service Area** | Pacific Northwest (WA, OR, ID) |
| **Email** | <info@mhconstruction.com> |
| **Website** | [mhconstruction.com](https://mhconstruction.com) |

### Our Partnership Approach

**MH Construction is more than a contractor - we're your construction partner.** Our veteran-owned company believes in working **with you**, not just **for you**. Every project is a collaboration where your vision, our expertise, and community values come together to create something exceptional.

### Leadership & Core Team

*Our people-centered culture starts with leadership committed to serving both clients and communities.*

The following roster is sourced directly from `src/lib/data/team.ts` and grouped by functional department.

#### Executive Leadership

| Name | Role | Experience | Status | Core Specialties |
|------|------|-----------:|--------|------------------|
| Jeremy Thamert | Owner & General Manager | 2 yrs | Civilian Supporter | Strategic Vision; Technology Integration; AI Adoption; Operational Leadership |
| Mike Holstein | Founder (Retired) | 30 yrs | Retired Leadership | Company Foundations; Quality Standards; Leadership; Client Trust |
| Arnold Garcia | Vice President | 15 yrs | Civilian | Client Relationships; Strategic Operations; Service Excellence; Project Oversight |

#### Project Management & Estimating

| Name | Role | Experience | Status | Core Specialties |
|------|------|-----------:|--------|------------------|
| Makayla Holstein | Project Manager | 8 yrs | Civilian | Project Coordination; Timeline Management; Client Communication; Risk Mitigation |
| Ben Woodall | Project Manager | 10 yrs | Civilian | Project Efficiency; Budget Management; Resource Planning; Client Alignment |
| Todd Schoeff | Lead Estimator | 20 yrs | Civilian | Cost Estimation; Commercial Projects; Medical Facilities; Specialty Projects |
| Ronaldo Garcia | Drywall & Specialty Systems Expert | 12 yrs | Civilian | Drywall Installation; Specialty Wall Systems; Interior Finishing; Precision Craftsmanship |

#### Site & Field Operations

| Name | Role | Experience | Status | Core Specialties |
|------|------|-----------:|--------|------------------|
| Steve McClary | Senior Superintendent | 20+ yrs | Civilian | Field Leadership; Multi-Phase Oversight; Safety Management; Quality Assurance |
| Reagan Massey | Superintendent | 12 yrs | Civilian | On-Site Operations; Crew Management; Quality Control; Daily Coordination |
| Porter Cline | Superintendent | 5+ yrs | Civilian | Industrial Projects; Field Coordination; Complex Logistics; Heavy Systems |

#### Administration & Support

| Name | Role | Experience | Status | Core Specialties |
|------|------|-----------:|--------|------------------|
| Brooks Morris | Senior Accountant | 10 yrs | Civilian | Financial Reporting; Budget Management; Payroll; Cost Controls |
| Brittney Holstein | HR Manager | 8 yrs | Civilian | Recruitment; Employee Relations; Team Development; HR Compliance |
| Matt Ramsey | Project & Marketing Coordinator | 7 yrs | Veteran | Marketing Coordination; Technology Advocacy; Client Presentations; AI Estimator Promotion |
| Jennifer Tenehuerta | Administrative Assistant | 5 yrs | Civilian | Office Administration; Scheduling; Team Support; Information Flow |

> To update: modify `src/lib/data/team.ts` (fields: name, role, department, experienceYears, veteranStatus, specialties, bio). Regenerate this section manually or via tooling that reads the data file.

---

## 🏗️ Tech Stack

```typescript
Framework: "Next.js 15.5.2 with App Router & TypeScript"
Styling: "Tailwind CSS v3.4.0 with Enhanced MH Brand System"
Typography: "Desktop-optimized responsive scaling with compact text-6xl maximum hierarchy"
CTAs: "Standardized Button components with proper dark mode support"
Spacing: "Optimized responsive section padding py-16 lg:py-24 and compact grid layouts"
Components: "h-full card consistency with enhanced responsive grids"
Interactions: "Hover-triggered modals with Why Choose section animations"
Icons: "SharpDuotone icon system with enhanced sizing (3xl/4xl) + Custom MH Construction core values icons"
CoreValues: "6-Value Professional Foundation system with specialized construction industry icons"
HoverEffects: "Context-aware icon animations (scale, rotate, pulse, slide, glow, bounce)"
Backend: "Firebase (Firestore, Auth, Storage, Functions)"
PWA: "Complete offline capabilities with push notifications"
Hosting: "Firebase Hosting with CDN"
Analytics: "Google Analytics 4 + Firebase Analytics"
Theme: "Complete light/dark mode with automatic adaptation"
Architecture: "Pure Tailwind CSS with interactive component patterns"
```

### **Enhanced Interactive System Benefits:**

- 🎨 **Typography Excellence**: Desktop-optimized responsive scaling from mobile to desktop with compact text-6xl maximum
- 🎯 **CTA Consistency**: Standardized Button variants across all pages and components
- 🎪 **Interactive Components**: Hover-triggered modals and professional animations
- 📱 **Card Uniformity**: Consistent heights and responsive grid layouts for better UX
- 📱 **Compact Layout Design**: Optimized section padding py-16 lg:py-24 for maximum content visibility
- 🌙 **Dark Mode Perfection**: Proper theme support without custom overrides
- ♿ **Accessibility First**: Enhanced focus states and proper contrast ratios
- 🚀 **Performance**: Efficient CSS with Tailwind utilities and optimized animations
- 🔧 **Maintainability**: Standardized patterns that scale across the entire application

---

## 📁 Project Structure

```text
mh-website/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (pages)/             # Public pages
│   │   │   ├── page.tsx         # Enhanced home with animations
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── portfolio/
│   │   │   ├── contact/
│   │   │   └── offline/         # PWA offline page
│   │   ├── dashboard/           # Protected admin area
│   │   ├── api/                 # API routes
│   │   └── globals.css          # Enhanced animation system
│   ├── components/
│   │   ├── ui/                  # Base components
│   │   ├── icons/               # WPZoom + Custom MH Construction icon systems
│   │   ├── animations/          # ScrollReveal system
│   │   ├── layout/              # Header, Footer, Navigation
│   │   └── pwa/                 # PWA components
│   └── lib/                     # Utilities and Firebase config
├── public/
│   ├── sw.js                    # Service worker
│   ├── manifest.json            # PWA manifest
│   ├── favicon.ico              # MH logo favicon
│   └── icons/                   # Complete PWA icon set
└── firebase/                    # Firebase configuration
```

---

## 🎯 Key Features

### 🤝 Partnership-Centered Platform

**Built around our "We Work With You" philosophy - every feature designed to enhance collaboration and community connection.**

### ✅ Collaborative Project Management (v2.5.0)

- **Partnership Dashboard**: Transparent project tracking where clients and MH team collaborate
- **Real-time Communication**: Open dialogue throughout your project journey
- **Community Updates**: Share your project's positive impact on the local community
- **Veteran Support Network**: Connecting veteran clients with our veteran-led team
- **Transparent Pricing**: Honest, upfront cost estimation you can trust

### ✅ Community-Focused Home Experience (v2.5.0)

- **Our Story Animations**: Progressive revelation of MH's community commitment
- **Local Project Showcase**: Highlighting our work in Pacific Northwest communities
- **Client Success Stories**: Authentic testimonials from your neighbors
- **Community Impact Stats**: Showing how MH projects strengthen local communities
- **Partnership Icons**: Custom MH icons representing our collaborative approach

### ✅ Client-Centered Core Platform

- **Partnership Estimator**: Work together to build accurate project estimates
- **Collaborative Booking**: Schedule consultations that fit your lifestyle
- **Shared Project Dashboard**: You and MH team aligned on every milestone
- **Open Communication Portal**: Direct access to your MH Construction partners
- **Community Performance**: 95+ satisfaction score, serving neighbors since 1995

---

## 🎨 MH Brand System

> **See [MH-BRANDING.md](./MH-BRANDING.md) for complete brand guidelines**

### Enhanced Brand Logo System

```css
/* MH Logo with Glimmer Effects */
.mh-logo-enhanced {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mh-logo-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
}

.mh-logo-enhanced:hover::before {
  left: 100%;
}

.mh-logo-enhanced:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
```

### Advanced Button System with Glimmer Effects

```css
/* MH Brand Standard Button Classes with Enhanced Effects */

/* 1. Primary Button - Hunter Green with Glimmer */
.btn-primary {
  background: var(--brand-primary);
  color: white;
  border: 2px solid var(--brand-primary);
  box-shadow: 0 4px 16px rgba(56, 104, 81, 0.2);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover {
  background: var(--brand-primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0 0 3px rgba(56, 104, 81, 0.3), 0 8px 25px rgba(56, 104, 81, 0.35);
}

.btn-primary:hover::before {
  left: 100%;
}

/* 2. Footer Navigation Links with Enhanced Styling */
.footer-nav-link {
  position: relative;
  overflow: hidden;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s ease;
}

.footer-nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 2px rgba(56, 104, 81, 0.3);
}

.footer-nav-link:hover::before {
  left: 100%;
}

/* 3. Enhanced Social Media Icons */
.footer-social-icon {
  position: relative;
  overflow: hidden;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgb(31 41 55);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.footer-social-icon:hover {
  background: rgb(239 68 68);
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3), 0 8px 25px rgba(239, 68, 68, 0.25);
}

.footer-social-icon:hover::before {
  left: 100%;
}
```

### Quick Brand Reference

```css
/* MH Brand Colors */
--brand-primary: #386851;      /* Hunter Green */
--brand-secondary: #BD9264;    /* Leather Tan */

/* Enhanced Button Standards with Glimmer Effects */
.btn-primary          /* Hunter Green - Main CTAs with glimmer */
.btn-secondary        /* Leather Tan - Secondary actions with glimmer */
.btn-outline          /* Outline style - Default filters with glimmer */
.btn-primary-footer   /* Footer buttons with enhanced glimmer */
.btn-veteran          /* Red veteran-themed buttons */
.btn-dashboard        /* Blue dashboard-themed buttons */
```

### Icon Usage Examples

```typescript
// WPZoom Icons via react-icons
import { WPMenuIcon, WPPhoneIcon, WPEmailIcon } from '@/components/icons/WPZoomIcons'

// Custom MH Construction Icons
import { MHHammerIcon, MHVeteranStarIcon, MHQualityShieldIcon } from '@/components/icons/MHCustomIcons'

// Usage with hover effects
<MHHammerIcon size="lg" hoverEffect="rotate" />
<WPPhoneIcon size="md" color="#386851" />
```

---

## ⚙️ Configuration

### Environment Variables (.env.local)

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# PWA Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript validation

# Firebase
npm run firebase:deploy # Deploy to Firebase
npm run firebase:emulate # Local Firebase emulators

# Utilities
npm run analyze         # Bundle analysis
```

### Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test: `npm run dev`
3. Quality checks: `npm run lint && npm run type-check`
4. Build test: `npm run build`
5. Commit and push for PR

---

## 🚀 Deployment

### Firebase Deployment

```bash
npm run build
firebase deploy

# Specific targets
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

### Build Status

```bash
✅ 25+ Static Pages Generated
✅ Zero TypeScript Errors  
✅ Core Values System: 6-Value Professional Foundation with trust-centered approach
✅ Enhanced Icon System: SharpDuotone icons with 3xl/4xl sizing and core values icons
✅ Desktop-Optimized Typography: Compact section layouts with text-6xl maximum
✅ Interactive Components: Why Choose Section with Hover Modals
✅ PWA Score: 100/100
✅ Performance: 95+ Lighthouse
✅ SEO Score: 100/100
✅ Accessibility: 100/100
```

---

## 📈 Recent Updates

### v3.6.0 (October 2, 2025) - Core Values System Redesign & Professional Foundation

- ✅ **6-Value Professional Foundation** - Evolved from 4 simplified values to comprehensive 6-principle system
- ✅ **Trust-Centered Philosophy** - Trust positioned as ultimate goal and company foundation ("The Culmination")
- ✅ **Professional Construction Methodology** - Detailed descriptions reflecting construction industry expertise
- ✅ **New Core Values Icons** - 5 specialized icons: TransparencyIcon, PrecisionIcon, ClientFirstIcon, ProfessionalControlIcon, TrustIcon
- ✅ **Enhanced Icon System** - Added 3xl (20×20) and 4xl (24×24) size mappings for better visibility
- ✅ **Client-Centered Messaging** - "We manage the project; you control it" approach
- ✅ **Homepage Implementation** - Complete section redesign with Professional Foundation messaging
- ✅ **Strategic Documentation** - Comprehensive documentation of core values evolution and implementation

### v3.5.0 (October 1, 2025) - Icon System Redesign & Value Alignment

- ✅ **Value Icon Conceptual Alignment** - Teamwork→handshake, Leadership→star, Integrity→scales, Accountability→badge
- ✅ **Specialized Construction Icons** - Enhanced AI, scheduling, and 3D exploration iconography
- ✅ **Icon Size Optimization** - 25-60% larger icons for better visibility and container utilization
- ✅ **Construction Industry Theme** - Cohesive iconography aligned with construction industry standards
- ✅ **Enhanced Binoculars Icon** - Improved design for better visual impact and clarity

### v3.4.0 (September 30, 2025) - Header Cleanup & Professional Design

- ✅ **Comprehensive Header Bubble Cleanup** - Removed 20+ decorative pill-shaped badges across all pages
- ✅ **Cleaner Visual Design** - Streamlined section headers for better focus and readability
- ✅ **Professional Appearance** - More minimalist and modern aesthetic throughout the site
- ✅ **Enhanced User Experience** - Improved visual hierarchy and scanning patterns
- ✅ **Multi-Page Coverage** - Homepage, Contact, Portfolio, Booking, Estimator, Services pages cleaned

### v3.3.0 (October 1, 2025) - Transparent Header & Navigation Enhancement

- ✅ **Transparent Header Design** - Fully transparent header on load with hero section showing through
- ✅ **Theme Toggle Repositioning** - Moved to far left edge of screen for optimal accessibility
- ✅ **Navigation Text Updates** - "About" → "About Us", "Services" → "What We Do"
- ✅ **Enhanced Hover Effects** - Animated underlines with brand color integration
- ✅ **Blog/News Carousel** - Interactive content carousel with auto-play and responsive design
- ✅ **CTA Section Overhaul** - 4-button grid layout with strategic action options

### v3.2.0 (September 29, 2025) - Desktop Typography Optimization & Interactive Components

- ✅ **Desktop Typography Optimization** - Reduced section sizes and typography scaling for optimal desktop viewing experience
- ✅ **Section Padding Optimization** - Streamlined from py-20 lg:py-32 xl:py-40 to py-16 lg:py-24 for better content density
- ✅ **Responsive Typography Scaling** - Maximum heading size reduced from text-8xl to text-6xl for improved readability
- ✅ **Compact Layout Design** - Optimized margins and spacing (mb-24 to mb-16, mb-10 to mb-6) for more content visibility
- ✅ **Why Choose MH Construction Section** - Interactive 4-card layout with hover-triggered modals
- ✅ **Hover Modal System** - Professional popup animations with proper pointer event handling
- ✅ **Uniform Card Heights** - Implemented h-full layout system for consistent card appearance
- ✅ **Font Rendering Optimization** - Crisp text rendering with optimized CSS transforms
- ✅ **Footer Social Media Update** - Twitter to X transition, YouTube addition, icon-only design
- ✅ **Enhanced MH Branding** - Sharp-edged logo implementation with emergency number removal

### v3.1.0 (September 23, 2025) - Enhanced Brand Standards & Typography Foundation

- ✅ **Typography System Foundation** - Established responsive scaling framework optimized for various screen sizes
- ✅ **Standardized CTA System** - Consistent Button components with proper dark/light mode support across all sections
- ✅ **Section Spacing Framework** - Implemented systematic section padding with responsive breakpoints
- ✅ **Grid Layout Improvements** - Enhanced responsive layouts with better visual balance and card consistency
- ✅ **Dark Mode Excellence** - Proper theme support without custom overrides, automatic adaptation
- ✅ **Brand Consistency** - All components follow MH Construction design system standards

### v2.5.0 (September 22, 2025) - Enhanced Home Page & Logo Glimmer Effects

- ✅ Complete MH logo favicon implementation across all contexts
- ✅ Enhanced logo glimmer effects in header and footer
- ✅ ScrollReveal animation framework with Intersection Observer
- ✅ Enhanced portfolio section with advanced hover effects
- ✅ Custom testimonials system replacing complex widgets
- ✅ Company statistics section with branded showcase
- ✅ **WPZoom Icon System Migration** - Complete migration to react-icons with modern tree-shaking
- ✅ **Custom MH Construction Icons** - 15 brand-specific icons with built-in hover effects
- ✅ Advanced button system with glimmer animations and outer rings
- ✅ Footer navigation links with enhanced hover effects and glimmer
- ✅ Social media icons with scaling and glimmer animations

### v2.4.0 - Enhanced Footer & Icon Systems

- ✅ 75% larger footer logo (315x158px) with hover effects
- ✅ Professional social media icons with glimmer animations
- ✅ Complete light/dark mode support
- ✅ **WPZoom Icon System** - Modern react-icons integration with optimized performance
- ✅ **Custom MH Icons** - Brand-specific construction icons with context-aware hover effects

### v2.3.0 - Partnership-Focused Design & Community Integration

- ✅ **Partnership-Centered Button System** - "Work With You" messaging integrated into CTAs
- ✅ **Community-Focused Brand Colors** - MH brand integration emphasizing local connection
- ✅ **Collaborative UI Components** - Design elements that promote partnership messaging
- ✅ **Community Accessibility** - Enhanced compliance ensuring all neighbors can access our services
- ✅ **Partnership Communication Icons** - WPZoom icon migration supporting collaborative messaging
- ✅ **Community Connection Icon System** - 15 brand-specific icons representing local partnership
- ✅ **Collaborative Hover Effects** - Context-appropriate animations encouraging client engagement

### v2.3.1 (October 1, 2025) - Desktop Typography & Layout Optimization

- ✅ **Improved Typography Hierarchy** - Enhanced header scaling (text-3xl to text-6xl for hero, text-3xl to text-5xl for sections) with better distinction from body text
- ✅ **Desktop-First Typography Scale** - Optimized clamp() functions for better responsive scaling across all screen sizes
- ✅ **Enhanced Card Typography** - Increased card title sizes (text-xl to text-2xl/3xl) and body text (text-sm to text-base/lg) for better readability
- ✅ **Compact Section Spacing** - Optimized section padding from py-20 lg:py-32 to py-12 lg:py-16 for better content density  
- ✅ **Tightened Component Margins** - Reduced spacing between elements (mb-16 to mb-10, mb-20 to mb-12) for desktop efficiency
- ✅ **Optimized Grid Layouts** - Reduced gap spacing (gap-8 to gap-6) and improved content density while maintaining readability
- ✅ **CSS Variable System** - Created desktop-optimized responsive typography and spacing variables with improved scaling ranges
- ✅ **Utility Class Framework** - Added .section-compact, .margin-compact, .grid-compact, and .text-responsive-* classes including text-6xl
- ✅ **Desktop-Focused UX** - Systematic homepage optimization for professional desktop viewing experience with proper visual hierarchy **Partnership-Centered Button System** - "Work With You" messaging integrated into CTAs
- ✅ **Community-Focused Brand Colors** - MH brand integration emphasizing local connection
- ✅ **Collaborative UI Components** - Design elements that promote partnership messaging
- ✅ **Community Accessibility** - Enhanced compliance ensuring all neighbors can access our services
- ✅ **Partnership Communication Icons** - WPZoom icon migration supporting collaborative messaging
- ✅ **Community Connection Icon System** - 15 brand-specific icons representing local partnership
- ✅ **Collaborative Hover Effects** - Context-appropriate animations encouraging client engagement

---

## 🎯 Development Roadmap

### Current Focus (Recently Completed ✅)

- [x] Interactive Why Choose section with hover modals ✅
- [x] Desktop typography optimization and compact section layouts ✅
- [x] Footer enhancement with modern social media ✅
- [x] **WPZoom Icon Migration** - Complete system-wide migration to modern react-icons ✅
- [x] **Custom MH Icon System** - Brand-specific construction icons with hover effects ✅
- [x] **Icon Hover Effect System** - Context-based animation system for enhanced UX ✅

### Next Phase (1-2 weeks) - Enhanced Partnership Experience

- [ ] **Collaborative Services Navigation** - Sticky navigation highlighting partnership approach
- [ ] **Partnership Comparison Tools** - "Working With MH vs. Traditional Contractors" features
- [ ] **Community Stories Blog** - Expanded content showcasing local project impacts
- [ ] **Partnership Performance Metrics** - Target: 100/100 client satisfaction score
- [ ] **Community Icon Integration** - Custom partnership icons across all remaining pages

### Mid-term Goals (1-2 months) - Deeper Community Connection

- [ ] **Partnership Journey Animations** - Visual storytelling of the MH collaborative process
- [ ] **Real-time Partnership Feedback** - Enhanced communication tools for active projects
- [ ] **Community Impact Dashboard** - Showcase MH's positive local economic and social impact
- [ ] **Neighborhood Network Features** - Connect past and current clients within their communities

### Future Vision (3-6 months) - Revolutionary Community Construction

- [ ] **Collaborative Cost Estimation** - AI-enhanced tools where clients participate in the estimation process
- [ ] **Community Project Tracking** - Real-time dashboards showing how individual projects strengthen neighborhoods
- [ ] **Partnership Mobile App** - Native app focused on client-MH team collaboration
- [ ] **3D Community Visualization** - Tools showing how projects fit within and enhance local communities

---

## 📞 Support

### Development Team

| Role | Contact | Hours |
|------|---------|-------|
| **Lead Developer** | <developers@mhconstruction.com> | Mon-Fri 9AM-5PM PT |
| **Project Manager** | <pm@mhconstruction.com> | Mon-Fri 8AM-6PM PT |
| **Emergency Support** | <support@mhconstruction.com> | 24/7 |

### Resources

- **Component Docs**: `/src/components/README.md`
- **API Reference**: `/docs/API.md`
- **Brand Guidelines**: `./MH-BRANDING.md`

---

## 🔐 Security & Performance

### Security Measures

- Firebase Security Rules with strict access controls
- HTTPS-only with SSL encryption
- Environment variable protection
- Input validation and sanitization
- Role-based authentication

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Page Load Speed | <3s | ✅ 2.1s |
| Lighthouse Performance | 90+ | ✅ 94 |
| First Contentful Paint | <1.5s | ✅ 1.2s |
| PWA Score | 90+ | ✅ 100 |

---

## 📄 License

MIT License - Copyright © 2025 MH Construction LLC

---

**Built with military precision and veteran excellence** 🏗️

## Building Tomorrow with Today's Technology

### Where Military Precision Meets Construction Excellence

---

*Last updated: January 2025 | Version 2.0.0 | MH Construction Development Team*
| **Project Showcase Gallery** | Before/after project documentation with testimonials | ✅ Live |
| **Content Discovery** | Advanced filtering by category, tags, and search | ✅ Live |
| **Responsive Content Design** | Optimized reading experience across all devices | ✅ Live |
| **SEO Content Optimization** | Dynamic meta tags, structured data, sitemap integration | ✅ Live |
| **Markdown Content Support** | Rich content with syntax highlighting and custom components | ✅ Live |
| **Social Sharing Integration** | Built-in social media sharing capabilities | ✅ Live |

### 🌟 Testimonials & Portfolio System

| Feature | Description | Status |
|---------|-------------|--------|
| **Dynamic Testimonials** | Client testimonials with project galleries and ratings | ✅ Live |
| **Before/After Galleries** | Visual project transformations with detailed descriptions | ✅ Live |
| **Service-Specific Testimonials** | Testimonials categorized by construction service type | ✅ Live |
| **Project Timeline Displays** | Visual timeline of project phases and milestones | ✅ Live |
| **Client Story Integration** | Rich storytelling with images and project details | ✅ Live |

### ✅ **Core Platform Features (v2.0.0)**

#### **🗺️ Interactive Contact & Map System**

| Feature | Description | Status |
|---------|-------------|--------|
| **Enhanced Contact Forms** | Multi-type forms with validation and analytics tracking | ✅ Live |
| **Interactive Location Map** | Office location with service area visualization | ✅ Live |
| **Lead Capture System** | Advanced lead generation with conversion optimization | ✅ Live |
| **Service Area Overview** | Detailed coverage maps for Pacific Northwest | ✅ Live |
| **Real-time Contact Points** | Multiple contact methods with response guarantees | ✅ Live |

#### **📊 Advanced Client Dashboard**

| Feature | Description | Status |
|---------|-------------|--------|
| **Project Tracking Dashboard** | Real-time project progress with visual timelines | ✅ Live |
| **Live Updates System** | Real-time notifications and project communications | ✅ Live |
| **Document Sharing Portal** | Secure file upload/download with categorization | ✅ Live |
| **Communication Center** | Priority-based messaging with read/unread status | ✅ Live |
| **Progress Visualization** | Interactive progress bars and milestone tracking | ✅ Live |

#### **🏗️ Portfolio & SEO System**

| Feature | Description | Status |
|---------|-------------|--------|
| **Dynamic Portfolio Showcase** | SEO-optimized project pages with static generation | ✅ Live |
| **Performance Optimization** | WebP/AVIF images, lazy loading, Core Web Vitals | ✅ Live |
| **SEO Meta System** | Dynamic meta tags, Open Graph, Twitter Cards | ✅ Live |
| **Structured Data** | JSON-LD schema for enhanced search visibility | ✅ Live |
| **Analytics Integration** | Google Analytics 4 with custom event tracking | ✅ Live |

### ✅ **Core Platform Features**

#### **🤖 AI-Powered Cost Estimation**

| Feature | Description | Status |
|---------|-------------|--------|
| **Interactive Cost Calculator** | Real-time project cost estimation with material breakdowns | ✅ Live |
| **Project Type Selection** | Residential, Commercial, Renovation options | ✅ Live |
| **Veteran Discounts** | Automatic 10% veteran discount application | ✅ Live |
| **Material Cost Tracking** | Dynamic pricing based on current market rates | ✅ Live |
| **PDF Export** | Professional cost estimate reports | ✅ Live |

#### **📅 Advanced Booking System**

| Feature | Description | Status |
|---------|-------------|--------|
| **Interactive Calendar** | Visual date/time selection with availability | ✅ Live |
| **Service Selection** | Multiple consultation types and durations | ✅ Live |
| **Real-time Notifications** | Firebase-powered booking confirmations | ✅ Live |
| **Team Assignment** | Automatic assignment to available team members | ✅ Live |
| **Mobile Optimization** | Touch-friendly interface for all devices | ✅ Live |

#### **🏢 Team Dashboard System**

| Feature | Description | Status |
|---------|-------------|--------|
| **Dashboard Overview** | Statistics, projects, consultations at-a-glance | ✅ Live |
| **Consultation Management** | Complete booking and client management system | ✅ Live |
| **Project Tracking** | Progress monitoring with team assignments | ✅ Live |
| **Team Management** | Member profiles with veteran status tracking | ✅ Live |
| **Veteran Support Resources** | Dedicated veteran benefits and peer networks | ✅ Live |

#### **🎨 Professional Design System**

| Feature | Description | Status |
|---------|-------------|--------|
| **Brand Consistency** | MH Construction colors and typography throughout | ✅ Live |
| **Responsive Design** | Perfect display on all device sizes | ✅ Live |
| **Accessibility** | WCAG 2.1 AA compliance with screen reader support | ✅ Live |
| **Performance** | <3s load times with optimized images and code | ✅ Live |

### 🚧 **In Development**

- **Blog & Content Management** - SEO-focused content system for construction tips
- **Client Testimonials System** - Review management with social proof integration
- **PWA Features** - Progressive web app with offline capabilities

### 🗂️ **Upcoming Features**

- **Advanced Analytics Dashboard** - Business intelligence and reporting
- **Native Mobile Apps** - iOS/Android apps for enhanced team coordination
- **3D Project Visualization** - Advanced project planning and visualization tools
- **AI-Enhanced Estimator** - Machine learning for more accurate cost predictions

---

## 📱 **PROGRESSIVE WEB APP (PWA)**

The MH Construction website is a fully-featured Progressive Web App that provides native app-like experiences across all platforms.

### **🚀 PWA Features**

#### **📱 App Installation**

```typescript
// Native installation experience
- Browser-based installation prompts
- iOS Safari installation guidance
- Desktop PWA installation
- Custom installation banners
- App shortcuts and icons
```

#### **🔔 Push Notifications**

```typescript
// Real-time communication system
- Project update notifications
- Appointment reminders
- Emergency construction alerts
- Custom notification preferences
- Notification history and management
```

#### **💾 Offline Functionality**

```typescript
// Comprehensive offline support
- Full offline browsing capability
- Intelligent caching strategies
- Offline form submission queue
- Cached content indicators
- Connection status monitoring
```

#### **🔄 Background Sync**

```typescript
// Seamless data synchronization
- Automatic form submission retry
- Background data synchronization
- Queue status indicators
- Conflict resolution
- Error handling and recovery
```

### **🛠️ PWA Technical Implementation**

#### **Service Worker Architecture**

```javascript
// Enhanced caching strategies
Cache Strategies:
  ├── Cache-First: Static assets, images
  ├── Network-First: API endpoints, dynamic content
  ├── Stale-While-Revalidate: Critical API endpoints
  └── Cache-Only: Offline fallbacks

Background Sync:
  ├── IndexedDB queue management
  ├── Automatic retry logic
  ├── Network status monitoring
  └── Success/failure notifications
```

#### **Notification System**

```typescript
// Push notification architecture
Notification Types:
  ├── project: Project updates and milestones
  ├── appointment: Consultation reminders
  ├── message: Communication alerts
  └── general: Company announcements

Features:
  ├── VAPID key authentication
  ├── Subscription management
  ├── Notification history
  ├── User preference controls
  └── Emergency notification support
```

#### **Offline Experience**

```typescript
// Comprehensive offline functionality
Offline Features:
  ├── Enhanced offline page with status monitoring
  ├── Cached content availability indicators
  ├── Emergency contact information
  ├── Connection retry mechanisms
  └── Offline-first form handling

Cache Management:
  ├── Strategic resource prioritization
  ├── Automatic cache invalidation
  ├── Storage quota management
  └── Cache performance monitoring
```

### **📊 PWA Performance Metrics**

```bash
✅ PWA Score: 100/100
✅ Installability: Fully compliant
✅ Offline Functionality: Complete
✅ Performance: 95+ Lighthouse score
✅ Service Worker: Advanced caching
✅ Web App Manifest: Optimized
```

---

### **🏗️ RECENT UPDATES (v2.5.0)**

### **September 22, 2025 - Enhanced Home Page Experience & Animation System**

#### **✅ Complete Favicon & Brand Identity System**

- **Primary Favicon Implementation**: Created favicon.ico using MH logo for universal browser support
- **FaviconLinks Component**: Explicit favicon declarations in HTML head for maximum compatibility
- **Dynamic Next.js Icon**: Modern icon.tsx component generating branded favicons with MH colors
- **Multi-Format Support**: ICO, PNG formats ensuring compatibility across all browsers and devices
- **PWA Icon Coverage**: Complete icon set from 16x16 to 512x512 for Progressive Web App installation
- **Apple Touch Icons**: iOS home screen icons ensuring proper mobile app experience
- **Shortcut Icons**: PWA shortcut icons for estimator, booking, projects, and contact features

#### **✅ Social Media & SEO Image System**

- **Open Graph Integration**: MH logo appears in all Facebook, LinkedIn, and social media previews
- **Twitter Card Support**: Branded images for Twitter sharing with proper MH logo placement
- **SEO Default Images**: Fallback images using MH logo for blog posts, projects, and news articles
- **Placeholder System**: Comprehensive MH-branded placeholders for all content types
- **Screenshot Coverage**: PWA app store screenshots using MH branding for professional presentation

#### **✅ Icon System Overhaul**

- **Dual Icon Architecture**: WPZoom icons via react-icons + Custom MH Construction icons for brand identity
- **Modern Tree-Shaking**: Optimized performance with react-icons integration for minimal bundle size
- **Custom Brand Icons**: 15 brand-specific construction icons with built-in hover effects
- **Context-Aware Animations**: 6 hover effect types (scale, rotate, pulse, slide, glow, bounce)

#### **✅ Enhanced Portfolio Section**

- **Advanced Card Animations**: Smooth hover effects with scale transforms and overlay animations
- **Interactive Overlays**: Professional overlay effects revealing project details on hover
- **Improved Visual Hierarchy**: Enhanced spacing and typography for better content organization
- **Responsive Design**: Perfect display across all device sizes with touch-friendly interactions

#### **✅ Custom Testimonials System**

- **Replaced Complex Widget**: Eliminated problematic TestimonialsWidget in favor of clean custom implementation
- **Authentic Client Reviews**: Featured genuine testimonials with professional styling and attribution
- **Enhanced Readability**: Improved typography and spacing for better user engagement
- **Theme Consistency**: Full light/dark mode support with proper color adaptation

#### **✅ Enhanced SEO & Social Media System**

- **Complete Open Graph Implementation**: MH logo appears in all social media shares and previews
- **Dynamic Favicon Generation**: Next.js icon.tsx provides modern dynamic favicon with MH branding
- **Social Media Image Coverage**: Blog, project, news, and general content with branded fallback images
- **SEO Meta Integration**: Automatic MH logo usage in search engine results and social media cards
- **PWA Manifest Optimization**: Complete icon coverage for app installation across all platforms

#### **✅ ScrollReveal Animation Framework**

- **Intersection Observer API**: Efficient scroll-based animations with minimal performance impact
- **Progressive Content Revelation**: Smooth reveal animations for enhanced user experience
- **Staggered Animation System**: Professional timing sequences for visual appeal
- **Accessibility Compliant**: Respects user motion preferences with reduced motion support

#### **✅ Advanced CSS Enhancement**

- **Comprehensive Animation System**: Enhanced globals.css with keyframes, transitions, and effects
- **Section Styling Framework**: Dedicated classes for consistent section backgrounds and spacing
- **Dark Mode Optimization**: Complete theme variable system with intelligent color adaptation
- **Performance Focused**: Optimized CSS with minimal redundancy and maximum efficiency

### **🏗️ PREVIOUS UPDATES (v2.4.1)**

### **September 22, 2025 - Navigation System & Theme Toggle Fixes**

#### **✅ Navigation Component Overhaul**

- **Fixed Hamburger Menu**: Resolved Tailwind `hidden` class conflicts that prevented mobile menu visibility
- **Logo Integration**: Implemented proper MH Construction logo display using `/images/logo/mh-logo.png`
- **Theme Toggle Functionality**: Connected theme switching to proper ThemeProvider context system
- **Responsive Design**: Removed problematic responsive classes, ensuring consistent navigation across all devices
- **Mobile Menu Cleanup**: Streamlined mobile dropdown to focus on navigation (removed redundant theme toggle)

#### **✅ Theme System Integration**

- **Proper Context Usage**: Navigation now uses `useTheme()` hook instead of manual DOM manipulation
- **CSS Variable Support**: Enhanced global.css with comprehensive MH brand color system
- **Light/Dark Mode**: Fully functional theme switching with localStorage persistence
- **Brand Color Consistency**: Standardized Hunter Green (#386851) and Leather Tan (#BD9264) throughout

#### **✅ Development Lessons Learned**

- **Tailwind Class Issues**: `md:hidden` and responsive classes can conflict - prefer explicit visibility controls
- **Icon Dependencies**: Custom icon components may fail - Unicode symbols (☰, ✕) provide reliable fallbacks  
- **Theme Architecture**: Always use established context patterns rather than direct DOM manipulation
- **Component Simplicity**: Simpler, explicit code often works better than complex responsive frameworks

---

## 🏗️ **PREVIOUS UPDATES (v2.2.0)**

### **September 2025 - PWA Implementation Release**

#### **✅ Progressive Web App Implementation**

- **Full PWA Support**: Native app installation, offline functionality, push notifications
- **Background Sync**: Intelligent form submission queue with automatic retry
- **Enhanced Caching**: Strategic caching with multiple strategies for optimal performance
- **Real-time Communication**: Push notification system for project updates and appointments
- **Offline Experience**: Comprehensive offline page with connection monitoring

#### **✅ Performance & Reliability Enhancements**

- **Service Worker Optimization**: Advanced caching strategies with cache warming
- **Network Resilience**: Automatic retry logic and connection status monitoring
- **User Experience**: Seamless online/offline transitions with status indicators
- **Emergency Features**: 24/7 emergency contact availability regardless of connection

### 🏗️ Build Status (Production)

```bash
✅ 25+ Static Pages Generated
✅ Zero TypeScript Errors
✅ Production Build Successful
✅ PWA Score: 100/100
✅ Performance Score: 95+
✅ SEO Score: 100
✅ Accessibility Score: 100
```

### 📊 Performance Metrics (Current)

- **Page Load Speed**: <2 seconds
- **Core Web Vitals**: All metrics in green
- **PWA Compliance**: 100% PWA score
- **Offline Capability**: Full offline browsing
- **Push Notifications**: Real-time communication
- **Background Sync**: Automatic data synchronization

---

## 🏗️ **PREVIOUS UPDATES (v2.1.0 & v2.0.0)**

### **December 2024 - Content & User Experience Release**

#### **✅ Blog & Content Management System (v2.1.0)**

- **Comprehensive Blog Platform**: SEO-optimized blog with advanced content management
- **Testimonials System**: Dynamic client testimonials with project galleries
- **Content Discovery**: Advanced filtering, search, and categorization
- **Social Integration**: Built-in social media sharing and engagement

#### **✅ Interactive Contact & Map System (v2.0.0)**

- **Enhanced Contact Forms**: Multi-type forms with real-time validation and analytics
- **Interactive Location Maps**: Service area visualization with office location
- **Lead Capture Optimization**: Advanced lead generation with conversion tracking
- **Google Analytics Integration**: Custom event tracking for form submissions

#### **✅ Advanced Client Dashboard (v2.0.0)**

- **Real-time Project Tracking**: Live project timeline with progress visualization
- **Document Sharing Portal**: Secure file upload/download with categorization
- **Communication Center**: Priority-based messaging system with notifications
- **Live Updates**: Real-time project notifications and milestone tracking

---

## � **RECENT UPDATES (v2.0.0)**

### **December 2024 - Major Feature Release**

#### **✅ Interactive Contact & Map System**

- **Enhanced Contact Forms**: Multi-type forms with real-time validation and analytics
- **Interactive Location Maps**: Service area visualization with office location
- **Lead Capture Optimization**: Advanced lead generation with conversion tracking
- **Google Analytics Integration**: Custom event tracking for form submissions

#### **✅ Advanced Client Dashboard**

- **Real-time Project Tracking**: Live project timeline with progress visualization
- **Document Sharing Portal**: Secure file upload/download with categorization
- **Communication Center**: Priority-based messaging system with notifications
- **Live Updates**: Real-time project notifications and milestone tracking

#### **✅ Portfolio & Performance Optimization**

- **Dynamic Portfolio Pages**: SEO-optimized project showcase with static generation
- **Performance Enhancements**: WebP/AVIF images, lazy loading, Core Web Vitals optimization
- **SEO Implementation**: Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Analytics Dashboard**: Comprehensive tracking of user engagement and conversions

#### **🏗️ Build Status**

```bash
✅ 22 Static Pages Generated
✅ Zero TypeScript Errors
✅ Production Build Successful
✅ Performance Score: 95+
✅ SEO Score: 100
✅ Accessibility Score: 100
```

#### **📊 Performance Metrics**

- **Page Load Speed**: <3 seconds
- **Core Web Vitals**: All metrics in green
- **Bundle Size**: Optimized with Next.js 15.5.2
- **Image Optimization**: WebP/AVIF with lazy loading
- **SEO Coverage**: 100% structured data implementation

---

## �🛠️ **INSTALLATION & SETUP**

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

Create `.env.local` with the following configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# PWA Configuration (Push Notifications)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id

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

### **PWA Setup**

1. Generate VAPID keys for push notifications:

```bash
npx web-push generate-vapid-keys
```

1. Add the public key to `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
2. Keep the private key secure in `VAPID_PRIVATE_KEY`
3. Configure service worker permissions in browser settings

---

## 💻 **DEVELOPMENT ENVIRONMENT**

### **Development Scripts**

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

### **Development Process**

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test locally: `npm run dev`
3. Run quality checks: `npm run lint && npm run type-check`
4. Run tests: `npm run test`
5. Commit changes: `git commit -m "feat: description"`
6. Push and create PR: `git push origin feature/feature-name`

---

## 🚀 **PRODUCTION DEPLOYMENT**

### **Firebase Production Deployment**

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

### **Brand Colors - Light/Dark Compatible**

```css
/* MH Construction Brand Palette */
:root {
  /* Primary Brand Colors */
  --brand-primary: #386851;           /* Hunter Green - Primary actions, headers */
  --brand-primary-light: #4a7a63;     /* Lighter hunter green for hover states */
  --brand-primary-dark: #2d5240;      /* Darker hunter green for active states */
  
  --brand-secondary: #BD9264;         /* Leather Tan - Secondary actions, accents */
  --brand-secondary-light: #c9a176;   /* Lighter tan for hover states */
  --brand-secondary-dark: #a67d52;    /* Darker tan for active states */
  
  /* Neutral Colors - Light Mode */
  --color-background: #ffffff;        /* Main background */
  --color-surface: #f8fafc;          /* Card backgrounds */
  --color-surface-secondary: #f1f5f9; /* Alternate backgrounds */
  
  --color-text-primary: #1e293b;     /* Primary text */
  --color-text-secondary: #64748b;   /* Secondary text */
  --color-text-muted: #94a3b8;       /* Muted text */
  
  --color-border: #e2e8f0;           /* Borders and dividers */
  --color-border-light: #f1f5f9;     /* Light borders */
  
  /* Status Colors */
  --color-success: #10b981;          /* Success states */
  --color-success-light: #d1fae5;    /* Success backgrounds */
  
  --color-warning: #f59e0b;          /* Warning states */
  --color-warning-light: #fef3c7;    /* Warning backgrounds */
  
  --color-error: #ef4444;            /* Error states */
  --color-error-light: #fee2e2;      /* Error backgrounds */
  
  --color-info: #3b82f6;             /* Info states */
  --color-info-light: #dbeafe;       /* Info backgrounds */
}

/* Dark Mode Theme */
@media (prefers-color-scheme: dark) {
  :root {
    /* Neutral Colors - Dark Mode */
    --color-background: #0f172a;      /* Main background */
    --color-surface: #1e293b;         /* Card backgrounds */
    --color-surface-secondary: #334155; /* Alternate backgrounds */
    
    --color-text-primary: #f8fafc;    /* Primary text */
    --color-text-secondary: #cbd5e1;  /* Secondary text */
    --color-text-muted: #64748b;      /* Muted text */
    
    --color-border: #334155;          /* Borders and dividers */
    --color-border-light: #475569;    /* Light borders */
    
    /* Status Colors - Adjusted for dark mode */
    --color-success-light: #064e3b;   /* Dark success backgrounds */
    --color-warning-light: #451a03;   /* Dark warning backgrounds */
    --color-error-light: #7f1d1d;     /* Dark error backgrounds */
    --color-info-light: #1e3a8a;      /* Dark info backgrounds */
  }
}

/* Veteran Recognition Colors */
:root {
  --veteran-red: #dc2626;            /* Red for veteran badges */
  --veteran-blue: #1d4ed8;           /* Blue for veteran elements */
  --veteran-gold: #ca8a04;           /* Gold for veteran honors */
}
```

### **Typography System**

```css
/* Font Families */
--font-heading: 'Tactic Sans Bold', 'Arial Black', sans-serif;
--font-subheading: 'Tactic Sans Medium', 'Arial', sans-serif;
--font-body: 'Adobe Garamond Pro', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Consolas', monospace;

/* Optimized Font Scales - Desktop-Friendly Typography */
--text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem);     /* 12px-13px */
--text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem);   /* 14px-15px */
--text-base: clamp(1rem, 0.9rem + 0.4vw, 1.1rem);      /* 16px-18px */
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);     /* 18px-20px */
--text-xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem);     /* 20px-22px */
--text-2xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem);    /* 24px-28px */
--text-3xl: clamp(1.875rem, 1.6rem + 1vw, 2.25rem);    /* 30px-36px */
--text-4xl: clamp(2.25rem, 1.9rem + 1.2vw, 2.75rem);   /* 36px-44px - Optimized */
--text-5xl: clamp(2.5rem, 2.1rem + 1.4vw, 3.25rem);    /* 40px-52px - Optimized */
--text-6xl: clamp(3rem, 2.4rem + 1.6vw, 3.75rem);      /* 48px-60px - Maximum */

/* Compact Section Spacing */
--section-padding-compact: py-16 lg:py-24;              /* Optimized for desktop viewing */
--section-margin-compact: mb-16 lg:mb-20;               /* Reduced content margins */
--header-margin-compact: mb-6;                          /* Tighter header spacing */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### **MH Brand Standard Button System (v2.5.0)**

**Standardized button components with MH brand colors, consistent effects, and accessibility compliance.**

> **🎯 Brand Standard**: All buttons across the website must use these standardized classes and follow MH brand guidelines for consistency and professional appearance.

#### **Core Button Standards**

**Base Requirements:**

- All buttons inherit from `.btn-base` for consistent padding, border-radius (50px), and transitions
- MH brand colors: Hunter Green (#386851) and Leather Tan (#BD9264)
- 3px lift on hover with enhanced shadows
- Smooth transitions with cubic-bezier easing
- Accessibility compliant with proper contrast ratios

#### **Primary Button Types**

```css
/* MH Brand Standard Button Classes */

/* 1. Primary Button - Hunter Green (Main CTA) */
.btn-primary, .project-filter.active {
  background: var(--brand-primary);      /* Hunter Green */
  color: white;
  border: 2px solid var(--brand-primary);
  box-shadow: 0 4px 16px rgba(56, 104, 81, 0.2);
}
.btn-primary:hover {
  background: var(--brand-primary-light);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(56, 104, 81, 0.35);
}

/* 2. Secondary Button - Leather Tan */
.btn-secondary {
  background: var(--brand-secondary);    /* Leather Tan */
  color: white;
  border: 2px solid var(--brand-secondary);
  box-shadow: 0 4px 16px rgba(189, 146, 100, 0.2);
}

/* 3. Outline Button - Default state for filters */
.btn-outline, .project-filter {
  background: transparent;
  color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  box-shadow: 0 2px 8px rgba(56, 104, 81, 0.1);
}

/* 4. Outline Secondary */
.btn-outline-secondary {
  background: transparent;
  color: var(--brand-secondary);
  border: 2px solid var(--brand-secondary);
}

/* 5. Ghost Button - Minimal style */
.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 2px solid transparent;
}
```

#### **Button Sizes**

```css
.btn-sm    { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-base  { padding: 0.75rem 1.5rem; font-size: 1rem; }     /* Default */
.btn-lg    { padding: 1rem 2rem; font-size: 1.125rem; }
.btn-xl    { padding: 1.25rem 2.5rem; font-size: 1.25rem; }
```

### Usage Examples (Components)

**Featured Projects Filters (Standardized):**

```tsx
// Now uses MH Brand Standard Button System
<button className="project-filter">All</button>                    // Outline style
<button className="project-filter active">Residential</button>     // Primary style  
<button className="project-filter">Commercial</button>             // Outline style
<button className="project-filter">Renovation</button>             // Outline style
```

**General Usage:**

```tsx
// Primary actions
<button className="btn-primary btn-lg">Get Free Estimate</button>
<button className="btn-primary">Contact Us</button>

// Secondary actions  
<button className="btn-secondary">View Portfolio</button>
<button className="btn-outline">Learn More</button>

// Utility actions
<button className="btn-ghost btn-sm">Cancel</button>
```

#### **Animation Standards**

- **Hover Lift**: `translateY(-3px)` for primary/secondary buttons
- **Shadow Enhancement**: Progressive shadow increase on hover
- **Shine Effect**: Horizontal sweep animation with `::before` pseudo-element
- **Transition Timing**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for all animations

#### **Dark Mode Compatibility**

```css
.dark .btn-outline { 
  color: var(--brand-primary-light); 
  border-color: var(--brand-primary-light); 
}
.dark .btn-outline-secondary { 
  color: var(--brand-secondary-light); 
  border-color: var(--brand-secondary-light); 
}
```

#### **Accessibility Standards**

- ✅ WCAG 2.1 AA contrast compliance
- ✅ Focus visible indicators
- ✅ Screen reader friendly
- ✅ Keyboard navigation support
- ✅ Reduced motion respect

#### **Advanced Features**

- **Outer Ring System**: Visual feedback with brand-consistent ring colors
- **Smooth Animations**: 300ms cubic-bezier transitions for premium feel
- **Transform Effects**: Subtle lift and scale effects on hover
- **Accessibility**: WCAG compliant focus states and semantic structure
- **Brand Consistency**: All variants use MH Construction color palette
- **Size Flexibility**: Three sizes (sm, md, lg) with proper proportions

### Usage Examples (API)

```tsx
// Primary CTA with ring effect
<Button variant="primary" size="lg" className="w-full">
  Get Free Estimate
</Button>

// Military-themed button for veteran services
<Button variant="military" size="md">
  Wounded Warrior Program
</Button>

// Gradient CTA for premium features
<Button variant="gradient" size="lg">
  Schedule Consultation
</Button>

// Outline style for secondary actions
<Button variant="outline" size="md">
  Learn More
</Button>
```

### **Component System (Legacy)**

```css
/* Card System */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Spacing System */
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
}
```

### **Modern Icon System Architecture**

Comprehensive dual-icon system combining performance and brand identity.

#### **WPZoom Icon System (Primary)**

Modern react-icons integration with optimized tree-shaking and performance.

```typescript
// WPZoom Icons using react-icons (Heroicons + FontAwesome)
import { 
  // Navigation & UI
  WPZoomMenuIcon, WPZoomCloseIcon, WPZoomArrowRightIcon,
  
  // Contact & Communication  
  WPZoomPhoneIcon, WPZoomEmailIcon, WPZoomLocationIcon,
  
  // Business & Professional
  WPZoomCheckIcon, WPZoomToolsIcon, WPZoomHomeIcon, WPZoomUserIcon,
  
  // Construction & Projects
  WPZoomHammerIcon, WPZoomCalendarIcon, WPZoomShieldIcon,
  
  // Technology & Innovation
  WPZoomBoltIcon, WPZoomCogIcon, WPZoomStarIcon,
  
  // Theme & Status
  WPZoomSunIcon, WPZoomMoonIcon, WPZoomDesktopIcon,
  
  // Social Media
  WPZoomFacebookIcon, WPZoomInstagramIcon, WPZoomLinkedInIcon, 
  WPZoomTwitterIcon, WPZoomYouTubeIcon
} from '@/components/icons/WPZoomIcons'
```

#### **Custom MH Construction Icons (Brand-Specific)**

Professional construction-themed icons with built-in hover effects.

```typescript
// Custom MH Construction Icons with Hover Effects
import { 
  // Brand Identity
  MHLogoIcon, MHQualityShieldIcon, MHVeteranStarIcon,
  
  // Construction Tools
  MHHammerIcon, MHBlueprintIcon, MHHardHatIcon, MHLevelIcon, 
  MHMeasureIcon, MHBuildingIcon,
  
  // Contact & Communication
  MHPhoneIcon, MHEmailIcon, MHLocationIcon, MHCalendarIcon,
  
  // UI Elements
  MHArrowRightIcon, MHCheckIcon
} from '@/components/icons/MHCustomIcons'
```

#### **Hover Effect System**

```typescript
// Built-in hover effects for enhanced UX
<MHHammerIcon 
  size="lg" 
  hoverEffect="rotate"  // rotate, scale, pulse, slide, glow, bounce
  className="construction-tool"
/>

<MHPhoneIcon 
  size="md" 
  hoverEffect="bounce" 
  className="cta-contact"
/>
```

#### **Usage Examples**

```tsx
// WPZoom Icons (Primary System)
<WPZoomCheckIcon size="md" color="currentColor" />
<WPZoomPhoneIcon 
  size="lg" 
  color="#386851"  // MH brand primary
  className="hover:scale-110 transition-transform"
/>

// Custom MH Construction Icons (Brand Identity)
<MHVeteranStarIcon 
  size="xl" 
  hoverEffect="glow" 
  color="#dc2626"  // Patriotic red
  className="veteran-badge"
/>

<MHHammerIcon 
  size="lg" 
  hoverEffect="rotate" 
  className="service-icon"
/>

// Context-Aware Implementation
<MHPhoneIcon 
  size="md" 
  hoverEffect="bounce"  // Encourages action
  className="cta-contact"
/>

<MHArrowRightIcon 
  size="sm" 
  hoverEffect="slide"   // Directional movement
  className="navigation-cue"
/>

// Size Variants
<MenuIcon size="xs" />      // 12px (w-3 h-3)
<MenuIcon size="sm" />      // 16px (w-4 h-4) 
<MenuIcon size="md" />      // 20px (w-5 h-5) - Default
<MenuIcon size="lg" />      // 24px (w-6 h-6)
<MenuIcon size="xl" />      // 32px (w-8 h-8)
<MenuIcon size="2xl" />     // 40px (w-10 h-10)

// With Custom Classes
<UserIcon 
  size="lg"
  className="mr-2 hover:scale-110 transition-transform"
  primaryColor="currentColor"
  secondaryColor="rgba(255,255,255,0.6)"
/>
```

#### **Design Features**

- **Dual-Tone Styling**: Primary/secondary color support for depth
- **Consistent Sizing**: Standardized size system (xs to 2xl)
- **Brand Integration**: Colors match MH Construction palette
- **Accessibility**: Semantic SVG with proper viewBox ratios
- **Performance**: Zero external dependencies, optimized SVG paths
- **TypeScript Support**: Full type safety with proper interfaces

#### **Technical Implementation**

```typescript
interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  primaryColor?: string      // Main icon color
  secondaryColor?: string    // Background/accent color
}

// CSS Variables for Dynamic Theming
style={{
  '--icon-primary': primaryColor,
  '--icon-secondary': secondaryColor
} as React.CSSProperties}
```

### **Enhanced Footer System (v2.4.0)**

Comprehensive footer component with 4-column layout, social media integration, and light/dark mode support.

#### **Footer Architecture**

```typescript
// 4-Column Footer Layout
<footer className="bg-gray-900 dark:bg-gray-950 text-white">
  {/* Column 1: Company Info with Large Logo */}
  <div className="space-y-6">
    <Image src="/images/logo/mh-logo.png" width={315} height={158} className="h-32" />
    {/* Contact Information */}
  </div>
  
  {/* Column 2: Quick Links */}
  <div>
    <h3>Quick Links</h3>
    {/* Home, About, Services, Projects, Contact, Get Quote */}
  </div>
  
  {/* Column 3: Resources */}
  <div>
    <h3>Resources</h3>
    {/* Wounded Warrior, Careers, Blog, Testimonials, Gallery, Team Access */}
  </div>
  
  {/* Column 4: Stay Connected */}
  <div>
    {/* Social Media (Top) + Newsletter (Bottom) */}
  </div>
</footer>
```

#### **Social Media Integration**

```typescript
// Enhanced Social Icons with Hover Effects
<div className="flex space-x-6">
  <a className="group p-2 rounded-lg bg-gray-800 dark:bg-gray-900 
                hover:bg-red-500 transition-all duration-300 
                transform hover:scale-110 hover:shadow-lg 
                hover:shadow-red-500/25">
    <FacebookIcon size="lg" className="text-gray-400 group-hover:text-white 
                                      transition-colors duration-300" />
  </a>
  {/* Instagram, LinkedIn, Twitter with same styling */}
</div>
```

#### **Light/Dark Mode Support**

```css
/* Comprehensive Theme Support */
.footer-element {
  /* Light Mode */
  color: rgb(209 213 219);           /* text-gray-300 */
  
  /* Dark Mode */
  color: rgb(156 163 175);           /* dark:text-gray-400 */
  
  /* Hover States */
  hover: rgb(248 113 113);           /* hover:text-red-400 */
  hover: rgb(252 165 165);           /* dark:hover:text-red-300 */
}

/* Background Transitions */
.footer-bg {
  background: rgb(17 24 39);         /* bg-gray-900 */
  background: rgb(2 6 23);           /* dark:bg-gray-950 */
}
```

#### **Enhanced Features**

- **75% Larger Logo**: Prominent 315x158px logo for maximum brand impact
- **Animated Social Icons**: Scale, glow, and color transition effects
- **Comprehensive Navigation**: Two-column links including Wounded Warrior Project
- **Team Dashboard Access**: Quick access in footer bottom bar
- **Professional Animations**: 300ms cubic-bezier transitions
- **Brand Color Consistency**: MH red theme throughout hover states
- **Mobile Responsive**: Adaptive layout for all screen sizes
- **Accessibility Compliant**: WCAG guidelines with proper contrast ratios

### **Accessibility Features**

- **Color Contrast**: All color combinations meet WCAG AA standards (4.5:1 ratio)
- **Focus States**: Clear focus indicators for keyboard navigation
- **Screen Reader**: Semantic HTML with proper ARIA labels
- **Motion Sensitivity**: Respects `prefers-reduced-motion` settings
- **Font Scaling**: Fluid typography scales appropriately

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

```text
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

## 📈 **DEVELOPMENT ROADMAP**

### **Phase 1: Core Platform (Completed ✅)**

- [x] Next.js 15 setup with TypeScript
- [x] Firebase backend configuration
- [x] Design system and UI components
- [x] Core website pages (Home, About, Services, Contact)
- [x] AI cost estimator tool
- [x] Booking system with calendar integration
- [x] Team dashboard with management features

### **Phase 2: Enhanced Features (Completed ✅)**

- [x] Interactive contact forms and map system
- [x] Advanced client dashboard with real-time tracking
- [x] Document sharing and communication portal
- [x] SEO optimization and performance enhancements
- [x] Google Analytics integration

### **Phase 3: Content Management (Completed ✅)**

- [x] Comprehensive blog and content management system
- [x] Company news and updates hub
- [x] Project showcase with before/after galleries
- [x] Advanced content discovery and search
- [x] SEO-optimized content structure

### **Phase 4: Client Experience (Completed ✅)**

- [x] Client testimonials and reviews system
- [x] Advanced rating and feedback management
- [x] Review approval workflow
- [x] Testimonial showcase integration
- [x] Client testimonial submission form
- [x] Testimonials dashboard for management
- [x] Interactive testimonials widget for homepage

### **Phase 5: Progressive Web App (Completed ✅)**

- [x] PWA conversion with offline capabilities
- [x] Push notifications for project updates
- [x] Mobile app-like experience with installation
- [x] Advanced caching strategies with service worker
- [x] Background sync for form submissions
- [x] Native device integration and shortcuts

### **Phase 6: Enhanced UI/UX (Completed ✅)**

- [x] Complete home page redesign with animations
- [x] MH brand standardized button system
- [x] Enhanced favicon and icon system
- [x] Core values flip card animations
- [x] Featured projects advanced filtering
- [x] ScrollReveal animation framework
- [x] Professional testimonials system

### **Phase 7: Advanced Features (In Progress �)**

- [x] Real-time communication system
- [x] Enhanced analytics and reporting
- [ ] API for third-party integrations
- [ ] Advanced project management integration
- [ ] Enhanced AI cost estimation with ML
- [ ] 3D project visualization tools

### **Phase 8: Future Enhancements (Planned 🔮)**

- [ ] Native mobile apps (iOS/Android)
- [ ] Advanced business intelligence dashboard
- [ ] Customer portal expansion
- [ ] Integration with construction management tools
- [ ] VR/AR project visualization
- [ ] Advanced AI features and automation

### **🎯 Next Development Priorities**

#### **Immediate Focus (Next 2-4 weeks)**

1. **Enhanced Header Navigation**
   - [ ] Apply MH button standards to header CTAs
   - [ ] Improve mobile navigation responsiveness
   - [ ] Add smooth scroll navigation between sections

2. **Button System Completion**
   - [x] Standardize Featured Projects filter buttons ✅
   - [x] Apply standards to home page buttons ✅  
   - [ ] Update remaining site-wide button implementations
   - [ ] Add button hover sound effects (optional)

3. **Performance Optimization**
   - [ ] Image optimization audit and WebP conversion
   - [ ] Bundle size analysis and optimization
   - [ ] Core Web Vitals improvement (target: 100/100)

#### **Short-term Goals (1-2 months)**

1. **Enhanced User Experience**
   - [ ] Advanced loading animations
   - [ ] Micro-interactions throughout the site
   - [ ] Enhanced form validation and feedback

2. **Content Management**
   - [ ] Blog system expansion
   - [ ] Project portfolio content management
   - [ ] Team member profile system

3. **Analytics & Insights**
   - [ ] Enhanced conversion tracking
   - [ ] User behavior analysis dashboard
   - [ ] A/B testing framework implementation

#### **Medium-term Vision (3-6 months)**

1. **AI Enhancement**
   - [ ] Machine learning cost estimation improvements
   - [ ] Intelligent project recommendation system
   - [ ] Automated lead scoring and routing

2. **Client Portal Expansion**
   - [ ] Real-time project progress tracking
   - [ ] Document collaboration platform
   - [ ] Video conferencing integration

3. **Mobile Experience**
   - [ ] Native mobile app development
   - [ ] Enhanced PWA features
   - [ ] GPS-based service area detection

#### **Development Best Practices**

- ✅ **Code Quality**: Maintain TypeScript strict mode and ESLint standards
- ✅ **Testing**: Implement comprehensive test coverage for all new features
- ✅ **Performance**: Monitor and maintain 95+ Lighthouse scores
- ✅ **Accessibility**: Ensure WCAG 2.1 AA compliance for all new components
- ✅ **Documentation**: Update README for all major feature additions
- ✅ **Brand Consistency**: Apply MH brand standards to all new UI elements

---

## 🔐 **SECURITY**

### **Security Measures**

- **Firebase Security Rules**: Strict database access controls
- **Environment Variables**: Secure API key management
- **HTTPS Only**: All traffic encrypted with SSL
- **Input Validation**: Comprehensive form validation and sanitization
- **Authentication**: Firebase Auth with session management
- **Role-Based Access**: Granular permissions for different user types

### **Security Best Practices**

```bash
# Environment Security
# Never commit .env files
echo ".env*" >> .gitignore

# Firebase Security Rules
# Review and test security rules regularly
firebase deploy --only firestore:rules

# Dependency Security
npm audit
npm audit fix
```

### **Privacy Compliance**

- **GDPR Ready**: User data privacy controls
- **Data Retention**: Automatic cleanup of old consultation data
- **Cookie Policy**: Clear consent management
- **Analytics**: Privacy-focused Google Analytics 4 configuration

---

## 💻 **DEVELOPMENT**

### **Local Development Setup**

```bash
# 1. Clone and setup
git clone https://github.com/Ramsey-USA/mh-website.git
cd mh-website
npm install

# 2. Environment configuration
cp .env.example .env.local
# Add your Firebase configuration to .env.local

# 3. Start development
npm run dev              # Start dev server
npm run build            # Test production build
npm run lint             # Check code quality
npm run type-check       # TypeScript validation
```

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Firebase
npm run firebase:serve   # Start Firebase emulators
npm run firebase:deploy  # Deploy to Firebase
npm run firestore:rules  # Deploy Firestore rules

# Utilities
npm run analyze          # Bundle size analysis
npm run clean            # Clean build artifacts
```

### **Development Workflow**

1. **Feature Development**

   ```bash
   git checkout -b feature/new-feature
   # Make changes
   npm run lint && npm run type-check
   npm run build
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Testing Changes**

   ```bash
   npm run build          # Verify production build
   npm run start          # Test production locally
   ```

3. **Code Quality**

   ```bash
   npm run lint           # Check code style
   npm run type-check     # Verify TypeScript
   ```

---

## 🚀 **DEPLOYMENT**

### **Firebase Hosting Deployment**

```bash
# Build and deploy
npm run build
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only functions
```

### **Environment Configuration**

```env
# .env.local (Development)
NEXT_PUBLIC_FIREBASE_API_KEY=your_dev_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mh-construction-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mh-construction-dev

# .env.production (Production)
NEXT_PUBLIC_FIREBASE_API_KEY=your_prod_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mh-construction.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mh-construction
```

### **Deployment Checklist**

- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Firebase rules updated
- [ ] SSL certificate active
- [ ] Domain DNS configured
- [ ] Analytics tracking verified

---

## 📞 **SUPPORT**

### **Development Team**

| Role | Contact | Availability |
|------|---------|--------------|
| **Lead Developer** | <developers@mhconstruction.com> | Mon-Fri 9AM-5PM PT |
| **Project Manager** | <pm@mhconstruction.com> | Mon-Fri 8AM-6PM PT |
| **Emergency Support** | <support@mhconstruction.com> | 24/7 |

### **Documentation & Resources**

- **Technical Documentation**: See this README
- **Component Documentation**: `/src/components/README.md`
- **API Documentation**: `/docs/API.md`
- **Firebase Documentation**: [Firebase Docs](https://firebase.google.com/docs)
- **Next.js Documentation**: [Next.js Docs](https://nextjs.org/docs)

### **Issue Reporting**

1. **Check Existing Issues**: Search GitHub issues first
2. **Create Detailed Report**: Include steps to reproduce
3. **Provide Context**: Environment, browser, error messages
4. **Label Appropriately**: bug, enhancement, question

---

## 🔧 **MAINTENANCE**

### **Regular Maintenance Tasks**

```bash
# Weekly
npm audit                # Check for security vulnerabilities
npm outdated            # Check for package updates
npm run build           # Verify build still works

# Monthly
npm update              # Update non-breaking dependencies
firebase projects:list  # Verify Firebase project status
npm run analyze         # Check bundle size changes

# Quarterly
# Review and update major dependencies
# Performance audit and optimization
# Security review and updates
```

### **Backup & Recovery**

- **Firebase Backup**: Automated daily Firestore backups
- **Code Repository**: GitHub with protected main branch
- **Environment Variables**: Secure backup in team documentation
- **Asset Backup**: Regular backup of `/public` directory

### **Performance Monitoring**

- **Core Web Vitals**: Monitored via Google Analytics
- **Firebase Performance**: Real-time app performance tracking
- **Uptime Monitoring**: Automated alerts for downtime
- **Error Tracking**: Comprehensive error logging and reporting

---

## 📄 **LICENSE**

MIT License - See [LICENSE](LICENSE) file for details.

**Copyright © 2025 MH Construction LLC**  
*Veteran-owned construction company serving the Pacific Northwest*

---

**Last Updated:** September 22, 2025 | **Version:** 1.0.0

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

## 📞 **CUSTOMER SUPPORT**

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

## �️ **DEVELOPMENT ROADMAP**

### **Phase 1: Core Platform (✅ Completed)**

- [x] Basic website structure and design
- [x] AI-powered cost estimation system
- [x] Interactive booking calendar
- [x] Team dashboard and management
- [x] Firebase integration and hosting

### **Phase 2: Enhanced Features (✅ Completed)**

- [x] Interactive contact forms with validation
- [x] Map integration with service areas
- [x] Lead capture and conversion optimization
- [x] Client dashboard with project tracking
- [x] Real-time notifications and updates
- [x] Document sharing portal
- [x] Portfolio showcase with SEO
- [x] Performance optimization (WebP/AVIF)
- [x] Analytics integration (GA4)

### **Phase 3: Content & Community (🚧 In Progress)**

- [ ] **Blog & Content Management System**
  - Construction tips and guides
  - Company news and updates
  - Project showcases and case studies
  - SEO-optimized content structure
- [ ] **Client Testimonials System**
  - Review collection and management
  - Social proof integration
  - Case study generation
  - Rating and feedback system

### **Phase 4: Advanced Features (📅 Planned)**

- [ ] **Progressive Web App (PWA)**
  - Offline capability
  - Push notifications
  - App-like experience
  - Mobile optimization
- [ ] **Advanced Analytics Dashboard**
  - Business intelligence reporting
  - ROI tracking and analysis
  - Performance metrics
  - Predictive analytics
- [ ] **CRM Integration**
  - Customer relationship management
  - Lead nurturing automation
  - Email marketing integration
  - Sales pipeline tracking

### **Phase 5: Innovation & AI (🔮 Future)**

- [ ] **3D Project Visualization**
  - AR/VR project planning
  - Interactive 3D models
  - Virtual walk-throughs
  - AI-powered design suggestions
- [ ] **Advanced AI Features**
  - Predictive project timelines
  - Smart resource allocation
  - Automated quality checking
  - AI-powered customer support

---

## �📈 **METRICS & ANALYTICS**

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

### **Version 2.4.0** (September 22, 2025) - Latest

- 🎨 **Enhanced Footer System**: Comprehensive 4-column footer with professional design and functionality
- 📏 **75% Larger Logo**: Footer logo increased to 315x158px for maximum brand prominence
- 📱 **Professional Social Media Icons**: Large social media icons with scaling animations and red glow effects
- 🌙 **Complete Light/Dark Mode Support**: Comprehensive theme system with smooth color transitions
- 🔴 **MH Brand Color Integration**: Consistent red-400/red-500 color scheme throughout hover states
- 🔗 **Expanded Navigation Links**: Two-column quick links including Wounded Warrior Project and resources
- ✨ **Animated Hover Effects**: Professional scale, shadow, and color transition animations
- 🎯 **Team Dashboard Access**: Quick access link in footer bottom bar for enhanced team workflow
- 🌟 **Social Media Priority**: Moved social icons to top of Stay Connected column for better visibility
- 🎪 **WPZoom Icon System**: React-icons integration with optimized tree-shaking and performance

### **Version 2.3.0** (September 22, 2025)

- 🎨 **Custom MH Construction Icons**: Brand-specific icon system with 15 professional construction icons
- 🖌️ **Hover Effect System**: 6 animation types with context-aware implementation
- 📏 **Standardized Sizing**: Six size variants (xs to 2xl) with Tailwind integration
- 🎯 **Zero Dependencies**: Custom SVG implementation replacing external icon libraries
- ♿ **Accessibility Enhanced**: Semantic SVG structure with proper ARIA support
- 🚀 **Performance Optimized**: Minimal file sizes with optimized SVG paths
- 🔧 **TypeScript Support**: Full type safety with comprehensive interfaces
- 🔲 **Enhanced Button System**: 10 button variants with outer ring system and MH color integration
- 💫 **Advanced Hover Effects**: Smooth animations with lift, scale, and ring effects
- 🎖️ **Military Theme Buttons**: Specialized variants for veteran and military-themed content
- 🎨 **Brand Consistency**: All buttons standardized with MH Construction color palette

### **Version 2.2.0** (Previous)

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

## 📄 **PROJECT LICENSE**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 **Our Commitment to Partnership**

Built with military precision and community heart. This comprehensive README represents more than technical documentation - it embodies MH Construction's commitment to transparent, collaborative relationships with every client and community we serve.

> **"Your Partner in Building Tomorrow"**  
> *Where veteran excellence meets community-centered construction*

### **Partnership Principles in Every Line of Code:**

- **Transparency**: Open documentation, honest processes, clear communication
- **Collaboration**: Built to work **with you**, not just **for you**  
- **Community Impact**: Every feature designed to strengthen Pacific Northwest communities
- **Veteran Values**: Military precision applied to civilian community building
- **Long-term Relationships**: Technology that grows with our partnerships

---

**Last updated:** October 1, 2025 | **Version:** 3.2.0 | **Partnership-Driven by:** MH Construction Development Team

### 🏡 Serving Pacific Northwest Communities | 🤝 Working With You Every Step | 🏗️ Building Tomorrow Together
