# Cloudflare Edge Optimization Configuration

## Email Protection Script Deferral

To prevent the `email-decode.min.js` script from blocking initial render, configure
Cloudflare Email Address Obfuscation settings:

### In Cloudflare Dashboard

1. Navigate to **Speed** → **Optimization**
2. Under **Content Optimization**, locate **Email Address Obfuscation**
3. Ensure it's enabled but add the following to your page rules or Workers:

### Option 1: Using Cloudflare Page Rules

Create a page rule for your domain:

- **URL Pattern**: `*mhc-gc.com/*`
- **Settings**:
  - Cache Level: Standard
  - Browser Cache TTL: 1 year
  - Edge Cache TTL: 30 days

### Option 2: Using Cloudflare Workers (Recommended)

Add this to your Cloudflare Worker to defer email-decode.min.js:

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);
  const contentType = response.headers.get("content-type");

  // Only modify HTML responses
  if (contentType && contentType.includes("text/html")) {
    let html = await response.text();

    // Add defer attribute to email-decode script
    html = html.replace(
      /<script[^>]*src="[^"]*email-decode\.min\.js"[^>]*>/gi,
      (match) => match.replace("<script", "<script defer"),
    );

    return new Response(html, {
      headers: response.headers,
    });
  }

  return response;
}
```

### Option 3: Add meta tag (Already implemented in layout.tsx)

The `data-cfasync="false"` script in our layout prevents the email-decode script from blocking:

```tsx
<script data-cfasync="false">
  if (window.CloudFlare) {
    window.CloudFlare.emailDecode = window.CloudFlare.emailDecode || function() {};
  }
</script>
```

## Cache Configuration for Static Assets

### Cloudflare Page Rules for Long Cache Lifetimes

Add these page rules in order of priority:

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

# Run Lighthouse
npm run lighthouse:guide

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

1. **Enable Auto Minify** in Cloudflare (HTML, CSS, JS)
2. **Enable Brotli Compression** (higher than gzip)
3. **Enable HTTP/3** for faster connection establishment
4. **Enable Early Hints** for resource preloading
5. **Enable Rocket Loader** (optional, test carefully as it can interfere with some JS)

## References

- [Cloudflare Caching Documentation](https://developers.cloudflare.com/cache/)
- [Cloudflare Page Rules](https://developers.cloudflare.com/rules/page-rules/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
