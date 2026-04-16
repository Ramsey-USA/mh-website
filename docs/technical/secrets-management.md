# Secrets Management Guide

## Secure Handling of API Keys and Credentials

**Last Updated:** April 15, 2026

---

## Overview

This guide establishes standards for managing sensitive information like API
keys, database credentials, and authentication tokens.

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
wrangler secret put EMAIL_FROM
wrangler secret put JWT_SECRET
wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD
wrangler secret put TWILIO_ACCOUNT_SID
wrangler secret put TWILIO_AUTH_TOKEN
wrangler secret put TWILIO_FROM_NUMBER

# Error Tracking (Sentry)
wrangler secret put NEXT_PUBLIC_SENTRY_DSN  # Client-side (browser)
wrangler secret put SENTRY_DSN              # Server-side (API routes)
```

> **Note:** D1 database IDs are configured as `[[d1_databases]]` bindings in
> `wrangler.toml`, not as runtime secrets.

---

## Secret Categories

### Public Secrets (Safe to Expose)

These can be in public code:

- Google Analytics measurement IDs
- Public endpoints
- Feature flags

```typescript
// OK in public code
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
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

wrangler secret put JWT_SECRET
# Enter a 48-byte hex string (generate: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")

wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD

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

- Sign up at: <https://resend.com>
- Create API key at: <https://resend.com/api-keys>
- Verify domain: <https://resend.com/domains>

### Cloudflare D1 Database

D1 database IDs are **not** runtime secrets — they are configured as
`[[d1_databases]]` bindings in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "mh-construction-db"
database_id = "98ad144a-cfe2-4f19-a55c-c43140279840"
```

**Where to get:**

- Cloudflare Dashboard → Workers & Pages → D1
- Database IDs are visible in the dashboard after creation

### Google Analytics (Optional)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Where to get:**

- Google Analytics: <https://analytics.google.com>
- Admin → Data Streams → Measurement ID

> **Note:** This project primarily uses a custom analytics pipeline
> (localStorage client-side + Cloudflare KV server-side). Google Analytics
> is optional and only needed if dual-tracking is desired.

---

## GitHub Actions Repository Secrets

GitHub Actions workflows use **repository secrets** — these are separate from
Cloudflare dashboard secrets and `wrangler.toml` bindings.

### Active Secrets (Used in Workflows)

| Secret                    | Type      | Workflow                             | Purpose                                           |
| ------------------------- | --------- | ------------------------------------ | ------------------------------------------------- |
| `ADMIN_JEREMY_PASSWORD`   | Secret    | deployment                           | Admin dashboard login for Jeremy                  |
| `ADMIN_MATT_PASSWORD`     | Secret    | deployment                           | Admin dashboard login for Matt                    |
| `CLOUDFLARE_ACCOUNT_ID`   | Secret    | `generate-pdfs.yml`                  | Authenticates wrangler for R2 uploads             |
| `CLOUDFLARE_API_TOKEN`    | Secret    | `generate-pdfs.yml`                  | Authenticates wrangler for R2 uploads             |
| `EMAIL_FROM`              | Secret    | deployment                           | Resend sender address                             |
| `FIELD_STAFF_PASSWORD`    | Secret    | `safety-smoke.yml` / deployment      | Safety Hub superintendent login                   |
| `JWT_SECRET`              | Secret    | deployment                           | HMAC key for signing admin session tokens         |
| `LIGHTHOUSE_REPORT_EMAIL` | Secret    | `lighthouse-weekly.yml`              | Recipient address for weekly Lighthouse reports   |
| `N8N_WEBHOOK_URL`         | Secret    | deployment                           | n8n automation webhook endpoint                   |
| `NEXT_PUBLIC_SENTRY_DSN`  | Secret    | `ci-cd.yml` (build) / deployment     | Sentry DSN baked into client bundle at build time |
| `NEXT_PUBLIC_SITE_URL`    | Plaintext | `ci-cd.yml`                          | Canonical site URL (`https://www.mhc-gc.com`)     |
| `RESEND_API_KEY`          | Secret    | `lighthouse-weekly.yml` / deployment | Resend API key for outbound email                 |
| `SENTRY_DSN`              | Secret    | deployment                           | Sentry DSN for server-side API route tracking     |
| `SNYK_TOKEN`              | Secret    | `snyk.yml`                           | Authenticates Snyk vulnerability scanner          |
| `TURNSTILE_SECRET_KEY`    | Secret    | deployment                           | Cloudflare Turnstile secret for bot protection    |
| `TWILIO_AUTH_TOKEN`       | Secret    | deployment                           | Twilio auth token for SMS notifications           |
| `TWILIO_FROM_NUMBER`      | Secret    | deployment                           | Twilio sender phone number                        |

### Safety Smoke Secrets (Optional)

The `safety-smoke.yml` workflow supports authenticated smoke tests against
production. These secrets are optional — the workflow defaults to empty strings
and the authenticated job only runs when explicitly triggered.

| Secret                            | Purpose                              |
| --------------------------------- | ------------------------------------ |
| `SAFETY_SMOKE_FIELD_PASSCODE`     | Field/worker portal authentication   |
| `SAFETY_SMOKE_ADMIN_EMAIL`        | Admin login for authenticated probes |
| `SAFETY_SMOKE_ADMIN_PASSWORD`     | Admin login for authenticated probes |
| `SAFETY_SMOKE_USER_BEARER_TOKEN`  | User-level bearer token (fallback)   |
| `SAFETY_SMOKE_ADMIN_BEARER_TOKEN` | Admin-level bearer token (fallback)  |
| `SAFETY_SMOKE_JWT_SECRET`         | JWT signing/verification (fallback)  |

> **Note:** Cloudflare resource IDs (D1 database, KV namespaces, R2 buckets)
> are configured as bindings in `wrangler.toml`, not as GitHub secrets.
> Do not duplicate these IDs into repository secrets.

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

| Secret Type          | Rotation Frequency | Responsible   |
| -------------------- | ------------------ | ------------- |
| Resend API Key       | Every 90 days      | DevOps Team   |
| Admin Passwords      | Every 60 days      | Security Team |
| JWT Signing Key      | Every 180 days     | Backend Team  |
| Twilio Auth Token    | Every 90 days      | DevOps Team   |
| Cloudflare API Token | As needed          | DevOps Team   |

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

See security documentation for detailed incident response procedures.

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
wrangler secret put EMAIL_FROM
wrangler secret put JWT_SECRET
wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD
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

- **Email**: <office@mhc-gc.com>
- **Slack**: #security-team
- **Emergency**: <matt@mhc-gc.com>

---

**Remember:** The most secure secret is one that's never exposed. When in doubt, rotate.
