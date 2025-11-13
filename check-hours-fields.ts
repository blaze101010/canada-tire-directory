import { supabase } from './lib/supabase';

async function checkHoursFields() {
  // Get a sample listing to see what fields exist
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Available fields in listings table:');
  console.log(Object.keys(data));

  console.log('\nSample shop data:');
  console.log(JSON.stringify(data, null, 2));
}

checkHoursFields();
