# Admin Password Security Guide

## Rotating Default Credentials for Production

**Last Updated:** December 26, 2025  
**Priority:** 🔴 CRITICAL - Required before production deployment

---

## Overview

The MH Construction admin analytics system uses default passwords (`admin123`) for development convenience. **These MUST be changed before production deployment.**

### Current Admin Accounts

- **Matt**: `matt@mhc-gc.com` / `admin123` (default)
- **Jeremy**: `jeremy@mhc-gc.com` / `admin123` (default)

---

## 🚨 Why This Matters

**Default passwords are a CRITICAL security vulnerability:**

- Anyone can access admin analytics dashboard
- Exposes visitor data and business metrics
- Could lead to data manipulation
- Violates security compliance requirements
- Creates legal liability

**Timeline:**

- ✅ Development: Default passwords acceptable
- ⚠️ Staging: Should use custom passwords
- 🔴 **Production: MUST use strong passwords**

---

## Step-by-Step Password Rotation

### Step 1: Generate Strong Passwords (5 minutes)

Use a password manager or generate secure passwords:

```bash
# Generate secure random passwords (Linux/Mac)
openssl rand -base64 32

# Or use online generator (recommended)
# https://1password.com/password-generator/
```

**Requirements:**

- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- No dictionary words
- Unique for each admin
- Stored in password manager

**Example strong password format:**

```
Mh2025!Tr@nsf0rm#Secur3$Build
```

### Step 2: Update Cloudflare Workers Secrets (10 minutes)

#### Method A: Using Cloudflare Dashboard (Recommended)

1. Go to: <https://dash.cloudflare.com/>
2. Navigate to **Workers & Pages**
3. Select your deployment: `mh-construction`
4. Click **Settings** → **Environment Variables**
5. Add/Update variables for **Production**:

   ```
   Variable: ADMIN_MATT_PASSWORD
   Value: [your strong password for Matt]
   Encrypt: ✓ (check this box)

   Variable: ADMIN_JEREMY_PASSWORD
   Value: [your strong password for Jeremy]
   Encrypt: ✓ (check this box)
   ```

6. Click **Save** for each variable
7. **Redeploy** the application to apply changes

#### Method B: Using Wrangler CLI

```bash
# Install wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Set Matt's password
wrangler secret put ADMIN_MATT_PASSWORD
# Paste the strong password when prompted

# Set Jeremy's password
wrangler secret put ADMIN_JEREMY_PASSWORD
# Paste the strong password when prompted

# Verify secrets are set (shows names only, not values)
wrangler secret list
```

### Step 3: Store Passwords Securely (5 minutes)

**Do NOT:**

- ❌ Store in plain text files
- ❌ Send via email or Slack
- ❌ Write on sticky notes
- ❌ Save in browser autofill
- ❌ Commit to Git

**Do:**

- ✅ Use a password manager (1Password, Bitwarden, LastPass)
- ✅ Share via encrypted password manager
- ✅ Keep in secure note with MFA
- ✅ Document in secure company vault

**Recommended: 1Password Team Setup**

```
Vault: MH Construction Admin
Item: Admin Analytics Dashboard
Fields:
  - Matt's Email: matt@mhc-gc.com
  - Matt's Password: [secure password]
  - Jeremy's Email: jeremy@mhc-gc.com
  - Jeremy's Password: [secure password]
  - Dashboard URL: https://mhc-gc.com/dashboard
  - Access Method: Triple-click footer copyright
```

### Step 4: Test the New Passwords (5 minutes)

1. **Clear browser storage:**

   ```javascript
   // Open browser console on any page
   localStorage.clear();
   ```

2. **Test Matt's login:**
   - Triple-click footer copyright
   - Enter: `matt@mhc-gc.com`
   - Enter: [new password]
   - Should successfully access dashboard

3. **Test Jeremy's login:**
   - Log out from Matt's account
   - Triple-click footer copyright
   - Enter: `jeremy@mhc-gc.com`
   - Enter: [new password]
   - Should successfully access dashboard

4. **Verify analytics data loads:**
   - Check all dashboard sections display
   - Test logout functionality
   - Confirm no console errors

### Step 5: Document the Change (5 minutes)

Update internal documentation:

1. **In 1Password/Password Manager:**
   - Update credentials
   - Add note: "Changed from default on [date]"
   - Set reminder: "Rotate in 90 days"

2. **In SECURITY-INCIDENT-RESPONSE.md:**
   - Mark admin password rotation as complete
   - Document change date
   - Set next rotation date

3. **Notify Team:**
   - Email Matt and Jeremy with password manager link
   - Document access instructions
   - Provide emergency contact info

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Strong passwords generated (16+ characters)
- [ ] Passwords stored in team password manager
- [ ] `ADMIN_MATT_PASSWORD` set in Cloudflare Workers
- [ ] `ADMIN_JEREMY_PASSWORD` set in Cloudflare Workers
- [ ] Passwords tested successfully on staging
- [ ] Old default passwords no longer work
- [ ] Team members notified of new credentials
- [ ] Next rotation scheduled (90 days)
- [ ] Emergency access procedure documented

---

## Ongoing Security

### Regular Rotation Schedule

**Every 90 days:**

1. Generate new strong passwords
2. Update Cloudflare Workers secrets
3. Update password manager
4. Test new credentials
5. Notify team

**Set calendar reminders:**

- Initial change: Before production deployment
- First rotation: 90 days after production
- Quarterly thereafter

### Monitoring

Monitor for suspicious activity:

- Failed login attempts (>3 in 5 minutes)
- Logins from unusual locations
- Off-hours access (nights/weekends)
- Multiple concurrent sessions

**View logs in Cloudflare:**

1. Dashboard → Workers & Pages → [your app]
2. Select **Logs** tab
3. Filter for `/api/auth/admin-login`
4. Review for anomalies

### Emergency Password Reset

If passwords are compromised:

1. **Immediate (within 5 minutes):**

   ```bash
   # Generate new passwords immediately
   openssl rand -base64 32

   # Update in Cloudflare
   wrangler secret put ADMIN_MATT_PASSWORD
   wrangler secret put ADMIN_JEREMY_PASSWORD

   # Force redeploy
   wrangler deploy --env production
   ```

2. **Investigation (within 1 hour):**
   - Review access logs
   - Check for unauthorized data access
   - Document incident
   - Notify security team

3. **Follow-up (within 24 hours):**
   - Complete security audit
   - Review all admin accounts
   - Update security procedures
   - Consider additional MFA

---

## Best Practices

### Password Strength

**Strong Password Example:**

```
Mh2025#Analytics!Dashboard$Secure
```

**Characteristics:**

- 36 characters long
- Contains uppercase: M, A, D, S
- Contains lowercase: h, n, a, l, y, t, i, c, s, etc.
- Contains numbers: 2, 0, 2, 5
- Contains symbols: #, !, $
- No dictionary words
- Unique to this application

**Weak Password Examples (NEVER USE):**

```
❌ admin123          - Too short, dictionary word
❌ Password123!      - Common pattern
❌ MH2025            - Too short, predictable
❌ matt@mhc-gc.com   - Based on email
❌ Construction1!    - Dictionary word
```

### Access Control

**Principle of Least Privilege:**

- Only Matt and Jeremy have admin access
- No shared accounts
- No "admin" or "root" accounts
- Each person has individual credentials

**Audit Trail:**

- All logins are logged
- JWT tokens track user identity
- Session duration: 1 hour
- Activity monitoring enabled

---

## Code References

The admin authentication is implemented in:

1. **Admin Login Route**
   - File: [`src/app/api/auth/admin-login/route.ts`](../../src/app/api/auth/admin-login/route.ts)
   - Lines 13-26: ADMIN_USERS array
   - Environment variables: `ADMIN_MATT_PASSWORD`, `ADMIN_JEREMY_PASSWORD`

2. **Admin Sign-In Modal**
   - File: [`src/components/ui/modals/AdminSignInModal.tsx`](../../src/components/ui/modals/AdminSignInModal.tsx)
   - Handles login form and authentication

3. **Dashboard Page**
   - File: [`src/app/dashboard/page.tsx`](../../src/app/dashboard/page.tsx)
   - Protected route with authentication check

**Default password logic:**

```typescript
// src/app/api/auth/admin-login/route.ts
const ADMIN_USERS = [
  {
    email: "matt@mhc-gc.com",
    name: "Matt",
    // Falls back to "admin123" if not set
    passwordHash: process.env.ADMIN_MATT_PASSWORD || "admin123",
  },
  // ...
];
```

---

## Troubleshooting

### Issue: New password not working

**Solution:**

1. Clear browser localStorage
2. Verify Cloudflare Workers secret is set
3. Check for typos in environment variable name
4. Redeploy application: `wrangler deploy`
5. Wait 1-2 minutes for changes to propagate

### Issue: Forgot the new password

**Solution:**

1. Check team password manager (1Password)
2. If unavailable, reset in Cloudflare Workers
3. Generate new password and update secrets
4. Test immediately

### Issue: Getting authentication errors

**Solution:**

1. Check browser console for error messages
2. Verify JWT_SECRET is configured
3. Check Cloudflare Workers logs
4. Ensure secrets aren't using default values
5. Contact development team if persists

---

## Support

### Internal Contacts

**Primary:**

- Matt: <matt@mhc-gc.com>
- Office: <office@mhc-gc.com>
- Phone: (509) 308-6489

**For Security Issues:**

- Email: <office@mhc-gc.com>
- Subject: "URGENT: Admin Security Issue"
- Include: What happened, when, who's affected

### External Resources

- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [1Password for Teams](https://1password.com/teams/)

---

## Quick Reference

### Production Deployment Commands

```bash
# Set admin passwords
wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD

# Verify
wrangler secret list

# Deploy
wrangler deploy --env production
```

### Password Requirements

- **Length:** 16+ characters (recommended: 20-30)
- **Complexity:** Upper, lower, numbers, symbols
- **Uniqueness:** Not used elsewhere
- **Rotation:** Every 90 days
- **Storage:** Password manager only

### Access Method

1. Go to: <https://mhc-gc.com>
2. Scroll to footer
3. Triple-click on "2025 MH Construction, Inc."
4. Enter admin credentials
5. Access analytics dashboard

---

**Last Password Rotation:** _[To be filled in after initial change]_  
**Next Scheduled Rotation:** _[90 days from last rotation]_  
**Rotation Owner:** Matt (<matt@mhc-gc.com>)

---

**Remember:** Strong passwords + regular rotation = secure admin access. Never compromise on security to save time.
