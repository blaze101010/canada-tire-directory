-- =====================================================
-- Canadian Tire Shop Directory - Database Schema
-- =====================================================
-- Created for Supabase PostgreSQL
-- Best practices: UUIDs, timestamps, indexes, RLS ready
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROVINCES TABLE
-- =====================================================
CREATE TABLE provinces (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_fr VARCHAR(100), -- French name for bilingual support
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Canadian provinces
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
-- TIRE SHOPS TABLE
-- =====================================================
CREATE TABLE tire_shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE, -- URL-friendly version of name

  -- Address information
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(2) NOT NULL REFERENCES provinces(code),
  postal_code VARCHAR(7) NOT NULL, -- A1A 1A1 format

  -- Contact information
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  website VARCHAR(500),

  -- Business details
  description TEXT,
  established_year INTEGER,

  -- Location coordinates (for future map integration)
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Status and visibility
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_postal_code CHECK (postal_code ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_year CHECK (established_year >= 1900 AND established_year <= EXTRACT(YEAR FROM CURRENT_DATE))
);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50), -- Icon name/class for UI
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert common tire shop services
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
  price_range VARCHAR(50), -- e.g., "$50-$100", "Contact for pricing"
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint to prevent duplicate services per shop
  CONSTRAINT unique_shop_service UNIQUE (shop_id, service_id)
);

-- =====================================================
-- OPERATING HOURS TABLE
-- =====================================================
CREATE TABLE operating_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES tire_shops(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one entry per shop per day
  CONSTRAINT unique_shop_day UNIQUE (shop_id, day_of_week),

  -- Check that open time is before close time
  CONSTRAINT valid_hours CHECK (
    (is_closed = true) OR
    (open_time IS NOT NULL AND close_time IS NOT NULL AND open_time < close_time)
  )
);

-- =====================================================
-- REVIEWS TABLE (Optional - for future use)
-- =====================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES tire_shops(id) ON DELETE CASCADE,

  -- Review details
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  comment TEXT,

  -- Moderation
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BRANDS TABLE (Tire brands carried by shops)
-- =====================================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  logo_url VARCHAR(500),
  website VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert popular tire brands
INSERT INTO brands (name) VALUES
  ('Michelin'),
  ('Bridgestone'),
  ('Goodyear'),
  ('Continental'),
  ('Pirelli'),
  ('Yokohama'),
  ('Dunlop'),
  ('Hankook'),
  ('Cooper'),
  ('Firestone'),
  ('BFGoodrich'),
  ('Toyo'),
  ('Nokian'),
  ('Kumho'),
  ('General Tire');

-- =====================================================
-- SHOP BRANDS (Junction Table)
-- =====================================================
CREATE TABLE shop_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES tire_shops(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_shop_brand UNIQUE (shop_id, brand_id)
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Tire shops indexes
CREATE INDEX idx_tire_shops_province ON tire_shops(province);
CREATE INDEX idx_tire_shops_city ON tire_shops(city);
CREATE INDEX idx_tire_shops_is_active ON tire_shops(is_active);
CREATE INDEX idx_tire_shops_is_featured ON tire_shops(is_featured);
CREATE INDEX idx_tire_shops_slug ON tire_shops(slug);
CREATE INDEX idx_tire_shops_location ON tire_shops(latitude, longitude); -- For geo queries
CREATE INDEX idx_tire_shops_search ON tire_shops USING gin(to_tsvector('english', name || ' ' || city)); -- Full-text search

-- Shop services indexes
CREATE INDEX idx_shop_services_shop_id ON shop_services(shop_id);
CREATE INDEX idx_shop_services_service_id ON shop_services(service_id);

-- Operating hours indexes
CREATE INDEX idx_operating_hours_shop_id ON operating_hours(shop_id);
CREATE INDEX idx_operating_hours_day ON operating_hours(day_of_week);

-- Reviews indexes
CREATE INDEX idx_reviews_shop_id ON reviews(shop_id);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Shop brands indexes
CREATE INDEX idx_shop_brands_shop_id ON shop_brands(shop_id);
CREATE INDEX idx_shop_brands_brand_id ON shop_brands(brand_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
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
            regexp_replace(text_input, '[^a-zA-Z0-9\s-]', '', 'g'),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug for tire_shops
CREATE OR REPLACE FUNCTION set_tire_shop_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.name);

        -- Ensure uniqueness by appending counter if needed
        WHILE EXISTS (SELECT 1 FROM tire_shops WHERE slug = NEW.slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
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

-- =====================================================
-- VIEWS for Common Queries
-- =====================================================

-- View: Active shops with full details
CREATE OR REPLACE VIEW active_tire_shops AS
SELECT
    ts.id,
    ts.name,
    ts.slug,
    ts.address,
    ts.city,
    p.name as province_name,
    ts.province as province_code,
    ts.postal_code,
    ts.phone,
    ts.email,
    ts.website,
    ts.description,
    ts.latitude,
    ts.longitude,
    ts.is_featured,
    ts.is_verified,
    ts.created_at,
    ts.updated_at
FROM tire_shops ts
JOIN provinces p ON ts.province = p.code
WHERE ts.is_active = true
ORDER BY ts.is_featured DESC, ts.name;

-- View: Shop ratings summary
CREATE OR REPLACE VIEW shop_ratings AS
SELECT
    shop_id,
    COUNT(*) as total_reviews,
    AVG(rating)::NUMERIC(3,2) as average_rating,
    COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_count,
    COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_count,
    COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_count,
    COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_count,
    COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_count
FROM reviews
WHERE is_approved = true
GROUP BY shop_id;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE tire_shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE operating_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_brands ENABLE ROW LEVEL SECURITY;

-- Public read access for active tire shops
CREATE POLICY "Allow public read access to active tire shops"
    ON tire_shops FOR SELECT
    USING (is_active = true);

-- Public read access for approved reviews
CREATE POLICY "Allow public read access to approved reviews"
    ON reviews FOR SELECT
    USING (is_approved = true);

-- Public read access for shop services
CREATE POLICY "Allow public read access to shop services"
    ON shop_services FOR SELECT
    USING (true);

-- Public read access for operating hours
CREATE POLICY "Allow public read access to operating hours"
    ON operating_hours FOR SELECT
    USING (true);

-- Public read access for shop brands
CREATE POLICY "Allow public read access to shop brands"
    ON shop_brands FOR SELECT
    USING (true);

-- =====================================================
-- SAMPLE DATA for Testing
-- =====================================================

-- Insert sample tire shops
INSERT INTO tire_shops (name, address, city, province, postal_code, phone, email, website, description, is_active, is_verified) VALUES
  ('Calgary Tire Center', '1234 17th Avenue SW', 'Calgary', 'AB', 'T2T 0A1', '(403) 555-0101', 'info@calgarytire.ca', 'https://calgarytire.ca', 'Full-service tire shop in Calgary offering quality tires and expert service.', true, true),
  ('Edmonton Wheel & Tire', '5678 Whyte Avenue', 'Edmonton', 'AB', 'T6E 1W9', '(780) 555-0202', 'contact@edmontonwheels.ca', NULL, 'Your trusted tire experts in Edmonton since 1995.', true, true),
  ('Vancouver Tire Experts', '890 Granville Street', 'Vancouver', 'BC', 'V6Z 1K3', '(604) 555-0303', 'info@vantire.ca', 'https://vantire.ca', 'Premium tire service in downtown Vancouver.', true, true),
  ('Victoria Tire Service', '456 Douglas Street', 'Victoria', 'BC', 'V8W 2B8', '(250) 555-0404', NULL, NULL, 'Reliable tire service for Victoria residents.', true, false),
  ('Toronto Tire Masters', '1456 Yonge Street', 'Toronto', 'ON', 'M4T 1Y5', '(416) 555-1001', 'hello@torontotire.ca', 'https://torontotire.ca', 'Toronto''s premier tire service destination.', true, true),
  ('Ottawa Tire Warehouse', '789 Bank Street', 'Ottawa', 'ON', 'K1S 3V5', '(613) 555-1002', NULL, NULL, 'Wide selection of tires at competitive prices.', true, false);

-- =====================================================
-- USEFUL QUERIES (commented out - for reference)
-- =====================================================

/*
-- Search shops by city and province
SELECT * FROM active_tire_shops
WHERE city = 'Calgary' AND province_code = 'AB';

-- Search shops with full-text search
SELECT * FROM tire_shops
WHERE to_tsvector('english', name || ' ' || city) @@ to_tsquery('english', 'tire & calgary');

-- Get shop with services
SELECT
    ts.name,
    ts.city,
    ts.province,
    json_agg(json_build_object('service', s.name, 'price_range', ss.price_range)) as services
FROM tire_shops ts
JOIN shop_services ss ON ts.id = ss.shop_id
JOIN services s ON ss.service_id = s.id
WHERE ts.id = 'your-shop-id'
GROUP BY ts.id, ts.name, ts.city, ts.province;

-- Get shops with average rating
SELECT
    ts.*,
    COALESCE(sr.average_rating, 0) as avg_rating,
    COALESCE(sr.total_reviews, 0) as review_count
FROM tire_shops ts
LEFT JOIN shop_ratings sr ON ts.id = sr.shop_id
WHERE ts.is_active = true
ORDER BY ts.is_featured DESC, sr.average_rating DESC;

-- Find shops within radius (requires PostGIS for accurate calculations)
-- This is a simple approximation
SELECT *,
    (6371 * acos(
        cos(radians(your_latitude)) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(your_longitude)) +
        sin(radians(your_latitude)) *
        sin(radians(latitude))
    )) AS distance_km
FROM tire_shops
WHERE is_active = true
HAVING distance_km < 50
ORDER BY distance_km;
*/

-- =====================================================
-- END OF SCHEMA
-- =====================================================

COMMENT ON TABLE tire_shops IS 'Main table storing tire shop information';
COMMENT ON TABLE services IS 'Available services that tire shops can offer';
COMMENT ON TABLE shop_services IS 'Junction table linking shops to their offered services';
COMMENT ON TABLE operating_hours IS 'Business hours for each tire shop';
COMMENT ON TABLE reviews IS 'Customer reviews and ratings for tire shops';
COMMENT ON TABLE brands IS 'Tire brands available in the directory';
COMMENT ON TABLE shop_brands IS 'Junction table linking shops to tire brands they carry';
