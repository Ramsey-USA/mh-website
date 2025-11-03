# Cloudflare Pages Build Settings - EXACT Configuration Required

## 🚨 CRITICAL: Build Settings Must Be Configured EXACTLY As Shown

The error you're experiencing means Cloudflare Pages is **not using the correct build command**. Follow these steps EXACTLY:

---

## Step 1: Access Build Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Select your project: **mh-construction**
4. Click **Settings** tab
5. Scroll to **Builds & deployments** section
6. Click **Edit** next to "Build configuration"

---

## Step 2: Configure Build Settings EXACTLY

### ⚡ Framework preset

```
Next.js
```

### ⚡ Build command (CRITICAL - Must be EXACT)

```
npx @cloudflare/next-on-pages@1
```

**DO NOT USE:**

- ❌ `npm run build`
- ❌ `next build`
- ❌ `npm run build:cloudflare` (this won't work in Cloudflare environment)

### ⚡ Build output directory

```
.vercel/output/static
```

### ⚡ Root directory

```
(leave blank or use: /)
```

### ⚡ Environment variables

Add these in the **Environment variables** section (click "Add variable"):

```
NODE_VERSION = 18.18.0
```

```
NEXT_PUBLIC_SITE_URL = https://mhc-gc.com
```

---

## Step 3: Clear Build Cache

After updating the settings:

1. Go to **Deployments** tab
2. Click **•••** (three dots) on the latest deployment
3. Select **Retry deployment**
4. Check **Clear build cache** ✅
5. Click **Retry deployment**

---

## Step 4: Verify Build Output

During deployment, watch the build logs. You should see:

```
⚡️ @cloudflare/next-on-pages CLI v.1.13.16
⚡️ Preparing project...
⚡️ Project is ready
⚡️ Building project...
▲  Next.js 15.5.2
▲  Build Completed in .vercel/output [~60s]
⚡️ Completed `npx vercel build`.

⚡️ Build Summary (@cloudflare/next-on-pages v1.13.16)
⚡️ 
⚡️ Edge Function Routes (14)
⚡️   ┌ /api/consultations
⚡️   ├ /api/consultations/[id]
⚡️   ├ /api/content/core-values
⚡️   ├ /api/content/services
⚡️   ├ /api/content/team
⚡️   ├ /api/functions/[functionName]
⚡️   ├ /api/job-applications
⚡️   ├ /api/notifications/send
⚡️   ├ /api/notifications/subscribe
⚡️   ├ /api/notifications/unsubscribe
⚡️   ├ /api/security/cloudflare
⚡️   ├ /api/security/events
⚡️   └ /api/security/status
```

---

## Why This Happens

### The Problem

Cloudflare Pages defaults to running **`next build`** which creates a standard Next.js build. Then `@cloudflare/next-on-pages` tries to validate it and fails because the routes were built for Node.js runtime instead of Edge Runtime.

### The Solution

By using **`npx @cloudflare/next-on-pages@1`** as the build command, it:

1. Automatically runs `npx vercel build` (which is Next.js build compatible with Cloudflare)
2. Validates that all routes use Edge Runtime
3. Generates the correct output for Cloudflare Pages
4. Creates the `_worker.js` bundle for edge execution

---

## Common Mistakes to Avoid

### ❌ Wrong Build Command

```bash
# DON'T use these:
npm run build              # Runs next build directly
next build                 # Standard Next.js build
npm run build:cloudflare   # npm scripts don't work in Cloudflare
```

### ✅ Correct Build Command

```bash
# USE THIS:
npx @cloudflare/next-on-pages@1
```

---

## If It Still Fails

### 1. Check Node Version

Ensure `NODE_VERSION` environment variable is set to `18.17.0` or higher.

### 2. Check Build Cache

Clear the build cache and retry:

- Deployments → Latest deployment → ••• → Retry deployment
- Check ✅ **Clear build cache**

### 3. Check Git Branch

Ensure you're deploying from the correct branch:

- Settings → Builds & deployments → Production branch
- Should be: `main`

### 4. Check for Git Submodules

If you have git submodules, they might cause issues:

- Settings → Builds & deployments
- Enable: ✅ **Initialize Git submodules**

### 5. Manual Deploy (Bypass Cache)

If automated deploys still fail:

```bash
# On your local machine
npm install -g wrangler
wrangler login
npm run build:cloudflare
npx wrangler pages deploy .vercel/output/static --project-name=mh-construction
```

---

## Expected Build Time

- **First build**: 60-90 seconds
- **Cached builds**: 30-45 seconds
- **Optimization phase**: ~3 seconds

---

## Success Indicators

### ✅ Build Succeeds When You See

```
⚡️ Edge Function Routes (14)
⚡️ Build completed in 2.79s
✨ Compiled Worker successfully
✨ Uploading Worker bundle
✨ Deployment complete!
```

### ❌ Build Fails When You See

```
⚡️ The following routes were not configured to run with the Edge Runtime:
⚡️   - /api/consultations
⚡️   (etc...)
```

**This means**: The build command is wrong in Cloudflare settings.

---

## Contact Support

If you've followed these steps exactly and it still fails:

1. **Screenshot** your exact build settings in Cloudflare Dashboard
2. **Copy** the full build log from the failed deployment
3. Share in Discord or open a GitHub issue

The most common issue is **not using the exact build command** shown above.

---

## Quick Checklist

- [ ] Build command is EXACTLY: `npx @cloudflare/next-on-pages@1`
- [ ] Build output directory is: `.vercel/output/static`
- [ ] Environment variable `NODE_VERSION=18.17.0` is set
- [ ] Build cache has been cleared
- [ ] Deploying from `main` branch
- [ ] All API routes have `export const runtime = "edge"` ✅ (already done)
- [ ] All API routes have `export const dynamic = "force-dynamic"` ✅ (already done)

---

**Last Updated**: November 2, 2025  
**Status**: Build works locally ✅ - Configuration needed in Cloudflare Dashboard  
**Next.js Version**: 15.5.2  
**Adapter Version**: @cloudflare/next-on-pages@1.13.16
