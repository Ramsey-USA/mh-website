# Firebase Setup Guide for MH Construction Website

This guide walks you through setting up Firebase for the MH Construction website authentication and database functionality.

## 🔥 Firebase Project Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `mh-construction-website`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password** (required)
   - **Google** (optional, for easy sign-in)
3. Add authorized domains:
   - `localhost` (for development)
   - Your production domain

### 3. Set Up Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in test mode** (for development)
3. Select your preferred location
4. Create the following collections:

   users/
   ├── {userId}/
   │   ├── email: string
   │   ├── displayName: string
   │   ├── role: 'admin' | 'team_member' | 'client'
   │   ├── isVeteran: boolean
   │   ├── phoneNumber: string (optional)
   │   ├── company: string (optional)
   │   ├── createdAt: timestamp
   │   ├── lastLoginAt: timestamp
   │   └── isActive: boolean

   consultations/
   ├── {consultationId}/
   │   ├── clientInfo: object
   │   ├── serviceType: string
   │   ├── scheduledDate: timestamp
   │   ├── status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
   │   └── assignedTeamMember: string

   projects/
   ├── {projectId}/
   │   ├── name: string
   │   ├── client: object
   │   ├── status: string
   │   ├── progress: number
   │   ├── estimatedValue: number
   │   └── teamLead: string

### 4. Configure Security Rules

Update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Team members and admins can read all user profiles
      allow read: if request.auth != null &&
        resource.data.role in ['team_member', 'admin'];
    }

    // Consultations - clients can create, team members can manage
    match /consultations/{consultationId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null &&
        (resource.data.clientId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['team_member', 'admin']);
    }

    // Projects - team members and admins only
    match /projects/{projectId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['team_member', 'admin'];
    }
  }
}
```text

### 5. Set Up Storage (Optional)

1. Go to **Storage** > **Get started**
2. Start in test mode
3. Configure storage rules for project images and documents

## 🔐 Environment Configuration

### 1. Get Firebase Configuration

1. In Firebase Console, go to **Project settings** (gear icon)
2. In "Your apps" section, click **Web app** icon (</>)
3. Register app name: `mh-construction-website`
4. Copy the configuration object

### 2. Create Environment File

Create `.env.local` in your project root:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```text

## 👤 User Roles & Permissions

### Role Hierarchy

1. **Admin** (`admin`)
   - Full access to all features
   - User management
   - System configuration
   - All dashboard features

2. **Team Member** (`team_member`)
   - Dashboard access
   - Project management
   - Consultation management
   - Client communication

3. **Client** (`client`)
   - Basic profile access
   - Consultation booking
   - Project status viewing

### Creating Admin Users

To create the first admin user:

1. Register normally through the website
2. In Firebase Console > Firestore > `users` collection
3. Find your user document
4. Change `role` field from `client` to `admin`

## 🚀 Deployment Considerations

### Production Environment

1. Update Firestore rules to production mode
2. Set up proper authentication domains
3. Configure environment variables in your hosting platform
4. Enable Firebase Performance Monitoring
5. Set up Firebase Analytics

### Security Best Practices

- Use Firestore security rules for data protection
- Implement proper role-based access control
- Regularly audit user permissions
- Monitor authentication events
- Use HTTPS only in production

## 🧪 Testing Authentication

### Local Testing

1. Start development server: `npm run dev`
2. Navigate to `/auth/login`
3. Create test accounts with different roles
4. Test dashboard access based on roles

### Test Users (for development)

Create these test accounts for development:

- Admin: `admin@mhconstruction.com`
- Team Member: `team@mhconstruction.com`
- Client: `client@example.com`

## 📞 Support

For Firebase setup issues:

- Check Firebase Console for error messages
- Review browser console for client-side errors
- Verify environment variables are loaded
- Ensure Firestore rules allow your operations

---

**Note**: This setup guide assumes Firebase knowledge. For detailed Firebase documentation, visit [Firebase Docs](https://firebase.google.com/docs).
