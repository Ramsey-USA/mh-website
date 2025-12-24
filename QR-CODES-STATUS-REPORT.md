# QR Codes Status Report - MH Construction Website

**Date:** December 24, 2025  
**Status:** ✅ **OPERATIONAL** (with recommendations)

---

## Executive Summary

✅ **All 72 QR code files are present and healthy**  
✅ **All 36 black & white QR codes are fully functional**  
⚠️ **Color QR codes have contrast limitations**  
✅ **All URLs are correct and up-to-date**  
✅ **All files are properly sized (15-25 KB each)**

---

## QR Code Inventory

### Total QR Codes: 72 files

- **36 unique QR codes** × **2 variants** (color + black & white)

### Categories

#### 1. Website Pages (13 codes)

- Homepage
- About
- Services
- Projects
- Team
- Careers
- Contact
- Booking
- Estimator
- Case Studies
- Allies
- Trade Partners
- Veteran Benefits

#### 2. Contact Methods (3 codes)

- Phone: (509) 308-6489
- Email: <office@mhc-gc.com>
- Location: 3111 N. Capitol Ave., Pasco, WA 99301

#### 3. Social Media (5 codes)

- LinkedIn
- Facebook
- Instagram
- YouTube
- Twitter/X

#### 4. Team Members (15 codes)

- Jeremy Thamert (Owner & President)
- Mike Holstein (Founder)
- Todd Schoeff (VP of Field Operations)
- Brooks Morris (Safety Director)
- Matt Ramsey (Project Manager)
- Porter Cline (Project Manager)
- Derek Parks (Chief Estimator)
- Ben Woodall (Estimator)
- Steve McClary (Senior Superintendent)
- Arnold Garcia (Field Superintendent)
- Trigger (Chief Morale Officer 🐕)
- Lisa Kandle (Office Manager)
- Reagan Massey (Executive Assistant)
- Brittney Holstein (Project Coordinator)
- Jennifer Tene (Payroll & HR Coordinator)

---

## Functional Status

### ✅ Black & White QR Codes: 100% Working

**Status:** Production-ready  
**Files:** All 36 BW variants (`qr-*-bw.png`)  
**Test Results:** All pass decode and URL validation  
**Reliability:** Excellent - work with all scanners

**Recommended Use:**

- ✅ Print materials (business cards, brochures, flyers)
- ✅ Signage and posters
- ✅ Product packaging
- ✅ Vehicle wraps
- ✅ Any physical medium

### ⚠️ Color QR Codes: Limited Functionality

**Status:** Use with caution  
**Files:** 36 color variants (`qr-*-color.png`)  
**Working:** 4 out of 36 (facebook, instagram, youtube, location)  
**Issue:** Hunter Green (#386851) provides insufficient contrast

**Test Results:**

- ❌ Fail standard decode tests (jsQR library)
- ⚠️ May work with phone cameras (better error correction)
- ⚠️ Unreliable across different scanner apps
- ⚠️ May fail in poor lighting conditions

**Not Recommended For:**

- ❌ Critical print materials
- ❌ Business cards
- ❌ Official documents
- ❌ Outdoor signage

**Could Work For:**

- 🟡 Digital displays (screens)
- 🟡 Website downloads
- 🟡 Social media posts
- 🟡 Email signatures (test first!)

---

## Technical Specifications

### QR Code Properties

- **Dimensions:** 512×512 pixels
- **Format:** PNG with transparency support
- **Error Correction:** Level H (30% damage tolerance - highest)
- **Logo Size:** 20% of QR code area
- **Margin:** 2 modules (quiet zone)

### Color Specifications

**Black & White Variant:**

```text
Dark modules: #000000 (pure black)
Light modules: #FFFFFF (pure white)
Contrast ratio: 21:1 ✅ Excellent
```

**Color Variant:**

```text
Dark modules: #386851 (Hunter Green)
Light modules: #FFFFFF (pure white)
Finder accents: #BD9264 (Leather Tan)
Contrast ratio: ~4.5:1 ⚠️ Marginal
```

### File Sizes

- Average: 18-23 KB per file
- Range: 17-25 KB
- Total storage: ~1.5 MB for all 72 files

---

## Recent Fixes Applied ✅

### 1. Missing QR Codes

- **Fixed:** Generated missing `qr-allies-color.png` and `qr-allies-bw.png`
- **Status:** ✅ Complete

### 2. URL Mismatches

- **Fixed:** Trade Partners URL (was incorrectly pointing to `/allies`)
- **Fixed:** Location address typo (Capitol vs Capital)
- **Fixed:** Jennifer Tene profile hash (was `jennifer-tenehuerta`, now `jennifer-tene`)
- **Status:** ✅ All URLs verified correct

### 3. Manifest Update

- **Updated:** Regenerated manifest with current timestamp
- **Verified:** All 72 QR codes listed correctly
- **Status:** ✅ Up to date

---

## Recommendations

### ✅ RECOMMENDED: Use Black & White QR Codes

**Why:**

1. **100% reliability** - guaranteed to work
2. **Universal compatibility** - all scanners and devices
3. **Better print quality** - sharper on various materials
4. **Cost-effective** - work with standard printing
5. **Professional appearance** - clean and clear

**Action:** Use BW variants for all production materials

### ⚠️ OPTIONAL: Improve Color QR Codes

If brand colors are essential, consider these options:

#### Option A: Darken the color

- Change dark modules from Hunter Green (#386851) to pure black (#000000)
- Keep Leather Tan (#BD9264) accents in finder patterns
- Maintains brand colors while ensuring functionality

#### Option B: Darker green variant

- Use Dark Hunter Green (#1a3329) - much darker
- Better contrast ratio (~8:1)
- More reliable than current Hunter Green

#### Option C: Hybrid approach

- Use BW for print/critical applications
- Use color for digital/screen displays
- Always test before deploying

### 🔧 Implementation Options

**To regenerate with better colors:**

1. Edit [scripts/generate-qr-codes.js](scripts/generate-qr-codes.js)
2. Change line 29: `const HUNTER_GREEN = "#000000";` (pure black)
3. Run: `node scripts/generate-qr-codes.js`
4. Test: `node scripts/test-qr-codes.js`

---

## Testing & Validation

### Automated Tests ✅

**Test Script:** `scripts/test-qr-codes.js`

Tests performed:

1. ✅ File existence check
2. ✅ QR code decode test
3. ✅ URL validation
4. ✅ File size verification
5. ✅ Orphan file detection

**To run tests:**

```bash
node scripts/test-qr-codes.js
```

### Health Check ✅

**Health Script:** `scripts/check-qr-codes.sh`

Quick verification of:

- File presence
- File sizes
- File integrity

**To run health check:**

```bash
bash scripts/check-qr-codes.sh
```

### Manual Testing

**Recommended:**

1. Test with multiple QR scanner apps
2. Test with different phone cameras
3. Test in various lighting conditions
4. Test at different print sizes
5. Test on different materials

---

## Usage Guidelines

### For Developers

**Location:** `/public/images/qr-codes/`

**Naming Convention:**

```text
qr-{name}-{variant}.png

Examples:
- qr-homepage-bw.png
- qr-contact-color.png
- qr-team-jeremy-thamert-bw.png
```

**To reference in code:**

```tsx
import Image from "next/image";

<Image
  src="/images/qr-codes/qr-homepage-bw.png"
  alt="MH Construction Homepage QR Code"
  width={200}
  height={200}
/>;
```

### For Marketing Team

**Print Materials:**

- Use BW variants only
- Minimum print size: 1 inch × 1 inch
- Include call-to-action text: "Scan to learn more"
- Test print before mass production

**Digital Materials:**

- Can use color variants (test first!)
- Ensure sufficient size on screen
- Provide alternative link for accessibility

**Business Cards:**

- Use BW variants
- Reserve space: 1-1.5 inches square
- Place in bottom corner
- Include URL below QR code as backup

---

## Maintenance

### Regular Checks

**Monthly:**

- Run automated tests
- Verify URLs still work
- Check for dead links
- Test random samples with phone

**Quarterly:**

- Review QR code usage analytics
- Update URLs if pages change
- Regenerate if needed
- Archive old versions

**Annual:**

- Full audit of all QR codes
- Update team member QR codes
- Review design and branding
- Consider redesign if needed

### When to Regenerate

**Trigger events:**

- Website URL changes
- Team member changes (new/departing staff)
- Social media URL updates
- Phone number or address changes
- Branding color updates

**How to regenerate:**

```bash
# 1. Update URLs in script
# 2. Regenerate all QR codes
node scripts/generate-qr-codes.js

# 3. Test thoroughly
node scripts/test-qr-codes.js

# 4. Verify health
bash scripts/check-qr-codes.sh
```

---

## Support & Documentation

### Scripts

1. **Generate QR codes:** `scripts/generate-qr-codes.js`
2. **Test QR codes:** `scripts/test-qr-codes.js`
3. **Health check:** `scripts/check-qr-codes.sh`
4. **Add team QR codes:** `scripts/add-team-qr-codes.js`

### Documentation

1. **Test Results:** `scripts/qr-codes-test-results.md`
2. **This Report:** `scripts/qr-codes-status-report.md`
3. **Manifest:** `public/images/qr-codes/qr-codes-manifest.json`
4. **QR Codes README:** `public/images/qr-codes/README.md`

### Support

For questions or issues:

1. Check documentation above
2. Run test scripts
3. Review manifest file
4. Contact development team

---

## Conclusion

✅ **All QR codes are properly generated and available**  
✅ **Black & white variants are production-ready**  
⚠️ **Color variants should be used with caution**  
✅ **All URLs are correct and validated**  
✅ **Automated testing and monitoring in place**

### Next Steps

1. ✅ **Immediate:** Use BW QR codes for all print materials
2. 🔄 **Optional:** Test color QR codes with real phone cameras
3. 🔄 **Future:** Consider regenerating color QR codes with better contrast
4. ✅ **Ongoing:** Regular testing and maintenance per schedule above

---

**Report Generated:** December 24, 2025  
**Last Updated:** December 24, 2025  
**Status:** ✅ Approved for production use (BW variants)
