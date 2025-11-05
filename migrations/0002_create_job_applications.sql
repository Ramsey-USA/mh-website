-- Migration: Create job applications table
-- Created: 2025-11-05
-- Description: Store job applications with candidate details and resume links

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
