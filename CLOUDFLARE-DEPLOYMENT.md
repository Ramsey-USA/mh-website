# Cloudflare Pages Deployment Guide

## MH Construction - Complete Cloudflare Pages Setup & Deployment

This guide covers everything needed to deploy the MH Construction website to Cloudflare Pages with Edge Runtime compatibility.

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Cloudflare account (free tier works)
Git repository connected to Cloudflare
```

### One-Command Deploy

```bash
# Install dependencies and build for Cloudflare
npm install
npm run build:cloudflare

# Deploy to Cloudflare Pages
npm run pages:deploy
```

## 📋 Table of Contents

- [Environment Setup](#environment-setup)
- [Build Configuration](#build-configuration)
- [Cloudflare Dashboard Setup](#cloudflare-dashboard-setup)
- [Edge Runtime Compatibility](#edge-runtime-compatibility)
- [Deployment Methods](#deployment-methods)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Environment Setup

### 1. Environment Variables

Create `.env.local` from the template:

```bash
cp .env.local.example .env.local
```

Required variables for production:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://mhc-gc.com
NEXT_PUBLIC_SITE_NAME=MH Construction

# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_ZONE_ID=your_zone_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Get Cloudflare Credentials

**Account ID & Zone ID:**

1. Log into Cloudflare Dashboard
2. Select your website
3. Scroll down on Overview page to find:
   - **Account ID**: Right sidebar
   - **Zone ID**: Right sidebar under API section

**API Token:**

1. Go to "My Profile" → "API Tokens"
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Add permissions:
   - Account - Cloudflare Pages: Edit
   - Zone - DNS: Edit (for custom domains)
5. Click "Continue to summary" → "Create Token"
6. Copy the token (you won't see it again!)

---

## ⚙️ Build Configuration

### Next.js Configuration

The `next.config.js` is already optimized for Cloudflare Pages:

```javascript
// Edge Runtime compatible
// Optimized for @cloudflare/next-on-pages
// No Node.js APIs in edge routes
```

### Package Scripts

```json
{
  "build:cloudflare": "npx @cloudflare/next-on-pages@1",
  "pages:deploy": "npm run build:cloudflare && npx wrangler pages deploy .vercel/output/static --project-name=mh-construction",
  "deploy:production": "npm run build:cloudflare && npm run pages:deploy"
}
```

---

## 🌐 Cloudflare Dashboard Setup

### Automatic Deployment (Recommended)

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Click "Create application" → "Pages" → "Connect to Git"
   - Authorize GitHub/GitLab and select your repository

2. **Build Settings**

   ```text
   Framework preset: Next.js
   Build command: npx @cloudflare/next-on-pages@1
   Build output directory: .vercel/output/static
   Root directory: (leave blank)
   ```

3. **Environment Variables**
   Add in Cloudflare Dashboard → Pages → Settings → Environment Variables:

   ```text
   NEXT_PUBLIC_SITE_URL=https://mhc-gc.com
   NODE_VERSION=18
   ```

4. **Branch Configuration**
   - Production branch: `main`
   - Preview branches: All branches (optional)

### Manual Deployment

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy manually
npm run build:cloudflare
npx wrangler pages deploy .vercel/output/static --project-name=mh-construction
```

---

## ⚡ Edge Runtime Compatibility

### What's Already Fixed

✅ **All API routes** have `export const runtime = "edge"`
✅ **Middleware** uses Web-standard APIs (no Buffer, no Node.js APIs)
✅ **Security middleware** uses `btoa()` instead of Buffer
✅ **No fs/path imports** in edge execution paths

### Edge-Compatible APIs Used

- `crypto.getRandomValues()` - Random number generation
- `btoa()` - Base64 encoding
- `fetch()` - HTTP requests
- `Response`, `Request` - Web standard APIs
- `Headers` - Web standard headers

### What to Avoid in Edge Routes

❌ `fs` - File system access
❌ `path` - Path manipulation
❌ `Buffer` - Node.js buffer
❌ `process.cwd()` - Current directory
❌ `child_process` - Process spawning

---

## 🚀 Deployment Methods

### Method 1: GitHub Integration (Easiest)

```bash
# Just push to GitHub
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main

# Cloudflare automatically builds and deploys
```

### Method 2: Wrangler CLI

```bash
# One-time setup
npm install -g wrangler
wrangler login

# Deploy
npm run deploy:production
```

### Method 3: npm Scripts

```bash
# Build only
npm run build:cloudflare

# Build and deploy
npm run pages:deploy
```

---

## 🌍 Custom Domain Setup

### 1. Add Domain in Cloudflare Pages

1. Go to Pages project → "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain: `mhc-gc.com`
4. Cloudflare will provide DNS records

### 2. Configure DNS

If domain is already on Cloudflare:

- DNS records are added automatically
- Wait 5-10 minutes for propagation

If domain is external (e.g., Namecheap):

1. Go to domain registrar
2. Change nameservers to Cloudflare's:

   ```text
   alfred.ns.cloudflare.com
   luna.ns.cloudflare.com
   ```

3. Wait 24-48 hours for nameserver propagation

### 3. SSL/TLS Setup

Cloudflare provides free SSL automatically:

- **Full (strict)** recommended for production
- Certificate provisions in 5-15 minutes
- Auto-renewal enabled

### 4. Add www Subdomain

1. Add another custom domain: `www.mhc-gc.com`
2. Or create redirect rule:
   - From: `www.mhc-gc.com`
   - To: `mhc-gc.com`
   - Status: 301 Permanent

---

## 🔍 Troubleshooting

### Build Fails with "Edge Runtime" Error

**Cause**: Node.js APIs used in edge routes

**Solution**:

```bash
# Check for incompatible imports
grep -r "from 'fs'" src/app/api/
grep -r "from 'path'" src/app/api/

# All API routes must have:
export const runtime = "edge";
```

### "Buffer is not defined" Error

**Cause**: Using Node.js Buffer in edge runtime

**Solution**: Already fixed in middleware, but if you see it:

```typescript
// ❌ Don't use
const b64 = Buffer.from(data).toString('base64');

// ✅ Use this instead
const binary = String.fromCharCode(...new Uint8Array(data));
const b64 = btoa(binary);
```

### Build Succeeds but Pages Don't Load

**Check**:

1. Build output directory is correct: `.vercel/output/static`
2. All environment variables are set in Cloudflare Dashboard
3. Check Cloudflare Pages build logs for errors

### Custom Domain Not Working

**Check**:

1. DNS propagation: `dig mhc-gc.com` or use [whatsmydns.net](https://whatsmydns.net)
2. SSL certificate status in Cloudflare Dashboard
3. Wait 5-15 minutes for initial SSL provisioning

### API Routes Return 500 Error

**Check**:

1. All routes have `export const runtime = "edge"`
2. No Node.js APIs used (fs, path, Buffer)
3. Check Cloudflare Pages → Functions logs for errors

---

## Performance Optimization

### Performance Features

✅ **Edge Runtime** - Runs at CDN edge, near users
✅ **Smart Caching** - Static assets cached globally
✅ **Image Optimization** - Next.js Image component
✅ **Code Splitting** - Automatic chunk splitting
✅ **Compression** - Brotli/gzip enabled

### Monitoring Performance

```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://mhc-gc.com --view

# Check Core Web Vitals
# Use Chrome DevTools → Lighthouse → Performance
```

---

## Security Best Practices

### Security Features

✅ **CSP Headers** - Content Security Policy in middleware
✅ **HSTS** - HTTP Strict Transport Security
✅ **XSS Protection** - X-XSS-Protection header
✅ **Frame Options** - X-Frame-Options: DENY
✅ **Edge Runtime** - Isolated execution environment

### Additional Security

**Enable Cloudflare Security Features**:

1. **WAF (Web Application Firewall)** - Enable managed rules
2. **Bot Protection** - Block malicious bots
3. **DDoS Protection** - Automatic mitigation
4. **Rate Limiting** - Prevent abuse (requires Workers)

---

## 📚 Additional Resources

### Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Edge Runtime Docs](https://nextjs.org/docs/app/api-reference/edge)

### Monitoring

- [Cloudflare Analytics](https://dash.cloudflare.com) - Built-in analytics
- [Google Analytics](https://analytics.google.com) - Detailed user tracking
- [Web Vitals](https://web.dev/vitals/) - Performance metrics

### Support

- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.cloudflare.com/)
- [MH Construction Support](mailto:office@mhc-gc.com)

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured in Cloudflare Dashboard
- [ ] Custom domain added and DNS configured
- [ ] SSL certificate provisioned (wait 5-15 min)
- [ ] Test build locally: `npm run build:cloudflare`
- [ ] All API routes have `export const runtime = "edge"`
- [ ] No Node.js APIs in edge routes
- [ ] Git repository connected to Cloudflare Pages
- [ ] Production branch set to `main`
- [ ] Test deployment URL works
- [ ] Custom domain resolves correctly
- [ ] SSL certificate active (https:// works)
- [ ] Check Lighthouse score (aim for 90+)

---

**Last Updated**: November 2, 2025  
**Platform**: Cloudflare Pages  
**Framework**: Next.js 15.5.2  
**Runtime**: Edge Runtime  

## Ready to Deploy

Your website is now configured and ready for Cloudflare Pages deployment! 🚀
