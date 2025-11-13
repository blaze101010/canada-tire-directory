-- Create user_submissions table to track shop submissions by users
CREATE TABLE IF NOT EXISTS user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Shop information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  website TEXT,
  description TEXT,
  services TEXT[] NOT NULL,
  owner_name TEXT NOT NULL,
  additional_info TEXT,

  -- Submission metadata
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,

  -- If approved, link to the listing
  listing_id UUID REFERENCES listings(id),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON user_submissions(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_user_submissions_status ON user_submissions(status);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_user_submissions_submitted_at ON user_submissions(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own submissions
CREATE POLICY "Users can view their own submissions"
  ON user_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own submissions
CREATE POLICY "Users can create submissions"
  ON user_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own pending submissions
CREATE POLICY "Users can update their own pending submissions"
  ON user_submissions
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Policy: Authenticated users (admins) can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON user_submissions
  FOR SELECT
  USING (true); -- This will be refined based on admin role check

-- Policy: Authenticated users (admins) can update any submission
CREATE POLICY "Admins can update submissions"
  ON user_submissions
  FOR UPDATE
  USING (true); -- This will be refined based on admin role check

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_submissions_updated_at
  BEFORE UPDATE ON user_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_submissions_updated_at();

-- Add comments for documentation
COMMENT ON TABLE user_submissions IS 'Tracks tire shop submissions from registered users';
COMMENT ON COLUMN user_submissions.status IS 'Submission status: pending, approved, or rejected';
COMMENT ON COLUMN user_submissions.listing_id IS 'Links to the listings table if submission is approved';
