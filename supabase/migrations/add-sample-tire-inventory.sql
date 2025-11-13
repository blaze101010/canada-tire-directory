-- Add sample tire inventory for testing the price comparison feature
-- This will add tires to the first 20 shops in Alberta

-- First, let's add tire inventory for Alberta shops (where you have 958 shops)
-- We'll add multiple tire options to showcase price comparison

INSERT INTO shop_tire_inventory (
  listing_id,
  brand_id,
  category_id,
  size_id,
  model_name,
  price_per_tire,
  installation_price,
  in_stock,
  warranty_months
)
SELECT
  l.id as listing_id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1) as brand_id,
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1) as category_id,
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1) as size_id,
  'Defender T+H' as model_name,
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 0 THEN 129.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 1 THEN 139.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 2 THEN 119.99
    ELSE 149.99
  END as price_per_tire,
  25.00 as installation_price,
  true as in_stock,
  60 as warranty_months
FROM listings l
WHERE l.province = 'Alberta'
LIMIT 50;

-- Add Bridgestone tires to another set of shops
INSERT INTO shop_tire_inventory (
  listing_id,
  brand_id,
  category_id,
  size_id,
  model_name,
  price_per_tire,
  installation_price,
  in_stock,
  warranty_months
)
SELECT
  l.id as listing_id,
  (SELECT id FROM tire_brands WHERE name = 'Bridgestone' LIMIT 1) as brand_id,
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1) as category_id,
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1) as size_id,
  'Turanza QuietTrack' as model_name,
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 0 THEN 135.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 1 THEN 145.99
    ELSE 125.99
  END as price_per_tire,
  30.00 as installation_price,
  true as in_stock,
  65 as warranty_months
FROM listings l
WHERE l.province = 'Alberta'
OFFSET 50
LIMIT 50;

-- Add Goodyear winter tires
INSERT INTO shop_tire_inventory (
  listing_id,
  brand_id,
  category_id,
  size_id,
  model_name,
  price_per_tire,
  installation_price,
  in_stock,
  warranty_months
)
SELECT
  l.id as listing_id,
  (SELECT id FROM tire_brands WHERE name = 'Goodyear' LIMIT 1) as brand_id,
  (SELECT id FROM tire_categories WHERE name = 'Winter/Snow' LIMIT 1) as category_id,
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1) as size_id,
  'Ultra Grip Ice WRT' as model_name,
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 0 THEN 159.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 1 THEN 169.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 2 THEN 149.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 3 THEN 179.99
    ELSE 139.99
  END as price_per_tire,
  35.00 as installation_price,
  true as in_stock,
  48 as warranty_months
FROM listings l
WHERE l.province = 'Alberta'
OFFSET 100
LIMIT 50;

-- Add some SUV tire sizes
INSERT INTO shop_tire_inventory (
  listing_id,
  brand_id,
  category_id,
  size_id,
  model_name,
  price_per_tire,
  installation_price,
  in_stock,
  warranty_months
)
SELECT
  l.id as listing_id,
  (SELECT id FROM tire_brands WHERE name = 'Continental' LIMIT 1) as brand_id,
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1) as category_id,
  (SELECT id FROM tire_sizes WHERE size = '225/65R17' LIMIT 1) as size_id,
  'CrossContact LX25' as model_name,
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 0 THEN 165.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 1 THEN 175.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 2 THEN 155.99
    ELSE 185.99
  END as price_per_tire,
  40.00 as installation_price,
  true as in_stock,
  70 as warranty_months
FROM listings l
WHERE l.province = 'Alberta'
OFFSET 150
LIMIT 40;

-- Add tires for British Columbia shops as well
INSERT INTO shop_tire_inventory (
  listing_id,
  brand_id,
  category_id,
  size_id,
  model_name,
  price_per_tire,
  installation_price,
  in_stock,
  warranty_months
)
SELECT
  l.id as listing_id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1) as brand_id,
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1) as category_id,
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1) as size_id,
  'Defender T+H' as model_name,
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 0 THEN 134.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 1 THEN 144.99
    ELSE 124.99
  END as price_per_tire,
  28.00 as installation_price,
  true as in_stock,
  60 as warranty_months
FROM listings l
WHERE l.province = 'British Columbia'
LIMIT 17;
