import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkShopCount() {
  console.log('🔍 Checking shop count...\n');

  try {
    const { count, error } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    console.log(`📊 Total shops in database: ${count}`);
    console.log('');

    // Check by province
    const { data: shops, error: shopError } = await supabase
      .from('listings')
      .select('state');

    if (shopError) throw shopError;

    const provinceCount: { [key: string]: number } = {};
    shops?.forEach(shop => {
      if (shop.state) {
        provinceCount[shop.state] = (provinceCount[shop.state] || 0) + 1;
      }
    });

    console.log('📍 Shops by Province:');
    console.log('━'.repeat(40));
    Object.entries(provinceCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([province, count]) => {
        console.log(`   ${province}: ${count}`);
      });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkShopCount();
