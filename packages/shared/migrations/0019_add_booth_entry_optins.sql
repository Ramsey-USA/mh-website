-- Migration: 0019_add_booth_entry_optins
-- Purpose: Capture explicit event communication preferences for lead follow-up

ALTER TABLE booth_entries ADD COLUMN hilti_contact_opt_in INTEGER NOT NULL DEFAULT 0;
ALTER TABLE booth_entries ADD COLUMN mhc_project_inquiry_opt_in INTEGER NOT NULL DEFAULT 0;
