-- Migration: Store Operation: Cast & Recover registrations
-- Veteran roster placement is assigned by the registration API.

CREATE TABLE IF NOT EXISTS cast_recover_registrations (
  id TEXT PRIMARY KEY,
  event_slug TEXT NOT NULL DEFAULT 'operation-cast-recover-2026',
  registration_type TEXT NOT NULL CHECK (registration_type IN ('veteran', 'captain')),
  full_name TEXT NOT NULL,
  branch_of_service TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  emergency_contact TEXT,
  tshirt_size TEXT,
  vessel_type_length TEXT,
  passenger_capacity INTEGER,
  gear_notes TEXT,
  roster_status TEXT NOT NULL CHECK (roster_status IN ('confirmed', 'alternate', 'received')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (event_slug, registration_type, email)
);

CREATE INDEX IF NOT EXISTS idx_cast_recover_roster
  ON cast_recover_registrations(event_slug, registration_type, roster_status);

CREATE INDEX IF NOT EXISTS idx_cast_recover_created_at
  ON cast_recover_registrations(created_at);