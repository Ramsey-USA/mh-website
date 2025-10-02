# MH Construction - Documentation Index

> Quick navigation to all design, layout, and technical documentation

---

## 🎨 Design & Layout

### **Page Layout Standards** ⭐ START HERE

- **[PAGE_LAYOUT_QUICK_START.md](./technical/PAGE_LAYOUT_QUICK_START.md)** - Copy-paste templates for new pages
- **[PAGE_LAYOUT_STANDARDS.md](./technical/PAGE_LAYOUT_STANDARDS.md)** - Complete spacing, padding, typography reference
- **[RESPONSIVE_TESTING_GUIDE.md](./technical/RESPONSIVE_TESTING_GUIDE.md)** - Multi-device testing & responsive design

### **Design System**

- **[DESIGN_SYSTEM.md](./technical/DESIGN_SYSTEM.md)** - Brand colors, typography, component standards
- **[MH-BRANDING.md](./business/MH-BRANDING.md)** - Brand guidelines and messaging

### **Icon System**

- **[ICON-SYSTEM-QUICK-REFERENCE.md](./technical/ICON-SYSTEM-QUICK-REFERENCE.md)** - Icon usage guide
- **[ICON_HOVER_EFFECTS_GUIDE.md](./ICON_HOVER_EFFECTS_GUIDE.md)** - Interactive icon effects

---

## 💼 Business & Content

- **[SERVICES.md](./business/SERVICES.md)** - Service offerings
- **[CORE_VALUES.md](./business/CORE_VALUES.md)** - Company values
- **[TEAM_ROSTER.md](./business/TEAM_ROSTER.md)** - Team information
- **[MH_PARTNERSHIP_MESSAGING_GUIDE.md](./MH_PARTNERSHIP_MESSAGING_GUIDE.md)** - Partnership messaging

---

## 🛠️ Technical

### **Architecture & Features**

- **[ARCHITECTURE.md](./project/ARCHITECTURE.md)** - System architecture
- **[FEATURES.md](./technical/FEATURES.md)** - Feature documentation
- **[COMPANY_PROFILE.md](./project/COMPANY_PROFILE.md)** - Company profile

### **Development**

- **[SETUP_GUIDE.md](./development/SETUP_GUIDE.md)** - Development setup
- **[FIREBASE_SETUP.md](./development/FIREBASE_SETUP.md)** - Firebase configuration
- **[VSCODE_EXTENSIONS_GUIDE.md](./development/VSCODE_EXTENSIONS_GUIDE.md)** - VS Code extensions for optimization ⭐ NEW

---

## 📦 Recent Changes

### October 2, 2025

- ✅ **[PAGE_LAYOUT_STANDARDS_SUMMARY.md](./project/archive/PAGE_LAYOUT_STANDARDS_SUMMARY.md)** - Layout standards extraction
- ✅ **[SERVICE-CARDS-LAYOUT-FIX.md](./project/archive/SERVICE-CARDS-LAYOUT-FIX.md)** - Bottom-aligned CTAs

### Previous Updates

- **[ICON-SPACE-MAXIMIZATION-SUMMARY.md](./project/archive/ICON-SPACE-MAXIMIZATION-SUMMARY.md)** - Icon sizing optimization
- **[CORE-VALUES-UPDATE-SUMMARY.md](./project/archive/CORE-VALUES-UPDATE-SUMMARY.md)** - Core values refresh
- **[SOCIAL-MEDIA-UPDATE-SUMMARY.md](./project/archive/SOCIAL-MEDIA-UPDATE-SUMMARY.md)** - Social media updates

---

## 🚀 Quick Start Guides

### Building a New Page?

1. Read: [PAGE_LAYOUT_QUICK_START.md](./technical/PAGE_LAYOUT_QUICK_START.md)
2. Copy section template
3. Copy card template
4. Customize content
5. Verify against checklist in [PAGE_LAYOUT_STANDARDS.md](./technical/PAGE_LAYOUT_STANDARDS.md)

### Adding Icons?

1. Check: [ICON-SYSTEM-QUICK-REFERENCE.md](./technical/ICON-SYSTEM-QUICK-REFERENCE.md)
2. Use standard sizes: `xl`, `2xl`, `3xl`
3. Follow container patterns from layout standards

### Need Design Colors?

1. Check: [DESIGN_SYSTEM.md](./technical/DESIGN_SYSTEM.md) - Color section
2. Brand colors: Hunter Green (#386851), Leather Tan (#BD9264)
3. Always include dark mode: `dark:bg-gray-900`

---

## 📁 Documentation Structure

docs/
├── README.md (this file)           ⭐ Start here
├── technical/
│   ├── PAGE_LAYOUT_QUICK_START.md  ⭐ Copy-paste templates
│   ├── PAGE_LAYOUT_STANDARDS.md    ⭐ Complete reference
│   ├── DESIGN_SYSTEM.md            ⭐ Brand & components
│   ├── ICON-SYSTEM-QUICK-REFERENCE.md
│   ├── FEATURES.md
│   └── ARCHITECTURE.md (via project/)
├── business/
│   ├── SERVICES.md
│   ├── CORE_VALUES.md
│   ├── TEAM_ROSTER.md
│   └── MH-BRANDING.md
├── development/
│   ├── SETUP_GUIDE.md
│   └── FIREBASE_SETUP.md
└── project/
    ├── ARCHITECTURE.md
    ├── COMPANY_PROFILE.md
    ├── IMPLEMENTATION_SUMMARY.md
    └── archive/
        ├── PAGE_LAYOUT_STANDARDS_SUMMARY.md
        ├── SERVICE-CARDS-LAYOUT-FIX.md
        └── [other summaries]

---

## 🎯 Common Tasks

| Task | Documentation |
|------|---------------|
| Create new page | [PAGE_LAYOUT_QUICK_START.md](./technical/PAGE_LAYOUT_QUICK_START.md) |
| Style components | [DESIGN_SYSTEM.md](./technical/DESIGN_SYSTEM.md) |
| Add icons | [ICON-SYSTEM-QUICK-REFERENCE.md](./technical/ICON-SYSTEM-QUICK-REFERENCE.md) |
| Update branding | [MH-BRANDING.md](./business/MH-BRANDING.md) |
| Setup development | [SETUP_GUIDE.md](./development/SETUP_GUIDE.md) |
| Review architecture | [ARCHITECTURE.md](./project/ARCHITECTURE.md) |

---

## 🔗 External Resources

- **Home Page Source:** `src/app/page.tsx` - Live examples of all standards
- **Component Library:** `src/components/` - Reusable components
- **Tailwind Config:** `tailwind.config.ts` - Theme configuration

---

## 📝 Contributing

When adding new documentation:

1. Follow existing markdown format
2. Add to appropriate section in this index
3. Link from related documents
4. Update "Recent Changes" section if major update
5. Keep summaries in `project/archive/`

---

**Last Updated:** October 2, 2025  
**Maintained by:** MH Construction Development Team
