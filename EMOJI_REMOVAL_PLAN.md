# Emoji Removal & Material Icon Replacement Plan

## Objective

Replace all emojis across the MH Construction website with Material Icons according to MH-BRANDING.md standards.

## Emoji to Material Icon Mapping (Based on MH-BRANDING.md)

### Primary Icons

| Emoji | Material Icon | Semantic Rationale |
|-------|---------------|-------------------|
| 🤖 | `smart_toy` | AI Estimator |
| 📅 | `event` | Scheduling/Calendar |
| 📞 | `phone` | Phone/Contact |
| 🏗️ | `construction` | Construction Industry |
| 🛡️ | `security` | Trust/Security |
| ⚙️ | `engineering` | Engineering/Technical |
| ⭐ | `star` | Quality/Excellence |
| ✅ | `check_circle` | Verification/Complete |
| ➡️ | `arrow_forward` | Navigation/Next |
| 👁️ | `visibility` | Project Viewing |

### Tactical & Military Icons

| Emoji | Material Icon | Semantic Rationale |
|-------|---------------|-------------------|
| 🎯 | `gps_fixed` | Target/Goal/Tactical |
| 🎖️ | `military_tech` | Veteran/Military Recognition |
| ⚡ | `bolt` | Rapid/Urgent |
| 🔒 | `lock` | Security/Protection |
| 🔧 | `build` | Tools/Maintenance |
| 💡 | `lightbulb` | Ideas/Suggestions |
| 🚀 | `rocket_launch` | Launch/Deploy |
| ✨ | `auto_awesome` | Quality/Premium |
| 🏆 | `emoji_events` | Achievement/Excellence |
| 🏅 | `workspace_premium` | Premium Quality |

### Communication & Location Icons

| Emoji | Material Icon | Semantic Rationale |
|-------|---------------|-------------------|
| ✉️ | `email` | Email Communication |
| 📍 | `location_on` | Location/Place |
| 📊 | `analytics` | Analysis/Data |
| 📈 | `trending_up` | Growth/Progress |
| 🗺️ | `map` | Navigation/Area |
| 📋 | `assignment` | Forms/Documents |
| 📦 | `inventory_2` | Materials/Supplies |
| 💼 | `work` | Business/Professional |

### Status & Notification Icons

| Emoji | Material Icon | Semantic Rationale |
|-------|---------------|-------------------|
| ⚠️ | `warning` | Warning/Caution |
| 🔴 | `error` | Error/Critical |
| 🟡 | `priority_high` | High Priority |
| 🟢 | `check_circle` | Success/Complete |
| 🔵 | `info` | Information |
| ℹ️ | `info` | Information |
| 📡 | `signal_cellular_alt` | Communication |

### Specialized Icons

| Emoji | Material Icon | Semantic Rationale |
|-------|---------------|-------------------|
| 💰 | `attach_money` | Money/Budget |
| 💵 | `payments` | Payments |
| 💲 | `monetization_on` | Financial |
| 💎 | `diamond` | Premium/Elite |
| 🏠 | `home` | Home/Residential |
| 🏢 | `apartment` | Commercial/Building |
| 🏛️ | `account_balance` | Government/Institution |
| ✈️ | `flight` | Air Force |
| ⚓ | `anchor` | Navy |
| 🦅 | `spa` | Marines (closest) |
| 🇺🇸 | `flag` | American Flag |
| 🛟 | `safety_ring` | Coast Guard/Safety |
| 🚢 | `directions_boat` | Navy/Coast Guard |
| ♿ | `accessible` | Accessibility |
| 👥 | `groups` | Team/People |
| 👨‍💼 | `person` | Personnel |
| 🎨 | `palette` | Design/Creative |
| 🌟 | `star_rate` | Featured/Special |
| 🔥 | `whatshot` | Hot/Trending |
| 🌡️ | `thermostat` | Temperature/Warm |
| ❄️ | `ac_unit` | Cold |
| 🔍 | `search` | Search/Find |
| 📱 | `smartphone` | Mobile/Phone |
| 💻 | `computer` | Technology |
| 🌐 | `language` | Web/Global |
| ⏱️ | `timer` | Timeline/Duration |
| ⏰ | `alarm` | Time/Schedule |
| 🎓 | `school` | Education |
| 📝 | `edit_note` | Notes/Writing |
| 📧 | `email` | Email |
| 🚨 | `emergency` | Emergency/Alert |

## Files to Update

### 1. `/src/lib/militaryConstructionAI.ts` (Priority 1 - 200+ emojis)

- Contains most emojis in the codebase
- Military-themed messaging with tactical icons
- Form assistance and validation messages

### 2. `/src/lib/pwa/notifications.ts`

- Notification titles with emojis (📅, 🏗️, ⚙️)

### 3. `/src/lib/types/blog.ts`

- Single emoji icon reference (🏠)

### 4. `/src/lib/firebase/config.ts`

- Console log emoji (🔧)

### 5. `/src/lib/security/audit-logger.ts`

- Console log emoji (🔒)

### 6. `/src/test/security/security.test.ts`

- Test emoji bomb (🔥)

## Implementation Approach

### Option A: Direct Text Replacement (Text-Only Context)

For text responses and console logs, replace emoji with text representation:

```typescript
// Before
'**TACTICAL ASSESSMENT** 🎯'

// After
'**TACTICAL ASSESSMENT** [TARGET]'
```

### Option B: Component Integration (UI Context)

For UI elements, use MaterialIcon component:

```tsx
// Before
title: 'Project Update: ${project.title} 🏗️'

// After
<MaterialIcon icon="construction" size="sm" className="inline" />
```

### Recommended: Hybrid Approach

- **militaryConstructionAI.ts**: Use text labels since output is strings, not JSX
- **UI Components**: Use MaterialIcon component where rendering JSX
- **Notifications**: Use text labels or add icon field for MaterialIcon

## Next Steps

1. ✅ Create mapping document
2. ⏳ Update militaryConstructionAI.ts with text labels
3. ⏳ Update notification system
4. ⏳ Update other files with emojis
5. ⏳ Test all replacements
6. ⏳ Update documentation

## Material Icon Usage Pattern

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

// In JSX
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />

// Sizes: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
```

## Text Label Pattern (for string responses)

```typescript
// Pattern: [ICON_NAME]
'**TACTICAL ASSESSMENT** [TARGET]'
'**VETERAN CONFIRMED** [MILITARY_TECH]'
'**PRIORITY STATUS** [BOLT]'
```
