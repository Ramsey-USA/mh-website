# Namecheap Domain Setup Guide for MH Construction Website

## Overview

This guide will help you connect your Namecheap domain to your MH Construction website. Based on your project
configuration, you have two hosting options available.

## Option 1: Firebase Hosting Setup (Recommended)

### Step 1: Add Custom Domain in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your MH Construction project
3. Navigate to **Hosting** in the left sidebar
4. Click **Add custom domain**
5. Enter your domain: `mhc-gc.com`
6. Firebase will provide you with DNS records to configure

### Step 2: Configure DNS Records in Namecheap

#### A. Log into Namecheap

1. Go to [namecheap.com](https://www.namecheap.com)
2. Sign in to your account
3. Go to **Domain List** and click **Manage** next to your domain

#### B. Set up DNS Records

1. Click on the **Advanced DNS** tab
2. Delete any existing A records and CNAME records that point to parking pages
3. Add the following records (Firebase will provide the exact values):

**For Root Domain (mhc-gc.com):**

```
Type: A Record
Host: @
Value: [Firebase IP - provided by Firebase]
TTL: Automatic
```

**For WWW Subdomain:**

```
Type: CNAME
Host: www
Value: [Firebase domain - typically something like mh-construction-abc123.web.app]
TTL: Automatic
```

#### C. Verification Records (if required)

Firebase may ask you to add a TXT record for domain verification:

```
Type: TXT Record
Host: @
Value: [Verification string provided by Firebase]
TTL: Automatic
```

### Step 3: Deploy Your Website

Once DNS is configured, deploy your website:

```bash
# Build and deploy to Firebase
npm run build
npm run firebase:deploy

# Or use the configured script
npm run deploy:staging  # For staging
npm run deploy:production  # For production with Cloudflare
```

### Step 4: SSL Certificate

Firebase automatically handles SSL certificates for custom domains. This may take a few hours to provision.

---

## Option 2: Cloudflare Pages Setup (Alternative)

### Step 1: Set up Cloudflare

1. Create a [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. Add your domain `mhc-gc.com` to Cloudflare
3. Cloudflare will provide you with nameservers

### Step 2: Change Nameservers in Namecheap

1. In Namecheap, go to your domain management
2. Find the **Nameservers** section
3. Select **Custom DNS**
4. Add the Cloudflare nameservers (typically):

   ```
   luna.ns.cloudflare.com
   mark.ns.cloudflare.com
   ```

   (Use the actual nameservers provided by Cloudflare)

### Step 3: Configure Cloudflare Pages

1. In Cloudflare dashboard, go to **Pages**
2. Connect your GitHub repository
3. Set build command: `npm run build:cloudflare`
4. Set output directory: `out`
5. Add environment variables for Firebase

### Step 4: Deploy

```bash
# Deploy to Cloudflare
npm run deploy:production
```

---

## DNS Propagation and Verification

### Check DNS Propagation

Use these tools to verify your DNS changes:

- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://whatsmydns.net)
- Command line: `nslookup mhc-gc.com`

### Expected Timeline

- **DNS Propagation**: 24-48 hours (sometimes faster)
- **SSL Certificate**: 2-4 hours after DNS propagation
- **Full Setup**: Usually complete within 24 hours

---

## Recommended Configuration (Firebase Hosting)

Based on your current setup, I recommend **Firebase Hosting** because:

✅ **Already configured** in your project  
✅ **Automatic SSL** certificates  
✅ **Global CDN** included  
✅ **Easy deployment** with your existing scripts  
✅ **Integrated** with your Firebase backend services  

Your `firebase.json` is already optimized with:

- Caching headers for performance
- Security headers
- Rewrite rules for SPA routing

---

## Post-Setup Verification

### 1. Test Your Domain

After setup is complete, verify these work:

- `https://mhc-gc.com` (redirects to www)
- `https://www.mhc-gc.com` (canonical domain)
- All pages load correctly
- SSL certificate is active (green lock in browser)

### 2. Update Configuration Files

Update any hardcoded URLs in your project:

**Update environment variables:**

```bash
# In .env.local
NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com
```

**Update sitemap and robots.txt:**
Your `next.config.js` may need the site URL for SEO files.

### 3. Test All Features

Verify these work with your new domain:

- Authentication (Firebase Auth)
- Database operations (Firestore)
- File uploads (Firebase Storage)
- AI features and forms
- Contact forms and booking system

---

## Troubleshooting Common Issues

### DNS Not Propagating

- Wait 24-48 hours for full propagation
- Clear your browser cache
- Try accessing from a different network
- Use incognito/private browsing mode

### SSL Certificate Issues

- Ensure DNS is fully propagated first
- SSL certificates can take 2-4 hours after DNS propagation
- Contact Firebase support if SSL doesn't provision after 24 hours

### Website Not Loading

- Check DNS records are correct
- Verify Firebase hosting deployment is successful
- Check browser console for any errors
- Ensure all environment variables are set correctly

### Firebase Deployment Errors

```bash
# Re-authenticate if needed
firebase login

# Check project configuration
firebase projects:list

# Deploy with verbose logging
firebase deploy --debug
```

---

## Security Recommendations

### 1. Enable Security Features

Your `firebase.json` already includes excellent security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` for HTTPS enforcement

### 2. Firestore Security Rules

Ensure your Firebase security rules are properly configured:

```bash
# Deploy security rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### 3. Environment Variables

Never commit sensitive Firebase configuration to your repository. Use environment variables for:

- Firebase API keys
- Project IDs
- Service account keys

---

## Contact for Support

If you encounter any issues during setup:

**MH Construction Development Team**

- Email: <office@mhc-gc.com>
- Phone: (509) 308-6489

**Technical Resources:**

- Firebase Documentation: <https://firebase.google.com/docs/hosting>
- Namecheap DNS Guide: <https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain>
- Next.js Deployment: <https://nextjs.org/docs/deployment>

---

## Quick Reference Commands

```bash
# Development
npm run dev                    # Start local development

# Build and Deploy
npm run build                  # Build for production
npm run firebase:deploy        # Deploy to Firebase
npm run deploy:staging         # Deploy to staging environment

# Domain Verification
nslookup mhc-gc.com           # Check DNS resolution
curl -I https://www.mhc-gc.com    # Check website response

# Firebase Management
firebase login                 # Authenticate
firebase projects:list         # List projects
firebase hosting:sites:list    # List hosting sites
```

---

*Last updated: October 22, 2025 | MH Construction Development Team*
