# QR Codes for MH Construction

Generated: 11/13/2025, 9:03:16 PM

## Summary

- **Total QR Codes:** 20
- **Successfully Generated:** 20
- **Location:** `public/images/qr-codes`

## Available QR Codes

### ✅ MH Construction Homepage

- **Name:** `homepage`
- **File:** `qr-homepage.png`
- **URL:** <https://mhc-gc.com>

### ✅ About Us

- **Name:** `about`
- **File:** `qr-about.png`
- **URL:** <https://mhc-gc.com/about>

### ✅ Our Services

- **Name:** `services`
- **File:** `qr-services.png`
- **URL:** <https://mhc-gc.com/services>

### ✅ Our Projects

- **Name:** `projects`
- **File:** `qr-projects.png`
- **URL:** <https://mhc-gc.com/projects>

### ✅ Our Team

- **Name:** `team`
- **File:** `qr-team.png`
- **URL:** <https://mhc-gc.com/team>

### ✅ Careers

- **Name:** `careers`
- **File:** `qr-careers.png`
- **URL:** <https://mhc-gc.com/careers>

### ✅ Contact Us

- **Name:** `contact`
- **File:** `qr-contact.png`
- **URL:** <https://mhc-gc.com/contact>

### ✅ Schedule Consultation

- **Name:** `booking`
- **File:** `qr-booking.png`
- **URL:** <https://mhc-gc.com/booking>

### ✅ AI Project Estimator

- **Name:** `estimator`
- **File:** `qr-estimator.png`
- **URL:** <https://mhc-gc.com/estimator>

### ✅ Case Studies

- **Name:** `case-studies`
- **File:** `qr-case-studies.png`
- **URL:** <https://mhc-gc.com/case-studies>

### ✅ Trade Partners

- **Name:** `trade-partners`
- **File:** `qr-trade-partners.png`
- **URL:** <https://mhc-gc.com/trade-partners>

### ✅ Veteran Benefits

- **Name:** `veteran-benefits`
- **File:** `qr-veteran-benefits.png`
- **URL:** <https://mhc-gc.com/veteran-benefits>

### ✅ Call Us: (509) 308-6489

- **Name:** `phone`
- **File:** `qr-phone.png`
- **URL:** `tel:+15093086489`

### ✅ Email: <office@mhc-gc.com>

- **Name:** `email`
- **File:** `qr-email.png`
- **URL:** `mailto:office@mhc-gc.com`

### ✅ LinkedIn Profile

- **Name:** `linkedin`
- **File:** `qr-linkedin.png`
- **URL:** <https://linkedin.com/company/mhconstruction>

### ✅ Facebook Page

- **Name:** `facebook`
- **File:** `qr-facebook.png`
- **URL:** <https://www.facebook.com/profile.php?id=61575511773974>

### ✅ Instagram Profile

- **Name:** `instagram`
- **File:** `qr-instagram.png`
- **URL:** <https://www.instagram.com/mh_construction_inc/reels/>

### ✅ YouTube Channel

- **Name:** `youtube`
- **File:** `qr-youtube.png`
- **URL:** <https://youtube.com/@mhconstruction>

### ✅ X (Twitter) Profile

- **Name:** `twitter`
- **File:** `qr-twitter.png`
- **URL:** <https://x.com/mhc_gc>

### ✅ Our Location

- **Name:** `location`
- **File:** `qr-location.png`
- **URL:** <https://maps.google.com/?q=3111+N.+Capital+Ave.,+Pasco,+WA+99301>

## Usage in React Components

### Import the QRCode component

```tsx
import { QRCode } from '@/components/ui/QRCode';

// Use with a URL
<QRCode url="https://mhc-gc.com" size={200} />

// Use pre-generated image
<img src="/images/qr-codes/qr-homepage.png" alt="QR Code for Homepage" />
```

### Using in Marketing Materials

All QR codes are optimized for print and digital use:

- **Size:** 512x512 pixels
- **Format:** PNG with transparency support
- **Color:** Hunter Green (#386851) on white background
- **Error Correction:** High (30% damage tolerance)

### Recommended Sizes

- **Business Cards:** 0.5" - 0.75" (minimum)
- **Flyers/Posters:** 1" - 2"
- **Banners:** 2" - 4"
- **Digital Displays:** Use original 512px size

## Regenerating QR Codes

To regenerate all QR codes:

```bash
node scripts/generate-qr-codes.js
```

To update URLs or add new QR codes, edit `scripts/generate-qr-codes.js`.
