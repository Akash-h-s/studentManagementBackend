CREATE TABLE bulk_uploads (
  id TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES teachers(id),
  total_records INTEGER NOT NULL,
  successful_records INTEGER DEFAULT 0,
  failed_records INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'completed_with_errors', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add upload_batch_id to students table
ALTER TABLE students ADD COLUMN upload_batch_id TEXT;
