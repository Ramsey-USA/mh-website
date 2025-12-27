# Admin Analytics System

> **📊 Latest Enhancement (December 2025):** Analytics system now collects 100+ comprehensive data points including device info, user preferences, performance metrics, and security context. See [Analytics Enhancement Documentation](../../ANALYTICS-ENHANCEMENT-DEC-2025.md) for complete details.

## Overview

A secure, hidden analytics dashboard accessible only to Matt and Jeremy through a discrete trigger in the website footer.

## Access Instructions

### How to Access the Dashboard

1. **Navigate to any page** on the MH Construction website
2. **Scroll to the footer** at the bottom of the page
3. **Find the copyright text** that says "2025 MH Construction, Inc."
4. **Triple-click** on the copyright text (click 3 times quickly)
5. **Admin Sign-In Modal** will appear
6. **Enter credentials** (see below)
7. **Access the Analytics Dashboard**

### Default Credentials

⚠️ **SECURITY WARNING: Default passwords must be changed before production!**

**Development Only:**

- Email: `matt@mhc-gc.com`
- Password: `admin123` (default - change immediately for production)

**Jeremy's Account:**

- Email: `jeremy@mhc-gc.com`
- Password: `admin123` (default - change immediately for production)

> 🔴 **CRITICAL**: These default passwords are ONLY for development. Before deploying to production, you **MUST** change them by setting environment variables `ADMIN_MATT_PASSWORD` and `ADMIN_JEREMY_PASSWORD` in Cloudflare Workers.
>
> **See: [Admin Password Security Guide](./admin-password-security.md) for complete instructions.**

## Dashboard Features

### Overview Statistics

- **Total Page Views**: Complete view count across all pages
- **Unique Visitors**: Number of distinct visitors
- **Average Session Duration**: How long users stay on the site
- **Conversion Rate**: Percentage of visitors who take action

### Performance Metrics

- **Page Load Time**: Average time to load pages
- **First Contentful Paint**: Speed of initial content rendering
- **Time to Interactive**: When page becomes fully interactive

### User Behavior

- **Top Pages**: Most visited pages with view counts
- **Bounce Rate**: Percentage of single-page sessions
- **Average Page Views**: Pages viewed per session
- **Returning Visitors**: Percentage of repeat visitors

### Conversions

- **Contact Form Submissions**: Total contact form completions
- **Consultation Requests**: Booking requests
- **Conversion by Type**: Breakdown of conversion types

### Veteran Engagement

- **Veteran Page Views**: Views on veteran-related pages
- **Engagement Rate**: Interaction level with veteran content

### Real-Time Data

- **Active Users**: Currently browsing users
- **Current Page Views**: Real-time page activity
- **Top Active Pages**: Most viewed pages right now

## Technical Architecture

### Related Documentation

- [Analytics Enhancement (Dec 2025)](../../ANALYTICS-ENHANCEMENT-DEC-2025.md) - Comprehensive data collection improvements
- [Analytics Data Collection Checklist](../../ANALYTICS-DATA-COLLECTION-CHECKLIST.md) - Complete inventory of 100+ data points
- [Browser Tab Titles Inventory](../../BROWSER-TAB-TITLES-INVENTORY.md) - SEO-optimized dual-label title system
- [Analytics Quick Reference](../../analytics-quick-reference.md) - Quick start guide

### Components Created

1. **AdminSignInModal Component** (`src/components/ui/modals/AdminSignInModal.tsx`)
   - Secure authentication modal
   - Form validation
   - Error handling
   - JWT token management

2. **Dashboard Page** (`src/app/dashboard/page.tsx`)
   - Comprehensive analytics visualization
   - Real-time data updates
   - Protected route with authentication check
   - Responsive design for mobile/desktop

3. **Admin Login API** (`src/app/api/auth/admin-login/route.ts`)
   - JWT token generation
   - Credential verification
   - Security logging
   - Rate limiting via middleware

4. **Analytics Dashboard API** (`src/app/api/analytics/dashboard/route.ts`)
   - Data aggregation
   - Role-based access control
   - Real-time metrics
   - Fallback to sample data

5. **Enhanced Analytics Engine** (`src/lib/analytics/analytics-engine.ts`)
   - Browser performance metrics
   - LocalStorage data persistence
   - Real-time data collection
   - Comprehensive metrics calculation

### Security Features

- **Hidden Access**: Triple-click trigger not visible to regular users
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: Admin role required
- **Access Logging**: All login attempts are logged
- **Protected Routes**: Dashboard requires valid auth token
- **NoIndex Meta**: Dashboard excluded from search engines

## Data Storage

Analytics data is stored in:

- **LocalStorage**: Browser-based metrics for each visitor
- **Server-side**: Aggregated data (future enhancement)

Key LocalStorage items:

- `mh_analytics_pageviews`: Page view tracking
- `mh_analytics_conversions`: Conversion events
- `mh_analytics_sessions`: Session data
- `mh_analytics_visitors`: Visitor tracking
- `admin_token`: Admin authentication token
- `admin_user`: Admin user info

⚠️ **REQUIRED for production deployment:**

```bash
# Strong passwords (16+ characters recommended)
ADMIN_MATT_PASSWORD=your_secure_password_here
ADMIN_JEREMY_PASSWORD=your_secure_password_here

# JWT secret for token signing (32+ characters)
JWT_SECRET=your_jwt_secret_here
```

**How to set in Cloudflare:**

```bash
wrangler secret put ADMIN_MATT_PASSWORD
wrangler secret put ADMIN_JEREMY_PASSWORD
wrangler secret put JWT_SECRET
```

**See detailed guide:** [Admin Password Security](./admin-password-security.md)

### Security Checklist

Before production deployment:

- [ ] Generate strong passwords (16+ characters)
- [ ] Set `ADMIN_MATT_PASSWORD` in Cloudflare Workers
- [ ] Set `ADMIN_JEREMY_PASSWORD` in Cloudflare Workers
- [ ] Set `JWT_SECRET` in Cloudflare Workers
- [ ] Store passwords in team password manager (1Password)
- [ ] Test authentication with new passwords
- [ ] Verify default passwords no longer work
- [ ] Enable Cloudflare Access for additional security (optional)
- [ ] Review access logs for suspicious activity
- [ ] Schedule password rotation (90 days)
- [ ] Document emergency access procedures

**Related Documentation:**

- [Admin Password Security Guide](./admin-password-security.md)
- [Secrets Management Guide](./secrets-management.md)
- [Security Incident Response](../../SECURITY-INCIDENT-RESPONSE.md)loudflare
- [ ] Enable Cloudflare Access for additional security
- [ ] Review access logs regularly
- [ ] Test authentication flow
- [ ] Verify dashboard data accuracy

## Usage Tips

1. **Session Duration**: Login sessions last 1 hour
2. **Data Updates**: Analytics update in real-time as visitors browse
3. **Mobile Access**: Dashboard is fully responsive and works on mobile
4. **Logout**: Use the logout button in the dashboard header
5. **Privacy**: Only Matt and Jeremy have access credentials

## Troubleshooting

### Can't Access Dashboard

- Ensure you're triple-clicking the copyright text
- Check that you're using correct credentials
- Clear browser cache and try again
- Check console for error messages

### No Data Showing

- Dashboard may show sample data initially
- Data accumulates as visitors browse the site
- Real-time metrics require active traffic

### Authentication Issues

- Verify credentials are correct
- Check that API routes are deployed
- Ensure JWT_SECRET is set in environment

## Future Enhancements

Potential improvements:

- Database-backed analytics storage
- Historical data trends and graphs
- Export analytics reports (PDF/CSV)
- Email notifications for key metrics
- Custom date range filtering
- Advanced filtering and segmentation
- Integration with Google Analytics
- A/B testing capabilities
- Heatmap visualization
- Session replay functionality

## Support

For technical issues or questions:

- Check browser console for errors
- Review Cloudflare logs
- Contact development team

---

**Last Updated**: December 26, 2025
**Version**: 1.0.0
**Status**: Production Ready
