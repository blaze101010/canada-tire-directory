import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = 'https://xibfpzbpiacrheabxjpo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpYmZwemJwaWFjcmhlYWJ4anBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMDg5MDIsImV4cCI6MjA3Nzg4NDkwMn0.uGzYx_Wm_S5nY0_RZBFmV5aRsIkhWM436k3cRlBnw6U';

async function testQuery() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log('🔍 Testing exact query from your app...\n');

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('❌ Query error:', error);
    return;
  }

  console.log(`✅ Query successful! Found ${data.length} listings\n`);

  if (data.length > 0) {
    console.log('📋 First listing structure:');
    console.log(JSON.stringify(data[0], null, 2));

    console.log('\n🔑 Available fields:');
    console.log(Object.keys(data[0]).join(', '));
  }
}

testQuery();
