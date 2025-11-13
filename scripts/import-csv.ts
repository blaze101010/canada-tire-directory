import fs from 'fs';
import csv from 'csv-parser';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Configuration
const BATCH_SIZE = 500; // Import 500 rows at a time
const CSV_FILE_PATH = process.argv[2] || '../Outscraper-20251105070352s7c_tire_shop copy.csv';

interface CSVRow {
  name: string;
  site?: string;
  phone?: string;
  full_address?: string;
  street?: string;
  city: string;
  postal_code?: string;
  state?: string;
  latitude?: string;
  longitude?: string;
  reviews?: string;
  reviews_tags?: string;
  photo?: string;
  street_view?: string;
  working_hours?: string;
  business_status?: string;
  description?: string;
  reservation_links?: string;
  booking_appointment_link?: string;
  location_link?: string;
}

// Transform CSV row to database format
function transformRow(row: CSVRow) {
  return {
    name: row.name || 'Unknown',
    site: row.site || null,
    phone: row.phone || null,
    full_address: row.full_address || null,
    street: row.street || null,
    city: row.city || 'Unknown',
    postal_code: row.postal_code || null,
    state: row.state || null,
    latitude: row.latitude ? parseFloat(row.latitude) : null,
    longitude: row.longitude ? parseFloat(row.longitude) : null,
    reviews_count: row.reviews ? parseInt(row.reviews) : 0,
    reviews_tags: row.reviews_tags ? row.reviews_tags.split(',').map(t => t.trim()) : null,
    photo_url: row.photo || null,
    street_view_url: row.street_view || null,
    working_hours: null, // Will be parsed if needed
    business_status: row.business_status || 'OPERATIONAL',
    description: row.description || null,
    reservation_links: row.reservation_links || null,
    booking_appointment_link: row.booking_appointment_link || null,
    location_link: row.location_link || null,
    is_active: true,
    is_verified: false,
    is_featured: false,
  };
}

async function importCSV() {
  console.log('🚀 Starting CSV import...\n');
  console.log(`📁 File: ${CSV_FILE_PATH}`);
  console.log(`📦 Batch size: ${BATCH_SIZE} rows\n`);

  const rows: any[] = [];
  let totalRows = 0;
  let successCount = 0;
  let errorCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv({ separator: ';' })) // Your CSV uses semicolon separator
      .on('data', (row: CSVRow) => {
        try {
          const transformedRow = transformRow(row);
          rows.push(transformedRow);
          totalRows++;

          // Import in batches
          if (rows.length >= BATCH_SIZE) {
            processBatch([...rows]);
            rows.length = 0; // Clear the array
          }
        } catch (error) {
          console.error('❌ Error transforming row:', error);
          errorCount++;
        }
      })
      .on('end', async () => {
        // Import remaining rows
        if (rows.length > 0) {
          await processBatch(rows);
        }

        console.log('\n✅ Import completed!');
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`📊 Total rows processed: ${totalRows}`);
        console.log(`✅ Successful imports: ${successCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        // Run post-import processing
        console.log('🔄 Running post-import processing...');
        await postImportProcessing();

        resolve(true);
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error);
        reject(error);
      });
  });

  async function processBatch(batch: any[]) {
    try {
      const { data, error } = await supabase
        .from('tire_shops')
        .insert(batch);

      if (error) {
        console.error(`❌ Error importing batch:`, error.message);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        const progress = ((successCount / totalRows) * 100).toFixed(1);
        process.stdout.write(`\r⏳ Progress: ${successCount}/${totalRows} rows (${progress}%)`);
      }
    } catch (error) {
      console.error('❌ Batch import error:', error);
      errorCount += batch.length;
    }
  }
}

async function postImportProcessing() {
  try {
    // Run the processing function to set province codes and slugs
    const { error } = await supabase.rpc('process_imported_shops');

    if (error) {
      console.log('⚠️  Note: process_imported_shops function not found or failed.');
      console.log('   This is okay - slugs and province codes will be auto-generated on insert.');
    } else {
      console.log('✅ Post-import processing completed!');
    }
  } catch (error) {
    console.log('⚠️  Skipping post-import processing (function may not exist)');
  }

  // Get statistics
  try {
    const { count, error } = await supabase
      .from('tire_shops')
      .select('*', { count: 'exact', head: true });

    if (!error) {
      console.log(`\n📊 Total shops in database: ${count}`);
    }
  } catch (error) {
    // Ignore
  }
}

// Run import
importCSV()
  .then(() => {
    console.log('🎉 All done! You can now view your data at http://localhost:3000');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Import failed:', error);
    process.exit(1);
  });
