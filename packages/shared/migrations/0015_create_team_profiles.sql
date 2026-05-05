-- Migration: Create team_profiles table
-- Created: 2026-04-24
-- Description: Stores profile override data submitted via the PWA employee questionnaire.
--              Fields here take precedence over the static JSON team data files.
--              slug matches VintageTeamMember.slug (e.g., "matt-ramsey").

CREATE TABLE IF NOT EXISTS team_profiles (
  slug TEXT PRIMARY KEY,

  -- Narrative fields
  bio TEXT,
  fun_fact TEXT,
  certifications TEXT,
  hobbies TEXT,
  special_interests TEXT,

  -- JSON array fields (stored as TEXT)
  career_highlights TEXT, -- JSON string[]
  specialties TEXT,       -- JSON string[]

  -- JSON object fields (stored as TEXT)
  skills TEXT,            -- JSON { leadership, technical, ... } (values 0-100)
  current_year_stats TEXT, -- JSON { projectsCompleted, clientSatisfaction, safetyRecord, teamCollaborations }
  career_stats TEXT,       -- JSON { totalProjects, yearsExperience, specialtyAreas, mentorships }

  -- Simple editable fields
  years_with_company INTEGER,
  hometown TEXT,
  education TEXT,
  nickname TEXT,

  -- Audit columns
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT  -- admin uid (e.g., "admin-matt")
);

CREATE INDEX idx_team_profiles_updated_at ON team_profiles(updated_at);
