# Secrets Management Guide

## Secure Handling of API Keys and Credentials

**Last Updated:** December 26, 2025

---

## Overview

This guide establishes standards for managing sensitive information like API keys, database credentials, and authentication tokens.

---

## Environment Variables Structure

### Development (.env.local)

```bash
# Copy from .env.local.example
cp .env.local.example .env.local

# Never commit this file!
# Already in .gitignore
```

### Production (Cloudflare Workers)

```bash
# Set via Cloudflare dashboard or wrangler CLI
wrangler secret put RESEND_API_KEY
wrangler secret put D1_DATABASE_ID
```

---

## Secret Categories

### Public Secrets (Safe to Expose)

These can be in public code:

- Firebase API keys (protected by security rules)
- Google Analytics IDs
- Public endpoints
- Feature flags

```typescript
// OK in public code
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: "mhc-gc-website",
};
```

### Private Secrets (NEVER Expose)

These must be environment variables:

- Email service API keys (Resend)
- Database credentials
- Admin passwords
- JWT signing keys
- Payment processor keys

```typescript
// Must be in environment variables
const resendKey = process.env.RESEND_API_KEY; // ✅ Correct
const resendKey = "re_xxxxx"; // ❌ NEVER do this
```

---

## Setup Instructions

### Step 1: Local Development

```bash
# 1. Copy the example file
cp .env.local.example .env.local

# 2. Edit with your development credentials
nano .env.local

# 3. Verify it's gitignored
git status  # Should NOT appear

# 4. Test the application
npm run dev
```

### Step 2: Staging/Production

```bash
# Using Cloudflare Wrangler
wrangler secret put RESEND_API_KEY
# Enter your production API key when prompted

wrangler secret put D1_DATABASE_ID
# Enter your database ID

# List all secrets (without values)
wrangler secret list
```

---

## Required Environment Variables

### Email Service (Resend)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@mhc-gc.com
```

**Where to get:**

- Sign up at: https://resend.com
- Create API key at: https://resend.com/api-keys
- Verify domain: https://resend.com/domains

### Cloudflare D1 Database

```bash
D1_DATABASE_ID=your-production-database-id
D1_PREVIEW_DATABASE_ID=your-preview-database-id
```

**Where to get:**

- Cloudflare Dashboard → Workers & Pages → D1
- Create databases for production and preview
- Copy database IDs from dashboard

### Firebase (Google Analytics)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mhc-gc-website
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

**Where to get:**

- Firebase Console: https://console.firebase.google.com
- Project Settings → General → Your apps

---

## Security Best Practices

### DO ✅

- Use `.env.local.example` as a template
- Store production secrets in Cloudflare Workers
- Rotate API keys every 90 days
- Use different keys for dev/staging/prod
- Monitor access logs regularly
- Use environment-specific prefixes:
  - `NEXT_PUBLIC_` for client-side variables
  - No prefix for server-only secrets

### DON'T ❌

- Commit `.env.local` or `.env` files
- Hard-code credentials in source files
- Share secrets in Slack/email/tickets
- Use production keys in development
- Store secrets in database
- Log or console.log secrets

---

## Rotation Schedule

| Secret Type          | Rotation Frequency | Responsible    |
| -------------------- | ------------------ | -------------- |
| Resend API Key       | Every 90 days      | DevOps Team    |
| Admin Passwords      | Every 60 days      | Security Team  |
| JWT Signing Keys     | Every 180 days     | Backend Team   |
| Database Credentials | Every 90 days      | Database Admin |
| Firebase Tokens      | As needed          | DevOps Team    |

---

## Emergency Procedures

### If a Secret is Exposed

1. **Immediate Actions** (within 1 hour)
   - Remove exposed file/commit
   - Rotate the compromised credential
   - Check access logs for abuse
   - Notify security team

2. **Investigation** (within 24 hours)
   - Determine scope of exposure
   - Review all access during exposure window
   - Document incident
   - Implement additional safeguards

3. **Follow-Up** (within 7 days)
   - Complete security audit
   - Update documentation
   - Train team on proper handling
   - Implement monitoring

See [SECURITY-INCIDENT-RESPONSE.md](../../SECURITY-INCIDENT-RESPONSE.md) for detailed procedures.

---

## Access Control

### Who Has Access?

| Environment | Access Level   | Personnel           |
| ----------- | -------------- | ------------------- |
| Development | All developers | Full team           |
| Staging     | DevOps + Leads | Limited             |
| Production  | Admin only     | Matt, Security Team |

### Requesting Access

1. Submit ticket with justification
2. Get approval from team lead
3. Access granted for specific duration
4. Access reviewed quarterly

---

## Cloudflare Workers Setup

### Initial Configuration

```bash
# Install wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Set secrets
wrangler secret put RESEND_API_KEY
wrangler secret put D1_DATABASE_ID
wrangler secret put EMAIL_FROM
```

### Viewing Secrets

```bash
# List secret names (not values)
wrangler secret list

# Delete a secret
wrangler secret delete OLD_SECRET_NAME
```

### In Code

```typescript
// Access in Cloudflare Workers
export default {
  async fetch(request: Request, env: Env) {
    const apiKey = env.RESEND_API_KEY;
    // Use the secret...
  },
};
```

---

## Testing

### Development Testing

```bash
# Verify environment variables are loaded
npm run dev

# Check console for any missing variables
# Should see: "✅ Email service configured"
```

### Production Testing

```bash
# Test with wrangler
wrangler dev

# Deploy to preview
wrangler deploy --env preview

# Verify secrets are accessible
# Check logs for any errors
```

---

## Monitoring

### What to Monitor

- Failed authentication attempts
- Unusual API usage patterns
- Geographic anomalies
- Rate limit violations
- Error rates

### Tools

- Cloudflare Analytics
- Resend Dashboard
- Firebase Console
- GitGuardian (secret scanning)

### Alerts

Configure alerts for:

- API key usage > 10,000/day
- Failed logins > 5/hour
- New geographic locations
- Off-hours access

---

## Compliance

### Requirements

- ✅ SOC 2 Type II compliance
- ✅ GDPR data protection
- ✅ CCPA privacy standards
- ✅ OWASP security guidelines

### Audit Trail

All secret access is logged:

- Who accessed what secret
- When it was accessed
- From which environment
- What operation was performed

---

## Resources

### Documentation

- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Resend Security](https://resend.com/docs/security)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

### Tools

- **Wrangler CLI**: Cloudflare Workers CLI tool
- **GitGuardian**: Secret scanning for repositories
- **1Password**: Team secret sharing (for non-API secrets)
- **Cloudflare Tunnel**: Secure local development

---

## Questions?

Contact the security team:

- **Email**: office@mhc-gc.com
- **Slack**: #security-team
- **Emergency**: matt@mhc-gc.com

---

**Remember:** The most secure secret is one that's never exposed. When in doubt, rotate.
