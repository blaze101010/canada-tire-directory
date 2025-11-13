# Working Hours Update Guide

This guide explains how to update accurate working hours for all tire shops in the database using Google Places API.

## Overview

The system will:
- ✅ Add working hours fields to the database
- ✅ Fetch accurate, real-time hours from Google Places API
- ✅ Process all 6,730+ shops in batches
- ✅ Handle rate limiting automatically
- ✅ Provide detailed progress tracking

## Prerequisites

### 1. Google Places API Key

You'll need a Google Cloud API key with Places API enabled.

#### Get API Key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Places API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

#### Enable Required APIs:

Make sure these are enabled in your project:
- ✅ Places API
- ✅ Maps JavaScript API (for place details)
- ✅ Geocoding API (optional, for better matching)

### 2. Add API Key to Environment

Add your Google API key to `.env.local`:

```bash
GOOGLE_PLACES_API_KEY=your_api_key_here
```

## Step-by-Step Process

### Step 1: Run Database Migration

First, add the working hours fields to your database:

```sql
-- Copy and paste the SQL from:
supabase/migrations/add_working_hours.sql
```

**In Supabase Dashboard:**
1. Go to your Supabase project
2. Click "SQL Editor" in the sidebar
3. Click "New Query"
4. Paste the contents of `add_working_hours.sql`
5. Click "Run"

This adds the following fields to your `listings` table:
- `working_hours` (JSONB) - Complete hours data from Google
- `hours_monday` through `hours_sunday` - Human-readable hours
- `is_open_now` - Boolean for current status
- `is_24_hours` - Boolean for 24-hour shops
- `hours_last_updated` - Timestamp

### Step 2: Run the Update Script

Update working hours for all shops:

```bash
npx tsx update-working-hours.ts
```

**Resume from a specific index:**
```bash
npx tsx update-working-hours.ts 1000
# Starts from shop #1000 (useful if script was interrupted)
```

### Script Features

#### Automatic Processing:
- ✅ Processes 100 shops per batch
- ✅ Rate limiting (10 requests/second)
- ✅ Automatic retries for failed requests
- ✅ Progress tracking with ETA
- ✅ Detailed logging

#### Matching Strategy:
1. **First try**: Use latitude/longitude for nearby search (most accurate)
2. **Fallback**: Use shop name + address for text search
3. **Result**: Fetches place_id and working hours

#### Sample Output:
```
🚀 Starting working hours update process...

📊 Total shops in database: 6730
Starting from index: 0

📦 Processing batch 1 (shops 1 to 100)...
✅ [1/6730] Updated: Canadian Tire - Calgary
✅ [2/6730] Updated: Fountain Tire - Edmonton
⚠️  [3/6730] Failed: ABC Tire Shop (No Place ID found)
...

📈 Progress: 100/6730 processed | 95 updated | 5 failed
⏱️  Estimated time remaining: 22 minutes
```

## Understanding the Results

### Success Indicators:
- ✅ **Updated**: Hours successfully fetched and saved
- ⚠️  **Failed**: Could not find place or fetch hours
- ❌ **No Place ID found**: Shop not found in Google Places

### Common Reasons for Failures:
1. Shop permanently closed
2. Address mismatch between database and Google
3. Shop not listed in Google Places
4. API quota exceeded (rare with rate limiting)

## API Costs & Limits

### Google Places API Pricing:

| Operation | Cost per Request | Monthly Free Tier |
|-----------|------------------|-------------------|
| Find Place | $17 per 1,000 | First $200 free |
| Place Details | $17 per 1,000 | First $200 free |

**Estimated Cost for 6,730 shops:**
- ~13,460 API calls (2 calls per shop average)
- ~$229 total cost
- **With $200 free credit: ~$29**

### Rate Limits:
- Default: 1,000 requests/second (we use 10/sec)
- Daily limit: Set in Google Cloud Console
- Script respects limits automatically

## Monitoring Progress

### Real-Time Monitoring:
Watch the console output for:
- Current progress (X/6730)
- Success/failure counts
- Estimated time remaining

### Check Database:
Query Supabase to see updated shops:

```sql
SELECT
  name,
  hours_monday,
  hours_tuesday,
  is_open_now,
  hours_last_updated
FROM listings
WHERE hours_last_updated IS NOT NULL
ORDER BY hours_last_updated DESC
LIMIT 10;
```

## Handling Interruptions

### If Script Stops:
The script can be resumed from any point:

```bash
# Resume from shop #2500
npx tsx update-working-hours.ts 2500
```

### Find Resume Point:
Check how many shops have been updated:

```sql
SELECT COUNT(*)
FROM listings
WHERE hours_last_updated IS NOT NULL;
```

## Displaying Hours on Frontend

### Example: Shop Detail Page

```tsx
import { TireShop } from '@/types';

function ShopHours({ shop }: { shop: TireShop }) {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const hours = {
    monday: shop.hours_monday,
    tuesday: shop.hours_tuesday,
    wednesday: shop.hours_wednesday,
    thursday: shop.hours_thursday,
    friday: shop.hours_friday,
    saturday: shop.hours_saturday,
    sunday: shop.hours_sunday,
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">Hours of Operation</h3>

      {shop.is_open_now !== null && (
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
          shop.is_open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {shop.is_open_now ? '🟢 Open Now' : '🔴 Closed'}
        </div>
      )}

      <div className="space-y-2">
        {days.map((day, index) => {
          const dayHours = hours[day as keyof typeof hours];
          const isToday = index === today;

          return (
            <div
              key={day}
              className={`flex justify-between py-2 ${isToday ? 'bg-blue-50 px-3 rounded font-semibold' : ''}`}
            >
              <span className="capitalize">{day}:</span>
              <span className={dayHours === 'Closed' ? 'text-red-600' : 'text-gray-700'}>
                {dayHours || 'N/A'}
              </span>
            </div>
          );
        })}
      </div>

      {shop.hours_last_updated && (
        <p className="text-xs text-gray-500 mt-4">
          Last updated: {new Date(shop.hours_last_updated).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
```

### Example: Shop Card Badge

```tsx
function ShopCard({ shop }: { shop: TireShop }) {
  return (
    <div className="shop-card">
      {/* Shop info */}
      <h3>{shop.name}</h3>

      {/* Open Now Badge */}
      {shop.is_open_now && (
        <span className="badge bg-green-100 text-green-800">
          Open Now
        </span>
      )}

      {/* Today's Hours */}
      {getTodayHours(shop) && (
        <p className="text-sm text-gray-600">
          Today: {getTodayHours(shop)}
        </p>
      )}
    </div>
  );
}

function getTodayHours(shop: TireShop): string | null {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const hoursKey = `hours_${today}` as keyof TireShop;
  return shop[hoursKey] as string | null;
}
```

## Keeping Hours Up-to-Date

### Automated Updates:
Set up a cron job to update hours weekly:

```bash
# Add to crontab (runs every Sunday at 2 AM)
0 2 * * 0 cd /path/to/project && npx tsx update-working-hours.ts
```

### Manual Updates:
Re-run the script anytime to refresh hours:

```bash
npx tsx update-working-hours.ts
```

### Update Single Shop:
Create a simplified version for updating individual shops (useful for corrections).

## Troubleshooting

### "QUOTA_EXCEEDED" Error:
**Problem**: API quota limit reached

**Solutions**:
1. Wait until quota resets (usually daily)
2. Increase quota in Google Cloud Console
3. Resume script when quota available

### "Missing API Key" Error:
**Problem**: `GOOGLE_PLACES_API_KEY` not in `.env.local`

**Solution**:
```bash
echo "GOOGLE_PLACES_API_KEY=your_key_here" >> .env.local
```

### Low Success Rate (<80%):
**Problem**: Many shops not found in Google Places

**Possible Causes**:
- Incorrect addresses in database
- Shops closed/out of business
- Name mismatch

**Solutions**:
1. Review failed shops manually
2. Update shop addresses in database
3. Use alternative data sources for missing shops

### Script Hanging:
**Problem**: Script stops responding

**Solution**:
1. Press Ctrl+C to stop
2. Note the last processed index
3. Resume from that point:
   ```bash
   npx tsx update-working-hours.ts <last_index>
   ```

## API Key Security

### Important Security Notes:

❌ **Never commit API keys to Git**
✅ **Always use environment variables**
✅ **Restrict API key in Google Console**

### Restrict Your API Key:

1. Go to Google Cloud Console → Credentials
2. Click on your API key
3. Under "API restrictions", select:
   - Places API
   - Maps JavaScript API
4. Under "Application restrictions", set IP restrictions if possible

## Cost Optimization

### Ways to Reduce Costs:

1. **Run once, update periodically**: Most hours don't change often
2. **Cache results**: Store place_id for future lookups
3. **Update only changed shops**: Track last update date
4. **Use batch processing**: Process multiple shops in one request where possible

## Next Steps

After updating hours:
1. ✅ Display hours on shop detail pages
2. ✅ Add "Open Now" filter to search
3. ✅ Show today's hours on shop cards
4. ✅ Add business hours to schema markup (SEO)
5. ✅ Set up automated weekly updates

## Support

For issues or questions:
- Check Google Places API documentation
- Review script logs for specific errors
- Test with a small sample first (modify BATCH_SIZE)

---

**Remember**: Run the database migration first, then the update script. The process will take approximately 20-30 minutes for all 6,730 shops.
