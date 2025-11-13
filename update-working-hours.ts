import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

if (!googleApiKey) {
  console.error('⚠️  GOOGLE_PLACES_API_KEY not found in .env.local');
  console.error('Please add your Google Places API key to continue.');
  console.error('Get an API key at: https://console.cloud.google.com/apis/credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface PlaceDetails {
  opening_hours?: {
    periods?: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
    weekday_text?: string[];
    open_now?: boolean;
  };
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Rate limiting
const DELAY_MS = 100; // 10 requests per second (well under API limit)
const BATCH_SIZE = 100; // Process 100 shops at a time

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatTime(time: string): string {
  // Convert "1300" to "1:00 PM"
  const hour = parseInt(time.substring(0, 2));
  const minute = time.substring(2);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
}

function parseGoogleHours(placeDetails: PlaceDetails) {
  const hours: any = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  };

  if (!placeDetails.opening_hours) {
    return { hours, isOpenNow: null, is24Hours: false };
  }

  const { weekday_text, open_now, periods } = placeDetails.opening_hours;

  // Check if 24 hours
  const is24Hours = periods?.some(p => !p.close) || false;

  // Parse weekday_text (e.g., "Monday: 9:00 AM – 6:00 PM")
  if (weekday_text && weekday_text.length > 0) {
    weekday_text.forEach(text => {
      const parts = text.split(': ');
      if (parts.length === 2) {
        const day = parts[0].toLowerCase();
        const time = parts[1];

        if (DAYS.includes(day)) {
          if (time === 'Closed') {
            hours[day] = 'Closed';
          } else if (time.includes('Open 24 hours')) {
            hours[day] = 'Open 24 hours';
          } else {
            hours[day] = time;
          }
        }
      }
    });
  }

  return {
    hours,
    isOpenNow: open_now ?? null,
    is24Hours,
  };
}

async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${googleApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      return data.result;
    } else if (data.status === 'OVER_QUERY_LIMIT') {
      console.error('❌ Google API quota exceeded');
      throw new Error('QUOTA_EXCEEDED');
    } else {
      console.warn(`⚠️  Could not fetch details for place ${placeId}: ${data.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching place ${placeId}:`, error);
    return null;
  }
}

async function searchPlaceAndGetId(name: string, address: string): Promise<string | null> {
  try {
    const query = `${name} ${address}`;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${googleApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    }
    return null;
  } catch (error) {
    console.error('Error searching for place:', error);
    return null;
  }
}

async function updateShopHours(shopId: string, placeId: string) {
  await sleep(DELAY_MS); // Rate limiting

  const placeDetails = await fetchPlaceDetails(placeId);

  if (!placeDetails) {
    return { success: false, reason: 'No details found' };
  }

  const { hours, isOpenNow, is24Hours } = parseGoogleHours(placeDetails);

  // Update database
  const { error } = await supabase
    .from('listings')
    .update({
      working_hours: placeDetails.opening_hours,
      hours_monday: hours.monday,
      hours_tuesday: hours.tuesday,
      hours_wednesday: hours.wednesday,
      hours_thursday: hours.thursday,
      hours_friday: hours.friday,
      hours_saturday: hours.saturday,
      hours_sunday: hours.sunday,
      is_open_now: isOpenNow,
      is_24_hours: is24Hours,
      hours_last_updated: new Date().toISOString(),
    })
    .eq('id', shopId);

  if (error) {
    console.error(`Error updating shop ${shopId}:`, error);
    return { success: false, reason: 'Database error' };
  }

  return { success: true };
}

async function processShops(startIndex: number = 0) {
  console.log('🚀 Starting working hours update process...\n');

  // Get total count
  const { count: totalCount } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 Total shops in database: ${totalCount}`);
  console.log(`Starting from index: ${startIndex}\n`);

  let processed = 0;
  let updated = 0;
  let failed = 0;
  let offset = startIndex;

  while (offset < (totalCount || 0)) {
    console.log(`\n📦 Processing batch ${Math.floor(offset / BATCH_SIZE) + 1} (shops ${offset + 1} to ${Math.min(offset + BATCH_SIZE, totalCount || 0)})...`);

    // Fetch batch of shops
    const { data: shops, error } = await supabase
      .from('listings')
      .select('id, name, full_address, phone, latitude, longitude')
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      console.error('Error fetching shops:', error);
      break;
    }

    if (!shops || shops.length === 0) {
      break;
    }

    // Process each shop in the batch
    for (const shop of shops) {
      processed++;

      // Try to find place_id using coordinates or search
      let placeId: string | null = null;

      if (shop.latitude && shop.longitude) {
        // Search by location
        try {
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${shop.latitude},${shop.longitude}&radius=50&keyword=${encodeURIComponent(shop.name)}&key=${googleApiKey}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.status === 'OK' && data.results && data.results.length > 0) {
            placeId = data.results[0].place_id;
          }
        } catch (error) {
          console.error('Error in nearby search:', error);
        }
      }

      // Fallback to text search if no coordinates or nearby search failed
      if (!placeId && shop.full_address) {
        placeId = await searchPlaceAndGetId(shop.name, shop.full_address);
        await sleep(DELAY_MS);
      }

      if (placeId) {
        const result = await updateShopHours(shop.id, placeId);
        if (result.success) {
          updated++;
          console.log(`✅ [${processed}/${totalCount}] Updated: ${shop.name}`);
        } else {
          failed++;
          console.log(`⚠️  [${processed}/${totalCount}] Failed: ${shop.name} (${result.reason})`);
        }
      } else {
        failed++;
        console.log(`❌ [${processed}/${totalCount}] No Place ID found: ${shop.name}`);
      }
    }

    offset += BATCH_SIZE;

    // Progress summary
    console.log(`\n📈 Progress: ${processed}/${totalCount} processed | ${updated} updated | ${failed} failed`);
    console.log(`⏱️  Estimated time remaining: ${Math.ceil(((totalCount || 0) - processed) * 0.2 / 60)} minutes\n`);
  }

  console.log('\n✨ Update process completed!');
  console.log(`\n📊 Final Summary:`);
  console.log(`   Total processed: ${processed}`);
  console.log(`   Successfully updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Success rate: ${((updated / processed) * 100).toFixed(1)}%`);
}

// Run the script
const startIndex = parseInt(process.argv[2] || '0');
processShops(startIndex).catch(console.error);
