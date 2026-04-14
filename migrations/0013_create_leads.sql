-- Migration: Create leads table
-- Created: 2026-04-14
-- Description: Unified CRM for lead tracking across all submission sources
--
-- Workflow: New → Contacted → Estimate Sent → Won/Lost

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  
  -- Source tracking (where did this lead come from?)
  source TEXT NOT NULL, -- 'contact_form', 'consultation', 'phone_call', 'referral', 'walk_in'
  source_id TEXT, -- ID from source table (contact_submissions.id, consultations.id, etc.)
  
  -- Contact information
  contact_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Project details
  project_type TEXT,
  project_location TEXT,
  project_description TEXT,
  
  -- CRM fields
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'estimate_sent', 'negotiating', 'won', 'lost'
  estimated_value INTEGER, -- Project value in dollars
  probability INTEGER DEFAULT 50, -- Win probability percentage (0-100)
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  
  -- Assignment & follow-up
  assigned_to TEXT, -- 'matt', 'jeremy', 'unassigned'
  follow_up_date TEXT, -- ISO date string for next follow-up
  last_contact_date TEXT, -- ISO date of most recent contact
  
  -- Notes (JSON array of timestamped notes)
  notes TEXT DEFAULT '[]',
  
  -- Lost reason (when status = 'lost')
  lost_reason TEXT, -- 'price', 'timing', 'competitor', 'scope_change', 'unresponsive', 'other'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP, -- When status changed to won/lost
  
  -- Additional metadata (JSON)
  metadata TEXT DEFAULT '{}'
);

-- Indexes for common queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_follow_up_date ON leads(follow_up_date);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_email ON leads(email);

-- Composite index for dashboard queries (active leads by assignee)
CREATE INDEX idx_leads_assigned_status ON leads(assigned_to, status);
