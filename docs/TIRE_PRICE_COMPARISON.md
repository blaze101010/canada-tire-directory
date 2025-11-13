# Tire Price Comparison Feature

## Overview

The Tire Price Comparison feature allows users to find and compare tire prices from different shops across Canada. Users can specify their tire requirements, budget, and location to get personalized recommendations.

## Features Implemented

### 1. **Tire Finder Wizard** (`/find-tires`)
A 5-step guided process that helps users specify what they need:

#### Step 1: Tire Type and Size
- Select tire category (All-Season, Winter/Snow, Summer/Performance, etc.)
- Choose tire size from common options
- Visual cards with descriptions

#### Step 2: Vehicle Information (Optional)
- Enter vehicle year, make, and model
- Helps shops recommend the best tires

#### Step 3: Preferences
- Select quantity (1, 2, or 4 tires)
- Choose preferred brand (optional)
- Set budget range per tire
- Indicate if installation is needed

#### Step 4: Location
- Select province
- Enter city (optional)
- Used to find nearby shops

#### Step 5: Review & Submit
- Review all selections
- See summary of requirements
- Click "Find Best Prices" to search

### 2. **Price Comparison Results** (`/compare-prices`)

#### Features:
- **Side-by-side shop comparison** showing:
  - Shop name, location, and rating
  - Tire details (brand, model, size, category)
  - Price per tire
  - Installation price (if requested)
  - Total cost breakdown
  - Warranty information
  - Stock status

- **Sorting options**:
  - Lowest Price (default)
  - Highest Rating

- **Best Deal Badge**: Highlights the shop with the lowest total price

- **Savings Calculator**: Shows how much users can save by choosing the best deal

- **Quick Actions**:
  - Call shop directly
  - View shop details

### 3. **Homepage Integration**

Added a prominent CTA section on the homepage featuring:
- Eye-catching design with gradient background
- Visual example of price comparison
- Benefits list (compare prices, filter by brand, see installation costs)
- Direct link to tire finder

## Database Schema

### Tables Created:

#### 1. `tire_categories`
```sql
- id: UUID
- name: TEXT (unique)
- description: TEXT
```

Pre-populated with:
- All-Season
- Winter/Snow
- Summer/Performance
- All-Terrain
- Mud-Terrain
- Run-Flat

#### 2. `tire_sizes`
```sql
- id: UUID
- size: TEXT (unique)
- display_name: TEXT
```

Pre-populated with 15+ common tire sizes from compact cars to large trucks.

#### 3. `tire_brands`
```sql
- id: UUID
- name: TEXT (unique)
- logo_url: TEXT
```

Pre-populated with 17 popular brands:
- Michelin, Bridgestone, Goodyear, Continental, Pirelli, etc.

#### 4. `shop_tire_inventory`
```sql
- id: UUID
- listing_id: UUID (FK to listings)
- brand_id: UUID (FK to tire_brands)
- category_id: UUID (FK to tire_categories)
- size_id: UUID (FK to tire_sizes)
- model_name: TEXT
- price_per_tire: DECIMAL
- installation_price: DECIMAL
- in_stock: BOOLEAN
- stock_quantity: INTEGER
- warranty_months: INTEGER
- speed_rating: TEXT
- load_index: TEXT
- notes: TEXT
```

#### 5. `tire_quotes`
```sql
- id: UUID
- user_id: UUID (FK to auth.users)
- Vehicle info: year, make, model
- Tire requirements: size_id, category_id, brand_id, quantity
- Budget: min/max
- Location: city, province
- Contact info: name, email, phone
- Status: pending/contacted/completed
```

## User Flow

### For Shoppers:

1. **Discovery**: User visits homepage and sees "Compare Tire Prices" CTA
2. **Tire Finder**: Clicks button and goes through 5-step wizard
3. **Requirements**: Specifies tire type, size, quantity, budget
4. **Results**: Gets list of shops with matching tires sorted by price
5. **Comparison**: Compares prices, ratings, and features side-by-side
6. **Contact**: Calls preferred shop or views details

### For Shop Owners:

Shop owners can manage their tire inventory through their dashboard:
1. Add tire products they carry
2. Set prices per tire
3. Set installation prices
4. Manage stock availability
5. Update warranty information

*(Pricing management dashboard to be implemented)*

## API Endpoints

### Public Endpoints:

**GET** `/api/tire-categories`
- Returns all tire categories

**GET** `/api/tire-sizes`
- Returns all tire sizes

**GET** `/api/tire-brands`
- Returns all tire brands

**GET** `/api/shop-inventory`
- Query params: category, size, brand, minPrice, maxPrice, province, city
- Returns matching tire inventory with shop details

## Security

### Row Level Security (RLS):

**shop_tire_inventory**:
- Public read access (SELECT for all)
- Shop owners can manage their own inventory
- Admins can manage all inventory

**tire_quotes**:
- Users can view their own quotes
- Public can create quotes
- Users can update their own quotes

## Setup Instructions

### 1. Run Database Migration

Execute the SQL migration in Supabase SQL Editor:

```bash
# File location:
supabase/migrations/create-tire-pricing-tables.sql
```

This will:
- Create all 5 tables
- Add indexes for performance
- Set up RLS policies
- Pre-populate categories, sizes, and brands

### 2. Verify Tables

In Supabase Dashboard → Table Editor, verify:
- `tire_categories` (6 rows)
- `tire_sizes` (15 rows)
- `tire_brands` (17 rows)
- `shop_tire_inventory` (empty, ready for data)
- `tire_quotes` (empty)

### 3. Test the Feature

1. Visit homepage: http://localhost:3000
2. Scroll to "Compare Tire Prices" section
3. Click "Find Best Tire Prices"
4. Complete the wizard
5. View results (will be empty until shops add inventory)

## Adding Sample Data

To test the feature, add sample tire inventory:

```sql
-- Example: Add tire inventory for a shop
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
) VALUES (
  (SELECT id FROM listings LIMIT 1),
  (SELECT id FROM tire_brands WHERE name = 'Michelin'),
  (SELECT id FROM tire_categories WHERE name = 'All-Season'),
  (SELECT id FROM tire_sizes WHERE size = '215/60R16'),
  'Defender T+H',
  129.99,
  25.00,
  true,
  60
);
```

## Future Enhancements

### Phase 1 (High Priority):
- [ ] Shop owner pricing dashboard
- [ ] Bulk inventory upload (CSV)
- [ ] Email quotes to users
- [ ] Save favorite shops

### Phase 2 (Medium Priority):
- [ ] Real-time price alerts
- [ ] Tire reviews and ratings
- [ ] Installation appointment booking
- [ ] Mobile app optimization

### Phase 3 (Nice to Have):
- [ ] Tire rebate tracking
- [ ] Seasonal tire storage pricing
- [ ] Tire size calculator by vehicle VIN
- [ ] Price history graphs

## SEO Benefits

The price comparison feature improves SEO by:
- Creating unique, valuable content for users
- Encouraging longer session times
- Reducing bounce rates
- Generating user engagement
- Providing location-specific results
- Building backlinks from price comparison mentions

## Analytics to Track

Key metrics to monitor:
- Tire finder completions
- Average time in wizard
- Drop-off rate per step
- Most searched tire categories
- Most searched tire sizes
- Geographic distribution of searches
- Conversion rate (searches → phone calls)

## Support

For questions or issues:
- Check browser console for errors
- Verify database migration ran successfully
- Ensure RLS policies are active
- Test with sample data first

---

**Created:** 2025-11-07
**Version:** 1.0.0
**Status:** Production Ready (pending migration)
