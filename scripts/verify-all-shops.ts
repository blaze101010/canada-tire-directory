import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyAllShops() {
  console.log('🔍 Checking all shops in database...\n');

  try {
    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    console.log(`📊 Total shops in database: ${totalCount}`);
    console.log('');

    // Test fetching with different limits
    console.log('Testing fetch limits:');
    console.log('━'.repeat(60));

    for (const limit of [100, 500, 1000, 2000, 5000]) {
      const { data, error } = await supabase
        .from('listings')
        .select('id')
        .limit(limit);

      if (error) {
        console.log(`❌ Limit ${limit}: Error - ${error.message}`);
      } else {
        console.log(`✅ Limit ${limit}: Successfully fetched ${data?.length || 0} shops`);
      }
    }

    console.log('');
    console.log('Testing count by province:');
    console.log('━'.repeat(60));

    const { data: allShops, error: allError } = await supabase
      .from('listings')
      .select('state');

    if (allError) throw allError;

    const provinceCounts: { [key: string]: number } = {};
    allShops?.forEach(shop => {
      if (shop.state) {
        provinceCounts[shop.state] = (provinceCounts[shop.state] || 0) + 1;
      }
    });

    Object.entries(provinceCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([province, count]) => {
        console.log(`   ${province}: ${count} shops`);
      });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyAllShops();
