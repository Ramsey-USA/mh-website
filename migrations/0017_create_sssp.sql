-- Migration: 0017_create_sssp
-- Creates tables for AI-assisted Site Specific Safety Plan (SSSP) generation

CREATE TABLE IF NOT EXISTS sssp (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  content TEXT,
  r2_key TEXT,
  generated_at TIMESTAMP,
  approved_by TEXT,
  approved_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE TABLE IF NOT EXISTS sssp_source_files (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  sssp_id TEXT,
  original_filename TEXT NOT NULL,
  file_key TEXT NOT NULL,
  content_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by TEXT NOT NULL,
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (sssp_id) REFERENCES sssp(id)
);

CREATE INDEX IF NOT EXISTS idx_sssp_job_id ON sssp(job_id);
CREATE INDEX IF NOT EXISTS idx_sssp_status ON sssp(status);
CREATE INDEX IF NOT EXISTS idx_sssp_source_files_job_id ON sssp_source_files(job_id);
CREATE INDEX IF NOT EXISTS idx_sssp_source_files_sssp_id ON sssp_source_files(sssp_id);
