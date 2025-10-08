# Icon System Quick Reference Guide

Quick reference for using the optimized MaterialIcon component

## Basic Usage

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

// Simple icon
<MaterialIcon icon="star" />

// Sized icon
<MaterialIcon icon="build" size="xl" />

// Colored icon
<MaterialIcon icon="check_circle" className="text-brand-primary" />

// With primaryColor prop
<MaterialIcon icon="settings" primaryColor="#386851" />
```text

## Performance Best Practices

### Interactive Icons (use `interactive={true}`)

For icons that animate, change, or respond to user interaction:

```tsx
{/* Hover animations */}
<MaterialIcon
  icon="arrow_forward"
  size="lg"
  interactive={true}
  className="group-hover:translate-x-2 transition-transform"
/>

{/* Buttons */}
<button>
  <MaterialIcon icon="add" size="md" interactive={true} />
  Add Item
</button>

{/* Spin animations */}
<MaterialIcon
  icon="refresh"
  interactive={true}
  className="animate-spin"
/>
```text

### Static Icons (use `interactive={false}` or omit)

For icons that never change:

```tsx
{/* Decorative icons */}
<MaterialIcon icon="info" size="sm" />

{/* Static labels */}
<div>
  <MaterialIcon icon="location_on" />
  <span>123 Main St</span>
</div>

{/* Icon in static text */}
<p>
  <MaterialIcon icon="check" size="sm" interactive={false} />
  Completed
</p>
```text

## Size Reference

| Size | Pixels | Best For |
|------|--------|----------|
| `sm` | 24px | Small buttons, inline icons |
| `md` | 30px | Standard text icons |
| `lg` | 36px | Medium containers |
| `xl` | 48px | w-16 containers (64px) |
| `2xl` | 60px | w-20 containers (80px) |
| `3xl` | 72px | w-24 containers (96px) |
| `4xl` | 96px | Hero sections |

## Container Best Practices

### Optimized Icon Container

```tsx
<div className="icon-container w-16 h-16 bg-brand-primary/10 rounded-2xl p-2">
  <MaterialIcon icon="build" size="xl" className="text-brand-primary" />
</div>
```text

### Container Size Recommendations

```tsx
{/* Small container (48px) */}
<div className="w-12 h-12 p-1">
  <MaterialIcon icon="star" size="md" />
</div>

{/* Medium container (64px) */}
<div className="w-16 h-16 p-2">
  <MaterialIcon icon="build" size="xl" />
</div>

{/* Large container (80px) */}
<div className="w-20 h-20 p-2">
  <MaterialIcon icon="rocket" size="2xl" />
</div>

{/* Extra large container (96px) */}
<div className="w-24 h-24 p-3">
  <MaterialIcon icon="star" size="3xl" />
</div>
```text

## Brand Colors

### Using Brand Colors

```tsx
{/* With className */}
<MaterialIcon icon="handshake" className="text-brand-primary" />

{/* With primaryColor prop */}
<MaterialIcon icon="star" primaryColor="var(--brand-secondary)" />

{/* Brand gradient background */}
<div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-4">
  <MaterialIcon icon="badge" size="2xl" primaryColor="white" />
</div>
```text

### Brand Color Values

- **Primary (Hunter Green):** `#386851` or `text-brand-primary`
- **Secondary (Leather Tan):** `#BD9264` or `text-brand-secondary`
- **Accent (Sage Green):** `#7c9885` or `text-brand-accent`

## Common Patterns

### Button Icon

```tsx
<Button className="group">
  <MaterialIcon
    icon="calendar"
    size="md"
    interactive={true}
    className="mr-2 group-hover:scale-110 transition-transform"
  />
  Schedule
</Button>
```text

### Card Icon

```tsx
<div className="card group">
  <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center p-2 mb-4">
    <MaterialIcon icon="smart_toy" size="2xl" primaryColor="white" />
  </div>
  <h3>Feature Title</h3>
</div>
```text

### Navigation Icon

```tsx
<Link href="/" className="group flex items-center">
  <MaterialIcon
    icon="home"
    size="sm"
    interactive={true}
    className="mr-2 group-hover:text-brand-primary transition-colors"
  />
  <span>Home</span>
  <MaterialIcon
    icon="arrow_forward"
    size="sm"
    interactive={true}
    className="ml-auto group-hover:translate-x-1 transition-transform"
  />
</Link>
```text

### Status Icon

```tsx
{/* Success */}
<MaterialIcon icon="check_circle" className="text-green-500" />

{/* Warning */}
<MaterialIcon icon="warning" className="text-yellow-500" />

{/* Error */}
<MaterialIcon icon="error" className="text-red-500" />

{/* Info */}
<MaterialIcon icon="info" className="text-blue-500" />
```text

## Performance Tips

1. **Always use `interactive={true}`** for icons that animate
2. **Omit `interactive` prop** for static icons (defaults to false)
3. **Use `.icon-container`** class for optimized flex containers
4. **Avoid inline styles** when possible - use Tailwind classes
5. **Use proper sizing** - match icon size to container size

## Common Icons

- **Navigation:** `home`, `menu`, `close`, `arrow_forward`, `arrow_back`
- **Actions:** `add`, `edit`, `delete`, `search`, `filter`
- **Status:** `check_circle`, `error`, `warning`, `info`
- **Communication:** `mail`, `call`, `message`, `notifications`
- **Business:** `business`, `work`, `calendar`, `event`
- **Construction:** `build`, `construction`, `architecture`, `engineering`
- **Technology:** `smart_toy`, `computer`, `phone`, `settings`

## Do's and Don'ts

### ✅ Do

- Use semantic icon names
- Match icon size to container
- Add `interactive={true}` for animated icons
- Use brand colors consistently
- Leverage Tailwind utilities

### ❌ Don't

- Use fixed pixel sizes in inline styles
- Over-animate icons
- Forget `interactive` prop on animated icons
- Mix sizing systems (stick to Tailwind)
- Use too many different icon sizes

---

**Updated:** October 2, 2025
**Version:** 3.7.3
