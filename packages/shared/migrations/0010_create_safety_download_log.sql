-- Migration: 0010_create_safety_download_log
-- Tracks PDF section and form download events from the field safety hub.
-- Enables admin visibility into which sections field staff are downloading,
-- and allows per-superintendent download history in the field hub.

CREATE TABLE IF NOT EXISTS safety_download_log (
  id TEXT PRIMARY KEY,
  section_key TEXT NOT NULL,       -- e.g. 'AISH_01', 'toolbox-talk', 'jha'
  section_title TEXT,              -- human-readable section title for display
  download_type TEXT NOT NULL,     -- 'section' | 'form'
  downloaded_by TEXT NOT NULL,     -- superintendent name from JWT user.name
  job_id TEXT,                     -- optional job context when job is selected
  downloaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_download_log_section ON safety_download_log(section_key);
CREATE INDEX IF NOT EXISTS idx_download_log_user ON safety_download_log(downloaded_by);
CREATE INDEX IF NOT EXISTS idx_download_log_at ON safety_download_log(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_download_log_type ON safety_download_log(download_type);
