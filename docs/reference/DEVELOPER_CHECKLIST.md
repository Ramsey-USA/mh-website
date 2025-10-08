# Developer Checklist - Icon Usage

## Before Committing Code

### ✅ Required Checks

- [ ] **No emojis in source code**: Scan .ts, .tsx, .js, .jsx files
- [ ] **Material Icons only**: All UI icons use `<MaterialIcon />` component  
- [ ] **Proper sizing**: Icons include appropriate `size` prop
- [ ] **Theme compatibility**: Dark mode styles included where needed
- [ ] **Accessibility**: `aria-label` added for standalone icons

### 🔍 Quick Verification Commands

```bash
# Check for emojis in source code (should return no results)
find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs grep -l "[🎯🚀💡🔒🌟⚡✨🎨📊💪🏆🔧🎖️⭐🏅🎓📈🔥💼🤝👥📱💻🏠🏢🌐📞✉️📍☀️🌙🤖📅🏗️🛡️⚙️✅➡️👁️⚠️🏛️✈️]"

# Verify build still works
npm run build

# Check linting
npm run lint
```text

### ✅ Approved Icon Usage

```tsx
// ✅ Correct MaterialIcon usage
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" className="text-blue-600" />
```text

### ❌ Policy Violations

```tsx
// ❌ Never use emojis in source code
<span>🏗️ Project</span>
<button>📅 Schedule</button>
title: 'Update 🎯'
console.log('Debug 🔧')
```text

### 📝 Exception: Documentation

**Emojis ARE allowed in:**

- README.md files
- Documentation (.md) files  
- Commit messages (optional)
- Comments explaining emoji removal

---

**Questions?** Check [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) for complete policy details.
