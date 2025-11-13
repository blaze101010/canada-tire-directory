-- Comprehensive tire inventory for ALL Canadian provinces
-- This adds multiple tire sizes and brands for each province

-- ============================================
-- 205/55R16 - Popular compact/sedan size
-- ============================================

-- Michelin All-Season 205/55R16 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '205/55R16' LIMIT 1),
  'Primacy MXM4',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 0 THEN 109.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 1 THEN 119.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 2 THEN 99.99
    ELSE 129.99
  END,
  25.00, true, 60
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
LIMIT 500;

-- Goodyear All-Season 205/55R16 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Goodyear' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '205/55R16' LIMIT 1),
  'Assurance WeatherReady',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 0 THEN 115.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 1 THEN 125.99
    ELSE 105.99
  END,
  30.00, true, 65
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- ============================================
-- 215/60R16 - Popular mid-size sedan
-- ============================================

-- Bridgestone All-Season 215/60R16 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Bridgestone' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Turanza QuietTrack',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 0 THEN 135.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 1 THEN 145.99
    ELSE 125.99
  END,
  30.00, true, 65
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- ============================================
-- 225/65R17 - Popular SUV/Crossover size
-- ============================================

-- Continental All-Season 225/65R17 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Continental' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '225/65R17' LIMIT 1),
  'CrossContact LX25',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 0 THEN 165.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 1 THEN 175.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 2 THEN 155.99
    ELSE 185.99
  END,
  40.00, true, 70
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- ============================================
-- 235/65R17 - Popular SUV size
-- ============================================

-- Michelin All-Season 235/65R17 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '235/65R17' LIMIT 1),
  'CrossClimate SUV',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 0 THEN 179.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 1 THEN 189.99
    ELSE 169.99
  END,
  40.00, true, 65
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- ============================================
-- WINTER TIRES - 215/60R16
-- ============================================

-- Goodyear Winter 215/60R16 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Goodyear' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'Winter/Snow' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Ultra Grip Ice WRT',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 5 = 0 THEN 159.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 5 = 1 THEN 169.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 5 = 2 THEN 149.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 5 = 3 THEN 179.99
    ELSE 139.99
  END,
  35.00, true, 48
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- Bridgestone Winter 215/60R16 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Bridgestone' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'Winter/Snow' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Blizzak WS90',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 0 THEN 155.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 1 THEN 165.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 4 = 2 THEN 145.99
    ELSE 175.99
  END,
  35.00, true, 50
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;

-- ============================================
-- WINTER TIRES - 225/65R17 (SUV)
-- ============================================

-- Michelin Winter 225/65R17 for ALL provinces
INSERT INTO shop_tire_inventory (
  listing_id, brand_id, category_id, size_id,
  model_name, price_per_tire, installation_price, in_stock, warranty_months
)
SELECT
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'Winter/Snow' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '225/65R17' LIMIT 1),
  'X-Ice Snow',
  CASE
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 0 THEN 189.99
    WHEN ROW_NUMBER() OVER (PARTITION BY l.state ORDER BY l.id) % 3 = 1 THEN 199.99
    ELSE 179.99
  END,
  40.00, true, 55
FROM listings l
WHERE l.state IN ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
                   'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
                   'Prince Edward Island', 'Quebec', 'Saskatchewan')
  AND l.id NOT IN (SELECT listing_id FROM shop_tire_inventory)
LIMIT 500;
