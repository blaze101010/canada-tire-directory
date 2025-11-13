-- Add working hours fields to listings table
ALTER TABLE public.listings
ADD COLUMN IF NOT EXISTS working_hours JSONB,
ADD COLUMN IF NOT EXISTS hours_monday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_tuesday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_wednesday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_thursday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_friday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_saturday VARCHAR(50),
ADD COLUMN IF NOT EXISTS hours_sunday VARCHAR(50),
ADD COLUMN IF NOT EXISTS is_open_now BOOLEAN DEFAULT NULL,
ADD COLUMN IF NOT EXISTS is_24_hours BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS hours_last_updated TIMESTAMP WITH TIME ZONE;

-- Create index for faster queries on open shops
CREATE INDEX IF NOT EXISTS idx_listings_is_open_now ON public.listings(is_open_now) WHERE is_open_now = true;

-- Comment on columns
COMMENT ON COLUMN public.listings.working_hours IS 'Complete working hours data in JSON format from Google Places';
COMMENT ON COLUMN public.listings.hours_monday IS 'Monday hours (e.g., "9:00 AM - 6:00 PM" or "Closed")';
COMMENT ON COLUMN public.listings.hours_tuesday IS 'Tuesday hours';
COMMENT ON COLUMN public.listings.hours_wednesday IS 'Wednesday hours';
COMMENT ON COLUMN public.listings.hours_thursday IS 'Thursday hours';
COMMENT ON COLUMN public.listings.hours_friday IS 'Friday hours';
COMMENT ON COLUMN public.listings.hours_saturday IS 'Saturday hours';
COMMENT ON COLUMN public.listings.hours_sunday IS 'Sunday hours';
COMMENT ON COLUMN public.listings.is_open_now IS 'Whether the shop is currently open';
COMMENT ON COLUMN public.listings.is_24_hours IS 'Whether the shop is open 24 hours';
COMMENT ON COLUMN public.listings.hours_last_updated IS 'When the hours were last updated';
