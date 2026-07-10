-- Migration: 0018_create_booth_entries
-- Purpose: Store Cool Desert Nights 2026 booth event entries
--          (lead capture + Hilti guess + BBQ tasting vote)
-- Data retention: event-scoped; deduplicate on phone number for official tally

CREATE TABLE IF NOT EXISTS booth_entries (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  full_name       TEXT     NOT NULL,
  phone           TEXT     NOT NULL,
  email           TEXT     NOT NULL,
  hilti_guess     INTEGER  NOT NULL,
  bbq_vote        TEXT     NOT NULL,
  cached_locally  INTEGER  NOT NULL DEFAULT 0,  -- 1 when entry was first persisted via localStorage fallback
  submitted_at    TEXT     NOT NULL DEFAULT (datetime('now')),
  created_at      TEXT     NOT NULL DEFAULT (datetime('now'))
);

-- Index for the deduplication query used by admin CSV export
CREATE INDEX IF NOT EXISTS idx_booth_entries_phone ON booth_entries (phone);
CREATE INDEX IF NOT EXISTS idx_booth_entries_submitted_at ON booth_entries (submitted_at);
