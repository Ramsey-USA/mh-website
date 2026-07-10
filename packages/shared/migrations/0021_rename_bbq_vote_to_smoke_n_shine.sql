-- Migration: 0021_rename_bbq_vote_to_smoke_n_shine
-- Purpose: Rename BBQ vote field to Smoke n Shine vote and add skipped_step1 flag

ALTER TABLE booth_entries RENAME COLUMN bbq_vote TO smoke_n_shine_vote;
ALTER TABLE booth_entries ADD COLUMN skipped_step1 INTEGER NOT NULL DEFAULT 0;
