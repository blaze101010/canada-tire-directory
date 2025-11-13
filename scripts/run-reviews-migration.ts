import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('🚀 Running reviews table migration...\n');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '../supabase/migrations/create_reviews_table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('📄 SQL Migration file loaded successfully\n');

    console.log('📋 To run this migration, please:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to: Database → SQL Editor');
    console.log('3. Create a new query');
    console.log('4. Copy the contents of: supabase/migrations/create_reviews_table.sql');
    console.log('5. Paste and run it in the SQL Editor\n');
    console.log('Migration file location:', sqlFilePath);
    console.log('\nThis will create:');
    console.log('  ✓ reviews table with all fields');
    console.log('  ✓ indexes for performance');
    console.log('  ✓ trigger to auto-update listing ratings');
    console.log('  ✓ Row Level Security policies\n');

    console.log('After running the migration, you can verify it by checking:');
    console.log('  - Database → Tables → reviews');
    console.log('  - Database → Functions → update_listing_ratings');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

runMigration();
