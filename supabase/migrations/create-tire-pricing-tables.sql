-- Create tire_categories table
CREATE TABLE IF NOT EXISTS tire_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default tire categories
INSERT INTO tire_categories (name, description) VALUES
  ('All-Season', 'Tires designed for year-round use in various conditions'),
  ('Winter/Snow', 'Specialized tires for cold weather and snowy conditions'),
  ('Summer/Performance', 'High-performance tires for warm weather driving'),
  ('All-Terrain', 'Rugged tires for off-road and on-road use'),
  ('Mud-Terrain', 'Heavy-duty tires for extreme off-road conditions'),
  ('Run-Flat', 'Tires that can be driven on even after a puncture')
ON CONFLICT (name) DO NOTHING;

-- Create tire_sizes table (common tire sizes)
CREATE TABLE IF NOT EXISTS tire_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  size TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common tire sizes
INSERT INTO tire_sizes (size, display_name) VALUES
  ('195/65R15', '195/65R15 (Compact Cars)'),
  ('205/55R16', '205/55R16 (Sedans)'),
  ('215/60R16', '215/60R16 (Mid-size Cars)'),
  ('225/65R17', '225/65R17 (SUVs)'),
  ('235/65R17', '235/65R17 (SUVs)'),
  ('245/70R17', '245/70R17 (Trucks)'),
  ('265/70R17', '265/70R17 (Trucks)'),
  ('225/60R18', '225/60R18 (Crossovers)'),
  ('235/60R18', '235/60R18 (Crossovers)'),
  ('255/55R18', '255/55R18 (SUVs)'),
  ('275/55R20', '275/55R20 (Large SUVs/Trucks)'),
  ('P205/55R16', 'P205/55R16 (Passenger)'),
  ('P215/65R16', 'P215/65R16 (Passenger)'),
  ('P225/60R17', 'P225/60R17 (Passenger)'),
  ('LT265/70R17', 'LT265/70R17 (Light Truck)')
ON CONFLICT (size) DO NOTHING;

-- Create tire_brands table
CREATE TABLE IF NOT EXISTS tire_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert popular tire brands
INSERT INTO tire_brands (name) VALUES
  ('Michelin'),
  ('Bridgestone'),
  ('Goodyear'),
  ('Continental'),
  ('Pirelli'),
  ('Dunlop'),
  ('Yokohama'),
  ('Hankook'),
  ('Cooper'),
  ('Firestone'),
  ('BFGoodrich'),
  ('Toyo'),
  ('Kumho'),
  ('General Tire'),
  ('Nexen'),
  ('Falken'),
  ('Nokian')
ON CONFLICT (name) DO NOTHING;

-- Create shop_tire_inventory table
CREATE TABLE IF NOT EXISTS shop_tire_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,

  -- Tire details
  brand_id UUID REFERENCES tire_brands(id),
  category_id UUID REFERENCES tire_categories(id),
  size_id UUID REFERENCES tire_sizes(id),
  model_name TEXT,

  -- Pricing
  price_per_tire DECIMAL(10, 2) NOT NULL,
  installation_price DECIMAL(10, 2),

  -- Availability
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER,

  -- Additional info
  warranty_months INTEGER,
  speed_rating TEXT,
  load_index TEXT,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_listing ON shop_tire_inventory(listing_id);
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_brand ON shop_tire_inventory(brand_id);
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_category ON shop_tire_inventory(category_id);
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_size ON shop_tire_inventory(size_id);
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_price ON shop_tire_inventory(price_per_tire);
CREATE INDEX IF NOT EXISTS idx_shop_tire_inventory_stock ON shop_tire_inventory(in_stock);

-- Create tire_quotes table for user quote requests
CREATE TABLE IF NOT EXISTS tire_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),

  -- Vehicle information
  vehicle_year INTEGER,
  vehicle_make TEXT,
  vehicle_model TEXT,

  -- Tire requirements
  tire_size_id UUID REFERENCES tire_sizes(id),
  tire_category_id UUID REFERENCES tire_categories(id),
  preferred_brand_id UUID REFERENCES tire_brands(id),
  quantity INTEGER NOT NULL DEFAULT 4,

  -- Additional preferences
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  needs_installation BOOLEAN DEFAULT true,
  location_city TEXT,
  location_province TEXT,

  -- Contact info (for non-authenticated users)
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- Status
  status TEXT DEFAULT 'pending',
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for tire_quotes
CREATE INDEX IF NOT EXISTS idx_tire_quotes_user ON tire_quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_tire_quotes_status ON tire_quotes(status);
CREATE INDEX IF NOT EXISTS idx_tire_quotes_location ON tire_quotes(location_province, location_city);

-- Enable Row Level Security
ALTER TABLE shop_tire_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE tire_quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shop_tire_inventory
CREATE POLICY "Anyone can view tire inventory"
  ON shop_tire_inventory
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage their shop inventory"
  ON shop_tire_inventory
  FOR ALL
  USING (true); -- Will be refined based on shop ownership

-- RLS Policies for tire_quotes
CREATE POLICY "Users can view their own quotes"
  ON tire_quotes
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create quotes"
  ON tire_quotes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own quotes"
  ON tire_quotes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_tire_inventory_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_tire_quotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_shop_tire_inventory_updated_at
  BEFORE UPDATE ON shop_tire_inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_tire_inventory_updated_at();

CREATE TRIGGER update_tire_quotes_updated_at
  BEFORE UPDATE ON tire_quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_tire_quotes_updated_at();

-- Add comments
COMMENT ON TABLE tire_categories IS 'Types of tires (All-Season, Winter, etc.)';
COMMENT ON TABLE tire_sizes IS 'Common tire sizes';
COMMENT ON TABLE tire_brands IS 'Tire manufacturer brands';
COMMENT ON TABLE shop_tire_inventory IS 'Tire inventory and pricing for each shop';
COMMENT ON TABLE tire_quotes IS 'Customer tire quote requests';
