import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface HoursRow {
  shop_id: string;
  shop_name: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  is_24_hours?: string;
  is_open_now?: string;
}

function parseCSV(csvContent: string): HoursRow[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));

  const rows: HoursRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV with quoted values
    const values: string[] = [];
    let currentValue = '';
    let inQuotes = false;

    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row as HoursRow);
  }

  return rows;
}

function normalizeHours(hours: string): string {
  if (!hours) return 'N/A';

  const normalized = hours.trim();

  // Common variations
  if (normalized.toLowerCase() === 'closed') return 'Closed';
  if (normalized.toLowerCase().includes('24 hour') || normalized === '24/7') return 'Open 24 hours';
  if (normalized.toLowerCase() === 'n/a' || normalized === '-') return 'N/A';

  return normalized;
}

async function importHoursFromCSV(csvFilePath: string) {
  console.log('📂 Reading CSV file...\n');

  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ Error: File not found: ${csvFilePath}`);
    console.error('Please provide the path to your CSV file.');
    console.error('Example: npx tsx import-hours-from-csv.ts working-hours.csv');
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
  const rows = parseCSV(csvContent);

  console.log(`✅ Found ${rows.length} shops in CSV\n`);

  let updated = 0;
  let failed = 0;
  let notFound = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Validate required fields
    if (!row.shop_id && !row.shop_name) {
      console.log(`⚠️  [${i + 1}/${rows.length}] Skipping row - missing shop_id or shop_name`);
      failed++;
      continue;
    }

    // Prepare update data
    const updateData = {
      hours_monday: normalizeHours(row.monday),
      hours_tuesday: normalizeHours(row.tuesday),
      hours_wednesday: normalizeHours(row.wednesday),
      hours_thursday: normalizeHours(row.thursday),
      hours_friday: normalizeHours(row.friday),
      hours_saturday: normalizeHours(row.saturday),
      hours_sunday: normalizeHours(row.sunday),
      is_24_hours: row.is_24_hours?.toLowerCase() === 'true' || row.is_24_hours === '1',
      is_open_now: row.is_open_now?.toLowerCase() === 'true' || row.is_open_now === '1' || null,
      hours_last_updated: new Date().toISOString(),
    };

    // Update by shop_id or shop_name
    let query = supabase.from('listings').update(updateData);

    if (row.shop_id) {
      query = query.eq('id', row.shop_id);
    } else {
      query = query.eq('name', row.shop_name);
    }

    const { data, error, count } = await query.select();

    if (error) {
      console.log(`❌ [${i + 1}/${rows.length}] Error updating ${row.shop_name || row.shop_id}:`, error.message);
      failed++;
    } else if (!data || data.length === 0) {
      console.log(`⚠️  [${i + 1}/${rows.length}] Shop not found: ${row.shop_name || row.shop_id}`);
      notFound++;
    } else {
      updated++;
      console.log(`✅ [${i + 1}/${rows.length}] Updated: ${row.shop_name || row.shop_id}`);
    }

    // Progress indicator every 100 shops
    if ((i + 1) % 100 === 0) {
      console.log(`\n📈 Progress: ${i + 1}/${rows.length} | ${updated} updated | ${notFound} not found | ${failed} failed\n`);
    }
  }

  console.log('\n✨ Import completed!\n');
  console.log('📊 Final Summary:');
  console.log(`   Total rows in CSV: ${rows.length}`);
  console.log(`   Successfully updated: ${updated}`);
  console.log(`   Not found in database: ${notFound}`);
  console.log(`   Failed/Errors: ${failed}`);
  console.log(`   Success rate: ${((updated / rows.length) * 100).toFixed(1)}%\n`);

  if (notFound > 0) {
    console.log('💡 Tip: Shops "not found" may have different names in the database.');
    console.log('   Use shop_id instead of shop_name for 100% accuracy.\n');
  }
}

// Get CSV file path from command line argument
const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('❌ Error: Please provide CSV file path');
  console.error('Usage: npx tsx import-hours-from-csv.ts <path-to-csv>');
  console.error('Example: npx tsx import-hours-from-csv.ts working-hours.csv');
  process.exit(1);
}

importHoursFromCSV(csvFilePath).catch(console.error);
