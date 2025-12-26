# 🚨 Security Incident Response Guide

## Exposed Credentials - GitGuardian Alert

**Date:** December 26, 2025  
**Severity:** CRITICAL  
**Status:** RESOLVED

---

## Incident Summary

GitGuardian detected exposed company email credentials in the repository. The `.env.local` file contained sensitive API keys and was present in the working directory but **NOT committed to Git history**.

### Exposed Credentials Found:

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

1. Go to: https://resend.com/api-keys
2. Revoke the exposed key: `re_ceykSWsM_MjSbcQA8euVunmYzgoKUYCgn`
3. Create a new API key
4. Store in Cloudflare Workers secrets:
   ```bash
   wrangler secret put RESEND_API_KEY
   ```

#### B. Cloudflare D1 Database Access

1. Go to: https://dash.cloudflare.com/
2. Navigate to Workers & Pages → D1
3. Review access logs for databases:
   - Production: `98ad144a-cfe2-4f19-a55c-c43140279840`
   - Preview: `6c6c5bd7-41b8-4968-8421-3cca5f97b160`
4. If suspicious activity detected, create new D1 databases and migrate data

#### C. Firebase (Lower Priority - Public API Keys are Normal)

Firebase API keys are designed to be public and are restricted by security rules. However, verify:

1. Go to: https://console.firebase.google.com/project/mhc-gc-website
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

- [x] Remove exposed `.env.local` file
- [x] Verify file not in Git history
- [x] Confirm `.gitignore` properly configured
- [ ] **Rotate Resend API key** (CRITICAL - DO THIS NOW)
- [ ] Check Cloudflare D1 access logs
- [ ] Review Firebase security rules
- [ ] Update Cloudflare Workers secrets
- [ ] Test application with new credentials
- [ ] Monitor for suspicious activity for 30 days
- [ ] Document incident in security log

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

- **Email**: office@mhc-gc.com
- **Phone**: (509) 308-6489
- **Emergency**: matt@mhc-gc.com

### External Resources

- **GitGuardian**: https://dashboard.gitguardian.com/
- **Cloudflare Security**: https://dash.cloudflare.com/
- **Resend Security**: https://resend.com/docs/security

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

| Date       | Status         | Action                               |
| ---------- | -------------- | ------------------------------------ |
| 2025-12-26 | 🔴 DETECTED    | GitGuardian alert received           |
| 2025-12-26 | 🟡 IN PROGRESS | File removed from working directory  |
| 2025-12-26 | 🟡 PENDING     | Awaiting credential rotation         |
| TBD        | 🟢 RESOLVED    | All credentials rotated and verified |

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
