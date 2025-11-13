# Team Member QR Codes - Business Card Integration

## Overview

Each team member has a unique QR code specifically designed for printing on physical business cards.
When scanned, the QR code takes users directly to the team member's detailed profile section on the
website, complete with skills radar chart, career statistics, and full professional information.

**Note:** QR codes are generated for business card printing only and are not displayed on the website itself.

---

## Features

### QR Code Integration

- **Unique QR Code per Team Member:** Each member has a personalized QR code
- **Direct Profile Links:** QR codes link to `https://mhc-gc.com/team#[member-slug]`
- **Brand Styling:** QR codes use MH Construction brand colors (Hunter Green & Leather Tan)
- **Logo Overlay:** MH Construction logo appears in the center of each QR code
- **High Resolution:** 512x512px for optimal print quality
- **Error Correction:** Level H (30% damage tolerance)

### Print Features

- **Business Card Ready:** Optimized for printing on physical business cards
- **High Resolution:** 512x512px PNG files for crisp printing
- **Professional Quality:** Suitable for commercial printing services
- **Easy Access:** QR code files available in `/public/images/qr-codes/`

---

## File Structure

```text
public/images/qr-codes/
├── qr-team-jeremy-thamert.png       # Owner & President
├── qr-team-mike-holstein.png        # Founder
├── qr-team-todd-schoeff.png         # VP of Field Operations
├── qr-team-brooks-morris.png        # Safety Director
├── qr-team-matt-ramsey.png          # Project Manager
├── qr-team-porter-cline.png         # Project Manager
├── qr-team-derek-parks.png          # Chief Estimator
├── qr-team-ben-woodall.png          # Estimator
├── qr-team-steve-mcclary.png        # Senior Superintendent
├── qr-team-arnold-garcia.png        # Field Superintendent
├── qr-team-trigger.png              # Chief Morale Officer
├── qr-team-lisa-kandle.png          # Office Manager
├── qr-team-reagan-massey.png        # Executive Assistant
├── qr-team-brittney-holstein.png    # Project Coordinator
├── qr-team-makayla-holstein.png     # Accounting Specialist
└── qr-team-jennifer-tenehuerta.png  # Payroll & HR Coordinator
```

---

## Data Structure

### VintageTeamMember Interface

```typescript
export interface VintageTeamMember {
  // ... other fields
  slug: string; // Used for URL anchors
  qrCode?: string; // Path to QR code image
}
```

### Example Team Data

```json
{
  "name": "Jeremy Thamert",
  "role": "Owner & President",
  "slug": "jeremy-thamert",
  "qrCode": "/images/qr-codes/qr-team-jeremy-thamert.png"
}
```

---

## Usage

### Generating QR Codes

#### Step 1: Add QR Code Paths to Team Data

```bash
node scripts/add-team-qr-codes.js
```

This script automatically adds the `qrCode` field to each team member in `team-data.json`.

#### Step 2: Generate QR Code Images

```bash
node scripts/generate-qr-codes.js
```

This generates all QR codes including team member QR codes with:

- Hunter Green QR code pattern
- Leather Tan corner squares (finder patterns)
- MH Construction logo overlay
- High-resolution 512x512px PNG

### Accessing QR Codes

QR codes are stored in the team data but are not displayed on the website. They are available as
physical files for printing:

**File Location:** `/public/images/qr-codes/qr-team-[member-slug].png`

**Team Data Reference:**

```typescript
interface VintageTeamMember {
  slug: string; // Used for URL anchors and QR code filename
  qrCode?: string; // Path reference: "/images/qr-codes/qr-team-[slug].png"
  // ... other fields
}
```

---

## Business Card Implementation

### Recommended Specifications

**QR Code Placement:**

- Position on back of business card
- Minimum size: 0.75" x 0.75" (19mm x 19mm)
- Recommended size: 1" x 1" (25mm x 25mm)
- Include "Scan for Full Profile" text below QR code

**Print Settings:**

- Resolution: 300 DPI or higher
- Color mode: CMYK
- File format: PNG or Vector (PDF)
- White space around QR code: 0.125" (3mm) minimum

### Business Card Layout Example

```text
Front:
┌─────────────────────────────┐
│  [MH Logo]                  │
│                             │
│  John Doe                   │
│  Project Manager            │
│                             │
│  (509) 308-6489            │
│  john@mhc-gc.com           │
└─────────────────────────────┘

Back:
┌─────────────────────────────┐
│  [Company Info]             │
│                             │
│         [QR Code]           │
│    Scan for Full Profile   │
│                             │
│  mhc-gc.com/team           │
└─────────────────────────────┘
```

---

## Technical Details

### QR Code Generation

**Script:** `scripts/generate-qr-codes.js`

**Configuration:**

```javascript
const QR_OPTIONS = {
  errorCorrectionLevel: "H", // High (30% damage tolerance)
  type: "png",
  quality: 0.95,
  margin: 2,
  width: 512, // 512x512 pixels
  color: {
    dark: "#386851", // Hunter Green
    light: "#FFFFFF", // White background
  },
};
```

**Features:**

- Colored finder patterns (Leather Tan corners)
- Center logo overlay (20% of QR code size)
- White circle background for logo visibility
- High error correction for durability

### URL Structure

Team member QR codes link to:

```text
https://mhc-gc.com/team#[member-slug]
```

Examples:

- `https://mhc-gc.com/team#jeremy-thamert`
- `https://mhc-gc.com/team#matt-ramsey`
- `https://mhc-gc.com/team#brooks-morris`

### Scroll Behavior

The TeamProfileSection component includes:

```tsx
<div id={member.slug} className="... scroll-mt-24">
```

This ensures proper scroll positioning when users arrive via QR code scan, accounting for the fixed header.

---

## Maintenance

### Adding New Team Members

1. Add team member to `src/lib/data/team-data.json` with a `slug` field
2. Run `node scripts/add-team-qr-codes.js` to add QR code path
3. Run `node scripts/generate-qr-codes.js` to generate QR code image
4. Update `scripts/generate-qr-codes.js` to include new member in QR_CODES array

### Regenerating QR Codes

If you need to regenerate all QR codes (e.g., after domain change):

```bash
# Update BASE_URL in scripts/generate-qr-codes.js
# Then run:
node scripts/generate-qr-codes.js
```

### Updating QR Code Styling

To change QR code colors or styling:

1. Edit `scripts/generate-qr-codes.js`
2. Update brand colors constants
3. Regenerate all QR codes
4. Test scanning functionality

---

## Best Practices

### For Business Cards

✅ **Do:**

- Use high-quality printing (300 DPI minimum)
- Ensure adequate white space around QR code
- Test QR code scanning before mass printing
- Include fallback URL text below QR code
- Use matte or semi-gloss finish for better scanning

❌ **Don't:**

- Print QR code smaller than 0.75" x 0.75"
- Use glossy finish (causes glare/scanning issues)
- Place QR code over textured or patterned backgrounds
- Stretch or distort QR code dimensions

### For Digital Use

✅ **Do:**

- Display QR code with clear "Scan Me" messaging
- Ensure QR code is easily accessible on mobile
- Test QR codes on various devices and scanners
- Monitor QR code analytics if available

❌ **Don't:**

- Display QR code too small on screens
- Place QR code in hard-to-scan locations
- Assume all users know how to scan QR codes
- Forget to provide alternative access methods

---

## Analytics & Tracking

### Tracking QR Code Scans

To track QR code usage, consider implementing:

1. **UTM Parameters:**

   ```text
   https://mhc-gc.com/team#jeremy-thamert?utm_source=business_card&utm_medium=qr_code
   ```

1. **Google Analytics Events:**

   ```javascript
   // Track QR code scans
   ga("send", "event", "QR Code", "Scan", member.name);
   ```

1. **Cloudflare Analytics:**

   Monitor traffic to `/team#[member-slug]` endpoints

---

## Troubleshooting

### QR Code Won't Scan

**Possible causes:**

- QR code printed too small (< 0.75")
- Poor print quality or damaged QR code
- Insufficient contrast with background
- Scanner app issues

**Solutions:**

- Ensure minimum 0.75" size
- Use high-quality printing
- Test with multiple scanner apps
- Verify QR code has white border

### Wrong Page Loads

**Possible causes:**

- Incorrect slug in team data
- Member profile moved or renamed
- URL structure changed

**Solutions:**

- Verify slug matches team member data
- Check URL in QR code generation script
- Regenerate QR codes if URL structure changed

### QR Code Not Displaying on Website

**Possible causes:**

- Missing `qrCode` field in team data
- QR code image file missing
- Image path incorrect

**Solutions:**

- Run `node scripts/add-team-qr-codes.js`
- Run `node scripts/generate-qr-codes.js`
- Verify file exists in `public/images/qr-codes/`

---

## Future Enhancements

### Potential Improvements

- **Dynamic QR Codes:** Update destination URL without reprinting
- **Analytics Dashboard:** Track scan metrics per team member
- **vCard Integration:** QR codes that also include contact info for phone contacts
- **Custom Landing Pages:** Dedicated mobile-optimized pages for QR code traffic
- **A/B Testing:** Test different QR code placements and styles

---

## Related Documentation

- [Team Profile Section Guide](./team-profile-section-guide.md)
- [Team Data Synchronization](../business/team-data-sync.md)
- [QR Code README](../../public/images/qr-codes/README.md)
- [Brand Guidelines](../branding/standards/color-system.md)

---

## Summary

Team member QR codes provide a seamless bridge between physical business cards and comprehensive
digital profiles. The system is:

- **Automated:** Scripts handle generation and data updates
- **Brand-Consistent:** Uses MH Construction colors and logo
- **Print-Ready:** High-resolution images optimized for business cards
- **User-Friendly:** Direct links to detailed team member profiles
- **Maintainable:** Easy to update and regenerate as needed
- **Print-Only:** QR codes are for business card printing, not website display

This integration enhances the professional presentation of team members on business cards and
provides clients with instant access to full credentials, skills, and experience via their mobile
devices.
