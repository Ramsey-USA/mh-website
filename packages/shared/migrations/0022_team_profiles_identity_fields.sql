-- Migration: Add identity fields for team profile onboarding
-- Created: 2026-07-01
-- Description: Allows questionnaire submissions for new employees who are not
--              pre-seeded in static team JSON files.

ALTER TABLE team_profiles ADD COLUMN full_name TEXT;
ALTER TABLE team_profiles ADD COLUMN role_title TEXT;
ALTER TABLE team_profiles ADD COLUMN department TEXT;
ALTER TABLE team_profiles ADD COLUMN position_title TEXT;
ALTER TABLE team_profiles ADD COLUMN employee_email TEXT;
ALTER TABLE team_profiles ADD COLUMN active INTEGER NOT NULL DEFAULT 1;

CREATE INDEX IF NOT EXISTS idx_team_profiles_department ON team_profiles(department);
CREATE INDEX IF NOT EXISTS idx_team_profiles_active ON team_profiles(active);
