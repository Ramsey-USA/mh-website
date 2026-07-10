# MH Construction Color Quick Reference

**Category:** Branding - Standards Reference
**Last Updated:** July 10, 2026
**Status:** Active companion reference

Use this reference with [Color System](./color-system.md) for fast implementation checks.

## Quick Reference Card

### Brand Colors

| Color                  | Hex       | Usage                                                      |
| ---------------------- | --------- | ---------------------------------------------------------- |
| **Hunter Green**       | `#386851` | Primary buttons, main CTAs, IRL consultations              |
| **Hunter Green Light** | `#628F79` | Hover states, lighter accents                              |
| **Hunter Green Dark**  | `#1E392C` | Active states, pressed buttons                             |
| **Leather Tan**        | `#BD9264` | Secondary buttons, Automated Estimator, trade partnerships |
| **Leather Tan Light**  | `#D9BD93` | Hover states, lighter accents                              |
| **Leather Tan Dark**   | `#8A6B49` | Active states, pressed buttons                             |

### Service/Partnership Color Associations

| Service/Partnership    | Button Color            | Icon              | Example CTA                  |
| ---------------------- | ----------------------- | ----------------- | ---------------------------- |
| **IRL Consultation**   | Hunter Green (Primary)  | `event`           | "Schedule Free Consultation" |
| **Client Partnership** | Hunter Green (Primary)  | `handshake`       | "Begin Partnership"          |
| **Trade Partnership**  | Leather Tan (Secondary) | `construction`    | "Join Trade Network"         |
| **Government/Federal** | Grayscale Gradient      | `account_balance` | "Request Grant Support"      |

### Contact Information Color Coding

- **Client Partnerships:** Hunter Green theme (, <office@mhc-gc.com>)
- **Trade Partnerships:** Leather Tan theme (, <office@mhc-gc.com>)

## Implementation Examples

### Primary Button (Hunter Green)

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>
```

### Secondary Button (Leather Tan)

```tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="construction" size="lg" className="mr-3" />
  <span className="font-medium">Join Trade Network</span>
</Button>
```

### Government/Federal Button (Grayscale Gradient)

```tsx
<button className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600 hover:from-slate-700 hover:via-gray-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl">
  <MaterialIcon icon="account_balance" size="lg" className="mr-3" />
  <span className="font-medium">Request Grant Support</span>
</button>
```

### Using Brand Colors Directly

```tsx
// Hunter Green text
<span className="text-brand-primary">Primary Action</span>

// Leather Tan background
<div className="bg-brand-secondary text-white p-4">
  Secondary Content
</div>

// Hunter Green hover effect
<button className="text-brand-primary hover:bg-brand-primary hover:text-white">
  Interactive Element
</button>
```

## Related

- [Color System](./color-system.md)
- [Unified Component Standards](./unified-component-standards.md)
