# Firebase Setup Guide for MH Construction Website

## 🔥 **Integration Status: COMPLETE** ✅

**Firebase is fully integrated and operational!** This guide now serves as both setup reference and verification checklist for the active Firebase services.

This guide covers Firebase configuration for the MH Construction website with authentication, database, storage, functions, and hosting features.

## Prerequisites

- Firebase account
- Node.js 18+ installed
- MH Construction website code

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "mh-construction-website")
4. Enable Google Analytics (optional)
5. Create project

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Enable both Email/Password and Email link
   - **Google** (optional): Enable and configure OAuth consent screen

5. Add authorized domains in "Settings" tab:
   - `localhost` (for development)
   - Your production domain

## Step 3: Set up Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a region close to your users
5. Create the database

### Configure Security Rules

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null &&
                     resource.data.role in ['admin', 'team_member'];
    }

    // Consultations
    match /consultations/{consultId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null &&
                            (request.auth.uid == resource.data.userId ||
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'team_member']);
    }

    // Project estimates
    match /estimates/{estimateId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null &&
                            (request.auth.uid == resource.data.userId ||
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'team_member']);
    }

    // Notifications
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null &&
                            (request.auth.uid == resource.data.userId ||
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'team_member']);
    }

    // Team data (admin/team_member only)
    match /team/{teamId} {
      allow read, write: if request.auth != null &&
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'team_member'];
    }
  }
}
```text

## Step 4: Get Configuration Keys

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register your app (name it "MH Construction Website")
5. Copy the configuration object

## Step 5: Configure Environment Variables

1. In your project root, copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

1. Edit `.env.local` with your Firebase config:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdefghijklmnop
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ
   ```

## Step 6: Initialize Data Collections

The app will automatically create collections when needed, but you can pre-create them:

1. Go to Firestore Database
2. Click "Start collection"
3. Create these collections:
   - `users` - User profiles and roles
   - `consultations` - Booking requests
   - `estimates` - Project estimates
   - `notifications` - System notifications
   - `team` - Team member data

## Step 7: Create Admin User

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Go to <http://localhost:3000/auth/login>
3. Create an account with your admin email
4. In Firebase Console → Authentication → Users
5. Note your User UID
6. In Firestore, go to the `users` collection
7. Find your user document and edit it:

   ```json
   {
     "uid": "your_user_uid",
     "email": "admin@mhconstruction.com",
     "displayName": "Admin User",
     "role": "admin",
     "isActive": true,
     "createdAt": "2024-01-01T00:00:00.000Z",
     "lastLoginAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Step 8: Test the Setup

1. Restart your development server
2. Visit <http://localhost:3000>
3. Try logging in with your admin account
4. Access the dashboard at <http://localhost:3000/dashboard>
5. Test booking a consultation
6. Try the project estimator

## Step 9: Production Deployment

### Vercel Deployment

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all `NEXT_PUBLIC_FIREBASE_*` variables

4. Add your production domain to Firebase:
   - Go to Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `mh-construction.vercel.app`)

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to your hosting provider
3. Set environment variables on your hosting platform
4. Add your domain to Firebase authorized domains

## Optional: Firebase Hosting

You can also host directly on Firebase:

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize:

   ```bash
   firebase login
   firebase init hosting
   ```

3. Choose your Firebase project
4. Set public directory to `out`
5. Configure as Single Page App: Yes
6. Don't overwrite index.html

7. Add build script to `firebase.json`:

   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

8. Deploy:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Troubleshooting

### Common Issues

1. **"Firebase app not initialized"**
   - Check environment variables are set correctly
   - Restart development server

2. **Authentication not working**
   - Verify domain is in authorized domains
   - Check Firebase config keys

3. **Firestore permission denied**
   - Review security rules
   - Ensure user has correct role in database

4. **Build errors**
   - Run `npm run lint` to check for issues
   - Verify all Firebase imports are correct

### Support

For technical support:

- Check Firebase Console logs
- Review Next.js build output
- Contact development team

---

## ✅ **Integration Complete!**

### Active Firebase Services

| Service | Status | Features |
|---------|---------|----------|
| **Authentication** | ✅ Active | Google OAuth, Email/Password, Role-based access |
| **Firestore Database** | ✅ Active | Real-time data, Collections: users, consultations, estimates, notifications, team |
| **Cloud Storage** | ✅ Active | File uploads, Document management, Image storage |
| **Cloud Functions** | ✅ Active | API endpoints, Form processing, Server-side logic |
| **Hosting** | ✅ Ready | Production deployment platform |

### Post-Integration Verification

Run these checks to verify Firebase integration:

```bash
# 1. Check Firebase connection
npm run dev
# Visit http://localhost:3000 - should load without Firebase errors

# 2. Test authentication
# Visit http://localhost:3000/auth/login - should show login forms

# 3. Test database connection
# Open browser console, should not show Firestore connection errors

# 4. Verify emulators (development)
npm run firebase:emulate
# Should start emulators on ports: Auth(9099), Firestore(8080), Functions(5001), Storage(9199)

# 5. Test production deployment
npm run build
npm run firebase:deploy
```text

### Integration Benefits

- ✅ **Secure Authentication**: Multi-provider user authentication
- ✅ **Real-time Database**: Live data synchronization across clients
- ✅ **File Management**: Secure document and image storage
- ✅ **Serverless Functions**: Scalable backend API processing
- ✅ **Global CDN Hosting**: Fast worldwide content delivery
- ✅ **Development Emulators**: Local testing environment

**Your MH Construction website now has a complete, production-ready Firebase backend!**
