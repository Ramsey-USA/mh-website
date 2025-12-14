# QR Code System Guide

## Overview

The MH Construction website includes a comprehensive QR code system for sharing pages, contact
information, and social media links. The system provides both pre-generated static images and a
dynamic React component for flexible usage.

## Quick Start

### Using Pre-Generated QR Codes

```tsx
import { QRCode } from '@/components/ui/QRCode';

// Use color variant (default)
<QRCode preset="homepage" variant="color" size={200} />

// Use black & white variant
<QRCode preset="booking" variant="bw" size={150} downloadable />
```

### Generating Dynamic QR Codes

```tsx
// Generate QR code on-the-fly
<QRCode url="https://mhc-gc.com/custom-page" size={200} />
```

### Complete Section with Description

```tsx
import { QRCodeSection } from "@/components/ui/QRCode";

<QRCodeSection
  title="Visit Our Website"
  description="Scan to schedule your consultation"
  preset="booking"
  size={200}
  downloadable
/>;
```

## Available Presets

### Main Pages

- `homepage` - MH Construction Homepage
- `about` - About Us page
- `services` - Our Services
- `projects` - Our Projects
- `team` - Our Team
- `careers` - Careers page
- `contact` - Contact Us
- `booking` - Schedule Consultation (primary CTA)

### Special Pages

- `estimator` - AI Project Estimator
- `case-studies` - Case Studies
- `trade-partners` - Trade Partners
- `veteran-benefits` - Veteran Benefits

### Contact Methods

- `phone` - Click-to-call: (509) 308-6489
- `email` - Email: <office@mhc-gc.com>
- `location` - Google Maps location

### Social Media

- `linkedin` - LinkedIn profile
- `facebook` - Facebook page
- `instagram` - Instagram profile

## Component API

### QRCode Component

```tsx
interface QRCodeProps {
  // Use pre-generated image (recommended)
  preset?: 'homepage' | 'about' | 'services' | ... ;

  // QR code variant
  variant?: 'color' | 'bw'; // default: 'color'

  // Or generate dynamically
  url?: string;

  // Size in pixels
  size?: number; // default: 200

  // Accessibility
  alt?: string;

  // Styling
  className?: string;
  color?: string; // default: '#386851' (Hunter Green)
  backgroundColor?: string; // default: '#FFFFFF'

  // Features
  downloadable?: boolean; // default: false
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'; // default: 'H'
}
```

### QRCodeSection Component

```tsx
interface QRCodeSectionProps {
  title?: string; // default: 'Scan to Visit'
  description?: string;
  url?: string;
  preset?: QRCodeProps["preset"];
  size?: number; // default: 200
  downloadable?: boolean; // default: true
  className?: string;
}
```

## Usage Examples

### Example 1: Business Card

```tsx
// Compact QR code for business cards
<QRCode preset="homepage" size={100} />
```

### Example 2: Flyer with Call-to-Action

```tsx
<QRCodeSection
  title="Schedule Your Free Consultation"
  description="Scan to book an appointment with our team"
  preset="booking"
  size={250}
  downloadable
/>
```

### Example 3: Contact Page

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <QRCodeSection
    title="Call Us"
    description="(509) 308-6489"
    preset="phone"
    size={150}
  />
  <QRCodeSection
    title="Email Us"
    description="office@mhc-gc.com"
    preset="email"
    size={150}
  />
  <QRCodeSection
    title="Visit Us"
    description="3111 N. Capitol Ave., Pasco, WA"
    preset="location"
    size={150}
  />
</div>
```

### Example 4: Social Media Footer

```tsx
<div className="flex gap-4 justify-center">
  <QRCode preset="linkedin" size={80} alt="LinkedIn" />
  <QRCode preset="facebook" size={80} alt="Facebook" />
  <QRCode preset="instagram" size={80} alt="Instagram" />
</div>
```

### Example 5: Dynamic QR Code for Custom URL

```tsx
// For pages or links not in presets
<QRCode
  url="https://mhc-gc.com/projects/custom-project-123"
  size={200}
  downloadable
/>
```

## QR Code Variants

Each QR code is generated in **two variants**:

### Color Variant (`-color.png`)

- **QR Pattern:** Hunter Green (#386851)
- **Corner Finders:** Leather Tan (#BD9264)
- **Logo:** Full-color MH logo with rounded square background
- **Label:** White text on Hunter Green background
- **Best For:** Full-color print materials, digital displays, branded marketing

### Black & White Variant (`-bw.png`)

- **QR Pattern:** Black (#000000)
- **Logo:** Black logo (`mh-logo-black.png`) with rounded square background
- **Label:** White text on Black background
- **Best For:** Black & white printing, photocopies, cost-effective materials

### Naming Convention

- Color: `qr-{name}-color.png` (e.g., `qr-homepage-color.png`)
- B&W: `qr-{name}-bw.png` (e.g., `qr-homepage-bw.png`)

## Identification Labels

All QR codes include an identifying text label at the bottom:

- **Pages:** "HOME", "ABOUT", "SERVICES", "CONTACT", etc.
- **Team Members:** Full names in uppercase (e.g., "MATT RAMSEY")
- **Contact Methods:** Icons + text (e.g., "☎ PHONE", "✉ EMAIL", "📍 LOCATION")
- **Social Media:** Platform names (e.g., "LINKEDIN", "INSTAGRAM")

## Print Specifications

All QR codes are optimized for both digital and print use:

- **QR Code Size:** 512×512 pixels
- **Total Size with Label:** 512×573 pixels (QR code + label)
- **Format:** PNG with RGBA color
- **Error Correction:** High (30% damage tolerance)
- **Logo Background:** Rounded square (15% corner radius)
- **Colors:** Hunter Green (#386851) or Black (#000000) on white background

### Recommended Print Sizes

| Use Case         | Minimum Size | Recommended Size |
| ---------------- | ------------ | ---------------- |
| Business Cards   | 0.5 inches   | 0.75 inches      |
| Flyers/Brochures | 1 inch       | 1.5 inches       |
| Posters          | 2 inches     | 3 inches         |
| Banners          | 3 inches     | 4+ inches        |
| Vehicle Wraps    | 4 inches     | 6+ inches        |

### Print Quality Tips

1. **Always use vector-based backgrounds** when placing QR codes
2. **Maintain white space** around QR codes (minimum 10% of QR code size)
3. **Test scannability** after printing at intended size
4. **Avoid placing on complex backgrounds** - use solid colors
5. **Ensure high contrast** - dark QR code on light background

## File Locations

### Component Files

- **Component:** `/src/components/ui/QRCode.tsx`
- **Generator Script:** `/scripts/generate-qr-codes.js`

### Generated Files

- **QR Code Images:** `/public/images/qr-codes/qr-*.png`
- **Manifest:** `/public/images/qr-codes/qr-codes-manifest.json`
- **Usage Guide:** `/public/images/qr-codes/README.md`

## Regenerating QR Codes

To regenerate all QR codes (e.g., after URL changes):

```bash
node scripts/generate-qr-codes.js
```

### Updating URLs or Adding New QR Codes

1. Edit `/scripts/generate-qr-codes.js`
2. Modify the `QR_CODES` array:

```javascript
const QR_CODES = [
  // Add new entry
  {
    name: "new-page",
    url: `${BASE_URL}/new-page`,
    description: "New Page Title",
    label: "NEW PAGE", // Identifying label (optional)
  },
  // ... existing entries
];
```

1. Update the preset type in `/src/components/ui/QRCode.tsx`:

```typescript
preset?:
  | 'homepage'
  | 'new-page'  // Add your new preset
  | ...
```

1. Regenerate QR codes:

```bash
node scripts/generate-qr-codes.js
```

## Brand Consistency

All QR codes use MH Construction brand colors:

- **Primary Color:** Hunter Green (#386851)
- **Background:** White (#FFFFFF)
- **Error Correction:** High (H) for maximum reliability

This ensures brand consistency across all marketing materials while maintaining excellent scannability.

## Testing QR Codes

### Before Deploying

1. **Visual Inspection:** Ensure QR code appears crisp and clear
2. **Scan Test:** Test with multiple devices and QR code readers
3. **URL Verification:** Confirm QR code directs to correct destination
4. **Size Testing:** Test at intended print/display size

### Recommended Testing Tools

- **iOS:** Built-in Camera app
- **Android:** Google Lens or Camera app
- **Desktop:** Online QR code readers
- **Testing Devices:** Various phone models and OS versions

## Performance Considerations

### Preset vs. Dynamic Generation

**Preset (Recommended):**

- ✅ Faster loading (pre-generated images)
- ✅ Better SEO (static images indexed)
- ✅ No client-side JavaScript required
- ✅ Consistent appearance across devices

**Dynamic Generation:**

- ✅ Flexible for custom URLs
- ✅ No storage needed
- ⚠️ Requires JavaScript
- ⚠️ Slight performance overhead

### Best Practices

1. **Use presets whenever possible** for better performance
2. **Lazy load QR codes** if not immediately visible
3. **Optimize page load** by limiting number of dynamic QR codes
4. **Cache dynamic QR codes** if URL doesn't change frequently

## Accessibility

The QR code system includes accessibility features:

- **Alt text:** Descriptive alternative text for screen readers
- **ARIA labels:** Proper labeling for canvas elements
- **Keyboard navigation:** Download buttons are keyboard accessible
- **Color contrast:** High contrast for visual clarity

### Example with Enhanced Accessibility

```tsx
<QRCode
  preset="booking"
  size={200}
  alt="QR code to schedule a consultation with MH Construction. Scan with your phone camera to visit our booking page."
  downloadable
/>
```

## Marketing Use Cases

### Business Cards

```tsx
<QRCode preset="homepage" size={100} />
```

### Flyers & Brochures

```tsx
<QRCodeSection
  title="Learn More"
  description="Scan for our full portfolio"
  preset="projects"
  size={200}
/>
```

### Job Site Signage

```tsx
<QRCodeSection
  title="See Our Work"
  description="Scan to view this project"
  url="https://mhc-gc.com/projects/current-project"
  size={300}
/>
```

### Vehicle Wraps

```tsx
<QRCode preset="contact" size={400} />
```

### Trade Show Banners

```tsx
<QRCodeSection
  title="Get Your Free Estimate"
  description="Scan to use our automated estimator tool"
  preset="estimator"
  size={350}
  downloadable
/>
```

### Email Signatures

```tsx
<QRCode preset="booking" size={120} />
```

## Integration with NPM Scripts

Add to `package.json` for easy access:

```json
{
  "scripts": {
    "qr:generate": "node scripts/generate-qr-codes.js",
    "qr:help": "cat public/images/qr-codes/README.md"
  }
}
```

Usage:

```bash
npm run qr:generate  # Regenerate all QR codes
npm run qr:help      # View QR code documentation
```

## Troubleshooting

### QR Code Won't Scan

1. **Check size:** Ensure QR code is large enough (minimum 0.5" for print)
1. **Test lighting:** Good lighting improves scan success
1. **Check contrast:** Verify dark-on-light contrast
1. **Verify URL:** Confirm URL is correct and accessible
1. **Test device:** Try different devices/apps

### Image Not Loading

1. **Check path:** Verify file exists in `/public/images/qr-codes/`
1. **Regenerate:** Run `node scripts/generate-qr-codes.js`
1. **Check preset name:** Ensure preset matches generated filename

### Dynamic Generation Fails

1. **Check client-side:** Ensure component is client-side (`'use client'`)
2. **Verify URL:** Confirm URL is valid
3. **Check console:** Look for JavaScript errors
4. **Update dependencies:** Ensure `qrcode` package is installed

## Future Enhancements

Potential improvements to consider:

- [ ] Add QR code analytics tracking
- [ ] Support for custom logos in QR center
- [ ] Animated QR codes for digital displays
- [ ] Batch download functionality
- [ ] QR code design variations
- [ ] Integration with marketing automation

## Related Documentation

- [Style Utilities Guide](../development/style-utilities-guide.md)
- [Components Index](../components/components-index.md)
- [Brand Standards](../branding/standards/color-system.md)
- [SEO Guide](./seo/ultimate-seo-guide.md)

## Support

For questions or issues with the QR code system:

1. Check this documentation
2. Review `/public/images/qr-codes/README.md`
3. Examine `/scripts/generate-qr-codes.js`
4. Contact the development team

---

**Last Updated:** December 14, 2025
**Version:** 2.0.0 - Enhanced with variants and labels
**Status:** Production Ready
