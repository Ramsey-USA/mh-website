# Cloudflare Configuration for MH Construction Website

## Security Rules

### WAF Custom Rules

````javascript
// Block common attack patterns
(http.request.uri.path contains "/admin" and not ip.src in {YOUR_OFFICE_IP}) or
(http.request.uri.path contains "/.env") or
(http.request.uri.path contains "/wp-admin") or
(http.request.body contains "script>" and http.request.method eq "POST")
```text

### Rate Limiting Rules

```javascript
// Contact form rate limiting
http.request.uri.path eq "/api/contact" and http.request.method eq "POST"
// Rate: 5 requests per minute per IP
```text

## Page Rules

### Cache Rules

```text
Pattern: *.mhc-gc.com/*
Setting: Cache Level = Standard
Setting: Browser Cache TTL = 1 month
Setting: Edge Cache TTL = 7 days
```text

### Performance Rules

```text
Pattern: *.mhc-gc.com/api/*
Setting: Cache Level = Bypass
```text

## DNS Settings

### Required Records

```text
Type: A
Name: @
Content: [Firebase Hosting IP]
Proxy: Enabled (Orange Cloud)

Type: CNAME
Name: www
Content: mhc-gc.com
Proxy: Enabled (Orange Cloud)
```text

## SSL/TLS Configuration

### Mode: Full (Strict)

### Min TLS Version: 1.2

### Enable

- Always Use HTTPS
- Automatic HTTPS Rewrites
- Certificate Transparency Monitoring

## Firewall Rules

### High Priority Rules

1. **Block Known Bad IPs**: Use Cloudflare's threat intelligence
2. **Country Blocking**: Block high-risk countries if not serving internationally
3. **Challenge Suspicious Traffic**: CAPTCHA for medium-risk requests

## Performance Settings

### Speed Optimizations

- Minify: HTML, CSS, JS
- Brotli Compression: Enabled
- Auto Minify: Enabled
- Rocket Loader: Enabled (test carefully)

### Image Optimization

- Polish: Enabled
- WebP Conversion: Enabled
- Auto-optimize images

## Analytics & Monitoring

### Web Analytics

- Enable Cloudflare Web Analytics
- Track Core Web Vitals
- Monitor security events

### Alerts

- Set up alerts for:
  - High traffic spikes
  - Security events
  - Origin server errors
````
