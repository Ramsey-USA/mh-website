## Description

<!-- Brief description of changes -->

## Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💥 Breaking change
- [ ] 📝 Documentation
- [ ] 🎨 Style/UI
- [ ] ♻️ Refactor
- [ ] ⚡ Performance
- [ ] ✅ Tests

## Testing

- [ ] Tested locally
- [ ] All quality checks pass (type-check, lint, tests, build)

## Master at Arms Compliance

- [ ] Compliance Result included (PASS or FAIL)
- [ ] Applied standards listed
- [ ] Violations and remediations documented (or "none")
- [ ] Risk level recorded (low, medium, high)

### Compliance Report

Compliance Result:

Applied Standards:

Passes:

Violations:

Risk Level:

### Exception Disclosure

- [ ] No exception used
- [ ] Exception used and recorded in .github/branding-exceptions.json
- Exception ticket:
- Exception owner:
- Exception expiry:

## Pre-Merge Checklist

- [ ] 🧹 No commented-out code
- [ ] 🚫 No console.log statements
- [ ] 🚫 No unused imports
- [ ] 📦 No unnecessary dependencies added
- [ ] 🎯 No duplicate code (DRY principle followed)
- [ ] 📱 Mobile responsive (if UI changes)
- [ ] ♿ Accessibility considered (if UI changes)

### Component Standards

- [ ] 📱 Mobile responsive (tested on mobile viewport)
- [ ] 🌓 Dark mode compatible (if UI changes)
- [ ] ♿ Accessibility considered (semantic HTML, ARIA labels)
- [ ] 📊 Analytics tracking added (if new page/feature)
- [ ] 🔗 Dynamic imports used for heavy components

### Documentation

- [ ] 📚 README updated (if needed)
- [ ] 📝 Code comments added for complex logic
- [ ] 🎓 Examples provided (if new pattern/utility)

### Post-Deploy Verification

- [ ] 🚀 Deploy completed successfully in production
- [ ] 🩺 Safety Smoke Tests workflow executed after deploy
- [ ] 🔐 `run_authenticated_checks=true` used for release verification
- [ ] 📄 Smoke run summary captured in PR comments (link or run ID)
- [ ] ✅ Safety routes/APIs verified (`/safety`, `/safety/hub`, `/api/safety/*`)
- [ ] ⚠️ If smoke checks failed, issue/ticket link added before merge

---

**Note:** Pre-commit hooks and CI/CD automatically verify code quality. If checks fail,
ask AI: _"Run quality check and fix issues"_
