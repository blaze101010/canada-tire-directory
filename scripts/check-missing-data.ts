import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMissingData() {
  console.log('🔍 Analyzing shop data...\n');

  try {
    // Get total count
    const { count: total } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Total shops: ${total}\n`);

    // Count shops with state
    const { count: withState } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .not('state', 'is', null);

    console.log(`✅ Shops with state: ${withState}`);
    console.log(`❌ Shops WITHOUT state: ${(total || 0) - (withState || 0)}\n`);

    // Count shops with city
    const { count: withCity } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .not('city', 'is', null);

    console.log(`✅ Shops with city: ${withCity}`);
    console.log(`❌ Shops WITHOUT city: ${(total || 0) - (withCity || 0)}\n`);

    // Count shops with both
    const { count: withBoth } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .not('state', 'is', null)
      .not('city', 'is', null);

    console.log(`✅ Shops with BOTH state AND city: ${withBoth}`);
    console.log(`❌ Shops missing state OR city: ${(total || 0) - (withBoth || 0)}\n`);

    // Sample a few shops without state/city
    console.log('Sample shops with missing data:');
    console.log('━'.repeat(80));

    const { data: missingData } = await supabase
      .from('listings')
      .select('id, name, city, state, full_address')
      .or('state.is.null,city.is.null')
      .limit(10);

    missingData?.forEach((shop, i) => {
      console.log(`${i + 1}. ${shop.name}`);
      console.log(`   City: ${shop.city || 'MISSING'}`);
      console.log(`   State: ${shop.state || 'MISSING'}`);
      console.log(`   Address: ${shop.full_address || 'N/A'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkMissingData();
