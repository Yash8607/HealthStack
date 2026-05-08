-- Add is_active column to hospitals table
ALTER TABLE hospitals ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- Add user_phone column to emergency_requests (missing from V1)
ALTER TABLE emergency_requests ADD COLUMN user_phone VARCHAR(20);

-- Additional indexes for emergency_requests
CREATE INDEX idx_emergency_status ON emergency_requests(status);
CREATE INDEX idx_emergency_status_created ON emergency_requests(status, created_at DESC);
