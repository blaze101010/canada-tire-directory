import * as XLSX from 'xlsx';
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
const EXCEL_FILE_PATH = process.argv[2] || '/Users/philipobaye/Downloads/Outscraper-20251105070352s7c_tire_shop copy.xlsx';

// Transform Excel row to database format
function transformRow(row: any) {
  return {
    name: row.name || row.Name || 'Unknown',
    site: row.site || row.Site || null,
    phone: row.phone || row.Phone || null,
    full_address: row.full_address || row['Full Address'] || null,
    street: row.street || row.Street || null,
    city: row.city || row.City || 'Unknown',
    postal_code: row.postal_code || row['Postal Code'] || row.postalCode || null,
    state: row.state || row.State || null,
    latitude: parseFloat(row.latitude || row.Latitude || '0') || null,
    longitude: parseFloat(row.longitude || row.Longitude || '0') || null,
    reviews_count: parseInt(row.reviews || row.Reviews || '0') || 0,
    reviews_tags: row.reviews_tags ?
      (typeof row.reviews_tags === 'string' ? row.reviews_tags.split(',').map((t: string) => t.trim()) : null) : null,
    photo_url: row.photo || row.Photo || null,
    street_view_url: row.street_view || row['Street View'] || null,
    working_hours: null,
    business_status: row.business_status || row['Business Status'] || 'OPERATIONAL',
    description: row.description || row.Description || null,
    reservation_links: row.reservation_links || row['Reservation Links'] || null,
    booking_appointment_link: row.booking_appointment_link || row['Booking Link'] || null,
    location_link: row.location_link || row['Location Link'] || null,
    is_active: true,
    is_verified: false,
    is_featured: false,
  };
}

async function importExcel() {
  console.log('🚀 Starting Excel import...\n');
  console.log(`📁 File: ${EXCEL_FILE_PATH}`);
  console.log(`📦 Batch size: ${BATCH_SIZE} rows\n`);

  try {
    // Read Excel file
    console.log('📖 Reading Excel file...');
    const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`✅ Found ${data.length} rows in Excel file\n`);

    if (data.length === 0) {
      console.log('⚠️  No data found in Excel file');
      return;
    }

    // Show sample of first row for debugging
    console.log('📋 Sample row (first entry):');
    console.log(JSON.stringify(data[0], null, 2));
    console.log('\n');

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process in batches
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      const transformedBatch = batch.map((row, index) => {
        try {
          return transformRow(row);
        } catch (error) {
          errorCount++;
          errors.push(`Row ${i + index + 2}: ${error}`);
          return null;
        }
      }).filter(Boolean); // Remove null entries

      if (transformedBatch.length > 0) {
        try {
          const { data: insertedData, error } = await supabase
            .from('tire_shops')
            .insert(transformedBatch as any);

          if (error) {
            console.error(`\n❌ Error importing batch starting at row ${i + 2}:`, error.message);
            errorCount += transformedBatch.length;
            errors.push(`Batch ${i}-${i + BATCH_SIZE}: ${error.message}`);
          } else {
            successCount += transformedBatch.length;
          }
        } catch (error) {
          console.error(`\n❌ Batch import error:`, error);
          errorCount += transformedBatch.length;
        }
      }

      // Update progress
      const totalProcessed = Math.min(i + BATCH_SIZE, data.length);
      const progress = ((totalProcessed / data.length) * 100).toFixed(1);
      process.stdout.write(`\r⏳ Progress: ${totalProcessed}/${data.length} rows (${progress}%) | ✅ Success: ${successCount} | ❌ Errors: ${errorCount}`);
    }

    console.log('\n\n✅ Import completed!');
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Total rows in file: ${data.length}`);
    console.log(`✅ Successful imports: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    if (errors.length > 0 && errors.length <= 10) {
      console.log('⚠️  Error details:');
      errors.forEach(err => console.log(`   ${err}`));
      console.log('');
    } else if (errors.length > 10) {
      console.log(`⚠️  ${errors.length} errors occurred. Showing first 10:`);
      errors.slice(0, 10).forEach(err => console.log(`   ${err}`));
      console.log('');
    }

    // Run post-import processing
    console.log('🔄 Running post-import processing...');
    await postImportProcessing();

  } catch (error) {
    console.error('💥 Error reading Excel file:', error);
    throw error;
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

    // Get province distribution
    const { data: provinces } = await supabase
      .from('tire_shops')
      .select('province_code, state')
      .limit(1000);

    if (provinces && provinces.length > 0) {
      const distribution = provinces.reduce((acc: any, shop: any) => {
        const key = shop.province_code || shop.state || 'Unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      console.log('\n📍 Sample province distribution:');
      Object.entries(distribution).forEach(([province, count]) => {
        console.log(`   ${province}: ${count} shops`);
      });
    }
  } catch (error) {
    // Ignore
  }
}

// Run import
importExcel()
  .then(() => {
    console.log('\n🎉 All done! You can now view your data at http://localhost:3000\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });
