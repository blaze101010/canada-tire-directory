import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

async function getStats() {
  const { data: shops } = await supabase.from('listings').select('state, city, hours_monday, is_verified');

  if (!shops) return;

  const provinces = [...new Set(shops.map(s => s.state).filter(Boolean))];
  const withHours = shops.filter(s => s.hours_monday).length;
  const verified = shops.filter(s => s.is_verified).length;

  const provinceCounts: any = {};
  shops.forEach(s => {
    if (s.state) provinceCounts[s.state] = (provinceCounts[s.state] || 0) + 1;
  });

  const topProvinces = Object.entries(provinceCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5);

  console.log('\n📊 Database Statistics:');
  console.log('========================');
  console.log('Total Shops:', shops.length.toLocaleString());
  console.log('Provinces:', provinces.length);
  console.log('With Hours:', withHours.toLocaleString(), '(' + ((withHours/shops.length)*100).toFixed(1) + '%)');
  console.log('Verified:', verified.toLocaleString());
  console.log('\nTop 5 Provinces:');
  topProvinces.forEach((p: any, i: number) => {
    console.log(`  ${i+1}. ${p.name}: ${p.count.toLocaleString()} shops`);
  });
}

getStats();
