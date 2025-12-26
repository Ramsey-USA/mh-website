# 🚨 Security Incident Response Guide

## Exposed Credentials - GitGuardian Alert

**Date:** December 26, 2025  
**Severity:** CRITICAL  
**Status:** ⚠️ PENDING CREDENTIAL ROTATION  
**Last Updated:** December 26, 2025

---

## Incident Summary

GitGuardian detected exposed company email credentials in the repository. The `.env.local` file contained sensitive API keys and was present in the working directory but **NOT committed to Git history**.

### Exposed Credentials Found

- ✅ Resend API Key: `re_ceykSWsM_MjSbcQA8euVunmYzgoKUYCgn`
- ✅ Firebase API Key (public - OK): `AIzaSyCrsSA768hB31f042L10ah4EoLOU3UjMJI`
- ✅ Cloudflare D1 Database IDs

---

## Immediate Actions Taken ✅

### 1. File Removed

```bash
rm .env.local

```

### 2. Verified Not in Git History

```bash
git log --all --full-history -- "*env.local*"

# Result: NO COMMITS FOUND - File was never tracked
```

### 3. Confirmed .gitignore Protection

```
.env*.local
.env
```

Already present in `.gitignore` - working as intended.

---

## Required Next Steps 🔴

### STEP 1: Rotate All Exposed Credentials (URGENT)

#### A. Resend API Key

1. Go to: <https://resend.com/api-keys>
2. Revoke the exposed key: `re_ceykSWsM_MjSbcQA8euVunmYzgoKUYCgn`
3. Create a new API key
4. Store in Cloudflare Workers secrets:

   ```bash
   wrangler secret put RESEND_API_KEY
   ```

#### B. Cloudflare D1 Database Access

1. Go to: <https://dash.cloudflare.com/>
2. Navigate to Workers & Pages → D1
3. Review access logs for databases:
   - Production: `98ad144a-cfe2-4f19-a55c-c43140279840`
   - Preview: `6c6c5bd7-41b8-4968-8421-3cca5f97b160`
4. If suspicious activity detected, create new D1 databases and migrate data

#### C. Firebase (Lower Priority - Public API Keys are Normal)

Firebase API keys are designed to be public and are restricted by security rules. However, verify:

1. Go to: <https://console.firebase.google.com/project/mhc-gc-website>
2. Check Authentication → Settings
3. Verify Security Rules are properly configured

4. Review recent authentication attempts

---

## Prevention Measures Implemented ✅

### 1. Environment Variable Template

Created [.env.local.example](./.env.local.example) with placeholders only.

### 2. Proper .gitignore Configuration

```gitignore
# Local environment files - NEVER COMMIT THESE
.env*.local
.env
.env.development.local
.env.test.local
.env.production.local
```

### 3. Use Cloudflare Secrets for Production

All production secrets should be stored in Cloudflare Workers:

```bash
# Development - Use .env.local (never commit)
# Production - Use Cloudflare secrets
wrangler secret put RESEND_API_KEY
wrangler secret put DATABASE_URL
```

---

## Security Checklist

### Completed ✅

- [x] Remove exposed `.env.local` file from working directory
- [x] Verify file not in Git history (CONFIRMED: never committed)
- [x] Confirm `.gitignore` properly configured (working correctly)
- [x] Create security incident documentation
- [x] Create secrets management guide
- [x] Update `.env.local.example` with security warnings
- [x] Push security fixes to repository

### In Progress 🟡

- [ ] **Rotate Resend API key** (CRITICAL - DO THIS NOW)
  - Current key: `re_ceykSWsM_MjSbcQA8euVunmYzgoKUYCgn`
  - Must be revoked at: <https://resend.com/api-keys>
  - Create new key and update Cloudflare Workers

### Pending ⏳

- [ ] Check Cloudflare D1 access logs (review past 7 days)
- [ ] Review Firebase security rules and recent auth attempts
- [ ] Update Cloudflare Workers secrets with new credentials
- [ ] Rotate admin passwords from default `admin123`
- [ ] Test application with new credentials
- [ ] Monitor for suspicious activity for 30 days
- [ ] Document incident in security log
- [ ] Schedule follow-up security audit in 30 days

---

## How to Properly Handle Secrets

### Development Environment

1. Copy the template:

   ```bash
   cp .env.local.example .env.local

   ```

2. Fill in your **local development** values:

   ```bash
   # .env.local - NEVER COMMIT THIS FILE
   RESEND_API_KEY=your_actual_key_here
   EMAIL_FROM=noreply@mhc-gc.com
   ```

3. Verify it's gitignored:

   ```bash
   git status  # Should NOT show .env.local
   ```

### Production Environment

Use Cloudflare Workers secrets (environment variables):

```bash
# Set secrets in Cloudflare
wrangler secret put RESEND_API_KEY
wrangler secret put D1_DATABASE_ID

wrangler secret put EMAIL_FROM
```

Access in code:

```typescript
// In Cloudflare Workers
const apiKey = env.RESEND_API_KEY;

// In Next.js
const apiKey = process.env.RESEND_API_KEY;
```

---

## Monitoring & Detection

### GitGuardian

- Already configured and working (detected this issue)
- Continue monitoring for exposed secrets
- Review alerts daily

### Cloudflare Security

1. Enable Web Application Firewall (WAF)
2. Configure rate limiting
3. Monitor access logs
4. Set up alerts for suspicious activity

### Regular Security Audits

- [ ] Weekly: Review access logs
- [ ] Monthly: Rotate API keys
- [ ] Quarterly: Full security audit
- [ ] Annually: Penetration testing

---

## Contact Information

### Security Team

- **Email**: <office@mhc-gc.com>
- **Phone**: (509) 308-6489
- **Emergency**: <matt@mhc-gc.com>

### External Resources

- **GitGuardian**: <https://dashboard.gitguardian.com/>
- **Cloudflare Security**: <https://dash.cloudflare.com/>
- **Resend Security**: <https://resend.com/docs/security>

---

## Lessons Learned

1. ✅ `.gitignore` was properly configured and working
2. ⚠️ The file was created in working directory but not committed
3. ⚠️ GitGuardian may have scanned local files or detected through other means
4. ✅ Quick response prevented credential exposure in Git history

### Best Practices Moving Forward

1. **Never create `.env.local` with real credentials in the repository**
2. **Always use `.env.local.example` as template**
3. **Store production secrets in Cloudflare Workers**
4. **Rotate API keys regularly (every 90 days)**
5. **Monitor access logs continuously**
6. **Use separate keys for dev/staging/production**

---

## Status Updates

| Date             | Status         | Action                                            |
| ---------------- | -------------- | ------------------------------------------------- |
| 2025-12-26 09:00 | 🔴 DETECTED    | GitGuardian alert received for exposed .env.local |
| 2025-12-26 09:15 | 🟡 IN PROGRESS | File removed from working directory               |
| 2025-12-26 09:30 | 🟡 IN PROGRESS | Security documentation created                    |
| 2025-12-26 10:00 | 🟡 PENDING     | Awaiting credential rotation                      |
| TBD              | 🟡 PENDING     | Rotate Resend API key                             |
| TBD              | 🟡 PENDING     | Change admin passwords                            |
| TBD              | 🟢 RESOLVED    | All credentials rotated and verified              |

---

## Additional Security Enhancements

As part of this incident response, the following security measures were implemented:

### New Security Tools Created

1. **Environment Variable Validator** ([`scripts/validation/check-env-vars.js`](../scripts/validation/check-env-vars.js))
   - Validates all required environment variables are set
   - Checks for placeholder values
   - Warns about default admin passwords
   - Runs before deployment

2. **Pre-commit Secret Scanner** ([`scripts/validation/check-secrets.sh`](../scripts/validation/check-secrets.sh))
   - Scans staged files for potential secrets
   - Detects API keys, passwords, tokens
   - Prevents accidental commits of credentials
   - Integrates with Git hooks

3. **Admin Password Security Guide** ([`docs/technical/admin-password-security.md`](../docs/technical/admin-password-security.md))
   - Step-by-step password rotation instructions
   - Strong password requirements
   - Cloudflare Workers configuration
   - Ongoing security best practices

### Usage

```bash
# Check environment variables
node scripts/validation/check-env-vars.js

# Manually run secret scanner
./scripts/validation/check-secrets.sh

# Runs automatically on git commit
git commit -m "your message"
```

---

## Sign-Off

Once all actions are completed:

- [ ] All exposed credentials rotated
- [ ] No suspicious activity detected
- [ ] Application tested with new credentials
- [ ] Team notified of incident
- [ ] Security documentation updated
- [ ] Incident archived

**Reviewed by:** **\*\*\*\***\_**\*\*\*\***  
**Date:** **\*\*\*\***\_**\*\*\*\***  
**Final Status:** RESOLVED / OPEN

---

**Remember:** When in doubt, rotate the credentials. The cost of rotating an API key is far less than the potential damage from compromised credentials.
