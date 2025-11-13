-- =====================================================
-- Canadian Tire Shop Directory - CSV Import Schema
-- =====================================================
-- Based on Outscraper CSV export structure
-- Optimized for Supabase PostgreSQL
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- MAIN TIRE SHOPS TABLE (Based on CSV columns)
-- =====================================================
CREATE TABLE tire_shops (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic business information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE, -- Auto-generated URL-friendly name

  -- Contact information
  site VARCHAR(500), -- Website URL
  phone VARCHAR(50),

  -- Address information
  full_address TEXT,
  street VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10),
  state VARCHAR(100), -- Province name (e.g., "Alberta")
  province_code VARCHAR(2), -- Two-letter code (e.g., "AB")

  -- Geographic coordinates
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Reviews and ratings
  reviews_count INTEGER DEFAULT 0,
  reviews_tags TEXT[], -- Array of review tags/keywords
  average_rating DECIMAL(3, 2), -- For future use

  -- Media URLs
  photo_url TEXT,
  street_view_url TEXT,

  -- Business hours and status
  working_hours JSONB, -- Store hours as JSON for flexibility
  business_status VARCHAR(50) DEFAULT 'OPERATIONAL', -- OPERATIONAL, CLOSED_TEMPORARILY, CLOSED_PERMANENTLY

  -- Business description
  description TEXT,

  -- Booking and reservation
  reservation_links TEXT,
  booking_appointment_link TEXT,
  location_link TEXT, -- Google Maps link

  -- Metadata and flags
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,

  -- Import tracking
  source VARCHAR(50) DEFAULT 'outscraper', -- Data source
  imported_at TIMESTAMPTZ DEFAULT NOW(),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_business_status CHECK (
    business_status IN ('OPERATIONAL', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY')
  )
);

-- =====================================================
-- PROVINCE MAPPING TABLE
-- =====================================================
CREATE TABLE provinces (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  name_fr VARCHAR(100)
);

-- Insert Canadian provinces with full names
INSERT INTO provinces (code, name, name_fr) VALUES
  ('AB', 'Alberta', 'Alberta'),
  ('BC', 'British Columbia', 'Colombie-Britannique'),
  ('MB', 'Manitoba', 'Manitoba'),
  ('NB', 'New Brunswick', 'Nouveau-Brunswick'),
  ('NL', 'Newfoundland and Labrador', 'Terre-Neuve-et-Labrador'),
  ('NS', 'Nova Scotia', 'Nouvelle-Écosse'),
  ('NT', 'Northwest Territories', 'Territoires du Nord-Ouest'),
  ('NU', 'Nunavut', 'Nunavut'),
  ('ON', 'Ontario', 'Ontario'),
  ('PE', 'Prince Edward Island', 'Île-du-Prince-Édouard'),
  ('QC', 'Quebec', 'Québec'),
  ('SK', 'Saskatchewan', 'Saskatchewan'),
  ('YT', 'Yukon', 'Yukon');

-- =====================================================
-- REVIEWS TABLE (For storing detailed reviews)
-- =====================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES tire_shops(id) ON DELETE CASCADE,

  -- Review details
  author_name VARCHAR(100),
  author_profile_photo TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date DATE,

  -- Review metadata
  helpful_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SERVICES TABLE (Optional - for categorizing services)
-- =====================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert common tire services
INSERT INTO services (name, description, icon) VALUES
  ('Tire Installation', 'Professional tire mounting and installation', 'wrench'),
  ('Tire Balancing', 'Wheel balancing services', 'scale'),
  ('Wheel Alignment', 'Precision wheel alignment', 'crosshair'),
  ('Tire Rotation', 'Regular tire rotation service', 'rotate'),
  ('Flat Tire Repair', 'Puncture repair and patching', 'patch'),
  ('Oil Change', 'Engine oil change service', 'oil'),
  ('Brake Service', 'Brake inspection and repair', 'brake'),
  ('Winter Tire Installation', 'Seasonal winter tire changeover', 'snowflake'),
  ('TPMS Service', 'Tire pressure monitoring system service', 'gauge'),
  ('Tire Storage', 'Seasonal tire storage service', 'storage');

-- =====================================================
-- SHOP SERVICES (Junction Table)
-- =====================================================
CREATE TABLE shop_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES tire_shops(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_shop_service UNIQUE (shop_id, service_id)
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Core search indexes
CREATE INDEX idx_tire_shops_name ON tire_shops(name);
CREATE INDEX idx_tire_shops_city ON tire_shops(city);
CREATE INDEX idx_tire_shops_state ON tire_shops(state);
CREATE INDEX idx_tire_shops_province_code ON tire_shops(province_code);
CREATE INDEX idx_tire_shops_postal_code ON tire_shops(postal_code);

-- Status and flags
CREATE INDEX idx_tire_shops_is_active ON tire_shops(is_active);
CREATE INDEX idx_tire_shops_is_featured ON tire_shops(is_featured);
CREATE INDEX idx_tire_shops_business_status ON tire_shops(business_status);

-- Geographic indexes
CREATE INDEX idx_tire_shops_location ON tire_shops(latitude, longitude);

-- Full-text search index
CREATE INDEX idx_tire_shops_search ON tire_shops
  USING gin(to_tsvector('english',
    COALESCE(name, '') || ' ' ||
    COALESCE(city, '') || ' ' ||
    COALESCE(description, '')
  ));

-- Reviews indexes
CREATE INDEX idx_reviews_shop_id ON reviews(shop_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_date ON reviews(review_date DESC);

-- Services junction indexes
CREATE INDEX idx_shop_services_shop_id ON shop_services(shop_id);
CREATE INDEX idx_shop_services_service_id ON shop_services(service_id);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tire_shops
CREATE TRIGGER update_tire_shops_updated_at
    BEFORE UPDATE ON tire_shops
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for reviews
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(text_input TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(text_input, '[^\w\s-]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '-+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug
CREATE OR REPLACE FUNCTION set_tire_shop_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.name);

        -- Ensure uniqueness
        WHILE EXISTS (
          SELECT 1 FROM tire_shops
          WHERE slug = NEW.slug
          AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
        ) LOOP
            NEW.slug = NEW.slug || '-' || floor(random() * 1000)::text;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_slug
    BEFORE INSERT OR UPDATE ON tire_shops
    FOR EACH ROW
    EXECUTE FUNCTION set_tire_shop_slug();

-- Function to map province name to code
CREATE OR REPLACE FUNCTION get_province_code(province_name TEXT)
RETURNS VARCHAR(2) AS $$
BEGIN
    RETURN (
        SELECT code FROM provinces
        WHERE LOWER(name) = LOWER(province_name)
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-populate province_code from state
CREATE OR REPLACE FUNCTION set_province_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.state IS NOT NULL AND (NEW.province_code IS NULL OR NEW.province_code = '') THEN
        NEW.province_code = get_province_code(NEW.state);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_set_province_code
    BEFORE INSERT OR UPDATE ON tire_shops
    FOR EACH ROW
    EXECUTE FUNCTION set_province_code();

-- =====================================================
-- VIEWS for Common Queries
-- =====================================================

-- Active shops with full details
CREATE OR REPLACE VIEW active_tire_shops AS
SELECT
    ts.id,
    ts.name,
    ts.slug,
    ts.site,
    ts.phone,
    ts.full_address,
    ts.street,
    ts.city,
    ts.state,
    ts.province_code,
    ts.postal_code,
    ts.latitude,
    ts.longitude,
    ts.reviews_count,
    ts.average_rating,
    ts.photo_url,
    ts.business_status,
    ts.description,
    ts.booking_appointment_link,
    ts.is_featured,
    ts.is_verified,
    ts.created_at
FROM tire_shops ts
WHERE ts.is_active = true
  AND ts.business_status = 'OPERATIONAL'
ORDER BY ts.is_featured DESC, ts.reviews_count DESC, ts.name;

-- Shop statistics by province
CREATE OR REPLACE VIEW shops_by_province AS
SELECT
    p.code,
    p.name as province_name,
    COUNT(ts.id) as total_shops,
    COUNT(CASE WHEN ts.is_verified THEN 1 END) as verified_shops,
    AVG(ts.reviews_count)::INTEGER as avg_reviews
FROM provinces p
LEFT JOIN tire_shops ts ON p.code = ts.province_code AND ts.is_active = true
GROUP BY p.code, p.name
ORDER BY total_shops DESC;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on tables
ALTER TABLE tire_shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_services ENABLE ROW LEVEL SECURITY;

-- Public read access for active tire shops
CREATE POLICY "Allow public read access to active tire shops"
    ON tire_shops FOR SELECT
    USING (is_active = true);

-- Public read access for reviews
CREATE POLICY "Allow public read access to reviews"
    ON reviews FOR SELECT
    USING (true);

-- Public read access for shop services
CREATE POLICY "Allow public read access to shop services"
    ON shop_services FOR SELECT
    USING (true);

-- =====================================================
-- CSV IMPORT HELPER FUNCTION
-- =====================================================

-- Function to import data from CSV format
-- This can be called after manually importing CSV data
CREATE OR REPLACE FUNCTION process_imported_shops()
RETURNS void AS $$
BEGIN
    -- Update province codes for any shops without them
    UPDATE tire_shops
    SET province_code = get_province_code(state)
    WHERE province_code IS NULL AND state IS NOT NULL;

    -- Generate slugs for shops without them
    UPDATE tire_shops
    SET slug = generate_slug(name)
    WHERE slug IS NULL OR slug = '';

    -- Set default values
    UPDATE tire_shops
    SET
        is_active = COALESCE(is_active, true),
        business_status = COALESCE(business_status, 'OPERATIONAL'),
        reviews_count = COALESCE(reviews_count, 0)
    WHERE is_active IS NULL OR business_status IS NULL OR reviews_count IS NULL;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SAMPLE CSV IMPORT QUERY (for reference)
-- =====================================================

/*
-- After creating the schema, you can import your CSV using Supabase dashboard:
-- 1. Go to Table Editor
-- 2. Select tire_shops table
-- 3. Click "Insert" > "Import data from CSV"
-- 4. Map the CSV columns to database columns:

CSV Column -> Database Column
-----------    ----------------
name -> name
site -> site
phone -> phone
full_address -> full_address
street -> street
city -> city
postal_code -> postal_code
state -> state
latitude -> latitude
longitude -> longitude
reviews -> reviews_count
reviews_tags -> reviews_tags (as text array)
photo -> photo_url
street_view -> street_view_url
working_hours -> working_hours (as JSONB)
business_status -> business_status
description -> description
reservation_links -> reservation_links
booking_appointment_link -> booking_appointment_link
location_link -> location_link

-- After import, run this to process the data:
SELECT process_imported_shops();
*/

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

/*
-- Search shops by city
SELECT * FROM active_tire_shops WHERE city = 'Fort Saskatchewan';

-- Search shops by province
SELECT * FROM active_tire_shops WHERE province_code = 'AB';

-- Full-text search
SELECT name, city, state, reviews_count
FROM tire_shops
WHERE to_tsvector('english', name || ' ' || city) @@ to_tsquery('english', 'trail & tire')
  AND is_active = true;

-- Find shops near coordinates (within ~50km)
SELECT
    name,
    city,
    reviews_count,
    (6371 * acos(
        cos(radians(53.7114931)) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(-113.2101697)) +
        sin(radians(53.7114931)) *
        sin(radians(latitude))
    )) AS distance_km
FROM tire_shops
WHERE is_active = true
  AND latitude IS NOT NULL
  AND longitude IS NOT NULL
HAVING distance_km < 50
ORDER BY distance_km;

-- Get shop statistics
SELECT
    COUNT(*) as total_shops,
    COUNT(CASE WHEN is_verified THEN 1 END) as verified_shops,
    COUNT(CASE WHEN is_featured THEN 1 END) as featured_shops,
    AVG(reviews_count)::INTEGER as avg_reviews,
    COUNT(DISTINCT province_code) as provinces_covered
FROM tire_shops
WHERE is_active = true;
*/

-- =====================================================
-- END OF SCHEMA
-- =====================================================

COMMENT ON TABLE tire_shops IS 'Main table for tire shop listings imported from Outscraper CSV';
COMMENT ON COLUMN tire_shops.working_hours IS 'Business hours stored as JSONB for flexibility';
COMMENT ON COLUMN tire_shops.reviews_tags IS 'Array of review keywords/tags';
COMMENT ON COLUMN tire_shops.business_status IS 'Current operational status from Google Maps';
