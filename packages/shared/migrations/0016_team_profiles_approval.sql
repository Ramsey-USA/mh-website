-- Migration: Add approval workflow columns to team_profiles
-- Created: 2026-04-24
-- Description: Submissions are now held as 'pending_approval' until Matt
--              reviews and approves or rejects them.  Only 'approved' rows
--              are surfaced on the public team page.

ALTER TABLE team_profiles ADD COLUMN status TEXT NOT NULL DEFAULT 'pending_approval';

-- ISO-8601 text timestamps (D1 stores timestamps as TEXT)
ALTER TABLE team_profiles ADD COLUMN submitted_at TEXT;
ALTER TABLE team_profiles ADD COLUMN reviewed_at TEXT;
ALTER TABLE team_profiles ADD COLUMN reviewed_by TEXT;  -- uid of reviewer
ALTER TABLE team_profiles ADD COLUMN rejection_reason TEXT;

-- Backfill: any rows that existed before this migration keep 'pending_approval'
-- (no public rows yet, but safe to be explicit).

CREATE INDEX IF NOT EXISTS idx_team_profiles_status ON team_profiles(status);
