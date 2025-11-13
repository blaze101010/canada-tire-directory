import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      street,
      city,
      province,
      postal_code,
      website,
      description,
      services,
      owner_name,
      additional_info,
      user_id
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !street || !city || !province || !postal_code || !owner_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate user authentication
    if (!user_id) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Services validation
    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one service' },
        { status: 400 }
      );
    }

    // TODO: Send email notification to admin
    // const emailContent = `
    //   <h2>New Tire Shop Submission</h2>
    //   <h3>Shop Information</h3>
    //   <p><strong>Shop Name:</strong> ${name}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Phone:</strong> ${phone}</p>
    //   <p><strong>Address:</strong><br/>
    //   ${street}<br/>
    //   ${city}, ${province}<br/>
    //   ${postal_code}</p>
    //   <p><strong>Website:</strong> ${website || 'Not provided'}</p>
    //   <p><strong>Services:</strong> ${services.join(', ')}</p>
    //   <p><strong>Description:</strong> ${description || 'Not provided'}</p>
    //   <h3>Contact Person</h3>
    //   <p><strong>Name:</strong> ${owner_name}</p>
    //   <p><strong>Additional Info:</strong> ${additional_info || 'None'}</p>
    //   <hr/>
    //   <p><em>Submitted: ${new Date().toLocaleString()}</em></p>
    // `;

    // Save to database for review
    const { data: submission, error: dbError } = await supabase
      .from('user_submissions')
      // @ts-ignore - Supabase type inference issue
      .insert([{
        user_id,
        name,
        email,
        phone,
        street,
        city,
        province,
        postal_code,
        website: website || null,
        description: description || null,
        services,
        owner_name,
        additional_info: additional_info || null,
        status: 'pending',
      } as any])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission. Please try again.' },
        { status: 500 }
      );
    }

    console.log('🏪 New Shop Submission Saved:', {
      id: (submission as any)?.id,
      name,
      email,
      phone,
      address: `${street}, ${city}, ${province} ${postal_code}`,
      website,
      services,
      owner_name,
      timestamp: new Date().toISOString()
    });

    // Send confirmation email to shop owner
    // await sendEmail({
    //   to: email,
    //   subject: 'Your Tire Shop Submission Received',
    //   html: `
    //     <h2>Thank You for Your Submission!</h2>
    //     <p>Hi ${owner_name},</p>
    //     <p>We've received your submission for <strong>${name}</strong>.</p>
    //     <p>Our team will review your information and add your shop to our directory within 2-3 business days.</p>
    //     <p>You'll receive another email once your shop is live on TireShopPro.ca.</p>
    //     <br/>
    //     <p>Best regards,<br/>The TireShopPro Team</p>
    //   `
    // });

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Your shop submission has been received! We\'ll review it and get back to you within 2-3 business days.'
    });

  } catch (error) {
    console.error('Error processing shop submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit shop. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}
