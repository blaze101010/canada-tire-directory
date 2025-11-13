import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🚀 Running settings table migration...\n');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'create-settings-table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // Note: The Supabase client doesn't support running raw SQL directly
    // You need to run this in the Supabase SQL Editor or use the Supabase CLI

    console.log('📋 SQL Migration Content:');
    console.log('━'.repeat(80));
    console.log(sql);
    console.log('━'.repeat(80));
    console.log('\n⚠️  IMPORTANT: Please run the above SQL in your Supabase SQL Editor');
    console.log('\n📍 Steps to run the migration:');
    console.log('   1. Go to: https://app.supabase.com/project/xibfpzbpiacrheabxjpo/editor');
    console.log('   2. Copy the SQL content above');
    console.log('   3. Paste it into the SQL Editor');
    console.log('   4. Click "Run" to execute the migration');
    console.log('\n✅ After running, the settings table will be created with default values\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

runMigration();
