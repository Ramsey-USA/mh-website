-- Migration: Create safety_intake_submissions table
-- Stores metadata for public Safety document intake uploads.
-- Files are stored in the SAFETY_INTAKE R2 bucket and reviewed before publication.

CREATE TABLE IF NOT EXISTS safety_intake_submissions (
  id TEXT PRIMARY KEY,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  company_name TEXT,
  category TEXT NOT NULL,
  notes TEXT,
  original_filename TEXT NOT NULL,
  file_key TEXT NOT NULL,
  content_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  review_notes TEXT,
  source_ip TEXT,
  turnstile_verified INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_safety_intake_status
  ON safety_intake_submissions(status);

CREATE INDEX IF NOT EXISTS idx_safety_intake_category
  ON safety_intake_submissions(category);

CREATE INDEX IF NOT EXISTS idx_safety_intake_created_at
  ON safety_intake_submissions(created_at);