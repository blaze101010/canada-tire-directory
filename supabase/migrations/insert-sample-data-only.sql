-- Fixed script to add sample tire inventory
-- Uses 'province' column instead of 'state'

-- Add sample tire inventory for Alberta shops
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
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Defender T+H',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 0 THEN 129.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 1 THEN 139.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 2 THEN 119.99
    ELSE 149.99
  END,
  25.00,
  true,
  60
FROM listings l
WHERE l.state = 'Alberta'
LIMIT 50;

-- Add Bridgestone tires
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
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Bridgestone' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Turanza QuietTrack',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 0 THEN 135.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 1 THEN 145.99
    ELSE 125.99
  END,
  30.00,
  true,
  65
FROM listings l
WHERE l.state = 'Alberta'
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
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Goodyear' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'Winter/Snow' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Ultra Grip Ice WRT',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 0 THEN 159.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 1 THEN 169.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 2 THEN 149.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 5 = 3 THEN 179.99
    ELSE 139.99
  END,
  35.00,
  true,
  48
FROM listings l
WHERE l.state = 'Alberta'
OFFSET 100
LIMIT 50;

-- Add Continental SUV tires
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
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Continental' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '225/65R17' LIMIT 1),
  'CrossContact LX25',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 0 THEN 165.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 1 THEN 175.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 4 = 2 THEN 155.99
    ELSE 185.99
  END,
  40.00,
  true,
  70
FROM listings l
WHERE l.state = 'Alberta'
OFFSET 150
LIMIT 40;

-- Add tires for British Columbia
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
  l.id,
  (SELECT id FROM tire_brands WHERE name = 'Michelin' LIMIT 1),
  (SELECT id FROM tire_categories WHERE name = 'All-Season' LIMIT 1),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16' LIMIT 1),
  'Defender T+H',
  CASE
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 0 THEN 134.99
    WHEN ROW_NUMBER() OVER (ORDER BY l.id) % 3 = 1 THEN 144.99
    ELSE 124.99
  END,
  28.00,
  true,
  60
FROM listings l
WHERE l.state = 'British Columbia'
LIMIT 17;
