-- Migration: 0014_create_safety_access_log
-- Tracks authenticated hub access events for audit, notifications, and compliance.

CREATE TABLE IF NOT EXISTS safety_access_log (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'login',
      'logout',
      'download',
      'form_view',
      'form_submit',
      'manual_view',
      'joining_view',
      'compliance_warning'
    )
  ),
  role TEXT NOT NULL,
  user_name TEXT NOT NULL,
  resource_key TEXT,
  resource_title TEXT,
  job_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  accessed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_access_log_event_type ON safety_access_log(event_type);
CREATE INDEX IF NOT EXISTS idx_access_log_role ON safety_access_log(role);
CREATE INDEX IF NOT EXISTS idx_access_log_accessed_at ON safety_access_log(accessed_at);
CREATE INDEX IF NOT EXISTS idx_access_log_user_name ON safety_access_log(user_name);
