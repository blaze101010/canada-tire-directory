import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function testCanonicalTags() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log('🧪 Testing Canonical Tag Implementation\n');
  console.log('=' .repeat(60));

  // Get a sample shop
  const { data: shops } = await supabase
    .from('listings')
    .select('id, slug, name, city, state')
    .not('slug', 'is', null)
    .limit(3);

  if (!shops || shops.length === 0) {
    console.log('❌ No shops found with slugs');
    return;
  }

  console.log(`\n📋 Sample shops to test:\n`);

  shops.forEach((shop, index) => {
    const shopUrl = `https://tireshoppro.ca/shop/${shop.slug || shop.id}`;
    console.log(`${index + 1}. ${shop.name}`);
    console.log(`   Location: ${shop.city}, ${shop.state}`);
    console.log(`   ✅ Expected canonical URL: ${shopUrl}`);
    console.log();
  });

  console.log('=' .repeat(60));
  console.log('\n📝 How to verify canonical tags:\n');
  console.log('1. Visit any shop page in your browser');
  console.log('2. Right-click → "View Page Source"');
  console.log('3. Search for "canonical" (Ctrl/Cmd + F)');
  console.log('4. You should see a line like:');
  console.log('   <link rel="canonical" href="https://tireshoppro.ca/shop/[slug]"/>');
  console.log();
  console.log('=' .repeat(60));
  console.log('\n🔍 Alternative: Use these online tools:\n');
  console.log('• Google Search Console - URL Inspection Tool');
  console.log('• https://www.seoptimer.com/meta-tag-checker');
  console.log('• https://technicalseo.com/tools/meta-tags/');
  console.log();
  console.log('=' .repeat(60));
  console.log('\n✅ After deployment:');
  console.log('1. Wait 24-48 hours for Google to recrawl');
  console.log('2. Go to Google Search Console');
  console.log('3. Click "Page Indexing" → "Duplicate without user-selected canonical"');
  console.log('4. Click "Validate Fix"');
  console.log('5. Monitor validation progress (1-2 weeks)');
  console.log();
}

testCanonicalTags();
