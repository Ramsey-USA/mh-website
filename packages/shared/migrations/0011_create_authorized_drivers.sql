-- Migration: Create authorized_drivers table
-- Tracks employee driving authorization, license status, and MVR check history
-- Supports MISH 18 Motor Vehicle Safety Program compliance

CREATE TABLE IF NOT EXISTS authorized_drivers (
  id TEXT PRIMARY KEY,
  employee_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  license_number TEXT NOT NULL,
  license_state TEXT NOT NULL DEFAULT 'WA',
  license_class TEXT,
  cdl_endorsements TEXT,
  license_expiration_date TEXT NOT NULL,
  last_mvr_check_date TEXT,
  next_mvr_check_date TEXT,
  mvr_status TEXT NOT NULL DEFAULT 'pending',
  authorization_status TEXT NOT NULL DEFAULT 'pending',
  authorized_by TEXT,
  authorization_date TEXT,
  consent_on_file INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_authorized_drivers_license_expiration ON authorized_drivers(license_expiration_date);
CREATE INDEX IF NOT EXISTS idx_authorized_drivers_next_mvr_check ON authorized_drivers(next_mvr_check_date);
CREATE INDEX IF NOT EXISTS idx_authorized_drivers_authorization_status ON authorized_drivers(authorization_status);
