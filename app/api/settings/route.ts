import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all settings
    const { data: settings, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;

    // Convert array to object for easier access
    const settingsObject = settings?.reduce((acc: any, setting: any) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    return NextResponse.json(settingsObject || {});
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updates = Object.entries(body);

    // Update each setting
    const promises = updates.map(([key, value]) =>
      supabase
        .from('settings')
        // @ts-ignore - Supabase type inference issue
        .upsert({ key, value: value as string } as any, { onConflict: 'key' })
    );

    const results = await Promise.all(promises);

    // Check for errors
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      throw errors[0].error;
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
