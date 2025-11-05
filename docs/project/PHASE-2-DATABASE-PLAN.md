# Phase 2: Database Persistence Plan

**Created:** November 5, 2025  
**Status:** 🟡 Planning  
**Priority:** High  
**Estimated Time:** 2-4 hours

---

## Overview

Implement database persistence for consultations, job applications, and authentication using
Cloudflare D1 (SQLite at the edge). This replaces temporary in-memory storage with proper
data persistence and enables admin dashboards, lead tracking, and user management.

---

## Current State Analysis

### Files Currently Using Temporary Storage

1. **Consultations API** (`src/app/api/consultations/route.ts`)
   - POST: Stores data in memory only
   - GET: No retrieval implemented (line 110 TODO)
   - Needs: D1 schema, CRUD operations

2. **Job Applications API** (`src/app/api/job-applications/route.ts`)
   - POST: Logs to console only (line 84 TODO)
   - GET: Returns empty array (line 109 TODO)
   - Needs: D1 schema, resume file storage (Cloudflare R2)

3. **Contact Forms** (`src/app/api/contact/route.ts`)
   - POST: Sends email only
   - No database storage (line 116 TODO)
   - Needs: Contact submissions tracking

4. **Authentication** (`src/app/api/functions/[functionName]/route.ts`)
   - Basic JWT check implemented (line 23)
   - No token generation/refresh
   - No user management
   - Needs: Complete auth system

---

## Cloudflare D1 Database Schema

### Table 1: Consultations

```sql
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL,
  project_description TEXT,
  location TEXT,
  budget TEXT,
  selected_date TEXT NOT NULL,
  selected_time TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT -- JSON field for additional data
);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_date ON consultations(selected_date);
CREATE INDEX idx_consultations_email ON consultations(email);
```

### Table 2: Job Applications

```sql
CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  position TEXT NOT NULL,
  experience TEXT NOT NULL,
  availability TEXT,
  cover_letter TEXT,
  resume_url TEXT, -- Cloudflare R2 URL
  veteran_status TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT -- JSON field for additional data
);

CREATE INDEX idx_applications_status ON job_applications(status);
CREATE INDEX idx_applications_position ON job_applications(position);
CREATE INDEX idx_applications_email ON job_applications(email);
```

### Table 3: Contact Submissions

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  project_location TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  urgency TEXT DEFAULT 'medium',
  preferred_contact TEXT DEFAULT 'either',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT -- JSON field for additional data
);

CREATE INDEX idx_contacts_status ON contact_submissions(status);
CREATE INDEX idx_contacts_urgency ON contact_submissions(urgency);
CREATE INDEX idx_contacts_email ON contact_submissions(email);
```

### Table 4: Users (Authentication)

```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- user, admin, manager
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  veteran_status TEXT,
  is_active INTEGER DEFAULT 1,
  email_verified INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT -- JSON field for additional data
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Table 5: Sessions (JWT Token Management)

```sql
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
```

---

## Environment Variables Required

Add to `.env.local`:

```bash
# Cloudflare D1 Database
D1_DATABASE_ID="your-database-id"
D1_ACCOUNT_ID="your-account-id"

# Cloudflare R2 Storage (for resume uploads)
R2_BUCKET_NAME="mh-construction-resumes"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Email Notifications (already configured)
RESEND_API_KEY="re_..."
NOTIFICATION_EMAIL="office@mhc-gc.com"
```

---

## Implementation Checklist

### Step 1: Database Setup (30 minutes)

- [ ] Create Cloudflare D1 database via Wrangler CLI
- [ ] Run migration script to create all tables
- [ ] Verify table structure and indexes
- [ ] Test basic CRUD operations
- [ ] Update `wrangler.toml` with D1 bindings

```bash
# Create D1 database
npx wrangler d1 create mh-construction-db

# Create migration file
npx wrangler d1 migrations create mh-construction-db initial-schema

# Apply migrations
npx wrangler d1 migrations apply mh-construction-db --local
npx wrangler d1 migrations apply mh-construction-db --remote
```

### Step 2: Cloudflare Storage Helper (30 minutes)

- [ ] Update `src/lib/cloudflare/storage.ts` with D1 methods
- [ ] Add type-safe query builders
- [ ] Implement connection pooling
- [ ] Add transaction support
- [ ] Create generic CRUD utilities

Key methods to implement:

- `insertConsultation(data)`
- `getConsultations(filters)`
- `updateConsultation(id, data)`
- `deleteConsultation(id)`
- `insertJobApplication(data)`
- `getJobApplications(filters)`
- `insertContactSubmission(data)`
- `createUser(data)`
- `getUserByEmail(email)`
- `createSession(userId, token)`

### Step 3: Consultations API (30 minutes)

- [ ] Update POST endpoint to insert into D1
- [ ] Implement GET endpoint with filtering
- [ ] Add GET by ID endpoint
- [ ] Implement UPDATE endpoint
- [ ] Implement DELETE endpoint
- [ ] Add status management (new, contacted, scheduled, completed)
- [ ] Keep email notification functionality

Files to update:

- `src/app/api/consultations/route.ts` (POST, GET)
- `src/app/api/consultations/[id]/route.ts` (GET, UPDATE, DELETE)

### Step 4: Job Applications API (45 minutes)

- [ ] Update POST endpoint to insert into D1
- [ ] Implement resume upload to R2
- [ ] Implement GET endpoint with filtering
- [ ] Add status management (new, reviewing, interviewed, hired, rejected)
- [ ] Keep email notification functionality
- [ ] Add resume download endpoint

Files to update:

- `src/app/api/job-applications/route.ts` (POST, GET)
- Create `src/app/api/job-applications/[id]/route.ts` (GET, UPDATE, DELETE)
- Create `src/app/api/job-applications/[id]/resume/route.ts` (GET resume file)

### Step 5: Contact Submissions API (20 minutes)

- [ ] Add database insert to POST endpoint
- [ ] Create GET endpoint for admin dashboard
- [ ] Keep email notification functionality
- [ ] Add status management (new, contacted, converted)

Files to update:

- `src/app/api/contact/route.ts` (POST - add DB insert)
- Create `src/app/api/contact/submissions/route.ts` (GET)

### Step 6: Authentication System (1-2 hours)

- [ ] Install `bcryptjs` for password hashing
- [ ] Install `jsonwebtoken` for JWT
- [ ] Create user registration endpoint
- [ ] Create login endpoint (JWT generation)
- [ ] Create token refresh endpoint
- [ ] Create logout endpoint
- [ ] Update protected route middleware
- [ ] Add password reset flow

Files to create:

- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/refresh/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/reset-password/route.ts`
- `src/lib/auth/jwt.ts` (token utilities)
- `src/lib/auth/password.ts` (hashing utilities)

### Step 7: Testing & Validation (30 minutes)

- [ ] Test consultation submission flow
- [ ] Test job application submission flow
- [ ] Test contact form submission flow
- [ ] Test user registration/login flow
- [ ] Test admin data retrieval
- [ ] Test file uploads to R2
- [ ] Verify email notifications still work
- [ ] Load test with 100+ concurrent submissions

---

## Security Considerations

### Data Protection

- [ ] All passwords hashed with bcrypt (cost factor 12)
- [ ] JWT tokens signed with strong secret (min 32 chars)
- [ ] Sensitive data encrypted at rest (D1 encryption)
- [ ] File uploads validated (type, size, virus scan)
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevention (input sanitization)

### Access Control

- [ ] Role-based access control (admin, manager, user)
- [ ] API rate limiting (prevent abuse)
- [ ] CORS configuration (whitelist domains)
- [ ] Session timeout (7 days default)
- [ ] Token refresh mechanism (30 days max)
- [ ] Audit logging (track all admin actions)

### Privacy Compliance

- [ ] GDPR compliance (data deletion on request)
- [ ] Data retention policy (auto-delete after 2 years)
- [ ] User consent tracking
- [ ] Privacy policy updated
- [ ] Cookie consent banner

---

## Admin Dashboard Requirements

### Consultations Dashboard

- View all consultations (filterable by status, date, project type)
- Update consultation status
- Add notes to consultations
- Export to CSV
- Email client from dashboard
- Calendar view of scheduled consultations

### Job Applications Dashboard

- View all applications (filterable by status, position)
- View/download resumes
- Update application status
- Add interview notes
- Email applicant from dashboard
- Export to CSV

### Contact Submissions Dashboard

- View all submissions (filterable by urgency, status)
- Update submission status
- Add follow-up notes
- Export to CSV

### Analytics Dashboard

- Consultation conversion rate
- Application funnel metrics
- Response time metrics
- Lead source tracking
- Monthly/weekly trends

---

## Migration Plan

### Data Migration (if applicable)

1. Export any existing data from logs/memory
2. Transform to match new schema
3. Bulk insert into D1
4. Verify data integrity
5. Update API routes
6. Test thoroughly
7. Deploy

### Zero-Downtime Deployment

1. Deploy new API routes (with D1)
2. Keep old routes working (dual-write)
3. Monitor for 24 hours
4. Migrate old data
5. Switch traffic to new routes
6. Remove old routes after 1 week

---

## Performance Targets

- **Database Queries:** < 50ms average
- **File Uploads:** < 2s for 5MB resume
- **API Response Time:** < 200ms
- **Concurrent Users:** 100+ without degradation
- **Data Consistency:** 100% (ACID compliance)

---

## Rollback Plan

If issues occur:

1. Revert API routes to previous version
2. Switch back to email-only notifications
3. Preserve all submitted data in D1
4. Investigate issues
5. Fix and redeploy
6. No data loss guaranteed

---

## Post-Implementation Tasks

- [ ] Update documentation
- [ ] Train admin users on dashboard
- [ ] Set up monitoring alerts
- [ ] Schedule weekly database backups
- [ ] Create admin user guide
- [ ] Add API documentation
- [ ] Monitor performance metrics
- [ ] Collect user feedback

---

## Dependencies to Install

```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

---

## Success Criteria

✅ All consultations saved to database  
✅ All job applications saved to database  
✅ All contact submissions saved to database  
✅ Resume files uploaded to R2  
✅ Users can register and login  
✅ JWT authentication working  
✅ Admin can view all submissions  
✅ Email notifications still working  
✅ Zero data loss during deployment  
✅ Performance targets met  

---

## Next Steps

1. Review and approve this plan
2. Create Cloudflare D1 database
3. Set up environment variables
4. Begin implementation (Step 1)
5. Deploy incrementally with testing

**Estimated Total Time:** 4-6 hours for full implementation  
**Recommended Approach:** Implement in order (Steps 1-7), test after each step

---

**Plan Prepared By:** AI Assistant (Claude)  
**Date:** November 5, 2025  
**Status:** Ready for Implementation
