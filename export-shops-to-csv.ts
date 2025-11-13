import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

function escapeCSV(value: any): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function exportShopsToCSV() {
  console.log('🚀 Exporting shops to CSV template...\n');

  const { data: shops, error } = await supabase
    .from('listings')
    .select('id, name, full_address, phone, city, state')
    .order('name');

  if (error) {
    console.error('❌ Error fetching shops:', error);
    process.exit(1);
  }

  if (!shops || shops.length === 0) {
    console.error('❌ No shops found in database');
    process.exit(1);
  }

  console.log(`✅ Found ${shops.length} shops\n`);

  // Create CSV header
  const headers = [
    'shop_id',
    'shop_name',
    'address',
    'phone',
    'city',
    'province',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
    'is_24_hours',
    'is_open_now'
  ];

  let csvContent = headers.join(',') + '\n';

  // Add rows
  for (const shop of shops) {
    const row = [
      escapeCSV(shop.id),
      escapeCSV(shop.name),
      escapeCSV(shop.full_address),
      escapeCSV(shop.phone),
      escapeCSV(shop.city),
      escapeCSV(shop.state),
      '', // monday - leave empty for user to fill
      '', // tuesday
      '', // wednesday
      '', // thursday
      '', // friday
      '', // saturday
      '', // sunday
      'false', // is_24_hours
      '' // is_open_now
    ];

    csvContent += row.join(',') + '\n';
  }

  // Write to file
  const filename = 'working-hours-template.csv';
  fs.writeFileSync(filename, csvContent);

  console.log(`✅ CSV template created: ${filename}`);
  console.log(`📝 Total shops: ${shops.length}\n`);
  console.log('📋 Next steps:');
  console.log('   1. Open working-hours-template.csv in Excel or Google Sheets');
  console.log('   2. Fill in the working hours columns (monday through sunday)');
  console.log('   3. Save the file');
  console.log('   4. Run: npx tsx import-hours-from-csv.ts working-hours-template.csv\n');
  console.log('💡 Hour format examples:');
  console.log('   - "9:00 AM - 6:00 PM"');
  console.log('   - "Closed"');
  console.log('   - "Open 24 hours"');
  console.log('   - "N/A" (if unknown)\n');
}

exportShopsToCSV().catch(console.error);
