# Deployment Documentation Hub

**Category**: Deployment & Infrastructure  
**Last Updated**: November 6, 2025  
**Status**: ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../MasterIndex.md) - Central hub for all documentation
- [⚙️ Operations Index](../operations/operations-index.md) - Build optimization and operations
- [⚡ Performance Hub](../technical/performance/performance-index.md) - Performance optimization
- [🔄 Migrations Documentation](../migrations/migrations-index.md) - Migration guides
- [🛠️ Technical Documentation](../technical/technical-index.md) - Architecture

---

## 🚀 Overview

Complete deployment documentation for MH Construction website covering Cloudflare Pages deployment, D1 database
setup, CI/CD pipeline configuration, and production environment management.

**Platform Stack:**

- **Hosting:** Cloudflare Pages (Edge deployment)
- **Database:** Cloudflare D1 (SQLite at edge)
- **Runtime:** Next.js 15 with App Router
- **CI/CD:** GitHub Actions + Cloudflare integration

---

## 📚 Documentation Files

### Cloudflare Pages Deployment

**[cloudflare-complete-guide.md](./cloudflare-complete-guide.md)** - Complete Cloudflare Pages deployment guide

Comprehensive guide covering end-to-end Cloudflare Pages setup and deployment.

**Topics Covered:**

- Complete deployment workflow
- CI/CD pipeline configuration (GitHub Actions)
- Build configuration and optimization
- Environment setup and variables
- Node.js and Wrangler setup
- Troubleshooting and best practices

**When to Use:** First-time setup, comprehensive reference, troubleshooting

---

**[cloudflare-pages-setup.md](./cloudflare-pages-setup.md)** - Initial Cloudflare Pages configuration

Quick start guide for deploying to Cloudflare Pages.

**Topics Covered:**

- Cloudflare account and project setup
- GitHub repository connection
- Build configuration and environment variables
- Custom domain configuration
- Edge deployment settings

**When to Use:** Quick setup reference, first-time deployment

---

**[cloudflare-deployment-ready.md](./cloudflare-deployment-ready.md)** - Production readiness checklist

Pre-deployment checklist ensuring production readiness.

**Topics Covered:**

- Code quality checks
- Environment variable verification
- Build testing
- Database migration status
- Performance validation
- Security review

**When to Use:** Before every production deployment, release validation

---

**[cloudflare-optimization.md](./cloudflare-optimization.md)** - Cloudflare-specific optimizations

Advanced optimization techniques for Cloudflare Pages.

**Topics Covered:**

- Edge caching strategies
- Image optimization with Cloudflare
- Function optimization for edge runtime
- Headers and security configuration
- Performance monitoring

**When to Use:** Post-deployment optimization, performance tuning

---

**[cloudflare-api-token-setup.md](./cloudflare-api-token-setup.md)** - API token configuration

Guide for setting up Cloudflare API tokens for CI/CD.

**Topics Covered:**

- API token creation
- Permissions configuration
- Token security best practices
- CI/CD integration

**When to Use:** Setting up automated deployments, CI/CD configuration

---

**[cloudflare-security-config.md](./cloudflare-security-config.md)** - Cloudflare security configuration

Security rules, WAF configuration, DNS settings, and rate limiting.

**Topics Covered:**

- WAF custom rules
- Rate limiting configuration
- Page rules and caching
- DNS settings and records
- Security best practices

**When to Use:** Security hardening, WAF setup, DNS configuration

---

### Database Deployment

**[d1-database-setup.md](./d1-database-setup.md)** - Cloudflare D1 database setup

Complete guide for D1 database configuration and management.

**Topics Covered:**

- D1 database creation
- Schema migrations
- Data seeding
- Database bindings
- Local development with D1
- Backup and recovery

**When to Use:** Database setup, schema changes, troubleshooting DB issues

---

**[run-migrations-manually.md](./run-migrations-manually.md)** - Manual database migration guide

Instructions for running database migrations manually when needed.

**Topics Covered:**

- Manual migration execution
- Migration troubleshooting
- Rollback procedures
- Local vs production migrations

**When to Use:** Migration failures, manual DB updates, troubleshooting

---

### CI/CD Pipeline

**[ci-cd-pipeline-success.md](./ci-cd-pipeline-success.md)** - CI/CD pipeline documentation

Documentation of successful CI/CD pipeline setup and operation.

**Topics Covered:**

- GitHub Actions workflows
- Automated testing
- Build and deployment automation
- Environment-specific deployments
- Pipeline monitoring

**When to Use:** Understanding CI/CD setup, troubleshooting automation

---

### Archive

**[archive-cloudflare-build-settings.md](./archive-cloudflare-build-settings.md)** - Historical build configuration

Archived build settings and configuration history.

**When to Use:** Historical reference, understanding past changes

---

## 🎯 When to Use Each Guide

| Scenario                  | Use This Guide                                                                                    | Why                     |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------- |
| **First deployment**      | [Complete Guide](./cloudflare-complete-guide.md) or [Pages Setup](./cloudflare-pages-setup.md)    | Full setup workflow     |
| **Quick setup**           | [Cloudflare Pages Setup](./cloudflare-pages-setup.md)                                             | Fast initial setup      |
| **Pre-deployment checks** | [Deployment Ready](./cloudflare-deployment-ready.md)                                              | Validation checklist    |
| **Security setup**        | [Security Config](./cloudflare-security-config.md)                                                | WAF, DNS, rate limiting |
| **Slow performance**      | [Cloudflare Optimization](./cloudflare-optimization.md)                                           | Edge optimization       |
| **Database setup**        | [D1 Database Setup](./d1-database-setup.md)                                                       | DB configuration        |
| **Migration issues**      | [Run Migrations Manually](./run-migrations-manually.md)                                           | Manual migration        |
| **CI/CD setup**           | [API Token Setup](./cloudflare-api-token-setup.md) + [CI/CD Success](./ci-cd-pipeline-success.md) | Automation              |
| **Build failures**        | [Deployment Ready](./cloudflare-deployment-ready.md) + Archives                                   | Troubleshooting         |

---

## 🚀 Quick Start: First Deployment

### Prerequisites

- [ ] GitHub repository with Next.js 15 project
- [ ] Cloudflare account created
- [ ] Domain configured (optional for staging)

### Deployment Steps

1. **Setup Cloudflare Pages**

   ```bash
   # Follow: cloudflare-pages-setup.md
   - Connect GitHub repository
   - Configure build settings
   - Set environment variables
   ```

2. **Setup D1 Database**

   ```bash
   # Follow: d1-database-setup.md
   npx wrangler d1 create mh-construction-db
   npx wrangler d1 migrations apply mh-construction-db
   ```

3. **Run Pre-Deployment Checklist**

   ```bash
   # Follow: cloudflare-deployment-ready.md
   - Run tests: npm test
   - Build locally: npm run build
   - Check bundle size
   - Verify environment variables
   ```

4. **Deploy**

   ```bash
   # Push to main branch triggers automatic deployment
   git push origin main

   # Or deploy manually
   npx wrangler pages deploy
   ```

5. **Verify Deployment**
   - Check Cloudflare dashboard
   - Test production URL
   - Verify database connection
   - Run smoke tests

---

## 🔧 Common Deployment Tasks

### Update Environment Variables

1. Go to Cloudflare Pages dashboard
2. Navigate to Settings → Environment Variables
3. Add/update variables
4. Redeploy for changes to take effect

**Reference:** [Cloudflare Pages Setup](./cloudflare-pages-setup.md)

---

### Run Database Migrations

```bash
# Production
npx wrangler d1 migrations apply mh-construction-db --remote

# Local development
npx wrangler d1 migrations apply mh-construction-db --local
```

**Reference:** [D1 Database Setup](./d1-database-setup.md)

---

### Roll Back Deployment

1. Go to Cloudflare Pages dashboard
2. Navigate to Deployments
3. Find previous successful deployment
4. Click "Rollback to this deployment"

**Alternative:** Revert Git commit and push

---

### Monitor Build Performance

- **Build Time Target:** < 60 seconds
- **Bundle Size Target:** < 600KB
- **Deployment Time:** < 2 minutes total

**Reference:** [Cloudflare Optimization](./cloudflare-optimization.md)

---

## 🆘 Troubleshooting

### Build Failures

**Symptom:** Deployment fails during build phase

**Common Causes:**

1. TypeScript errors in code
2. Missing environment variables
3. Dependency installation failures
4. Build timeout (>15 minutes)

**Solutions:**

1. Run `npm run build` locally to reproduce
2. Check build logs in Cloudflare dashboard
3. Verify all environment variables are set
4. Check for dependency conflicts

**Reference:** [Deployment Ready Checklist](./cloudflare-deployment-ready.md)

---

### Database Connection Issues

**Symptom:** Application can't connect to D1 database

**Common Causes:**

1. Database binding not configured
2. Wrong database name in wrangler.toml
3. Migrations not applied
4. Permissions issues

**Solutions:**

1. Verify binding in `wrangler.toml`

   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "mh-construction-db"
   database_id = "your-database-id"
   ```

2. Apply migrations: `npx wrangler d1 migrations apply`
3. Check Cloudflare dashboard for database status

**Reference:** [D1 Database Setup](./d1-database-setup.md), [Run Migrations Manually](./run-migrations-manually.md)

---

### Slow Deployment Times

**Symptom:** Deployments taking > 5 minutes

**Common Causes:**

1. Large bundle size
2. Unoptimized dependencies
3. Slow build scripts
4. Too many files being deployed

**Solutions:**

1. Analyze bundle with `npm run analyze`
2. Enable code splitting
3. Optimize images and assets
4. Use Cloudflare CDN caching

**Reference:** [Cloudflare Optimization](./cloudflare-optimization.md), [Performance Hub](../technical/performance/performance-index.md)

---

### Environment Variable Issues

**Symptom:** Application behaves differently in production

**Common Causes:**

1. Environment variables not set in Cloudflare
2. Variable naming mismatch (NEXT*PUBLIC* prefix)
3. Sensitive data exposed client-side
4. Variables not refreshed after update

**Solutions:**

1. Verify all variables in Cloudflare dashboard
2. Check NEXT*PUBLIC* prefix for client-side variables
3. Never expose secrets in client bundles
4. Redeploy after variable changes

**Reference:** [Cloudflare Pages Setup](./cloudflare-pages-setup.md)

---

### CI/CD Pipeline Failures

**Symptom:** GitHub Actions failing

**Common Causes:**

1. Invalid API token
2. Expired credentials
3. Permission issues
4. Workflow configuration errors

**Solutions:**

1. Regenerate Cloudflare API token
2. Update GitHub secrets
3. Check token permissions
4. Review workflow logs

**Reference:** [API Token Setup](./cloudflare-api-token-setup.md), [CI/CD Success](./ci-cd-pipeline-success.md)

---

## 📊 Deployment Metrics

### Current Production Stats

- **Platform:** Cloudflare Pages
- **Database:** Cloudflare D1 (SQLite)
- **Edge Locations:** 300+ global
- **Build Time:** ~35-38 seconds
- **Bundle Size:** 535kB (optimized)
- **Deployment Time:** ~90 seconds total
- **Uptime:** 99.9%+ (Cloudflare SLA)

### Performance Targets

| Metric                 | Target  | Current    |
| ---------------------- | ------- | ---------- |
| **Build Time**         | < 60s   | 35-38s ✅  |
| **Bundle Size**        | < 600KB | 535KB ✅   |
| **Deployment Time**    | < 2min  | ~90s ✅    |
| **Time to First Byte** | < 100ms | ~50ms ✅   |
| **Cold Start**         | < 500ms | N/A (edge) |

---

## 🔗 Related Documentation

### Operations & Performance

- [Operations Index](../operations/operations-index.md) - Build optimization
- [Build Optimization Index](../operations/build-optimization/build-optimization-index.md) - Build performance
- [Performance Hub](../technical/performance/performance-index.md) - Performance optimization

### Technical Architecture

- [Technical Index](../technical/technical-index.md) - System architecture
- [Features](../technical/features.md) - Platform features
- [Email System](../technical/email-system.md) - Email infrastructure

### Migration Guides

- [Migrations Index](../migrations/migrations-index.md) - All migrations
- [Domain Migrations](../migrations/domains/) - Domain transitions
- [Website Domain Migration](../migrations/domains/website-domain-migration.md) - Domain setup

### Project Management

- [Project Index](../project/project-index.md) - Project overview
- [Architecture](../project/architecture.md) - System design
- [Roadmaps](../project/roadmaps/) - Future plans

---

## ✅ Deployment Checklist

### Before Every Deployment

- [ ] All tests passing (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Environment variables verified
- [ ] Database migrations applied
- [ ] Bundle size acceptable (< 600KB)
- [ ] Security audit passed
- [ ] Code review approved
- [ ] Staging deployment tested

### After Deployment

- [ ] Production site loads correctly
- [ ] No console errors in browser
- [ ] Database queries working
- [ ] Forms submitting properly
- [ ] Email notifications working
- [ ] Navigation functioning
- [ ] Mobile site working
- [ ] Performance metrics acceptable
- [ ] Monitoring alerts configured
- [ ] Rollback plan ready

---

## 📞 Support

For deployment issues:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Cloudflare Status:** [cloudflarestatus.com](https://www.cloudflarestatus.com/)
- **Emergency Rollback:** Use Cloudflare dashboard → Deployments → Rollback
- **Documentation Issues:** Submit to project repository

---

**Last Updated:** November 8, 2025  
**Status:** ✅ Active  
**Files:** 10 (8 active guides + 1 CI/CD doc + 1 archive)  
**Maintained by:** MH Construction DevOps Team
