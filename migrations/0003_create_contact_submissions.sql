-- Migration: Create contact submissions table
-- Created: 2025-11-05
-- Description: Store contact form submissions for lead tracking

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
