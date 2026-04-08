-- Migration: 0009_create_safety_form_submissions
-- Creates the safety_form_submissions table for tracking superintendent form entries

CREATE TABLE IF NOT EXISTS safety_form_submissions (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id),
  form_type TEXT NOT NULL,   -- 'toolbox-talk' | 'site-safety-inspection' | 'incident-report' | 'jha'
  submitted_by TEXT NOT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data TEXT NOT NULL,        -- JSON blob of the form field values
  print_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'submitted'  -- 'submitted' | 'reviewed' | 'archived'
);

CREATE INDEX IF NOT EXISTS idx_safety_forms_job ON safety_form_submissions(job_id);
CREATE INDEX IF NOT EXISTS idx_safety_forms_type ON safety_form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_safety_forms_submitted_at ON safety_form_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_safety_forms_status ON safety_form_submissions(status);
