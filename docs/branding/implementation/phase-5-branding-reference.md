# Phase 5 Interactive Enhancements - Branding Reference

**Created:** November 8, 2025  
**Purpose:** Quick reference for Phase 5 component development  
**Status:** ✅ Active Reference

---

## 🎨 Brand Colors (from color-system.md)

### Primary Brand Colors

| Color                  | Hex       | Usage                                               | Example                 |
| ---------------------- | --------- | --------------------------------------------------- | ----------------------- |
| **Hunter Green**       | `#386851` | Primary buttons, main CTAs, IRL consultations       | "Schedule Consultation" |
| **Leather Tan**        | `#BD9264` | Secondary buttons, AI Estimator, trade partnerships | "Get AI Estimate"       |
| **Hunter Green Light** | `#4a7a63` | Hover states, lighter accents                       | Button hover            |
| **Hunter Green Dark**  | `#2d5240` | Active states, pressed buttons                      | Button active           |

### Phase 5 Component Color Associations

| Component                 | Primary Color                                | Use Case                        |
| ------------------------- | -------------------------------------------- | ------------------------------- |
| **ActivityFeed**          | Hunter Green + Leather Tan + Purple + Blue   | Color-coded by activity type    |
| **FormProgress**          | Hunter Green                                 | Progress bars, active steps     |
| **ProjectCostCalculator** | Hunter Green (CTAs), Leather Tan (secondary) | Calculator primary actions      |
| **InteractiveTimeline**   | Hunter Green                                 | Timeline progression indicators |
| **Team Member Tags**      | Hunter Green                                 | Link to team page               |

### Semantic Activity Colors (ActivityFeed)

```tsx
// Booking activities
(bg - blue - 50, border - blue - 200, text - blue - 600);

// Estimate requests
(bg - green - 50, border - green - 200, text - green - 600);

// Consultations
(bg - purple - 50, border - purple - 200, text - purple - 600);

// Project starts
(bg - brand - primary / 10,
  border - brand - primary / 30,
  text - brand - primary);
```

---

## 🎯 Material Icons Only (NO EMOJIS)

**From icon-policy.md:**

- ✅ Use Material Icons exclusively
- ❌ NO emojis in production code
- Standard sizes: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Phase 5 Icon Usage

| Component                 | Icon                                                | Size       | Purpose                  |
| ------------------------- | --------------------------------------------------- | ---------- | ------------------------ |
| **ActivityFeed**          | `event`, `description`, `handshake`, `construction` | `md`       | Activity type indicators |
| **FormProgress**          | `check_circle`, `radio_button_unchecked`            | `sm`       | Step completion status   |
| **ProjectCostCalculator** | `construction`, `calculate`, `chat`                 | `md`, `lg` | Project types, actions   |
| **InteractiveTimeline**   | `construction`, `design_services`, etc.             | `md`       | Phase indicators         |

---

## 📐 Component Standards (from component-standards.md)

### Card Grid Layouts

**Prefer 3-4 columns on large screens:**

```tsx
// 6 cards: Use 3-wide layout
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3

// 4 cards: Use 2-wide then 4-wide
grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4

// Spacing
gap-6 lg:gap-8
```

### Button Pattern

```tsx
<Button
  variant="primary|secondary|outline|neutral"
  size="sm|default|lg|xl"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2 group-hover:scale-110" />
  Button Text
</Button>
```

### Touch Accessibility

- **Minimum Height:** 44px (WCAG compliant)
- **Touch Class:** `touch-manipulation` on all interactive elements
- **Tap Feedback:** Visual feedback on touch interactions

### Standard Transitions

- **Duration:** `duration-300` (consistent across all components)
- **Easing:** `ease-out` for natural feel
- **Hover Effects:** `hover:scale-105`, `hover:shadow-2xl`
- **Focus States:** `focus:ring-2 focus:ring-brand-primary`

---

## 💬 Messaging Standards (from messaging.md)

### Core Voice Attributes

- **Professional yet Approachable**
- **Confident without being arrogant**
- **Expert while remaining accessible**
- **Partnership-Focused**

### Primary Slogans

1. **"Building for the Client, NOT the Dollar"** - Foundation message
2. **"THE ROI IS THE RELATIONSHIP"** - Partnership emphasis
3. **"Let's Build More than Just Structures"** - CTA slogan

### Key Message Pillars

1. **Partnership-Focused**: "We work WITH you, not FOR you"
2. **Military Precision**: "Veteran-owned excellence where every detail matters"
3. **Regional Expertise**: "Deep Pacific Northwest knowledge"
4. **Transparent Communication**: "Open communication, honest progress"

---

## 🔧 Phase 5 Component-Specific Guidelines

### ActivityFeed

**Color Strategy:**

- Blue = Bookings
- Green = Estimates
- Purple = Consultations
- Brand Primary = Project Starts

**Messaging:**

- Use real Tri-Cities locations (Kennewick, Pasco, Richland, Walla Walla, Yakima)
- Project types align with services (Commercial, Medical, Retail, etc.)
- Time-based social proof ("2 minutes ago", "Just now")

**Chatbot Integration:**

- Pass full activity context to GlobalChatbot
- User intent: "Tell me more about [project type] in [location]"
- Enables seamless conversion from social proof to consultation

### ProjectCostCalculator

**Button Colors:**

- Primary CTA: Hunter Green (`variant="primary"`)
- "Ask General MH" chatbot button: Hunter Green with chat icon
- Secondary actions: Outline variant

**Veteran Discount:**

- 10% discount badge in Leather Tan
- Military appreciation messaging
- Always show when `showVeteranDiscount={true}`

**Quality Levels:**

- Standard, Premium, Luxury (avoid "low-end" language)
- Use professional terminology
- Cost multipliers: 1.0x, 1.3x, 1.6x

### InteractiveTimeline

**Phase Colors:**

- Active phase: Hunter Green
- Completed phases: Hunter Green (lighter)
- Future phases: Gray
- Progress bars: Hunter Green gradient

**Project Types:**

- Commercial Building
- Custom Home
- Addition/Expansion
- Remodel/Renovation
- Outdoor/Landscaping

**Phases (8 standard):**

1. Consultation & Planning
2. Design & Engineering
3. Permits & Approvals
4. Site Preparation
5. Construction
6. Finishes & Details
7. Inspection & Testing
8. Completion & Handoff

### FormProgress

**Save/Resume Messaging:**

- "Your progress is automatically saved"
- Time-based expiration notices (24hr vs 7-day)
- "Would you like to resume?" confirmation dialogs
- Clear data privacy statements

**Progress Indicators:**

- Current step: Hunter Green filled
- Completed steps: Hunter Green with checkmark
- Future steps: Gray outline
- Progress bar: Hunter Green gradient

---

## ✅ Quality Checklist for Phase 5 Components

- [ ] Uses Hunter Green (`#386851`) and Leather Tan (`#BD9264`) only
- [ ] Material Icons throughout (NO emojis)
- [ ] 44px minimum touch target height
- [ ] `duration-300` transitions consistently applied
- [ ] Dark mode support with proper color variants
- [ ] Proper ARIA labels and accessibility attributes
- [ ] Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- [ ] Focus states: `focus:ring-2 focus:ring-brand-primary`
- [ ] Hover effects: scale and shadow enhancements
- [ ] Partnership-focused messaging (not sales-heavy)
- [ ] Chatbot integration where appropriate
- [ ] Analytics tracking with gtag events

---

## 🔗 Related Documentation

- **[Color System](../standards/color-system.md)** - Complete color reference
- **[Component Standards](../standards/component-standards.md)** - UI component specs
- **[Messaging Guidelines](../strategy/messaging.md)** - Brand voice and tone
- **[Icon Policy](../../technical/design-system/icons/icon-policy-complete.md)** - Material Icons standards
- **[Branding Index](../branding-index.md)** - Master branding documentation

---

## 📊 Phase 5 Completion Status

**Completed (5/7):**

- ✅ FormProgress Component (Hunter Green progress bars)
- ✅ ProjectCostCalculator (Hunter Green primary, Leather Tan secondary, chatbot integration)
- ✅ InteractiveTimeline (Hunter Green phase indicators)
- ✅ ActivityFeed (Multi-color activity types, chatbot integration)
- ✅ Homepage Integration (All components deployed)

**Remaining (2/7):**

- ⏳ Team Member Tags (Hunter Green link cards)
- ⏳ Before/After Slider (Awaiting images Nov 11-15)

---

**Maintained by:** MH Construction Development Team  
**Last Review:** November 8, 2025  
**Next Review:** Upon Phase 5 completion
