# QR Codes - Quick Reference

## ✅ Status: OPERATIONAL

All QR codes are generated and ready for use!

## 📦 What's Included

- **72 QR code files** (36 unique × 2 variants)
- **2 variants:** Color and Black & White
- **All categories:** Pages, contacts, social media, team members

## 🎯 Recommendation

### ✅ Use Black & White variants for all production materials

- 100% reliable and tested
- Work with all scanners
- Better print quality
- Professional appearance

## 🚀 Quick Start

### For Print Materials (Business Cards, Flyers, etc.)

```text
Use: qr-{name}-bw.png
Example: qr-homepage-bw.png
```

### For Team Member Cards

```text
qr-team-{slug}-bw.png
Example: qr-team-jeremy-thamert-bw.png
```

### For Contact Info

```text
Phone: qr-phone-bw.png
Email: qr-email-bw.png
Location: qr-location-bw.png
```

## 📋 Available QR Codes

### Website Pages

- homepage, about, services, projects, team
- careers, contact, booking, estimator
- case-studies, allies, trade-partners, veteran-benefits

### Contact Methods

- phone, email, location

### Social Media

- linkedin, facebook, instagram, youtube, twitter

### Team Members (15)

- jeremy-thamert, mike-holstein, todd-schoeff
- brooks-morris, matt-ramsey, porter-cline
- derek-parks, ben-woodall, steve-mcclary
- arnold-garcia, trigger, lisa-kandle
- reagan-massey, brittney-holstein, jennifer-tene

## 🛠️ NPM Scripts

```bash
# Generate QR codes
npm run qr:generate

# Test QR codes
npm run qr:test

# Quick health check
npm run qr:check
```

## 📖 Documentation

- **Full Report:** `/QR-CODES-STATUS-REPORT.md`
- **Test Results:** `/scripts/qr-codes-test-results.md`
- **Manifest:** `qr-codes-manifest.json` (this directory)

## ⚠️ Important Notes

1. **Use BW variants** for all print materials
2. **Color variants** have contrast limitations (use with caution)
3. **Test before printing** - always verify QR codes scan correctly
4. **Minimum size** - Print at least 1 inch × 1 inch
5. **Include backup** - Add URL text below QR code

## 🔧 Maintenance

Run tests regularly:

```bash
npm run qr:test
```

Regenerate if URLs change:

```bash
npm run qr:generate
```

## ✅ Last Verified

**Date:** December 24, 2025  
**All 72 files:** Present and healthy ✓  
**All BW codes:** 100% functional ✓  
**All URLs:** Verified correct ✓

---

For detailed information, see: `/QR-CODES-STATUS-REPORT.md`
