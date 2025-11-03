# Cloudflare Pages Setup Guide

## 🚀 Overview

This guide covers deploying the MH Construction Next.js website to Cloudflare Pages with full
optimization for performance and security.

## Why Cloudflare Pages?

- **Global CDN**: Instant worldwide content delivery
- **Zero Configuration**: Automatic deployments from Git
- **Built-in DDoS Protection**: Enterprise-grade security
- **Serverless Functions**: Edge computing at scale
- **Free SSL/TLS**: Automatic HTTPS certificates
- **Unlimited Bandwidth**: No bandwidth charges
- **Fast Builds**: Sub-minute deployment times

## Prerequisites

- Cloudflare account (free tier works great)
- GitHub/GitLab repository
- Node.js 18+ installed locally
- Domain name (optional, Cloudflare provides free subdomain)

## Step 1: Prepare Your Next.js Project

Your project is already configured for Cloudflare Pages! The `next.config.js` uses
`output: "standalone"` which is compatible with Cloudflare.

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=https://mhc-gc.com
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```text

## Step 2: Create Cloudflare Pages Project

### Via Dashboard (Recommended)

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create application** → **Pages**
3. Connect your Git repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (or your project root)
   - **Node version**: 18 or higher

**Note**: Some API routes that use Node.js features (file system, etc.) may need to be refactored
to work with Cloudflare's Edge Runtime or moved to static generation.

### Via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build:cloudflare
npm run pages:deploy
```text

## Step 3: Configure Build Settings

In your Cloudflare Pages project settings:

### Environment Variables (Production)

Add these in **Settings** → **Environment Variables**:

```text
NEXT_PUBLIC_SITE_URL=https://mhc-gc.com
NODE_VERSION=18
```text

### Build Configuration

```yaml
Build command: npx @cloudflare/next-on-pages@1
Build output directory: .vercel/output/static
Root directory: /
Environment variables: Node 18+
```text

## Step 4: Set Up Custom Domain

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `mhc-gc.com`
4. Follow DNS configuration steps:
   - Add CNAME record pointing to your Pages project
   - Or use Cloudflare nameservers for full management

### DNS Records

If your domain is already on Cloudflare:

```text
Type: CNAME
Name: @ (or www)
Target: your-project.pages.dev
Proxy: Enabled (orange cloud)
```text

## Step 5: Configure Security

### Firewall Rules

Create firewall rules in Cloudflare Dashboard:

1. **Block Known Bots**
   - Expression: `(cf.client.bot)`
   - Action: Block

2. **Rate Limiting**
   - Expression: `(http.request.uri.path contains "/api/")`
   - Action: Rate limit (10 requests per 10 seconds)

3. **Country-based Access** (optional)
   - Block or challenge traffic from specific countries

### Security Headers

Already configured in `next.config.js`:

- Content Security Policy (CSP)
- HSTS
- X-Frame-Options
- X-Content-Type-Options

## Step 6: Enable Performance Features

### Cloudflare Caching

1. Go to **Caching** → **Configuration**
2. Set **Browser Cache TTL**: Respect Existing Headers
3. Enable **Always Online**
4. Enable **Development Mode** when testing (disables caching)

### Image Optimization

Cloudflare automatically optimizes images with:

- WebP/AVIF conversion
- Responsive sizing
- Lazy loading

Enable in **Speed** → **Optimization**:

- ✅ Auto Minify (JS, CSS, HTML)
- ✅ Brotli compression
- ✅ Early Hints
- ✅ HTTP/3 (QUIC)

### Argo Smart Routing (Optional, Paid)

Reduces latency by up to 30% by routing traffic through Cloudflare's fastest paths.

## Step 7: Set Up Cloudflare D1 Database (Optional)

For dynamic data storage:

```bash
# Create D1 database
wrangler d1 create mh-construction-db

# Run migrations
wrangler d1 execute mh-construction-db --file=./schema.sql
```text

### Example Schema

```sql
CREATE TABLE consultations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

CREATE TABLE job_applications (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  position TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new'
);
```text

## Step 8: Set Up Cloudflare KV (Optional)

For caching and key-value storage:

```bash
# Create KV namespace
wrangler kv:namespace create "CACHE"

# Bind to your Pages project
# Add in wrangler.toml or Pages dashboard
```text

## Step 9: Deploy

### Automatic Deployment (Recommended)

Push to your Git repository:

```bash
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```text

Cloudflare automatically builds and deploys!

### Manual Deployment

```bash
# Build locally
npm run build

# Deploy with Wrangler
npm run pages:deploy
```text

## Step 10: Verify Deployment

1. Visit your Pages URL: `https://your-project.pages.dev`
2. Test custom domain: `https://mhc-gc.com`
3. Check SSL certificate (should be automatic)
4. Test performance with [PageSpeed Insights](https://pagespeed.web.dev/)

### Expected Performance

- **Lighthouse Score**: 90-100
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Total Blocking Time**: < 200ms

## Monitoring & Analytics

### Cloudflare Analytics

View in **Analytics** → **Web Analytics**:

- Page views and visits
- Geographic distribution
- Top pages and referrers
- Performance metrics

### Real User Monitoring

Enable in **Speed** → **Optimization**:

- Core Web Vitals
- Browser insights
- Device breakdown

### Logs

View deployment logs in **Pages** → **View build log**

## Troubleshooting

### Build Fails

**Issue**: Build command fails
**Solution**:

```bash
# Check Node version
NODE_VERSION=18 npm run build

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```text

### Domain Not Working

**Issue**: Custom domain shows error
**Solution**:

1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Ensure SSL/TLS mode is "Full (Strict)"

### 522 Errors

**Issue**: Connection timed out
**Solution**:

1. Check if build output directory is correct (`.next`)
2. Verify `output: "standalone"` in `next.config.js`
3. Review build logs for errors

### API Routes Not Working

**Issue**: API routes return 404
**Solution**:

- Next.js API routes work automatically with Cloudflare Pages
- Verify routes are in `src/app/api/`
- Check function logs in Cloudflare dashboard

## Best Practices

### Performance

1. **Use Static Generation** where possible
2. **Optimize Images**: Use Next.js Image component
3. **Enable Caching**: Set appropriate cache headers
4. **Minimize JavaScript**: Code splitting and tree shaking
5. **Use CDN**: Leverage Cloudflare's global network

### Security

1. **Enable WAF**: Web Application Firewall rules
2. **Set CSP Headers**: Content Security Policy
3. **Rate Limiting**: Protect API endpoints
4. **Bot Protection**: Challenge or block malicious bots
5. **SSL/TLS**: Always use "Full (Strict)" mode

### Cost Optimization

1. **Use Free Tier**: More than enough for most sites
2. **Optimize Builds**: Reduce build times
3. **Cache Aggressively**: Reduce origin requests
4. **Image Optimization**: Saves bandwidth

## Advanced Configuration

### Branch Deployments

Every Git branch gets a unique preview URL:

- `main` → Production
- `staging` → `staging.your-project.pages.dev`
- `feature-x` → `feature-x.your-project.pages.dev`

### Environment-Specific Settings

Configure different settings per environment in Cloudflare dashboard.

### Webhook Notifications

Set up webhooks for:

- Deployment success/failure
- Build completion
- Security alerts

## Useful Commands

```bash
# Development
npm run dev

# Build for Cloudflare
npm run build:cloudflare

# Deploy to Cloudflare Pages
npm run pages:deploy

# View logs
wrangler pages deployment tail

# Check project status
wrangler pages project list
```text

## Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Support Forum](https://community.cloudflare.com/)

## Getting Help

- **Cloudflare Community**: [community.cloudflare.com](https://community.cloudflare.com)
- **Discord**: [Cloudflare Developers Discord](https://discord.gg/cloudflaredev)
- **Status**: [www.cloudflarestatus.com](https://www.cloudflarestatus.com)

---

**Status**: ✅ **READY FOR DEPLOYMENT**

Your MH Construction website is fully configured and ready to deploy to Cloudflare Pages!
