-- Migration: 0008_create_jobs
-- Creates the jobs table for the safety hub superintendent tracking system

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  job_number TEXT NOT NULL UNIQUE,
  job_name TEXT NOT NULL,
  location TEXT,
  pm_name TEXT,
  super_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_number ON jobs(job_number);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);
