# Cloudflare Edge Optimization Configuration

## Email Protection Script Deferral

To prevent the `email-decode.min.js` script from blocking initial render, configure
Cloudflare Email Address Obfuscation settings:

### In Cloudflare Dashboard

1. Navigate to **Speed** → **Optimization**
2. Under **Content Optimization**, locate **Email Address Obfuscation**
3. Ensure it's enabled but add the following to your page rules or Workers:

### Option 1: Using Cloudflare Cache Rules (replaces legacy Page Rules)

Create cache rules in the Cloudflare dashboard (Caching → Cache Rules):

- **Rule name**: `Static Asset Cache`
- **When**: URI path ends with `.js`, `.css`, `.woff`, `.woff2`, `.jpg`, `.png`, `.webp`, `.svg`
- **Then**: Set Edge Cache TTL: 30 days, Browser Cache TTL: 1 year

### Option 2: Using HTMLRewriter in a Worker (Advanced)

> **Note:** This project uses the OpenNext adapter (`@opennextjs/cloudflare`), not a
> custom Worker. The email-decode deferral below would need to be applied as a Worker
> middleware or Cloudflare Transform Rule rather than a standalone Worker.

If Cloudflare's Email Address Obfuscation injects a render-blocking script, use a
Transform Rule (Rules → Transform Rules → Modify Response Header) to add
`defer` to the injected `<script>` tag, or disable Email Obfuscation entirely
if the site has no cleartext email addresses in the HTML.

````text

### Option 3: Add meta tag (Already implemented in layout.tsx)

The `data-cfasync="false"` script in our layout prevents the email-decode script from blocking:

```tsx
<script data-cfasync="false">
  if (window.CloudFlare) {
    window.CloudFlare.emailDecode = window.CloudFlare.emailDecode || function() {};
  }
</script>
````

## Cache Configuration for Static Assets

### Cloudflare Cache Rules for Long Cache Lifetimes

> **Note:** Cloudflare Page Rules are deprecated. Use **Cache Rules** (Caching → Cache Rules)
> for new configurations. The rules below are ordered by priority.

Create these cache rules in the Cloudflare dashboard:

1. **Static Assets** (`*mhc-gc.com/*.{js,css,woff,woff2,jpg,png,webp,svg}`)
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month
   - Browser Cache TTL: 1 year

2. **Next.js Static Files** (`*mhc-gc.com/_next/static/*`)
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year
   - Browser Cache TTL: 1 year

3. **Images** (`*mhc-gc.com/images/*`)
   - Cache Level: Cache Everything
   - Edge Cache TTL: 6 months
   - Browser Cache TTL: 1 year

## Browser Caching Headers

The `next.config.js` now includes comprehensive caching headers:

- **Static Assets**: 1 year immutable
- **Next.js Bundles**: 1 year immutable
- **JavaScript Files**: 7 days browser, 30 days CDN
- **CSS Files**: 7 days browser, 30 days CDN
- **Fonts**: 1 year immutable

## Results Expected

After implementing these optimizations:

✅ **Cache TTL Issues**: Resolved with 30-day CDN cache, 7-day browser cache
✅ **Render-Blocking Resources**: Material Icons removed, CSS optimized
✅ **Legacy Polyfills**: Reduced from 11.6 KiB to ~2 KiB by targeting modern browsers
✅ **Email-Decode Script**: Deferred to prevent blocking

## Testing

After deployment, verify with:

```bash
# Check caching headers
curl -I https://www.mhc-gc.com/_next/static/chunks/main.js

# Open Lighthouse audit guidance
npm run lighthouse:guide

# Run authoritative audits in PageSpeed Insights or Chrome DevTools

# Check browser cache
# Open DevTools → Network → Reload → Check Cache-Control headers
```

## Monitoring

Track these metrics in Cloudflare Analytics:

- Edge cache hit ratio (target: >95%)
- Browser cache TTL effectiveness
- Time to First Byte (TTFB) improvements
- Bandwidth savings from caching

## Additional Recommendations

1. **Auto Minify** — **OFF** for HTML, CSS, and JS
   (Next.js already minifies; double-minify can corrupt JSX output and break CSP)
2. **Rocket Loader** — **OFF** (breaks Next.js hydration — do NOT enable)
3. **Enable Brotli Compression** (default on for proxied zones; higher ratio than gzip)
4. **Enable HTTP/3 with QUIC** — better mobile performance on lossy networks
5. **Enable Early Hints** — sends 103 response with `Link: preload` headers from `public/_headers`
6. **Enable 0-RTT Connection Resumption** — returning visitors skip TLS round-trip

> See the full dashboard settings table in [Cloudflare Deployment Guide](../../docs/deployment/cloudflare-guide.md#cloudflare-dashboard-performance-settings).

## References

- [Cloudflare Cache Documentation](https://developers.cloudflare.com/cache/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) (replaces legacy Page Rules)
