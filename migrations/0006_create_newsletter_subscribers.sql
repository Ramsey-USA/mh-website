-- Newsletter Subscribers Table
-- Stores newsletter signups with GDPR-compliant unsubscribe support.
-- Unsubscribe tokens are 32-byte random hex strings generated at insert time.

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email        TEXT NOT NULL UNIQUE,
  name         TEXT,
  unsubscribe_token TEXT NOT NULL UNIQUE,
  subscribed   INTEGER NOT NULL DEFAULT 1,  -- 1 = active, 0 = unsubscribed
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email
  ON newsletter_subscribers (email);

CREATE INDEX IF NOT EXISTS idx_newsletter_token
  ON newsletter_subscribers (unsubscribe_token);
