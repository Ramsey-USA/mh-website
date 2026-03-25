-- Migration: Add created_at indexes for admin list queries
-- Created: 2026-03-25
-- Description: All three submission tables are queried with ORDER BY created_at DESC
-- in the admin dashboard (form-handler.ts listRecords). Without this index D1
-- performs a full table scan + sort on every admin list request.

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at);

CREATE INDEX IF NOT EXISTS idx_consultations_created_at
  ON consultations (created_at);

CREATE INDEX IF NOT EXISTS idx_job_applications_created_at
  ON job_applications (created_at);
