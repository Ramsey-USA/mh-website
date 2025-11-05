# D1 Migration Guide - Run Manually via Dashboard

Since the API token doesn't have D1 execute permissions, run these migrations directly in the Cloudflare Dashboard.

## Database URL

**Production:** <https://dash.cloudflare.com/60ac45cad5eead847d2ae20dab3661da/workers/d1/databases/98ad144a-cfe2-4f19-a55c-c43140279840>

---

## Migration 1: Consultations Table

```sql
-- Migration: Create consultations table
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
  metadata TEXT
);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_date ON consultations(selected_date);
CREATE INDEX idx_consultations_email ON consultations(email);
```

---

## Migration 2: Job Applications Table

```sql
-- Migration: Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  position TEXT NOT NULL,
  experience TEXT,
  availability TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  veteran_status TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT
);

CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_position ON job_applications(position);
CREATE INDEX idx_job_applications_email ON job_applications(email);
```

---

## Migration 3: Contact Submissions Table

```sql
-- Migration: Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  location TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT,
  urgency TEXT DEFAULT 'medium',
  preferred_contact_method TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT
);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_urgency ON contact_submissions(urgency);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
```

---

## Migration 4: Users Table

```sql
-- Migration: Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  first_name TEXT,
  last_name TEXT,
  veteran_status TEXT,
  is_active INTEGER DEFAULT 1,
  email_verified INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

---

## Migration 5: Sessions Table

```sql
-- Migration: Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash);
```

---

## Verification Query

After running all migrations, verify tables were created:

```sql
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
```

You should see:

- consultations
- contact_submissions
- job_applications
- sessions
- users

---

## Next Steps

After running migrations, let me know and I'll:

1. Test the API endpoints with real D1
2. Deploy to Cloudflare Pages
3. Verify everything works end-to-end
