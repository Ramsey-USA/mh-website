-- Migration: Create consultations table
-- Created: 2025-11-05
-- Description: Store consultation bookings with client details and scheduling

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
