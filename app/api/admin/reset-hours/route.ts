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

    // Reset all working hours fields
    const { error } = await supabase
      .from('listings')
      // @ts-ignore - Supabase type inference issue
      .update({
        hours_monday: null,
        hours_tuesday: null,
        hours_wednesday: null,
        hours_thursday: null,
        hours_friday: null,
        hours_saturday: null,
        hours_sunday: null,
        is_24_hours: false,
        is_open_now: null,
        hours_last_updated: null,
      } as any)
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'All working hours reset successfully'
    });
  } catch (error: any) {
    console.error('Error resetting hours:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
