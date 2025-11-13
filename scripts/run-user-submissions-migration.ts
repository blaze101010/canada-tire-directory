import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Running user_submissions table migration...\n');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/create-user-submissions-table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration file loaded successfully');
    console.log('📊 Executing SQL...\n');

    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });

    if (error) {
      // If the RPC function doesn't exist, we need to use a different approach
      console.log('⚠️  RPC function not available, trying direct query...\n');

      // Split the SQL into individual statements
      const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        if (statement) {
          console.log(`Executing: ${statement.substring(0, 50)}...`);
          const { error: stmtError } = await supabase.rpc('query', { query_text: statement + ';' });

          if (stmtError) {
            console.error('❌ Error executing statement:', stmtError.message);
            console.log('\n📝 Please run this migration manually in Supabase SQL Editor:\n');
            console.log('1. Go to your Supabase Dashboard');
            console.log('2. Navigate to SQL Editor');
            console.log('3. Copy the SQL from: supabase/migrations/create-user-submissions-table.sql');
            console.log('4. Paste and run it\n');
            process.exit(1);
          }
        }
      }
    }

    console.log('✅ Migration completed successfully!\n');
    console.log('📋 Created:');
    console.log('   - user_submissions table');
    console.log('   - Row Level Security policies');
    console.log('   - Indexes for performance');
    console.log('   - Automatic timestamp update trigger\n');
    console.log('🎉 Users can now sign up and submit their shops!\n');

  } catch (err: any) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📝 Please run this migration manually in Supabase SQL Editor:\n');
    console.log('1. Go to your Supabase Dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy the SQL from: supabase/migrations/create-user-submissions-table.sql');
    console.log('4. Paste and run it\n');
    process.exit(1);
  }
}

runMigration();
