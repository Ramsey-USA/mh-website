# Configuration Directory

**Last Updated:** November 8, 2025
**Status:** Deployment-Specific Configs Only

## ⚠️ Important Notice

**All primary configuration files (ESLint, TypeScript, Next.js, Tailwind, etc.) are in the project root.**

This directory contains **only deployment and environment-specific configurations** for Cloudflare, Docker, and CI/CD.

**For complete configuration documentation, see:**
📖 **[Configuration Guide](../docs/technical/configuration-guide.md)** - Comprehensive guide to all config files

---

## 📋 Current Contents

### Cloudflare Configuration

- **`cloudflare/wrangler.toml`** - Cloudflare Workers/Pages deployment config
- **`cloudflare/wrangler-example.toml`** - Example template for new environments

### Deployment Configuration

- **`deployment/Dockerfile`** - Docker container configuration (if needed)
- **`deployment/docker-compose.yml`** - Docker Compose orchestration

### Monitoring Configuration

- **`monitoring/audit-ci.json`** - Automated audit CI configuration
- **`monitoring/lighthouserc.json`** - Lighthouse CI configuration

---

## 🔧 Primary Configurations (Project Root)

All framework and build tool configurations are in the **project root** for better discoverability:

| File                 | Purpose                    | Location |
| -------------------- | -------------------------- | -------- |
| `eslint.config.mjs`  | ESLint 9 flat config       | Root     |
| `tsconfig.json`      | TypeScript strict mode     | Root     |
| `next.config.js`     | Next.js 15 framework       | Root     |
| `tailwind.config.ts` | Tailwind CSS design system | Root     |
| `jest.config.js`     | Jest testing framework     | Root     |
| `postcss.config.js`  | PostCSS CSS processing     | Root     |
| `cspell.json`        | CSpell spell checking      | Root     |
| `package.json`       | Dependencies & scripts     | Root     |

**Full Documentation:** [Configuration Guide](../docs/technical/configuration-guide.md)

---

## 📂 Directory Structure

### Current Structure

```text
config/
├── cloudflare/         # Cloudflare deployment configs
│   ├── wrangler.toml
│   └── wrangler-example.toml
├── deployment/         # Docker deployment configs
│   ├── Dockerfile
│   └── docker-compose.yml
└── monitoring/         # CI/CD monitoring configs
    ├── audit-ci.json
    └── lighthouserc.json
```

### Why This Structure?

Modern project standards place primary configuration files in the project root because:

1. **Better Discoverability** - Developers expect to find configs in root
2. **IDE Integration** - Most IDEs look for configs in root first
3. **Tool Conventions** - Most tools default to looking in project root
4. **Simplified Paths** - No need for complex relative paths

The `config/` directory is reserved for **deployment and environment-specific** configurations that are typically not
needed during local development.

---

## ℹ️ Usage Guidelines

### When to Add Files Here

✅ **Add to `config/`:**

- Deployment-specific configurations (Cloudflare, Docker, etc.)
- Environment-specific settings
- CI/CD monitoring configurations
- Platform-specific deployment files

❌ **Don't Add to `config/`:**

- Framework configurations (ESLint, TypeScript, Next.js, etc.) → **Use project root**
- Build tool configurations (Tailwind, PostCSS, Jest, etc.) → **Use project root**
- Package configurations (package.json, etc.) → **Use project root**
- Application code or components → **Use `src/` directory**

---

## 🔄 Configuration History

### November 8, 2025 - Configuration Consolidation

**Major configuration overhaul completed:**

- ✅ Moved all primary configs to project root
- ✅ Removed duplicate build configs from `config/build/`
- ✅ Cleaned up `.bak` files (git history maintained)
- ✅ Created comprehensive configuration documentation
- ✅ Standardized configuration system across the project
- ✅ Updated all 7 core configuration files with inline documentation

**Files Removed:**

- ❌ `config/build/postcss.config.js` - Duplicate of root config
- ❌ `config/build/tailwind.config.ts` - Duplicate of root config
- ❌ Root-level `.bak` files - Tracked in git history

**Why?** Eliminated confusion from duplicates. All active configs are in
project root with full history in git.

### Before November 8, 2025

```text
config/
├── build/              # ❌ Removed - duplicates
│   ├── postcss.config.js
│   └── tailwind.config.ts
├── cloudflare/         # ✅ Kept - deployment specific
├── deployment/         # ✅ Kept - deployment specific
└── monitoring/         # ✅ Kept - CI/CD specific
```

---

## 📚 Related Documentation

- **[Configuration Guide](./../docs/technical/configuration-guide.md)** - Complete configuration system documentation
- **[Development Standards](./../docs/development/development-standards.md)** - Coding standards and practices
- **[Cloudflare Deployment](./../docs/deployment/cloudflare-complete-guide.md)** - Deployment setup guide
- **[Development Index](./../docs/development/development-index.md)** - Developer resources

---

**For Questions:** See [Configuration Guide](../docs/technical/configuration-guide.md) or
[Development Documentation](../docs/development/development-index.md)

**Last Updated:** November 8, 2025
