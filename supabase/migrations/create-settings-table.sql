-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS settings_key_idx ON public.settings(key);

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', 'TireShopPro.ca'),
  ('site_url', 'https://tireshoppro.ca'),
  ('contact_email', ''),
  ('google_places_api_key', '')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read settings
CREATE POLICY "Allow authenticated users to read settings"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update settings
CREATE POLICY "Allow authenticated users to update settings"
  ON public.settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to insert settings
CREATE POLICY "Allow authenticated users to insert settings"
  ON public.settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow public read access for certain settings (optional - remove if you want all settings private)
CREATE POLICY "Allow public to read public settings"
  ON public.settings
  FOR SELECT
  TO anon
  USING (key IN ('site_name', 'site_url'));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
