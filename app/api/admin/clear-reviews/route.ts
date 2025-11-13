import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST() {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all reviews
    const { error } = await supabase
      .from('reviews')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (using a condition that's always true)

    if (error) throw error;

    // Reset review counts and ratings on all shops
    const { error: updateError } = await supabase
      .from('listings')
      // @ts-ignore - Supabase type inference issue
      .update({
        reviews_count: 0,
        average_rating: null
      } as any)
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      message: 'All reviews cleared successfully'
    });
  } catch (error: any) {
    console.error('Error clearing reviews:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
