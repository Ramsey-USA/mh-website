-- Migration: 0020_add_booth_entry_newsletter_optin
-- Purpose: Add newsletter opt-in field to booth entries for Cool Desert Nights event

ALTER TABLE booth_entries ADD COLUMN newsletter_opt_in INTEGER NOT NULL DEFAULT 0;
