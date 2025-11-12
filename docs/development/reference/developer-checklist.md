# Developer Checklist - Essential Standards

## Before Committing Code

### ✅ Required Checks

- [ ] **No emojis in source code**: Scan .ts, .tsx, .js, .jsx files
- [ ] **Material Icons only**: All UI icons use `<MaterialIcon />` component
- [ ] **Proper sizing**: Icons include appropriate `size` prop
- [ ] **Theme compatibility**: Dark mode styles included where needed
- [ ] **Accessibility**: `aria-label` added for standalone icons
- [ ] **Email recipients**: Both `office@mhc-gc.com` AND `matt@mhc-gc.com` in email arrays
- [ ] **Phone tracking**: Phone number links include tracking (see below)
- [ ] **Public display**: Only `office@mhc-gc.com` shown in UI components

### 🔍 Quick Verification Commands

```bash
# Check for emojis in source code (should return no results)
find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs grep -l "[🎯🚀💡🔒🌟⚡✨🎨📊💪🏆🔧🎖️⭐🏅🎓📈🔥💼🤝👥📱💻🏠🏢🌐📞✉️📍☀️🌙🤖📅🏗️🛡️⚙️✅➡️👁️⚠️🏛️✈️]"

# Check email recipients (should show both addresses)
grep -r "resend.emails.send" src/ | grep -v "node_modules"

# Check phone tracking implementation
grep -r "tel:\\+15093086489" src/ | wc -l

# Verify build still works
npm run build

# Check linting
npm run lint
```

### ✅ Approved Email Implementation

```tsx
// ✅ Correct: Dual recipients, office@ displayed only
const { error } = await resend.emails.send({
  from: "noreply@mhc-gc.com",
  to: ["office@mhc-gc.com", "matt@mhc-gc.com"], // BOTH required
  subject: emailSubject,
  html: emailHtml,
});

// ✅ UI Display - only office@
<a href="mailto:office@mhc-gc.com">office@mhc-gc.com</a>;
```

### ✅ Approved Phone Tracking

```tsx
// ✅ Correct: Tracked phone link
import { usePhoneTracking } from "@/hooks/usePhoneTracking";

const { trackAndCall } = usePhoneTracking();

<a
  href="tel:+15093086489"
  onClick={(e) => {
    e.preventDefault();
    trackAndCall("component-name");
  }}
>
  (509) 308-6489
</a>;
```

### ✅ Approved Icon Usage

```tsx
// ✅ Correct MaterialIcon usage
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" className="text-blue-600" />
```

### ❌ Policy Violations

```tsx
// ❌ Never use emojis in source code
<span>🏗️ Project</span>
<button>📅 Schedule</button>
title: 'Update 🎯'
console.log('Debug 🔧')

// ❌ Missing email recipient
to: "office@mhc-gc.com" // WRONG - need both addresses

// ❌ Displaying private email
<a href="mailto:matt@mhc-gc.com">Contact Matt</a> // WRONG - never display

// ❌ Untracked phone link
<a href="tel:+15093086489">(509) 308-6489</a> // WRONG - no tracking
```

### 📋 Critical Email & Phone Rules

**Email System (November 2025):**

- **ALL** form submissions MUST send to both `office@mhc-gc.com` AND `matt@mhc-gc.com`
- **ONLY** `office@mhc-gc.com` should be displayed publicly
- `matt@mhc-gc.com` receives copies but NEVER appears in UI
- Files to check: `/src/app/api/contact/route.ts`, `/src/lib/api/formHandler.ts`

**Phone Tracking (November 2025):**

- **ALL** phone number links should include tracking
- Use `usePhoneTracking()` hook or `trackPhoneCall()` utility
- Tracking sends instant notifications to both email addresses
- See: `/docs/technical/phone-tracking-system.md`

### 📝 Exception: Documentation

**Emojis ARE allowed in:**

- README.md files
- Documentation (.md) files
- Commit messages (optional)
- Comments explaining emoji removal

---

**Questions?** Check these resources:

- [Development Guidelines](./development-guidelines.md)
- [Phone Tracking System](../../technical/phone-tracking-system.md)
- [Contributing Guide](../../../contributing.md)
