# PWA (Progressive Web App) Features

## Overview

The MH Construction website now includes full Progressive Web App functionality, allowing users to install the website as a native-like app on their devices with offline capabilities, push notifications, and enhanced performance.

## 🚀 Features Implemented

### 1. **Service Worker Registration**

- **Location**: `src/components/pwa/ServiceWorkerRegistration.tsx`
- Automatically registers the service worker on supported browsers
- Handles installation, updates, and errors
- Checks for updates every hour
- Provides `useServiceWorkerUpdate` hook for manual control

### 2. **Installation Prompts**

- **Location**: `src/components/pwa/PWAInstallPrompt.tsx`
- Detects when the app can be installed
- Shows elegant prompt after 3 seconds
- Remembers dismissal for 30 days
- Tracks installations with Google Analytics
- Mobile and desktop optimized UI

### 3. **Update Notifications**

- **Location**: `src/components/pwa/UpdateNotification.tsx`
- Alerts users when new version is available
- One-click update with automatic refresh
- Non-intrusive banner design

### 4. **Offline Page**

- **Location**: `src/app/offline/page.tsx`
- Beautiful offline experience
- Lists PWA capabilities
- Provides "Try Again" and "Go Home" actions

### 5. **Enhanced Manifest**

- **Location**: `public/manifest.json`
- Added booking and estimate shortcuts
- Custom protocol handler (`web+mhconstruction://`)
- File handler for images and PDFs
- Edge sidebar support
- Complete icon set (72px to 512px)

### 6. **Route Handlers**

- **Protocol Handler**: `src/app/protocol-handler/route.ts`
  - Handles `web+mhconstruction://` URLs
  - Actions: contact, project, estimate, booking
- **File Handler**: `src/app/file-handler/route.ts`
  - Accepts images and PDFs
  - Routes to appropriate contact form

### 7. **PWA Manager**

- **Location**: `src/components/pwa/PWAManager.tsx`
- Central coordinator for all PWA features
- Integrated into root layout
- Manages registration, prompts, and updates

## 📱 Installation

### Desktop (Chrome/Edge)

1. Visit the website
2. Click the install icon in the address bar (⊕)
3. Or use the prompt banner

### Mobile (iOS Safari)

1. Tap the Share button
2. Select "Add to Home Screen"
3. Tap "Add"

### Mobile (Android Chrome)

1. Tap the three-dot menu
2. Select "Install app" or "Add to Home Screen"
3. Or use the prompt banner

## 🔧 Configuration

### Service Worker

- **Cache Version**: v4.0.0
- **Cache Duration**:
  - Static assets: 30 days
  - Dynamic content: 1 day
  - Images: 90 days
  - API responses: 5 minutes
  - CDN assets: 1 year

### Shortcuts

The app includes 4 quick actions accessible from the home screen icon:

1. View Projects
2. Contact Us
3. Book Consultation
4. Get Estimate

## 🎨 Customization

### Theme Colors

- Primary: `#386851` (Military green)
- Background: `#1e293b` (Dark slate)
- Display mode: Standalone

### Screenshots

Screenshots for app stores located in `/public/screenshots/`:

- Desktop: Home and Estimator
- Mobile: Home and Booking

## 🧪 Testing

### Test PWA Installation

1. Run: `npm run dev`
2. Open Chrome DevTools → Application → Manifest
3. Click "Update on reload"
4. Verify manifest and service worker

### Test Offline Mode

1. Open Chrome DevTools → Network
2. Select "Offline" throttling
3. Refresh page
4. Should show offline page with cached assets

### Test Update Flow

1. Make changes to service worker version
2. Reload the app
3. Should see update notification banner
4. Click "Update Now" to apply changes

## 📊 Analytics

PWA installations are tracked via Google Analytics:

- Event: `pwa_install`
- Category: `engagement`
- Label: `PWA Installation`

## 🔐 Security

- HTTPS required for service workers
- Content Security Policy configured in middleware
- Service worker scope limited to root (`/`)

## 🚨 Troubleshooting

### Service Worker Not Registering

- Check browser console for errors
- Verify HTTPS is enabled
- Ensure `/sw.js` is accessible
- Clear browser cache and hard reload

### Install Prompt Not Showing

- Check if already installed (standalone mode)
- Verify manifest.json is valid
- Ensure all PWA criteria are met
- Check if user dismissed recently (30-day cooldown)

### Update Not Working

- Check service worker version mismatch
- Verify cache names updated
- Force refresh with Ctrl+Shift+R
- Clear all site data in DevTools

## 📝 Future Enhancements

Potential improvements to consider:

- [ ] Background sync for form submissions
- [ ] Push notification subscriptions
- [ ] Share Target API for receiving shared content
- [ ] Periodic background sync for cache updates
- [ ] App badge for unread notifications
- [ ] Shortcuts for specific project categories
- [ ] File picker for blueprint uploads
- [ ] Web Share API integration

## 📚 Resources

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox)

## 🤝 Contributing

When updating PWA features:

1. Update service worker version in `sw.js`
2. Update cache names to match new version
3. Test installation and update flows
4. Verify offline functionality
5. Update this documentation

---

**Version**: 4.0.0  
**Last Updated**: December 25, 2025  
**Maintainer**: MH Construction Development Team
